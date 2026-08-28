import React, { useState, useMemo } from 'react';
import { formatCurrency, formatNumber, copyToClipboard } from '../../utils/formatters';
import { DollarSign, TrendingUp, Sparkles, Copy, Check, Bookmark, Calendar, Percent } from 'lucide-react';

interface InvestmentCalculatorProps {
  currencySymbol?: string;
  onSaveCalculation?: (summary: string, inputs: any, results: any) => void;
}

export const InvestmentCalculator: React.FC<InvestmentCalculatorProps> = ({
  currencySymbol = '$',
  onSaveCalculation
}) => {
  const [initialInvestment, setInitialInvestment] = useState<number | ''>(20000);
  const [monthlyContribution, setMonthlyContribution] = useState<number | ''>(500);
  const [years, setYears] = useState<number | ''>(15);
  const [annualReturn, setAnnualReturn] = useState<number | ''>(8.5);
  const [adjustInflation, setAdjustInflation] = useState<boolean>(false);
  const [inflationRate, setInflationRate] = useState<number | ''>(2.5);
  const [copied, setCopied] = useState<boolean>(false);
  const [saved, setSaved] = useState<boolean>(false);

  const numInitialInvestment = typeof initialInvestment === 'number' ? initialInvestment : 0;
  const numMonthlyContribution = typeof monthlyContribution === 'number' ? monthlyContribution : 0;
  const numYears = typeof years === 'number' ? years : 0;
  const numAnnualReturn = typeof annualReturn === 'number' ? annualReturn : 0;
  const numInflationRate = typeof inflationRate === 'number' ? inflationRate : 0;

  const isInputEmpty = initialInvestment === '' || monthlyContribution === '' || years === '' || annualReturn === '';

  const BENCHMARKS = [
    { label: 'S&P 500 Historical', rate: 10.0 },
    { label: 'Conservative (60/40)', rate: 7.0 },
    { label: 'High Yield Bonds', rate: 5.5 },
    { label: 'Tech Growth (QQQ)', rate: 13.0 }
  ];

  const calculations = useMemo(() => {
    if (isInputEmpty || (numInitialInvestment <= 0 && numMonthlyContribution <= 0) || numYears <= 0) return null;

    const P = Math.max(0, numInitialInvestment);
    const PMT = Math.max(0, numMonthlyContribution);
    const t = Math.max(1, numYears);
    const nominalR = Math.max(0, numAnnualReturn) / 100;
    const rMonthly = nominalR / 12;
    const totalMonths = t * 12;

    let balance = P;
    let totalContributed = P;
    const history: Array<{
      year: number;
      totalContributed: number;
      nominalValue: number;
      interestEarned: number;
      realValue: number;
    }> = [];

    for (let m = 1; m <= totalMonths; m++) {
      balance = (balance + PMT) * (1 + rMonthly);
      totalContributed += PMT;

      if (m % 12 === 0) {
        const yr = m / 12;
        const inflationFactor = Math.pow(1 + numInflationRate / 100, yr);
        history.push({
          year: yr,
          totalContributed,
          nominalValue: balance,
          interestEarned: balance - totalContributed,
          realValue: balance / inflationFactor
        });
      }
    }

    const totalInterest = Math.max(0, balance - totalContributed);
    const inflationFactorFinal = Math.pow(1 + numInflationRate / 100, t);
    const realFinalValue = balance / inflationFactorFinal;

    return {
      nominalFinalValue: balance,
      realFinalValue,
      totalContributed,
      totalInterest,
      history
    };
  }, [isInputEmpty, numInitialInvestment, numMonthlyContribution, numYears, numAnnualReturn, numInflationRate]);

  const handleCopy = async () => {
    if (!calculations) return;
    const text = `Investment Forecast (${numYears} Years @ ${numAnnualReturn}%):
Initial: ${formatCurrency(numInitialInvestment, currencySymbol)}
Monthly Contribution: ${formatCurrency(numMonthlyContribution, currencySymbol)}
Total Invested: ${formatCurrency(calculations.totalContributed, currencySymbol)}
Total Interest / Gains: ${formatCurrency(calculations.totalInterest, currencySymbol)}
Future Portfolio Value: ${formatCurrency(calculations.nominalFinalValue, currencySymbol)}
${adjustInflation ? `Inflation-Adjusted Purchasing Power: ${formatCurrency(calculations.realFinalValue, currencySymbol)}` : ''}`;

    const ok = await copyToClipboard(text);
    if (ok) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleReset = () => {
    setInitialInvestment(20000);
    setMonthlyContribution(500);
    setYears(15);
    setAnnualReturn(8.5);
    setAdjustInflation(false);
    setInflationRate(2.5);
  };

  const handleSave = () => {
    if (onSaveCalculation && calculations) {
      onSaveCalculation(
        `Invest: ${formatCurrency(numInitialInvestment, currencySymbol)} + ${formatCurrency(numMonthlyContribution, currencySymbol)}/mo @ ${numAnnualReturn}% (${numYears} yrs) → ${formatCurrency(calculations.nominalFinalValue, currencySymbol)}`,
        { initialInvestment, monthlyContribution, years, annualReturn, adjustInflation, inflationRate },
        calculations
      );
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Inputs */}
        <div className="lg:col-span-6 bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-2xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-orange-600" />
              <span>Investment Settings</span>
            </h2>
            <button
              onClick={handleReset}
              className="text-xs font-semibold text-slate-600 hover:text-slate-900 px-2.5 py-1 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors"
            >
              Reset
            </button>
          </div>

          {/* Quick Benchmarks */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700">Market Rate Presets</label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {BENCHMARKS.map(bm => (
                <button
                  key={bm.label}
                  type="button"
                  onClick={() => setAnnualReturn(bm.rate)}
                  className={`p-2 text-left rounded-xl border text-xs transition-all ${
                    annualReturn === bm.rate
                      ? 'bg-orange-50 border-orange-400 text-orange-900 font-bold shadow-2xs'
                      : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <span className="block text-[10px] text-slate-500 truncate">{bm.label}</span>
                  <span className="block font-bold mt-0.5">{bm.rate}%</span>
                </button>
              ))}
            </div>
          </div>

          {/* Initial Deposit */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 flex justify-between">
              <span>Starting Capital</span>
              <span className="text-orange-600 font-mono">{formatCurrency(numInitialInvestment, currencySymbol)}</span>
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-sm">{currencySymbol}</span>
              <input
                type="number"
                min="0"
                max="5000000"
                step="1000"
                value={initialInvestment}
                onChange={(e) => setInitialInvestment(e.target.value === '' ? '' : Number(e.target.value))}
                className="w-full pl-8 pr-3 py-2 text-sm font-semibold border border-slate-200 rounded-xl bg-slate-50/50 focus:bg-white focus:ring-2 focus:ring-orange-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Monthly Contribution */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 flex justify-between">
              <span>Monthly Additional Deposit</span>
              <span className="text-orange-600 font-mono">{formatCurrency(numMonthlyContribution, currencySymbol)}/mo</span>
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-sm">{currencySymbol}</span>
              <input
                type="number"
                min="0"
                max="50000"
                step="50"
                value={monthlyContribution}
                onChange={(e) => setMonthlyContribution(e.target.value === '' ? '' : Number(e.target.value))}
                className="w-full pl-8 pr-3 py-2 text-sm font-semibold border border-slate-200 rounded-xl bg-slate-50/50 focus:bg-white focus:ring-2 focus:ring-orange-500 focus:outline-none"
              />
            </div>
            <input
              type="range"
              min="0"
              max="5000"
              step="50"
              value={monthlyContribution}
              onChange={(e) => setMonthlyContribution(e.target.value === '' ? '' : Number(e.target.value))}
              className="w-full accent-orange-600 cursor-pointer"
            />
          </div>

          {/* Investment Length */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 flex justify-between">
              <span>Time Horizon (Years)</span>
              <span className="text-orange-600 font-mono">{years} Years</span>
            </label>
            <div className="grid grid-cols-4 gap-2">
              {[5, 10, 20, 30].map(yr => (
                <button
                  key={yr}
                  type="button"
                  onClick={() => setYears(yr)}
                  className={`py-1.5 text-xs font-bold rounded-lg border transition-all ${
                    years === yr
                      ? 'bg-orange-600 text-white border-orange-600'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {yr} Yrs
                </button>
              ))}
            </div>
          </div>

          {/* Expected Return */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 flex justify-between">
              <span>Expected Annual Return (%)</span>
              <span className="text-orange-600 font-mono">{annualReturn}%</span>
            </label>
            <div className="relative">
              <input
                type="number"
                min="0.1"
                max="30"
                step="0.1"
                value={annualReturn}
                onChange={(e) => setAnnualReturn(e.target.value === '' ? '' : Number(e.target.value))}
                className="w-full pl-3 pr-8 py-2 text-sm font-semibold border border-slate-200 rounded-xl bg-slate-50/50 focus:bg-white focus:ring-2 focus:ring-orange-500 focus:outline-none"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-sm">%</span>
            </div>
          </div>

          {/* Inflation Toggle */}
          <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
            <label className="text-xs font-bold text-slate-700 flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={adjustInflation}
                onChange={(e) => setAdjustInflation(e.target.checked)}
                className="rounded text-orange-600 focus:ring-orange-500 w-4 h-4"
              />
              <span>Adjust for Inflation ({inflationRate}%/yr)</span>
            </label>
          </div>
        </div>

        {/* Right Output Results */}
        <div className="lg:col-span-6 space-y-4">
          {calculations && (
            <>
              <div className="bg-gradient-to-br from-slate-900 via-orange-950 to-slate-900 text-white rounded-2xl p-6 shadow-md relative">
                <div className="space-y-4">
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-orange-300">
                      Projected Portfolio Value
                    </span>
                    <div className="text-3xl sm:text-4xl font-black tracking-tight text-white mt-1">
                      {formatCurrency(calculations.nominalFinalValue, currencySymbol)}
                    </div>
                    {adjustInflation && (
                      <div className="text-xs font-medium text-amber-300 mt-1">
                        Today's Purchasing Power: {formatCurrency(calculations.realFinalValue, currencySymbol)}
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-3 pt-3 border-t border-orange-900/60">
                    <div className="bg-white/10 rounded-xl p-3 backdrop-blur-xs">
                      <span className="text-[10px] text-slate-300 uppercase font-bold block">Total Capital Invested</span>
                      <span className="text-base font-bold text-white font-mono">{formatCurrency(calculations.totalContributed, currencySymbol)}</span>
                    </div>
                    <div className="bg-white/10 rounded-xl p-3 backdrop-blur-xs">
                      <span className="text-[10px] text-orange-300 uppercase font-bold block">Total Investment Gains</span>
                      <span className="text-base font-bold text-orange-300 font-mono">{formatCurrency(calculations.totalInterest, currencySymbol)}</span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center gap-2 pt-2">
                    <button
                      onClick={handleCopy}
                      className="flex-1 py-2 px-3 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-bold text-white flex items-center justify-center gap-1.5 transition-colors border border-white/10"
                    >
                      {copied ? <Check className="w-3.5 h-3.5 text-orange-400" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copied ? 'Copied' : 'Copy Summary'}</span>
                    </button>
                    {onSaveCalculation && (
                      <button
                        onClick={handleSave}
                        className="py-2 px-3 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-bold text-white flex items-center justify-center gap-1.5 transition-colors border border-white/10"
                      >
                        <Bookmark className="w-3.5 h-3.5" />
                        <span>{saved ? 'Saved' : 'Save'}</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Breakdown percentage bar */}
              <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-2xs space-y-3">
                <div className="flex justify-between text-xs font-bold text-slate-700">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-slate-700 inline-block"></span>
                    Principal Contributions ({Math.round((calculations.totalContributed / calculations.nominalFinalValue) * 100 || 0)}%)
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-orange-500 inline-block"></span>
                    Compound Returns ({Math.round((calculations.totalInterest / calculations.nominalFinalValue) * 100 || 0)}%)
                  </span>
                </div>
                <div className="w-full h-3 rounded-full bg-slate-100 overflow-hidden flex">
                  <div 
                    className="bg-slate-700 h-full"
                    style={{ width: `${(calculations.totalContributed / calculations.nominalFinalValue) * 100}%` }}
                  />
                  <div 
                    className="bg-orange-500 h-full"
                    style={{ width: `${(calculations.totalInterest / calculations.nominalFinalValue) * 100}%` }}
                  />
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
