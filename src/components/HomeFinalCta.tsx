import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, BookOpen } from 'lucide-react';
import worshipImage from '../assets/images/devoted_worship_community_1792654655697.jpg';

interface HomeFinalCtaProps {
  onOpenJoin: () => void;
  onOpenEbook: () => void;
}

export const HomeFinalCta: React.FC<HomeFinalCtaProps> = ({
  onOpenJoin,
  onOpenEbook,
}) => {
  return (
    <section className="relative py-28 md:py-36 overflow-hidden bg-black text-white border-t border-white/10">
      {/* Background Image with Dark Atmospheric Overlay */}
      <div className="absolute inset-0 w-full h-full pointer-events-none">
        <img
          src={worshipImage}
          alt="Young Christians worshipping together"
          className="w-full h-full object-cover filter brightness-[0.38] contrast-[1.15]"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/85" />
        <div className="absolute inset-0 bg-radial from-[#FFD700]/15 via-transparent to-black/80" />
      </div>

      <div className="relative z-10 mx-auto max-w-4xl px-6 lg:px-8 text-center flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#FFD700] mb-4 block">
            THE DEVOTED ONES
          </span>

          <h2 className="font-hyperbonnard text-4xl sm:text-5xl md:text-6xl lg:text-7xl uppercase tracking-wide text-white mb-5 leading-tight text-balance">
            YOUR GROWTH DOESN'T HAVE TO HAPPEN ALONE.
          </h2>

          <p className="text-base sm:text-lg md:text-xl text-white/90 max-w-xl mx-auto mb-10 font-normal leading-relaxed text-balance">
            Join a community committed to growing in God's Word and living it out every day.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
            {/* Primary CTA */}
            <button
              type="button"
              onClick={onOpenJoin}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider text-black bg-[#FFD700] hover:bg-white hover:text-black transition-all shadow-[0_4px_28px_rgba(255,215,0,0.35)] active:scale-[0.98] cursor-pointer"
            >
              <span>BECOME A DEVOTED ONE</span>
              <ArrowRight className="h-4 w-4" />
            </button>

            {/* Secondary CTA */}
            <button
              type="button"
              onClick={onOpenEbook}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider text-white hover:text-black bg-black/60 hover:bg-[#FFD700] border border-[#FFD700]/50 hover:border-[#FFD700] rounded-xl transition-all cursor-pointer group active:scale-[0.98]"
            >
              <BookOpen className="h-4 w-4 text-[#FFD700] group-hover:text-black transition-colors" />
              <span>GET THE DEVOTIONAL</span>
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
