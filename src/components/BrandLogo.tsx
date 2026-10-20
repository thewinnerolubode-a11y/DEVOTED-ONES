import React, { useState, useEffect } from 'react';

interface BrandLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  showText?: boolean;
  className?: string;
  onClick?: () => void;
  interactive?: boolean;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  size = 'md',
  showText = false,
  className = '',
  onClick,
  interactive = false,
}) => {
  const [customLogo, setCustomLogo] = useState<string | null>(null);

  useEffect(() => {
    const loadCustomLogo = () => {
      try {
        const stored = localStorage.getItem('tdo_custom_brand_logo');
        if (stored) {
          setCustomLogo(stored);
        } else {
          setCustomLogo(null);
        }
      } catch (e) {
        console.error('Failed reading custom logo', e);
      }
    };

    loadCustomLogo();

    const handleUpdate = () => loadCustomLogo();
    window.addEventListener('tdo_logo_updated', handleUpdate);
    return () => window.removeEventListener('tdo_logo_updated', handleUpdate);
  }, []);

  // Generous, prominent size dimensions so the authentic emblem is bold, crisp, and clearly readable
  const iconSizeClasses = {
    sm: 'h-11 w-11 sm:h-12 sm:w-12',
    md: 'h-14 w-14 sm:h-16 sm:w-16 md:h-20 md:w-20',
    lg: 'h-24 w-24 sm:h-28 sm:w-28 md:h-32 md:w-32',
    xl: 'h-32 w-32 sm:h-40 sm:w-40 md:h-48 md:w-48',
    '2xl': 'h-44 w-44 sm:h-56 sm:w-56 md:h-64 md:w-64',
  };

  const textSizeClasses = {
    sm: 'text-base sm:text-lg',
    md: 'text-lg sm:text-xl md:text-2xl',
    lg: 'text-2xl sm:text-3xl md:text-4xl',
    xl: 'text-3xl sm:text-4xl md:text-5xl',
    '2xl': 'text-4xl sm:text-5xl md:text-6xl',
  };

  // Official logo lives in /public and is served at the site root by Vite.
  // This path works in both `npm run dev` and the production build.
  const OFFICIAL_LOGO_SRC = '/official-logo.png';
  const currentSrc = customLogo || OFFICIAL_LOGO_SRC;

  return (
    <div
      onClick={onClick}
      className={`inline-flex items-center gap-3.5 select-none ${onClick || interactive ? 'cursor-pointer group' : ''} ${className}`}
    >
      <div
        className={`relative shrink-0 rounded-full flex items-center justify-center overflow-hidden transition-transform duration-300 ${
          onClick || interactive ? 'group-hover:scale-105' : ''
        } ${iconSizeClasses[size]}`}
      >
        <img
          src={currentSrc}
          alt="THE DEVOTED ONES Brand Logo"
          className="w-full h-full object-contain filter drop-shadow-[0_0_14px_rgba(255,215,0,0.4)]"
          loading="eager"
        />
      </div>

      {showText && (
        <span
          className={`font-hyperbonnard tracking-wider text-[#FFFFFF] uppercase whitespace-nowrap group-hover:text-[#FFD700] transition-colors ${textSizeClasses[size]}`}
        >
          THE DEVOTED ONES
        </span>
      )}
    </div>
  );
};
