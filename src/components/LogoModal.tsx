import React, { useState, useRef, useEffect } from 'react';
import { X, Upload, RotateCcw, CheckCircle2, Download, ShieldCheck, Sparkles } from 'lucide-react';
import logoPng from '../assets/logo.png';

interface LogoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LogoModal: React.FC<LogoModalProps> = ({ isOpen, onClose }) => {
  const [customLogo, setCustomLogo] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      const stored = localStorage.getItem('tdo_custom_brand_logo');
      setCustomLogo(stored);
      setSuccessMsg(null);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Please select an image file (PNG, SVG, JPG, WEBP)');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      if (result) {
        localStorage.setItem('tdo_custom_brand_logo', result);
        setCustomLogo(result);
        window.dispatchEvent(new Event('tdo_logo_updated'));
        setSuccessMsg('Logo updated site-wide successfully!');
        setTimeout(() => setSuccessMsg(null), 4000);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleReset = () => {
    localStorage.removeItem('tdo_custom_brand_logo');
    setCustomLogo(null);
    window.dispatchEvent(new Event('tdo_logo_updated'));
    setSuccessMsg('Reset to official THE DEVOTED ONES emblem.');
    setTimeout(() => setSuccessMsg(null), 3000);
  };

  const currentSrc = customLogo || logoPng;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-lg rounded-2xl border border-[#FFD700]/30 bg-[#000000] p-6 sm:p-8 shadow-[0_0_50px_rgba(255,215,0,0.2)]">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-[#FFFFFF]/70 hover:text-[#FFFFFF] hover:bg-[#FFFFFF]/10 transition-colors"
          title="Close"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Modal Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFD700]/10 border border-[#FFD700]/30 text-[#FFD700] text-xs font-mono uppercase tracking-wider mb-3">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Official Brand Identity</span>
          </div>
          <h3 className="font-hyperbonnard text-2xl sm:text-3xl tracking-wide uppercase text-[#FFFFFF]">
            THE DEVOTED ONES Emblem
          </h3>
          <p className="text-xs sm:text-sm text-[#FFFFFF]/70 mt-1 font-sans">
            Circular badge featuring Classic Gold (#FFD700) and TDO monogram
          </p>
        </div>

        {/* Large Logo Preview */}
        <div className="flex flex-col items-center justify-center my-6 p-6 rounded-2xl border border-[#FFD700]/20 bg-[#0a0a0a]">
          <div className="relative h-48 w-48 sm:h-56 sm:w-56 flex items-center justify-center">
            <img
              src={currentSrc}
              alt="Brand Logo High Resolution"
              className="w-full h-full object-contain drop-shadow-[0_0_25px_rgba(255,215,0,0.4)]"
            />
          </div>
          <p className="text-xs font-mono text-[#FFD700] mt-4">
            {customLogo ? 'Custom Uploaded Logo Active' : 'Official Community Emblem (#FFD700)'}
          </p>
        </div>

        {/* Success Message Banner */}
        {successMsg && (
          <div className="mb-4 flex items-center gap-2 p-3 rounded-lg bg-[#FFD700]/15 border border-[#FFD700] text-[#FFD700] text-xs font-mono">
            <CheckCircle2 className="h-4 w-4 shrink-0" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* Action Controls */}
        <div className="space-y-3">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            accept="image/png,image/jpeg,image/svg+xml,image/webp"
            className="hidden"
          />

          <button
            onClick={() => fileInputRef.current?.click()}
            className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#FFD700] text-[#000000] font-semibold text-sm hover:bg-[#FFFFFF] transition-all cursor-pointer shadow-[0_2px_15px_rgba(255,215,0,0.25)]"
          >
            <Upload className="h-4 w-4" />
            <span>Replace / Upload Logo</span>
          </button>

          {customLogo && (
            <button
              onClick={handleReset}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border border-[#FFD700]/30 text-[#FFFFFF]/80 hover:text-[#FFFFFF] hover:border-[#FFD700] hover:bg-[#FFFFFF]/5 transition-all text-xs font-mono cursor-pointer"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span>Reset to Default Logo</span>
            </button>
          )}

          <div className="pt-2 text-center">
            <a
              href={logoPng}
              download="the_devoted_ones_logo.png"
              className="inline-flex items-center gap-1.5 text-xs text-[#FFD700] hover:underline"
            >
              <Download className="h-3.5 w-3.5" />
              <span>Download Official Emblem PNG</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
