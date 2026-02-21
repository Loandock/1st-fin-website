import { useMemo } from 'react';
import type { DpaProgramId } from '../../dpa/programs';

export type HudData = {
  areaName: string;
  year: number;
  mfi: number;
  rows: Record<'30' | '50' | '80', number[]>;
};

type Props = {
  data: HudData;
  computed: null | { '100': number[]; '120': number[]; '140': number[] };
  hudFamilySize: number;
  setHudFamilySize: (n: number) => void;
  hudPct: '30' | '50' | '80' | '100' | '120' | '140';
  setHudPct: (p: '30' | '50' | '80' | '100' | '120' | '140') => void;
  hudMonthly: boolean;
  setHudMonthly: (b: boolean) => void;
  hudShowTable: boolean;
  setHudShowTable: (u: (v: boolean) => boolean) => void;
  dpaProgram: DpaProgramId | '';
  loading?: boolean;
};

export default function HudResultsTable({
  data,
  computed,
  hudFamilySize,
  setHudFamilySize,
  hudPct,
  setHudPct,
  hudMonthly,
  setHudMonthly,
  hudShowTable,
  setHudShowTable,
  dpaProgram,
  loading,
}: Props) {
  const header = useMemo(() => (
    <div className="text-sm">
      <div className="font-medium">{data.areaName} — FY{data.year}</div>
      <div className="text-gray-400">Median Family Income (MFI): ${data.mfi.toLocaleString()}</div>
    </div>
  ), [data]);

  return (
    <>
      {header}

      {/* Compact Focus Panel */}
      <div className="grid gap-4 md:grid-cols-6 items-start">
        <div className="md:col-span-2">
          <div className="text-[11px] text-gray-400 mb-1">Family Size: <span className="text-gray-200 font-medium">{hudFamilySize}</span></div>
          <input type="range" min={1} max={8} value={hudFamilySize} onChange={(e)=>setHudFamilySize(parseInt(e.target.value))} className="w-full" />
          <div className="flex justify-between text-[10px] text-gray-500 mt-1">
            {Array.from({length:8}, (_,i)=> <span key={i}>{i+1}</span>)}
          </div>
        </div>
        {dpaProgram === 'Tamarac DPA' && (
          <div className="md:col-span-2">
            <div className="text-[11px] text-gray-400 mb-1">Allowable Program AMI Tiers</div>
            <div className="rounded-xl border border-gray-700 bg-gray-900/40 p-2">
              <div className="inline-flex w-full items-center justify-center gap-1 rounded-full bg-transparent px-1 py-1">
                {(['50','80','100','120'] as Array<'50'|'80'|'100'|'120'>).map(p => (
                  <button
                    key={p}
                    onClick={()=>setHudPct(p as any)}
                    className={`px-3 py-1.5 rounded-full text-sm transition-colors ${
                      hudPct === p
                        ? 'bg-gradient-to-r from-purple-500 to-emerald-400 text-black shadow'
                        : 'text-gray-300 hover:bg-gray-800'
                    }`}
                  >
                    {p}%
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
        {dpaProgram === 'PHCD' && (
          <div className="md:col-span-2">
            <div className="text-[11px] text-gray-400 mb-1">Allowable Program AMI Tiers</div>
            <div className="rounded-xl border border-gray-700 bg-gray-900/40 p-2">
              <div className="inline-flex w-full items-center justify-center gap-1 rounded-full bg-transparent px-1 py-1">
                {(['30','50','80','100','120','140'] as Array<'30'|'50'|'80'|'100'|'120'|'140'>).map(p => (
                  <button
                    key={p}
                    onClick={()=>setHudPct(p as any)}
                    className={`px-3 py-1.5 rounded-full text-sm transition-colors ${
                      hudPct === p
                        ? 'bg-gradient-to-r from-purple-500 to-emerald-400 text-black shadow'
                        : 'text-gray-300 hover:bg-gray-800'
                    }`}
                  >
                    {p}%
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
        <div className="md:col-span-2">
          <div className="text-[11px] text-gray-400 mb-1">Display</div>
          <div className="rounded-xl border border-gray-700 bg-gray-900/40 p-2">
            <div className="inline-flex w-full items-center justify-center gap-1 rounded-full bg-transparent px-1 py-1">
              <button
                onClick={()=>setHudMonthly(false)}
                className={`px-3 py-1.5 rounded-full text-sm transition-colors ${
                  !hudMonthly ? 'bg-gradient-to-r from-purple-500 to-emerald-400 text-black shadow' : 'text-gray-300 hover:bg-gray-800'
                }`}
              >
                Annual
              </button>
              <button
                onClick={()=>setHudMonthly(true)}
                className={`px-3 py-1.5 rounded-full text-sm transition-colors ${
                  hudMonthly ? 'bg-gradient-to-r from-purple-500 to-emerald-400 text-black shadow' : 'text-gray-300 hover:bg-gray-800'
                }`}
              >
                Monthly
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Show full table toggle */}
      <div className="mt-3 flex items-center justify-between">
        <div className="text-[11px] text-gray-500">Tip: Use the controls above for quick answers. Reveal full table for all sizes and levels.</div>
        <button
          onClick={()=>setHudShowTable(v=>!v)}
          aria-pressed={hudShowTable}
          disabled={loading}
          className={`inline-flex items-center gap-2 text-sm px-4 py-2 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-purple-600 disabled:opacity-60 disabled:pointer-events-none bg-gradient-to-r ${
            hudShowTable
              ? 'from-emerald-400 to-purple-600 text-black hover:from-emerald-300 hover:to-purple-500'
              : 'from-purple-600 to-emerald-400 text-black hover:from-purple-500 hover:to-emerald-300'
          }`}
        >
          <span>{hudShowTable ? 'Hide Full Table' : 'Show Full Table'}</span>
          {hudShowTable ? (
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M7.41 15.41 12 10.83l4.59 4.58L18 14l-6-6-6 6z"/></svg>
          ) : (
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M7.41 8.59 12 13.17l4.59-4.58L18 10l-6 6-6-6z"/></svg>
          )}
        </button>
      </div>

      {hudShowTable && (
        <div className="mt-3 overflow-auto">
          <ILGrid
            rows={buildRows({ data, computed, hudMonthly })}
            highlightPct={computeHighlight({ dpaProgram, hudPct })}
            highlightColIndex={Math.min(Math.max(hudFamilySize - 1, 0), 7)}
          />
        </div>
      )}

      <div className="mt-3 text-[11px] text-gray-400">
        Note: HUD publishes 30/50/80% officially. 100/120/140% are derived from the 50% line for convenience.
      </div>
    </>
  );
}

function computeHighlight({ dpaProgram, hudPct }: { dpaProgram: DpaProgramId | ''; hudPct: Props['hudPct'] }) {
  if (dpaProgram === 'PHCD') {
    const valid = hudPct === '30' || hudPct === '50' || hudPct === '80' || hudPct === '100' || hudPct === '120' || hudPct === '140';
    return valid ? (hudPct as any) : '140';
  }
  if (dpaProgram === 'Tamarac DPA') {
    const isSupported = hudPct === '50' || hudPct === '80' || hudPct === '100' || hudPct === '120';
    return isSupported ? (hudPct as any) : '80';
  }
  if (dpaProgram === 'Broward County HPA') {
    // Support 30/50/80 universally; allow 100/120 when present (Hollywood shows extended tiers)
    const isSupported = hudPct === '30' || hudPct === '50' || hudPct === '80' || hudPct === '100' || hudPct === '120';
    return isSupported ? (hudPct as any) : '80';
  }
  return undefined;
}

function buildRows({ data, computed, hudMonthly }: { data: HudData; computed: Props['computed']; hudMonthly: boolean }) {
  const rows: GridRow[] = [
    { label: hudMonthly ? '30% (Monthly)' : '30%', values: (hudMonthly ? data.rows['30'].map(v=>Math.round(v/12)) : data.rows['30']) },
    { label: hudMonthly ? '50% (Monthly)' : '50%', values: (hudMonthly ? data.rows['50'].map(v=>Math.round(v/12)) : data.rows['50']) },
    { label: hudMonthly ? '80% (Monthly)' : '80%', values: (hudMonthly ? data.rows['80'].map(v=>Math.round(v/12)) : data.rows['80']) },
  ];
  if (computed) {
    rows.push(
      { label: hudMonthly ? '100% (Monthly)' : '100%', values: (hudMonthly ? computed['100'].map(v=>Math.round(v/12)) : computed['100']) },
      { label: hudMonthly ? '120% (Monthly)' : '120%', values: (hudMonthly ? computed['120'].map(v=>Math.round(v/12)) : computed['120']) },
      { label: hudMonthly ? '140% (Monthly)' : '140%', values: (hudMonthly ? computed['140'].map(v=>Math.round(v/12)) : computed['140']) },
    );
  }
  return rows;
}

// Internal grid renderer (extracted from page)
export type GridRow = { label: string; values?: number[] };

function ILGrid({ rows, highlightPct, highlightColIndex }: { rows: GridRow[]; highlightPct?: '30'|'50'|'80'|'100'|'120'|'140'; highlightColIndex?: number; }) {
  const header = Array.from({ length: 8 }, (_, i) => `Family Size ${i + 1}`);
  const baseCell = 'px-2 py-1 rounded text-sm min-w-[90px] text-center border';
  const normalCell = `${baseCell} bg-gray-800 border-gray-700`;
  const highlightCell = `${baseCell} bg-emerald-900/20 border-emerald-600 ring-1 ring-emerald-500/40`;
  const colHighlightCell = `${baseCell} bg-indigo-900/20 border-indigo-600 ring-1 ring-indigo-500/30`;
  const combinedCell = `${baseCell} bg-teal-900/40 border-teal-500 ring-2 ring-teal-400/60`;

  return (
    <div className="inline-block">
      <div className="grid grid-cols-9 gap-2 items-center mb-2">
        <div className="text-[11px] text-gray-400 pl-1 w-24 md:w-28">&nbsp;</div>
        {header.map((h, i) => {
          const isCol = typeof highlightColIndex === 'number' && i === highlightColIndex;
          return (
            <div key={i} className={`text-[11px] text-center min-w-[90px] ${isCol ? 'text-indigo-300' : 'text-gray-400'}`}>{h}</div>
          );
        })}
      </div>
      <div className="space-y-2">
        {rows.map((r) => {
          const isHighlight = highlightPct ? r.label.startsWith(highlightPct) : false;
          return (
            <div key={r.label} className="grid grid-cols-9 gap-2 items-center">
              <div className={`text-sm font-medium whitespace-nowrap w-24 md:w-28 ${isHighlight ? 'text-emerald-300' : 'text-gray-300'}`}>{r.label}</div>
              {Array.from({ length: 8 }, (_, i) => {
                const isCol = typeof highlightColIndex === 'number' && i === highlightColIndex;
                const cls = isHighlight && isCol
                  ? combinedCell
                  : isHighlight
                  ? highlightCell
                  : isCol
                  ? colHighlightCell
                  : normalCell;
                return (
                  <div key={i} className={cls}>
                    {r.values && r.values[i] ? `$${r.values[i].toLocaleString()}` : '—'}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
}
