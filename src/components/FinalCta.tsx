import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, BookOpen } from 'lucide-react';

interface FinalCtaProps {
  onOpenJoin: () => void;
  onOpenEbook?: () => void;
}

export const FinalCta: React.FC<FinalCtaProps> = ({ onOpenJoin, onOpenEbook }) => {
  return (
    <section className="py-24 md:py-32 border-t border-white/10 bg-black relative overflow-hidden text-white">
      {/* Subtle Radial Glow */}
      <div
        className="pointer-events-none absolute bottom-0 right-1/4 w-[600px] h-[360px] rounded-full bg-[#FFD700]/10 blur-[150px]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute top-0 left-1/4 w-[400px] h-[260px] rounded-full bg-white/5 blur-[120px]"
        aria-hidden="true"
      />

      <div className="mx-auto max-w-4xl px-6 lg:px-8 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#FFD700] mb-3 block">
            BEGIN TODAY
          </span>

          <h2 className="font-hyperbonnard text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-wide uppercase text-white mb-5 text-balance">
            Start Your Journey of Devotion.
          </h2>

          <p className="text-base sm:text-lg md:text-xl text-white/85 max-w-xl mx-auto mb-10 font-normal leading-relaxed text-balance">
            Choose to grow in your walk with God and build lifelong spiritual consistency alongside other young believers.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
            <button
              type="button"
              onClick={onOpenJoin}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 text-xs sm:text-sm font-bold uppercase tracking-wider text-black bg-[#FFD700] hover:bg-white hover:text-black rounded-xl transition-all shadow-[0_4px_28px_rgba(255,215,0,0.35)] active:scale-[0.98] cursor-pointer"
            >
              <span>JOIN THE COMMUNITY</span>
              <ArrowRight className="h-4 w-4" />
            </button>

            {onOpenEbook && (
              <button
                type="button"
                onClick={onOpenEbook}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-4 text-xs sm:text-sm font-bold uppercase tracking-wider text-white hover:text-black bg-black/60 hover:bg-[#FFD700] border border-[#FFD700]/50 hover:border-[#FFD700] rounded-xl transition-all cursor-pointer group active:scale-[0.98]"
              >
                <BookOpen className="h-4 w-4 text-[#FFD700] group-hover:text-black transition-colors" />
                <span>GET THE DEVOTIONAL E-BOOK</span>
              </button>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
