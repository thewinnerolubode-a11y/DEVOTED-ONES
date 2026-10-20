import React from 'react';

export const About: React.FC = () => {
  return (
    <section id="about" className="py-20 md:py-24 border-t border-[#FFD700]/20 bg-[#000000] relative">
      <div className="mx-auto max-w-4xl px-6 lg:px-8 text-center">
        <span className="font-mono text-xs font-semibold tracking-widest uppercase text-[#FFD700] mb-3 block">
          ABOUT THE COMMUNITY
        </span>

        <h2 className="font-hyperbonnard text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-wide uppercase text-[#FFFFFF] mb-6 text-balance">
          More Than a Devotional. A Life of Devotion.
        </h2>

        <p className="text-lg md:text-xl text-[#FFFFFF]/90 leading-relaxed font-normal text-balance mb-8">
          The Devoted Ones is a community for young people who desire to take their walk with God seriously and allow that devotion to shape how they live and grow.
        </p>

        <div className="max-w-2xl mx-auto rounded-xl p-6 bg-[#FFD700]/[0.03] border border-[#FFD700]/25 text-sm md:text-base leading-relaxed">
          <p className="text-[#FFFFFF]">
            We exist to help you move from being inconsistent in your walk with God and in other areas of life to becoming a devoted person who prioritizes growth and is continually maturing.
          </p>
        </div>
      </div>
    </section>
  );
};
