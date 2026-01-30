'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { ConsentModal } from '@/components/ConsentModal';
import { 
  Calculator, DollarSign, Percent, Calendar, ArrowRight,
  Home, TrendingUp, Shield, PiggyBank
} from 'lucide-react';

const APPLICATION_URL = "https://apply.certaintyhomelending.com/apply/loan-purpose?emp-id=38605";

// Animation hook
function useScrollAnimation() {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return { ref, isVisible };
}

function AnimatedSection({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const { ref, isVisible } = useScrollAnimation();
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${className} ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

export default function CalculatorPage() {
  const [homePrice, setHomePrice] = useState(400000);
  const [downPayment, setDownPayment] = useState(80000);
  const [interestRate, setInterestRate] = useState(6.5);
  const [loanTerm, setLoanTerm] = useState(30);
  const [consentModalOpen, setConsentModalOpen] = useState(false);

  const loanAmount = homePrice - downPayment;
  const monthlyRate = interestRate / 100 / 12;
  const numPayments = loanTerm * 12;
  const monthlyPayment = loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / (Math.pow(1 + monthlyRate, numPayments) - 1);
  const totalPayment = monthlyPayment * numPayments;
  const totalInterest = totalPayment - loanAmount;

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#E1EAEF] via-white to-[#E9FCFE]">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 right-[10%] w-[400px] h-[400px] bg-gradient-to-br from-[#267AB1]/20 to-[#267AB1]/10 rounded-full blur-[100px] animate-pulse" />
          <div className="absolute bottom-0 left-[10%] w-[300px] h-[300px] bg-gradient-to-br from-[#0D3F72]/10 to-[#267AB1]/5 rounded-full blur-[80px] animate-pulse" style={{ animationDelay: '1s' }} />
        </div>
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `linear-gradient(#0D3F72 1px, transparent 1px), linear-gradient(90deg, #0D3F72 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }} />

        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <AnimatedSection>
            <div className="flex items-center gap-2 text-sm text-[#0D3F72]/60 mb-4">
              <Link href="/" className="hover:text-[#267AB1] transition-colors">Home</Link>
              <span>/</span>
              <span className="text-[#267AB1]">Calculator</span>
            </div>
            
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#267AB1]/10 to-[#267AB1]/10 rounded-full mb-6">
                <Calculator className="w-4 h-4 text-[#267AB1]" />
                <span className="text-sm font-medium text-[#0D3F72]">Free Tool</span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#0D3F72] leading-tight mb-6">
                Mortgage <span className="bg-gradient-to-r from-[#267AB1] to-[#267AB1] bg-clip-text text-transparent">Calculator</span>
              </h1>
              
              <p className="text-lg text-[#0D3F72]/60 leading-relaxed">
                Estimate your monthly mortgage payments and see how different loan terms affect your budget. Get a clear picture before you apply.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Calculator Section */}
      <section className="py-16 relative">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Calculator Inputs */}
            <AnimatedSection delay={100}>
              <div className="bg-white rounded-3xl shadow-xl border border-[#0D3F72]/5 p-8 hover:shadow-2xl transition-shadow duration-500">
                <h2 className="text-2xl font-bold text-[#0D3F72] mb-6 flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-[#267AB1] to-[#267AB1] rounded-xl flex items-center justify-center">
                    <Calculator className="w-5 h-5 text-white" />
                  </div>
                  Loan Details
                </h2>

                <div className="space-y-6">
                  {/* Home Price */}
                  <div>
                    <label className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-[#0D3F72]">Home Price</span>
                      <span className="text-lg font-bold text-[#0D3F72]">${homePrice.toLocaleString()}</span>
                    </label>
                    <input
                      type="range"
                      min="100000"
                      max="2000000"
                      step="10000"
                      value={homePrice}
                      onChange={(e) => setHomePrice(Number(e.target.value))}
                      className="w-full h-2 bg-[#0D3F72]/10 rounded-lg appearance-none cursor-pointer accent-[#267AB1]"
                    />
                    <div className="flex justify-between text-xs text-[#0D3F72]/40 mt-1">
                      <span>$100k</span>
                      <span>$2M</span>
                    </div>
                  </div>

                  {/* Down Payment */}
                  <div>
                    <label className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-[#0D3F72]">Down Payment</span>
                      <span className="text-lg font-bold text-[#0D3F72]">${downPayment.toLocaleString()} ({((downPayment / homePrice) * 100).toFixed(0)}%)</span>
                    </label>
                    <input
                      type="range"
                      min="0"
                      max={homePrice * 0.5}
                      step="5000"
                      value={downPayment}
                      onChange={(e) => setDownPayment(Number(e.target.value))}
                      className="w-full h-2 bg-[#0D3F72]/10 rounded-lg appearance-none cursor-pointer accent-[#267AB1]"
                    />
                  </div>

                  {/* Interest Rate */}
                  <div>
                    <label className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-[#0D3F72]">Interest Rate</span>
                      <span className="text-lg font-bold text-[#0D3F72]">{interestRate}%</span>
                    </label>
                    <input
                      type="range"
                      min="3"
                      max="12"
                      step="0.125"
                      value={interestRate}
                      onChange={(e) => setInterestRate(Number(e.target.value))}
                      className="w-full h-2 bg-[#0D3F72]/10 rounded-lg appearance-none cursor-pointer accent-[#267AB1]"
                    />
                    <div className="flex justify-between text-xs text-[#0D3F72]/40 mt-1">
                      <span>3%</span>
                      <span>12%</span>
                    </div>
                  </div>

                  {/* Loan Term */}
                  <div>
                    <label className="text-sm font-medium text-[#0D3F72] mb-3 block">Loan Term</label>
                    <div className="grid grid-cols-3 gap-3">
                      {[15, 20, 30].map((term) => (
                        <button
                          key={term}
                          onClick={() => setLoanTerm(term)}
                          className={`py-3 rounded-xl font-semibold transition-all duration-300 ${
                            loanTerm === term
                              ? 'bg-gradient-to-r from-[#267AB1] to-[#267AB1] text-white shadow-lg scale-105'
                              : 'bg-[#0D3F72]/5 text-[#0D3F72] hover:bg-[#0D3F72]/10'
                          }`}
                        >
                          {term} Years
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedSection>

            {/* Results */}
            <AnimatedSection delay={200}>
              <div className="space-y-6">
                {/* Monthly Payment Card */}
                <div className="bg-gradient-to-br from-[#0D3F72] to-[#267AB1] rounded-3xl p-8 text-white shadow-2xl">
                  <p className="text-white/60 text-sm mb-2">Estimated Monthly Payment</p>
                  <p className="text-5xl lg:text-6xl font-bold mb-4">
                    ${isNaN(monthlyPayment) ? '0' : Math.round(monthlyPayment).toLocaleString()}
                  </p>
                  <p className="text-white/60 text-sm">Principal & Interest Only</p>
                  
                  <div className="mt-6 pt-6 border-t border-white/20 grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-white/60 text-xs">Loan Amount</p>
                      <p className="text-xl font-bold">${loanAmount.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-white/60 text-xs">Total Interest</p>
                      <p className="text-xl font-bold">${isNaN(totalInterest) ? '0' : Math.round(totalInterest).toLocaleString()}</p>
                    </div>
                  </div>
                </div>

                {/* CTA Card */}
                <div className="bg-gradient-to-r from-[#267AB1]/10 to-[#267AB1]/10 rounded-3xl p-8 border border-[#267AB1]/20">
                  <h3 className="text-xl font-bold text-[#0D3F72] mb-3">Ready to Get Started?</h3>
                  <p className="text-[#0D3F72]/60 mb-6">Get pre-approved in as little as 24 hours with the 1st Financial Mortgage.</p>
                  <button 
                    onClick={() => setConsentModalOpen(true)}
                    className="btn-primary w-full justify-center"
                  >
                    Apply Now <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Info Cards */}
      <section className="py-16 relative overflow-hidden">
        {/* Polka Dot Pattern */}
        <div className="absolute inset-0 opacity-[0.05]" style={{
          backgroundImage: `radial-gradient(#0D3F72 2px, transparent 2px)`,
          backgroundSize: '40px 40px'
        }} />

        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <AnimatedSection>
            <h2 className="text-3xl font-bold text-[#0D3F72] text-center mb-12">
              What Makes Up Your <span className="text-[#267AB1]">Payment?</span>
            </h2>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: DollarSign, title: 'Principal & Interest', desc: 'The amount you borrow plus what the lender charges for the loan.', color: 'gold' },
              { icon: Home, title: 'Property Taxes', desc: 'Annual taxes held in escrow and paid when due by your lender.', color: 'purple' },
              { icon: Shield, title: 'Homeowners Insurance', desc: 'Required coverage to protect your home from damage.', color: 'gold' },
              { icon: PiggyBank, title: 'PMI', desc: 'Insurance required if your down payment is less than 20%.', color: 'purple' },
            ].map((item, i) => (
              <AnimatedSection key={item.title} delay={i * 100}>
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-[#0D3F72]/5 hover:shadow-xl hover:-translate-y-1 transition-all duration-500 h-full">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${
                    item.color === 'gold' 
                      ? 'bg-gradient-to-br from-[#267AB1] to-[#267AB1]' 
                      : 'bg-gradient-to-br from-[#0D3F72] to-[#267AB1]'
                  }`}>
                    <item.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-bold text-[#0D3F72] mb-2">{item.title}</h3>
                  <p className="text-sm text-[#0D3F72]/60">{item.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#0D3F72] to-[#267AB1]" />
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: `linear-gradient(45deg, transparent 40%, rgba(255,255,255,0.1) 50%, transparent 60%)`,
          backgroundSize: '20px 20px'
        }} />
        
        <div className="max-w-4xl mx-auto px-6 lg:px-8 relative z-10 text-center">
          <AnimatedSection>
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
              Numbers Look Good? <span className="text-[#B8C5D0]">Let&apos;s Talk.</span>
            </h2>
            <p className="text-lg text-white/70 mb-8">
              Get personalized guidance from Cal Castells and the team. We'll find the best loan program for your situation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => setConsentModalOpen(true)}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-[#0D3F72] font-semibold rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-300"
              >
                Start Your Application <ArrowRight className="w-5 h-5" />
              </button>
              <Link 
                href="tel:+17862628718"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 text-white font-semibold rounded-xl hover:bg-white/20 transition-all duration-300"
              >
                Call (786) 262-8718
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <Footer />

      <ConsentModal
        isOpen={consentModalOpen}
        onClose={() => setConsentModalOpen(false)}
        redirectUrl={APPLICATION_URL}
      />
    </div>
  );
}
