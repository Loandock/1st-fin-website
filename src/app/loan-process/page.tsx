'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { 
  ArrowRight, CheckCircle, FileText, CreditCard, ClipboardCheck,
  Calculator, Users, Search, Key, Phone, MessageSquare, Home,
  Shield, Award, Clock
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

const processSteps = [
  { step: 1, title: 'Initial Consultation', desc: 'We discuss your goals, timeline, and financial situation to determine the best path forward.', icon: MessageSquare },
  { step: 2, title: 'Pre-Qualification', desc: 'Quick assessment of your purchasing power based on income, assets, and credit profile.', icon: Calculator },
  { step: 3, title: 'Document Collection', desc: 'Gather necessary documents: pay stubs, tax returns, bank statements, and ID.', icon: FileText },
  { step: 4, title: 'Credit Review', desc: 'We pull your credit and review your history, offering advice to optimize your score if needed.', icon: CreditCard },
  { step: 5, title: 'Pre-Approval Letter', desc: 'Receive your pre-approval letter, showing sellers you\'re a serious, qualified buyer.', icon: ClipboardCheck },
  { step: 6, title: 'House Hunting', desc: 'Shop for homes with confidence, knowing exactly what you can afford.', icon: Search },
  { step: 7, title: 'Make an Offer', desc: 'When you find the one, your pre-approval helps strengthen your offer.', icon: Home },
  { step: 8, title: 'Loan Application', desc: 'We submit your full application to the lender and lock in your interest rate.', icon: FileText },
  { step: 9, title: 'Processing', desc: 'Our team manages all paperwork, coordinating with all parties involved.', icon: Users },
  { step: 10, title: 'Underwriting', desc: 'The lender verifies all information and approves your loan.', icon: Shield },
  { step: 11, title: 'Clear to Close', desc: 'Final approval received! We prepare your closing documents.', icon: Award },
  { step: 12, title: 'Closing Day', desc: 'Sign the papers, get your keys, and celebrate your new home!', icon: Key },
];

export default function LoanProcessPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FFF8F0] via-white to-[#F5F0FF]">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 right-[5%] w-[500px] h-[500px] bg-gradient-to-br from-[#0D3F72]/20 to-[#0D3F72]/5 rounded-full blur-[120px] animate-pulse" />
          <div className="absolute bottom-0 left-[10%] w-[400px] h-[400px] bg-gradient-to-br from-[#267AB1]/15 to-transparent rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '1s' }} />
        </div>
        
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `linear-gradient(90deg, #0D3F72 1px, transparent 1px)`,
          backgroundSize: '80px 80px'
        }} />

        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <AnimatedSection>
            <div className="flex items-center gap-2 text-sm text-[#0D3F72]/60 mb-4">
              <Link href="/" className="hover:text-[#267AB1] transition-colors">Home</Link>
              <span>/</span>
              <span className="text-[#267AB1]">Loan Process</span>
            </div>
            
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#267AB1]/10 to-[#267AB1]/10 rounded-full mb-6">
                  <Clock className="w-4 h-4 text-[#267AB1]" />
                  <span className="text-sm font-medium text-[#0D3F72]">12 Simple Steps</span>
                </div>
                
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#0D3F72] leading-tight mb-6">
                  Your Path to <span className="bg-gradient-to-r from-[#267AB1] to-[#267AB1] bg-clip-text text-transparent">Homeownership</span>
                </h1>
                
                <p className="text-lg text-[#0D3F72]/60 leading-relaxed mb-8">
                  The mortgage process doesn't have to be confusing. We break it down into clear, manageable steps and guide you every step of the way.
                </p>

                <div className="flex flex-wrap gap-4">
                  <Link href="https://apply.certaintyhomelending.com/apply/loan-purpose?emp-id=38605" target="_blank" rel="noopener noreferrer" className="btn-primary">
                    Start Step 1 <ArrowRight className="w-5 h-5" />
                  </Link>
                  <Link href="tel:+19545581730" className="btn-outline">
                    <Phone className="w-4 h-4" /> Call Us
                  </Link>
                </div>
              </div>

              <div className="hidden lg:block">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#267AB1]/20 to-[#267AB1]/20 rounded-3xl blur-2xl" />
                  <div className="relative bg-white rounded-3xl p-8 shadow-2xl border border-[#0D3F72]/5">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-12 h-12 bg-gradient-to-br from-[#0D3F72] to-[#267AB1] rounded-xl flex items-center justify-center">
                        <Clock className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-[#0D3F72]">30-45 Days</p>
                        <p className="text-sm text-[#0D3F72]/60">Average closing time</p>
                      </div>
                    </div>
                    <div className="space-y-3">
                      {['Pre-approval in 24 hours', 'Dedicated loan officer', 'Regular status updates', 'On-time closings'].map((item) => (
                        <div key={item} className="flex items-center gap-3">
                          <CheckCircle className="w-5 h-5 text-[#267AB1]" />
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

      {/* Process Steps */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04]" style={{
          backgroundImage: `radial-gradient(#0D3F72 2px, transparent 2px)`,
          backgroundSize: '40px 40px'
        }} />

        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <AnimatedSection>
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-[#0D3F72] mb-4">
                The Complete <span className="text-[#267AB1]">Mortgage Journey</span>
              </h2>
              <p className="text-[#0D3F72]/60 max-w-2xl mx-auto">
                From first call to closing day, here's exactly what to expect when working with the 1st Financial Mortgage.
              </p>
            </div>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {processSteps.map((item, i) => (
              <AnimatedSection key={item.step} delay={i * 60}>
                <div className="group relative bg-white rounded-2xl p-6 shadow-lg border border-[#0D3F72]/5 hover:shadow-xl hover:-translate-y-1 transition-all duration-500 h-full">
                  {/* Step Number */}
                  <div className="absolute -top-3 -left-3 w-10 h-10 bg-gradient-to-br from-[#267AB1] to-[#267AB1] rounded-full flex items-center justify-center text-white font-bold shadow-lg group-hover:scale-110 transition-transform duration-300">
                    {item.step}
                  </div>
                  
                  <div className="pt-4">
                    <div className="w-12 h-12 bg-[#0D3F72]/5 rounded-xl flex items-center justify-center mb-4 group-hover:bg-[#0D3F72]/10 transition-colors duration-300">
                      <item.icon className="w-6 h-6 text-[#0D3F72]" />
                    </div>
                    <h3 className="text-lg font-bold text-[#0D3F72] mb-2">{item.title}</h3>
                    <p className="text-sm text-[#0D3F72]/60">{item.desc}</p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#0D3F72] to-[#267AB1]" />
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: `linear-gradient(45deg, transparent 40%, rgba(255,255,255,0.1) 50%, transparent 60%)`,
          backgroundSize: '20px 20px'
        }} />
        
        <div className="max-w-4xl mx-auto px-6 lg:px-8 relative z-10 text-center">
          <AnimatedSection>
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
              Ready to Begin <span className="text-[#267AB1]">Your Journey?</span>
            </h2>
            <p className="text-lg text-white/70 mb-8">
              Take the first step today. Get pre-approved and know exactly where you stand.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="https://apply.certaintyhomelending.com/apply/loan-purpose?emp-id=38605"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-[#267AB1] to-[#267AB1] text-white font-semibold rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-300"
              >
                Start Your Application <ArrowRight className="w-5 h-5" />
              </Link>
              <Link 
                href="tel:+19545581730"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 text-white font-semibold rounded-xl hover:bg-white/20 transition-all duration-300"
              >
                <Phone className="w-5 h-5" /> (954) 558-1730
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <Footer />
    </div>
  );
}
