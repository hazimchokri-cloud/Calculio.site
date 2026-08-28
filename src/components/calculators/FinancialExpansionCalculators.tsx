import React, { useState, useMemo } from 'react';
import { 
  DollarSign, 
  Calculator, 
  RotateCcw, 
  Copy, 
  Check, 
  TrendingUp, 
  ShieldCheck, 
  ArrowRight, 
  PiggyBank,
  Percent,
  Car,
  AlertCircle
} from 'lucide-react';
import { copyToClipboard, formatCurrency, formatNumber } from '../../utils/formatters';

interface BaseCalcProps {
  currencySymbol?: string;
  onSave?: (summary: string, inputs: any, results: any) => void;
}

// 1. Loan Comparison Calculator
export const LoanComparisonCalculator: React.FC<BaseCalcProps> = ({ currencySymbol = '$', onSave }) => {
  const [loan1Amount, setLoan1Amount] = useState<number | ''>(250000);
  const [loan1Rate, setLoan1Rate] = useState<number | ''>(6.5);
  const [loan1Term, setLoan1Term] = useState<number | ''>(30);

  const [loan2Amount, setLoan2Amount] = useState<number | ''>(250000);
  const [loan2Rate, setLoan2Rate] = useState<number | ''>(5.8);
  const [loan2Term, setLoan2Term] = useState<number | ''>(15);

  const [copied, setCopied] = useState(false);

  const calcMonthly = (principalVal: number | '', annualRateVal: number | '', yearsVal: number | '') => {
    const principal = typeof principalVal === 'number' ? principalVal : 0;
    const annualRate = typeof annualRateVal === 'number' ? annualRateVal : 0;
    const years = typeof yearsVal === 'number' ? yearsVal : 0;

    if (principal <= 0 || years <= 0) return { monthly: 0, total: 0, interest: 0 };
    const r = annualRate / 100 / 12;
    const n = years * 12;
    if (r === 0) {
      const m = principal / n;
      return { monthly: m, total: principal, interest: 0 };
    }
    const monthly = (principal * (r * Math.pow(1 + r, n))) / (Math.pow(1 + r, n) - 1);
    const total = monthly * n;
    const interest = total - principal;
    return { monthly, total, interest };
  };

  const l1 = useMemo(() => calcMonthly(loan1Amount, loan1Rate, loan1Term), [loan1Amount, loan1Rate, loan1Term]);
  const l2 = useMemo(() => calcMonthly(loan2Amount, loan2Rate, loan2Term), [loan2Amount, loan2Rate, loan2Term]);

  const interestDiff = Math.abs(l1.interest - l2.interest);
  const monthlyDiff = Math.abs(l1.monthly - l2.monthly);
  const cheaperLoan = l1.interest < l2.interest ? 'Option A' : 'Option B';

  const handleReset = () => {
    setLoan1Amount(250000);
    setLoan1Rate(6.5);
    setLoan1Term(30);
    setLoan2Amount(250000);
    setLoan2Rate(5.8);
    setLoan2Term(15);
  };

  const handleCopy = () => {
    const text = `Loan Comparison:
Option A: ${currencySymbol}${l1.monthly.toFixed(2)}/mo, Total Interest: ${currencySymbol}${l1.interest.toFixed(2)}
Option B: ${currencySymbol}${l2.monthly.toFixed(2)}/mo, Total Interest: ${currencySymbol}${l2.interest.toFixed(2)}
Interest Difference: ${currencySymbol}${interestDiff.toFixed(2)} saved with ${cheaperLoan}`;
    copyToClipboard(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between pb-3 border-b border-slate-200">
        <div>
          <h3 className="text-lg font-bold text-slate-900">Side-by-Side Loan Comparison</h3>
          <p className="text-xs text-slate-500">Compare two loans to evaluate monthly cash flow vs total interest paid.</p>
        </div>
        <button
          type="button"
          onClick={handleReset}
          className="px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50 flex items-center gap-1 cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" /> Reset
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Option A */}
        <div className="p-4 rounded-xl border border-blue-200 bg-blue-50/30 space-y-3">
          <span className="text-xs font-bold text-blue-700 uppercase tracking-wider block">Loan Option A</span>
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Loan Amount ({currencySymbol})</label>
            <input
              type="number"
              value={loan1Amount}
              onChange={(e) => setLoan1Amount(e.target.value === '' ? '' : Math.max(0, Number(e.target.value)))}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm font-bold bg-white"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Interest Rate (%)</label>
              <input
                type="number"
                step="0.01"
                value={loan1Rate}
                onChange={(e) => setLoan1Rate(e.target.value === '' ? '' : Math.max(0, Number(e.target.value)))}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm font-bold bg-white"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Term (Years)</label>
              <input
                type="number"
                value={loan1Term}
                onChange={(e) => setLoan1Term(e.target.value === '' ? '' : Math.max(1, Number(e.target.value)))}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm font-bold bg-white"
              />
            </div>
          </div>
          <div className="pt-2 border-t border-blue-200 text-xs space-y-1">
            <div className="flex justify-between">
              <span className="text-slate-600">Monthly Payment:</span>
              <span className="font-bold text-blue-900">{currencySymbol}{l1.monthly.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-600">Total Interest:</span>
              <span className="font-bold text-slate-900">{currencySymbol}{l1.interest.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Option B */}
        <div className="p-4 rounded-xl border border-orange-200 bg-orange-50/30 space-y-3">
          <span className="text-xs font-bold text-orange-700 uppercase tracking-wider block">Loan Option B</span>
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Loan Amount ({currencySymbol})</label>
            <input
              type="number"
              value={loan2Amount}
              onChange={(e) => setLoan2Amount(e.target.value === '' ? '' : Math.max(0, Number(e.target.value)))}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm font-bold bg-white"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Interest Rate (%)</label>
              <input
                type="number"
                step="0.01"
                value={loan2Rate}
                onChange={(e) => setLoan2Rate(e.target.value === '' ? '' : Math.max(0, Number(e.target.value)))}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm font-bold bg-white"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Term (Years)</label>
              <input
                type="number"
                value={loan2Term}
                onChange={(e) => setLoan2Term(e.target.value === '' ? '' : Math.max(1, Number(e.target.value)))}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm font-bold bg-white"
              />
            </div>
          </div>
          <div className="pt-2 border-t border-orange-200 text-xs space-y-1">
            <div className="flex justify-between">
              <span className="text-slate-600">Monthly Payment:</span>
              <span className="font-bold text-orange-900">{currencySymbol}{l2.monthly.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-600">Total Interest:</span>
              <span className="font-bold text-slate-900">{currencySymbol}{l2.interest.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Comparison Summary Banner */}
      <div className="p-4 rounded-xl bg-slate-900 text-white flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <span className="text-xs text-slate-400 font-medium">Comparison Summary</span>
          <div className="text-sm font-bold text-orange-400">
            {cheaperLoan} saves {currencySymbol}{interestDiff.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} in total interest
          </div>
          <p className="text-xs text-slate-400">
            Monthly difference: {currencySymbol}{monthlyDiff.toFixed(2)} / month.
          </p>
        </div>
        <button
          type="button"
          onClick={handleCopy}
          className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-bold text-white flex items-center gap-1.5 transition-colors cursor-pointer shrink-0"
        >
          {copied ? <Check className="w-4 h-4 text-orange-400" /> : <Copy className="w-4 h-4" />}
          {copied ? 'Copied' : 'Copy Comparison'}
        </button>
      </div>
    </div>
  );
};

// 2. Car Lease Calculator
export const CarLeaseCalculator: React.FC<BaseCalcProps> = ({ currencySymbol = '$' }) => {
  const [msrp, setMsrp] = useState<number | ''>(35000);
  const [negotiatedPrice, setNegotiatedPrice] = useState<number | ''>(32000);
  const [downPayment, setDownPayment] = useState<number | ''>(2500);
  const [tradeIn, setTradeIn] = useState<number | ''>(0);
  const [leaseTerm, setLeaseTerm] = useState<number>(36);
  const [moneyFactor, setMoneyFactor] = useState<number | ''>(0.0021); // ~5% APR
  const [residualPercent, setResidualPercent] = useState<number | ''>(58); // 58%
  const [salesTaxRate, setSalesTaxRate] = useState<number | ''>(7.0);

  const results = useMemo(() => {
    const msrpVal = typeof msrp === 'number' ? msrp : 0;
    const priceVal = typeof negotiatedPrice === 'number' ? negotiatedPrice : 0;
    const downVal = typeof downPayment === 'number' ? downPayment : 0;
    const tradeVal = typeof tradeIn === 'number' ? tradeIn : 0;
    const mfVal = typeof moneyFactor === 'number' ? moneyFactor : 0;
    const resVal = typeof residualPercent === 'number' ? residualPercent : 0;
    const taxVal = typeof salesTaxRate === 'number' ? salesTaxRate : 0;

    const capCost = priceVal - downVal - tradeVal;
    const residualValue = msrpVal * (resVal / 100);
    const term = leaseTerm > 0 ? leaseTerm : 36;
    const depreciationFee = (capCost - residualValue) / term;
    const rentCharge = (capCost + residualValue) * mfVal;
    const baseMonthlyPayment = Math.max(0, depreciationFee + rentCharge);
    const taxAmount = baseMonthlyPayment * (taxVal / 100);
    const totalMonthlyPayment = baseMonthlyPayment + taxAmount;
    const totalLeaseCost = (totalMonthlyPayment * term) + downVal;
    const equivalentApr = mfVal * 2400;

    return {
      totalMonthlyPayment,
      depreciationFee,
      rentCharge,
      taxAmount,
      residualValue,
      totalLeaseCost,
      equivalentApr
    };
  }, [msrp, negotiatedPrice, downPayment, tradeIn, leaseTerm, moneyFactor, residualPercent, salesTaxRate]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-3.5 bg-white p-5 rounded-2xl border border-slate-200">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 border-b pb-2">Lease Parameters</h4>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">MSRP Sticker Price ({currencySymbol})</label>
              <input
                type="number"
                value={msrp}
                onChange={(e) => setMsrp(e.target.value === '' ? '' : Math.max(0, Number(e.target.value)))}
                className="w-full px-3 py-1.5 border rounded-lg text-xs font-bold"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Agreed Price ({currencySymbol})</label>
              <input
                type="number"
                value={negotiatedPrice}
                onChange={(e) => setNegotiatedPrice(e.target.value === '' ? '' : Math.max(0, Number(e.target.value)))}
                className="w-full px-3 py-1.5 border rounded-lg text-xs font-bold"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Down Payment ({currencySymbol})</label>
              <input
                type="number"
                value={downPayment}
                onChange={(e) => setDownPayment(e.target.value === '' ? '' : Math.max(0, Number(e.target.value)))}
                className="w-full px-3 py-1.5 border rounded-lg text-xs font-bold"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Lease Term (Months)</label>
              <select
                value={leaseTerm}
                onChange={(e) => setLeaseTerm(Number(e.target.value))}
                className="w-full px-3 py-1.5 border rounded-lg text-xs font-bold"
              >
                <option value={24}>24 Months</option>
                <option value={36}>36 Months</option>
                <option value={39}>39 Months</option>
                <option value={48}>48 Months</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Residual %</label>
              <input
                type="number"
                value={residualPercent}
                onChange={(e) => setResidualPercent(e.target.value === '' ? '' : Number(e.target.value))}
                className="w-full px-2 py-1.5 border rounded-lg text-xs font-bold"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Money Factor</label>
              <input
                type="number"
                step="0.0001"
                value={moneyFactor}
                onChange={(e) => setMoneyFactor(e.target.value === '' ? '' : Number(e.target.value))}
                className="w-full px-2 py-1.5 border rounded-lg text-xs font-bold"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Tax Rate %</label>
              <input
                type="number"
                step="0.1"
                value={salesTaxRate}
                onChange={(e) => setSalesTaxRate(e.target.value === '' ? '' : Number(e.target.value))}
                className="w-full px-2 py-1.5 border rounded-lg text-xs font-bold"
              />
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50/50 p-5 rounded-2xl border border-blue-200 flex flex-col justify-between space-y-4">
          <div>
            <span className="text-xs font-bold uppercase text-blue-900 tracking-wider">Estimated Monthly Lease</span>
            <div className="mt-2 text-3xl font-black text-blue-950 font-mono-numbers">
              {currencySymbol}{results.totalMonthlyPayment.toFixed(2)}
              <span className="text-xs font-medium text-slate-500"> / month</span>
            </div>
          </div>

          <div className="bg-white p-3.5 rounded-xl border border-blue-100 space-y-2 text-xs text-slate-700">
            <div className="flex justify-between">
              <span>Depreciation Fee:</span>
              <span className="font-bold">{currencySymbol}{results.depreciationFee.toFixed(2)}/mo</span>
            </div>
            <div className="flex justify-between">
              <span>Rent Charge (Finance Fee):</span>
              <span className="font-bold">{currencySymbol}{results.rentCharge.toFixed(2)}/mo</span>
            </div>
            <div className="flex justify-between">
              <span>Monthly Sales Tax:</span>
              <span className="font-bold">{currencySymbol}{results.taxAmount.toFixed(2)}/mo</span>
            </div>
            <div className="flex justify-between border-t pt-1">
              <span>Residual Value at End:</span>
              <span className="font-bold">{currencySymbol}{results.residualValue.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
            </div>
            <div className="flex justify-between">
              <span>Equivalent APR:</span>
              <span className="font-bold text-blue-600">{results.equivalentApr.toFixed(2)}%</span>
            </div>
            <div className="flex justify-between font-bold text-slate-900 border-t pt-1">
              <span>Total Lease Out-of-Pocket:</span>
              <span>{currencySymbol}{results.totalLeaseCost.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// 3. Down Payment & LTV Calculator
export const DownPaymentCalculator: React.FC<BaseCalcProps> = ({ currencySymbol = '$' }) => {
  const [homePrice, setHomePrice] = useState<number | ''>(400000);
  const [downPaymentPercent, setDownPaymentPercent] = useState<number>(20);

  const hp = typeof homePrice === 'number' ? homePrice : 0;
  const downPaymentAmount = (hp * downPaymentPercent) / 100;
  const loanAmount = hp - downPaymentAmount;
  const ltv = 100 - downPaymentPercent;
  const requiresPmi = ltv > 80;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-6 rounded-2xl border border-slate-200">
        <div className="space-y-4">
          <h4 className="text-xs font-bold uppercase text-slate-700 tracking-wider">Purchase Details</h4>
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Home Purchase Price ({currencySymbol})</label>
            <input
              type="number"
              value={homePrice}
              onChange={(e) => setHomePrice(e.target.value === '' ? '' : Math.max(0, Number(e.target.value)))}
              className="w-full px-3 py-2 border rounded-lg text-sm font-bold"
            />
          </div>
          <div>
            <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
              <span>Down Payment Percentage</span>
              <span className="font-bold text-blue-600">{downPaymentPercent}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              step="1"
              value={downPaymentPercent}
              onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
              className="w-full accent-blue-600 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400 pt-1">
              <span>3% (Min Conv)</span>
              <span>10%</span>
              <span>20% (No PMI)</span>
              <span>50%</span>
            </div>
          </div>
        </div>

        <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 flex flex-col justify-between space-y-4">
          <div>
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Required Down Payment</span>
            <div className="text-3xl font-black text-slate-900 font-mono-numbers mt-1">
              {currencySymbol}{downPaymentAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
          </div>

          <div className="space-y-2 text-xs text-slate-700 bg-white p-3.5 rounded-lg border border-slate-200">
            <div className="flex justify-between">
              <span>Loan Amount to Finance:</span>
              <span className="font-bold">{currencySymbol}{loanAmount.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
            </div>
            <div className="flex justify-between">
              <span>Loan-to-Value (LTV) Ratio:</span>
              <span className="font-bold text-blue-700">{ltv.toFixed(1)}%</span>
            </div>
            <div className="flex justify-between items-center border-t pt-1.5">
              <span>PMI Requirement:</span>
              <span className={`px-2 py-0.5 rounded text-[11px] font-bold ${requiresPmi ? 'bg-amber-100 text-amber-800' : 'bg-orange-100 text-orange-800'}`}>
                {requiresPmi ? 'PMI Required (LTV > 80%)' : 'No PMI Required'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// 4. Emergency Fund Calculator
export const EmergencyFundCalculator: React.FC<BaseCalcProps> = ({ currencySymbol = '$' }) => {
  const [rentMortgage, setRentMortgage] = useState<number | ''>(1800);
  const [utilities, setUtilities] = useState<number | ''>(300);
  const [foodGroceries, setFoodGroceries] = useState<number | ''>(600);
  const [insuranceDebt, setInsuranceDebt] = useState<number | ''>(400);
  const [otherEssentials, setOtherEssentials] = useState<number | ''>(300);
  const [targetMonths, setTargetMonths] = useState<number>(6);
  const [currentSavings, setCurrentSavings] = useState<number | ''>(5000);

  const rm = typeof rentMortgage === 'number' ? rentMortgage : 0;
  const ut = typeof utilities === 'number' ? utilities : 0;
  const fg = typeof foodGroceries === 'number' ? foodGroceries : 0;
  const id = typeof insuranceDebt === 'number' ? insuranceDebt : 0;
  const oe = typeof otherEssentials === 'number' ? otherEssentials : 0;
  const cs = typeof currentSavings === 'number' ? currentSavings : 0;

  const monthlyEssentialTotal = rm + ut + fg + id + oe;
  const targetFund = monthlyEssentialTotal * targetMonths;
  const shortfall = Math.max(0, targetFund - cs);
  const percentFunded = targetFund > 0 ? Math.min(100, (cs / targetFund) * 100) : 100;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-6 rounded-2xl border border-slate-200">
        <div className="space-y-3">
          <h4 className="text-xs font-bold uppercase text-slate-700 tracking-wider">Monthly Essential Expenses</h4>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Housing (Rent/Mortgage)</label>
              <input
                type="number"
                value={rentMortgage}
                onChange={(e) => setRentMortgage(e.target.value === '' ? '' : Math.max(0, Number(e.target.value)))}
                className="w-full px-2.5 py-1.5 border rounded-lg text-xs font-bold"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Utilities & Internet</label>
              <input
                type="number"
                value={utilities}
                onChange={(e) => setUtilities(e.target.value === '' ? '' : Math.max(0, Number(e.target.value)))}
                className="w-full px-2.5 py-1.5 border rounded-lg text-xs font-bold"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Groceries & Food</label>
              <input
                type="number"
                value={foodGroceries}
                onChange={(e) => setFoodGroceries(e.target.value === '' ? '' : Math.max(0, Number(e.target.value)))}
                className="w-full px-2.5 py-1.5 border rounded-lg text-xs font-bold"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Insurance & Min Debt</label>
              <input
                type="number"
                value={insuranceDebt}
                onChange={(e) => setInsuranceDebt(e.target.value === '' ? '' : Math.max(0, Number(e.target.value)))}
                className="w-full px-2.5 py-1.5 border rounded-lg text-xs font-bold"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-2">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Target Months Cushion</label>
              <select
                value={targetMonths}
                onChange={(e) => setTargetMonths(Number(e.target.value))}
                className="w-full px-2.5 py-1.5 border rounded-lg text-xs font-bold"
              >
                <option value={3}>3 Months (Stable Single)</option>
                <option value={6}>6 Months (Recommended)</option>
                <option value={9}>9 Months (Freelance/Contract)</option>
                <option value={12}>12 Months (Conservative)</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Current Savings ({currencySymbol})</label>
              <input
                type="number"
                value={currentSavings}
                onChange={(e) => setCurrentSavings(e.target.value === '' ? '' : Math.max(0, Number(e.target.value)))}
                className="w-full px-2.5 py-1.5 border rounded-lg text-xs font-bold"
              />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-orange-50 to-teal-50/60 p-5 rounded-xl border border-orange-200 flex flex-col justify-between space-y-4">
          <div>
            <span className="text-xs font-bold text-orange-900 uppercase tracking-wider">Target Emergency Cushion</span>
            <div className="text-3xl font-black text-orange-950 font-mono-numbers mt-1">
              {currencySymbol}{targetFund.toLocaleString(undefined, { minimumFractionDigits: 2 })}
            </div>
            <p className="text-xs text-orange-700 mt-1">Based on {currencySymbol}{monthlyEssentialTotal.toFixed(0)}/mo bare-bones spending</p>
          </div>

          <div className="bg-white p-3.5 rounded-xl border border-orange-100 space-y-2 text-xs text-slate-700">
            <div className="flex justify-between">
              <span>Fund Progress:</span>
              <span className="font-bold text-orange-700">{percentFunded.toFixed(1)}% Completed</span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
              <div className="bg-orange-500 h-2 rounded-full" style={{ width: `${percentFunded}%` }} />
            </div>
            <div className="flex justify-between border-t pt-2">
              <span>Shortfall to Reach Goal:</span>
              <span className="font-bold text-slate-900">{currencySymbol}{shortfall.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// 5. CD (Certificate of Deposit) Calculator
export const CdCalculator: React.FC<BaseCalcProps> = ({ currencySymbol = '$' }) => {
  const [deposit, setDeposit] = useState<number | ''>(10000);
  const [apy, setApy] = useState<number | ''>(4.85);
  const [termMonths, setTermMonths] = useState<number>(12);
  const [compoundFreq, setCompoundFreq] = useState<number>(12); // monthly

  const results = useMemo(() => {
    const dep = typeof deposit === 'number' ? deposit : 0;
    const apyVal = typeof apy === 'number' ? apy : 0;
    const r = apyVal / 100;
    const t = termMonths / 12;
    const n = compoundFreq;
    const endingBalance = dep * Math.pow(1 + r / n, n * t);
    const totalInterest = endingBalance - dep;

    return {
      endingBalance,
      totalInterest
    };
  }, [deposit, apy, termMonths, compoundFreq]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-6 rounded-2xl border border-slate-200">
        <div className="space-y-3.5">
          <h4 className="text-xs font-bold uppercase text-slate-700 tracking-wider">CD Investment Details</h4>
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Initial Deposit ({currencySymbol})</label>
            <input
              type="number"
              value={deposit}
              onChange={(e) => setDeposit(e.target.value === '' ? '' : Math.max(0, Number(e.target.value)))}
              className="w-full px-3 py-2 border rounded-lg text-sm font-bold"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Annual APY (%)</label>
              <input
                type="number"
                step="0.01"
                value={apy}
                onChange={(e) => setApy(e.target.value === '' ? '' : Math.max(0, Number(e.target.value)))}
                className="w-full px-3 py-2 border rounded-lg text-sm font-bold"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Term (Months)</label>
              <select
                value={termMonths}
                onChange={(e) => setTermMonths(Number(e.target.value))}
                className="w-full px-3 py-2 border rounded-lg text-sm font-bold"
              >
                <option value={6}>6 Months</option>
                <option value={12}>12 Months (1 Year)</option>
                <option value={18}>18 Months</option>
                <option value={24}>24 Months (2 Years)</option>
                <option value={36}>36 Months (3 Years)</option>
                <option value={60}>60 Months (5 Years)</option>
              </select>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-50 to-sky-50 p-5 rounded-xl border border-blue-200 flex flex-col justify-between space-y-4">
          <div>
            <span className="text-xs font-bold text-blue-900 uppercase tracking-wider">Ending Maturity Balance</span>
            <div className="text-3xl font-black text-blue-950 font-mono-numbers mt-1">
              {currencySymbol}{results.endingBalance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
          </div>

          <div className="bg-white p-3.5 rounded-xl border border-blue-100 space-y-2 text-xs text-slate-700">
            <div className="flex justify-between">
              <span>Total Interest Earned:</span>
              <span className="font-bold text-orange-600">+{currencySymbol}{results.totalInterest.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Effective Yield:</span>
              <span className="font-bold">{(((results.totalInterest / ((typeof deposit === 'number' && deposit > 0) ? deposit : 1))) * 100).toFixed(2)}%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// 6. 401(k) Growth & Employer Match Calculator
export const FourOhOneKCalculator: React.FC<BaseCalcProps> = ({ currencySymbol = '$' }) => {
  const [currentAge, setCurrentAge] = useState<number | ''>(30);
  const [retirementAge, setRetirementAge] = useState<number | ''>(65);
  const [currentBalance, setCurrentBalance] = useState<number | ''>(45000);
  const [salary, setSalary] = useState<number | ''>(85000);
  const [employeeContributionPercent, setEmployeeContributionPercent] = useState<number | ''>(8);
  const [employerMatchPercent, setEmployerMatchPercent] = useState<number | ''>(50); // 50% match
  const [employerMatchLimit, setEmployerMatchLimit] = useState<number | ''>(6); // up to 6%
  const [expectedReturn, setExpectedReturn] = useState<number | ''>(7.5);

  const results = useMemo(() => {
    const cAge = typeof currentAge === 'number' ? currentAge : 30;
    const rAge = typeof retirementAge === 'number' ? retirementAge : 65;
    const cBal = typeof currentBalance === 'number' ? currentBalance : 0;
    const sal = typeof salary === 'number' ? salary : 0;
    const ecPct = typeof employeeContributionPercent === 'number' ? employeeContributionPercent : 0;
    const emPct = typeof employerMatchPercent === 'number' ? employerMatchPercent : 0;
    const emLim = typeof employerMatchLimit === 'number' ? employerMatchLimit : 0;
    const expRet = typeof expectedReturn === 'number' ? expectedReturn : 0;

    const years = Math.max(1, rAge - cAge);
    const employeeAnnual = sal * (ecPct / 100);
    const matchedSalaryPercent = Math.min(ecPct, emLim);
    const employerAnnual = sal * (matchedSalaryPercent / 100) * (emPct / 100);
    const totalAnnualContribution = employeeAnnual + employerAnnual;

    const r = expRet / 100;
    let balance = cBal;
    let totalEmployeeContributed = 0;
    let totalEmployerContributed = 0;

    for (let y = 0; y < years; y++) {
      balance = (balance + totalAnnualContribution) * (1 + r);
      totalEmployeeContributed += employeeAnnual;
      totalEmployerContributed += employerAnnual;
    }

    const totalGrowth = balance - cBal - totalEmployeeContributed - totalEmployerContributed;

    return {
      balance,
      totalEmployeeContributed,
      totalEmployerContributed,
      totalGrowth,
      annualMatch: employerAnnual
    };
  }, [currentAge, retirementAge, currentBalance, salary, employeeContributionPercent, employerMatchPercent, employerMatchLimit, expectedReturn]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-6 rounded-2xl border border-slate-200">
        <div className="space-y-3">
          <h4 className="text-xs font-bold uppercase text-slate-700 tracking-wider">401(k) Inputs</h4>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Current Age</label>
              <input
                type="number"
                value={currentAge}
                onChange={(e) => setCurrentAge(e.target.value === '' ? '' : Number(e.target.value))}
                className="w-full px-2.5 py-1.5 border rounded-lg text-xs font-bold"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Retirement Age</label>
              <input
                type="number"
                value={retirementAge}
                onChange={(e) => setRetirementAge(e.target.value === '' ? '' : Number(e.target.value))}
                className="w-full px-2.5 py-1.5 border rounded-lg text-xs font-bold"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Annual Salary ({currencySymbol})</label>
              <input
                type="number"
                value={salary}
                onChange={(e) => setSalary(e.target.value === '' ? '' : Math.max(0, Number(e.target.value)))}
                className="w-full px-2.5 py-1.5 border rounded-lg text-xs font-bold"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Current 401(k) ({currencySymbol})</label>
              <input
                type="number"
                value={currentBalance}
                onChange={(e) => setCurrentBalance(e.target.value === '' ? '' : Math.max(0, Number(e.target.value)))}
                className="w-full px-2.5 py-1.5 border rounded-lg text-xs font-bold"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 pt-1">
            <div>
              <label className="block text-[11px] font-semibold text-slate-600 mb-1">Your Contrib %</label>
              <input
                type="number"
                value={employeeContributionPercent}
                onChange={(e) => setEmployeeContributionPercent(e.target.value === '' ? '' : Number(e.target.value))}
                className="w-full px-2 py-1.5 border rounded-lg text-xs font-bold"
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-slate-600 mb-1">Match Rate %</label>
              <input
                type="number"
                value={employerMatchPercent}
                onChange={(e) => setEmployerMatchPercent(e.target.value === '' ? '' : Number(e.target.value))}
                className="w-full px-2 py-1.5 border rounded-lg text-xs font-bold"
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-slate-600 mb-1">Match Cap %</label>
              <input
                type="number"
                value={employerMatchLimit}
                onChange={(e) => setEmployerMatchLimit(e.target.value === '' ? '' : Number(e.target.value))}
                className="w-full px-2 py-1.5 border rounded-lg text-xs font-bold"
              />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-indigo-50 to-blue-50 p-5 rounded-xl border border-indigo-200 flex flex-col justify-between space-y-4">
          <div>
            <span className="text-xs font-bold text-indigo-900 uppercase tracking-wider">Projected 401(k) Nest Egg</span>
            <div className="text-3xl font-black text-indigo-950 font-mono-numbers mt-1">
              {currencySymbol}{results.balance.toLocaleString(undefined, { maximumFractionDigits: 0 })}
            </div>
            <p className="text-xs text-indigo-700 mt-1">Includes {currencySymbol}{results.annualMatch.toFixed(0)}/yr in free employer match</p>
          </div>

          <div className="bg-white p-3.5 rounded-xl border border-indigo-100 space-y-2 text-xs text-slate-700">
            <div className="flex justify-between">
              <span>Your Lifetime Contributions:</span>
              <span className="font-bold">{currencySymbol}{results.totalEmployeeContributed.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
            </div>
            <div className="flex justify-between">
              <span>Employer Match Added:</span>
              <span className="font-bold text-orange-600">+{currencySymbol}{results.totalEmployerContributed.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
            </div>
            <div className="flex justify-between border-t pt-1">
              <span>Investment Compound Growth:</span>
              <span className="font-bold text-blue-700">+{currencySymbol}{results.totalGrowth.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const FourZeroOneKMatchCalculator = FourOhOneKCalculator;
