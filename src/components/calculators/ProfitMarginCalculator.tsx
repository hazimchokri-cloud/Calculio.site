import React, { useState, useMemo } from 'react';
import { TrendingUp, RotateCcw, Copy, Check } from 'lucide-react';
import { copyToClipboard, formatCurrency } from '../../utils/formatters';
import { DecimalInput } from '../shared/DecimalInput';

interface ProfitMarginCalculatorProps {
  currencySymbol?: string;
  onSave?: (summary: string, inputs: any, results: any) => void;
}

export const ProfitMarginCalculator: React.FC<ProfitMarginCalculatorProps> = ({
  currencySymbol = '$',
  onSave
}) => {
  const [revenue, setRevenue] = useState<number | ''>(100000);
  const [cogs, setCogs] = useState<number | ''>(45000);
  const [operatingExpenses, setOperatingExpenses] = useState<number | ''>(25000);
  const [otherTaxesExpenses, setOtherTaxesExpenses] = useState<number | ''>(6000);
  const [copied, setCopied] = useState(false);

  const handleReset = () => {
    setRevenue(100000);
    setCogs(45000);
    setOperatingExpenses(25000);
    setOtherTaxesExpenses(6000);
  };

  const results = useMemo(() => {
    if (revenue === '' || cogs === '') return null;
    const rev = typeof revenue === 'number' ? revenue : 0;
    const cost = typeof cogs === 'number' ? Math.max(0, cogs) : 0;
    const opex = typeof operatingExpenses === 'number' ? Math.max(0, operatingExpenses) : 0;
    const other = typeof otherTaxesExpenses === 'number' ? Math.max(0, otherTaxesExpenses) : 0;

    if (rev <= 0) return null;

    const grossProfit = rev - cost;
    const operatingIncome = grossProfit - opex;
    const netProfit = operatingIncome - other;

    const grossMarginPct = (grossProfit / rev) * 100;
    const operatingMarginPct = (operatingIncome / rev) * 100;
    const netMarginPct = (netProfit / rev) * 100;
    const markupPct = cost > 0 ? (grossProfit / cost) * 100 : 0;

    return {
      grossProfit,
      operatingIncome,
      netProfit,
      grossMarginPct,
      operatingMarginPct,
      netMarginPct,
      markupPct
    };
  }, [revenue, cogs, operatingExpenses, otherTaxesExpenses]);

  const handleCopy = async () => {
    if (!results) return;
    const text = `Profit Margin Summary:
• Revenue: ${formatCurrency(Number(revenue), currencySymbol)}
• Gross Profit: ${formatCurrency(results.grossProfit, currencySymbol)} (${results.grossMarginPct.toFixed(2)}% Gross Margin)
• Cost Markup (Gross): ${results.markupPct.toFixed(2)}%
• Operating Income: ${formatCurrency(results.operatingIncome, currencySymbol)} (${results.operatingMarginPct.toFixed(2)}% Operating Margin)
• Net Profit: ${formatCurrency(results.netProfit, currencySymbol)} (${results.netMarginPct.toFixed(2)}% Net Margin)`;
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
            <TrendingUp className="w-4 h-4 text-orange-500" />
            <span>Revenue & Cost Breakdown</span>
          </h4>

          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">
              Total Revenue / Selling Price ({currencySymbol})
            </label>
            <DecimalInput
              value={revenue}
              onValueChange={setRevenue}
              className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm font-bold text-slate-900 focus:outline-none focus:border-orange-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">
              Cost of Goods Sold (COGS) ({currencySymbol})
            </label>
            <DecimalInput
              value={cogs}
              onValueChange={setCogs}
              className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm font-bold text-slate-900 focus:outline-none focus:border-orange-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Operating Expenses ({currencySymbol})</label>
              <DecimalInput
                value={operatingExpenses}
                onValueChange={setOperatingExpenses}
                className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm font-bold text-slate-900 focus:outline-none focus:border-orange-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Taxes & Interest ({currencySymbol})</label>
              <DecimalInput
                value={otherTaxesExpenses}
                onValueChange={setOtherTaxesExpenses}
                className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm font-bold text-slate-900 focus:outline-none focus:border-orange-500"
              />
            </div>
          </div>
        </div>

        <div className="lg:col-span-7">
          {results ? (
            <div className="bg-gradient-to-br from-orange-50 to-amber-50 p-6 rounded-2xl border border-orange-200 space-y-5">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="grid grid-cols-3 gap-4 flex-1 min-w-[240px]">
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-orange-800 block">Gross Margin</span>
                    <div className="text-xl sm:text-2xl font-black text-slate-900 font-mono-numbers mt-0.5">
                      {results.grossMarginPct.toFixed(2)}%
                    </div>
                  </div>
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-orange-800 block">Operating</span>
                    <div className="text-xl sm:text-2xl font-black text-slate-900 font-mono-numbers mt-0.5">
                      {results.operatingMarginPct.toFixed(2)}%
                    </div>
                  </div>
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-orange-800 block">Net Margin</span>
                    <div className={`text-xl sm:text-2xl font-black font-mono-numbers mt-0.5 ${results.netMarginPct < 0 ? 'text-red-700' : 'text-orange-700'}`}>
                      {results.netMarginPct.toFixed(2)}%
                    </div>
                  </div>
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
                          `Profit Margin: Gross ${results.grossMarginPct.toFixed(1)}% / Net ${results.netMarginPct.toFixed(1)}%`,
                          { revenue, cogs, operatingExpenses, otherTaxesExpenses },
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
                  <span>Gross Profit (Revenue - COGS):</span>
                  <span className="font-mono-numbers font-bold text-slate-900">{formatCurrency(results.grossProfit, currencySymbol)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Cost Markup % (Gross Profit ÷ COGS):</span>
                  <span className="font-mono-numbers font-semibold">{results.markupPct.toFixed(2)}%</span>
                </div>
                <div className="flex justify-between">
                  <span>Operating Income (EBIT):</span>
                  <span className="font-mono-numbers font-bold text-slate-900">{formatCurrency(results.operatingIncome, currencySymbol)}</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-slate-100 font-bold text-slate-900">
                  <span>Net Profit (Bottom Line):</span>
                  <span className={`font-mono-numbers ${results.netProfit < 0 ? 'text-red-700' : 'text-orange-700'}`}>
                    {formatCurrency(results.netProfit, currencySymbol)}
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8 text-center text-slate-500 text-sm">
              Enter revenue greater than 0 and COGS to calculate profit margins and markup.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
