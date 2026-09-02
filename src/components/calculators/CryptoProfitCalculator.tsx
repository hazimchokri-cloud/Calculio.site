import React, { useState, useMemo } from 'react';
import { Coins, DollarSign, TrendingUp, TrendingDown, RotateCcw, Copy, Check, Info } from 'lucide-react';
import { copyToClipboard } from '../../utils/formatters';

interface CryptoProfitCalculatorProps {
  currencySymbol?: string;
  onSave?: (summary: string, inputs: any, results: any) => void;
}

export const CryptoProfitCalculator: React.FC<CryptoProfitCalculatorProps> = ({
  currencySymbol = '$',
  onSave
}) => {
  const [investmentAmount, setInvestmentAmount] = useState<number | ''>(1000);
  const [buyPrice, setBuyPrice] = useState<number | ''>(60000); // e.g. BTC at $60k
  const [sellPrice, setSellPrice] = useState<number | ''>(85000); // e.g. BTC at $85k
  const [buyFeePercent, setBuyFeePercent] = useState<number | ''>(0.5); // 0.5% exchange fee
  const [sellFeePercent, setSellFeePercent] = useState<number | ''>(0.5); // 0.5% exchange fee

  const [copied, setCopied] = useState(false);

  const numInvestmentAmount = typeof investmentAmount === 'number' ? investmentAmount : 0;
  const numBuyPrice = typeof buyPrice === 'number' ? buyPrice : 0;
  const numSellPrice = typeof sellPrice === 'number' ? sellPrice : 0;
  const numBuyFeePercent = typeof buyFeePercent === 'number' ? buyFeePercent : 0;
  const numSellFeePercent = typeof sellFeePercent === 'number' ? sellFeePercent : 0;

  const isInputEmpty = investmentAmount === '' || buyPrice === '' || sellPrice === '';

  const results = useMemo(() => {
    try {
      if (isInputEmpty || numBuyPrice <= 0 || numInvestmentAmount <= 0) return null;

      const buyFee = numInvestmentAmount * (numBuyFeePercent / 100);
      const netInvestment = Math.max(0, numInvestmentAmount - buyFee);
      const coinsAcquired = numBuyPrice > 0 ? netInvestment / numBuyPrice : 0;

      const grossExitValue = coinsAcquired * numSellPrice;
      const sellFee = grossExitValue * (numSellFeePercent / 100);
      const totalPayout = Math.max(0, grossExitValue - sellFee);

      const netProfit = totalPayout - numInvestmentAmount;
      const returnOnInvestment = numInvestmentAmount > 0 ? (netProfit / numInvestmentAmount) * 100 : 0;
      const totalFees = buyFee + sellFee;

      return {
        coinsAcquired: Math.round(coinsAcquired * 1000000) / 1000000,
        totalPayout: Math.round(totalPayout * 100) / 100,
        netProfit: Math.round(netProfit * 100) / 100,
        returnOnInvestment: Math.round(returnOnInvestment * 10) / 10,
        totalFees: Math.round(totalFees * 100) / 100
      };
    } catch {
      return null;
    }
  }, [isInputEmpty, numInvestmentAmount, numBuyPrice, numSellPrice, numBuyFeePercent, numSellFeePercent]);

  const handleCopy = () => {
    if (!results) return;
    const text = `Crypto Profit & Loss Calculation:
Initial Investment: ${currencySymbol}${numInvestmentAmount.toLocaleString()}
Buy Price: ${currencySymbol}${numBuyPrice.toLocaleString()} | Sell Price: ${currencySymbol}${numSellPrice.toLocaleString()}
Net Profit: ${currencySymbol}${results.netProfit.toLocaleString()} (${results.returnOnInvestment}% ROI)
Total Exit Value: ${currencySymbol}${results.totalPayout.toLocaleString()}`;
    copyToClipboard(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReset = () => {
    setInvestmentAmount(1000);
    setBuyPrice(60000);
    setSellPrice(85000);
    setBuyFeePercent(0.5);
    setSellFeePercent(0.5);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
              <Coins className="w-4 h-4 text-orange-600" />
              <span>Trade Parameters & Prices</span>
            </h4>
            <button
              onClick={handleReset}
              className="text-xs font-semibold text-slate-600 hover:text-slate-900 px-2.5 py-1 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors"
            >
              Reset
            </button>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Total Investment Amount</label>
            <div className="relative">
              <span className="absolute left-3 top-2.5 text-xs font-bold text-slate-400">{currencySymbol}</span>
              <input
                type="number"
                min="1"
                step="50"
                value={investmentAmount}
                onChange={(e) => setInvestmentAmount(e.target.value === '' ? '' : Number(e.target.value))}
                className="w-full pl-7 pr-3 py-2 border border-slate-300 rounded-xl text-xs font-bold"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Buy Price per Coin</label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-xs font-bold text-slate-400">{currencySymbol}</span>
                <input
                  type="number"
                  min="0.000001"
                  step="any"
                  value={buyPrice}
                  onChange={(e) => setBuyPrice(e.target.value === '' ? '' : Number(e.target.value))}
                  className="w-full pl-7 pr-3 py-2 border border-slate-300 rounded-xl text-xs font-bold"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Sell / Target Price</label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-xs font-bold text-slate-400">{currencySymbol}</span>
                <input
                  type="number"
                  min="0.000001"
                  step="any"
                  value={sellPrice}
                  onChange={(e) => setSellPrice(e.target.value === '' ? '' : Number(e.target.value))}
                  className="w-full pl-7 pr-3 py-2 border border-slate-300 rounded-xl text-xs font-bold text-orange-950"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Buy Fee (%)</label>
              <input
                type="number"
                min="0"
                max="10"
                step="0.1"
                value={buyFeePercent}
                onChange={(e) => setBuyFeePercent(e.target.value === '' ? '' : Number(e.target.value))}
                className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs font-bold"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Sell Fee (%)</label>
              <input
                type="number"
                min="0"
                max="10"
                step="0.1"
                value={sellFeePercent}
                onChange={(e) => setSellFeePercent(e.target.value === '' ? '' : Number(e.target.value))}
                className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs font-bold"
              />
            </div>
          </div>
        </div>

        {/* Results Box */}
        <div className="bg-gradient-to-br from-orange-50 to-orange-100/60 p-6 rounded-2xl border border-orange-200 flex flex-col justify-between space-y-4">
          {results ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-orange-200">
                <span className="text-xs font-bold uppercase tracking-wider text-orange-900">Profit & Return</span>
                <span className="text-xs font-bold text-orange-800">
                  Holding: {results.coinsAcquired} units
                </span>
              </div>

              <div className="p-4 bg-white rounded-xl border border-orange-200 shadow-2xs text-center space-y-1">
                <span className="text-[11px] font-bold text-slate-500 uppercase">Net Profit / Loss</span>
                <div className={`text-3xl font-black font-mono-numbers flex items-center justify-center gap-1 ${
                  results.netProfit >= 0 ? 'text-orange-600' : 'text-rose-600'
                }`}>
                  {results.netProfit >= 0 ? <TrendingUp className="w-6 h-6" /> : <TrendingDown className="w-6 h-6" />}
                  <span>{currencySymbol}{results.netProfit.toLocaleString()}</span>
                </div>
                <span className={`text-sm font-extrabold block ${results.returnOnInvestment >= 0 ? 'text-orange-700' : 'text-rose-700'}`}>
                  {results.returnOnInvestment >= 0 ? '+' : ''}{results.returnOnInvestment}% Return on Investment
                </span>
              </div>

              <div className="bg-white p-3.5 rounded-xl border border-orange-100 space-y-2 text-xs text-slate-700">
                <div className="flex justify-between">
                  <span>Total Payout Value:</span>
                  <span className="font-bold text-slate-900">{currencySymbol}{results.totalPayout.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Exchange Fees Paid:</span>
                  <span className="font-bold text-slate-900">{currencySymbol}{results.totalFees.toLocaleString()}</span>
                </div>
              </div>

              <div className="pt-3 border-t border-orange-200">
                <button
                  type="button"
                  onClick={handleCopy}
                  className="w-full py-2 px-3 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-xs font-bold text-slate-700 flex items-center justify-center gap-1.5 transition-all shadow-2xs"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-orange-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied PnL' : 'Copy Trade Summary'}</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="py-12 text-center space-y-2">
              <p className="text-orange-950 font-bold text-sm">Please enter valid trade parameters.</p>
              <p className="text-slate-500 text-xs">Enter your investment amount, buy price, and target sell price to calculate profit and ROI.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
