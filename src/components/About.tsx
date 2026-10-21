import React from 'react';
import { motion } from 'framer-motion';

export const About: React.FC = () => {
  return (
    <section id="about" className="py-20 md:py-24 border-t border-[#FFD700]/20 bg-[#000000] relative">
      <div className="mx-auto max-w-4xl px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
        >
          <span className="font-mono text-xs font-semibold tracking-widest uppercase text-[#FFD700] mb-3 block">
            ABOUT THE COMMUNITY
          </span>

          <h2 className="font-hyperbonnard text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-wide uppercase text-[#FFFFFF] mb-6 text-balance">
            More Than a Devotional. A Life of Devotion.
          </h2>

          <p className="text-lg md:text-xl text-[#FFFFFF]/90 leading-relaxed font-normal text-balance mb-8">
            The Devoted Ones is a community for young people who desire to take their walk with God seriously and allow that devotion to shape how they live and grow.
          </p>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="max-w-2xl mx-auto rounded-xl p-7 bg-[#FFD700] border border-[#000000]/15 text-sm md:text-base leading-relaxed shadow-[0_4px_24px_rgba(0,0,0,0.35)]"
          >
            <p className="text-[#000000] font-medium leading-relaxed">
              We exist to help you move from being inconsistent in your walk with God and in other areas of life to becoming a devoted person who prioritizes growth and is continually maturing.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
