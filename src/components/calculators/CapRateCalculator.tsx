import React, { useState, useMemo } from 'react';
import { Building2, RotateCcw, Copy, Check } from 'lucide-react';
import { copyToClipboard, formatCurrency } from '../../utils/formatters';
import { DecimalInput } from '../shared/DecimalInput';

interface CapRateCalculatorProps {
  currencySymbol?: string;
  onSave?: (summary: string, inputs: any, results: any) => void;
}

export const CapRateCalculator: React.FC<CapRateCalculatorProps> = ({
  currencySymbol = '$',
  onSave
}) => {
  const [propertyValue, setPropertyValue] = useState<number | ''>(450000);
  const [annualGrossRent, setAnnualGrossRent] = useState<number | ''>(42000);
  const [vacancyRate, setVacancyRate] = useState<number | ''>(5);
  const [annualOpEx, setAnnualOpEx] = useState<number | ''>(12600);
  const [copied, setCopied] = useState(false);

  const handleReset = () => {
    setPropertyValue(450000);
    setAnnualGrossRent(42000);
    setVacancyRate(5);
    setAnnualOpEx(12600);
  };

  const results = useMemo(() => {
    if (propertyValue === '' || annualGrossRent === '' || vacancyRate === '' || annualOpEx === '') {
      return null;
    }
    const price = typeof propertyValue === 'number' ? propertyValue : 0;
    const grossRent = typeof annualGrossRent === 'number' ? annualGrossRent : 0;
    const vacPct = typeof vacancyRate === 'number' ? Math.min(100, Math.max(0, vacancyRate)) : 0;
    const opEx = typeof annualOpEx === 'number' ? Math.max(0, annualOpEx) : 0;

    if (price <= 0 || grossRent < 0) return null;

    const vacancyLoss = grossRent * (vacPct / 100);
    const effectiveGrossIncome = grossRent - vacancyLoss;
    const annualNoi = effectiveGrossIncome - opEx;
    const capRate = (annualNoi / price) * 100;
    const opExRatio = effectiveGrossIncome > 0 ? (opEx / effectiveGrossIncome) * 100 : 0;

    return {
      vacancyLoss,
      effectiveGrossIncome,
      annualNoi,
      capRate,
      opExRatio
    };
  }, [propertyValue, annualGrossRent, vacancyRate, annualOpEx]);

  const handleCopy = async () => {
    if (!results) return;
    const text = `Capitalization Rate Analysis:
• Property Price / Value: ${formatCurrency(Number(propertyValue), currencySymbol)}
• Effective Gross Income: ${formatCurrency(results.effectiveGrossIncome, currencySymbol)}/yr
• Annual Operating Expenses: ${formatCurrency(Number(annualOpEx), currencySymbol)}/yr
• Annual Net Operating Income (NOI): ${formatCurrency(results.annualNoi, currencySymbol)}/yr
• Capitalization Rate (Cap Rate): ${results.capRate.toFixed(2)}%`;
    const ok = await copyToClipboard(text);
    if (ok) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-end pb-3 border-b border-slate-100">
        <button
          type="button"
          onClick={handleReset}
          className="text-xs font-semibold text-slate-500 hover:text-slate-800 flex items-center gap-1 cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" /> Reset
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-5 bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 space-y-4">
          <h4 className="text-xs font-bold uppercase text-slate-700 tracking-wider flex items-center gap-1.5">
            <Building2 className="w-4 h-4 text-orange-500" />
            <span>Property & Income Inputs</span>
          </h4>

          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">
              Property Price / Market Value ({currencySymbol})
            </label>
            <DecimalInput
              value={propertyValue}
              onValueChange={setPropertyValue}
              className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm font-bold text-slate-900 focus:outline-none focus:border-orange-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">
              Annual Gross Rental Income ({currencySymbol})
            </label>
            <DecimalInput
              value={annualGrossRent}
              onValueChange={setAnnualGrossRent}
              className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm font-bold text-slate-900 focus:outline-none focus:border-orange-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Vacancy Allowance (%)</label>
              <DecimalInput
                value={vacancyRate}
                onValueChange={setVacancyRate}
                className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm font-bold text-slate-900 focus:outline-none focus:border-orange-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Annual OpEx ({currencySymbol})</label>
              <DecimalInput
                value={annualOpEx}
                onValueChange={setAnnualOpEx}
                className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm font-bold text-slate-900 focus:outline-none focus:border-orange-500"
              />
            </div>
          </div>
          <p className="text-[11px] text-slate-500">
            Operating Expenses (OpEx) exclude mortgage principal/interest and income taxes. Include property taxes, insurance, HOA, repairs, and management.
          </p>
        </div>

        <div className="lg:col-span-7">
          {results ? (
            <div className="bg-gradient-to-br from-orange-50 to-amber-50 p-6 rounded-2xl border border-orange-200 space-y-5">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-orange-800 block">
                    Capitalization Rate (Cap Rate)
                  </span>
                  <div className="text-3xl sm:text-4xl font-black text-slate-900 font-mono-numbers mt-1">
                    {results.capRate.toFixed(2)}%
                  </div>
                  <p className="text-xs text-slate-600 mt-1">
                    Unlevered annual yield: Annual NOI ÷ Property Value
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleCopy}
                    className="px-3 py-1.5 rounded-lg bg-white border border-orange-200 text-xs font-bold text-slate-700 hover:text-orange-600 flex items-center gap-1 cursor-pointer"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? 'Copied' : 'Copy'}</span>
                  </button>
                  {onSave && (
                    <button
                      type="button"
                      onClick={() =>
                        onSave(
                          `Cap Rate: ${results.capRate.toFixed(2)}% (NOI ${formatCurrency(results.annualNoi, currencySymbol)})`,
                          { propertyValue, annualGrossRent, vacancyRate, annualOpEx },
                          results
                        )
                      }
                      className="px-3 py-1.5 rounded-lg bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold cursor-pointer"
                    >
                      Save
                    </button>
                  )}
                </div>
              </div>

              <div className="bg-white rounded-xl border border-orange-100 p-4 space-y-2 text-xs sm:text-sm text-slate-700">
                <div className="flex justify-between">
                  <span>Effective Gross Income (After Vacancy):</span>
                  <span className="font-mono-numbers font-semibold">{formatCurrency(results.effectiveGrossIncome, currencySymbol)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Operating Expense Ratio:</span>
                  <span className="font-mono-numbers font-semibold">{results.opExRatio.toFixed(1)}%</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-slate-100 font-bold text-slate-900">
                  <span>Net Operating Income (NOI):</span>
                  <span className="font-mono-numbers text-orange-700">{formatCurrency(results.annualNoi, currencySymbol)}/yr</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8 text-center text-slate-500 text-sm">
              Enter a positive property value and income/expense figures to compute Cap Rate.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
