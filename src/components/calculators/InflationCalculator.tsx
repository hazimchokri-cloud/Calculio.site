import React, { useState, useMemo } from 'react';
import { Coins, Check, Copy, TrendingUp } from 'lucide-react';
import { formatCurrency, formatNumber, copyToClipboard } from '../../utils/formatters';

interface InflationProps {
  currencySymbol?: string;
  onSaveCalculation?: (summary: string, inputs: any, results: any) => void;
}

export const InflationCalculator: React.FC<InflationProps> = ({ currencySymbol = '$' }) => {
  const [initialAmount, setInitialAmount] = useState<number | ''>(1000);
  const [avgInflationRate, setAvgInflationRate] = useState<number | ''>(3.2);
  const [years, setYears] = useState<number | ''>(15);
  const [copied, setCopied] = useState<boolean>(false);

  const numInitialAmount = typeof initialAmount === 'number' ? initialAmount : 0;
  const numInflationRate = typeof avgInflationRate === 'number' ? avgInflationRate : 0;
  const numYears = typeof years === 'number' ? years : 0;

  const isInputEmpty = initialAmount === '' || avgInflationRate === '' || years === '';

  const stats = useMemo(() => {
    if (isInputEmpty || numInitialAmount < 0 || numYears < 0) return null;
    const rate = numInflationRate / 100;
    // Future equivalent cost of goods
    const futureCost = numInitialAmount * Math.pow(1 + rate, numYears);
    // Purchasing power of the same nominal dollars in future
    const futurePurchasingPower = rate === -1 ? 0 : numInitialAmount / Math.pow(1 + rate, numYears);
    const cumulativeInflation = numInitialAmount > 0 ? ((futureCost - numInitialAmount) / numInitialAmount) * 100 : 0;

    return {
      futureCost,
      futurePurchasingPower,
      cumulativeInflation: Number(cumulativeInflation.toFixed(1))
    };
  }, [isInputEmpty, numInitialAmount, numInflationRate, numYears]);

  const handleCopy = async () => {
    if (!stats) return;
    const text = `Inflation Analysis:
• Initial Amount: ${formatCurrency(numInitialAmount, currencySymbol)}
• Annual Inflation: ${numInflationRate}% across ${numYears} Years
• Equivalent Future Cost: ${formatCurrency(stats.futureCost, currencySymbol)} (+${stats.cumulativeInflation}%)
• Real Future Purchasing Power of original ${formatCurrency(numInitialAmount, currencySymbol)}: ${formatCurrency(stats.futurePurchasingPower, currencySymbol)}`;

    const ok = await copyToClipboard(text);
    if (ok) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleReset = () => {
    setInitialAmount(1000);
    setAvgInflationRate(3.2);
    setYears(15);
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Input */}
        <div className="lg:col-span-7 bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-5">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="text-base font-bold text-slate-900">Inflation Parameters</h3>
            <button
              onClick={handleReset}
              className="text-xs font-semibold text-slate-600 hover:text-slate-900 px-2.5 py-1 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors"
            >
              Reset
            </button>
          </div>

          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-slate-700 block">Starting Amount</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-700 text-sm font-semibold">{currencySymbol}</span>
                <input
                  type="number"
                  value={initialAmount}
                  onChange={(e) => setInitialAmount(e.target.value === '' ? '' : Number(e.target.value))}
                  className="w-full pl-7 pr-3 py-2 font-mono-numbers text-base font-bold border border-slate-200 rounded-lg bg-slate-50"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-slate-700 block">Annual Inflation Rate (%)</label>
                <input
                  type="number"
                  step="0.1"
                  value={avgInflationRate}
                  onChange={(e) => setAvgInflationRate(e.target.value === '' ? '' : Number(e.target.value))}
                  className="w-full px-3 py-2 font-mono-numbers text-sm font-semibold border border-slate-200 rounded-lg bg-slate-50"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-slate-700 block">Horizon (Years)</label>
                <input
                  type="number"
                  min="1"
                  max="100"
                  value={years}
                  onChange={(e) => setYears(e.target.value === '' ? '' : Number(e.target.value))}
                  className="w-full px-3 py-2 font-mono-numbers text-sm font-semibold border border-slate-200 rounded-lg bg-slate-50"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="lg:col-span-5 space-y-5">
          {stats ? (
            <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-amber-950 text-white rounded-2xl p-6 sm:p-7 shadow-lg relative overflow-hidden">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-amber-300">
                  Future Equivalent Cost
                </span>
                <span className="px-2 py-0.5 text-xs font-bold bg-amber-500/20 text-amber-300 rounded border border-amber-500/30">
                  +{stats.cumulativeInflation}% Total
                </span>
              </div>

              <div className="flex items-baseline gap-2 mb-6">
                <span className="text-5xl font-black font-mono-numbers tracking-tight text-white">
                  {formatCurrency(stats.futureCost, currencySymbol)}
                </span>
              </div>

              <div className="border-t border-slate-700/80 pt-4 space-y-2 text-xs">
                <div className="flex justify-between text-slate-300">
                  <span>Value of original {formatCurrency(numInitialAmount, currencySymbol)} in {numYears} years:</span>
                  <strong className="text-rose-300 font-mono-numbers text-sm">{formatCurrency(stats.futurePurchasingPower, currencySymbol)}</strong>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>Cumulative Price Increase:</span>
                  <strong className="text-white font-mono-numbers">{stats.cumulativeInflation}%</strong>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 text-center text-slate-500 text-sm">
              Please enter valid starting amount, inflation rate, and years to view inflation projections.
            </div>
          )}

          {stats && (
            <button
              onClick={handleCopy}
              className="w-full flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold transition-all shadow-2xs"
            >
              {copied ? <Check className="w-4 h-4 text-orange-600" /> : <Copy className="w-4 h-4 text-slate-700" />}
              {copied ? 'Copied' : 'Copy Inflation Summary'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
