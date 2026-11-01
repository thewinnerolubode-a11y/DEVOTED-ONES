import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, RotateCw, Sparkles } from 'lucide-react';
import { testimoniesData } from '../data/testimoniesData';

interface HomeTestimonialPreviewProps {
  onReadMoreTestimonies: () => void;
}

export const HomeTestimonialPreview: React.FC<HomeTestimonialPreviewProps> = ({
  onReadMoreTestimonies,
}) => {
  const [flippedCards, setFlippedCards] = useState<Record<string, boolean>>({});

  const toggleFlip = (id: string) => {
    setFlippedCards((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // Exactly 3 curated testimonies from existing dataset
  const threeTestimonials = testimoniesData.slice(0, 3);

  return (
    <section className="py-20 md:py-28 bg-black text-white relative border-t border-white/10">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-14"
        >
          <div>
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#FFD700] mb-2 block">
              MEMBER TESTIMONIES
            </span>
            <h2 className="font-hyperbonnard text-3xl sm:text-4xl md:text-5xl uppercase tracking-wide text-white">
              Real Stories of Transformation
            </h2>
            <p className="mt-2 text-white/75 text-sm sm:text-base font-sans font-normal max-w-xl">
              Encouraging reflections from young believers applying God’s Word daily. Click any card to flip.
            </p>
          </div>

          <button
            type="button"
            onClick={onReadMoreTestimonies}
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#FFD700] hover:text-white transition-colors cursor-pointer self-start sm:self-auto py-2 group"
          >
            <span>READ MORE TESTIMONIES</span>
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>

        {/* 3 Interactive Flip Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {threeTestimonials.map((t, idx) => {
            const isFlipped = !!flippedCards[t.id];
            return (
              <div
                key={t.id}
                className="perspective-1000 min-h-[360px] w-full cursor-pointer select-none"
                onClick={() => toggleFlip(t.id)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    toggleFlip(t.id);
                  }
                }}
                aria-label={`Testimony from ${t.name}. Press to flip.`}
              >
                <motion.div
                  className="relative w-full h-full transform-style-3d transition-transform duration-500 rounded-2xl"
                  animate={{ rotateY: isFlipped ? 180 : 0 }}
                  transition={{ duration: 0.5, ease: 'easeInOut' }}
                >
                  {/* FRONT */}
                  <div className="absolute inset-0 backface-hidden rounded-2xl border border-white/15 bg-[#0e0e0e] p-7 flex flex-col justify-between hover:border-[#FFD700]/50 transition-colors shadow-[0_10px_30px_rgba(0,0,0,0.6)]">
                    <div>
                      <div className="flex items-center justify-between mb-5">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-[#FFD700] bg-[#FFD700]/10 border border-[#FFD700]/25 px-2.5 py-1 rounded max-w-[210px] truncate">
                          {t.devotional}
                        </span>
                        <span className="text-white/40 text-xs font-medium">0{idx + 1}</span>
                      </div>

                      <h3 className="font-hyperbonnard text-xl sm:text-2xl uppercase tracking-wide text-white mb-2">
                        {t.name}
                      </h3>

                      <p className="text-xs sm:text-sm text-white/80 leading-relaxed font-sans italic line-clamp-5">
                        “{t.testimony.split('\n\n')[0]}”
                      </p>
                    </div>

                    <div className="pt-5 border-t border-white/10 flex items-center justify-between text-xs text-white/60">
                      <span className="inline-flex items-center gap-1.5 text-[#FFD700] font-semibold">
                        <RotateCw className="h-3.5 w-3.5" />
                        <span>Tap to flip</span>
                      </span>
                      <span className="text-[11px] text-white/40">Growth Reflection</span>
                    </div>
                  </div>

                  {/* BACK */}
                  <div className="absolute inset-0 backface-hidden rotate-y-180 rounded-2xl border border-[#FFD700]/40 bg-[#0a0a0a] p-7 flex flex-col justify-between shadow-[0_12px_36px_rgba(255,215,0,0.15)] overflow-y-auto">
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-xs font-bold uppercase tracking-wider text-[#FFD700]">
                          Spiritual Reflection
                        </span>
                        <span className="p-1 rounded-full bg-white/10 text-white">
                          <RotateCw className="h-3.5 w-3.5" />
                        </span>
                      </div>

                      <h3 className="font-hyperbonnard text-lg uppercase tracking-wide text-white mb-2">
                        {t.name} on “{t.devotional}”
                      </h3>

                      <p className="text-xs text-white/85 leading-relaxed font-sans mb-3">
                        {t.testimony.split('\n\n')[0]}
                      </p>

                      {t.testimony.split('\n\n')[1] && (
                        <div className="p-3 rounded-lg bg-black/80 border border-[#FFD700]/25 text-xs text-white/90 font-sans">
                          <span className="text-[#FFD700] font-bold block mb-1 uppercase tracking-wider text-[10px]">
                            Key Lesson
                          </span>
                          <span className="italic leading-normal">
                            “{t.testimony.split('\n\n')[1]}”
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs text-white/50">
                      <span>Tap to flip back</span>
                      <span className="text-[#FFD700] font-medium">The Devoted Ones</span>
                    </div>
                  </div>
                </motion.div>
              </div>
            );
          })}
        </div>

        <div className="text-center">
          <button
            type="button"
            onClick={onReadMoreTestimonies}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-white/20 text-xs font-bold uppercase tracking-wider text-white hover:text-black hover:bg-[#FFD700] hover:border-[#FFD700] transition-all cursor-pointer"
          >
            <span>READ MORE TESTIMONIES</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
