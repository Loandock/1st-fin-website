'use client';

import React from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { ArrowLeft } from 'lucide-react';

export default function PrivacyPolicyPage() {
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
            Privacy Policy
          </h1>

          <div className="prose prose-lg max-w-none">
            <p className="text-lg text-[#194080]/70 leading-relaxed mb-8">
              Customer service is very important to all of us at the IR Mortgages. As we continue to improve and expand our services, we recognize our customers' need and desire to preserve their privacy and confidentiality. Safeguarding our customers' privacy is also very important to us. We have adopted standards that help maintain and preserve the confidentiality of customers' nonpublic personal information.
            </p>

            <h2 className="text-2xl font-bold text-[#194080] mt-10 mb-4">
              Information We Collect
            </h2>
            
            <p className="text-[#194080]/70 leading-relaxed mb-4">
              We gather nonpublic personal information about our customers as it may be necessary to conduct business with them. We collect nonpublic personal information about you from the following sources:
            </p>

            <ul className="space-y-3 ml-6 mb-8">
              <li className="text-[#194080]/70 leading-relaxed list-disc">
                <strong className="text-[#194080]">Information we receive from you</strong> on applications or other forms, over the telephone or in face-to-face meetings, and via the Internet. Examples include your name, address, telephone number, social security number, credit history, and other financial information.
              </li>
              <li className="text-[#194080]/70 leading-relaxed list-disc">
                <strong className="text-[#194080]">Information about your transactions</strong> with us or others. Examples include payment histories, account balances, and account activity.
              </li>
              <li className="text-[#194080]/70 leading-relaxed list-disc">
                <strong className="text-[#194080]">Information we receive from consumer reporting agencies.</strong> Examples include your credit score, credit reports, and other information relating to your creditworthiness.
              </li>
              <li className="text-[#194080]/70 leading-relaxed list-disc">
                <strong className="text-[#194080]">From employers and others</strong> to verify the information you have given us. Examples include verifications of employment, income, or deposits.
              </li>
            </ul>

            <h2 className="text-2xl font-bold text-[#194080] mt-10 mb-4">
              Information We Disclose
            </h2>
            
            <p className="text-[#194080]/70 leading-relaxed mb-4">
              Your personal information will only be retained for the purpose of providing you with our response to your query and will not be made available to any third party except as necessary to be disclosed to any related entity for the purpose intended or as required to be disclosed under law.
            </p>

            <p className="text-[#194080]/70 leading-relaxed mb-4">
              By submitting data on our website, the visitor is providing explicit consent to the transmission of data collected on the website.
            </p>

            <p className="text-[#194080]/70 leading-relaxed mb-4">
              We treat data as confidential within our firm and require strict adherence of all our employees to data protection and our confidentiality policies.
            </p>

            <p className="text-[#194080]/70 leading-relaxed mb-4">
              All visitors, however, should be aware that our website may contain links to other sites that are not governed by this or any other privacy statement.
            </p>

            <p className="text-[#194080]/70 leading-relaxed mb-8">
              We reserve the right to amend (that is, add to, delete, or change) the terms of this Privacy Statement from time to time.
            </p>

            {/* Contact Box */}
            <div className="bg-gradient-to-r from-[#194080] to-[#5673A2] text-white p-6 rounded-2xl mt-10">
              <h3 className="text-xl font-bold mb-4">Questions About Your Privacy?</h3>
              <div className="space-y-2 text-white/80">
                <p><strong className="text-white">Ivan Ramirez</strong> – Licensed Loan Originator</p>
                <p>NMLS #1603703</p>
                <p>Phone: <a href="tel:+14046432230" className="text-[#D3B16F] hover:underline">(404) 643-2230</a></p>
                <p>Email: <a href="mailto:ivan@irmortgages.com" className="text-[#D3B16F] hover:underline">ivan@irmortgages.com</a></p>
                <p className="pt-2 text-sm">Guaranteed Rate, Inc DBA Certainty Home Lending – NMLS #2611</p>
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

