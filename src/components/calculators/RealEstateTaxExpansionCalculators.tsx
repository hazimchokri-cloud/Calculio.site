import React, { useState, useMemo } from 'react';
import { RotateCcw } from 'lucide-react';
import { DecimalInput } from '../shared/DecimalInput';

interface BaseCalcProps {
  currencySymbol?: string;
  onSave?: (summary: string, inputs: any, results: any) => void;
}

// 1. Rent vs. Buy Home Calculator
export const RentVsBuyCalculator: React.FC<BaseCalcProps> = ({ currencySymbol = '$' }) => {
  const [homePrice, setHomePrice] = useState<number | ''>(400000);
  const [monthlyRent, setMonthlyRent] = useState<number | ''>(2100);
  const [stayYears, setStayYears] = useState<number>(7);
  const [downPaymentPct, setDownPaymentPct] = useState<number | ''>(20);
  const [interestRate, setInterestRate] = useState<number | ''>(6.5);
  const [homeAppreciation, setHomeAppreciation] = useState<number | ''>(3.5);
  const [rentIncrease, setRentIncrease] = useState<number | ''>(3.0);

  const handleReset = () => {
    setHomePrice(400000);
    setMonthlyRent(2100);
    setStayYears(7);
    setDownPaymentPct(20);
    setInterestRate(6.5);
    setHomeAppreciation(3.5);
    setRentIncrease(3.0);
  };

  const results = useMemo(() => {
    if (
      homePrice === '' ||
      monthlyRent === '' ||
      interestRate === '' ||
      downPaymentPct === '' ||
      homeAppreciation === '' ||
      rentIncrease === ''
    ) {
      return null;
    }

    const hp = homePrice;
    const mr = monthlyRent;
    const sy = stayYears;
    const dpPct = downPaymentPct;
    const ir = interestRate;
    const ha = homeAppreciation;
    const ri = rentIncrease;

    if (hp <= 0 || mr < 0 || dpPct < 0 || dpPct > 100 || ir < 0 || ri < -100 || ha < -100) {
      return { error: 'Enter a positive home price, 0–100% down payment, and valid rates.' } as const;
    }

    const downPayment = hp * (dpPct / 100);
    const loanPrincipal = hp - downPayment;
    const r = (ir / 100) / 12;
    const n = 30 * 12;
    const monthlyMortgage = r > 0 && loanPrincipal > 0
      ? (loanPrincipal * (r * Math.pow(1 + r, n))) / (Math.pow(1 + r, n) - 1)
      : (loanPrincipal > 0 ? loanPrincipal / n : 0);

    // Property tax & insurance (~1.5% of home price / yr) + maintenance (~1% / yr)
    const monthlyTaxAndIns = (hp * 0.015) / 12;
    const monthlyMaintenance = (hp * 0.01) / 12;
    const totalMonthlyBuyCost = monthlyMortgage + monthlyTaxAndIns + monthlyMaintenance;

    let cumulativeRent = 0;
    let currentRent = mr;
    for (let y = 0; y < sy; y++) {
      cumulativeRent += currentRent * 12;
      currentRent *= (1 + ri / 100);
    }

    const p = Math.min(n, sy * 12);
    const remainingBalance = loanPrincipal <= 0
      ? 0
      : r > 0
        ? loanPrincipal * ((Math.pow(1 + r, n) - Math.pow(1 + r, p)) / (Math.pow(1 + r, n) - 1))
        : loanPrincipal * Math.max(0, 1 - p / n);

    const futureHomeVal = hp * Math.pow(1 + ha / 100, sy);
    const cumulativeBuyCost = (totalMonthlyBuyCost * 12 * sy) + downPayment;
    const estimatedHomeEquity = futureHomeVal - remainingBalance;
    const netCostBuying = cumulativeBuyCost - estimatedHomeEquity;

    const cheaperOption = netCostBuying < cumulativeRent ? 'Buying' : 'Renting';
    const difference = Math.abs(cumulativeRent - netCostBuying);

    return {
      monthlyMortgage,
      totalMonthlyBuyCost,
      cumulativeRent,
      futureHomeVal,
      remainingBalance,
      estimatedHomeEquity,
      netCostBuying,
      cheaperOption,
      difference
    };
  }, [homePrice, monthlyRent, stayYears, downPaymentPct, interestRate, homeAppreciation, rentIncrease]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-6 rounded-2xl border border-slate-200">
        <div className="space-y-3.5">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold uppercase text-slate-700 tracking-wider">Housing Scenario</h4>
            <button
              type="button"
              onClick={handleReset}
              className="text-xs font-semibold text-slate-500 hover:text-slate-900 flex items-center gap-1 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Reset
            </button>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Target Home Price ({currencySymbol})</label>
              <DecimalInput
                value={homePrice}
                onValueChange={setHomePrice}
                className="w-full px-2.5 py-1.5 border rounded-lg text-xs font-bold"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Comparable Rent ({currencySymbol}/mo)</label>
              <DecimalInput
                value={monthlyRent}
                onValueChange={setMonthlyRent}
                className="w-full px-2.5 py-1.5 border rounded-lg text-xs font-bold"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2">
            <div>
              <label className="block text-[11px] font-semibold text-slate-600 mb-1">Stay Duration</label>
              <select
                value={stayYears}
                onChange={(e) => setStayYears(Number(e.target.value))}
                className="w-full px-2 py-1.5 border rounded-lg text-xs font-bold bg-white"
              >
                <option value={3}>3 Years</option>
                <option value={5}>5 Years</option>
                <option value={7}>7 Years</option>
                <option value={10}>10 Years</option>
                <option value={15}>15 Years</option>
              </select>
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-slate-600 mb-1">Mortgage Rate %</label>
              <DecimalInput
                value={interestRate}
                onValueChange={setInterestRate}
                className="w-full px-2 py-1.5 border rounded-lg text-xs font-bold"
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-slate-600 mb-1">Down Pmt %</label>
              <DecimalInput
                value={downPaymentPct}
                onValueChange={setDownPaymentPct}
                className="w-full px-2 py-1.5 border rounded-lg text-xs font-bold"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-semibold text-slate-600 mb-1">Home Apprec. (%/yr)</label>
              <DecimalInput
                value={homeAppreciation}
                onValueChange={setHomeAppreciation}
                allowNegative
                className="w-full px-2.5 py-1.5 border rounded-lg text-xs font-bold"
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-slate-600 mb-1">Rent Growth (%/yr)</label>
              <DecimalInput
                value={rentIncrease}
                onValueChange={setRentIncrease}
                allowNegative
                className="w-full px-2.5 py-1.5 border rounded-lg text-xs font-bold"
              />
            </div>
          </div>
          <p className="text-[11px] text-slate-500">
            Includes estimated 1.5%/yr property tax &amp; insurance plus 1.0%/yr maintenance on a 30-year fixed loan.
          </p>
        </div>

        {results && !('error' in results) ? (
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-5 rounded-xl border border-blue-200 flex flex-col justify-between space-y-4">
            <div>
              <span className="text-xs font-bold text-blue-900 uppercase tracking-wider">{stayYears}-Year Financial Verdict</span>
              <div className="text-2xl font-black text-blue-950 mt-1">
                {results.cheaperOption} is cheaper by {currencySymbol}{results.difference.toLocaleString(undefined, { maximumFractionDigits: 0 })}
              </div>
              <p className="text-xs text-slate-600 mt-1">Total estimated net cost over {stayYears} years factoring amortized home equity.</p>
            </div>

            <div className="bg-white p-3 rounded-lg border border-blue-100 text-xs text-slate-700 space-y-1.5">
              <div className="flex justify-between">
                <span>Total Rent Outflow ({stayYears} yrs):</span>
                <span className="font-bold">{currencySymbol}{results.cumulativeRent.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
              </div>
              <div className="flex justify-between">
                <span>Net Cost of Buying ({stayYears} yrs):</span>
                <span className="font-bold">
                  {results.netCostBuying < 0 ? '-' : ''}{currencySymbol}{Math.abs(results.netCostBuying).toLocaleString(undefined, { maximumFractionDigits: 0 })}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Remaining Loan Balance at Year {stayYears}:</span>
                <span className="font-semibold">{currencySymbol}{results.remainingBalance.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
              </div>
              <div className="flex justify-between border-t pt-1">
                <span>Projected Home Value in {stayYears} yrs:</span>
                <span className="font-bold text-orange-700">{currencySymbol}{results.futureHomeVal.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 text-center text-slate-500 text-xs flex items-center justify-center">
            {results && 'error' in results
              ? results.error
              : 'Enter home price, rent, and mortgage details to compare renting vs buying.'}
          </div>
        )}
      </div>
    </div>
  );
};

// 2. Refinance Breakeven Calculator
export const RefinanceCalculator: React.FC<BaseCalcProps> = ({ currencySymbol = '$' }) => {
  const [currentBalance, setCurrentBalance] = useState<number | ''>(300000);
  const [currentRate, setCurrentRate] = useState<number | ''>(7.0);
  const [currentTermRemaining, setCurrentTermRemaining] = useState<number | ''>(27);
  const [newRate, setNewRate] = useState<number | ''>(5.5);
  const [newTerm, setNewTerm] = useState<number | ''>(30);
  const [closingCosts, setClosingCosts] = useState<number | ''>(6000);

  const handleReset = () => {
    setCurrentBalance(300000);
    setCurrentRate(7.0);
    setCurrentTermRemaining(27);
    setNewRate(5.5);
    setNewTerm(30);
    setClosingCosts(6000);
  };

  const results = useMemo(() => {
    if (
      currentBalance === '' ||
      currentRate === '' ||
      currentTermRemaining === '' ||
      newRate === '' ||
      newTerm === '' ||
      closingCosts === ''
    ) {
      return null;
    }

    const cb = currentBalance;
    const cr = currentRate;
    const ctr = currentTermRemaining;
    const nr = newRate;
    const nt = newTerm;
    const cc = closingCosts;

    if (cb <= 0 || ctr <= 0 || nt <= 0 || cr < 0 || nr < 0 || cc < 0) {
      return { error: 'Enter a positive loan balance, term lengths above 0 years, and non-negative rates/costs.' } as const;
    }

    const rCurrent = (cr / 100) / 12;
    const nCurrent = ctr * 12;
    const currentMonthly = rCurrent > 0
      ? (cb * (rCurrent * Math.pow(1 + rCurrent, nCurrent))) / (Math.pow(1 + rCurrent, nCurrent) - 1)
      : cb / nCurrent;

    const rNew = (nr / 100) / 12;
    const nNew = nt * 12;
    const newMonthly = rNew > 0
      ? (cb * (rNew * Math.pow(1 + rNew, nNew))) / (Math.pow(1 + rNew, nNew) - 1)
      : cb / nNew;

    const monthlySavings = currentMonthly - newMonthly;
    const breakevenMonths = monthlySavings > 0 ? Math.ceil(cc / monthlySavings) : Infinity;

    return {
      currentMonthly,
      newMonthly,
      monthlySavings,
      breakevenMonths
    };
  }, [currentBalance, currentRate, currentTermRemaining, newRate, newTerm, closingCosts]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-6 rounded-2xl border border-slate-200">
        <div className="space-y-3.5">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold uppercase text-slate-700 tracking-wider">Mortgage Details</h4>
            <button
              type="button"
              onClick={handleReset}
              className="text-xs font-semibold text-slate-500 hover:text-slate-900 flex items-center gap-1 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Reset
            </button>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Current Balance ({currencySymbol})</label>
              <DecimalInput
                value={currentBalance}
                onValueChange={setCurrentBalance}
                className="w-full px-2.5 py-1.5 border rounded-lg text-xs font-bold"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Closing Costs ({currencySymbol})</label>
              <DecimalInput
                value={closingCosts}
                onValueChange={setClosingCosts}
                className="w-full px-2.5 py-1.5 border rounded-lg text-xs font-bold"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="p-2.5 bg-slate-50 rounded-lg border space-y-2">
              <span className="text-[11px] font-bold text-slate-700 block">Current Loan</span>
              <div>
                <label className="block text-[10px] text-slate-500 mb-0.5">Rate (%)</label>
                <DecimalInput
                  value={currentRate}
                  onValueChange={setCurrentRate}
                  className="w-full p-1 border rounded text-xs font-bold bg-white"
                />
              </div>
              <div>
                <label className="block text-[10px] text-slate-500 mb-0.5">Remaining Term (Yrs)</label>
                <DecimalInput
                  value={currentTermRemaining}
                  onValueChange={setCurrentTermRemaining}
                  className="w-full p-1 border rounded text-xs font-bold bg-white"
                />
              </div>
            </div>

            <div className="p-2.5 bg-orange-50 rounded-lg border border-orange-200 space-y-2">
              <span className="text-[11px] font-bold text-orange-800 block">New Refinance Loan</span>
              <div>
                <label className="block text-[10px] text-orange-800 mb-0.5">Rate (%)</label>
                <DecimalInput
                  value={newRate}
                  onValueChange={setNewRate}
                  className="w-full p-1 border rounded text-xs font-bold bg-white"
                />
              </div>
              <div>
                <label className="block text-[10px] text-orange-800 mb-0.5">New Term (Yrs)</label>
                <DecimalInput
                  value={newTerm}
                  onValueChange={setNewTerm}
                  className="w-full p-1 border rounded text-xs font-bold bg-white"
                />
              </div>
            </div>
          </div>
        </div>

        {results && !('error' in results) ? (
          <div className="bg-gradient-to-br from-orange-50 to-teal-50 p-5 rounded-xl border border-orange-200 flex flex-col justify-between space-y-4">
            <div>
              <span className="text-xs font-bold text-orange-900 uppercase tracking-wider">Monthly Payment Savings</span>
              <div className="text-3xl font-black text-orange-950 font-mono-numbers mt-1">
                {results.monthlySavings < 0 ? '-' : ''}{currencySymbol}{Math.abs(results.monthlySavings).toFixed(2)}
                <span className="text-xs font-normal text-orange-700"> / month</span>
              </div>
            </div>

            <div className="bg-white p-3 rounded-lg border border-orange-100 text-xs text-slate-700 space-y-1.5">
              <div className="flex justify-between">
                <span>Closing Cost Breakeven Time:</span>
                <span className="font-bold text-orange-800">
                  {results.breakevenMonths === Infinity ? 'No monthly savings' : `${results.breakevenMonths} months (${(results.breakevenMonths / 12).toFixed(1)} yrs)`}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Old Monthly P&amp;I:</span>
                <span>{currencySymbol}{results.currentMonthly.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>New Monthly P&amp;I:</span>
                <span>{currencySymbol}{results.newMonthly.toFixed(2)}</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 text-center text-slate-500 text-xs flex items-center justify-center">
            {results && 'error' in results
              ? results.error
              : 'Enter loan balance, rates, terms, and closing costs to calculate refinance savings.'}
          </div>
        )}
      </div>
    </div>
  );
};

// 3. Cash-on-Cash Return Calculator
export const CashOnCashCalculator: React.FC<BaseCalcProps> = ({ currencySymbol = '$' }) => {
  const [annualCashFlow, setAnnualCashFlow] = useState<number | ''>(8400);
  const [downPayment, setDownPayment] = useState<number | ''>(60000);
  const [closingCosts, setClosingCosts] = useState<number | ''>(5000);
  const [rehabRepairs, setRehabRepairs] = useState<number | ''>(15000);

  const handleReset = () => {
    setAnnualCashFlow(8400);
    setDownPayment(60000);
    setClosingCosts(5000);
    setRehabRepairs(15000);
  };

  const results = useMemo(() => {
    if (annualCashFlow === '' || downPayment === '') return null;
    const acf = annualCashFlow;
    const dp = downPayment;
    const cc = typeof closingCosts === 'number' ? closingCosts : 0;
    const rr = typeof rehabRepairs === 'number' ? rehabRepairs : 0;

    const totalCashInvested = dp + cc + rr;
    if (totalCashInvested <= 0) {
      return { error: 'Total out-of-pocket cash invested must be greater than zero.' } as const;
    }
    const cocReturn = (acf / totalCashInvested) * 100;

    return { acf, totalCashInvested, cocReturn };
  }, [annualCashFlow, downPayment, closingCosts, rehabRepairs]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-6 rounded-2xl border border-slate-200">
        <div className="space-y-3.5">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold uppercase text-slate-700 tracking-wider">Cash Invested &amp; Pre-Tax Income</h4>
            <button
              type="button"
              onClick={handleReset}
              className="text-xs font-semibold text-slate-500 hover:text-slate-900 flex items-center gap-1 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Reset
            </button>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Annual Pre-Tax Net Cash Flow ({currencySymbol})</label>
            <DecimalInput
              value={annualCashFlow}
              onValueChange={setAnnualCashFlow}
              allowNegative
              className="w-full px-3 py-1.5 border rounded-lg text-xs font-bold"
            />
          </div>
          <div className="grid grid-cols-3 gap-2">
            <div>
              <label className="block text-[11px] font-semibold text-slate-600 mb-1">Down Payment</label>
              <DecimalInput
                value={downPayment}
                onValueChange={setDownPayment}
                className="w-full px-2 py-1.5 border rounded-lg text-xs font-bold"
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-slate-600 mb-1">Closing Costs</label>
              <DecimalInput
                value={closingCosts}
                onValueChange={setClosingCosts}
                className="w-full px-2 py-1.5 border rounded-lg text-xs font-bold"
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-slate-600 mb-1">Rehab / Repairs</label>
              <DecimalInput
                value={rehabRepairs}
                onValueChange={setRehabRepairs}
                className="w-full px-2 py-1.5 border rounded-lg text-xs font-bold"
              />
            </div>
          </div>
        </div>

        {results && !('error' in results) ? (
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-5 rounded-xl border border-blue-200 flex flex-col justify-between space-y-4">
            <div>
              <span className="text-xs font-bold text-blue-900 uppercase tracking-wider">Cash-on-Cash (CoC) Return</span>
              <div className="text-3xl font-black text-blue-950 font-mono-numbers mt-1">
                {results.cocReturn.toFixed(2)}%
              </div>
            </div>

            <div className="bg-white p-3 rounded-lg border border-blue-100 text-xs text-slate-700 space-y-1">
              <div className="flex justify-between">
                <span>Total Out-of-Pocket Cash Invested:</span>
                <span className="font-bold">{currencySymbol}{results.totalCashInvested.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Monthly Cash Flow:</span>
                <span className={`font-bold ${results.acf < 0 ? 'text-red-700' : 'text-orange-700'}`}>
                  {results.acf < 0 ? '-' : ''}{currencySymbol}{Math.abs(results.acf / 12).toFixed(2)} / mo
                </span>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 text-center text-slate-500 text-xs flex items-center justify-center">
            {results && 'error' in results
              ? results.error
              : 'Enter annual cash flow and down payment to calculate cash-on-cash return.'}
          </div>
        )}
      </div>
    </div>
  );
};

// 4. Gross Rent Multiplier (GRM) Calculator
export const GrmCalculator: React.FC<BaseCalcProps> = ({ currencySymbol = '$' }) => {
  const [propertyPrice, setPropertyPrice] = useState<number | ''>(350000);
  const [annualGrossRent, setAnnualGrossRent] = useState<number | ''>(36000);

  const handleReset = () => {
    setPropertyPrice(350000);
    setAnnualGrossRent(36000);
  };

  const results = useMemo(() => {
    if (propertyPrice === '' || annualGrossRent === '') return null;
    if (propertyPrice <= 0 || annualGrossRent <= 0) {
      return { error: 'Both property purchase price and gross annual rent must be greater than zero.' } as const;
    }
    const grm = propertyPrice / annualGrossRent;
    return { grm };
  }, [propertyPrice, annualGrossRent]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-6 rounded-2xl border border-slate-200">
        <div className="space-y-3.5">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold uppercase text-slate-700 tracking-wider">Property &amp; Rent Price</h4>
            <button
              type="button"
              onClick={handleReset}
              className="text-xs font-semibold text-slate-500 hover:text-slate-900 flex items-center gap-1 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Reset
            </button>
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Property Purchase Price ({currencySymbol})</label>
            <DecimalInput
              value={propertyPrice}
              onValueChange={setPropertyPrice}
              className="w-full px-3 py-1.5 border rounded-lg text-xs font-bold"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Gross Annual Rental Income ({currencySymbol})</label>
            <DecimalInput
              value={annualGrossRent}
              onValueChange={setAnnualGrossRent}
              className="w-full px-3 py-1.5 border rounded-lg text-xs font-bold"
            />
          </div>
        </div>

        {results && !('error' in results) ? (
          <div className="bg-gradient-to-br from-slate-50 to-blue-50 p-5 rounded-xl border border-slate-200 flex flex-col justify-between space-y-4">
            <div>
              <span className="text-xs font-bold text-slate-600 uppercase tracking-wider">Gross Rent Multiplier (GRM)</span>
              <div className="text-3xl font-black text-slate-900 font-mono-numbers mt-1">
                {results.grm.toFixed(2)}
              </div>
              <p className="text-xs text-slate-500 mt-1">Lower GRM indicates gross rent recovers the purchase price faster; compare against local market comps.</p>
            </div>
          </div>
        ) : (
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 text-center text-slate-500 text-xs flex items-center justify-center">
            {results && 'error' in results
              ? results.error
              : 'Enter purchase price and gross annual rent to calculate GRM.'}
          </div>
        )}
      </div>
    </div>
  );
};

// 5. Capital Gains Tax Calculator
export const CapitalGainsCalculator: React.FC<BaseCalcProps> = ({ currencySymbol = '$' }) => {
  const [purchasePrice, setPurchasePrice] = useState<number | ''>(10000);
  const [sellingPrice, setSellingPrice] = useState<number | ''>(25000);
  const [holdingPeriodMonths, setHoldingPeriodMonths] = useState<number | ''>(18);
  const [taxableIncome, setTaxableIncome] = useState<number | ''>(90000);

  const handleReset = () => {
    setPurchasePrice(10000);
    setSellingPrice(25000);
    setHoldingPeriodMonths(18);
    setTaxableIncome(90000);
  };

  const results = useMemo(() => {
    if (purchasePrice === '' || sellingPrice === '' || taxableIncome === '') return null;
    const pp = purchasePrice;
    const sp = sellingPrice;
    const hpm = typeof holdingPeriodMonths === 'number' ? holdingPeriodMonths : 0;
    const ti = taxableIncome;

    if (pp < 0 || sp < 0 || hpm < 0 || ti < 0) {
      return { error: 'Enter non-negative prices, holding months, and taxable income.' } as const;
    }

    const gain = sp - pp;
    const isLongTerm = hpm >= 12;

    // Estimated US Single-filer Federal brackets
    let taxRate = 0;
    if (gain <= 0) {
      taxRate = 0;
    } else if (isLongTerm) {
      if (ti > 518900) taxRate = 20;
      else if (ti > 47025) taxRate = 15;
      else taxRate = 0;
    } else {
      if (ti > 609350) taxRate = 37;
      else if (ti > 243725) taxRate = 35;
      else if (ti > 191950) taxRate = 32;
      else if (ti > 100525) taxRate = 24;
      else if (ti > 47150) taxRate = 22;
      else if (ti > 11600) taxRate = 12;
      else taxRate = 10;
    }

    const estimatedTax = gain > 0 ? (gain * taxRate) / 100 : 0;
    const netProceeds = sp - estimatedTax;

    return { gain, isLongTerm, taxRate, estimatedTax, netProceeds };
  }, [purchasePrice, sellingPrice, holdingPeriodMonths, taxableIncome]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-6 rounded-2xl border border-slate-200">
        <div className="space-y-3.5">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold uppercase text-slate-700 tracking-wider">Asset Purchase &amp; Sale</h4>
            <button
              type="button"
              onClick={handleReset}
              className="text-xs font-semibold text-slate-500 hover:text-slate-900 flex items-center gap-1 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Reset
            </button>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Cost Basis / Purchase ({currencySymbol})</label>
              <DecimalInput
                value={purchasePrice}
                onValueChange={setPurchasePrice}
                className="w-full px-2.5 py-1.5 border rounded-lg text-xs font-bold"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Selling Price ({currencySymbol})</label>
              <DecimalInput
                value={sellingPrice}
                onValueChange={setSellingPrice}
                className="w-full px-2.5 py-1.5 border rounded-lg text-xs font-bold"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Holding Period (Months)</label>
              <DecimalInput
                value={holdingPeriodMonths}
                onValueChange={setHoldingPeriodMonths}
                allowDecimal={false}
                className="w-full px-2.5 py-1.5 border rounded-lg text-xs font-bold"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Taxable Income ({currencySymbol})</label>
              <DecimalInput
                value={taxableIncome}
                onValueChange={setTaxableIncome}
                className="w-full px-2.5 py-1.5 border rounded-lg text-xs font-bold"
              />
            </div>
          </div>
        </div>

        {results && !('error' in results) ? (
          <div className="bg-gradient-to-br from-amber-50 to-orange-50 p-5 rounded-xl border border-amber-200 flex flex-col justify-between space-y-4">
            <div>
              <div className="flex justify-between items-center gap-2">
                <span className="text-xs font-bold text-amber-900 uppercase tracking-wider">Estimated Tax Owed</span>
                <span className={`px-2 py-0.5 rounded text-[11px] font-bold ${results.gain < 0 ? 'bg-red-100 text-red-800' : results.isLongTerm ? 'bg-orange-100 text-orange-800' : 'bg-amber-100 text-amber-900'}`}>
                  {results.gain < 0 ? 'Capital Loss' : results.isLongTerm ? 'Long-Term Gain (≥ 12 mo)' : 'Short-Term Ordinary Rate'}
                </span>
              </div>
              <div className="text-3xl font-black text-amber-950 font-mono-numbers mt-2">
                {currencySymbol}{results.estimatedTax.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </div>
              <span className="text-xs text-amber-800 font-semibold">
                {results.gain <= 0 ? 'No capital gains tax on a loss or $0 gain' : `Bracket Rate: ${results.taxRate}%`}
              </span>
            </div>

            <div className="bg-white p-3 rounded-lg border border-amber-100 text-xs text-slate-700 space-y-1">
              <div className="flex justify-between">
                <span>{results.gain < 0 ? 'Realized Capital Loss:' : 'Gross Capital Gain:'}</span>
                <span className={`font-bold ${results.gain < 0 ? 'text-red-700' : 'text-orange-700'}`}>
                  {results.gain < 0 ? '-' : ''}{currencySymbol}{Math.abs(results.gain).toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between border-t pt-1">
                <span>Net After-Tax Proceeds:</span>
                <span className="font-bold text-slate-900">{currencySymbol}{results.netProceeds.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 text-center text-slate-500 text-xs flex items-center justify-center">
            {results && 'error' in results
              ? results.error
              : 'Enter purchase price, selling price, and taxable income to calculate capital gains tax.'}
          </div>
        )}
      </div>
    </div>
  );
};

// 6. Tip & Bill Splitter Calculator
export const TipCalculator: React.FC<BaseCalcProps> = ({ currencySymbol = '$' }) => {
  const [billAmount, setBillAmount] = useState<number | ''>(84.5);
  const [tipPercent, setTipPercent] = useState<number>(18);
  const [splitCount, setSplitCount] = useState<number>(2);

  const handleReset = () => {
    setBillAmount(84.5);
    setTipPercent(18);
    setSplitCount(2);
  };

  const results = useMemo(() => {
    if (billAmount === '' || billAmount < 0) return null;
    const ba = billAmount;
    const tipAmount = (ba * tipPercent) / 100;
    const totalWithTip = ba + tipAmount;
    const perPersonTotal = splitCount > 0 ? totalWithTip / splitCount : totalWithTip;
    const perPersonTip = splitCount > 0 ? tipAmount / splitCount : tipAmount;

    return { tipAmount, totalWithTip, perPersonTotal, perPersonTip };
  }, [billAmount, tipPercent, splitCount]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-6 rounded-2xl border border-slate-200">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold uppercase text-slate-700 tracking-wider">Bill &amp; Tip Setup</h4>
            <button
              type="button"
              onClick={handleReset}
              className="text-xs font-semibold text-slate-500 hover:text-slate-900 flex items-center gap-1 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Reset
            </button>
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Check / Bill Total ({currencySymbol})</label>
            <DecimalInput
              value={billAmount}
              onValueChange={setBillAmount}
              className="w-full px-3 py-2 border rounded-lg text-sm font-bold"
            />
          </div>

          <div>
            <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
              <span>Tip Percentage: {tipPercent}%</span>
            </div>
            <div className="grid grid-cols-4 gap-2">
              {[15, 18, 20, 25].map((pct) => (
                <button
                  key={pct}
                  type="button"
                  onClick={() => setTipPercent(pct)}
                  className={`py-1.5 text-xs font-bold rounded-lg border transition-colors ${tipPercent === pct ? 'bg-orange-600 border-orange-600 text-white' : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'}`}
                >
                  {pct}%
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Split Between ({splitCount} {splitCount === 1 ? 'Person' : 'People'})</label>
            <input
              type="range"
              min="1"
              max="20"
              value={splitCount}
              onChange={(e) => setSplitCount(Number(e.target.value))}
              className="w-full accent-orange-600 cursor-pointer"
            />
          </div>
        </div>

        {results ? (
          <div className="bg-gradient-to-br from-orange-50 to-teal-50 p-5 rounded-xl border border-orange-200 flex flex-col justify-between space-y-4">
            <div>
              <span className="text-xs font-bold text-orange-900 uppercase tracking-wider">Total Per Person</span>
              <div className="text-3xl font-black text-orange-950 font-mono-numbers mt-1">
                {currencySymbol}{results.perPersonTotal.toFixed(2)}
              </div>
              <span className="text-xs text-orange-700 font-semibold">Includes {currencySymbol}{results.perPersonTip.toFixed(2)} tip each</span>
            </div>

            <div className="bg-white p-3 rounded-lg border border-orange-100 text-xs text-slate-700 space-y-1">
              <div className="flex justify-between">
                <span>Total Tip Amount:</span>
                <span className="font-bold text-orange-800">{currencySymbol}{results.tipAmount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between border-t pt-1">
                <span>Grand Total with Tip:</span>
                <span className="font-bold text-slate-900">{currencySymbol}{results.totalWithTip.toFixed(2)}</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 text-center text-slate-500 text-xs flex items-center justify-center">
            Enter bill total to calculate tip and split.
          </div>
        )}
      </div>
    </div>
  );
};

// 7. VAT & Reverse VAT Calculator
export const VatCalculator: React.FC<BaseCalcProps> = ({ currencySymbol = '$' }) => {
  const [amount, setAmount] = useState<number | ''>(120);
  const [vatRate, setVatRate] = useState<number | ''>(20);
  const [mode, setMode] = useState<'add' | 'remove'>('add');

  const handleReset = () => {
    setAmount(120);
    setVatRate(20);
    setMode('add');
  };

  const results = useMemo(() => {
    if (amount === '' || vatRate === '') return null;
    const a = amount;
    const vr = vatRate;

    if (a <= 0 || vr < 0) {
      return { error: 'Enter a positive amount and a non-negative VAT percentage.' } as const;
    }

    if (mode === 'add') {
      const net = a;
      const vat = (net * vr) / 100;
      const gross = net + vat;
      return { net, vat, gross };
    } else {
      const gross = a;
      const net = gross / (1 + vr / 100);
      const vat = gross - net;
      return { net, vat, gross };
    }
  }, [amount, vatRate, mode]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-6 rounded-2xl border border-slate-200">
        <div className="space-y-3.5">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold uppercase text-slate-700 tracking-wider">VAT Computation Mode</h4>
            <button
              type="button"
              onClick={handleReset}
              className="text-xs font-semibold text-slate-500 hover:text-slate-900 flex items-center gap-1 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Reset
            </button>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => setMode('add')}
              className={`py-2 text-xs font-bold rounded-lg border transition-colors ${mode === 'add' ? 'bg-orange-600 border-orange-600 text-white' : 'bg-slate-50 border-slate-200 text-slate-700'}`}
            >
              Add VAT (Net → Gross)
            </button>
            <button
              type="button"
              onClick={() => setMode('remove')}
              className={`py-2 text-xs font-bold rounded-lg border transition-colors ${mode === 'remove' ? 'bg-orange-600 border-orange-600 text-white' : 'bg-slate-50 border-slate-200 text-slate-700'}`}
            >
              Remove VAT (Gross → Net)
            </button>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">
              {mode === 'add' ? 'Net Amount (Excl. VAT)' : 'Gross Amount (Incl. VAT)'} ({currencySymbol})
            </label>
            <DecimalInput
              value={amount}
              onValueChange={setAmount}
              className="w-full px-3 py-1.5 border rounded-lg text-xs font-bold"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">VAT Rate (%)</label>
            <DecimalInput
              value={vatRate}
              onValueChange={setVatRate}
              className="w-full px-3 py-1.5 border rounded-lg text-xs font-bold"
            />
          </div>
        </div>

        {results && !('error' in results) ? (
          <div className="bg-gradient-to-br from-indigo-50 to-blue-50 p-5 rounded-xl border border-indigo-200 flex flex-col justify-between space-y-4">
            <div>
              <span className="text-xs font-bold text-indigo-900 uppercase tracking-wider">
                {mode === 'add' ? 'Gross Price (With VAT)' : 'Net Price (Without VAT)'}
              </span>
              <div className="text-3xl font-black text-indigo-950 font-mono-numbers mt-1">
                {currencySymbol}{mode === 'add' ? results.gross.toFixed(2) : results.net.toFixed(2)}
              </div>
            </div>

            <div className="bg-white p-3 rounded-lg border border-indigo-100 text-xs text-slate-700 space-y-1">
              <div className="flex justify-between">
                <span>Net Price (Excl. VAT):</span>
                <span className="font-bold">{currencySymbol}{results.net.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>VAT ({typeof vatRate === 'number' ? vatRate : 0}%):</span>
                <span className="font-bold text-orange-700">{currencySymbol}{results.vat.toFixed(2)}</span>
              </div>
              <div className="flex justify-between border-t pt-1 font-bold text-slate-900">
                <span>Gross Total:</span>
                <span>{currencySymbol}{results.gross.toFixed(2)}</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 text-center text-slate-500 text-xs flex items-center justify-center">
            {results && 'error' in results
              ? results.error
              : 'Enter price amount and VAT rate to calculate tax.'}
          </div>
        )}
      </div>
    </div>
  );
};
