'use client';

import React from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { ArrowLeft } from 'lucide-react';

export default function LegalDisclaimerPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FFF8F0] via-white to-[#F5F0FF]">
      <Navbar />

      {/* Content */}
      <div className="pt-28 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <Link href="/" className="inline-flex items-center text-[#0D3F72] hover:text-[#267AB1] font-medium mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>

          <h1 className="text-4xl sm:text-5xl font-bold text-[#0D3F72] mb-6">
            Legal Disclaimer
          </h1>

          <div className="prose prose-lg max-w-none">
            <p className="text-lg text-[#0D3F72]/70 leading-relaxed mb-8">
              We hereby authorize you to view and print information on this website subject to it being used for informational and non-commercial purposes.
            </p>

            <h2 className="text-2xl font-bold text-[#0D3F72] mt-10 mb-4">
              Website Information and Usage
            </h2>
            
            <p className="text-[#0D3F72]/70 leading-relaxed mb-4">
              The information contained in this website is believed to be reliable, but we do not warrant its completeness, timeliness or accuracy. The information on this website is not intended as an offer or solicitation for any mortgage product or any financial instrument. The information and materials contained in this website – and the terms and conditions of the access to and use of such information and materials – are subject to change without notice.
            </p>

            <p className="text-[#0D3F72]/70 leading-relaxed mb-8">
              Products and services described may differ among geographic locations, offices and as a result of individual conditions. Not all products and services are offered at all locations. In no event will we be liable for any loss or damage including without limitation, indirect or consequential loss or damage, or any loss or damage whatsoever arising from loss of data or profits arising out of, or in connection with, the use of this website.
            </p>

            <h2 className="text-2xl font-bold text-[#0D3F72] mt-10 mb-4">
              General Information Notice
            </h2>
            
            <p className="text-[#0D3F72]/70 leading-relaxed mb-4">
              It is our intention that data provided on a subject is of a general nature. Our website does not represent an exhaustive treatment of subjects nor is the information intended to constitute accounting, tax, legal, consulting or other professional advice.
            </p>

            <p className="text-[#0D3F72]/70 leading-relaxed mb-8">
              Prior to making any decision or taking any action we kindly request you to contact your tax or legal advisors.
            </p>

            <h2 className="text-2xl font-bold text-[#0D3F72] mt-10 mb-4">
              Copyright and Usage Rights
            </h2>
            
            <p className="text-[#0D3F72]/70 leading-relaxed mb-4">
              Please use this document and information at your own risk. The content of this site is copyrighted and therefore any unauthorized use of any materials on this website may violate copyright, trademark, and other laws.
            </p>

            <p className="text-[#0D3F72]/70 leading-relaxed mb-8">
              Materials on this website may not be modified, reproduced, publicly displayed, distributed, or performed for any public or commercial purposes prior to our approval.
            </p>

            {/* Contact Box */}
            <div className="bg-gradient-to-r from-[#267AB1]/10 to-[#267AB1]/10 border-l-4 border-[#267AB1] p-6 rounded-r-2xl mt-10">
              <p className="text-sm text-[#0D3F72] font-semibold mb-2">
                Important Notice
              </p>
              <p className="text-sm text-[#0D3F72]/70 mb-4">
                If you have questions about the information provided on this website or need professional mortgage advice, please contact us directly:
              </p>
              <div className="text-sm text-[#0D3F72]/70">
                <p><strong className="text-[#0D3F72]">Cal Castells</strong> – Licensed Loan Originator</p>
                <p>NMLS #1603703</p>
                <p className="mt-2">
                  Phone: <a href="tel:+19545581730" className="text-[#267AB1] hover:underline">(954) 558-1730</a>
                </p>
                <p>
                  Email: <a href="mailto:cal@mortgagefellas.com" className="text-[#267AB1] hover:underline">cal@mortgagefellas.com</a>
                </p>
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

