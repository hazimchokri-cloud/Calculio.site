import React from 'react';
import { 
  ArrowRight, 
  DollarSign, 
  Percent, 
  TrendingUp, 
  ArrowLeftRight,
  HeartPulse,
  Home,
  ShieldCheck
} from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext';

interface FeaturedCalculatorsProps {
  onSelectCalculator: (id: string) => void;
  onViewAllCalculators?: () => void;
}

export const FeaturedCalculators: React.FC<FeaturedCalculatorsProps> = ({ 
  onSelectCalculator,
  onViewAllCalculators 
}) => {
  const { t, language, calculators } = useLanguage();
  
  // 8 Popular Calculators in 4-column desktop grid
  const popularCards = [
    {
      id: 'mortgage-calculator',
      name: language === 'fr' ? 'Calculateur de Prêt Immobilier' : 'Mortgage Calculator',
      description: language === 'fr' 
        ? 'Mensualités, intérêts totaux et tableau d\'amortissement complet.' 
        : 'Monthly payments, total interest, and full amortization schedule.',
      icon: <Home className="w-5 h-5" />,
      accentColor: '#F97316',
    },
    {
      id: 'bmi-calculator',
      name: language === 'fr' ? 'Calculateur d\'IMC' : 'BMI Calculator',
      description: language === 'fr' 
        ? 'Calculez votre Indice de Masse Corporelle et votre poids idéal.' 
        : 'Calculate Body Mass Index, healthy weight range, and category.',
      icon: <HeartPulse className="w-5 h-5" />,
      accentColor: '#F97316',
    },
    {
      id: 'percentage-calculator',
      name: language === 'fr' ? 'Calculateur de Pourcentage' : 'Percentage Calculator',
      description: language === 'fr' 
        ? 'Calculez les pourcentages, remises, hausses et différences.' 
        : 'Find percentages, % changes, discounts, and percentage difference.',
      icon: <Percent className="w-5 h-5" />,
      accentColor: '#0EA5E9',
    },
    {
      id: 'loan-calculator',
      name: language === 'fr' ? 'Calculateur de Prêt' : 'Loan Calculator',
      description: language === 'fr' 
        ? 'Calculez les mensualités et le coût total de tout prêt fixe.' 
        : 'Calculate monthly payments and total interest on any fixed loan.',
      icon: <DollarSign className="w-5 h-5" />,
      accentColor: '#F97316',
    },
    {
      id: 'compound-interest-calculator',
      name: language === 'fr' ? 'Calculateur d\'Intérêts Composés' : 'Compound Interest Calculator',
      description: language === 'fr' 
        ? 'Projetez la croissance future de vos investissements et rendements.' 
        : 'Project future investment growth and compounding returns.',
      icon: <TrendingUp className="w-5 h-5" />,
      accentColor: '#F97316',
    },
    {
      id: 'unit-converter',
      name: language === 'fr' ? 'Convertisseur d\'Unités' : 'Unit Converter',
      description: language === 'fr' 
        ? 'Convertissez instantanément longueurs, poids, températures et devises.' 
        : 'Convert length, weight, temperature, area, volume, and speed.',
      icon: <ArrowLeftRight className="w-5 h-5" />,
      accentColor: '#F97316',
    },
    {
      id: 'calorie-tdee-calculator',
      name: language === 'fr' ? 'Calculateur de Calories & TDEE' : 'Calorie & TDEE Calculator',
      description: language === 'fr' 
        ? 'Dépense énergétique quotidienne et calories pour perte ou gain.' 
        : 'Total daily energy expenditure and macronutrient goals.',
      icon: <HeartPulse className="w-5 h-5" />,
      accentColor: '#F97316',
    },
    {
      id: 'retirement-calculator',
      name: language === 'fr' ? 'Calculateur de Retraite' : 'Retirement Calculator',
      description: language === 'fr' 
        ? 'Estimez votre épargne retraite et la date idéale de départ.' 
        : 'Estimate nest egg projections, savings rate, and retirement timeline.',
      icon: <ShieldCheck className="w-5 h-5" />,
      accentColor: '#F97316',
    }
  ];

  return (
    <section 
      id="popular-calculators-section" 
      style={{
        fontWeight: 'bold',
        fontStyle: 'italic',
        color: '#0b3fc6'
      }}
      className="py-14 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-[#F8FAFC] font-bold italic text-[#0b3fc6]"
    >
      {/* Centered Section Title with Orange Underline */}
      <div className="text-center max-w-[600px] mx-auto mb-10 sm:mb-12">
        <h2 className="text-[26px] sm:text-[32px] font-[700] text-[#0F172A] tracking-tight">
          {t('home.popularCalculatorsHeading', 'Most Popular Calculators')}
        </h2>
        {/* 3px high, 48px wide centered orange underline */}
        <div className="w-[48px] h-[3px] bg-[#F97316] rounded-full mx-auto my-3" />
        <p className="text-[15px] sm:text-[16px] text-[#475569] leading-[1.6]">
          {t('home.featuredSubtitle', 'Frequently used tools for fast, accurate calculations.')}
        </p>
      </div>

      {/* Grid: 4 columns desktop, 2-3 tablet, 1-2 mobile */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {popularCards.map((calc) => {
          const meta = calculators.find(c => c.id === calc.id);
          const title = meta?.name || calc.name;
          const description = calc.description || meta?.shortDescription || meta?.description;

          return (
            <div
              key={calc.id}
              onClick={() => onSelectCalculator(calc.id)}
              className="bg-[#FFFFFF] rounded-[12px] p-5 border border-[#E2E8F0] shadow-xs hover:bg-[#FFF7ED] hover:border-[#FDBA74] hover:shadow-md hover:-translate-y-[2px] transition-all duration-200 cursor-pointer flex flex-col justify-between group"
            >
              <div className="space-y-3">
                {/* Icon with colored tint */}
                <div 
                  style={{
                    backgroundColor: `${calc.accentColor}15`,
                    color: calc.accentColor
                  }}
                  className="w-[38px] h-[38px] rounded-[8px] flex items-center justify-center transition-transform group-hover:scale-105"
                >
                  {calc.icon}
                </div>

                <div>
                  <h3 className="text-[16px] sm:text-[17px] font-[600] text-[#0F172A] group-hover:text-[#F97316] transition-colors leading-snug">
                    {title}
                  </h3>
                  <p className="text-[14px] text-[#475569] mt-1.5 leading-[1.5] line-clamp-2">
                    {description}
                  </p>
                </div>
              </div>

              {/* Launch -> link */}
              <div className="mt-4 pt-3 border-t border-[#E2E8F0] flex items-center justify-end">
                <span className="text-[14px] font-[600] text-[#F97316] group-hover:translate-x-0.5 transition-transform flex items-center gap-1">
                  {t('common.launch', 'Launch')} →
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* View All CTA */}
      {onViewAllCalculators && (
        <div className="mt-10 text-center">
          <button
            type="button"
            onClick={() => onViewAllCalculators()}
            className="bg-[#FFFFFF] hover:bg-[#FFF7ED] border border-[#E2E8F0] hover:border-[#FDBA74] text-[#0F172A] hover:text-[#F97316] rounded-[8px] px-6 py-3 font-[600] text-[15px] sm:text-[16px] transition-all duration-150 cursor-pointer inline-flex items-center gap-2 active:scale-[0.98] shadow-xs"
          >
            <span>{t('home.viewAllCalculators', `Browse All ${calculators.length} Calculators`)}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </section>
  );
};


