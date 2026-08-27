import React, { useState, useMemo } from 'react';
import { formatCurrency, formatNumber, downloadCsv, copyToClipboard } from '../../utils/formatters';
import { DollarSign, Percent, Calendar, ShieldCheck, Home, FileSpreadsheet, Copy, Check, Sparkles, PieChart, Layers } from 'lucide-react';
import confetti from 'canvas-confetti';

interface MortgageCalculatorProps {
  currencySymbol?: string;
  onSaveCalculation?: (summary: string, inputs: any, results: any) => void;
}

export const MortgageCalculator: React.FC<MortgageCalculatorProps> = ({
  currencySymbol = '$',
  onSaveCalculation
}) => {
  // State
  const [homePrice, setHomePrice] = useState<number | ''>(400000);
  const [downPaymentPercent, setDownPaymentPercent] = useState<number | ''>(20);
  const [loanTermYears, setLoanTermYears] = useState<number | ''>(30);
  const [interestRate, setInterestRate] = useState<number | ''>(6.5);
  const [propertyTaxAnnual, setPropertyTaxAnnual] = useState<number | ''>(4200);
  const [homeInsuranceAnnual, setHomeInsuranceAnnual] = useState<number | ''>(1400);
  const [hoaMonthly, setHoaMonthly] = useState<number | ''>(50);
  const [pmiAnnualPercent, setPmiAnnualPercent] = useState<number | ''>(0.5);
  const [extraMonthlyPayment, setExtraMonthlyPayment] = useState<number | ''>(0);
  const [showAmortization, setShowAmortization] = useState<'yearly' | 'monthly' | 'none'>('yearly');
  const [copied, setCopied] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Computed Loan
  const numHomePrice = typeof homePrice === 'number' ? homePrice : 0;
  const numDownPaymentPercent = typeof downPaymentPercent === 'number' ? downPaymentPercent : 0;
  const numLoanTermYears = typeof loanTermYears === 'number' ? loanTermYears : 30;
  const numInterestRate = typeof interestRate === 'number' ? interestRate : 0;
  const numPropertyTax = typeof propertyTaxAnnual === 'number' ? propertyTaxAnnual : 0;
  const numHomeInsurance = typeof homeInsuranceAnnual === 'number' ? homeInsuranceAnnual : 0;
  const numHoa = typeof hoaMonthly === 'number' ? hoaMonthly : 0;
  const numPmi = typeof pmiAnnualPercent === 'number' ? pmiAnnualPercent : 0.5;
  const numExtra = typeof extraMonthlyPayment === 'number' ? extraMonthlyPayment : 0;

  const isInputEmpty = homePrice === '' || downPaymentPercent === '' || loanTermYears === '' || interestRate === '';

  const downPaymentAmount = useMemo(() => (numHomePrice * numDownPaymentPercent) / 100, [numHomePrice, numDownPaymentPercent]);
  const loanAmount = useMemo(() => Math.max(0, numHomePrice - downPaymentAmount), [numHomePrice, downPaymentAmount]);

  const calculation = useMemo(() => {
    if (isInputEmpty) return null;

    const monthlyRate = numInterestRate / 100 / 12;
    const totalPayments = numLoanTermYears * 12;

    let monthlyPrincipalInterest = 0;
    if (monthlyRate > 0 && totalPayments > 0) {
      monthlyPrincipalInterest = (loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, totalPayments))) /
        (Math.pow(1 + monthlyRate, totalPayments) - 1);
    } else if (totalPayments > 0) {
      monthlyPrincipalInterest = loanAmount / totalPayments;
    }

    const monthlyTax = numPropertyTax / 12;
    const monthlyInsurance = numHomeInsurance / 12;
    const isPmiApplicable = numDownPaymentPercent < 20;
    const monthlyPmi = isPmiApplicable ? (loanAmount * (numPmi / 100)) / 12 : 0;
    const totalMonthlyPayment = monthlyPrincipalInterest + monthlyTax + monthlyInsurance + monthlyPmi + numHoa;

    // Amortization Schedule
    let balance = loanAmount;
    let totalInterestPaid = 0;
    const schedule: {
      month: number;
      year: number;
      principalPaid: number;
      interestPaid: number;
      extraPaid: number;
      totalPayment: number;
      remainingBalance: number;
    }[] = [];

    const yearlySchedule: {
      year: number;
      principalPaid: number;
      interestPaid: number;
      extraPaid: number;
      totalPayment: number;
      endBalance: number;
    }[] = [];

    let currentYearPrincipal = 0;
    let currentYearInterest = 0;
    let currentYearExtra = 0;
    let currentYearTotal = 0;

    let actualMonthsToPayoff = 0;

    for (let m = 1; m <= totalPayments; m++) {
      if (balance <= 0) break;
      actualMonthsToPayoff = m;
      const year = Math.ceil(m / 12);
      const interestForMonth = balance * monthlyRate;
      let principalForMonth = monthlyPrincipalInterest - interestForMonth;
      let actualExtra = numExtra;

      if (balance < principalForMonth + actualExtra) {
        if (balance < principalForMonth) {
          principalForMonth = balance;
          actualExtra = 0;
        } else {
          actualExtra = balance - principalForMonth;
        }
      }

      balance = Math.max(0, balance - principalForMonth - actualExtra);
      totalInterestPaid += interestForMonth;

      schedule.push({
        month: m,
        year,
        principalPaid: principalForMonth,
        interestPaid: interestForMonth,
        extraPaid: actualExtra,
        totalPayment: principalForMonth + interestForMonth + actualExtra,
        remainingBalance: balance
      });

      currentYearPrincipal += principalForMonth;
      currentYearInterest += interestForMonth;
      currentYearExtra += actualExtra;
      currentYearTotal += (principalForMonth + interestForMonth + actualExtra);

      if (m % 12 === 0 || balance <= 0) {
        yearlySchedule.push({
          year,
          principalPaid: currentYearPrincipal,
          interestPaid: currentYearInterest,
          extraPaid: currentYearExtra,
          totalPayment: currentYearTotal,
          endBalance: balance
        });
        currentYearPrincipal = 0;
        currentYearInterest = 0;
        currentYearExtra = 0;
        currentYearTotal = 0;
      }
    }

    const totalCostOfLoan = loanAmount + totalInterestPaid;
    const totalPaymentsWithEscrow = (totalMonthlyPayment + numExtra) * actualMonthsToPayoff;
    const yearsToPayoff = (actualMonthsToPayoff / 12).toFixed(1);

    return {
      monthlyPrincipalInterest,
      monthlyTax,
      monthlyInsurance,
      monthlyPmi,
      totalMonthlyPayment: totalMonthlyPayment + numExtra,
      baseMonthlyPayment: totalMonthlyPayment,
      totalInterestPaid,
      totalCostOfLoan,
      totalPaymentsWithEscrow,
      schedule,
      yearlySchedule,
      actualMonthsToPayoff,
      yearsToPayoff
    };
  }, [
    isInputEmpty,
    loanAmount,
    numLoanTermYears,
    numInterestRate,
    numPropertyTax,
    numHomeInsurance,
    numHoa,
    numDownPaymentPercent,
    numPmi,
    numExtra
  ]);

  const handleCopySummary = async () => {
    if (!calculation) {
      alert("Please enter a value.");
      return;
    }
    const summary = `Mortgage Summary:
• Home Price: ${formatCurrency(numHomePrice, currencySymbol)}
• Down Payment: ${formatCurrency(downPaymentAmount, currencySymbol)} (${numDownPaymentPercent}%)
• Loan Amount: ${formatCurrency(loanAmount, currencySymbol)}
• Interest Rate: ${numInterestRate}% (${numLoanTermYears} Years)
• Total Monthly Payment: ${formatCurrency(calculation.totalMonthlyPayment, currencySymbol)}
  - Principal & Interest: ${formatCurrency(calculation.monthlyPrincipalInterest, currencySymbol)}
  - Property Tax: ${formatCurrency(calculation.monthlyTax, currencySymbol)}
  - Home Insurance: ${formatCurrency(calculation.monthlyInsurance, currencySymbol)}
  - HOA: ${formatCurrency(numHoa, currencySymbol)}
  ${calculation.monthlyPmi > 0 ? `- PMI: ${formatCurrency(calculation.monthlyPmi, currencySymbol)}` : ''}
• Total Interest Paid: ${formatCurrency(calculation.totalInterestPaid, currencySymbol)}
• Payoff Duration: ${calculation.yearsToPayoff} years`;

    const ok = await copyToClipboard(summary);
    if (ok) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleExportCsv = () => {
    if (!calculation) return;
    const headers = ['Year', 'Principal Paid', 'Interest Paid', 'Extra Payment', 'Total Annual Payment', 'Ending Balance'];
    const rows = calculation.yearlySchedule.map(y => [
      y.year.toString(),
      y.principalPaid.toFixed(2),
      y.interestPaid.toFixed(2),
      y.extraPaid.toFixed(2),
      y.totalPayment.toFixed(2),
      y.endBalance.toFixed(2)
    ]);
    downloadCsv(`mortgage_amortization_${numHomePrice}_${numLoanTermYears}yr.csv`, [headers, ...rows]);
  };

  const handleSave = () => {
    if (!calculation) return;
    if (onSaveCalculation) {
      onSaveCalculation(
        `Mortgage for ${formatCurrency(numHomePrice, currencySymbol)}: ${formatCurrency(calculation.totalMonthlyPayment, currencySymbol)}/mo`,
        { homePrice, downPaymentPercent, loanTermYears, interestRate },
        { monthlyPayment: calculation.totalMonthlyPayment, totalInterest: calculation.totalInterestPaid }
      );
      setSavedSuccess(true);
      confetti({ particleCount: 40, spread: 60, origin: { y: 0.8 } });
      setTimeout(() => setSavedSuccess(false), 2500);
    }
  };

  // Percent ratios for breakdown chart
  const principalShare = calculation && calculation.totalMonthlyPayment > 0 ? (calculation.monthlyPrincipalInterest / calculation.totalMonthlyPayment) * 100 : 0;
  const taxShare = calculation && calculation.totalMonthlyPayment > 0 ? (calculation.monthlyTax / calculation.totalMonthlyPayment) * 100 : 0;
  const insuranceShare = calculation && calculation.totalMonthlyPayment > 0 ? (calculation.monthlyInsurance / calculation.totalMonthlyPayment) * 100 : 0;
  const hoaShare = calculation && calculation.totalMonthlyPayment > 0 ? (numHoa / calculation.totalMonthlyPayment) * 100 : 0;
  const pmiShare = calculation && calculation.totalMonthlyPayment > 0 ? (calculation.monthlyPmi / calculation.totalMonthlyPayment) * 100 : 0;

  return (
    <div id="mortgage-calc-root" className="space-y-8">
      {/* Interactive Controls & Live Results Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Inputs Column */}
        <div className="lg:col-span-7 bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <h3 className="text-xl font-bold text-slate-900">Mortgage Parameters</h3>
              <p className="text-sm text-slate-700">Adjust purchase price, down payment, interest rate, and term.</p>
            </div>
            <button
              onClick={() => {
                setHomePrice(400000);
                setDownPaymentPercent(20);
                setLoanTermYears(30);
                setInterestRate(6.5);
                setPropertyTaxAnnual(4200);
                setHomeInsuranceAnnual(1400);
                setHoaMonthly(50);
                setExtraMonthlyPayment(0);
              }}
              className="text-sm font-semibold text-slate-700 hover:text-slate-900 px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors"
            >
              Reset Defaults
            </button>
          </div>

          {/* Home Price */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label htmlFor="home-price-input" className="text-base font-semibold text-slate-800 flex items-center gap-1.5">
                <Home className="w-4.5 h-4.5 text-orange-600" />
                Home Purchase Price
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-700 text-base font-semibold">{currencySymbol}</span>
                <input
                  id="home-price-input"
                  type="number"
                  min="0"
                  step="1000"
                  value={homePrice}
                  onChange={(e) => setHomePrice(e.target.value === '' ? '' : Number(e.target.value))}
                  placeholder="e.g. 400000"
                  className="w-40 pl-8 pr-3 py-2 text-right font-mono-numbers font-semibold text-base border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 bg-slate-50/50"
                />
              </div>
            </div>
            <input
              type="range"
              min="50000"
              max="2000000"
              step="10000"
              value={numHomePrice || 400000}
              onChange={(e) => setHomePrice(e.target.value === '' ? '' : Number(e.target.value))}
              className="w-full accent-orange-600 cursor-pointer h-2 bg-slate-200 rounded-lg"
            />
          </div>

          {/* Down Payment */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label htmlFor="down-payment-input" className="text-base font-semibold text-slate-800 flex items-center gap-1.5">
                <DollarSign className="w-4.5 h-4.5 text-orange-600" />
                Down Payment ({numDownPaymentPercent}%)
              </label>
              <div className="flex items-center gap-2">
                <span className="text-sm text-slate-700 font-mono-numbers font-medium">{formatCurrency(downPaymentAmount, currencySymbol)}</span>
                <div className="relative">
                  <input
                    id="down-payment-input"
                    type="number"
                    min="0"
                    max="100"
                    step="1"
                    value={downPaymentPercent}
                    onChange={(e) => setDownPaymentPercent(e.target.value === '' ? '' : Number(e.target.value))}
                    placeholder="20"
                    className="w-24 pr-7 pl-3 py-2 text-right font-mono-numbers font-semibold text-base border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 bg-slate-50/50"
                  />
                  <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-700 text-sm font-bold">%</span>
                </div>
              </div>
            </div>
            <input
              type="range"
              min="0"
              max="50"
              step="1"
              value={numDownPaymentPercent || 20}
              onChange={(e) => setDownPaymentPercent(e.target.value === '' ? '' : Number(e.target.value))}
              className="w-full accent-orange-600 cursor-pointer h-2 bg-slate-200 rounded-lg"
            />
            {numDownPaymentPercent < 20 && (
              <p className="text-sm text-orange-700 bg-orange-50/80 px-3 py-2 rounded-md border border-orange-200/60">
                Down payment under 20% typically requires Private Mortgage Insurance (PMI).
              </p>
            )}
          </div>

          {/* Loan Term & Interest Rate Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label htmlFor="loan-term-select" className="text-base font-semibold text-slate-800 flex items-center gap-1.5">
                <Calendar className="w-4.5 h-4.5 text-orange-600" />
                Loan Term
              </label>
              <div className="grid grid-cols-3 gap-1.5">
                {[15, 20, 30].map(years => (
                  <button
                    key={years}
                    id={`term-btn-${years}`}
                    type="button"
                    onClick={() => setLoanTermYears(years)}
                    className={`py-2 text-sm font-bold rounded-lg border transition-all ${
                      loanTermYears === years
                        ? 'bg-orange-600 text-white border-orange-600 shadow-xs'
                        : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    {years} Years
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-1.5">
              <label htmlFor="interest-rate-input" className="text-base font-semibold text-slate-800 flex items-center gap-1.5">
                <Percent className="w-4.5 h-4.5 text-orange-600" />
                Interest Rate
              </label>
              <div className="relative">
                <input
                  id="interest-rate-input"
                  type="number"
                  min="0"
                  step="0.1"
                  value={interestRate}
                  onChange={(e) => setInterestRate(e.target.value === '' ? '' : Number(e.target.value))}
                  placeholder="6.5"
                  className="w-full pl-3 pr-8 py-2 font-mono-numbers font-semibold text-base border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 bg-slate-50/50"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-700 text-base font-bold">%</span>
              </div>
            </div>
          </div>

          {/* Taxes, Insurance, HOA, Extra Payment Expander */}
          <div className="pt-2 border-t border-slate-100 space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-slate-700">Taxes, Insurance & Extra Payments</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-slate-700 mb-1 block">Property Tax (Annual)</label>
                <div className="relative">
                  <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-700 text-sm font-semibold">{currencySymbol}</span>
                  <input
                    type="number"
                    value={propertyTaxAnnual}
                    onChange={(e) => setPropertyTaxAnnual(e.target.value === '' ? '' : Number(e.target.value))}
                    placeholder="0"
                    className="w-full pl-7 pr-3 py-2 text-sm font-mono-numbers border border-slate-200 rounded-lg focus:ring-2 focus:ring-orange-500 bg-slate-50/40"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-slate-700 mb-1 block">Home Insurance (Annual)</label>
                <div className="relative">
                  <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-700 text-sm font-semibold">{currencySymbol}</span>
                  <input
                    type="number"
                    value={homeInsuranceAnnual}
                    onChange={(e) => setHomeInsuranceAnnual(e.target.value === '' ? '' : Number(e.target.value))}
                    placeholder="0"
                    className="w-full pl-7 pr-3 py-2 text-sm font-mono-numbers border border-slate-200 rounded-lg focus:ring-2 focus:ring-orange-500 bg-slate-50/40"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-slate-700 mb-1 block">HOA / Condo Fee (Monthly)</label>
                <div className="relative">
                  <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-700 text-sm font-semibold">{currencySymbol}</span>
                  <input
                    type="number"
                    value={hoaMonthly}
                    onChange={(e) => setHoaMonthly(e.target.value === '' ? '' : Number(e.target.value))}
                    placeholder="0"
                    className="w-full pl-7 pr-3 py-2 text-sm font-mono-numbers border border-slate-200 rounded-lg focus:ring-2 focus:ring-orange-500 bg-slate-50/40"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-orange-800 mb-1 block">Extra Monthly Principal</label>
                <div className="relative">
                  <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-orange-700 text-sm font-semibold">{currencySymbol}</span>
                  <input
                    type="number"
                    value={extraMonthlyPayment}
                    onChange={(e) => setExtraMonthlyPayment(e.target.value === '' ? '' : Number(e.target.value))}
                    placeholder="0"
                    className="w-full pl-7 pr-3 py-2 text-sm font-mono-numbers border border-orange-200 rounded-lg focus:ring-2 focus:ring-orange-500 bg-orange-50/30"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Results & Breakdown Card */}
        <div className="lg:col-span-5 space-y-5">
          {/* Main Monthly Payment Box */}
          <div className="bg-[#FFF7ED] border border-[#FDBA74] text-[#0F172A] rounded-2xl p-6 sm:p-7 shadow-xs relative overflow-hidden">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#9A3412] flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-[#F97316]" />
                Estimated Total Monthly Payment
              </span>
              <span className="px-2.5 py-1 text-xs font-extrabold bg-[#FFEDD5] text-[#9A3412] rounded-md border border-[#FDBA74]">
                {numLoanTermYears} Years Fixed
              </span>
            </div>

            {calculation ? (
              <>
                <div className="flex items-baseline gap-2 mb-4">
                  <span className="text-4xl sm:text-5xl font-extrabold font-mono-numbers tracking-tight text-[#F97316]">
                    {formatCurrency(calculation.totalMonthlyPayment, currencySymbol)}
                  </span>
                  <span className="text-[#475569] text-base font-semibold">/ month</span>
                </div>

                {/* Visual stacked progress bar */}
                <div className="space-y-1.5 mb-6">
                  <div className="h-3 w-full bg-[#E2E8F0] rounded-full overflow-hidden flex shadow-inner">
                    <div style={{ width: `${principalShare}%` }} className="bg-[#F97316] h-full transition-all" title="Principal & Interest" />
                    <div style={{ width: `${taxShare}%` }} className="bg-[#0284C7] h-full transition-all" title="Property Tax" />
                    <div style={{ width: `${insuranceShare}%` }} className="bg-[#F97316] h-full transition-all" title="Insurance" />
                    {pmiShare > 0 && <div style={{ width: `${pmiShare}%` }} className="bg-[#E11D48] h-full transition-all" title="PMI" />}
                    {hoaShare > 0 && <div style={{ width: `${hoaShare}%` }} className="bg-[#7C3AED] h-full transition-all" title="HOA" />}
                  </div>

                  <div className="grid grid-cols-2 gap-y-2.5 gap-x-3 pt-2 text-xs sm:text-sm">
                    <div className="flex items-center gap-1.5 text-[#475569]">
                      <div className="w-2.5 h-2.5 rounded-full bg-[#F97316] shrink-0" />
                      <span className="truncate">Principal & Interest:</span>
                      <strong className="text-[#0F172A] ml-auto font-mono-numbers">{formatCurrency(calculation.monthlyPrincipalInterest, currencySymbol)}</strong>
                    </div>

                    <div className="flex items-center gap-1.5 text-[#475569]">
                      <div className="w-2.5 h-2.5 rounded-full bg-[#0284C7] shrink-0" />
                      <span className="truncate">Property Tax:</span>
                      <strong className="text-[#0F172A] ml-auto font-mono-numbers">{formatCurrency(calculation.monthlyTax, currencySymbol)}</strong>
                    </div>

                    <div className="flex items-center gap-1.5 text-[#475569]">
                      <div className="w-2.5 h-2.5 rounded-full bg-[#F97316] shrink-0" />
                      <span className="truncate">Home Insurance:</span>
                      <strong className="text-[#0F172A] ml-auto font-mono-numbers">{formatCurrency(calculation.monthlyInsurance, currencySymbol)}</strong>
                    </div>

                    <div className="flex items-center gap-1.5 text-[#475569]">
                      <div className="w-2.5 h-2.5 rounded-full bg-[#7C3AED] shrink-0" />
                      <span className="truncate">HOA Dues:</span>
                      <strong className="text-[#0F172A] ml-auto font-mono-numbers">{formatCurrency(numHoa, currencySymbol)}</strong>
                    </div>

                    {calculation.monthlyPmi > 0 && (
                      <div className="flex items-center gap-1.5 text-[#475569] col-span-2">
                        <div className="w-2.5 h-2.5 rounded-full bg-[#E11D48] shrink-0" />
                        <span>Private Mortgage Insurance (PMI):</span>
                        <strong className="text-[#E11D48] ml-auto font-mono-numbers">{formatCurrency(calculation.monthlyPmi, currencySymbol)}</strong>
                      </div>
                    )}
                  </div>
                </div>

                {/* Lifetime Summary */}
                <div className="border-t border-[#FDBA74]/60 pt-4 grid grid-cols-2 gap-4 text-xs sm:text-sm">
                  <div>
                    <span className="text-[#64748B] text-xs block mb-0.5 font-medium">Total Principal</span>
                    <span className="text-base font-bold text-[#0F172A] font-mono-numbers">{formatCurrency(loanAmount, currencySymbol)}</span>
                  </div>
                  <div>
                    <span className="text-[#64748B] text-xs block mb-0.5 font-medium">Total Interest Paid</span>
                    <span className="text-base font-bold text-[#F97316] font-mono-numbers">{formatCurrency(calculation.totalInterestPaid, currencySymbol)}</span>
                  </div>
                  <div>
                    <span className="text-[#64748B] text-xs block mb-0.5 font-medium">Overall Total Cost</span>
                    <span className="text-base font-bold text-[#0F172A] font-mono-numbers">{formatCurrency(calculation.totalPaymentsWithEscrow, currencySymbol)}</span>
                  </div>
                  <div>
                    <span className="text-[#64748B] text-xs block mb-0.5 font-medium">Payoff Time</span>
                    <span className="text-base font-bold text-[#0F172A] font-mono-numbers">{calculation.yearsToPayoff} Years</span>
                  </div>
                </div>
              </>
            ) : (
              <div className="py-10 text-center space-y-2">
                <p className="text-[#F97316] text-base font-semibold">Please enter a value.</p>
                <p className="text-sm text-[#64748B]">Fill in all required fields to calculate mortgage payments.</p>
              </div>
            )}
          </div>

          {/* Action Toolbar */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={handleCopySummary}
              className="flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl border border-[#E2E8F0] bg-[#FFFFFF] hover:bg-[#FFF7ED] hover:text-[#F97316] text-[#0F172A] text-xs sm:text-sm font-bold transition-all shadow-2xs cursor-pointer"
            >
              {copied ? <Check className="w-4 h-4 text-[#F97316]" /> : <Copy className="w-4 h-4 text-[#64748B]" />}
              <span>{copied ? 'Summary Copied!' : 'Copy Summary'}</span>
            </button>

            <button
              onClick={handleExportCsv}
              className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl border border-[#E2E8F0] bg-[#FFFFFF] hover:bg-[#FFF7ED] hover:text-[#F97316] text-[#0F172A] text-xs sm:text-sm font-bold transition-all shadow-2xs cursor-pointer"
            >
              <FileSpreadsheet className="w-4 h-4 text-[#F97316]" />
              <span>Export CSV</span>
            </button>

            <button
              onClick={handleSave}
              className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#F97316] hover:bg-[#EA580C] text-white text-xs sm:text-sm font-bold transition-all shadow-2xs cursor-pointer"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>{savedSuccess ? 'Saved!' : 'Save Result'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Amortization Schedule Accordion / Table */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <div className="flex items-center gap-2">
            <PieChart className="w-5 h-5 text-orange-600" />
            <div>
              <h3 className="text-lg font-bold text-slate-900">Amortization Schedule</h3>
              <p className="text-sm text-slate-700">Track how your loan balance decreases and equity grows each year.</p>
            </div>
          </div>
          <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-lg">
            <button
              onClick={() => setShowAmortization('yearly')}
              className={`px-3.5 py-1.5 text-sm font-bold rounded-md transition-all cursor-pointer ${
                showAmortization === 'yearly' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Yearly Schedule
            </button>
            <button
              onClick={() => setShowAmortization('monthly')}
              className={`px-3.5 py-1.5 text-sm font-bold rounded-md transition-all cursor-pointer ${
                showAmortization === 'monthly' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              First 24 Months
            </button>
            <button
              onClick={() => setShowAmortization('none')}
              className={`px-3.5 py-1.5 text-sm font-bold rounded-md transition-all cursor-pointer ${
                showAmortization === 'none' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Hide Table
            </button>
          </div>
        </div>

        {showAmortization === 'yearly' && (
          <div className="overflow-x-auto max-h-96 overflow-y-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 text-slate-700 font-bold sticky top-0 border-b border-slate-200">
                <tr>
                  <th className="py-3 px-3.5">Year</th>
                  <th className="py-3 px-3.5">Principal Paid</th>
                  <th className="py-3 px-3.5">Interest Paid</th>
                  <th className="py-3 px-3.5">Total Payment</th>
                  <th className="py-3 px-3.5 text-right">Ending Balance</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-mono-numbers">
                {calculation.yearlySchedule.map((row) => (
                  <tr key={row.year} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3 px-3.5 font-semibold text-slate-900">Year {row.year}</td>
                    <td className="py-3 px-3.5 text-orange-600 font-medium">{formatCurrency(row.principalPaid + row.extraPaid, currencySymbol)}</td>
                    <td className="py-3 px-3.5 text-rose-600 font-medium">{formatCurrency(row.interestPaid, currencySymbol)}</td>
                    <td className="py-3 px-3.5 text-slate-700">{formatCurrency(row.totalPayment, currencySymbol)}</td>
                    <td className="py-3 px-3.5 text-right font-bold text-slate-900">{formatCurrency(row.endBalance, currencySymbol)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {showAmortization === 'monthly' && (
          <div className="overflow-x-auto max-h-96 overflow-y-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 text-slate-700 font-bold sticky top-0 border-b border-slate-200">
                <tr>
                  <th className="py-3 px-3.5">Month</th>
                  <th className="py-3 px-3.5">Principal</th>
                  <th className="py-3 px-3.5">Interest</th>
                  <th className="py-3 px-3.5">Payment</th>
                  <th className="py-3 px-3.5 text-right">Balance</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-mono-numbers">
                {calculation.schedule.slice(0, 24).map((row) => (
                  <tr key={row.month} className="hover:bg-slate-50/80">
                    <td className="py-3 px-3.5 font-semibold text-slate-900">Month {row.month}</td>
                    <td className="py-3 px-3.5 text-orange-600">{formatCurrency(row.principalPaid + row.extraPaid, currencySymbol)}</td>
                    <td className="py-3 px-3.5 text-rose-600">{formatCurrency(row.interestPaid, currencySymbol)}</td>
                    <td className="py-3 px-3.5 text-slate-700">{formatCurrency(row.totalPayment, currencySymbol)}</td>
                    <td className="py-3 px-3.5 text-right font-bold text-slate-900">{formatCurrency(row.remainingBalance, currencySymbol)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
