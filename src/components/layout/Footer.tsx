import React from 'react';
import { 
  Calculator, 
  ArrowUp, 
  ShieldCheck, 
  Lock, 
  Sparkles 
} from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext';

interface FooterProps {
  onSelectCalculator: (calcId: string) => void;
  onSelectCategory: (categoryId: string) => void;
  onGoHome: () => void;
  onGoToAllCalculators?: () => void;
  onGoToBlog: () => void;
  onGoToAbout: () => void;
  onGoToContact: () => void;
  onGoToSitemap: () => void;
  onGoToPrivacy?: () => void;
  onGoToTerms?: () => void;
  onGoToDisclaimer?: () => void;
  onSelectPost?: (slug: string) => void;
}

export const Footer: React.FC<FooterProps> = ({
  onSelectCalculator,
  onSelectCategory,
  onGoHome,
  onGoToAllCalculators,
  onGoToBlog,
  onGoToAbout,
  onGoToContact,
  onGoToSitemap,
  onGoToPrivacy,
  onGoToTerms,
  onGoToDisclaimer
}) => {
  const { t, language, setLanguage } = useLanguage();

  const scrollToTop = () => {
    try {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (_) {}
  };

  const handlePrivacy = () => {
    if (onGoToPrivacy) {
      onGoToPrivacy();
    } else {
      onGoToAbout();
    }
  };

  const handleTerms = () => {
    if (onGoToTerms) {
      onGoToTerms();
    } else {
      onGoToAbout();
    }
  };

  const handleDisclaimer = () => {
    if (onGoToDisclaimer) {
      onGoToDisclaimer();
    } else {
      onGoToAbout();
    }
  };

  // Popular calculators list
  const popularCalculators = [
    { id: 'mortgage-calculator', name: 'Mortgage Calculator' },
    { id: 'compound-interest-calculator', name: 'Compound Interest' },
    { id: 'bmi-calculator', name: 'BMI Calculator' },
    { id: 'calorie-tdee-calculator', name: 'Calorie & TDEE' },
    { id: 'percentage-calculator', name: 'Percentage Calculator' },
    { id: 'auto-loan-calculator', name: 'Auto Loan Calculator' }
  ];

  // Key Category hubs
  const categoryLinks = [
    { id: 'financial', label: 'Financial Calculators' },
    { id: 'fitness-health', label: 'Health & Fitness' },
    { id: 'math-algebra', label: 'Math & Algebra' },
    { id: 'conversion', label: 'Unit Conversions' },
    { id: 'business', label: 'Business & Real Estate' },
    { id: 'tax', label: 'Tax & Income' }
  ];

  return (
    <footer 
      id="calculio-footer"
      className="no-print bg-[#FFFFFF] text-[#475569] text-xs sm:text-sm border-t border-[#E2E8F0] relative z-10"
      aria-labelledby="footer-heading"
    >
      <h2 id="footer-heading" className="sr-only">Footer Navigation and Company Information</h2>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-6">
        
        {/* Main Footer Multi-Column Grid (4 columns desktop) */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-12 gap-y-8 gap-x-6 pb-8 border-b border-[#E2E8F0]">
          
          {/* Column 1 (4 cols on lg): Calculio Brand & Info */}
          <div className="col-span-2 md:col-span-4 lg:col-span-4 space-y-3.5 pr-0 lg:pr-6">
            <button 
              type="button"
              onClick={onGoHome}
              className="flex items-center gap-2 text-left group cursor-pointer"
              aria-label="Calculio Home"
            >
              <div className="w-8 h-8 rounded-[8px] bg-[#F97316] flex items-center justify-center text-white shadow-xs transition-transform group-hover:scale-105">
                <Calculator className="w-4.5 h-4.5" />
              </div>
              <span className="text-[22px] tracking-tight font-extrabold">
                <span className="text-[#0F172A]">Calcul</span>
                <span className="text-[#F97316]">io</span>
              </span>
            </button>

            <p className="text-[13px] text-[#475569] leading-relaxed max-w-sm">
              {t('footer.aboutText', 'Free, verified online calculation tools for finance, health, math, conversions, and business with fast browser-side computation.')}
            </p>

            {/* Trust Highlights */}
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-[6px] bg-[#F8FAFC] border border-[#E2E8F0] text-[11px] font-medium text-[#475569]">
                <ShieldCheck className="w-3.5 h-3.5 text-[#F97316]" />
                <span>100% Free</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-[6px] bg-[#F8FAFC] border border-[#E2E8F0] text-[11px] font-medium text-[#475569]">
                <Lock className="w-3.5 h-3.5 text-[#F97316]" />
                <span>Client Privacy</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-[6px] bg-[#F8FAFC] border border-[#E2E8F0] text-[11px] font-medium text-[#475569]">
                <Sparkles className="w-3.5 h-3.5 text-[#F97316]" />
                <span>Verified Math</span>
              </span>
            </div>
          </div>

          {/* Column 2 (2 cols on lg): Calculators by Category */}
          <div className="col-span-1 md:col-span-1 lg:col-span-3 space-y-3">
            <h3 className="font-bold text-[#0F172A] text-[14px] uppercase tracking-wider">
              {t('footer.calculatorsHeading', 'Calculators')}
            </h3>
            <ul className="space-y-2">
              {categoryLinks.map((cat) => (
                <li key={cat.id}>
                  <button
                    type="button"
                    onClick={() => onSelectCategory(cat.id)}
                    className="text-[13px] text-[#475569] hover:text-[#F97316] transition-colors text-left truncate max-w-full block cursor-pointer"
                  >
                    {cat.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 (2 cols on lg): Popular Calculators */}
          <div className="col-span-1 md:col-span-1 lg:col-span-3 space-y-3">
            <h3 className="font-bold text-[#0F172A] text-[14px] uppercase tracking-wider">
              Popular Tools
            </h3>
            <ul className="space-y-2">
              {popularCalculators.map((calc) => (
                <li key={calc.id}>
                  <button
                    type="button"
                    onClick={() => onSelectCalculator(calc.id)}
                    className="text-[13px] text-[#475569] hover:text-[#F97316] transition-colors text-left truncate max-w-full block cursor-pointer"
                  >
                    {calc.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4 (2 cols on lg): Resources & Legal */}
          <div className="col-span-2 md:col-span-2 lg:col-span-2 space-y-3">
            <h3 className="font-bold text-[#0F172A] text-[14px] uppercase tracking-wider">
              {t('footer.resourcesHeading', 'Resources & Legal')}
            </h3>
            <ul className="space-y-2">
              <li>
                <button 
                  type="button"
                  onClick={onGoToBlog} 
                  className="text-[13px] text-[#475569] hover:text-[#F97316] transition-colors text-left block cursor-pointer"
                >
                  {t('nav.blog', 'Blog & Guides')}
                </button>
              </li>
              <li>
                <button 
                  type="button"
                  onClick={onGoToAbout} 
                  className="text-[13px] text-[#475569] hover:text-[#F97316] transition-colors text-left block cursor-pointer"
                >
                  {t('nav.about', 'About Us')}
                </button>
              </li>
              <li>
                <button 
                  type="button"
                  onClick={onGoToContact} 
                  className="text-[13px] text-[#475569] hover:text-[#F97316] transition-colors text-left block cursor-pointer"
                >
                  {t('nav.contact', 'Contact & Support')}
                </button>
              </li>
              <li>
                <button 
                  type="button"
                  onClick={handlePrivacy} 
                  className="text-[13px] text-[#475569] hover:text-[#F97316] transition-colors text-left block cursor-pointer"
                >
                  {t('footer.privacyPolicy', 'Privacy Policy')}
                </button>
              </li>
              <li>
                <button 
                  type="button"
                  onClick={handleTerms} 
                  className="text-[13px] text-[#475569] hover:text-[#F97316] transition-colors text-left block cursor-pointer"
                >
                  {t('footer.termsOfUse', 'Terms of Use')}
                </button>
              </li>
              <li>
                <button 
                  type="button"
                  onClick={handleDisclaimer} 
                  className="text-[13px] text-[#475569] hover:text-[#F97316] transition-colors text-left block cursor-pointer"
                >
                  {t('footer.disclaimerTitle', 'Disclaimer')}
                </button>
              </li>
              <li>
                <button 
                  type="button"
                  onClick={onGoToSitemap} 
                  className="text-[13px] text-[#475569] hover:text-[#F97316] transition-colors text-left block cursor-pointer"
                >
                  {t('footer.sitemap', 'XML Sitemap')}
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Informational Disclaimer Banner */}
        <div className="py-3.5 border-b border-[#E2E8F0] text-[12px] text-[#64748B] leading-normal text-center sm:text-left">
          <p>
            <strong className="text-[#0F172A] font-semibold">Educational Disclosure:</strong> Calculations, amortization schedules, and health estimations on Calculio are for educational and informational purposes only and do not constitute financial, tax, legal, or medical advice.
          </p>
        </div>

        {/* Bottom Copyright, Quick Links, Languages & Top Button */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-[12px] text-[#64748B]">
          
          {/* Copyright notice */}
          <div className="flex items-center gap-2">
            <span>© {new Date().getFullYear()} Calculio. All rights reserved.</span>
          </div>

          {/* Legal Quick Links, Languages & Back to Top */}
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1.5 text-[12px]">
            <button 
              type="button"
              onClick={handlePrivacy} 
              className="hover:text-[#F97316] transition-colors cursor-pointer"
            >
              {t('footer.privacyPolicy', 'Privacy')}
            </button>
            <span className="text-[#E2E8F0]">•</span>
            <button 
              type="button"
              onClick={handleTerms} 
              className="hover:text-[#F97316] transition-colors cursor-pointer"
            >
              {t('footer.termsOfUse', 'Terms')}
            </button>
            <span className="text-[#E2E8F0]">•</span>
            <button 
              type="button"
              onClick={handleDisclaimer} 
              className="hover:text-[#F97316] transition-colors cursor-pointer"
            >
              {t('footer.disclaimerTitle', 'Disclaimer')}
            </button>
            <span className="text-[#E2E8F0]">•</span>
            <button 
              type="button"
              onClick={onGoToSitemap} 
              className="hover:text-[#F97316] transition-colors cursor-pointer"
            >
              {t('footer.sitemap', 'Sitemap')}
            </button>

            {/* Language Switcher */}
            <div className="flex items-center gap-1.5 pl-2 sm:border-l sm:border-[#E2E8F0] ml-0.5">
              <button 
                type="button"
                onClick={() => setLanguage('en')} 
                className={`transition-colors cursor-pointer ${language === 'en' ? 'text-[#F97316] font-bold' : 'hover:text-[#0F172A] text-[#475569]'}`}
                title="Switch to English"
              >
                EN
              </button>
              <span className="text-[#E2E8F0]">|</span>
              <button 
                type="button"
                onClick={() => setLanguage('fr')} 
                className={`transition-colors cursor-pointer ${language === 'fr' ? 'text-[#F97316] font-bold' : 'hover:text-[#0F172A] text-[#475569]'}`}
                title="Passer en Français"
              >
                FR
              </button>
              <span className="text-[#E2E8F0]">|</span>
              <button 
                type="button"
                onClick={() => setLanguage('ar')} 
                className={`transition-colors cursor-pointer ${language === 'ar' ? 'text-[#F97316] font-bold' : 'hover:text-[#0F172A] text-[#475569]'}`}
                title="التبديل إلى العربية"
              >
                AR
              </button>
            </div>

            {/* Back to Top Button */}
            <div className="pl-2 sm:border-l sm:border-[#E2E8F0] ml-0.5">
              <button
                type="button"
                onClick={scrollToTop}
                className="inline-flex items-center gap-1 text-[#475569] hover:text-[#F97316] transition-colors cursor-pointer"
                title={t('common.back', 'Back to Top')}
              >
                <ArrowUp className="w-3.5 h-3.5" />
                <span className="text-[11px]">Top</span>
              </button>
            </div>
          </div>

        </div>

      </div>
    </footer>
  );
};
