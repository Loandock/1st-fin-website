import { DPA_PROGRAMS, isProgramEnabled, type DpaProgramId } from '../../dpa/programs';
import type { ReactNode } from 'react';

export default function DpaSelector({
  countyState,
  countyName,
  dpaProgram,
  setDpaProgram,
  dpaInfoOpen,
  setDpaInfoOpen,
  extraControls,
}: {
  countyState: string;
  countyName: string;
  dpaProgram: DpaProgramId | '';
  setDpaProgram: (v: DpaProgramId | '') => void;
  dpaInfoOpen: boolean;
  setDpaInfoOpen: (v: boolean | ((p: boolean) => boolean)) => void;
  extraControls?: ReactNode;
}) {
  const disabled = countyState !== 'FL' && !/miami-?dade/i.test(countyName);
  return (
    <div className="mb-3">
      <label className="text-[11px] text-gray-400 mb-1 block">DPA Programs</label>
      <div className="flex gap-2 items-center">
        <select
          aria-required="true"
          value={dpaProgram}
          onChange={(e)=>setDpaProgram(e.target.value as DpaProgramId | '')}
          disabled={disabled}
          className={`bg-gray-800/80 border ${disabled ? 'border-gray-700 opacity-60' : 'border-gray-700'} rounded-lg px-3 py-2`}
        >
          <option value="">Select a Program…</option>
          {DPA_PROGRAMS.map(p => {
            const enabled = isProgramEnabled(p, countyState, countyName || '');
            return (
              <option key={p.id} value={p.id} disabled={!enabled} title={p.label}>{p.label}</option>
            );
          })}
        </select>
        {extraControls}
        <button
          onClick={()=>setDpaInfoOpen((v:any)=>!v)}
          disabled={disabled || !dpaProgram}
          className={`ml-auto inline-flex items-center gap-2 text-xs px-3.5 py-2 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-purple-600 disabled:opacity-60 disabled:pointer-events-none bg-gradient-to-r text-black ${
            dpaInfoOpen
              ? 'from-emerald-400 to-purple-600 hover:from-emerald-300 hover:to-purple-500'
              : 'from-purple-600 to-emerald-400 hover:from-purple-500 hover:to-emerald-300'
          }`}
          aria-expanded={dpaInfoOpen}
        >
          {dpaInfoOpen ? 'Hide Program Details' : 'Show Program Details'}
          {dpaInfoOpen ? (
            <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M7.41 15.41 12 10.83l4.59 4.58L18 14l-6-6-6 6z"/></svg>
          ) : (
            <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M7.41 8.59 12 13.17l4.59-4.58L18 10l-6 6-6-6z"/></svg>
          )}
        </button>
      </div>
    </div>
  );
}
