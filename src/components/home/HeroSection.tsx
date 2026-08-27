import React, { useState, useRef, useMemo } from 'react';
import { 
  Search, 
  ArrowRight, 
  X,
  Check
} from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext';

interface HeroSectionProps {
  onSelectCalculator: (id: string) => void;
  onSelectCategory: (catId: string) => void;
  onBrowseAll?: () => void;
  onScrollToPopular?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onSelectCalculator,
  onBrowseAll,
  onScrollToPopular
}) => {
  const { t, language, calculators, categories } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  // Filtered calculators
  const matchedCalculators = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return [];

    const scored = calculators.map(calc => {
      let score = 0;
      const nameLower = calc.name.toLowerCase();
      
      if (nameLower === q) score += 100;
      else if (nameLower.startsWith(q)) score += 50;
      else if (nameLower.includes(q)) score += 30;

      if (calc.tags?.some(tag => tag.toLowerCase().includes(q))) score += 20;
      if ((calc.shortDescription || '').toLowerCase().includes(q)) score += 10;
      if (calc.popular) score += 2;

      return { calc, score };
    });

    return scored
      .filter(item => item.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 6)
      .map(item => item.calc);
  }, [searchQuery, calculators]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (matchedCalculators.length > 0) {
      onSelectCalculator(matchedCalculators[selectedIndex] ? matchedCalculators[selectedIndex].id : matchedCalculators[0].id);
      setShowDropdown(false);
      setSearchQuery('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!showDropdown) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => (prev + 1) % Math.max(1, matchedCalculators.length));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => (prev - 1 + matchedCalculators.length) % Math.max(1, matchedCalculators.length));
    } else if (e.key === 'Escape') {
      setShowDropdown(false);
    }
  };

  return (
    <section 
      id="hero-section"
      className="bg-[#F8FAFC] py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 border-b border-[#E2E8F0] relative overflow-hidden flex items-center justify-center"
    >
      <div className="max-w-4xl lg:max-w-5xl mx-auto text-center space-y-6 sm:space-y-7 relative z-10 w-full">
        
        {/* Main Headline */}
        <h1 
          id="hero-headline"
          className="text-[32px] sm:text-[42px] md:text-[48px] lg:text-[52px] font-[800] tracking-tight text-[#d60a00] italic leading-[1.18] max-w-4xl mx-auto"
        >
          {t('home.heroHeadline', 'Welcome to Calculio — Simple Calculations, Clear Results')}
        </h1>

        {/* Subtitle Description */}
        <p 
          id="hero-description"
          className="text-[17px] sm:text-[19px] md:text-[20px] text-[#1a1a1a] max-w-[720px] mx-auto leading-[1.6] font-[400]"
        >
          {t('home.heroSubtitleClean', 'Explore easy-to-use calculators for finance, health, math, conversions and more.')}
        </p>

        {/* Primary CTA Button: Explore Calculators */}
        <div className="pt-1 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
          <button
            id="hero-explore-calculators-cta"
            type="button"
            onClick={() => onBrowseAll?.()}
            className="bg-[#F97316] hover:bg-[#EA580C] text-white rounded-[10px] px-7 py-3.5 font-[600] text-[16px] sm:text-[17px] transition-all duration-150 shadow-sm hover:shadow-md cursor-pointer inline-flex items-center gap-2.5 active:scale-[0.98]"
            aria-label={t('home.exploreCalculators', 'Explore Calculators')}
          >
            <span>{t('home.exploreCalculators', 'Explore Calculators')}</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            id="hero-popular-calculators-cta"
            type="button"
            onClick={onScrollToPopular}
            className="bg-[#FFFFFF] hover:bg-[#FFF7ED] border border-[#E2E8F0] hover:border-[#FDBA74] text-[#0F172A] rounded-[10px] px-6 py-3.5 font-[500] text-[15px] sm:text-[16px] transition-all duration-150 cursor-pointer inline-flex items-center gap-2 active:scale-[0.98] shadow-xs"
          >
            <span>{t('home.mostPopular', 'Most Popular')}</span>
          </button>
        </div>

        {/* Search bar */}
        <div className="relative max-w-[620px] mx-auto text-left pt-2">
          <form onSubmit={handleSearchSubmit} className="relative z-30">
            <div className="relative flex items-center shadow-xs rounded-[12px]">
              <Search className="w-5 h-5 text-[#64748B] absolute left-4 pointer-events-none" />
              <input
                ref={inputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setShowDropdown(true);
                  setSelectedIndex(0);
                }}
                onFocus={() => setShowDropdown(true)}
                onKeyDown={handleKeyDown}
                placeholder={t('home.searchPlaceholderClean', 'Search calculators (e.g. mortgage, BMI, loan, percentage)...')}
                className="w-full h-[52px] pl-12 pr-28 bg-[#FFFFFF] text-[#0F172A] text-[15px] sm:text-[16px] font-[400] rounded-[12px] border border-[#E2E8F0] focus:outline-none focus:border-[#F97316] focus:ring-2 focus:ring-[#F97316]/20 placeholder:text-[#64748B] transition-all"
              />

              {searchQuery && (
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery('');
                    inputRef.current?.focus();
                  }}
                  className="absolute right-24 p-1.5 rounded-[6px] text-[#64748B] hover:text-[#0F172A] transition-colors cursor-pointer"
                  aria-label="Clear search"
                >
                  <X className="w-4 h-4" />
                </button>
              )}

              {/* Search button */}
              <button
                type="submit"
                className="absolute right-1.5 h-[40px] px-4 bg-[#F97316] hover:bg-[#EA580C] text-white text-[14px] font-[600] rounded-[8px] transition-all flex items-center gap-1.5 cursor-pointer shadow-xs active:scale-[0.98]"
              >
                <span>{t('common.search', 'Search')}</span>
              </button>
            </div>
          </form>

          {/* Autocomplete Dropdown */}
          {showDropdown && matchedCalculators.length > 0 && (
            <>
              <div
                className="fixed inset-0 z-20"
                onClick={() => setShowDropdown(false)}
              />
              <div className="absolute top-full left-0 right-0 z-30 mt-2 bg-[#FFFFFF] rounded-[12px] border border-[#E2E8F0] shadow-xl overflow-hidden divide-y divide-[#E2E8F0] text-left">
                {matchedCalculators.map((c, idx) => {
                  const isSelected = idx === selectedIndex;

                  return (
                    <div
                      key={c.id}
                      onClick={() => {
                        onSelectCalculator(c.id);
                        setShowDropdown(false);
                        setSearchQuery('');
                      }}
                      onMouseEnter={() => setSelectedIndex(idx)}
                      className={`p-3.5 sm:p-4 cursor-pointer transition-colors flex items-center justify-between group ${
                        isSelected ? 'bg-[#FFF7ED] border-l-2 border-[#F97316]' : 'hover:bg-[#FFF7ED]'
                      }`}
                    >
                      <div className="space-y-0.5 min-w-0 pr-4">
                        <span className="font-[600] text-[15px] sm:text-[16px] text-[#0F172A] group-hover:text-[#F97316] transition-colors block">
                          {c.name}
                        </span>
                        <p className="text-[13px] text-[#475569] line-clamp-1 max-w-md">
                          {c.shortDescription || c.description}
                        </p>
                      </div>

                      <div className="flex items-center gap-1 text-[14px] font-[600] text-[#F97316] shrink-0">
                        <span>{t('common.launch', 'Open')}</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </div>

        {/* Stats & Trust Badges */}
        <div className="flex items-center justify-center pt-2">
          <div className="inline-flex flex-wrap items-center justify-center gap-2 sm:gap-4 px-4 sm:px-6 py-2 rounded-full bg-[#FFFFFF] border border-[#E2E8F0] text-[12px] sm:text-[13px] font-[500] text-[#475569] shadow-xs">
            <span className="inline-flex items-center gap-1.5 font-[600] text-[#0F172A]">
              <Check className="w-3.5 h-3.5 text-[#F97316]" />
              {calculators.length} Calculators
            </span>
            <span className="text-[#CBD5E1] hidden sm:inline">•</span>
            <span className="inline-flex items-center gap-1.5 font-[600] text-[#0F172A]">
              <Check className="w-3.5 h-3.5 text-[#F97316]" />
              {categories.length} Categories
            </span>
            <span className="text-[#CBD5E1] hidden sm:inline">•</span>
            <span className="inline-flex items-center gap-1.5 font-[600] text-[#F97316]">
              <Check className="w-3.5 h-3.5 text-[#F97316]" />
              100% Free & No Sign-up
            </span>
          </div>
        </div>

      </div>
    </section>
  );
};



