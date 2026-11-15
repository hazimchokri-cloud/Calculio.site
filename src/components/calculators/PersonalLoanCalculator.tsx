import React, { useState, useMemo } from 'react';
import { formatCurrency, formatNumber, copyToClipboard, downloadCsv } from '../../utils/formatters';
import { DecimalInput } from '../shared/DecimalInput';
import { 
  DollarSign, 
  Percent, 
  Calendar, 
  Download, 
  Copy, 
  Check, 
  Bookmark, 
  ShieldCheck,
  AlertCircle,
  TrendingDown
} from 'lucide-react';

interface PersonalLoanCalculatorProps {
  currencySymbol?: string;
  onSaveCalculation?: (summary: string, inputs: any, results: any) => void;
}

export const PersonalLoanCalculator: React.FC<PersonalLoanCalculatorProps> = ({
  currencySymbol = '$',
  onSaveCalculation
}) => {
  const [loanAmount, setLoanAmount] = useState<number | ''>(15000);
  const [interestRate, setInterestRate] = useState<number | ''>(11.5);
  const [loanTermMonths, setLoanTermMonths] = useState<number>(36);
  const [originationFeePct, setOriginationFeePct] = useState<number | ''>(3.0);
  const [creditTier, setCreditTier] = useState<string>('good');
  const [copied, setCopied] = useState<boolean>(false);
  const [saved, setSaved] = useState<boolean>(false);

  const numLoanAmount = typeof loanAmount === 'number' ? loanAmount : 0;
  const numInterestRate = typeof interestRate === 'number' ? interestRate : 0;
  const numOriginationFeePct = typeof originationFeePct === 'number' ? originationFeePct : 0;

  const isInputEmpty = loanAmount === '' || interestRate === '';

  const CREDIT_BENCHMARKS: Record<string, { label: string; range: string; typicalApr: number }> = {
    excellent: { label: 'Excellent (750+)', range: '750-850', typicalApr: 8.5 },
    good: { label: 'Good (700-749)', range: '700-749', typicalApr: 12.0 },
    fair: { label: 'Fair (640-699)', range: '640-699', typicalApr: 18.5 },
    poor: { label: 'Poor (<640)', range: '300-639', typicalApr: 28.0 }
  };

  const handleSelectCreditTier = (tier: string) => {
    setCreditTier(tier);
    setInterestRate(CREDIT_BENCHMARKS[tier].typicalApr);
  };

  const calculations = useMemo(() => {
    if (isInputEmpty || numLoanAmount <= 0) return null;

    const P = Math.max(0, numLoanAmount);
    const feePct = Math.max(0, numOriginationFeePct) / 100;
    const originationFee = P * feePct;
    const netCashReceived = Math.max(0, P - originationFee);

    const annualR = Math.max(0, numInterestRate) / 100;
    const monthlyR = annualR / 12;
    const n = Math.max(1, loanTermMonths);

    let monthlyPayment = 0;
    if (monthlyR === 0) {
      monthlyPayment = P / n;
    } else {
      monthlyPayment = (P * (monthlyR * Math.pow(1 + monthlyR, n))) / (Math.pow(1 + monthlyR, n) - 1);
    }

    const totalRepaid = monthlyPayment * n;
    const totalInterest = Math.max(0, totalRepaid - P);
    const totalFinanceCost = totalInterest + originationFee;

    // Effective APR taking origination fee into account (Newton-Raphson)
    let effectiveApr = numInterestRate;
    if (originationFee > 0 && netCashReceived > 0 && monthlyPayment * n > netCashReceived) {
      let rGuess = monthlyR > 0 ? monthlyR : Math.max(0.0005, (monthlyPayment * n - netCashReceived) / (netCashReceived * n * 0.5) / 12);
      for (let i = 0; i < 40; i++) {
        if (rGuess <= 1e-8) break;
        const pow = Math.pow(1 + rGuess, -n);
        const f = (monthlyPayment * (1 - pow)) / rGuess - netCashReceived;
        const fPrime = (monthlyPayment * (n * Math.pow(1 + rGuess, -n - 1) * rGuess - (1 - pow))) / (rGuess * rGuess);
        if (Math.abs(fPrime) < 1e-12) break;
        const rNext = rGuess - f / fPrime;
        if (!Number.isFinite(rNext) || rNext <= 0) break;
        if (Math.abs(rNext - rGuess) < 1e-8) {
          rGuess = rNext;
          break;
        }
        rGuess = rNext;
      }
      effectiveApr = Math.max(numInterestRate, rGuess * 12 * 100);
    }

    return {
      monthlyPayment,
      originationFee,
      netCashReceived,
      totalRepaid,
      totalInterest,
      totalFinanceCost,
      effectiveApr
    };
  }, [isInputEmpty, numLoanAmount, numInterestRate, loanTermMonths, numOriginationFeePct]);

  const handleCopy = async () => {
    if (!calculations) return;
    const text = `Personal Loan Summary:
Requested: ${formatCurrency(numLoanAmount, currencySymbol)}
Net Received: ${formatCurrency(calculations.netCashReceived, currencySymbol)} (Fee: ${formatCurrency(calculations.originationFee, currencySymbol)})
Interest Rate: ${numInterestRate}% (Effective APR: ${calculations.effectiveApr.toFixed(2)}%)
Term: ${loanTermMonths} Months (${(loanTermMonths / 12).toFixed(1)} yrs)
Monthly Payment: ${formatCurrency(calculations.monthlyPayment, currencySymbol)}/mo
Total Interest: ${formatCurrency(calculations.totalInterest, currencySymbol)}
Total Cost: ${formatCurrency(calculations.totalRepaid, currencySymbol)}`;

    const ok = await copyToClipboard(text);
    if (ok) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleSave = () => {
    if (!calculations) return;
    if (onSaveCalculation) {
      onSaveCalculation(
        `Personal Loan: ${formatCurrency(numLoanAmount, currencySymbol)} @ ${numInterestRate}% (${loanTermMonths} mo) → ${formatCurrency(calculations.monthlyPayment, currencySymbol)}/mo`,
        { loanAmount, interestRate, loanTermMonths, originationFeePct },
        calculations
      );
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    }
  };

  const handleReset = () => {
    setLoanAmount(15000);
    setInterestRate(11.5);
    setLoanTermMonths(36);
    setOriginationFeePct(3.0);
    setCreditTier('good');
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Inputs */}
        <div className="lg:col-span-6 bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-2xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-indigo-600" />
              <span>Personal Loan Details</span>
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

          {/* Credit Score Benchmark selector */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700">Estimated Credit Score Tier</label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {Object.entries(CREDIT_BENCHMARKS).map(([key, info]) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => handleSelectCreditTier(key)}
                  className={`p-2 text-left rounded-xl border text-xs transition-all ${
                    creditTier === key
                      ? 'bg-indigo-50 border-indigo-400 text-indigo-900 font-bold shadow-2xs'
                      : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <span className="block text-[10px] text-slate-500 uppercase">{key}</span>
                  <span className="block font-bold mt-0.5">{info.typicalApr}% APR</span>
                </button>
              ))}
            </div>
          </div>

          {/* Loan Amount */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 flex justify-between">
              <span>Loan Amount</span>
              <span className="text-indigo-600 font-mono">{formatCurrency(numLoanAmount, currencySymbol)}</span>
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-sm">{currencySymbol}</span>
              <DecimalInput
                value={loanAmount}
                onValueChange={setLoanAmount}
                placeholder="15000"
                className="w-full pl-8 pr-3 py-2 text-sm font-semibold border border-slate-200 rounded-xl bg-slate-50/50 focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>
            <input
              type="range"
              min="1000"
              max="50000"
              step="1000"
              value={loanAmount === '' ? 1000 : Math.min(50000, Math.max(1000, numLoanAmount))}
              onChange={(e) => setLoanAmount(Number(e.target.value))}
              className="w-full accent-indigo-600 cursor-pointer"
            />
          </div>

          {/* Interest Rate */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 flex justify-between">
              <span>Interest Rate (%)</span>
              <span className="text-indigo-600 font-mono">{interestRate}%</span>
            </label>
            <div className="relative">
              <DecimalInput
                value={interestRate}
                onValueChange={setInterestRate}
                placeholder="11.5"
                className="w-full pl-3 pr-8 py-2 text-sm font-semibold border border-slate-200 rounded-xl bg-slate-50/50 focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-sm">%</span>
            </div>
          </div>

          {/* Loan Term Selection */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 flex justify-between">
              <span>Loan Duration</span>
              <span className="text-indigo-600 font-mono">{loanTermMonths} Months ({(loanTermMonths / 12).toFixed(1)} Yrs)</span>
            </label>
            <div className="grid grid-cols-4 gap-2">
              {[12, 24, 36, 48, 60].map(m => (
                <button
                  key={m}
                  type="button"
                  onClick={() => setLoanTermMonths(m)}
                  className={`py-1.5 text-xs font-bold rounded-lg border transition-all ${
                    loanTermMonths === m
                      ? 'bg-indigo-600 text-white border-indigo-600'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {m} Mo ({m / 12}y)
                </button>
              ))}
            </div>
          </div>

          {/* Origination Fee */}
          <div className="space-y-1.5 pt-2 border-t border-slate-100">
            <label className="text-xs font-bold text-slate-700 flex justify-between">
              <span>Lender Origination Fee (%)</span>
              <span className="text-slate-500 font-mono">{originationFeePct}% ({formatCurrency(calculations ? calculations.originationFee : 0, currencySymbol)})</span>
            </label>
            <div className="relative">
              <DecimalInput
                value={originationFeePct}
                onValueChange={setOriginationFeePct}
                placeholder="3.0"
                className="w-full pl-3 pr-8 py-2 text-sm font-semibold border border-slate-200 rounded-xl bg-slate-50/50 focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-sm">%</span>
            </div>
          </div>
        </div>

        {/* Right Output Results */}
        <div className="lg:col-span-6 space-y-4">
          <div className="bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white rounded-2xl p-6 shadow-md relative overflow-hidden">
            {calculations ? (
              <div className="space-y-4">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-300">
                    Estimated Monthly Payment
                  </span>
                  <div className="text-3xl sm:text-4xl font-black tracking-tight text-white mt-1">
                    {formatCurrency(calculations.monthlyPayment, currencySymbol)}
                    <span className="text-sm font-normal text-slate-300 ml-1">/month</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-3 border-t border-indigo-900/60">
                  <div className="bg-white/10 rounded-xl p-3 backdrop-blur-xs">
                    <span className="text-[10px] text-slate-300 uppercase font-bold block">True Effective APR</span>
                    <span className="text-base font-bold text-orange-300 font-mono">{calculations.effectiveApr.toFixed(2)}%</span>
                  </div>
                  <div className="bg-white/10 rounded-xl p-3 backdrop-blur-xs">
                    <span className="text-[10px] text-slate-300 uppercase font-bold block">Net Cash Disbursed</span>
                    <span className="text-base font-bold text-white font-mono">{formatCurrency(calculations.netCashReceived, currencySymbol)}</span>
                  </div>
                  <div className="bg-white/10 rounded-xl p-3 backdrop-blur-xs">
                    <span className="text-[10px] text-slate-300 uppercase font-bold block">Total Interest Paid</span>
                    <span className="text-base font-bold text-orange-300 font-mono">{formatCurrency(calculations.totalInterest, currencySymbol)}</span>
                  </div>
                  <div className="bg-white/10 rounded-xl p-3 backdrop-blur-xs">
                    <span className="text-[10px] text-slate-300 uppercase font-bold block">Total Repayment</span>
                    <span className="text-base font-bold text-white font-mono">{formatCurrency(calculations.totalRepaid, currencySymbol)}</span>
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
            ) : (
              <div className="py-8 text-center space-y-2">
                <p className="text-orange-300 font-semibold text-sm">Please enter a value.</p>
                <p className="text-slate-400 text-xs">Enter a valid loan amount and interest rate.</p>
              </div>
            )}
          </div>

          {calculations && (
            <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-2xs space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">Personal Loan Cost Breakdown</h3>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-600">Borrowed Principal</span>
                  <span className="font-bold text-slate-900 font-mono">{formatCurrency(numLoanAmount, currencySymbol)}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-600">Origination Fee (Deducted upfront)</span>
                  <span className="font-bold text-rose-600 font-mono">- {formatCurrency(calculations.originationFee, currencySymbol)}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-600">Net Cash In Your Bank</span>
                  <span className="font-bold text-orange-700 font-mono">{formatCurrency(calculations.netCashReceived, currencySymbol)}</span>
                </div>
                <div className="flex justify-between py-1 pt-2 font-bold">
                  <span className="text-slate-800">Total Finance Charges</span>
                  <span className="text-indigo-600 font-mono">{formatCurrency(calculations.totalFinanceCost, currencySymbol)}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
