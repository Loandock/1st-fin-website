import { NextRequest, NextResponse } from 'next/server';
import { readFile } from 'fs/promises';
import { existsSync } from 'fs';
import { join } from 'path';

type ProgramId =
  | 'FL Assist 10k Bond'
  | 'FL Assist 10k TBA'
  | 'FL HLP 12,500 Bond'
  | 'FL HLP 12,500 TBA'
  | 'Hometown Heroes Bond'
  | 'Hometown Heroes TBA'
  | 'FL Plus TBA 3% 4% 5%';

type Bucket = '1_2' | '3_plus' | 'all_households';

type ProgramLimit = {
  value: number | null;
  sourceColumn: 'B' | 'C' | 'D' | 'E' | 'F' | 'G';
  note?: string;
};

type CountyProgramMap = Record<
  string,
  Record<
    ProgramId,
    | { all_households: ProgramLimit }
    | { '1_2'?: ProgramLimit; '3_plus'?: ProgramLimit }
  >
>;

let CAPS_CACHE: { data: CountyProgramMap; pathUsed: string } | null = null;

function resolveCapsPath(): string {
  const candidates = [
    join(process.cwd(), 'data', 'fl-housing-limits-2025.json'),
    join(process.cwd(), 'public', 'fl-housing-limits-2025.json'),
    join(process.cwd(), 'fl-housing-limits-2025.json'),
  ];
  for (const p of candidates) {
    if (existsSync(p)) return p;
  }
  return candidates[0];
}

async function loadCaps(): Promise<{ data: CountyProgramMap; pathUsed: string }> {
  if (CAPS_CACHE) return CAPS_CACHE;
  const path = resolveCapsPath();
  if (!existsSync(path)) {
    throw new Error(`caps-json-missing:${path}`);
  }
  const buf = await readFile(path, 'utf-8');
  const data = JSON.parse(buf) as CountyProgramMap;
  CAPS_CACHE = { data, pathUsed: path };
  return CAPS_CACHE!;
}

export async function GET(req: NextRequest) {
  try {
    const { data, pathUsed } = await loadCaps();
    const { searchParams } = req.nextUrl;
    const county = searchParams.get('county') || undefined;
    const program = searchParams.get('program') as ProgramId | undefined;
    const bucket = searchParams.get('bucket') as Bucket | undefined;
    const monthly = searchParams.get('monthly');

    const headers: Record<string, string> = {
      'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate=604800',
      'X-Caps-Path': pathUsed,
    };

    if (!county && !program && !bucket) {
      return NextResponse.json(data, { headers });
    }

    if (county && !program && !bucket) {
      const c = data[county];
      if (!c) return NextResponse.json({ error: `County not found: ${county}` }, { status: 404, headers });
      return NextResponse.json(c, { headers });
    }

    if (county && program && bucket) {
      const c = data[county];
      if (!c) return NextResponse.json({ error: `County not found: ${county}` }, { status: 404, headers });

      const lookupProgram: ProgramId = program === 'FL Plus TBA 3% 4% 5%' ? 'FL HLP 12,500 TBA' : program;
      const p = c[lookupProgram];
      if (!p) return NextResponse.json({ error: `Program not found in ${county}: ${program}` }, { status: 404, headers });

      let limit: ProgramLimit | undefined;
      if ('all_households' in (p as any)) {
        limit = (p as any).all_households as ProgramLimit;
      } else {
        limit = (p as any)[bucket] as ProgramLimit | undefined;
      }

      if (!limit) {
        return NextResponse.json({ error: `Bucket not found for ${program} in ${county}: ${bucket}` }, { status: 404, headers });
      }

      const isMonthly = monthly === 'true';
      const value = typeof limit.value === 'number' ? (isMonthly ? Math.round(limit.value / 12) : limit.value) : null;

      return NextResponse.json({
        county,
        program,
        bucket: 'all_households' in (p as any) ? 'all_households' : bucket,
        value,
        meta: { sourceColumn: limit.sourceColumn, note: limit.note, period: isMonthly ? 'monthly' : 'annual' },
      }, { headers });
    }

    return NextResponse.json({ error: 'Provide either: none, county=..., or county+program+bucket[+monthly].' }, { status: 400, headers });
  } catch (e: any) {
    const msg: string = e?.message || 'Unknown error';
    if (msg.startsWith('caps-json-missing:')) {
      return NextResponse.json({
        error: `Limits JSON not found. Expected at: ${msg.replace('caps-json-missing:', '')}`,
      }, { status: 500 });
    }
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
