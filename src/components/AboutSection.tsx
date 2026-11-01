import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  BookOpenText,
  FileText,
  Users,
  ArrowRight,
  RotateCw,
  CheckCircle2,
  Sparkles,
  ExternalLink,
} from 'lucide-react';
import fellowshipImage from '../assets/images/devoted_youth_fellowship_1792653302664.jpg';
import studyWorkImage from '../assets/images/devoted_excellence_work_1792654657307.jpg';
import worshipImage from '../assets/images/devoted_worship_community_1792654655697.jpg';
import circleImage from '../assets/images/devoted_circle_fellowship_1792654657721.jpg';
import { testimoniesData } from '../data/testimoniesData';

interface AboutSectionProps {
  onOpenEbook: () => void;
  onOpenTestimonies: () => void;
  onOpenJoin: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({
  onOpenEbook,
  onOpenTestimonies,
  onOpenJoin,
}) => {
  // Flip state for the 3 curated testimonials
  const [flippedCards, setFlippedCards] = useState<Record<string, boolean>>({});

  const toggleFlip = (id: string) => {
    setFlippedCards((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // 3 Curated Testimonials: Ruth Oluwanifemi, Oyeniyi Taiwo Joshua, Samuel Ifeoluwa
  const curatedTestimonials = testimoniesData.slice(0, 3);

  return (
    <section id="about" className="py-20 md:py-28 bg-black text-white relative border-t border-white/10">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        {/* ========================================================= */}
        {/* SECTION HEADER: EDITORIAL INTRO                           */}
        {/* ========================================================= */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-20 md:mb-28"
        >
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#FFD700] mb-3 block">
            ABOUT THE DEVOTED ONES
          </span>

          <h2 className="font-hyperbonnard text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-wide uppercase text-white mb-5 text-balance">
            More Than a Devotional. A Life of Devotion.
          </h2>

          <p className="text-base sm:text-lg text-white/85 font-sans leading-relaxed text-balance">
            THE DEVOTED ONES is a Christian community where spiritual depth meets personal development, faith inspires excellence, and young people are equipped to impact their world for Christ.
          </p>

          {/* Quick Chapter Anchors */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-xs font-semibold uppercase tracking-wider text-white/70">
            <a
              href="#who-we-are"
              className="hover:text-[#FFD700] hover:border-[#FFD700]/50 transition-colors py-1.5 px-3 rounded-lg bg-white/5 border border-white/10"
            >
              1. Who We Are
            </a>
            <span className="text-[#FFD700]">→</span>
            <a
              href="#what-we-do"
              className="hover:text-[#FFD700] hover:border-[#FFD700]/50 transition-colors py-1.5 px-3 rounded-lg bg-white/5 border border-white/10"
            >
              2. What We Do
            </a>
            <span className="text-[#FFD700]">→</span>
            <a
              href="#testimonials"
              className="hover:text-[#FFD700] hover:border-[#FFD700]/50 transition-colors py-1.5 px-3 rounded-lg bg-white/5 border border-white/10"
            >
              3. Member Reflections
            </a>
          </div>
        </motion.div>

        {/* ========================================================= */}
        {/* CHAPTER 1: WHO WE ARE (SPLIT EDITORIAL LAYOUT)            */}
        {/* ========================================================= */}
        <div id="who-we-are" className="mb-24 md:mb-32 scroll-mt-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Visual Column with authentic community photo & overlapping badge */}
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-6 relative"
            >
              <div className="relative rounded-2xl overflow-hidden border border-white/15 bg-[#0e0e0e] shadow-[0_16px_40px_rgba(0,0,0,0.8)] group">
                <img
                  src={fellowshipImage}
                  alt="Young Christian university students gathered in warm fellowship studying scripture"
                  className="w-full h-full object-cover aspect-[4/3] transition-transform duration-700 group-hover:scale-[1.03]"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none" />

                {/* Overlapping Content Ribbon */}
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-white bg-black/90 backdrop-blur-md px-4 py-3 rounded-xl border border-white/15 shadow-lg">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-[#FFD700] animate-pulse" />
                    <span className="font-semibold text-white">Genuine Christian Fellowship</span>
                  </div>
                  <span className="text-[#FFD700] text-xs font-bold uppercase tracking-wider">
                    Iron Sharpens Iron
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Editorial Text Column */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-6 flex flex-col justify-center"
            >
              <span className="text-xs font-bold uppercase tracking-widest text-[#FFD700] mb-2 block">
                CHAPTER 01 · WHO WE ARE
              </span>

              <h3 className="font-hyperbonnard text-2xl sm:text-3xl md:text-4xl uppercase tracking-wide text-white mb-4 leading-tight">
                No Casual Christianity. Intentional Devotion.
              </h3>

              <p className="text-base text-white/80 font-sans leading-relaxed mb-6 font-normal">
                Many young believers desire a genuine relationship with God, but struggle with inconsistency, isolation, and spiritual distractions. We created THE DEVOTED ONES to bridge that gap.
              </p>

              {/* Callout Box */}
              <div className="p-5 sm:p-6 rounded-xl bg-[#0e0e0e] border border-[#FFD700]/25 mb-6">
                <p className="text-white font-medium text-sm sm:text-base leading-relaxed">
                  “We exist to help you move from being inconsistent in your walk with God and in other areas of life to becoming a devoted person who prioritizes growth and is continually maturing.”
                </p>
              </div>

              {/* 4 Pillars Grid */}
              <div className="grid grid-cols-2 gap-3 text-xs font-semibold uppercase tracking-wider text-white/85 mb-7">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-[#FFD700] shrink-0" />
                  <span>Scripture-Led Rhythms</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-[#FFD700] shrink-0" />
                  <span>Spiritual Accountability</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-[#FFD700] shrink-0" />
                  <span>Real Discipleship</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-[#FFD700] shrink-0" />
                  <span>Kingdom Excellence</span>
                </div>
              </div>

              <div>
                <button
                  type="button"
                  onClick={onOpenJoin}
                  className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#FFD700] hover:text-white transition-colors cursor-pointer group"
                >
                  <span>Become part of our story</span>
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* CHAPTER 2: WHAT WE DO (ASYMMETRIC VISUAL SHOWCASE)        */}
        {/* ========================================================= */}
        <div id="what-we-do" className="mb-24 md:mb-32 scroll-mt-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl mb-12"
          >
            <span className="text-xs font-bold uppercase tracking-widest text-[#FFD700] mb-2 block">
              CHAPTER 02 · WHAT WE DO
            </span>
            <h3 className="font-hyperbonnard text-2xl sm:text-3xl md:text-4xl uppercase tracking-wide text-white">
              Daily Spiritual Rhythms & Practical Resources
            </h3>
            <p className="mt-2 text-white/75 text-sm sm:text-base font-sans font-normal">
              Three core expressions designed to nurture steady daily fellowship with God.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* FEATURED HERO CARD (Large Left Side): Monthly Devotional E-Books with Study Photo */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-7 rounded-2xl border border-[#FFD700]/30 bg-[#0e0e0e] overflow-hidden flex flex-col justify-between shadow-[0_12px_36px_rgba(0,0,0,0.8)] relative group"
            >
              <div className="relative h-60 sm:h-72 w-full overflow-hidden">
                <img
                  src={studyWorkImage}
                  alt="Young Christian student with open Bible and study notebook in morning light"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e0e] via-black/40 to-transparent" />
                <div className="absolute top-4 left-4">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#FFD700] text-black">
                    <Sparkles className="h-3.5 w-3.5" />
                    Featured Resource
                  </span>
                </div>
              </div>

              <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="font-hyperbonnard text-2xl sm:text-3xl uppercase tracking-wide text-white mb-2">
                    Monthly Devotional E-Books
                  </h4>
                  <p className="text-sm text-white/80 leading-relaxed font-sans mb-6">
                    In-depth scripture study editions published every month to provide progressive, structured spiritual depth throughout the year. Includes quiet-time guides and reflection questions.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pt-6 border-t border-white/10">
                  <span className="text-xs text-white/60 font-medium">
                    Free PDF Edition Available Monthly
                  </span>
                  <button
                    type="button"
                    onClick={onOpenEbook}
                    className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-xs font-bold uppercase tracking-wider text-black bg-[#FFD700] hover:bg-white transition-all shadow-[0_4px_20px_rgba(255,215,0,0.25)] active:scale-[0.98] cursor-pointer"
                  >
                    <span>GET DEVOTIONAL E-BOOK</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </motion.div>

            {/* RIGHT SIDE STACK: Daily Teachings & Cell Fellowships */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              {/* Stack 1: Daily Devotionals */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="rounded-2xl border border-white/15 bg-[#0e0e0e] p-6 sm:p-7 flex-1 flex flex-col justify-between hover:border-[#FFD700]/40 transition-colors shadow-md"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-2.5 rounded-xl bg-black border border-white/10 text-[#FFD700]">
                      <BookOpenText className="h-5 w-5" />
                    </div>
                    <span className="text-xs font-semibold uppercase tracking-wider text-[#FFD700] bg-[#FFD700]/10 border border-[#FFD700]/25 px-2.5 py-1 rounded">
                      Every Morning
                    </span>
                  </div>

                  <h4 className="font-hyperbonnard text-xl sm:text-2xl uppercase tracking-wide text-white mb-2">
                    Daily Devotional Teachings
                  </h4>

                  <p className="text-xs sm:text-sm text-white/75 leading-relaxed font-sans">
                    Practical, scripture-grounded teachings delivered every morning to ground your thoughts in God’s Word before daily responsibilities begin.
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-white/10 text-xs text-white/60 font-sans">
                  Focused on prayer intimacy and personal meditation
                </div>
              </motion.div>

              {/* Stack 2: Cell Fellowships with Circle Photo Thumbnail */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="rounded-2xl border border-white/15 bg-[#0e0e0e] p-6 sm:p-7 flex-1 flex flex-col justify-between hover:border-[#FFD700]/40 transition-colors shadow-md relative overflow-hidden"
              >
                <div className="flex items-start gap-4">
                  <div className="h-16 w-16 sm:h-20 sm:w-20 rounded-xl overflow-hidden shrink-0 border border-white/10">
                    <img
                      src={circleImage}
                      alt="Small group Bible fellowship circle"
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-[#FFD700]">
                        Weekly Fellowship
                      </span>
                    </div>
                    <h4 className="font-hyperbonnard text-lg sm:text-xl uppercase tracking-wide text-white">
                      Cell Discussions & Community
                    </h4>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-white/75 leading-relaxed font-sans mt-3">
                  Campus and workplace cell groups meeting weekly to unpack scripture questions, pray together, and hold each other accountable.
                </p>

                <div className="pt-4 mt-4 border-t border-white/10 flex items-center justify-between text-xs text-white/60 font-sans">
                  <span>Interactive & Discussion-Based</span>
                  <button
                    type="button"
                    onClick={onOpenJoin}
                    className="text-[#FFD700] hover:underline font-semibold"
                  >
                    Join a Cell →
                  </button>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* FULL-WIDTH VISUAL BREAK: WORSHIP & PURPOSE MOMENT         */}
        {/* ========================================================= */}
        <div className="mb-24 md:mb-32 relative rounded-3xl overflow-hidden border border-white/15 shadow-[0_20px_50px_rgba(0,0,0,0.9)]">
          <div className="relative min-h-[380px] sm:min-h-[440px] flex items-center justify-center p-8 sm:p-14 text-center">
            {/* High-Impact Photographic Background */}
            <img
              src={worshipImage}
              alt="Passionate young believers worshipping together with raised hands in deep devotion"
              className="absolute inset-0 w-full h-full object-cover filter brightness-[0.45] contrast-[1.15]"
              loading="lazy"
            />
            {/* Atmospheric Overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/80" />
            <div className="absolute inset-0 bg-radial from-[#FFD700]/15 via-transparent to-black/70" />

            {/* Content over image */}
            <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center">
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#FFD700] mb-3">
                NOT CASUAL BELIEVERS. DEVOTED DISCIPLES.
              </span>

              <h3 className="font-hyperbonnard text-3xl sm:text-4xl md:text-5xl uppercase tracking-wide text-white mb-4 leading-tight">
                Where Faith Meets Everyday Excellence.
              </h3>

              <p className="text-sm sm:text-base md:text-lg text-white/90 max-w-xl mx-auto mb-8 font-normal leading-relaxed">
                “Raising a generation of devoted people who live by God’s Word, grow in every area of life, and become examples others can emulate.”
              </p>

              <button
                type="button"
                onClick={onOpenJoin}
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider text-black bg-[#FFD700] hover:bg-white transition-all shadow-[0_4px_25px_rgba(255,215,0,0.35)] active:scale-[0.98] cursor-pointer"
              >
                <span>JOIN THE COMMUNITY</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* CHAPTER 3: MEMBER REFLECTIONS (INTERACTIVE 3D FLIP CARDS) */}
        {/* ========================================================= */}
        <div id="testimonials" className="scroll-mt-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5 }}
            className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12"
          >
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#FFD700] mb-2 block">
                CHAPTER 03 · MEMBER REFLECTIONS
              </span>
              <h3 className="font-hyperbonnard text-2xl sm:text-3xl md:text-4xl uppercase tracking-wide text-white">
                Stories of Growth & Devotion
              </h3>
              <p className="mt-2 text-white/75 text-sm sm:text-base font-sans font-normal">
                Real reflections from young believers building spiritual consistency. Click any card to flip.
              </p>
            </div>

            <button
              type="button"
              onClick={onOpenTestimonies}
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#FFD700] hover:text-white transition-colors cursor-pointer self-start sm:self-auto py-2 group"
            >
              <span>READ ALL TESTIMONIES</span>
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>

          {/* Exactly 3 Interactive 3D Flip Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {curatedTestimonials.map((t, idx) => {
              const isFlipped = !!flippedCards[t.id];
              return (
                <div
                  key={t.id}
                  className="perspective-1000 min-h-[380px] w-full cursor-pointer select-none"
                  onClick={() => toggleFlip(t.id)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      toggleFlip(t.id);
                    }
                  }}
                  aria-label={`Testimony from ${t.name}. Press to flip card.`}
                >
                  <motion.div
                    className="relative w-full h-full transform-style-3d transition-transform duration-500 rounded-2xl"
                    animate={{ rotateY: isFlipped ? 180 : 0 }}
                    transition={{ duration: 0.5, ease: 'easeInOut' }}
                  >
                    {/* ========================================= */}
                    {/* FRONT OF CARD                             */}
                    {/* ========================================= */}
                    <div className="absolute inset-0 backface-hidden rounded-2xl border border-white/15 bg-[#0e0e0e] p-7 flex flex-col justify-between hover:border-[#FFD700]/50 transition-colors shadow-[0_8px_24px_rgba(0,0,0,0.6)]">
                      <div>
                        {/* Devotional Edition Kicker */}
                        <div className="flex items-center justify-between mb-5">
                          <span className="text-[11px] font-bold uppercase tracking-wider text-[#FFD700] bg-[#FFD700]/10 border border-[#FFD700]/25 px-2.5 py-1 rounded max-w-[210px] truncate">
                            {t.devotional}
                          </span>
                          <span className="text-white/40 text-xs font-medium">
                            0{idx + 1}
                          </span>
                        </div>

                        {/* Author Info */}
                        <h4 className="font-hyperbonnard text-xl sm:text-2xl uppercase tracking-wide text-white mb-2">
                          {t.name}
                        </h4>

                        {/* Quote Excerpt */}
                        <p className="text-sm text-white/85 leading-relaxed font-sans italic line-clamp-4">
                          “{t.testimony.split('\n\n')[0]}”
                        </p>
                      </div>

                      {/* Card Bottom CTA to Flip */}
                      <div className="pt-5 border-t border-white/10 flex items-center justify-between text-xs text-white/60">
                        <span className="inline-flex items-center gap-1.5 text-[#FFD700] font-semibold">
                          <RotateCw className="h-3.5 w-3.5" />
                          <span>Tap to flip & read more</span>
                        </span>
                        <span className="text-[11px] text-white/40">Growth Story</span>
                      </div>
                    </div>

                    {/* ========================================= */}
                    {/* BACK OF CARD (FLIPPED STATE)               */}
                    {/* ========================================= */}
                    <div className="absolute inset-0 backface-hidden rotate-y-180 rounded-2xl border border-[#FFD700]/40 bg-[#0a0a0a] p-7 flex flex-col justify-between shadow-[0_12px_36px_rgba(255,215,0,0.15)] overflow-y-auto">
                      <div>
                        <div className="flex items-center justify-between mb-4">
                          <span className="text-xs font-bold uppercase tracking-wider text-[#FFD700]">
                            Spiritual Reflection
                          </span>
                          <span className="p-1.5 rounded-full bg-white/10 text-white hover:bg-white/20">
                            <RotateCw className="h-3.5 w-3.5" />
                          </span>
                        </div>

                        <h4 className="font-hyperbonnard text-lg uppercase tracking-wide text-white mb-2">
                          {t.name} on “{t.devotional}”
                        </h4>

                        <p className="text-xs sm:text-sm text-white/85 leading-relaxed font-sans mb-3">
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
                        <span>Tap anywhere to flip back</span>
                        <span className="text-[#FFD700] font-medium">The Devoted Ones</span>
                      </div>
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </div>

          {/* Bottom Call to Action for Testimonies */}
          <div className="text-center pt-2">
            <button
              type="button"
              onClick={onOpenTestimonies}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-white/20 text-xs font-bold uppercase tracking-wider text-white hover:text-black hover:bg-[#FFD700] hover:border-[#FFD700] transition-all cursor-pointer"
            >
              <span>Explore All Community Testimonies</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
