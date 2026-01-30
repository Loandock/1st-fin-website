"use client";

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { ConsentModal } from '@/components/ConsentModal';
import { 
  ArrowLeft, 
  Briefcase, 
  GraduationCap, 
  Award, 
  TrendingUp, 
  Building2,
  Phone,
  Mail,
  Star,
  Heart,
  Shield,
  Clock,
  Users,
  Target,
  CheckCircle,
  Home,
  ArrowRight,
  Sparkles
} from 'lucide-react';

const APPLICATION_URL = "https://apply.certaintyhomelending.com/apply/loan-purpose?emp-id=38605";

// Scroll animation hook
function useScrollAnimation() {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return { ref, isVisible };
}

function AnimatedSection({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const { ref, isVisible } = useScrollAnimation();
  return (
    <div ref={ref} className={`transition-all duration-700 ${className}`}
      style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? "translateY(0)" : "translateY(30px)", transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

// Animated counter
function Counter({ end, suffix = "", duration = 2000 }: { end: number; suffix?: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const { ref, isVisible } = useScrollAnimation();
  
  useEffect(() => {
    if (!isVisible) return;
    let start = 0;
    const increment = end / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [isVisible, end, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
}

interface ExperienceItemProps {
  company: string;
  role: string;
  duration: string;
  location: string;
  highlights: string[];
  index: number;
}

function ExperienceItem({ company, role, duration, location, highlights, index }: ExperienceItemProps) {
  return (
    <AnimatedSection delay={index * 100}>
      <div className="relative pl-8 pb-12 border-l-2 border-[#D3B16F]/30 last:pb-0 group">
        {/* Timeline dot */}
        <div className="absolute left-0 top-0 -translate-x-[9px] w-4 h-4 rounded-full bg-gradient-to-br from-[#D3B16F] to-[#5673A2] border-4 border-white shadow-lg group-hover:scale-125 transition-transform"></div>
        
        <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all border border-gray-100 group-hover:border-[#D3B16F]/30">
          <div className="flex items-start justify-between mb-3">
            <div>
              <h3 className="text-xl font-bold text-[#194080]">{role}</h3>
              <p className="text-[#D3B16F] font-semibold">{company}</p>
            </div>
            <div className="w-10 h-10 bg-gradient-to-br from-[#D3B16F]/10 to-[#5673A2]/10 rounded-xl flex items-center justify-center flex-shrink-0">
              <Briefcase className="w-5 h-5 text-[#D3B16F]" />
            </div>
          </div>
          
          <div className="flex flex-wrap gap-4 text-sm text-[#194080]/60 mb-4">
            <span className="flex items-center gap-1.5 bg-gray-50 px-3 py-1 rounded-full">
              <Clock className="w-3.5 h-3.5" /> {duration}
            </span>
            <span className="flex items-center gap-1.5 bg-gray-50 px-3 py-1 rounded-full">
              📍 {location}
            </span>
          </div>

          {highlights.length > 0 && (
            <div>
              <p className="text-xs font-bold text-[#194080] mb-2 uppercase tracking-wider">Key Focus</p>
              <ul className="space-y-1.5">
                {highlights.map((highlight, idx) => (
                  <li key={idx} className="text-sm text-[#194080]/70 flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-[#D3B16F] mt-0.5 flex-shrink-0" />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </AnimatedSection>
  );
}

export default function AboutPage() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [consentModalOpen, setConsentModalOpen] = useState(false);

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      setMousePos({ x: (e.clientX / window.innerWidth - 0.5) * 20, y: (e.clientY / window.innerHeight - 0.5) * 20 });
    };
    window.addEventListener("mousemove", handleMouse);
    return () => window.removeEventListener("mousemove", handleMouse);
  }, []);

  const experiences: Omit<ExperienceItemProps, 'index'>[] = [
    {
      company: 'Certainty Home Lending',
      role: 'VP of Mortgage Lending',
      duration: 'July 2025 - Present',
      location: 'Lawrenceville, Georgia',
      highlights: [
        'Lead mortgage operations for Certainty Home Lending branch',
        'Specialize in first-time homebuyers and down payment assistance programs',
        'Provide bilingual support (English/Spanish) for diverse clientele',
        'Focus on growing homeownership within the Hispanic community'
      ]
    },
    {
      company: 'BankSouth Mortgage',
      role: 'Loan Officer',
      duration: 'Aug 2023 - Jul 2025 (2 years)',
      location: 'Atlanta Metropolitan Area',
      highlights: [
        'Originated mortgage loans across Metro Atlanta region',
        'Built strong relationships with real estate professionals',
        'Maintained exceptional client satisfaction and referral network',
        'Hybrid work model serving diverse communities'
      ]
    },
    {
      company: 'Supreme Lending Southeast',
      role: 'Loan Officer',
      duration: 'Oct 2020 - Aug 2023 (2 years 11 months)',
      location: 'Atlanta, Georgia',
      highlights: [
        'Developed expertise in diverse loan products and programs',
        'Consistently exceeded production targets',
        'Built extensive network of real estate partners',
        'Specialized in bilingual mortgage services'
      ]
    },
    {
      company: 'Pacific Dental Services',
      role: 'Operations Manager',
      duration: 'Jan 2018 - Sep 2020 (2 years 9 months)',
      location: 'Georgia',
      highlights: [
        'Managed daily operations and team leadership',
        'Developed strong organizational and communication skills',
        'Built foundation for client-focused service approach'
      ]
    }
  ];

  const stats = [
    { icon: Target, value: 100, suffix: "M+", label: "Loans Funded", prefix: "$", color: "gold" },
    { icon: Users, value: 500, suffix: "+", label: "Families Helped", color: "purple" },
    { icon: Sparkles, value: 5, suffix: "+", label: "Years Experience", color: "purple" },
    { icon: Star, value: 0, suffix: "Bilingual", label: "Español/English", color: "gold" },
  ];

  const expertise = {
    loans: [
      "ITIN Loans (No SSN Required)",
      "DSCR Loans (Investors)",
      "Bank Statement Loans (Self-Employed)",
      "HELOC & Cash-Out Refinance",
      "FHA & VA Loans",
      "Down Payment Assistance Programs"
    ],
    services: [
      "Investment Property Financing",
      "First-Time Buyer Education",
      "Bilingual Support (English/Spanish)",
      "Conventional & Jumbo Loans",
      "Fast Pre-Approval Process",
      "Credit Guidance & Consultation"
    ]
  };

  const whyChoose = [
    { title: "$100M+ Loans Funded", desc: "Proven track record of getting deals done for families across Georgia" },
    { title: "ITIN & Non-QM Expert", desc: "Specializing in ITIN, DSCR, Bank Statement, and investor loans" },
    { title: "Bilingual Excellence", desc: "Fluent in English and Spanish, serving diverse communities with ease" },
    { title: "Community Focused", desc: "Passionate about growing homeownership in the Hispanic community" },
    { title: "500+ Families Helped", desc: "Hundreds of happy homeowners trust Ivan with their biggest investment" },
    { title: "Family Values", desc: "Devoted husband and father who understands what home means" }
  ];

  return (
    <div className="min-h-screen font-sans">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#194080] via-[#5673A2] to-[#194080] pt-32 pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-64 h-64 bg-[#D3B16F]/20 rounded-full blur-[100px]"
               style={{ transform: `translate(${mousePos.x * 0.5}px, ${mousePos.y * 0.5}px)` }}></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#5673A2]/10 rounded-full blur-[100px]"
               style={{ transform: `translate(${mousePos.x * -0.3}px, ${mousePos.y * -0.3}px)` }}></div>
        </div>

        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }} />

        <div className="relative max-w-7xl mx-auto">
          <Link 
            href="/"
            className="inline-flex items-center text-white/80 hover:text-white font-medium mb-12 transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Link>

          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
            {/* Left: Avatar */}
            <AnimatedSection className="lg:w-2/5">
              <div className="relative group">
                {/* Glow effect */}
                <div className="absolute -inset-2 bg-gradient-to-r from-[#D3B16F] via-[#5673A2] to-[#D3B16F] rounded-3xl blur-xl opacity-50 group-hover:opacity-70 transition-opacity animate-pulse-slow"></div>
                
                {/* Image container */}
                <div className="relative bg-white p-2 rounded-3xl shadow-2xl">
                  <Image 
                    src="/ivan.jpg" 
                    alt="Ivan Ramirez - VP of Mortgage Lending" 
                    width={500} 
                    height={600}
                    className="w-full rounded-2xl object-cover"
                    priority
                  />
                </div>

                {/* Floating badge */}
                <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#D3B16F] to-[#5673A2] px-6 py-3 rounded-full shadow-xl border-4 border-[#194080]">
                  <p className="text-[#194080] font-black text-sm whitespace-nowrap">NMLS #2059278</p>
                </div>
              </div>
            </AnimatedSection>

            {/* Right: Info */}
            <AnimatedSection className="lg:w-3/5 text-center lg:text-left mt-8 lg:mt-0" delay={200}>
              <div className="inline-block bg-[#D3B16F]/20 backdrop-blur-sm px-4 py-2 rounded-full border border-[#D3B16F]/40 mb-4">
                <p className="text-[#D3B16F] font-bold text-sm uppercase tracking-widest">VP of Mortgage Lending</p>
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-4">
                Ivan Ramirez
              </h1>
              
              <p className="text-xl sm:text-2xl text-white/80 font-semibold mb-4">
                Bilingual Mortgage Expert • Español/English
              </p>
              
              <p className="text-lg text-white/60 mb-8 max-w-2xl mx-auto lg:mx-0">
                Serving Gwinnett County and Metro Atlanta | Colombian-American | Passionate About Homeownership
              </p>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 gap-3 max-w-md mx-auto lg:mx-0 mb-8">
                {stats.map((stat) => (
                  <div key={stat.label} className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20 hover:bg-white/15 transition-colors">
                    <div className="text-3xl font-black text-[#D3B16F] mb-1">
                      {'prefix' in stat && stat.prefix}{stat.value > 0 ? <Counter end={stat.value} suffix={stat.suffix} /> : stat.suffix}
                    </div>
                    <div className="text-xs text-white/70 uppercase tracking-wide">{stat.label}</div>
                  </div>
                ))}
              </div>

              {/* Quick contact */}
              <div className="flex flex-col sm:flex-row flex-wrap gap-3 justify-center lg:justify-start">
                <a 
                  href="tel:+14046432230"
                  className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-[#D3B16F] to-[#5673A2] text-[#194080] font-bold rounded-full hover:shadow-lg hover:scale-105 transition-all"
                >
                  <Phone className="w-4 h-4 mr-2" /> (404) 643-2230
                </a>
                <a 
                  href="mailto:ivan@irmortgages.com"
                  className="inline-flex items-center justify-center px-6 py-3 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-full hover:bg-white/20 transition-all border-2 border-white/30"
                >
                  <Mail className="w-4 h-4 mr-2" /> Email Me
                </a>
                <a 
                  href="https://www.linkedin.com/in/ivan-ramirez-6582b862/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-6 py-3 bg-[#0A66C2] text-white font-semibold rounded-full hover:bg-[#004182] transition-all"
                >
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                  LinkedIn
                </a>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="bg-gradient-to-b from-gray-50 to-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          
          {/* Story Section - Two Column Layout */}
          <div className="grid lg:grid-cols-2 gap-8 mb-16">
            {/* Left Column - Story */}
            <AnimatedSection>
              <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100 h-full">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#D3B16F] to-[#5673A2] rounded-xl flex items-center justify-center">
                    <GraduationCap className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-3xl font-bold text-[#194080]">About Ivan</h2>
                </div>
                
                <div className="space-y-4 text-[#194080]/70 leading-relaxed">
                  <p>
                    Ivan Ramirez is a highly skilled and trusted <strong className="text-[#194080]">bilingual mortgage loan officer</strong> based out of the Lawrenceville, GA branch. Fluent in both Spanish and English, Ivan specializes in guiding first-time homebuyers and seasoned investors alike through the mortgage process with clarity, integrity, and unmatched service.
                  </p>
                  <p>
                    A proud <strong className="text-[#194080]">Colombian-American</strong>, Ivan brings a deep sense of warmth and dedication to everything he does. Whether he&apos;s meeting with clients across Gwinnett County or collaborating with real estate professionals to close time-sensitive deals, Ivan is known for his calm presence, contagious positivity, and unwavering focus on results.
                  </p>
                  <p>
                    Ivan&apos;s professional journey began at <strong className="text-[#194080]">Toccoa Falls College</strong>, where he earned his Bachelor of Business Administration before going on to complete his <strong className="text-[#194080]">MBA at the Florida Institute of Technology</strong>. His transition into the mortgage industry was a natural one—driven by his ability to build strong relationships and deliver value in every interaction.
                  </p>
                  <div className="bg-gradient-to-r from-[#D3B16F]/10 to-[#5673A2]/10 p-5 rounded-xl border-l-4 border-[#D3B16F] mt-6">
                    <p className="text-[#194080] font-semibold">
                      💡 &quot;My mission is clear: to grow homeownership within the Hispanic community and to build lasting partnerships that uplift and empower.&quot;
                    </p>
                  </div>
                </div>
              </div>
            </AnimatedSection>

            {/* Right Column - Why Choose Me */}
            <AnimatedSection delay={150}>
              <div className="bg-gradient-to-br from-[#194080] to-[#5673A2] rounded-3xl p-8 text-white h-full">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                    <Award className="w-6 h-6 text-[#D3B16F]" />
                  </div>
                  <h2 className="text-3xl font-bold">Why Work With Ivan?</h2>
                </div>
                
                <div className="space-y-4">
                  {whyChoose.map((item) => (
                    <div key={item.title} className="flex items-start gap-3 group">
                      <div className="w-8 h-8 rounded-full bg-[#D3B16F]/20 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:bg-[#D3B16F]/30 transition-colors">
                        <CheckCircle className="w-4 h-4 text-[#D3B16F]" />
                      </div>
                      <div>
                        <h3 className="font-bold text-white mb-0.5">{item.title}</h3>
                        <p className="text-sm text-white/60">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          </div>

          {/* What Sets Ivan Apart */}
          <AnimatedSection>
            <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100 mb-16">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-[#D3B16F] to-[#5673A2] rounded-xl flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-[#194080]">What Sets Ivan Apart</h2>
              </div>
              
              <div className="space-y-4 text-[#194080]/70 leading-relaxed">
                <p>
                  What truly sets Ivan apart is his <strong className="text-[#194080]">solutions-oriented mindset</strong>. He approaches each challenge as an opportunity to create positive outcomes, and his bilingual skills allow him to serve both English and Spanish-speaking communities with ease and authenticity.
                </p>
                <p>
                  Ivan is a responsive communicator, a thoughtful problem solver, and a committed partner in helping others achieve the ultimate goal—<strong className="text-[#194080]">homeownership</strong>.
                </p>
                <p>
                  He is proud to be part of a high-performing team at <strong className="text-[#194080]">Certainty Home Lending</strong> that leads with excellence and is passionate about making the dream of owning a home a reality for more families.
                </p>
              </div>
            </div>
          </AnimatedSection>

          {/* Personal Life */}
          <AnimatedSection>
            <div className="bg-gradient-to-r from-[#D3B16F]/5 via-white to-[#5673A2]/5 rounded-3xl p-8 lg:p-12 mb-16 border border-[#D3B16F]/20 shadow-lg">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-[#194080] to-[#5673A2] rounded-xl flex items-center justify-center">
                  <Heart className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-[#194080]">Beyond the Office</h2>
              </div>
              
              <div className="text-[#194080]/70 leading-relaxed">
                <p>
                  Outside of the office, Ivan is a devoted husband to <strong className="text-[#194080]">Maria Ramirez</strong>—his partner of over 15 years—and a proud father to two wonderful daughters. As a family, they enjoy the simple joys of life: sunny-day ice cream runs, movie nights, and off-road weekend adventures through the North Georgia Mountains, Tennessee, and South Carolina.
                </p>
              </div>
            </div>
          </AnimatedSection>

          {/* Career Timeline */}
          <div className="mb-16">
            <AnimatedSection>
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 bg-gradient-to-br from-[#D3B16F] to-[#5673A2] rounded-xl flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-[#194080]">Career Journey</h2>
              </div>
            </AnimatedSection>
            
            <div className="relative">
              {experiences.map((exp, idx) => (
                <ExperienceItem key={idx} {...exp} index={idx} />
              ))}
            </div>
          </div>

          {/* Expertise Section */}
          <AnimatedSection>
            <div className="bg-gradient-to-r from-[#D3B16F]/5 via-white to-[#5673A2]/5 rounded-3xl p-8 lg:p-12 mb-16 border border-[#D3B16F]/20 shadow-lg">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 bg-gradient-to-br from-[#D3B16F] to-[#5673A2] rounded-xl flex items-center justify-center">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-[#194080]">Areas of Expertise</h2>
              </div>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-bold text-[#194080] mb-4 flex items-center gap-2">
                    <Home className="w-5 h-5 text-[#D3B16F]" /> Loan Programs
                  </h3>
                  <ul className="space-y-3">
                    {expertise.loans.map((item, i) => (
                      <li key={i} className="flex items-center gap-3 text-[#194080]/70 group">
                        <div className="w-6 h-6 rounded-full bg-[#D3B16F]/10 flex items-center justify-center group-hover:bg-[#D3B16F]/20 transition-colors">
                          <CheckCircle className="w-3.5 h-3.5 text-[#D3B16F]" />
                        </div>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-[#194080] mb-4 flex items-center gap-2">
                    <Shield className="w-5 h-5 text-[#D3B16F]" /> Services
                  </h3>
                  <ul className="space-y-3">
                    {expertise.services.map((item, i) => (
                      <li key={i} className="flex items-center gap-3 text-[#194080]/70 group">
                        <div className="w-6 h-6 rounded-full bg-[#194080]/10 flex items-center justify-center group-hover:bg-[#194080]/20 transition-colors">
                          <CheckCircle className="w-3.5 h-3.5 text-[#194080]" />
                        </div>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* Education */}
          <div className="mb-16">
            <AnimatedSection>
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 bg-gradient-to-br from-[#194080] to-[#5673A2] rounded-xl flex items-center justify-center">
                  <GraduationCap className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-[#194080]">Education</h2>
              </div>
            </AnimatedSection>
            
            <div className="grid md:grid-cols-2 gap-6">
              <AnimatedSection delay={100}>
                <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#D3B16F]/10 to-[#5673A2]/10 flex items-center justify-center flex-shrink-0">
                      <GraduationCap className="w-7 h-7 text-[#D3B16F]" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-[#194080]">MBA, Management</h3>
                      <p className="text-[#D3B16F] font-semibold">Florida Institute of Technology</p>
                      <p className="text-sm text-[#194080]/60">2013 - 2015</p>
                    </div>
                  </div>
                </div>
              </AnimatedSection>

              <AnimatedSection delay={200}>
                <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#194080]/10 to-[#5673A2]/10 flex items-center justify-center flex-shrink-0">
                      <Briefcase className="w-7 h-7 text-[#194080]" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-[#194080]">Bachelor of Business Administration</h3>
                      <p className="text-[#D3B16F] font-semibold">Toccoa Falls College</p>
                      <p className="text-sm text-[#194080]/60">2010 - 2012</p>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            </div>
          </div>

          {/* Credentials */}
          <AnimatedSection>
            <div className="bg-white rounded-3xl shadow-xl p-8 lg:p-12 mb-16 border border-gray-100">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 bg-gradient-to-br from-[#194080] to-[#5673A2] rounded-xl flex items-center justify-center">
                  <Award className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-[#194080]">Credentials & Licensing</h2>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="flex items-start gap-4 p-5 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-colors">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#D3B16F]/10 to-[#5673A2]/10 flex items-center justify-center flex-shrink-0">
                    <Award className="w-7 h-7 text-[#D3B16F]" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[#194080]">Licensed Loan Originator</h3>
                    <p className="text-[#D3B16F] font-semibold">NMLS #2059278</p>
                    <p className="text-sm text-[#194080]/60">State Licensed - Georgia</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-5 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-colors">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#194080]/10 to-[#5673A2]/10 flex items-center justify-center flex-shrink-0">
                    <Building2 className="w-7 h-7 text-[#194080]" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[#194080]">Company License</h3>
                    <p className="text-[#D3B16F] font-semibold">Guaranteed Rate, Inc - NMLS #2611</p>
                    <p className="text-sm text-[#194080]/60">DBA Certainty Home Lending</p>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* CTA Section */}
          <AnimatedSection>
            <div className="relative bg-gradient-to-r from-[#194080] via-[#5673A2] to-[#194080] rounded-3xl p-10 lg:p-14 text-center overflow-hidden">
              {/* Decorative elements */}
              <div className="absolute top-0 left-0 w-64 h-64 bg-[#D3B16F]/10 rounded-full blur-[80px]"></div>
              <div className="absolute bottom-0 right-0 w-64 h-64 bg-[#5673A2]/10 rounded-full blur-[80px]"></div>
              
              <div className="relative z-10">
                <h2 className="text-3xl lg:text-4xl font-black text-white mb-4">
                  Ready to Work Together?
                </h2>
                <p className="text-white/70 mb-8 max-w-2xl mx-auto text-lg">
                  Whether you&apos;re a homebuyer seeking expert guidance or a business partner looking to make a greater impact, Ivan Ramirez is the confident, committed, and community-focused mortgage professional ready to help you succeed.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button 
                    onClick={() => setConsentModalOpen(true)}
                    className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-[#D3B16F] to-[#5673A2] text-[#194080] font-bold rounded-full hover:shadow-lg hover:scale-105 transition-all"
                  >
                    Apply for a Mortgage <ArrowRight className="w-5 h-5 ml-2" />
                  </button>
                  <a 
                    href="tel:+14046432230"
                    className="inline-flex items-center justify-center px-8 py-4 bg-white text-[#194080] font-bold rounded-full hover:bg-gray-50 transition-all"
                  >
                    <Phone className="w-5 h-5 mr-2" /> (404) 643-2230
                  </a>
                  <a 
                    href="mailto:ivan@irmortgages.com"
                    className="inline-flex items-center justify-center px-8 py-4 bg-white/10 text-white font-bold rounded-full hover:bg-white/20 transition-all border-2 border-white/30"
                  >
                    <Mail className="w-5 h-5 mr-2" /> Email Me
                  </a>
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* Disclaimer */}
          <AnimatedSection>
            <div className="mt-12 p-6 bg-gray-50 rounded-2xl border border-gray-200">
              <p className="text-xs text-[#194080]/50 text-center leading-relaxed">
                Applicant subject to credit and underwriting approval. Not all applicants will be approved for financing. Receipt of application does not represent an approval for financing or interest rate guarantee. Refinancing your mortgage may increase costs over the term of your loan. Restrictions may apply.
              </p>
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
