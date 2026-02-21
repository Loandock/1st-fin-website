export interface LoanType {
  slug: string;
  name: string;
  shortName: string;
  tagline: string;
  description: string;
  minDownPayment: string;
  minCreditScore: string;
  maxDTI: string;
  features: string[];
  idealFor: string[];
  requirements: string[];
  pros: string[];
  cons: string[];
}

export const LOAN_TYPES: LoanType[] = [
  {
    slug: 'fha',
    name: 'FHA Loan',
    shortName: 'FHA',
    tagline: 'Low down payment. Flexible credit. Government-backed confidence.',
    description: 'FHA loans are insured by the Federal Housing Administration and designed for borrowers who may not qualify for conventional financing. They offer low down payments and more lenient credit requirements.',
    minDownPayment: '3.5%',
    minCreditScore: '580',
    maxDTI: '57%',
    features: [
      'Down payment as low as 3.5%',
      'Credit scores from 580 accepted',
      'Gift funds allowed for down payment',
      'Seller can contribute up to 6% toward closing costs',
      'Available for primary residences only',
    ],
    idealFor: [
      'First-time homebuyers',
      'Borrowers with limited savings',
      'Those rebuilding credit',
      'Buyers using gift funds for down payment',
    ],
    requirements: [
      'Minimum 580 credit score (3.5% down) or 500 (10% down)',
      'Steady employment history (2 years)',
      'Property must meet FHA appraisal standards',
      'Mortgage insurance premium (MIP) required',
      'Primary residence only',
    ],
    pros: ['Low down payment', 'Flexible credit requirements', 'Competitive interest rates', 'Assumable loans'],
    cons: ['Mortgage insurance required for life of loan', 'Property must meet FHA standards', 'Loan limits apply by county'],
  },
  {
    slug: 'va',
    name: 'VA Loan',
    shortName: 'VA',
    tagline: 'Zero down. No PMI. Built for those who served.',
    description: 'VA loans are guaranteed by the U.S. Department of Veterans Affairs and offer exceptional terms for eligible veterans, active-duty service members, and surviving spouses.',
    minDownPayment: '0%',
    minCreditScore: '580',
    maxDTI: '60%',
    features: [
      'No down payment required',
      'No private mortgage insurance (PMI)',
      'Competitive interest rates',
      'Limited closing costs',
      'No prepayment penalties',
    ],
    idealFor: [
      'Veterans and active-duty military',
      'National Guard and Reserve members',
      'Eligible surviving spouses',
      'Those seeking $0 down financing',
    ],
    requirements: [
      'Certificate of Eligibility (COE) required',
      'Meet minimum service requirements',
      'Property must be primary residence',
      'VA funding fee applies (can be financed)',
      'Meet lender credit and income requirements',
    ],
    pros: ['No down payment', 'No PMI', 'Lower interest rates', 'Flexible qualification'],
    cons: ['VA funding fee required', 'Primary residence only', 'Must meet service requirements'],
  },
  {
    slug: 'conventional',
    name: 'Conventional Loan',
    shortName: 'Conventional',
    tagline: 'Flexible terms. Competitive rates. The standard in home financing.',
    description: 'Conventional loans are not backed by a government agency. They offer flexible terms and are ideal for borrowers with good credit and stable income who want more options.',
    minDownPayment: '3%',
    minCreditScore: '620',
    maxDTI: '50%',
    features: [
      'Down payment as low as 3%',
      'PMI removable at 80% LTV',
      'Available for primary, second homes, and investment properties',
      'Fixed and adjustable rate options',
      'Higher loan limits than government programs',
    ],
    idealFor: [
      'Borrowers with good to excellent credit',
      'Those buying second homes or investment properties',
      'Buyers wanting PMI removal flexibility',
      'Higher-income borrowers',
    ],
    requirements: [
      'Minimum 620 credit score',
      'Stable income and employment',
      'Down payment of 3-20%+',
      'PMI required if less than 20% down',
      'Debt-to-income ratio within guidelines',
    ],
    pros: ['PMI can be removed', 'Flexible property types', 'Multiple term options', 'No upfront funding fees'],
    cons: ['Higher credit requirements', 'PMI if less than 20% down', 'Stricter DTI requirements'],
  },
  {
    slug: 'non-qm',
    name: 'Non-QM Loan',
    shortName: 'Non-QM',
    tagline: 'Outside the box. Custom solutions for unique financial profiles.',
    description: 'Non-QM (Non-Qualified Mortgage) loans are designed for borrowers who don\'t fit traditional lending criteria. They use alternative documentation methods like bank statements, asset depletion, or DSCR.',
    minDownPayment: '10%',
    minCreditScore: '620',
    maxDTI: '50%',
    features: [
      'Bank statement income verification (12 or 24 months)',
      'Asset depletion programs available',
      'Interest-only options',
      'Recent credit events considered',
      'Foreign national programs available',
    ],
    idealFor: [
      'Self-employed borrowers',
      'Business owners with complex tax returns',
      'Real estate investors',
      'Foreign nationals',
      'Borrowers with recent credit events',
    ],
    requirements: [
      'Minimum 620 credit score (varies by program)',
      '10-25% down payment typical',
      'Bank statements or alternative documentation',
      'Reserves required (varies)',
      'Higher interest rates than conventional',
    ],
    pros: ['Flexible income documentation', 'Self-employed friendly', 'Recent credit events OK', 'Multiple program options'],
    cons: ['Higher interest rates', 'Larger down payment needed', 'Higher reserves required'],
  },
  {
    slug: 'dscr',
    name: 'DSCR Loan',
    shortName: 'DSCR',
    tagline: 'Income from the property. Qualify on cash flow, not W-2s.',
    description: 'DSCR (Debt Service Coverage Ratio) loans qualify based on the property\'s rental income rather than the borrower\'s personal income. Ideal for real estate investors building a portfolio.',
    minDownPayment: '15%',
    minCreditScore: '620',
    maxDTI: 'N/A',
    features: [
      'Qualify on property cash flow, not personal income',
      'No tax returns or pay stubs required',
      'Unlimited properties',
      'LLC and entity vesting allowed',
      'Short-term rental income accepted',
    ],
    idealFor: [
      'Real estate investors',
      'Portfolio builders',
      'Short-term rental operators',
      'Self-employed investors',
      'Those with multiple financed properties',
    ],
    requirements: [
      'DSCR ratio of 1.0+ preferred (property income ≥ expenses)',
      'Minimum 620 credit score',
      '15-25% down payment',
      'Investment property only',
      'Appraisal with rental analysis required',
    ],
    pros: ['No personal income verification', 'Unlimited properties', 'Entity vesting OK', 'Scalable for portfolios'],
    cons: ['Higher rates than conventional', 'Larger down payment', 'Investment property only'],
  },
  {
    slug: 'usda',
    name: 'USDA Loan',
    shortName: 'USDA',
    tagline: 'Zero down in eligible rural and suburban areas.',
    description: 'USDA loans are backed by the U.S. Department of Agriculture and offer 100% financing for eligible properties in designated rural and suburban areas.',
    minDownPayment: '0%',
    minCreditScore: '640',
    maxDTI: '41%',
    features: [
      'No down payment required',
      'Below-market interest rates',
      'Low mortgage insurance costs',
      'Closing costs can be financed or paid by seller',
      'Available in eligible rural and suburban areas',
    ],
    idealFor: [
      'Buyers in rural and suburban areas',
      'Low-to-moderate income households',
      'First-time and repeat homebuyers',
      'Those seeking $0 down options outside VA',
    ],
    requirements: [
      'Property must be in USDA-eligible area',
      'Household income within USDA limits (115% of area median)',
      'Minimum 640 credit score recommended',
      'Primary residence only',
      'Guarantee fee required (can be financed)',
    ],
    pros: ['No down payment', 'Low interest rates', 'Low insurance costs', 'Seller can pay closing costs'],
    cons: ['Geographic restrictions', 'Income limits apply', 'Primary residence only', 'Guarantee fee required'],
  },
  {
    slug: 'jumbo',
    name: 'Jumbo Loan',
    shortName: 'Jumbo',
    tagline: 'Financing beyond conforming limits for luxury and high-value homes.',
    description: 'Jumbo loans exceed the conforming loan limits set by the FHFA and are designed for financing high-value properties. They require strong credit and financials.',
    minDownPayment: '10%',
    minCreditScore: '700',
    maxDTI: '43%',
    features: [
      'Loan amounts exceeding conforming limits',
      'Available for primary, second homes, and investment',
      'Fixed and adjustable rate options',
      'Interest-only options available',
      'Competitive rates for qualified borrowers',
    ],
    idealFor: [
      'Luxury home buyers',
      'High-net-worth individuals',
      'Buyers in high-cost markets',
      'Those needing loans above $766,550 (2024 limit)',
    ],
    requirements: [
      'Minimum 700 credit score',
      '10-20%+ down payment',
      'Significant cash reserves (6-12 months)',
      'Full income documentation',
      'Lower DTI ratio preferred',
    ],
    pros: ['Finance luxury properties', 'Competitive rates for strong borrowers', 'Flexible property types', 'High loan amounts'],
    cons: ['Higher credit requirements', 'Larger down payment', 'More reserves needed', 'Stricter underwriting'],
  },
  {
    slug: 'bank-statement',
    name: 'Bank Statement Loan',
    shortName: 'Bank Statement',
    tagline: 'Your deposits tell your story. No tax returns needed.',
    description: 'Bank statement loans use 12 or 24 months of personal or business bank statements to verify income instead of tax returns. Perfect for self-employed borrowers whose tax deductions reduce their reported income.',
    minDownPayment: '10%',
    minCreditScore: '620',
    maxDTI: '50%',
    features: [
      '12 or 24 month bank statements for income',
      'Personal or business bank statements accepted',
      'No tax returns required',
      'Higher loan amounts available',
      'Self-employed friendly',
    ],
    idealFor: [
      'Self-employed individuals',
      'Small business owners',
      'Freelancers and contractors',
      'Those with significant tax write-offs',
      'Entrepreneurs with strong deposits',
    ],
    requirements: [
      '12 or 24 months of consecutive bank statements',
      'Minimum 620 credit score',
      '10-20% down payment',
      'CPA letter may be required',
      'Business must be operating 2+ years',
    ],
    pros: ['No tax returns', 'True income reflected', 'Self-employed friendly', 'Flexible documentation'],
    cons: ['Higher interest rates', 'Larger down payment', 'Expense factor applied to deposits'],
  },
];

export function getLoanTypeBySlug(slug: string): LoanType | undefined {
  return LOAN_TYPES.find((lt) => lt.slug === slug);
}

export function getAllSlugs(): string[] {
  return LOAN_TYPES.map((lt) => lt.slug);
}
