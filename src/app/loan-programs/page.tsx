'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { 
  ArrowRight, CheckCircle, Building2, Shield, Users, DollarSign,
  TrendingUp, Wallet, Key, BadgeCheck, Home, Sparkles
} from 'lucide-react';

function useScrollAnimation() {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) setIsVisible(true); }, { threshold: 0.1 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return { ref, isVisible };
}

function AnimatedSection({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const { ref, isVisible } = useScrollAnimation();
  return (
    <div ref={ref} className={`transition-all duration-700 ${className} ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

const loanPrograms = [
  {
    icon: Users,
    title: 'ITIN Loans',
    desc: 'No Social Security number? No problem. Financing for ITIN holders.',
    features: ['Use Individual Taxpayer ID', '10-20% down payment options', 'Primary residence financing', 'Path to homeownership for immigrants'],
    color: 'gold',
    ideal: 'ITIN holders without SSN'
  },
  {
    icon: TrendingUp,
    title: 'DSCR Loans',
    desc: 'Debt Service Coverage Ratio loans — qualify based on rental income, not personal income.',
    features: ['No personal income verification', 'Qualify using property cash flow', 'Ideal for rental properties', 'Close in LLC or personal name'],
    color: 'purple',
    ideal: 'Real estate investors with rental properties'
  },
  {
    icon: Wallet,
    title: 'Bank Statement Loans',
    desc: 'Self-employed? Use 12-24 months of bank statements instead of tax returns.',
    features: ['No W-2s or tax returns needed', 'Personal or business statements', 'Flexible income calculation', 'Great for entrepreneurs & gig workers'],
    color: 'gold',
    ideal: 'Self-employed, 1099, business owners'
  },
  {
    icon: DollarSign,
    title: 'HELOC & Cash-Out Refinance',
    desc: 'Access your home equity for renovations, debt consolidation, or investments.',
    features: ['Tap into your home equity', 'Use funds for any purpose', 'Competitive rates', 'Keep your current mortgage (HELOC)'],
    color: 'purple',
    ideal: 'Homeowners with equity built up'
  },
  {
    icon: Key,
    title: 'Investor Loans',
    desc: 'Build your real estate portfolio with specialized investor financing.',
    features: ['1-4 unit investment properties', 'Fix & flip financing', 'Portfolio lending options', 'No limit on properties owned'],
    color: 'gold',
    ideal: 'Active real estate investors'
  },
  {
    icon: Home,
    title: 'Conventional Loans',
    desc: 'Traditional financing with competitive rates for qualified borrowers.',
    features: ['Down payments as low as 3%', 'No upfront mortgage insurance', 'Flexible terms: 10-30 years', 'Primary, second home, or investment'],
    color: 'purple',
    ideal: 'Good credit (620+) and stable income'
  },
  {
    icon: Shield,
    title: 'FHA Loans',
    desc: 'Government-backed loans designed for first-time and credit-challenged buyers.',
    features: ['3.5% down with 580+ credit', 'Lower credit score requirements', 'Gift funds allowed for down payment', 'Assumable loans'],
    color: 'gold',
    ideal: 'First-time buyers or lower credit scores'
  },
  {
    icon: BadgeCheck,
    title: 'VA Loans',
    desc: 'Exclusive benefits for veterans, active military, and eligible spouses.',
    features: ['Zero down payment required', 'No PMI ever', 'Competitive interest rates', 'Limited closing costs'],
    color: 'purple',
    ideal: 'Veterans and active-duty military'
  },
  {
    icon: Building2,
    title: 'USDA Loans',
    desc: 'Rural development loans with no down payment for eligible areas.',
    features: ['100% financing available', 'Below-market interest rates', 'Low mortgage insurance', 'Flexible credit guidelines'],
    color: 'gold',
    ideal: 'Buyers in eligible rural areas'
  },
  {
    icon: Sparkles,
    title: 'Jumbo Loans',
    desc: 'Financing for luxury homes exceeding conforming loan limits.',
    features: ['Loan amounts over $766,550', 'Competitive rates', 'Various term options', 'Investment property eligible'],
    color: 'purple',
    ideal: 'High-value property purchases'
  }
];

export default function LoanProgramsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#E1EAEF] via-white to-[#E9FCFE]">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-10 left-[5%] w-[500px] h-[500px] bg-gradient-to-br from-[#267AB1]/20 to-[#267AB1]/10 rounded-full blur-[120px] animate-pulse" />
          <div className="absolute bottom-0 right-[10%] w-[400px] h-[400px] bg-gradient-to-br from-[#0D3F72]/15 to-transparent rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '1s' }} />
        </div>
        
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `linear-gradient(#0D3F72 1px, transparent 1px), linear-gradient(90deg, #0D3F72 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }} />

        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <AnimatedSection>
            <div className="flex items-center gap-2 text-sm text-[#0D3F72]/60 mb-4">
              <Link href="/" className="hover:text-[#267AB1] transition-colors">Home</Link>
              <span>/</span>
              <span className="text-[#267AB1]">Loan Programs</span>
            </div>
            
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#0D3F72]/10 to-[#0D3F72]/5 rounded-full mb-6">
                <Building2 className="w-4 h-4 text-[#0D3F72]" />
                <span className="text-sm font-medium text-[#0D3F72]">10 Loan Types • ITIN & Non-QM Expert</span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#0D3F72] leading-tight mb-6">
                Loan Programs for <span className="bg-gradient-to-r from-[#267AB1] to-[#267AB1] bg-clip-text text-transparent">Every Situation</span>
              </h1>
              
              <p className="text-lg text-[#0D3F72]/60 leading-relaxed mb-8">
                ITIN, DSCR, Bank Statement, HELOC, Investor loans — we specialize in creative financing solutions. Traditional programs too. Let&apos;s find your path to homeownership.
              </p>

              <div className="flex flex-wrap gap-4">
                <Link href="https://apply.certaintyhomelending.com/apply/loan-purpose?emp-id=38605" target="_blank" rel="noopener noreferrer" className="btn-primary">
                  Get Pre-Approved <ArrowRight className="w-5 h-5" />
                </Link>
                <Link href="tel:+17862628718" className="btn-outline">
                  Talk to an Expert
                </Link>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Loan Programs Grid */}
      <section className="py-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04]" style={{
          backgroundImage: `radial-gradient(#0D3F72 2px, transparent 2px)`,
          backgroundSize: '40px 40px'
        }} />

        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="grid md:grid-cols-2 gap-6">
            {loanPrograms.map((program, i) => (
              <AnimatedSection key={program.title} delay={i * 80}>
                <div className="group bg-white rounded-3xl p-8 shadow-lg border border-[#0D3F72]/5 hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 h-full">
                  <div className="flex items-start gap-4 mb-6">
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-110 ${
                      program.color === 'gold' 
                        ? 'bg-gradient-to-br from-[#267AB1] to-[#267AB1]' 
                        : 'bg-gradient-to-br from-[#0D3F72] to-[#267AB1]'
                    }`}>
                      <program.icon className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-[#0D3F72] mb-1">{program.title}</h3>
                      <p className="text-[#0D3F72]/60 text-sm">{program.desc}</p>
                    </div>
                  </div>

                  <ul className="space-y-3 mb-6">
                    {program.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-3 text-[#0D3F72]/70 text-sm">
                        <CheckCircle className="w-4 h-4 text-[#267AB1] flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <div className="pt-4 border-t border-[#0D3F72]/10">
                    <p className="text-xs text-[#0D3F72]/50 mb-1">Ideal for:</p>
                    <p className="text-sm font-medium text-[#0D3F72]">{program.ideal}</p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#0D3F72] to-[#267AB1]" />
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: `linear-gradient(45deg, transparent 40%, rgba(255,255,255,0.1) 50%, transparent 60%)`,
          backgroundSize: '20px 20px'
        }} />
        
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <AnimatedSection>
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
                Why Choose <span className="text-[#B8C5D0]">The Mortgage Fellas?</span>
              </h2>
              <p className="text-white/70 max-w-2xl mx-auto">
                $100M+ in loans funded. Bilingual experts (Español/English) specializing in ITIN, DSCR, and Non-QM loans.
              </p>
            </div>
          </AnimatedSection>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: Users, title: 'Bilingual Service', desc: 'Español & English — clear communication every step' },
              { icon: TrendingUp, title: '$100M+ Funded', desc: '500+ families helped into homeownership' },
              { icon: Sparkles, title: 'ITIN & Non-QM Expert', desc: 'Solutions when traditional lenders say no' },
            ].map((item, i) => (
              <AnimatedSection key={item.title} delay={i * 100}>
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center hover:bg-white/20 transition-all duration-300">
                  <div className="w-14 h-14 bg-gradient-to-br from-[#267AB1] to-[#267AB1] rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <item.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-white/70 text-sm">{item.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>

          <AnimatedSection delay={300}>
            <div className="mt-12 text-center">
              <Link 
                href="https://apply.certaintyhomelending.com/apply/loan-purpose?emp-id=38605"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-[#0D3F72] font-semibold rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-300"
              >
                Find Your Loan Program <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <Footer />
    </div>
  );
}
