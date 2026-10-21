import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ChevronDown, ChevronUp, BookOpen, Sparkles } from 'lucide-react';
import { testimoniesData } from '../data/testimoniesData';

interface TestimoniesPageProps {
  onBack: () => void;
  onOpenEbook?: () => void;
}

const PREVIEW_LIMIT = 420;

const getPreview = (text: string, limit: number): string => {
  if (text.length <= limit) return text;
  const cut = text.slice(0, limit);
  const lastSpace = cut.lastIndexOf(' ');
  const safeCut = lastSpace > 0 ? cut.slice(0, lastSpace) : cut;
  return `${safeCut}…`;
};

export const TestimoniesPage: React.FC<TestimoniesPageProps> = ({ onBack, onOpenEbook }) => {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  const toggle = (id: string) =>
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));

  return (
    <section className="min-h-screen bg-[#000000] text-[#FFFFFF] py-12 sm:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Navigation Breadcrumb */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex items-center justify-between mb-8 pb-4 border-b border-[#FFD700]/20"
        >
          <button
            type="button"
            onClick={onBack}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-mono uppercase tracking-wider text-[#FFFFFF]/80 hover:text-[#FFD700] transition-colors cursor-pointer group"
          >
            <ArrowLeft className="h-4 w-4 text-[#FFD700] group-hover:-translate-x-1 transition-transform" />
            <span>Back to Home</span>
          </button>

          {onOpenEbook && (
            <button
              type="button"
              onClick={onOpenEbook}
              className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-[#FFD700] hover:underline cursor-pointer"
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
          className="mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#FFD700]/30 bg-[#FFD700]/10 text-[#FFD700] font-mono text-xs uppercase tracking-widest mb-4">
            <Sparkles className="h-3.5 w-3.5" />
            <span>COMMUNITY REFLECTIONS</span>
          </div>

          <h1 className="font-hyperbonnard text-4xl sm:text-5xl lg:text-6xl tracking-wide uppercase text-[#FFD700] mb-4">
            Testimonies
          </h1>
          <p className="text-sm sm:text-base text-[#FFFFFF]/85 font-sans leading-relaxed max-w-2xl">
            Read reflections and testimonies from members of THE DEVOTED ONES as they share how God's Word is shaping their daily walk with Him.
          </p>
        </motion.div>

        {/* Testimonials List */}
        <div className="space-y-8 sm:space-y-10">
          {testimoniesData.map((t, idx) => {
            const isLong = t.testimony.length > PREVIEW_LIMIT;
            const isOpen = !!expanded[t.id];
            const body = isLong && !isOpen ? getPreview(t.testimony, PREVIEW_LIMIT) : t.testimony;

            return (
              <motion.article
                key={t.id}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.06 }}
                className="rounded-2xl border border-[#000000]/15 bg-[#FFD700] p-6 sm:p-8 shadow-[0_4px_24px_rgba(0,0,0,0.35)] hover:shadow-[0_12px_32px_rgba(255,215,0,0.3)] transition-all"
              >
                <h2 className="font-hyperbonnard text-2xl sm:text-3xl tracking-wide uppercase text-[#000000] mb-1">
                  {t.name}
                </h2>
                <p className="font-mono text-xs sm:text-sm uppercase tracking-wider font-bold text-[#000000]/80 mb-4">
                  {t.devotional}
                </p>
                <p className="whitespace-pre-line text-sm sm:text-base text-[#222222] font-sans leading-relaxed">
                  {body}
                </p>
                {isLong && (
                  <button
                    type="button"
                    onClick={() => toggle(t.id)}
                    className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#FFD700] bg-[#000000] hover:bg-[#222222] px-3.5 py-1.5 rounded-md transition-all cursor-pointer shadow-sm active:scale-95"
                  >
                    {isOpen ? (
                      <>
                        <span>Read Less</span>
                        <ChevronUp className="h-4 w-4" />
                      </>
                    ) : (
                      <>
                        <span>Read More</span>
                        <ChevronDown className="h-4 w-4" />
                      </>
                    )}
                  </button>
                )}
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
};
