import { US_STATES } from '../../utils/locationData';

export type CountyItem = { name: string; geoid: string };

export function CountyForm({
  countyState,
  setCountyState,
  countyName,
  setCountyName,
  countyList,
  countyLoading,
  year,
  setYear,
  onFetch,
  onClear,
  loading,
}: {
  countyState: string;
  setCountyState: (s: string) => void;
  countyName: string;
  setCountyName: (s: string) => void;
  countyList: CountyItem[];
  countyLoading: boolean;
  year: string;
  setYear: (y: string) => void;
  onFetch: () => void;
  onClear: () => void;
  loading: boolean;
}) {
  return (
    <div className="grid gap-3 md:grid-cols-3">
      <div className="flex flex-col">
        <label className="text-xs text-gray-300 mb-1 flex items-center gap-2">State <span className="text-red-400">*</span><span className="text-[10px] text-red-300 bg-red-900/30 border border-red-700 rounded px-1 py-[1px]">Required</span></label>
        <select
          aria-required="true"
          value={countyState}
          onChange={(e) => setCountyState(e.target.value)}
          className={`bg-gray-900/60 border ${!countyState ? 'border-red-600' : 'border-gray-700/70'} rounded-xl px-3 py-2 shadow-inner shadow-black/20 focus:outline-none focus:ring-2 focus:ring-purple-600`}
        >
          {US_STATES.map((s: { code: string; name: string }) => (
            <option key={s.code} value={s.code}>{s.name}</option>
          ))}
        </select>
        <div aria-live="polite" className="mt-2">
          {countyLoading ? (
            <div className="inline-flex items-center gap-2 text-xs text-purple-300 bg-purple-900/30 border border-purple-700 rounded px-2 py-1">
              <svg className="animate-spin h-3 w-3 text-purple-300" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
              </svg>
              Loading counties…
            </div>
          ) : (
            <div className="inline-flex items-center gap-2 text-[11px] text-gray-300 bg-gray-800/70 border border-gray-700/70 rounded px-2 py-1">
              <span className="inline-block h-2 w-2 rounded-full bg-green-400"></span>
              Loaded {countyList.length} counties
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-col">
        <label className="text-xs text-gray-300 mb-1 flex items-center gap-2">County <span className="text-red-400">*</span><span className="text-[10px] text-red-300 bg-red-900/30 border border-red-700 rounded px-1 py-[1px]">Required</span></label>
        <input
          aria-required="true"
          list="county-list"
          value={countyName}
          onChange={(e) => setCountyName(e.target.value)}
          placeholder={countyLoading ? 'Loading counties…' : 'e.g. Broward'}
          className={`bg-gray-900/60 border ${!countyLoading && !countyName ? 'border-red-600' : 'border-gray-700/70'} rounded-xl px-3 py-2 shadow-inner shadow-black/20 focus:outline-none focus:ring-2 focus:ring-purple-600`}
          disabled={countyLoading}
        />
        <datalist id="county-list">
          {countyList.map((c) => (
            <option key={c.geoid} value={c.name} />
          ))}
        </datalist>
      </div>
      <div className="flex flex-col">
        <label className="text-xs text-gray-400 mb-1">Year (optional)</label>
        <input
          value={year}
          onChange={(e) => setYear(e.target.value)}
          placeholder="2025"
          className="bg-gray-900/60 border border-gray-700/70 rounded-xl px-3 py-2 shadow-inner shadow-black/20 focus:outline-none focus:ring-2 focus:ring-purple-600"
        />
      </div>
      <div className="md:col-span-3 text-[11px] text-gray-500"> <span className="text-red-400">*</span> State & County required.</div>
      <div className="flex items-end gap-2">
        <button
          onClick={onFetch}
          className="flex-1 md:w-56 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 active:from-purple-700 active:to-indigo-700 rounded-full px-5 py-2.5 font-semibold"
          disabled={loading || !(countyState && countyList.find((c) => c.name === countyName))}
        >
          {loading ? 'Loading…' : 'Get Income Limits'}
        </button>
        <button
          onClick={onClear}
          className="px-4 py-2 rounded-full border border-gray-600 text-gray-200 hover:bg-gray-800"
          disabled={loading}
          aria-label="Clear all county inputs and results"
        >
          Clear All
        </button>
      </div>
    </div>
  );
}

export default CountyForm;
