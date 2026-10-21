import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, BookOpen, Download, Compass, Sparkles } from 'lucide-react';
import heroImage from '../assets/images/devoted_ones_hero_1792397573009.jpg';
import { BrandLogo } from './BrandLogo';

interface HeroProps {
  onOpenJoin: () => void;
  onOpenTestimonies: () => void;
  onOpenEbook: () => void;
  onOpenVision: () => void;
  onOpenLogo?: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onOpenJoin,
  onOpenTestimonies,
  onOpenEbook,
  onOpenVision,
  onOpenLogo,
}) => {
  return (
    <section className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-28">
      {/* Subtle radial ambient glow with brand Gold */}
      <motion.div
        animate={{
          scale: [1, 1.08, 1],
          opacity: [0.12, 0.18, 0.12],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[720px] h-[520px] rounded-full bg-[#FFD700] blur-[150px]"
        aria-hidden="true"
      />

      <div className="mx-auto max-w-6xl px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Typography & CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="lg:col-span-7 flex flex-col items-start"
          >
            {/* Brand Logo & Community Tag */}
            <div className="flex items-center gap-4 mb-6">
              <button
                type="button"
                onClick={onOpenLogo}
                className="cursor-pointer focus:outline-none transition-transform hover:scale-105"
                title="View brand logo details"
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

            <p className="text-lg sm:text-xl text-[#FFFFFF]/90 max-w-xl font-normal leading-relaxed mb-8">
              A community raising young people to love God, live by His Word, and grow intentionally in every area of life.
            </p>

            {/* CTAs: Join Community, Prominent Devotional E-Book, and Testimonies */}
            <div className="flex flex-wrap items-center gap-3.5 w-full sm:w-auto">
              {/* Primary CTA: Join Community */}
              <button
                type="button"
                onClick={onOpenJoin}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 text-sm font-bold uppercase tracking-wider text-[#000000] bg-[#FFD700] hover:bg-[#FFFFFF] hover:text-[#000000] rounded-md transition-all shadow-[0_4px_20px_rgba(255,215,0,0.25)] active:scale-[0.98] cursor-pointer"
              >
                <span>JOIN THE COMMUNITY</span>
                <ArrowRight className="h-4 w-4" />
              </button>

              {/* Prominent Task 1 CTA: Get Devotional E-Book */}
              <button
                type="button"
                onClick={onOpenEbook}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-bold uppercase tracking-wider text-[#FFD700] hover:text-[#000000] bg-[#FFD700]/10 hover:bg-[#FFD700] border border-[#FFD700] rounded-md transition-all shadow-[0_2px_15px_rgba(255,215,0,0.15)] active:scale-[0.98] cursor-pointer group"
              >
                <Download className="h-4 w-4 text-[#FFD700] group-hover:text-[#000000] transition-colors" />
                <span>GET DEVOTIONAL E-BOOK</span>
              </button>

              {/* Testimonies CTA */}
              <button
                type="button"
                onClick={onOpenTestimonies}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 text-sm font-semibold uppercase tracking-wider text-[#FFFFFF] hover:text-[#FFD700] bg-transparent hover:bg-[#FFFFFF]/5 border border-[#FFFFFF]/25 hover:border-[#FFD700] rounded-md transition-all active:scale-[0.98] cursor-pointer"
              >
                <BookOpen className="h-4 w-4 text-[#FFD700]" />
                <span>TESTIMONIES</span>
              </button>
            </div>

            {/* Vision Banner Shortcut */}
            <div className="mt-8 flex flex-wrap items-center gap-4 text-xs font-mono text-[#FFFFFF]/70">
              <button
                type="button"
                onClick={onOpenVision}
                className="inline-flex items-center gap-1.5 text-[#FFD700] hover:underline cursor-pointer tracking-wider uppercase font-semibold"
              >
                <Compass className="h-3.5 w-3.5" />
                <span>Explore Our 3-Year Vision & Promises →</span>
              </button>
            </div>

            {/* Quick orientation note */}
            <div className="mt-4 flex items-center gap-3 font-mono text-[11px] sm:text-xs text-[#FFFFFF]/60 tracking-wide">
              <span>Christian Youth Community</span>
              <span className="text-[#FFD700]" aria-hidden="true">·</span>
              <span>Scripture-Led</span>
              <span className="text-[#FFD700]" aria-hidden="true">·</span>
              <span>Intentional Growth</span>
            </div>
          </motion.div>

          {/* Right Column: Editorial Visual with Motion Entrance */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="lg:col-span-5 relative"
          >
            <div className="relative rounded-2xl overflow-hidden border border-[#FFD700]/30 bg-[#000000] shadow-[0_12px_40px_rgba(0,0,0,0.85)]">
              <img
                src={heroImage}
                alt="Open notebook and Bible in quiet morning devotion"
                className="w-full h-auto object-cover aspect-[4/3] lg:aspect-[5/4] transition-transform duration-700 hover:scale-[1.03]"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#000000] via-[#000000]/40 to-transparent pointer-events-none" />

              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-[#FFFFFF] bg-[#000000]/90 backdrop-blur-md px-3.5 py-2.5 rounded-lg border border-[#FFD700]/30">
                <span className="font-medium text-[#FFFFFF]">A daily walk with God</span>
                <span className="font-mono text-[11px] text-[#FFD700] font-bold">Personal Devotion</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
