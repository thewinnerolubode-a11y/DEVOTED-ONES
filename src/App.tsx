/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Navbar, AppPage } from './components/Navbar';
import { Hero } from './components/Hero';
import { MarqueeTicker } from './components/MarqueeTicker';
import { HomeCommunitySection } from './components/HomeCommunitySection';
import { HomeApproachSection } from './components/HomeApproachSection';
import { HomeProgramsPreview } from './components/HomeProgramsPreview';
import { HomeTestimonialPreview } from './components/HomeTestimonialPreview';
import { HomeFinalCta } from './components/HomeFinalCta';
import { AboutPage } from './components/AboutPage';
import { ProgramsPage } from './components/ProgramsPage';
import { Footer } from './components/Footer';
import { OnboardingModal } from './components/OnboardingModal';
import { DevotionalEbookModal } from './components/DevotionalEbookModal';
import { AdminDashboard } from './components/AdminDashboard';

export default function App() {
  const [isOnboardingOpen, setIsOnboardingOpen] = useState(false);
  const [isEbookModalOpen, setIsEbookModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState<AppPage>(() => {
    if (typeof window !== 'undefined' && (window.location.pathname.startsWith('/admin') || window.location.hash === '#admin')) {
      return 'admin';
    }
    return 'home';
  });

  const navigateTo = (targetPage: AppPage, sectionId?: string) => {
    setCurrentPage(targetPage);

    if (targetPage === 'admin') {
      window.history.pushState({}, '', '#admin');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (window.location.hash === '#admin') {
      window.history.pushState({}, '', window.location.pathname);
    }

    if (sectionId) {
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 120);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleOpenJoin = () => {
    setIsOnboardingOpen(true);
  };

  const handleCloseJoin = () => {
    setIsOnboardingOpen(false);
  };

  const handleOpenEbook = () => {
    setIsEbookModalOpen(true);
  };

  const handleCloseEbook = () => {
    setIsEbookModalOpen(false);
  };

  if (currentPage === 'admin') {
    return (
      <div className="min-h-screen bg-black text-white selection:bg-[#FFD700] selection:text-black">
        <AdminDashboard onBackToSite={() => navigateTo('home')} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col selection:bg-[#FFD700] selection:text-black">
      {/* Universal Sticky Header Navigation */}
      <Navbar
        currentPage={currentPage}
        onNavigate={navigateTo}
        onOpenJoin={handleOpenJoin}
        onOpenEbook={handleOpenEbook}
      />

      {/* Main Content Router */}
      <main className="flex-1">
        <AnimatePresence mode="wait">
          {/* HOMEPAGE */}
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
                onOpenEbook={handleOpenEbook}
              />
              <MarqueeTicker />
              <HomeCommunitySection
                onDiscoverCommunity={() => navigateTo('about')}
              />
              <HomeApproachSection />
              <HomeProgramsPreview
                onViewAllPrograms={() => navigateTo('programs')}
                onOpenEbook={handleOpenEbook}
                onOpenJoin={handleOpenJoin}
              />
              <HomeTestimonialPreview
                onReadMoreTestimonies={() => navigateTo('about', 'testimonials')}
              />
              <HomeFinalCta
                onOpenJoin={handleOpenJoin}
                onOpenEbook={handleOpenEbook}
              />
            </motion.div>
          )}

          {/* ABOUT PAGE (Who We Are, What We Do, Our Vision, Testimonials) */}
          {currentPage === 'about' && (
            <motion.div
              key="about"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
            >
              <AboutPage
                onOpenJoin={handleOpenJoin}
                onOpenEbook={handleOpenEbook}
              />
            </motion.div>
          )}

          {/* PROGRAMS PAGE */}
          {currentPage === 'programs' && (
            <motion.div
              key="programs"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
            >
              <ProgramsPage
                onOpenJoin={handleOpenJoin}
                onOpenEbook={handleOpenEbook}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Clean Global Footer */}
      <Footer
        onNavigate={navigateTo}
        onOpenJoin={handleOpenJoin}
        onOpenEbook={handleOpenEbook}
      />

      {/* Community Registration Modal (Google Apps Script & WhatsApp integration preserved) */}
      <OnboardingModal
        isOpen={isOnboardingOpen}
        onClose={handleCloseJoin}
      />

      {/* Get The Devotional Modal (Name, Email, Phone, Expectations) */}
      <DevotionalEbookModal
        isOpen={isEbookModalOpen}
        onClose={handleCloseEbook}
        onOpenCommunityJoin={() => {
          handleCloseEbook();
          handleOpenJoin();
        }}
      />
    </div>
  );
}
