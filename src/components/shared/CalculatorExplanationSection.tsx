import React, { useState } from 'react';
import { CalculatorMeta, CalculatorExplanation } from '../../types';
import { getCalculatorExplanation } from '../../data/calculatorExplanations';
import { 
  BookOpen, 
  HelpCircle, 
  CheckCircle2, 
  Lightbulb, 
  Briefcase, 
  Layers, 
  ChevronDown, 
  ChevronUp,
  Calculator,
  ShieldAlert
} from 'lucide-react';
import { AdSlot } from './AdSlot';
import { useLanguage } from '../../i18n/LanguageContext';

interface CalculatorExplanationSectionProps {
  calculator: CalculatorMeta;
  currencySymbol?: string;
}

export const CalculatorExplanationSection: React.FC<CalculatorExplanationSectionProps> = ({
  calculator,
  currencySymbol = '$'
}) => {
  const { t, getExplanation, getCalculator } = useLanguage();
  const localizedCalc = getCalculator(calculator.id);
  const explanation = getExplanation(calculator.id) || getCalculatorExplanation(localizedCalc);
  const [expandedFaqIndex, setExpandedFaqIndex] = useState<number | null>(0);

  return (
    <section 
      id={`explanation-section-${calculator.id}`} 
      aria-label="Calculator Documentation and Educational Content"
      className="space-y-12 pb-16"
    >
      {/* 1. Introduction Section */}
      <article id="introduction" className="prose prose-slate max-w-none">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#F97316] mb-3">
          <BookOpen className="w-4 h-4" />
          <span>{t('calcView.guideTitle', 'Educational Guide')}</span>
        </div>
        <h2 className="text-2xl sm:text-[32px] font-black text-[#0F172A] tracking-tight mb-4">
          Introduction to the {localizedCalc.name}
        </h2>
        <div className="text-base sm:text-lg text-[#475569] leading-relaxed space-y-4">
          {explanation.introduction.split('\n\n').map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>
      </article>

      <AdSlot type="in-content" />

      {/* 2. How It Works Section */}
      <section id="how-it-works" className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-[#FFF7ED] text-[#F97316]">
            <Layers className="w-6 h-6" />
          </div>
          <h2 className="text-2xl sm:text-2xl font-black text-[#0F172A] tracking-tight">
            How Does the {localizedCalc.name} Work?
          </h2>
        </div>
        
        <div className="bg-[#FFFFFF] rounded-2xl p-6 sm:p-8 border border-[#E2E8F0] shadow-xs space-y-6">
          <p className="text-base text-[#475569] leading-relaxed">
            {explanation.howItWorks.summary}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {explanation.howItWorks.steps.map((step, idx) => (
              <div 
                key={idx} 
                className="p-5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] space-y-2 relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-4 opacity-[0.03] pointer-events-none">
                  <span className="text-8xl font-black text-[#0F172A]">{idx + 1}</span>
                </div>
                <div className="text-base font-bold text-[#0F172A] flex items-center gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#F97316] text-[#FFFFFF] flex items-center justify-center text-xs font-bold">
                    {idx + 1}
                  </span>
                  <span>{step.title.replace(/^\d+\.\s*/, '')}</span>
                </div>
                <p className="text-sm text-[#475569] leading-relaxed">
                  {step.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Mathematical Formula Section */}
      <section id="formula" className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-[#FFF7ED] text-[#F97316]">
            <Calculator className="w-6 h-6" />
          </div>
          <h2 className="text-2xl sm:text-2xl font-black text-[#0F172A] tracking-tight">
            The Calculation Formula
          </h2>
        </div>

        <div className="bg-[#FFFFFF] rounded-2xl p-6 sm:p-8 border border-[#E2E8F0] shadow-xs space-y-8">
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-[#0F172A]">{explanation.formula.title}</h3>
            <p className="text-base text-[#475569] leading-relaxed">
              {explanation.formula.explanation}
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900 text-white shadow-xl space-y-3 border border-slate-800 text-center">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#F97316]">
              {t('calcView.equation', 'Mathematical Model')}
            </span>
            <div className="font-mono text-lg sm:text-2xl md:text-3xl text-white font-bold overflow-x-auto py-2 scrollbar-hide">
              {explanation.formula.equation}
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-black uppercase tracking-widest text-[#0F172A]">
              Variable Definitions
            </h4>
            <div className="overflow-x-auto rounded-xl border border-[#E2E8F0]">
              <table className="w-full text-left text-sm">
                <thead className="bg-[#F8FAFC] border-b border-[#E2E8F0] text-[#0F172A] font-bold">
                  <tr>
                    <th className="py-4 px-5">{t('calcView.symbol', 'Symbol')}</th>
                    <th className="py-4 px-5">{t('calcView.variableName', 'Variable Name')}</th>
                    <th className="py-4 px-5">{t('calcView.description', 'Description')}</th>
                    <th className="py-4 px-5">{t('calcView.standardUnit', 'Unit')}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E2E8F0] text-[#475569]">
                  {explanation.formula.variables.map((v, vIdx) => (
                    <tr key={vIdx} className="hover:bg-[#FFF7ED] transition-colors">
                      <td className="py-4 px-5 font-mono font-bold text-[#F97316]">
                        {v.symbol}
                      </td>
                      <td className="py-4 px-5 font-bold text-[#0F172A]">
                        {v.name}
                      </td>
                      <td className="py-4 px-5 text-[#475569]">
                        {v.description}
                      </td>
                      <td className="py-4 px-5 font-mono text-[#64748B]">
                        {v.unit || '—'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Practical Examples Section */}
      <section id="examples" className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-[#FFF7ED] text-[#F97316]">
            <Lightbulb className="w-6 h-6" />
          </div>
          <h2 className="text-2xl sm:text-2xl font-black text-[#0F172A] tracking-tight">
            Practical Calculation Examples
          </h2>
        </div>

        <div className="space-y-6">
          {explanation.examples.map((ex, exIdx) => (
            <div 
              key={exIdx} 
              className="bg-[#FFFFFF] rounded-2xl border border-[#E2E8F0] p-6 sm:p-8 shadow-xs space-y-6"
            >
              <div className="border-b border-[#E2E8F0] pb-4">
                <h3 className="text-xl font-bold text-[#0F172A]">
                  Example {exIdx + 1}: {ex.title}
                </h3>
                <p className="text-base text-[#475569] mt-2 leading-relaxed">
                  {ex.scenario}
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h4 className="text-xs font-black uppercase tracking-[0.1em] text-[#0F172A]">
                    {t('calcView.givenInputs', 'Input Values')}
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {Object.entries(ex.inputs).map(([k, val], iIdx) => (
                      <div key={iIdx} className="bg-[#F8FAFC] p-4 rounded-xl border border-[#E2E8F0]">
                        <span className="text-xs text-[#64748B] font-bold block mb-1 uppercase tracking-tighter">{k}</span>
                        <span className="text-base font-black text-[#0F172A] font-mono">{String(val)}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="text-xs font-black uppercase tracking-[0.1em] text-[#0F172A]">
                    {t('calcView.calculationSteps', 'Step-by-Step Breakdown')}
                  </h4>
                  <div className="space-y-3">
                    {ex.steps.map((st, sIdx) => (
                      <div key={sIdx} className="flex items-start gap-3 text-sm text-[#475569] bg-[#F8FAFC] p-4 rounded-xl border border-[#E2E8F0]">
                        <CheckCircle2 className="w-5 h-5 text-[#F97316] shrink-0" />
                        <span className="leading-relaxed">{st}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-[#FFF7ED] border border-[#FDBA74] space-y-3">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-black uppercase tracking-[0.2em] text-[#9A3412]">
                    {t('calcView.finalResult', 'Calculation Result')}
                  </span>
                </div>
                <div className="text-2xl font-black text-[#9A3412] font-mono">
                  {ex.result}
                </div>
                {ex.takeaway && (
                  <div className="pt-3 border-t border-[#FDBA74]/30">
                    <p className="text-[15px] text-[#475569] leading-relaxed italic">
                      <strong className="text-[#0F172A] not-italic">{t('common.keyTakeaways', 'Note:')}</strong> {ex.takeaway}
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Understanding Your Results */}
      <section id="understanding-results" className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-[#FFF7ED] text-[#F97316]">
            <HelpCircle className="w-6 h-6" />
          </div>
          <h2 className="text-2xl sm:text-2xl font-black text-[#0F172A] tracking-tight">
            Understanding Your Results
          </h2>
        </div>
        <div className="bg-[#FFFFFF] rounded-2xl p-6 sm:p-8 border border-[#E2E8F0] shadow-xs">
          <div className="prose prose-slate max-w-none text-base text-[#475569] leading-relaxed space-y-4">
            {explanation.understandingResults.split('\n\n').map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>
        </div>
      </section>

      <AdSlot type="in-content" />

      {/* 6. Practical Use Cases */}
      <section id="use-cases" className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-[#FFF7ED] text-[#F97316]">
            <Briefcase className="w-6 h-6" />
          </div>
          <h2 className="text-2xl sm:text-2xl font-black text-[#0F172A] tracking-tight">
            Who Should Use This Calculator?
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {explanation.useCases.map((uc, uIdx) => (
            <div 
              key={uIdx}
              className="p-6 rounded-2xl bg-[#FFFFFF] border border-[#E2E8F0] shadow-xs space-y-4 flex flex-col"
            >
              <div className="flex-grow space-y-3">
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#F97316] bg-[#FFF7ED] px-2 py-1 rounded-lg border border-[#FDBA74]">
                  {uc.targetAudience}
                </span>
                <h3 className="text-lg font-bold text-[#0F172A]">
                  {uc.title}
                </h3>
                <p className="text-sm text-[#475569] leading-relaxed">
                  {uc.description}
                </p>
              </div>

              <div className="space-y-2 pt-4 border-t border-[#E2E8F0]">
                <span className="text-xs font-black text-[#0F172A] uppercase tracking-widest block mb-2">
                  {t('calcView.keyBenefits', 'Key Benefits')}
                </span>
                <div className="space-y-2">
                  {uc.benefits.map((ben, bIdx) => (
                    <div key={bIdx} className="flex items-center gap-2 text-sm text-[#475569]">
                      <CheckCircle2 className="w-4 h-4 text-[#F97316] shrink-0" />
                      <span>{ben}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. Important Notes & Disclaimers */}
      {explanation.importantNotes && explanation.importantNotes.length > 0 && (
        <section id="important-notes" className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-[#FFF7ED] text-[#F97316]">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <h2 className="text-2xl sm:text-2xl font-black text-[#0F172A] tracking-tight">
              Important Notes & Limitations
            </h2>
          </div>
          <div className="bg-[#FFF7ED] rounded-2xl p-6 sm:p-8 border border-[#FDBA74] shadow-xs">
            <ul className="space-y-4">
              {explanation.importantNotes.map((note, i) => (
                <li key={i} className="flex items-start gap-3 text-[15px] text-[#475569] leading-relaxed">
                  <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#F97316] shrink-0" />
                  <span>{note}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* 8. FAQ Section */}
      {explanation.faqs && explanation.faqs.length > 0 && (
        <section id="faq" className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-[#FFF7ED] text-[#F97316]">
              <HelpCircle className="w-6 h-6" />
            </div>
            <h2 className="text-2xl sm:text-2xl font-black text-[#0F172A] tracking-tight">
              {t('faq.title', 'Frequently Asked Questions')}
            </h2>
          </div>

          <div className="bg-[#FFFFFF] rounded-2xl border border-[#E2E8F0] shadow-xs overflow-hidden">
            <div className="divide-y divide-[#E2E8F0]">
              {explanation.faqs.map((faq, fIdx) => {
                const isExpanded = expandedFaqIndex === fIdx;
                return (
                  <div key={fIdx} className="bg-[#FFFFFF]">
                    <button
                      type="button"
                      onClick={() => setExpandedFaqIndex(isExpanded ? null : fIdx)}
                      className="w-full flex items-center justify-between text-left p-6 sm:px-8 sm:py-6 gap-6 group cursor-pointer transition-colors hover:bg-[#F8FAFC]"
                    >
                      <span className="text-base sm:text-lg font-bold text-[#0F172A] group-hover:text-[#F97316] transition-colors leading-snug">
                        {faq.question}
                      </span>
                      <span className={`p-2 rounded-xl transition-all shrink-0 ${
                        isExpanded ? 'bg-[#F97316] text-[#FFFFFF] rotate-180' : 'bg-[#F8FAFC] text-[#64748B]'
                      }`}>
                        <ChevronDown className="w-5 h-5" />
                      </span>
                    </button>

                    {isExpanded && (
                      <div className="px-6 pb-6 sm:px-8 sm:pb-8 text-[15px] sm:text-base text-[#475569] leading-relaxed pr-12 animate-fadeIn">
                        <div className="pt-2 border-t border-[#E2E8F0] mt-1">
                          {faq.answer}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}
    </section>
  );
};
