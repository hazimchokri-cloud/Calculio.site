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
  const [activeTab, setActiveTab] = useState<'how-it-works' | 'formula' | 'examples' | 'use-cases'>('how-it-works');
  const [expandedFaqIndex, setExpandedFaqIndex] = useState<number | null>(0);

  return (
    <section 
      id={`explanation-section-${calculator.id}`} 
      aria-label="Calculator Explanation, Formula, and Use Cases"
      className="space-y-8"
    >
      {/* Section Header */}
      <div className="border-b border-[#E2E8F0] pb-4">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#F97316] mb-1">
          <BookOpen className="w-4 h-4" />
          <span>{t('calcView.guideTitle', 'Comprehensive Guide & Documentation')}</span>
        </div>
        <h2 className="text-2xl sm:text-[28px] font-black text-[#0F172A] tracking-tight">
          {t('calcView.everythingAbout', 'Everything You Need to Know About the')} {localizedCalc.name}
        </h2>
        <p className="text-sm sm:text-base text-[#475569] mt-1 max-w-3xl leading-relaxed">
          {t('calcView.guideDescription', 'Learn how the mathematical model works, examine the underlying formulas and variables, review step-by-step example calculations, and discover real-world applications.')}
        </p>
      </div>

      {/* Interactive Tab Navigation */}
      <div className="flex flex-wrap gap-2 p-1.5 bg-[#FFFFFF] rounded-2xl border border-[#E2E8F0] w-fit shadow-xs">
        <button
          type="button"
          onClick={() => setActiveTab('how-it-works')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold transition-all cursor-pointer ${
            activeTab === 'how-it-works' 
              ? 'bg-[#F97316] text-[#FFFFFF] shadow-xs' 
              : 'text-[#64748B] hover:text-[#0F172A] hover:bg-[#FFF7ED]'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>{t('calcView.tabHowItWorks', 'How It Works')}</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('formula')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold transition-all cursor-pointer ${
            activeTab === 'formula' 
              ? 'bg-[#F97316] text-[#FFFFFF] shadow-xs' 
              : 'text-[#64748B] hover:text-[#0F172A] hover:bg-[#FFF7ED]'
          }`}
        >
          <Calculator className="w-4 h-4" />
          <span>{t('calcView.tabFormula', 'Formula & Variables')}</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('examples')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold transition-all cursor-pointer ${
            activeTab === 'examples' 
              ? 'bg-[#F97316] text-[#FFFFFF] shadow-xs' 
              : 'text-[#64748B] hover:text-[#0F172A] hover:bg-[#FFF7ED]'
          }`}
        >
          <Lightbulb className="w-4 h-4" />
          <span>{t('calcView.tabExamples', 'Example Calculations')}</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('use-cases')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold transition-all cursor-pointer ${
            activeTab === 'use-cases' 
              ? 'bg-[#F97316] text-[#FFFFFF] shadow-xs' 
              : 'text-[#64748B] hover:text-[#0F172A] hover:bg-[#FFF7ED]'
          }`}
        >
          <Briefcase className="w-4 h-4" />
          <span>{t('calcView.tabUseCases', 'Practical Use Cases')}</span>
        </button>
      </div>

      {/* Tab 1: How the Calculator Works */}
      {activeTab === 'how-it-works' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-[#FFFFFF] rounded-2xl p-6 sm:p-7 border border-[#E2E8F0] shadow-xs space-y-5">
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-[#0F172A] flex items-center gap-2">
                <Layers className="w-5 h-5 text-[#F97316]" />
                <span>{t('calcView.tabHowItWorks', 'How')} {localizedCalc.name} {t('common.works', 'Works')}</span>
              </h3>
              <p className="text-sm sm:text-[15px] text-[#475569] leading-relaxed mt-2">
                {explanation.howItWorks.summary}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              {explanation.howItWorks.steps.map((step, idx) => (
                <div 
                  key={idx} 
                  className="p-4 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] space-y-1.5"
                >
                  <div className="text-sm font-bold text-[#0F172A] flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-[#FFF7ED] text-[#F97316] border border-[#FDBA74] flex items-center justify-center text-xs font-mono font-bold">
                      {idx + 1}
                    </span>
                    <span>{step.title.replace(/^\d+\.\s*/, '')}</span>
                  </div>
                  <p className="text-sm text-[#475569] leading-relaxed pl-7">
                    {step.detail}
                  </p>
                </div>
              ))}
            </div>

            {explanation.howItWorks.keyAssumptions && explanation.howItWorks.keyAssumptions.length > 0 && (
              <div className="p-4.5 rounded-xl bg-[#FFF7ED] border border-[#FDBA74] space-y-2">
                <div className="flex items-center gap-2 text-sm font-bold text-[#9A3412]">
                  <ShieldAlert className="w-4 h-4 text-[#F97316]" />
                  <span>{t('calcView.keyAssumptions', 'Key Assumptions & Boundary Conditions')}</span>
                </div>
                <ul className="space-y-1 pl-6 list-disc text-sm text-[#475569] leading-relaxed">
                  {explanation.howItWorks.keyAssumptions.map((asm, aIdx) => (
                    <li key={aIdx}>{asm}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Tab 2: Formula Used & Variables */}
      {activeTab === 'formula' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-[#FFFFFF] rounded-2xl p-6 sm:p-7 border border-[#E2E8F0] shadow-xs space-y-6">
            <div className="space-y-2">
              <h3 className="text-lg sm:text-xl font-bold text-[#0F172A] flex items-center gap-2">
                <Calculator className="w-5 h-5 text-[#F97316]" />
                <span>{explanation.formula.title}</span>
              </h3>
              <p className="text-sm sm:text-[15px] text-[#475569] leading-relaxed">
                {explanation.formula.explanation}
              </p>
            </div>

            {/* Formula Equation Display Box */}
            <div className="p-5 rounded-2xl bg-[#F8FAFC] text-[#0F172A] shadow-inner space-y-2 border border-[#E2E8F0]">
              <span className="text-xs font-bold uppercase tracking-widest text-[#F97316]">
                {t('calcView.equation', 'Mathematical Equation')}
              </span>
              <div className="font-mono text-base sm:text-lg md:text-xl text-[#9A3412] font-bold overflow-x-auto py-1">
                {explanation.formula.equation}
              </div>
            </div>

            {/* Variable Definitions Table */}
            <div className="space-y-3">
              <h4 className="text-sm font-bold uppercase tracking-wider text-[#0F172A]">
                {t('calcView.variableDefinitions', 'Variable Definitions & Units')}
              </h4>
              <div className="overflow-x-auto rounded-xl border border-[#E2E8F0]">
                <table className="w-full text-left text-sm">
                  <thead className="bg-[#F8FAFC] border-b border-[#E2E8F0] text-[#0F172A] font-bold">
                    <tr>
                      <th className="py-3 px-4">{t('calcView.symbol', 'Symbol')}</th>
                      <th className="py-3 px-4">{t('calcView.variableName', 'Variable Name')}</th>
                      <th className="py-3 px-4">{t('calcView.description', 'Description')}</th>
                      <th className="py-3 px-4">{t('calcView.standardUnit', 'Standard Unit')}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E2E8F0] text-[#475569]">
                    {explanation.formula.variables.map((v, vIdx) => (
                      <tr key={vIdx} className="hover:bg-[#FFF7ED] transition-colors">
                        <td className="py-3 px-4 font-mono font-bold text-[#9A3412] bg-[#FFF7ED]/50">
                          {v.symbol}
                        </td>
                        <td className="py-3 px-4 font-semibold text-[#0F172A]">
                          {v.name}
                        </td>
                        <td className="py-3 px-4 text-[#475569]">
                          {v.description}
                        </td>
                        <td className="py-3 px-4 font-mono text-[#64748B]">
                          {v.unit || '—'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Example Calculations */}
      {activeTab === 'examples' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-[#FFFFFF] rounded-2xl p-6 sm:p-7 border border-[#E2E8F0] shadow-xs space-y-6">
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-[#0F172A] flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-[#F97316]" />
                <span>{t('calcView.exampleCalculation', 'Step-by-Step Example Calculation')}</span>
              </h3>
              <p className="text-sm sm:text-[15px] text-[#475569] leading-relaxed mt-1">
                {t('calcView.exampleWalkthrough', 'Walk through a concrete problem showing exactly how inputs translate into the final calculated solution.')}
              </p>
            </div>

            {explanation.examples.map((ex, exIdx) => (
              <div 
                key={exIdx} 
                className="rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] p-5 sm:p-6 space-y-4"
              >
                <div className="border-b border-[#E2E8F0] pb-3">
                  <h4 className="text-base font-bold text-[#0F172A]">
                    {ex.title}
                  </h4>
                  <p className="text-sm text-[#475569] mt-0.5">
                    {ex.scenario}
                  </p>
                </div>

                {/* Input Parameters Box */}
                <div className="space-y-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#0F172A] block">
                    {t('calcView.givenInputs', 'Given Input Parameters:')}
                  </span>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                    {Object.entries(ex.inputs).map(([k, val], iIdx) => (
                      <div key={iIdx} className="bg-[#FFFFFF] p-3 rounded-xl border border-[#E2E8F0] shadow-2xs">
                        <span className="text-xs text-[#64748B] font-medium block truncate">{k}</span>
                        <span className="text-sm font-bold text-[#0F172A] font-mono">{String(val)}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Step by Step Execution */}
                <div className="space-y-2 pt-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#0F172A] block">
                    {t('calcView.calculationSteps', 'Calculation Steps:')}
                  </span>
                  <div className="space-y-1.5">
                    {ex.steps.map((st, sIdx) => (
                      <div key={sIdx} className="flex items-start gap-2 text-sm text-[#475569] bg-[#FFFFFF] p-3 rounded-xl border border-[#E2E8F0]">
                        <CheckCircle2 className="w-4 h-4 text-[#F97316] shrink-0 mt-0.5" />
                        <span>{st}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Final Solution Result Box */}
                <div className="p-4.5 rounded-xl bg-[#FFF7ED] border border-[#FDBA74] space-y-1">
                  <span className="text-xs font-extrabold uppercase tracking-widest text-[#9A3412]">
                    {t('calcView.finalResult', 'Final Result Solution')}
                  </span>
                  <div className="text-base font-bold text-[#9A3412] font-mono">
                    {ex.result}
                  </div>
                  {ex.takeaway && (
                    <p className="text-sm text-[#475569] pt-1">
                      💡 <strong className="text-[#0F172A]">{t('common.keyTakeaways', 'Key Takeaway:')}</strong> {ex.takeaway}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 4: Practical Use Cases */}
      {activeTab === 'use-cases' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-[#FFFFFF] rounded-2xl p-6 sm:p-7 border border-[#E2E8F0] shadow-xs space-y-6">
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-[#0F172A] flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-[#F97316]" />
                <span>{t('calcView.practicalApplications', 'Real-World Practical Applications')}</span>
              </h3>
              <p className="text-sm sm:text-[15px] text-[#475569] leading-relaxed mt-1">
                {t('calcView.practicalDescription', 'Explore how everyday consumers, professionals, and students utilize this calculator to solve critical real-world challenges.')}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {explanation.useCases.map((uc, uIdx) => (
                <div 
                  key={uIdx}
                  className="p-5 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] space-y-3"
                >
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-[#9A3412] bg-[#FFF7ED] px-2 py-0.5 rounded-md border border-[#FDBA74]">
                      {uc.targetAudience}
                    </span>
                    <h4 className="text-base font-bold text-[#0F172A] mt-2">
                      {uc.title}
                    </h4>
                    <p className="text-sm text-[#475569] leading-relaxed mt-1">
                      {uc.description}
                    </p>
                  </div>

                  <div className="space-y-1.5 pt-2 border-t border-[#E2E8F0]">
                    <span className="text-xs font-bold text-[#0F172A] uppercase tracking-wider">
                      {t('calcView.keyBenefits', 'Key Practical Benefits:')}
                    </span>
                    {uc.benefits.map((ben, bIdx) => (
                      <div key={bIdx} className="flex items-center gap-1.5 text-sm text-[#475569]">
                        <CheckCircle2 className="w-4 h-4 text-[#F97316] shrink-0" />
                        <span>{ben}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* In-Content Ad Placement within Explanation Section Flow */}
      <AdSlot type="in-content" />

      {/* Frequently Asked Questions Accordion */}
      {explanation.faqs && explanation.faqs.length > 0 && (
        <div className="bg-[#FFFFFF] rounded-2xl p-6 sm:p-7 border border-[#E2E8F0] shadow-xs space-y-4">
          <div className="flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-[#F97316]" />
            <h3 className="text-lg font-bold text-[#0F172A]">
              {t('faq.title', 'Frequently Asked Questions')}
            </h3>
          </div>

          <div className="divide-y divide-[#E2E8F0]">
            {explanation.faqs.map((faq, fIdx) => {
              const isExpanded = expandedFaqIndex === fIdx;
              return (
                <div key={fIdx} className="py-4 first:pt-0 last:pb-0">
                  <button
                    type="button"
                    onClick={() => setExpandedFaqIndex(isExpanded ? null : fIdx)}
                    className="w-full flex items-center justify-between text-left gap-4 group cursor-pointer"
                  >
                    <span className="text-base sm:text-[17px] font-bold text-[#0F172A] group-hover:text-[#F97316] transition-colors">
                      {faq.question}
                    </span>
                    <span className="p-1.5 rounded-lg bg-[#F8FAFC] text-[#64748B] group-hover:bg-[#FFF7ED] group-hover:text-[#F97316] transition-colors shrink-0">
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </span>
                  </button>

                  {isExpanded && (
                    <div className="mt-2.5 text-sm sm:text-[15px] text-[#475569] leading-relaxed pr-6 animate-fadeIn">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </section>
  );
};
