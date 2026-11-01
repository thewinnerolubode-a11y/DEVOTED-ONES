import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  ChevronDown,
  RotateCw,
  Sparkles,
  Users,
  Compass,
  Heart,
  TrendingUp,
  ShieldCheck,
  Target,
  ExternalLink,
} from 'lucide-react';
import heroImage from '../assets/images/devoted_ones_hero_1792397573009.jpg';
import fellowshipImage from '../assets/images/devoted_youth_fellowship_1792653302664.jpg';
import studyImage from '../assets/images/devoted_excellence_work_1792654657307.jpg';
import circleImage from '../assets/images/devoted_circle_fellowship_1792654657721.jpg';
import worshipImage from '../assets/images/devoted_worship_community_1792654655697.jpg';
import prayerImage from '../assets/images/devoted_prayer_study_1792653318033.jpg';
import { testimoniesData, Testimony } from '../data/testimoniesData';

interface AboutPageProps {
  onOpenJoin: () => void;
  onOpenEbook: () => void;
}

const PROMISES = [
  {
    num: '01',
    title: 'GROWTH THAT TOUCHES EVERY AREA OF LIFE',
    summary: 'A community that helps you grow in your relationship with God, your character, how you live, and your career.',
    details: 'Spiritual maturity should manifest in practical life. We provide deliberate teachings, accountability, and rhythms that ensure faith influences your personal discipline, leadership, relationships, and professional trajectory.',
  },
  {
    num: '02',
    title: 'FAITH WITHOUT LIMITS',
    summary: 'Your faith should not be treated as a limit on your potential. Christianity should shape and strengthen your contribution to the world.',
    details: 'We believe God has called young believers to stand as light in culture, boardrooms, science laboratories, lecture halls, and arts without compromise or false dichotomies.',
  },
  {
    num: '03',
    title: "EXCELLENCE BY GOD'S WORD",
    summary: "Encouragement to live excellently by the principles of God's Word, whatever field you find yourself in.",
    details: 'Mediocrity is never an attribute of the Kingdom. We encourage our members to pursue mastery, punctual integrity, diligence, and ethical brilliance as a primary testimony of the Gospel.',
  },
  {
    num: '04',
    title: 'SIMPLE, CLEAR TEACHING',
    summary: 'Teaching that is easy to understand, practical, and free from unnecessary complexity.',
    details: 'The Gospel is powerful in its clarity. Our devotionals and cell discussions unpack biblical truth with simplicity, actionable steps, and immediate everyday application.',
  },
  {
    num: '05',
    title: 'TRAINED, QUALIFIED LEADERS',
    summary: 'Leadership development at every stage. People should be equipped before being entrusted with leadership responsibilities.',
    details: 'No leader is placed unprepared. We invest heavily in doctrinal grounding, servant character, relational emotional intelligence, and shepherd-hearted pastoral care before handing over responsibilities.',
  },
  {
    num: '06',
    title: 'ONE CULTURE, WHEREVER YOU ARE',
    summary: 'Every cell should share the same vision, teachings, and systems.',
    details: 'Whether you attend a campus cell in Nigeria or an international gathering abroad, you will experience the exact same warm atmosphere of honor, devotion, scriptural fidelity, and pursuit of excellence.',
  },
  {
    num: '07',
    title: 'A LOCAL GATHERING NEAR YOU',
    summary: 'The vision is to establish physical local gatherings led by people based in those locations.',
    details: 'Virtual discipleship is great, but embodied community transforms lives. We are intentionally planting regional and campus cells with local servant leaders on the ground.',
  },
  {
    num: '08',
    title: 'A COMMUNITY BUILT TO LAST',
    summary: 'Build leaders and systems so the community can continue operating responsibly without depending on one individual.',
    details: 'THE DEVOTED ONES is built on sustainable biblical structures, governance, transparent systems, and distributed leadership that will outlast any single founder or season.',
  },
  {
    num: '09',
    title: 'A VISION THAT STAYS PROTECTED',
    summary: 'Preserve the founding vision, values, and teaching as the community grows.',
    details: 'Growth will never be chased at the expense of doctrinal integrity or spiritual depth. We actively safeguard our foundational ethos of genuine devotion to God and whole-life discipleship.',
  },
  {
    num: '10',
    title: 'BECOMING AN EXAMPLE TO OTHERS',
    summary: 'Equip people to live with purpose, excellence, and influence that points others toward Christ.',
    details: 'Our ultimate milestone is you becoming an ambassador whose godly character, steady peace, and radiant life cause friends, family, and colleagues to seek the God you serve.',
  },
];

export const AboutPage: React.FC<AboutPageProps> = ({ onOpenJoin, onOpenEbook }) => {
  // Flip states for the 3 featured testimonials
  const [flippedCards, setFlippedCards] = useState<Record<string, boolean>>({});
  // Expanded state for the 10 promises
  const [expandedPromise, setExpandedPromise] = useState<string | null>('01');
  // State to show all testimonials vs 3 featured
  const [showAllTestimonies, setShowAllTestimonies] = useState<boolean>(false);

  const toggleFlip = (id: string) => {
    setFlippedCards((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const togglePromise = (num: string) => {
    setExpandedPromise((prev) => (prev === num ? null : num));
  };

  const featuredTestimonials = testimoniesData.slice(0, 3);
  const displayedTestimonials = showAllTestimonies ? testimoniesData : featuredTestimonials;

  return (
    <div className="bg-black text-white min-h-screen">
      {/* ========================================================= */}
      {/* SECTION A: ABOUT HERO                                     */}
      {/* ========================================================= */}
      <section className="relative min-h-[65vh] sm:min-h-[70vh] flex items-center justify-center overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 w-full h-full pointer-events-none">
          <img
            src={heroImage}
            alt="The Devoted Ones Community"
            className="w-full h-full object-cover filter brightness-[0.45] contrast-[1.12]"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/80" />
          <div className="absolute inset-0 bg-radial from-[#FFD700]/10 via-transparent to-black/80" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-8 text-center my-auto py-16">
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#FFD700] mb-3 block">
            ABOUT THE DEVOTED ONES
          </span>

          <h1 className="font-hyperbonnard text-4xl sm:text-5xl md:text-6xl lg:text-7xl uppercase tracking-wide text-white mb-5 leading-tight text-balance">
            ABOUT THE DEVOTED ONES
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-white/90 max-w-2xl mx-auto font-sans font-normal leading-relaxed text-balance">
            A people growing in God's Word, becoming grounded in character, and living out their faith with purpose.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-xs font-semibold uppercase tracking-wider text-white/70">
            <a href="#who-we-are" className="py-1 px-3 rounded-lg bg-white/5 border border-white/15 hover:text-[#FFD700] transition-colors">
              Who We Are
            </a>
            <span className="text-[#FFD700]">·</span>
            <a href="#what-we-do" className="py-1 px-3 rounded-lg bg-white/5 border border-white/15 hover:text-[#FFD700] transition-colors">
              What We Do
            </a>
            <span className="text-[#FFD700]">·</span>
            <a href="#our-vision" className="py-1 px-3 rounded-lg bg-white/5 border border-white/15 hover:text-[#FFD700] transition-colors">
              Our Vision
            </a>
            <span className="text-[#FFD700]">·</span>
            <a href="#testimonials" className="py-1 px-3 rounded-lg bg-white/5 border border-white/15 hover:text-[#FFD700] transition-colors">
              Testimonials
            </a>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* SECTION B: WHO WE ARE                                     */}
      {/* ========================================================= */}
      <section id="who-we-are" className="py-20 md:py-28 border-b border-white/10 scroll-mt-24">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Visual Column */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-6 relative"
            >
              <div className="relative rounded-2xl overflow-hidden border border-white/15 bg-[#0e0e0e] shadow-[0_16px_40px_rgba(0,0,0,0.85)] group">
                <img
                  src={fellowshipImage}
                  alt="Young Christians studying Scripture and sharing meaningful fellowship"
                  className="w-full h-full object-cover aspect-[4/3] transition-transform duration-700 group-hover:scale-[1.03]"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none" />
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-white bg-black/90 backdrop-blur-md px-4 py-3 rounded-xl border border-white/15">
                  <span className="font-semibold text-white">Authentic Faith & Fellowship</span>
                  <span className="text-[#FFD700] text-xs font-bold uppercase tracking-wider">
                    Community of Growth
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Text Column */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-6 flex flex-col justify-center"
            >
              <span className="text-xs font-bold uppercase tracking-widest text-[#FFD700] mb-3 block">
                WHO WE ARE
              </span>

              <h2 className="font-hyperbonnard text-3xl sm:text-4xl md:text-5xl uppercase tracking-wide text-white mb-5 leading-tight">
                WE ARE BECOMING WHAT WE BELIEVE.
              </h2>

              <p className="text-base sm:text-lg text-white/85 font-sans leading-relaxed mb-6 font-normal">
                THE DEVOTED ONES is a Christian community centered on God's Word and committed to spiritual growth, personal development, godly character, and purposeful living.
              </p>

              <div className="p-6 rounded-xl bg-[#0e0e0e] border border-[#FFD700]/25 mb-8">
                <p className="text-sm sm:text-base text-white/90 leading-relaxed font-normal">
                  The community believes that Christianity should shape not only religious activities but also how people think, relate, work, lead, and live every single day.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs font-semibold uppercase tracking-wider text-white/80">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-[#FFD700] shrink-0" />
                  <span>Word-Centered Living</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-[#FFD700] shrink-0" />
                  <span>Godly Character</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-[#FFD700] shrink-0" />
                  <span>Everyday Excellence</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-[#FFD700] shrink-0" />
                  <span>Meaningful Influence</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* SECTION C: WHAT WE DO (6 THEMES IN VISUAL STORYTELLING)   */}
      {/* ========================================================= */}
      <section id="what-we-do" className="py-20 md:py-28 border-b border-white/10 scroll-mt-24">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-16 md:mb-20"
          >
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#FFD700] mb-3 block">
              WHAT WE DO
            </span>

            <h2 className="font-hyperbonnard text-3xl sm:text-4xl md:text-5xl uppercase tracking-wide text-white mb-4">
              FAITH THAT SHAPES EVERY PART OF LIFE.
            </h2>

            <p className="text-base sm:text-lg text-white/80 font-sans leading-relaxed">
              We present our discipleship journey across six vital expressions of faith, growth, and influence.
            </p>
          </motion.div>

          {/* 6 Themes with Asymmetric Visual Variety */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {/* Theme 1: THE WORD */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5 }}
              className="rounded-2xl border border-white/15 bg-[#0e0e0e] p-7 flex flex-col justify-between hover:border-[#FFD700]/40 transition-colors shadow-md"
            >
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#FFD700] bg-[#FFD700]/10 border border-[#FFD700]/25 px-2.5 py-1 rounded inline-block mb-4">
                  Theme 01
                </span>
                <h3 className="font-hyperbonnard text-2xl uppercase tracking-wide text-white mb-3">
                  THE WORD
                </h3>
                <p className="text-xs sm:text-sm text-white/80 leading-relaxed font-sans mb-6">
                  Helping people understand Scripture and develop a consistent devotional life.
                </p>
              </div>
              <div className="pt-4 border-t border-white/10 text-xs text-white/60">
                Daily quiet time & scripture reflection
              </div>
            </motion.div>

            {/* Theme 2: SPIRITUAL GROWTH */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="rounded-2xl border border-white/15 bg-[#0e0e0e] p-7 flex flex-col justify-between hover:border-[#FFD700]/40 transition-colors shadow-md"
            >
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#FFD700] bg-[#FFD700]/10 border border-[#FFD700]/25 px-2.5 py-1 rounded inline-block mb-4">
                  Theme 02
                </span>
                <h3 className="font-hyperbonnard text-2xl uppercase tracking-wide text-white mb-3">
                  SPIRITUAL GROWTH
                </h3>
                <p className="text-xs sm:text-sm text-white/80 leading-relaxed font-sans mb-6">
                  Encouraging prayer, worship, fellowship, reflection, and a deeper relationship with God.
                </p>
              </div>
              <div className="pt-4 border-t border-white/10 text-xs text-white/60">
                Moving from inconsistency into maturity
              </div>
            </motion.div>

            {/* Theme 3: PERSONAL DEVELOPMENT */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="rounded-2xl border border-white/15 bg-[#0e0e0e] p-7 flex flex-col justify-between hover:border-[#FFD700]/40 transition-colors shadow-md"
            >
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#FFD700] bg-[#FFD700]/10 border border-[#FFD700]/25 px-2.5 py-1 rounded inline-block mb-4">
                  Theme 03
                </span>
                <h3 className="font-hyperbonnard text-2xl uppercase tracking-wide text-white mb-3">
                  PERSONAL DEVELOPMENT
                </h3>
                <p className="text-xs sm:text-sm text-white/80 leading-relaxed font-sans mb-6">
                  Encouraging character, discipline, self-awareness, purpose, and excellence.
                </p>
              </div>
              <div className="pt-4 border-t border-white/10 text-xs text-white/60">
                Character across every area of life
              </div>
            </motion.div>

            {/* Theme 4: COMMUNITY */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="rounded-2xl border border-white/15 bg-[#0e0e0e] p-7 flex flex-col justify-between hover:border-[#FFD700]/40 transition-colors shadow-md"
            >
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#FFD700] bg-[#FFD700]/10 border border-[#FFD700]/25 px-2.5 py-1 rounded inline-block mb-4">
                  Theme 04
                </span>
                <h3 className="font-hyperbonnard text-2xl uppercase tracking-wide text-white mb-3">
                  COMMUNITY
                </h3>
                <p className="text-xs sm:text-sm text-white/80 leading-relaxed font-sans mb-6">
                  Building meaningful relationships, mutual encouragement, and a sense of belonging.
                </p>
              </div>
              <div className="pt-4 border-t border-white/10 text-xs text-white/60">
                Fellowship cells on campuses & workplaces
              </div>
            </motion.div>

            {/* Theme 5: LEADERSHIP */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="rounded-2xl border border-white/15 bg-[#0e0e0e] p-7 flex flex-col justify-between hover:border-[#FFD700]/40 transition-colors shadow-md"
            >
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#FFD700] bg-[#FFD700]/10 border border-[#FFD700]/25 px-2.5 py-1 rounded inline-block mb-4">
                  Theme 05
                </span>
                <h3 className="font-hyperbonnard text-2xl uppercase tracking-wide text-white mb-3">
                  LEADERSHIP
                </h3>
                <p className="text-xs sm:text-sm text-white/80 leading-relaxed font-sans mb-6">
                  Developing people who can serve responsibly, lead others, and help sustain the vision.
                </p>
              </div>
              <div className="pt-4 border-t border-white/10 text-xs text-white/60">
                Equipping servant-hearted workers
              </div>
            </motion.div>

            {/* Theme 6: EVERYDAY INFLUENCE */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="rounded-2xl border border-[#FFD700]/30 bg-[#0e0e0e] p-7 flex flex-col justify-between hover:border-[#FFD700] transition-colors shadow-[0_10px_30px_rgba(255,215,0,0.12)]"
            >
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-black bg-[#FFD700] px-2.5 py-1 rounded inline-block mb-4">
                  Theme 06
                </span>
                <h3 className="font-hyperbonnard text-2xl uppercase tracking-wide text-white mb-3">
                  EVERYDAY INFLUENCE
                </h3>
                <p className="text-xs sm:text-sm text-white/85 leading-relaxed font-sans mb-6">
                  Encouraging members to apply biblical principles in their education, careers, relationships, service, and everyday decisions.
                </p>
              </div>
              <div className="pt-4 border-t border-white/10 text-xs text-[#FFD700] font-semibold">
                Kingdom ambassadors in the world
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* SECTION D: OUR VISION (3-YEAR MILESTONES & 10 PROMISES)    */}
      {/* ========================================================= */}
      <section id="our-vision" className="py-20 md:py-28 border-b border-white/10 scroll-mt-24">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-16 md:mb-20"
          >
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#FFD700] mb-3 block">
              OUR VISION
            </span>

            <h2 className="font-hyperbonnard text-3xl sm:text-4xl md:text-5xl lg:text-6xl uppercase tracking-wide text-white mb-4">
              THE NEXT THREE YEARS.
            </h2>

            <p className="text-base sm:text-lg text-white/90 font-sans leading-relaxed max-w-2xl mx-auto">
              We envision a generation of devoted people who live by God's Word, grow in every area of life, and become examples others can emulate.
            </p>
            <p className="text-xs text-white/50 uppercase tracking-widest mt-3">
              *The targets below represent three-year milestone goals, not current achievements.
            </p>
          </motion.div>

          {/* 3 Future Milestones Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            {/* Milestone 1 */}
            <div className="rounded-2xl border border-white/15 bg-[#0e0e0e] p-8 flex flex-col justify-between shadow-lg">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#FFD700] block mb-2">
                  MILESTONE 01
                </span>
                <h3 className="font-hyperbonnard text-3xl sm:text-4xl uppercase tracking-wide text-white mb-3">
                  1,000+ YOUNG PEOPLE
                </h3>
                <p className="text-xs sm:text-sm text-white/80 leading-relaxed font-sans">
                  Build a community of more than 1,000 young people growing in their relationship with God, character, and excellence.
                </p>
              </div>
              <div className="pt-6 mt-6 border-t border-white/10 text-xs text-white/50">
                Spiritual growth & daily discipleship
              </div>
            </div>

            {/* Milestone 2 */}
            <div className="rounded-2xl border border-white/15 bg-[#0e0e0e] p-8 flex flex-col justify-between shadow-lg">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#FFD700] block mb-2">
                  MILESTONE 02
                </span>
                <h3 className="font-hyperbonnard text-3xl sm:text-4xl uppercase tracking-wide text-white mb-3">
                  50–100 ACTIVE WORKERS & LEADERS
                </h3>
                <p className="text-xs sm:text-sm text-white/80 leading-relaxed font-sans">
                  Raise and equip a committed team to serve the community and support its growth.
                </p>
              </div>
              <div className="pt-6 mt-6 border-t border-white/10 text-xs text-white/50">
                Servant leadership development
              </div>
            </div>

            {/* Milestone 3 */}
            <div className="rounded-2xl border border-white/15 bg-[#0e0e0e] p-8 flex flex-col justify-between shadow-lg">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#FFD700] block mb-2">
                  MILESTONE 03
                </span>
                <h3 className="font-hyperbonnard text-3xl sm:text-4xl uppercase tracking-wide text-white mb-3">
                  UP TO 10 FUNCTIONING CELLS
                </h3>
                <p className="text-xs sm:text-sm text-white/80 leading-relaxed font-sans">
                  Establish up to ten functioning cells across Nigeria and internationally. Each cell with a designated leader and at least ten people gathering consistently sharing the same vision, teachings, and systems.
                </p>
              </div>
              <div className="pt-6 mt-6 border-t border-white/10 text-xs text-white/50">
                Regional and international gathering cells
              </div>
            </div>
          </div>

          {/* OUR PROMISE TO DEVOTED ONES (10 COMMITMENTS) */}
          <div className="mb-20">
            <div className="max-w-2xl mb-10">
              <span className="text-xs font-bold uppercase tracking-widest text-[#FFD700] mb-2 block">
                OUR COMMITMENTS
              </span>
              <h3 className="font-hyperbonnard text-2xl sm:text-3xl md:text-4xl uppercase tracking-wide text-white">
                OUR PROMISE TO DEVOTED ONES
              </h3>
              <p className="mt-2 text-white/75 text-sm sm:text-base font-sans font-normal">
                Ten foundational promises guiding our culture and leadership. Tap any promise to read how it is lived out.
              </p>
            </div>

            <div className="space-y-4">
              {PROMISES.map((item) => {
                const isOpen = expandedPromise === item.num;
                return (
                  <div
                    key={item.num}
                    className="rounded-xl border border-white/15 bg-[#0e0e0e] overflow-hidden transition-colors hover:border-[#FFD700]/40"
                  >
                    <button
                      type="button"
                      onClick={() => togglePromise(item.num)}
                      className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                      aria-expanded={isOpen}
                    >
                      <div className="flex items-center gap-4">
                        <span className="text-xs font-bold text-[#FFD700] px-2.5 py-1 rounded bg-[#FFD700]/10 border border-[#FFD700]/25">
                          {item.num}
                        </span>
                        <div>
                          <h4 className="font-hyperbonnard text-lg sm:text-xl uppercase tracking-wide text-white">
                            {item.title}
                          </h4>
                          <p className="text-xs sm:text-sm text-white/75 font-sans mt-0.5 line-clamp-1">
                            {item.summary}
                          </p>
                        </div>
                      </div>

                      <div className={`p-2 rounded-lg bg-white/5 text-white transition-transform duration-300 ${isOpen ? 'rotate-180 text-[#FFD700]' : ''}`}>
                        <ChevronDown className="h-4 w-4" />
                      </div>
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: 'easeInOut' }}
                          className="overflow-hidden"
                        >
                          <div className="px-6 pb-6 pt-2 border-t border-white/10 text-xs sm:text-sm text-white/80 font-sans leading-relaxed">
                            <p className="mb-3 font-medium text-white">{item.summary}</p>
                            <p>{item.details}</p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>

          {/* VISION CLOSING */}
          <div className="rounded-3xl border border-[#FFD700]/30 bg-gradient-to-b from-[#0e0e0e] to-black p-8 sm:p-14 text-center">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#FFD700] mb-3 block">
              GENERATIONAL IMPACT
            </span>
            <h3 className="font-hyperbonnard text-3xl sm:text-4xl md:text-5xl uppercase tracking-wide text-white mb-8">
              ONE VISION. ONE CULTURE. GENERATIONAL IMPACT.
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto text-left mb-10">
              <div className="p-5 rounded-xl bg-black/70 border border-white/10">
                <span className="text-xs font-bold uppercase tracking-wider text-[#FFD700] block mb-1">
                  01 · GROW DEEP
                </span>
                <p className="text-xs sm:text-sm text-white/85 font-sans">
                  Grow in the knowledge of God, character, and the principles of His Word.
                </p>
              </div>

              <div className="p-5 rounded-xl bg-black/70 border border-white/10">
                <span className="text-xs font-bold uppercase tracking-wider text-[#FFD700] block mb-1">
                  02 · BUILD WELL
                </span>
                <p className="text-xs sm:text-sm text-white/85 font-sans">
                  Develop people, leaders, and systems that sustain the vision.
                </p>
              </div>

              <div className="p-5 rounded-xl bg-black/70 border border-white/10">
                <span className="text-xs font-bold uppercase tracking-wider text-[#FFD700] block mb-1">
                  03 · LIVE EXCELLENTLY
                </span>
                <p className="text-xs sm:text-sm text-white/85 font-sans">
                  Become examples of purpose, excellence, and influence that point others to Christ.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={onOpenJoin}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider text-black bg-[#FFD700] hover:bg-white transition-all shadow-[0_4px_24px_rgba(255,215,0,0.3)] active:scale-[0.98] cursor-pointer"
            >
              <span>PARTNER WITH THE VISION</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* SECTION E: TESTIMONIALS (3 FEATURED WITH FLIP REVEAL)     */}
      {/* ========================================================= */}
      <section id="testimonials" className="py-20 md:py-28 scroll-mt-24">
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
                TESTIMONIALS
              </span>
              <h2 className="font-hyperbonnard text-3xl sm:text-4xl md:text-5xl uppercase tracking-wide text-white">
                Member Reflections & Growth
              </h2>
              <p className="mt-2 text-white/75 text-sm sm:text-base font-sans font-normal max-w-xl">
                Real stories of faith, obedience, and character from our existing community members. Click any panel to read the full reflection.
              </p>
            </div>

            <button
              type="button"
              onClick={() => setShowAllTestimonies(!showAllTestimonies)}
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#FFD700] hover:text-white transition-colors cursor-pointer self-start sm:self-auto py-2 group"
            >
              <span>{showAllTestimonies ? 'SHOW TOP 3 ONLY' : 'READ ALL TESTIMONIES'}</span>
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>

          {/* Testimonials Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {displayedTestimonials.map((t, idx) => {
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
                  aria-label={`Testimony from ${t.name}. Tap to flip.`}
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

                        <h3 className="font-hyperbonnard text-2xl uppercase tracking-wide text-white mb-2">
                          {t.name}
                        </h3>

                        <p className="text-xs sm:text-sm text-white/85 leading-relaxed font-sans italic line-clamp-5">
                          “{t.testimony.split('\n\n')[0]}”
                        </p>
                      </div>

                      <div className="pt-5 border-t border-white/10 flex items-center justify-between text-xs text-white/60">
                        <span className="inline-flex items-center gap-1.5 text-[#FFD700] font-semibold">
                          <RotateCw className="h-3.5 w-3.5" />
                          <span>Tap to flip</span>
                        </span>
                        <span className="text-[11px] text-white/40">Growth Story</span>
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

          <div className="text-center pt-4">
            <button
              type="button"
              onClick={onOpenJoin}
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider text-black bg-[#FFD700] hover:bg-white transition-all shadow-[0_4px_20px_rgba(255,215,0,0.25)] cursor-pointer"
            >
              <span>JOIN THE DEVOTED ONES</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
