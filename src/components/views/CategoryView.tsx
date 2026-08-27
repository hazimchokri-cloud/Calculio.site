import React, { useState } from 'react';
import { Search, ArrowRight } from 'lucide-react';
import { AdSlot } from '../shared/AdSlot';
import { Breadcrumbs } from '../shared/Breadcrumbs';
import { AffiliateOffersSection } from '../shared/AffiliateOffersSection';
import { useLanguage } from '../../i18n/LanguageContext';
import { getCategoryTheme } from '../home/CategoryGrid';

interface CategoryViewProps {
  categoryId: string;
  onSelectCalculator: (id: string) => void;
  onSelectCategory: (id: string) => void;
  onGoHome: () => void;
}

export const CategoryView: React.FC<CategoryViewProps> = ({
  categoryId,
  onSelectCalculator,
  onSelectCategory,
  onGoHome
}) => {
  const { t, getCategory, categories, calculators } = useLanguage();
  const [filterQuery, setFilterQuery] = useState('');
  const category = getCategory(categoryId);
  const allCategoryCalcs = calculators.filter(c => c.category === category.id);

  const displayedCalcs = allCategoryCalcs.filter(c => 
    c.name.toLowerCase().includes(filterQuery.toLowerCase()) ||
    c.description.toLowerCase().includes(filterQuery.toLowerCase()) ||
    c.tags.some(t => t.toLowerCase().includes(filterQuery.toLowerCase()))
  );

  const breadcrumbItems = [
    { label: category.name, active: true }
  ];

  return (
    <div className="py-8 sm:py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10 bg-[#F8FAFC]">
      {/* Breadcrumbs */}
      <Breadcrumbs items={breadcrumbItems} onGoHome={onGoHome} />

      {/* Header Banner Ad */}
      <AdSlot type="header-banner" />

      {/* Category Clean Header */}
      {(() => {
        const theme = getCategoryTheme(category.id);
        return (
          <div className="bg-[#FFFFFF] border border-[#E2E8F0] rounded-2xl p-6 sm:p-10 shadow-xs flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <div 
              style={{ backgroundColor: `${theme.color}1A` }}
              className="w-16 h-16 rounded-2xl flex items-center justify-center shrink-0 [&>svg]:w-8 [&>svg]:h-8"
            >
              {theme.icon}
            </div>
            <div className="max-w-3xl space-y-2">
              <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-[#0F172A]">
                {category.name} {t('nav.calculators', 'Calculators')}
              </h1>
              <p className="text-base sm:text-[17px] text-[#475569] leading-relaxed">
                {category.description}
              </p>
            </div>
          </div>
        );
      })()}

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-[#64748B] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={filterQuery}
            onChange={(e) => setFilterQuery(e.target.value)}
            placeholder={t('common.filterTools', `Filter ${category.name} tools...`, { name: category.name })}
            className="w-full pl-9 pr-3 py-2.5 text-sm font-medium border border-[#E2E8F0] rounded-xl bg-[#FFFFFF] text-[#0F172A] placeholder:text-[#64748B] focus:border-[#F97316] focus:ring-1 focus:ring-[#F97316] focus:outline-none transition-colors"
          />
        </div>

        <span className="text-sm text-[#64748B] font-mono-numbers">
          {t('common.showingResults', `Showing ${displayedCalcs.length} of ${allCategoryCalcs.length} calculators`, { count: displayedCalcs.length, total: allCategoryCalcs.length })}
        </span>
      </div>

      {/* Calculators Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayedCalcs.map((calc) => (
          <div
            key={calc.id}
            onClick={() => onSelectCalculator(calc.id)}
            className="group bg-[#FFFFFF] rounded-xl p-6 border border-[#E2E8F0] hover:border-[#FDBA74] hover:bg-[#FFF7ED] hover:shadow-[0_8px_24px_rgba(249, 115, 22,0.1)] transition-all cursor-pointer flex flex-col justify-between"
          >
            <div className="space-y-2">
              <h3 className="text-lg font-bold text-[#0F172A] group-hover:text-[#F97316] transition-colors">
                {calc.name}
              </h3>
              <p className="text-sm text-[#475569] leading-relaxed line-clamp-2">
                {calc.shortDescription || calc.description}
              </p>
            </div>

            <div className="mt-5 pt-4 border-t border-[#E2E8F0] flex items-center justify-between text-sm font-semibold text-[#F97316] group-hover:text-[#EA580C]">
              <span>{t('common.launch', 'Open Calculator')}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </div>
        ))}
      </div>

      {/* In-Content Advertisement Slot */}
      <AdSlot type="in-content" />

      {/* Category-Specific Affiliate Opportunities */}
      <AffiliateOffersSection
        categoryId={category.id}
        title={`${category.name} ${t('calcView.partnerOffers', 'Partner Offers & Discounts')}`}
        subtitle={t('calcView.partnerOffersSubtitle', `Verified recommendations and savings curated for ${category.name} calculations.`, { category: category.name })}
      />

      {/* Other Categories quick switcher */}
      <div className="pt-8 border-t border-[#E2E8F0]">
        <h3 className="text-sm font-bold uppercase tracking-wider text-[#0F172A] mb-3">
          {t('categories.exploreOther', 'Explore Other Categories')}
        </h3>
        <div className="flex flex-wrap gap-2">
          {categories.filter(c => c.id !== category.id).map(other => (
            <button
              key={other.id}
              onClick={() => onSelectCategory(other.id)}
              className="px-3.5 py-2 rounded-xl bg-[#FFFFFF] hover:bg-[#FFF7ED] border border-[#E2E8F0] hover:border-[#FDBA74] text-sm font-medium text-[#0F172A] hover:text-[#F97316] flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <span>{other.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Footer Banner Ad */}
      <AdSlot type="footer-banner" />
    </div>
  );
};
