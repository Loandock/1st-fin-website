import { useEffect, useState } from 'react';

export interface CountyItem { name: string; geoid: string }

export function useCounties(countyState: string, onPreselect?: (name: string, geoid: string) => void) {
  const [countyList, setCountyList] = useState<CountyItem[]>([]);
  const [countyLoading, setCountyLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    async function run() {
      setError(null);
      setCountyLoading(true);
      setCountyList([]);
      try {
        const r = await fetch(`/api/census/geographies?state=${encodeURIComponent(countyState)}`, { cache: 'no-store' });
        if (!r.ok) throw new Error(await r.text());
        const j = await r.json();
        const list: CountyItem[] = (j?.counties || []).map((c: any) => ({ name: String(c.name), geoid: String(c.geoid) }));
        if (cancelled) return;
        setCountyList(list);
        if (onPreselect && countyState === 'FL') {
          const broward = list.find(c => /broward/i.test(c.name));
          if (broward) onPreselect(broward.name, broward.geoid);
        }
      } catch (e: any) {
        if (cancelled) return;
        setError(e?.message || 'Failed to load counties');
      } finally {
        if (!cancelled) setCountyLoading(false);
      }
    }
    if (countyState) run();
    return () => { cancelled = true; };
  }, [countyState]);

  return { countyList, countyLoading, error };
}
