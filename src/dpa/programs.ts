// src/dpa/programs.ts
export type AccentKey = 'phcd' | 'flAssist' | 'flHlp' | 'tamarac';

export type DpaProgramId =
  | 'PHCD'
  | 'FL Assist 10k Bond'
  | 'FL Assist 10k TBA'
  | 'FL HLP 12,500 Bond'
  | 'FL HLP 12,500 TBA'
  | 'Hometown Heroes Bond'
  | 'Hometown Heroes TBA'
  | 'Broward County HPA'
  | 'FL Plus TBA 3% 4% 5%'
  | 'Tamarac DPA'
  | 'Custom DPA Amount';

export interface DpaProgramDef {
  id: DpaProgramId;
  label: string;
  accent: AccentKey;
  note?: string;
  assistanceAmount: string;
  assistanceSub?: string;
  terms: string[];
  eligibility: string[];
  tags: string[];
  gating?: {
    requiresFlorida?: boolean;
    countyRegex?: RegExp; // enable only if county matches
  };
  amiNote?: string; // show AMI tiers/info block if present
}

export const DPA_PROGRAMS: DpaProgramDef[] = [
  {
    id: 'PHCD',
    label: 'PHCD',
    accent: 'phcd',
    note: 'Not limited to first-time buyers • Buyer min. 1% • Income up to 140% AMI',
    assistanceAmount: '$80,000 / $100,000 (Red Zone) + $35,000 DPA',
    assistanceSub: '2% at 30-yr amortization • 1% in Red Zone • DPA 0% deferred',
    terms: [
      'May be combined with HLP',
      'Amounts due upon sale, transfer, refi, payoff, or non-occupancy',
      'Estimated timeline ≥ 60 days',
    ],
    eligibility: [
      'Income ≤ 140% AMI (see table)',
      'Buyer minimum 1% contribution',
      'Not limited to first-time buyers',
    ],
    tags: ['140% AMI', '1% buyer', '0% deferred DPA', '≈60+ days'],
    gating: { countyRegex: /miami-?dade/i },
  },
  {
    id: 'Broward County HPA',
    label: 'Broward County HPA',
    accent: 'tamarac',
    note: 'City-specific assistance • Buyer min. 3% contribution',
    assistanceAmount: 'City-specific: $40k–$120k',
    assistanceSub: '0% interest • Non-amortizing • Deferred • Forgiven after 15 years',
    terms: [
      'Forgiven after 15 years of continuous occupancy',
      'Repayment due upon sale, transfer, refinance, or non-occupancy',
      'City-specific assistance amounts',
    ],
    eligibility: [
      'First-time homebuyer required',
      'Buyer minimum 3% contribution',
      'Income and price limits vary by city',
    ],
    tags: ['Broward', 'City-specific', '3% buyer', 'Forgivable 15 yrs'],
    gating: { countyRegex: /broward/i },
  },
  {
    id: 'FL Assist 10k Bond',
    label: 'FL Assist 10k Bond',
    accent: 'flAssist',
    note: 'Household income (all occupants) used to qualify • Works with FHA/VA/USDA/Conventional',
    assistanceAmount: 'Up to $10,000',
    assistanceSub: '0% interest • Non-amortizing • Deferred',
    terms: [
      'Repayment due upon sale, transfer, refinance, payoff, or non-occupancy',
      'County price & income limits apply',
    ],
    eligibility: [
      'Min credit score 640',
      'Homebuyer education required',
      'IRS first-time buyer: no owned-and-occupied primary in past 3 years',
      'Veterans are exempt from the first-time buyer requirement',
    ],
    tags: ['640+ score', 'Education req.', 'Deferred', 'County limits'],
    gating: { requiresFlorida: true },
  },
  {
    id: 'FL Assist 10k TBA',
    label: 'FL Assist 10k TBA',
    accent: 'flAssist',
    note: 'Application income used to qualify • Works with FHA/VA/USDA/Conventional',
    assistanceAmount: 'Up to $10,000',
    assistanceSub: '0% interest • Non-amortizing • Deferred',
    terms: [
      'Repayment due upon sale, transfer, refinance, payoff, or non-occupancy',
      'County price & income limits apply',
    ],
    eligibility: [
      'Min credit score 640',
      'Homebuyer education required',
      'IRS first-time buyer: no owned-and-occupied primary in past 3 years',
      'Veterans are exempt from the first-time buyer requirement',
    ],
    tags: ['640+ score', 'Education req.', 'Deferred', 'County limits'],
    gating: { requiresFlorida: true },
  },
  {
    id: 'FL HLP 12,500 Bond',
    label: 'FL HLP 12,500 Bond',
    accent: 'flHlp',
    note: 'Household income used  (all occupants) used to qualify • Works with FHA/VA/USDA/Conventional',
    assistanceAmount: 'Up to $12,500',
    assistanceSub: '3% • 30-year amortizing payment',
    terms: [
      '$53 Monthly payment; remaining UPB due upon sale/transfer/refi/payoff/non-occupancy',
      'County price & income limits apply',
    ],
    eligibility: [
      'Min credit score 640',
      'Homebuyer education required',
      'IRS first-time buyer rule (3-year)',
      'Veterans are exempt from the first-time buyer requirement',
    ],
    tags: ['640+ score', 'Education req.', 'Deferred', 'County limits'],
    gating: { requiresFlorida: true },
    amiNote: 'Varies by county — uses application income; no fixed HUD % tiers.',
  },
  {
    id: 'FL HLP 12,500 TBA',
    label: 'FL HLP 12,500 TBA',
    accent: 'flHlp',
    note: 'Application income used to qualify • Works with FHA/VA/USDA/Conventional',
    assistanceAmount: 'Up to $12,500',
    assistanceSub: '3% • 30-year amortizing payment',
    terms: [
      '$53 Monthly payment; remaining UPB due upon sale/transfer/refi/payoff/non-occupancy',
      'County price & income limits apply',
    ],
    eligibility: [
      'Min credit score 640',
      'Homebuyer education required',
      'IRS first-time buyer rule (3-year)',
      'Veterans are exempt from the first-time buyer requirement',
    ],
    tags: ['640+ score', 'Education req.', 'Deferred', 'County limits'],
    gating: { requiresFlorida: true },
    amiNote: 'Varies by county — uses application income; no fixed HUD % tiers.',
  },
  {
    id: 'Hometown Heroes Bond',
    label: 'Hometown Heroes Bond',
    accent: 'flAssist',
    note: 'Household income (all occupants) used to qualify • Works with FHA/VA/USDA/Conventional',
    assistanceAmount: '5% of loan amount up to $35,000',
    assistanceSub: '0% interest • Non-amortizing • Deferred',
    terms: [
      'Repayment due upon sale, transfer, refinance, payoff, or non-occupancy',
      'County price & income limits apply',
    ],
    eligibility: [
      'Min credit score 640',
      'Homebuyer education required',
      'Borrower(s) must be employed full-time in an eligible occupation by a Florida-based employer with a physical Florida location, and must work from or report to that location.',
      'IRS first-time buyer: no owned-and-occupied primary in past 3 years',
      'Veterans are exempt from the first-time buyer requirement',
    ],
    tags: ['640+ score', 'Education req.', 'Deferred', 'County limits'],
    gating: { requiresFlorida: true },
  },
  {
    id: 'Hometown Heroes TBA',
    label: 'Hometown Heroes TBA',
    accent: 'flAssist',
    note: 'Application income used to qualify • Works with FHA/VA/USDA/Conventional',
    assistanceAmount: '5% of loan amount up to $35,000',
    assistanceSub: '0% interest • Non-amortizing • Deferred',
    terms: [
      'Repayment due upon sale, transfer, refinance, payoff, or non-occupancy',
      'County price & income limits apply',
    ],
    eligibility: [
      'Min credit score 640',
      'Homebuyer education required',
      'Borrower(s) must be employed full-time in an eligible occupation by a Florida-based employer with a physical Florida location, and must work from or report to that location.',
      'IRS first-time buyer: no owned-and-occupied primary in past 3 years',
      'Veterans are exempt from the first-time buyer requirement',
    ],
    tags: ['640+ score', 'Education req.', 'Deferred', 'County limits'],
    gating: { requiresFlorida: true },
  },
  {
    id: 'FL Plus TBA 3% 4% 5%',
    label: 'FL Plus TBA 3% 4% 5%',
    accent: 'flAssist',
    note: 'Application income used to qualify • Works with Conventional ONLY',
    assistanceAmount: '3% • 4% • 5% of loan amount',
    assistanceSub: '0% interest • Non-amortizing • Forgiven 20% per year (fully forgiven after 5 years)',
    terms: [
      'Forgiven 20% per year; fully forgiven after 5 years',
      'County price & income limits apply',
    ],
    eligibility: [
      'Min credit score 640',
      'Homebuyer education required',
      'IRS first-time buyer: no owned-and-occupied primary in past 3 years',
      'Veterans are exempt from the first-time buyer requirement',
    ],
    tags: ['640+ score', 'Education req.', 'Forgivable 5 yrs', 'County limits'],
    gating: { requiresFlorida: true },
  },
  {
    id: 'Tamarac DPA',
    label: 'Tamarac DPA',
    accent: 'tamarac',
    note: 'Assistance varies by AMI tier • Buyer min. 1% contribution • No cash back',
    assistanceAmount: '$85k • $75k • $40k',
    assistanceSub: '50% AMI • 80% AMI • 120% AMI',
    terms: [
      'Forgiven after 15 years',
      '2% cap on fees',
      'Max price $450,000',
      'No cash back to buyer',
    ],
    eligibility: [
      'First-time homebuyer required',
      'No minimum credit score',
      'Buyer minimum 1% contribution',
      'Assets ≤ $100k (last 6 months)',
    ],
    tags: ['50/80/120% AMI tiers', '1% buyer', 'No cash back', 'Forgivable 15 yrs'],
    gating: { countyRegex: /broward/i },
  },
  {
    id: 'Custom DPA Amount',
    label: 'Custom DPA Amount',
    accent: 'flAssist',
    note: 'Enter a custom down payment assistance amount for other programs or scenarios',
    assistanceAmount: 'Custom',
    terms: [
      'User-defined assistance amount',
      'Respects 105% CLTV limit',
    ],
    eligibility: [
      'For programs not listed or special circumstances',
    ],
    tags: ['Custom', 'Flexible'],
  },
];

export function getProgramById(id?: string | null): DpaProgramDef | undefined {
  if (!id) return undefined;
  return DPA_PROGRAMS.find(p => p.id === id);
}

export function isProgramEnabled(p: DpaProgramDef, countyState: string, countyName: string): boolean {
  if (p.gating?.requiresFlorida && countyState !== 'FL') return false;
  if (p.gating?.countyRegex && !p.gating.countyRegex.test(countyName)) return false;
  return true;
}
