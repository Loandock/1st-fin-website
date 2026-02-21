import { type ReactNode } from 'react';

export type AccentKey = 'phcd' | 'flAssist' | 'flHlp' | 'tamarac';

const ACCENTS: Record<AccentKey, { bar: string; card: string; border: string; title: string; tag: string }> = {
  phcd:    { bar: "from-emerald-400 to-teal-500",   card: "from-emerald-950/40 to-gray-900/30", border: "border-emerald-700/40", title: "text-emerald-300",  tag: "border-emerald-500/30 text-emerald-200" },
  flAssist:{ bar: "from-amber-400 to-yellow-500",    card: "from-amber-950/35 to-gray-900/30",  border: "border-amber-700/40",  title: "text-amber-300",    tag: "border-amber-500/30 text-amber-200" },
  flHlp:   { bar: "from-sky-400 to-cyan-500",        card: "from-sky-950/35 to-gray-900/30",    border: "border-sky-700/40",    title: "text-sky-300",      tag: "border-sky-500/30 text-sky-200" },
  tamarac: { bar: "from-fuchsia-400 to-purple-500",  card: "from-fuchsia-950/35 to-gray-900/30",border: "border-fuchsia-700/40", title: "text-fuchsia-300",  tag: "border-fuchsia-500/30 text-fuchsia-200" }
};

export const Tag = ({ children, className }: { children: ReactNode; className?: string }) => (
  <span className={`px-3 py-1 text-[12px] rounded-full whitespace-nowrap ${className || 'border border-white/10 bg-white/5 text-indigo-100'}`}>{children}</span>
);

export const SectionCard = ({ title, children }: { title: string; children: ReactNode }) => (
  <div className="rounded-xl bg-black/20 border border-white/10 p-4 min-h-[170px] shadow-[inset_0_0_8px_rgba(255,255,255,0.05)]">
    <div className="text-[12px] uppercase tracking-wide text-indigo-300/90">{title}</div>
    <div className="mt-2 text-indigo-100 text-[13px] leading-relaxed">{children}</div>
  </div>
);

export const AssistanceBlock = ({ amount, sub }: { amount: string; sub?: string }) => (
  <div className="rounded-xl bg-black/20 border border-white/10 p-4 min-h-[170px] shadow-[inset_0_0_8px_rgba(255,255,255,0.05)]">
    <div className="text-[12px] uppercase tracking-wide text-indigo-300/90">Assistance Amount</div>
    <div className="mt-1 text-3xl font-extrabold text-white">{amount}</div>
    {sub && <div className="mt-1 text-[12px] text-indigo-300/80">{sub}</div>}
  </div>
);

export function ProgramShell({
  accent,
  title,
  note,
  columns,
  tags,
}: {
  accent: AccentKey;
  title: string;
  note?: string;
  columns: ReactNode;
  tags?: string[];
}) {
  const a = ACCENTS[accent];
  return (
    <div className={`mt-2 rounded-2xl border ${a.border} bg-gradient-to-b ${a.card} p-4 md:p-5`}>
      <div className={`h-1.5 rounded-t bg-gradient-to-r ${a.bar} mb-3`} />
      <div className="flex items-center gap-3 mb-2">
        <div className={`text-sm font-bold ${a.title}`}>{title}</div>
      </div>
      {note && <div className="text-[12px] text-indigo-200/80 mb-3">{note}</div>}
      <div className="grid md:grid-cols-3 gap-3">{columns}</div>
      {tags?.length ? (
        <div className="flex flex-wrap gap-2 mt-3">
          {tags.map((t) => (
            <Tag key={t} className={`${a.tag} bg-white/5`}>{t}</Tag>
          ))}
        </div>
      ) : null}
    </div>
  );
}

export default ProgramShell;
