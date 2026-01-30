'use client';

import React from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { ArrowLeft } from 'lucide-react';

export default function TermsOfServicePage() {
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

          <h1 className="text-4xl sm:text-5xl font-bold text-[#194080] mb-4">
            Terms of Service
          </h1>
          
          <p className="text-sm text-[#194080]/50 mb-8">
            Last Updated: January 28, 2026
          </p>

          <div className="prose prose-lg max-w-none">
            {/* Agreement */}
            <section className="mb-10">
              <h2 className="text-2xl font-bold text-[#194080] mb-4">Agreement to Terms</h2>
              <p className="text-[#194080]/70 leading-relaxed mb-4">
                By accessing or using the IR Mortgages website and services ("Services"), you agree to be bound by these Terms of Service ("Terms"). If you do not agree to these Terms, please do not use our Services.
              </p>
            </section>

            {/* Company Info */}
            <section className="mb-10 p-6 bg-gradient-to-r from-[#D3B16F]/10 to-[#5673A2]/10 rounded-2xl border border-[#D3B16F]/20">
              <h2 className="text-2xl font-bold text-[#194080] mb-4">Company Information</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold text-[#194080] mb-2">Guaranteed Rate</h3>
                  <p className="text-[#194080]/70 leading-relaxed">
                    53 NW 100th Ave<br />
                    Plantation, FL 33324<br />
                    NMLS #1604663<br />
                    Phone: (404) 643-2230<br />
                    Email: ivan@irmortgages.com
                  </p>
                </div>
                
                <div className="pt-4 border-t border-[#D3B16F]/20">
                  <h3 className="text-xl font-semibold text-[#194080] mb-2">Licensed Professional</h3>
                  <p className="text-[#194080]/70 leading-relaxed">
                    Ivan Ramirez, Licensed Loan Originator<br />
                    NMLS #1603703
                  </p>
                </div>
              </div>
            </section>

            {/* Services */}
            <section className="mb-10">
              <h2 className="text-2xl font-bold text-[#194080] mb-4">Services Provided</h2>
              <p className="text-[#194080]/70 leading-relaxed mb-4">
                The IR Mortgages provides the following services:
              </p>
              <ul className="space-y-2 ml-6 mb-4">
                <li className="text-[#194080]/70 leading-relaxed list-disc">Mortgage loan origination and consultation</li>
                <li className="text-[#194080]/70 leading-relaxed list-disc">Home financing solutions for purchase and refinance</li>
                <li className="text-[#194080]/70 leading-relaxed list-disc">Pre-qualification and pre-approval services</li>
                <li className="text-[#194080]/70 leading-relaxed list-disc">Loan program guidance and recommendations</li>
                <li className="text-[#194080]/70 leading-relaxed list-disc">Market analysis and rate information</li>
                <li className="text-[#194080]/70 leading-relaxed list-disc">Property financing consulting for residential real estate</li>
              </ul>
            </section>

            {/* Licensing */}
            <section className="mb-10">
              <h2 className="text-2xl font-bold text-[#194080] mb-4">Licensing and Regulatory Information</h2>
              <p className="text-[#194080]/70 leading-relaxed mb-4">
                <strong className="text-[#194080]">Mortgage Lending:</strong> Guaranteed Rate operates under NMLS #1604663. All mortgage activities are subject to federal and state regulations including RESPA (Real Estate Settlement Procedures Act), TILA (Truth in Lending Act), and applicable state licensing requirements.
              </p>
              <p className="text-[#194080]/70 leading-relaxed mb-4">
                <strong className="text-[#194080]">Equal Housing Opportunity:</strong> We comply with all federal, state, and local fair housing laws and do not discriminate based on race, color, religion, sex, handicap, familial status, national origin, sexual orientation, or gender identity.
              </p>
            </section>

            {/* User Obligations */}
            <section className="mb-10">
              <h2 className="text-2xl font-bold text-[#194080] mb-4">User Obligations</h2>
              <p className="text-[#194080]/70 leading-relaxed mb-4">When using our Services, you agree to:</p>
              <ul className="space-y-2 ml-6 mb-4">
                <li className="text-[#194080]/70 leading-relaxed list-disc">Provide accurate and truthful information</li>
                <li className="text-[#194080]/70 leading-relaxed list-disc">Update your information as necessary to maintain accuracy</li>
                <li className="text-[#194080]/70 leading-relaxed list-disc">Not misrepresent your financial situation or eligibility</li>
                <li className="text-[#194080]/70 leading-relaxed list-disc">Comply with all applicable laws and regulations</li>
                <li className="text-[#194080]/70 leading-relaxed list-disc">Not use the Services for fraudulent or illegal purposes</li>
                <li className="text-[#194080]/70 leading-relaxed list-disc">Maintain the confidentiality of your account credentials</li>
              </ul>
            </section>

            {/* No Guarantee */}
            <section className="mb-10">
              <h2 className="text-2xl font-bold text-[#194080] mb-4">No Guarantee of Approval or Results</h2>
              <p className="text-[#194080]/70 leading-relaxed mb-4">We make no guarantees regarding:</p>
              <ul className="space-y-2 ml-6 mb-4">
                <li className="text-[#194080]/70 leading-relaxed list-disc">Mortgage loan approval or specific loan terms</li>
                <li className="text-[#194080]/70 leading-relaxed list-disc">Specific interest rates or loan programs</li>
                <li className="text-[#194080]/70 leading-relaxed list-disc">Property value appreciation or investment returns</li>
                <li className="text-[#194080]/70 leading-relaxed list-disc">Tax benefits or deductions related to real estate or mortgages</li>
              </ul>
              <p className="text-[#194080]/70 leading-relaxed mb-4">
                All financial and real estate decisions should be made in consultation with qualified professionals, including attorneys, accountants, and financial advisors.
              </p>
            </section>

            {/* Fees */}
            <section className="mb-10">
              <h2 className="text-2xl font-bold text-[#194080] mb-4">Fees and Compensation</h2>
              <h3 className="text-xl font-semibold text-[#194080] mb-3">Mortgage Fees</h3>
              <p className="text-[#194080]/70 leading-relaxed mb-4">
                Mortgage loan origination may include fees such as application fees, origination fees, and third-party costs. All fees will be disclosed in accordance with RESPA requirements through the Loan Estimate and Closing Disclosure documents.
              </p>
              <h3 className="text-xl font-semibold text-[#194080] mb-3">Consultation Services</h3>
              <p className="text-[#194080]/70 leading-relaxed mb-4">
                Initial consultations are typically provided at no charge. Any fee-based consulting services will be agreed upon in advance with clear disclosure of all costs.
              </p>
            </section>

            {/* Disclaimer */}
            <section className="mb-10">
              <h2 className="text-2xl font-bold text-[#194080] mb-4">Disclaimer of Warranties</h2>
              <p className="text-[#194080]/70 leading-relaxed mb-4">
                Our services are provided "as is" and "as available" without warranties of any kind, either express or implied.
              </p>
            </section>

            {/* Limitation */}
            <section className="mb-10">
              <h2 className="text-2xl font-bold text-[#194080] mb-4">Limitation of Liability</h2>
              <p className="text-[#194080]/70 leading-relaxed mb-4">
                To the maximum extent permitted by law, the IR Mortgages and Guaranteed Rate shall not be liable for indirect, incidental, special, or consequential damages.
              </p>
            </section>

            {/* Dispute */}
            <section className="mb-10">
              <h2 className="text-2xl font-bold text-[#194080] mb-4">Dispute Resolution</h2>
              <p className="text-[#194080]/70 leading-relaxed mb-4">
                Any disputes arising from these Terms or our Services shall be resolved through binding arbitration in accordance with the American Arbitration Association rules, except where prohibited by law.
              </p>
              <p className="text-[#194080]/70 leading-relaxed mb-4">
                <strong className="text-[#194080]">Governing Law:</strong> These Terms shall be governed by the laws of the State of Georgia.
              </p>
            </section>

            {/* SMS */}
            <section className="mb-10">
              <h2 className="text-2xl font-bold text-[#194080] mb-4">SMS Communications</h2>
              <p className="text-[#194080]/70 leading-relaxed mb-4">
                We may offer SMS notifications for loan updates, document requests, and promotional offers. Opting in to receive SMS messages is completely optional and not a condition of service.
              </p>
              <p className="text-[#194080]/70 leading-relaxed mb-4">
                For detailed information about our SMS program, please review our <Link href="/sms-policy" className="text-[#D3B16F] hover:underline font-semibold">SMS Policy & 10DLC Compliance</Link> page.
              </p>
            </section>

            {/* Privacy */}
            <section className="mb-10">
              <h2 className="text-2xl font-bold text-[#194080] mb-4">Privacy and Data Protection</h2>
              <p className="text-[#194080]/70 leading-relaxed mb-4">
                Your use of our Services is also governed by our <Link href="/privacy-policy" className="text-[#D3B16F] hover:underline font-semibold">Privacy Policy</Link>, which is incorporated by reference into these Terms.
              </p>
            </section>

            {/* Contact */}
            <section className="mb-10 p-6 bg-gradient-to-r from-[#194080] to-[#5673A2] rounded-2xl text-white">
              <h2 className="text-2xl font-bold mb-4">Contact Information</h2>
              <p className="text-white/80 leading-relaxed mb-4">
                For questions about these Terms of Service, please contact us:
              </p>
              <div className="text-white/80 leading-relaxed">
                <p className="font-semibold text-white mb-2">Ivan Ramirez – IR Mortgages</p>
                <p>Licensed Loan Originator – NMLS #1603703</p>
                <p>Guaranteed Rate – NMLS #1604663</p>
                <p>53 NW 100th Ave, Plantation, FL 33324</p>
                <p className="mt-3">Email: <a href="mailto:ivan@irmortgages.com" className="text-[#D3B16F] hover:underline">ivan@irmortgages.com</a></p>
                <p>Phone: <a href="tel:+14046432230" className="text-[#D3B16F] hover:underline">(404) 643-2230</a></p>
              </div>
            </section>

            {/* Final */}
            <section className="mb-10 p-6 bg-[#D3B16F]/10 rounded-2xl border border-[#D3B16F]/30">
              <p className="text-[#194080]/80 leading-relaxed font-medium">
                By using the IR Mortgages's services, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service and our Privacy Policy.
              </p>
            </section>
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

