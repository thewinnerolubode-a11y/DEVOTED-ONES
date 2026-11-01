import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, BookOpen, CheckCircle2, AlertCircle, ArrowRight, ExternalLink, Download, Check } from 'lucide-react';

interface DevotionalEbookModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenCommunityJoin?: () => void;
}

interface EbookFormData {
  name: string;
  email: string;
  phone: string;
  expectations: string;
}

interface EbookFormErrors {
  name?: string;
  email?: string;
  phone?: string;
  expectations?: string;
}

const WHATSAPP_COMMUNITY_URL = 'https://chat.whatsapp.com/BeAyO0iD9JE0QWBTc7b2Yq?s=cl&p=a&mlu=4&ilr=4';
const GOOGLE_APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbymhg5xHdsOs_15e2ZxnQCN0VZ3ZxOVhF8zJPzXlfLh3oR6w27NQXznydk0PFNRkz6_2Q/exec';

export const DevotionalEbookModal: React.FC<DevotionalEbookModalProps> = ({
  isOpen,
  onClose,
  onOpenCommunityJoin,
}) => {
  const [formData, setFormData] = useState<EbookFormData>({
    name: '',
    email: '',
    phone: '',
    expectations: '',
  });

  const [errors, setErrors] = useState<EbookFormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [downloadInfo, setDownloadInfo] = useState<{
    downloadUrl: string;
    fileName: string;
    devotionalTitle?: string;
    requestId?: string;
    emailSent?: boolean;
    previewUrl?: string;
  } | null>(null);
  const [currentDevotional, setCurrentDevotional] = useState<{
    id: string;
    title: string;
    description: string;
    month?: string;
  } | null>(null);

  const nameInputRef = useRef<HTMLInputElement>(null);
  const emailInputRef = useRef<HTMLInputElement>(null);
  const phoneInputRef = useRef<HTMLInputElement>(null);
  const expectationsInputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      // Focus first input when opened
      setTimeout(() => nameInputRef.current?.focus(), 150);
      // Fetch live published devotional
      fetch('/api/devotional/current')
        .then((r) => r.json())
        .then((data) => {
          if (data && data.title) {
            setCurrentDevotional(data);
          }
        })
        .catch(() => {});
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const validate = (data: EbookFormData): EbookFormErrors => {
    const errs: EbookFormErrors = {};

    if (!data.name.trim()) {
      errs.name = 'Full name is required.';
    } else if (data.name.trim().length < 2) {
      errs.name = 'Please enter your full name.';
    }

    if (!data.email.trim()) {
      errs.email = 'Email address is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim())) {
      errs.email = 'Please enter a valid email address.';
    }

    if (!data.phone.trim()) {
      errs.phone = 'Phone number is required.';
    } else if (data.phone.trim().replace(/\D/g, '').length < 7) {
      errs.phone = 'Please enter a valid phone number (min 7 digits).';
    }

    if (!data.expectations.trim()) {
      errs.expectations = 'Please share what you expect from this devotional.';
    } else if (data.expectations.trim().length < 5) {
      errs.expectations = 'Please provide a brief sentence on what you hope to receive.';
    }

    return errs;
  };

  const handleFieldChange = (field: keyof EbookFormData, value: string) => {
    const updated = { ...formData, [field]: value };
    setFormData(updated);
    if (touched[field]) {
      setErrors(validate(updated));
    }
  };

  const handleBlur = (field: keyof EbookFormData) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    setErrors(validate(formData));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setTouched({
      name: true,
      email: true,
      phone: true,
      expectations: true,
    });

    const validationErrors = validate(formData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      // Auto-focus first invalid field
      if (validationErrors.name) {
        nameInputRef.current?.focus();
      } else if (validationErrors.email) {
        emailInputRef.current?.focus();
      } else if (validationErrors.phone) {
        phoneInputRef.current?.focus();
      } else if (validationErrors.expectations) {
        expectationsInputRef.current?.focus();
      }
      return;
    }

    setIsSubmitting(true);
    setServerError(null);

    // Parallel direct ping to Google Apps Script backend
    try {
      fetch(GOOGLE_APPS_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          whatsapp: formData.phone.trim(),
          fullName: formData.name.trim(),
          emailAddress: formData.email.trim(),
          phoneNumber: formData.phone.trim(),
          whatsappNumber: formData.phone.trim(),
        }),
      }).catch(() => {});
    } catch {}

    try {
      const response = await fetch('/api/devotional/request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Failed to submit devotional request. Please try again.');
      }

      setDownloadInfo({
        downloadUrl: data.downloadUrl,
        fileName: data.fileName || 'The-Devoted-Ones-Devotional.pdf',
        devotionalTitle: data.devotional?.title || 'Devotional E-book',
        requestId: data.requestId,
        emailSent: data.emailSent,
        previewUrl: data.previewUrl,
      });

      // Automatically initiate the PDF download for the visitor
      if (data.downloadUrl) {
        try {
          const downloadAnchor = document.createElement('a');
          downloadAnchor.href = data.downloadUrl;
          downloadAnchor.setAttribute('download', data.fileName || 'The-Devoted-Ones-Devotional.pdf');
          downloadAnchor.target = '_blank';
          downloadAnchor.rel = 'noopener noreferrer';
          document.body.appendChild(downloadAnchor);
          downloadAnchor.click();
          document.body.removeChild(downloadAnchor);

          // Track download click
          fetch('/api/devotional/download-click', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ requestId: data.requestId, devotionalId: data.devotional?.id }),
          }).catch(() => {});
        } catch (downloadErr) {
          console.warn('Auto-download trigger notice:', downloadErr);
        }
      }

      setIsSuccess(true);
    } catch (err: any) {
      setServerError(err.message || 'Failed to connect to the server. Please check your connection.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      expectations: '',
    });
    setTouched({});
    setErrors({});
    setServerError(null);
    setDownloadInfo(null);
    setIsSuccess(false);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/85 backdrop-blur-md">
        {/* Backdrop click */}
        <div className="fixed inset-0" onClick={onClose} aria-hidden="true" />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="relative w-full max-w-lg rounded-2xl border border-[#FFD700]/30 bg-[#0c0c0c] p-6 sm:p-8 shadow-[0_16px_50px_rgba(0,0,0,0.9)] z-10 my-auto text-left"
        >
          {/* Header Close Button */}
          <button
            type="button"
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="h-5 w-5" />
          </button>

          {!isSuccess ? (
            <div>
              <div className="flex items-center gap-2.5 text-[#FFD700] text-xs font-semibold uppercase tracking-wider mb-2">
                <BookOpen className="h-4 w-4" />
                <span>{currentDevotional?.month ? `${currentDevotional.month} Edition` : 'Devotional Resource'}</span>
              </div>

              <h2 className="font-hyperbonnard text-2xl sm:text-3xl uppercase tracking-wide text-white mb-2">
                GET THE DEVOTIONAL
              </h2>

              <p className="text-sm text-white/80 font-sans leading-relaxed mb-6 font-normal">
                {currentDevotional?.title
                  ? `Request the official "${currentDevotional.title}". Make room for God's Word in your daily life.`
                  : "Make room for God's Word in your daily life."}
              </p>

              {/* Server-side Error Alert */}
              {serverError && (
                <div className="mb-5 p-3 rounded-lg bg-[#F00020]/15 border border-[#F00020]/40 flex items-start gap-2.5 text-xs text-[#F00020] font-sans">
                  <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
                  <span>{serverError}</span>
                </div>
              )}

              {/* Form Validation Summary Alert */}
              {!serverError && Object.keys(errors).length > 0 && Object.values(touched).some(Boolean) && (
                <div className="mb-5 p-3 rounded-lg bg-[#F00020]/15 border border-[#F00020]/40 flex items-start gap-2.5 text-xs text-[#F00020] font-sans">
                  <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
                  <span>Please complete all required fields below before continuing.</span>
                </div>
              )}

              <form onSubmit={handleSubmit} noValidate className="space-y-4">
                {/* 1. Name */}
                <div>
                  <label htmlFor="ebook-name" className="block text-xs font-semibold uppercase tracking-wider text-white/90 mb-1.5 font-sans">
                    Name <span className="text-[#F00020]">*</span>
                  </label>
                  <input
                    ref={nameInputRef}
                    id="ebook-name"
                    type="text"
                    placeholder="e.g., Emmanuel Adeniyi"
                    value={formData.name}
                    onChange={(e) => handleFieldChange('name', e.target.value)}
                    onBlur={() => handleBlur('name')}
                    className={`w-full px-3.5 py-2.5 rounded-lg bg-black border text-sm text-white placeholder-white/35 focus:outline-none transition-colors ${
                      touched.name && errors.name
                        ? 'border-[#F00020] focus:ring-2 focus:ring-[#F00020]/30'
                        : 'border-[#FFD700]/30 focus:border-[#FFD700] focus:ring-2 focus:ring-[#FFD700]/20'
                    }`}
                  />
                  {touched.name && errors.name && (
                    <p className="mt-1 text-xs text-[#F00020] font-sans flex items-center gap-1">
                      <AlertCircle className="h-3 w-3 shrink-0" />
                      {errors.name}
                    </p>
                  )}
                </div>

                {/* 2. Email Address */}
                <div>
                  <label htmlFor="ebook-email" className="block text-xs font-semibold uppercase tracking-wider text-white/90 mb-1.5 font-sans">
                    Email Address <span className="text-[#F00020]">*</span>
                  </label>
                  <input
                    ref={emailInputRef}
                    id="ebook-email"
                    type="email"
                    inputMode="email"
                    autoComplete="email"
                    placeholder="e.g., emmanuel@example.com"
                    value={formData.email}
                    onChange={(e) => handleFieldChange('email', e.target.value)}
                    onBlur={() => handleBlur('email')}
                    className={`w-full px-3.5 py-2.5 rounded-lg bg-black border text-sm text-white placeholder-white/35 focus:outline-none transition-colors ${
                      touched.email && errors.email
                        ? 'border-[#F00020] focus:ring-2 focus:ring-[#F00020]/30'
                        : 'border-[#FFD700]/30 focus:border-[#FFD700] focus:ring-2 focus:ring-[#FFD700]/20'
                    }`}
                  />
                  {touched.email && errors.email && (
                    <p className="mt-1 text-xs text-[#F00020] font-sans flex items-center gap-1">
                      <AlertCircle className="h-3 w-3 shrink-0" />
                      {errors.email}
                    </p>
                  )}
                </div>

                {/* 3. Phone Number */}
                <div>
                  <label htmlFor="ebook-phone" className="block text-xs font-semibold uppercase tracking-wider text-white/90 mb-1.5 font-sans">
                    Phone Number <span className="text-[#F00020]">*</span>
                  </label>
                  <input
                    ref={phoneInputRef}
                    id="ebook-phone"
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel"
                    placeholder="e.g., +234 801 234 5678"
                    value={formData.phone}
                    onChange={(e) => handleFieldChange('phone', e.target.value)}
                    onBlur={() => handleBlur('phone')}
                    className={`w-full px-3.5 py-2.5 rounded-lg bg-black border text-sm text-white placeholder-white/35 focus:outline-none transition-colors ${
                      touched.phone && errors.phone
                        ? 'border-[#F00020] focus:ring-2 focus:ring-[#F00020]/30'
                        : 'border-[#FFD700]/30 focus:border-[#FFD700] focus:ring-2 focus:ring-[#FFD700]/20'
                    }`}
                  />
                  {touched.phone && errors.phone && (
                    <p className="mt-1 text-xs text-[#F00020] font-sans flex items-center gap-1">
                      <AlertCircle className="h-3 w-3 shrink-0" />
                      {errors.phone}
                    </p>
                  )}
                </div>

                {/* 4. What do you expect from this devotional? */}
                <div>
                  <label htmlFor="ebook-expectations" className="block text-xs font-semibold uppercase tracking-wider text-white/90 mb-1.5 font-sans">
                    What do you expect from this devotional? <span className="text-[#F00020]">*</span>
                  </label>
                  <textarea
                    ref={expectationsInputRef}
                    id="ebook-expectations"
                    rows={3}
                    placeholder="Share what you hope to receive from this devotional..."
                    value={formData.expectations}
                    onChange={(e) => handleFieldChange('expectations', e.target.value)}
                    onBlur={() => handleBlur('expectations')}
                    className={`w-full px-3.5 py-2.5 rounded-lg bg-black border text-sm text-white placeholder-white/35 focus:outline-none transition-colors resize-none ${
                      touched.expectations && errors.expectations
                        ? 'border-[#F00020] focus:ring-2 focus:ring-[#F00020]/30'
                        : 'border-[#FFD700]/30 focus:border-[#FFD700] focus:ring-2 focus:ring-[#FFD700]/20'
                    }`}
                  />
                  {touched.expectations && errors.expectations && (
                    <p className="mt-1 text-xs text-[#F00020] font-sans flex items-center gap-1">
                      <AlertCircle className="h-3 w-3 shrink-0" />
                      {errors.expectations}
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider text-black bg-[#FFD700] hover:bg-white transition-all shadow-[0_4px_16px_rgba(255,215,0,0.25)] active:scale-[0.99] cursor-pointer disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span className="inline-flex items-center gap-2">
                        <span className="h-4 w-4 rounded-full border-2 border-black border-t-transparent animate-spin" />
                        <span>Validating Details…</span>
                      </span>
                    ) : (
                      <>
                        <span>GET THE DEVOTIONAL</span>
                        <ArrowRight className="h-4 w-4" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          ) : (
            /* Clear Honest Confirmation Screen */
            <div className="py-4 text-center">
              <div className="mx-auto w-14 h-14 rounded-full bg-[#FFD700]/15 border border-[#FFD700] flex items-center justify-center text-[#FFD700] mb-4">
                <CheckCircle2 className="h-7 w-7" />
              </div>

              <span className="text-xs font-semibold uppercase tracking-widest text-[#FFD700] block mb-1">
                REQUEST RECEIVED
              </span>

              <h3 className="font-hyperbonnard text-2xl sm:text-3xl uppercase tracking-wide text-white mb-3">
                Thank You, {formData.name.split(' ')[0]}!
              </h3>

              <div className="rounded-xl p-4 bg-white/5 border border-white/10 text-left text-xs text-white/85 leading-relaxed mb-6 space-y-2.5">
                <div className="flex items-center gap-2 text-[#FFD700] font-semibold text-xs">
                  <CheckCircle2 className="h-4 w-4" />
                  <span>Devotional Ready & Download Initiated</span>
                </div>
                <p className="text-white/80">
                  Your devotional e-book download was initiated automatically. A confirmation and download link have also been sent to your inbox.
                </p>
                <div className="text-white/70 space-y-1 text-xs pt-1 border-t border-white/10">
                  <div>Recipient: <span className="text-white font-medium">{formData.name}</span></div>
                  <div>Email: <span className="text-white font-medium">{formData.email}</span></div>
                  <div>Phone: <span className="text-white font-medium">{formData.phone}</span></div>
                </div>
              </div>

              <div className="flex flex-col gap-3">
                {/* Direct Manual Download Button if automatic download was blocked */}
                {downloadInfo?.downloadUrl && (
                  <a
                    href={downloadInfo.downloadUrl}
                    download={downloadInfo.fileName || 'The-Devoted-Ones-Devotional.pdf'}
                    onClick={() => {
                      fetch('/api/devotional/download-click', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ requestId: downloadInfo.requestId }),
                      }).catch(() => {});
                    }}
                    className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg text-xs font-bold uppercase tracking-wider text-black bg-[#FFD700] hover:bg-white transition-colors cursor-pointer shadow-md"
                  >
                    <Download className="h-4 w-4" />
                    <span>DOWNLOAD DEVOTIONAL PDF NOW</span>
                  </a>
                )}

                <a
                  href={WHATSAPP_COMMUNITY_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg text-xs font-bold uppercase tracking-wider text-white bg-white/10 hover:bg-white/20 transition-colors cursor-pointer border border-white/20"
                >
                  <ExternalLink className="h-4 w-4" />
                  <span>JOIN WHATSAPP COMMUNITY FOR DAILY TEACHINGS</span>
                </a>

                {onOpenCommunityJoin && (
                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      onOpenCommunityJoin();
                    }}
                    className="py-2 rounded-lg text-xs font-semibold uppercase tracking-wider text-white/80 hover:text-[#FFD700] transition-colors cursor-pointer"
                  >
                    Complete Official Membership Form
                  </button>
                )}

                <button
                  type="button"
                  onClick={handleReset}
                  className="text-xs text-white/60 hover:text-white transition-colors cursor-pointer mt-1"
                >
                  Request for another person
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
