import React from 'react';
import { ChevronRight, Home } from 'lucide-react';
import { BreadcrumbItem } from '../../types';
import { useLanguage } from '../../i18n/LanguageContext';

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  onGoHome?: () => void;
  className?: string;
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({
  items,
  onGoHome,
  className = ''
}) => {
  const { t } = useLanguage();

  return (
    <nav 
      aria-label="Breadcrumb" 
      className={`flex items-center flex-wrap gap-1.5 sm:gap-2 text-xs sm:text-sm font-semibold text-[#64748B] ${className}`}
    >
      {/* Home link */}
      <button
        type="button"
        onClick={onGoHome || items[0]?.onClick}
        className="flex items-center gap-1 text-[#64748B] hover:text-[#F97316] transition-colors p-1 -m-1 rounded-md cursor-pointer"
        title={t('nav.home', 'Home')}
      >
        <Home className="w-4 h-4 text-[#64748B] group-hover:text-[#F97316]" />
        <span className="hidden sm:inline">{t('nav.home', 'Home')}</span>
      </button>

      {items.map((item, index) => {
        const isLast = index === items.length - 1;

        return (
          <React.Fragment key={index}>
            <ChevronRight className="w-4 h-4 text-[#94A3B8] shrink-0" />
            {isLast || item.active || !item.onClick ? (
              <span 
                className="text-[#0F172A] font-bold truncate max-w-[200px] sm:max-w-[320px]"
                aria-current={isLast ? 'page' : undefined}
              >
                {item.label}
              </span>
            ) : (
              <button
                type="button"
                onClick={item.onClick}
                className="text-[#64748B] hover:text-[#F97316] transition-colors truncate max-w-[160px] sm:max-w-[220px] cursor-pointer"
              >
                {item.label}
              </button>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
};
