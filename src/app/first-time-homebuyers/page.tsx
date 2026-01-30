'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { ConsentModal } from '@/components/ConsentModal';
import { 
  ArrowRight, CheckCircle, Key, FileText, Users, Heart, Shield,
  Sparkles, Clock, Target, BookOpen, Home, DollarSign, Phone,
  GraduationCap, Lightbulb
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

const steps = [
  { icon: Target, title: 'Set Your Goals', desc: 'Define your budget, desired location, and must-have features. We help you understand what you can afford.' },
  { icon: FileText, title: 'Get Pre-Approved', desc: 'Know your buying power before you shop. Pre-approval shows sellers you\'re serious and ready.' },
  { icon: Home, title: 'Find Your Home', desc: 'Work with a trusted real estate agent to find properties that match your criteria.' },
  { icon: Shield, title: 'Make an Offer', desc: 'Submit a competitive offer backed by your pre-approval. We help you navigate negotiations.' },
  { icon: Key, title: 'Close & Celebrate', desc: 'Complete the closing process, get your keys, and move into your dream home!' },
];

const resources = [
  { icon: DollarSign, title: 'Down Payment Assistance', desc: 'Programs that help cover your down payment and closing costs.', link: '/down-payment-assistance' },
  { icon: BookOpen, title: 'Loan Programs', desc: 'FHA, VA, USDA, and conventional options for first-time buyers.', link: '/loan-programs' },
  { icon: GraduationCap, title: 'Mortgage Calculator', desc: 'Estimate your monthly payment and see what you can afford.', link: '/calculator' },
];

export default function FirstTimeHomebuyersPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FFF8F0] via-white to-[#F5F0FF]">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-10 left-[10%] w-[600px] h-[600px] bg-gradient-to-br from-[#267AB1]/25 to-[#267AB1]/10 rounded-full blur-[140px] animate-pulse" />
          <div className="absolute bottom-0 right-[5%] w-[400px] h-[400px] bg-gradient-to-br from-[#0D3F72]/15 to-transparent rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '1s' }} />
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
              <span className="text-[#267AB1]">First-Time Homebuyers</span>
            </div>
            
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#267AB1]/10 to-[#267AB1]/10 rounded-full mb-6">
                <Sparkles className="w-4 h-4 text-[#267AB1]" />
                <span className="text-sm font-medium text-[#0D3F72]">Your Journey Starts Here</span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#0D3F72] leading-tight mb-6">
                First-Time <span className="bg-gradient-to-r from-[#267AB1] to-[#267AB1] bg-clip-text text-transparent">Homebuyer</span> Guide
              </h1>
              
              <p className="text-lg text-[#0D3F72]/60 leading-relaxed mb-8">
                Buying your first home is exciting — and we're here to make it less overwhelming. From pre-approval to closing, the 1st Financial Mortgage guides you every step of the way.
              </p>

              <div className="flex flex-wrap gap-4">
                <Link href="https://apply.certaintyhomelending.com/apply/loan-purpose?emp-id=38605" target="_blank" rel="noopener noreferrer" className="btn-primary">
                  Get Pre-Approved <ArrowRight className="w-5 h-5" />
                </Link>
                <Link href="tel:+19545581730" className="btn-outline">
                  <Phone className="w-4 h-4" /> Contact Us
                </Link>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 relative">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-[#0D3F72] mb-4">
                Why Work With <span className="text-[#267AB1]">Us?</span>
              </h2>
              <p className="text-[#0D3F72]/60 max-w-2xl mx-auto">
                First-time buyers need extra care. Here's what sets us apart.
              </p>
            </div>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Heart, title: 'Patient Guidance', desc: 'No question is too small. We explain everything in plain English.' },
              { icon: Shield, title: 'Down Payment Help', desc: 'Access to assistance programs that can cover your down payment.' },
              { icon: Clock, title: 'Fast Pre-Approval', desc: 'Get your pre-approval letter in as little as 24 hours.' },
              { icon: Users, title: 'Bilingual Support', desc: 'Se habla español. We speak your language.' },
            ].map((item, i) => (
              <AnimatedSection key={item.title} delay={i * 100}>
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-[#0D3F72]/5 hover:shadow-xl hover:-translate-y-1 transition-all duration-500 h-full text-center">
                  <div className="w-14 h-14 bg-gradient-to-br from-[#267AB1] to-[#267AB1] rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <item.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-[#0D3F72] mb-2">{item.title}</h3>
                  <p className="text-sm text-[#0D3F72]/60">{item.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* 5 Steps */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0D3F72]/5 to-transparent" />
        <div className="absolute inset-0 opacity-[0.04]" style={{
          backgroundImage: `radial-gradient(#0D3F72 2px, transparent 2px)`,
          backgroundSize: '40px 40px'
        }} />

        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <AnimatedSection>
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-[#0D3F72] mb-4">
                5 Steps to <span className="text-[#267AB1]">Your First Home</span>
              </h2>
              <p className="text-[#0D3F72]/60 max-w-2xl mx-auto">
                The homebuying journey simplified into five clear milestones.
              </p>
            </div>
          </AnimatedSection>

          <div className="relative">
            {/* Connection Line */}
            <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-[#267AB1] via-[#267AB1] to-[#0D3F72] -translate-y-1/2 rounded-full" />
            
            <div className="grid lg:grid-cols-5 gap-8">
              {steps.map((step, i) => (
                <AnimatedSection key={step.title} delay={i * 100}>
                  <div className="relative">
                    <div className="bg-white rounded-2xl p-6 shadow-xl border border-[#0D3F72]/5 hover:shadow-2xl transition-all duration-500 h-full">
                      <div className="w-12 h-12 bg-gradient-to-br from-[#267AB1] to-[#267AB1] rounded-full flex items-center justify-center text-white font-bold text-lg mb-4 mx-auto lg:mx-0">
                        {i + 1}
                      </div>
                      <div className="w-10 h-10 bg-[#0D3F72]/5 rounded-lg flex items-center justify-center mb-3">
                        <step.icon className="w-5 h-5 text-[#0D3F72]" />
                      </div>
                      <h3 className="text-lg font-bold text-[#0D3F72] mb-2">{step.title}</h3>
                      <p className="text-sm text-[#0D3F72]/60">{step.desc}</p>
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Resources */}
      <section className="py-16 relative">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-[#0D3F72] mb-4">
                Helpful <span className="text-[#267AB1]">Resources</span>
              </h2>
              <p className="text-[#0D3F72]/60">
                Tools and information to help you prepare.
              </p>
            </div>
          </AnimatedSection>

          <div className="grid md:grid-cols-3 gap-6">
            {resources.map((item, i) => (
              <AnimatedSection key={item.title} delay={i * 100}>
                <Link href={item.link} className="group block bg-white rounded-2xl p-8 shadow-lg border border-[#0D3F72]/5 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 h-full">
                  <div className="w-14 h-14 bg-gradient-to-br from-[#0D3F72] to-[#267AB1] rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <item.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-[#0D3F72] mb-2 group-hover:text-[#267AB1] transition-colors">{item.title}</h3>
                  <p className="text-[#0D3F72]/60 mb-4">{item.desc}</p>
                  <span className="text-[#267AB1] font-semibold inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                    Learn More <ArrowRight className="w-4 h-4" />
                  </span>
                </Link>
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
            <Lightbulb className="w-16 h-16 text-[#267AB1] mx-auto mb-6" />
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
              Ready to Make <span className="text-[#267AB1]">Homeownership</span> a Reality?
            </h2>
            <p className="text-lg text-white/70 mb-8">
              Take the first step today. We'll guide you through every part of the process.
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
