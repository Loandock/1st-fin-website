'use client';

import React from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { ArrowLeft, Mail, MapPin, Phone } from 'lucide-react';

export default function AccessibilityPage() {
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
            Accessibility Statement
          </h1>

          <div className="prose prose-lg max-w-none">
            <p className="text-lg text-[#194080]/70 leading-relaxed mb-8">
              The IR Mortgages is committed to ensuring digital accessibility for people with disabilities. We are continually improving the user experience for everyone and applying the relevant accessibility standards.
            </p>

            <h2 className="text-2xl font-bold text-[#194080] mt-10 mb-4">
              Our Commitment
            </h2>
            
            <p className="text-[#194080]/70 leading-relaxed mb-4">
              We strive to ensure that our website is accessible to individuals with disabilities and conforms to the Web Content Accessibility Guidelines (WCAG) 2.1 Level AA standards. Our goal is to provide an inclusive experience for all visitors, regardless of their abilities or the assistive technologies they use.
            </p>

            <h2 className="text-2xl font-bold text-[#194080] mt-10 mb-4">
              Accessibility Features
            </h2>
            
            <p className="text-[#194080]/70 leading-relaxed mb-4">
              Our website includes the following accessibility features:
            </p>

            <ul className="space-y-3 ml-6 mb-8">
              <li className="text-[#194080]/70 leading-relaxed list-disc">
                <strong className="text-[#194080]">Keyboard Navigation:</strong> All interactive elements can be accessed using a keyboard.
              </li>
              <li className="text-[#194080]/70 leading-relaxed list-disc">
                <strong className="text-[#194080]">Screen Reader Compatibility:</strong> Our website is compatible with popular screen readers.
              </li>
              <li className="text-[#194080]/70 leading-relaxed list-disc">
                <strong className="text-[#194080]">Alternative Text:</strong> Images include descriptive alt text for screen readers.
              </li>
              <li className="text-[#194080]/70 leading-relaxed list-disc">
                <strong className="text-[#194080]">Color Contrast:</strong> Text and background colors meet WCAG standards for readability.
              </li>
              <li className="text-[#194080]/70 leading-relaxed list-disc">
                <strong className="text-[#194080]">Responsive Design:</strong> Content adapts to different screen sizes and orientations.
              </li>
              <li className="text-[#194080]/70 leading-relaxed list-disc">
                <strong className="text-[#194080]">Clear Navigation:</strong> Consistent navigation structure throughout the site.
              </li>
              <li className="text-[#194080]/70 leading-relaxed list-disc">
                <strong className="text-[#194080]">Bilingual Support:</strong> Services available in English and Spanish.
              </li>
            </ul>

            <h2 className="text-2xl font-bold text-[#194080] mt-10 mb-4">
              Ongoing Efforts
            </h2>
            
            <p className="text-[#194080]/70 leading-relaxed mb-8">
              We regularly review our website to identify and address accessibility issues. We test our website with various assistive technologies and seek feedback from users with disabilities to ensure we meet their needs.
            </p>

            <h2 className="text-2xl font-bold text-[#194080] mt-10 mb-4">
              Third-Party Content
            </h2>
            
            <p className="text-[#194080]/70 leading-relaxed mb-8">
              While we strive to ensure accessibility across our entire website, some third-party content or links to external websites may not be fully under our control. We encourage our partners to maintain accessible platforms and are committed to working with them to improve accessibility.
            </p>

            <h2 className="text-2xl font-bold text-[#194080] mt-10 mb-4">
              Feedback and Contact
            </h2>
            
            <p className="text-[#194080]/70 leading-relaxed mb-4">
              We welcome your feedback on the accessibility of our website. If you encounter any accessibility barriers or have suggestions for improvement, please contact us:
            </p>

            <div className="bg-gradient-to-r from-[#D3B16F]/10 to-[#5673A2]/10 border-l-4 border-[#D3B16F] p-6 rounded-r-2xl mb-8">
              <p className="text-[#194080] mb-2 flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#D3B16F]" />
                <strong className="font-semibold">Email:</strong> <a href="mailto:ivan@irmortgages.com" className="text-[#D3B16F] hover:underline">ivan@irmortgages.com</a>
              </p>
              <p className="text-[#194080] mb-2 flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#D3B16F]" />
                <strong className="font-semibold">Phone:</strong> <a href="tel:+14046432230" className="text-[#D3B16F] hover:underline">(404) 643-2230</a>
              </p>
              <p className="text-[#194080] flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#D3B16F] mt-1" />
                <span><strong className="font-semibold">Address:</strong> 53 NW 100th Ave, Plantation, FL 33324</span>
              </p>
            </div>

            <p className="text-[#194080]/70 leading-relaxed mb-8">
              We aim to respond to accessibility feedback within 5 business days and will work with you to provide the information or service you seek in an accessible format.
            </p>

            <h2 className="text-2xl font-bold text-[#194080] mt-10 mb-4">
              Assistive Technology Support
            </h2>
            
            <p className="text-[#194080]/70 leading-relaxed mb-4">
              If you need assistance accessing our website content or completing a loan application due to accessibility barriers, please contact us directly. Our team is happy to assist you through alternative methods, including:
            </p>

            <ul className="space-y-2 ml-6 mb-8">
              <li className="text-[#194080]/70 leading-relaxed list-disc">Phone consultations</li>
              <li className="text-[#194080]/70 leading-relaxed list-disc">In-person meetings</li>
              <li className="text-[#194080]/70 leading-relaxed list-disc">Document assistance</li>
              <li className="text-[#194080]/70 leading-relaxed list-disc">Alternative format materials</li>
            </ul>

            <div className="bg-[#194080]/5 border-l-4 border-[#194080] p-6 rounded-r-2xl mt-8">
              <p className="text-sm text-[#194080]">
                <strong className="font-semibold">Last Updated:</strong> January 2026
              </p>
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

