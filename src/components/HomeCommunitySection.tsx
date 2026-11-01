import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import fellowshipImage from '../assets/images/devoted_youth_fellowship_1792653302664.jpg';

interface HomeCommunitySectionProps {
  onDiscoverCommunity: () => void;
}

export const HomeCommunitySection: React.FC<HomeCommunitySectionProps> = ({
  onDiscoverCommunity,
}) => {
  return (
    <section id="community-section" className="py-20 md:py-28 bg-black text-white relative border-t border-white/10 scroll-mt-24">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Visual Column with authentic community photo */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6 relative"
          >
            <div className="relative rounded-2xl overflow-hidden border border-white/15 bg-[#0e0e0e] shadow-[0_16px_40px_rgba(0,0,0,0.85)] group">
              <img
                src={fellowshipImage}
                alt="Young believers in deep fellowship and scripture study"
                className="w-full h-full object-cover aspect-[4/3] transition-transform duration-700 group-hover:scale-[1.03]"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-white bg-black/90 backdrop-blur-md px-4 py-3 rounded-xl border border-white/15 shadow-lg">
                <span className="font-semibold">The Devoted Ones Community</span>
                <span className="text-[#FFD700] text-xs font-bold uppercase tracking-wider">
                  Iron Sharpens Iron
                </span>
              </div>
            </div>
          </motion.div>

          {/* Text Column */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6 flex flex-col justify-center"
          >
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#FFD700] mb-3 block">
              THE COMMUNITY
            </span>

            <h2 className="font-hyperbonnard text-3xl sm:text-4xl md:text-5xl uppercase tracking-wide text-white mb-5 leading-tight">
              MORE THAN A DEVOTIONAL. A LIFE OF GROWTH.
            </h2>

            <p className="text-base sm:text-lg text-white/85 font-sans leading-relaxed mb-8 font-normal">
              THE DEVOTED ONES is a community committed to growing through God's Word, developing godly character, and becoming people whose lives reflect what they believe.
            </p>

            <div className="space-y-3 mb-8 text-xs sm:text-sm font-semibold uppercase tracking-wider text-white/80">
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="h-4 w-4 text-[#FFD700] shrink-0" />
                <span>Daily scripture immersion and morning prayer</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="h-4 w-4 text-[#FFD700] shrink-0" />
                <span>Meaningful relationships & accountability</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="h-4 w-4 text-[#FFD700] shrink-0" />
                <span>Character and excellence across work & study</span>
              </div>
            </div>

            <div>
              <button
                type="button"
                onClick={onDiscoverCommunity}
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider text-black bg-[#FFD700] hover:bg-white hover:text-black transition-all shadow-[0_4px_20px_rgba(255,215,0,0.25)] active:scale-[0.98] cursor-pointer"
              >
                <span>DISCOVER THE COMMUNITY</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
