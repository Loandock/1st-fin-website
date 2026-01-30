'use client';

import React from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { ArrowLeft } from 'lucide-react';

export default function SMSPolicyPage() {
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

          <h1 className="text-4xl sm:text-5xl font-bold text-[#0D3F72] mb-4">
            SMS Policy & 10DLC Compliance
          </h1>
          
          <p className="text-sm text-[#0D3F72]/50 mb-8">
            Last Updated: January 28, 2026
          </p>

          <div className="prose prose-lg max-w-none">
            {/* Purpose */}
            <section className="mb-10">
              <h2 className="text-2xl font-bold text-[#0D3F72] mb-4">Purpose</h2>
              <p className="text-[#0D3F72]/70 leading-relaxed mb-4">
                This document outlines how the 1st Financial Mortgage / Guaranteed Rate obtains client consent to receive SMS notifications about their mortgage applications, in full compliance with 10DLC, TCPA, and CTIA guidelines.
              </p>
            </section>

            {/* Message Types */}
            <section className="mb-10">
              <h2 className="text-2xl font-bold text-[#0D3F72] mb-4">Types of Messages You May Receive</h2>
              <p className="text-[#0D3F72]/70 leading-relaxed mb-4">When you opt in to receive SMS messages from us, you may receive:</p>
              <ul className="space-y-2 ml-6 mb-4">
                <li className="text-[#0D3F72]/70 leading-relaxed list-disc"><strong className="text-[#0D3F72]">Application status updates</strong> – Progress on your mortgage application</li>
                <li className="text-[#0D3F72]/70 leading-relaxed list-disc"><strong className="text-[#0D3F72]">Document requests</strong> – Notifications when we need additional documentation</li>
                <li className="text-[#0D3F72]/70 leading-relaxed list-disc"><strong className="text-[#0D3F72]">Rate-lock confirmations</strong> – Confirmation of your interest rate lock</li>
                <li className="text-[#0D3F72]/70 leading-relaxed list-disc"><strong className="text-[#0D3F72]">Closing date reminders</strong> – Important dates and deadlines</li>
                <li className="text-[#0D3F72]/70 leading-relaxed list-disc"><strong className="text-[#0D3F72]">Market insights</strong> – Updates on market conditions and rates</li>
                <li className="text-[#0D3F72]/70 leading-relaxed list-disc"><strong className="text-[#0D3F72]">Exclusive opportunities</strong> – Marketing messages and promotional offers</li>
              </ul>
            </section>

            {/* How We Obtain Consent */}
            <section className="mb-10">
              <h2 className="text-2xl font-bold text-[#0D3F72] mb-4">How We Obtain Your Consent</h2>
              <p className="text-[#0D3F72]/70 leading-relaxed mb-4">
                We obtain your express written or verbal consent to send SMS messages through one or more of the following methods:
              </p>

              {/* Method 1 */}
              <div className="mb-8 p-6 bg-gradient-to-r from-[#267AB1]/10 to-[#267AB1]/10 rounded-2xl border border-[#267AB1]/20">
                <h3 className="text-xl font-semibold text-[#0D3F72] mb-4">Method 1: Digital Consent (Web Form)</h3>
                <p className="text-[#0D3F72]/70 mb-4">
                  When you fill out a form on our website, you'll see an optional, unchecked checkbox:
                </p>
                <div className="bg-white p-4 rounded-xl border border-[#0D3F72]/10 text-sm">
                  <p className="mb-2">☐ <em>I agree to receive SMS notifications and marketing texts from 1st Financial Mortgage (optional).</em></p>
                  <p className="text-xs text-[#0D3F72]/50 italic">
                    "By providing your phone number, you are opting into marketing texts. Message frequency may vary. Standard message and data rates may apply. Reply STOP to opt out. Reply HELP for help. Consent is not a condition of purchase. We will not share your mobile information with third parties for promotional or marketing purposes."
                  </p>
                </div>
              </div>

              {/* Method 2 */}
              <div className="mb-8 p-6 bg-gradient-to-r from-[#0D3F72]/5 to-[#0D3F72]/10 rounded-2xl border border-[#0D3F72]/10">
                <h3 className="text-xl font-semibold text-[#0D3F72] mb-4">Method 2: Verbal Consent (Phone or In-Person)</h3>
                <p className="text-[#0D3F72]/70 mb-4">
                  This method uses a double opt-in process as required by carriers for marketing messages. When you call (954) 558-1730 or visit our office, our representative will explain the SMS program and request your verbal consent.
                </p>
              </div>

              {/* Method 3 */}
              <div className="mb-8 p-6 bg-white rounded-2xl border border-[#0D3F72]/10">
                <h3 className="text-xl font-semibold text-[#0D3F72] mb-4">Method 3: Opt-In by Keyword</h3>
                <p className="text-[#0D3F72]/70 mb-4">
                  Text <strong>START</strong>, <strong>YES</strong>, <strong>SUBSCRIBE</strong>, or <strong>JOIN</strong> to (954) 558-1730 to opt in.
                </p>
              </div>
            </section>

            {/* Message Frequency */}
            <section className="mb-10">
              <h2 className="text-2xl font-bold text-[#0D3F72] mb-4">Message Frequency and Rates</h2>
              <p className="text-[#0D3F72]/70 leading-relaxed mb-4">
                Message frequency varies based on your transaction activity. You may receive approximately <strong>2-8 messages per month</strong>. Standard message and data rates may apply depending on your mobile carrier plan.
              </p>
            </section>

            {/* Opt Out */}
            <section className="mb-10">
              <h2 className="text-2xl font-bold text-[#0D3F72] mb-4">How to Opt Out</h2>
              <p className="text-[#0D3F72]/70 leading-relaxed mb-4">
                You can opt out of SMS messages at any time. Reply to any message with one of these keywords:
              </p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-4">
                {['STOP', 'STOPALL', 'UNSUBSCRIBE', 'CANCEL', 'END', 'QUIT'].map((keyword) => (
                  <div key={keyword} className="p-3 bg-[#0D3F72]/5 rounded-xl border border-[#0D3F72]/10 text-center">
                    <span className="font-bold text-[#0D3F72]">{keyword}</span>
                  </div>
                ))}
              </div>
              <p className="text-[#0D3F72]/70 leading-relaxed mb-4">
                Opt-out requests are processed <strong>immediately</strong>. You will receive a confirmation message.
              </p>
            </section>

            {/* Help */}
            <section className="mb-10">
              <h2 className="text-2xl font-bold text-[#0D3F72] mb-4">Help and Support</h2>
              <p className="text-[#0D3F72]/70 leading-relaxed mb-4">
                Reply <strong>HELP</strong> or <strong>INFO</strong> to any message to receive assistance:
              </p>
              <div className="bg-[#267AB1]/10 p-4 rounded-xl border border-[#267AB1]/30 mb-4">
                <p className="text-sm italic text-[#0D3F72]/70">
                  "1st Financial Mortgage: For help, call (954) 558-1730 or email cal@mortgagefellas.com. Msg&data rates may apply. Reply STOP to opt out."
                </p>
              </div>
            </section>

            {/* Privacy */}
            <section className="mb-10">
              <h2 className="text-2xl font-bold text-[#0D3F72] mb-4">Privacy and Data Protection</h2>
              <ul className="space-y-3 ml-6 mb-4">
                <li className="text-[#0D3F72]/70 leading-relaxed list-disc">We will <strong>not sell or share</strong> your mobile phone number with third parties for promotional or marketing purposes</li>
                <li className="text-[#0D3F72]/70 leading-relaxed list-disc">Your SMS data is protected in accordance with our <Link href="/privacy-policy" className="text-[#267AB1] hover:underline">Privacy Policy</Link></li>
                <li className="text-[#0D3F72]/70 leading-relaxed list-disc">All consent records are stored securely with timestamps</li>
              </ul>
            </section>

            {/* Compliance */}
            <section className="mb-10">
              <h2 className="text-2xl font-bold text-[#0D3F72] mb-4">Regulatory Compliance</h2>
              <div className="space-y-4">
                {[
                  { title: '10DLC Requirements', desc: 'All campaigns are registered with mobile carriers and comply with carrier-specific requirements.' },
                  { title: 'TCPA Compliance', desc: 'Express written consent is obtained before sending marketing messages. Consent is not a condition of purchase.' },
                  { title: 'CTIA Guidelines', desc: 'We follow industry best practices for mobile messaging, including clear opt-in and opt-out.' },
                  { title: 'NMLS Requirements', desc: 'All communications meet record-keeping and disclosure requirements for mortgage communications.' },
                ].map((item) => (
                  <div key={item.title} className="p-4 bg-white rounded-xl border border-[#0D3F72]/10">
                    <h3 className="font-semibold text-[#0D3F72] mb-2">{item.title}</h3>
                    <p className="text-sm text-[#0D3F72]/70">{item.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Important Notice */}
            <section className="mb-10 p-6 bg-[#267AB1]/10 rounded-2xl border border-[#267AB1]/30">
              <h2 className="text-2xl font-bold text-[#0D3F72] mb-4">Important Notice</h2>
              <ul className="space-y-3">
                <li className="text-[#0D3F72]/80 leading-relaxed flex items-start">
                  <span className="text-[#267AB1] mr-2 mt-1">✓</span>
                  <span>Consent to receive SMS messages is <strong>not a condition of purchase</strong> or obtaining services</span>
                </li>
                <li className="text-[#0D3F72]/80 leading-relaxed flex items-start">
                  <span className="text-[#267AB1] mr-2 mt-1">✓</span>
                  <span>You may still use our services even if you choose not to opt in to SMS communications</span>
                </li>
                <li className="text-[#0D3F72]/80 leading-relaxed flex items-start">
                  <span className="text-[#267AB1] mr-2 mt-1">✓</span>
                  <span>You can opt out at any time without affecting your service or relationship with us</span>
                </li>
              </ul>
            </section>

            {/* Contact */}
            <section className="mb-10 p-6 bg-gradient-to-r from-[#0D3F72] to-[#267AB1] rounded-2xl text-white">
              <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
              <div className="text-white/80">
                <p className="font-semibold text-white mb-2">Cal Castells – 1st Financial Mortgage</p>
                <p>Licensed Loan Originator – NMLS #1603703</p>
                <p>Guaranteed Rate – NMLS #1604663</p>
                <p className="mt-3">Phone: <a href="tel:+19545581730" className="text-[#267AB1] hover:underline">(954) 558-1730</a></p>
                <p>Email: <a href="mailto:cal@mortgagefellas.com" className="text-[#267AB1] hover:underline">cal@mortgagefellas.com</a></p>
              </div>
            </section>

            {/* Related */}
            <section className="mb-10 p-6 bg-[#0D3F72]/5 rounded-2xl border border-[#0D3F72]/10">
              <h2 className="text-2xl font-bold text-[#0D3F72] mb-4">Related Policies</h2>
              <ul className="space-y-2">
                <li><Link href="/privacy-policy" className="text-[#267AB1] font-semibold hover:underline">Privacy Policy</Link></li>
                <li><Link href="/terms-of-service" className="text-[#267AB1] font-semibold hover:underline">Terms of Service</Link></li>
              </ul>
            </section>
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

