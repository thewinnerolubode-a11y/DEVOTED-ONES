/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Navbar, AppPage } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { DevotedLife } from './components/DevotedLife';
import { WhatWeDo } from './components/WhatWeDo';
import { FinalCta } from './components/FinalCta';
import { Footer } from './components/Footer';
import { OnboardingModal } from './components/OnboardingModal';
import { LogoModal } from './components/LogoModal';
import { TestimonialsSection } from './components/Testimonies section';
import { TestimoniesPage } from './components/TestimoniesPage';
import { DevotionalEbookPage } from './components/DevotionalEbookPage';
import { VisionPage } from './components/VisionPage';

export default function App() {
  const [isOnboardingOpen, setIsOnboardingOpen] = useState(false);
  const [isLogoOpen, setIsLogoOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState<AppPage>('home');

  const navigateTo = (targetPage: AppPage, sectionId?: string) => {
    setIsLogoOpen(false);

    if (targetPage === 'home') {
      const wasAlreadyHome = currentPage === 'home';
      setCurrentPage('home');

      if (sectionId) {
        if (wasAlreadyHome) {
          const el = document.getElementById(sectionId);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
          }
        } else {
          // If switching from another page, wait for AnimatePresence transition mount
          setTimeout(() => {
            const el = document.getElementById(sectionId);
            if (el) {
              el.scrollIntoView({ behavior: 'smooth' });
            }
          }, 150);
        }
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } else {
      setCurrentPage(targetPage);
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  };

  const handleOpenJoin = () => {
    setIsLogoOpen(false);
    setIsOnboardingOpen(true);
  };

  const handleCloseJoin = () => {
    setIsOnboardingOpen(false);
  };

  const handleOpenTestimonies = () => {
    navigateTo('testimonies');
  };

  const handleOpenEbook = () => {
    navigateTo('ebook');
  };

  const handleOpenVision = () => {
    navigateTo('vision');
  };

  const handleBackHome = () => {
    navigateTo('home');
  };

  const handleOpenLogo = () => {
    setIsLogoOpen(true);
  };

  const handleCloseLogo = () => {
    setIsLogoOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#000000] text-[#FFFFFF] flex flex-col selection:bg-[#FFD700] selection:text-[#000000]">
      <Navbar
        currentPage={currentPage}
        onNavigate={navigateTo}
        onOpenJoin={handleOpenJoin}
        onOpenTestimonies={handleOpenTestimonies}
        onOpenEbook={handleOpenEbook}
        onOpenVision={handleOpenVision}
        onOpenLogo={handleOpenLogo}
      />

      <main className="flex-1">
        <AnimatePresence mode="wait">
          {currentPage === 'home' && (
            <motion.div
              key="home"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Hero
                onOpenJoin={handleOpenJoin}
                onOpenTestimonies={handleOpenTestimonies}
                onOpenEbook={handleOpenEbook}
                onOpenVision={handleOpenVision}
                onOpenLogo={handleOpenLogo}
              />
              <About />
              <DevotedLife />
              <WhatWeDo onOpenEbook={handleOpenEbook} />
              <TestimonialsSection onReadAll={handleOpenTestimonies} />
              <FinalCta onOpenJoin={handleOpenJoin} onOpenEbook={handleOpenEbook} />
            </motion.div>
          )}

          {currentPage === 'testimonies' && (
            <motion.div
              key="testimonies"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <TestimoniesPage onBack={handleBackHome} onOpenEbook={handleOpenEbook} />
            </motion.div>
          )}

          {currentPage === 'ebook' && (
            <motion.div
              key="ebook"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <DevotionalEbookPage
                onBack={handleBackHome}
                onOpenJoin={handleOpenJoin}
                onOpenVision={handleOpenVision}
                onOpenLogo={handleOpenLogo}
              />
            </motion.div>
          )}

          {currentPage === 'vision' && (
            <motion.div
              key="vision"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <VisionPage
                onBack={handleBackHome}
                onOpenJoin={handleOpenJoin}
                onOpenEbook={handleOpenEbook}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <Footer
        onNavigate={navigateTo}
        onOpenJoin={handleOpenJoin}
        onOpenTestimonies={handleOpenTestimonies}
        onOpenEbook={handleOpenEbook}
        onOpenVision={handleOpenVision}
        onOpenLogo={handleOpenLogo}
      />

      <OnboardingModal
        isOpen={isOnboardingOpen}
        onClose={handleCloseJoin}
      />

      <LogoModal
        isOpen={isLogoOpen}
        onClose={handleCloseLogo}
      />
    </div>
  );
}
