import React, { useState, useMemo } from 'react';
import { formatCurrency, formatNumber, copyToClipboard } from '../../utils/formatters';
import { PiggyBank, Target, Calendar, DollarSign, Copy, Check, Bookmark, Percent } from 'lucide-react';

interface SavingsCalculatorProps {
  currencySymbol?: string;
  onSaveCalculation?: (summary: string, inputs: any, results: any) => void;
}

export const SavingsCalculator: React.FC<SavingsCalculatorProps> = ({
  currencySymbol = '$',
  onSaveCalculation
}) => {
  const [mode, setMode] = useState<'findMonthly' | 'findFuture'>('findMonthly');
  const [savingsGoal, setSavingsGoal] = useState<number | ''>(50000);
  const [initialSavings, setInitialSavings] = useState<number | ''>(5000);
  const [monthlyContribution, setMonthlyContribution] = useState<number | ''>(400);
  const [timeYears, setTimeYears] = useState<number | ''>(5);
  const [apyRate, setApyRate] = useState<number | ''>(4.5); // HYSA typical APY
  const [copied, setCopied] = useState<boolean>(false);
  const [saved, setSaved] = useState<boolean>(false);

  const numSavingsGoal = typeof savingsGoal === 'number' ? savingsGoal : 0;
  const numInitialSavings = typeof initialSavings === 'number' ? initialSavings : 0;
  const numMonthlyContribution = typeof monthlyContribution === 'number' ? monthlyContribution : 0;
  const numTimeYears = typeof timeYears === 'number' ? timeYears : 0;
  const numApyRate = typeof apyRate === 'number' ? apyRate : 0;

  const isInputEmpty = (mode === 'findMonthly' && savingsGoal === '') || (mode === 'findFuture' && monthlyContribution === '') || timeYears === '';

  const calculations = useMemo(() => {
    if (isInputEmpty || numTimeYears <= 0) return null;
    const P = Math.max(0, numInitialSavings);
    const r = Math.max(0, numApyRate) / 100 / 12;
    const n = Math.max(1, numTimeYears * 12);

    if (mode === 'findMonthly') {
      const target = Math.max(P, numSavingsGoal);
      // FV = P * (1 + r)^n + PMT * [((1 + r)^n - 1) / r]
      // PMT = [FV - P * (1 + r)^n] / [((1 + r)^n - 1) / r]
      let neededMonthly = 0;
      const futureValueOfInitial = P * Math.pow(1 + r, n);
      const remainingTarget = Math.max(0, target - futureValueOfInitial);

      if (r === 0) {
        neededMonthly = remainingTarget / n;
      } else {
        const factor = (Math.pow(1 + r, n) - 1) / r;
        neededMonthly = remainingTarget / factor;
      }

      const totalContributed = P + neededMonthly * n;
      const totalInterestEarned = Math.max(0, target - totalContributed);

      return {
        neededMonthly,
        totalTarget: target,
        totalContributed,
        totalInterestEarned,
        months: n
      };
    } else {
      // Find future value given monthly contribution
      const PMT = Math.max(0, numMonthlyContribution);
      let futureVal = 0;
      if (r === 0) {
        futureVal = P + PMT * n;
      } else {
        futureVal = P * Math.pow(1 + r, n) + PMT * ((Math.pow(1 + r, n) - 1) / r);
      }
      const totalContributed = P + PMT * n;
      const totalInterestEarned = Math.max(0, futureVal - totalContributed);

      return {
        neededMonthly: PMT,
        totalTarget: futureVal,
        totalContributed,
        totalInterestEarned,
        months: n
      };
    }
  }, [mode, isInputEmpty, numSavingsGoal, numInitialSavings, numMonthlyContribution, numTimeYears, numApyRate]);

  const handleCopy = async () => {
    if (!calculations) return;
    const text = `Savings Plan Summary (${numTimeYears} Years @ ${numApyRate}% APY):
Target: ${formatCurrency(calculations.totalTarget, currencySymbol)}
Initial Deposit: ${formatCurrency(numInitialSavings, currencySymbol)}
Monthly Contribution: ${formatCurrency(calculations.neededMonthly, currencySymbol)}/mo
Total Out-of-Pocket: ${formatCurrency(calculations.totalContributed, currencySymbol)}
Interest Earned (HYSA): ${formatCurrency(calculations.totalInterestEarned, currencySymbol)}`;

    const ok = await copyToClipboard(text);
    if (ok) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleReset = () => {
    setMode('findMonthly');
    setSavingsGoal(50000);
    setInitialSavings(5000);
    setMonthlyContribution(400);
    setTimeYears(5);
    setApyRate(4.5);
  };

  const handleSave = () => {
    if (!calculations) return;
    if (onSaveCalculation) {
      onSaveCalculation(
        `Savings Goal: ${formatCurrency(calculations.totalTarget, currencySymbol)} in ${numTimeYears} yrs → ${formatCurrency(calculations.neededMonthly, currencySymbol)}/mo (${numApyRate}% APY)`,
        { mode, savingsGoal, initialSavings, monthlyContribution, timeYears, apyRate },
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
              <PiggyBank className="w-4 h-4 text-orange-600" />
              <span>Savings Strategy</span>
            </h2>
            <div className="flex items-center gap-2">
              <button
                onClick={handleReset}
                className="text-xs font-semibold text-slate-600 hover:text-slate-900 px-2.5 py-1 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors"
              >
                Reset
              </button>
              <div className="flex rounded-lg bg-slate-100 p-0.5 text-xs font-bold">
                <button
                  type="button"
                  onClick={() => setMode('findMonthly')}
                  className={`px-2.5 py-1 rounded-md transition-all ${
                    mode === 'findMonthly' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600'
                  }`}
                >
                  Target Goal
                </button>
                <button
                  type="button"
                  onClick={() => setMode('findFuture')}
                  className={`px-2.5 py-1 rounded-md transition-all ${
                    mode === 'findFuture' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600'
                  }`}
                >
                  Fixed Monthly
                </button>
              </div>
            </div>
          </div>

          {/* Target Goal or Fixed Monthly */}
          {mode === 'findMonthly' ? (
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 flex justify-between">
                <span>Savings Goal Target</span>
                <span className="text-orange-600 font-mono">{formatCurrency(savingsGoal, currencySymbol)}</span>
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-sm">{currencySymbol}</span>
                <input
                  type="number"
                  min="500"
                  max="5000000"
                  step="500"
                  value={savingsGoal}
                  onChange={(e) => setSavingsGoal(e.target.value === '' ? '' : Number(e.target.value))}
                  className="w-full pl-8 pr-3 py-2 text-sm font-semibold border border-slate-200 rounded-xl bg-slate-50/50 focus:bg-white focus:ring-2 focus:ring-orange-500 focus:outline-none"
                />
              </div>
            </div>
          ) : (
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 flex justify-between">
                <span>Monthly Deposit</span>
                <span className="text-orange-600 font-mono">{formatCurrency(monthlyContribution, currencySymbol)}/mo</span>
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-sm">{currencySymbol}</span>
                <input
                  type="number"
                  min="10"
                  max="100000"
                  step="25"
                  value={monthlyContribution}
                  onChange={(e) => setMonthlyContribution(e.target.value === '' ? '' : Number(e.target.value))}
                  className="w-full pl-8 pr-3 py-2 text-sm font-semibold border border-slate-200 rounded-xl bg-slate-50/50 focus:bg-white focus:ring-2 focus:ring-orange-500 focus:outline-none"
                />
              </div>
            </div>
          )}

          {/* Starting Balance */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 flex justify-between">
              <span>Initial Savings Deposit</span>
              <span className="text-orange-600 font-mono">{formatCurrency(initialSavings, currencySymbol)}</span>
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-sm">{currencySymbol}</span>
              <input
                type="number"
                min="0"
                max="1000000"
                step="500"
                value={initialSavings}
                onChange={(e) => setInitialSavings(e.target.value === '' ? '' : Number(e.target.value))}
                className="w-full pl-8 pr-3 py-2 text-sm font-semibold border border-slate-200 rounded-xl bg-slate-50/50 focus:bg-white focus:ring-2 focus:ring-orange-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Timeframe */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 flex justify-between">
              <span>Timeframe</span>
              <span className="text-orange-600 font-mono">{timeYears} Years ({timeYears * 12} Months)</span>
            </label>
            <div className="grid grid-cols-4 gap-2">
              {[1, 3, 5, 10].map(y => (
                <button
                  key={y}
                  type="button"
                  onClick={() => setTimeYears(y)}
                  className={`py-1.5 text-xs font-bold rounded-lg border transition-all ${
                    timeYears === y
                      ? 'bg-orange-500 text-white border-orange-500'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {y} Yr{y > 1 ? 's' : ''}
                </button>
              ))}
            </div>
          </div>

          {/* APY Rate */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 flex justify-between">
              <span>High-Yield Savings APY (%)</span>
              <span className="text-orange-600 font-mono">{apyRate}%</span>
            </label>
            <div className="relative">
              <input
                type="number"
                min="0"
                max="15"
                step="0.1"
                value={apyRate}
                onChange={(e) => setApyRate(e.target.value === '' ? '' : Number(e.target.value))}
                className="w-full pl-3 pr-8 py-2 text-sm font-semibold border border-slate-200 rounded-xl bg-slate-50/50 focus:bg-white focus:ring-2 focus:ring-orange-500 focus:outline-none"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-sm">%</span>
            </div>
          </div>
        </div>

        {/* Right Output */}
        <div className="lg:col-span-6 space-y-4">
          <div className="bg-gradient-to-br from-slate-900 via-orange-950 to-slate-900 text-white rounded-2xl p-6 shadow-md relative">
            <div className="space-y-4">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-orange-300">
                  {mode === 'findMonthly' ? 'Required Monthly Contribution' : 'Estimated Total Accumulated'}
                </span>
                <div className="text-3xl sm:text-4xl font-black tracking-tight text-white mt-1">
                  {calculations
                    ? (mode === 'findMonthly'
                        ? formatCurrency(calculations.neededMonthly, currencySymbol) + '/mo'
                        : formatCurrency(calculations.totalTarget, currencySymbol))
                    : '—'}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-3 border-t border-orange-900/60">
                <div className="bg-white/10 rounded-xl p-3 backdrop-blur-xs">
                  <span className="text-[10px] text-slate-300 uppercase font-bold block">Final Goal / Total</span>
                  <span className="text-base font-bold text-white font-mono">
                    {calculations ? formatCurrency(calculations.totalTarget, currencySymbol) : '—'}
                  </span>
                </div>
                <div className="bg-white/10 rounded-xl p-3 backdrop-blur-xs">
                  <span className="text-[10px] text-orange-300 uppercase font-bold block">Interest Earned</span>
                  <span className="text-base font-bold text-orange-300 font-mono">
                    {calculations ? `+${formatCurrency(calculations.totalInterestEarned, currencySymbol)}` : '—'}
                  </span>
                </div>
                <div className="bg-white/10 rounded-xl p-3 backdrop-blur-xs">
                  <span className="text-[10px] text-slate-300 uppercase font-bold block">Out of Pocket Deposits</span>
                  <span className="text-base font-bold text-white font-mono">
                    {calculations ? formatCurrency(calculations.totalContributed, currencySymbol) : '—'}
                  </span>
                </div>
                <div className="bg-white/10 rounded-xl p-3 backdrop-blur-xs">
                  <span className="text-[10px] text-slate-300 uppercase font-bold block">Deposit Ratio</span>
                  <span className="text-base font-bold text-orange-300 font-mono">
                    {calculations
                      ? `${Math.round((calculations.totalInterestEarned / (calculations.totalTarget || 1)) * 100 || 0)}% Free Interest`
                      : '—'}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <button
                  type="button"
                  disabled={!calculations}
                  onClick={handleCopy}
                  className="flex-1 py-2 px-3 rounded-xl bg-white/10 hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed text-xs font-bold text-white flex items-center justify-center gap-1.5 transition-colors border border-white/10"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-orange-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied' : 'Copy Summary'}</span>
                </button>
                {onSaveCalculation && (
                  <button
                    type="button"
                    disabled={!calculations}
                    onClick={handleSave}
                    className="py-2 px-3 rounded-xl bg-white/10 hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed text-xs font-bold text-white flex items-center justify-center gap-1.5 transition-colors border border-white/10"
                  >
                    <Bookmark className="w-3.5 h-3.5" />
                    <span>{saved ? 'Saved' : 'Save'}</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
