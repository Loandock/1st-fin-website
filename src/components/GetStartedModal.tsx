'use client';

import React, { useState, useEffect } from 'react';
import { X, ArrowRight, ArrowLeft, Check, User, MapPin, Briefcase, DollarSign, CreditCard, PiggyBank, Clock, Sparkles, Home } from 'lucide-react';

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

const STEP_META = [
  { icon: User, label: 'Contact', color: '#267AB1' },
  { icon: MapPin, label: 'Property', color: '#1B6FA0' },
  { icon: Briefcase, label: 'Work', color: '#0D3F72' },
  { icon: DollarSign, label: 'Income', color: '#267AB1' },
  { icon: CreditCard, label: 'Credit', color: '#1B6FA0' },
  { icon: PiggyBank, label: 'Savings', color: '#0D3F72' },
  { icon: Clock, label: 'Timeline', color: '#267AB1' },
];

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
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => { setStep(0); setFormData(INITIAL_DATA); setIsComplete(false); }, 300);
    }
  }, [isOpen]);

  const handleNext = () => { if (step < totalSteps - 1) { setDirection('forward'); setStep(step + 1); } };
  const handleBack = () => { if (step > 0) { setDirection('backward'); setStep(step - 1); } };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && canProceed()) {
      e.preventDefault();
      if (step === totalSteps - 1) handleSubmit(); else handleNext();
    }
  };

  const updateField = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // Auto-advance when all fields on current step are filled
  useEffect(() => {
    const timer = setTimeout(() => {
      if (isComplete || isSubmitting) return;
      switch (step) {
        case 0:
          if (formData.fullName.trim().length >= 2 && formData.phone.replace(/\D/g, '').length === 10 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) handleNext();
          break;
        case 1:
          if (formData.city.trim().length >= 2 && formData.salesPrice !== '') handleNext();
          break;
        case 2:
          if (formData.employmentType !== '' && formData.employmentDuration !== '') handleNext();
          break;
        case 3:
          if (formData.salary !== '') handleNext();
          break;
        case 4:
          if (formData.creditScore !== '') handleNext();
          break;
        case 5:
          if (formData.downPayment !== '') handleNext();
          break;
        case 6:
          if (formData.timeline !== '') handleSubmit();
          break;
      }
    }, 350);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData, step]);

  const formatPhone = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 3) return numbers;
    if (numbers.length <= 6) return `(${numbers.slice(0, 3)}) ${numbers.slice(3)}`;
    return `(${numbers.slice(0, 3)}) ${numbers.slice(3, 6)}-${numbers.slice(6, 10)}`;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateField('phone', formatPhone(e.target.value));
  };

  const canProceed = (): boolean => {
    switch (step) {
      case 0: return formData.fullName.trim().length >= 2 && formData.phone.replace(/\D/g, '').length === 10 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email);
      case 1: return formData.city.trim().length >= 2 && formData.salesPrice !== '';
      case 2: return formData.employmentType !== '' && formData.employmentDuration !== '';
      case 3: return formData.salary !== '';
      case 4: return formData.creditScore !== '';
      case 5: return formData.downPayment !== '';
      case 6: return formData.timeline !== '';
      default: return false;
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/submit-lead', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(formData) });
      const result = await response.json();
      if (response.ok && result.success) console.log('Lead submitted successfully:', result.lead_id || result.message);
      else console.error('Error submitting lead:', result.error);
      setIsComplete(true);
    } catch (error) {
      console.error('Error submitting form:', error);
      setIsComplete(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  const salesPriceOptions = [
    { label: 'Under $200K', value: 'Under $200,000' },
    { label: '$200K – $350K', value: '$200,000 - $350,000' },
    { label: '$350K – $500K', value: '$350,000 - $500,000' },
    { label: '$500K – $750K', value: '$500,000 - $750,000' },
    { label: '$750K – $1M', value: '$750,000 - $1,000,000' },
    { label: '$1M+', value: '$1,000,000+' },
  ];

  const employmentOptions = [
    { value: 'salaried', label: 'W-2 Employee', emoji: '💼' },
    { value: 'self-employed', label: 'Self-Employed', emoji: '🏢' },
    { value: '1099', label: '1099 Contractor', emoji: '📋' },
    { value: 'retired', label: 'Retired', emoji: '🌴' },
    { value: 'other', label: 'Other', emoji: '📌' },
  ];

  const employmentDurationOptions = [
    'Less than 1 year', '1-2 years', '2-5 years', '5-10 years', '10+ years',
  ];

  const salaryOptions = [
    { label: 'Under $50K', value: 'Under $50,000' },
    { label: '$50K – $75K', value: '$50,000 - $75,000' },
    { label: '$75K – $100K', value: '$75,000 - $100,000' },
    { label: '$100K – $150K', value: '$100,000 - $150,000' },
    { label: '$150K – $200K', value: '$150,000 - $200,000' },
    { label: '$200K+', value: '$200,000+' },
  ];

  const creditScoreOptions = [
    { value: 'excellent', label: 'Excellent', sub: '750+', emoji: '🌟' },
    { value: 'good', label: 'Good', sub: '700–749', emoji: '👍' },
    { value: 'fair', label: 'Fair', sub: '650–699', emoji: '👌' },
    { value: 'poor', label: 'Below 650', sub: '', emoji: '🔧' },
    { value: 'not-sure', label: 'Not sure', sub: '', emoji: '🤔' },
  ];

  const downPaymentOptions = [
    { label: 'Under $10K', value: 'Less than $10,000' },
    { label: '$10K – $25K', value: '$10,000 - $25,000' },
    { label: '$25K – $50K', value: '$25,000 - $50,000' },
    { label: '$50K – $100K', value: '$50,000 - $100,000' },
    { label: '$100K+', value: '$100,000+' },
    { label: 'Not sure yet', value: 'Not sure yet' },
  ];

  const timelineOptions = [
    { value: 'immediate', label: 'ASAP', sub: 'I need funding now', emoji: '🔥' },
    { value: '30-days', label: '30 days', sub: 'Within a month', emoji: '📅' },
    { value: '30-60-days', label: '30–60 days', sub: 'A couple months', emoji: '⏳' },
    { value: '60-plus', label: '60+ days', sub: 'No rush', emoji: '🗓️' },
    { value: 'just-looking', label: 'Just exploring', sub: 'Learning my options', emoji: '🔍' },
  ];

  const inputClass = "w-full px-5 py-4 text-base bg-white/80 backdrop-blur-sm border-2 border-[#0D3F72]/15 rounded-2xl focus:border-[#267AB1] focus:bg-white focus:shadow-lg focus:shadow-[#267AB1]/10 focus:ring-0 focus:outline-none transition-all duration-200 placeholder:text-[#0D3F72]/35 text-[#0D3F72]";

  const OptionCard = ({ selected, onClick, children, className = '' }: { selected: boolean; onClick: () => void; children: React.ReactNode; className?: string }) => (
    <button
      type="button"
      onClick={onClick}
      className={`relative text-left px-5 py-4 rounded-2xl border-2 transition-all duration-200 cursor-pointer group ${
        selected
          ? 'border-[#267AB1] bg-gradient-to-br from-[#267AB1]/10 to-[#0D3F72]/5 shadow-md shadow-[#267AB1]/15 scale-[1.02]'
          : 'border-[#0D3F72]/12 bg-white/60 hover:border-[#267AB1]/40 hover:bg-white hover:shadow-md hover:shadow-[#0D3F72]/5 hover:scale-[1.01]'
      } ${className}`}
    >
      {selected && (
        <div className="absolute top-2.5 right-2.5 w-5 h-5 bg-[#267AB1] rounded-full flex items-center justify-center">
          <Check className="w-3 h-3 text-white" />
        </div>
      )}
      {children}
    </button>
  );

  const renderStep = () => {
    const StepIcon = STEP_META[step].icon;

    switch (step) {
      case 0:
        return (
          <div className="space-y-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#267AB1]/10 text-[#267AB1] text-xs font-bold uppercase tracking-widest mb-4">
                <StepIcon className="w-3.5 h-3.5" /> Step 1 of 7
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0D3F72] leading-tight">
                Let&apos;s get to<br />know you
              </h2>
              <p className="text-[#0D3F72]/70 mt-2">We&apos;ll reach out to discuss your options.</p>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-[#0D3F72]/70 mb-1.5 ml-1">Full Name</label>
                <input type="text" value={formData.fullName} onChange={(e) => updateField('fullName', e.target.value)} onKeyDown={handleKeyDown} placeholder="John Smith" className={inputClass} autoFocus />
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#0D3F72]/70 mb-1.5 ml-1">Phone Number</label>
                <input type="tel" value={formData.phone} onChange={handlePhoneChange} onKeyDown={handleKeyDown} placeholder="(555) 123-4567" className={inputClass} maxLength={14} />
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#0D3F72]/70 mb-1.5 ml-1">Email Address</label>
                <input type="email" value={formData.email} onChange={(e) => updateField('email', e.target.value)} onKeyDown={handleKeyDown} placeholder="you@example.com" className={inputClass} />
              </div>
            </div>
          </div>
        );

      case 1:
        return (
          <div className="space-y-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#267AB1]/10 text-[#267AB1] text-xs font-bold uppercase tracking-widest mb-4">
                <StepIcon className="w-3.5 h-3.5" /> Step 2 of 7
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0D3F72] leading-tight">
                Where are you<br />looking?
              </h2>
            </div>
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-[#0D3F72]/70 mb-1.5 ml-1">City or Area</label>
                <input type="text" value={formData.city} onChange={(e) => updateField('city', e.target.value)} onKeyDown={handleKeyDown} placeholder="Miami, Pembroke Pines, Broward County..." className={inputClass} autoFocus />
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#0D3F72]/70 mb-2 ml-1">Approximate Sales Price</label>
                <div className="grid grid-cols-3 gap-2.5">
                  {salesPriceOptions.map((opt) => (
                    <OptionCard key={opt.value} selected={formData.salesPrice === opt.value} onClick={() => updateField('salesPrice', opt.value)}>
                      <span className="font-bold text-sm text-[#0D3F72]">{opt.label}</span>
                    </OptionCard>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#267AB1]/10 text-[#267AB1] text-xs font-bold uppercase tracking-widest mb-4">
                <StepIcon className="w-3.5 h-3.5" /> Step 3 of 7
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0D3F72] leading-tight">
                Tell us about<br />your work
              </h2>
            </div>
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-[#0D3F72]/70 mb-2 ml-1">Employment Type</label>
                <div className="space-y-2.5">
                  {employmentOptions.map((opt) => (
                    <OptionCard key={opt.value} selected={formData.employmentType === opt.value} onClick={() => updateField('employmentType', opt.value)}>
                      <div className="flex items-center gap-3">
                        <span className="text-xl">{opt.emoji}</span>
                        <span className="font-semibold text-[#0D3F72]">{opt.label}</span>
                      </div>
                    </OptionCard>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#0D3F72]/70 mb-2 ml-1">How long at current job?</label>
                <div className="grid grid-cols-2 gap-2.5">
                  {employmentDurationOptions.map((opt) => (
                    <OptionCard key={opt} selected={formData.employmentDuration === opt} onClick={() => updateField('employmentDuration', opt)}>
                      <span className="font-semibold text-sm text-[#0D3F72]">{opt}</span>
                    </OptionCard>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#267AB1]/10 text-[#267AB1] text-xs font-bold uppercase tracking-widest mb-4">
                <StepIcon className="w-3.5 h-3.5" /> Step 4 of 7
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0D3F72] leading-tight">
                What&apos;s your<br />annual income?
              </h2>
              <p className="text-[#0D3F72]/70 mt-2">Helps us match you with the right programs.</p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {salaryOptions.map((opt) => (
                <OptionCard key={opt.value} selected={formData.salary === opt.value} onClick={() => updateField('salary', opt.value)}>
                  <span className="font-bold text-[#0D3F72]">{opt.label}</span>
                </OptionCard>
              ))}
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#267AB1]/10 text-[#267AB1] text-xs font-bold uppercase tracking-widest mb-4">
                <StepIcon className="w-3.5 h-3.5" /> Step 5 of 7
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0D3F72] leading-tight">
                Approximate<br />credit score?
              </h2>
              <p className="text-[#0D3F72]/70 mt-2">An estimate is fine — we work with all profiles.</p>
            </div>
            <div className="space-y-2.5">
              {creditScoreOptions.map((opt) => (
                <OptionCard key={opt.value} selected={formData.creditScore === opt.value} onClick={() => updateField('creditScore', opt.value)}>
                  <div className="flex items-center gap-3">
                    <span className="text-xl">{opt.emoji}</span>
                    <div>
                      <span className="font-bold text-[#0D3F72]">{opt.label}</span>
                      {opt.sub && <span className="text-[#0D3F72]/70 text-sm ml-1.5">({opt.sub})</span>}
                    </div>
                  </div>
                </OptionCard>
              ))}
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#267AB1]/10 text-[#267AB1] text-xs font-bold uppercase tracking-widest mb-4">
                <StepIcon className="w-3.5 h-3.5" /> Step 6 of 7
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0D3F72] leading-tight">
                Down payment<br />available?
              </h2>
              <p className="text-[#0D3F72]/70 mt-2">We can work with various amounts, including $0 down.</p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {downPaymentOptions.map((opt) => (
                <OptionCard key={opt.value} selected={formData.downPayment === opt.value} onClick={() => updateField('downPayment', opt.value)}>
                  <span className="font-bold text-sm text-[#0D3F72]">{opt.label}</span>
                </OptionCard>
              ))}
            </div>
          </div>
        );

      case 6:
        return (
          <div className="space-y-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#267AB1]/10 text-[#267AB1] text-xs font-bold uppercase tracking-widest mb-4">
                <StepIcon className="w-3.5 h-3.5" /> Step 7 of 7
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0D3F72] leading-tight">
                What&apos;s your<br />timeline?
              </h2>
              <p className="text-[#0D3F72]/70 mt-2">When are you looking to move forward?</p>
            </div>
            <div className="space-y-2.5">
              {timelineOptions.map((opt) => (
                <OptionCard key={opt.value} selected={formData.timeline === opt.value} onClick={() => updateField('timeline', opt.value)}>
                  <div className="flex items-center gap-3">
                    <span className="text-xl">{opt.emoji}</span>
                    <div>
                      <span className="font-bold text-[#0D3F72]">{opt.label}</span>
                      <span className="text-[#0D3F72]/70 text-sm ml-1.5">— {opt.sub}</span>
                    </div>
                  </div>
                </OptionCard>
              ))}
            </div>
          </div>
        );

      default: return null;
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-[#0D3F72]/70 backdrop-blur-md" onClick={onClose} />

      {/* Modal */}
      <div className="relative w-full max-w-2xl mx-3 sm:mx-4 max-h-[92vh] overflow-hidden" style={{ animation: 'modalPop 0.35s cubic-bezier(0.16,1,0.3,1)' }}>
        <div className="bg-gradient-to-br from-[#F4F8FB] via-white to-[#E8F0F6] rounded-3xl shadow-[0_32px_80px_-12px_rgba(13,63,114,0.4)] overflow-hidden border border-white/50">

          {/* Decorative top accent */}
          <div className="relative h-2 bg-gradient-to-r from-[#0D3F72] via-[#267AB1] to-[#4A9DD6] overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent" style={{ animation: 'shimmer 2s ease-in-out infinite' }} />
          </div>

          {/* Header with progress */}
          <div className="px-6 sm:px-8 pt-6 pb-4">
            <div className="flex items-center justify-between mb-5">
              {/* Step dots */}
              <div className="flex items-center gap-1.5">
                {STEP_META.map((meta, i) => {
                  const Icon = meta.icon;
                  return (
                    <div
                      key={i}
                      className={`flex items-center justify-center rounded-full transition-all duration-300 ${
                        i === step
                          ? 'w-9 h-9 bg-gradient-to-br from-[#0D3F72] to-[#267AB1] shadow-lg shadow-[#267AB1]/30'
                          : i < step
                            ? 'w-7 h-7 bg-[#267AB1]/15'
                            : 'w-7 h-7 bg-[#0D3F72]/8'
                      }`}
                    >
                      {i < step ? (
                        <Check className="w-3.5 h-3.5 text-[#267AB1]" />
                      ) : (
                        <Icon className={`w-3.5 h-3.5 ${i === step ? 'text-white' : 'text-[#0D3F72]/30'}`} />
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Close */}
              <button onClick={onClose} className="w-10 h-10 rounded-full bg-[#0D3F72]/8 flex items-center justify-center text-[#0D3F72]/70 hover:bg-[#0D3F72]/15 hover:text-[#0D3F72] transition-all hover:rotate-90 duration-300">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Progress bar */}
            <div className="h-1 bg-[#0D3F72]/8 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-[#0D3F72] to-[#267AB1] rounded-full transition-all duration-500 ease-out" style={{ width: `${progress}%` }} />
            </div>
          </div>

          {/* Content area */}
          <div className="px-6 sm:px-8 pb-6 max-h-[65vh] overflow-y-auto modal-scroll">
            {isComplete ? (
              <div className="text-center py-10">
                <div className="relative w-24 h-24 mx-auto mb-6">
                  <div className="absolute inset-0 bg-green-400/20 rounded-full animate-ping" />
                  <div className="relative w-24 h-24 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center shadow-xl shadow-green-500/30">
                    <Check className="w-12 h-12 text-white" strokeWidth={3} />
                  </div>
                </div>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0D3F72] mb-3">
                  You&apos;re all set{formData.fullName ? `, ${formData.fullName.split(' ')[0]}` : ''}!
                </h2>
                <p className="text-[#0D3F72]/55 mb-8 max-w-sm mx-auto text-lg">
                  Our mortgage team will be in touch within 24 hours to discuss your options.
                </p>
                <button onClick={onClose} className="px-10 py-4 bg-gradient-to-r from-[#0D3F72] to-[#267AB1] text-white font-bold rounded-full hover:shadow-xl hover:shadow-[#0D3F72]/25 hover:scale-105 transition-all duration-200 text-lg">
                  Done
                </button>
              </div>
            ) : (
              <>
                <div key={step} className={direction === 'forward' ? 'animate-slideInRight' : 'animate-slideInLeft'}>
                  {renderStep()}
                </div>

                {/* Navigation */}
                <div className="flex items-center justify-between mt-8 pt-5 border-t border-[#0D3F72]/8">
                  <button
                    type="button"
                    onClick={handleBack}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-[#0D3F72]/70 hover:text-[#0D3F72] hover:bg-[#0D3F72]/5 transition-all ${step === 0 ? 'invisible' : ''}`}
                  >
                    <ArrowLeft className="w-4 h-4" /> Back
                  </button>

                  {step === totalSteps - 1 ? (
                    <button
                      type="button"
                      onClick={handleSubmit}
                      disabled={!canProceed() || isSubmitting}
                      className={`flex items-center gap-2.5 px-8 py-4 rounded-full font-bold text-lg transition-all duration-200 ${
                        canProceed() && !isSubmitting
                          ? 'bg-gradient-to-r from-[#0D3F72] to-[#267AB1] text-white shadow-xl shadow-[#0D3F72]/25 hover:shadow-2xl hover:scale-105'
                          : 'bg-[#0D3F72]/12 text-[#0D3F72]/30 cursor-not-allowed'
                      }`}
                    >
                      {isSubmitting ? (
                        <>
                          <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" /></svg>
                          Submitting...
                        </>
                      ) : (
                        <>
                          Submit <Sparkles className="w-5 h-5" />
                        </>
                      )}
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={handleNext}
                      disabled={!canProceed()}
                      className={`flex items-center gap-2.5 px-8 py-4 rounded-full font-bold text-lg transition-all duration-200 ${
                        canProceed()
                          ? 'bg-gradient-to-r from-[#0D3F72] to-[#267AB1] text-white shadow-xl shadow-[#0D3F72]/25 hover:shadow-2xl hover:scale-105'
                          : 'bg-[#0D3F72]/12 text-[#0D3F72]/30 cursor-not-allowed'
                      }`}
                    >
                      Continue <ArrowRight className="w-5 h-5" />
                    </button>
                  )}
                </div>

                <p className="text-center text-xs text-[#0D3F72]/30 mt-4">
                  Press <kbd className="px-2 py-0.5 bg-[#0D3F72]/8 rounded-md text-[#0D3F72]/70 font-mono text-[10px]">Enter ↵</kbd> to continue
                </p>
              </>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes modalPop {
          from { opacity: 0; transform: scale(0.92) translateY(20px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes shimmer {
          0%, 100% { transform: translateX(-100%); }
          50% { transform: translateX(100%); }
        }
        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(40px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes slideInLeft {
          from { opacity: 0; transform: translateX(-40px); }
          to { opacity: 1; transform: translateX(0); }
        }
        .animate-slideInRight { animation: slideInRight 0.3s ease-out forwards; }
        .animate-slideInLeft { animation: slideInLeft 0.3s ease-out forwards; }
        .modal-scroll::-webkit-scrollbar { width: 4px; }
        .modal-scroll::-webkit-scrollbar-track { background: transparent; }
        .modal-scroll::-webkit-scrollbar-thumb { background: rgba(13,63,114,0.15); border-radius: 10px; }
      `}</style>
    </div>
  );
}
