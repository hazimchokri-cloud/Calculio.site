import React, { useState, useMemo } from 'react';
import { Building, DollarSign, TrendingUp, Percent, RotateCcw, Copy, Check, Info, ArrowUpRight } from 'lucide-react';
import { copyToClipboard } from '../../utils/formatters';

interface RentalRoiCalculatorProps {
  currencySymbol?: string;
  onSave?: (summary: string, inputs: any, results: any) => void;
}

export const RentalRoiCalculator: React.FC<RentalRoiCalculatorProps> = ({
  currencySymbol = '$',
  onSave
}) => {
  const [purchasePrice, setPurchasePrice] = useState<number | ''>(350000);
  const [downPaymentPercent, setDownPaymentPercent] = useState<number | ''>(20);
  const [interestRate, setInterestRate] = useState<number | ''>(6.5);
  const [loanTermYears, setLoanTermYears] = useState<number | ''>(30);
  const [closingCosts, setClosingCosts] = useState<number | ''>(7000);
  const [rehabCosts, setRehabCosts] = useState<number | ''>(10000);

  // Income
  const [monthlyRent, setMonthlyRent] = useState<number | ''>(2600);
  const [otherMonthlyIncome, setOtherMonthlyIncome] = useState<number | ''>(50); // laundry, parking

  // Operating Expenses (Monthly)
  const [propertyTaxYearly, setPropertyTaxYearly] = useState<number | ''>(4200);
  const [insuranceYearly, setInsuranceYearly] = useState<number | ''>(1400);
  const [hoaMonthly, setHoaMonthly] = useState<number | ''>(0);
  const [maintenancePercent, setMaintenancePercent] = useState<number | ''>(5); // 5% of rent
  const [vacancyPercent, setVacancyPercent] = useState<number | ''>(5); // 5% vacancy rate
  const [managementPercent, setManagementPercent] = useState<number | ''>(8); // 8% of rent

  const [copied, setCopied] = useState(false);

  const results = useMemo(() => {
    const downPaymentAmount = purchasePrice * (downPaymentPercent / 100);
    const loanAmount = purchasePrice - downPaymentAmount;
    const totalInitialInvestment = downPaymentAmount + closingCosts + rehabCosts;

    // Monthly Mortgage PI
    const monthlyRate = interestRate / 100 / 12;
    const numPayments = loanTermYears * 12;
    const monthlyMortgage = monthlyRate > 0
      ? (loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, numPayments))) / (Math.pow(1 + monthlyRate, numPayments) - 1)
      : loanAmount / numPayments;

    // Monthly Income
    const grossMonthlyIncome = monthlyRent + otherMonthlyIncome;
    const annualGrossIncome = grossMonthlyIncome * 12;

    // Monthly Expenses
    const monthlyTax = propertyTaxYearly / 12;
    const monthlyInsurance = insuranceYearly / 12;
    const monthlyMaintenance = monthlyRent * (maintenancePercent / 100);
    const monthlyVacancy = monthlyRent * (vacancyPercent / 100);
    const monthlyManagement = monthlyRent * (managementPercent / 100);

    const monthlyOperatingExpenses = monthlyTax + monthlyInsurance + hoaMonthly + monthlyMaintenance + monthlyVacancy + monthlyManagement;
    const annualOperatingExpenses = monthlyOperatingExpenses * 12;

    // Net Operating Income (NOI) = Gross Income - Operating Expenses (before debt service)
    const annualNOI = annualGrossIncome - annualOperatingExpenses;
    const monthlyNOI = annualNOI / 12;

    // Net Monthly Cash Flow (after mortgage PI)
    const monthlyCashFlow = monthlyNOI - monthlyMortgage;
    const annualCashFlow = monthlyCashFlow * 12;

    // Key Real Estate Metrics
    const capRate = purchasePrice > 0 ? (annualNOI / purchasePrice) * 100 : 0;
    const cashOnCashReturn = totalInitialInvestment > 0 ? (annualCashFlow / totalInitialInvestment) * 100 : 0;
    const grossRentMultiplier = annualGrossIncome > 0 ? purchasePrice / annualGrossIncome : 0;
    const operatingExpenseRatio = annualGrossIncome > 0 ? (annualOperatingExpenses / annualGrossIncome) * 100 : 0;

    return {
      totalInitialInvestment: Math.round(totalInitialInvestment),
      monthlyMortgage: Math.round(monthlyMortgage),
      grossMonthlyIncome: Math.round(grossMonthlyIncome),
      monthlyOperatingExpenses: Math.round(monthlyOperatingExpenses),
      monthlyCashFlow: Math.round(monthlyCashFlow),
      annualCashFlow: Math.round(annualCashFlow),
      annualNOI: Math.round(annualNOI),
      capRate: Math.round(capRate * 100) / 100,
      cashOnCashReturn: Math.round(cashOnCashReturn * 100) / 100,
      grossRentMultiplier: Math.round(grossRentMultiplier * 100) / 100,
      operatingExpenseRatio: Math.round(operatingExpenseRatio * 10) / 10
    };
  }, [
    purchasePrice,
    downPaymentPercent,
    interestRate,
    loanTermYears,
    closingCosts,
    rehabCosts,
    monthlyRent,
    otherMonthlyIncome,
    propertyTaxYearly,
    insuranceYearly,
    hoaMonthly,
    maintenancePercent,
    vacancyPercent,
    managementPercent
  ]);

  const handleReset = () => {
    setPurchasePrice(350000);
    setDownPaymentPercent(20);
    setInterestRate(6.5);
    setLoanTermYears(30);
    setClosingCosts(7000);
    setRehabCosts(10000);
    setMonthlyRent(2600);
    setOtherMonthlyIncome(50);
    setPropertyTaxYearly(4200);
    setInsuranceYearly(1400);
    setHoaMonthly(0);
    setMaintenancePercent(5);
    setVacancyPercent(5);
    setManagementPercent(8);
  };

  const handleCopy = () => {
    const text = `Real Estate Rental ROI Analysis:
Purchase: ${currencySymbol}${purchasePrice.toLocaleString()} | Initial Cash: ${currencySymbol}${results.totalInitialInvestment.toLocaleString()}
Net Monthly Cash Flow: ${currencySymbol}${results.monthlyCashFlow.toLocaleString()}/mo
Cap Rate: ${results.capRate}% | Cash-on-Cash ROI: ${results.cashOnCashReturn}%
Annual NOI: ${currencySymbol}${results.annualNOI.toLocaleString()} | GRM: ${results.grossRentMultiplier}`;
    copyToClipboard(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Form Inputs */}
        <div className="lg:col-span-7 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-5">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
              <Building className="w-4 h-4 text-indigo-600" />
              <span>Property & Financing Breakdown</span>
            </h4>
            <button
              type="button"
              onClick={handleReset}
              className="text-xs font-semibold text-slate-600 hover:text-slate-900 px-2.5 py-1 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors flex items-center gap-1"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset</span>
            </button>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Purchase Price</label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-xs font-bold text-slate-400">{currencySymbol}</span>
                <input
                  type="number"
                  min="10000"
                  step="5000"
                  value={purchasePrice}
                  onChange={(e) => setPurchasePrice(Number(e.target.value) || 0)}
                  className="w-full pl-7 pr-3 py-2 border border-slate-300 rounded-xl text-xs font-bold"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Down Payment (%)</label>
              <input
                type="number"
                min="0"
                max="100"
                value={downPaymentPercent}
                onChange={(e) => setDownPaymentPercent(Number(e.target.value) || 0)}
                className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs font-bold"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Mortgage Interest Rate (%)</label>
              <input
                type="number"
                step="0.125"
                min="1"
                max="20"
                value={interestRate}
                onChange={(e) => setInterestRate(Number(e.target.value) || 0)}
                className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs font-bold"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Monthly Rental Income</label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-xs font-bold text-slate-400">{currencySymbol}</span>
                <input
                  type="number"
                  min="100"
                  step="50"
                  value={monthlyRent}
                  onChange={(e) => setMonthlyRent(Number(e.target.value) || 0)}
                  className="w-full pl-7 pr-3 py-2 border border-slate-300 rounded-xl text-xs font-bold text-orange-800"
                />
              </div>
            </div>
          </div>

          {/* Operating Expenses */}
          <div className="pt-3 border-t border-slate-100">
            <span className="text-xs font-bold text-slate-900 block mb-2">Operating Expenses & Reserves</span>
            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-1">Yearly Property Tax</label>
                <input
                  type="number"
                  value={propertyTaxYearly}
                  onChange={(e) => setPropertyTaxYearly(Number(e.target.value) || 0)}
                  className="w-full px-2.5 py-1.5 border border-slate-300 rounded-lg text-xs font-bold"
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-1">Yearly Insurance</label>
                <input
                  type="number"
                  value={insuranceYearly}
                  onChange={(e) => setInsuranceYearly(Number(e.target.value) || 0)}
                  className="w-full px-2.5 py-1.5 border border-slate-300 rounded-lg text-xs font-bold"
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-1">Vacancy Reserve (%)</label>
                <input
                  type="number"
                  value={vacancyPercent}
                  onChange={(e) => setVacancyPercent(Number(e.target.value) || 0)}
                  className="w-full px-2.5 py-1.5 border border-slate-300 rounded-lg text-xs font-bold"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Results Metrics Dashboard */}
        <div className="lg:col-span-5 bg-gradient-to-br from-indigo-50/90 to-slate-50 p-6 rounded-2xl border border-indigo-200 flex flex-col justify-between space-y-5">
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-indigo-200">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-900">Rental Performance</span>
              <span className="text-xs font-black text-indigo-800">
                Initial: {currencySymbol}{results.totalInitialInvestment.toLocaleString()}
              </span>
            </div>

            {/* Top Primary Stat: Monthly Cash Flow */}
            <div className="p-4 bg-white rounded-xl border border-indigo-200 shadow-2xs text-center">
              <span className="text-[11px] font-bold text-slate-500 uppercase">Net Monthly Cash Flow</span>
              <div className={`text-2xl sm:text-3xl font-black mt-0.5 ${results.monthlyCashFlow >= 0 ? 'text-orange-600' : 'text-rose-600'}`}>
                {currencySymbol}{results.monthlyCashFlow.toLocaleString()}
                <span className="text-xs text-slate-500 font-semibold ml-1">/ mo</span>
              </div>
              <span className="text-xs text-slate-600 font-semibold mt-1 block">
                {currencySymbol}{results.annualCashFlow.toLocaleString()} net annual profit
              </span>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white p-3 rounded-xl border border-indigo-100 shadow-2xs">
                <span className="text-[10px] font-bold text-slate-500 uppercase">Cap Rate</span>
                <span className="text-xl font-black text-indigo-900 block">{results.capRate}%</span>
                <span className="text-[10px] text-slate-500">Unleveraged return</span>
              </div>
              <div className="bg-white p-3 rounded-xl border border-indigo-100 shadow-2xs">
                <span className="text-[10px] font-bold text-slate-500 uppercase">Cash-on-Cash Return</span>
                <span className="text-xl font-black text-orange-700 block">{results.cashOnCashReturn}%</span>
                <span className="text-[10px] text-slate-500">Annual cash ROI</span>
              </div>
            </div>

            {/* NOI & GRM */}
            <div className="bg-white p-3.5 rounded-xl border border-indigo-100 space-y-2 text-xs">
              <div className="flex justify-between text-slate-700">
                <span>Net Operating Income (NOI):</span>
                <span className="font-bold text-slate-900">{currencySymbol}{results.annualNOI.toLocaleString()}/yr</span>
              </div>
              <div className="flex justify-between text-slate-700">
                <span>Monthly Mortgage (P&I):</span>
                <span className="font-bold text-slate-900">{currencySymbol}{results.monthlyMortgage.toLocaleString()}/mo</span>
              </div>
              <div className="flex justify-between text-slate-700">
                <span>Gross Rent Multiplier (GRM):</span>
                <span className="font-bold text-indigo-700">{results.grossRentMultiplier}x</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 pt-3 border-t border-indigo-200">
            <button
              type="button"
              onClick={handleCopy}
              className="flex-1 py-2 px-3 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-xs font-bold text-slate-700 flex items-center justify-center gap-1.5 transition-all shadow-2xs"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-orange-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied ROI' : 'Copy Results'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
