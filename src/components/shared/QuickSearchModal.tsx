import React, { useState, useEffect, useRef, useMemo } from 'react';
import { 
  Search, 
  X, 
  ArrowRight, 
  Calculator, 
  Sparkles, 
  Clock, 
  Tag,
  FolderOpen
} from 'lucide-react';
import { CalculatorMeta } from '../../types';
import { useLanguage } from '../../i18n/LanguageContext';

interface QuickSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectCalculator: (calculatorId: string) => void;
  onSelectCategory?: (categoryId: string) => void;
}

export const QuickSearchModal: React.FC<QuickSearchModalProps> = ({
  isOpen,
  onClose,
  onSelectCalculator,
  onSelectCategory
}) => {
  const { t, calculators, categories } = useLanguage();
  const [query, setQuery] = useState('');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>('all');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [recentSearches, setRecentSearches] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('calculio_recent_searches');
      return saved ? JSON.parse(saved) : ['Mortgage', 'BMI', 'Compound Interest'];
    } catch {
      return ['Mortgage', 'BMI', 'Compound Interest'];
    }
  });

  const popularSuggestions = useMemo(() => [
    calculators.find(c => c.id === 'mortgage-calculator')?.name || 'Mortgage',
    calculators.find(c => c.id === 'compound-interest-calculator')?.name || 'Compound Interest',
    calculators.find(c => c.id === 'bmi-calculator')?.name || 'BMI',
    calculators.find(c => c.id === 'calorie-tdee-calculator')?.name || 'Calorie & TDEE',
    calculators.find(c => c.id === 'debt-payoff-calculator')?.name || 'Debt Payoff',
    calculators.find(c => c.id === 'percentage-calculator')?.name || 'Percentage',
    calculators.find(c => c.id === 'unit-converter')?.name || 'Unit Converter',
    calculators.find(c => c.id === 'scientific-calculator')?.name || 'Scientific Math',
    calculators.find(c => c.id === 'auto-loan-calculator')?.name || 'Auto Loan',
    calculators.find(c => c.id === 'salary-calculator')?.name || 'Salary Calculator'
  ], [calculators]);

  const inputRef = useRef<HTMLInputElement>(null);
  const listContainerRef = useRef<HTMLDivElement>(null);

  // Focus input and reset on open
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setQuery('');
      setSelectedCategoryFilter('all');
      setSelectedIndex(0);
    }
  }, [isOpen]);

  const saveSearchTerm = (term: string) => {
    if (!term || term.trim().length < 2) return;
    const clean = term.trim();
    setRecentSearches(prev => {
      const filtered = prev.filter(s => s.toLowerCase() !== clean.toLowerCase());
      const updated = [clean, ...filtered].slice(0, 6);
      try {
        localStorage.setItem('calculio_recent_searches', JSON.stringify(updated));
      } catch (e) {
        console.warn(e);
      }
      return updated;
    });
  };

  const removeRecentSearch = (e: React.MouseEvent, termToRemove: string) => {
    e.stopPropagation();
    setRecentSearches(prev => {
      const updated = prev.filter(t => t !== termToRemove);
      try {
        localStorage.setItem('calculio_recent_searches', JSON.stringify(updated));
      } catch (e) {
        console.warn(e);
      }
      return updated;
    });
  };

  const clearAllRecent = (e: React.MouseEvent) => {
    e.stopPropagation();
    setRecentSearches([]);
    try {
      localStorage.removeItem('calculio_recent_searches');
    } catch (e) {
      console.warn(e);
    }
  };

  // Check matching category names for direct category jump
  const matchedCategories = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return categories.filter(cat => 
      cat.name.toLowerCase().includes(q) ||
      cat.id.toLowerCase().includes(q) ||
      cat.description.toLowerCase().includes(q)
    );
  }, [query, categories]);

  // Filter and score calculators
  const filteredCalculators = useMemo(() => {
    const q = query.trim().toLowerCase();

    let pool = calculators;

    // Apply category chip filter if selected
    if (selectedCategoryFilter !== 'all') {
      pool = pool.filter(c => c.category === selectedCategoryFilter);
    }

    if (!q) {
      // Default view when empty
      if (selectedCategoryFilter !== 'all') {
        return pool;
      }
      // Show popular / featured items
      return pool.filter(c => c.popular || c.featured).slice(0, 10);
    }

    // Scored search matching name, category, tags, and description
    const scored = pool.map(calc => {
      let score = 0;
      const nameLower = calc.name.toLowerCase();
      const descLower = calc.description.toLowerCase();
      const shortDescLower = (calc.shortDescription || '').toLowerCase();
      const catName = (categories.find(c => c.id === calc.category)?.name || '').toLowerCase();
      
      // Exact name match
      if (nameLower === q) score += 100;
      // Name starts with query
      else if (nameLower.startsWith(q)) score += 50;
      // Name contains query word
      else if (nameLower.includes(q)) score += 30;

      // Category matches
      if (catName.includes(q) || calc.category.toLowerCase().includes(q)) {
        score += 25;
      }

      // Tag matching
      const tagMatch = calc.tags?.some(t => t.toLowerCase().includes(q));
      if (tagMatch) score += 20;

      // Description matching
      if (shortDescLower.includes(q)) score += 10;
      else if (descLower.includes(q)) score += 5;

      if (calc.popular) score += 2;

      return { calc, score };
    });

    return scored
      .filter(item => item.score > 0)
      .sort((a, b) => b.score - a.score)
      .map(item => item.calc);
  }, [query, selectedCategoryFilter, calculators, categories]);

  // Keep selected index in bounds when list changes
  useEffect(() => {
    setSelectedIndex(0);
  }, [query, selectedCategoryFilter]);

  // Scroll active item into view
  useEffect(() => {
    if (listContainerRef.current) {
      const activeEl = listContainerRef.current.querySelector(`[data-search-idx="${selectedIndex}"]`);
      if (activeEl) {
        activeEl.scrollIntoView({ block: 'nearest' });
      }
    }
  }, [selectedIndex]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex(prev => (prev + 1) % Math.max(1, filteredCalculators.length));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex(prev => (prev - 1 + filteredCalculators.length) % Math.max(1, filteredCalculators.length));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (filteredCalculators[selectedIndex]) {
          const target = filteredCalculators[selectedIndex];
          saveSearchTerm(query || target.name);
          onSelectCalculator(target.id);
          onClose();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, selectedIndex, filteredCalculators, query, onSelectCalculator, onClose]);

  const handleLaunch = (calc: CalculatorMeta) => {
    saveSearchTerm(query || calc.name);
    onSelectCalculator(calc.id);
    onClose();
  };

  const handleCategoryJump = (catId: string) => {
    if (onSelectCategory) {
      onSelectCategory(catId);
      onClose();
    } else {
      setSelectedCategoryFilter(catId);
    }
  };

  // Helper to highlight matching characters
  const highlightMatch = (text: string, highlight: string) => {
    if (!highlight.trim()) return <span>{text}</span>;
    const regex = new RegExp(`(${highlight.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
    const parts = text.split(regex);
    return (
      <span>
        {parts.map((part, i) => 
          regex.test(part) ? (
            <mark key={i} className="bg-orange-200 text-slate-900 font-bold px-0.5 rounded">
              {part}
            </mark>
          ) : (
            <span key={i}>{part}</span>
          )
        )}
      </span>
    );
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 bg-[#0F172A]/50 backdrop-blur-sm flex items-start justify-center p-3 sm:p-6 pt-12 sm:pt-20 animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl bg-[#FFFFFF] rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.15)] border border-[#E2E8F0] overflow-hidden flex flex-col max-h-[85vh] transition-all"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="Site-wide Calculator Search"
      >
        {/* Search Header Input */}
        <div className="p-4 sm:p-5 border-b border-[#E2E8F0] flex items-center gap-3 bg-[#FFFFFF]">
          <div className="w-9 h-9 rounded-lg bg-[#FFF7ED] border border-[#FDBA74] flex items-center justify-center shrink-0">
            <Search className="w-5 h-5 text-[#F97316]" />
          </div>
          
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
            }}
            placeholder={t('home.searchPlaceholder', 'Search calculators by name, category, formula or keywords...')}
            className="w-full bg-transparent text-sm sm:text-base font-semibold text-[#0F172A] placeholder:text-[#64748B] focus:outline-none"
          />

          {query && (
            <button
              type="button"
              onClick={() => {
                setQuery('');
                inputRef.current?.focus();
              }}
              className="p-1.5 rounded-lg hover:bg-[#F8FAFC] text-[#64748B] hover:text-[#0F172A] transition-colors text-xs font-bold"
              title={t('common.clear', 'Clear search')}
            >
              <X className="w-4 h-4" />
            </button>
          )}

          <button
            type="button"
            onClick={onClose}
            className="px-2.5 py-1 rounded-lg bg-[#F8FAFC] hover:bg-[#FFF7ED] text-[#64748B] text-xs font-bold transition-colors shrink-0 cursor-pointer border border-[#E2E8F0]"
          >
            Esc
          </button>
        </div>

        {/* Category Filter Chips Bar */}
        <div className="px-4 py-2.5 bg-[#F8FAFC] border-b border-[#E2E8F0] flex items-center gap-1.5 overflow-x-auto no-scrollbar text-xs">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#64748B] mr-1 shrink-0">
            {t('common.filter', 'Filter')}:
          </span>
          <button
            type="button"
            onClick={() => setSelectedCategoryFilter('all')}
            className={`px-3 py-1 rounded-full text-xs font-semibold transition-all shrink-0 cursor-pointer ${
              selectedCategoryFilter === 'all'
                ? 'bg-[#F97316] text-white shadow-xs'
                : 'bg-[#FFFFFF] text-[#475569] hover:bg-[#FFF7ED] hover:text-[#0F172A] border border-[#E2E8F0]'
            }`}
          >
            {t('common.allCategories', 'All Categories')} ({calculators.length})
          </button>
          {categories.map(cat => {
            const isSelected = selectedCategoryFilter === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategoryFilter(isSelected ? 'all' : cat.id)}
                className={`px-2.5 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all shrink-0 border cursor-pointer ${
                  isSelected
                    ? 'bg-[#F97316] text-white border-[#F97316] shadow-xs'
                    : 'bg-[#FFFFFF] text-[#475569] hover:bg-[#FFF7ED] hover:text-[#0F172A] border-[#E2E8F0]'
                }`}
              >
                <span>{cat.iconName}</span>
                <span>{cat.name}</span>
              </button>
            );
          })}
        </div>

        {/* Search Helper Pills & Recent Searches (When search query is empty) */}
        {!query && (
          <div className="p-4 border-b border-[#E2E8F0] bg-[#FFFFFF] space-y-3">
            {/* Quick Instant Suggestions */}
            <div>
              <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#64748B] uppercase tracking-wider mb-2">
                <Sparkles className="w-3.5 h-3.5 text-[#F97316]" />
                <span>{t('common.popularSuggestions', 'Instant Suggestions')}</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {popularSuggestions.map(term => (
                  <button
                    key={term}
                    type="button"
                    onClick={() => {
                      setQuery(term);
                      inputRef.current?.focus();
                    }}
                    className="px-2.5 py-1 rounded-lg bg-[#F8FAFC] hover:bg-[#FFF7ED] hover:text-[#F97316] text-[#475569] text-xs font-medium transition-colors border border-[#E2E8F0] cursor-pointer"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>

            {/* Recent Searches */}
            {recentSearches.length > 0 && (
              <div className="pt-2 border-t border-[#E2E8F0]">
                <div className="flex items-center justify-between text-[11px] font-bold text-[#64748B] uppercase tracking-wider mb-1.5">
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-[#F97316]" />
                    <span>{t('common.recentSearches', 'Recent Searches')}</span>
                  </div>
                  <button
                    type="button"
                    onClick={clearAllRecent}
                    className="text-[10px] text-[#64748B] hover:text-[#DC2626] transition-colors lowercase cursor-pointer"
                  >
                    {t('common.clearAll', 'clear history')}
                  </button>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {recentSearches.map(term => (
                    <span
                      key={term}
                      onClick={() => {
                        setQuery(term);
                        inputRef.current?.focus();
                      }}
                      className="group inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] text-[#0F172A] text-xs font-medium hover:border-[#FDBA74] hover:bg-[#FFF7ED] cursor-pointer transition-colors"
                    >
                      <span>{term}</span>
                      <button
                        type="button"
                        onClick={(e) => removeRecentSearch(e, term)}
                        className="text-[#64748B] hover:text-[#DC2626] p-0.5 rounded cursor-pointer"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Category Jump Suggestion Banner (If user query matches a category name) */}
        {matchedCategories.length > 0 && query.trim() !== '' && (
          <div className="px-4 py-2.5 bg-[#FFF7ED] border-b border-[#FDBA74] flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 text-xs">
              <FolderOpen className="w-4 h-4 text-[#F97316] shrink-0" />
              <span className="text-[#475569]">
                {t('common.viewCategory', 'Matched Category')}: <strong className="text-[#0F172A]">{matchedCategories[0].name}</strong> ({matchedCategories[0].calculatorsCount} {t('common.tools', 'tools')})
              </span>
            </div>
            {onSelectCategory && (
              <button
                type="button"
                onClick={() => handleCategoryJump(matchedCategories[0].id)}
                className="px-3 py-1 bg-[#F97316] hover:bg-[#EA580C] text-white rounded-lg text-xs font-bold transition-colors flex items-center gap-1 shadow-xs cursor-pointer"
              >
                <span>{t('common.explore', 'Open Category Page')}</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            )}
          </div>
        )}

        {/* Results List */}
        <div 
          ref={listContainerRef}
          className="p-2 sm:p-3 overflow-y-auto divide-y divide-[#E2E8F0] flex-1 bg-[#FFFFFF]"
        >
          {filteredCalculators.length === 0 ? (
            <div className="py-14 text-center text-[#64748B] space-y-2">
              <div className="w-12 h-12 mx-auto rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] flex items-center justify-center text-[#64748B]">
                <Calculator className="w-6 h-6" />
              </div>
              <p className="text-sm font-bold text-[#0F172A]">{t('common.noResults', 'No calculators found matching')} "{query}"</p>
              <p className="text-xs text-[#475569] max-w-sm mx-auto">
                {t('common.noResultsHint', 'Try searching for broader terms like loan, weight, date, math, or reset the category filter.')}
              </p>
              <button
                type="button"
                onClick={() => {
                  setQuery('');
                  setSelectedCategoryFilter('all');
                }}
                className="mt-2 px-3.5 py-1.5 bg-[#F97316] hover:bg-[#EA580C] text-white text-xs font-bold rounded-lg cursor-pointer"
              >
                {t('common.viewAll', 'View All Calculators')}
              </button>
            </div>
          ) : (
            filteredCalculators.map((calc, idx) => {
              const category = categories.find(c => c.id === calc.category);
              const isSelected = idx === selectedIndex;

              return (
                <div
                  key={calc.id}
                  data-search-idx={idx}
                  onClick={() => handleLaunch(calc)}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`p-3 sm:p-3.5 rounded-xl cursor-pointer transition-all flex items-center justify-between gap-3 ${
                    isSelected 
                      ? 'bg-[#FFF7ED] text-[#0F172A] border border-[#FDBA74] shadow-xs' 
                      : 'hover:bg-[#F8FAFC] text-[#0F172A] border border-transparent'
                  }`}
                >
                  <div className="space-y-1 min-w-0 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h4 className="font-bold text-sm text-[#0F172A]">
                        {highlightMatch(calc.name, query)}
                      </h4>
                      
                      {category && (
                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full border border-[#E2E8F0] bg-[#F8FAFC] text-[#475569]">
                          {category.badgeText}
                        </span>
                      )}

                      {calc.popular && (
                        <span className="text-[9px] font-extrabold uppercase px-1.5 py-0.5 rounded bg-[#FFF7ED] text-[#F97316] border border-[#FDBA74]">
                          {t('common.popularTools', 'Popular')}
                        </span>
                      )}
                    </div>

                    <p className="text-xs text-[#475569] line-clamp-1">
                      {highlightMatch(calc.shortDescription || calc.description, query)}
                    </p>

                    {/* Matching Tags */}
                    {calc.tags && calc.tags.length > 0 && (
                      <div className="flex items-center gap-1.5 pt-0.5 overflow-hidden">
                        <Tag className="w-3 h-3 text-[#64748B] shrink-0" />
                        <div className="flex items-center gap-1 overflow-x-hidden text-[10px] text-[#64748B]">
                          {calc.tags.slice(0, 4).map(t => (
                            <span key={t} className="bg-[#F8FAFC] text-[#475569] px-1.5 py-0.5 rounded border border-[#E2E8F0]">
                              {highlightMatch(t, query)}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <span className={`text-xs font-bold hidden sm:inline ${isSelected ? 'text-[#F97316]' : 'text-[#64748B]'}`}>
                      {t('common.launch', 'Launch')}
                    </span>
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${
                      isSelected ? 'bg-[#F97316] text-white shadow-xs translate-x-0.5' : 'bg-[#F8FAFC] text-[#475569] border border-[#E2E8F0]'
                    }`}>
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Keyboard Navigation Footer */}
        <div className="p-3.5 bg-[#F8FAFC] border-t border-[#E2E8F0] flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-[#64748B]">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 bg-[#FFFFFF] border border-[#E2E8F0] rounded font-mono text-[10px] shadow-2xs font-bold text-[#0F172A]">↑↓</kbd>
              <span>{t('common.navigate', 'navigate')}</span>
            </span>
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 bg-[#FFFFFF] border border-[#E2E8F0] rounded font-mono text-[10px] shadow-2xs font-bold text-[#0F172A]">Enter</kbd>
              <span>{t('common.select', 'select')}</span>
            </span>
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 bg-[#FFFFFF] border border-[#E2E8F0] rounded font-mono text-[10px] shadow-2xs font-bold text-[#0F172A]">Esc</kbd>
              <span>{t('common.close', 'close')}</span>
            </span>
          </div>

          <span className="font-semibold text-[#64748B]">
            {t('common.showing', 'Showing')} <strong className="text-[#0F172A]">{filteredCalculators.length}</strong> {t('common.matchingTools', 'available tools')}
          </span>
        </div>
      </div>
    </div>
  );
};
