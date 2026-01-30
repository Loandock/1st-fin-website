'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { X, CheckCircle, ArrowRight, Shield } from 'lucide-react';

interface ConsentModalProps {
  isOpen: boolean;
  onClose: () => void;
  redirectUrl: string;
}

export function ConsentModal({ isOpen, onClose, redirectUrl }: ConsentModalProps) {
  const [smsConsent, setSmsConsent] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleProceed = () => {
    window.open(redirectUrl, '_blank', 'noopener,noreferrer');
    onClose();
    setSmsConsent(false);
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal Container */}
      <div className="fixed inset-0 z-[101] overflow-y-auto">
        <div className="min-h-full flex items-center justify-center p-4 sm:p-6">
          {/* Modal */}
          <div 
            className="relative bg-white rounded-3xl shadow-2xl max-w-lg w-full my-8"
            style={{ animation: 'scale-in 0.2s ease-out' }}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-[#0D3F72] to-[#267AB1] p-6 rounded-t-3xl">
              <button
                onClick={onClose}
                className="absolute top-4 right-4 w-8 h-8 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors z-10"
              >
                <X className="w-4 h-4 text-white" />
              </button>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-[#267AB1] to-[#267AB1] rounded-xl flex items-center justify-center flex-shrink-0">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">Before You Continue</h2>
                  <p className="text-white/70 text-sm">Please review and consent to the following</p>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 space-y-5">
              {/* Main Consent Checkbox */}
              <div className="border-2 border-[#0D3F72]/20 rounded-2xl p-5 bg-gradient-to-br from-[#0D3F72]/5 to-[#267AB1]/5 hover:border-[#0D3F72]/30 transition-colors">
                <label className="flex items-start gap-4 cursor-pointer">
                  <div className="relative flex-shrink-0 mt-1">
                    <input
                      type="checkbox"
                      checked={smsConsent}
                      onChange={(e) => setSmsConsent(e.target.checked)}
                      className="sr-only"
                    />
                    <div className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all ${
                      smsConsent 
                        ? 'bg-gradient-to-br from-[#267AB1] to-[#267AB1] border-[#267AB1]' 
                        : 'border-gray-300 bg-white hover:border-[#0D3F72]/50'
                    }`}>
                      {smsConsent && <CheckCircle className="w-4 h-4 text-white" />}
                    </div>
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-[#0D3F72] mb-2">
                      I agree to receive communications from The Mortgage Fellas <span className="text-[#0D3F72]/50 font-normal">(optional)</span>
                    </p>
                    <p className="text-sm text-[#0D3F72]/60 leading-relaxed">
                      By checking this box, you consent to receive system notifications, marketing messages, SMS/text messages, and follow-up communications from The Mortgage Fellas regarding your mortgage inquiry. Message frequency may vary. Standard message and data rates may apply. Reply STOP to opt out at any time. Reply HELP for help.
                    </p>
                  </div>
                </label>
              </div>

              {/* Additional Info */}
              <div className="bg-gray-50 rounded-xl p-4 text-sm text-[#0D3F72]/60">
                <p className="mb-2">
                  <strong className="text-[#0D3F72]">Your Privacy Matters:</strong> We will not share your mobile information with third parties for promotional purposes. Consent is not a condition of purchase.
                </p>
                <p>
                  View our{' '}
                  <Link href="/privacy-policy" className="text-[#267AB1] hover:underline font-medium" onClick={onClose}>
                    Privacy Policy
                  </Link>{' '}
                  and{' '}
                  <Link href="/sms-policy" className="text-[#267AB1] hover:underline font-medium" onClick={onClose}>
                    SMS Policy
                  </Link>{' '}
                  for more details.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  onClick={onClose}
                  className="flex-1 px-6 py-3 border-2 border-gray-200 text-[#0D3F72] font-semibold rounded-full hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleProceed}
                  className="flex-1 px-6 py-3 font-bold rounded-full flex items-center justify-center gap-2 transition-all bg-gradient-to-r from-[#267AB1] to-[#267AB1] text-white hover:shadow-lg hover:scale-[1.02]"
                >
                  Continue to Application
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes scale-in {
          from {
            opacity: 0;
            transform: scale(0.95) translateY(-10px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
      `}</style>
    </>
  );
}
