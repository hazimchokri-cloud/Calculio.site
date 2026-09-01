import React, { useState, useMemo } from 'react';
import { Briefcase, DollarSign, TrendingUp, RotateCcw, Copy, Check, Info } from 'lucide-react';
import { copyToClipboard } from '../../utils/formatters';

interface BreakEvenCalculatorProps {
  currencySymbol?: string;
  onSave?: (summary: string, inputs: any, results: any) => void;
}

export const BreakEvenCalculator: React.FC<BreakEvenCalculatorProps> = ({
  currencySymbol = '$',
  onSave
}) => {
  const [fixedCosts, setFixedCosts] = useState<number | ''>(15000); // Rent, salaries, software
  const [unitPrice, setUnitPrice] = useState<number | ''>(50); // Sale price per unit
  const [variableCostPerUnit, setVariableCostPerUnit] = useState<number | ''>(20); // Materials, labor per unit
  const [expectedUnitsSold, setExpectedUnitsSold] = useState<number | ''>(800);

  const [copied, setCopied] = useState(false);

  const numFixedCosts = typeof fixedCosts === 'number' ? fixedCosts : 0;
  const numUnitPrice = typeof unitPrice === 'number' ? unitPrice : 0;
  const numVariableCostPerUnit = typeof variableCostPerUnit === 'number' ? variableCostPerUnit : 0;
  const numExpectedUnitsSold = typeof expectedUnitsSold === 'number' ? expectedUnitsSold : 0;

  const isInputEmpty = fixedCosts === '' || unitPrice === '' || variableCostPerUnit === '';

  const results = useMemo(() => {
    if (isInputEmpty || numUnitPrice <= 0) return null;
    // Contribution margin per unit = Price - Variable Cost
    const contributionMargin = numUnitPrice - numVariableCostPerUnit;
    const contributionMarginRatio = numUnitPrice > 0 ? (contributionMargin / numUnitPrice) * 100 : 0;

    // Break-even units = Fixed Costs / Contribution Margin
    const breakEvenUnits = contributionMargin > 0 ? Math.ceil(numFixedCosts / contributionMargin) : 0;
    const breakEvenRevenue = breakEvenUnits * numUnitPrice;

    // Expected profit/loss based on expected units
    const totalRevenue = numExpectedUnitsSold * numUnitPrice;
    const totalVariableCosts = numExpectedUnitsSold * numVariableCostPerUnit;
    const totalCosts = numFixedCosts + totalVariableCosts;
    const netProfit = totalRevenue - totalCosts;
    const profitMargin = totalRevenue > 0 ? (netProfit / totalRevenue) * 100 : 0;

    return {
      contributionMargin: Math.round(contributionMargin * 100) / 100,
      contributionMarginRatio: Math.round(contributionMarginRatio * 10) / 10,
      breakEvenUnits,
      breakEvenRevenue: Math.round(breakEvenRevenue),
      totalRevenue: Math.round(totalRevenue),
      totalCosts: Math.round(totalCosts),
      netProfit: Math.round(netProfit),
      profitMargin: Math.round(profitMargin * 10) / 10
    };
  }, [isInputEmpty, numFixedCosts, numUnitPrice, numVariableCostPerUnit, numExpectedUnitsSold]);

  const handleCopy = () => {
    if (!results) return;
    const text = `Business Break-Even Analysis:
Break-Even Volume: ${results.breakEvenUnits.toLocaleString()} units
Break-Even Revenue: ${currencySymbol}${results.breakEvenRevenue.toLocaleString()}
Contribution Margin: ${currencySymbol}${results.contributionMargin}/unit (${results.contributionMarginRatio}%)
Expected Net Profit (${numExpectedUnitsSold} units): ${currencySymbol}${results.netProfit.toLocaleString()}`;
    copyToClipboard(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReset = () => {
    setFixedCosts(15000);
    setUnitPrice(50);
    setVariableCostPerUnit(20);
    setExpectedUnitsSold(800);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Input Parameters */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
              <Briefcase className="w-4 h-4 text-sky-600" />
              <span>Cost & Price Inputs</span>
            </h4>
            <button
              onClick={handleReset}
              className="text-xs font-semibold text-slate-600 hover:text-slate-900 px-2.5 py-1 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors"
            >
              Reset
            </button>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Total Fixed Costs (Monthly or Annual)</label>
            <div className="relative">
              <span className="absolute left-3 top-2.5 text-xs font-bold text-slate-400">{currencySymbol}</span>
              <input
                type="number"
                min="0"
                step="500"
                value={fixedCosts}
                onChange={(e) => setFixedCosts(e.target.value === '' ? '' : Number(e.target.value))}
                className="w-full pl-7 pr-3 py-2 border border-slate-300 rounded-xl text-xs font-bold"
              />
            </div>
            <span className="text-[10px] text-slate-500 mt-1 block">Rent, utilities, baseline salaries, insurance</span>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Selling Price / Unit</label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-xs font-bold text-slate-400">{currencySymbol}</span>
                <input
                  type="number"
                  min="0.01"
                  step="1"
                  value={unitPrice}
                  onChange={(e) => setUnitPrice(e.target.value === '' ? '' : Number(e.target.value))}
                  className="w-full pl-7 pr-3 py-2 border border-slate-300 rounded-xl text-xs font-bold"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Variable Cost / Unit</label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-xs font-bold text-slate-400">{currencySymbol}</span>
                <input
                  type="number"
                  min="0"
                  step="1"
                  value={variableCostPerUnit}
                  onChange={(e) => setVariableCostPerUnit(e.target.value === '' ? '' : Number(e.target.value))}
                  className="w-full pl-7 pr-3 py-2 border border-slate-300 rounded-xl text-xs font-bold"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Estimated Unit Sales Target</label>
            <input
              type="number"
              min="0"
              step="50"
              value={expectedUnitsSold}
              onChange={(e) => setExpectedUnitsSold(e.target.value === '' ? '' : Number(e.target.value))}
              className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs font-bold"
            />
          </div>
        </div>

        {/* Results Box */}
        <div className="bg-gradient-to-br from-sky-50 to-blue-50/60 p-6 rounded-2xl border border-sky-200 flex flex-col justify-between space-y-4">
          {results ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-sky-200">
                <span className="text-xs font-bold uppercase tracking-wider text-sky-900">Break-Even Results</span>
                <span className="text-xs font-extrabold text-sky-800">
                  Margin: {currencySymbol}{results.contributionMargin}/unit
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-3.5 bg-white rounded-xl border border-sky-200 shadow-2xs">
                  <span className="text-[10px] font-bold text-slate-500 uppercase">Break-Even Units</span>
                  <span className="text-2xl font-black text-slate-900 block mt-0.5">
                    {results.breakEvenUnits.toLocaleString()}
                  </span>
                  <span className="text-[10px] text-slate-500">Units required to cover costs</span>
                </div>
                <div className="p-3.5 bg-white rounded-xl border border-sky-200 shadow-2xs">
                  <span className="text-[10px] font-bold text-slate-500 uppercase">Break-Even Revenue</span>
                  <span className="text-2xl font-black text-sky-900 block mt-0.5">
                    {currencySymbol}{results.breakEvenRevenue.toLocaleString()}
                  </span>
                  <span className="text-[10px] text-slate-500">Gross sales at $0 profit</span>
                </div>
              </div>

              {/* Target Forecast Box */}
              <div className="bg-white p-4 rounded-xl border border-sky-200 space-y-2">
                <span className="text-xs font-bold text-slate-900 block">Forecast at {expectedUnitsSold || 0} Units Target:</span>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="p-2 bg-slate-50 rounded-lg">
                    <span className="text-slate-500 text-[10px] block">Total Revenue</span>
                    <span className="font-bold text-slate-900">{currencySymbol}{results.totalRevenue.toLocaleString()}</span>
                  </div>
                  <div className="p-2 bg-slate-50 rounded-lg">
                    <span className="text-slate-500 text-[10px] block">Net Profit</span>
                    <span className={`font-black text-sm ${results.netProfit >= 0 ? 'text-orange-700' : 'text-rose-700'}`}>
                      {currencySymbol}{results.netProfit.toLocaleString()} ({results.profitMargin}%)
                    </span>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-sky-200">
                <button
                  type="button"
                  onClick={handleCopy}
                  className="w-full py-2 px-3 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-xs font-bold text-slate-700 flex items-center justify-center gap-1.5 transition-all shadow-2xs"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-orange-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied Break-Even Data' : 'Copy Analysis'}</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="py-12 text-center space-y-2">
              <p className="text-sky-900 font-bold text-sm">Please enter valid cost and price values.</p>
              <p className="text-slate-500 text-xs">Enter your fixed costs, selling price, and variable cost per unit to calculate the break-even volume.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
