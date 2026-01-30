'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Phone, Mail, MapPin } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-[#0D0D0D] text-white">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          
          {/* Company Info */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-4 mb-6">
              <span className="text-2xl font-bold">
                The Mortgage <span className="text-[#267AB1]">Fellas</span>
              </span>
            </Link>
            
            <div className="flex gap-4 items-start mb-6">
              {/* Equal Housing Logo */}
              <div className="flex-shrink-0 bg-white rounded p-1">
                <svg viewBox="0 0 100 100" className="w-16 h-16" fill="#0D0D0D">
                  <path d="M50 5L5 45h15v50h60V45h15L50 5zm0 12l30 28v43H20V45l30-28z"/>
                  <text x="50" y="65" textAnchor="middle" fontSize="10" fontWeight="bold">EQUAL</text>
                  <text x="50" y="78" textAnchor="middle" fontSize="10" fontWeight="bold">HOUSING</text>
                  <text x="50" y="91" textAnchor="middle" fontSize="8">LENDER</text>
                </svg>
              </div>
              <div className="text-sm">
                <p className="font-semibold mb-1">1st Financial Mortgage</p>
                <p className="text-white/60 text-xs mb-1">Miramar Branch</p>
                <p className="text-white/60 mb-1">1911 NW 150th Ave</p>
                <p className="text-white/60 mb-1">Suite #104</p>
                <p className="text-white/60 mb-1">Pembroke Pines, FL 33028</p>
                <p className="text-white/60">Branch NMLS #1620197</p>
                <p className="text-white/60">Company NMLS #185076</p>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex gap-3">
              <a href="#" target="_blank" rel="noopener noreferrer" className="w-9 h-9 bg-white/10 rounded-lg flex items-center justify-center hover:bg-[#1877F2] transition-colors" aria-label="Facebook">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/" className="text-white/60 hover:text-[#267AB1] transition-colors">Home</Link></li>
              <li><Link href="/loan-programs" className="text-white/60 hover:text-[#267AB1] transition-colors">Loan Programs</Link></li>
              <li><Link href="/loan-process" className="text-white/60 hover:text-[#267AB1] transition-colors">Loan Process</Link></li>
              <li><Link href="/calculator" className="text-white/60 hover:text-[#267AB1] transition-colors">Mortgage Calculator</Link></li>
              <li><Link href="/first-time-homebuyers" className="text-white/60 hover:text-[#267AB1] transition-colors">First-Time Buyers</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="https://apply.certaintyhomelending.com/apply/loan-purpose?emp-id=38605" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-[#267AB1] transition-colors">
                  Apply for a Mortgage
                </a>
              </li>
              <li>
                <a href="https://nmlsconsumeraccess.org/" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-[#267AB1] transition-colors">
                  NMLS Consumer Access
                </a>
              </li>
              <li>
                <a href="https://www.consumerfinance.gov/owning-a-home/" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-[#267AB1] transition-colors">
                  CFPB Homebuying Guide
                </a>
              </li>
              <li>
                <a href="https://www.floridahousing.org/" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-[#267AB1] transition-colors">
                  Florida Housing Programs
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="tel:+17862628718" className="flex items-center gap-2 text-white/60 hover:text-[#267AB1] transition-colors">
                  <Phone className="w-4 h-4 text-[#267AB1]" />
                  (786) 262-8718
                </a>
              </li>
              <li>
                <a href="mailto:cal@mortgagefellas.com" className="flex items-center gap-2 text-white/60 hover:text-[#267AB1] transition-colors">
                  <Mail className="w-4 h-4 text-[#267AB1]" />
                  cal@mortgagefellas.com
                </a>
              </li>
              <li>
                <div className="flex items-start gap-2 text-white/60">
                  <MapPin className="w-4 h-4 text-[#267AB1] flex-shrink-0 mt-0.5" />
                  <span>1911 NW 150th Ave<br />Suite #104<br />Pembroke Pines, FL 33028</span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Legal Links */}
        <div className="border-t border-white/10 pt-6 pb-6">
          <div className="flex flex-wrap justify-center items-center gap-3 text-xs">
            <Link href="/privacy-policy" className="text-white/50 hover:text-[#267AB1] transition-colors">Privacy Policy</Link>
            <span className="text-white/20">|</span>
            <Link href="/terms-of-service" className="text-white/50 hover:text-[#267AB1] transition-colors">Terms of Service</Link>
            <span className="text-white/20">|</span>
            <Link href="/sms-policy" className="text-white/50 hover:text-[#267AB1] transition-colors">SMS Policy</Link>
            <span className="text-white/20">|</span>
            <Link href="/legal-disclaimer" className="text-white/50 hover:text-[#267AB1] transition-colors">Legal Disclaimer</Link>
            <span className="text-white/20">|</span>
            <Link href="/licensing" className="text-white/50 hover:text-[#267AB1] transition-colors">Licensing</Link>
            <span className="text-white/20">|</span>
            <Link href="/accessibility" className="text-white/50 hover:text-[#267AB1] transition-colors">Accessibility</Link>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-white/10 pt-6">
          <p className="text-xs text-white/40 text-center mb-2">
            1st Financial Mortgage - Miramar Branch (NMLS #1620197). 1st Financial Mortgage Company NMLS #185076.
          </p>
          <p className="text-xs text-white/40 text-center mb-2">
            Cal Castells - Branch Manager (NMLS #1101261) | Jose Ramirez - Sales Manager (NMLS #1057601)
          </p>
          <p className="text-xs text-white/40 text-center mb-2">
            For licensing information, go to: <a href="https://www.nmlsconsumeraccess.org" target="_blank" rel="noopener noreferrer" className="text-[#267AB1] hover:underline">www.nmlsconsumeraccess.org</a>
          </p>
          <p className="text-xs text-white/40 text-center">
            © {new Date().getFullYear()} 1st Financial Mortgage. All Rights Reserved. Equal Housing Lender.
          </p>
        </div>
      </div>
    </footer>
  );
}
