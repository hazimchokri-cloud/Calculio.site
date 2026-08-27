import React, { useState } from 'react';
import { 
  CheckCircle2, 
  Zap, 
  ShieldCheck, 
  Smartphone, 
  ChevronDown 
} from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext';

export const TrustAndFaqSection: React.FC = () => {
  const { t } = useLanguage();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const trustBenefits = [
    {
      icon: <CheckCircle2 className="w-5.5 h-5.5 text-[#F97316] shrink-0" />,
      accentColor: '#F97316',
      title: t('trust.accurateTitle', 'Accurate Calculations'),
      description: t('trust.accurateDesc', 'Calculations are based on verified mathematical formulas and official financial standards.')
    },
    {
      icon: <Zap className="w-5.5 h-5.5 text-[#F97316] shrink-0" />,
      accentColor: '#F97316',
      title: t('trust.fastTitle', 'Fast & Easy'),
      description: t('trust.fastDesc', 'Instant calculations as you type with intuitive inputs and responsive breakdowns.')
    },
    {
      icon: <ShieldCheck className="w-5.5 h-5.5 text-[#F97316] shrink-0" />,
      accentColor: '#F97316',
      title: t('trust.freeTitle', 'Free to Use'),
      description: t('trust.freeDesc', 'Completely free access to all calculators with zero paywalls or registration.')
    },
    {
      icon: <Smartphone className="w-5.5 h-5.5 text-[#F97316] shrink-0" />,
      accentColor: '#F97316',
      title: t('trust.everywhereTitle', 'Works Everywhere'),
      description: t('trust.everywhereDesc', 'Optimized for smooth performance on desktop, tablet, and mobile browsers.')
    }
  ];

  const faqs = [
    {
      q: t('faq.q1', 'Are all calculators on Calculio 100% free to use?'),
      a: t('faq.a1', 'Yes, every calculator, amortization schedule, formula breakdown, and export tool on Calculio is completely free with no paywalls or sign-ups required.')
    },
    {
      q: t('faq.q2', 'How accurate are the financial and math results?'),
      a: t('faq.a2', 'All calculators use standard actuarial algorithms, compound interest math, and verified formula logic tested against industry benchmarks.')
    },
    {
      q: t('faq.q3', 'Does Calculio store my personal or financial inputs?'),
      a: t('faq.a3', 'No. All calculations run strictly in your local browser sandbox. Your inputs are private and never uploaded to remote tracking servers.')
    },
    {
      q: t('faq.q4', 'Can I use Calculio on mobile devices?'),
      a: t('faq.a4', 'Yes, all calculator interfaces and interactive graphs are fully responsive and touch-optimized for smartphones and tablets.')
    }
  ];

  return (
    <section className="py-14 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-[#FFFFFF] border-t border-[#E2E8F0]">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
        
        {/* Left Column (5 cols): Why Choose Calculio */}
        <div className="lg:col-span-5 space-y-6 sm:space-y-8">
          <div>
            <h2 className="text-[26px] sm:text-[32px] font-[700] text-[#0F172A] tracking-tight">
              {t('trust.sectionHeading', 'Why Choose Calculio')}
            </h2>
            {/* 3px high, 48px wide orange underline */}
            <div className="w-[48px] h-[3px] bg-[#F97316] rounded-full my-3" />
            <p className="text-[15px] sm:text-[16px] text-[#475569] leading-[1.6]">
              {t('trust.sectionSubheading', 'Built for mathematical precision, transparent formulas, and effortless everyday usability.')}
            </p>
          </div>

          <div className="space-y-3.5">
            {trustBenefits.map((b, idx) => (
              <div 
                key={idx} 
                className="flex items-start gap-4 p-4 rounded-[12px] bg-[#FFFFFF] border border-[#E2E8F0] shadow-xs hover:bg-[#FFF7ED] hover:border-[#FDBA74] hover:-translate-y-[2px] transition-all duration-200"
              >
                <div 
                  style={{ backgroundColor: `${b.accentColor}15` }}
                  className="w-11 h-11 rounded-[10px] flex items-center justify-center shrink-0 mt-0.5"
                >
                  {b.icon}
                </div>
                <div>
                  <h3 className="text-[16px] sm:text-[17px] font-[600] text-[#0F172A]">
                    {b.title}
                  </h3>
                  <p className="text-[14px] text-[#475569] mt-1 leading-[1.5]">
                    {b.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column (7 cols): Frequently Asked Questions Accordion */}
        <div className="lg:col-span-7 space-y-6">
          <div>
            <h2 className="text-[26px] sm:text-[32px] font-[700] text-[#0F172A] tracking-tight">
              {t('faq.title', 'Frequently Asked Questions')}
            </h2>
            {/* 3px high, 48px wide orange underline */}
            <div className="w-[48px] h-[3px] bg-[#F97316] rounded-full my-3" />
            <p className="text-[15px] sm:text-[16px] text-[#475569] leading-[1.6]">
              {t('faq.subtitle', 'Quick answers to common questions about our calculators and privacy.')}
            </p>
          </div>

          <div className="space-y-3 pt-1">
            {faqs.map((faq, idx) => {
              const isOpen = openIndex === idx;
              return (
                <div
                  key={idx}
                  className={`rounded-[12px] border transition-all overflow-hidden ${
                    isOpen 
                      ? 'bg-[#FFF7ED] border-[#F97316] shadow-sm' 
                      : 'bg-[#FFFFFF] border-[#E2E8F0] hover:border-[#FDBA74]'
                  }`}
                >
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : idx)}
                    className="w-full p-4.5 text-left flex items-center justify-between gap-4 font-[600] text-[#0F172A] text-[16px] sm:text-[17px] hover:text-[#F97316] transition-colors cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown className={`w-5 h-5 text-[#F97316] shrink-0 transition-transform duration-250 ${isOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {isOpen && (
                    <div className="px-4.5 pb-4.5 text-[15px] text-[#475569] leading-[1.6] border-t border-[#E2E8F0] pt-3.5">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};

