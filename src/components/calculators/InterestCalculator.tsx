import React, { useState, useMemo } from 'react';
import { formatCurrency, copyToClipboard } from '../../utils/formatters';
import { Percent, Copy, Check, Bookmark, TrendingUp, AlertTriangle } from 'lucide-react';

interface InterestCalculatorProps {
  currencySymbol?: string;
  onSaveCalculation?: (summary: string, inputs: any, results: any) => void;
}

export const InterestCalculator: React.FC<InterestCalculatorProps> = ({
  currencySymbol = '$',
  onSaveCalculation
}) => {
  const [principal, setPrincipal] = useState<number | ''>(10000);
  const [interestRate, setInterestRate] = useState<number | ''>(7.0);
  const [timeYears, setTimeYears] = useState<number | ''>(10);
  const [compoundFreq, setCompoundFreq] = useState<number | ''>(12); // 1 = annual, 4 = quarterly, 12 = monthly, 365 = daily
  const [copied, setCopied] = useState<boolean>(false);
  const [saved, setSaved] = useState<boolean>(false);

  const isInputEmpty = principal === '' || interestRate === '' || timeYears === '';

  const calculations = useMemo(() => {
    // If any input is cleared, silently hide results with no error
    if (isInputEmpty) {
      return null;
    }

    try {
      const P = Number(principal);
      const r = Number(interestRate) / 100;
      const t = Number(timeYears);
      const n = Number(compoundFreq) > 0 ? Number(compoundFreq) : 12;

      // Validate inputs are valid finite positive numbers
      if (isNaN(P) || isNaN(r) || isNaN(t) || isNaN(n) || P < 0 || t <= 0) {
        return null;
      }

      // Simple interest: I = P * r * t
      const simpleInterest = P * r * t;
      const simpleTotal = P + simpleInterest;

      // Compound interest: A = P * (1 + r/n)^(n*t)
      const compoundTotal = P * Math.pow(1 + r / n, n * t);
      const compoundInterest = Math.max(0, compoundTotal - P);
      const compoundDifference = Math.max(0, compoundInterest - simpleInterest);

      if (!isFinite(simpleTotal) || !isFinite(compoundTotal) || isNaN(compoundTotal)) {
        return null;
      }

      // Rule of 72
      const yearsToDouble = r > 0 ? 72 / (r * 100) : 0;

      // Year-by-year comparison
      const clampedYears = Math.min(100, Math.round(t));
      const yearlyBreakdown: Array<{
        year: number;
        simpleValue: number;
        compoundValue: number;
        interestEarnedYear: number;
      }> = [];

      let prevCompoundVal = P;
      for (let y = 1; y <= clampedYears; y++) {
        const sVal = P + P * r * y;
        const cVal = P * Math.pow(1 + r / n, n * y);
        yearlyBreakdown.push({
          year: y,
          simpleValue: sVal,
          compoundValue: cVal,
          interestEarnedYear: cVal - prevCompoundVal
        });
        prevCompoundVal = cVal;
      }

      return {
        simpleInterest,
        simpleTotal,
        compoundInterest,
        compoundTotal,
        compoundDifference,
        yearsToDouble,
        yearlyBreakdown
      };
    } catch {
      return null;
    }
  }, [isInputEmpty, principal, interestRate, timeYears, compoundFreq]);

  const numPrincipal = typeof principal === 'number' ? principal : 0;
  const numInterestRate = typeof interestRate === 'number' ? interestRate : 0;
  const numTimeYears = typeof timeYears === 'number' ? timeYears : 0;

  const handleCopy = async () => {
    if (!calculations) return;
    const text = `Interest Comparison (${numTimeYears} Years @ ${numInterestRate}%):
Principal: ${formatCurrency(numPrincipal, currencySymbol)}
Compound Interest Earned: ${formatCurrency(calculations.compoundInterest, currencySymbol)} (Total: ${formatCurrency(calculations.compoundTotal, currencySymbol)})
Simple Interest Earned: ${formatCurrency(calculations.simpleInterest, currencySymbol)} (Total: ${formatCurrency(calculations.simpleTotal, currencySymbol)})
Compounding Advantage: +${formatCurrency(calculations.compoundDifference, currencySymbol)}
Estimated Time to Double: ~${calculations.yearsToDouble > 0 ? `${calculations.yearsToDouble.toFixed(1)} years` : 'N/A'}`;

    const ok = await copyToClipboard(text);
    if (ok) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleReset = () => {
    setPrincipal(10000);
    setInterestRate(7.0);
    setTimeYears(10);
    setCompoundFreq(12);
  };

  const handleSave = () => {
    if (!calculations) return;
    if (onSaveCalculation) {
      onSaveCalculation(
        `Interest: ${formatCurrency(numPrincipal, currencySymbol)} @ ${numInterestRate}% (${numTimeYears} yrs) → Compound ${formatCurrency(calculations.compoundTotal, currencySymbol)} vs Simple ${formatCurrency(calculations.simpleTotal, currencySymbol)}`,
        { principal, interestRate, timeYears, compoundFreq },
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
              <Percent className="w-4 h-4 text-blue-600" />
              <span>Interest Calculator</span>
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

          {/* Principal */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 flex justify-between">
              <span>Principal Amount</span>
              <span className="text-blue-600 font-mono">{principal !== '' ? formatCurrency(numPrincipal, currencySymbol) : '—'}</span>
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-sm">{currencySymbol}</span>
              <input
                type="number"
                min="100"
                max="10000000"
                step="500"
                value={principal}
                placeholder="e.g. 10000"
                onChange={(e) => setPrincipal(e.target.value === '' ? '' : Number(e.target.value))}
                className="w-full pl-8 pr-3 py-2 text-sm font-semibold border border-slate-200 rounded-xl bg-slate-50/50 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
            <input
              type="range"
              min="1000"
              max="250000"
              step="1000"
              value={typeof principal === 'number' ? principal : 1000}
              onChange={(e) => setPrincipal(e.target.value === '' ? '' : Number(e.target.value))}
              className="w-full accent-blue-600 cursor-pointer"
            />
          </div>

          {/* Rate */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 flex justify-between">
              <span>Annual Interest Rate</span>
              <span className="text-blue-600 font-mono">{interestRate !== '' ? `${interestRate}%` : '—'}</span>
            </label>
            <div className="relative">
              <input
                type="number"
                min="0.1"
                max="30"
                step="0.1"
                value={interestRate}
                placeholder="e.g. 7.0"
                onChange={(e) => setInterestRate(e.target.value === '' ? '' : Number(e.target.value))}
                className="w-full pl-3 pr-8 py-2 text-sm font-semibold border border-slate-200 rounded-xl bg-slate-50/50 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-sm">%</span>
            </div>
            <input
              type="range"
              min="0.5"
              max="20"
              step="0.25"
              value={typeof interestRate === 'number' ? interestRate : 1}
              onChange={(e) => setInterestRate(e.target.value === '' ? '' : Number(e.target.value))}
              className="w-full accent-blue-600 cursor-pointer"
            />
          </div>

          {/* Time Horizon */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 flex justify-between">
              <span>Time Horizon</span>
              <span className="text-blue-600 font-mono">{timeYears !== '' ? `${timeYears} Years` : '—'}</span>
            </label>
            <div className="grid grid-cols-4 gap-2">
              {[3, 5, 10, 20].map(y => (
                <button
                  key={y}
                  type="button"
                  onClick={() => setTimeYears(y)}
                  className={`py-1.5 text-xs font-bold rounded-lg border transition-all ${
                    timeYears === y
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {y} Years
                </button>
              ))}
            </div>
            <div className="pt-2">
              <input
                type="range"
                min="1"
                max="40"
                step="1"
                value={typeof timeYears === 'number' ? timeYears : 1}
                onChange={(e) => setTimeYears(e.target.value === '' ? '' : Number(e.target.value))}
                className="w-full accent-blue-600 cursor-pointer"
              />
            </div>
          </div>

          {/* Compounding Frequency */}
          <div className="space-y-1.5 pt-2 border-t border-slate-100">
            <label className="text-xs font-bold text-slate-700">Compounding Frequency</label>
            <div className="grid grid-cols-4 gap-2">
              {[
                { label: 'Annually', val: 1 },
                { label: 'Quarterly', val: 4 },
                { label: 'Monthly', val: 12 },
                { label: 'Daily', val: 365 }
              ].map(f => (
                <button
                  key={f.val}
                  type="button"
                  onClick={() => setCompoundFreq(f.val)}
                  className={`py-1.5 text-xs font-bold rounded-lg border transition-all ${
                    compoundFreq === f.val
                      ? 'bg-slate-900 text-white border-slate-900'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Output Results */}
        <div className="lg:col-span-6 space-y-4">
          <div className="bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white rounded-2xl p-6 shadow-md relative">
            <div className="space-y-4">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-blue-300">
                  Compound Future Balance
                </span>
                <div className="text-3xl sm:text-4xl font-black tracking-tight text-white mt-1">
                  {calculations ? formatCurrency(calculations.compoundTotal, currencySymbol) : '—'}
                </div>
                {calculations && (
                  <div className="text-xs font-medium text-orange-300 mt-1">
                    +{formatCurrency(calculations.compoundInterest, currencySymbol)} total compound interest earned
                  </div>
                )}
              </div>

              {/* Head to Head Comparison */}
              <div className="grid grid-cols-2 gap-3 pt-3 border-t border-blue-900/60">
                <div className="bg-white/10 rounded-xl p-3 backdrop-blur-xs">
                  <span className="text-[10px] text-slate-300 uppercase font-bold block">Simple Interest</span>
                  <span className="text-base font-bold text-slate-200 font-mono">
                    {calculations ? formatCurrency(calculations.simpleTotal, currencySymbol) : '—'}
                  </span>
                  {calculations && (
                    <span className="text-[10px] text-slate-400 block mt-0.5">
                      +{formatCurrency(calculations.simpleInterest, currencySymbol)} interest
                    </span>
                  )}
                </div>
                <div className="bg-white/10 rounded-xl p-3 backdrop-blur-xs">
                  <span className="text-[10px] text-orange-300 uppercase font-bold block">Compound Advantage</span>
                  <span className="text-base font-bold text-orange-300 font-mono">
                    {calculations ? `+${formatCurrency(calculations.compoundDifference, currencySymbol)}` : '—'}
                  </span>
                  <span className="text-[10px] text-slate-400 block mt-0.5">Bonus from reinvesting</span>
                </div>
              </div>

              {/* Rule of 72 */}
              {calculations && (
                <div className="bg-blue-500/20 border border-blue-400/30 rounded-xl p-3 text-xs flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-blue-300 shrink-0" />
                    <span>
                      Rule of 72: Doubling your capital takes ~<strong>{calculations.yearsToDouble > 0 ? `${calculations.yearsToDouble.toFixed(1)} years` : 'N/A'}</strong> at {interestRate}% rate.
                    </span>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
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

          {/* Yearly Snapshot Table preview */}
          <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-2xs space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">Growth Timeline Snapshot</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono-numbers">
                <thead className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200">
                  <tr>
                    <th className="p-2">Year</th>
                    <th className="p-2">Simple Value</th>
                    <th className="p-2">Compound Value</th>
                    <th className="p-2">Annual Gain</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {calculations && calculations.yearlyBreakdown.length > 0 ? (
                    calculations.yearlyBreakdown.filter((_, idx) => idx === 0 || (idx + 1) % 5 === 0 || idx === calculations.yearlyBreakdown.length - 1).map(row => (
                      <tr key={row.year} className="hover:bg-slate-50/80">
                        <td className="p-2 font-bold text-slate-900">Year {row.year}</td>
                        <td className="p-2">{formatCurrency(row.simpleValue, currencySymbol)}</td>
                        <td className="p-2 font-bold text-blue-600">{formatCurrency(row.compoundValue, currencySymbol)}</td>
                        <td className="p-2 text-orange-600">+{formatCurrency(row.interestEarnedYear, currencySymbol)}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={4} className="p-4 text-center text-slate-400 text-xs">
                        Enter your principal, rate, and years to view the growth timeline.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
