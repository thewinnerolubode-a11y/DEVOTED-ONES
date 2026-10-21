import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Compass, TrendingUp, Sparkles } from 'lucide-react';

interface Pillar {
  number: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}

const pillars: Pillar[] = [
  {
    number: '01',
    title: 'LOVE GOD',
    description: 'Grow in relationship with God.',
    icon: Heart,
  },
  {
    number: '02',
    title: 'LIVE BY HIS WORD',
    description: 'Allow Scripture to shape everyday decisions and lifestyle.',
    icon: Compass,
  },
  {
    number: '03',
    title: 'PRIORITIZE GROWTH',
    description: 'Become intentional about spiritual and personal growth.',
    icon: TrendingUp,
  },
  {
    number: '04',
    title: 'LIVE EXCELLENTLY',
    description: 'Pursue excellence in the areas God has been entrusted to you.',
    icon: Sparkles,
  },
];

export const DevotedLife: React.FC = () => {
  return (
    <section id="devoted-life" className="py-20 md:py-24 border-t border-[#FFD700]/20 bg-[#000000]">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mb-14"
        >
          <span className="font-mono text-xs font-semibold tracking-widest uppercase text-[#FFD700] mb-2 block">
            CORE FOUNDATION
          </span>
          <h2 className="font-hyperbonnard text-3xl sm:text-4xl md:text-5xl tracking-wide uppercase text-[#FFFFFF]">
            The Devoted Life
          </h2>
          <p className="mt-3 text-[#FFFFFF]/80 text-base">
            Four commitments that shape who we are and how we grow together.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                className="group relative rounded-xl border border-[#000000]/15 bg-[#FFD700] p-7 transition-all duration-300 hover:shadow-[0_12px_32px_rgba(255,215,0,0.3)] shadow-[0_4px_24px_rgba(0,0,0,0.35)] cursor-default"
              >
                <div className="flex items-center justify-between mb-8">
                  <span className="font-mono text-sm tracking-wider font-extrabold text-[#000000]">
                    {pillar.number}
                  </span>
                  <div className="p-2.5 rounded-lg bg-[#000000] text-[#FFD700] shadow-sm transition-transform duration-300 group-hover:scale-105">
                    <Icon className="h-4 w-4" />
                  </div>
                </div>

                <h3 className="font-hyperbonnard text-xl sm:text-2xl tracking-wide text-[#000000] uppercase mb-3">
                  {pillar.title}
                </h3>

                <p className="text-sm text-[#222222] leading-relaxed font-normal">
                  {pillar.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
