import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, BookOpen } from 'lucide-react';

interface FinalCtaProps {
  onOpenJoin: () => void;
  onOpenEbook?: () => void;
}

export const FinalCta: React.FC<FinalCtaProps> = ({ onOpenJoin, onOpenEbook }) => {
  return (
    <section className="py-20 md:py-24 border-t border-[#FFD700]/20 bg-[#000000] relative overflow-hidden">
      <div
        className="pointer-events-none absolute bottom-0 right-1/4 w-[500px] h-[300px] rounded-full bg-[#FFD700]/10 blur-[130px]"
        aria-hidden="true"
      />
      <div className="mx-auto max-w-4xl px-6 lg:px-8 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-hyperbonnard text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-wide uppercase text-[#FFFFFF] mb-4">
            Start Your Journey of Devotion.
          </h2>
          <p className="text-base sm:text-lg text-[#FFFFFF]/90 max-w-xl mx-auto mb-8 font-normal">
            Choose to grow in your walk with God and in every area of your life.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={onOpenJoin}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 text-sm font-bold uppercase tracking-wider text-[#000000] bg-[#FFD700] hover:bg-[#FFFFFF] hover:text-[#000000] rounded-md transition-all shadow-[0_4px_20px_rgba(255,215,0,0.25)] active:scale-[0.98] cursor-pointer"
            >
              <span>JOIN THE COMMUNITY</span>
              <ArrowRight className="h-4 w-4" />
            </button>

            {onOpenEbook && (
              <button
                onClick={onOpenEbook}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 text-sm font-bold uppercase tracking-wider text-[#FFD700] hover:text-[#000000] bg-transparent hover:bg-[#FFD700] border border-[#FFD700]/40 hover:border-[#FFD700] rounded-md transition-all cursor-pointer"
              >
                <BookOpen className="h-4 w-4 text-[#FFD700]" />
                <span>GET DEVOTIONAL E-BOOK</span>
              </button>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
