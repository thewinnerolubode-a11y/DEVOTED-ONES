import React, { useState } from 'react';
import { Menu, X, ArrowRight, BookOpen, Compass, Sparkles } from 'lucide-react';
import { BrandLogo } from './BrandLogo';

export type AppPage = 'home' | 'about' | 'programs' | 'ebook' | 'vision' | 'admin';

interface NavbarProps {
  currentPage: AppPage;
  onNavigate: (page: AppPage, sectionId?: string) => void;
  onOpenJoin: () => void;
  onOpenEbook: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  onNavigate,
  onOpenJoin,
  onOpenEbook,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavAction = (action: () => void) => {
    setMobileMenuOpen(false);
    action();
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/10 bg-black/95 backdrop-blur-md">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between gap-4">
          {/* 1. Logo & Brand Area */}
          <div className="flex items-center shrink-0">
            <button
              type="button"
              onClick={() => handleNavAction(() => onNavigate('home'))}
              className="flex items-center gap-3 cursor-pointer group focus:outline-none"
              title="THE DEVOTED ONES - Home"
            >
              <BrandLogo size="sm" showText={true} interactive={false} />
            </button>
          </div>

          {/* 2. Desktop Navigation Links (STRICTLY ONE LINE, NO WRAPPING) */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8 whitespace-nowrap text-xs font-semibold uppercase tracking-wider text-white/80">
            <button
              type="button"
              onClick={() => onNavigate('home')}
              className={`hover:text-[#FFD700] transition-colors cursor-pointer py-1 ${
                currentPage === 'home' ? 'text-[#FFD700] font-bold' : 'text-white/75'
              }`}
            >
              Home
            </button>

            <button
              type="button"
              onClick={() => onNavigate('about')}
              className={`hover:text-[#FFD700] transition-colors cursor-pointer py-1 ${
                currentPage === 'about' ? 'text-[#FFD700] font-bold' : 'text-white/75'
              }`}
            >
              About
            </button>

            <button
              type="button"
              onClick={() => onNavigate('programs')}
              className={`hover:text-[#FFD700] transition-colors cursor-pointer py-1 ${
                currentPage === 'programs' ? 'text-[#FFD700] font-bold' : 'text-white/75'
              }`}
            >
              Programs
            </button>

            <button
              type="button"
              onClick={onOpenEbook}
              className="hover:text-[#FFD700] transition-colors cursor-pointer py-1 text-white/75 flex items-center gap-1.5"
            >
              <BookOpen className="h-3.5 w-3.5 text-[#FFD700]" />
              <span>Get the Devotional</span>
            </button>
          </nav>

          {/* 3. Primary CTA Button (Visually Separated) */}
          <div className="hidden md:flex items-center gap-4 shrink-0">
            <div className="h-5 w-px bg-white/20" aria-hidden="true" />
            <button
              type="button"
              onClick={onOpenJoin}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider text-black bg-[#FFD700] hover:bg-white hover:text-black transition-all shadow-[0_2px_15px_rgba(255,215,0,0.3)] active:scale-[0.98] cursor-pointer"
            >
              <span>JOIN US</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>

          {/* 4. Mobile Menu Button */}
          <div className="flex items-center gap-3 md:hidden">
            <button
              type="button"
              onClick={onOpenJoin}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider text-black bg-[#FFD700] hover:bg-white transition-colors cursor-pointer"
            >
              <span>JOIN US</span>
            </button>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-white hover:text-[#FFD700] hover:bg-white/10 transition-colors cursor-pointer"
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-white/10 bg-black/98 px-6 py-6 animate-in slide-in-from-top-4 duration-200">
          <nav className="flex flex-col gap-4 text-sm font-semibold uppercase tracking-wider">
            <button
              type="button"
              onClick={() => handleNavAction(() => onNavigate('home'))}
              className={`text-left py-2 hover:text-[#FFD700] transition-colors cursor-pointer flex items-center justify-between ${
                currentPage === 'home' ? 'text-[#FFD700] font-bold' : 'text-white'
              }`}
            >
              <span>Home</span>
              {currentPage === 'home' && <span className="text-xs text-[#FFD700]">●</span>}
            </button>

            <button
              type="button"
              onClick={() => handleNavAction(() => onNavigate('about'))}
              className={`text-left py-2 hover:text-[#FFD700] transition-colors cursor-pointer flex items-center justify-between ${
                currentPage === 'about' ? 'text-[#FFD700] font-bold' : 'text-white'
              }`}
            >
              <span>About (Who We Are, Vision, Stories)</span>
              {currentPage === 'about' && <span className="text-xs text-[#FFD700]">●</span>}
            </button>

            <button
              type="button"
              onClick={() => handleNavAction(() => onNavigate('programs'))}
              className={`text-left py-2 hover:text-[#FFD700] transition-colors cursor-pointer flex items-center justify-between ${
                currentPage === 'programs' ? 'text-[#FFD700] font-bold' : 'text-white'
              }`}
            >
              <span>Programs & Fellowships</span>
              {currentPage === 'programs' && <span className="text-xs text-[#FFD700]">●</span>}
            </button>

            <button
              type="button"
              onClick={() => handleNavAction(onOpenEbook)}
              className="text-left py-2 text-white hover:text-[#FFD700] transition-colors cursor-pointer flex items-center gap-2"
            >
              <BookOpen className="h-4 w-4 text-[#FFD700]" />
              <span>Get the Devotional</span>
            </button>

            <div className="pt-4 border-t border-white/10 flex flex-col gap-3">
              <button
                type="button"
                onClick={() => handleNavAction(onOpenJoin)}
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-xs font-bold uppercase tracking-wider text-black bg-[#FFD700] hover:bg-white transition-colors cursor-pointer shadow-md"
              >
                <span>JOIN THE COMMUNITY</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
