import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { BrandLogo } from './BrandLogo';

interface NavbarProps {
  onOpenJoin: () => void;
  onOpenTestimonies: () => void;
  onOpenLogo?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenJoin, onOpenTestimonies, onOpenLogo }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-[#FFD700]/20 bg-[#000000]/95 backdrop-blur-md">
      <div className="mx-auto flex h-20 sm:h-24 max-w-6xl items-center justify-between gap-6 px-6 lg:px-8">
        {/* Zone 1: Brand Logo & Wordmark with HYPERBONNARDREGULAR */}
        <button
          onClick={onOpenLogo}
          className="flex items-center gap-3.5 group shrink-0 text-left cursor-pointer focus:outline-none"
          title="Click to view or upload brand logo"
        >
          <BrandLogo size="md" showText={true} interactive={true} />
        </button>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-[#FFFFFF]/80">
          <button
            onClick={() => scrollToSection('about')}
            className="hover:text-[#FFD700] transition-colors cursor-pointer whitespace-nowrap shrink-0"
          >
            About
          </button>
          <button
            onClick={() => scrollToSection('devoted-life')}
            className="hover:text-[#FFD700] transition-colors cursor-pointer whitespace-nowrap shrink-0"
          >
            The Devoted Life
          </button>
          <button
            onClick={() => scrollToSection('what-we-do')}
            className="hover:text-[#FFD700] transition-colors cursor-pointer whitespace-nowrap shrink-0"
          >
            What We Do
          </button>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenTestimonies();
            }}
            className="hover:text-[#FFD700] transition-colors cursor-pointer whitespace-nowrap shrink-0"
          >
            Testimonies
          </button>
        </nav>

        {/* Zone 3: Primary Action */}
        <div className="hidden md:flex items-center gap-3 shrink-0">
          <button
            onClick={onOpenJoin}
            className="px-4 py-2 text-xs font-bold uppercase tracking-wider text-[#000000] bg-[#FFD700] hover:bg-[#FFFFFF] hover:text-[#000000] rounded-md transition-all shadow-sm active:scale-[0.98] cursor-pointer whitespace-nowrap shrink-0"
          >
            Join Community
          </button>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-[#FFFFFF]/80 hover:text-[#FFD700] transition-colors cursor-pointer"
          aria-label="Toggle mobile menu"
        >
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-[#FFD700]/20 bg-[#000000] px-6 py-5">
          <div className="flex flex-col gap-4 text-sm font-medium text-[#FFFFFF]/90">
            <button
              onClick={() => scrollToSection('about')}
              className="text-left py-2 hover:text-[#FFD700] transition-colors"
            >
              About
            </button>
            <button
              onClick={() => scrollToSection('devoted-life')}
              className="text-left py-2 hover:text-[#FFD700] transition-colors"
            >
              The Devoted Life
            </button>
            <button
              onClick={() => scrollToSection('what-we-do')}
              className="text-left py-2 hover:text-[#FFD700] transition-colors"
            >
              What We Do
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenTestimonies();
              }}
              className="text-left py-2 text-[#FFD700] hover:text-[#FFFFFF] transition-colors"
            >
              Testimonies
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenJoin();
              }}
              className="mt-2 w-full py-2.5 text-center text-xs font-bold uppercase tracking-wider text-[#000000] bg-[#FFD700] hover:bg-[#FFFFFF] rounded-md transition-all"
            >
              Join the Community
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
