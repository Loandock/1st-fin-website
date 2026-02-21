// src/dpa/browardHpa.schema.ts
export type BrowardCityKey =
  | 'Davie' | 'Coconut Creek' | 'Coral Springs' | 'Cooper City' | 'Dania Beach'
  | 'Hallandale Beach' | 'Hillsborough Beach' | 'Hollywood' | 'Lauderdale by the Sea'
  | 'Lauderdale Lakes' | 'Lazy Lake Village' | 'Margate' | 'North Lauderdale'
  | 'Lighthouse Point' | 'Oakland Park' | 'Parkland' | 'Pembroke Park' | 'Plantation'
  | 'Sea Ranch Lakes' | 'Southwest Ranches' | 'Sunrise' | 'Weston' | 'West Park'
  | 'Wilton Manors' | 'Unincorporated Broward (BMSD)';

export type BrowardHpaCity = {
  assistance: number;              // e.g., 80000
  amiLimitPct?: 80 | 120;          // default 80; Hollywood 120
  maxSalesPrice?: number;          // default 568557; Weston 817000
  notes?: string[];                // any optional footnotes
};

export type BrowardHpaConfig = {
  defaults: {
    amiLimitPct: 80;
    maxSalesPrice: 568557;
  };
  terms: string[];        // shared Program Terms bullets
  eligibility: string[];  // shared Eligibility bullets
  cities: Record<BrowardCityKey, BrowardHpaCity>;
};
