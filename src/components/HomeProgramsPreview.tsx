import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, BookOpenText, FileText, Users } from 'lucide-react';
import studyImage from '../assets/images/devoted_excellence_work_1792654657307.jpg';
import circleImage from '../assets/images/devoted_circle_fellowship_1792654657721.jpg';
import prayerImage from '../assets/images/devoted_prayer_study_1792653318033.jpg';

interface HomeProgramsPreviewProps {
  onViewAllPrograms: () => void;
  onOpenEbook: () => void;
  onOpenJoin: () => void;
}

export const HomeProgramsPreview: React.FC<HomeProgramsPreviewProps> = ({
  onViewAllPrograms,
  onOpenEbook,
  onOpenJoin,
}) => {
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
              OUR PROGRAMS
            </span>
            <h2 className="font-hyperbonnard text-3xl sm:text-4xl md:text-5xl uppercase tracking-wide text-white">
              Spiritual Rhythms & Gatherings
            </h2>
            <p className="mt-2 text-white/75 text-sm sm:text-base font-sans font-normal max-w-xl">
              Practical community expressions built to sustain your daily walk with God.
            </p>
          </div>

          <button
            type="button"
            onClick={onViewAllPrograms}
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#FFD700] hover:text-white transition-colors cursor-pointer self-start sm:self-auto py-2 group"
          >
            <span>VIEW ALL PROGRAMS</span>
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>

        {/* 3 Programs Grid with Photography and Clear CTAs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Program 1: Daily Devotionals */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="rounded-2xl border border-white/15 bg-[#0e0e0e] overflow-hidden flex flex-col justify-between shadow-[0_10px_30px_rgba(0,0,0,0.6)] group hover:border-[#FFD700]/40 transition-colors"
          >
            <div className="relative h-48 w-full overflow-hidden">
              <img
                src={prayerImage}
                alt="Daily devotional prayer and quiet time"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e0e] to-transparent" />
              <div className="absolute top-4 left-4 p-2 rounded-xl bg-black/85 border border-white/20 text-[#FFD700]">
                <BookOpenText className="h-5 w-5" />
              </div>
            </div>

            <div className="p-6 flex-1 flex flex-col justify-between">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#FFD700] block mb-1.5">
                  Daily Rhythm
                </span>
                <h3 className="font-hyperbonnard text-2xl uppercase tracking-wide text-white mb-2.5">
                  Daily Devotional Teachings
                </h3>
                <p className="text-xs sm:text-sm text-white/75 leading-relaxed font-sans mb-6">
                  Scripture-based morning teachings designed to help you spend meaningful time with God and practically apply His Word to your day.
                </p>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <button
                  type="button"
                  onClick={onOpenJoin}
                  className="text-xs font-bold uppercase tracking-wider text-[#FFD700] hover:text-white transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <span>Receive Daily Teachings</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          </motion.div>

          {/* Program 2: Monthly Devotional E-Books */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="rounded-2xl border border-[#FFD700]/30 bg-[#0e0e0e] overflow-hidden flex flex-col justify-between shadow-[0_12px_36px_rgba(255,215,0,0.12)] group hover:border-[#FFD700] transition-colors relative"
          >
            <div className="relative h-48 w-full overflow-hidden">
              <img
                src={studyImage}
                alt="Monthly devotional study e-book on desk"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e0e] to-transparent" />
              <div className="absolute top-4 left-4 p-2 rounded-xl bg-black/85 border border-[#FFD700]/40 text-[#FFD700]">
                <FileText className="h-5 w-5" />
              </div>
              <div className="absolute top-4 right-4 bg-[#FFD700] text-black text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded">
                Free E-Book
              </div>
            </div>

            <div className="p-6 flex-1 flex flex-col justify-between">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#FFD700] block mb-1.5">
                  Monthly Resource
                </span>
                <h3 className="font-hyperbonnard text-2xl uppercase tracking-wide text-white mb-2.5">
                  Monthly Devotional E-Books
                </h3>
                <p className="text-xs sm:text-sm text-white/80 leading-relaxed font-sans mb-6">
                  Comprehensive study editions published monthly to provide structured, progressive spiritual depth throughout the year.
                </p>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <button
                  type="button"
                  onClick={onOpenEbook}
                  className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-bold uppercase tracking-wider text-black bg-[#FFD700] hover:bg-white transition-colors cursor-pointer"
                >
                  <span>GET THE DEVOTIONAL</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          </motion.div>

          {/* Program 3: Cell Fellowships */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="rounded-2xl border border-white/15 bg-[#0e0e0e] overflow-hidden flex flex-col justify-between shadow-[0_10px_30px_rgba(0,0,0,0.6)] group hover:border-[#FFD700]/40 transition-colors"
          >
            <div className="relative h-48 w-full overflow-hidden">
              <img
                src={circleImage}
                alt="Young believers gathered in cell fellowship"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e0e] to-transparent" />
              <div className="absolute top-4 left-4 p-2 rounded-xl bg-black/85 border border-white/20 text-[#FFD700]">
                <Users className="h-5 w-5" />
              </div>
            </div>

            <div className="p-6 flex-1 flex flex-col justify-between">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#FFD700] block mb-1.5">
                  Weekly Gathering
                </span>
                <h3 className="font-hyperbonnard text-2xl uppercase tracking-wide text-white mb-2.5">
                  Cell Fellowships & Circles
                </h3>
                <p className="text-xs sm:text-sm text-white/75 leading-relaxed font-sans mb-6">
                  Small physical and online circles on campuses and workplaces for authentic discussions, prayer, and mutual accountability.
                </p>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <button
                  type="button"
                  onClick={onOpenJoin}
                  className="text-xs font-bold uppercase tracking-wider text-[#FFD700] hover:text-white transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <span>Connect With a Cell</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
