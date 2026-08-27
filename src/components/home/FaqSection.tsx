import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext';

export const FaqSection: React.FC = () => {
  const { t } = useLanguage();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: t('faq.q1', 'Are all calculators on Calculio 100% free to use?'),
      a: t('faq.a1', 'Yes, every calculator, amortization schedule, formula breakdown, and CSV export tool on Calculio is completely free with no paywalls or registration required.')
    },
    {
      q: t('faq.q2', 'How accurate are the financial and tax calculations?'),
      a: t('faq.a2', 'All financial calculations use standard banking algorithms, actuarial compound interest formulas, and official tax brackets. Note that individual local tax codes and lender-specific closing fee conventions can cause minor variances in real-world quotes.')
    },
    {
      q: t('faq.q3', 'Can I export calculation data and amortization tables?'),
      a: t('faq.a3', 'Yes! Our loan and compound interest calculators include one-click "Download Amortization (CSV)" buttons and instant "Copy Summary" clipboard features.')
    },
    {
      q: t('faq.q4', 'Does Calculio save my personal financial or health data?'),
      a: t('faq.a4', 'No. All calculations are executed client-side inside your browser sandbox. When you click "Save Result", the data is written solely to your own browser’s private localStorage.')
    },
    {
      q: t('faq.q5', 'Can I switch between Imperial and Metric measurements?'),
      a: t('faq.a5', 'Yes. Health and conversion calculators provide instant switches between metric units (kg, cm, Celsius) and imperial units (lbs, feet/inches, Fahrenheit).')
    }
  ];

  return (
    <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto bg-[#FFFFFF] border-t border-[#E2E8F0]">
      <div className="text-center mb-10">
        <h2 className="text-2xl sm:text-3xl font-bold text-[#0F172A] tracking-tight">
          {t('faq.title', 'Frequently Asked Questions')}
        </h2>
        {/* 3px high, 48px wide orange underline */}
        <div className="w-[48px] h-[3px] bg-[#F97316] rounded-full my-2 mx-auto" />
        <p className="text-sm text-[#475569] mt-1">
          {t('faq.subtitle', 'Everything you need to know about our calculators and privacy standards.')}
        </p>
      </div>

      <div className="space-y-3">
        {faqs.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={idx}
              className={`rounded-xl border transition-all overflow-hidden ${
                isOpen 
                  ? 'bg-[#FFF7ED] border-[#F97316] shadow-sm' 
                  : 'bg-[#FFFFFF] border-[#E2E8F0] hover:border-[#FDBA74]'
              }`}
            >
              <button
                onClick={() => setOpenIndex(isOpen ? null : idx)}
                className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-semibold text-[#0F172A] text-sm sm:text-base hover:text-[#F97316] transition-colors cursor-pointer"
              >
                <span>{faq.q}</span>
                <ChevronDown className={`w-4 h-4 text-[#F97316] shrink-0 transition-transform duration-250 ${isOpen ? 'rotate-180' : ''}`} />
              </button>

              {isOpen && (
                <div className="px-4 sm:px-5 pb-5 text-xs sm:text-sm text-[#475569] leading-relaxed border-t border-[#E2E8F0] pt-3">
                  {faq.a}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};
