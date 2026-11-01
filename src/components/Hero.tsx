import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, BookOpen, ChevronDown } from 'lucide-react';
import heroImage from '../assets/images/devoted_hero_african_youth_1792655296460.jpg';

interface HeroProps {
  onOpenJoin: () => void;
  onOpenEbook: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenJoin, onOpenEbook }) => {
  const scrollToExplore = () => {
    const el = document.getElementById('community-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-[90vh] sm:min-h-[94vh] flex flex-col justify-between overflow-hidden bg-black text-white">
      {/* 1. Large Immersive Edge-to-Edge Hero Image */}
      <motion.div
        initial={{ scale: 1.06, opacity: 0.85 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
        className="absolute inset-0 w-full h-full pointer-events-none"
      >
        <img
          src={heroImage}
          alt="Young African Christians gathered outdoors on campus grass studying Bibles and notebooks in warm sunlight"
          className="w-full h-full object-cover object-center filter brightness-[0.52] contrast-[1.12]"
          loading="eager"
        />
      </motion.div>

      {/* 2. Dark Overlay for High Text Readability */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/45 to-black pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 bg-radial from-[#FFD700]/10 via-transparent to-black/85 pointer-events-none"
        aria-hidden="true"
      />

      <div className="h-6 sm:h-12" />

      {/* 3. Editorial Content Directly Over Image */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 sm:px-8 text-center flex flex-col items-center my-auto py-12">
        {/* Small brand identifier */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="flex items-center gap-3 mb-4"
        >
          <span className="h-px w-6 sm:w-8 bg-[#FFD700]" />
          <span className="text-xs sm:text-sm font-bold uppercase tracking-[0.25em] text-[#FFD700]">
            THE DEVOTED ONES
          </span>
          <span className="h-px w-6 sm:w-8 bg-[#FFD700]" />
        </motion.div>

        {/* Main Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.08, ease: 'easeOut' }}
          className="font-hyperbonnard text-5xl sm:text-6xl md:text-7xl lg:text-8xl tracking-wide uppercase text-white leading-[0.92] mb-5 drop-shadow-[0_4px_30px_rgba(0,0,0,0.85)] text-balance"
        >
          A GENERATION ROOTED IN THE WORD.
        </motion.h1>

        {/* Supporting Text */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.16, ease: 'easeOut' }}
          className="text-base sm:text-lg md:text-xl text-white/90 max-w-xl mx-auto font-sans leading-relaxed mb-10 font-normal text-balance"
        >
          Growing in God, building character, and living with purpose.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.24, ease: 'easeOut' }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto"
        >
          {/* Primary CTA */}
          <button
            type="button"
            onClick={onOpenJoin}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider text-black bg-[#FFD700] hover:bg-white hover:text-black transition-all shadow-[0_4px_28px_rgba(255,215,0,0.35)] active:scale-[0.98] cursor-pointer"
          >
            <span>JOIN THE COMMUNITY</span>
            <ArrowRight className="h-4 w-4" />
          </button>

          {/* Secondary CTA */}
          <button
            type="button"
            onClick={onOpenEbook}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider text-white hover:text-black bg-black/50 hover:bg-[#FFD700] border border-[#FFD700]/50 hover:border-[#FFD700] backdrop-blur-md transition-all active:scale-[0.98] cursor-pointer group"
          >
            <BookOpen className="h-4 w-4 text-[#FFD700] group-hover:text-black transition-colors" />
            <span>GET THE DEVOTIONAL</span>
          </button>
        </motion.div>
      </div>

      {/* 4. Bottom Scroll Cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.6 }}
        className="relative z-10 pb-6 text-center"
      >
        <button
          onClick={scrollToExplore}
          className="inline-flex flex-col items-center gap-1.5 text-xs uppercase tracking-widest text-white/50 hover:text-[#FFD700] transition-colors cursor-pointer group"
          aria-label="Scroll to discover community"
        >
          <span className="text-[11px] font-semibold">Scroll to Discover</span>
          <ChevronDown className="h-4 w-4 animate-bounce text-[#FFD700]" />
        </button>
      </motion.div>
    </section>
  );
};
