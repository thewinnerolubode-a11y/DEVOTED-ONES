import React, { useState, useEffect } from 'react';
import {
  X,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  Sparkles,
  Loader2,
} from 'lucide-react';
import { OnboardingData, FormErrors, OccupationType } from '../types';
import { BrandLogo } from './BrandLogo';

interface OnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const APPS_SCRIPT_URL: string =
  (import.meta as any).env?.VITE_APPS_SCRIPT_URL ||
  'https://script.google.com/macros/s/AKfycbwBIGZM_l67mgUtIlrYKGgQGSSY0e2GRQaCB-1AWOUiGxbzOmVxdKqPVDFH7332FhwWog/exec';

const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const DAYS = Array.from({ length: 31 }, (_, i) => String(i + 1));

const INITIAL_DATA: OnboardingData = {
  fullName: '',
  preferredName: '',
  birthDay: '',
  birthMonth: '',
  gender: '',
  city: '',
  currentLocation: '',
  phone: '',
  email: '',
  occupation: '',
  occupationOtherDetail: '',
  professionOrCourse: '',
  skills: '',
  schoolOfStudy: '',
  faithQuestions: '',
  walkStartedWhen: '',
  spiritualGoals: '',
};

export const OnboardingModal: React.FC<OnboardingModalProps> = ({ isOpen, onClose }) => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [formData, setFormData] = useState<OnboardingData>(() => {
    try {
      const saved = localStorage.getItem('devoted_ones_onboarding_draft');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return INITIAL_DATA;
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Sync draft to local storage
  useEffect(() => {
    if (!isSubmitted) {
      try {
        localStorage.setItem('devoted_ones_onboarding_draft', JSON.stringify(formData));
      } catch {
        // ignore storage errors
      }
    }
  }, [formData, isSubmitted]);

  // After a successful submission, reset the form once the modal is closed.
  // (Reset is deferred to close so the success screen can still show the submitted email.)
  useEffect(() => {
    if (!isOpen && isSubmitted) {
      setIsSubmitted(false);
      setCurrentStep(1);
      setSubmitError(null);
      setFormData(INITIAL_DATA);
    }
  }, [isOpen, isSubmitted]);

  // Handle ESC key and scroll lock
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const updateField = (field: keyof OnboardingData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const validateStep1 = (): boolean => {
    const errs: FormErrors = {};

    if (!formData.fullName.trim()) {
      errs.fullName = 'Full Name is required.';
    }

    if (!formData.birthDay || !formData.birthMonth) {
      errs.dob = 'Please select both your birth day and month.';
    }

    if (!formData.city.trim()) {
      errs.city = 'Town / City is required.';
    }

    if (!formData.currentLocation.trim()) {
      errs.currentLocation = 'Current location is required.';
    }

    if (!formData.email.trim()) {
      errs.email = 'Email address is required.';
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email.trim())) {
        errs.email = 'Please enter a valid email address.';
      }
    }

    if (!formData.phone.trim()) {
      errs.phone = 'Phone number is required.';
    } else {
      const phoneRegex = /^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]{6,15}$/;
      if (!phoneRegex.test(formData.phone.trim().replace(/\s/g, ''))) {
        errs.phone = 'Please enter a valid phone number with area/country code.';
      }
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const validateStep2 = (): boolean => {
    const errs: FormErrors = {};

    if (!formData.occupation) {
      errs.occupation = 'Please select your current status.';
    }

    if (formData.occupation === 'Other' && !formData.occupationOtherDetail?.trim()) {
      errs.occupationOtherDetail = 'Please specify what you currently do.';
    }

    if (!formData.professionOrCourse.trim()) {
      errs.professionOrCourse = formData.occupation === 'Student'
        ? 'Course of study is required.'
        : 'Profession or field of work is required.';
    }

    if (formData.occupation === 'Student' && !formData.schoolOfStudy.trim()) {
      errs.schoolOfStudy = 'School of study is required for students.';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const validateStep3 = (): boolean => {
    const errs: FormErrors = {};

    if (!formData.faithQuestions.trim()) {
      errs.faithQuestions = 'Please let us know what areas you want to understand better.';
    }

    if (!formData.walkStartedWhen.trim()) {
      errs.walkStartedWhen = 'Please share when you began your walk with God.';
    }

    if (!formData.spiritualGoals.trim()) {
      errs.spiritualGoals = 'Please share your spiritual goals.';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleNext = () => {
    if (currentStep === 1) {
      if (validateStep1()) setCurrentStep(2);
    } else if (currentStep === 2) {
      if (validateStep2()) setCurrentStep(3);
    } else if (currentStep === 3) {
      if (validateStep3()) setCurrentStep(4);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setErrors({});
      setCurrentStep((prev) => prev - 1);
    }
  };

  // Build the payload with the exact field names expected by the Apps Script backend.
  const buildPayload = () => ({
    fullName: formData.fullName,
    preferredName: formData.preferredName,
    dateOfBirth: `${formData.birthMonth} ${formData.birthDay}`.trim(),
    gender: formData.gender,
    townCity: formData.city,
    currentLocation: formData.currentLocation,
    phoneNumber: formData.phone,
    emailAddress: formData.email,
    occupationStatus: formData.occupation,
    courseProfession: formData.professionOrCourse,
    skills: formData.skills,
    schoolOfStudy: formData.schoolOfStudy,
    faithLearningInterests: formData.faithQuestions,
    faithJourneyStart: formData.walkStartedWhen,
    spiritualGoals: formData.spiritualGoals,
  });

  const handleFinalSubmit = async () => {
    // Validate all steps
    if (!validateStep1()) {
      setCurrentStep(1);
      return;
    }
    if (!validateStep2()) {
      setCurrentStep(2);
      return;
    }
    if (!validateStep3()) {
      setCurrentStep(3);
      return;
    }

    setSubmitError(null);
    setIsSubmitting(true);

    try {
      const response = await fetch(APPS_SCRIPT_URL, {
        method: 'POST',
        // Apps Script cannot answer the CORS preflight for application/json,
        // so we send the JSON string as text/plain and parse it server-side.
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify(buildPayload()),
      });

      if (!response.ok) {
        throw new Error(`Server responded with ${response.status}`);
      }

      // Apps Script may still return JSON containing an `error` field.
      let data: any = null;
      try {
        data = await response.json();
      } catch {
        // non-JSON response is acceptable
      }
      if (data && data.error) {
        throw new Error(String(data.error));
      }

      // Success
      setIsSubmitted(true);
      try {
        localStorage.removeItem('devoted_ones_onboarding_draft');
        localStorage.setItem('devoted_ones_member', JSON.stringify(formData));
      } catch {
        // ignore
      }
    } catch (err: any) {
      // Failure: preserve the user's information and surface an error.
      setSubmitError(
        err?.message
          ? `We couldn't submit your registration: ${err.message}. Please try again.`
          : "We couldn't submit your registration. Please check your connection and try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-md animate-in fade-in duration-200 overflow-y-auto">
      <div
        className="relative w-full max-w-3xl my-auto rounded-2xl bg-[#000000] border border-[#FFD700]/30 shadow-[0_10px_45px_rgba(0,0,0,0.95)] overflow-hidden flex flex-col max-h-[92vh]"
        role="dialog"
        aria-modal="true"
      >
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between px-6 sm:px-8 py-5 border-b border-[#FFD700]/20 bg-[#000000]">
          <div className="flex items-center gap-3">
            <BrandLogo size="md" showText={false} />
            <div>
              <span className="font-hyperbonnard text-base tracking-wider uppercase text-[#FFD700] block">
                THE DEVOTED ONES
              </span>
              <span className="text-xs font-mono uppercase tracking-wider text-[#FFFFFF]/70">
                Community Onboarding
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg text-[#FFFFFF]/70 hover:text-[#FFD700] hover:bg-[#FFD700]/10 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Step Progress Indicator (if not submitted) */}
        {!isSubmitted && (
          <div className="px-6 sm:px-8 pt-5 pb-3 bg-[#000000] border-b border-[#FFD700]/15">
            <div className="flex items-center justify-between text-xs mb-2">
              <span className="font-mono font-medium uppercase tracking-wider text-[#FFFFFF]/90">
                {currentStep === 1 && 'Step 01 — About You'}
                {currentStep === 2 && 'Step 02 — What You Do'}
                {currentStep === 3 && 'Step 03 — Your Walk With God'}
                {currentStep === 4 && 'Step 04 — Confirmation & Review'}
              </span>
              <span className="font-mono font-bold text-[#FFD700]">
                {currentStep} of 4
              </span>
            </div>

            {/* Progress bar */}
            <div className="w-full h-1 bg-[#FFFFFF]/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#FFD700] transition-all duration-300 ease-out"
                style={{ width: `${(currentStep / 4) * 100}%` }}
              />
            </div>
          </div>
        )}

        {/* Modal Body */}
        <div className="p-6 sm:p-8 overflow-y-auto flex-1">
          {/* SUCCESS SCREEN */}
          {isSubmitted ? (
            <div className="py-6 text-center animate-in zoom-in-95 duration-300">
              <div className="w-16 h-16 rounded-full bg-[#FFD700]/15 border border-[#FFD700]/40 flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="h-8 w-8 text-[#FFD700]" />
              </div>

              <h2 className="font-hyperbonnard text-3xl sm:text-4xl lg:text-5xl tracking-wide uppercase text-[#FFD700] mb-3">
                WELCOME TO THE DEVOTED ONES.
              </h2>

              <p className="text-base sm:text-lg text-[#FFFFFF] max-w-lg mx-auto font-normal mb-8">
                You’re officially part of the community. We’re glad to have you.
              </p>

              {/* WhatsApp Community Box */}
              <div className="max-w-lg mx-auto rounded-xl border border-[#FFD700]/40 bg-[#FFD700]/[0.04] p-6 text-left mb-8 shadow-inner">
                <div className="flex items-center gap-2 mb-2 font-mono text-xs font-bold uppercase tracking-wider text-[#FFD700]">
                  <Sparkles className="h-4 w-4" />
                  <span>Next Step: Official Community Group</span>
                </div>

                <h3 className="font-hyperbonnard text-xl sm:text-2xl tracking-wide text-[#FFFFFF] uppercase mb-2">
                  JOIN OUR WHATSAPP COMMUNITY
                </h3>

                <p className="text-xs text-[#FFFFFF]/85 mb-4 leading-relaxed font-sans">
                  Connect directly with fellow young believers, receive daily devotional scriptures, and take part in upcoming study discussions.
                </p>

                <div className="rounded-lg bg-[#000000] border border-[#FFD700]/30 p-3 mb-4">
                  <span className="text-[11px] font-mono text-[#FFD700] block break-all font-medium">
                    chat.whatsapp.com/BeAyO0iD9JE0QWBTc7b2Yq
                  </span>
                  <p className="text-[10px] text-[#FFFFFF]/70 mt-1 font-sans">
                    *Tap the button below to join. A copy of the invite will also be emailed to {formData.email}.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <a
                    href="https://chat.whatsapp.com/BeAyO0iD9JE0QWBTc7b2Yq?s=cl&p=a&mlu=4&ilr=4"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider text-[#000000] bg-[#FFD700] hover:bg-[#FFFFFF] transition-colors cursor-pointer w-full"
                  >
                    <ExternalLink className="h-4 w-4" />
                    <span>JOIN THE DEVOTED ONES COMMUNITY</span>
                  </a>
                </div>
              </div>

              <div className="border-t border-[#FFD700]/20 pt-6 max-w-md mx-auto flex flex-col gap-3">
                <button
                  onClick={onClose}
                  className="w-full py-2.5 rounded-lg text-xs font-semibold text-[#FFFFFF]/80 hover:text-[#FFD700] bg-transparent hover:bg-[#FFD700]/10 border border-[#FFD700]/30 transition-colors cursor-pointer"
                >
                  Return to Homepage
                </button>
              </div>
            </div>
          ) : (
            <>
              {/* STEP 01: ABOUT YOU */}
              {currentStep === 1 && (
                <div className="space-y-5 animate-in fade-in duration-200">
                  <div>
                    <h3 className="font-hyperbonnard text-2xl sm:text-3xl tracking-wide uppercase text-[#FFFFFF] mb-1">
                      Tell us about yourself
                    </h3>
                    <p className="text-xs text-[#FFFFFF]/70 font-sans">
                      Fields marked with <span className="text-[#F00020]">*</span> are required.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Full Name */}
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-semibold text-[#FFFFFF] uppercase tracking-wider mb-1.5 font-sans">
                        Full Name <span className="text-[#F00020]">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Winner Olubode"
                        value={formData.fullName}
                        onChange={(e) => updateField('fullName', e.target.value)}
                        className={`w-full text-sm rounded-lg bg-[#000000] border px-3.5 py-2.5 text-[#FFFFFF] placeholder-[#FFFFFF]/40 focus:outline-none transition-colors ${
                          errors.fullName ? 'border-[#F00020] focus:border-[#F00020]' : 'border-[#FFD700]/30 focus:border-[#FFD700]'
                        }`}
                      />
                      {errors.fullName && (
                        <p className="text-xs text-[#F00020] mt-1 flex items-center gap-1 font-sans">
                          <AlertCircle className="h-3 w-3" /> {errors.fullName}
                        </p>
                      )}
                    </div>

                    {/* Preferred Name */}
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-semibold text-[#FFFFFF] uppercase tracking-wider mb-1.5 font-sans">
                        What do you prefer to be called?
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Winner or your nickname"
                        value={formData.preferredName}
                        onChange={(e) => updateField('preferredName', e.target.value)}
                        className="w-full text-sm rounded-lg bg-[#000000] border border-[#FFD700]/30 px-3.5 py-2.5 text-[#FFFFFF] placeholder-[#FFFFFF]/40 focus:outline-none focus:border-[#FFD700] transition-colors"
                      />
                    </div>

                    {/* Date of Birth: STRICTLY DAY & MONTH ONLY */}
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-semibold text-[#FFFFFF] uppercase tracking-wider mb-1.5 font-sans">
                        Date of Birth (Day & Month only) <span className="text-[#F00020]">*</span>
                      </label>
                      <p className="text-[11px] text-[#FFFFFF]/70 mb-2 font-sans">
                        We only celebrate your birth day and month. Birth year is not requested.
                      </p>
                      <div className="grid grid-cols-2 gap-3">
                        <select
                          value={formData.birthMonth}
                          onChange={(e) => updateField('birthMonth', e.target.value)}
                          className="w-full text-sm rounded-lg bg-[#000000] border border-[#FFD700]/30 px-3.5 py-2.5 text-[#FFFFFF] focus:outline-none focus:border-[#FFD700] transition-colors"
                        >
                          <option value="" className="bg-[#000000] text-[#FFFFFF]">Select Month</option>
                          {MONTHS.map((m) => (
                            <option key={m} value={m} className="bg-[#000000] text-[#FFFFFF]">
                              {m}
                            </option>
                          ))}
                        </select>

                        <select
                          value={formData.birthDay}
                          onChange={(e) => updateField('birthDay', e.target.value)}
                          className="w-full text-sm rounded-lg bg-[#000000] border border-[#FFD700]/30 px-3.5 py-2.5 text-[#FFFFFF] focus:outline-none focus:border-[#FFD700] transition-colors"
                        >
                          <option value="" className="bg-[#000000] text-[#FFFFFF]">Select Day</option>
                          {DAYS.map((d) => (
                            <option key={d} value={d} className="bg-[#000000] text-[#FFFFFF]">
                              {d}
                            </option>
                          ))}
                        </select>
                      </div>
                      {errors.dob && (
                        <p className="text-xs text-[#F00020] mt-1 flex items-center gap-1 font-sans">
                          <AlertCircle className="h-3 w-3" /> {errors.dob}
                        </p>
                      )}
                    </div>

                    {/* Gender */}
                    <div>
                      <label className="block text-xs font-semibold text-[#FFFFFF] uppercase tracking-wider mb-1.5 font-sans">
                        Gender
                      </label>
                      <select
                        value={formData.gender}
                        onChange={(e) => updateField('gender', e.target.value as any)}
                        className="w-full text-sm rounded-lg bg-[#000000] border border-[#FFD700]/30 px-3.5 py-2.5 text-[#FFFFFF] focus:outline-none focus:border-[#FFD700] transition-colors"
                      >
                        <option value="" className="bg-[#000000] text-[#FFFFFF]">Select Gender (Optional)</option>
                        <option value="Male" className="bg-[#000000] text-[#FFFFFF]">Male</option>
                        <option value="Female" className="bg-[#000000] text-[#FFFFFF]">Female</option>
                        <option value="Prefer not to say" className="bg-[#000000] text-[#FFFFFF]">Prefer not to say</option>
                      </select>
                    </div>

                    {/* Town / City */}
                    <div>
                      <label className="block text-xs font-semibold text-[#FFFFFF] uppercase tracking-wider mb-1.5 font-sans">
                        Town / City <span className="text-[#F00020]">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Lagos, Ibadan, Manchester"
                        value={formData.city}
                        onChange={(e) => updateField('city', e.target.value)}
                        className={`w-full text-sm rounded-lg bg-[#000000] border px-3.5 py-2.5 text-[#FFFFFF] placeholder-[#FFFFFF]/40 focus:outline-none transition-colors ${
                          errors.city ? 'border-[#F00020] focus:border-[#F00020]' : 'border-[#FFD700]/30 focus:border-[#FFD700]'
                        }`}
                      />
                      {errors.city && (
                        <p className="text-xs text-[#F00020] mt-1 flex items-center gap-1 font-sans">
                          <AlertCircle className="h-3 w-3" /> {errors.city}
                        </p>
                      )}
                    </div>

                    {/* Current Location */}
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-semibold text-[#FFFFFF] uppercase tracking-wider mb-1.5 font-sans">
                        Current Location <span className="text-[#F00020]">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Nigeria, United Kingdom, Texas USA"
                        value={formData.currentLocation}
                        onChange={(e) => updateField('currentLocation', e.target.value)}
                        className={`w-full text-sm rounded-lg bg-[#000000] border px-3.5 py-2.5 text-[#FFFFFF] placeholder-[#FFFFFF]/40 focus:outline-none transition-colors ${
                          errors.currentLocation ? 'border-[#F00020] focus:border-[#F00020]' : 'border-[#FFD700]/30 focus:border-[#FFD700]'
                        }`}
                      />
                      {errors.currentLocation && (
                        <p className="text-xs text-[#F00020] mt-1 flex items-center gap-1 font-sans">
                          <AlertCircle className="h-3 w-3" /> {errors.currentLocation}
                        </p>
                      )}
                    </div>

                    {/* Phone Number */}
                    <div>
                      <label className="block text-xs font-semibold text-[#FFFFFF] uppercase tracking-wider mb-1.5 font-sans">
                        Phone Number <span className="text-[#F00020]">*</span>
                      </label>
                      <input
                        type="tel"
                        placeholder="+234 801 234 5678"
                        value={formData.phone}
                        onChange={(e) => updateField('phone', e.target.value)}
                        className={`w-full text-sm rounded-lg bg-[#000000] border px-3.5 py-2.5 text-[#FFFFFF] placeholder-[#FFFFFF]/40 focus:outline-none transition-colors ${
                          errors.phone ? 'border-[#F00020] focus:border-[#F00020]' : 'border-[#FFD700]/30 focus:border-[#FFD700]'
                        }`}
                      />
                      {errors.phone && (
                        <p className="text-xs text-[#F00020] mt-1 flex items-center gap-1 font-sans">
                          <AlertCircle className="h-3 w-3" /> {errors.phone}
                        </p>
                      )}
                    </div>

                    {/* Email Address */}
                    <div>
                      <label className="block text-xs font-semibold text-[#FFFFFF] uppercase tracking-wider mb-1.5 font-sans">
                        Email Address <span className="text-[#F00020]">*</span>
                      </label>
                      <input
                        type="email"
                        placeholder="youremail@example.com"
                        value={formData.email}
                        onChange={(e) => updateField('email', e.target.value)}
                        className={`w-full text-sm rounded-lg bg-[#000000] border px-3.5 py-2.5 text-[#FFFFFF] placeholder-[#FFFFFF]/40 focus:outline-none transition-colors ${
                          errors.email ? 'border-[#F00020] focus:border-[#F00020]' : 'border-[#FFD700]/30 focus:border-[#FFD700]'
                        }`}
                      />
                      {errors.email && (
                        <p className="text-xs text-[#F00020] mt-1 flex items-center gap-1 font-sans">
                          <AlertCircle className="h-3 w-3" /> {errors.email}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 02: WHAT YOU DO */}
              {currentStep === 2 && (
                <div className="space-y-6 animate-in fade-in duration-200">
                  <div>
                    <h3 className="font-hyperbonnard text-2xl sm:text-3xl tracking-wide uppercase text-[#FFFFFF] mb-1">
                      What you do
                    </h3>
                    <p className="text-xs text-[#FFFFFF]/70 font-sans">
                      Help us understand your current station and academic/professional background.
                    </p>
                  </div>

                  {/* Occupation selection */}
                  <div>
                    <label className="block text-xs font-semibold text-[#FFFFFF] uppercase tracking-wider mb-2 font-sans">
                      What do you currently do? <span className="text-[#F00020]">*</span>
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {(['Student', 'Employed', 'Entrepreneur', 'Other'] as OccupationType[]).map((occ) => {
                        const isSelected = formData.occupation === occ;
                        return (
                          <button
                            key={occ}
                            type="button"
                            onClick={() => updateField('occupation', occ)}
                            className={`p-3.5 rounded-xl border text-center transition-all cursor-pointer ${
                              isSelected
                                ? 'bg-[#FFD700]/15 border-[#FFD700] text-[#FFFFFF] font-bold shadow-[0_0_15px_rgba(255,215,0,0.15)]'
                                : 'bg-[#000000] border-[#FFD700]/25 text-[#FFFFFF]/80 hover:border-[#FFD700]/60 hover:bg-[#FFD700]/[0.03]'
                            }`}
                          >
                            <span className="text-sm block">{occ}</span>
                          </button>
                        );
                      })}
                    </div>
                    {errors.occupation && (
                      <p className="text-xs text-[#F00020] mt-1.5 flex items-center gap-1 font-sans">
                        <AlertCircle className="h-3 w-3" /> {errors.occupation}
                      </p>
                    )}
                  </div>

                  {formData.occupation === 'Other' && (
                    <div>
                      <label className="block text-xs font-semibold text-[#FFFFFF] uppercase tracking-wider mb-1.5 font-sans">
                        Please specify <span className="text-[#F00020]">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Gap year, Freelancing, Seeking opportunities"
                        value={formData.occupationOtherDetail || ''}
                        onChange={(e) => updateField('occupationOtherDetail', e.target.value)}
                        className="w-full text-sm rounded-lg bg-[#000000] border border-[#FFD700]/30 px-3.5 py-2.5 text-[#FFFFFF] placeholder-[#FFFFFF]/40 focus:outline-none focus:border-[#FFD700] transition-colors"
                      />
                      {errors.occupationOtherDetail && (
                        <p className="text-xs text-[#F00020] mt-1 flex items-center gap-1 font-sans">
                          <AlertCircle className="h-3 w-3" /> {errors.occupationOtherDetail}
                        </p>
                      )}
                    </div>
                  )}

                  {/* Course of study / profession */}
                  <div>
                    <label className="block text-xs font-semibold text-[#FFFFFF] uppercase tracking-wider mb-1.5 font-sans">
                      What is your course of study or profession? <span className="text-[#F00020]">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder={
                        formData.occupation === 'Student'
                          ? 'e.g. Computer Science, Medicine, Law, Economics'
                          : 'e.g. Software Engineer, Accountant, Educator, Designer'
                      }
                      value={formData.professionOrCourse}
                      onChange={(e) => updateField('professionOrCourse', e.target.value)}
                      className={`w-full text-sm rounded-lg bg-[#000000] border px-3.5 py-2.5 text-[#FFFFFF] placeholder-[#FFFFFF]/40 focus:outline-none transition-colors ${
                        errors.professionOrCourse ? 'border-[#F00020] focus:border-[#F00020]' : 'border-[#FFD700]/30 focus:border-[#FFD700]'
                      }`}
                    />
                    {errors.professionOrCourse && (
                      <p className="text-xs text-[#F00020] mt-1 flex items-center gap-1 font-sans">
                        <AlertCircle className="h-3 w-3" /> {errors.professionOrCourse}
                      </p>
                    )}
                  </div>

                  {/* School of Study — ONLY show/require if Student */}
                  {formData.occupation === 'Student' && (
                    <div className="rounded-xl border border-[#FFD700]/30 bg-[#FFD700]/[0.03] p-4">
                      <label className="block text-xs font-semibold text-[#FFFFFF] uppercase tracking-wider mb-1.5 font-sans">
                        School of study <span className="text-[#F00020]">*</span>
                      </label>
                      <p className="text-[11px] text-[#FFFFFF]/70 mb-2 font-sans">
                        Shown because you selected student status.
                      </p>
                      <input
                        type="text"
                        placeholder="e.g. University of Lagos, University of Manchester, University of Texas"
                        value={formData.schoolOfStudy}
                        onChange={(e) => updateField('schoolOfStudy', e.target.value)}
                        className={`w-full text-sm rounded-lg bg-[#000000] border px-3.5 py-2.5 text-[#FFFFFF] placeholder-[#FFFFFF]/40 focus:outline-none transition-colors ${
                          errors.schoolOfStudy ? 'border-[#F00020] focus:border-[#F00020]' : 'border-[#FFD700]/30 focus:border-[#FFD700]'
                        }`}
                      />
                      {errors.schoolOfStudy && (
                        <p className="text-xs text-[#F00020] mt-1 flex items-center gap-1 font-sans">
                          <AlertCircle className="h-3 w-3" /> {errors.schoolOfStudy}
                        </p>
                      )}
                    </div>
                  )}

                  {/* Skills */}
                  <div>
                    <label className="block text-xs font-semibold text-[#FFFFFF] uppercase tracking-wider mb-1.5 font-sans">
                      What skills do you have?
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Writing, Graphic Design, Leadership, Video Editing, Music, Coding"
                      value={formData.skills}
                      onChange={(e) => updateField('skills', e.target.value)}
                      className="w-full text-sm rounded-lg bg-[#000000] border border-[#FFD700]/30 px-3.5 py-2.5 text-[#FFFFFF] placeholder-[#FFFFFF]/40 focus:outline-none focus:border-[#FFD700] transition-colors"
                    />
                    <p className="text-[11px] text-[#FFFFFF]/70 mt-1 font-sans">
                      Helps us identify gifts and talents as our community grows.
                    </p>
                  </div>
                </div>
              )}

              {/* STEP 03: YOUR WALK WITH GOD */}
              {currentStep === 3 && (
                <div className="space-y-6 animate-in fade-in duration-200">
                  <div>
                    <h3 className="font-hyperbonnard text-2xl sm:text-3xl tracking-wide uppercase text-[#FFFFFF] mb-1">
                      Your Walk with God
                    </h3>
                    <p className="text-xs text-[#FFFFFF]/70 font-sans">
                      We want to support and disciple you where you are right now.
                    </p>
                  </div>

                  {/* Areas of Christian faith */}
                  <div>
                    <label className="block text-xs font-semibold text-[#FFFFFF] uppercase tracking-wider mb-1.5 font-sans">
                      What areas of the Christian faith would you like to understand better? <span className="text-[#F00020]">*</span>
                    </label>
                    <textarea
                      rows={3}
                      placeholder="e.g. Hearing God's voice, reading Scripture with depth, prayer & fasting, discovering purpose, purity in relationships..."
                      value={formData.faithQuestions}
                      onChange={(e) => updateField('faithQuestions', e.target.value)}
                      className={`w-full text-sm rounded-lg bg-[#000000] border px-3.5 py-2.5 text-[#FFFFFF] placeholder-[#FFFFFF]/40 focus:outline-none transition-colors resize-none ${
                        errors.faithQuestions ? 'border-[#F00020] focus:border-[#F00020]' : 'border-[#FFD700]/30 focus:border-[#FFD700]'
                      }`}
                    />
                    {errors.faithQuestions && (
                      <p className="text-xs text-[#F00020] mt-1 flex items-center gap-1 font-sans">
                        <AlertCircle className="h-3 w-3" /> {errors.faithQuestions}
                      </p>
                    )}
                  </div>

                  {/* When did you begin */}
                  <div>
                    <label className="block text-xs font-semibold text-[#FFFFFF] uppercase tracking-wider mb-1.5 font-sans">
                      When did you begin your walk with God? <span className="text-[#F00020]">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Recently (few months ago), In high school, Since childhood, or Still seeking"
                      value={formData.walkStartedWhen}
                      onChange={(e) => updateField('walkStartedWhen', e.target.value)}
                      className={`w-full text-sm rounded-lg bg-[#000000] border px-3.5 py-2.5 text-[#FFFFFF] placeholder-[#FFFFFF]/40 focus:outline-none transition-colors ${
                        errors.walkStartedWhen ? 'border-[#F00020] focus:border-[#F00020]' : 'border-[#FFD700]/30 focus:border-[#FFD700]'
                      }`}
                    />
                    {errors.walkStartedWhen && (
                      <p className="text-xs text-[#F00020] mt-1 flex items-center gap-1 font-sans">
                        <AlertCircle className="h-3 w-3" /> {errors.walkStartedWhen}
                      </p>
                    )}
                  </div>

                  {/* Spiritual goals */}
                  <div>
                    <label className="block text-xs font-semibold text-[#FFFFFF] uppercase tracking-wider mb-1.5 font-sans">
                      What are your spiritual goals? <span className="text-[#F00020]">*</span>
                    </label>
                    <textarea
                      rows={3}
                      placeholder="e.g. Consistency in personal daily quiet time, memorizing scripture, overcoming inconsistency, living boldly on campus..."
                      value={formData.spiritualGoals}
                      onChange={(e) => updateField('spiritualGoals', e.target.value)}
                      className={`w-full text-sm rounded-lg bg-[#000000] border px-3.5 py-2.5 text-[#FFFFFF] placeholder-[#FFFFFF]/40 focus:outline-none transition-colors resize-none ${
                        errors.spiritualGoals ? 'border-[#F00020] focus:border-[#F00020]' : 'border-[#FFD700]/30 focus:border-[#FFD700]'
                      }`}
                    />
                    {errors.spiritualGoals && (
                      <p className="text-xs text-[#F00020] mt-1 flex items-center gap-1 font-sans">
                        <AlertCircle className="h-3 w-3" /> {errors.spiritualGoals}
                      </p>
                    )}
                  </div>
                </div>
              )}

              {/* STEP 04: COMPLETE / CONFIRMATION & REVIEW */}
              {currentStep === 4 && (
                <div className="space-y-6 animate-in fade-in duration-200">
                  <div>
                    <h3 className="font-hyperbonnard text-2xl sm:text-3xl tracking-wide uppercase text-[#FFFFFF] mb-1">
                      Ready to join
                    </h3>
                    <p className="text-xs text-[#FFFFFF]/70 font-sans">
                      Please review your details before confirming your membership in THE DEVOTED ONES.
                    </p>
                  </div>

                  <div className="rounded-xl border border-[#FFD700]/25 bg-[#000000] p-5 space-y-4 text-xs sm:text-sm font-sans">
                    <div className="flex justify-between border-b border-[#FFD700]/15 pb-2">
                      <span className="text-[#FFFFFF]/70">Full Name</span>
                      <span className="text-[#FFFFFF] font-medium">{formData.fullName} {formData.preferredName ? `(${formData.preferredName})` : ''}</span>
                    </div>

                    <div className="flex justify-between border-b border-[#FFD700]/15 pb-2">
                      <span className="text-[#FFFFFF]/70">Date of Birth</span>
                      <span className="text-[#FFFFFF] font-medium">{formData.birthMonth} {formData.birthDay}</span>
                    </div>

                    <div className="flex justify-between border-b border-[#FFD700]/15 pb-2">
                      <span className="text-[#FFFFFF]/70">Location</span>
                      <span className="text-[#FFFFFF] font-medium">{formData.city}, {formData.currentLocation}</span>
                    </div>

                    <div className="flex justify-between border-b border-[#FFD700]/15 pb-2">
                      <span className="text-[#FFFFFF]/70">Contact</span>
                      <span className="text-[#FFFFFF] font-medium">{formData.email} · {formData.phone}</span>
                    </div>

                    <div className="flex justify-between border-b border-[#FFD700]/15 pb-2">
                      <span className="text-[#FFFFFF]/70">Activity</span>
                      <span className="text-[#FFFFFF] font-medium">
                        {formData.occupation}
                        {formData.schoolOfStudy ? ` (${formData.schoolOfStudy})` : ''}
                        {' · '}
                        {formData.professionOrCourse}
                      </span>
                    </div>

                    <div className="border-b border-[#FFD700]/15 pb-2">
                      <span className="text-[#FFFFFF]/70 block mb-1">Spiritual Goals</span>
                      <span className="text-[#FFFFFF]/90 italic font-normal line-clamp-2">
                        “{formData.spiritualGoals}”
                      </span>
                    </div>
                  </div>

                  <div className="rounded-xl bg-[#FFD700]/10 border border-[#FFD700]/30 p-4 text-xs text-[#FFFFFF] font-sans">
                    By clicking below, you commit to growing in relationship with God, living by His Word, and walking in intentional devotion alongside other young believers.
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Modal Navigation Buttons (if not submitted) */}
        {!isSubmitted && (
          <div className="px-6 sm:px-8 py-4 bg-[#000000] border-t border-[#FFD700]/20 flex items-center justify-between gap-4">
            {currentStep > 1 ? (
              <button
                type="button"
                onClick={handleBack}
                disabled={isSubmitting}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg text-xs font-semibold text-[#FFFFFF]/80 hover:text-[#FFFFFF] bg-[#FFFFFF]/5 hover:bg-[#FFFFFF]/10 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Back</span>
              </button>
            ) : (
              <div />
            )}

            {currentStep < 4 ? (
              <button
                type="button"
                onClick={handleNext}
                className="inline-flex items-center gap-1.5 px-6 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider text-[#000000] bg-[#FFD700] hover:bg-[#FFFFFF] transition-all shadow-sm active:scale-[0.98] cursor-pointer"
              >
                <span>Continue</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            ) : (
              <div className="flex flex-col items-end gap-2">
                {submitError && (
                  <p className="text-xs text-[#F00020] flex items-center gap-1 font-sans max-w-xs text-right">
                    <AlertCircle className="h-3 w-3 shrink-0" /> {submitError}
                  </p>
                )}
                <button
                  type="button"
                  onClick={handleFinalSubmit}
                  disabled={isSubmitting}
                  className="inline-flex items-center gap-2 px-7 py-3 rounded-lg text-xs font-bold uppercase tracking-wider text-[#000000] bg-[#FFD700] hover:bg-[#FFFFFF] transition-all shadow-[0_4px_20px_rgba(255,215,0,0.25)] active:scale-[0.98] cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span>JOINING…</span>
                    </>
                  ) : (
                    <>
                      <span>JOIN THE DEVOTED ONES</span>
                      <Sparkles className="h-4 w-4" />
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
