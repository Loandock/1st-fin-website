'use client';

import React, { useState, useEffect } from 'react';
import { X, ArrowRight, ArrowLeft, Check, User, MapPin, Briefcase, DollarSign, CreditCard, PiggyBank, Clock } from 'lucide-react';

interface GetStartedModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FormData {
  fullName: string;
  phone: string;
  email: string;
  city: string;
  salesPrice: string;
  employmentType: string;
  employmentDuration: string;
  salary: string;
  creditScore: string;
  downPayment: string;
  timeline: string;
}

const INITIAL_DATA: FormData = {
  fullName: '',
  phone: '',
  email: '',
  city: '',
  salesPrice: '',
  employmentType: '',
  employmentDuration: '',
  salary: '',
  creditScore: '',
  downPayment: '',
  timeline: '',
};

export function GetStartedModal({ isOpen, onClose }: GetStartedModalProps) {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState<FormData>(INITIAL_DATA);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [direction, setDirection] = useState<'forward' | 'backward'>('forward');

  const totalSteps = 7;
  const progress = ((step + 1) / totalSteps) * 100;

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

  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setStep(0);
        setFormData(INITIAL_DATA);
        setIsComplete(false);
      }, 300);
    }
  }, [isOpen]);

  const handleNext = () => {
    if (step < totalSteps - 1) {
      setDirection('forward');
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step > 0) {
      setDirection('backward');
      setStep(step - 1);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && canProceed()) {
      e.preventDefault();
      if (step === totalSteps - 1) {
        handleSubmit();
      } else {
        handleNext();
      }
    }
  };

  const updateField = (field: keyof FormData, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const formatPhone = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 3) return numbers;
    if (numbers.length <= 6) return `(${numbers.slice(0, 3)}) ${numbers.slice(3)}`;
    return `(${numbers.slice(0, 3)}) ${numbers.slice(3, 6)}-${numbers.slice(6, 10)}`;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhone(e.target.value);
    updateField('phone', formatted);
  };

  const canProceed = (): boolean => {
    switch (step) {
      case 0: // Name, Phone, Email
        return (
          formData.fullName.trim().length >= 2 &&
          formData.phone.replace(/\D/g, '').length === 10 &&
          /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
        );
      case 1: // Area, Sales Price
        return formData.city.trim().length >= 2 && formData.salesPrice !== '';
      case 2: // Employment Type, Duration
        return formData.employmentType !== '' && formData.employmentDuration !== '';
      case 3: // Salary
        return formData.salary !== '';
      case 4: // Credit Score
        return formData.creditScore !== '';
      case 5: // Down Payment
        return formData.downPayment !== '';
      case 6: // Timeline
        return formData.timeline !== '';
      default:
        return false;
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/submit-lead', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        console.log('Lead submitted successfully:', result.lead_id || result.message);
        setIsComplete(true);
      } else {
        console.error('Error submitting lead:', result.error);
        setIsComplete(true);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setIsComplete(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  const salesPriceOptions = [
    'Under $200,000',
    '$200,000 - $350,000',
    '$350,000 - $500,000',
    '$500,000 - $750,000',
    '$750,000 - $1,000,000',
    '$1,000,000+',
  ];

  const employmentOptions = [
    { value: 'salaried', label: 'Salaried / W-2 Employee' },
    { value: 'self-employed', label: 'Self-Employed / Business Owner' },
    { value: '1099', label: '1099 Contractor' },
    { value: 'retired', label: 'Retired' },
    { value: 'other', label: 'Other' },
  ];

  const employmentDurationOptions = [
    'Less than 1 year',
    '1-2 years',
    '2-5 years',
    '5-10 years',
    '10+ years',
  ];

  const salaryOptions = [
    'Under $50,000',
    '$50,000 - $75,000',
    '$75,000 - $100,000',
    '$100,000 - $150,000',
    '$150,000 - $200,000',
    '$200,000+',
  ];

  const creditScoreOptions = [
    { value: 'excellent', label: 'Excellent (750+)' },
    { value: 'good', label: 'Good (700-749)' },
    { value: 'fair', label: 'Fair (650-699)' },
    { value: 'poor', label: 'Below 650' },
    { value: 'not-sure', label: 'Not sure' },
  ];

  const downPaymentOptions = [
    'Less than $10,000',
    '$10,000 - $25,000',
    '$25,000 - $50,000',
    '$50,000 - $100,000',
    '$100,000+',
    'Not sure yet',
  ];

  const timelineOptions = [
    { value: 'immediate', label: 'Immediate – I need funding ASAP' },
    { value: '30-days', label: 'Within 30 days' },
    { value: '30-60-days', label: '30-60 days' },
    { value: '60-plus', label: '60+ days' },
    { value: 'just-looking', label: 'Just looking / exploring options' },
  ];

  const inputBaseClass = "w-full px-5 py-4 text-base bg-white border-2 border-[#0D3F72]/20 rounded-xl focus:border-[#267AB1] focus:ring-0 focus:outline-none transition-colors placeholder:text-[#0D3F72]/40";
  const optionBaseClass = "w-full px-5 py-4 text-left bg-white border-2 rounded-xl transition-all duration-200 hover:border-[#267AB1] hover:bg-[#267AB1]/5 cursor-pointer";
  const selectedClass = "border-[#267AB1] bg-[#267AB1]/10 text-[#0D3F72]";
  const unselectedClass = "border-[#0D3F72]/20 text-[#0D3F72]/80";

  const renderStep = () => {
    switch (step) {
      case 0: // Contact Info
        return (
          <div className="space-y-5">
            <div className="flex items-center gap-3 text-[#267AB1]">
              <User className="w-5 h-5" />
              <span className="text-sm font-medium uppercase tracking-wider">Step 1 of 7 • Contact Info</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#0D3F72]">
              Let's get to know you
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[#0D3F72] mb-2">Full Name</label>
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => updateField('fullName', e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="John Smith"
                  className={inputBaseClass}
                  autoFocus
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#0D3F72] mb-2">Phone Number</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={handlePhoneChange}
                  onKeyDown={handleKeyDown}
                  placeholder="(555) 123-4567"
                  className={inputBaseClass}
                  maxLength={14}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#0D3F72] mb-2">Email Address</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => updateField('email', e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="you@example.com"
                  className={inputBaseClass}
                />
              </div>
            </div>
          </div>
        );

      case 1: // Location & Price
        return (
          <div className="space-y-5">
            <div className="flex items-center gap-3 text-[#267AB1]">
              <MapPin className="w-5 h-5" />
              <span className="text-sm font-medium uppercase tracking-wider">Step 2 of 7 • Property Details</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#0D3F72]">
              Where are you looking?
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[#0D3F72] mb-2">City or Area</label>
                <input
                  type="text"
                  value={formData.city}
                  onChange={(e) => updateField('city', e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="e.g., Miami, Pembroke Pines, Broward County"
                  className={inputBaseClass}
                  autoFocus
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#0D3F72] mb-2">Approximate Sales Price</label>
                <div className="grid grid-cols-2 gap-2">
                  {salesPriceOptions.map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => updateField('salesPrice', option)}
                      className={`${optionBaseClass} text-sm ${formData.salesPrice === option ? selectedClass : unselectedClass}`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case 2: // Employment
        return (
          <div className="space-y-5">
            <div className="flex items-center gap-3 text-[#267AB1]">
              <Briefcase className="w-5 h-5" />
              <span className="text-sm font-medium uppercase tracking-wider">Step 3 of 7 • Employment</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#0D3F72]">
              Tell us about your work
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[#0D3F72] mb-2">Employment Type</label>
                <div className="space-y-2">
                  {employmentOptions.map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => updateField('employmentType', option.value)}
                      className={`${optionBaseClass} text-sm ${formData.employmentType === option.value ? selectedClass : unselectedClass}`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-[#0D3F72] mb-2">How long at current job?</label>
                <div className="grid grid-cols-2 gap-2">
                  {employmentDurationOptions.map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => updateField('employmentDuration', option)}
                      className={`${optionBaseClass} text-sm ${formData.employmentDuration === option ? selectedClass : unselectedClass}`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case 3: // Salary
        return (
          <div className="space-y-5">
            <div className="flex items-center gap-3 text-[#267AB1]">
              <DollarSign className="w-5 h-5" />
              <span className="text-sm font-medium uppercase tracking-wider">Step 4 of 7 • Income</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#0D3F72]">
              What's your annual income?
            </h2>
            <p className="text-[#0D3F72]/60">This helps us find the right loan options for you.</p>
            <div className="grid grid-cols-2 gap-3">
              {salaryOptions.map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => {
                    updateField('salary', option);
                    setTimeout(handleNext, 300);
                  }}
                  className={`${optionBaseClass} ${formData.salary === option ? selectedClass : unselectedClass}`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        );

      case 4: // Credit Score
        return (
          <div className="space-y-5">
            <div className="flex items-center gap-3 text-[#267AB1]">
              <CreditCard className="w-5 h-5" />
              <span className="text-sm font-medium uppercase tracking-wider">Step 5 of 7 • Credit</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#0D3F72]">
              What's your approximate credit score?
            </h2>
            <p className="text-[#0D3F72]/60">An estimate is fine – we work with all credit profiles.</p>
            <div className="space-y-3">
              {creditScoreOptions.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => {
                    updateField('creditScore', option.value);
                    setTimeout(handleNext, 300);
                  }}
                  className={`${optionBaseClass} ${formData.creditScore === option.value ? selectedClass : unselectedClass}`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        );

      case 5: // Down Payment
        return (
          <div className="space-y-5">
            <div className="flex items-center gap-3 text-[#267AB1]">
              <PiggyBank className="w-5 h-5" />
              <span className="text-sm font-medium uppercase tracking-wider">Step 6 of 7 • Down Payment</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#0D3F72]">
              How much do you have for a down payment?
            </h2>
            <p className="text-[#0D3F72]/60">We can work with various down payment amounts.</p>
            <div className="grid grid-cols-2 gap-3">
              {downPaymentOptions.map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => {
                    updateField('downPayment', option);
                    setTimeout(handleNext, 300);
                  }}
                  className={`${optionBaseClass} ${formData.downPayment === option ? selectedClass : unselectedClass}`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        );

      case 6: // Timeline
        return (
          <div className="space-y-5">
            <div className="flex items-center gap-3 text-[#267AB1]">
              <Clock className="w-5 h-5" />
              <span className="text-sm font-medium uppercase tracking-wider">Step 7 of 7 • Timeline</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#0D3F72]">
              What's your timeline?
            </h2>
            <p className="text-[#0D3F72]/60">When are you looking to move forward?</p>
            <div className="space-y-3">
              {timelineOptions.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => updateField('timeline', option.value)}
                  className={`${optionBaseClass} ${formData.timeline === option.value ? selectedClass : unselectedClass}`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative w-full max-w-xl mx-4 max-h-[90vh] overflow-hidden">
        <div className="bg-gradient-to-br from-[#E1EAEF] to-white rounded-3xl shadow-2xl overflow-hidden">
          {/* Progress bar */}
          <div className="h-1.5 bg-[#0D3F72]/10">
            <div 
              className="h-full bg-gradient-to-r from-[#0D3F72] to-[#267AB1] transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-[#0D3F72]/10 flex items-center justify-center text-[#0D3F72]/60 hover:bg-[#0D3F72]/20 hover:text-[#0D3F72] transition-colors z-10"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Content */}
          <div className="p-6 sm:p-8 max-h-[80vh] overflow-y-auto">
            {isComplete ? (
              <div className="text-center py-8">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Check className="w-10 h-10 text-green-600" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-[#0D3F72] mb-4">
                  You're all set, {formData.fullName.split(' ')[0]}!
                </h2>
                <p className="text-[#0D3F72]/60 mb-8 max-w-md mx-auto">
                  Thanks for reaching out! One of our mortgage experts will contact you within 24 hours to discuss your options.
                </p>
                <button
                  onClick={onClose}
                  className="px-8 py-4 bg-gradient-to-r from-[#0D3F72] to-[#267AB1] text-white font-semibold rounded-full hover:shadow-lg transition-all"
                >
                  Close
                </button>
              </div>
            ) : (
              <>
                {/* Step content with animation */}
                <div 
                  key={step}
                  className={`transition-all duration-300 ${
                    direction === 'forward' 
                      ? 'animate-slideInRight' 
                      : 'animate-slideInLeft'
                  }`}
                >
                  {renderStep()}
                </div>

                {/* Navigation */}
                <div className="flex items-center justify-between mt-8 pt-6 border-t border-[#0D3F72]/10">
                  <button
                    type="button"
                    onClick={handleBack}
                    className={`flex items-center gap-2 px-4 py-2 text-[#0D3F72]/60 hover:text-[#0D3F72] transition-colors ${
                      step === 0 ? 'invisible' : ''
                    }`}
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Back
                  </button>

                  {step === totalSteps - 1 ? (
                    <button
                      type="button"
                      onClick={handleSubmit}
                      disabled={!canProceed() || isSubmitting}
                      className={`flex items-center gap-2 px-8 py-4 rounded-full font-semibold transition-all ${
                        canProceed() && !isSubmitting
                          ? 'bg-gradient-to-r from-[#0D3F72] to-[#267AB1] text-white hover:shadow-lg hover:scale-105'
                          : 'bg-[#0D3F72]/20 text-[#0D3F72]/40 cursor-not-allowed'
                      }`}
                    >
                      {isSubmitting ? (
                        <>
                          <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                          </svg>
                          Submitting...
                        </>
                      ) : (
                        <>
                          Submit
                          <Check className="w-5 h-5" />
                        </>
                      )}
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={handleNext}
                      disabled={!canProceed()}
                      className={`flex items-center gap-2 px-8 py-4 rounded-full font-semibold transition-all ${
                        canProceed()
                          ? 'bg-gradient-to-r from-[#0D3F72] to-[#267AB1] text-white hover:shadow-lg hover:scale-105'
                          : 'bg-[#0D3F72]/20 text-[#0D3F72]/40 cursor-not-allowed'
                      }`}
                    >
                      Continue
                      <ArrowRight className="w-5 h-5" />
                    </button>
                  )}
                </div>

                {/* Keyboard hint */}
                <p className="text-center text-xs text-[#0D3F72]/40 mt-4">
                  Press <kbd className="px-2 py-0.5 bg-[#0D3F72]/10 rounded text-[#0D3F72]/60">Enter ↵</kbd> to continue
                </p>
              </>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        .animate-slideInRight {
          animation: slideInRight 0.3s ease-out forwards;
        }
        .animate-slideInLeft {
          animation: slideInLeft 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
}
