import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, BookOpen, BookOpenText, FileText, Users, Sparkles } from 'lucide-react';
import heroImage from '../assets/images/devoted_circle_fellowship_1792654657721.jpg';
import prayerImage from '../assets/images/devoted_prayer_study_1792653318033.jpg';
import studyImage from '../assets/images/devoted_excellence_work_1792654657307.jpg';
import worshipImage from '../assets/images/devoted_worship_community_1792654655697.jpg';

interface ProgramsPageProps {
  onOpenJoin: () => void;
  onOpenEbook: () => void;
}

export const ProgramsPage: React.FC<ProgramsPageProps> = ({
  onOpenJoin,
  onOpenEbook,
}) => {
  return (
    <div className="bg-black text-white min-h-screen">
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[60vh] sm:min-h-[68vh] flex items-center justify-center overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 w-full h-full pointer-events-none">
          <img
            src={heroImage}
            alt="Young believers gathered in uplifting fellowship discussion"
            className="w-full h-full object-cover filter brightness-[0.45] contrast-[1.1]"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/55 to-black/80" />
          <div className="absolute inset-0 bg-radial from-[#FFD700]/10 via-transparent to-black/80" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-8 text-center py-16">
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#FFD700] mb-3 block">
            THE DEVOTED ONES
          </span>

          <h1 className="font-hyperbonnard text-4xl sm:text-5xl md:text-6xl lg:text-7xl uppercase tracking-wide text-white mb-5 leading-tight text-balance">
            COMMUNITY PROGRAMS & RHYTHMS
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-white/90 max-w-2xl mx-auto font-sans font-normal leading-relaxed text-balance">
            Spiritual disciplines, practical resources, and authentic fellowship environments designed to cultivate consistent Christian maturity.
          </p>
        </div>
      </section>

      {/* 2. DISTINCT VISUAL SECTIONS FOR EXISTING PROGRAMS */}
      <div className="divide-y divide-white/10">
        {/* PROGRAM 01: DAILY DEVOTIONAL TEACHINGS */}
        <section className="py-20 md:py-28">
          <div className="mx-auto max-w-6xl px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6 }}
                className="lg:col-span-6 relative order-2 lg:order-1"
              >
                <div className="relative rounded-2xl overflow-hidden border border-white/15 bg-[#0e0e0e] shadow-xl group">
                  <img
                    src={prayerImage}
                    alt="Young person in morning prayer and Bible meditation"
                    className="w-full h-full object-cover aspect-[4/3] transition-transform duration-700 group-hover:scale-[1.03]"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-white bg-black/90 backdrop-blur-md px-4 py-3 rounded-xl border border-white/15">
                    <span className="font-semibold">Morning Quiet Time & Prayer</span>
                    <span className="text-[#FFD700] font-bold uppercase tracking-wider">Every Morning</span>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6 }}
                className="lg:col-span-6 flex flex-col justify-center order-1 lg:order-2"
              >
                <span className="text-xs font-bold uppercase tracking-widest text-[#FFD700] mb-2 block">
                  PROGRAM 01 · DAILY DISCIPLESHIP
                </span>

                <h2 className="font-hyperbonnard text-3xl sm:text-4xl uppercase tracking-wide text-white mb-4">
                  Daily Devotional Teachings
                </h2>

                <p className="text-base text-white/80 font-sans leading-relaxed mb-6 font-normal">
                  Scripture-based teachings prepared specifically for young believers to develop unhurried morning communion with God. Each session combines scripture exposition, practical life reflection, and guided prayer points.
                </p>

                <div className="p-5 rounded-xl bg-[#0e0e0e] border border-[#FFD700]/25 mb-8 text-xs sm:text-sm text-white/90">
                  <span className="font-bold text-[#FFD700] block mb-1 uppercase tracking-wider">
                    Core Focus
                  </span>
                  Cultivating a daily personal quiet time before entering lectures, workspaces, or social interactions.
                </div>

                <div>
                  <button
                    type="button"
                    onClick={onOpenJoin}
                    className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider text-black bg-[#FFD700] hover:bg-white transition-all cursor-pointer shadow-md"
                  >
                    <span>JOIN TO RECEIVE TEACHINGS</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* PROGRAM 02: MONTHLY DEVOTIONAL E-BOOKS */}
        <section className="py-20 md:py-28 bg-[#070707]">
          <div className="mx-auto max-w-6xl px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6 }}
                className="lg:col-span-6 flex flex-col justify-center"
              >
                <span className="text-xs font-bold uppercase tracking-widest text-[#FFD700] mb-2 block">
                  PROGRAM 02 · STUDY RESOURCES
                </span>

                <h2 className="font-hyperbonnard text-3xl sm:text-4xl uppercase tracking-wide text-white mb-4">
                  Monthly Devotional E-Books
                </h2>

                <p className="text-base text-white/80 font-sans leading-relaxed mb-6 font-normal">
                  In-depth monthly study editions designed to guide believers through focused biblical themes, personal study notes, practical application exercises, and devotional reflection questions.
                </p>

                <div className="p-5 rounded-xl bg-[#0e0e0e] border border-[#FFD700]/25 mb-8 text-xs sm:text-sm text-white/90">
                  <span className="font-bold text-[#FFD700] block mb-1 uppercase tracking-wider">
                    Format & Availability
                  </span>
                  Free digital PDF editions released each month. Ready for smartphones, tablets, and laptops.
                </div>

                <div className="flex flex-wrap gap-4">
                  <button
                    type="button"
                    onClick={onOpenEbook}
                    className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider text-black bg-[#FFD700] hover:bg-white transition-all cursor-pointer shadow-md"
                  >
                    <BookOpen className="h-4 w-4" />
                    <span>GET THE DEVOTIONAL E-BOOK</span>
                  </button>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6 }}
                className="lg:col-span-6 relative"
              >
                <div className="relative rounded-2xl overflow-hidden border border-[#FFD700]/30 bg-[#0e0e0e] shadow-xl group">
                  <img
                    src={studyImage}
                    alt="Young student with Bible and laptop in morning study"
                    className="w-full h-full object-cover aspect-[4/3] transition-transform duration-700 group-hover:scale-[1.03]"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute top-4 left-4 bg-[#FFD700] text-black text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow">
                    Free Digital Edition
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* PROGRAM 03: CELL FELLOWSHIPS & CIRCLES */}
        <section className="py-20 md:py-28">
          <div className="mx-auto max-w-6xl px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6 }}
                className="lg:col-span-6 relative order-2 lg:order-1"
              >
                <div className="relative rounded-2xl overflow-hidden border border-white/15 bg-[#0e0e0e] shadow-xl group">
                  <img
                    src={heroImage}
                    alt="Young believers in interactive small group fellowship"
                    className="w-full h-full object-cover aspect-[4/3] transition-transform duration-700 group-hover:scale-[1.03]"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-white bg-black/90 backdrop-blur-md px-4 py-3 rounded-xl border border-white/15">
                    <span className="font-semibold">Weekly Campus & Workplace Cells</span>
                    <span className="text-[#FFD700] font-bold uppercase tracking-wider">Small Groups</span>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6 }}
                className="lg:col-span-6 flex flex-col justify-center order-1 lg:order-2"
              >
                <span className="text-xs font-bold uppercase tracking-widest text-[#FFD700] mb-2 block">
                  PROGRAM 03 · COMMUNITY CELLS
                </span>

                <h2 className="font-hyperbonnard text-3xl sm:text-4xl uppercase tracking-wide text-white mb-4">
                  Cell Fellowships & Discussion Circles
                </h2>

                <p className="text-base text-white/80 font-sans leading-relaxed mb-6 font-normal">
                  Intimate physical and online discussion circles meeting weekly. A space where young people can ask candid questions about the Christian faith, pray for each other's challenges, and build authentic godly friendships.
                </p>

                <div className="p-5 rounded-xl bg-[#0e0e0e] border border-[#FFD700]/25 mb-8 text-xs sm:text-sm text-white/90">
                  <span className="font-bold text-[#FFD700] block mb-1 uppercase tracking-wider">
                    Community Culture
                  </span>
                  No pretense or judgment. Safe, encouraging, scripture-grounded environments focused on mutual spiritual growth.
                </div>

                <div>
                  <button
                    type="button"
                    onClick={onOpenJoin}
                    className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider text-black bg-[#FFD700] hover:bg-white transition-all cursor-pointer shadow-md"
                  >
                    <span>FIND A CELL NEAR YOU</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* PROGRAM 04: COMMUNITY WORSHIP & PRAYER VIGILS */}
        <section className="py-20 md:py-28 bg-[#070707]">
          <div className="mx-auto max-w-6xl px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6 }}
                className="lg:col-span-6 flex flex-col justify-center"
              >
                <span className="text-xs font-bold uppercase tracking-widest text-[#FFD700] mb-2 block">
                  PROGRAM 04 · WORSHIP & PRAYER
                </span>

                <h2 className="font-hyperbonnard text-3xl sm:text-4xl uppercase tracking-wide text-white mb-4">
                  Prayer Gatherings & Special Fellowships
                </h2>

                <p className="text-base text-white/80 font-sans leading-relaxed mb-6 font-normal">
                  Extended times of collective worship, intercession, and seeking God's presence together. These gatherings ignite spiritual passion, align our hearts with God's purpose, and build deep spiritual endurance.
                </p>

                <div className="p-5 rounded-xl bg-[#0e0e0e] border border-[#FFD700]/25 mb-8 text-xs sm:text-sm text-white/90">
                  <span className="font-bold text-[#FFD700] block mb-1 uppercase tracking-wider">
                    United Atmosphere
                  </span>
                  Raising young people who are bold in prayer, sensitive to the Holy Spirit, and spiritually robust.
                </div>

                <div>
                  <button
                    type="button"
                    onClick={onOpenJoin}
                    className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider text-black bg-[#FFD700] hover:bg-white transition-all cursor-pointer shadow-md"
                  >
                    <span>CONNECT WITH THE COMMUNITY</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6 }}
                className="lg:col-span-6 relative"
              >
                <div className="relative rounded-2xl overflow-hidden border border-white/15 bg-[#0e0e0e] shadow-xl group">
                  <img
                    src={worshipImage}
                    alt="Young believers worshipping together with passion and joy"
                    className="w-full h-full object-cover aspect-[4/3] transition-transform duration-700 group-hover:scale-[1.03]"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </div>

      {/* 3. CLOSING CTA BANNER */}
      <section className="py-20 md:py-28 border-t border-white/10 text-center">
        <div className="mx-auto max-w-3xl px-6 lg:px-8">
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#FFD700] mb-3 block">
            TAKE THE NEXT STEP
          </span>
          <h2 className="font-hyperbonnard text-3xl sm:text-4xl md:text-5xl uppercase tracking-wide text-white mb-4">
            Become Part of What God is Doing
          </h2>
          <p className="text-base text-white/80 font-sans mb-8">
            Whether you want to start receiving daily morning devotionals or join a weekly fellowship circle, you are warmly welcome.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              type="button"
              onClick={onOpenJoin}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider text-black bg-[#FFD700] hover:bg-white transition-all shadow-md cursor-pointer"
            >
              <span>JOIN THE COMMUNITY</span>
              <ArrowRight className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={onOpenEbook}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider text-white hover:text-black bg-black/60 hover:bg-[#FFD700] border border-[#FFD700]/50 rounded-xl transition-all cursor-pointer"
            >
              <BookOpen className="h-4 w-4 text-[#FFD700]" />
              <span>GET THE DEVOTIONAL</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
