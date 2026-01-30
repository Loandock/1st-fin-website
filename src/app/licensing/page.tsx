'use client';

import React from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { ArrowLeft, ExternalLink, Phone } from 'lucide-react';

export default function LicensingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FFF8F0] via-white to-[#F5F0FF]">
      <Navbar />

      {/* Content */}
      <div className="pt-28 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <Link href="/" className="inline-flex items-center text-[#194080] hover:text-[#D3B16F] font-medium mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>

          <h1 className="text-4xl sm:text-5xl font-bold text-[#194080] mb-6">
            Licensing Information
          </h1>

          <div className="prose prose-lg max-w-none">
            {/* Company Licensing */}
            <div className="bg-gradient-to-r from-[#D3B16F]/10 to-[#5673A2]/10 border-l-4 border-[#D3B16F] p-6 rounded-r-2xl mb-8">
              <h2 className="text-2xl font-bold text-[#194080] mb-4 mt-0">
                Company Licensing
              </h2>
              <div className="space-y-2">
                <p className="text-[#194080] mb-1">
                  <strong className="font-semibold">Company Name:</strong> Guaranteed Rate, Inc
                </p>
                <p className="text-[#194080] mb-1">
                  <strong className="font-semibold">DBA:</strong> Certainty Home Lending
                </p>
                <p className="text-[#194080] mb-1">
                  <strong className="font-semibold">NMLS #:</strong> 2611
                </p>
                <p className="text-[#194080] mb-1">
                  <strong className="font-semibold">Address:</strong> 1735 North Brown Road, Suite 180, Lawrenceville, GA 30043
                </p>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-[#194080] mt-10 mb-4">
              Loan Originator Information
            </h2>
            
            <div className="bg-white border border-[#194080]/10 rounded-2xl p-6 mb-8 shadow-lg">
              <p className="text-[#194080] mb-1">
                <strong className="font-semibold">Loan Originator:</strong> Ivan Ramirez
              </p>
              <p className="text-[#194080] mb-1">
                <strong className="font-semibold">NMLS #:</strong> 2059278
              </p>
              <p className="text-[#194080] mb-1">
                <strong className="font-semibold">License:</strong> Licensed Loan Originator
              </p>
              <p className="text-[#194080] mb-1">
                <strong className="font-semibold">Phone:</strong> <a href="tel:+14046432230" className="text-[#D3B16F] hover:underline">(404) 643-2230</a>
              </p>
              <p className="text-[#194080] mb-1">
                <strong className="font-semibold">Email:</strong> <a href="mailto:ivan@irmortgages.com" className="text-[#D3B16F] hover:underline">ivan@irmortgages.com</a>
              </p>
            </div>

            <h2 className="text-2xl font-bold text-[#194080] mt-10 mb-4">
              NMLS Consumer Access
            </h2>
            
            <p className="text-[#194080]/70 leading-relaxed mb-4">
              The Nationwide Multistate Licensing System (NMLS) is a comprehensive licensing system that provides consumers with information about state-licensed mortgage companies and mortgage loan originators.
            </p>

            <p className="text-[#194080]/70 leading-relaxed mb-4">
              You can verify our license and review our company information by visiting:
            </p>

            <div className="bg-gradient-to-r from-[#194080] to-[#5673A2] rounded-2xl p-6 mb-8">
              <a 
                href="https://nmlsconsumeraccess.org/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-white hover:text-[#D3B16F] font-semibold text-lg flex items-center gap-2"
              >
                <ExternalLink className="w-5 h-5" />
                NMLS Consumer Access Portal
              </a>
              <p className="text-sm text-white/70 mt-2">
                Search for NMLS #2611 (Company) or #2059278 (Ivan Ramirez)
              </p>
            </div>

            <h2 className="text-2xl font-bold text-[#194080] mt-10 mb-4">
              Regulatory Compliance
            </h2>
            
            <p className="text-[#194080]/70 leading-relaxed mb-4">
              Guaranteed Rate, Inc and Ivan Ramirez are committed to full compliance with all federal and state mortgage lending regulations, including:
            </p>

            <ul className="space-y-2 ml-6 mb-8">
              <li className="text-[#194080]/70 leading-relaxed list-disc">Truth in Lending Act (TILA)</li>
              <li className="text-[#194080]/70 leading-relaxed list-disc">Real Estate Settlement Procedures Act (RESPA)</li>
              <li className="text-[#194080]/70 leading-relaxed list-disc">Equal Credit Opportunity Act (ECOA)</li>
              <li className="text-[#194080]/70 leading-relaxed list-disc">Fair Housing Act</li>
              <li className="text-[#194080]/70 leading-relaxed list-disc">State Mortgage Lending Laws and Regulations</li>
            </ul>

            <div className="bg-[#D3B16F]/10 border-l-4 border-[#D3B16F] p-6 rounded-r-2xl mt-8">
              <h3 className="text-lg font-bold text-[#194080] mb-2">
                Questions About Our Licensing?
              </h3>
              <p className="text-[#194080]/70 mb-4">
                If you have questions about our licensing or regulatory compliance, please don&apos;t hesitate to contact us.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 text-[#194080]">
                <a href="tel:+14046432230" className="text-[#D3B16F] hover:underline font-semibold flex items-center gap-2">
                  <Phone className="w-4 h-4" /> (404) 643-2230
                </a>
                <span className="hidden sm:inline text-[#194080]/30">•</span>
                <a href="mailto:ivan@irmortgages.com" className="text-[#D3B16F] hover:underline font-semibold">
                  ivan@irmortgages.com
                </a>
              </div>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-[#194080]/10">
            <Link href="/" className="inline-flex items-center text-[#194080] hover:text-[#D3B16F] font-semibold transition-colors">
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
