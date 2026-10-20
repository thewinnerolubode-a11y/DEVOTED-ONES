import React from 'react';
import { BookOpenText, FileText, Users } from 'lucide-react';

export const WhatWeDo: React.FC = () => {
  return (
    <section id="what-we-do" className="py-20 md:py-24 border-t border-[#FFD700]/20 bg-[#000000] relative">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <div className="max-w-2xl mb-14">
          <span className="font-mono text-xs font-semibold tracking-widest uppercase text-[#FFD700] mb-2 block">
            OUR CURRENT ACTIVITIES
          </span>
          <h2 className="font-hyperbonnard text-3xl sm:text-4xl md:text-5xl tracking-wide uppercase text-[#FFFFFF]">
            What We Do
          </h2>
          <p className="mt-3 text-[#FFFFFF]/80 text-base">
            Equipping young people with daily spiritual rhythms and practical resources.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="rounded-xl border border-[#FFD700]/25 bg-[#000000] p-8 flex flex-col justify-between hover:border-[#FFD700] hover:shadow-[0_0_20px_rgba(255,215,0,0.1)] transition-all">
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="p-3 rounded-lg bg-[#FFD700]/10 text-[#FFD700]">
                  <BookOpenText className="h-5 w-5" />
                </div>
                <span className="font-mono text-xs text-[#FFD700]">Daily Rhythm</span>
              </div>
              <h3 className="font-hyperbonnard text-xl sm:text-2xl tracking-wide text-[#FFFFFF] uppercase mb-3">
                Daily Devotional Teachings
              </h3>
              <p className="text-sm text-[#FFFFFF]/85 leading-relaxed font-sans">
                Scripture-based teachings designed to help young people spend meaningful time with God and apply His Word.
              </p>
            </div>
            <div className="pt-6 mt-6 border-t border-[#FFD700]/15 font-mono text-xs text-[#FFFFFF]/70">
              For personal devotion and daily application
            </div>
          </div>

          {/* Card 2 */}
          <div className="rounded-xl border border-[#FFD700]/25 bg-[#000000] p-8 flex flex-col justify-between hover:border-[#FFD700] hover:shadow-[0_0_20px_rgba(255,215,0,0.1)] transition-all">
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="p-3 rounded-lg bg-[#FFD700]/10 text-[#FFD700]">
                  <FileText className="h-5 w-5" />
                </div>
                <span className="font-mono text-xs text-[#FFD700]">Monthly Resource</span>
              </div>
              <h3 className="font-hyperbonnard text-xl sm:text-2xl tracking-wide text-[#FFFFFF] uppercase mb-3">
                Monthly Devotional E-Books
              </h3>
              <p className="text-sm text-[#FFFFFF]/85 leading-relaxed font-sans">
                Devotional resources provided monthly for personal devotion and continued spiritual growth.
              </p>
            </div>
            <div className="pt-6 mt-6 border-t border-[#FFD700]/15 font-mono text-xs text-[#FFFFFF]/70">
              In-depth monthly study editions
            </div>
          </div>

          {/* Card 3 */}
          <div className="rounded-xl border border-[#FFD700]/25 bg-[#000000] p-8 flex flex-col justify-between hover:border-[#FFD700] hover:shadow-[0_0_20px_rgba(255,215,0,0.1)] transition-all relative">
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="p-3 rounded-lg bg-[#FD7000]/10 text-[#FD7000]">
                  <Users className="h-5 w-5" />
                </div>
                <span className="font-mono text-xs font-bold text-[#FD7000] uppercase tracking-wider">
                  Coming Soon
                </span>
              </div>
              <h3 className="font-hyperbonnard text-xl sm:text-2xl tracking-wide text-[#FFFFFF] uppercase mb-3">
                Weekly Bible Study
              </h3>
              <p className="text-sm text-[#FFFFFF]/85 leading-relaxed font-sans">
                A weekly Bible study is currently being planned for deeper learning, discussion, and growth.
              </p>
            </div>
            <div className="pt-6 mt-6 border-t border-[#FFD700]/15 font-mono text-xs text-[#FFFFFF]/70 flex items-center justify-between">
              <span>Status: Currently in planning</span>
              <span className="text-[#FFD700] font-medium">Launching Soon</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
