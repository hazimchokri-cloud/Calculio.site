import React, { useState, useMemo } from 'react';
import { formatCurrency, formatNumber, copyToClipboard, downloadCsv } from '../../utils/formatters';
import { Table, Calendar, Download, Copy, Check, Bookmark, DollarSign, TrendingDown } from 'lucide-react';

interface AmortizationCalculatorProps {
  currencySymbol?: string;
  onSaveCalculation?: (summary: string, inputs: any, results: any) => void;
}

export const AmortizationCalculator: React.FC<AmortizationCalculatorProps> = ({
  currencySymbol = '$',
  onSaveCalculation
}) => {
  const [loanAmount, setLoanAmount] = useState<number | ''>(300000);
  const [interestRate, setInterestRate] = useState<number | ''>(6.25);
  const [loanTermYears, setLoanTermYears] = useState<number | ''>(30);
  const [extraPaymentMonthly, setExtraPaymentMonthly] = useState<number | ''>(100);
  const [viewBy, setViewBy] = useState<'monthly' | 'yearly'>('yearly');
  const [copied, setCopied] = useState<boolean>(false);
  const [saved, setSaved] = useState<boolean>(false);

  const numLoanAmount = typeof loanAmount === 'number' ? loanAmount : 0;
  const numInterestRate = typeof interestRate === 'number' ? interestRate : 0;
  const numLoanTermYears = typeof loanTermYears === 'number' ? loanTermYears : 0;
  const numExtraPaymentMonthly = typeof extraPaymentMonthly === 'number' ? extraPaymentMonthly : 0;

  const isInputEmpty = loanAmount === '' || interestRate === '' || loanTermYears === '';

  const calculations = useMemo(() => {
    if (isInputEmpty || numLoanAmount <= 0 || numLoanTermYears <= 0) return null;
    const P = Math.max(0, numLoanAmount);
    const annualR = Math.max(0, numInterestRate) / 100;
    const r = annualR / 12;
    const n = Math.max(1, numLoanTermYears * 12);

    let monthlyPayment = 0;
    if (r === 0) {
      monthlyPayment = P / n;
    } else {
      monthlyPayment = (P * (r * Math.pow(1 + r, n))) / (Math.pow(1 + r, n) - 1);
    }

    const monthlySchedule: Array<{
      month: number;
      year: number;
      payment: number;
      principal: number;
      interest: number;
      extra: number;
      balance: number;
      totalInterestToDate: number;
    }> = [];

    const yearlySchedule: Array<{
      year: number;
      totalPayment: number;
      principalPaid: number;
      interestPaid: number;
      endingBalance: number;
    }> = [];

    let currentBalance = P;
    let totalInterestAccum = 0;
    let actualMonths = 0;

    let currYearInterest = 0;
    let currYearPrincipal = 0;
    let currYearPayment = 0;

    for (let m = 1; m <= n && currentBalance > 0.01; m++) {
      actualMonths = m;
      const interestThisMonth = currentBalance * r;
      let principalThisMonth = monthlyPayment - interestThisMonth;
      if (principalThisMonth > currentBalance) principalThisMonth = currentBalance;

      let extra = numExtraPaymentMonthly;
      if (principalThisMonth + extra > currentBalance) {
        extra = Math.max(0, currentBalance - principalThisMonth);
      }

      const totalPrincipal = principalThisMonth + extra;
      const totalPaymentMonth = totalPrincipal + interestThisMonth;
      currentBalance = Math.max(0, currentBalance - totalPrincipal);
      totalInterestAccum += interestThisMonth;

      currYearInterest += interestThisMonth;
      currYearPrincipal += totalPrincipal;
      currYearPayment += totalPaymentMonth;

      const yr = Math.ceil(m / 12);

      monthlySchedule.push({
        month: m,
        year: yr,
        payment: totalPaymentMonth,
        principal: principalThisMonth,
        interest: interestThisMonth,
        extra,
        balance: currentBalance,
        totalInterestToDate: totalInterestAccum
      });

      if (m % 12 === 0 || currentBalance <= 0.01 || m === n) {
        yearlySchedule.push({
          year: yr,
          totalPayment: currYearPayment,
          principalPaid: currYearPrincipal,
          interestPaid: currYearInterest,
          endingBalance: currentBalance
        });
        currYearInterest = 0;
        currYearPrincipal = 0;
        currYearPayment = 0;
      }
    }

    return {
      monthlyPayment,
      totalInterestAccum,
      totalPaid: P + totalInterestAccum,
      actualMonths,
      monthlySchedule,
      yearlySchedule
    };
  }, [isInputEmpty, numLoanAmount, numInterestRate, numLoanTermYears, numExtraPaymentMonthly]);

  const handleDownload = () => {
    if (!calculations) return;
    const headers = ['Month', 'Year', 'Payment', 'Principal', 'Interest', 'Extra', 'Balance', 'Cumulative Interest'];
    const rows = calculations.monthlySchedule.map(r => [
      r.month,
      r.year,
      r.payment.toFixed(2),
      r.principal.toFixed(2),
      r.interest.toFixed(2),
      r.extra.toFixed(2),
      r.balance.toFixed(2),
      r.totalInterestToDate.toFixed(2)
    ]);
    downloadCsv('Amortization_Schedule.csv', headers, rows);
  };

  const handleCopy = async () => {
    if (!calculations) return;
    const text = `Amortization Schedule:
Loan Amount: ${formatCurrency(numLoanAmount, currencySymbol)}
Interest Rate: ${numInterestRate}% (${numLoanTermYears} Years)
Monthly Payment: ${formatCurrency(calculations.monthlyPayment, currencySymbol)}/mo
Total Interest: ${formatCurrency(calculations.totalInterestAccum, currencySymbol)}
Total Paid: ${formatCurrency(calculations.totalPaid, currencySymbol)}
Payoff Duration: ${calculations.actualMonths} Months (${(calculations.actualMonths / 12).toFixed(1)} Years)`;

    const ok = await copyToClipboard(text);
    if (ok) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleReset = () => {
    setLoanAmount(300000);
    setInterestRate(6.25);
    setLoanTermYears(30);
    setExtraPaymentMonthly(100);
    setViewBy('yearly');
  };

  return (
    <div className="space-y-6">
      {/* Parameters */}
      <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-2xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Table className="w-4 h-4 text-blue-600" />
            <span>Amortization Schedule Calculator</span>
          </h2>
          <div className="flex items-center gap-2">
            <button
              onClick={handleReset}
              className="text-xs font-semibold text-slate-600 hover:text-slate-900 px-2.5 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors"
            >
              Reset
            </button>
            <button
              onClick={handleDownload}
              disabled={!calculations}
              className="px-3 py-1.5 rounded-xl bg-orange-600 hover:bg-orange-500 disabled:opacity-50 disabled:cursor-not-allowed text-white text-xs font-bold flex items-center gap-1.5 transition-colors shadow-2xs"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export CSV</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700">Loan Amount</label>
            <input
              type="number"
              value={loanAmount}
              onChange={(e) => setLoanAmount(e.target.value === '' ? '' : Number(e.target.value))}
              className="w-full p-2 text-xs font-semibold border border-slate-200 rounded-xl bg-slate-50/50 focus:bg-white focus:outline-none"
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700">Interest Rate (%)</label>
            <input
              type="number"
              step="0.1"
              value={interestRate}
              onChange={(e) => setInterestRate(e.target.value === '' ? '' : Number(e.target.value))}
              className="w-full p-2 text-xs font-semibold border border-slate-200 rounded-xl bg-slate-50/50 focus:bg-white focus:outline-none"
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700">Term (Years)</label>
            <input
              type="number"
              value={loanTermYears}
              onChange={(e) => setLoanTermYears(e.target.value === '' ? '' : Number(e.target.value))}
              className="w-full p-2 text-xs font-semibold border border-slate-200 rounded-xl bg-slate-50/50 focus:bg-white focus:outline-none"
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700">Extra Monthly</label>
            <input
              type="number"
              value={extraPaymentMonthly}
              onChange={(e) => setExtraPaymentMonthly(e.target.value === '' ? '' : Number(e.target.value))}
              className="w-full p-2 text-xs font-semibold border border-slate-200 rounded-xl bg-slate-50/50 focus:bg-white focus:outline-none"
            />
          </div>
        </div>

        {calculations ? (
        <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
          <div className="flex gap-4">
            <span>Monthly Payment: <strong className="text-slate-900 font-mono">{formatCurrency(calculations.monthlyPayment, currencySymbol)}</strong></span>
            <span>Total Interest: <strong className="text-amber-600 font-mono">{formatCurrency(calculations.totalInterestAccum, currencySymbol)}</strong></span>
          </div>

          <div className="flex rounded-lg bg-slate-100 p-0.5 font-bold">
            <button
              onClick={() => setViewBy('yearly')}
              className={`px-2.5 py-1 rounded-md transition-all ${viewBy === 'yearly' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600'}`}
            >
              Annual Summary
            </button>
            <button
              onClick={() => setViewBy('monthly')}
              className={`px-2.5 py-1 rounded-md transition-all ${viewBy === 'monthly' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600'}`}
            >
              Monthly Details
            </button>
          </div>
        </div>
        ) : (
          <div className="py-4 text-center border-t border-slate-100 text-xs text-amber-600 font-semibold">Please enter a value.</div>
        )}
      </div>

      {/* Table Component */}
      {calculations && (
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto max-h-96">
          {viewBy === 'yearly' ? (
            <table className="w-full text-left text-xs font-mono-numbers">
              <thead className="bg-slate-50 text-slate-600 font-bold sticky top-0 border-b border-slate-200">
                <tr>
                  <th className="p-3">Year</th>
                  <th className="p-3">Total Payment</th>
                  <th className="p-3">Principal Paid</th>
                  <th className="p-3">Interest Paid</th>
                  <th className="p-3">Ending Balance</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {calculations.yearlySchedule.map(row => (
                  <tr key={row.year} className="hover:bg-slate-50/80">
                    <td className="p-3 font-bold text-slate-900">Year {row.year}</td>
                    <td className="p-3 text-slate-900">{formatCurrency(row.totalPayment, currencySymbol)}</td>
                    <td className="p-3 text-orange-600">{formatCurrency(row.principalPaid, currencySymbol)}</td>
                    <td className="p-3 text-amber-600">{formatCurrency(row.interestPaid, currencySymbol)}</td>
                    <td className="p-3 font-bold text-slate-900">{formatCurrency(row.endingBalance, currencySymbol)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <table className="w-full text-left text-xs font-mono-numbers">
              <thead className="bg-slate-50 text-slate-600 font-bold sticky top-0 border-b border-slate-200">
                <tr>
                  <th className="p-3">Month</th>
                  <th className="p-3">Payment</th>
                  <th className="p-3">Principal</th>
                  <th className="p-3">Interest</th>
                  {numExtraPaymentMonthly > 0 && <th className="p-3">Extra</th>}
                  <th className="p-3">Balance</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {calculations.monthlySchedule.map(row => (
                  <tr key={row.month} className="hover:bg-slate-50/80">
                    <td className="p-3 font-bold text-slate-700">Mo {row.month} (Yr {row.year})</td>
                    <td className="p-3">{formatCurrency(row.payment, currencySymbol)}</td>
                    <td className="p-3 text-orange-600">{formatCurrency(row.principal, currencySymbol)}</td>
                    <td className="p-3 text-amber-600">{formatCurrency(row.interest, currencySymbol)}</td>
                    {numExtraPaymentMonthly > 0 && <td className="p-3 text-blue-600">{formatCurrency(row.extra, currencySymbol)}</td>}
                    <td className="p-3 font-bold text-slate-900">{formatCurrency(row.balance, currencySymbol)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
      )}
    </div>
  );
};
