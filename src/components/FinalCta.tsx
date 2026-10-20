import React from 'react';
import { ArrowRight } from 'lucide-react';

interface FinalCtaProps {
  onOpenJoin: () => void;
}

export const FinalCta: React.FC<FinalCtaProps> = ({ onOpenJoin }) => {
  return (
    <section className="py-20 md:py-24 border-t border-[#FFD700]/20 bg-[#000000] relative overflow-hidden">
      <div
        className="pointer-events-none absolute bottom-0 right-1/4 w-[500px] h-[300px] rounded-full bg-[#FFD700]/10 blur-[130px]"
        aria-hidden="true"
      />
      <div className="mx-auto max-w-4xl px-6 lg:px-8 text-center relative z-10">
        <h2 className="font-hyperbonnard text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-wide uppercase text-[#FFFFFF] mb-4">
          Start Your Journey of Devotion.
        </h2>
        <p className="text-base sm:text-lg text-[#FFFFFF]/90 max-w-xl mx-auto mb-8 font-normal">
          Choose to grow in your walk with God and in every area of your life.
        </p>
        <button
          onClick={onOpenJoin}
          className="inline-flex items-center justify-center gap-2.5 px-8 py-3.5 text-sm font-bold uppercase tracking-wider text-[#000000] bg-[#FFD700] hover:bg-[#FFFFFF] hover:text-[#000000] rounded-md transition-all shadow-[0_4px_20px_rgba(255,215,0,0.2)] active:scale-[0.98] cursor-pointer"
        >
          <span>JOIN THE COMMUNITY</span>
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </section>
  );
};
