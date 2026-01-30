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
              <div className="relative w-20 h-20">
                <Image src="/logo.svg" alt="IR Mortgages" fill className="object-contain" />
              </div>
              <span className="text-2xl font-bold">
                IR <span className="text-[#D3B16F]">Mortgages</span>
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
                <p className="font-semibold mb-1">Guaranteed Rate, Inc</p>
                <p className="text-white/60 text-xs mb-1">DBA Certainty Home Lending</p>
                <p className="text-white/60 mb-1">1735 North Brown Road</p>
                <p className="text-white/60 mb-1">Suite 180</p>
                <p className="text-white/60 mb-1">Lawrenceville, GA 30043</p>
                <p className="text-white/60">NMLS #2611</p>
                <p className="text-white/60">LO NMLS #2059278</p>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex gap-3">
              <a href="https://www.facebook.com/profile.php?id=61586206063239" target="_blank" rel="noopener noreferrer" className="w-9 h-9 bg-white/10 rounded-lg flex items-center justify-center hover:bg-[#1877F2] transition-colors" aria-label="Facebook">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/>
                </svg>
              </a>
              <a href="https://www.linkedin.com/in/ivan-ramirez-6582b862/" target="_blank" rel="noopener noreferrer" className="w-9 h-9 bg-white/10 rounded-lg flex items-center justify-center hover:bg-[#0A66C2] transition-colors" aria-label="LinkedIn">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/" className="text-white/60 hover:text-[#D3B16F] transition-colors">Home</Link></li>
              <li><Link href="/loan-programs" className="text-white/60 hover:text-[#D3B16F] transition-colors">Loan Programs</Link></li>
              <li><Link href="/loan-process" className="text-white/60 hover:text-[#D3B16F] transition-colors">Loan Process</Link></li>
              <li><Link href="/calculator" className="text-white/60 hover:text-[#D3B16F] transition-colors">Mortgage Calculator</Link></li>
              <li><Link href="/first-time-homebuyers" className="text-white/60 hover:text-[#D3B16F] transition-colors">First-Time Buyers</Link></li>
              <li><Link href="/down-payment-assistance" className="text-white/60 hover:text-[#D3B16F] transition-colors">Down Payment Help</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="https://apply.certaintyhomelending.com/apply/loan-purpose?emp-id=38605" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-[#D3B16F] transition-colors">
                  Apply for a Mortgage
                </a>
              </li>
              <li>
                <a href="https://nmlsconsumeraccess.org/" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-[#D3B16F] transition-colors">
                  NMLS Consumer Access
                </a>
              </li>
              <li>
                <a href="https://www.consumerfinance.gov/owning-a-home/" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-[#D3B16F] transition-colors">
                  CFPB Homebuying Guide
                </a>
              </li>
              <li>
                <a href="https://www.dca.ga.gov/safe-affordable-housing/homeownership-programs" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-[#D3B16F] transition-colors">
                  Georgia Housing Programs
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="tel:+14046432230" className="flex items-center gap-2 text-white/60 hover:text-[#D3B16F] transition-colors">
                  <Phone className="w-4 h-4 text-[#D3B16F]" />
                  (404) 643-2230
                </a>
              </li>
              <li>
                <a href="mailto:ivan@irmortgages.com" className="flex items-center gap-2 text-white/60 hover:text-[#D3B16F] transition-colors">
                  <Mail className="w-4 h-4 text-[#D3B16F]" />
                  ivan@irmortgages.com
                </a>
              </li>
              <li>
                <div className="flex items-start gap-2 text-white/60">
                  <MapPin className="w-4 h-4 text-[#D3B16F] flex-shrink-0 mt-0.5" />
                  <span>1735 North Brown Road<br />Suite 180<br />Lawrenceville, GA 30043</span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Legal Links */}
        <div className="border-t border-white/10 pt-6 pb-6">
          <div className="flex flex-wrap justify-center items-center gap-3 text-xs">
            <Link href="/privacy-policy" className="text-white/50 hover:text-[#D3B16F] transition-colors">Privacy Policy</Link>
            <span className="text-white/20">|</span>
            <Link href="/terms-of-service" className="text-white/50 hover:text-[#D3B16F] transition-colors">Terms of Service</Link>
            <span className="text-white/20">|</span>
            <Link href="/sms-policy" className="text-white/50 hover:text-[#D3B16F] transition-colors">SMS Policy</Link>
            <span className="text-white/20">|</span>
            <Link href="/legal-disclaimer" className="text-white/50 hover:text-[#D3B16F] transition-colors">Legal Disclaimer</Link>
            <span className="text-white/20">|</span>
            <Link href="/licensing" className="text-white/50 hover:text-[#D3B16F] transition-colors">Licensing</Link>
            <span className="text-white/20">|</span>
            <Link href="/accessibility" className="text-white/50 hover:text-[#D3B16F] transition-colors">Accessibility</Link>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-white/10 pt-6">
          <p className="text-xs text-white/40 text-center mb-2">
            Ivan Ramirez is a licensed Loan Originator (NMLS #2059278) with Guaranteed Rate, Inc DBA Certainty Home Lending (NMLS #2611).
          </p>
          <p className="text-xs text-white/40 text-center mb-2">
            For licensing information, go to: <a href="https://www.nmlsconsumeraccess.org" target="_blank" rel="noopener noreferrer" className="text-[#D3B16F] hover:underline">www.nmlsconsumeraccess.org</a>
          </p>
          <p className="text-xs text-white/40 text-center">
            © {new Date().getFullYear()} Ivan Ramirez. All Rights Reserved. Equal Housing Lender.
          </p>
        </div>
      </div>
    </footer>
  );
}
