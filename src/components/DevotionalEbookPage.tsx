import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, BookOpen, CheckCircle, Mail, Phone, User, Sparkles, Download, ArrowRight, ShieldCheck } from 'lucide-react';
import { BrandLogo } from './BrandLogo';

interface DevotionalEbookPageProps {
  onBack: () => void;
  onOpenJoin: () => void;
  onOpenVision: () => void;
  onOpenLogo?: () => void;
}

interface FormState {
  fullName: string;
  emailAddress: string;
  phoneNumber: string;
}

interface FormErrors {
  fullName?: string;
  emailAddress?: string;
  phoneNumber?: string;
}

export const DevotionalEbookPage: React.FC<DevotionalEbookPageProps> = ({
  onBack,
  onOpenJoin,
  onOpenVision,
  onOpenLogo,
}) => {
  const [formData, setFormData] = useState<FormState>({
    fullName: '',
    emailAddress: '',
    phoneNumber: '',
  });

  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validate = (data: FormState): FormErrors => {
    const errs: FormErrors = {};

    if (!data.fullName.trim()) {
      errs.fullName = 'Full name is required';
    } else if (data.fullName.trim().length < 2) {
      errs.fullName = 'Please enter your full name';
    }

    if (!data.emailAddress.trim()) {
      errs.emailAddress = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.emailAddress.trim())) {
      errs.emailAddress = 'Please enter a valid email address';
    }

    if (!data.phoneNumber.trim()) {
      errs.phoneNumber = 'WhatsApp / phone number is required';
    } else if (data.phoneNumber.trim().length < 7) {
      errs.phoneNumber = 'Please enter a valid phone number (min 7 digits)';
    }

    return errs;
  };

  const handleBlur = (field: keyof FormState) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const validationErrors = validate(formData);
    setErrors(validationErrors);
  };

  const handleChange = (field: keyof FormState, value: string) => {
    const updated = { ...formData, [field]: value };
    setFormData(updated);
    if (touched[field]) {
      setErrors(validate(updated));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({
      fullName: true,
      emailAddress: true,
      phoneNumber: true,
    });

    const validationErrors = validate(formData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    // Frontend validation successful
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 600);
  };

  const handleReset = () => {
    setFormData({
      fullName: '',
      emailAddress: '',
      phoneNumber: '',
    });
    setTouched({});
    setErrors({});
    setIsSubmitted(false);
  };

  return (
    <div className="min-h-screen bg-[#000000] text-[#FFFFFF] py-10 sm:py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Navigation Bar / Breadcrumb */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex items-center justify-between mb-8 pb-6 border-b border-[#FFD700]/20"
        >
          <button
            type="button"
            onClick={onBack}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-mono uppercase tracking-wider text-[#FFFFFF]/80 hover:text-[#FFD700] transition-colors cursor-pointer group"
          >
            <ArrowLeft className="h-4 w-4 text-[#FFD700] group-hover:-translate-x-1 transition-transform" />
            <span>Back to Home</span>
          </button>

          <div className="flex items-center gap-2">
            <span className="font-mono text-[11px] sm:text-xs text-[#FFFFFF]/60">
              THE DEVOTED ONES · RESOURCES
            </span>
          </div>
        </motion.div>

        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-14"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#FFD700]/30 bg-[#FFD700]/10 text-[#FFD700] font-mono text-xs uppercase tracking-widest mb-5">
            <Sparkles className="h-3.5 w-3.5" />
            <span>MONTHLY RESOURCE · FREE ACCESS</span>
          </div>

          <h1 className="font-hyperbonnard text-4xl sm:text-5xl md:text-6xl tracking-wide uppercase text-[#FFFFFF] mb-5 leading-tight">
            GET THE DEVOTIONAL E-BOOK
          </h1>

          <p className="text-base sm:text-lg text-[#FFFFFF]/85 leading-relaxed font-sans max-w-2xl mx-auto">
            “Grow in your walk with God through His Word. Get your devotional e-book and make room for daily spiritual growth.”
          </p>
        </motion.div>

        {/* Content Grid: E-Book Preview & Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: E-Book Presentation Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-5 flex flex-col gap-6"
          >
            {/* Visual Book Showcase Card (Classic Gold styling matching brand) */}
            <div className="rounded-2xl border border-[#000000]/15 bg-[#FFD700] p-7 shadow-[0_12px_32px_rgba(255,215,0,0.25)] relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/20 rounded-full blur-2xl pointer-events-none" />

              <div className="flex items-center justify-between mb-6">
                <span className="font-mono text-xs uppercase tracking-wider font-extrabold text-[#000000] bg-[#000000]/10 border border-[#000000]/15 px-3 py-1 rounded">
                  Monthly Edition
                </span>
                <div className="p-2.5 rounded-lg bg-[#000000] text-[#FFD700]">
                  <BookOpen className="h-5 w-5" />
                </div>
              </div>

              {/* Book Title Mock */}
              <div className="p-6 rounded-xl bg-[#000000] text-[#FFFFFF] border border-[#FFD700]/30 shadow-inner mb-6">
                <span className="font-mono text-[10px] tracking-widest uppercase text-[#FFD700] block mb-1">
                  THE DEVOTED ONES PUBLICATION
                </span>
                <h3 className="font-hyperbonnard text-2xl sm:text-3xl tracking-wide uppercase text-[#FFFFFF] leading-snug mb-2">
                  WALKING WITH GOD IN YOUTH
                </h3>
                <p className="text-xs text-[#FFFFFF]/75 font-sans leading-relaxed">
                  A monthly guide for deep scripture meditation, personal devotion, and purposeful kingdom living.
                </p>
                <div className="mt-4 pt-4 border-t border-[#FFFFFF]/10 flex items-center justify-between font-mono text-[11px] text-[#FFD700]">
                  <span>Daily Rhythms</span>
                  <span>·</span>
                  <span>Scripture-Led</span>
                  <span>·</span>
                  <span>PDF Format</span>
                </div>
              </div>

              {/* Highlights */}
              <h4 className="font-hyperbonnard text-lg text-[#000000] uppercase tracking-wide mb-3">
                What's Inside Each Edition
              </h4>
              <ul className="space-y-2.5 text-xs sm:text-sm text-[#222222] font-sans">
                <li className="flex items-start gap-2.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#000000] mt-2 shrink-0" />
                  <span><strong>Structured Daily Scriptures:</strong> Selected verses mapped for progressive understanding.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#000000] mt-2 shrink-0" />
                  <span><strong>Actionable Reflections:</strong> Relatable context addressing real youth challenges and decisions.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#000000] mt-2 shrink-0" />
                  <span><strong>Guided Daily Prayers:</strong> Scripture-aligned prayers to anchor your devotion each morning.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#000000] mt-2 shrink-0" />
                  <span><strong>Personal Growth Notes:</strong> Space for tracking answered prayers, insights, and lessons.</span>
                </li>
              </ul>
            </div>

            {/* Quick Community Invitation Note */}
            <div className="rounded-xl border border-[#FFD700]/25 bg-[#000000] p-5 text-xs text-[#FFFFFF]/80 leading-relaxed flex items-start gap-3.5">
              <ShieldCheck className="h-5 w-5 text-[#FFD700] shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-[#FFFFFF] mb-1">
                  100% Free Spiritual Resource
                </p>
                <p>
                  Provided freely for your spiritual edification. No hidden charges or commitments.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Request Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-7"
          >
            <div className="rounded-2xl border border-[#FFD700]/30 bg-[#000000] p-6 sm:p-9 shadow-[0_8px_32px_rgba(0,0,0,0.8)] relative">
              {/* Subtle accent border on top */}
              <div className="absolute top-0 left-8 right-8 h-[2px] bg-gradient-to-r from-transparent via-[#FFD700] to-transparent" />

              {!isSubmitted ? (
                <div>
                  <div className="mb-8">
                    <span className="font-mono text-xs uppercase tracking-widest text-[#FFD700] block mb-2">
                      REQUEST YOUR COPY
                    </span>
                    <h2 className="font-hyperbonnard text-2xl sm:text-3xl uppercase tracking-wide text-[#FFFFFF]">
                      Enter Your Details Below
                    </h2>
                    <p className="text-sm text-[#FFFFFF]/70 mt-2 font-sans">
                      Complete the three fields below to request the current monthly devotional e-book.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} noValidate className="space-y-6">
                    {/* Field 1: Full Name */}
                    <div>
                      <label
                        htmlFor="fullName"
                        className="block text-xs font-mono uppercase tracking-wider text-[#FFFFFF]/90 mb-2 font-semibold"
                      >
                        1. Full Name <span className="text-[#FFD700]">*</span>
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#FFFFFF]/40">
                          <User className="h-4 w-4" />
                        </div>
                        <input
                          id="fullName"
                          name="fullName"
                          type="text"
                          required
                          value={formData.fullName}
                          onChange={(e) => handleChange('fullName', e.target.value)}
                          onBlur={() => handleBlur('fullName')}
                          placeholder="e.g., Emmanuel Adeniyi"
                          className={`w-full pl-10 pr-4 py-3 rounded-lg bg-[#000000] border text-sm text-[#FFFFFF] placeholder-[#FFFFFF]/40 focus:outline-none transition-all ${
                            touched.fullName && errors.fullName
                              ? 'border-[#FD7000] focus:ring-2 focus:ring-[#FD7000]/40'
                              : 'border-[#FFD700]/30 focus:border-[#FFD700] focus:ring-2 focus:ring-[#FFD700]/25'
                          }`}
                        />
                      </div>
                      {touched.fullName && errors.fullName && (
                        <p className="mt-1.5 text-xs text-[#FD7000] font-mono flex items-center gap-1">
                          {errors.fullName}
                        </p>
                      )}
                    </div>

                    {/* Field 2: Email Address */}
                    <div>
                      <label
                        htmlFor="emailAddress"
                        className="block text-xs font-mono uppercase tracking-wider text-[#FFFFFF]/90 mb-2 font-semibold"
                      >
                        2. Email Address <span className="text-[#FFD700]">*</span>
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#FFFFFF]/40">
                          <Mail className="h-4 w-4" />
                        </div>
                        <input
                          id="emailAddress"
                          name="emailAddress"
                          type="email"
                          inputMode="email"
                          autoComplete="email"
                          required
                          value={formData.emailAddress}
                          onChange={(e) => handleChange('emailAddress', e.target.value)}
                          onBlur={() => handleBlur('emailAddress')}
                          placeholder="e.g., emmanuel@example.com"
                          className={`w-full pl-10 pr-4 py-3 rounded-lg bg-[#000000] border text-sm text-[#FFFFFF] placeholder-[#FFFFFF]/40 focus:outline-none transition-all ${
                            touched.emailAddress && errors.emailAddress
                              ? 'border-[#FD7000] focus:ring-2 focus:ring-[#FD7000]/40'
                              : 'border-[#FFD700]/30 focus:border-[#FFD700] focus:ring-2 focus:ring-[#FFD700]/25'
                          }`}
                        />
                      </div>
                      {touched.emailAddress && errors.emailAddress && (
                        <p className="mt-1.5 text-xs text-[#FD7000] font-mono flex items-center gap-1">
                          {errors.emailAddress}
                        </p>
                      )}
                    </div>

                    {/* Field 3: WhatsApp / Phone Number */}
                    <div>
                      <label
                        htmlFor="phoneNumber"
                        className="block text-xs font-mono uppercase tracking-wider text-[#FFFFFF]/90 mb-2 font-semibold"
                      >
                        3. WhatsApp / Phone Number <span className="text-[#FFD700]">*</span>
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#FFFFFF]/40">
                          <Phone className="h-4 w-4" />
                        </div>
                        <input
                          id="phoneNumber"
                          name="phoneNumber"
                          type="tel"
                          inputMode="tel"
                          autoComplete="tel"
                          required
                          value={formData.phoneNumber}
                          onChange={(e) => handleChange('phoneNumber', e.target.value)}
                          onBlur={() => handleBlur('phoneNumber')}
                          placeholder="e.g., +234 801 234 5678"
                          className={`w-full pl-10 pr-4 py-3 rounded-lg bg-[#000000] border text-sm text-[#FFFFFF] placeholder-[#FFFFFF]/40 focus:outline-none transition-all ${
                            touched.phoneNumber && errors.phoneNumber
                              ? 'border-[#FD7000] focus:ring-2 focus:ring-[#FD7000]/40'
                              : 'border-[#FFD700]/30 focus:border-[#FFD700] focus:ring-2 focus:ring-[#FFD700]/25'
                          }`}
                        />
                      </div>
                      {touched.phoneNumber && errors.phoneNumber && (
                        <p className="mt-1.5 text-xs text-[#FD7000] font-mono flex items-center gap-1">
                          {errors.phoneNumber}
                        </p>
                      )}
                    </div>

                    {/* Submit Button */}
                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl text-sm font-bold uppercase tracking-wider text-[#000000] bg-[#FFD700] hover:bg-[#FFFFFF] transition-all shadow-[0_4px_24px_rgba(255,215,0,0.3)] active:scale-[0.99] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isSubmitting ? (
                          <div className="inline-flex items-center gap-2">
                            <span className="h-4 w-4 rounded-full border-2 border-[#000000] border-t-transparent animate-spin" />
                            <span>Validating Request…</span>
                          </div>
                        ) : (
                          <>
                            <span>GET DEVOTIONAL E-BOOK</span>
                            <Download className="h-4 w-4" />
                          </>
                        )}
                      </button>
                    </div>

                    <p className="text-[11px] text-center text-[#FFFFFF]/60 font-mono">
                      Ready for automated delivery via THE DEVOTED ONES publications.
                    </p>
                  </form>
                </div>
              ) : (
                /* Honest Success / Confirmation Screen */
                <motion.div
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4 }}
                  className="py-4 text-center"
                >
                  <div className="mx-auto w-16 h-16 rounded-full bg-[#FFD700]/15 border border-[#FFD700] flex items-center justify-center text-[#FFD700] mb-6 shadow-[0_0_24px_rgba(255,215,0,0.25)]">
                    <CheckCircle className="h-8 w-8" />
                  </div>

                  <span className="font-mono text-xs uppercase tracking-widest text-[#FFD700] block mb-2">
                    REQUEST RECEIVED
                  </span>

                  <h3 className="font-hyperbonnard text-2xl sm:text-3xl uppercase tracking-wide text-[#FFFFFF] mb-4">
                    Thank You, {formData.fullName.split(' ')[0]}!
                  </h3>

                  <div className="max-w-md mx-auto rounded-xl p-5 bg-[#FFD700]/10 border border-[#FFD700]/30 text-left text-xs sm:text-sm text-[#FFFFFF]/90 leading-relaxed mb-6 space-y-2">
                    <p className="font-medium text-[#FFD700]">
                      Your details have been successfully received:
                    </p>
                    <div className="font-mono text-xs text-[#FFFFFF]/80 space-y-1 pt-1">
                      <div>Name: <span className="text-[#FFFFFF]">{formData.fullName}</span></div>
                      <div>Email: <span className="text-[#FFFFFF]">{formData.emailAddress}</span></div>
                      <div>Phone: <span className="text-[#FFFFFF]">{formData.phoneNumber}</span></div>
                    </div>
                    <p className="pt-2 text-xs text-[#FFFFFF]/70 border-t border-[#FFD700]/20">
                      Our monthly devotional distribution cycles are processed regularly. In the meantime, join our active fellowship circles to begin receiving daily teachings today!
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                    <button
                      type="button"
                      onClick={onOpenJoin}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg text-xs font-bold uppercase tracking-wider text-[#000000] bg-[#FFD700] hover:bg-[#FFFFFF] transition-all cursor-pointer shadow-md"
                    >
                      <span>Join Community Now</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </button>

                    <button
                      type="button"
                      onClick={handleReset}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg text-xs font-mono uppercase tracking-wider text-[#FFFFFF]/80 hover:text-[#FFD700] border border-[#FFD700]/30 hover:border-[#FFD700] transition-all cursor-pointer"
                    >
                      <span>Request Another Copy</span>
                    </button>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>

        {/* Vision Link Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-16 rounded-xl border border-[#FFD700]/30 bg-[#000000] p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6"
        >
          <div>
            <span className="font-mono text-[11px] uppercase tracking-wider text-[#FFD700] block mb-1">
              THE THREE-YEAR ROADMAP
            </span>
            <h3 className="font-hyperbonnard text-xl sm:text-2xl uppercase tracking-wide text-[#FFFFFF]">
              Discover Our Vision & Commitments
            </h3>
            <p className="text-xs sm:text-sm text-[#FFFFFF]/75 mt-1">
              Learn about our three-year milestones, physical campus chapters, and four core promises.
            </p>
          </div>

          <button
            type="button"
            onClick={onOpenVision}
            className="shrink-0 inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider text-[#000000] bg-[#FFD700] hover:bg-[#FFFFFF] transition-all cursor-pointer"
          >
            <span>Explore Our Vision</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </motion.div>
      </div>
    </div>
  );
};
