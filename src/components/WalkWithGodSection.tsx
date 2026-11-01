import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Heart, Compass, TrendingUp, Sparkles, BookOpen, ArrowRight } from 'lucide-react';
import prayerStudyImage from '../assets/images/devoted_prayer_study_1792653318033.jpg';

interface CommitmentItem {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  scripture: string;
  scriptureRef: string;
  practice: string;
  dailyRhythm: string;
  icon: React.ComponentType<{ className?: string }>;
}

const COMMITMENTS: CommitmentItem[] = [
  {
    id: 'love-god',
    number: '01',
    title: 'LOVE GOD',
    subtitle: 'Deepening Personal Intimacy & Daily Morning Prayer',
    scripture:
      '“Jesus replied: ‘Love the Lord your God with all your heart and with all your soul and with all your mind.’ This is the first and greatest commandment.”',
    scriptureRef: 'Matthew 22:37-38',
    practice:
      'Moving prayer from an occasional emergency reaction into a steady, daily love relationship with God. We cultivate unhurried communion in His presence before the distractions of the day begin.',
    dailyRhythm: 'Morning quiet time, conversational prayer, listening to God’s voice, and gratitude journaling.',
    icon: Heart,
  },
  {
    id: 'live-by-word',
    number: '02',
    title: 'LIVE BY HIS WORD',
    subtitle: 'Scripture Meditation & Real-World Life Application',
    scripture:
      '“Your word is a lamp for my feet, a light on my path. I have taken an oath and confirmed it, that I will follow your righteous laws.”',
    scriptureRef: 'Psalm 119:105-106',
    practice:
      'We do not treat the Bible as academic theory or occasional inspiration; we receive it as the living, authoritative voice of God that governs relationships, decisions, moral convictions, and worldviews.',
    dailyRhythm: 'Contextual chapter reading, verse meditation, personal journaling, and concrete obedience steps.',
    icon: Compass,
  },
  {
    id: 'prioritize-growth',
    number: '03',
    title: 'PRIORITIZE GROWTH',
    subtitle: 'Moving from Inconsistency to Continual Spiritual Maturity',
    scripture:
      '“Like newborn babies, crave pure spiritual milk, so that by it you may grow up in your salvation, now that you have tasted that the Lord is good.”',
    scriptureRef: '1 Peter 2:2-3',
    practice:
      'Consistency over sporadic intensity. Many young people start passionately and fade. We cultivate steady spiritual habits, mutual accountability circles, and study tools to make spiritual maturity sustainable.',
    dailyRhythm: 'Engaging monthly study devotionals, weekly spiritual check-ins, and intentional fellowship.',
    icon: TrendingUp,
  },
  {
    id: 'live-excellently',
    number: '04',
    title: 'LIVE EXCELLENTLY',
    subtitle: 'Faithful Stewardship in Academics, Work & Character',
    scripture:
      '“Whatever you do, work at it with all your heart, as working for the Lord, not for human masters, since you know that you will receive an inheritance from the Lord as a reward.”',
    scriptureRef: 'Colossians 3:23-24',
    practice:
      'Devotion to Christ is never an excuse for mediocrity. As ambassadors of the Kingdom, we are called to reflect God’s excellence in lecture halls, laboratories, creative studios, and professional offices.',
    dailyRhythm: 'Diligent work ethics, punctual commitments, high moral integrity, and honoring God in all crafts.',
    icon: Sparkles,
  },
];

interface WalkWithGodProps {
  onOpenJoin: () => void;
  onOpenEbook: () => void;
}

export const WalkWithGodSection: React.FC<WalkWithGodProps> = ({ onOpenJoin, onOpenEbook }) => {
  // Allow expanding one or multiple; default first open
  const [expandedId, setExpandedId] = useState<string | null>('love-god');

  const toggleAccordion = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <section id="walk-with-god" className="py-20 md:py-28 bg-black text-white relative border-t border-white/10 scroll-mt-24">
      {/* Anchor alias for backwards compatibility */}
      <div id="devoted-life" className="relative -top-24 pointer-events-none" aria-hidden="true" />

      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16 md:mb-20"
        >
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#FFD700] mb-3 block">
            THE DEVOTED LIFE · DISCIPLINES
          </span>

          <h2 className="font-hyperbonnard text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-wide uppercase text-white mb-5">
            Walk With God
          </h2>

          <p className="text-base sm:text-lg text-white/85 font-sans leading-relaxed">
            Four foundational commitments that shape who we are and how we grow together. Tap any commitment to explore how we walk with God daily.
          </p>
        </motion.div>

        {/* 2-Column Layout: Visual + Interactive Accordion */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left Column: Atmospheric Visual Editorial Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 relative lg:sticky lg:top-28"
          >
            <div className="rounded-2xl overflow-hidden border border-white/15 bg-[#0e0e0e] shadow-[0_12px_40px_rgba(0,0,0,0.85)]">
              <img
                src={prayerStudyImage}
                alt="Young person in thoughtful morning prayer and Bible meditation"
                className="w-full h-auto object-cover aspect-[4/3] sm:aspect-[1/1] filter brightness-[0.9] contrast-[1.05]"
                loading="lazy"
              />
              <div className="p-6 border-t border-white/10 bg-black/90 backdrop-blur-md">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#FFD700] block mb-1">
                  DAILY RHYTHM
                </span>
                <h3 className="font-hyperbonnard text-xl uppercase tracking-wide text-white mb-2">
                  Consistency Shapes Destiny
                </h3>
                <p className="text-xs text-white/75 font-sans leading-relaxed mb-4">
                  “Spiritual maturity doesn’t happen by accident. It is cultivated through faithful, quiet morning devotion and applying God’s Word.”
                </p>

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={onOpenJoin}
                    className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-black bg-[#FFD700] hover:bg-white px-3.5 py-2 rounded-lg transition-colors cursor-pointer"
                  >
                    <span>Join Us</span>
                    <ArrowRight className="h-3 w-3" />
                  </button>

                  <button
                    type="button"
                    onClick={onOpenEbook}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-white hover:text-[#FFD700] px-3.5 py-2 rounded-lg transition-colors cursor-pointer"
                  >
                    <span>Get E-Book</span>
                  </button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Accordion Interaction */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            {COMMITMENTS.map((item, idx) => {
              const isExpanded = expandedId === item.id;
              const IconComponent = item.icon;

              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.4, delay: idx * 0.08 }}
                  className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                    isExpanded
                      ? 'border-[#FFD700]/50 bg-[#0e0e0e] shadow-[0_8px_32px_rgba(255,215,0,0.12)]'
                      : 'border-white/15 bg-[#0a0a0a] hover:border-white/30 hover:bg-[#0e0e0e]'
                  }`}
                >
                  {/* Accordion Header Button */}
                  <button
                    type="button"
                    onClick={() => toggleAccordion(item.id)}
                    aria-expanded={isExpanded}
                    className="w-full p-6 text-left flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                  >
                    <div className="flex items-center gap-4">
                      {/* Number badge */}
                      <span className="text-sm font-bold tracking-wider text-[#FFD700]">
                        {item.number}
                      </span>

                      {/* Icon */}
                      <div
                        className={`p-2.5 rounded-xl transition-colors ${
                          isExpanded ? 'bg-[#FFD700] text-black' : 'bg-white/5 text-[#FFD700]'
                        }`}
                      >
                        <IconComponent className="h-4 w-4" />
                      </div>

                      {/* Title & Subtitle */}
                      <div>
                        <h3 className="font-hyperbonnard text-xl sm:text-2xl uppercase tracking-wide text-white leading-tight">
                          {item.title}
                        </h3>
                        <p className="text-xs text-white/70 font-sans mt-0.5">
                          {item.subtitle}
                        </p>
                      </div>
                    </div>

                    {/* Smooth Chevron Rotation */}
                    <div
                      className={`p-1.5 rounded-full text-[#FFD700] transition-transform duration-300 shrink-0 ${
                        isExpanded ? 'rotate-180 bg-[#FFD700]/15' : 'bg-white/5'
                      }`}
                    >
                      <ChevronDown className="h-4 w-4" />
                    </div>
                  </button>

                  {/* Accordion Body with Smooth Framer Motion Collapse */}
                  <AnimatePresence initial={false}>
                    {isExpanded && (
                      <motion.div
                        key="content"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.04, 0.62, 0.23, 0.98] }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-6 pt-2 border-t border-white/10 text-sm font-sans space-y-4">
                          {/* Scripture Box */}
                          <div className="p-4 rounded-xl bg-black/60 border border-[#FFD700]/25 italic text-white/90 leading-relaxed text-xs sm:text-sm">
                            {item.scripture}
                            <span className="not-italic font-bold text-[#FFD700] block mt-1.5 text-xs uppercase tracking-wider">
                              — {item.scriptureRef}
                            </span>
                          </div>

                          {/* Practical Application */}
                          <div>
                            <span className="text-xs font-bold uppercase tracking-wider text-[#FFD700] block mb-1">
                              How We Live This Out
                            </span>
                            <p className="text-white/80 leading-relaxed text-xs sm:text-sm">
                              {item.practice}
                            </p>
                          </div>

                          {/* Daily Rhythm Indicator */}
                          <div className="pt-3 border-t border-white/10 flex items-start gap-2.5 text-xs text-white/70">
                            <span className="font-semibold text-white uppercase tracking-wider shrink-0">
                              Daily Habit:
                            </span>
                            <span>{item.dailyRhythm}</span>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
