import { getProgramById, type DpaProgramId } from '../../dpa/programs';
import ProgramShell, { AssistanceBlock, SectionCard } from './ui';
import BrowardHpa from './BrowardHpa';

export default function ProgramDetails({ dpaProgram, hudPct, setHudPct, hudShowTable: _hudShowTable, setHudShowTable }: { dpaProgram: DpaProgramId | ''; hudPct?: number | string; setHudPct?: (n: number | string) => void; hudShowTable?: boolean; setHudShowTable?: (b: boolean) => void }) {
  if (!dpaProgram) return null;
  const def = getProgramById(dpaProgram);
  if (!def) return null;
  if (def.id === 'Broward County HPA') {
    const pctNum = typeof hudPct === 'string' ? parseInt(hudPct, 10) : hudPct;
    const onChange = (n: number) => {
      if (setHudShowTable) setHudShowTable(true);
      if (setHudPct) (setHudPct as any)(String(n));
    };
    return <BrowardHpa currentAmiPct={pctNum} onChangeAmiPct={onChange} />;
  }
  return (
    <>
      <ProgramShell
        accent={def.accent as any}
        title={`${def.label} — Highlights`}
        note={def.note}
        columns={
          <>
            <AssistanceBlock amount={def.assistanceAmount} sub={def.assistanceSub} />
            <SectionCard title="Program Terms">
              <ul className="space-y-1 list-disc pl-4">
                {def.terms.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </SectionCard>
            <SectionCard title="Eligibility">
              <ul className="space-y-1 list-disc pl-4">
                {def.eligibility.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </SectionCard>
          </>
        }
        tags={def.tags}
      />
      {def.amiNote && (
        <div className="md:col-span-2">
          <div className="text-[11px] text-gray-400 mb-1">Allowable Program AMI Tiers</div>
          <div className="rounded-xl border border-gray-700 bg-gray-900/40 p-2 text-center text-xs text-gray-300">{def.amiNote}</div>
        </div>
      )}
    </>
  );
}
