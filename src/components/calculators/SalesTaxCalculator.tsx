import React, { useState, useMemo } from 'react';
import { Receipt, RotateCcw, Copy, Check } from 'lucide-react';
import { copyToClipboard, formatCurrency } from '../../utils/formatters';
import { DecimalInput } from '../shared/DecimalInput';

interface SalesTaxCalculatorProps {
  currencySymbol?: string;
  onSave?: (summary: string, inputs: any, results: any) => void;
}

export const SalesTaxCalculator: React.FC<SalesTaxCalculatorProps> = ({
  currencySymbol = '$',
  onSave
}) => {
  const [mode, setMode] = useState<'forward' | 'reverse'>('forward');
  const [amount, setAmount] = useState<number | ''>(100);
  const [taxRate, setTaxRate] = useState<number | ''>(8.25);
  const [discountPct, setDiscountPct] = useState<number | ''>(0);
  const [copied, setCopied] = useState(false);

  const handleReset = () => {
    setMode('forward');
    setAmount(100);
    setTaxRate(8.25);
    setDiscountPct(0);
  };

  const results = useMemo(() => {
    if (amount === '' || taxRate === '') return null;
    const rawAmt = typeof amount === 'number' ? amount : 0;
    const rate = typeof taxRate === 'number' ? taxRate : 0;
    const disc = typeof discountPct === 'number' ? Math.min(100, Math.max(0, discountPct)) : 0;

    if (rawAmt < 0 || rate < 0) return null;

    if (mode === 'forward') {
      const discountAmount = rawAmt * (disc / 100);
      const taxableSubtotal = Math.max(0, rawAmt - discountAmount);
      const salesTax = taxableSubtotal * (rate / 100);
      const totalPrice = taxableSubtotal + salesTax;
      return {
        preTaxPrice: taxableSubtotal,
        originalListPrice: rawAmt,
        discountAmount,
        salesTax,
        totalPrice,
        effectiveTaxRate: rate
      };
    } else {
      // Reverse: user knows total receipt amount including tax
      const divisor = 1 + rate / 100;
      const preTaxPrice = divisor > 0 ? rawAmt / divisor : rawAmt;
      const salesTax = rawAmt - preTaxPrice;
      return {
        preTaxPrice,
        originalListPrice: preTaxPrice,
        discountAmount: 0,
        salesTax,
        totalPrice: rawAmt,
        effectiveTaxRate: rate
      };
    }
  }, [mode, amount, taxRate, discountPct]);

  const handleCopy = async () => {
    if (!results) return;
    const text = `Sales Tax Calculation (${mode === 'forward' ? 'Add Sales Tax' : 'Reverse From Total'}):
• Pre-Tax Subtotal: ${formatCurrency(results.preTaxPrice, currencySymbol)}
• Sales Tax (${results.effectiveTaxRate.toFixed(2)}%): ${formatCurrency(results.salesTax, currencySymbol)}
• Total Price: ${formatCurrency(results.totalPrice, currencySymbol)}`;
    const ok = await copyToClipboard(text);
    if (ok) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-slate-100">
        <div className="inline-flex rounded-xl bg-slate-100 p-1">
          <button
            type="button"
            onClick={() => setMode('forward')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              mode === 'forward' ? 'bg-white text-orange-600 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Calculate Total With Tax
          </button>
          <button
            type="button"
            onClick={() => setMode('reverse')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              mode === 'reverse' ? 'bg-white text-orange-600 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Reverse Pre-Tax Price
          </button>
        </div>

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
            <Receipt className="w-4 h-4 text-orange-500" />
            <span>{mode === 'forward' ? 'Item & Tax Inputs' : 'Receipt & Tax Rate'}</span>
          </h4>

          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">
              {mode === 'forward' ? `Pre-Tax Price (${currencySymbol})` : `Total Receipt Price Incl. Tax (${currencySymbol})`}
            </label>
            <DecimalInput
              value={amount}
              onValueChange={setAmount}
              placeholder="100.00"
              className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm font-bold text-slate-900 focus:outline-none focus:border-orange-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">
              Sales Tax Rate (%)
            </label>
            <DecimalInput
              value={taxRate}
              onValueChange={setTaxRate}
              placeholder="8.25"
              className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm font-bold text-slate-900 focus:outline-none focus:border-orange-500"
            />
          </div>

          {mode === 'forward' && (
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">
                Pre-Tax Discount (%) <span className="text-slate-400 font-normal">Optional</span>
              </label>
              <DecimalInput
                value={discountPct}
                onValueChange={setDiscountPct}
                placeholder="0"
                className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm font-bold text-slate-900 focus:outline-none focus:border-orange-500"
              />
            </div>
          )}
        </div>

        <div className="lg:col-span-7">
          {results ? (
            <div className="bg-gradient-to-br from-orange-50 to-amber-50 p-6 rounded-2xl border border-orange-200 space-y-5">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-orange-800 block">
                    {mode === 'forward' ? 'Total Checkout Price' : 'Pre-Tax Subtotal'}
                  </span>
                  <div className="text-3xl sm:text-4xl font-black text-slate-900 font-mono-numbers mt-1">
                    {mode === 'forward'
                      ? formatCurrency(results.totalPrice, currencySymbol)
                      : formatCurrency(results.preTaxPrice, currencySymbol)}
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
                          `Sales Tax: Total ${formatCurrency(results.totalPrice, currencySymbol)} (Tax ${formatCurrency(results.salesTax, currencySymbol)})`,
                          { mode, amount, taxRate, discountPct },
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
                {mode === 'forward' && results.discountAmount > 0 && (
                  <>
                    <div className="flex justify-between">
                      <span>Original Price:</span>
                      <span className="font-mono-numbers font-semibold">{formatCurrency(results.originalListPrice, currencySymbol)}</span>
                    </div>
                    <div className="flex justify-between text-emerald-700">
                      <span>Pre-Tax Discount:</span>
                      <span className="font-mono-numbers font-bold">-{formatCurrency(results.discountAmount, currencySymbol)}</span>
                    </div>
                  </>
                )}
                <div className="flex justify-between">
                  <span>Taxable Pre-Tax Amount:</span>
                  <span className="font-mono-numbers font-bold text-slate-900">{formatCurrency(results.preTaxPrice, currencySymbol)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Sales Tax ({results.effectiveTaxRate}%):</span>
                  <span className="font-mono-numbers font-bold text-orange-700">+{formatCurrency(results.salesTax, currencySymbol)}</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-slate-100 font-bold text-slate-900">
                  <span>Total Price After Tax:</span>
                  <span className="font-mono-numbers">{formatCurrency(results.totalPrice, currencySymbol)}</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8 text-center text-slate-500 text-sm">
              Enter a valid non-negative price and sales tax rate to calculate.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
