import React, { useState, useMemo } from 'react';
import { formatCurrency, formatNumber, copyToClipboard } from '../../utils/formatters';
import { CreditCard, AlertTriangle, TrendingDown, DollarSign, Copy, Check, Bookmark } from 'lucide-react';

interface CreditCardCalculatorProps {
  currencySymbol?: string;
  onSaveCalculation?: (summary: string, inputs: any, results: any) => void;
}

export const CreditCardCalculator: React.FC<CreditCardCalculatorProps> = ({
  currencySymbol = '$',
  onSaveCalculation
}) => {
  const [balance, setBalance] = useState<number | ''>(8500);
  const [interestRate, setInterestRate] = useState<number | ''>(21.99); // typical credit card APR
  const [payoffType, setPayoffType] = useState<'fixedMonthly' | 'targetMonths'>('fixedMonthly');
  const [fixedMonthlyPayment, setFixedMonthlyPayment] = useState<number | ''>(350);
  const [targetMonths, setTargetMonths] = useState<number | ''>(24);
  const [minPaymentPercent, setMinPaymentPercent] = useState<number | ''>(2.5); // typical 2% to 3%
  const [copied, setCopied] = useState<boolean>(false);
  const [saved, setSaved] = useState<boolean>(false);

  const numBalance = typeof balance === 'number' ? balance : 0;
  const numInterestRate = typeof interestRate === 'number' ? interestRate : 0;
  const numFixedMonthly = typeof fixedMonthlyPayment === 'number' ? fixedMonthlyPayment : 0;
  const numTargetMonths = typeof targetMonths === 'number' ? targetMonths : 0;

  const isInputEmpty = balance === '' || interestRate === '';

  const calculations = useMemo(() => {
    if (isInputEmpty || numBalance <= 0) return null;
    const P = Math.max(0, numBalance);
    const annualR = Math.max(0, numInterestRate) / 100;
    const monthlyR = annualR / 12;

    // Minimum Payment Scenario (Typical card minimum: max(P * min%, $25))
    let minBal = P;
    let minMonths = 0;
    let minTotalInterest = 0;
    let minTotalPaid = 0;
    const minMaxCapMonths = 600; // 50 years cap
    const minPct = typeof minPaymentPercent === 'number' ? minPaymentPercent : 2.5;

    while (minBal > 0.5 && minMonths < minMaxCapMonths) {
      minMonths++;
      const interest = minBal * monthlyR;
      const computedMin = Math.max(25, minBal * (minPct / 100) + interest);
      const payment = Math.min(minBal + interest, computedMin);
      const principal = payment - interest;
      minBal = Math.max(0, minBal - principal);
      minTotalInterest += interest;
      minTotalPaid += payment;
    }

    // Custom Payoff Scenario
    let customMonthly = numFixedMonthly;
    if (payoffType === 'targetMonths') {
      const n = Math.max(1, numTargetMonths);
      if (monthlyR === 0) {
        customMonthly = P / n;
      } else {
        customMonthly = (P * (monthlyR * Math.pow(1 + monthlyR, n))) / (Math.pow(1 + monthlyR, n) - 1);
      }
    }

    let customBal = P;
    let customMonths = 0;
    let customTotalInterest = 0;
    let customTotalPaid = 0;

    while (customBal > 0.01 && customMonths < 600) {
      customMonths++;
      const interest = customBal * monthlyR;
      const payment = Math.min(customBal + interest, Math.max(customMonthly, 1));
      const principal = payment - interest;
      if (principal <= 0) {
        // Payment doesn't even cover interest!
        customMonths = 999;
        break;
      }
      customBal = Math.max(0, customBal - principal);
      customTotalInterest += interest;
      customTotalPaid += payment;
    }

    const interestSaved = Math.max(0, minTotalInterest - customTotalInterest);
    const monthsSaved = Math.max(0, minMonths - customMonths);

    return {
      minMonths,
      minTotalInterest,
      minTotalPaid,
      customMonthly,
      customMonths,
      customTotalInterest,
      customTotalPaid,
      interestSaved,
      monthsSaved
    };
  }, [isInputEmpty, numBalance, numInterestRate, payoffType, numFixedMonthly, numTargetMonths, minPaymentPercent]);

  const handleCopy = async () => {
    if (!calculations) return;
    const text = `Credit Card Payoff Plan:
Balance: ${formatCurrency(numBalance, currencySymbol)} @ ${numInterestRate}% APR
Accelerated Monthly: ${formatCurrency(calculations.customMonthly, currencySymbol)}/mo
Payoff Time: ${calculations.customMonths} Months (${(calculations.customMonths / 12).toFixed(1)} yrs)
Total Interest with Plan: ${formatCurrency(calculations.customTotalInterest, currencySymbol)}
Minimum Payment Trap: Takes ${calculations.minMonths} Months with ${formatCurrency(calculations.minTotalInterest, currencySymbol)} interest
Savings by following plan: ${formatCurrency(calculations.interestSaved, currencySymbol)} and ${calculations.monthsSaved} months faster!`;

    const ok = await copyToClipboard(text);
    if (ok) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleReset = () => {
    setBalance(8500);
    setInterestRate(21.99);
    setPayoffType('fixedMonthly');
    setFixedMonthlyPayment(350);
    setTargetMonths(24);
    setMinPaymentPercent(2.5);
  };

  const handleSave = () => {
    if (!calculations) return;
    if (onSaveCalculation) {
      onSaveCalculation(
        `Credit Card: ${formatCurrency(numBalance, currencySymbol)} @ ${numInterestRate}% → ${formatCurrency(calculations.customMonthly, currencySymbol)}/mo (Payoff in ${calculations.customMonths} mo, saves ${formatCurrency(calculations.interestSaved, currencySymbol)})`,
        { balance, interestRate, payoffType, fixedMonthlyPayment, targetMonths },
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
              <CreditCard className="w-4 h-4 text-rose-600" />
              <span>Credit Card Balance</span>
            </h2>
            <div className="flex items-center gap-2">
              <button
                onClick={handleReset}
                className="text-xs font-semibold text-slate-600 hover:text-slate-900 px-2.5 py-1 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors"
              >
                Reset
              </button>
            </div>
          </div>

          {/* Current Balance */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 flex justify-between">
              <span>Card Balance</span>
              <span className="text-rose-600 font-mono">{formatCurrency(balance, currencySymbol)}</span>
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-sm">{currencySymbol}</span>
              <input
                type="number"
                min="100"
                max="500000"
                step="250"
                value={balance}
                onChange={(e) => setBalance(e.target.value === '' ? '' : Number(e.target.value))}
                className="w-full pl-8 pr-3 py-2 text-sm font-semibold border border-slate-200 rounded-xl bg-slate-50/50 focus:bg-white focus:ring-2 focus:ring-rose-500 focus:outline-none"
              />
            </div>
            <input
              type="range"
              min="500"
              max="30000"
              step="500"
              value={balance}
              onChange={(e) => setBalance(e.target.value === '' ? '' : Number(e.target.value))}
              className="w-full accent-rose-600 cursor-pointer"
            />
          </div>

          {/* Interest Rate APR */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 flex justify-between">
              <span>Annual Percentage Rate (APR)</span>
              <span className="text-rose-600 font-mono">{interestRate}%</span>
            </label>
            <div className="relative">
              <input
                type="number"
                min="1"
                max="45"
                step="0.25"
                value={interestRate}
                onChange={(e) => setInterestRate(e.target.value === '' ? '' : Number(e.target.value))}
                className="w-full pl-3 pr-8 py-2 text-sm font-semibold border border-slate-200 rounded-xl bg-slate-50/50 focus:bg-white focus:ring-2 focus:ring-rose-500 focus:outline-none"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-sm">%</span>
            </div>
          </div>

          {/* Payoff Strategy Selector */}
          <div className="space-y-2 pt-2 border-t border-slate-100">
            <label className="text-xs font-bold text-slate-700">Payoff Strategy</label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setPayoffType('fixedMonthly')}
                className={`p-2 text-left rounded-xl border text-xs font-bold transition-all ${
                  payoffType === 'fixedMonthly'
                    ? 'bg-rose-50 border-rose-400 text-rose-900 shadow-2xs'
                    : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                }`}
              >
                Fixed Monthly Amount
              </button>
              <button
                type="button"
                onClick={() => setPayoffType('targetMonths')}
                className={`p-2 text-left rounded-xl border text-xs font-bold transition-all ${
                  payoffType === 'targetMonths'
                    ? 'bg-rose-50 border-rose-400 text-rose-900 shadow-2xs'
                    : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                }`}
              >
                Target Timeframe
              </button>
            </div>

            {payoffType === 'fixedMonthly' ? (
              <div className="space-y-1 pt-1">
                <label className="text-xs font-semibold text-slate-600 flex justify-between">
                  <span>Your Monthly Payment Budget</span>
                  <span className="text-rose-600 font-mono">{formatCurrency(fixedMonthlyPayment, currencySymbol)}/mo</span>
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-sm">{currencySymbol}</span>
                  <input
                    type="number"
                    min="25"
                    max="10000"
                    step="25"
                    value={fixedMonthlyPayment}
                    onChange={(e) => setFixedMonthlyPayment(e.target.value === '' ? '' : Number(e.target.value))}
                    className="w-full pl-8 pr-3 py-2 text-sm font-semibold border border-slate-200 rounded-xl bg-slate-50/50 focus:bg-white focus:ring-2 focus:ring-rose-500 focus:outline-none"
                  />
                </div>
              </div>
            ) : (
              <div className="space-y-1 pt-1">
                <label className="text-xs font-semibold text-slate-600 flex justify-between">
                  <span>Target Payoff Timeline</span>
                  <span className="text-rose-600 font-mono">{targetMonths} Months ({(targetMonths / 12).toFixed(1)} yrs)</span>
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {[12, 24, 36, 48].map(mo => (
                    <button
                      key={mo}
                      type="button"
                      onClick={() => setTargetMonths(mo)}
                      className={`py-1.5 text-xs font-bold rounded-lg border transition-all ${
                        targetMonths === mo
                          ? 'bg-rose-600 text-white border-rose-600'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {mo} Mo
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Output Results */}
        <div className="lg:col-span-6 space-y-4">
          <div className="bg-gradient-to-br from-slate-900 via-rose-950 to-slate-900 text-white rounded-2xl p-6 shadow-md relative">
            <div className="space-y-4">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-rose-300">
                  Target Debt-Free Timeline
                </span>
                <div className="text-3xl sm:text-4xl font-black tracking-tight text-white mt-1">
                  {calculations ? `${calculations.customMonths} Months` : '—'}
                  {calculations && (
                    <span className="text-sm font-normal text-slate-300 ml-1">
                      ({(calculations.customMonths / 12).toFixed(1)} years)
                    </span>
                  )}
                </div>
                {calculations && (
                  <div className="text-xs font-medium text-orange-300 mt-1">
                    Monthly Payment: {formatCurrency(calculations.customMonthly, currencySymbol)}/mo
                  </div>
                )}
              </div>

              <div className="grid grid-cols-2 gap-3 pt-3 border-t border-rose-900/60">
                <div className="bg-white/10 rounded-xl p-3 backdrop-blur-xs">
                  <span className="text-[10px] text-slate-300 uppercase font-bold block">Total Interest Paid</span>
                  <span className="text-base font-bold text-amber-300 font-mono">
                    {calculations ? formatCurrency(calculations.customTotalInterest, currencySymbol) : '—'}
                  </span>
                </div>
                <div className="bg-white/10 rounded-xl p-3 backdrop-blur-xs">
                  <span className="text-[10px] text-slate-300 uppercase font-bold block">Total Overall Cost</span>
                  <span className="text-base font-bold text-white font-mono">
                    {calculations ? formatCurrency(calculations.customTotalPaid, currencySymbol) : '—'}
                  </span>
                </div>
              </div>

              {/* Minimum Payment comparison box */}
              {calculations && (
                <div className="bg-rose-500/20 border border-rose-400/30 rounded-xl p-3 text-xs space-y-1">
                  <div className="flex items-center gap-1.5 font-bold text-rose-300">
                    <AlertTriangle className="w-4 h-4" />
                    <span>The Minimum Payment Trap</span>
                  </div>
                  <p className="text-slate-200">
                    Paying only the minimum takes <strong>{calculations.minMonths} months</strong> and costs <strong>{formatCurrency(calculations.minTotalInterest, currencySymbol)}</strong> in interest alone!
                  </p>
                  <p className="text-orange-300 font-bold">
                    Your strategy saves {formatCurrency(calculations.interestSaved, currencySymbol)} and {calculations.monthsSaved} months!
                  </p>
                </div>
              )}

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
