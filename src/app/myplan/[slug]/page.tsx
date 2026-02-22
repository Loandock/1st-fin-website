'use client';

import { useState, useMemo, useRef, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import {
  CheckCircle2, ArrowRight, Calculator, Shield, Home,
  DollarSign, Send, Sparkles, ChevronDown, ChevronUp,
  TrendingUp, Users, FileText,
} from 'lucide-react';
import { LOAN_TYPES, getLoanTypeBySlug } from '@/lib/loanTypes';

const PRIMARY = '#0D3F72';
const PRIMARY_LIGHT = '#267AB1';
const ACCENT = '#4A90B8';

const goalOptions = [
  "I'm renting and want to own",
  'Upgrading or relocating',
  'Refinancing for better terms',
  'Exploring investment opportunities',
];

function fmt(n: number) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n);
}

function formatPhoneDisplay(value: string) {
  const digits = value.replace(/\D/g, '');
  const d = digits.slice(0, 10);
  if (d.length <= 3) return d;
  if (d.length <= 6) return `(${d.slice(0, 3)}) ${d.slice(3)}`;
  return `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}`;
}

export default function LoanTypePage({ params }: { params: { slug: string } }) {
  const loanType = getLoanTypeBySlug(params.slug);
  if (!loanType) notFound();

  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-950" />}>
      <LoanTypeContent slug={params.slug} />
    </Suspense>
  );
}

function LoanTypeContent({ slug }: { slug: string }) {
  const loanType = getLoanTypeBySlug(slug)!;
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

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');
  const [goal, setGoal] = useState(goalOptions[0]);
  const [notes, setNotes] = useState('');
  const [smsConsent, setSmsConsent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Calculator state
  const [calcOpen, setCalcOpen] = useState(false);
  const [price, setPrice] = useState(350000);
  const [down, setDown] = useState(loanType.slug === 'va' || loanType.slug === 'usda' ? 0 : 17500);
  const [rate, setRate] = useState(6.75);
  const [term, setTerm] = useState(30);

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

  const isFormComplete = useMemo(
    () => firstName.trim() !== '' && lastName.trim() !== '' && email.trim() !== '' && phone.replace(/\D/g, '').length === 10,
    [firstName, lastName, email, phone]
  );

  const scrollToForm = () => formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting || !isFormComplete) return;
    setIsSubmitting(true);
    setError(null);
    try {
      const res = await fetch('/api/submit-myplan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName, lastName, email, phone, city, goal, notes, smsConsent,
          loanType: loanType.name,
          source: `myplan/${slug}`,
          ...utmParams,
        }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Submission failed');
      }
      setSubmitted(true);
      if (typeof window !== 'undefined' && (window as any).fbq) {
        (window as any).fbq('track', 'Lead', { content_name: `myplan_${slug}` });
      }
    } catch (err: any) {
      setError(err?.message || 'Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 text-white">
        <div className="fixed inset-0 pointer-events-none opacity-20 z-0">
          <div className="absolute top-20 left-1/4 w-96 h-96 rounded-full blur-3xl" style={{ background: PRIMARY }} />
          <div className="absolute bottom-10 right-1/4 w-72 h-72 rounded-full blur-3xl" style={{ background: ACCENT }} />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 sm:pt-36 pb-12">
          <div className="flex flex-col lg:grid lg:grid-cols-[1fr_400px] gap-10 xl:gap-14 items-start">

            <div className="order-1 space-y-6">
              <div>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 text-sm mb-5">
                  <Home className="w-4 h-4" style={{ color: ACCENT }} />
                  <span className="text-gray-300">{loanType.shortName} Program</span>
                </div>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight mb-4">
                  {loanType.name}
                  <span className="block text-xl sm:text-2xl font-medium mt-2" style={{ color: ACCENT }}>
                    {loanType.tagline}
                  </span>
                </h1>
                <p className="text-base text-gray-400 max-w-xl">{loanType.description}</p>
              </div>

              <div className="relative rounded-2xl overflow-hidden border border-white/15 bg-gray-950/80 shadow-2xl">
                <div className="absolute top-3 right-3 z-10 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-medium text-white shadow-lg" style={{ background: `${PRIMARY}dd` }}>
                  Watch to learn more
                </div>
                <div className="aspect-video relative w-full">
                  <video className="h-full w-full object-cover" controls muted playsInline poster="/team.jpg">
                    <source src="/myplan-video.mp4" type="video/mp4" />
                  </video>
                </div>
              </div>

              <button onClick={scrollToForm} className="w-full sm:w-auto px-6 py-3 rounded-xl font-bold text-white transition hover:scale-[1.02] lg:hidden flex items-center justify-center gap-2" style={{ background: `linear-gradient(135deg, ${PRIMARY}, ${PRIMARY_LIGHT}, ${ACCENT})`, boxShadow: `0 4px 20px ${PRIMARY}44` }}>
                <Send className="w-4 h-4" /> Get Pre-Qualified Now
              </button>
            </div>

            <div className="order-2 lg:row-span-2 lg:sticky lg:top-28 w-full" ref={formRef}>
              {submitted ? (
                <div className="rounded-3xl border border-emerald-500/20 bg-emerald-950/20 p-8 text-center space-y-4">
                  <div className="w-14 h-14 mx-auto rounded-full flex items-center justify-center" style={{ background: ACCENT }}>
                    <Sparkles className="w-7 h-7 text-black" />
                  </div>
                  <h3 className="text-xl font-bold">You&apos;re All Set!</h3>
                  <p className="text-gray-400 text-sm">A mortgage specialist will reach out within 24 hours to discuss your {loanType.shortName} options.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-md p-6 shadow-2xl">
                  <div className="text-center mb-5">
                    <h2 className="text-xl font-bold">Get Pre-Qualified</h2>
                    <p className="text-gray-400 text-xs mt-1">Fill this out and we&apos;ll fast-track your personalized plan.</p>
                  </div>

                  {error && <div className="rounded-xl border border-red-500/40 bg-red-500/10 px-3 py-2 text-xs text-red-200 mb-4">{error}</div>}

                  <div className="space-y-3.5">
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-medium text-gray-300 mb-1">First name</label>
                        <input required value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="Jane" autoComplete="given-name" className="w-full px-3 py-2.5 rounded-xl bg-gray-950/80 border border-white/10 focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-500/50 text-white text-sm placeholder:text-gray-500" />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-300 mb-1">Last name</label>
                        <input required value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Homebuyer" autoComplete="family-name" className="w-full px-3 py-2.5 rounded-xl bg-gray-950/80 border border-white/10 focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-500/50 text-white text-sm placeholder:text-gray-500" />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-gray-300 mb-1">Email</label>
                      <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@email.com" autoComplete="email" className="w-full px-3 py-2.5 rounded-xl bg-gray-950/80 border border-white/10 focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-500/50 text-white text-sm placeholder:text-gray-500" />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-medium text-gray-300 mb-1">Mobile number</label>
                        <input required type="tel" value={phone} onChange={(e) => setPhone(formatPhoneDisplay(e.target.value))} placeholder="(954) 555-0123" autoComplete="tel" maxLength={14} className="w-full px-3 py-2.5 rounded-xl bg-gray-950/80 border border-white/10 focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-500/50 text-white text-sm placeholder:text-gray-500" />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-300 mb-1">City / Area</label>
                        <input value={city} onChange={(e) => setCity(e.target.value)} placeholder="e.g., Pembroke Pines" autoComplete="off" className="w-full px-3 py-2.5 rounded-xl bg-gray-950/80 border border-white/10 focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-500/50 text-white text-sm placeholder:text-gray-500" />
                      </div>
                    </div>

                    <div>
                      <span className="block text-xs font-medium text-gray-300 mb-2">What brings you here?</span>
                      <div className="grid gap-1.5">
                        {goalOptions.map((option) => (
                          <label key={option} className={`flex items-center gap-2.5 rounded-xl border px-3 py-2 text-sm transition cursor-pointer ${goal === option ? 'border-blue-400/60 bg-blue-500/10' : 'border-white/10 bg-gray-950/60 hover:border-blue-400/30'}`}>
                            <input type="radio" name="mp-goal" value={option} checked={goal === option} onChange={() => setGoal(option)} className="h-3.5 w-3.5 border-white/20 bg-gray-900 text-blue-500 focus:ring-blue-500" />
                            <span className="text-xs text-gray-200">{option}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-gray-300 mb-1">Anything specific you&apos;d like us to know?</label>
                      <textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={2} placeholder="Timeline, desired payment, questions..." className="w-full px-3 py-2.5 rounded-xl bg-gray-950/80 border border-white/10 focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-500/50 text-white text-sm placeholder:text-gray-500 resize-none" />
                    </div>

                    <div className="flex items-start gap-2.5">
                      <input type="checkbox" id="sms-slug" checked={smsConsent} onChange={(e) => setSmsConsent(e.target.checked)} className="mt-0.5 h-3.5 w-3.5 rounded border-gray-600 bg-gray-800 text-blue-600 focus:ring-blue-500 cursor-pointer flex-shrink-0" />
                      <label htmlFor="sms-slug" className="text-[10px] text-gray-400 leading-relaxed cursor-pointer">
                        I agree to receive SMS notifications (optional). Reply STOP to opt out.{' '}
                        <Link href="/privacy-policy" className="text-blue-400 hover:underline">Privacy Policy</Link>.
                      </label>
                    </div>

                    <button type="submit" disabled={isSubmitting || !isFormComplete} className="w-full py-3 rounded-xl font-bold text-white transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2" style={{ background: `linear-gradient(135deg, ${PRIMARY}, ${PRIMARY_LIGHT}, ${ACCENT})`, boxShadow: `0 4px 20px ${PRIMARY}44` }}>
                      {isSubmitting ? 'Sending...' : <><Send className="w-4 h-4" /> Get My Plan</>}
                    </button>

                    <p className="text-center text-[10px] text-gray-500">
                      By submitting, you consent to us reaching out about your homeownership goals.
                    </p>
                  </div>
                </form>
              )}
            </div>

            <div className="order-3 space-y-10">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { label: 'Min Down', value: loanType.minDownPayment, icon: DollarSign },
                  { label: 'Min Score', value: loanType.minCreditScore, icon: Shield },
                  { label: 'Max DTI', value: loanType.maxDTI, icon: TrendingUp },
                  { label: 'Programs', value: '8+', icon: FileText },
                ].map((stat) => (
                  <div key={stat.label} className="rounded-xl border border-white/10 bg-white/5 p-4 text-center">
                    <stat.icon className="w-5 h-5 mx-auto mb-1.5" style={{ color: ACCENT }} />
                    <div className="text-xl font-bold">{stat.value}</div>
                    <div className="text-xs text-gray-400">{stat.label}</div>
                  </div>
                ))}
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                <h2 className="text-xl font-bold mb-4" style={{ color: ACCENT }}>Key Features</h2>
                <ul className="space-y-3">
                  {loanType.features.map((f) => (
                    <li key={f} className="flex items-start gap-3">
                      <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: ACCENT }} />
                      <span className="text-sm text-gray-200">{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="rounded-2xl border border-emerald-500/20 bg-emerald-950/20 p-6">
                  <h3 className="text-lg font-bold text-emerald-400 mb-3">Advantages</h3>
                  <ul className="space-y-2">
                    {loanType.pros.map((p) => (
                      <li key={p} className="flex items-center gap-2 text-sm">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 flex-shrink-0" />
                        <span className="text-gray-200">{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-2xl border border-amber-500/20 bg-amber-950/20 p-6">
                  <h3 className="text-lg font-bold text-amber-400 mb-3">Considerations</h3>
                  <ul className="space-y-2">
                    {loanType.cons.map((c) => (
                      <li key={c} className="flex items-center gap-2 text-sm">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-400 flex-shrink-0" />
                        <span className="text-gray-200">{c}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                <h2 className="text-xl font-bold mb-4" style={{ color: ACCENT }}>Eligibility Requirements</h2>
                <ul className="space-y-3">
                  {loanType.requirements.map((r) => (
                    <li key={r} className="flex items-start gap-3">
                      <Shield className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: PRIMARY_LIGHT }} />
                      <span className="text-sm text-gray-200">{r}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <button
                  onClick={() => setCalcOpen(!calcOpen)}
                  className="w-full flex items-center justify-between p-5 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/8 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <Calculator className="w-5 h-5" style={{ color: ACCENT }} />
                    <span className="text-lg font-bold">Quick Payment Estimate</span>
                  </div>
                  {calcOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                </button>
                {calcOpen && (
                  <div className="mt-3 p-5 rounded-2xl border border-white/10 bg-white/5 space-y-5">
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm text-gray-400 mb-1">Home Price</label>
                        <input type="range" min={100000} max={2000000} step={10000} value={price} onChange={(e) => setPrice(+e.target.value)} className="w-full accent-blue-500" />
                        <div className="text-right font-bold">{fmt(price)}</div>
                      </div>
                      <div>
                        <label className="block text-sm text-gray-400 mb-1">Down Payment</label>
                        <input type="range" min={0} max={price * 0.5} step={5000} value={down} onChange={(e) => setDown(+e.target.value)} className="w-full accent-blue-500" />
                        <div className="text-right font-bold">{fmt(down)} ({((down / price) * 100).toFixed(1)}%)</div>
                      </div>
                      <div>
                        <label className="block text-sm text-gray-400 mb-1">Interest Rate</label>
                        <input type="range" min={3} max={12} step={0.125} value={rate} onChange={(e) => setRate(+e.target.value)} className="w-full accent-blue-500" />
                        <div className="text-right font-bold">{rate.toFixed(3)}%</div>
                      </div>
                      <div>
                        <label className="block text-sm text-gray-400 mb-1">Loan Term</label>
                        <div className="flex gap-2">
                          {[15, 20, 25, 30].map((t) => (
                            <button key={t} onClick={() => setTerm(t)} className={`flex-1 py-2 rounded-lg text-sm font-bold transition-colors ${term === t ? 'text-black' : 'bg-white/5 border border-white/10 text-gray-300'}`} style={term === t ? { background: ACCENT } : undefined}>
                              {t}yr
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="rounded-xl p-5 text-center" style={{ background: `linear-gradient(135deg, ${PRIMARY}20, ${PRIMARY_LIGHT}10)`, border: `1px solid ${PRIMARY}30` }}>
                      <div className="text-sm text-gray-400 mb-1">Estimated Monthly Payment</div>
                      <div className="text-3xl font-extrabold" style={{ color: ACCENT }}>{fmt(calcResult.total)}</div>
                      <div className="text-xs text-gray-400 mt-1">
                        P&I: {fmt(calcResult.pi)} {calcResult.pmi > 0 && `• PMI: ${fmt(calcResult.pmi)}`} • Tax & Ins est.
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
            </div>
          </div>
        </div>

        <section className="relative z-10 py-12 px-4 border-t border-white/5">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-lg font-bold text-center mb-6 text-gray-400">Explore Other Loan Programs</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {LOAN_TYPES.filter((lt) => lt.slug !== slug).map((lt) => (
                <Link key={lt.slug} href={`/myplan/${lt.slug}`} className="rounded-xl border border-white/10 bg-white/5 p-3 text-center hover:bg-white/8 hover:border-white/20 transition-all group">
                  <div className="text-sm font-bold text-white group-hover:text-blue-300 transition-colors">{lt.shortName}</div>
                  <div className="text-xs text-gray-500 mt-0.5">{lt.minDownPayment} down</div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <div className="relative z-10">
          <Footer />
        </div>
      </main>
    </>
  );
}
