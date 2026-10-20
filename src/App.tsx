/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
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

export default function App() {
  const [isOnboardingOpen, setIsOnboardingOpen] = useState(false);
  const [isLogoOpen, setIsLogoOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState<'home' | 'testimonies'>('home');

  const handleOpenJoin = () => {
    setIsLogoOpen(false);
    setIsOnboardingOpen(true);
  };

  const handleCloseJoin = () => {
    setIsOnboardingOpen(false);
  };

  const handleOpenTestimonies = () => {
    setIsLogoOpen(false);
    setCurrentPage('testimonies');
  };

  const handleBackHome = () => {
    setCurrentPage('home');
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
        onOpenJoin={handleOpenJoin}
        onOpenTestimonies={handleOpenTestimonies}
        onOpenLogo={handleOpenLogo}
      />

      {currentPage === 'home' ? (
        <main className="flex-1">
          <Hero
            onOpenJoin={handleOpenJoin}
            onOpenTestimonies={handleOpenTestimonies}
            onOpenLogo={handleOpenLogo}
          />
          <About />
          <DevotedLife />
          <WhatWeDo />
          <TestimonialsSection onReadAll={handleOpenTestimonies} />
          <FinalCta onOpenJoin={handleOpenJoin} />
        </main>
      ) : (
        <main className="flex-1">
          <TestimoniesPage onBack={handleBackHome} />
        </main>
      )}

      <Footer onOpenLogo={handleOpenLogo} />

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
