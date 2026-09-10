import React, { useState, useEffect, useRef } from 'react';
import { 
  Calculator, 
  Search, 
  Menu, 
  X
} from 'lucide-react';
import { CurrencyCode, AppViewMode } from '../../types';
import { LanguageSwitcher } from './LanguageSwitcher';
import { CurrencySwitcher } from './CurrencySwitcher';
import { useLanguage } from '../../i18n/LanguageContext';

interface NavbarProps {
  onGoHome: () => void;
  onGoToAllCalculators?: () => void;
  onSelectCategory?: (categoryId: string) => void;
  onGoToBlog: () => void;
  onGoToAbout: () => void;
  onGoToContact: () => void;
  onGoToSitemap?: () => void;
  onOpenSearch?: () => void;
  onOpenHistory?: () => void;
  savedCount?: number;
  currency?: CurrencyCode;
  onChangeCurrency?: (curr: CurrencyCode) => void;
  currentView?: AppViewMode;
  selectedCategoryId?: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  onGoHome,
  onGoToAllCalculators,
  onGoToBlog,
  onGoToAbout,
  onGoToContact,
  onOpenSearch,
  currentView = 'home'
}) => {
  const { t } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [inlineSearchQuery, setInlineSearchQuery] = useState('');
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Scroll detection for navbar shadow
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Focus input when inline search expands
  useEffect(() => {
    if (isSearchExpanded && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchExpanded]);

  // Primary navigation links: Home | All Calculators | Blog | About | Contact
  const navLinks = [
    {
      id: 'home',
      label: t('nav.home', 'Home'),
      onClick: () => {
        onGoHome();
        setIsMobileMenuOpen(false);
      },
      isActive: currentView === 'home'
    },
    {
      id: 'calculators',
      label: t('nav.allCalculators', 'All Calculators'),
      onClick: () => {
        if (onGoToAllCalculators) {
          onGoToAllCalculators();
        }
        setIsMobileMenuOpen(false);
      },
      isActive: currentView === 'all-calculators'
    },
    {
      id: 'blog',
      label: t('nav.blog', 'Blog'),
      onClick: () => {
        onGoToBlog();
        setIsMobileMenuOpen(false);
      },
      isActive: currentView === 'blog' || currentView === 'blog-post'
    },
    {
      id: 'about',
      label: t('nav.about', 'About'),
      onClick: () => {
        onGoToAbout();
        setIsMobileMenuOpen(false);
      },
      isActive: currentView === 'about'
    },
    {
      id: 'contact',
      label: t('nav.contact', 'Contact'),
      onClick: () => {
        onGoToContact();
        setIsMobileMenuOpen(false);
      },
      isActive: currentView === 'contact'
    }
  ];

  const handleInlineSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onOpenSearch) {
      onOpenSearch();
    }
    setIsSearchExpanded(false);
    setInlineSearchQuery('');
  };

  return (
    <header 
      className={`no-print sticky top-0 z-[1000] w-full bg-[#FFFFFF] border-b border-[#E2E8F0] transition-shadow duration-200 ${
        isScrolled ? 'shadow-[0_4px_20px_rgba(0,0,0,0.06)]' : ''
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-[60px] gap-3 sm:gap-6 w-full">
          
          {/* Logo: Calcul in #0F172A, io in #F97316, font 800, 24px */}
          <div 
            id="nav-brand-logo"
            onClick={onGoHome}
            className="flex items-center gap-2 cursor-pointer shrink-0 select-none"
          >
            <div className="w-8 h-8 rounded-[8px] bg-[#F97316] flex items-center justify-center text-white shadow-xs">
              <Calculator className="w-4.5 h-4.5 stroke-[2.5]" />
            </div>
            <span className="text-[22px] sm:text-[24px] font-[800] tracking-tight leading-none">
              <span className="text-[#0F172A]">Calcul</span>
              <span className="text-[#F97316]">io</span>
            </span>
          </div>

          {/* Desktop Nav Links */}
          <nav 
            id="desktop-navigation-links"
            aria-label="Main Navigation"
            className="hidden md:flex items-center gap-3.5 md:gap-4 lg:gap-6 xl:gap-7 h-full whitespace-nowrap shrink-0"
          >
            {navLinks.map((link) => (
              <button
                key={link.id}
                id={`nav-link-${link.id}`}
                onClick={link.onClick}
                className={`relative h-full flex items-center px-1 text-[13px] md:text-[14px] lg:text-[15px] transition-colors cursor-pointer duration-150 whitespace-nowrap select-none ${
                  link.isActive
                    ? 'text-[#F97316] font-semibold'
                    : 'text-[#475569] hover:text-[#F97316] font-medium'
                }`}
              >
                <span className="whitespace-nowrap">{link.label}</span>
                {link.isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#F97316] rounded-full" />
                )}
              </button>
            ))}
          </nav>

          {/* Right Controls: Search, Language, Currency, Get Started, Mobile Hamburger */}
          <div className="flex items-center gap-2 sm:gap-2.5 lg:gap-3 shrink-0">
            
            {/* Inline Search Expansion */}
            <div className="relative flex items-center">
              {isSearchExpanded ? (
                <form onSubmit={handleInlineSearchSubmit} className="flex items-center">
                  <div className="relative flex items-center">
                    <input
                      ref={searchInputRef}
                      type="text"
                      value={inlineSearchQuery}
                      onChange={(e) => setInlineSearchQuery(e.target.value)}
                      placeholder={t('home.searchPlaceholderClean', 'Search calculators...')}
                      className="w-44 sm:w-56 h-9 pl-8.5 pr-7 text-xs sm:text-sm bg-[#F8FAFC] border border-[#E2E8F0] rounded-[8px] focus:outline-none focus:border-[#F97316] focus:ring-2 focus:ring-[#F97316]/20 text-[#0F172A] placeholder:text-[#64748B] transition-all"
                    />
                    <Search className="w-4 h-4 text-[#64748B] absolute left-2.5 pointer-events-none" />
                    <button
                      type="button"
                      onClick={() => setIsSearchExpanded(false)}
                      className="absolute right-2 text-[#64748B] hover:text-[#0F172A] p-0.5 cursor-pointer"
                      aria-label="Close search"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </form>
              ) : (
                <button
                  type="button"
                  onClick={() => setIsSearchExpanded(true)}
                  className="w-9 h-9 flex items-center justify-center rounded-[8px] text-[#475569] hover:text-[#F97316] hover:bg-[#FFF7ED] transition-colors cursor-pointer border border-transparent hover:border-[#FDBA74]"
                  aria-label="Search calculators"
                  title="Search (Cmd+K / Ctrl+K)"
                >
                  <Search className="w-4.5 h-4.5" />
                </button>
              )}
            </div>

            {/* Language & Currency Switchers */}
            <LanguageSwitcher />
            <CurrencySwitcher />

            {/* Get Started Button: bg #F97316, hover #EA580C, text white, border-radius 8px */}
            <button
              type="button"
              onClick={onGoToAllCalculators || onGoHome}
              className="hidden sm:inline-flex items-center justify-center h-9 px-3.5 sm:px-4 rounded-[8px] bg-[#F97316] hover:bg-[#EA580C] text-white text-xs sm:text-sm font-semibold transition-all duration-150 shadow-xs hover:shadow-md cursor-pointer active:scale-[0.98] whitespace-nowrap"
            >
              Get Started
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden w-9 h-9 flex items-center justify-center rounded-[8px] text-[#475569] hover:text-[#0F172A] bg-[#F8FAFC] hover:bg-[#FFF7ED] border border-[#E2E8F0] transition-colors cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu: Background #FFFFFF, Border #E2E8F0 */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-[#FFFFFF] border-t border-[#E2E8F0] px-4 py-3.5 shadow-lg animate-in fade-in slide-in-from-top-2 duration-200">
          <nav className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={link.onClick}
                className={`w-full text-left px-3.5 py-2.5 rounded-[8px] text-[16px] transition-colors flex items-center justify-between cursor-pointer ${
                  link.isActive
                    ? 'text-[#F97316] bg-[#FFF7ED] font-[600] border-l-2 border-[#F97316]'
                    : 'text-[#475569] hover:text-[#0F172A] hover:bg-[#FFF7ED]/60 font-[500]'
                }`}
              >
                <span>{link.label}</span>
                {link.isActive && <span className="w-2 h-2 rounded-full bg-[#F97316]" />}
              </button>
            ))}

            <div className="pt-3 mt-1 border-t border-[#E2E8F0]">
              <button
                type="button"
                onClick={() => {
                  if (onGoToAllCalculators) onGoToAllCalculators();
                  setIsMobileMenuOpen(false);
                }}
                className="w-full py-2.5 rounded-[8px] bg-[#F97316] hover:bg-[#EA580C] text-white text-sm font-bold text-center transition-colors shadow-xs"
              >
                Get Started
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};


