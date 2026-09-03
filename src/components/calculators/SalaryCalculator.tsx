import React, { useState, useMemo } from 'react';
import { formatCurrency, formatNumber, downloadCsv, copyToClipboard } from '../../utils/formatters';
import { Briefcase, DollarSign, Clock, ShieldCheck, Check, Copy, Percent } from 'lucide-react';
import confetti from 'canvas-confetti';

interface SalaryCalcProps {
  currencySymbol?: string;
  onSaveCalculation?: (summary: string, inputs: any, results: any) => void;
}

export const SalaryCalculator: React.FC<SalaryCalcProps> = ({
  currencySymbol = '$',
  onSaveCalculation
}) => {
  const [payAmount, setPayAmount] = useState<number | ''>(75000);
  const [payFrequency, setPayFrequency] = useState<'hourly' | 'annual' | 'monthly' | 'biweekly'>('annual');
  const [hoursPerWeek, setHoursPerWeek] = useState<number | ''>(40);
  const [federalTaxRate, setFederalTaxRate] = useState<number | ''>(14.0);
  const [stateTaxRate, setStateTaxRate] = useState<number | ''>(5.0);
  const [ficaMedicareRate, setFicaMedicareRate] = useState<number | ''>(7.65);
  const [preTaxDeductionsAnnual, setPreTaxDeductionsAnnual] = useState<number | ''>(3000); // 401k / Health
  const [copied, setCopied] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const numPayAmount = typeof payAmount === 'number' ? payAmount : 0;
  const numHoursPerWeek = typeof hoursPerWeek === 'number' ? hoursPerWeek : 40;
  const numFederalTaxRate = typeof federalTaxRate === 'number' ? federalTaxRate : 0;
  const numStateTaxRate = typeof stateTaxRate === 'number' ? stateTaxRate : 0;
  const numFicaMedicareRate = typeof ficaMedicareRate === 'number' ? ficaMedicareRate : 0;
  const numPreTaxDeductionsAnnual = typeof preTaxDeductionsAnnual === 'number' ? preTaxDeductionsAnnual : 0;

  const isInputEmpty = payAmount === '' || typeof payAmount !== 'number' || payAmount <= 0;

  const stats = useMemo(() => {
    if (isInputEmpty) {
      return null;
    }

    let grossAnnual = 0;
    const totalHoursPerYear = Math.max(1, numHoursPerWeek * 52);

    if (payFrequency === 'hourly') {
      grossAnnual = numPayAmount * totalHoursPerYear;
    } else if (payFrequency === 'annual') {
      grossAnnual = numPayAmount;
    } else if (payFrequency === 'monthly') {
      grossAnnual = numPayAmount * 12;
    } else if (payFrequency === 'biweekly') {
      grossAnnual = numPayAmount * 26;
    }

    const taxableIncome = Math.max(0, grossAnnual - numPreTaxDeductionsAnnual);
    const federalTax = (taxableIncome * numFederalTaxRate) / 100;
    const stateTax = (taxableIncome * numStateTaxRate) / 100;
    const ficaTax = (grossAnnual * numFicaMedicareRate) / 100;
    const totalTaxes = federalTax + stateTax + ficaTax;
    const totalDeductions = totalTaxes + numPreTaxDeductionsAnnual;
    const netAnnual = Math.max(0, grossAnnual - totalDeductions);

    const breakdown = [
      { period: 'Annual', gross: grossAnnual, net: netAnnual, taxes: totalTaxes },
      { period: 'Monthly (12x)', gross: grossAnnual / 12, net: netAnnual / 12, taxes: totalTaxes / 12 },
      { period: 'Semi-Monthly (24x)', gross: grossAnnual / 24, net: netAnnual / 24, taxes: totalTaxes / 24 },
      { period: 'Bi-Weekly (26x)', gross: grossAnnual / 26, net: netAnnual / 26, taxes: totalTaxes / 26 },
      { period: 'Weekly (52x)', gross: grossAnnual / 52, net: netAnnual / 52, taxes: totalTaxes / 52 },
      { period: 'Daily (260x)', gross: grossAnnual / 260, net: netAnnual / 260, taxes: totalTaxes / 260 },
      { period: 'Hourly', gross: grossAnnual / totalHoursPerYear, net: netAnnual / totalHoursPerYear, taxes: totalTaxes / totalHoursPerYear }
    ];

    return {
      grossAnnual,
      netAnnual,
      totalTaxes,
      federalTax,
      stateTax,
      ficaTax,
      effectiveTaxRate: grossAnnual > 0 ? (totalTaxes / grossAnnual) * 100 : 0,
      breakdown
    };
  }, [isInputEmpty, numPayAmount, payFrequency, numHoursPerWeek, numFederalTaxRate, numStateTaxRate, numFicaMedicareRate, numPreTaxDeductionsAnnual]);

  const handleCopy = async () => {
    if (!stats) return;
    const text = `Salary & Paycheck Breakdown:
• Gross Annual Pay: ${formatCurrency(stats.grossAnnual, currencySymbol)}
• Estimated Net Take-Home: ${formatCurrency(stats.netAnnual, currencySymbol)}/year (${formatCurrency(stats.netAnnual / 12, currencySymbol)}/mo)
• Federal Tax: ${formatCurrency(stats.federalTax, currencySymbol)} (${numFederalTaxRate}%)
• State Tax: ${formatCurrency(stats.stateTax, currencySymbol)} (${numStateTaxRate}%)
• FICA / Medicare: ${formatCurrency(stats.ficaTax, currencySymbol)} (${numFicaMedicareRate}%)
• Pre-tax Deductions (401k/Health): ${formatCurrency(numPreTaxDeductionsAnnual, currencySymbol)}`;

    const ok = await copyToClipboard(text);
    if (ok) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleReset = () => {
    setPayAmount(75000);
    setPayFrequency('annual');
    setHoursPerWeek(40);
    setFederalTaxRate(14.0);
    setStateTaxRate(5.0);
    setFicaMedicareRate(7.65);
    setPreTaxDeductionsAnnual(3000);
  };

  const handleSave = () => {
    if (!stats) return;
    if (onSaveCalculation) {
      onSaveCalculation(
        `Paycheck: ${formatCurrency(stats.grossAnnual, currencySymbol)} Gross → ${formatCurrency(stats.netAnnual, currencySymbol)} Net`,
        { payAmount, payFrequency, hoursPerWeek },
        { grossAnnual: stats.grossAnnual, netAnnual: stats.netAnnual }
      );
      setSavedSuccess(true);
      confetti({ particleCount: 40, spread: 60, origin: { y: 0.8 } });
      setTimeout(() => setSavedSuccess(false), 2500);
    }
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Controls */}
        <div className="lg:col-span-7 bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <h3 className="text-lg font-bold text-slate-900">Income & Frequency</h3>
              <p className="text-xs text-slate-700">Calculate gross to net earnings across all pay periods.</p>
            </div>
            <button
              onClick={handleReset}
              className="text-xs font-semibold text-slate-600 hover:text-slate-900 px-2.5 py-1 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors"
            >
              Reset
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-slate-700 block">Earnings Amount</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-700 text-sm font-semibold">{currencySymbol}</span>
                <input
                  type="number"
                  value={payAmount}
                  onChange={(e) => setPayAmount(e.target.value === '' ? '' : Number(e.target.value))}
                  className="w-full pl-7 pr-3 py-2 font-mono-numbers text-base font-bold border border-slate-200 rounded-lg bg-slate-50/50"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-slate-700 block">Pay Frequency</label>
              <select
                value={payFrequency}
                onChange={(e) => {
                  const freq = e.target.value as any;
                  setPayFrequency(freq);
                  if (freq === 'hourly' && typeof payAmount === 'number' && payAmount > 500) setPayAmount(35);
                  if (freq === 'annual' && typeof payAmount === 'number' && payAmount < 500) setPayAmount(75000);
                }}
                className="w-full px-3 py-2.5 text-xs font-semibold border border-slate-200 rounded-lg bg-slate-50"
              >
                <option value="annual">Per Year (Annual Salary)</option>
                <option value="hourly">Per Hour</option>
                <option value="monthly">Per Month</option>
                <option value="biweekly">Bi-Weekly (Every 2 Weeks)</option>
              </select>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-slate-700 block">Work Hours per Week</label>
            <input
              type="number"
              value={hoursPerWeek}
              onChange={(e) => setHoursPerWeek(e.target.value === '' ? '' : Number(e.target.value))}
              className="w-full px-3 py-2 text-sm font-mono-numbers border border-slate-200 rounded-lg bg-slate-50/50"
            />
          </div>

          {/* Tax Estimations */}
          <div className="pt-2 border-t border-slate-100 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">Tax & Deduction Estimates</h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <div>
                <label className="text-xs font-medium text-slate-700 mb-1 block">Est. Federal Tax (%)</label>
                <input
                  type="number"
                  value={federalTaxRate}
                  onChange={(e) => setFederalTaxRate(e.target.value === '' ? '' : Number(e.target.value))}
                  className="w-full px-2.5 py-1.5 text-xs font-mono-numbers border border-slate-200 rounded-lg bg-slate-50/50"
                />
              </div>

              <div>
                <label className="text-xs font-medium text-slate-700 mb-1 block">Est. State Tax (%)</label>
                <input
                  type="number"
                  value={stateTaxRate}
                  onChange={(e) => setStateTaxRate(e.target.value === '' ? '' : Number(e.target.value))}
                  className="w-full px-2.5 py-1.5 text-xs font-mono-numbers border border-slate-200 rounded-lg bg-slate-50/50"
                />
              </div>

              <div>
                <label className="text-xs font-medium text-slate-700 mb-1 block">FICA / Medicare (%)</label>
                <input
                  type="number"
                  value={ficaMedicareRate}
                  onChange={(e) => setFicaMedicareRate(e.target.value === '' ? '' : Number(e.target.value))}
                  className="w-full px-2.5 py-1.5 text-xs font-mono-numbers border border-slate-200 rounded-lg bg-slate-50/50"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-medium text-slate-700 mb-1 block">Annual Pre-tax Deductions (401k, HSA, Medical)</label>
              <div className="relative">
                <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-700 text-xs font-semibold">{currencySymbol}</span>
                <input
                  type="number"
                  value={preTaxDeductionsAnnual}
                  onChange={(e) => setPreTaxDeductionsAnnual(e.target.value === '' ? '' : Number(e.target.value))}
                  className="w-full pl-6 pr-2 py-1.5 text-xs font-mono-numbers border border-slate-200 rounded-lg bg-slate-50/50"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Results Box */}
        <div className="lg:col-span-5 space-y-5">
          {stats ? (
            <>
              <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950 text-white rounded-2xl p-6 sm:p-7 shadow-lg relative overflow-hidden">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold uppercase tracking-wider text-indigo-300">
                    Net Take-Home Pay (Annual)
                  </span>
                  <span className="px-2 py-0.5 text-xs font-bold bg-indigo-500/20 text-indigo-300 rounded border border-indigo-500/30">
                    {stats.effectiveTaxRate.toFixed(1)}% Tax Burden
                  </span>
                </div>

                <div className="flex items-baseline gap-2 mb-6">
                  <span className="text-5xl font-black font-mono-numbers tracking-tight text-white">
                    {formatCurrency(stats.netAnnual, currencySymbol)}
                  </span>
                  <span className="text-slate-300 text-sm font-medium">/ year</span>
                </div>

                <div className="border-t border-slate-700/80 pt-4 space-y-2 text-xs">
                  <div className="flex justify-between text-slate-300">
                    <span>Gross Annual Salary:</span>
                    <strong className="text-white font-mono-numbers">{formatCurrency(stats.grossAnnual, currencySymbol)}</strong>
                  </div>
                  <div className="flex justify-between text-slate-300">
                    <span>Estimated Monthly Net:</span>
                    <strong className="text-orange-300 font-mono-numbers text-sm">{formatCurrency(stats.netAnnual / 12, currencySymbol)}/mo</strong>
                  </div>
                  <div className="flex justify-between text-slate-300">
                    <span>Bi-Weekly Net Paycheck:</span>
                    <strong className="text-white font-mono-numbers">{formatCurrency(stats.netAnnual / 26, currencySymbol)}</strong>
                  </div>
                  <div className="flex justify-between text-slate-300">
                    <span>Total Annual Taxes:</span>
                    <strong className="text-rose-300 font-mono-numbers">{formatCurrency(stats.totalTaxes, currencySymbol)}</strong>
                  </div>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopy}
                  className="flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold transition-all shadow-2xs"
                >
                  {copied ? <Check className="w-4 h-4 text-orange-600" /> : <Copy className="w-4 h-4 text-slate-700" />}
                  {copied ? 'Copied' : 'Copy Breakdown'}
                </button>

                <button
                  onClick={handleSave}
                  className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition-all shadow-2xs"
                >
                  <ShieldCheck className="w-4 h-4" />
                  {savedSuccess ? 'Saved!' : 'Save Result'}
                </button>
              </div>
            </>
          ) : (
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 text-center text-slate-500 text-sm">
              Enter your base wage or salary above to compute net take-home pay and tax deductions.
            </div>
          )}
        </div>
      </div>

      {/* Pay Frequency Equivalent Table */}
      {stats && (
        <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs space-y-4">
          <h4 className="text-sm font-bold text-slate-900">Equivalent Paycheck Conversion Table</h4>
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-50 text-slate-700 font-semibold border-b border-slate-200">
                <tr>
                  <th className="py-2.5 px-3">Pay Period</th>
                  <th className="py-2.5 px-3">Gross Earnings</th>
                  <th className="py-2.5 px-3">Taxes & Deductions</th>
                  <th className="py-2.5 px-3 text-right">Net Take-Home Pay</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-mono-numbers">
                {stats.breakdown.map((row) => (
                  <tr key={row.period} className="hover:bg-slate-50/80">
                    <td className="py-2 px-3 font-semibold text-slate-900 font-sans">{row.period}</td>
                    <td className="py-2 px-3 text-slate-700">{formatCurrency(row.gross, currencySymbol)}</td>
                    <td className="py-2 px-3 text-rose-600">-{formatCurrency(row.taxes, currencySymbol)}</td>
                    <td className="py-2 px-3 text-right font-bold text-orange-700">{formatCurrency(row.net, currencySymbol)}</td>
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
