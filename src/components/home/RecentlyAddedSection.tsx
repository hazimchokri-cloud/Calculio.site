import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext';

interface RecentlyAddedProps {
  onSelectCalculator: (id: string) => void;
}

export const RecentlyAddedSection: React.FC<RecentlyAddedProps> = ({ onSelectCalculator }) => {
  const { t, calculators, categories } = useLanguage();
  const recent = calculators.filter(c => c.recentlyAdded).slice(0, 4);

  return (
    <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-[#FFFFFF] border-y border-[#E2E8F0]">
      <div className="mb-10">
        <h2 className="text-2xl sm:text-3xl font-bold text-[#0F172A] tracking-tight">
          {t('home.recentlyAddedTitle', 'Recently Added Calculators')}
        </h2>
        {/* 3px high, 48px wide orange underline */}
        <div className="w-[48px] h-[3px] bg-[#F97316] rounded-full my-2" />
        <p className="text-sm text-[#475569] mt-1">
          {t('home.recentlyAddedSubtitle', 'Newest tools added to our verified calculation catalog.')}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {recent.map((calc) => {
          const category = categories.find(c => c.id === calc.category);
          return (
            <div
              key={calc.id}
              onClick={() => onSelectCalculator(calc.id)}
              className="p-5 rounded-[12px] bg-[#FFFFFF] border border-[#E2E8F0] hover:bg-[#FFF7ED] hover:border-[#FDBA74] hover:shadow-md hover:-translate-y-1 transition-all cursor-pointer flex flex-col justify-between group shadow-xs"
            >
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  {category && (
                    <span className="text-[11px] font-medium text-[#475569] bg-[#F8FAFC] border border-[#E2E8F0] px-2 py-0.5 rounded">
                      {category.name}
                    </span>
                  )}
                  <span className="text-[10px] uppercase font-bold text-[#9A3412] bg-[#FFEDD5] border border-[#FDBA74] px-2 py-0.5 rounded">
                    NEW
                  </span>
                </div>
                <h3 className="font-semibold text-base text-[#0F172A] group-hover:text-[#F97316] transition-colors">
                  {calc.name}
                </h3>
                <p className="text-xs text-[#64748B] line-clamp-2 leading-relaxed">
                  {calc.shortDescription || calc.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-[#E2E8F0] flex items-center justify-between text-xs font-semibold text-[#F97316] group-hover:text-[#EA580C]">
                <span>{t('common.launch', 'Open Calculator')}</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
