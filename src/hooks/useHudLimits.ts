import { useCallback, useState } from 'react';

export type ILRows = Record<'30' | '50' | '80', number[]>;
export type EntityResp = { areaName: string; year: number; mfi: number; rows: ILRows };

async function fetchJSON(input: RequestInfo | URL, init?: RequestInit & { timeoutMs?: number }) {
  const { timeoutMs = 12000, ...rest } = (init || {}) as any;
  const controller = new AbortController();
  const t = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(input, { ...rest, signal: controller.signal });
    return res;
  } catch (e: any) {
    if (e?.name === 'AbortError') {
      throw new Error('Network timeout. Please check your connection and try again.');
    }
    const msg = String(e?.message || e || '')
      .toLowerCase()
      .includes('fetch failed')
      ? 'Network error. Please check your connection and try again.'
      : e?.message || 'Request failed';
    throw new Error(msg);
  } finally {
    clearTimeout(t);
  }
}

export function useHudLimits() {
  const [data, setData] = useState<EntityResp | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const clear = useCallback(() => {
    setData(null);
    setError(null);
  }, []);

  const fetchLimits = useCallback(async (entityid: string, year?: string) => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams({ entityid });
      if (year && /^\d{4}$/.test(year)) params.set('year', year);
      const r = await fetchJSON(`/api/hud/il?${params}`, { cache: 'no-store' } as any);
      if (!r.ok) {
        const t = await r.text();
        if (r.status === 404 || t.includes('No data found')) {
          throw new Error('No HUD income limits found for this area. Try using a full address to resolve the correct HUD area.');
        }
        if (r.status === 400) {
          throw new Error('Please select a State and County from the list.');
        }
        throw new Error(t);
      }
      const j = (await r.json()) as EntityResp;
      setData(j);
      return j;
    } catch (e: any) {
      const msg = e?.message || 'Failed to load IL';
      setError(msg);
      throw new Error(msg);
    } finally {
      setLoading(false);
    }
  }, []);

  return { data, loading, error, clear, fetchLimits, setData } as const;
}
