import { NextRequest, NextResponse } from 'next/server';

const HUD_BASE = 'https://www.huduser.gov/hudapi/public';
const token = process.env.HUD_API_TOKEN;

function json(body: unknown, status = 200) {
  return NextResponse.json(body, {
    status,
    headers: {
      'Cache-Control': 'public, max-age=86400, s-maxage=86400',
    },
  });
}

async function hud(path: string) {
  if (!token) throw new Error('Missing HUD_API_TOKEN');
  const r = await fetch(`${HUD_BASE}${path}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const txt = await r.text();
  if (!r.ok) throw new Error(`HUD ${r.status} ${r.statusText}: ${txt}`);
  try {
    return JSON.parse(txt);
  } catch {
    throw new Error(`HUD JSON parse error: ${txt.slice(0, 200)}`);
  }
}

function normalizeEntity(p: any) {
  const areaName = p?.area_name ?? p?.areaname ?? 'Unknown Area';
  const year = Number(p?.year ?? p?.il_year ?? 0);
  const mfi = Number(p?.median_income ?? p?.area_median_income ?? p?.mfi ?? 0);

  const il = p?.income_limits ?? p?.il ?? {
    extremely_low: p?.extremely_low,
    very_low: p?.very_low,
    low: p?.low,
  };

  const toRow = (src: any, prefix?: 'il30' | 'il50' | 'il80'): number[] => {
    if (Array.isArray(src)) return src.slice(0, 8).map((n: any) => Number(n));
    if (src && typeof src === 'object') {
      const order = ['p1', 'p2', 'p3', 'p4', 'p5', 'p6', 'p7', 'p8'];
      const pick = (pfx: string) => order.map((k) => Number(src[`${pfx}_${k}`] ?? src[k] ?? 0));
      if (prefix) return pick(prefix);
      return [];
    }
    return [];
  };

  let rows: Record<'30' | '50' | '80', number[]>;
  if (Array.isArray(il['30']) || Array.isArray(il['50']) || Array.isArray(il['80'])) {
    rows = {
      '30': toRow(il['30'] ?? il['extremely_low']),
      '50': toRow(il['50'] ?? il['very_low']),
      '80': toRow(il['80'] ?? il['low']),
    };
  } else {
    rows = {
      '30': toRow(il?.extremely_low, 'il30'),
      '50': toRow(il?.very_low, 'il50'),
      '80': toRow(il?.low, 'il80'),
    };
  }

  return { areaName, year, mfi, rows };
}

function normalizeState(payload: any) {
  const data = payload?.data || payload;
  const year = Number(data?.year ?? payload?.year ?? 0);
  const rows = {
    '30': [
      data?.extremely_low?.il30_p1, data?.extremely_low?.il30_p2, data?.extremely_low?.il30_p3, data?.extremely_low?.il30_p4,
      data?.extremely_low?.il30_p5, data?.extremely_low?.il30_p6, data?.extremely_low?.il30_p7, data?.extremely_low?.il30_p8,
    ].map(Number),
    '50': [
      data?.very_low?.il50_p1, data?.very_low?.il50_p2, data?.very_low?.il50_p3, data?.very_low?.il50_p4,
      data?.very_low?.il50_p5, data?.very_low?.il50_p6, data?.very_low?.il50_p7, data?.very_low?.il50_p8,
    ].map(Number),
    '80': [
      data?.low?.il80_p1, data?.low?.il80_p2, data?.low?.il80_p3, data?.low?.il80_p4,
      data?.low?.il80_p5, data?.low?.il80_p6, data?.low?.il80_p7, data?.low?.il80_p8,
    ].map(Number),
  } as Record<'30' | '50' | '80', number[]>;
  return { areaName: data?.statecode ?? 'State', year, mfi: Number(data?.median_income ?? 0), rows };
}

function normalizeEntityId(raw: string) {
  const s = raw.trim();
  if (/^METRO/i.test(s)) return s;
  if (/^\d{10}$/.test(s)) return s;
  if (/^\d{5}$/.test(s)) return `${s}99999`;
  throw new Error('entityid must be 5-digit county FIPS, 10-digit county code, or METRO…');
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = req.nextUrl;
    const entityid = searchParams.get('entityid');
    const state = searchParams.get('state');
    const yearParam = searchParams.get('year');
    const primaryYear = yearParam && /^\d{4}$/.test(yearParam) ? yearParam : '2025';
    const yearCandidates = Array.from(new Set([primaryYear, '2025', '2024', '2023']));

    if (state && /^[A-Za-z]{2}$/.test(state)) {
      const st = state.toUpperCase();
      const errors: string[] = [];
      for (const y of yearCandidates) {
        try {
          const payload = await hud(`/il/statedata/${st}?year=${y}`);
          return json(normalizeState(payload));
        } catch (e: any) {
          const msg = String(e?.message || e);
          errors.push(`year ${y}: ${msg}`);
          if (!/HUD 400/i.test(msg)) return json({ error: msg }, 502);
        }
      }
      return json({ error: 'HUD state request failed for all candidate years', details: errors }, 400);
    }

    if (entityid) {
      const entity = normalizeEntityId(entityid);
      const errors: string[] = [];
      for (const y of yearCandidates) {
        try {
          const payload = await hud(`/il/data/${encodeURIComponent(entity)}?year=${y}`);
          return json(normalizeEntity(payload?.data ?? payload));
        } catch (e: any) {
          const msg = String(e?.message || e);
          errors.push(`year ${y}: ${msg}`);
          if (!/HUD 400/i.test(msg)) return json({ error: msg }, 502);
        }
      }
      return json({ error: 'HUD entity request failed for all candidate years', details: errors }, 400);
    }

    return json({ error: 'Provide entityid=##### or state=FL (optional year=YYYY).' }, 400);
  } catch (err: any) {
    const msg = String(err?.message || err);
    if (/HUD 400/i.test(msg)) return json({ error: msg }, 400);
    return json({ error: msg || 'Unexpected error' }, 500);
  }
}
