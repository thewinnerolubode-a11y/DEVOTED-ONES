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
import { TestimoniesModal } from './components/TestimoniesModal';
import { LogoModal } from './components/LogoModal';

export default function App() {
  const [isOnboardingOpen, setIsOnboardingOpen] = useState(false);
  const [isTestimoniesOpen, setIsTestimoniesOpen] = useState(false);
  const [isLogoOpen, setIsLogoOpen] = useState(false);

  const handleOpenJoin = () => {
    setIsTestimoniesOpen(false);
    setIsLogoOpen(false);
    setIsOnboardingOpen(true);
  };

  const handleCloseJoin = () => {
    setIsOnboardingOpen(false);
  };

  const handleOpenTestimonies = () => {
    setIsLogoOpen(false);
    setIsTestimoniesOpen(true);
  };

  const handleCloseTestimonies = () => {
    setIsTestimoniesOpen(false);
  };

  const handleOpenLogo = () => {
    setIsLogoOpen(true);
  };

  const handleCloseLogo = () => {
    setIsLogoOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#000000] text-[#FFFFFF] flex flex-col selection:bg-[#FFD700] selection:text-[#000000]">
      {/* 3-Zone Navigation */}
      <Navbar
        onOpenJoin={handleOpenJoin}
        onOpenTestimonies={handleOpenTestimonies}
        onOpenLogo={handleOpenLogo}
      />

      {/* Main Homepage Flow */}
      <main className="flex-1">
        {/* 1. Hero */}
        <Hero
          onOpenJoin={handleOpenJoin}
          onOpenTestimonies={handleOpenTestimonies}
          onOpenLogo={handleOpenLogo}
        />

        {/* 2. About */}
        <About />

        {/* 3. The Devoted Life */}
        <DevotedLife />

        {/* 4. What We Do */}
        <WhatWeDo />

        {/* 5. Final CTA */}
        <FinalCta
          onOpenJoin={handleOpenJoin}
        />
      </main>

      {/* 6. Footer */}
      <Footer
        onOpenLogo={handleOpenLogo}
      />

      {/* Overlays / Modals */}
      <OnboardingModal
        isOpen={isOnboardingOpen}
        onClose={handleCloseJoin}
      />

      <TestimoniesModal
        isOpen={isTestimoniesOpen}
        onClose={handleCloseTestimonies}
        onOpenJoin={handleOpenJoin}
      />

      <LogoModal
        isOpen={isLogoOpen}
        onClose={handleCloseLogo}
      />
    </div>
  );
}
