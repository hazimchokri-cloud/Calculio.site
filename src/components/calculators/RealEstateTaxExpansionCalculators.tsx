import React, { useState, useMemo } from 'react';
import { Building, DollarSign, Receipt, Percent, RotateCcw, Copy, Check, TrendingUp } from 'lucide-react';
import { copyToClipboard, formatCurrency } from '../../utils/formatters';

interface BaseCalcProps {
  currencySymbol?: string;
  onSave?: (summary: string, inputs: any, results: any) => void;
}

// 1. Rent vs. Buy Home Calculator
export const RentVsBuyCalculator: React.FC<BaseCalcProps> = ({ currencySymbol = '$' }) => {
  const [homePrice, setHomePrice] = useState(400000);
  const [monthlyRent, setMonthlyRent] = useState(2100);
  const [stayYears, setStayYears] = useState(7);
  const [downPaymentPct, setDownPaymentPct] = useState(20);
  const [interestRate, setInterestRate] = useState(6.5);
  const [homeAppreciation, setHomeAppreciation] = useState(3.5);
  const [rentIncrease, setRentIncrease] = useState(3.0);

  const results = useMemo(() => {
    const downPayment = homePrice * (downPaymentPct / 100);
    const loanPrincipal = homePrice - downPayment;
    const r = interestRate / 100 / 12;
    const n = 30 * 12;
    const monthlyMortgage = (loanPrincipal * (r * Math.pow(1 + r, n))) / (Math.pow(1 + r, n) - 1);
    
    // Property tax & insurance (~1.5% of home price / yr)
    const monthlyTaxAndIns = (homePrice * 0.015) / 12;
    const monthlyMaintenance = (homePrice * 0.01) / 12;
    const totalMonthlyBuyCost = monthlyMortgage + monthlyTaxAndIns + monthlyMaintenance;

    let cumulativeRent = 0;
    let currentRent = monthlyRent;
    for (let y = 0; y < stayYears; y++) {
      cumulativeRent += currentRent * 12;
      currentRent *= (1 + rentIncrease / 100);
    }

    const futureHomeVal = homePrice * Math.pow(1 + homeAppreciation / 100, stayYears);
    const cumulativeBuyCost = (totalMonthlyBuyCost * 12 * stayYears) + downPayment;
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
                onChange={(e) => setHomePrice(Math.max(0, Number(e.target.value)))}
                className="w-full px-2.5 py-1.5 border rounded-lg text-xs font-bold"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Comparable Rent ({currencySymbol}/mo)</label>
              <input
                type="number"
                value={monthlyRent}
                onChange={(e) => setMonthlyRent(Math.max(0, Number(e.target.value)))}
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
                onChange={(e) => setInterestRate(Number(e.target.value))}
                className="w-full px-2 py-1.5 border rounded-lg text-xs font-bold"
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-slate-600 mb-1">Down Pmt %</label>
              <input
                type="number"
                value={downPaymentPct}
                onChange={(e) => setDownPaymentPct(Number(e.target.value))}
                className="w-full px-2 py-1.5 border rounded-lg text-xs font-bold"
              />
            </div>
          </div>
        </div>

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
      </div>
    </div>
  );
};

// 2. Refinance Breakeven Calculator
export const RefinanceCalculator: React.FC<BaseCalcProps> = ({ currencySymbol = '$' }) => {
  const [currentBalance, setCurrentBalance] = useState(300000);
  const [currentRate, setCurrentRate] = useState(7.0);
  const [currentTermRemaining, setCurrentTermRemaining] = useState(27); // years
  const [newRate, setNewRate] = useState(5.5);
  const [newTerm, setNewTerm] = useState(30);
  const [closingCosts, setClosingCosts] = useState(6000);

  const results = useMemo(() => {
    const rCurrent = currentRate / 100 / 12;
    const nCurrent = currentTermRemaining * 12;
    const currentMonthly = (currentBalance * (rCurrent * Math.pow(1 + rCurrent, nCurrent))) / (Math.pow(1 + rCurrent, nCurrent) - 1);

    const rNew = newRate / 100 / 12;
    const nNew = newTerm * 12;
    const newMonthly = (currentBalance * (rNew * Math.pow(1 + rNew, nNew))) / (Math.pow(1 + rNew, nNew) - 1);

    const monthlySavings = currentMonthly - newMonthly;
    const breakevenMonths = monthlySavings > 0 ? Math.ceil(closingCosts / monthlySavings) : Infinity;

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
                onChange={(e) => setCurrentBalance(Math.max(0, Number(e.target.value)))}
                className="w-full px-2.5 py-1.5 border rounded-lg text-xs font-bold"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Closing Costs ({currencySymbol})</label>
              <input
                type="number"
                value={closingCosts}
                onChange={(e) => setClosingCosts(Math.max(0, Number(e.target.value)))}
                className="w-full px-2.5 py-1.5 border rounded-lg text-xs font-bold"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="p-2.5 bg-slate-50 rounded-lg border space-y-1.5">
              <span className="text-[11px] font-bold text-slate-700">Current Loan</span>
              <input
                type="number"
                step="0.1"
                value={currentRate}
                onChange={(e) => setCurrentRate(Number(e.target.value))}
                placeholder="Rate %"
                className="w-full p-1 border rounded text-xs font-bold bg-white"
              />
            </div>
            <div className="p-2.5 bg-orange-50 rounded-lg border border-orange-200 space-y-1.5">
              <span className="text-[11px] font-bold text-orange-800">New Refinance Loan</span>
              <input
                type="number"
                step="0.1"
                value={newRate}
                onChange={(e) => setNewRate(Number(e.target.value))}
                placeholder="Rate %"
                className="w-full p-1 border rounded text-xs font-bold bg-white"
              />
            </div>
          </div>
        </div>

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
      </div>
    </div>
  );
};

// 3. Cash-on-Cash Return Calculator
export const CashOnCashCalculator: React.FC<BaseCalcProps> = ({ currencySymbol = '$' }) => {
  const [annualCashFlow, setAnnualCashFlow] = useState(8400); // $700/mo net
  const [downPayment, setDownPayment] = useState(60000);
  const [closingCosts, setClosingCosts] = useState(5000);
  const [rehabRepairs, setRehabRepairs] = useState(15000);

  const totalCashInvested = downPayment + closingCosts + rehabRepairs;
  const cocReturn = totalCashInvested > 0 ? (annualCashFlow / totalCashInvested) * 100 : 0;

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
              onChange={(e) => setAnnualCashFlow(Number(e.target.value))}
              className="w-full px-3 py-1.5 border rounded-lg text-xs font-bold"
            />
          </div>
          <div className="grid grid-cols-3 gap-2">
            <div>
              <label className="block text-[11px] font-semibold text-slate-600 mb-1">Down Payment</label>
              <input
                type="number"
                value={downPayment}
                onChange={(e) => setDownPayment(Math.max(0, Number(e.target.value)))}
                className="w-full px-2 py-1.5 border rounded-lg text-xs font-bold"
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-slate-600 mb-1">Closing Costs</label>
              <input
                type="number"
                value={closingCosts}
                onChange={(e) => setClosingCosts(Math.max(0, Number(e.target.value)))}
                className="w-full px-2 py-1.5 border rounded-lg text-xs font-bold"
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-slate-600 mb-1">Rehab / Repairs</label>
              <input
                type="number"
                value={rehabRepairs}
                onChange={(e) => setRehabRepairs(Math.max(0, Number(e.target.value)))}
                className="w-full px-2 py-1.5 border rounded-lg text-xs font-bold"
              />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-5 rounded-xl border border-blue-200 flex flex-col justify-between space-y-4">
          <div>
            <span className="text-xs font-bold text-blue-900 uppercase tracking-wider">Cash-on-Cash (CoC) Return</span>
            <div className="text-3xl font-black text-blue-950 font-mono-numbers mt-1">
              {cocReturn.toFixed(2)}%
            </div>
          </div>

          <div className="bg-white p-3 rounded-lg border border-blue-100 text-xs text-slate-700 space-y-1">
            <div className="flex justify-between">
              <span>Total Out-of-Pocket Cash Invested:</span>
              <span className="font-bold">{currencySymbol}{totalCashInvested.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span>Monthly Cash Flow:</span>
              <span className="font-bold text-orange-700">{currencySymbol}{(annualCashFlow / 12).toFixed(2)} / mo</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// 4. Gross Rent Multiplier (GRM) Calculator
export const GrmCalculator: React.FC<BaseCalcProps> = ({ currencySymbol = '$' }) => {
  const [propertyPrice, setPropertyPrice] = useState(350000);
  const [annualGrossRent, setAnnualGrossRent] = useState(36000);

  const grm = annualGrossRent > 0 ? propertyPrice / annualGrossRent : 0;

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
              onChange={(e) => setPropertyPrice(Math.max(0, Number(e.target.value)))}
              className="w-full px-3 py-1.5 border rounded-lg text-xs font-bold"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Gross Annual Rental Income ({currencySymbol})</label>
            <input
              type="number"
              value={annualGrossRent}
              onChange={(e) => setAnnualGrossRent(Math.max(0, Number(e.target.value)))}
              className="w-full px-3 py-1.5 border rounded-lg text-xs font-bold"
            />
          </div>
        </div>

        <div className="bg-gradient-to-br from-slate-50 to-blue-50 p-5 rounded-xl border border-slate-200 flex flex-col justify-between space-y-4">
          <div>
            <span className="text-xs font-bold text-slate-600 uppercase tracking-wider">Gross Rent Multiplier (GRM)</span>
            <div className="text-3xl font-black text-slate-900 font-mono-numbers mt-1">
              {grm.toFixed(2)}
            </div>
            <p className="text-xs text-slate-500 mt-1">A GRM between 6 and 9 is generally considered attractive in most rental markets.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

// 5. Capital Gains Tax Calculator
export const CapitalGainsCalculator: React.FC<BaseCalcProps> = ({ currencySymbol = '$' }) => {
  const [purchasePrice, setPurchasePrice] = useState(10000);
  const [sellingPrice, setSellingPrice] = useState(25000);
  const [holdingPeriodMonths, setHoldingPeriodMonths] = useState(18);
  const [taxableIncome, setTaxableIncome] = useState(90000);

  const gain = sellingPrice - purchasePrice;
  const isLongTerm = holdingPeriodMonths >= 12;

  // Approx US federal capital gains brackets
  let taxRate = 0;
  if (isLongTerm) {
    if (taxableIncome > 518900) taxRate = 20;
    else if (taxableIncome > 47025) taxRate = 15;
    else taxRate = 0;
  } else {
    // Short term -> standard income tax bracket approximation
    if (taxableIncome > 231250) taxRate = 35;
    else if (taxableIncome > 100525) taxRate = 24;
    else if (taxableIncome > 47150) taxRate = 22;
    else taxRate = 12;
  }

  const estimatedTax = gain > 0 ? (gain * taxRate) / 100 : 0;
  const netProceeds = sellingPrice - estimatedTax;

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
                onChange={(e) => setPurchasePrice(Math.max(0, Number(e.target.value)))}
                className="w-full px-2.5 py-1.5 border rounded-lg text-xs font-bold"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Selling Price ({currencySymbol})</label>
              <input
                type="number"
                value={sellingPrice}
                onChange={(e) => setSellingPrice(Math.max(0, Number(e.target.value)))}
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
                onChange={(e) => setHoldingPeriodMonths(Math.max(0, Number(e.target.value)))}
                className="w-full px-2.5 py-1.5 border rounded-lg text-xs font-bold"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Taxable Income ({currencySymbol})</label>
              <input
                type="number"
                value={taxableIncome}
                onChange={(e) => setTaxableIncome(Math.max(0, Number(e.target.value)))}
                className="w-full px-2.5 py-1.5 border rounded-lg text-xs font-bold"
              />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-amber-50 to-orange-50 p-5 rounded-xl border border-amber-200 flex flex-col justify-between space-y-4">
          <div>
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold text-amber-900 uppercase tracking-wider">Estimated Tax Owed</span>
              <span className={`px-2 py-0.5 rounded text-[11px] font-bold ${isLongTerm ? 'bg-orange-100 text-orange-800' : 'bg-amber-100 text-amber-900'}`}>
                {isLongTerm ? 'Long-Term Gain (≥ 1 Year)' : 'Short-Term Ordinary Rate'}
              </span>
            </div>
            <div className="text-3xl font-black text-amber-950 font-mono-numbers mt-2">
              {currencySymbol}{estimatedTax.toLocaleString(undefined, { minimumFractionDigits: 2 })}
            </div>
            <span className="text-xs text-amber-800 font-semibold">Effective Rate: {taxRate}%</span>
          </div>

          <div className="bg-white p-3 rounded-lg border border-amber-100 text-xs text-slate-700 space-y-1">
            <div className="flex justify-between">
              <span>Gross Capital Gain:</span>
              <span className="font-bold text-orange-700">{currencySymbol}{gain.toLocaleString()}</span>
            </div>
            <div className="flex justify-between border-t pt-1">
              <span>Net After-Tax Proceeds:</span>
              <span className="font-bold text-slate-900">{currencySymbol}{netProceeds.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// 6. Tip & Bill Splitter Calculator
export const TipCalculator: React.FC<BaseCalcProps> = ({ currencySymbol = '$' }) => {
  const [billAmount, setBillAmount] = useState(84.50);
  const [tipPercent, setTipPercent] = useState(18);
  const [splitCount, setSplitCount] = useState(2);

  const tipAmount = (billAmount * tipPercent) / 100;
  const totalWithTip = billAmount + tipAmount;
  const perPersonTotal = splitCount > 0 ? totalWithTip / splitCount : totalWithTip;
  const perPersonTip = splitCount > 0 ? tipAmount / splitCount : tipAmount;

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
              onChange={(e) => setBillAmount(Math.max(0, Number(e.target.value)))}
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
                  className={`py-1.5 text-xs font-bold rounded-lg border transition-colors ${tipPercent === pct ? 'bg-blue-600 border-blue-600 text-white' : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'}`}
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
              className="w-full accent-blue-600 cursor-pointer"
            />
          </div>
        </div>

        <div className="bg-gradient-to-br from-orange-50 to-teal-50 p-5 rounded-xl border border-orange-200 flex flex-col justify-between space-y-4">
          <div>
            <span className="text-xs font-bold text-orange-900 uppercase tracking-wider">Total Per Person</span>
            <div className="text-3xl font-black text-orange-950 font-mono-numbers mt-1">
              {currencySymbol}{perPersonTotal.toFixed(2)}
            </div>
            <span className="text-xs text-orange-700 font-semibold">Includes {currencySymbol}{perPersonTip.toFixed(2)} tip each</span>
          </div>

          <div className="bg-white p-3 rounded-lg border border-orange-100 text-xs text-slate-700 space-y-1">
            <div className="flex justify-between">
              <span>Total Tip Amount:</span>
              <span className="font-bold text-orange-800">{currencySymbol}{tipAmount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between border-t pt-1">
              <span>Grand Total with Tip:</span>
              <span className="font-bold text-slate-900">{currencySymbol}{totalWithTip.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// 7. VAT & Reverse VAT Calculator
export const VatCalculator: React.FC<BaseCalcProps> = ({ currencySymbol = '$' }) => {
  const [amount, setAmount] = useState(120);
  const [vatRate, setVatRate] = useState(20); // 20% standard UK/EU
  const [mode, setMode] = useState<'add' | 'remove'>('add');

  const results = useMemo(() => {
    if (amount <= 0 || vatRate < 0) return { net: 0, vat: 0, gross: 0 };
    if (mode === 'add') {
      const net = amount;
      const vat = (net * vatRate) / 100;
      const gross = net + vat;
      return { net, vat, gross };
    } else {
      const gross = amount;
      const net = gross / (1 + vatRate / 100);
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
              className={`py-2 text-xs font-bold rounded-lg border transition-colors ${mode === 'add' ? 'bg-blue-600 border-blue-600 text-white' : 'bg-slate-50 border-slate-200 text-slate-700'}`}
            >
              Add VAT (Net → Gross)
            </button>
            <button
              type="button"
              onClick={() => setMode('remove')}
              className={`py-2 text-xs font-bold rounded-lg border transition-colors ${mode === 'remove' ? 'bg-blue-600 border-blue-600 text-white' : 'bg-slate-50 border-slate-200 text-slate-700'}`}
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
              onChange={(e) => setAmount(Math.max(0, Number(e.target.value)))}
              className="w-full px-3 py-1.5 border rounded-lg text-xs font-bold"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">VAT Rate (%)</label>
            <input
              type="number"
              step="0.5"
              value={vatRate}
              onChange={(e) => setVatRate(Math.max(0, Number(e.target.value)))}
              className="w-full px-3 py-1.5 border rounded-lg text-xs font-bold"
            />
          </div>
        </div>

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
              <span>VAT ({vatRate}%):</span>
              <span className="font-bold text-blue-700">{currencySymbol}{results.vat.toFixed(2)}</span>
            </div>
            <div className="flex justify-between border-t pt-1 font-bold text-slate-900">
              <span>Gross Total:</span>
              <span>{currencySymbol}{results.gross.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
