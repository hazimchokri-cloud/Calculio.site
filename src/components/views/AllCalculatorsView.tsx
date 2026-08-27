import React, { useState, useMemo, useRef, useEffect } from 'react';
import { 
  Search, 
  ArrowRight, 
  SlidersHorizontal, 
  X, 
  Star, 
  Check, 
  Sparkles,
  Layers,
  ArrowUpDown,
  Calculator as CalcIcon,
  Home,
  DollarSign,
  Activity,
  HeartPulse,
  Percent,
  TrendingUp,
  Building,
  Receipt,
  Briefcase,
  HardHat,
  Cpu,
  GraduationCap,
  Coins,
  ArrowLeftRight,
  Calendar,
  ShieldCheck,
  Scale,
  Flame,
  Zap,
  Clock,
  Car,
  Wallet,
  Fuel,
  PiggyBank,
  CreditCard,
  BarChart3,
  Dumbbell,
  Apple,
  Droplets,
  Moon,
  Wine,
  Binary,
  Box,
  Dog,
  Utensils,
  Gauge,
  Wind,
  Repeat
} from 'lucide-react';
import { Breadcrumbs } from '../shared/Breadcrumbs';
import { AdSlot } from '../shared/AdSlot';
import { useLanguage } from '../../i18n/LanguageContext';
import { CalculatorMeta, CategoryId } from '../../types';
import { getCategoryTheme } from '../home/CategoryGrid';

interface AllCalculatorsViewProps {
  onSelectCalculator: (calculatorId: string) => void;
  onSelectCategory: (categoryId: string) => void;
  onGoHome: () => void;
  initialCategory?: string;
}

type SortOption = 'category' | 'popular' | 'alpha' | 'recent';

// Helper to render calculator-specific icon safely
export const renderCalculatorIcon = (iconName: string, className = 'w-5 h-5') => {
  switch (iconName?.toLowerCase()) {
    case 'home': return <Home className={className} />;
    case 'dollarsign': case 'dollar': return <DollarSign className={className} />;
    case 'activity': return <Activity className={className} />;
    case 'heartpulse': case 'heart': return <HeartPulse className={className} />;
    case 'percent': return <Percent className={className} />;
    case 'trendingup': return <TrendingUp className={className} />;
    case 'building': return <Building className={className} />;
    case 'receipt': return <Receipt className={className} />;
    case 'briefcase': return <Briefcase className={className} />;
    case 'hardhat': return <HardHat className={className} />;
    case 'cpu': return <Cpu className={className} />;
    case 'graduationcap': return <GraduationCap className={className} />;
    case 'coins': case 'bitcoin': return <Coins className={className} />;
    case 'arrowleftright': case 'convert': return <ArrowLeftRight className={className} />;
    case 'calendar': return <Calendar className={className} />;
    case 'shieldcheck': return <ShieldCheck className={className} />;
    case 'scale': return <Scale className={className} />;
    case 'flame': return <Flame className={className} />;
    case 'zap': return <Zap className={className} />;
    case 'clock': return <Clock className={className} />;
    case 'car': return <Car className={className} />;
    case 'wallet': return <Wallet className={className} />;
    case 'fuel': return <Fuel className={className} />;
    case 'piggybank': return <PiggyBank className={className} />;
    case 'creditcard': return <CreditCard className={className} />;
    case 'barchart3': case 'chart': return <BarChart3 className={className} />;
    case 'dumbbell': return <Dumbbell className={className} />;
    case 'apple': return <Apple className={className} />;
    case 'droplets': return <Droplets className={className} />;
    case 'moon': return <Moon className={className} />;
    case 'wine': return <Wine className={className} />;
    case 'binary': return <Binary className={className} />;
    case 'box': return <Box className={className} />;
    case 'dog': return <Dog className={className} />;
    case 'utensils': return <Utensils className={className} />;
    case 'gauge': return <Gauge className={className} />;
    case 'wind': return <Wind className={className} />;
    case 'repeat': return <Repeat className={className} />;
    default: return <CalcIcon className={className} />;
  }
};

export const AllCalculatorsView: React.FC<AllCalculatorsViewProps> = ({
  onSelectCalculator,
  onSelectCategory,
  onGoHome,
  initialCategory
}) => {
  const { t, language, calculators, categories } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory || 'all');
  const [sortBy, setSortBy] = useState<SortOption>('category');
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Sync initialCategory if prop changes
  useEffect(() => {
    if (initialCategory) {
      setSelectedCategory(initialCategory);
    }
  }, [initialCategory]);

  // Filtered list based on Search and Category selection
  const filteredCalculators = useMemo(() => {
    let result = [...calculators];

    // Filter by category
    if (selectedCategory !== 'all') {
      result = result.filter(c => c.category === selectedCategory);
    }

    // Filter by search text
    const q = searchQuery.trim().toLowerCase();
    if (q) {
      result = result.filter(calc => {
        const nameMatch = calc.name.toLowerCase().includes(q);
        const descMatch = (calc.shortDescription || calc.description || '').toLowerCase().includes(q);
        const tagMatch = calc.tags?.some(t => t.toLowerCase().includes(q));
        const catMatch = calc.category.toLowerCase().includes(q);
        return nameMatch || descMatch || tagMatch || catMatch;
      });
    }

    // Apply Sorting
    if (sortBy === 'alpha') {
      result.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === 'popular') {
      result.sort((a, b) => {
        if (a.popular && !b.popular) return -1;
        if (!a.popular && b.popular) return 1;
        if (a.featured && !b.featured) return -1;
        if (!a.featured && b.featured) return 1;
        return a.name.localeCompare(b.name);
      });
    } else if (sortBy === 'recent') {
      result.sort((a, b) => {
        if (a.recentlyAdded && !b.recentlyAdded) return -1;
        if (!a.recentlyAdded && b.recentlyAdded) return 1;
        return a.name.localeCompare(b.name);
      });
    }

    return result;
  }, [calculators, selectedCategory, searchQuery, sortBy]);

  // Group by category when in 'category' sort mode or when no search is active
  const groupedCalculators = useMemo(() => {
    if (sortBy !== 'category' && searchQuery.trim() !== '') {
      return null;
    }

    const groups: { category: typeof categories[0]; items: CalculatorMeta[] }[] = [];

    categories.forEach(cat => {
      // If user selected a specific category, only include that one
      if (selectedCategory !== 'all' && cat.id !== selectedCategory) {
        return;
      }

      const items = filteredCalculators.filter(c => c.category === cat.id);
      if (items.length > 0) {
        groups.push({
          category: cat,
          items
        });
      }
    });

    return groups;
  }, [categories, filteredCalculators, selectedCategory, sortBy, searchQuery]);

  const breadcrumbItems = [
    { label: t('nav.allCalculators', 'All Calculators'), active: true }
  ];

  return (
    <div className="py-8 sm:py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8 bg-[#F8FAFC]">
      {/* Breadcrumbs */}
      <Breadcrumbs items={breadcrumbItems} onGoHome={onGoHome} />

      {/* Top Banner Header */}
      <div 
        id="all-calculators-hero"
        className="rounded-2xl p-6 sm:p-10 border border-[#E2E8F0] bg-[#FFFFFF] shadow-xs relative overflow-hidden"
      >
        <div className="max-w-3xl space-y-3">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-[800] text-[#0F172A] tracking-tight leading-[1.15]">
            {t('nav.allCalculators', 'All Calculators')}
          </h1>

          <p className="text-base sm:text-lg text-[#475569] leading-relaxed max-w-2xl font-[400]">
            {t(
              'directory.subtitle', 
              'Explore our comprehensive collection of calculation tools across finance, health, mathematics, business, real estate, taxes, and daily utilities.'
            )}
          </p>
        </div>
      </div>

      {/* Top Banner Ad */}
      <AdSlot type="header-banner" />

      {/* Controls & Search Toolbar */}
      <div className="bg-[#FFFFFF] rounded-xl p-4 sm:p-5 border border-[#E2E8F0] shadow-xs space-y-4">
        
        {/* Search Bar & Sort Selector */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 sm:gap-4">
          
          {/* Main Search Input */}
          <div className="relative flex-1">
            <Search className="w-5 h-5 text-[#64748B] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              ref={searchInputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t('directory.searchPlaceholder', 'Search calculators by name, category, or keyword (e.g. mortgage, BMI, loan, tax, math)...')}
              className="w-full h-11 pl-11 pr-10 text-[15px] sm:text-base font-[400] bg-[#FFFFFF] border border-[#E2E8F0] rounded-xl text-[#0F172A] placeholder:text-[#64748B] focus:bg-[#FFFFFF] focus:outline-none focus:border-[#F97316] focus:ring-1 focus:ring-[#F97316] transition-all"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  searchInputRef.current?.focus();
                }}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#64748B] hover:text-[#0F172A] p-1 cursor-pointer"
                title={t('common.clear', 'Clear')}
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Sort Selector */}
          <div className="flex items-center gap-2.5 shrink-0 self-end md:self-auto">
            <span className="text-xs sm:text-sm font-[600] text-[#64748B] flex items-center gap-1.5">
              <ArrowUpDown className="w-4 h-4" />
              <span>Sort:</span>
            </span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="h-11 px-3 py-2 text-sm font-[600] bg-[#FFFFFF] border border-[#E2E8F0] rounded-xl text-[#0F172A] focus:outline-none focus:border-[#F97316] focus:ring-1 focus:ring-[#F97316] cursor-pointer"
            >
              <option value="category">Group by Category</option>
              <option value="popular">Most Popular</option>
              <option value="alpha">Alphabetical (A - Z)</option>
              <option value="recent">Recently Added</option>
            </select>
          </div>
        </div>

        {/* Category Filters Ribbon */}
        <div className="pt-2 border-t border-[#E2E8F0]">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar text-sm">
            {/* All button */}
            <button
              type="button"
              onClick={() => setSelectedCategory('all')}
              className={`px-3.5 py-1.5 rounded-lg font-[600] text-[13.5px] whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 shrink-0 ${
                selectedCategory === 'all'
                  ? 'bg-[#F97316] text-[#FFFFFF] shadow-xs'
                  : 'bg-[#FFFFFF] border border-[#E2E8F0] text-[#0F172A] hover:bg-[#FFF7ED] hover:border-[#FDBA74]'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>All ({calculators.length})</span>
            </button>

            {/* Individual categories */}
            {categories.map((cat) => {
              const count = calculators.filter(c => c.category === cat.id).length;
              const isActive = selectedCategory === cat.id;

              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3.5 py-1.5 rounded-lg font-[600] text-[13.5px] whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 shrink-0 ${
                    isActive
                      ? 'bg-[#F97316] text-[#FFFFFF] shadow-xs'
                      : 'bg-[#FFFFFF] border border-[#E2E8F0] text-[#0F172A] hover:bg-[#FFF7ED] hover:border-[#FDBA74]'
                  }`}
                >
                  <span className={isActive ? 'text-[#FFFFFF]' : ''}>
                    {cat.name}
                  </span>
                  <span className={`text-xs px-1.5 py-0.2 rounded-full ${
                    isActive ? 'bg-[#FFFFFF]/20 text-[#FFFFFF]' : 'bg-[#F8FAFC] text-[#64748B]'
                  }`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

      </div>

      {/* Results Header Count */}
      <div className="flex items-center justify-between text-sm text-[#475569]">
        <div className="font-[600] text-[#0F172A]">
          {filteredCalculators.length === calculators.length ? (
            <span>Showing all <strong>{calculators.length}</strong> calculators</span>
          ) : (
            <span>
              Showing <strong>{filteredCalculators.length}</strong> of {calculators.length} calculators
              {selectedCategory !== 'all' && (
                <span> in <em>{categories.find(c => c.id === selectedCategory)?.name}</em></span>
              )}
              {searchQuery && <span> matching "<strong>{searchQuery}</strong>"</span>}
            </span>
          )}
        </div>

        {(searchQuery || selectedCategory !== 'all' || sortBy !== 'category') && (
          <button
            type="button"
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('all');
              setSortBy('category');
            }}
            className="text-xs font-[600] text-[#F97316] hover:underline cursor-pointer flex items-center gap-1"
          >
            <X className="w-3.5 h-3.5" />
            <span>Reset Filters</span>
          </button>
        )}
      </div>

      {/* RENDER CALCULATORS: Either Grouped by Category or Flat Grid */}
      {filteredCalculators.length === 0 ? (
        /* Empty State */
        <div className="bg-[#FFFFFF] rounded-2xl p-12 text-center border border-[#E2E8F0] shadow-xs space-y-4 max-w-lg mx-auto">
          <div className="w-16 h-16 rounded-2xl bg-[#FFF7ED] text-[#F97316] flex items-center justify-center mx-auto">
            <Search className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-[700] text-[#0F172A]">No Calculators Found</h3>
          <p className="text-sm text-[#475569]">
            We couldn't find any calculator matching "<strong>{searchQuery}</strong>". Try searching for common terms like "loan", "tax", "BMI", "percentage", or browse all categories.
          </p>
          <div className="pt-2 flex justify-center gap-2">
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
              className="px-5 py-2.5 bg-[#F97316] text-[#FFFFFF] rounded-xl text-sm font-[700] hover:bg-[#EA580C] transition-colors cursor-pointer shadow-xs"
            >
              Browse All Calculators
            </button>
          </div>
        </div>
      ) : groupedCalculators && groupedCalculators.length > 0 && !searchQuery ? (
        /* 1. Grouped View: Sections with Category Headers */
        <div className="space-y-12">
          {groupedCalculators.map(({ category, items }) => {
            const theme = getCategoryTheme(category.id);

            return (
              <section key={category.id} id={`cat-${category.id}`} className="space-y-5">
                {/* Category Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b-2 border-[#E2E8F0] gap-2">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${theme.bgClass} shadow-2xs`}>
                      {theme.icon}
                    </div>
                    <div>
                      <h2 className="text-xl sm:text-2xl font-[700] text-[#0F172A] tracking-tight">
                        {category.name}
                      </h2>
                      <p className="text-xs sm:text-sm text-[#64748B]">
                        {category.description}
                      </p>
                    </div>
                  </div>

                  <span className="text-xs sm:text-sm font-[600] text-[#F97316] bg-[#FFF7ED] px-3 py-1 rounded-full border border-[#FDBA74] shrink-0 self-start sm:self-auto">
                    {items.length} {items.length === 1 ? 'Calculator' : 'Calculators'}
                  </span>
                </div>

                {/* Grid of Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {items.map((calc) => (
                    <CalculatorCard
                      key={calc.id}
                      calc={calc}
                      onSelectCalculator={onSelectCalculator}
                    />
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      ) : (
        /* 2. Flat Grid View (Sorted or Filtered by Search) */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredCalculators.map((calc) => (
            <CalculatorCard
              key={calc.id}
              calc={calc}
              onSelectCalculator={onSelectCalculator}
            />
          ))}
        </div>
      )}

      {/* Mid Content Ad Slot */}
      <AdSlot type="in-content" />

      {/* Bottom Category Quick Navigation */}
      <div className="bg-[#FFFFFF] rounded-2xl p-6 sm:p-8 border border-[#E2E8F0] shadow-xs space-y-4">
        <h3 className="text-lg font-[700] text-[#0F172A]">
          Explore by Category Hubs
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {categories.map((cat) => {
            const count = calculators.filter(c => c.category === cat.id).length;
            const theme = getCategoryTheme(cat.id);

            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => onSelectCategory(cat.id)}
                className="p-3 rounded-xl bg-[#FFFFFF] hover:bg-[#FFF7ED] border border-[#E2E8F0] hover:border-[#FDBA74] text-left transition-all cursor-pointer group flex items-center justify-between"
              >
                <div className="flex items-center gap-2.5 min-w-0 pr-2">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${theme.bgClass} [&>svg]:w-4 [&>svg]:h-4`}>
                    {theme.icon}
                  </div>
                  <span className="text-xs sm:text-sm font-[600] text-[#0F172A] group-hover:text-[#F97316] truncate">
                    {cat.name}
                  </span>
                </div>
                <span className="text-[11px] font-[700] text-[#64748B] shrink-0">
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Footer Banner Ad */}
      <AdSlot type="footer-banner" />
    </div>
  );
};

interface CalculatorCardProps {
  calc: CalculatorMeta;
  onSelectCalculator: (id: string) => void;
}

const CalculatorCard: React.FC<CalculatorCardProps> = ({ calc, onSelectCalculator }) => {
  const theme = getCategoryTheme(calc.category);

  return (
    <div
      onClick={() => onSelectCalculator(calc.id)}
      className="bg-[#FFFFFF] rounded-[14px] p-5 sm:p-6 border border-[#E2E8F0] shadow-xs hover:shadow-[0_10px_25px_rgba(249, 115, 22,0.12)] hover:border-[#FDBA74] hover:-translate-y-[2px] transition-all duration-200 cursor-pointer flex flex-col justify-between group"
    >
      <div className="space-y-3">
        {/* Top Badges & Icon Row */}
        <div className="flex items-start justify-between gap-2">
          {/* Icon Box: 40x40 rounded */}
          <div className={`w-10 h-10 rounded-[10px] flex items-center justify-center transition-transform group-hover:scale-105 ${theme.bgClass}`}>
            {renderCalculatorIcon(calc.iconName, 'w-5 h-5')}
          </div>

          {/* Badges */}
          <div className="flex items-center gap-1.5 flex-wrap justify-end">
            {calc.popular && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-[700] bg-[#FFEDD5] text-[#9A3412] border border-[#FDBA74]">
                <Star className="w-3 h-3 fill-[#F97316] text-[#F97316]" />
                <span>Popular</span>
              </span>
            )}
            {calc.recentlyAdded && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-[700] bg-[#FFEDD5] text-[#9A3412] border border-[#FDBA74]">
                <Sparkles className="w-3 h-3 text-[#F97316]" />
                <span>New</span>
              </span>
            )}
          </div>
        </div>

        {/* Title and Short Description */}
        <div>
          <h3 className="text-[17px] sm:text-[18px] font-[700] text-[#0F172A] group-hover:text-[#F97316] transition-colors leading-snug">
            {calc.name}
          </h3>
          <p className="text-[13.5px] sm:text-[14.5px] text-[#475569] mt-1.5 leading-[1.5] line-clamp-2 font-[400]">
            {calc.shortDescription || calc.description}
          </p>
        </div>

        {/* Tags preview */}
        {calc.tags && calc.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 pt-1">
            {calc.tags.slice(0, 3).map((tag, idx) => (
              <span 
                key={idx}
                className="text-[11px] text-[#475569] bg-[#F8FAFC] border border-[#E2E8F0] px-2 py-0.5 rounded-md font-[500]"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Clear Use Calculator Button */}
      <div className="mt-4 pt-3.5 border-t border-[#E2E8F0]">
        <div className="w-full py-2.5 px-4 rounded-[10px] bg-[#F8FAFC] group-hover:bg-[#F97316] text-[#F97316] group-hover:text-[#FFFFFF] font-[700] text-[14px] flex items-center justify-between transition-all duration-200 shadow-2xs border border-[#E2E8F0] group-hover:border-[#F97316]">
          <span>Use Calculator</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </div>
  );
};
