import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext';

interface PopularCalculatorsProps {
  onSelectCalculator: (id: string) => void;
}

export const PopularCalculators: React.FC<PopularCalculatorsProps> = ({ onSelectCalculator }) => {
  const { t, calculators, categories } = useLanguage();
  const popular = calculators.filter(c => c.popular).slice(0, 6);

  return (
    <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-[#F8FAFC]">
      <div className="mb-10">
        <h2 className="text-2xl sm:text-3xl font-bold text-[#0F172A] tracking-tight">
          {t('home.popularTitle', 'Popular Calculators')}
        </h2>
        {/* 3px high, 48px wide orange underline */}
        <div className="w-[48px] h-[3px] bg-[#F97316] rounded-full my-2" />
        <p className="text-sm text-[#475569] mt-1">
          {t('home.popularSubtitle', 'The most frequently used calculation tools by students, homeowners, and financial planners.')}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {popular.map((calc, idx) => {
          const category = categories.find(c => c.id === calc.category);
          return (
            <div
              key={calc.id}
              onClick={() => onSelectCalculator(calc.id)}
              className="p-4 rounded-xl border border-[#E2E8F0] bg-[#FFFFFF] hover:bg-[#FFF7ED] hover:border-[#FDBA74] hover:shadow-md transition-all cursor-pointer flex items-center justify-between group shadow-xs"
            >
              <div className="flex items-center gap-3 min-w-0">
                <span className="w-7 h-7 rounded-lg bg-[#F8FAFC] group-hover:bg-[#FFEDD5] text-[#475569] group-hover:text-[#9A3412] font-mono text-xs font-bold flex items-center justify-center shrink-0 transition-colors border border-[#E2E8F0]">
                  {idx + 1}
                </span>
                <div className="min-w-0">
                  <h3 className="font-semibold text-sm text-[#0F172A] group-hover:text-[#F97316] transition-colors truncate">
                    {calc.name}
                  </h3>
                  <span className="text-xs text-[#64748B] truncate block">
                    {category?.name}
                  </span>
                </div>
              </div>

              <ArrowRight className="w-4 h-4 text-[#64748B] group-hover:text-[#F97316] group-hover:translate-x-0.5 transition-transform shrink-0" />
            </div>
          );
        })}
      </div>
    </section>
  );
};
