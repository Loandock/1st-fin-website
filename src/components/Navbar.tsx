'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Menu, X, Phone, ChevronDown, 
  Home, Building2, Calculator, FileText, 
  DollarSign, ArrowRight, Sparkles
} from 'lucide-react';
import { ConsentModal } from './ConsentModal';

const APPLICATION_URL = "https://apply.certaintyhomelending.com/apply/loan-purpose?emp-id=38605";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [consentModalOpen, setConsentModalOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    setDropdownOpen(false);
  }, [pathname]);

  const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    const isAnchor = href.includes('#');
    if (!isAnchor) return;
    
    const targetId = href.split('#')[1];
    const isHomePage = pathname === '/';
    
    if (isHomePage && targetId) {
      e.preventDefault();
      const element = document.getElementById(targetId);
      if (element) {
        const navbarHeight = 80;
        const elementPosition = element.getBoundingClientRect().top + window.scrollY;
        window.scrollTo({
          top: elementPosition - navbarHeight,
          behavior: 'smooth'
        });
      }
    }
  };

  const mainLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Services', href: '/#services' },
  ];

  const resourceLinks = [
    { name: 'Loan Programs', href: '/loan-programs', icon: Building2, desc: 'FHA, VA, Conventional & more' },
    { name: 'Loan Process', href: '/loan-process', icon: FileText, desc: 'Step-by-step guide' },
    { name: 'First-Time Buyers', href: '/first-time-homebuyers', icon: Home, desc: 'Start your journey' },
    { name: 'Down Payment Help', href: '/down-payment-assistance', icon: DollarSign, desc: 'Assistance programs' },
    { name: 'Calculator', href: '/calculator', icon: Calculator, desc: 'Estimate payments' },
  ];

  const endLinks = [
    { name: 'Reviews', href: '/#testimonials' },
    { name: 'Contact', href: '/#contact' },
  ];

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? 'py-2' 
          : 'py-3'
      }`}>
        {/* Background layer */}
        <div className={`absolute inset-0 transition-all duration-500 ${
          isScrolled 
            ? 'bg-white/95 backdrop-blur-xl shadow-lg shadow-black/5 border-b border-[#194080]/5' 
            : 'bg-white/70 backdrop-blur-md'
        }`} />
        
        <div className="max-w-7xl mx-auto px-4 lg:px-8 relative">
          <div className="flex items-center justify-between h-14 lg:h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group flex-shrink-0">
              <div className="relative w-14 h-14 lg:w-16 lg:h-16 transition-transform duration-300 group-hover:scale-105">
                <Image src="/logo.svg" alt="IR Mortgages" fill className="object-contain" />
              </div>
              <div className="hidden sm:block">
                <span className="text-lg lg:text-xl font-bold text-[#194080]">IR</span>
                <span className="text-lg lg:text-xl font-bold text-[#D3B16F]"> Mortgages</span>
              </div>
            </Link>

            {/* Desktop Navigation - Centered pill */}
            <div className="hidden lg:flex items-center bg-[#194080]/5 rounded-full px-1.5 py-1.5">
              {mainLinks.map((link) => (
                <Link 
                  key={link.name} 
                  href={link.href}
                  onClick={(e) => handleAnchorClick(e, link.href)}
                  className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 ${
                    pathname === link.href 
                      ? 'bg-[#194080] text-white shadow-md' 
                      : 'text-[#194080]/70 hover:text-[#194080] hover:bg-[#194080]/10'
                  }`}
                >
                  {link.name}
                </Link>
              ))}

              {/* Resources Dropdown */}
              <div 
                className="relative"
                onMouseEnter={() => setDropdownOpen(true)}
                onMouseLeave={() => setDropdownOpen(false)}
              >
                <button className={`flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 ${
                  dropdownOpen 
                    ? 'bg-[#194080] text-white shadow-md' 
                    : 'text-[#194080]/70 hover:text-[#194080] hover:bg-[#194080]/10'
                }`}>
                  Resources
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${dropdownOpen ? 'rotate-180' : ''}`} />
                </button>
                
                <div className={`absolute top-full left-1/2 -translate-x-1/2 pt-3 transition-all duration-300 ${
                  dropdownOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2 pointer-events-none'
                }`}>
                  <div className="w-80 bg-white rounded-2xl shadow-2xl shadow-[#194080]/10 border border-[#194080]/5 p-2 overflow-hidden">
                    {/* Dropdown header */}
                    <div className="px-3 py-2 mb-1">
                      <p className="text-xs font-semibold text-[#194080]/40 uppercase tracking-wider">Explore Resources</p>
                    </div>
                    {resourceLinks.map((link) => (
                      <Link 
                        key={link.name} 
                        href={link.href}
                        className="flex items-center gap-3 p-3 rounded-xl hover:bg-gradient-to-r hover:from-[#D3B16F]/5 hover:to-[#5673A2]/5 transition-all duration-300 group"
                      >
                        <div className="w-10 h-10 bg-gradient-to-br from-[#D3B16F] to-[#5673A2] rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-[#D3B16F]/20 transition-all duration-300">
                          <link.icon className="w-5 h-5 text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-[#194080] text-sm group-hover:text-[#D3B16F] transition-colors">{link.name}</p>
                          <p className="text-xs text-[#194080]/50 truncate">{link.desc}</p>
                        </div>
                        <ArrowRight className="w-4 h-4 text-[#194080]/20 group-hover:text-[#D3B16F] group-hover:translate-x-1 transition-all" />
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              {endLinks.map((link) => (
                <Link 
                  key={link.name} 
                  href={link.href}
                  onClick={(e) => handleAnchorClick(e, link.href)}
                  className="px-4 py-2 text-sm font-medium text-[#194080]/70 hover:text-[#194080] hover:bg-[#194080]/10 rounded-full transition-all duration-300"
                >
                  {link.name}
                </Link>
              ))}
            </div>

            {/* Right Side */}
            <div className="hidden lg:flex items-center gap-3">
              <a 
                href="tel:+14046432230" 
                className="text-sm text-[#194080]/60 hover:text-[#194080] flex items-center gap-2 transition-colors duration-300 px-3 py-2 rounded-full hover:bg-[#194080]/5"
              >
                <div className="w-8 h-8 bg-[#194080]/10 rounded-full flex items-center justify-center">
                  <Phone className="w-3.5 h-3.5 text-[#194080]" />
                </div>
                <span className="font-semibold">(404) 643-2230</span>
              </a>
              <button 
                onClick={() => setConsentModalOpen(true)}
                className="relative group px-5 py-2.5 bg-gradient-to-r from-[#D3B16F] to-[#5673A2] text-white font-semibold rounded-full shadow-lg shadow-[#D3B16F]/25 hover:shadow-xl hover:shadow-[#D3B16F]/30 hover:scale-105 transition-all duration-300"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Apply Now
                  <Sparkles className="w-4 h-4" />
                </span>
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="lg:hidden p-2.5 rounded-xl bg-[#194080]/5 hover:bg-[#194080]/10 transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-[#194080]" /> : <Menu className="w-5 h-5 text-[#194080]" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu - Full screen overlay */}
      <div className={`lg:hidden fixed inset-0 z-40 transition-all duration-500 ${
        mobileMenuOpen ? 'visible' : 'invisible'
      }`}>
        {/* Backdrop */}
        <div 
          className={`absolute inset-0 bg-black/20 backdrop-blur-sm transition-opacity duration-500 ${
            mobileMenuOpen ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={() => setMobileMenuOpen(false)}
        />
        
        {/* Menu Panel */}
        <div className={`absolute top-[72px] left-4 right-4 bg-white rounded-2xl shadow-2xl shadow-[#194080]/10 overflow-hidden transition-all duration-500 ${
          mobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
        }`}>
          <div className="p-4 max-h-[70vh] overflow-y-auto">
            {/* Main Links */}
            <div className="space-y-1 mb-4">
              {mainLinks.map((link) => (
                <Link 
                  key={link.name} 
                  href={link.href}
                  onClick={(e) => {
                    handleAnchorClick(e, link.href);
                    setMobileMenuOpen(false);
                  }}
                  className={`block py-3 px-4 rounded-xl font-medium transition-all ${
                    pathname === link.href 
                      ? 'bg-[#194080] text-white' 
                      : 'text-[#194080] hover:bg-[#194080]/5'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            {/* Resources Accordion */}
            <div className="border-t border-[#194080]/10 pt-4 mb-4">
              <button 
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center justify-between w-full py-3 px-4 text-[#194080] font-medium rounded-xl hover:bg-[#194080]/5 transition-colors"
              >
                <span>Resources</span>
                <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${dropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              <div className={`overflow-hidden transition-all duration-300 ${dropdownOpen ? 'max-h-[400px] mt-2' : 'max-h-0'}`}>
                <div className="space-y-1 pl-2">
                  {resourceLinks.map((link) => (
                    <Link 
                      key={link.name} 
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center gap-3 py-3 px-3 text-[#194080]/70 hover:text-[#194080] hover:bg-[#194080]/5 rounded-xl transition-all"
                    >
                      <div className="w-8 h-8 bg-gradient-to-br from-[#D3B16F] to-[#5673A2] rounded-lg flex items-center justify-center">
                        <link.icon className="w-4 h-4 text-white" />
                      </div>
                      <span className="font-medium text-sm">{link.name}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* End Links */}
            <div className="space-y-1 border-t border-[#194080]/10 pt-4 mb-4">
              {endLinks.map((link) => (
                <Link 
                  key={link.name} 
                  href={link.href}
                  onClick={(e) => {
                    handleAnchorClick(e, link.href);
                    setMobileMenuOpen(false);
                  }}
                  className="block py-3 px-4 text-[#194080] font-medium rounded-xl hover:bg-[#194080]/5 transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </div>

            {/* CTA Section */}
            <div className="border-t border-[#194080]/10 pt-4 space-y-3">
              <a 
                href="tel:+14046432230"
                className="flex items-center justify-center gap-2 py-3 px-4 bg-[#194080]/5 rounded-xl text-[#194080] font-medium"
              >
                <Phone className="w-4 h-4" /> 
                (404) 643-2230
              </a>
              <button 
                onClick={() => {
                  setMobileMenuOpen(false);
                  setConsentModalOpen(true);
                }}
                className="w-full py-3.5 px-4 bg-gradient-to-r from-[#D3B16F] to-[#5673A2] text-white font-semibold rounded-xl shadow-lg shadow-[#D3B16F]/20 flex items-center justify-center gap-2"
              >
                Apply Now
                <Sparkles className="w-4 h-4" />
              </button>
            </div>
            
            {/* Footer */}
            <p className="text-xs text-center text-[#194080]/40 pt-4 pb-2">
              Español/English • NMLS #2059278
            </p>
          </div>
        </div>
      </div>

      {/* Consent Modal */}
      <ConsentModal
        isOpen={consentModalOpen}
        onClose={() => setConsentModalOpen(false)}
        redirectUrl={APPLICATION_URL}
      />
    </>
  );
}
