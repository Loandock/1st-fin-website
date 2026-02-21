import React from 'react';
import ProgramShell, { AssistanceBlock, SectionCard } from './ui';
import type { BrowardHpaConfig, BrowardCityKey } from '../../dpa/browardHpa.schema';
import cfgJson from '../../data/broward-hpa.json';

const cfg = cfgJson as unknown as BrowardHpaConfig;

function CitySelector({ cities, values, onChange }: { cities: string[]; values: string[]; onChange: (vals: string[]) => void }) {
  const [q, setQ] = React.useState('');
  const list = React.useMemo(() => cities.filter((c) => c.toLowerCase().includes(q.toLowerCase())), [cities, q]);
  const toggle = (c: string) => {
    const sel = new Set(values);
    if (sel.has(c)) sel.delete(c);
    else {
      if (sel.size >= 2) {
        // replace the second selection to keep max 2
        const first = Array.from(sel)[0];
        onChange([first, c]);
        return;
      }
      sel.add(c);
    }
    onChange(Array.from(sel));
  };
  return (
    <div className="space-y-2">
      <input
        className="w-full rounded-md bg-white/5 border border-white/10 px-3 py-2 text-sm"
        placeholder="Search city..."
        value={q}
        onChange={(e) => setQ(e.target.value)}
      />
      <div className="max-h-44 overflow-auto pr-1">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
          {list.map((c) => (
            <button
              key={c}
              onClick={() => toggle(c)}
              className={`w-full inline-flex justify-center px-3 py-1.5 rounded-full text-sm border transition-colors ${
                values.includes(c)
                  ? 'border-amber-400 bg-amber-400/10 text-amber-200'
                  : 'border-white/10 bg-white/5 text-gray-200 hover:border-white/20'
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>
      <div className="text-[11px] text-gray-400">Select up to 2 cities to compare.</div>
    </div>
  );
}

function BrowardHpaCard({ cfg, city }: { cfg: BrowardHpaConfig; city: BrowardCityKey }) {
  const c = cfg.cities[city];
  const ami = c.amiLimitPct ?? cfg.defaults.amiLimitPct;
  const maxPrice = c.maxSalesPrice ?? cfg.defaults.maxSalesPrice;

  return (
    <ProgramShell
      accent="tamarac"
      title={`Broward County HPA — ${city}`}
      note="County-wide program with city-specific assistance & a few exceptions"
      columns={
        <>
          <AssistanceBlock amount={`$${c.assistance.toLocaleString()}`} sub="0% interest • Non-amortizing • Deferred • Forgiven after 15 years" />
          <SectionCard title="Program Terms">
            <ul className="space-y-1 list-disc pl-4">
              {cfg.terms.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </SectionCard>
          <SectionCard title="Eligibility">
            <ul className="space-y-1 list-disc pl-4">
              {cfg.eligibility.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </SectionCard>
        </>
      }
      tags={[`AMI limit ${ami}%`, `Max price $${maxPrice.toLocaleString()}`, 'Cosigner allowed']}
    />
  );
}

export default function BrowardHpa({ currentAmiPct, onChangeAmiPct }: { currentAmiPct?: number; onChangeAmiPct?: (n: number) => void }) {
  const cities = React.useMemo(() => Object.keys(cfg.cities) as BrowardCityKey[], []);

  // deep link sync (?city=Hollywood)
  const params = new URLSearchParams(typeof window !== 'undefined' ? window.location.search : undefined);
  const qsCity = (params.get('city') || '') as BrowardCityKey;
  const initialCity = cities.includes(qsCity) ? qsCity : (cities[0] as BrowardCityKey);

  const [selected, setSelected] = React.useState<BrowardCityKey[]>([initialCity]);

  const updateQs = (city: string) => {
    if (typeof window === 'undefined') return;
    const p = new URLSearchParams(window.location.search);
    p.set('city', city);
    const url = `${window.location.pathname}?${p.toString()}`;
    window.history.replaceState({}, '', url);
  };

  const onChangeSelected = (vals: string[]) => {
    const valid = vals.filter((v) => (Object.keys(cfg.cities) as string[]).includes(v)) as BrowardCityKey[];
    // keep only first two
    const next = valid.slice(0, 2);
    setSelected(next);
    if (next[0]) updateQs(next[0]);
  };

  const compare = selected[1];

  // local selected AMI tier per city (visual selection only)
  const [selectedTier, setSelectedTier] = React.useState<Record<string, number>>({});
  // keep local in sync with external HUD pct for the primary city
  React.useEffect(() => {
    if (!selected[0] || typeof currentAmiPct !== 'number') return;
    setSelectedTier((prev) => ({ ...prev, [selected[0]]: currentAmiPct }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentAmiPct, selected[0]]);
  const getTier = (city: BrowardCityKey) => selectedTier[city] ?? (cfg.cities[city].amiLimitPct ?? cfg.defaults.amiLimitPct);
  const setTier = (city: BrowardCityKey, tier: number) => {
    setSelectedTier((prev) => ({ ...prev, [city]: tier }));
    if (onChangeAmiPct && city === selected[0]) onChangeAmiPct(tier);
  };

  // Helpers: available tiers per city and closest tier selection
  const getAvailableTiers = (city: BrowardCityKey): number[] => {
    const c = cfg.cities[city];
    const limit = c.amiLimitPct ?? cfg.defaults.amiLimitPct;
    const base = [30, 50, 80];
    return limit >= 120 ? [...base, 100, 120] : base;
  };
  const closestTier = (target: number, tiers: number[]): number => {
    return tiers.reduce((best, cur) => (Math.abs(cur - target) < Math.abs(best - target) ? cur : best), tiers[0]);
  };

  return (
    <div className="space-y-4">
      <div>
        <div className="text-xs text-gray-400 mb-1">Select City (choose up to 2 to compare)</div>
        <CitySelector cities={cities} values={selected} onChange={onChangeSelected} />
      </div>

      <div className={`grid gap-4 ${compare ? 'md:grid-cols-2' : 'grid-cols-1'}`}>
        {/* Primary card + AMI tiers block */}
        {selected[0] && (
          <div className="space-y-2">
            <BrowardHpaCard cfg={cfg} city={selected[0]} />
            <AmiTiersBlock
              cfg={cfg}
              city={selected[0]}
              selected={getTier(selected[0])}
              onSelect={(t) => {
                // Select for primary; set closest match on compare (if present)
                setTier(selected[0], t);
                if (compare) {
                  const tiers = getAvailableTiers(compare);
                  const match = closestTier(t, tiers);
                  setSelectedTier((prev) => ({ ...prev, [compare]: match }));
                }
                // HUD highlight driven via onChangeAmiPct (handled in setTier for primary)
              }}
            />
          </div>
        )}
        {/* Compare card + AMI tiers block */}
        {compare && (
          <div className="space-y-2">
            <BrowardHpaCard cfg={cfg} city={compare} />
            <AmiTiersBlock
              cfg={cfg}
              city={compare}
              selected={getTier(compare)}
              onSelect={(t) => {
                // Select for compare; set closest match on primary
                setSelectedTier((prev) => ({ ...prev, [compare]: t }));
                if (selected[0]) {
                  const tiers = getAvailableTiers(selected[0]);
                  const match = closestTier(t, tiers);
                  setSelectedTier((prev) => ({ ...prev, [selected[0]]: match }));
                }
                // Drive HUD table highlight from compare selection as well
                if (onChangeAmiPct) onChangeAmiPct(t);
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}

function AmiTiersBlock({ cfg, city, selected, onSelect }: { cfg: BrowardHpaConfig; city: BrowardCityKey; selected?: number; onSelect?: (t: number)=>void }) {
  const c = cfg.cities[city];
  const limit = c.amiLimitPct ?? cfg.defaults.amiLimitPct; // 80 default; Hollywood 120
  // Only show tiers present in the HUD table
  const baseTiers = [30, 50, 80] as const;
  const tiers = limit >= 120 ? ([...baseTiers, 100, 120] as const) : baseTiers;
  return (
    <div className="space-y-1">
      <div className="text-[11px] text-gray-400">Allowable Program AMI Tiers ({city})</div>
      <div className="w-full rounded-full border border-white/10 bg-white/5 p-1 flex items-center gap-1">
        {tiers.map((t) => (
          <button
            key={t}
            onClick={() => onSelect?.(t)}
            className={`flex-1 min-w-[56px] px-3 py-1 rounded-full text-sm border transition-colors text-center ${
              (selected ?? limit) === t
                ? 'border-purple-500 bg-gradient-to-r from-purple-600 to-emerald-400 text-black'
                : 'border-transparent bg-transparent text-gray-200 hover:bg-white/10'
            }`}
          >
            {t}%
          </button>
        ))}
      </div>
    </div>
  );
}
