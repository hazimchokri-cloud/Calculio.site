import React from 'react';
import { 
  ArrowRight,
  DollarSign,
  Activity,
  Calculator,
  ArrowLeftRight,
  Layers,
  Building,
  Receipt,
  Briefcase,
  HardHat,
  Cpu,
  GraduationCap,
  Coins,
  Calendar
} from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext';

interface CategoryGridProps {
  onSelectCategory: (categoryId: string) => void;
  onSelectCalculator?: (calculatorId: string) => void;
}

export const getCategoryColor = (id: string): string => {
  switch (id) {
    case 'financial':
      return '#F97316';
    case 'fitness-health':
      return '#F97316';
    case 'math-algebra':
      return '#0EA5E9';
    case 'real-estate':
      return '#F97316';
    case 'tax':
      return '#0891B2';
    case 'business':
      return '#7C3AED';
    case 'conversion':
      return '#F97316';
    case 'date-time':
      return '#6366F1';
    case 'construction':
      return '#F97316';
    case 'engineering':
      return '#0891B2';
    case 'education':
      return '#F97316';
    case 'cryptocurrency':
      return '#F97316';
    default:
      return '#F97316';
  }
};

export const getCategoryIcon = (id: string, color: string) => {
  const iconProps = { className: "w-6 h-6", style: { color } };
  switch (id) {
    case 'financial':
      return <DollarSign {...iconProps} />;
    case 'fitness-health':
      return <Activity {...iconProps} />;
    case 'math-algebra':
      return <Calculator {...iconProps} />;
    case 'real-estate':
      return <Building {...iconProps} />;
    case 'tax':
      return <Receipt {...iconProps} />;
    case 'business':
      return <Briefcase {...iconProps} />;
    case 'construction':
      return <HardHat {...iconProps} />;
    case 'engineering':
      return <Cpu {...iconProps} />;
    case 'education':
      return <GraduationCap {...iconProps} />;
    case 'cryptocurrency':
      return <Coins {...iconProps} />;
    case 'conversion':
      return <ArrowLeftRight {...iconProps} />;
    case 'date-time':
      return <Calendar {...iconProps} />;
    default:
      return <Layers {...iconProps} />;
  }
};

export const getCategoryTheme = (id: string) => {
  const color = getCategoryColor(id);
  const icon = getCategoryIcon(id, color);
  return {
    color,
    icon,
    bgClass: `bg-[${color}15]`,
    borderClass: `border-[${color}]`
  };
};

export const CategoryGrid: React.FC<CategoryGridProps> = ({
  onSelectCategory
}) => {
  const { t, categories, calculators } = useLanguage();

  const categoryCounts = React.useMemo(() => {
    const counts: Record<string, number> = {};
    for (const c of calculators) {
      counts[c.category] = (counts[c.category] || 0) + 1;
    }
    return counts;
  }, [calculators]);

  return (
    <section id="categories-section" className="py-14 sm:py-16 px-4 sm:px-6 lg:px-8 bg-[#F8FAFC] border-t border-b border-[#E2E8F0]">
      <div className="max-w-7xl mx-auto">
        {/* Centered Section Title with Orange Underline */}
        <div className="text-center max-w-[500px] mx-auto mb-10 sm:mb-12">
          <h2 className="text-[26px] sm:text-[32px] font-[700] text-[#0F172A] tracking-tight">
            {t('home.browseByCategoryHeading', 'Browse by Category')}
          </h2>
          {/* 3px high, 48px wide centered orange underline */}
          <div className="w-[48px] h-[3px] bg-[#F97316] rounded-full mx-auto my-3" />
          <p className="text-[15px] sm:text-[16px] text-[#475569] leading-[1.6]">
            {t('home.categoryGridSubtitleClean', 'Explore specialized calculation tools organized by practical domain.')}
          </p>
        </div>

        {/* Grid: 4 columns desktop, 2-3 tablet, 1-2 mobile */}
        <div 
          style={{
            fontWeight: 'bold',
            fontStyle: 'italic'
          }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 font-bold italic"
        >
          {categories.map((cat) => {
            const count = categoryCounts[cat.id] || 0;
            const catColor = getCategoryColor(cat.id);
            const icon = getCategoryIcon(cat.id, catColor);

            return (
              <div
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                style={{
                  borderLeft: `4px solid ${catColor}`
                }}
                className="bg-[#FFFFFF] rounded-[12px] p-5 border border-[#E2E8F0] min-h-[180px] shadow-sm hover:bg-[#FFF7ED] hover:border-[#FDBA74] hover:shadow-md hover:-translate-y-[2px] transition-all duration-200 cursor-pointer flex flex-col justify-between group"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    {/* Icon container */}
                    <div 
                      style={{
                        backgroundColor: `${catColor}15`,
                      }}
                      className="w-[44px] h-[44px] rounded-[10px] flex items-center justify-center transition-transform group-hover:scale-105"
                    >
                      {icon}
                    </div>
                    
                    {/* Count badge */}
                    <span 
                      style={{ color: catColor }}
                      className="text-[12px] font-[600] bg-[#F8FAFC] px-2.5 py-1 rounded-full border border-[#E2E8F0]"
                    >
                      {count} {count === 1 ? 'calc' : 'calcs'}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-[18px] sm:text-[19px] font-[700] text-[#0F172A] group-hover:text-[#F97316] transition-colors leading-snug">
                      {cat.name}
                    </h3>
                    <p className="text-[14px] text-[#475569] mt-1.5 leading-[1.5] line-clamp-2 font-[400]">
                      {cat.description}
                    </p>
                  </div>
                </div>

                {/* "Explore Tools →" */}
                <div 
                  style={{ color: catColor }}
                  className="mt-4 pt-3 border-t border-[#E2E8F0] flex items-center gap-1.5 text-[14px] font-[600]"
                >
                  <span>{t('home.viewCalculators', 'Explore Tools')}</span>
                  <ArrowRight className="w-3.5 h-3.5 transform translate-x-0 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};


