import React from 'react';
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
        <div className="max-w-2xl mb-14">
          <span className="font-mono text-xs font-semibold tracking-widest uppercase text-[#FFD700] mb-2 block">
            CORE FOUNDATION
          </span>
          <h2 className="font-hyperbonnard text-3xl sm:text-4xl md:text-5xl tracking-wide uppercase text-[#FFFFFF]">
            The Devoted Life
          </h2>
          <p className="mt-3 text-[#FFFFFF]/80 text-base">
            Four commitments that shape who we are and how we grow together.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.title}
                className="group relative rounded-xl border border-[#FFD700]/25 bg-[#000000] p-7 transition-all duration-300 hover:border-[#FFD700] hover:shadow-[0_0_20px_rgba(255,215,0,0.1)]"
              >
                <div className="flex items-center justify-between mb-8">
                  <span className="font-mono text-xs tracking-wider text-[#FFD700] font-bold">
                    {pillar.number}
                  </span>
                  <div className="p-2.5 rounded-lg bg-[#FFD700]/10 text-[#FFD700] group-hover:bg-[#FFD700] group-hover:text-[#000000] transition-colors">
                    <Icon className="h-4 w-4" />
                  </div>
                </div>

                <h3 className="font-hyperbonnard text-xl sm:text-2xl tracking-wide text-[#FFFFFF] group-hover:text-[#FFD700] uppercase mb-3 transition-colors">
                  {pillar.title}
                </h3>

                <p className="text-sm text-[#FFFFFF]/80 leading-relaxed font-normal">
                  {pillar.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
