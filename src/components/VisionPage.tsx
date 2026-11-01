import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  Calendar,
  Compass,
  CheckCircle2,
  Sparkles,
  Target,
  Users,
  BookOpen,
  Award,
  Globe,
  ArrowRight,
  Shield,
  Heart,
  Flame,
} from 'lucide-react';

interface VisionPageProps {
  onBack: () => void;
  onOpenJoin: () => void;
  onOpenEbook: () => void;
}

export const VisionPage: React.FC<VisionPageProps> = ({
  onBack,
  onOpenJoin,
  onOpenEbook,
}) => {
  const [activeYear, setActiveYear] = useState<1 | 2 | 3>(1);

  const milestonesByYear = {
    1: {
      yearLabel: 'Year 1: Foundation & Daily Rhythms',
      phaseSubtitle: 'Anchoring Daily Devotion & Personal Consistency',
      period: 'Current Phase (2026 – 2027)',
      items: [
        {
          number: '01',
          title: 'Daily Devotional Discipline',
          description:
            'Cultivating intentional morning devotion habits in over 1,000 young believers across multiple campuses and cities.',
          icon: BookOpen,
        },
        {
          number: '02',
          title: 'Monthly Devotional E-Books',
          description:
            'Consistently researching, writing, and distributing monthly thematic devotional study manuals freely to all seekers.',
          icon: Calendar,
        },
        {
          number: '03',
          title: 'Digital Fellowship Circles',
          description:
            'Establishing structured online discipleship groups with daily Scripture discussion, prayer requests, and mutual accountability.',
          icon: Users,
        },
        {
          number: '04',
          title: 'Online Devotional Intensive',
          description:
            'Hosting our first quarterly digital retreat focused on scriptural depth, spiritual renewal, and Christian character.',
          icon: Flame,
        },
      ],
    },
    2: {
      yearLabel: 'Year 2: Discipleship & Campus Expansion',
      phaseSubtitle: 'Building Physical Presence & Intentional Mentorship',
      period: 'Phase Two (2027 – 2028)',
      items: [
        {
          number: '01',
          title: 'Campus Fellowships',
          description:
            'Establishing official university and college chapters to provide physically grounded spiritual support for students.',
          icon: Compass,
        },
        {
          number: '02',
          title: 'Weekly Bible Study Cohorts',
          description:
            'Launching systematic, verse-by-verse scriptural discipleship curricula led by trained and mature leaders.',
          icon: BookOpen,
        },
        {
          number: '03',
          title: 'Faith & Vocation Masterclasses',
          description:
            'Equipping students and young professionals to demonstrate God-glorifying excellence in technology, medicine, law, and business.',
          icon: Award,
        },
        {
          number: '04',
          title: '5,000 Young Disciples',
          description:
            'Scaling our community to reach 5,000+ active young believers growing in faith and spiritual maturity together.',
          icon: Target,
        },
      ],
    },
    3: {
      yearLabel: 'Year 3: Kingdom Impact & Multiplication',
      phaseSubtitle: 'Empowering Leaders & Global Mission Outreach',
      period: 'Phase Three (2028 – 2029)',
      items: [
        {
          number: '01',
          title: 'National Youth Conference',
          description:
            'Gathering thousands of young believers for a landmark annual gathering of worship, biblical teaching, and spiritual commission.',
          icon: Flame,
        },
        {
          number: '02',
          title: 'Community Welfare & Gospel Missions',
          description:
            'Organizing compassionate outreach missions to prisons, orphanages, and underprivileged communities with the Gospel and aid.',
          icon: Heart,
        },
        {
          number: '03',
          title: 'Devoted Leadership Academy',
          description:
            'A rigorous training ground cultivating future pastors, ministry leaders, and marketplace ministers of unbending integrity.',
          icon: Award,
        },
        {
          number: '04',
          title: 'Global Digital Reach',
          description:
            'Translating devotional resources into major world languages to serve over 20,000 young believers across continents.',
          icon: Globe,
        },
      ],
    },
  };

  const promises = [
    {
      number: '01',
      title: 'Uncompromising Biblical Truth',
      description:
        'We will never dilute, compromise, or trend-chase with the Gospel. Every resource, teaching, and exhortation will remain firmly rooted in the inerrant Word of God.',
      icon: Shield,
    },
    {
      number: '02',
      title: 'Intentional Spiritual Rhythms',
      description:
        'We exist to move young people from spiritual inconsistency to steady, joyful, and disciplined walks with Christ through structured daily devotions.',
      icon: Target,
    },
    {
      number: '03',
      title: 'Wholistic Growth & Excellence',
      description:
        'We reject mediocrity. Devotion to God must translate into high standards of moral character, academic excellence, professional craft, and relational health.',
      icon: Award,
    },
    {
      number: '04',
      title: 'Authentic Family & Accountability',
      description:
        'No member walks alone. We foster genuine brotherhood and sisterhood where questions are welcomed, burdens are shared, and prayers are fervent.',
      icon: Users,
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white py-12 sm:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Navigation Bar / Breadcrumb */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex items-center justify-between mb-8 pb-6 border-b border-white/10"
        >
          <button
            type="button"
            onClick={onBack}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold uppercase tracking-wider text-white/80 hover:text-[#FFD700] transition-colors cursor-pointer group"
          >
            <ArrowLeft className="h-4 w-4 text-[#FFD700] group-hover:-translate-x-1 transition-transform" />
            <span>Back to Home</span>
          </button>

          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-white/60">
              THE DEVOTED ONES · OUR VISION
            </span>
          </div>
        </motion.div>

        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-4xl mx-auto mb-16 sm:mb-20"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#FFD700]/30 bg-[#FFD700]/10 text-[#FFD700] text-xs font-semibold uppercase tracking-widest mb-5">
            <Sparkles className="h-3.5 w-3.5" />
            <span>THE ROAD AHEAD · 2026 – 2029</span>
          </div>

          <h1 className="font-hyperbonnard text-4xl sm:text-6xl md:text-7xl tracking-wide uppercase text-white mb-4 leading-tight">
            OUR VISION
          </h1>

          <p className="text-sm sm:text-base font-semibold uppercase tracking-wider text-[#FFD700] mb-5">
            THE THREE-YEAR MILESTONES & PROMISES
          </p>

          <p className="text-base sm:text-xl text-white/90 leading-relaxed font-sans max-w-3xl mx-auto">
            Raising a generation of young people deeply rooted in God's Word, consistent in daily devotion, and shining with excellence in every sphere of life.
          </p>

          {/* Scripture Anchor Banner */}
          <div className="mt-8 inline-block max-w-2xl rounded-xl p-5 bg-[#0e0e0e] border border-white/15 text-xs sm:text-sm italic text-white/85">
            “...but the people that do know their God shall be strong, and do exploits.”
            <span className="not-italic font-bold text-[#FFD700] block mt-1.5 text-xs uppercase tracking-wider">
              — Daniel 11:32b
            </span>
          </div>
        </motion.div>

        {/* SECTION 1: THREE-YEAR MILESTONES */}
        <section className="mb-20 sm:mb-28">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 pb-6 border-b border-white/10">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#FFD700] mb-2 block">
                STRATEGIC ROADMAP
              </span>
              <h2 className="font-hyperbonnard text-3xl sm:text-4xl uppercase tracking-wide text-white">
                Three-Year Milestones
              </h2>
              <p className="text-sm text-white/75 mt-1 font-sans">
                Clear milestones charting how THE DEVOTED ONES will grow and serve the Kingdom.
              </p>
            </div>

            {/* Year Selector Tabs */}
            <div className="flex items-center gap-2 p-1.5 rounded-xl bg-[#0e0e0e] border border-white/15 self-start md:self-auto">
              {([1, 2, 3] as const).map((year) => (
                <button
                  key={year}
                  type="button"
                  onClick={() => setActiveYear(year)}
                  className={`px-4 py-2 rounded-lg text-xs uppercase tracking-wider transition-all cursor-pointer font-bold ${
                    activeYear === year
                      ? 'bg-[#FFD700] text-black shadow-md'
                      : 'text-white/70 hover:text-white hover:bg-white/5'
                  }`}
                >
                  Year {year}
                </button>
              ))}
            </div>
          </div>

          {/* Active Year Header */}
          <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#0e0e0e] border border-white/15 p-5 rounded-xl">
            <div>
              <span className="text-xs uppercase tracking-wider text-[#FFD700] font-bold block mb-0.5">
                {milestonesByYear[activeYear].period}
              </span>
              <h3 className="font-hyperbonnard text-xl sm:text-2xl uppercase tracking-wide text-white">
                {milestonesByYear[activeYear].yearLabel}
              </h3>
              <p className="text-xs sm:text-sm text-white/75 font-sans mt-0.5">
                {milestonesByYear[activeYear].phaseSubtitle}
              </p>
            </div>
          </div>

          {/* Milestones Cards Grid: Dark neutral cards with gold accents (Reduced yellow dominance) */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeYear}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {milestonesByYear[activeYear].items.map((item) => {
                const IconComponent = item.icon;
                return (
                  <div
                    key={item.title}
                    className="group relative rounded-2xl border border-white/15 bg-[#0e0e0e] p-7 transition-all duration-300 hover:border-[#FFD700]/50 hover:shadow-[0_12px_32px_rgba(0,0,0,0.8)] shadow-[0_4px_24px_rgba(0,0,0,0.5)] flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-6">
                        <span className="text-sm tracking-wider font-bold text-[#FFD700]">
                          {item.number}
                        </span>
                        <div className="p-2.5 rounded-xl bg-black border border-white/10 text-[#FFD700] shadow-sm transition-transform duration-300 group-hover:scale-105">
                          <IconComponent className="h-4 w-4" />
                        </div>
                      </div>

                      <h4 className="font-hyperbonnard text-xl sm:text-2xl tracking-wide text-white uppercase mb-3">
                        {item.title}
                      </h4>

                      <p className="text-sm text-white/75 leading-relaxed font-sans font-normal">
                        {item.description}
                      </p>
                    </div>

                    <div className="pt-5 mt-5 border-t border-white/10 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#FFD700]">
                      <CheckCircle2 className="h-3.5 w-3.5" />
                      <span>Target Milestone</span>
                    </div>
                  </div>
                );
              })}
            </motion.div>
          </AnimatePresence>
        </section>

        {/* SECTION 2: OUR SACRED PROMISES */}
        <section className="mb-20 sm:mb-28">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-widest text-[#FFD700] mb-2 block">
              OUR COMMITMENTS TO YOU
            </span>
            <h2 className="font-hyperbonnard text-3xl sm:text-4xl md:text-5xl uppercase tracking-wide text-white mb-4">
              Our Sacred Promises
            </h2>
            <p className="text-sm sm:text-base text-white/80 font-sans leading-relaxed">
              Four non-negotiable promises that govern our leadership, content, and fellowship community.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {promises.map((promise) => {
              const PromiseIcon = promise.icon;
              return (
                <div
                  key={promise.title}
                  className="rounded-2xl border border-white/15 bg-[#0e0e0e] p-7 sm:p-8 shadow-[0_8px_30px_rgba(0,0,0,0.6)] hover:border-[#FFD700]/40 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <span className="text-sm tracking-wider font-bold text-[#FFD700]">
                        {promise.number}
                      </span>
                      <div className="p-3 rounded-xl bg-black border border-white/10 text-[#FFD700] shadow-sm">
                        <PromiseIcon className="h-5 w-5" />
                      </div>
                    </div>

                    <h3 className="font-hyperbonnard text-2xl sm:text-3xl tracking-wide uppercase text-white mb-3">
                      {promise.title}
                    </h3>

                    <p className="text-sm sm:text-base text-white/80 font-sans leading-relaxed">
                      {promise.description}
                    </p>
                  </div>

                  <div className="pt-6 mt-6 border-t border-white/10 text-xs font-semibold uppercase tracking-wider text-white/60 flex items-center justify-between">
                    <span className="text-[#FFD700]">Guaranteed Standard</span>
                    <span>THE DEVOTED ONES</span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* SECTION 3: CALL TO ACTION BANNER */}
        <section className="rounded-2xl border border-white/15 bg-[#0a0a0a] p-8 sm:p-12 text-center shadow-[0_12px_40px_rgba(0,0,0,0.9)] relative overflow-hidden">
          <div className="pointer-events-none absolute inset-0 bg-radial from-[#FFD700]/10 via-transparent to-transparent opacity-60" />

          <div className="relative z-10 max-w-2xl mx-auto">
            <span className="text-xs uppercase tracking-widest text-[#FFD700] block mb-2 font-bold">
              BECOME PART OF THIS VISION
            </span>

            <h3 className="font-hyperbonnard text-3xl sm:text-4xl md:text-5xl uppercase tracking-wide text-white mb-4">
              Walk With Us As We Grow
            </h3>

            <p className="text-sm sm:text-base text-white/85 mb-8 leading-relaxed font-sans">
              Whether you are looking to build daily devotional consistency or participate in kingdom-building fellowship, there is a place for you in THE DEVOTED ONES.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                type="button"
                onClick={onOpenJoin}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider text-black bg-[#FFD700] hover:bg-white transition-all shadow-[0_4px_20px_rgba(255,215,0,0.3)] active:scale-[0.98] cursor-pointer"
              >
                <span>JOIN THE COMMUNITY</span>
                <ArrowRight className="h-4 w-4" />
              </button>

              <button
                type="button"
                onClick={onOpenEbook}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider text-white hover:text-black bg-transparent hover:bg-[#FFD700] border border-[#FFD700]/40 hover:border-[#FFD700] transition-all cursor-pointer"
              >
                <BookOpen className="h-4 w-4 text-[#FFD700]" />
                <span>GET DEVOTIONAL E-BOOK</span>
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
