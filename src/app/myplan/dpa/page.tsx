'use client';

import { useState, useMemo, useRef, Suspense, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import {
  CheckCircle2, ArrowRight, Calculator, Shield, Home,
  DollarSign, Send, Sparkles, ChevronDown, ChevronUp,
  Phone, Mail, MapPin, HelpCircle,
} from 'lucide-react';
import { useCounties } from '@/hooks/useCounties';
import { useHudLimits, type EntityResp } from '@/hooks/useHudLimits';
import { DPA_PROGRAMS, isProgramEnabled, type DpaProgramId } from '@/dpa/programs';
import ProgramDetails from '@/components/dpa/ProgramDetails';
import HudResultsTable from '@/components/dpa/HudResultsTable';

const PRIMARY = '#0D3F72';
const PRIMARY_LIGHT = '#267AB1';
const ACCENT = '#4A90B8';

function formatPhoneDisplay(value: string) {
  const digits = value.replace(/\D/g, '');
  const d = digits.slice(0, 10);
  if (d.length <= 3) return d;
  if (d.length <= 6) return `(${d.slice(0, 3)}) ${d.slice(3)}`;
  return `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}`;
}

export default function DpaPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-950" />}>
      <DpaContent />
    </Suspense>
  );
}

function DpaContent() {
  const searchParams = useSearchParams();
  const formRef = useRef<HTMLDivElement>(null);

  const utmParams = useMemo(() => ({
    utmSource: searchParams.get('utm_source'),
    utmMedium: searchParams.get('utm_medium'),
    utmCampaign: searchParams.get('utm_campaign'),
    utmContent: searchParams.get('utm_content'),
    utmTerm: searchParams.get('utm_term'),
    fbclid: searchParams.get('fbclid'),
  }), [searchParams]);

  // Form state
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // DPA Wizard state
  const [countyState, setCountyState] = useState('FL');
  const [countyName, setCountyName] = useState('');
  const [countyGeoid, setCountyGeoid] = useState('');
  const [dpaProgram, setDpaProgram] = useState<DpaProgramId | ''>('');
  const [dpaInfoOpen, setDpaInfoOpen] = useState(false);

  // HUD state
  const [hudFamilySize, setHudFamilySize] = useState(4);
  const [hudPct, setHudPct] = useState<'30' | '50' | '80' | '100' | '120' | '140'>('80');
  const [hudMonthly, setHudMonthly] = useState(false);
  const [hudShowTable, setHudShowTable] = useState(false);

  // Calculator state
  const [calcOpen, setCalcOpen] = useState(false);
  const [price, setPrice] = useState(350000);
  const [down, setDown] = useState(12250);
  const [rate, setRate] = useState(6.75);
  const [term, setTerm] = useState(30);

  const { countyList, countyLoading } = useCounties(countyState);
  const { data: hudData, loading: hudLoading, fetchLimits, clear: clearHud } = useHudLimits();

  const computed = useMemo(() => {
    if (!hudData) return null;
    const base50 = hudData.rows['50'];
    return {
      '100': base50.map((v) => Math.round(v * 2)),
      '120': base50.map((v) => Math.round(v * 2.4)),
      '140': base50.map((v) => Math.round(v * 2.8)),
    };
  }, [hudData]);

  const availablePrograms = useMemo(() => {
    return DPA_PROGRAMS.filter((p) => isProgramEnabled(p, countyState, countyName));
  }, [countyState, countyName]);

  const handleFetchLimits = useCallback(() => {
    const match = countyList.find((c) => c.name === countyName);
    if (match) {
      setCountyGeoid(match.geoid);
      fetchLimits(match.geoid);
    }
  }, [countyList, countyName, fetchLimits]);

  const handleClear = useCallback(() => {
    setCountyName('');
    setCountyGeoid('');
    setDpaProgram('');
    setDpaInfoOpen(false);
    setHudShowTable(false);
    clearHud();
  }, [clearHud]);

  const fmt = (n: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n);

  const calcResult = useMemo(() => {
    const loan = price - down;
    const monthlyRate = rate / 100 / 12;
    const months = term * 12;
    if (monthlyRate === 0 || loan <= 0) return { pi: 0, total: 0, loan, pmi: 0 };
    const pi = (loan * monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1);
    const pmi = down / price < 0.2 ? (loan * 0.005) / 12 : 0;
    const tax = (price * 0.012) / 12;
    const ins = 125;
    return { pi, total: pi + pmi + tax + ins, loan, pmi };
  }, [price, down, rate, term]);

  const scrollToForm = () => formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await fetch('/api/submit-myplan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName, lastName, email, phone,
          loanType: 'Down Payment Assistance',
          source: 'myplan/dpa',
          dpaProgram: dpaProgram || undefined,
          county: countyName || undefined,
          state: countyState || undefined,
          ...utmParams,
        }),
      });
      if (res.ok) {
        setSubmitted(true);
        if (typeof window !== 'undefined' && (window as any).fbq) {
          (window as any).fbq('track', 'Lead', { content_name: 'myplan_dpa' });
        }
      }
    } catch { /* handled */ } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 text-white">
        {/* Hero */}
        <section className="relative pt-36 sm:pt-40 pb-16 px-4 overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-20 left-1/4 w-96 h-96 rounded-full blur-3xl" style={{ background: PRIMARY }} />
            <div className="absolute bottom-10 right-1/4 w-72 h-72 rounded-full blur-3xl" style={{ background: ACCENT }} />
          </div>
          <div className="relative max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 text-sm mb-6">
              <DollarSign className="w-4 h-4" style={{ color: ACCENT }} />
              <span className="text-gray-300">Down Payment Assistance</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-6">
              Down Payment Assistance
              <span className="block text-2xl sm:text-3xl font-medium mt-3" style={{ color: ACCENT }}>
                Explore Florida&apos;s top DPA programs. Up to $100K+ available.
              </span>
            </h1>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-8">
              Florida offers some of the most generous down payment assistance programs in the country. Select your county and explore programs you may qualify for.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button onClick={scrollToForm} className="px-8 py-4 rounded-full font-bold text-lg text-white transition-all hover:scale-105 hover:shadow-2xl" style={{ background: `linear-gradient(135deg, ${PRIMARY}, ${PRIMARY_LIGHT})` }}>
                Check My Eligibility <ArrowRight className="inline w-5 h-5 ml-2" />
              </button>
              <Link href="/calculator" className="px-8 py-4 rounded-full font-bold text-lg border border-white/20 text-white hover:bg-white/5 transition-all">
                <Calculator className="inline w-5 h-5 mr-2" /> Payment Calculator
              </Link>
            </div>
          </div>
        </section>

        {/* DPA Wizard */}
        <section className="py-12 px-4">
          <div className="max-w-4xl mx-auto space-y-6">
            <h2 className="text-2xl font-bold text-center mb-8">
              <span style={{ color: ACCENT }}>Step 1:</span> Select Your County
            </h2>

            {/* State & County Selection */}
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 space-y-4">
              <div className="grid sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-1">State</label>
                  <select
                    value={countyState}
                    onChange={(e) => { setCountyState(e.target.value); setCountyName(''); setDpaProgram(''); }}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-blue-500 focus:outline-none text-white"
                  >
                    <option value="FL">Florida</option>
                    <option value="GA">Georgia</option>
                    <option value="TX">Texas</option>
                    <option value="NY">New York</option>
                    <option value="CA">California</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1">County</label>
                  <input
                    list="county-datalist"
                    value={countyName}
                    onChange={(e) => setCountyName(e.target.value)}
                    placeholder={countyLoading ? 'Loading...' : 'Select county...'}
                    disabled={countyLoading}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-blue-500 focus:outline-none text-white placeholder:text-gray-600"
                  />
                  <datalist id="county-datalist">
                    {countyList.map((c) => (
                      <option key={c.geoid} value={c.name} />
                    ))}
                  </datalist>
                </div>
                <div className="flex items-end gap-2">
                  <button
                    onClick={handleFetchLimits}
                    disabled={hudLoading || !countyList.find((c) => c.name === countyName)}
                    className="flex-1 py-3 rounded-xl font-bold text-black transition-all disabled:opacity-50"
                    style={{ background: ACCENT }}
                  >
                    {hudLoading ? 'Loading...' : 'Get Limits'}
                  </button>
                  <button
                    onClick={handleClear}
                    className="py-3 px-4 rounded-xl border border-white/20 text-gray-300 hover:bg-white/5"
                  >
                    Clear
                  </button>
                </div>
              </div>
              {countyLoading && (
                <div className="text-sm text-blue-300">Loading counties...</div>
              )}
            </div>

            {/* Program Selection */}
            {countyName && (
              <div className="rounded-2xl border border-white/10 bg-white/5 p-6 space-y-4">
                <h3 className="text-xl font-bold">
                  <span style={{ color: ACCENT }}>Step 2:</span> Choose a DPA Program
                </h3>
                <div className="flex flex-wrap gap-2">
                  <select
                    value={dpaProgram}
                    onChange={(e) => { setDpaProgram(e.target.value as DpaProgramId | ''); setDpaInfoOpen(!!e.target.value); }}
                    className="flex-1 min-w-[200px] px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-blue-500 focus:outline-none text-white"
                  >
                    <option value="">Select a Program...</option>
                    {DPA_PROGRAMS.map((p) => {
                      const enabled = isProgramEnabled(p, countyState, countyName);
                      return (
                        <option key={p.id} value={p.id} disabled={!enabled}>
                          {p.label} {!enabled ? '(not available)' : ''}
                        </option>
                      );
                    })}
                  </select>
                  <button
                    onClick={() => setDpaInfoOpen((v) => !v)}
                    disabled={!dpaProgram}
                    className="px-4 py-3 rounded-xl font-bold text-sm transition-all disabled:opacity-40"
                    style={dpaInfoOpen ? { background: `linear-gradient(135deg, ${PRIMARY}, ${ACCENT})`, color: 'black' } : { border: '1px solid rgba(255,255,255,0.2)', color: 'white' }}
                  >
                    {dpaInfoOpen ? 'Hide Details' : 'Show Details'}
                  </button>
                </div>
                <div className="text-sm text-gray-400">
                  {availablePrograms.length} program{availablePrograms.length !== 1 ? 's' : ''} available for {countyName || 'your area'}
                </div>
              </div>
            )}

            {/* Program Details */}
            {dpaInfoOpen && dpaProgram && (
              <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                <ProgramDetails
                  dpaProgram={dpaProgram}
                  hudPct={hudPct}
                  setHudPct={(v: any) => setHudPct(v)}
                  hudShowTable={hudShowTable}
                  setHudShowTable={(v: any) => setHudShowTable(v)}
                />
              </div>
            )}

            {/* HUD Income Limits */}
            {hudData && (
              <div className="rounded-2xl border border-white/10 bg-white/5 p-6 space-y-4">
                <h3 className="text-xl font-bold">
                  <span style={{ color: ACCENT }}>Income Limits</span> — {hudData.areaName}
                </h3>
                <HudResultsTable
                  data={hudData}
                  computed={computed}
                  hudFamilySize={hudFamilySize}
                  setHudFamilySize={setHudFamilySize}
                  hudPct={hudPct}
                  setHudPct={setHudPct}
                  hudMonthly={hudMonthly}
                  setHudMonthly={setHudMonthly}
                  hudShowTable={hudShowTable}
                  setHudShowTable={setHudShowTable as any}
                  dpaProgram={dpaProgram}
                  loading={hudLoading}
                />
              </div>
            )}
          </div>
        </section>

        {/* Inline Calculator */}
        <section className="py-8 px-4">
          <div className="max-w-3xl mx-auto">
            <button
              onClick={() => setCalcOpen(!calcOpen)}
              className="w-full flex items-center justify-between p-6 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/8 transition-colors"
            >
              <div className="flex items-center gap-3">
                <Calculator className="w-6 h-6" style={{ color: ACCENT }} />
                <span className="text-xl font-bold">Quick Payment Estimate</span>
              </div>
              {calcOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
            </button>
            {calcOpen && (
              <div className="mt-4 p-6 rounded-2xl border border-white/10 bg-white/5 space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Home Price</label>
                    <input type="range" min={100000} max={2000000} step={10000} value={price} onChange={(e) => setPrice(+e.target.value)} className="w-full accent-blue-500" />
                    <div className="text-right text-lg font-bold mt-1">{fmt(price)}</div>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Down Payment</label>
                    <input type="range" min={0} max={price * 0.5} step={5000} value={down} onChange={(e) => setDown(+e.target.value)} className="w-full accent-blue-500" />
                    <div className="text-right text-lg font-bold mt-1">{fmt(down)} ({((down / price) * 100).toFixed(1)}%)</div>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Interest Rate</label>
                    <input type="range" min={3} max={12} step={0.125} value={rate} onChange={(e) => setRate(+e.target.value)} className="w-full accent-blue-500" />
                    <div className="text-right text-lg font-bold mt-1">{rate.toFixed(3)}%</div>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Loan Term</label>
                    <div className="flex gap-3">
                      {[15, 20, 25, 30].map((t) => (
                        <button key={t} onClick={() => setTerm(t)} className={`flex-1 py-2 rounded-lg text-sm font-bold transition-colors ${term === t ? 'text-black' : 'bg-white/5 border border-white/10 text-gray-300'}`} style={term === t ? { background: ACCENT } : undefined}>
                          {t}yr
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="rounded-xl p-6 text-center" style={{ background: `linear-gradient(135deg, ${PRIMARY}20, ${PRIMARY_LIGHT}10)`, border: `1px solid ${PRIMARY}30` }}>
                  <div className="text-sm text-gray-400 mb-1">Estimated Monthly Payment</div>
                  <div className="text-4xl font-extrabold" style={{ color: ACCENT }}>{fmt(calcResult.total)}</div>
                  <div className="text-sm text-gray-400 mt-2">
                    P&I: {fmt(calcResult.pi)} {calcResult.pmi > 0 && `• PMI: ${fmt(calcResult.pmi)}`} • Tax & Ins est. included
                  </div>
                </div>
                <div className="text-center">
                  <Link href="/calculator" className="text-sm hover:underline" style={{ color: ACCENT }}>
                    Open Full Calculator <ArrowRight className="inline w-4 h-4" />
                  </Link>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Overview Cards */}
        <section className="py-12 px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl font-bold text-center mb-8">
              Why Down Payment Assistance?
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { icon: DollarSign, title: 'Up to $100K+', desc: 'Programs like PHCD offer up to $100,000 in eligible areas' },
                { icon: Home, title: 'Buy Sooner', desc: 'Reduce or eliminate the cash needed to close on your new home' },
                { icon: Shield, title: 'Government-Backed', desc: 'Many programs are backed by state and federal agencies' },
                { icon: CheckCircle2, title: 'Forgivable Options', desc: 'Some programs forgive the assistance after 5-15 years' },
                { icon: MapPin, title: 'County-Specific', desc: 'Programs vary by county with tailored income and price limits' },
                { icon: HelpCircle, title: 'Free Guidance', desc: 'Our team helps you navigate eligibility and application' },
              ].map((card) => (
                <div key={card.title} className="rounded-2xl border border-white/10 bg-white/5 p-6">
                  <card.icon className="w-8 h-8 mb-3" style={{ color: ACCENT }} />
                  <h3 className="text-lg font-bold mb-2">{card.title}</h3>
                  <p className="text-sm text-gray-400">{card.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Lead Form */}
        <section className="py-16 px-4" ref={formRef}>
          <div className="max-w-xl mx-auto">
            {submitted ? (
              <div className="rounded-3xl border border-emerald-500/20 bg-emerald-950/20 p-10 text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center" style={{ background: ACCENT }}>
                  <Sparkles className="w-8 h-8 text-black" />
                </div>
                <h3 className="text-2xl font-bold mb-2">You&apos;re All Set!</h3>
                <p className="text-gray-400">A DPA specialist will reach out within 24 hours to help you explore your assistance options.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm p-8 space-y-5">
                <div className="text-center mb-6">
                  <h2 className="text-2xl font-bold">Check Your DPA Eligibility</h2>
                  <p className="text-gray-400 text-sm mt-2">Free consultation. No obligation. Fast response.</p>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-400 mb-1">First Name</label>
                    <input required value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="John" className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-blue-500 focus:outline-none text-white placeholder:text-gray-600" />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-1">Last Name</label>
                    <input required value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Smith" className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-blue-500 focus:outline-none text-white placeholder:text-gray-600" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                    <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="john@example.com" className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-blue-500 focus:outline-none text-white placeholder:text-gray-600" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Phone</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                    <input required type="tel" value={phone} onChange={(e) => setPhone(formatPhoneDisplay(e.target.value))} placeholder="(555) 123-4567" maxLength={14} className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-blue-500 focus:outline-none text-white placeholder:text-gray-600" />
                  </div>
                </div>
                <button type="submit" disabled={isSubmitting} className="w-full py-4 rounded-full font-bold text-lg text-white transition-all hover:scale-[1.02] hover:shadow-xl disabled:opacity-50" style={{ background: `linear-gradient(135deg, ${PRIMARY}, ${PRIMARY_LIGHT})` }}>
                  {isSubmitting ? 'Submitting...' : (
                    <span className="flex items-center justify-center gap-2">
                      <Send className="w-5 h-5" /> Check My Eligibility
                    </span>
                  )}
                </button>
                <p className="text-center text-xs text-gray-500">
                  By submitting, you agree to our{' '}
                  <Link href="/privacy-policy" className="underline">Privacy Policy</Link> and{' '}
                  <Link href="/sms-policy" className="underline">SMS Policy</Link>.
                </p>
              </form>
            )}
          </div>
        </section>

        {/* Minimal Footer */}
        <Footer />
      </main>
    </>
  );
}
