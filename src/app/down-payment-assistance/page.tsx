'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { ConsentModal } from '@/components/ConsentModal';
import { 
  ArrowRight, CheckCircle, DollarSign, HelpCircle, ExternalLink,
  FileText, Users, Sparkles, Home, Shield, Phone, Gift, Building2
} from 'lucide-react';

const APPLICATION_URL = "https://apply.certaintyhomelending.com/apply/loan-purpose?emp-id=38605";

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

const programs = [
  {
    title: 'Florida Dream Homeownership Program',
    type: 'State Program',
    features: ['Up to $10,000 in assistance', 'Low interest rate first mortgages', 'Works with FHA, VA, USDA', 'First-time & repeat buyers'],
    link: 'https://www.dca.ga.gov/safe-affordable-housing/homeownership/georgia-dream-homeownership-program',
    color: 'gold'
  },
  {
    title: 'Broward County HOME Program',
    type: 'County Program',
    features: ['Down payment & closing cost help', 'Deferred loans available', 'Income limits apply', 'Homebuyer education required'],
    link: 'https://www.gwinnettcounty.com/',
    color: 'purple'
  },
  {
    title: 'Florida HERO Program',
    type: 'State Program',
    features: ['For teachers, nurses, first responders', 'Up to $7,500 in assistance', 'Lower interest rates', 'Forgivable loans'],
    link: 'https://www.dca.ga.gov/',
    color: 'gold'
  },
  {
    title: 'Invest Atlanta Programs',
    type: 'City Program',
    features: ['Multiple program options', 'Deferred second mortgages', 'Grants available', 'Metro Atlanta residents'],
    link: 'https://www.investatlanta.com/',
    color: 'purple'
  }
];

const additionalOptions = [
  { icon: Gift, title: 'Gift Funds', desc: 'Family members can gift money for your down payment with proper documentation.' },
  { icon: Building2, title: 'Employer Programs', desc: 'Some employers offer homebuying assistance as an employee benefit.' },
  { icon: Shield, title: 'VA Loans', desc: 'Veterans may qualify for zero down payment through VA loans.' },
  { icon: Home, title: 'USDA Loans', desc: '100% financing available in eligible rural and suburban areas.' },
];

export default function DownPaymentAssistancePage() {
  const [consentModalOpen, setConsentModalOpen] = useState(false);
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FFF8F0] via-white to-[#F5F0FF]">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 right-[10%] w-[500px] h-[500px] bg-gradient-to-br from-[#FF8C42]/25 to-[#267AB1]/10 rounded-full blur-[130px] animate-pulse" />
          <div className="absolute bottom-0 left-[5%] w-[400px] h-[400px] bg-gradient-to-br from-[#0D3F72]/15 to-transparent rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '1s' }} />
        </div>
        
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `linear-gradient(#0D3F72 1px, transparent 1px), linear-gradient(90deg, #0D3F72 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }} />

        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <AnimatedSection>
            <div className="flex items-center gap-2 text-sm text-[#0D3F72]/60 mb-4">
              <Link href="/" className="hover:text-[#FF8C42] transition-colors">Home</Link>
              <span>/</span>
              <span className="text-[#FF8C42]">Down Payment Assistance</span>
            </div>
            
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#FF8C42]/10 to-[#267AB1]/10 rounded-full mb-6">
                  <DollarSign className="w-4 h-4 text-[#FF8C42]" />
                  <span className="text-sm font-medium text-[#0D3F72]">Financial Help Available</span>
                </div>
                
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#0D3F72] leading-tight mb-6">
                  Down Payment <span className="bg-gradient-to-r from-[#FF8C42] to-[#267AB1] bg-clip-text text-transparent">Assistance</span>
                </h1>
                
                <p className="text-lg text-[#0D3F72]/60 leading-relaxed mb-8">
                  Don't let a down payment stop your homeownership dreams. Discover programs that can help cover your down payment and closing costs.
                </p>

                <div className="flex flex-wrap gap-4">
                  <button onClick={() => setConsentModalOpen(true)} className="btn-primary">
                    Check Eligibility <ArrowRight className="w-5 h-5" />
                  </button>
                  <Link href="tel:+19545550100" className="btn-outline">
                    <Phone className="w-4 h-4" /> Ask Questions
                  </Link>
                </div>
              </div>

              <div className="hidden lg:block">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#FF8C42]/20 to-[#267AB1]/20 rounded-3xl blur-2xl" />
                  <div className="relative bg-white rounded-3xl p-8 shadow-2xl border border-[#0D3F72]/5">
                    <div className="text-center mb-6">
                      <div className="w-16 h-16 bg-gradient-to-br from-[#FF8C42] to-[#267AB1] rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <DollarSign className="w-8 h-8 text-white" />
                      </div>
                      <p className="text-3xl font-bold text-[#0D3F72]">Up to $10,000+</p>
                      <p className="text-[#0D3F72]/60">in available assistance</p>
                    </div>
                    <div className="space-y-3">
                      {['Grants (free money!)', 'Forgivable loans', 'Deferred payments', 'Low-interest seconds'].map((item) => (
                        <div key={item} className="flex items-center gap-3">
                          <CheckCircle className="w-5 h-5 text-[#FF8C42]" />
                          <span className="text-[#0D3F72]/70">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Programs */}
      <section className="py-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04]" style={{
          backgroundImage: `radial-gradient(#0D3F72 2px, transparent 2px)`,
          backgroundSize: '40px 40px'
        }} />

        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <AnimatedSection>
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-[#0D3F72] mb-4">
                Popular <span className="text-[#FF8C42]">DPA Programs</span>
              </h2>
              <p className="text-[#0D3F72]/60 max-w-2xl mx-auto">
                These are some of the most common programs we help buyers access. Eligibility varies by program.
              </p>
            </div>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 gap-6">
            {programs.map((program, i) => (
              <AnimatedSection key={program.title} delay={i * 100}>
                <div className="group bg-white rounded-3xl p-8 shadow-lg border border-[#0D3F72]/5 hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 h-full">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium mb-2 ${
                        program.color === 'gold' 
                          ? 'bg-[#FF8C42]/10 text-[#FF8C42]' 
                          : 'bg-[#0D3F72]/10 text-[#0D3F72]'
                      }`}>
                        {program.type}
                      </span>
                      <h3 className="text-xl font-bold text-[#0D3F72]">{program.title}</h3>
                    </div>
                    <a 
                      href={program.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg hover:bg-[#0D3F72]/5 transition-colors"
                    >
                      <ExternalLink className="w-5 h-5 text-[#0D3F72]/40" />
                    </a>
                  </div>

                  <ul className="space-y-3">
                    {program.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-3 text-[#0D3F72]/70 text-sm">
                        <CheckCircle className="w-4 h-4 text-[#FF8C42] flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Options */}
      <section className="py-16 relative">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-[#0D3F72] mb-4">
                Additional <span className="text-[#FF8C42]">Options</span>
              </h2>
              <p className="text-[#0D3F72]/60">
                Other ways to reduce or eliminate your down payment requirement.
              </p>
            </div>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {additionalOptions.map((item, i) => (
              <AnimatedSection key={item.title} delay={i * 100}>
                <div className="bg-gradient-to-br from-[#0D3F72]/5 to-[#0D3F72]/10 rounded-2xl p-6 hover:from-[#0D3F72]/10 hover:to-[#0D3F72]/15 transition-all duration-300 h-full">
                  <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center mb-4 shadow-lg">
                    <item.icon className="w-6 h-6 text-[#0D3F72]" />
                  </div>
                  <h3 className="text-lg font-bold text-[#0D3F72] mb-2">{item.title}</h3>
                  <p className="text-sm text-[#0D3F72]/60">{item.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* How We Help */}
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
                How We <span className="text-[#FF8C42]">Help You</span>
              </h2>
              <p className="text-white/70 max-w-2xl mx-auto">
                Navigating DPA programs can be confusing. That's where we come in.
              </p>
            </div>
          </AnimatedSection>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: HelpCircle, title: 'Eligibility Check', desc: 'We review your situation and identify programs you may qualify for.' },
              { icon: FileText, title: 'Application Help', desc: 'We guide you through the application process and required documentation.' },
              { icon: Users, title: 'Coordination', desc: 'We work with program administrators to ensure smooth processing.' },
            ].map((item, i) => (
              <AnimatedSection key={item.title} delay={i * 100}>
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center hover:bg-white/20 transition-all duration-300">
                  <div className="w-14 h-14 bg-gradient-to-br from-[#FF8C42] to-[#267AB1] rounded-2xl flex items-center justify-center mx-auto mb-4">
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
              <button 
                onClick={() => setConsentModalOpen(true)}
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#FF8C42] to-[#267AB1] text-white font-semibold rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-300"
              >
                Check Your Eligibility <ArrowRight className="w-5 h-5" />
              </button>
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
