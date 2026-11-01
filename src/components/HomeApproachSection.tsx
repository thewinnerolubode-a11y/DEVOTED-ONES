import React from 'react';
import { motion } from 'framer-motion';
import prayerImage from '../assets/images/devoted_prayer_study_1792653318033.jpg';
import workImage from '../assets/images/devoted_excellence_work_1792654657307.jpg';
import circleImage from '../assets/images/devoted_circle_fellowship_1792654657721.jpg';

const APPROACH_ITEMS = [
  {
    number: '01',
    title: 'GROW IN THE WORD',
    tagline: 'Deepening Communion with God',
    description:
      'Build a consistent relationship with God through Scripture, devotion, prayer, and spiritual understanding.',
    image: prayerImage,
    alt: 'Quiet morning prayer with open Bible',
  },
  {
    number: '02',
    title: 'GROW IN LIFE',
    tagline: 'Character & Everyday Excellence',
    description:
      'Develop character, discipline, relationships, personal responsibility, and excellence.',
    image: workImage,
    alt: 'Young professional studying Scripture next to work laptop',
  },
  {
    number: '03',
    title: 'LIVE WITH PURPOSE',
    tagline: 'Leadership & Kingdom Influence',
    description:
      "Apply the principles of God's Word to everyday life, leadership, work, and influence.",
    image: circleImage,
    alt: 'Young believers discussing purpose and fellowship',
  },
];

export const HomeApproachSection: React.FC = () => {
  return (
    <section className="py-20 md:py-28 bg-black text-white relative border-t border-white/10">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16 md:mb-20"
        >
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#FFD700] mb-3 block">
            OUR APPROACH
          </span>

          <h2 className="font-hyperbonnard text-3xl sm:text-4xl md:text-5xl uppercase tracking-wide text-white mb-4">
            Whole-Life Transformation
          </h2>

          <p className="text-base sm:text-lg text-white/80 font-sans leading-relaxed">
            Christianity is not merely a Sunday habit. It is an intentional, everyday life of growth in God's presence.
          </p>
        </motion.div>

        {/* 3 Editorial Visual Panels (Alternating & Asymmetric Layout) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {APPROACH_ITEMS.map((item, idx) => (
            <motion.div
              key={item.number}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              className="flex flex-col rounded-2xl overflow-hidden border border-white/15 bg-[#0e0e0e] shadow-[0_12px_36px_rgba(0,0,0,0.7)] group hover:border-[#FFD700]/40 transition-colors"
            >
              {/* Large Image Container */}
              <div className="relative h-64 sm:h-72 w-full overflow-hidden">
                <img
                  src={item.image}
                  alt={item.alt}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e0e] via-black/30 to-transparent" />
                <div className="absolute top-4 left-4 bg-black/85 backdrop-blur-md px-3.5 py-1 rounded-lg border border-white/20 text-xs font-bold uppercase tracking-wider text-[#FFD700]">
                  {item.number}
                </div>
              </div>

              {/* Text Container */}
              <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#FFD700] block mb-1.5">
                    {item.tagline}
                  </span>
                  <h3 className="font-hyperbonnard text-2xl uppercase tracking-wide text-white mb-3">
                    {item.title}
                  </h3>
                  <p className="text-sm text-white/80 leading-relaxed font-sans font-normal">
                    {item.description}
                  </p>
                </div>

                <div className="pt-5 mt-5 border-t border-white/10 flex items-center justify-between text-xs text-white/60">
                  <span>Commitment {item.number}</span>
                  <span className="text-[#FFD700] font-semibold">The Devoted Ones</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
