import React, { useState, useMemo } from 'react';
import { Building, DollarSign, Receipt, Percent, RotateCcw, Copy, Check, TrendingUp } from 'lucide-react';
import { copyToClipboard, formatCurrency } from '../../utils/formatters';

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

  const results = useMemo(() => {
    if (
      homePrice === '' ||
      monthlyRent === '' ||
      interestRate === '' ||
      downPaymentPct === ''
    ) {
      return null;
    }

    const hp = homePrice;
    const mr = monthlyRent;
    const sy = typeof stayYears === 'number' ? stayYears : 7;
    const dpPct = downPaymentPct;
    const ir = interestRate;
    const ha = typeof homeAppreciation === 'number' ? homeAppreciation : 0;
    const ri = typeof rentIncrease === 'number' ? rentIncrease : 0;

    const downPayment = hp * (dpPct / 100);
    const loanPrincipal = hp - downPayment;
    const r = (ir / 100) / 12;
    const n = 30 * 12;
    const monthlyMortgage = r > 0 && loanPrincipal > 0 
      ? (loanPrincipal * (r * Math.pow(1 + r, n))) / (Math.pow(1 + r, n) - 1)
      : (loanPrincipal > 0 ? loanPrincipal / n : 0);
    
    // Property tax & insurance (~1.5% of home price / yr)
    const monthlyTaxAndIns = (hp * 0.015) / 12;
    const monthlyMaintenance = (hp * 0.01) / 12;
    const totalMonthlyBuyCost = monthlyMortgage + monthlyTaxAndIns + monthlyMaintenance;

    let cumulativeRent = 0;
    let currentRent = mr;
    for (let y = 0; y < sy; y++) {
      cumulativeRent += currentRent * 12;
      currentRent *= (1 + ri / 100);
    }

    const futureHomeVal = hp * Math.pow(1 + ha / 100, sy);
    const cumulativeBuyCost = (totalMonthlyBuyCost * 12 * sy) + downPayment;
    const estimatedHomeEquity = futureHomeVal - (loanPrincipal * 0.85); // approx principal paid off
    const netCostBuying = cumulativeBuyCost - estimatedHomeEquity;

    const cheaperOption = netCostBuying < cumulativeRent ? 'Buying' : 'Renting';
    const difference = Math.abs(cumulativeRent - netCostBuying);

    return {
      monthlyMortgage,
      totalMonthlyBuyCost,
      cumulativeRent,
      futureHomeVal,
      netCostBuying,
      cheaperOption,
      difference
    };
  }, [homePrice, monthlyRent, stayYears, downPaymentPct, interestRate, homeAppreciation, rentIncrease]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-6 rounded-2xl border border-slate-200">
        <div className="space-y-3.5">
          <h4 className="text-xs font-bold uppercase text-slate-700 tracking-wider">Housing Scenario</h4>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Target Home Price ({currencySymbol})</label>
              <input
                type="number"
                value={homePrice}
                onChange={(e) => setHomePrice(e.target.value === '' ? '' : Math.max(0, Number(e.target.value)))}
                className="w-full px-2.5 py-1.5 border rounded-lg text-xs font-bold"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Comparable Rent ({currencySymbol}/mo)</label>
              <input
                type="number"
                value={monthlyRent}
                onChange={(e) => setMonthlyRent(e.target.value === '' ? '' : Math.max(0, Number(e.target.value)))}
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
                className="w-full px-2 py-1.5 border rounded-lg text-xs font-bold"
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
              <input
                type="number"
                step="0.1"
                value={interestRate}
                onChange={(e) => setInterestRate(e.target.value === '' ? '' : Number(e.target.value))}
                className="w-full px-2 py-1.5 border rounded-lg text-xs font-bold"
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-slate-600 mb-1">Down Pmt %</label>
              <input
                type="number"
                value={downPaymentPct}
                onChange={(e) => setDownPaymentPct(e.target.value === '' ? '' : Number(e.target.value))}
                className="w-full px-2 py-1.5 border rounded-lg text-xs font-bold"
              />
            </div>
          </div>
        </div>

        {results ? (
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-5 rounded-xl border border-blue-200 flex flex-col justify-between space-y-4">
            <div>
              <span className="text-xs font-bold text-blue-900 uppercase tracking-wider">{stayYears}-Year Financial Verdict</span>
              <div className="text-2xl font-black text-blue-950 mt-1">
                {results.cheaperOption} is cheaper by {currencySymbol}{results.difference.toLocaleString(undefined, { maximumFractionDigits: 0 })}
              </div>
              <p className="text-xs text-slate-600 mt-1">Total estimated net cost over {stayYears} years factoring equity.</p>
            </div>

            <div className="bg-white p-3 rounded-lg border border-blue-100 text-xs text-slate-700 space-y-1.5">
              <div className="flex justify-between">
                <span>Total Rent Outflow ({stayYears} yrs):</span>
                <span className="font-bold">{currencySymbol}{results.cumulativeRent.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
              </div>
              <div className="flex justify-between">
                <span>Net Cost of Buying ({stayYears} yrs):</span>
                <span className="font-bold">{currencySymbol}{results.netCostBuying.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
              </div>
              <div className="flex justify-between border-t pt-1">
                <span>Projected Home Value in {stayYears} yrs:</span>
                <span className="font-bold text-orange-700">{currencySymbol}{results.futureHomeVal.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 text-center text-slate-500 text-xs flex items-center justify-center">
            Enter home price, rent, and mortgage details to compare renting vs buying.
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
  const [currentTermRemaining, setCurrentTermRemaining] = useState<number | ''>(27); // years
  const [newRate, setNewRate] = useState<number | ''>(5.5);
  const [newTerm, setNewTerm] = useState<number | ''>(30);
  const [closingCosts, setClosingCosts] = useState<number | ''>(6000);

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

    const rCurrent = (cr / 100) / 12;
    const nCurrent = ctr * 12;
    const currentMonthly = (rCurrent > 0 && nCurrent > 0)
      ? (cb * (rCurrent * Math.pow(1 + rCurrent, nCurrent))) / (Math.pow(1 + rCurrent, nCurrent) - 1)
      : (nCurrent > 0 ? cb / nCurrent : 0);

    const rNew = (nr / 100) / 12;
    const nNew = nt * 12;
    const newMonthly = (rNew > 0 && nNew > 0)
      ? (cb * (rNew * Math.pow(1 + rNew, nNew))) / (Math.pow(1 + rNew, nNew) - 1)
      : (nNew > 0 ? cb / nNew : 0);

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
          <h4 className="text-xs font-bold uppercase text-slate-700 tracking-wider">Mortgage Details</h4>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Current Balance ({currencySymbol})</label>
              <input
                type="number"
                value={currentBalance}
                onChange={(e) => setCurrentBalance(e.target.value === '' ? '' : Math.max(0, Number(e.target.value)))}
                className="w-full px-2.5 py-1.5 border rounded-lg text-xs font-bold"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Closing Costs ({currencySymbol})</label>
              <input
                type="number"
                value={closingCosts}
                onChange={(e) => setClosingCosts(e.target.value === '' ? '' : Math.max(0, Number(e.target.value)))}
                className="w-full px-2.5 py-1.5 border rounded-lg text-xs font-bold"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="p-2.5 bg-slate-50 rounded-lg border space-y-1.5">
              <span className="text-[11px] font-bold text-slate-700">Current Loan Rate (%)</span>
              <input
                type="number"
                step="0.1"
                value={currentRate}
                onChange={(e) => setCurrentRate(e.target.value === '' ? '' : Number(e.target.value))}
                placeholder="Rate %"
                className="w-full p-1 border rounded text-xs font-bold bg-white"
              />
            </div>
            <div className="p-2.5 bg-orange-50 rounded-lg border border-orange-200 space-y-1.5">
              <span className="text-[11px] font-bold text-orange-800">New Refinance Loan Rate (%)</span>
              <input
                type="number"
                step="0.1"
                value={newRate}
                onChange={(e) => setNewRate(e.target.value === '' ? '' : Number(e.target.value))}
                placeholder="Rate %"
                className="w-full p-1 border rounded text-xs font-bold bg-white"
              />
            </div>
          </div>
        </div>

        {results ? (
          <div className="bg-gradient-to-br from-orange-50 to-teal-50 p-5 rounded-xl border border-orange-200 flex flex-col justify-between space-y-4">
            <div>
              <span className="text-xs font-bold text-orange-900 uppercase tracking-wider">Monthly Payment Savings</span>
              <div className="text-3xl font-black text-orange-950 font-mono-numbers mt-1">
                {currencySymbol}{results.monthlySavings.toFixed(2)}
                <span className="text-xs font-normal text-orange-700"> / month</span>
              </div>
            </div>

            <div className="bg-white p-3 rounded-lg border border-orange-100 text-xs text-slate-700 space-y-1.5">
              <div className="flex justify-between">
                <span>Closing Cost Breakeven Time:</span>
                <span className="font-bold text-orange-800">
                  {results.breakevenMonths === Infinity ? 'No savings' : `${results.breakevenMonths} months (${(results.breakevenMonths / 12).toFixed(1)} yrs)`}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Old Monthly P&I:</span>
                <span>{currencySymbol}{results.currentMonthly.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>New Monthly P&I:</span>
                <span>{currencySymbol}{results.newMonthly.toFixed(2)}</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 text-center text-slate-500 text-xs flex items-center justify-center">
            Enter loan balance, rates, and closing costs to calculate refinance savings.
          </div>
        )}
      </div>
    </div>
  );
};

// 3. Cash-on-Cash Return Calculator
export const CashOnCashCalculator: React.FC<BaseCalcProps> = ({ currencySymbol = '$' }) => {
  const [annualCashFlow, setAnnualCashFlow] = useState<number | ''>(8400); // $700/mo net
  const [downPayment, setDownPayment] = useState<number | ''>(60000);
  const [closingCosts, setClosingCosts] = useState<number | ''>(5000);
  const [rehabRepairs, setRehabRepairs] = useState<number | ''>(15000);

  const results = useMemo(() => {
    if (annualCashFlow === '' || downPayment === '') return null;
    const acf = annualCashFlow;
    const dp = downPayment;
    const cc = typeof closingCosts === 'number' ? closingCosts : 0;
    const rr = typeof rehabRepairs === 'number' ? rehabRepairs : 0;

    const totalCashInvested = dp + cc + rr;
    const cocReturn = totalCashInvested > 0 ? (acf / totalCashInvested) * 100 : 0;

    return { acf, totalCashInvested, cocReturn };
  }, [annualCashFlow, downPayment, closingCosts, rehabRepairs]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-6 rounded-2xl border border-slate-200">
        <div className="space-y-3.5">
          <h4 className="text-xs font-bold uppercase text-slate-700 tracking-wider">Cash Invested & Pre-Tax Income</h4>
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Annual Pre-Tax Net Cash Flow ({currencySymbol})</label>
            <input
              type="number"
              value={annualCashFlow}
              onChange={(e) => setAnnualCashFlow(e.target.value === '' ? '' : Number(e.target.value))}
              className="w-full px-3 py-1.5 border rounded-lg text-xs font-bold"
            />
          </div>
          <div className="grid grid-cols-3 gap-2">
            <div>
              <label className="block text-[11px] font-semibold text-slate-600 mb-1">Down Payment</label>
              <input
                type="number"
                value={downPayment}
                onChange={(e) => setDownPayment(e.target.value === '' ? '' : Math.max(0, Number(e.target.value)))}
                className="w-full px-2 py-1.5 border rounded-lg text-xs font-bold"
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-slate-600 mb-1">Closing Costs</label>
              <input
                type="number"
                value={closingCosts}
                onChange={(e) => setClosingCosts(e.target.value === '' ? '' : Math.max(0, Number(e.target.value)))}
                className="w-full px-2 py-1.5 border rounded-lg text-xs font-bold"
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-slate-600 mb-1">Rehab / Repairs</label>
              <input
                type="number"
                value={rehabRepairs}
                onChange={(e) => setRehabRepairs(e.target.value === '' ? '' : Math.max(0, Number(e.target.value)))}
                className="w-full px-2 py-1.5 border rounded-lg text-xs font-bold"
              />
            </div>
          </div>
        </div>

        {results ? (
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
                <span className="font-bold text-orange-700">{currencySymbol}{(results.acf / 12).toFixed(2)} / mo</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 text-center text-slate-500 text-xs flex items-center justify-center">
            Enter annual cash flow and down payment to calculate cash-on-cash return.
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

  const results = useMemo(() => {
    if (propertyPrice === '' || annualGrossRent === '' || annualGrossRent <= 0) return null;
    const pp = propertyPrice;
    const agr = annualGrossRent;
    const grm = pp / agr;
    return { grm };
  }, [propertyPrice, annualGrossRent]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-6 rounded-2xl border border-slate-200">
        <div className="space-y-3.5">
          <h4 className="text-xs font-bold uppercase text-slate-700 tracking-wider">Property & Rent Price</h4>
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Property Purchase Price ({currencySymbol})</label>
            <input
              type="number"
              value={propertyPrice}
              onChange={(e) => setPropertyPrice(e.target.value === '' ? '' : Math.max(0, Number(e.target.value)))}
              className="w-full px-3 py-1.5 border rounded-lg text-xs font-bold"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Gross Annual Rental Income ({currencySymbol})</label>
            <input
              type="number"
              value={annualGrossRent}
              onChange={(e) => setAnnualGrossRent(e.target.value === '' ? '' : Math.max(0, Number(e.target.value)))}
              className="w-full px-3 py-1.5 border rounded-lg text-xs font-bold"
            />
          </div>
        </div>

        {results ? (
          <div className="bg-gradient-to-br from-slate-50 to-blue-50 p-5 rounded-xl border border-slate-200 flex flex-col justify-between space-y-4">
            <div>
              <span className="text-xs font-bold text-slate-600 uppercase tracking-wider">Gross Rent Multiplier (GRM)</span>
              <div className="text-3xl font-black text-slate-900 font-mono-numbers mt-1">
                {results.grm.toFixed(2)}
              </div>
              <p className="text-xs text-slate-500 mt-1">A GRM between 6 and 9 is generally considered attractive in most rental markets.</p>
            </div>
          </div>
        ) : (
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 text-center text-slate-500 text-xs flex items-center justify-center">
            Enter purchase price and gross annual rent to calculate GRM.
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

  const results = useMemo(() => {
    if (purchasePrice === '' || sellingPrice === '' || taxableIncome === '') return null;
    const pp = purchasePrice;
    const sp = sellingPrice;
    const hpm = typeof holdingPeriodMonths === 'number' ? holdingPeriodMonths : 0;
    const ti = taxableIncome;

    const gain = sp - pp;
    const isLongTerm = hpm >= 12;

    // Approx US federal capital gains brackets
    let taxRate = 0;
    if (isLongTerm) {
      if (ti > 518900) taxRate = 20;
      else if (ti > 47025) taxRate = 15;
      else taxRate = 0;
    } else {
      // Short term -> standard income tax bracket approximation
      if (ti > 231250) taxRate = 35;
      else if (ti > 100525) taxRate = 24;
      else if (ti > 47150) taxRate = 22;
      else taxRate = 12;
    }

    const estimatedTax = gain > 0 ? (gain * taxRate) / 100 : 0;
    const netProceeds = sp - estimatedTax;

    return { gain, isLongTerm, taxRate, estimatedTax, netProceeds };
  }, [purchasePrice, sellingPrice, holdingPeriodMonths, taxableIncome]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-6 rounded-2xl border border-slate-200">
        <div className="space-y-3.5">
          <h4 className="text-xs font-bold uppercase text-slate-700 tracking-wider">Asset Purchase & Sale</h4>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Cost Basis / Purchase ({currencySymbol})</label>
              <input
                type="number"
                value={purchasePrice}
                onChange={(e) => setPurchasePrice(e.target.value === '' ? '' : Math.max(0, Number(e.target.value)))}
                className="w-full px-2.5 py-1.5 border rounded-lg text-xs font-bold"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Selling Price ({currencySymbol})</label>
              <input
                type="number"
                value={sellingPrice}
                onChange={(e) => setSellingPrice(e.target.value === '' ? '' : Math.max(0, Number(e.target.value)))}
                className="w-full px-2.5 py-1.5 border rounded-lg text-xs font-bold"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Holding Period (Months)</label>
              <input
                type="number"
                value={holdingPeriodMonths}
                onChange={(e) => setHoldingPeriodMonths(e.target.value === '' ? '' : Math.max(0, Number(e.target.value)))}
                className="w-full px-2.5 py-1.5 border rounded-lg text-xs font-bold"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Taxable Income ({currencySymbol})</label>
              <input
                type="number"
                value={taxableIncome}
                onChange={(e) => setTaxableIncome(e.target.value === '' ? '' : Math.max(0, Number(e.target.value)))}
                className="w-full px-2.5 py-1.5 border rounded-lg text-xs font-bold"
              />
            </div>
          </div>
        </div>

        {results ? (
          <div className="bg-gradient-to-br from-amber-50 to-orange-50 p-5 rounded-xl border border-amber-200 flex flex-col justify-between space-y-4">
            <div>
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-amber-900 uppercase tracking-wider">Estimated Tax Owed</span>
                <span className={`px-2 py-0.5 rounded text-[11px] font-bold ${results.isLongTerm ? 'bg-orange-100 text-orange-800' : 'bg-amber-100 text-amber-900'}`}>
                  {results.isLongTerm ? 'Long-Term Gain (≥ 1 Year)' : 'Short-Term Ordinary Rate'}
                </span>
              </div>
              <div className="text-3xl font-black text-amber-950 font-mono-numbers mt-2">
                {currencySymbol}{results.estimatedTax.toLocaleString(undefined, { minimumFractionDigits: 2 })}
              </div>
              <span className="text-xs text-amber-800 font-semibold">Effective Rate: {results.taxRate}%</span>
            </div>

            <div className="bg-white p-3 rounded-lg border border-amber-100 text-xs text-slate-700 space-y-1">
              <div className="flex justify-between">
                <span>Gross Capital Gain:</span>
                <span className="font-bold text-orange-700">{currencySymbol}{results.gain.toLocaleString()}</span>
              </div>
              <div className="flex justify-between border-t pt-1">
                <span>Net After-Tax Proceeds:</span>
                <span className="font-bold text-slate-900">{currencySymbol}{results.netProceeds.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 text-center text-slate-500 text-xs flex items-center justify-center">
            Enter purchase price, selling price, and taxable income to calculate capital gains tax.
          </div>
        )}
      </div>
    </div>
  );
};

// 6. Tip & Bill Splitter Calculator
export const TipCalculator: React.FC<BaseCalcProps> = ({ currencySymbol = '$' }) => {
  const [billAmount, setBillAmount] = useState<number | ''>(84.50);
  const [tipPercent, setTipPercent] = useState<number>(18);
  const [splitCount, setSplitCount] = useState<number>(2);

  const results = useMemo(() => {
    if (billAmount === '') return null;
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
          <h4 className="text-xs font-bold uppercase text-slate-700 tracking-wider">Bill & Tip Setup</h4>
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Check / Bill Total ({currencySymbol})</label>
            <input
              type="number"
              step="0.01"
              value={billAmount}
              onChange={(e) => setBillAmount(e.target.value === '' ? '' : Math.max(0, Number(e.target.value)))}
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
            <label className="block text-xs font-semibold text-slate-700 mb-1">Split Between ({splitCount} People)</label>
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
  const [vatRate, setVatRate] = useState<number | ''>(20); // 20% standard UK/EU
  const [mode, setMode] = useState<'add' | 'remove'>('add');

  const results = useMemo(() => {
    if (amount === '' || vatRate === '') return null;
    const a = amount;
    const vr = vatRate;

    if (a <= 0 || vr < 0) return { net: 0, vat: 0, gross: 0 };
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
          <h4 className="text-xs font-bold uppercase text-slate-700 tracking-wider">VAT Computation Mode</h4>
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
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value === '' ? '' : Math.max(0, Number(e.target.value)))}
              className="w-full px-3 py-1.5 border rounded-lg text-xs font-bold"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">VAT Rate (%)</label>
            <input
              type="number"
              step="0.5"
              value={vatRate}
              onChange={(e) => setVatRate(e.target.value === '' ? '' : Math.max(0, Number(e.target.value)))}
              className="w-full px-3 py-1.5 border rounded-lg text-xs font-bold"
            />
          </div>
        </div>

        {results ? (
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
            Enter price amount and VAT rate to calculate tax.
          </div>
        )}
      </div>
    </div>
  );
};
