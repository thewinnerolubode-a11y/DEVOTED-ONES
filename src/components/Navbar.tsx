import React, { useState } from 'react';
import { Menu, X, ArrowRight, BookOpen, Compass, Sparkles } from 'lucide-react';
import { BrandLogo } from './BrandLogo';

export type AppPage = 'home' | 'testimonies' | 'ebook' | 'vision';

interface NavbarProps {
  currentPage: AppPage;
  onNavigate: (page: AppPage, sectionId?: string) => void;
  onOpenJoin: () => void;
  onOpenTestimonies: () => void;
  onOpenEbook: () => void;
  onOpenVision: () => void;
  onOpenLogo?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  onNavigate,
  onOpenJoin,
  onOpenTestimonies,
  onOpenEbook,
  onOpenVision,
  onOpenLogo,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (action: () => void) => {
    setMobileMenuOpen(false);
    action();
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-[#FFD700]/20 bg-[#000000]/95 backdrop-blur-md">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          {/* Logo & Brand Name */}
          <div className="flex items-center mr-6 lg:mr-10">
            <BrandLogo
              size="sm"
              showText={true}
              interactive={true}
              onClick={() => onNavigate('home')}
              className="cursor-pointer"
            />
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8 font-mono text-xs uppercase tracking-wider">
            <button
              type="button"
              onClick={() => onNavigate('home', 'about')}
              className={`transition-colors cursor-pointer ${
                currentPage === 'home'
                  ? 'text-[#FFFFFF]/85 hover:text-[#FFD700]'
                  : 'text-[#FFFFFF]/70 hover:text-[#FFD700]'
              }`}
            >
              About
            </button>

            <button
              type="button"
              onClick={() => onNavigate('home', 'devoted-life')}
              className={`transition-colors cursor-pointer ${
                currentPage === 'home'
                  ? 'text-[#FFFFFF]/85 hover:text-[#FFD700]'
                  : 'text-[#FFFFFF]/70 hover:text-[#FFD700]'
              }`}
            >
              The Devoted Life
            </button>

            <button
              type="button"
              onClick={() => onNavigate('home', 'what-we-do')}
              className={`transition-colors cursor-pointer ${
                currentPage === 'home'
                  ? 'text-[#FFFFFF]/85 hover:text-[#FFD700]'
                  : 'text-[#FFFFFF]/70 hover:text-[#FFD700]'
              }`}
            >
              What We Do
            </button>

            <button
              type="button"
              onClick={onOpenVision}
              className={`transition-colors cursor-pointer uppercase inline-flex items-center gap-1.5 ${
                currentPage === 'vision'
                  ? 'text-[#FFD700] font-bold border-b border-[#FFD700] pb-0.5'
                  : 'text-[#FFFFFF]/85 hover:text-[#FFD700]'
              }`}
            >
              <Compass className="h-3 w-3 text-[#FFD700]" />
              <span>Our Vision</span>
            </button>

            <button
              type="button"
              onClick={onOpenEbook}
              className={`transition-colors cursor-pointer uppercase inline-flex items-center gap-1.5 ${
                currentPage === 'ebook'
                  ? 'text-[#FFD700] font-bold border-b border-[#FFD700] pb-0.5'
                  : 'text-[#FFFFFF]/85 hover:text-[#FFD700]'
              }`}
            >
              <BookOpen className="h-3 w-3 text-[#FFD700]" />
              <span>Devotional E-Book</span>
            </button>

            <button
              type="button"
              onClick={onOpenTestimonies}
              className={`transition-colors cursor-pointer uppercase ${
                currentPage === 'testimonies'
                  ? 'text-[#FFD700] font-bold border-b border-[#FFD700] pb-0.5'
                  : 'text-[#FFFFFF]/85 hover:text-[#FFD700]'
              }`}
            >
              Testimonies
            </button>
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <button
              type="button"
              onClick={onOpenJoin}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider text-[#000000] bg-[#FFD700] hover:bg-[#FFFFFF] transition-all shadow-[0_2px_15px_rgba(255,215,0,0.25)] active:scale-[0.98] cursor-pointer"
            >
              <span>Join Us</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              type="button"
              onClick={onOpenJoin}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-[11px] font-bold uppercase tracking-wider text-[#000000] bg-[#FFD700] hover:bg-[#FFFFFF] transition-all cursor-pointer mr-1"
            >
              <span>Join</span>
            </button>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-[#FFFFFF]/80 hover:text-[#FFD700] hover:bg-[#FFFFFF]/5 transition-colors cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-[#FFD700]/20 bg-[#000000]/98 px-6 py-6 animate-in slide-in-from-top-2 duration-200">
          <div className="flex flex-col gap-3 font-mono text-sm uppercase tracking-wider">
            <button
              type="button"
              onClick={() => handleNavClick(() => onNavigate('home', 'about'))}
              className="text-left text-[#FFFFFF]/90 hover:text-[#FFD700] py-2 transition-colors cursor-pointer"
            >
              About
            </button>

            <button
              type="button"
              onClick={() => handleNavClick(() => onNavigate('home', 'devoted-life'))}
              className="text-left text-[#FFFFFF]/90 hover:text-[#FFD700] py-2 transition-colors cursor-pointer"
            >
              The Devoted Life
            </button>

            <button
              type="button"
              onClick={() => handleNavClick(() => onNavigate('home', 'what-we-do'))}
              className="text-left text-[#FFFFFF]/90 hover:text-[#FFD700] py-2 transition-colors cursor-pointer"
            >
              What We Do
            </button>

            <button
              type="button"
              onClick={() => handleNavClick(onOpenVision)}
              className={`text-left py-2 transition-colors cursor-pointer inline-flex items-center gap-2 ${
                currentPage === 'vision' ? 'text-[#FFD700] font-bold' : 'text-[#FFFFFF]/90 hover:text-[#FFD700]'
              }`}
            >
              <Compass className="h-4 w-4 text-[#FFD700]" />
              <span>Our Vision</span>
            </button>

            <button
              type="button"
              onClick={() => handleNavClick(onOpenEbook)}
              className={`text-left py-2 transition-colors cursor-pointer inline-flex items-center gap-2 ${
                currentPage === 'ebook' ? 'text-[#FFD700] font-bold' : 'text-[#FFFFFF]/90 hover:text-[#FFD700]'
              }`}
            >
              <BookOpen className="h-4 w-4 text-[#FFD700]" />
              <span>Get Devotional E-Book</span>
            </button>

            <button
              type="button"
              onClick={() => handleNavClick(onOpenTestimonies)}
              className={`text-left py-2 transition-colors cursor-pointer ${
                currentPage === 'testimonies' ? 'text-[#FFD700] font-bold' : 'text-[#FFFFFF]/90 hover:text-[#FFD700]'
              }`}
            >
              Testimonies
            </button>

            <div className="pt-4 border-t border-[#FFD700]/15 flex flex-col gap-3">
              <button
                type="button"
                onClick={() => handleNavClick(onOpenJoin)}
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg text-xs font-bold uppercase tracking-wider text-[#000000] bg-[#FFD700] hover:bg-[#FFFFFF] transition-all shadow-[0_2px_15px_rgba(255,215,0,0.25)] active:scale-[0.98] cursor-pointer"
              >
                <span>Join The Community</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
