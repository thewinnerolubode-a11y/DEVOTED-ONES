import React from 'react';
import { Mail, Instagram, ArrowRight } from 'lucide-react';
import { BrandLogo } from './BrandLogo';
import { AppPage } from './Navbar';

interface FooterProps {
  onNavigate: (page: AppPage) => void;
  onOpenJoin: () => void;
  onOpenEbook: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigate,
  onOpenJoin,
  onOpenEbook,
}) => {
  return (
    <footer className="border-t border-white/10 bg-black py-16 text-white">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          {/* Brand Info */}
          <div className="md:col-span-5 flex flex-col items-start">
            <div className="flex items-start gap-4 mb-4">
              <button
                type="button"
                onClick={() => onNavigate('home')}
                className="cursor-pointer focus:outline-none transition-transform hover:scale-105"
                title="THE DEVOTED ONES"
              >
                <BrandLogo size="md" showText={false} interactive={false} className="mt-0.5" />
              </button>
              <div>
                <span className="font-hyperbonnard text-2xl tracking-wider text-[#FFD700] uppercase block">
                  THE DEVOTED ONES
                </span>
                <p className="mt-1 text-xs sm:text-sm text-white/85 font-normal">
                  “A generation rooted in the Word. Living with purpose.”
                </p>
              </div>
            </div>

            <p className="text-xs text-white/70 max-w-sm leading-relaxed font-sans mb-6">
              A Christian community raising young people to love God, live by His Word, develop godly character, and build daily spiritual consistency.
            </p>

            {/* Social & Contact */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 text-sm">
              <a
                href="https://instagram.com/the_devoted_one"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-white/80 hover:text-[#FFD700] transition-colors group"
              >
                <Instagram className="h-4 w-4 text-[#FFD700] group-hover:text-white transition-colors" />
                <span className="text-xs sm:text-sm font-medium">@the_devoted_one</span>
              </a>

              <a
                href="mailto:thewinnerolubode@gmail.com"
                className="inline-flex items-center gap-2 text-white/80 hover:text-[#FFD700] transition-colors group"
              >
                <Mail className="h-4 w-4 text-[#FFD700] group-hover:text-white transition-colors" />
                <span className="text-xs sm:text-sm font-medium">thewinnerolubode@gmail.com</span>
              </a>
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div className="md:col-span-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#FFD700] mb-4">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-xs font-medium text-white/75">
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('home')}
                  className="hover:text-[#FFD700] transition-colors cursor-pointer uppercase tracking-wider"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('about')}
                  className="hover:text-[#FFD700] transition-colors cursor-pointer uppercase tracking-wider"
                >
                  About The Community
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('programs')}
                  className="hover:text-[#FFD700] transition-colors cursor-pointer uppercase tracking-wider"
                >
                  Programs & Rhythms
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={onOpenEbook}
                  className="hover:text-[#FFD700] transition-colors cursor-pointer uppercase tracking-wider text-[#FFD700]"
                >
                  Get the Devotional
                </button>
              </li>
            </ul>
          </div>

          {/* CTAs Column */}
          <div className="md:col-span-4 flex flex-col justify-between">
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#FFD700] mb-4">
                Join the Movement
              </h4>
              <p className="text-xs text-white/70 leading-relaxed mb-4">
                Step into intentional discipleship and grow alongside fellow young believers today.
              </p>
              <button
                type="button"
                onClick={onOpenJoin}
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-xs font-bold uppercase tracking-wider text-black bg-[#FFD700] hover:bg-white transition-colors cursor-pointer shadow-md mb-3"
              >
                <span>JOIN THE COMMUNITY</span>
                <ArrowRight className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={onOpenEbook}
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider text-white hover:text-black bg-white/5 hover:bg-[#FFD700] border border-white/15 hover:border-[#FFD700] transition-colors cursor-pointer"
              >
                <span>GET THE DEVOTIONAL</span>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom copyright line */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/50">
          <span>© {new Date().getFullYear()} THE DEVOTED ONES. All rights reserved.</span>
          <div className="flex items-center gap-3 text-white/40">
            <span>Community · Devotion · Growth · Excellence</span>
            <span className="text-white/20">|</span>
            <button
              type="button"
              onClick={() => onNavigate('admin')}
              className="text-white/50 hover:text-[#FFD700] transition-colors cursor-pointer hover:underline"
            >
              Admin Portal
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
