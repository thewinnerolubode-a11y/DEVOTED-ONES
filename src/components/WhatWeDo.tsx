import React from 'react';
import { motion } from 'framer-motion';
import { BookOpenText, FileText, Users, ArrowRight } from 'lucide-react';

interface WhatWeDoProps {
  onOpenEbook?: () => void;
}

export const WhatWeDo: React.FC<WhatWeDoProps> = ({ onOpenEbook }) => {
  return (
    <section id="what-we-do" className="py-20 md:py-24 border-t border-[#FFD700]/20 bg-[#000000] relative">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mb-14"
        >
          <span className="font-mono text-xs font-semibold tracking-widest uppercase text-[#FFD700] mb-2 block">
            OUR CURRENT ACTIVITIES
          </span>
          <h2 className="font-hyperbonnard text-3xl sm:text-4xl md:text-5xl tracking-wide uppercase text-[#FFFFFF]">
            What We Do
          </h2>
          <p className="mt-3 text-[#FFFFFF]/80 text-base">
            Equipping young people with daily spiritual rhythms and practical resources.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1 */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, delay: 0.1 }}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
            className="rounded-xl border border-[#000000]/15 bg-[#FFD700] p-8 flex flex-col justify-between hover:shadow-[0_12px_32px_rgba(255,215,0,0.3)] shadow-[0_4px_24px_rgba(0,0,0,0.35)] transition-all"
          >
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="p-3 rounded-lg bg-[#000000] text-[#FFD700] shadow-sm">
                  <BookOpenText className="h-5 w-5" />
                </div>
                <span className="font-mono text-xs font-bold text-[#000000] bg-[#000000]/10 border border-[#000000]/15 px-2.5 py-1 rounded">
                  Daily Rhythm
                </span>
              </div>
              <h3 className="font-hyperbonnard text-xl sm:text-2xl tracking-wide text-[#000000] uppercase mb-3">
                Daily Devotional Teachings
              </h3>
              <p className="text-sm text-[#222222] leading-relaxed font-sans">
                Scripture-based teachings designed to help young people spend meaningful time with God and apply His Word.
              </p>
            </div>
            <div className="pt-6 mt-6 border-t border-[#000000]/15 font-mono text-xs text-[#222222]">
              For personal devotion and daily application
            </div>
          </motion.div>

          {/* Card 2: Devotional E-Books with Actionable CTA */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, delay: 0.2 }}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
            className="rounded-xl border border-[#000000]/15 bg-[#FFD700] p-8 flex flex-col justify-between hover:shadow-[0_12px_32px_rgba(255,215,0,0.3)] shadow-[0_4px_24px_rgba(0,0,0,0.35)] transition-all"
          >
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="p-3 rounded-lg bg-[#000000] text-[#FFD700] shadow-sm">
                  <FileText className="h-5 w-5" />
                </div>
                <span className="font-mono text-xs font-bold text-[#000000] bg-[#000000]/10 border border-[#000000]/15 px-2.5 py-1 rounded">
                  Monthly Resource
                </span>
              </div>
              <h3 className="font-hyperbonnard text-xl sm:text-2xl tracking-wide text-[#000000] uppercase mb-3">
                Monthly Devotional E-Books
              </h3>
              <p className="text-sm text-[#222222] leading-relaxed font-sans mb-4">
                Devotional resources provided monthly for personal devotion and continued spiritual growth.
              </p>

              {onOpenEbook && (
                <button
                  type="button"
                  onClick={onOpenEbook}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#000000] text-[#FFD700] text-xs font-bold uppercase tracking-wider hover:bg-[#222222] transition-colors cursor-pointer"
                >
                  <span>Request E-Book</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              )}
            </div>
            <div className="pt-6 mt-6 border-t border-[#000000]/15 font-mono text-xs text-[#222222] flex items-center justify-between">
              <span>In-depth monthly study editions</span>
              <span className="font-bold">Free</span>
            </div>
          </motion.div>

          {/* Card 3 */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, delay: 0.3 }}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
            className="rounded-xl border border-[#000000]/15 bg-[#FFD700] p-8 flex flex-col justify-between hover:shadow-[0_12px_32px_rgba(255,215,0,0.3)] shadow-[0_4px_24px_rgba(0,0,0,0.35)] transition-all relative"
          >
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="p-3 rounded-lg bg-[#000000] text-[#FD7000] shadow-sm">
                  <Users className="h-5 w-5" />
                </div>
                <span className="font-mono text-xs font-bold text-[#000000] uppercase tracking-wider bg-[#000000]/10 border border-[#000000]/20 px-2.5 py-1 rounded">
                  Coming Soon
                </span>
              </div>
              <h3 className="font-hyperbonnard text-xl sm:text-2xl tracking-wide text-[#000000] uppercase mb-3">
                Weekly Bible Study
              </h3>
              <p className="text-sm text-[#222222] leading-relaxed font-sans">
                A weekly Bible study is currently being planned for deeper learning, discussion, and growth.
              </p>
            </div>
            <div className="pt-6 mt-6 border-t border-[#000000]/15 font-mono text-xs text-[#222222]">
              Interactive fellowship & verse-by-verse study
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
