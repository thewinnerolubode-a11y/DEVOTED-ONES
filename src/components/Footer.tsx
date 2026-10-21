import React from 'react';
import { Mail, Instagram, ArrowRight, Heart } from 'lucide-react';
import { BrandLogo } from './BrandLogo';
import { AppPage } from './Navbar';

interface FooterProps {
  onNavigate?: (page: AppPage, sectionId?: string) => void;
  onOpenJoin?: () => void;
  onOpenTestimonies?: () => void;
  onOpenEbook?: () => void;
  onOpenVision?: () => void;
  onOpenLogo?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigate,
  onOpenJoin,
  onOpenTestimonies,
  onOpenEbook,
  onOpenVision,
  onOpenLogo,
}) => {
  return (
    <footer className="border-t border-[#FFD700]/20 bg-[#000000] py-14">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-[#FFD700]/15">
          {/* Brand Info */}
          <div className="md:col-span-5 flex flex-col items-start">
            <div className="flex items-start gap-4 mb-4">
              <button
                type="button"
                onClick={onOpenLogo}
                className="cursor-pointer focus:outline-none transition-transform hover:scale-105"
                title="View brand logo details"
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
            <p className="text-xs text-[#FFFFFF]/70 max-w-sm leading-relaxed font-sans mb-6">
              A Christian youth community raising young people to love God deeply and intentionally build daily spiritual consistency.
            </p>

            {/* Social & Contact */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 text-sm">
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
                <Mail className="h-4 w-4 text-[#FFD700] group-hover:text-[#FD7000] transition-colors" />
                <span className="font-mono text-xs sm:text-sm">thewinnerolubode@gmail.com</span>
              </a>
            </div>
          </div>

          {/* Quick Links Column 1 */}
          <div className="md:col-span-3">
            <h4 className="font-mono text-xs uppercase tracking-widest text-[#FFD700] font-bold mb-4">
              Explore Community
            </h4>
            <ul className="space-y-2.5 font-mono text-xs text-[#FFFFFF]/80">
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate && onNavigate('home', 'about')}
                  className="hover:text-[#FFD700] transition-colors cursor-pointer uppercase"
                >
                  About Us
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate && onNavigate('home', 'devoted-life')}
                  className="hover:text-[#FFD700] transition-colors cursor-pointer uppercase"
                >
                  The Devoted Life
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate && onNavigate('home', 'what-we-do')}
                  className="hover:text-[#FFD700] transition-colors cursor-pointer uppercase"
                >
                  What We Do
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={onOpenVision}
                  className="hover:text-[#FFD700] transition-colors cursor-pointer uppercase text-[#FFD700]"
                >
                  Our Vision (3-Year Plan)
                </button>
              </li>
            </ul>
          </div>

          {/* Quick Links Column 2 */}
          <div className="md:col-span-4">
            <h4 className="font-mono text-xs uppercase tracking-widest text-[#FFD700] font-bold mb-4">
              Resources & Fellowship
            </h4>
            <ul className="space-y-2.5 font-mono text-xs text-[#FFFFFF]/80 mb-6">
              <li>
                <button
                  type="button"
                  onClick={onOpenEbook}
                  className="hover:text-[#FFD700] transition-colors cursor-pointer uppercase text-[#FFD700] font-bold"
                >
                  Get Devotional E-Book
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={onOpenTestimonies}
                  className="hover:text-[#FFD700] transition-colors cursor-pointer uppercase"
                >
                  Member Testimonies
                </button>
              </li>
            </ul>

            <button
              type="button"
              onClick={onOpenJoin}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider text-[#000000] bg-[#FFD700] hover:bg-[#FFFFFF] transition-all shadow-[0_2px_12px_rgba(255,215,0,0.25)] active:scale-[0.98] cursor-pointer"
            >
              <span>Join The Community</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
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
