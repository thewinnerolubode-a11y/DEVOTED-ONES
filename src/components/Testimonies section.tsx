import React from 'react';
import { ArrowRight } from 'lucide-react';
import { testimoniesData } from '../data/testimoniesData';

interface TestimonialsSectionProps {
  onReadAll: () => void;
}

const PREVIEW_COUNT = 3;
const PREVIEW_LIMIT = 180;

const getPreview = (text: string, limit: number): string => {
  if (text.length <= limit) return text;
  const cut = text.slice(0, limit);
  const lastSpace = cut.lastIndexOf(' ');
  const safeCut = lastSpace > 0 ? cut.slice(0, lastSpace) : cut;
  return `${safeCut}…`;
};

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({ onReadAll }) => {
  const previews = testimoniesData.slice(0, PREVIEW_COUNT);

  return (
    <section className="bg-[#000000] text-[#FFFFFF] py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-hyperbonnard text-3xl sm:text-4xl lg:text-5xl tracking-wide uppercase text-[#FFD700] mb-3">
            Testimonies
          </h2>
          <p className="text-sm sm:text-base text-[#FFFFFF]/80 font-sans max-w-2xl mx-auto leading-relaxed">
            Reflections from members of THE DEVOTED ONES on how God's Word is shaping their walk with Him.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mb-12">
          {previews.map((t) => (
            <article
              key={t.id}
              className="rounded-2xl border border-[#FFD700]/25 bg-[#000000] p-6 flex flex-col"
            >
              <h3 className="font-hyperbonnard text-xl sm:text-2xl tracking-wide uppercase text-[#FFFFFF] mb-1">
                {t.name}
              </h3>
              <p className="font-mono text-xs uppercase tracking-wider text-[#FFD700] mb-3">
                {t.devotional}
              </p>
              <p className="text-sm text-[#FFFFFF]/85 font-sans leading-relaxed flex-1">
                {getPreview(t.testimony, PREVIEW_LIMIT)}
              </p>
            </article>
          ))}
        </div>

        <div className="text-center">
          <button
            type="button"
            onClick={onReadAll}
            className="inline-flex items-center gap-2 px-7 py-3 rounded-lg text-xs font-bold uppercase tracking-wider text-[#000000] bg-[#FFD700] hover:bg-[#FFFFFF] transition-all shadow-[0_4px_20px_rgba(255,215,0,0.25)] active:scale-[0.98] cursor-pointer"
          >
            <span>Read All Testimonies</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
