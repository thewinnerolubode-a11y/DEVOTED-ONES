import React from 'react';
import { Mail, Instagram } from 'lucide-react';
import { BrandLogo } from './BrandLogo';

interface FooterProps {
  onOpenLogo?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenLogo }) => {
  return (
    <footer className="border-t border-[#FFD700]/20 bg-[#000000] py-14">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 pb-10 border-b border-[#FFD700]/15">
          <div className="flex items-start gap-4">
            <button
              onClick={onOpenLogo}
              className="cursor-pointer focus:outline-none transition-transform hover:scale-105"
              title="View brand logo details or upload logo"
            >
              <BrandLogo size="lg" showText={false} interactive={true} className="mt-1" />
            </button>
            <div>
              <span className="font-hyperbonnard text-2xl tracking-wider text-[#FFD700] uppercase block">
                THE DEVOTED ONES
              </span>
              <p className="mt-2 text-sm text-[#FFFFFF]/85 font-normal">
                “Love God. Live by His Word. Grow. Live excellently.”
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 text-sm">
            <a
              href="https://instagram.com/the_devoted_one"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[#FFFFFF]/80 hover:text-[#FFD700] transition-colors group"
            >
              <Instagram className="h-4 w-4 text-[#FFD700] group-hover:text-[#FD7000] transition-colors" />
              <span className="font-mono text-xs sm:text-sm">@the_devoted_one</span>
            </a>

            <a
              href="mailto:thewinnerolubode@gmail.com"
              className="inline-flex items-center gap-2 text-[#FFFFFF]/80 hover:text-[#FFD700] transition-colors group"
            >
              <Mail className="h-4 w-4 text-[#FFD700] group-hover:text-[#F00020] transition-colors" />
              <span className="font-mono text-xs sm:text-sm">thewinnerolubode@gmail.com</span>
            </a>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[11px] sm:text-xs text-[#FFFFFF]/60">
          <p>© {new Date().getFullYear()} THE DEVOTED ONES. All rights reserved.</p>
          <div className="flex items-center gap-3">
            <span>Christian Youth Fellowship</span>
            <span className="text-[#FFD700]" aria-hidden="true">·</span>
            <span>Kingdom Discipleship</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
