import React, { useState, useMemo } from 'react';
import { formatCurrency, formatNumber, copyToClipboard } from '../../utils/formatters';
import { TrendingUp, Percent, DollarSign, Copy, Check, Bookmark } from 'lucide-react';

interface RoiCalculatorProps {
  currencySymbol?: string;
  onSaveCalculation?: (summary: string, inputs: any, results: any) => void;
}

export const RoiCalculator: React.FC<RoiCalculatorProps> = ({
  currencySymbol = '$',
  onSaveCalculation
}) => {
  const [initialInvestment, setInitialInvestment] = useState<number | ''>(10000);
  const [returnedAmount, setReturnedAmount] = useState<number | ''>(18500);
  const [holdingPeriodYears, setHoldingPeriodYears] = useState<number | ''>(3.5);
  const [copied, setCopied] = useState<boolean>(false);
  const [saved, setSaved] = useState<boolean>(false);

  const numInitialInvestment = typeof initialInvestment === 'number' ? initialInvestment : 0;
  const numReturnedAmount = typeof returnedAmount === 'number' ? returnedAmount : 0;
  const numHoldingPeriodYears = typeof holdingPeriodYears === 'number' ? holdingPeriodYears : 0;

  const isInputEmpty = initialInvestment === '' || returnedAmount === '' || holdingPeriodYears === '';

  const calculations = useMemo(() => {
    if (isInputEmpty || numInitialInvestment <= 0) return null;

    const P = Math.max(0.01, numInitialInvestment);
    const F = Math.max(0, numReturnedAmount);
    const t = Math.max(0.01, numHoldingPeriodYears);

    const netProfit = F - P;
    const totalRoiPct = (netProfit / P) * 100;

    // Annualized ROI (Compound Annual Growth Rate / CAGR)
    // CAGR = (F / P)^(1/t) - 1
    let annualizedRoiPct = 0;
    if (F > 0 && P > 0 && t > 0) {
      annualizedRoiPct = (Math.pow(F / P, 1 / t) - 1) * 100;
    }

    return {
      netProfit,
      totalRoiPct,
      annualizedRoiPct,
      multiple: F / P
    };
  }, [isInputEmpty, numInitialInvestment, numReturnedAmount, numHoldingPeriodYears]);

  const handleCopy = async () => {
    if (!calculations) return;
    const text = `ROI Calculation Summary:
Initial Investment: ${formatCurrency(numInitialInvestment, currencySymbol)}
Ending / Final Value: ${formatCurrency(numReturnedAmount, currencySymbol)}
Net Profit: ${formatCurrency(calculations.netProfit, currencySymbol)}
Total ROI: ${calculations.totalRoiPct.toFixed(2)}% (${calculations.multiple.toFixed(2)}x Return)
Annualized ROI (CAGR): ${calculations.annualizedRoiPct.toFixed(2)}%/year over ${numHoldingPeriodYears} years`;

    const ok = await copyToClipboard(text);
    if (ok) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleReset = () => {
    setInitialInvestment(10000);
    setReturnedAmount(18500);
    setHoldingPeriodYears(3.5);
  };

  const handleSave = () => {
    if (onSaveCalculation && calculations) {
      onSaveCalculation(
        `ROI: ${formatCurrency(numInitialInvestment, currencySymbol)} → ${formatCurrency(numReturnedAmount, currencySymbol)} in ${numHoldingPeriodYears} yrs = ${calculations.totalRoiPct.toFixed(1)}% ROI (${calculations.annualizedRoiPct.toFixed(2)}% CAGR)`,
        { initialInvestment, returnedAmount, holdingPeriodYears },
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
              <span>Investment Performance</span>
            </h2>
            <button
              onClick={handleReset}
              className="text-xs font-semibold text-slate-600 hover:text-slate-900 px-2.5 py-1 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors"
            >
              Reset
            </button>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 flex justify-between">
              <span>Initial Capital Invested</span>
              <span className="text-orange-600 font-mono">{formatCurrency(initialInvestment, currencySymbol)}</span>
            </label>
            <input
              type="number"
              min="1"
              max="10000000"
              step="500"
              value={initialInvestment}
              onChange={(e) => setInitialInvestment(e.target.value === '' ? '' : Number(e.target.value))}
              className="w-full p-2 text-sm font-semibold border border-slate-200 rounded-xl bg-slate-50/50 focus:bg-white focus:ring-2 focus:ring-orange-500 focus:outline-none"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 flex justify-between">
              <span>Final Value Returned / Proceeds</span>
              <span className="text-orange-600 font-mono">{formatCurrency(returnedAmount, currencySymbol)}</span>
            </label>
            <input
              type="number"
              min="0"
              max="50000000"
              step="500"
              value={returnedAmount}
              onChange={(e) => setReturnedAmount(e.target.value === '' ? '' : Number(e.target.value))}
              className="w-full p-2 text-sm font-semibold border border-slate-200 rounded-xl bg-slate-50/50 focus:bg-white focus:ring-2 focus:ring-orange-500 focus:outline-none"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 flex justify-between">
              <span>Investment Duration (Years)</span>
              <span className="text-orange-600 font-mono">{holdingPeriodYears} Years</span>
            </label>
            <input
              type="number"
              min="0.1"
              max="50"
              step="0.5"
              value={holdingPeriodYears}
              onChange={(e) => setHoldingPeriodYears(e.target.value === '' ? '' : Number(e.target.value))}
              className="w-full p-2 text-sm font-semibold border border-slate-200 rounded-xl bg-slate-50/50 focus:bg-white focus:ring-2 focus:ring-orange-500 focus:outline-none"
            />
          </div>
        </div>

        {/* Right Output */}
        <div className="lg:col-span-6 space-y-4">
          <div className="bg-gradient-to-br from-slate-900 via-orange-950 to-slate-900 text-white rounded-2xl p-6 shadow-md relative">
            <div className="space-y-4">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-orange-300">
                  Total Return on Investment (ROI)
                </span>
                <div className="text-4xl font-black tracking-tight text-white mt-1 font-mono">
                  {calculations.totalRoiPct >= 0 ? '+' : ''}{calculations.totalRoiPct.toFixed(2)}%
                </div>
                <div className="text-xs font-medium text-orange-300 mt-1">
                  Net Profit: {formatCurrency(calculations.netProfit, currencySymbol)} ({calculations.multiple.toFixed(2)}x of original)
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-3 border-t border-orange-900/60">
                <div className="bg-white/10 rounded-xl p-3 backdrop-blur-xs">
                  <span className="text-[10px] text-slate-300 uppercase font-bold block">Annualized ROI (CAGR)</span>
                  <span className="text-lg font-bold text-orange-300 font-mono">{calculations.annualizedRoiPct.toFixed(2)}%/yr</span>
                </div>
                <div className="bg-white/10 rounded-xl p-3 backdrop-blur-xs">
                  <span className="text-[10px] text-slate-300 uppercase font-bold block">Holding Period</span>
                  <span className="text-base font-bold text-white font-mono">{holdingPeriodYears} Years</span>
                </div>
              </div>

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
        </div>
      </div>
    </div>
  );
};
