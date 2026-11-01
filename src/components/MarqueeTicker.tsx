import React from 'react';

const TICKER_ITEMS = [
  'COMMUNITY + DEVOTION + GROWTH',
  '1,000+ YOUNG BELIEVERS',
  'DAILY MORNING PRAYER',
  'SCRIPTURE-LED DISCIPLESHIP',
  '100 STUDENT & WORKPLACE LEADERS',
  '10 FELLOWSHIP CELLS',
  'LIVING EXCELLENTLY FOR CHRIST',
  'INTENTIONAL SPIRITUAL CONSISTENCY',
];

export const MarqueeTicker: React.FC = () => {
  return (
    <div className="relative w-full overflow-hidden border-y border-white/10 bg-[#090909] py-3.5 select-none">
      {/* Subtle fade edges for clean transition */}
      <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 z-10 bg-gradient-to-r from-black to-transparent" />
      <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 z-10 bg-gradient-to-l from-black to-transparent" />

      <div className="flex w-max animate-marquee whitespace-nowrap">
        {/* Double array for seamless infinite marquee loop */}
        {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, idx) => (
          <div key={idx} className="flex items-center mx-5 text-xs sm:text-sm font-bold uppercase tracking-[0.2em]">
            <span className={idx % 2 === 0 ? 'text-[#FFD700]' : 'text-white/80'}>{item}</span>
            <span className="mx-4 text-white/30 font-normal">✦</span>
          </div>
        ))}
      </div>
    </div>
  );
};
