"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ConsentModal } from "@/components/ConsentModal";
import {
  Home,
  Phone,
  Mail,
  MapPin,
  ChevronRight,
  Star,
  ArrowRight,
  Building2,
  Clock,
  Shield,
  TrendingUp,
  Heart,
  DollarSign,
  CheckCircle,
  Sparkles,
  Target,
  Users,
} from "lucide-react";

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

export default function LandingPage() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [formStatus, setFormStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [formMessage, setFormMessage] = useState('');
  const [consentModalOpen, setConsentModalOpen] = useState(false);
  
  const APPLICATION_URL = "https://apply.certaintyhomelending.com/apply/loan-purpose?emp-id=38605";
  const [phoneNumber, setPhoneNumber] = useState('');

  // Format phone number as (XXX) XXX-XXXX
  const formatPhoneNumber = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 3) return numbers;
    if (numbers.length <= 6) return `(${numbers.slice(0, 3)}) ${numbers.slice(3)}`;
    return `(${numbers.slice(0, 3)}) ${numbers.slice(3, 6)}-${numbers.slice(6, 10)}`;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value);
    setPhoneNumber(formatted);
  };

  // Smooth scroll to section
  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault();
    const element = document.getElementById(sectionId);
    if (element) {
      const navbarHeight = 80;
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: elementPosition - navbarHeight,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      setMousePos({ x: (e.clientX / window.innerWidth - 0.5) * 20, y: (e.clientY / window.innerHeight - 0.5) * 20 });
    };
    window.addEventListener("mousemove", handleMouse);
    return () => {
      window.removeEventListener("mousemove", handleMouse);
    };
  }, []);

  const services = [
    { icon: Home, title: "Home Purchase", desc: "First-time buyer or upgrading — we match you with the perfect loan.", link: "/first-time-homebuyers" },
    { icon: Building2, title: "DSCR & Investor Loans", desc: "Build your real estate portfolio with DSCR and investor-focused financing.", link: "/loan-programs" },
    { icon: Shield, title: "ITIN Loans", desc: "No SSN? No problem. Homeownership is possible with ITIN financing.", link: "/loan-programs" },
    { icon: TrendingUp, title: "Bank Statement Loans", desc: "Self-employed? Use bank statements instead of tax returns.", link: "/loan-programs" },
    { icon: DollarSign, title: "HELOC & Cash-Out", desc: "Tap into your home's equity for renovations, debt, or investments.", link: "/loan-programs" },
    { icon: Clock, title: "Down Payment Help", desc: "Programs to help cover your down payment and closing costs.", link: "/down-payment-assistance" },
  ];

  const process = [
    { title: "Free Consultation", desc: "Share your goals and we'll map the path forward." },
    { title: "Get Pre-Approved", desc: "Quick approval so you can shop with confidence." },
    { title: "We Handle Details", desc: "We manage paperwork, you stay informed." },
    { title: "Close & Celebrate", desc: "Sign, get keys, welcome home." },
  ];

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus('loading');
    
    const form = e.currentTarget;
    
    try {
      // EmailJS configuration - update these for Ivan
      const SERVICE_ID = 'service_ivan'; // TODO: Update with Ivan's EmailJS service ID
      const TEMPLATE_TO_IVAN = 'template_ivan'; // TODO: Update with Ivan's template ID
      const TEMPLATE_TO_LEAD = 'template_lead'; // TODO: Update with lead template ID
      const PUBLIC_KEY = 'your_public_key'; // TODO: Update with Ivan's public key
      
      // @ts-expect-error - EmailJS is loaded from CDN
      const emailjs = window.emailjs;
      
      // Send notification email to Ivan
      const notificationResult = await emailjs.sendForm(
        SERVICE_ID,
        TEMPLATE_TO_IVAN,
        form,
        PUBLIC_KEY
      );
      
      // Send confirmation email to the lead
      if (notificationResult.text === 'OK') {
        await emailjs.sendForm(
          SERVICE_ID,
          TEMPLATE_TO_LEAD,
          form,
          PUBLIC_KEY
        );
        
        setFormStatus('success');
        setFormMessage('Thank you! Check your email for confirmation. We\'ll be in touch within 24 hours.');
        form.reset();
        setPhoneNumber('');
      } else {
        setFormStatus('error');
        setFormMessage('Something went wrong. Please try again or call us directly.');
      }
    } catch {
      setFormStatus('error');
      setFormMessage('Something went wrong. Please try again or call us directly at (404) 643-2230.');
    }
  };

  const testimonials = [
    { name: "Evelin Martinez", location: "First-Time Buyer", text: "Ivan was excellent. Always willing to help and answered every question that I had, no matter if big or small. It also helped tremendously that he's bilingual!" },
    { name: "Maria B.", location: "Home Buyer", text: "The purchase of a house and the mortgage application can be stressful. Ivan Ramirez made it easier for me. With patience he explained to me the whole process." },
    { name: "Juan Cattaneo", location: "Home Buyer", text: "Ivan was great, he was with us every step of the way, he answered every phone call and doubts we had and helped make the process the easiest." },
    { name: "John Gomez", location: "First-Time Buyer", text: "This experience was amazing from start to finish. Ivan and his team walk you through the process with care and patience. They also help you stay educated." },
    { name: "Leydi G.", location: "Home Buyer", text: "Excellent team. I was very happy to have achieved my dream of buying a home. I 100% recommend this team; all of their work was highly efficient!" },
    { name: "Cesar Vega", location: "First-Time Buyer", text: "Really good service! I had a great experience for a first time home buyer!" },
    { name: "Lucy Castillo", location: "Home Buyer", text: "The best team. Thank you so much for your help." },
    { name: "Jorge Arias", location: "Home Buyer", text: "Excellent work team attentive to everything we seek, God bless you!" },
    { name: "Alma Valadez", location: "Home Buyer", text: "Excellent job, professional, and highly recommended." },
  ];

  return (
    <div className="min-h-screen overflow-x-hidden">
      <Navbar />

      {/* === HERO - THE WOW FACTOR === */}
      <section id="home" className="gradient-section-1 relative min-h-screen pt-16 overflow-hidden">
        {/* Animated Background Orbs */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-[10%] w-[500px] h-[500px] bg-gradient-to-br from-[#D3B16F]/30 to-[#5673A2]/20 rounded-full blur-[100px] animate-pulse-slow" 
               style={{ transform: `translate(${mousePos.x * 0.5}px, ${mousePos.y * 0.5}px)` }} />
          <div className="absolute bottom-20 right-[10%] w-[400px] h-[400px] bg-gradient-to-br from-[#194080]/20 to-[#D3B16F]/10 rounded-full blur-[80px] animate-pulse-slow animation-delay-1000"
               style={{ transform: `translate(${mousePos.x * -0.3}px, ${mousePos.y * -0.3}px)` }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-[#5673A2]/10 to-transparent rounded-full blur-[120px]" />
        </div>

        {/* Grid Pattern Overlay */}
        <div className="absolute inset-0 opacity-[0.04]" style={{
          backgroundImage: `linear-gradient(#194080 1px, transparent 1px), linear-gradient(90deg, #194080 1px, transparent 1px)`,
          backgroundSize: '80px 80px'
        }} />
        
        {/* Diagonal accent lines - subtle depth */}
        <div className="absolute inset-0 opacity-[0.02]" style={{
          backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 100px, #D3B16F 100px, #D3B16F 101px)`,
        }} />
        
        {/* Gold accent dots at intersections - very subtle */}
        <div className="absolute inset-0 opacity-[0.025]" style={{
          backgroundImage: `radial-gradient(circle at center, #D3B16F 2px, transparent 2px)`,
          backgroundSize: '80px 80px',
          backgroundPosition: '40px 40px'
        }} />

        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-10 lg:py-12 relative z-10">
          {/* BENTO GRID HERO */}
          <div className="grid grid-cols-12 gap-4 lg:gap-5 auto-rows-[minmax(80px,auto)]">
            
            {/* Main Headline - spans 8 cols, 2 rows */}
            <div className="col-span-12 lg:col-span-8 row-span-2 flex flex-col justify-center">
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full shadow-sm w-fit">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#D3B16F] opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[#D3B16F]"></span>
                  </span>
                  <span className="text-sm font-medium text-[#194080]">Español/English • Bilingual Service</span>
        </div>

                <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold text-[#194080] tracking-tight">
                  <span className="block animate-fade-in leading-[1.1]">More Than</span>
                  <span className="block animate-fade-in animation-delay-100 gradient-text leading-[1.2] pb-2">A Mortgage</span>
              </h1>
              
                <p className="text-lg lg:text-xl text-[#194080]/60 max-w-xl leading-relaxed animate-fade-in animation-delay-300">
                  Helping families achieve the dream of homeownership with integrity and personalized service.
                </p>

                <div className="flex flex-wrap gap-3 pt-2 animate-fade-in animation-delay-500">
                  <button onClick={() => setConsentModalOpen(true)} className="btn-primary text-base">
                    Apply Now <ArrowRight className="w-5 h-5" />
                  </button>
                  <a href="#services" onClick={(e) => scrollToSection(e, 'services')} className="btn-outline text-base cursor-pointer">
                    Explore Services
                  </a>
                </div>
              </div>
            </div>

            {/* Team Card - Logo */}
            <div className="col-span-6 sm:col-span-8 lg:col-span-4 row-span-3 rounded-2xl overflow-hidden -mt-4"
                 style={{ transform: `translate(${mousePos.x * -0.1}px, ${mousePos.y * -0.1}px)` }}>
              <div className="relative h-full min-h-[350px] lg:min-h-[400px]">
                <Image src="/logo.svg" alt="IR Mortgages" fill className="object-contain scale-110" />
              </div>
            </div>

            {/* Stats Row - 4 cards in even 2x2 grid */}
            <div className="col-span-6 sm:col-span-3 glass-card rounded-2xl p-4 text-center hover-lift">
              <p className="text-2xl lg:text-3xl font-bold text-[#194080]">$<Counter end={100} />M+</p>
              <p className="text-xs text-[#194080]/50">Loans Funded</p>
            </div>
            <div className="col-span-6 sm:col-span-3 glass-card rounded-2xl p-4 text-center hover-lift">
              <p className="text-2xl lg:text-3xl font-bold text-[#194080]"><Counter end={500} />+</p>
              <p className="text-xs text-[#194080]/50">Families Helped</p>
            </div>
            <div className="col-span-6 sm:col-span-3 glass-card rounded-2xl p-4 text-center hover-lift">
              <div className="flex items-center justify-center gap-1 mb-1">
                <span className="text-2xl lg:text-3xl font-bold text-[#194080]">5.0</span>
                <Star className="w-5 h-5 fill-[#D3B16F] text-[#D3B16F]" />
              </div>
              <p className="text-xs text-[#194080]/50">Client Rating</p>
            </div>
            <div className="col-span-6 sm:col-span-3 glass-card rounded-2xl p-4 text-center hover-lift">
              <p className="text-2xl lg:text-3xl font-bold text-[#194080]">Bilingual</p>
              <p className="text-xs text-[#194080]/50">Español/English</p>
            </div>
          </div>
        </div>

      </section>

      {/* === ABOUT === */}
      <section id="about" className="gradient-section-2 py-20 lg:py-28 relative overflow-hidden">
        {/* Vertical Lines Pattern - continues from hero */}
        <div className="absolute inset-0 opacity-[0.035]" style={{
          backgroundImage: `linear-gradient(90deg, #194080 1px, transparent 1px)`,
          backgroundSize: '80px 100%',
          maskImage: 'linear-gradient(to bottom, black 0%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, black 0%, transparent 100%)'
        }} />
        {/* Dots emerging - creates transition effect */}
        <div className="absolute inset-0 opacity-[0.04]" style={{
          backgroundImage: `radial-gradient(#194080 1.5px, transparent 1.5px)`,
          backgroundSize: '40px 40px',
          maskImage: 'linear-gradient(to bottom, transparent 30%, black 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, transparent 30%, black 100%)'
        }} />
        {/* Subtle gold accent dots */}
        <div className="absolute inset-0 opacity-[0.02]" style={{
          backgroundImage: `radial-gradient(#D3B16F 2px, transparent 2px)`,
          backgroundSize: '80px 80px',
          maskImage: 'linear-gradient(to bottom, transparent 60%, black 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, transparent 60%, black 100%)'
        }} />
        
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <AnimatedSection>
            <div className="grid lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-5">
                {/* Ivan Photo */}
                <div className="relative mb-6">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#D3B16F]/30 to-[#5673A2]/20 rounded-3xl blur-2xl" />
                  <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
                    <Image src="/ivan.jpg" alt="Ivan Ramirez" width={500} height={600} className="object-cover w-full" />
                  </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { icon: Target, value: "$100M+", label: "Loans Funded", color: "gold" },
                    { icon: Users, value: "500+", label: "Families Helped", color: "purple" },
                    { icon: Clock, value: "5+", label: "Years Experience", color: "purple" },
                    { icon: Sparkles, value: "Bilingual", label: "Español/English", color: "gold" },
                  ].map((item, i) => (
                    <AnimatedSection key={item.label} delay={i * 100}>
                      <div className="card p-4 rounded-xl text-center">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-2 mx-auto ${item.color === 'gold' ? 'bg-gradient-to-br from-[#D3B16F] to-[#5673A2]' : 'bg-gradient-to-br from-[#194080] to-[#5673A2]'}`}>
                          <item.icon className="w-5 h-5 text-white" />
                    </div>
                        <p className="text-lg font-bold text-[#194080]">{item.value}</p>
                        <p className="text-xs text-[#194080]/50">{item.label}</p>
                    </div>
                    </AnimatedSection>
                ))}
              </div>
            </div>

              <div className="lg:col-span-7">
                <AnimatedSection delay={200}>
                  <p className="text-[#D3B16F] font-bold uppercase tracking-wide text-sm mb-4">About Ivan</p>
                  <h2 className="text-4xl lg:text-5xl font-bold text-[#194080] leading-tight mb-6">
                    Your Trusted Bilingual<br /><span className="gradient-text">Mortgage Partner</span>
                  </h2>
                  <p className="text-lg text-[#194080]/60 leading-relaxed mb-8">
                    A proud Colombian-American based in Lawrenceville, GA. Ivan brings warmth, dedication, and a solutions-oriented mindset to every client interaction. Fluent in Spanish and English, he's committed to growing homeownership within the Hispanic community.
                  </p>
                </AnimatedSection>

                <div className="space-y-4 mb-6">
                  {[
                    { icon: Heart, text: "$100M+ in loans funded for families across Georgia" },
                    { icon: Shield, text: "Specializing in ITIN, DSCR, Bank Statement & Investor loans" },
                    { icon: TrendingUp, text: "Expert in first-time buyer and down payment assistance" },
                  ].map((item, i) => (
                    <AnimatedSection key={item.text} delay={300 + i * 100}>
                      <div className="flex items-center gap-4 p-4 bg-white/50 rounded-xl">
                        <div className="w-10 h-10 bg-gradient-to-br from-[#D3B16F] to-[#5673A2] rounded-lg flex items-center justify-center flex-shrink-0">
                          <item.icon className="w-5 h-5 text-white" />
                  </div>
                        <p className="text-[#194080] font-medium">{item.text}</p>
                  </div>
                    </AnimatedSection>
                  ))}
                </div>

                <AnimatedSection delay={600}>
                  <Link href="/about" className="inline-flex items-center gap-2 text-[#D3B16F] font-semibold hover:text-[#5673A2] transition-colors group">
                    Meet Ivan Ramirez
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </AnimatedSection>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* === SERVICES === */}
      <section id="services" className="gradient-section-3 py-20 lg:py-28 relative overflow-hidden">
        {/* Dots pattern - full coverage */}
        <div className="absolute inset-0 opacity-[0.05]" style={{
          backgroundImage: `radial-gradient(#194080 1.5px, transparent 1.5px)`,
          backgroundSize: '40px 40px'
        }} />
        {/* Hexagonal/honeycomb subtle pattern */}
        <div className="absolute inset-0 opacity-[0.02]" style={{
          backgroundImage: `radial-gradient(circle at 0% 50%, #D3B16F 2px, transparent 2px), radial-gradient(circle at 100% 50%, #D3B16F 2px, transparent 2px)`,
          backgroundSize: '60px 35px',
          backgroundPosition: '0 0, 30px 17.5px'
        }} />
        {/* Diagonal lines for depth */}
        <div className="absolute inset-0 opacity-[0.015]" style={{
          backgroundImage: `repeating-linear-gradient(-45deg, transparent, transparent 120px, #194080 120px, #194080 121px)`
        }} />
        
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <AnimatedSection>
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12">
              <div>
                <p className="text-[#194080] font-bold uppercase tracking-wide text-sm mb-3">Our Services</p>
                <h2 className="text-4xl lg:text-5xl font-bold text-[#194080]">
                  Solutions for <span className="gradient-text">Every Need</span>
            </h2>
              </div>
              <a href="#contact" onClick={(e) => scrollToSection(e, 'contact')} className="btn-secondary self-start lg:self-auto cursor-pointer">
                Get Started <ArrowRight className="w-5 h-5" />
              </a>
          </div>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {services.map((service, i) => (
              <AnimatedSection key={service.title} delay={i * 80}>
                <Link href={service.link} className="group card p-6 rounded-2xl h-full hover:bg-[#194080] transition-colors duration-300 block">
                  <div className="w-14 h-14 bg-gradient-to-br from-[#D3B16F] to-[#5673A2] rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                    <service.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-[#194080] group-hover:text-white mb-2 transition-colors">{service.title}</h3>
                  <p className="text-[#194080]/60 group-hover:text-white/70 mb-4 transition-colors text-sm leading-relaxed">{service.desc}</p>
                  <span className="text-[#D3B16F] font-semibold inline-flex items-center text-sm">
                    Learn More <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Link>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* === PROCESS === */}
      <section id="process" className="gradient-section-4 py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <AnimatedSection>
            <div className="max-w-2xl mb-12">
              <p className="text-[#D3B16F] font-bold uppercase tracking-wide text-sm mb-3">The Process</p>
              <h2 className="text-4xl lg:text-5xl font-bold text-[#194080] leading-tight">
                Four Steps to <span className="gradient-text">Your New Home</span>
            </h2>
          </div>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {process.map((step, i) => (
              <AnimatedSection key={step.title} delay={i * 100}>
                <div className="relative">
                  {i < 3 && <div className="hidden lg:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-[#D3B16F] to-transparent z-0" />}
                  <div className="relative z-10 card p-6 rounded-2xl">
                    <div className="w-14 h-14 bg-gradient-to-br from-[#D3B16F] to-[#5673A2] rounded-full flex items-center justify-center text-white text-xl font-bold mb-4 shadow-lg">
                      {i + 1}
                    </div>
                    <h3 className="text-lg font-bold text-[#194080] mb-2">{step.title}</h3>
                    <p className="text-[#194080]/60 text-sm">{step.desc}</p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>

          <AnimatedSection delay={400}>
            <div className="mt-12 text-center">
              <a href="#contact" onClick={(e) => scrollToSection(e, 'contact')} className="btn-secondary text-lg cursor-pointer">
                Start Your Application <ArrowRight className="w-5 h-5" />
              </a>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* === TESTIMONIALS === */}
      <section id="testimonials" className="gradient-section-5 py-16 lg:py-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 mb-10">
          <AnimatedSection>
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
              <div>
                <p className="text-[#D3B16F] font-bold uppercase tracking-wide text-sm mb-3">Testimonials</p>
                <h2 className="text-4xl lg:text-5xl font-bold text-white">What Our Clients Say</h2>
              </div>
              <a 
                href="https://www.facebook.com/profile.php?id=61586206063239" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 px-6 py-3 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 hover:bg-white/20 transition-all self-start lg:self-auto"
              >
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                <span className="text-white font-semibold text-sm">View All Reviews</span>
                <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </AnimatedSection>
        </div>

        <div className="relative">
          <div className="flex gap-5 animate-scroll">
            {[...testimonials, ...testimonials].map((t, i) => (
              <div key={i} className="flex-shrink-0 w-[350px] bg-white rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-shadow">
                <div className="flex gap-0.5 mb-3">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} className="w-4 h-4 fill-[#D3B16F] text-[#D3B16F]" />
                  ))}
                </div>
                <p className="text-[#194080]/80 leading-relaxed mb-4 text-sm">&quot;{t.text}&quot;</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-[#194080] to-[#5673A2] rounded-full flex items-center justify-center text-white text-xs font-bold">
                    {t.name.split(' ').map(n => n[0]).slice(0,2).join('')}
                  </div>
                  <div>
                    <p className="font-semibold text-[#194080] text-sm">{t.name}</p>
                    <p className="text-xs text-[#194080]/50">{t.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Facebook CTA */}
        <div className="max-w-7xl mx-auto px-6 lg:px-8 mt-10">
          <AnimatedSection>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-[#1877F2] rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </div>
                <div className="text-center sm:text-left">
                  <p className="text-white font-bold">See More Reviews on Facebook</p>
                  <p className="text-white/60 text-sm">Join our community and read real client stories</p>
                </div>
              </div>
              <a 
                href="https://www.facebook.com/profile.php?id=61586206063239" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#1877F2] text-white font-bold rounded-full hover:bg-[#166FE5] transition-colors shadow-lg hover:shadow-xl"
              >
                Visit Our Page
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </AnimatedSection>
        </div>

        <style jsx>{`
          @keyframes scroll {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .animate-scroll {
            animation: scroll 35s linear infinite;
          }
          .animate-scroll:hover {
            animation-play-state: paused;
          }
        `}</style>
      </section>

      {/* === CONTACT === */}
      <section id="contact" className="gradient-section-6 py-20 lg:py-28 relative overflow-hidden">
        {/* Diagonal Lines Pattern - fades in */}
        <div className="absolute inset-0 opacity-[0.04]" style={{
          backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 100px, rgba(255,255,255,0.3) 100px, rgba(255,255,255,0.3) 101px)`,
          maskImage: 'linear-gradient(to bottom, transparent 0%, black 15%, black 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 15%, black 100%)'
        }} />
        {/* Gold accent diagonal - opposite direction */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `repeating-linear-gradient(-45deg, transparent, transparent 150px, #D3B16F 150px, #D3B16F 151px)`
        }} />
        {/* Subtle dot grid */}
        <div className="absolute inset-0 opacity-[0.02]" style={{
          backgroundImage: `radial-gradient(rgba(255,255,255,0.5) 1px, transparent 1px)`,
          backgroundSize: '30px 30px'
        }} />
        
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <AnimatedSection>
            <div className="max-w-2xl mb-16">
              <h2 className="text-4xl lg:text-5xl font-bold text-white leading-tight mb-4">
                Ready to Start Your <span className="text-[#D3B16F]">Journey?</span>
              </h2>
              <p className="text-lg text-white/60">Free, no-obligation consultation. Let&apos;s find your perfect loan.</p>
            </div>
          </AnimatedSection>

          <div className="grid lg:grid-cols-5 gap-8">
            <AnimatedSection className="lg:col-span-3" delay={100}>
              <div className="card p-8 rounded-3xl">
                {formStatus === 'success' ? (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="w-8 h-8 text-green-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-[#194080] mb-2">Message Sent!</h3>
                    <p className="text-[#194080]/60 mb-6">{formMessage}</p>
                    <button 
                      onClick={() => setFormStatus('idle')} 
                      className="text-[#D3B16F] font-semibold hover:underline"
                    >
                      Send another message
                    </button>
                  </div>
                ) : (
<form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <input type="text" name="name" placeholder="Full Name" className="input" required />
                      <input type="email" name="email" placeholder="Email" className="input" required />
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <input 
                        type="tel" 
                        name="phone" 
                        placeholder="(555) 123-4567" 
                        className="input" 
                        required 
                        value={phoneNumber}
                        onChange={handlePhoneChange}
                        maxLength={14}
                      />
                      <select name="interest" className="input text-[#194080]/60" required>
                        <option value="">How can we help?</option>
                        <option value="Buying a Home">Buying a Home</option>
                        <option value="Refinancing">Refinancing</option>
                        <option value="Investment Property">Investment Property</option>
                        <option value="Pre-Approval">Pre-Approval</option>
                      </select>
                    </div>
                    <textarea name="message" rows={3} placeholder="Tell us about your goals..." className="input resize-none" />
                    
                    {/* SMS Opt-in Checkbox for A2P Compliance */}
                    <div className="border border-[#194080]/10 rounded-xl p-4 bg-[#194080]/5">
                      <div className="flex items-start gap-3">
                  <input
                          type="checkbox" 
                          id="sms-optin" 
                          name="sms_optin"
                          className="mt-1 w-4 h-4 text-[#D3B16F] border-gray-300 rounded focus:ring-[#D3B16F] focus:ring-2 cursor-pointer"
                        />
                        <div className="flex-1">
                          <label htmlFor="sms-optin" className="text-sm font-medium text-[#194080] cursor-pointer">
                            I agree to receive SMS notifications and marketing texts from Ivan Ramirez (optional)
                          </label>
                          <p className="text-xs text-[#194080]/60 mt-2 leading-relaxed">
                            By checking this box, you consent to receive SMS messages from Ivan Ramirez at Guaranteed Rate. Message frequency varies. Standard message and data rates may apply. Reply STOP to opt out anytime. Reply HELP for assistance. Consent is not required for purchase. View our{' '}
                            <a href="/privacy-policy" className="text-[#D3B16F] hover:underline">Privacy Policy</a> and{' '}
                            <a href="/sms-policy" className="text-[#D3B16F] hover:underline">SMS Policy</a>.
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    {formStatus === 'error' && (
                      <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
                        {formMessage}
                      </div>
                    )}
                    
                    <button 
                      type="submit" 
                      disabled={formStatus === 'loading'}
                      className="btn-primary w-full justify-center disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {formStatus === 'loading' ? (
                        <>
                          <svg className="animate-spin w-5 h-5 mr-2" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                          </svg>
                          Sending...
                        </>
                      ) : (
                        <>Send Message <ArrowRight className="w-5 h-5" /></>
                      )}
                    </button>
                </form>
                )}
              </div>
            </AnimatedSection>

            <div className="lg:col-span-2 space-y-4">
              <AnimatedSection delay={200}>
                <div className="card-dark p-6 rounded-2xl">
                  <h3 className="font-bold text-white mb-4">Contact</h3>
                  <div className="space-y-4">
                    {[
                      { icon: Phone, value: "(404) 643-2230" },
                      { icon: Mail, value: "ivan@irmortgages.com" },
                      { icon: MapPin, value: "1735 North Brown Road, Suite 180, Lawrenceville, GA 30043" },
                    ].map((item) => (
                      <div key={item.value} className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
                          <item.icon className="w-4 h-4 text-[#D3B16F]" />
                        </div>
                        <span className="text-white/80 text-sm">{item.value}</span>
          </div>
                    ))}
        </div>
                </div>
              </AnimatedSection>

              <AnimatedSection delay={300}>
                <div className="card p-6 rounded-2xl">
                  <h4 className="font-bold text-[#194080] mb-3">Hours</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between text-[#194080]/60">
                      <span>Mon - Fri</span>
                      <span className="font-medium text-[#194080]">9AM - 6PM</span>
                    </div>
                    <div className="flex justify-between text-[#194080]/60">
                      <span>Saturday</span>
                      <span className="font-medium text-[#194080]">10AM - 4PM</span>
              </div>
                    <div className="flex justify-between text-[#194080]/60">
                      <span>Sunday</span>
                      <span className="font-medium text-[#194080]">Closed</span>
            </div>
            </div>
            </div>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>

      {/* === FOOTER === */}
      <Footer />

      {/* Consent Modal */}
      <ConsentModal
        isOpen={consentModalOpen}
        onClose={() => setConsentModalOpen(false)}
        redirectUrl={APPLICATION_URL}
      />
    </div>
  );
}
