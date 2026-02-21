'use client';

import { useState, useEffect, useMemo, useRef, Suspense } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { CheckCircle2, Sparkles, Send, PartyPopper, Phone, Mail, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';

const PRIMARY = '#0D3F72';
const ACCENT = '#267AB1';
const LIGHT = '#4A90B8';
const SILVER = '#C8D4E0';

const goalOptions = [
  "I'm renting and want to own",
  'Upgrading or relocating',
  'Refinancing for better terms',
  'Exploring investment opportunities',
];

function formatPhoneDisplay(value: string) {
  const digits = value.replace(/\D/g, '');
  const d = digits.slice(0, 10);
  if (d.length <= 3) return d;
  if (d.length <= 6) return `(${d.slice(0, 3)}) ${d.slice(3)}`;
  return `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}`;
}

export default function MyPlanPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-950" />}>
      <MyPlanContent />
    </Suspense>
  );
}

function MyPlanContent() {
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
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoFailed, setVideoFailed] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      videoRef.current?.play().catch(() => {});
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const isFormComplete = useMemo(
    () => firstName.trim() !== '' && lastName.trim() !== '' && email.trim() !== '' && phone.replace(/\D/g, '').length === 10,
    [firstName, lastName, email, phone]
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting || !isFormComplete) return;
    setSubmitting(true);
    setError(null);

    try {
      const res = await fetch('/api/submit-myplan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ firstName, lastName, email, phone, city, goal, notes, smsConsent, ...utmParams }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Submission failed');
      }

      if (typeof window !== 'undefined' && (window as any).fbq) {
        (window as any).fbq('track', 'Lead', {
          content_name: 'MyPlan Landing',
          utm_source: utmParams.utmSource ?? 'meta',
        });
      }

      setSuccess(true);
    } catch (err: any) {
      setError(err?.message || 'Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-950 to-black text-white flex flex-col">
      <Navbar />
      <main className="flex-1">
        {/* ─── HERO + FORM ─── */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute -top-32 -left-32 h-72 w-72 rounded-full blur-3xl" style={{ background: `${PRIMARY}33` }} />
            <div className="absolute top-1/2 -right-40 h-80 w-80 rounded-full blur-3xl" style={{ background: `${ACCENT}22` }} />
            <div className="absolute bottom-0 left-1/3 h-56 w-56 rounded-full blur-3xl" style={{ background: `${LIGHT}15` }} />
          </div>

          <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 sm:pt-32 pb-12 lg:pb-20">
            <div className="grid gap-14 lg:grid-cols-[1.05fr_0.95fr] items-start">

              {/* ─── LEFT: Video + Copy ─── */}
              <div className="space-y-8">
                {/* Video card */}
                <div className="relative w-full max-w-lg mx-auto lg:mx-0">
                  <div className="absolute -inset-2 rounded-3xl blur-2xl" style={{ background: `linear-gradient(135deg, ${PRIMARY}44, ${ACCENT}22)` }} />
                  <div className="relative rounded-3xl overflow-hidden border border-white/15 bg-gray-950/80 shadow-2xl">
                    <div className="absolute top-4 right-4 z-10 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-medium text-white shadow-lg text-center leading-tight" style={{ background: `${PRIMARY}dd` }}>
                      You saw this on Facebook/Instagram
                    </div>
                    <div className="aspect-video relative w-full">
                      {!videoFailed ? (
                        <video
                          ref={videoRef}
                          className="h-full w-full object-cover"
                          controls
                          muted
                          playsInline
                          poster="/cal.jpg"
                          onError={() => setVideoFailed(true)}
                        >
                          <source src="/myplan-video.mp4" type="video/mp4" />
                        </video>
                      ) : (
                        <div className="h-full w-full flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${PRIMARY}, ${ACCENT})` }}>
                          <div className="text-center space-y-3 p-6">
                            <div className="flex justify-center gap-4">
                              <div className="text-center">
                                <div className="w-16 h-16 rounded-full mx-auto overflow-hidden border-2 border-white/20 bg-white/10 flex items-center justify-center">
                                  <span className="text-white font-bold text-lg">CC</span>
                                </div>
                                <p className="text-white font-semibold text-sm mt-2">Cal Castells</p>
                              </div>
                              <div className="text-center">
                                <div className="w-16 h-16 rounded-full mx-auto overflow-hidden border-2 border-white/20 bg-white/10 flex items-center justify-center">
                                  <span className="text-white font-bold text-lg">JR</span>
                                </div>
                                <p className="text-white font-semibold text-sm mt-2">Jose Ramirez</p>
                              </div>
                            </div>
                            <p className="text-white/70 text-sm">Your South Florida Mortgage Team</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Pill */}
                <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm font-medium" style={{ color: `${LIGHT}cc` }}>
                  <Sparkles className="h-4 w-4" />
                  Looking for a home in South Florida? You&apos;re in the right place.
                </div>

                {/* Headline */}
                <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white leading-tight">
                  Stop paying your landlord&apos;s mortgage.{' '}
                  <span style={{ color: ACCENT }}>Let us build your plan to own.</span>
                </h1>

                <p className="text-lg text-gray-300 leading-relaxed max-w-2xl">
                  Share a few details and the Mortgage Fellas team will map out whether owning could beat your current situation — estimated payments, down-payment options, and clear next steps personalized for you.
                </p>

                {/* Value props */}
                <div className="grid gap-3 sm:grid-cols-2">
                  {[
                    'Compare your rent to an estimated mortgage payment',
                    'Explore low-down-payment & assistance programs',
                    'Personalized guidance from 20+ year mortgage veterans',
                    'Transparent numbers, zero-pressure — not a sales pitch',
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3.5">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0" style={{ color: ACCENT }} />
                      <span className="text-sm text-gray-200 leading-relaxed">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* ─── RIGHT: Form ─── */}
              <div className="relative" ref={formRef}>
                <div className="absolute -inset-1 rounded-3xl blur-xl" style={{ background: `linear-gradient(135deg, ${PRIMARY}55, ${ACCENT}20)` }} />
                <div className="relative rounded-3xl border border-white/10 bg-gray-900/80 backdrop-blur-xl shadow-2xl p-6 sm:p-8">

                  {success ? (
                    <div className="text-center space-y-5 py-8">
                      <div className="inline-flex items-center justify-center h-16 w-16 rounded-full mx-auto" style={{ background: `${ACCENT}22` }}>
                        <PartyPopper className="h-8 w-8" style={{ color: ACCENT }} />
                      </div>
                      <h2 className="text-2xl font-bold text-white">We Got It!</h2>
                      <p className="text-gray-300 leading-relaxed max-w-sm mx-auto">
                        Cal &amp; Jose are already working on your personalized plan. Expect a call or text soon with your next steps!
                      </p>
                      <div className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium" style={{ borderColor: `${ACCENT}44`, background: `${ACCENT}15`, color: ACCENT }}>
                        <CheckCircle2 className="h-4 w-4" />
                        Request received
                      </div>
                      <p className="text-gray-400 text-sm pt-2">
                        Need something sooner? Call or text{' '}
                        <a href="tel:+17862628718" className="font-semibold underline" style={{ color: `${ACCENT}dd` }}>(786) 262-8718</a>
                      </p>
                    </div>
                  ) : (
                    <>
                      <div className="space-y-2 text-center mb-7">
                        <h2 className="text-2xl font-semibold text-white">Let&apos;s build your winning strategy</h2>
                        <p className="text-sm text-gray-400">Fill this out and our team will fast-track your personalized plan.</p>
                      </div>

                      <form className="space-y-5" onSubmit={handleSubmit}>
                        {error && (
                          <div className="rounded-xl border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-200">{error}</div>
                        )}

                        {/* Name */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="space-y-1">
                            <label htmlFor="mp-fn" className="text-sm font-medium text-gray-200">First name</label>
                            <input id="mp-fn" value={firstName} onChange={(e) => setFirstName(e.target.value)} required autoComplete="given-name"
                              className="w-full rounded-xl border border-white/10 bg-gray-950/80 px-4 py-3 text-base text-white placeholder:text-gray-500 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500/70"
                              placeholder="Jane" />
                          </div>
                          <div className="space-y-1">
                            <label htmlFor="mp-ln" className="text-sm font-medium text-gray-200">Last name</label>
                            <input id="mp-ln" value={lastName} onChange={(e) => setLastName(e.target.value)} required autoComplete="family-name"
                              className="w-full rounded-xl border border-white/10 bg-gray-950/80 px-4 py-3 text-base text-white placeholder:text-gray-500 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500/70"
                              placeholder="Homebuyer" />
                          </div>
                        </div>

                        {/* Email */}
                        <div className="space-y-1">
                          <label htmlFor="mp-email" className="text-sm font-medium text-gray-200">Email</label>
                          <input id="mp-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required autoComplete="email"
                            className="w-full rounded-xl border border-white/10 bg-gray-950/80 px-4 py-3 text-base text-white placeholder:text-gray-500 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500/70"
                            placeholder="you@email.com" />
                        </div>

                        {/* Phone + City */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="space-y-1">
                            <label htmlFor="mp-phone" className="text-sm font-medium text-gray-200">Mobile number</label>
                            <input id="mp-phone" type="tel" value={phone} onChange={(e) => setPhone(formatPhoneDisplay(e.target.value))} required autoComplete="tel"
                              className="w-full rounded-xl border border-white/10 bg-gray-950/80 px-4 py-3 text-base text-white placeholder:text-gray-500 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500/70"
                              placeholder="(786) 555-0123" />
                          </div>
                          <div className="space-y-1">
                            <label htmlFor="mp-city" className="text-sm font-medium text-gray-200">City / Area</label>
                            <input id="mp-city" value={city} onChange={(e) => setCity(e.target.value)} autoComplete="off"
                              className="w-full rounded-xl border border-white/10 bg-gray-950/80 px-4 py-3 text-base text-white placeholder:text-gray-500 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500/70"
                              placeholder="e.g., Pembroke Pines, Miami, Fort Lauderdale" />
                          </div>
                        </div>

                        {/* Goal */}
                        <div className="space-y-2">
                          <span className="text-sm font-medium text-gray-200">What brings you here?</span>
                          <div className="grid gap-2.5">
                            {goalOptions.map((option) => (
                              <label key={option} className={`flex items-center gap-3 rounded-2xl border px-4 py-3 transition cursor-pointer ${goal === option ? 'border-blue-400/60 bg-blue-500/10' : 'border-white/10 bg-gray-950/60 hover:border-blue-400/30'}`}>
                                <input type="radio" name="mp-goal" value={option} checked={goal === option} onChange={() => setGoal(option)}
                                  className="h-4 w-4 border-white/20 bg-gray-900 text-blue-500 focus:ring-blue-500" />
                                <span className="text-sm text-gray-200">{option}</span>
                              </label>
                            ))}
                          </div>
                        </div>

                        {/* Notes */}
                        <div className="space-y-1">
                          <label htmlFor="mp-notes" className="text-sm font-medium text-gray-200">Anything specific you&apos;d like us to know?</label>
                          <textarea id="mp-notes" value={notes} onChange={(e) => setNotes(e.target.value)} rows={3}
                            className="w-full rounded-xl border border-white/10 bg-gray-950/80 px-4 py-3 text-base text-white placeholder:text-gray-500 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500/70"
                            placeholder="Share your timeline, desired payment, or any questions." />
                        </div>

                        {/* SMS Consent */}
                        <div className="flex items-start gap-3">
                          <input type="checkbox" id="mp-sms" checked={smsConsent} onChange={(e) => setSmsConsent(e.target.checked)}
                            className="mt-1 h-4 w-4 rounded border-gray-600 bg-gray-800 text-blue-600 focus:ring-2 focus:ring-blue-500 cursor-pointer flex-shrink-0" />
                          <label htmlFor="mp-sms" className="text-xs text-gray-300 leading-relaxed cursor-pointer">
                            <span className="font-medium">I agree to receive SMS notifications and marketing texts (optional).</span>{' '}
                            Message frequency may vary. Standard message and data rates may apply. Reply STOP to opt out. Reply HELP for help. Consent is not a condition of purchase.{' '}
                            <a href="/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline font-medium">View Privacy Policy</a>.
                          </label>
                        </div>

                        {/* Submit */}
                        <button type="submit" disabled={submitting || !isFormComplete}
                          className="w-full rounded-xl px-6 py-3.5 text-base font-bold shadow-lg transition disabled:cursor-not-allowed disabled:opacity-50 flex items-center justify-center gap-2"
                          style={{ background: `linear-gradient(135deg, ${PRIMARY}, ${ACCENT}, ${LIGHT})`, color: '#fff', boxShadow: `0 6px 30px ${PRIMARY}44` }}>
                          {submitting ? 'Sending...' : (
                            <>Get My Plan <Send className="w-4 h-4" /></>
                          )}
                        </button>

                        <p className="text-center text-xs text-gray-500">
                          By submitting, you consent to us reaching out about your homeownership goals. We&apos;ll never spam you, and you can opt out anytime.
                        </p>
                      </form>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── SOCIAL PROOF ─── */}
        <section className="py-12 border-t border-white/5 bg-black/40">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
            <h3 className="text-2xl font-semibold text-white">Why clients trust Mortgage Fellas</h3>
            <p className="text-gray-300 max-w-3xl mx-auto">
              Helping South Florida families navigate every step of the mortgage process — with honesty, experience, and zero pressure.
            </p>
            <div className="grid gap-5 sm:grid-cols-3">
              {[
                { stat: '1,300+', label: 'Families guided home' },
                { stat: '20+ yrs', label: 'Combined mortgage experience' },
                { stat: '5.0/5', label: 'Client satisfaction rating' },
              ].map((item) => (
                <div key={item.label} className="rounded-2xl border border-white/10 bg-white/5 px-6 py-6">
                  <div className="text-3xl font-bold" style={{ color: `${ACCENT}dd` }}>{item.stat}</div>
                  <div className="mt-2 text-sm uppercase tracking-widest text-gray-400">{item.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── CONTACT STRIP ─── */}
        <section className="py-8 border-t border-white/5">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-center gap-6 text-sm">
            <a href="tel:+17862628718" className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors">
              <Phone className="w-4 h-4" style={{ color: ACCENT }} /> (786) 262-8718
            </a>
            <span className="hidden sm:block h-4 w-px bg-white/15" />
            <a href="mailto:cal@mortgagefellas.com" className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors">
              <Mail className="w-4 h-4" style={{ color: ACCENT }} /> cal@mortgagefellas.com
            </a>
            <span className="hidden sm:block h-4 w-px bg-white/15" />
            <a href="mailto:jose@mortgagefellas.com" className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors">
              <Mail className="w-4 h-4" style={{ color: ACCENT }} /> jose@mortgagefellas.com
            </a>
            <span className="hidden sm:block h-4 w-px bg-white/15" />
            <a href="/" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
              Visit full site <ArrowRight className="w-3 h-3" />
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
