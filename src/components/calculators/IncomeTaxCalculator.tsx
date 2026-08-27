import React, { useState, useMemo } from 'react';
import { Receipt, DollarSign, Percent, RotateCcw, Copy, Check, Info } from 'lucide-react';
import { copyToClipboard } from '../../utils/formatters';

interface IncomeTaxCalculatorProps {
  currencySymbol?: string;
  onSave?: (summary: string, inputs: any, results: any) => void;
}

export const IncomeTaxCalculator: React.FC<IncomeTaxCalculatorProps> = ({
  currencySymbol = '$',
  onSave
}) => {
  const [grossAnnualIncome, setGrossAnnualIncome] = useState<number | ''>(85000);
  const [filingStatus, setFilingStatus] = useState<'single' | 'married' | 'head'>('single');
  const [preTaxDeductions, setPreTaxDeductions] = useState<number | ''>(6000); // 401k, HSA, health insurance
  const [stateTaxRate, setStateTaxRate] = useState<number | ''>(5); // 5% state tax estimate

  const [copied, setCopied] = useState(false);

  // 2026 Estimated Federal Tax Brackets (Standard brackets)
  const results = useMemo(() => {
    // 2026 estimated standard deduction
    let standardDeduction = 15000;
    if (filingStatus === 'married') standardDeduction = 30000;
    if (filingStatus === 'head') standardDeduction = 22500;

    const adjustedGrossIncome = Math.max(0, grossAnnualIncome - preTaxDeductions);
    const taxableIncome = Math.max(0, adjustedGrossIncome - standardDeduction);

    // Progressive Federal Tax Brackets calculation for Single
    // 10% up to $11,925, 12% to $48,475, 22% to $103,350, 24% to $197,300, etc.
    let federalTax = 0;
    let marginalBracket = 10;

    if (filingStatus === 'single') {
      if (taxableIncome <= 11925) {
        federalTax = taxableIncome * 0.10;
        marginalBracket = 10;
      } else if (taxableIncome <= 48475) {
        federalTax = 1192.5 + (taxableIncome - 11925) * 0.12;
        marginalBracket = 12;
      } else if (taxableIncome <= 103350) {
        federalTax = 5578.5 + (taxableIncome - 48475) * 0.22;
        marginalBracket = 22;
      } else if (taxableIncome <= 197300) {
        federalTax = 17651 + (taxableIncome - 103350) * 0.24;
        marginalBracket = 24;
      } else {
        federalTax = 40199 + (taxableIncome - 197300) * 0.32;
        marginalBracket = 32;
      }
    } else {
      // Married filing jointly brackets (approx 2x)
      if (taxableIncome <= 23850) {
        federalTax = taxableIncome * 0.10;
        marginalBracket = 10;
      } else if (taxableIncome <= 96950) {
        federalTax = 2385 + (taxableIncome - 23850) * 0.12;
        marginalBracket = 12;
      } else if (taxableIncome <= 206700) {
        federalTax = 11157 + (taxableIncome - 96950) * 0.22;
        marginalBracket = 22;
      } else {
        federalTax = 35302 + (taxableIncome - 206700) * 0.24;
        marginalBracket = 24;
      }
    }

    // FICA (Social Security 6.2% up to $168k + Medicare 1.45%)
    const socialSecurityTax = Math.min(grossAnnualIncome, 168600) * 0.062;
    const medicareTax = grossAnnualIncome * 0.0145;
    const ficaTax = socialSecurityTax + medicareTax;

    // State Tax
    const estimatedStateTax = taxableIncome * (stateTaxRate / 100);

    const totalTaxLiability = federalTax + ficaTax + estimatedStateTax;
    const netTakeHomePay = grossAnnualIncome - totalTaxLiability - preTaxDeductions;
    const monthlyTakeHome = netTakeHomePay / 12;
    const biweeklyTakeHome = netTakeHomePay / 26;

    const effectiveTaxRate = grossAnnualIncome > 0 ? (totalTaxLiability / grossAnnualIncome) * 100 : 0;

    return {
      standardDeduction,
      taxableIncome: Math.round(taxableIncome),
      federalTax: Math.round(federalTax),
      ficaTax: Math.round(ficaTax),
      stateTax: Math.round(estimatedStateTax),
      totalTaxLiability: Math.round(totalTaxLiability),
      netTakeHomePay: Math.round(netTakeHomePay),
      monthlyTakeHome: Math.round(monthlyTakeHome),
      biweeklyTakeHome: Math.round(biweeklyTakeHome),
      effectiveTaxRate: Math.round(effectiveTaxRate * 10) / 10,
      marginalBracket
    };
  }, [grossAnnualIncome, filingStatus, preTaxDeductions, stateTaxRate]);

  const handleCopy = () => {
    const text = `Income Tax & Take-Home Calculation:
Gross Income: ${currencySymbol}${grossAnnualIncome.toLocaleString()} | Filing: ${filingStatus.toUpperCase()}
Total Taxes: ${currencySymbol}${results.totalTaxLiability.toLocaleString()} (${results.effectiveTaxRate}% Effective Rate)
Federal: ${currencySymbol}${results.federalTax.toLocaleString()} | FICA: ${currencySymbol}${results.ficaTax.toLocaleString()} | State: ${currencySymbol}${results.stateTax.toLocaleString()}
Net Take-Home Pay: ${currencySymbol}${results.netTakeHomePay.toLocaleString()}/yr (${currencySymbol}${results.monthlyTakeHome.toLocaleString()}/mo)`;
    copyToClipboard(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Form Column */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5 border-b border-slate-100 pb-3">
            <Receipt className="w-4 h-4 text-teal-600" />
            <span>Income & Filing Information</span>
          </h4>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Gross Annual Salary / Income</label>
            <div className="relative">
              <span className="absolute left-3 top-2.5 text-xs font-bold text-slate-400">{currencySymbol}</span>
              <input
                type="number"
                min="0"
                step="1000"
                value={grossAnnualIncome}
                onChange={(e) => setGrossAnnualIncome(Number(e.target.value) || 0)}
                className="w-full pl-7 pr-3 py-2 border border-slate-300 rounded-xl text-xs font-bold"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Filing Status</label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setFilingStatus('single')}
                className={`py-2 rounded-xl text-xs font-bold border transition-all ${
                  filingStatus === 'single' ? 'bg-teal-600 text-white border-teal-600 shadow-2xs' : 'bg-slate-50 border-slate-200 text-slate-700'
                }`}
              >
                Single
              </button>
              <button
                type="button"
                onClick={() => setFilingStatus('married')}
                className={`py-2 rounded-xl text-xs font-bold border transition-all ${
                  filingStatus === 'married' ? 'bg-teal-600 text-white border-teal-600 shadow-2xs' : 'bg-slate-50 border-slate-200 text-slate-700'
                }`}
              >
                Married Joint
              </button>
              <button
                type="button"
                onClick={() => setFilingStatus('head')}
                className={`py-2 rounded-xl text-xs font-bold border transition-all ${
                  filingStatus === 'head' ? 'bg-teal-600 text-white border-teal-600 shadow-2xs' : 'bg-slate-50 border-slate-200 text-slate-700'
                }`}
              >
                Head of House
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Pre-Tax Deductions (401k, HSA)</label>
              <input
                type="number"
                min="0"
                step="500"
                value={preTaxDeductions}
                onChange={(e) => setPreTaxDeductions(Number(e.target.value) || 0)}
                className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs font-bold"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Estimated State Tax Rate (%)</label>
              <input
                type="number"
                min="0"
                max="15"
                step="0.5"
                value={stateTaxRate}
                onChange={(e) => setStateTaxRate(Number(e.target.value) || 0)}
                className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs font-bold"
              />
            </div>
          </div>
        </div>

        {/* Results Card */}
        <div className="bg-gradient-to-br from-teal-50 to-orange-50/60 p-6 rounded-2xl border border-teal-200 flex flex-col justify-between space-y-4">
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-teal-200">
              <span className="text-xs font-bold uppercase tracking-wider text-teal-900">Net Take-Home Pay</span>
              <span className="text-xs font-extrabold text-teal-800">
                Effective Tax: {results.effectiveTaxRate}%
              </span>
            </div>

            <div className="p-4 bg-white rounded-xl border border-teal-200 shadow-2xs text-center space-y-1">
              <span className="text-[11px] font-bold text-slate-500 uppercase">Estimated Annual Take-Home</span>
              <div className="text-3xl font-black text-slate-900 font-mono-numbers">
                {currencySymbol}{results.netTakeHomePay.toLocaleString()}
              </div>
              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100 mt-2 text-xs">
                <div>
                  <span className="text-slate-500 block text-[10px]">Monthly</span>
                  <span className="font-bold text-orange-700">{currencySymbol}{results.monthlyTakeHome.toLocaleString()}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px]">Bi-Weekly</span>
                  <span className="font-bold text-orange-700">{currencySymbol}{results.biweeklyTakeHome.toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Tax Breakdown List */}
            <div className="bg-white p-3.5 rounded-xl border border-teal-100 space-y-2 text-xs text-slate-700">
              <div className="flex justify-between">
                <span>Federal Income Tax:</span>
                <span className="font-bold text-slate-900">{currencySymbol}{results.federalTax.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>FICA (Social Security & Medicare):</span>
                <span className="font-bold text-slate-900">{currencySymbol}{results.ficaTax.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Estimated State Tax:</span>
                <span className="font-bold text-slate-900">{currencySymbol}{results.stateTax.toLocaleString()}</span>
              </div>
              <div className="flex justify-between pt-1 border-t border-slate-100 font-extrabold text-teal-950">
                <span>Total Taxes Paid:</span>
                <span>{currencySymbol}{results.totalTaxLiability.toLocaleString()}</span>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-teal-200">
            <button
              type="button"
              onClick={handleCopy}
              className="w-full py-2 px-3 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-xs font-bold text-slate-700 flex items-center justify-center gap-1.5 transition-all shadow-2xs"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-orange-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied Tax Breakdown' : 'Copy Breakdown'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
