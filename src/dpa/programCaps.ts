// src/dpa/programCaps.ts
// Drop-in replacement that reads program caps via the API endpoint `/api/fl-caps`.
// Requires you to add the serverless file: /api/fl-caps.ts (reads /data/fl-housing-limits-2025.json)

export type ProgramId =
  | 'FL Assist 10k Bond'
  | 'FL Assist 10k TBA'
  | 'FL HLP 12,500 Bond'
  | 'FL HLP 12,500 TBA'
  | 'Hometown Heroes Bond'
  | 'Hometown Heroes TBA'
  | 'FL Plus TBA 3% 4% 5%';

export type ProgramBucket = '1_2' | '3_plus' | 'all_households';

export type ProgramLimit = {
  value: number | null;
  sourceColumn: 'B' | 'C' | 'D' | 'E' | 'F' | 'G';
  note?: string;
};

export type CountyProgramMap = Record<
  string, // County name (e.g., "Broward")
  Record<
    ProgramId,
    | { [K in Exclude<ProgramBucket, 'all_households'>]?: ProgramLimit } // buckets
    | { all_households: ProgramLimit }
  >
>;

// --- Internal cache(s) ---
let _allCache: CountyProgramMap | null = null;
const _countyCache: Record<string, CountyProgramMap[string]> = Object.create(null);

// Guard: make sure a response body looks like JSON (reject SPA fallbacks)
function looksLikeJSON(s: string) {
  return /^\s*[\[{]/.test(s);
}

async function fetchJSON(url: string): Promise<any> {
  const res = await fetch(url, { cache: 'no-cache' });
  const text = await res.text();
  if (!res.ok || !looksLikeJSON(text)) {
    throw new Error(`Caps API error (${res.status}) at ${url}`);
  }
  return JSON.parse(text);
}

/**
 * Load the full county→program map through the API.
 * Use sparingly; for most UI fetches prefer per-county via `loadCountyCaps`.
 */
export async function loadProgramCaps(): Promise<CountyProgramMap> {
  if (_allCache) return _allCache;
  const json = await fetchJSON('/api/fl-caps');
  _allCache = json as CountyProgramMap;
  return _allCache!;
}

/**
 * Load caps for a single county (faster + lighter for UI interactions).
 */
export async function loadCountyCaps(countyName: string): Promise<CountyProgramMap[string]> {
  if (_countyCache[countyName]) return _countyCache[countyName];
  const json = await fetchJSON(`/api/fl-caps?county=${encodeURIComponent(countyName)}`);
  _countyCache[countyName] = json as CountyProgramMap[string];
  return _countyCache[countyName];
}

/**
 * Return the ProgramLimit for the given county/program/bucket.
 * This mirrors your previous behavior and return type.
 */
export async function getProgramCap(
  countyName: string,
  programId: ProgramId,
  bucket: ProgramBucket
): Promise<ProgramLimit | undefined> {
  // Prefer per-county load to avoid pulling the whole dataset on first use
  const county = await loadCountyCaps(countyName);
  if (!county) return;
  const prog = county[programId];
  if (!prog) return;

  if ('all_households' in (prog as any)) {
    // Single-cap programs ignore the incoming bucket and always return the one cap
    return (prog as any)['all_households'] as ProgramLimit;
  }
  return (prog as any)[bucket] as ProgramLimit | undefined;
}

// Helper: annual → monthly (rounded)
export function annualToMonthly(v?: number | null): number | null {
  if (typeof v !== 'number') return null;
  return Math.round(v / 12);
}
