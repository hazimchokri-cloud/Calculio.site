import React, { useState, useMemo } from 'react';
import { formatCurrency, formatNumber, downloadCsv, copyToClipboard } from '../../utils/formatters';
import { TrendingUp, DollarSign, Calendar, Percent, Copy, Check, ShieldCheck, FileSpreadsheet, ArrowUpRight } from 'lucide-react';
import confetti from 'canvas-confetti';

interface CompoundInterestProps {
  currencySymbol?: string;
  onSaveCalculation?: (summary: string, inputs: any, results: any) => void;
}

export const CompoundInterestCalculator: React.FC<CompoundInterestProps> = ({
  currencySymbol = '$',
  onSaveCalculation
}) => {
  const [initialPrincipal, setInitialPrincipal] = useState<number | ''>(10000);
  const [monthlyContribution, setMonthlyContribution] = useState<number | ''>(500);
  const [interestRate, setInterestRate] = useState<number | ''>(8.0);
  const [years, setYears] = useState<number | ''>(20);
  const [compoundFrequency, setCompoundFrequency] = useState<number>(12); // 12 = monthly, 1 = annually, 4 = quarterly, 365 = daily
  const [copied, setCopied] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const numInitialPrincipal = typeof initialPrincipal === 'number' ? initialPrincipal : 0;
  const numMonthlyContribution = typeof monthlyContribution === 'number' ? monthlyContribution : 0;
  const numInterestRate = typeof interestRate === 'number' ? interestRate : 0;
  const numYears = typeof years === 'number' ? years : 0;

  const isInputEmpty = initialPrincipal === '' || interestRate === '' || years === '';

  const results = useMemo(() => {
    if (isInputEmpty || (numInitialPrincipal <= 0 && numMonthlyContribution <= 0) || numYears <= 0) {
      return null;
    }

    const P = Math.max(0, numInitialPrincipal);
    const PMT = Math.max(0, numMonthlyContribution);
    const r = Math.max(0, numInterestRate) / 100;
    const n = Math.max(1, compoundFrequency);
    const t = Math.max(1, numYears);

    // Effective monthly compounding rate matching compoundFrequency n
    const monthlyRate = r === 0 ? 0 : Math.pow(1 + r / n, n / 12) - 1;

    let balance = P;
    let totalContributed = P;

    const yearlyData: {
      year: number;
      startingBalance: number;
      depositsThisYear: number;
      interestThisYear: number;
      endingBalance: number;
      totalDeposits: number;
      totalInterest: number;
    }[] = [];

    let runningTotalInterest = 0;

    for (let yr = 1; yr <= t; yr++) {
      const starting = balance;
      let yearlyDeposits = 0;
      let yrInterest = 0;

      // Calculate compounding month by month
      for (let m = 1; m <= 12; m++) {
        balance += PMT;
        yearlyDeposits += PMT;
        totalContributed += PMT;

        // Interest compounding step
        const interestEarned = balance * monthlyRate;
        balance += interestEarned;
        yrInterest += interestEarned;
      }

      runningTotalInterest += yrInterest;

      yearlyData.push({
        year: yr,
        startingBalance: starting,
        depositsThisYear: yearlyDeposits,
        interestThisYear: yrInterest,
        endingBalance: balance,
        totalDeposits: totalContributed,
        totalInterest: runningTotalInterest
      });
    }

    const finalFutureValue = balance;
    const totalInterestEarned = Math.max(0, finalFutureValue - totalContributed);
    const multiplier = totalContributed > 0 ? (finalFutureValue / totalContributed).toFixed(2) : '1.00';

    return {
      finalFutureValue,
      totalContributed,
      totalInterestEarned,
      multiplier,
      yearlyData
    };
  }, [isInputEmpty, numInitialPrincipal, numMonthlyContribution, numInterestRate, numYears, compoundFrequency]);

  const handleCopy = async () => {
    if (!results) return;
    const text = `Compound Interest Projection:
• Initial Deposit: ${formatCurrency(numInitialPrincipal, currencySymbol)}
• Monthly Contribution: ${formatCurrency(numMonthlyContribution, currencySymbol)}
• Return Rate: ${numInterestRate}% (${numYears} Years)
• Future Portfolio Value: ${formatCurrency(results.finalFutureValue, currencySymbol)}
• Total Principal Contributed: ${formatCurrency(results.totalContributed, currencySymbol)}
• Total Interest / Gains: ${formatCurrency(results.totalInterestEarned, currencySymbol)} (${results.multiplier}x return)`;

    const ok = await copyToClipboard(text);
    if (ok) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleExportCsv = () => {
    if (!results) return;
    const headers = ['Year', 'Starting Balance', 'Annual Deposits', 'Interest Earned', 'Ending Balance', 'Total Contributed', 'Total Interest'];
    const rows = results.yearlyData.map(d => [
      d.year.toString(),
      d.startingBalance.toFixed(2),
      d.depositsThisYear.toFixed(2),
      d.interestThisYear.toFixed(2),
      d.endingBalance.toFixed(2),
      d.totalDeposits.toFixed(2),
      d.totalInterest.toFixed(2)
    ]);
    downloadCsv(`compound_interest_${numYears}yr_${numInterestRate}pct.csv`, [headers, ...rows]);
  };

  const handleSave = () => {
    if (!results) return;
    if (onSaveCalculation) {
      onSaveCalculation(
        `Compound Interest: ${formatCurrency(results.finalFutureValue, currencySymbol)} after ${numYears} years`,
        { initialPrincipal, monthlyContribution, interestRate, years },
        { futureValue: results.finalFutureValue, interestEarned: results.totalInterestEarned }
      );
      setSavedSuccess(true);
      confetti({ particleCount: 40, spread: 60, origin: { y: 0.8 } });
      setTimeout(() => setSavedSuccess(false), 2500);
    }
  };

  const depositPercent = results && results.finalFutureValue > 0 ? (results.totalContributed / results.finalFutureValue) * 100 : 0;
  const interestPercent = results && results.finalFutureValue > 0 ? (results.totalInterestEarned / results.finalFutureValue) * 100 : 0;

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Controls Column */}
        <div className="lg:col-span-7 bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <h3 className="text-lg font-bold text-slate-900">Investment Strategy</h3>
              <p className="text-xs text-slate-700">Project your wealth accumulation with the power of exponential growth.</p>
            </div>
            <button
              onClick={() => {
                setInitialPrincipal(10000);
                setMonthlyContribution(500);
                setInterestRate(8.0);
                setYears(20);
                setCompoundFrequency(12);
              }}
              className="text-xs font-semibold text-slate-700 hover:text-slate-900 px-2.5 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors"
            >
              Reset
            </button>
          </div>

          {/* Initial Principal */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-sm font-semibold text-slate-700 flex items-center gap-1.5">
                <DollarSign className="w-4 h-4 text-orange-600" />
                Initial Starting Principal
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-700 text-sm font-semibold">{currencySymbol}</span>
                <input
                  type="number"
                  min="0"
                  max="10000000"
                  step="500"
                  value={initialPrincipal}
                  onChange={(e) => setInitialPrincipal(e.target.value === '' ? '' : Number(e.target.value))}
                  placeholder="10000"
                  className="w-36 pl-7 pr-3 py-1.5 text-right font-mono-numbers font-semibold text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 bg-slate-50/50"
                />
              </div>
            </div>
            <input
              type="range"
              min="0"
              max="200000"
              step="1000"
              value={numInitialPrincipal || 10000}
              onChange={(e) => setInitialPrincipal(e.target.value === '' ? '' : Number(e.target.value))}
              className="w-full accent-orange-600 cursor-pointer h-2 bg-slate-200 rounded-lg"
            />
          </div>

          {/* Monthly Contribution */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-sm font-semibold text-slate-700 flex items-center gap-1.5">
                <TrendingUp className="w-4 h-4 text-orange-600" />
                Monthly Contribution
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-700 text-sm font-semibold">{currencySymbol}</span>
                <input
                  type="number"
                  min="0"
                  max="50000"
                  step="50"
                  value={monthlyContribution}
                  onChange={(e) => setMonthlyContribution(e.target.value === '' ? '' : Number(e.target.value))}
                  placeholder="500"
                  className="w-36 pl-7 pr-3 py-1.5 text-right font-mono-numbers font-semibold text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 bg-slate-50/50"
                />
              </div>
            </div>
            <input
              type="range"
              min="0"
              max="5000"
              step="50"
              value={numMonthlyContribution || 500}
              onChange={(e) => setMonthlyContribution(e.target.value === '' ? '' : Number(e.target.value))}
              className="w-full accent-orange-600 cursor-pointer h-2 bg-slate-200 rounded-lg"
            />
          </div>

          {/* Rate & Duration Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-slate-700 flex items-center gap-1.5">
                <Percent className="w-4 h-4 text-orange-600" />
                Estimated Annual Return Rate
              </label>
              <div className="relative">
                <input
                  type="number"
                  min="0"
                  max="30"
                  step="0.1"
                  value={interestRate}
                  onChange={(e) => setInterestRate(e.target.value === '' ? '' : Number(e.target.value))}
                  placeholder="8.0"
                  className="w-full pl-3 pr-7 py-2 font-mono-numbers font-semibold text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 bg-slate-50/50"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-700 text-sm font-bold">%</span>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-slate-700 flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-orange-600" />
                Investment Horizon
              </label>
              <div className="relative">
                <input
                  type="number"
                  min="1"
                  max="60"
                  value={years}
                  onChange={(e) => setYears(e.target.value === '' ? '' : Number(e.target.value))}
                  placeholder="20"
                  className="w-full pl-3 pr-14 py-2 font-mono-numbers font-semibold text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 bg-slate-50/50"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-700 text-sm font-medium">Years</span>
              </div>
            </div>
          </div>

          {/* Compound Frequency Selector */}
          <div className="space-y-1.5 pt-2 border-t border-slate-100">
            <label className="text-xs font-semibold text-slate-700 block">Compounding Interval</label>
            <div className="grid grid-cols-4 gap-2 text-xs">
              {[
                { label: 'Annually', val: 1 },
                { label: 'Quarterly', val: 4 },
                { label: 'Monthly', val: 12 },
                { label: 'Daily', val: 365 }
              ].map(item => (
                <button
                  key={item.val}
                  type="button"
                  onClick={() => setCompoundFrequency(item.val)}
                  className={`py-2 rounded-lg border font-semibold transition-all ${
                    compoundFrequency === item.val
                      ? 'bg-orange-600 text-white border-orange-600 shadow-2xs'
                      : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results Card */}
        <div className="lg:col-span-5 space-y-5">
          <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-teal-950 text-white rounded-2xl p-6 sm:p-7 shadow-lg relative overflow-hidden">
            <div className="absolute -right-8 -bottom-8 w-40 h-40 bg-teal-500/10 rounded-full blur-2xl pointer-events-none" />

            {results ? (
              <>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold uppercase tracking-wider text-teal-300 flex items-center gap-1">
                    <ArrowUpRight className="w-4 h-4" />
                    Projected Future Balance
                  </span>
                  <span className="px-2 py-0.5 text-xs font-bold bg-teal-500/20 text-teal-300 rounded border border-teal-500/30">
                    {numYears} Years @ {numInterestRate}%
                  </span>
                </div>

                <div className="text-4xl sm:text-5xl font-black font-mono-numbers tracking-tight text-white mb-6">
                  {formatCurrency(results.finalFutureValue, currencySymbol)}
                </div>

                {/* Split Bar */}
                <div className="space-y-2 mb-6">
                  <div className="h-3 w-full bg-slate-700 rounded-full overflow-hidden flex">
                    <div style={{ width: `${depositPercent}%` }} className="bg-blue-400 h-full transition-all" title="Total Contributions" />
                    <div style={{ width: `${interestPercent}%` }} className="bg-orange-400 h-full transition-all" title="Total Interest Gains" />
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-xs pt-1">
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-1.5 text-slate-300">
                        <span className="w-2 h-2 rounded-full bg-blue-400" />
                        <span>Total Deposits:</span>
                      </div>
                      <div className="font-bold text-white font-mono-numbers text-sm">
                        {formatCurrency(results.totalContributed, currencySymbol)}
                      </div>
                      <span className="text-[10px] text-slate-400 font-mono-numbers">{depositPercent.toFixed(1)}% of balance</span>
                    </div>

                    <div className="space-y-0.5">
                      <div className="flex items-center gap-1.5 text-slate-300">
                        <span className="w-2 h-2 rounded-full bg-orange-400" />
                        <span>Interest & Gains:</span>
                      </div>
                      <div className="font-bold text-orange-300 font-mono-numbers text-sm">
                        {formatCurrency(results.totalInterestEarned, currencySymbol)}
                      </div>
                      <span className="text-[10px] text-orange-400 font-mono-numbers">{interestPercent.toFixed(1)}% of balance</span>
                    </div>
                  </div>
                </div>

                <div className="border-t border-slate-700 pt-4 flex items-center justify-between text-xs text-slate-300">
                  <span>Overall Wealth Growth Multiplier:</span>
                  <span className="text-base font-bold text-orange-400 font-mono-numbers">{results.multiplier}x Principal</span>
                </div>
              </>
            ) : (
              <div className="py-12 text-center space-y-2">
                <p className="text-orange-300 text-sm font-semibold">Please enter a value.</p>
                <p className="text-xs text-slate-400">Fill in principal, interest rate, and years to calculate compound interest.</p>
              </div>
            )}
          </div>

          {/* Action buttons */}
          {results && (
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={handleCopy}
                className="flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold transition-all shadow-2xs"
              >
                {copied ? <Check className="w-4 h-4 text-orange-600" /> : <Copy className="w-4 h-4 text-slate-700" />}
                {copied ? 'Copied' : 'Copy Summary'}
              </button>

              <button
                onClick={handleExportCsv}
                className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold transition-all shadow-2xs"
              >
                <FileSpreadsheet className="w-4 h-4 text-orange-600" />
                Export CSV
              </button>

              <button
                onClick={handleSave}
                className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold transition-all shadow-2xs"
              >
                <ShieldCheck className="w-4 h-4" />
                {savedSuccess ? 'Saved!' : 'Save Result'}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Yearly Table */}
      {results && (
        <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs space-y-4">
          <h3 className="text-base font-bold text-slate-900">Year-by-Year Growth Table</h3>
          <div className="overflow-x-auto max-h-80 overflow-y-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-700 font-bold sticky top-0 border-b border-slate-200">
                <tr>
                  <th className="py-2.5 px-3">Year</th>
                  <th className="py-2.5 px-3">Starting Balance</th>
                  <th className="py-2.5 px-3">Annual Additions</th>
                  <th className="py-2.5 px-3">Interest Earned</th>
                  <th className="py-2.5 px-3">Total Invested</th>
                  <th className="py-2.5 px-3 text-right">Ending Balance</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-mono-numbers">
                {results.yearlyData.map((row) => (
                  <tr key={row.year} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-2.5 px-3 font-semibold text-slate-900">Year {row.year}</td>
                    <td className="py-2.5 px-3 text-slate-600">{formatCurrency(row.startingBalance, currencySymbol)}</td>
                    <td className="py-2.5 px-3 text-blue-600 font-medium">{formatCurrency(row.depositsThisYear, currencySymbol)}</td>
                    <td className="py-2.5 px-3 text-orange-600 font-medium">+{formatCurrency(row.interestThisYear, currencySymbol)}</td>
                    <td className="py-2.5 px-3 text-slate-600">{formatCurrency(row.totalDeposits, currencySymbol)}</td>
                    <td className="py-2.5 px-3 text-right font-bold text-slate-900">{formatCurrency(row.endingBalance, currencySymbol)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
