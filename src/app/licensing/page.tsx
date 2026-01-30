'use client';

import React from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { ArrowLeft, ExternalLink, Phone } from 'lucide-react';

export default function LicensingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#E1EAEF] via-white to-[#E9FCFE]">
      <Navbar />

      {/* Content */}
      <div className="pt-28 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <Link href="/" className="inline-flex items-center text-[#0D3F72] hover:text-[#267AB1] font-medium mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>

          <h1 className="text-4xl sm:text-5xl font-bold text-[#0D3F72] mb-6">
            Licensing Information
          </h1>

          <div className="prose prose-lg max-w-none">
            {/* Company Licensing */}
            <div className="bg-gradient-to-r from-[#267AB1]/10 to-[#267AB1]/10 border-l-4 border-[#267AB1] p-6 rounded-r-2xl mb-8">
              <h2 className="text-2xl font-bold text-[#0D3F72] mb-4 mt-0">
                Company Licensing
              </h2>
              <div className="space-y-2">
                <p className="text-[#0D3F72] mb-1">
                  <strong className="font-semibold">Company Name:</strong> 1st Financial Mortgage
                </p>
                <p className="text-[#0D3F72] mb-1">
                  <strong className="font-semibold">Branch:</strong> Miramar Branch
                </p>
                <p className="text-[#0D3F72] mb-1">
                  <strong className="font-semibold">Company NMLS #:</strong> 185076
                </p>
                <p className="text-[#0D3F72] mb-1">
                  <strong className="font-semibold">Branch NMLS #:</strong> 1620197
                </p>
                <p className="text-[#0D3F72] mb-1">
                  <strong className="font-semibold">Address:</strong> 1911 NW 150th Ave, #104, Pembroke Pines, FL 33028
                </p>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-[#0D3F72] mt-10 mb-4">
              Team Members
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-white border border-[#0D3F72]/10 rounded-2xl p-6 shadow-lg">
                <p className="text-[#0D3F72] mb-1">
                  <strong className="font-semibold">Name:</strong> Cal Castells
                </p>
                <p className="text-[#0D3F72] mb-1">
                  <strong className="font-semibold">Title:</strong> Branch Manager
                </p>
                <p className="text-[#0D3F72] mb-1">
                  <strong className="font-semibold">NMLS #:</strong> 1101261
                </p>
                <p className="text-[#0D3F72] mb-1">
                  <strong className="font-semibold">License:</strong> Licensed Loan Originator
                </p>
              </div>

              <div className="bg-white border border-[#0D3F72]/10 rounded-2xl p-6 shadow-lg">
                <p className="text-[#0D3F72] mb-1">
                  <strong className="font-semibold">Name:</strong> Jose Ramirez
                </p>
                <p className="text-[#0D3F72] mb-1">
                  <strong className="font-semibold">Title:</strong> Sales Manager
                </p>
                <p className="text-[#0D3F72] mb-1">
                  <strong className="font-semibold">NMLS #:</strong> 1057601
                </p>
                <p className="text-[#0D3F72] mb-1">
                  <strong className="font-semibold">License:</strong> Licensed Loan Originator
                </p>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-[#0D3F72] mt-10 mb-4">
              Contact Information
            </h2>
            
            <div className="bg-white border border-[#0D3F72]/10 rounded-2xl p-6 mb-8 shadow-lg">
              <p className="text-[#0D3F72] mb-1">
                <strong className="font-semibold">Phone:</strong> <a href="tel:+19545581730" className="text-[#267AB1] hover:underline">(954) 558-1730</a>
              </p>
              <p className="text-[#0D3F72] mb-1">
                <strong className="font-semibold">Email:</strong> <a href="mailto:cal@mortgagefellas.com" className="text-[#267AB1] hover:underline">cal@mortgagefellas.com</a>
              </p>
              <p className="text-[#0D3F72] mb-1">
                <strong className="font-semibold">Address:</strong> 1911 NW 150th Ave, #104, Pembroke Pines, FL 33028
              </p>
            </div>

            <h2 className="text-2xl font-bold text-[#0D3F72] mt-10 mb-4">
              NMLS Consumer Access
            </h2>
            
            <p className="text-[#0D3F72]/70 leading-relaxed mb-4">
              The Nationwide Multistate Licensing System (NMLS) is a comprehensive licensing system that provides consumers with information about state-licensed mortgage companies and mortgage loan originators.
            </p>

            <p className="text-[#0D3F72]/70 leading-relaxed mb-4">
              You can verify our license and review our company information by visiting:
            </p>

            <div className="bg-gradient-to-r from-[#0D3F72] to-[#267AB1] rounded-2xl p-6 mb-8">
              <a 
                href="https://nmlsconsumeraccess.org/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-white hover:text-[#267AB1] font-semibold text-lg flex items-center gap-2"
              >
                <ExternalLink className="w-5 h-5" />
                NMLS Consumer Access Portal
              </a>
              <p className="text-sm text-white/70 mt-2">
                Search for NMLS #185076 (Company), #1620197 (Branch), #1101261 (Cal Castells), or #1057601 (Jose Ramirez)
              </p>
            </div>

            <h2 className="text-2xl font-bold text-[#0D3F72] mt-10 mb-4">
              Regulatory Compliance
            </h2>
            
            <p className="text-[#0D3F72]/70 leading-relaxed mb-4">
              1st Financial Mortgage and our team are committed to full compliance with all federal and state mortgage lending regulations, including:
            </p>

            <ul className="space-y-2 ml-6 mb-8">
              <li className="text-[#0D3F72]/70 leading-relaxed list-disc">Truth in Lending Act (TILA)</li>
              <li className="text-[#0D3F72]/70 leading-relaxed list-disc">Real Estate Settlement Procedures Act (RESPA)</li>
              <li className="text-[#0D3F72]/70 leading-relaxed list-disc">Equal Credit Opportunity Act (ECOA)</li>
              <li className="text-[#0D3F72]/70 leading-relaxed list-disc">Fair Housing Act</li>
              <li className="text-[#0D3F72]/70 leading-relaxed list-disc">State Mortgage Lending Laws and Regulations</li>
            </ul>

            <div className="bg-[#267AB1]/10 border-l-4 border-[#267AB1] p-6 rounded-r-2xl mt-8">
              <h3 className="text-lg font-bold text-[#0D3F72] mb-2">
                Questions About Our Licensing?
              </h3>
              <p className="text-[#0D3F72]/70 mb-4">
                If you have questions about our licensing or regulatory compliance, please don&apos;t hesitate to contact us.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 text-[#0D3F72]">
                <a href="tel:+19545581730" className="text-[#267AB1] hover:underline font-semibold flex items-center gap-2">
                  <Phone className="w-4 h-4" /> (954) 558-1730
                </a>
                <span className="hidden sm:inline text-[#0D3F72]/30">•</span>
                <a href="mailto:cal@mortgagefellas.com" className="text-[#267AB1] hover:underline font-semibold">
                  cal@mortgagefellas.com
                </a>
              </div>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-[#0D3F72]/10">
            <Link href="/" className="inline-flex items-center text-[#0D3F72] hover:text-[#267AB1] font-semibold transition-colors">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Return to Home
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
