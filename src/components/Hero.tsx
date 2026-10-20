import React from 'react';
import { ArrowRight, BookOpen } from 'lucide-react';
import heroImage from '../assets/images/devoted_ones_hero_1792397573009.jpg';
import { BrandLogo } from './BrandLogo';

interface HeroProps {
  onOpenJoin: () => void;
  onOpenTestimonies: () => void;
  onOpenLogo?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenJoin, onOpenTestimonies, onOpenLogo }) => {
  return (
    <section className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-28">
      {/* Subtle radial ambient glow with brand Gold and warm orange accent */}
      <div
        className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] rounded-full bg-[#FFD700]/10 blur-[140px]"
        aria-hidden="true"
      />

      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Typography & CTAs */}
          <div className="lg:col-span-7 flex flex-col items-start">
            <div className="flex items-center gap-4 mb-6">
              <button
                onClick={onOpenLogo}
                className="cursor-pointer focus:outline-none transition-transform hover:scale-105"
                title="View brand logo details or upload logo"
              >
                <BrandLogo size="lg" showText={false} interactive={true} />
              </button>
              <div className="flex flex-col">
                <span className="font-hyperbonnard text-lg md:text-2xl tracking-[0.22em] uppercase text-[#FFD700]">
                  THE DEVOTED ONES
                </span>
                <span className="font-mono text-xs uppercase tracking-wider text-[#FFFFFF]/70">
                  Community of Devotion & Growth
                </span>
              </div>
            </div>

            <h1 className="font-hyperbonnard text-5xl sm:text-6xl md:text-7xl lg:text-8xl tracking-wide uppercase text-[#FFFFFF] leading-[0.95] text-balance mb-6">
              Become Devoted.
            </h1>

            <p className="text-lg sm:text-xl text-[#FFFFFF]/90 max-w-xl font-normal leading-relaxed mb-9">
              A community raising young people to love God, live by His Word, and grow intentionally in every area of life.
            </p>

            <div className="flex flex-wrap items-center gap-4 w-full sm:w-auto">
              <button
                onClick={onOpenJoin}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 text-sm font-bold uppercase tracking-wider text-[#000000] bg-[#FFD700] hover:bg-[#FFFFFF] hover:text-[#000000] rounded-md transition-all shadow-[0_4px_20px_rgba(255,215,0,0.2)] active:scale-[0.98] cursor-pointer"
              >
                <span>JOIN THE COMMUNITY</span>
                <ArrowRight className="h-4 w-4" />
              </button>

              <button
                onClick={onOpenTestimonies}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 text-sm font-semibold uppercase tracking-wider text-[#FFFFFF] hover:text-[#FFD700] bg-transparent hover:bg-[#FFD700]/10 border border-[#FFD700]/40 hover:border-[#FFD700] rounded-md transition-all active:scale-[0.98] cursor-pointer"
              >
                <BookOpen className="h-4 w-4 text-[#FFD700]" />
                <span>TESTIMONIES</span>
              </button>
            </div>

            {/* Quick unboxed orientation note with monospace accent */}
            <div className="mt-8 flex items-center gap-3 font-mono text-[11px] sm:text-xs text-[#FFFFFF]/70 tracking-wide">
              <span>Christian Youth Community</span>
              <span className="text-[#FFD700]" aria-hidden="true">·</span>
              <span>Scripture-Led</span>
              <span className="text-[#FFD700]" aria-hidden="true">·</span>
              <span>Intentional Growth</span>
            </div>
          </div>

          {/* Right Column: Editorial Visual */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden border border-[#FFD700]/25 bg-[#000000] shadow-[0_10px_35px_rgba(0,0,0,0.8)]">
              <img
                src={heroImage}
                alt="Open notebook and Bible in quiet morning devotion"
                className="w-full h-auto object-cover aspect-[4/3] lg:aspect-[5/4] transition-transform duration-700 hover:scale-[1.02]"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#000000] via-[#000000]/40 to-transparent pointer-events-none" />
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-[#FFFFFF] bg-[#000000]/85 backdrop-blur-md px-3.5 py-2.5 rounded-lg border border-[#FFD700]/30">
                <span className="font-medium text-[#FFFFFF]">A daily walk with God</span>
                <span className="font-mono text-[11px] text-[#FFD700]">Personal Devotion</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
