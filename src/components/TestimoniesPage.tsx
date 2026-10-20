
import React, { useState } from 'react';
import { ArrowLeft, ChevronDown, ChevronUp } from 'lucide-react';
import { testimoniesData } from '../data/testimoniesData';

interface TestimoniesPageProps {
  onBack: () => void;
}

const PREVIEW_LIMIT = 420;

const getPreview = (text: string, limit: number): string => {
  if (text.length <= limit) return text;
  const cut = text.slice(0, limit);
  const lastSpace = cut.lastIndexOf(' ');
  const safeCut = lastSpace > 0 ? cut.slice(0, lastSpace) : cut;
  return `${safeCut}…`;
};

export const TestimoniesPage: React.FC<TestimoniesPageProps> = ({ onBack }) => {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  const toggle = (id: string) =>
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));

  return (
    <section className="min-h-screen bg-[#000000] text-[#FFFFFF] py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-1.5 mb-8 px-4 py-2 rounded-lg text-xs font-semibold text-[#FFFFFF]/80 hover:text-[#FFD700] bg-[#FFFFFF]/5 hover:bg-[#FFD700]/10 border border-[#FFD700]/20 transition-colors cursor-pointer"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Home</span>
        </button>

        <h1 className="font-hyperbonnard text-4xl sm:text-5xl lg:text-6xl tracking-wide uppercase text-[#FFD700] mb-4">
          Testimonies
        </h1>
        <p className="text-sm sm:text-base text-[#FFFFFF]/80 font-sans leading-relaxed mb-12 max-w-2xl">
          Read reflections and testimonies from members of THE DEVOTED ONES as they share how God's Word is shaping their walk with Him.
        </p>

        <div className="space-y-8 sm:space-y-10">
          {testimoniesData.map((t) => {
            const isLong = t.testimony.length > PREVIEW_LIMIT;
            const isOpen = !!expanded[t.id];
            const body = isLong && !isOpen ? getPreview(t.testimony, PREVIEW_LIMIT) : t.testimony;

            return (
              <article
                key={t.id}
                className="rounded-2xl border border-[#FFD700]/25 bg-[#000000] p-6 sm:p-8"
              >
                <h2 className="font-hyperbonnard text-2xl sm:text-3xl tracking-wide uppercase text-[#FFFFFF] mb-1">
                  {t.name}
                </h2>
                <p className="font-mono text-xs sm:text-sm uppercase tracking-wider text-[#FFD700] mb-4">
                  {t.devotional}
                </p>
                <p className="whitespace-pre-line text-sm sm:text-base text-[#FFFFFF]/90 font-sans leading-relaxed">
                  {body}
                </p>
                {isLong && (
                  <button
                    type="button"
                    onClick={() => toggle(t.id)}
                    className="mt-4 inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-[#FFD700] hover:text-[#FFFFFF] transition-colors cursor-pointer"
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
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};
