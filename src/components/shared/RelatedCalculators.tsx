import React from 'react';
import { CalculatorMeta } from '../../types';
import { ArrowRight, Compass } from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext';

interface RelatedCalculatorsProps {
  currentCalculator: CalculatorMeta;
  onSelectCalculator: (id: string) => void;
  limit?: number;
  layout?: 'grid' | 'sidebar';
  className?: string;
}

export const RelatedCalculators: React.FC<RelatedCalculatorsProps> = ({
  currentCalculator,
  onSelectCalculator,
  limit = 6,
  layout = 'grid',
  className = ''
}) => {
  const { t, calculators, categories, getCategory } = useLanguage();
  const currentCategory = getCategory(currentCalculator.category);

  // Smart matching algorithm:
  // 1. Same category, different ID
  // 2. Shared tags
  // 3. Fallback to general popular calculators
  const relatedList = React.useMemo(() => {
    const others = calculators.filter(c => c.id !== currentCalculator.id);

    const scored = others.map(calc => {
      let score = 0;
      if (calc.category === currentCalculator.category) score += 10;

      // Check overlapping tags
      const currentTags = new Set(currentCalculator.tags || []);
      (calc.tags || []).forEach(t => {
        if (currentTags.has(t)) score += 3;
      });

      if (calc.popular) score += 2;
      return { calc, score };
    });

    scored.sort((a, b) => b.score - a.score);
    return scored.slice(0, limit).map(s => s.calc);
  }, [currentCalculator, limit, calculators]);

  if (layout === 'sidebar') {
    return (
      <div className={`bg-[#FFFFFF] rounded-2xl p-5 border border-[#E2E8F0] shadow-xs space-y-4 ${className}`}>
        <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-2.5">
          <h3 className="text-sm font-bold uppercase tracking-wider text-[#0F172A] flex items-center gap-1.5">
            <Compass className="w-4 h-4 text-[#F97316]" />
            <span>{t('calcView.similarTools', 'Similar Tools')}</span>
          </h3>
          <span className="text-xs font-bold text-[#64748B]">{relatedList.length} {t('common.tools', 'Tools')}</span>
        </div>

        <div className="space-y-2.5">
          {relatedList.map((calc) => {
            const cat = categories.find(c => c.id === calc.category);
            return (
              <button
                key={calc.id}
                type="button"
                onClick={() => onSelectCalculator(calc.id)}
                className="w-full p-3 rounded-xl border border-[#E2E8F0] hover:border-[#FDBA74] bg-[#F8FAFC] hover:bg-[#FFF7ED] text-left transition-all flex items-center justify-between group cursor-pointer"
              >
                <div className="min-w-0 pr-2">
                  <div className="flex items-center gap-1.5 mb-0.5">
                    <span className="text-[11px] font-bold text-[#F97316] uppercase">
                      {cat?.name || 'Calculator'}
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-[#0F172A] group-hover:text-[#F97316] transition-colors truncate">
                    {calc.name}
                  </h4>
                  <p className="text-xs text-[#475569] line-clamp-1">
                    {calc.shortDescription}
                  </p>
                </div>
                <ArrowRight className="w-4 h-4 text-[#64748B] group-hover:text-[#F97316] group-hover:translate-x-0.5 transition-all shrink-0" />
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className={`space-y-4 ${className}`}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#E2E8F0] pb-3">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#F97316] mb-1">
            <Compass className="w-4 h-4" />
            <span>{t('calcView.recommendedNext', 'Recommended Next Calculations')}</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-[#0F172A] tracking-tight">
            {t('calcView.relatedCalculators', 'Related & Similar Calculators')}
          </h3>
        </div>
        <span className="text-sm text-[#475569] font-medium">
          {t('common.explore', 'Explore')} {t('common.tools', 'tools')} {t('common.category', 'related to')} <strong className="text-[#0F172A]">{currentCategory.name}</strong>
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
        {relatedList.map((calc) => {
          const cat = categories.find(c => c.id === calc.category) || currentCategory;
          return (
            <div
              key={calc.id}
              onClick={() => onSelectCalculator(calc.id)}
              className="bg-[#FFFFFF] rounded-2xl p-5 border border-[#E2E8F0] hover:border-[#FDBA74] hover:bg-[#FFF7ED] hover:shadow-xs cursor-pointer transition-all flex flex-col justify-between group"
            >
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold px-2.5 py-1 rounded-md border border-[#E2E8F0] bg-[#F8FAFC] text-[#475569]">
                    {cat.badgeText}
                  </span>
                  {calc.popular && (
                    <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-[#FFF7ED] text-[#F97316] border border-[#FDBA74]">
                      {t('common.popularTools', 'Popular')}
                    </span>
                  )}
                </div>

                <h4 className="text-base font-bold text-[#0F172A] group-hover:text-[#F97316] transition-colors">
                  {calc.name}
                </h4>

                <p className="text-sm text-[#475569] leading-relaxed line-clamp-2">
                  {calc.shortDescription || calc.description}
                </p>
              </div>

              <div className="pt-3.5 mt-3.5 border-t border-[#E2E8F0] flex items-center justify-between text-sm font-bold text-[#F97316] group-hover:text-[#EA580C]">
                <span>{t('common.launch', 'Launch Calculator')}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
