import React, { useState, useMemo } from 'react';
import { formatCurrency, formatNumber, copyToClipboard, downloadCsv } from '../../utils/formatters';
import { 
  DollarSign, 
  Percent, 
  Calendar, 
  Download, 
  Copy, 
  Check, 
  Bookmark, 
  RefreshCw,
  PieChart as PieIcon,
  TrendingDown,
  Sparkles
} from 'lucide-react';

interface LoanCalculatorProps {
  currencySymbol?: string;
  onSaveCalculation?: (summary: string, inputs: any, results: any) => void;
}

export const LoanCalculator: React.FC<LoanCalculatorProps> = ({
  currencySymbol = '$',
  onSaveCalculation
}) => {
  const [loanAmount, setLoanAmount] = useState<number | ''>(25000);
  const [interestRate, setInterestRate] = useState<number | ''>(6.5);
  const [loanTermYears, setLoanTermYears] = useState<number | ''>(5);
  const [extraPayment, setExtraPayment] = useState<number | ''>(50);
  const [showAmortization, setShowAmortization] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const [saved, setSaved] = useState<boolean>(false);

  const numLoanAmount = typeof loanAmount === 'number' ? loanAmount : 0;
  const numInterestRate = typeof interestRate === 'number' ? interestRate : 0;
  const numLoanTermYears = typeof loanTermYears === 'number' ? loanTermYears : 0;
  const numExtraPayment = typeof extraPayment === 'number' ? extraPayment : 0;

  const isInputEmpty = loanAmount === '' || interestRate === '' || loanTermYears === '';

  const calculations = useMemo(() => {
    if (isInputEmpty || numLoanAmount <= 0) return null;

    const P = Math.max(0, numLoanAmount);
    const annualR = Math.max(0, numInterestRate) / 100;
    const r = annualR / 12;
    const n = Math.max(1, numLoanTermYears * 12);

    let monthlyPrincipalInterest = 0;
    if (r === 0) {
      monthlyPrincipalInterest = P / n;
    } else {
      monthlyPrincipalInterest = (P * (r * Math.pow(1 + r, n))) / (Math.pow(1 + r, n) - 1);
    }

    // Standard Amortization (no extra payment)
    const baseTotalPayment = monthlyPrincipalInterest * n;
    const baseTotalInterest = Math.max(0, baseTotalPayment - P);

    // Amortization with Extra Monthly Payment
    const schedule: Array<{
      month: number;
      year: number;
      payment: number;
      principal: number;
      interest: number;
      extra: number;
      balance: number;
    }> = [];

    let currentBalance = P;
    let actualMonths = 0;
    let actualTotalInterest = 0;
    let actualTotalPaid = 0;

    for (let m = 1; m <= n && currentBalance > 0.01; m++) {
      const interestForMonth = currentBalance * r;
      let scheduledPrincipal = monthlyPrincipalInterest - interestForMonth;
      if (scheduledPrincipal > currentBalance) {
        scheduledPrincipal = currentBalance;
      }

      let extra = numExtraPayment;
      if (scheduledPrincipal + extra > currentBalance) {
        extra = Math.max(0, currentBalance - scheduledPrincipal);
      }

      const totalPrincipalThisMonth = scheduledPrincipal + extra;
      const paymentThisMonth = totalPrincipalThisMonth + interestForMonth;
      currentBalance = Math.max(0, currentBalance - totalPrincipalThisMonth);

      actualTotalInterest += interestForMonth;
      actualTotalPaid += paymentThisMonth;
      actualMonths = m;

      schedule.push({
        month: m,
        year: Math.ceil(m / 12),
        payment: paymentThisMonth,
        principal: scheduledPrincipal,
        interest: interestForMonth,
        extra,
        balance: currentBalance
      });
    }

    const interestSaved = Math.max(0, baseTotalInterest - actualTotalInterest);
    const monthsSaved = Math.max(0, n - actualMonths);

    return {
      monthlyPayment: monthlyPrincipalInterest,
      totalPaymentWithExtra: monthlyPrincipalInterest + numExtraPayment,
      baseTotalPayment,
      baseTotalInterest,
      actualTotalPaid,
      actualTotalInterest,
      actualMonths,
      interestSaved,
      monthsSaved,
      schedule
    };
  }, [isInputEmpty, numLoanAmount, numInterestRate, numLoanTermYears, numExtraPayment]);

  const handleCopySummary = async () => {
    if (!calculations) return;
    const text = `Loan Calculation Summary:
Loan Amount: ${formatCurrency(numLoanAmount, currencySymbol)}
Interest Rate: ${numInterestRate}%
Term: ${numLoanTermYears} years
Base Monthly Payment: ${formatCurrency(calculations.monthlyPayment, currencySymbol)}
Total Interest: ${formatCurrency(calculations.actualTotalInterest, currencySymbol)}
Total Amount Paid: ${formatCurrency(calculations.actualTotalPaid, currencySymbol)}
${numExtraPayment > 0 ? `Extra Monthly: ${formatCurrency(numExtraPayment, currencySymbol)} (Saves ${formatCurrency(calculations.interestSaved, currencySymbol)} and ${calculations.monthsSaved} months)` : ''}`;
    
    const ok = await copyToClipboard(text);
    if (ok) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDownloadCsv = () => {
    if (!calculations) return;
    const headers = ['Month', 'Year', 'Payment', 'Principal', 'Interest', 'Extra Payment', 'Remaining Balance'];
    const rows = calculations.schedule.map(row => [
      row.month,
      row.year,
      row.payment.toFixed(2),
      row.principal.toFixed(2),
      row.interest.toFixed(2),
      row.extra.toFixed(2),
      row.balance.toFixed(2)
    ]);
    downloadCsv('Loan_Amortization_Schedule.csv', headers, rows);
  };

  const handleSave = () => {
    if (!calculations) return;
    if (onSaveCalculation) {
      onSaveCalculation(
        `Loan: ${formatCurrency(numLoanAmount, currencySymbol)} @ ${numInterestRate}% (${numLoanTermYears} yrs) → ${formatCurrency(calculations.monthlyPayment, currencySymbol)}/mo`,
        { loanAmount, interestRate, loanTermYears, extraPayment },
        calculations
      );
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    }
  };

  const handleReset = () => {
    setLoanAmount(25000);
    setInterestRate(6.5);
    setLoanTermYears(5);
    setExtraPayment(50);
    setShowAmortization(false);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Input Parameters */}
        <div className="lg:col-span-6 bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-2xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-orange-600" />
              <span>Loan Parameters</span>
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

          {/* Loan Amount */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 flex justify-between">
              <span>Loan Amount</span>
              <span className="text-orange-600 font-mono">{loanAmount !== '' ? formatCurrency(loanAmount, currencySymbol) : ''}</span>
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-sm">{currencySymbol}</span>
              <input
                type="number"
                min="0"
                max="5000000"
                step="500"
                value={loanAmount}
                onChange={(e) => setLoanAmount(e.target.value === '' ? '' : Number(e.target.value))}
                placeholder="25000"
                className="w-full pl-8 pr-3 py-2 text-sm font-semibold border border-slate-200 rounded-xl bg-slate-50/50 focus:bg-white focus:ring-2 focus:ring-orange-500 focus:outline-none"
              />
            </div>
            <input
              type="range"
              min="1000"
              max="200000"
              step="1000"
              value={numLoanAmount || 25000}
              onChange={(e) => setLoanAmount(e.target.value === '' ? '' : Number(e.target.value))}
              className="w-full accent-orange-600 cursor-pointer"
            />
          </div>

          {/* Interest Rate */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 flex justify-between">
              <span>Annual Interest Rate (%)</span>
              <span className="text-orange-600 font-mono">{interestRate !== '' ? `${interestRate}%` : ''}</span>
            </label>
            <div className="relative">
              <input
                type="number"
                min="0"
                max="35"
                step="0.1"
                value={interestRate}
                onChange={(e) => setInterestRate(e.target.value === '' ? '' : Number(e.target.value))}
                placeholder="6.5"
                className="w-full pl-3 pr-8 py-2 text-sm font-semibold border border-slate-200 rounded-xl bg-slate-50/50 focus:bg-white focus:ring-2 focus:ring-orange-500 focus:outline-none"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-sm">%</span>
            </div>
            <input
              type="range"
              min="0.1"
              max="25"
              step="0.25"
              value={numInterestRate || 6.5}
              onChange={(e) => setInterestRate(e.target.value === '' ? '' : Number(e.target.value))}
              className="w-full accent-orange-600 cursor-pointer"
            />
          </div>

          {/* Loan Term */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 flex justify-between">
              <span>Loan Term</span>
              <span className="text-orange-600 font-mono">{loanTermYears !== '' ? `${loanTermYears} Years (${numLoanTermYears * 12} Months)` : ''}</span>
            </label>
            <div className="grid grid-cols-4 gap-2">
              {[1, 3, 5, 10].map(yr => (
                <button
                  key={yr}
                  type="button"
                  onClick={() => setLoanTermYears(yr)}
                  className={`py-1.5 text-xs font-bold rounded-lg border transition-all ${
                    loanTermYears === yr
                      ? 'bg-orange-600 text-white border-orange-600 shadow-xs'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {yr} Yrs
                </button>
              ))}
            </div>
            <div className="pt-2">
              <input
                type="range"
                min="1"
                max="30"
                step="1"
                value={numLoanTermYears || 5}
                onChange={(e) => setLoanTermYears(e.target.value === '' ? '' : Number(e.target.value))}
                className="w-full accent-orange-600 cursor-pointer"
              />
            </div>
          </div>

          {/* Extra Monthly Payment */}
          <div className="space-y-1.5 pt-2 border-t border-slate-100">
            <label className="text-xs font-bold text-slate-700 flex justify-between">
              <span className="flex items-center gap-1.5 text-blue-700">
                <Sparkles className="w-3.5 h-3.5" />
                Extra Monthly Payment
              </span>
              <span className="text-blue-700 font-mono">{extraPayment !== '' ? `${formatCurrency(extraPayment, currencySymbol)}/mo` : ''}</span>
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-sm">{currencySymbol}</span>
              <input
                type="number"
                min="0"
                max="10000"
                step="25"
                value={extraPayment}
                onChange={(e) => setExtraPayment(e.target.value === '' ? '' : Number(e.target.value))}
                placeholder="0"
                className="w-full pl-8 pr-3 py-2 text-sm font-semibold border border-slate-200 rounded-xl bg-slate-50/50 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Results & Summary */}
        <div className="lg:col-span-6 space-y-4">
          {/* Main Monthly Payment Box */}
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-2xl p-6 shadow-md relative overflow-hidden">
            {calculations ? (
              <div className="relative z-10 space-y-4">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-300">
                    Monthly Payment
                  </span>
                  <div className="text-3xl sm:text-4xl font-black tracking-tight text-white mt-1">
                    {formatCurrency(calculations.monthlyPayment, currencySymbol)}
                    <span className="text-sm font-normal text-slate-300 ml-1">/month</span>
                  </div>
                  {numExtraPayment > 0 && (
                    <div className="text-xs font-medium text-orange-300 mt-1">
                      + {formatCurrency(numExtraPayment, currencySymbol)} extra = {formatCurrency(calculations.totalPaymentWithExtra, currencySymbol)}/mo
                    </div>
                  )}
                </div>

                {/* Grid Metrics */}
                <div className="grid grid-cols-2 gap-3 pt-3 border-t border-slate-700/80">
                  <div className="bg-white/10 rounded-xl p-3 backdrop-blur-xs">
                    <span className="text-[10px] text-slate-300 uppercase font-bold block">Total Principal</span>
                    <span className="text-base font-bold text-white font-mono">{formatCurrency(numLoanAmount, currencySymbol)}</span>
                  </div>
                  <div className="bg-white/10 rounded-xl p-3 backdrop-blur-xs">
                    <span className="text-[10px] text-slate-300 uppercase font-bold block">Total Interest Paid</span>
                    <span className="text-base font-bold text-orange-300 font-mono">{formatCurrency(calculations.actualTotalInterest, currencySymbol)}</span>
                  </div>
                  <div className="bg-white/10 rounded-xl p-3 backdrop-blur-xs">
                    <span className="text-[10px] text-slate-300 uppercase font-bold block">Total Amount Paid</span>
                    <span className="text-base font-bold text-white font-mono">{formatCurrency(calculations.actualTotalPaid, currencySymbol)}</span>
                  </div>
                  <div className="bg-white/10 rounded-xl p-3 backdrop-blur-xs">
                    <span className="text-[10px] text-slate-300 uppercase font-bold block">Payoff Duration</span>
                    <span className="text-base font-bold text-orange-300 font-mono">
                      {Math.floor(calculations.actualMonths / 12)}y {calculations.actualMonths % 12}m
                    </span>
                  </div>
                </div>

                {/* Extra Payment Benefit Card */}
                {numExtraPayment > 0 && calculations.interestSaved > 0 && (
                  <div className="bg-orange-500/20 border border-orange-400/30 rounded-xl p-3 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <TrendingDown className="w-4 h-4 text-orange-300" />
                      <span>
                        Saves <strong className="text-orange-300">{formatCurrency(calculations.interestSaved, currencySymbol)}</strong> in interest & pays off <strong>{calculations.monthsSaved} months</strong> early!
                      </span>
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex items-center gap-2 pt-2">
                  <button
                    onClick={handleCopySummary}
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

                  <button
                    onClick={handleDownloadCsv}
                    className="py-2 px-3 rounded-xl bg-orange-600 hover:bg-orange-500 text-xs font-bold text-white flex items-center justify-center gap-1.5 transition-colors shadow-xs"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>CSV</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="py-12 text-center space-y-2">
                <p className="text-orange-300 text-sm font-semibold">Please enter a value.</p>
                <p className="text-xs text-slate-400">Fill in the loan amount, interest rate, and term to see loan calculations.</p>
              </div>
            )}
          </div>

          {/* Visual Breakdown Bar */}
          {calculations && (
            <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-2xs space-y-2">
              <div className="flex justify-between text-xs font-bold text-slate-700">
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-orange-500 inline-block"></span>
                  Principal ({Math.round((numLoanAmount / calculations.actualTotalPaid) * 100 || 0)}%)
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-orange-500 inline-block"></span>
                  Interest ({Math.round((calculations.actualTotalInterest / calculations.actualTotalPaid) * 100 || 0)}%)
                </span>
              </div>
              <div className="w-full h-3 rounded-full bg-slate-100 overflow-hidden flex">
                <div 
                  className="bg-orange-500 h-full transition-all"
                  style={{ width: `${(numLoanAmount / calculations.actualTotalPaid) * 100 || 50}%` }}
                />
                <div 
                  className="bg-orange-500 h-full transition-all"
                  style={{ width: `${(calculations.actualTotalInterest / calculations.actualTotalPaid) * 100 || 50}%` }}
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Amortization Table Toggle */}
      {calculations && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
          <div className="p-4 sm:p-5 flex items-center justify-between border-b border-slate-100">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Loan Amortization Schedule</h3>
              <p className="text-xs text-slate-500">Year-by-year and month-by-month principal reduction</p>
            </div>
            <button
              onClick={() => setShowAmortization(!showAmortization)}
              className="px-3.5 py-1.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-xs font-bold text-slate-700 transition-colors"
            >
              {showAmortization ? 'Hide Table' : 'View Schedule'}
            </button>
          </div>

          {showAmortization && (
            <div className="overflow-x-auto max-h-96">
              <table className="w-full text-left text-xs font-medium">
                <thead className="bg-slate-50 text-slate-600 font-bold sticky top-0 border-b border-slate-200">
                  <tr>
                    <th className="p-3">Month</th>
                    <th className="p-3">Payment</th>
                    <th className="p-3">Principal</th>
                    <th className="p-3">Interest</th>
                    {numExtraPayment > 0 && <th className="p-3">Extra</th>}
                    <th className="p-3">Remaining Balance</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {calculations.schedule.map((row) => (
                    <tr key={row.month} className="hover:bg-slate-50/80 font-mono-numbers">
                      <td className="p-3 font-semibold text-slate-700">Mo {row.month} (Yr {row.year})</td>
                      <td className="p-3 text-slate-900">{formatCurrency(row.payment, currencySymbol)}</td>
                      <td className="p-3 text-orange-600">{formatCurrency(row.principal, currencySymbol)}</td>
                      <td className="p-3 text-orange-600">{formatCurrency(row.interest, currencySymbol)}</td>
                      {numExtraPayment > 0 && <td className="p-3 text-blue-600">{formatCurrency(row.extra, currencySymbol)}</td>}
                      <td className="p-3 font-bold text-slate-900">{formatCurrency(row.balance, currencySymbol)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
