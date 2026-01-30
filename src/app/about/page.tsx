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

  const teamMembers = [
    {
      name: "Cal Castells",
      title: "Branch Manager",
      nmls: "1101261",
      description: "Cal brings years of experience in mortgage lending and team leadership. As Branch Manager, he ensures every client receives personalized attention and expert guidance throughout their home financing journey.",
      highlights: [
        "Expert in investment property financing",
        "Specializes in complex loan structures",
        "Bilingual service (English/Spanish)"
      ]
    },
    {
      name: "Jose Ramirez",
      title: "Sales Manager",
      nmls: "1057601",
      description: "Jose is dedicated to helping families achieve their homeownership dreams. With a focus on first-time buyers and community outreach, he excels at making the mortgage process simple and accessible.",
      highlights: [
        "First-time homebuyer specialist",
        "Down payment assistance expert",
        "Bilingual service (English/Spanish)"
      ]
    }
  ];

  const stats = [
    { icon: Target, value: 100, suffix: "M+", label: "Loans Funded", prefix: "$", color: "gold" },
    { icon: Users, value: 500, suffix: "+", label: "Families Helped", color: "purple" },
    { icon: Sparkles, value: 10, suffix: "+", label: "Years Experience", color: "purple" },
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
    { title: "$100M+ Loans Funded", desc: "Proven track record of getting deals done for families across South Florida" },
    { title: "ITIN & Non-QM Expert", desc: "Specializing in ITIN, DSCR, Bank Statement, and investor loans" },
    { title: "Bilingual Excellence", desc: "Fluent in English and Spanish, serving diverse communities with ease" },
    { title: "Community Focused", desc: "Passionate about growing homeownership in the Hispanic community" },
    { title: "500+ Families Helped", desc: "Hundreds of happy homeowners trust us with their biggest investment" },
    { title: "Local Expertise", desc: "Deep knowledge of the South Florida market and housing programs" }
  ];

  return (
    <div className="min-h-screen font-sans">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#0D3F72] via-[#267AB1] to-[#0D3F72] pt-32 pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-64 h-64 bg-[#267AB1]/20 rounded-full blur-[100px]"
               style={{ transform: `translate(${mousePos.x * 0.5}px, ${mousePos.y * 0.5}px)` }}></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#267AB1]/10 rounded-full blur-[100px]"
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
            {/* Left: Company Logo */}
            <AnimatedSection className="lg:w-2/5">
              <div className="relative group">
                {/* Glow effect */}
                <div className="absolute -inset-2 bg-gradient-to-r from-[#267AB1] via-[#267AB1] to-[#267AB1] rounded-3xl blur-xl opacity-50 group-hover:opacity-70 transition-opacity animate-pulse-slow"></div>
                
                {/* Logo container */}
                <div className="relative bg-white p-8 rounded-3xl shadow-2xl">
                  <Image 
                    src="/logo.svg" 
                    alt="The Mortgage Fellas" 
                    width={400} 
                    height={300}
                    className="w-full object-contain"
                    priority
                  />
                </div>

                {/* Floating badge */}
                <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#267AB1] to-[#267AB1] px-6 py-3 rounded-full shadow-xl border-4 border-[#0D3F72]">
                  <p className="text-[#0D3F72] font-black text-sm whitespace-nowrap">Miramar Branch</p>
                </div>
              </div>
            </AnimatedSection>

            {/* Right: Info */}
            <AnimatedSection className="lg:w-3/5 text-center lg:text-left mt-8 lg:mt-0" delay={200}>
              <div className="inline-block bg-[#267AB1]/20 backdrop-blur-sm px-4 py-2 rounded-full border border-[#267AB1]/40 mb-4">
                <p className="text-[#267AB1] font-bold text-sm uppercase tracking-widest">About Our Team</p>
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-4">
                The Mortgage Fellas
              </h1>
              
              <p className="text-xl sm:text-2xl text-white/80 font-semibold mb-4">
                Bilingual Mortgage Experts • Español/English
              </p>
              
              <p className="text-lg text-white/60 mb-8 max-w-2xl mx-auto lg:mx-0">
                Serving Broward County & South Florida | Passionate About Homeownership
              </p>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 gap-3 max-w-md mx-auto lg:mx-0 mb-8">
                {stats.map((stat) => (
                  <div key={stat.label} className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20 hover:bg-white/15 transition-colors">
                    <div className="text-3xl font-black text-[#267AB1] mb-1">
                      {'prefix' in stat && stat.prefix}{stat.value > 0 ? <Counter end={stat.value} suffix={stat.suffix} /> : stat.suffix}
                    </div>
                    <div className="text-xs text-white/70 uppercase tracking-wide">{stat.label}</div>
                  </div>
                ))}
              </div>

              {/* Quick contact */}
              <div className="flex flex-col sm:flex-row flex-wrap gap-3 justify-center lg:justify-start">
                <a 
                  href="tel:+19545581730"
                  className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-[#267AB1] to-[#267AB1] text-[#0D3F72] font-bold rounded-full hover:shadow-lg hover:scale-105 transition-all"
                >
                  <Phone className="w-4 h-4 mr-2" /> (954) 558-1730
                </a>
                <a 
                  href="mailto:cal@mortgagefellas.com"
                  className="inline-flex items-center justify-center px-6 py-3 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-full hover:bg-white/20 transition-all border-2 border-white/30"
                >
                  <Mail className="w-4 h-4 mr-2" /> Email Us
                </a>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="bg-gradient-to-b from-gray-50 to-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          
          {/* Our Story */}
          <AnimatedSection>
            <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100 mb-16">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-[#267AB1] to-[#267AB1] rounded-xl flex items-center justify-center">
                  <Building2 className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-[#0D3F72]">Our Story</h2>
              </div>
              
              <div className="space-y-4 text-[#0D3F72]/70 leading-relaxed">
                <p>
                  <strong className="text-[#0D3F72]">The Mortgage Fellas</strong> are dedicated to making homeownership accessible for families across South Florida. Located in the heart of Pembroke Pines, our team combines decades of mortgage expertise with a deep commitment to serving our diverse community.
                </p>
                <p>
                  We specialize in helping <strong className="text-[#0D3F72]">first-time homebuyers</strong>, investors, and self-employed borrowers navigate the mortgage process with confidence. Our bilingual team provides personalized service in both English and Spanish, ensuring every client feels understood and supported.
                </p>
                <div className="bg-gradient-to-r from-[#267AB1]/10 to-[#267AB1]/10 p-5 rounded-xl border-l-4 border-[#267AB1] mt-6">
                  <p className="text-[#0D3F72] font-semibold">
                    💡 &quot;Our mission is to make the dream of homeownership a reality for more families—one loan at a time.&quot;
                  </p>
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* Team Members */}
          <div className="mb-16">
            <AnimatedSection>
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 bg-gradient-to-br from-[#267AB1] to-[#267AB1] rounded-xl flex items-center justify-center">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-[#0D3F72]">Meet Our Team</h2>
              </div>
            </AnimatedSection>
            
            <div className="grid md:grid-cols-2 gap-8">
              {teamMembers.map((member, idx) => (
                <AnimatedSection key={member.name} delay={idx * 150}>
                  <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100 h-full hover:shadow-2xl transition-shadow">
                    <div className="flex items-start gap-4 mb-6">
                      <div className="w-16 h-16 bg-gradient-to-br from-[#0D3F72] to-[#267AB1] rounded-2xl flex items-center justify-center flex-shrink-0">
                        <span className="text-white font-bold text-xl">
                          {member.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-[#0D3F72]">{member.name}</h3>
                        <p className="text-[#267AB1] font-semibold">{member.title}</p>
                        <p className="text-sm text-[#0D3F72]/60">NMLS #{member.nmls}</p>
                      </div>
                    </div>
                    
                    <p className="text-[#0D3F72]/70 mb-6 leading-relaxed">
                      {member.description}
                    </p>
                    
                    <div className="space-y-2">
                      {member.highlights.map((highlight, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-[#267AB1] flex-shrink-0" />
                          <span className="text-sm text-[#0D3F72]/70">{highlight}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>

          {/* Why Choose Us */}
          <AnimatedSection>
            <div className="bg-gradient-to-br from-[#0D3F72] to-[#267AB1] rounded-3xl p-8 text-white mb-16">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                  <Award className="w-6 h-6 text-[#267AB1]" />
                </div>
                <h2 className="text-3xl font-bold">Why Choose Us?</h2>
              </div>
              
              <div className="grid md:grid-cols-2 gap-4">
                {whyChoose.map((item) => (
                  <div key={item.title} className="flex items-start gap-3 group">
                    <div className="w-8 h-8 rounded-full bg-[#267AB1]/20 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:bg-[#267AB1]/30 transition-colors">
                      <CheckCircle className="w-4 h-4 text-[#267AB1]" />
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

          {/* Expertise Section */}
          <AnimatedSection>
            <div className="bg-gradient-to-r from-[#267AB1]/5 via-white to-[#267AB1]/5 rounded-3xl p-8 lg:p-12 mb-16 border border-[#267AB1]/20 shadow-lg">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 bg-gradient-to-br from-[#267AB1] to-[#267AB1] rounded-xl flex items-center justify-center">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-[#0D3F72]">Areas of Expertise</h2>
              </div>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-bold text-[#0D3F72] mb-4 flex items-center gap-2">
                    <Home className="w-5 h-5 text-[#267AB1]" /> Loan Programs
                  </h3>
                  <ul className="space-y-3">
                    {expertise.loans.map((item, i) => (
                      <li key={i} className="flex items-center gap-3 text-[#0D3F72]/70 group">
                        <div className="w-6 h-6 rounded-full bg-[#267AB1]/10 flex items-center justify-center group-hover:bg-[#267AB1]/20 transition-colors">
                          <CheckCircle className="w-3.5 h-3.5 text-[#267AB1]" />
                        </div>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-[#0D3F72] mb-4 flex items-center gap-2">
                    <Shield className="w-5 h-5 text-[#267AB1]" /> Services
                  </h3>
                  <ul className="space-y-3">
                    {expertise.services.map((item, i) => (
                      <li key={i} className="flex items-center gap-3 text-[#0D3F72]/70 group">
                        <div className="w-6 h-6 rounded-full bg-[#0D3F72]/10 flex items-center justify-center group-hover:bg-[#0D3F72]/20 transition-colors">
                          <CheckCircle className="w-3.5 h-3.5 text-[#0D3F72]" />
                        </div>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* Credentials */}
          <AnimatedSection>
            <div className="bg-white rounded-3xl shadow-xl p-8 lg:p-12 mb-16 border border-gray-100">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 bg-gradient-to-br from-[#0D3F72] to-[#267AB1] rounded-xl flex items-center justify-center">
                  <Award className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-[#0D3F72]">Licensing Information</h2>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="flex items-start gap-4 p-5 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-colors">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#267AB1]/10 to-[#267AB1]/10 flex items-center justify-center flex-shrink-0">
                    <Building2 className="w-7 h-7 text-[#267AB1]" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[#0D3F72]">Branch NMLS</h3>
                    <p className="text-[#267AB1] font-semibold">#1620197</p>
                    <p className="text-sm text-[#0D3F72]/60">Miramar Branch</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-5 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-colors">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#0D3F72]/10 to-[#267AB1]/10 flex items-center justify-center flex-shrink-0">
                    <Award className="w-7 h-7 text-[#0D3F72]" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[#0D3F72]">Company NMLS</h3>
                    <p className="text-[#267AB1] font-semibold">#185076</p>
                    <p className="text-sm text-[#0D3F72]/60">1st Financial Mortgage</p>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* CTA Section */}
          <AnimatedSection>
            <div className="relative bg-gradient-to-r from-[#0D3F72] via-[#267AB1] to-[#0D3F72] rounded-3xl p-10 lg:p-14 text-center overflow-hidden">
              {/* Decorative elements */}
              <div className="absolute top-0 left-0 w-64 h-64 bg-[#267AB1]/10 rounded-full blur-[80px]"></div>
              <div className="absolute bottom-0 right-0 w-64 h-64 bg-[#267AB1]/10 rounded-full blur-[80px]"></div>
              
              <div className="relative z-10">
                <h2 className="text-3xl lg:text-4xl font-black text-white mb-4">
                  Ready to Get Started?
                </h2>
                <p className="text-white/70 mb-8 max-w-2xl mx-auto text-lg">
                  Whether you&apos;re buying your first home, investing in property, or refinancing, our team is here to help you succeed.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button 
                    onClick={() => setConsentModalOpen(true)}
                    className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-[#267AB1] to-[#267AB1] text-[#0D3F72] font-bold rounded-full hover:shadow-lg hover:scale-105 transition-all"
                  >
                    Apply for a Mortgage <ArrowRight className="w-5 h-5 ml-2" />
                  </button>
                  <a 
                    href="tel:+19545581730"
                    className="inline-flex items-center justify-center px-8 py-4 bg-white text-[#0D3F72] font-bold rounded-full hover:bg-gray-50 transition-all"
                  >
                    <Phone className="w-5 h-5 mr-2" /> (954) 558-1730
                  </a>
                  <a 
                    href="mailto:cal@mortgagefellas.com"
                    className="inline-flex items-center justify-center px-8 py-4 bg-white/10 text-white font-bold rounded-full hover:bg-white/20 transition-all border-2 border-white/30"
                  >
                    <Mail className="w-5 h-5 mr-2" /> Email Us
                  </a>
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* Disclaimer */}
          <AnimatedSection>
            <div className="mt-12 p-6 bg-gray-50 rounded-2xl border border-gray-200">
              <p className="text-xs text-[#0D3F72]/50 text-center leading-relaxed">
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
