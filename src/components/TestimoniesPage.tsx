import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ChevronDown, ChevronUp, BookOpen, Sparkles, ArrowRight } from 'lucide-react';
import { testimoniesData } from '../data/testimoniesData';

interface TestimoniesPageProps {
  onBack: () => void;
  onOpenEbook?: () => void;
  onOpenJoin?: () => void;
}

const PREVIEW_LIMIT = 400;

const getPreview = (text: string, limit: number): string => {
  if (text.length <= limit) return text;
  const cut = text.slice(0, limit);
  const lastSpace = cut.lastIndexOf(' ');
  const safeCut = lastSpace > 0 ? cut.slice(0, lastSpace) : cut;
  return `${safeCut}…`;
};

export const TestimoniesPage: React.FC<TestimoniesPageProps> = ({ onBack, onOpenEbook, onOpenJoin }) => {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  const toggle = (id: string) =>
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));

  return (
    <section className="min-h-screen bg-black text-white py-12 sm:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Navigation Breadcrumb */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex items-center justify-between mb-8 pb-4 border-b border-white/10"
        >
          <button
            type="button"
            onClick={onBack}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold uppercase tracking-wider text-white/80 hover:text-[#FFD700] transition-colors cursor-pointer group"
          >
            <ArrowLeft className="h-4 w-4 text-[#FFD700] group-hover:-translate-x-1 transition-transform" />
            <span>Back to Home</span>
          </button>

          {onOpenEbook && (
            <button
              type="button"
              onClick={onOpenEbook}
              className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#FFD700] hover:underline cursor-pointer"
            >
              <BookOpen className="h-3.5 w-3.5" />
              <span>Get Devotional E-Book</span>
            </button>
          )}
        </motion.div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center sm:text-left"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#FFD700]/30 bg-[#FFD700]/10 text-[#FFD700] text-xs font-semibold uppercase tracking-widest mb-4">
            <Sparkles className="h-3.5 w-3.5" />
            <span>COMMUNITY REFLECTIONS</span>
          </div>

          <h1 className="font-hyperbonnard text-4xl sm:text-5xl lg:text-6xl tracking-wide uppercase text-white mb-4">
            Member Testimonies
          </h1>
          <p className="text-sm sm:text-base text-white/80 font-sans leading-relaxed max-w-2xl">
            Read authentic reflections and devotional learnings from members of THE DEVOTED ONES as they share how God's Word is transforming their daily walk.
          </p>
        </motion.div>

        {/* Testimonials List: Refined dark cards with gold accents (Reduced yellow dominance) */}
        <div className="space-y-6 sm:space-y-8">
          {testimoniesData.map((t, idx) => {
            const isLong = t.testimony.length > PREVIEW_LIMIT;
            const isOpen = !!expanded[t.id];
            const body = isLong && !isOpen ? getPreview(t.testimony, PREVIEW_LIMIT) : t.testimony;

            return (
              <motion.article
                key={t.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.04 }}
                className="rounded-2xl border border-white/15 bg-[#0e0e0e] p-6 sm:p-8 shadow-[0_8px_30px_rgba(0,0,0,0.6)] hover:border-[#FFD700]/40 transition-all"
              >
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 mb-3">
                  <h2 className="font-hyperbonnard text-2xl sm:text-3xl tracking-wide uppercase text-white">
                    {t.name}
                  </h2>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#FFD700]">
                    Devotional Reflection
                  </span>
                </div>

                <p className="text-xs sm:text-sm uppercase tracking-wider font-semibold text-[#FFD700] mb-5">
                  “{t.devotional}”
                </p>

                <p className="whitespace-pre-line text-sm sm:text-base text-white/85 font-sans leading-relaxed">
                  {body}
                </p>

                {isLong && (
                  <button
                    type="button"
                    onClick={() => toggle(t.id)}
                    className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-black bg-[#FFD700] hover:bg-white px-3.5 py-1.5 rounded-md transition-all cursor-pointer shadow-sm active:scale-95"
                  >
                    {isOpen ? (
                      <>
                        <span>Read Less</span>
                        <ChevronUp className="h-4 w-4" />
                      </>
                    ) : (
                      <>
                        <span>Read Full Testimony</span>
                        <ChevronDown className="h-4 w-4" />
                      </>
                    )}
                  </button>
                )}
              </motion.article>
            );
          })}
        </div>

        {/* Bottom CTA to Join the Community */}
        {onOpenJoin && (
          <div className="mt-14 p-8 rounded-2xl bg-[#0e0e0e] border border-[#FFD700]/30 text-center">
            <h3 className="font-hyperbonnard text-2xl uppercase tracking-wide text-white mb-2">
              Begin Your Story of Devotion
            </h3>
            <p className="text-xs sm:text-sm text-white/75 font-sans max-w-md mx-auto mb-6">
              Join young believers who are taking their daily walk with God seriously and building spiritual consistency together.
            </p>
            <button
              type="button"
              onClick={onOpenJoin}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-xs font-bold uppercase tracking-wider text-black bg-[#FFD700] hover:bg-white transition-colors cursor-pointer shadow-md"
            >
              <span>JOIN THE COMMUNITY</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
