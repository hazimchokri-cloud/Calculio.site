import React, { useState, useMemo } from 'react';
import { RotateCcw, Copy, Check } from 'lucide-react';
import { copyToClipboard } from '../../utils/formatters';
import { DecimalInput } from '../shared/DecimalInput';

interface BaseCalcProps {
  currencySymbol?: string;
  onSave?: (summary: string, inputs: any, results: any) => void;
}

// 1. Loan Comparison Calculator
export const LoanComparisonCalculator: React.FC<BaseCalcProps> = ({ currencySymbol = '$' }) => {
  const [loan1Amount, setLoan1Amount] = useState<number | ''>(250000);
  const [loan1Rate, setLoan1Rate] = useState<number | ''>(6.5);
  const [loan1Term, setLoan1Term] = useState<number | ''>(30);

  const [loan2Amount, setLoan2Amount] = useState<number | ''>(250000);
  const [loan2Rate, setLoan2Rate] = useState<number | ''>(5.8);
  const [loan2Term, setLoan2Term] = useState<number | ''>(15);

  const [copied, setCopied] = useState(false);

  const calcMonthly = (principalVal: number | '', annualRateVal: number | '', yearsVal: number | '') => {
    const principal = typeof principalVal === 'number' ? principalVal : 0;
    const annualRate = typeof annualRateVal === 'number' ? Math.max(0, annualRateVal) : 0;
    const years = typeof yearsVal === 'number' ? yearsVal : 0;

    if (principal <= 0 || years <= 0 || annualRateVal === '') return { valid: false, monthly: 0, total: 0, interest: 0 };
    const r = annualRate / 100 / 12;
    const n = years * 12;
    if (r === 0) {
      const m = principal / n;
      return { valid: true, monthly: m, total: principal, interest: 0 };
    }
    const monthly = (principal * (r * Math.pow(1 + r, n))) / (Math.pow(1 + r, n) - 1);
    const total = monthly * n;
    const interest = total - principal;
    return { valid: true, monthly, total, interest };
  };

  const l1 = useMemo(() => calcMonthly(loan1Amount, loan1Rate, loan1Term), [loan1Amount, loan1Rate, loan1Term]);
  const l2 = useMemo(() => calcMonthly(loan2Amount, loan2Rate, loan2Term), [loan2Amount, loan2Rate, loan2Term]);

  const bothValid = l1.valid && l2.valid;
  const interestDiff = Math.abs(l1.interest - l2.interest);
  const monthlyDiff = Math.abs(l1.monthly - l2.monthly);
  const isEqualInterest = bothValid && interestDiff < 0.01;
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
    if (!bothValid) return;
    const summaryLine = isEqualInterest
      ? 'Both options cost the same total interest'
      : `Interest Difference: ${currencySymbol}${interestDiff.toFixed(2)} saved with ${cheaperLoan}`;
    const text = `Loan Comparison:
Option A: ${currencySymbol}${l1.monthly.toFixed(2)}/mo, Total Interest: ${currencySymbol}${l1.interest.toFixed(2)}
Option B: ${currencySymbol}${l2.monthly.toFixed(2)}/mo, Total Interest: ${currencySymbol}${l2.interest.toFixed(2)}
${summaryLine}`;
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
            <DecimalInput
              value={loan1Amount}
              onValueChange={setLoan1Amount}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm font-bold bg-white"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Interest Rate (%)</label>
              <DecimalInput
                value={loan1Rate}
                onValueChange={setLoan1Rate}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm font-bold bg-white"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Term (Years)</label>
              <DecimalInput
                allowDecimal={false}
                value={loan1Term}
                onValueChange={setLoan1Term}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm font-bold bg-white"
              />
            </div>
          </div>
          <div className="pt-2 border-t border-blue-200 text-xs space-y-1">
            <div className="flex justify-between">
              <span className="text-slate-600">Monthly Payment:</span>
              <span className="font-bold text-blue-900">{l1.valid ? `${currencySymbol}${l1.monthly.toFixed(2)}` : '--'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-600">Total Interest:</span>
              <span className="font-bold text-slate-900">{l1.valid ? `${currencySymbol}${l1.interest.toFixed(2)}` : '--'}</span>
            </div>
          </div>
        </div>

        {/* Option B */}
        <div className="p-4 rounded-xl border border-orange-200 bg-orange-50/30 space-y-3">
          <span className="text-xs font-bold text-orange-700 uppercase tracking-wider block">Loan Option B</span>
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Loan Amount ({currencySymbol})</label>
            <DecimalInput
              value={loan2Amount}
              onValueChange={setLoan2Amount}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm font-bold bg-white"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Interest Rate (%)</label>
              <DecimalInput
                value={loan2Rate}
                onValueChange={setLoan2Rate}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm font-bold bg-white"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Term (Years)</label>
              <DecimalInput
                allowDecimal={false}
                value={loan2Term}
                onValueChange={setLoan2Term}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm font-bold bg-white"
              />
            </div>
          </div>
          <div className="pt-2 border-t border-orange-200 text-xs space-y-1">
            <div className="flex justify-between">
              <span className="text-slate-600">Monthly Payment:</span>
              <span className="font-bold text-orange-900">{l2.valid ? `${currencySymbol}${l2.monthly.toFixed(2)}` : '--'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-600">Total Interest:</span>
              <span className="font-bold text-slate-900">{l2.valid ? `${currencySymbol}${l2.interest.toFixed(2)}` : '--'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Comparison Summary Banner */}
      <div className="p-4 rounded-xl bg-slate-900 text-white flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <span className="text-xs text-slate-400 font-medium">Comparison Summary</span>
          {bothValid ? (
            <>
              <div className="text-sm font-bold text-orange-400">
                {isEqualInterest
                  ? 'Both options cost the same total interest'
                  : `${cheaperLoan} saves ${currencySymbol}${interestDiff.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} in total interest`}
              </div>
              <p className="text-xs text-slate-400">
                Monthly difference: {currencySymbol}{monthlyDiff.toFixed(2)} / month.
              </p>
            </>
          ) : (
            <div className="text-sm font-semibold text-slate-300">
              Enter positive loan amounts, interest rates, and terms for both options to compare.
            </div>
          )}
        </div>
        <button
          type="button"
          disabled={!bothValid}
          onClick={handleCopy}
          className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 disabled:opacity-40 disabled:cursor-not-allowed text-xs font-bold text-white flex items-center gap-1.5 transition-colors cursor-pointer shrink-0"
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

  const handleReset = () => {
    setMsrp(35000);
    setNegotiatedPrice(32000);
    setDownPayment(2500);
    setTradeIn(0);
    setLeaseTerm(36);
    setMoneyFactor(0.0021);
    setResidualPercent(58);
    setSalesTaxRate(7.0);
  };

  const results = useMemo(() => {
    const msrpVal = typeof msrp === 'number' ? msrp : 0;
    const priceVal = typeof negotiatedPrice === 'number' ? negotiatedPrice : 0;
    if (msrp === '' || negotiatedPrice === '' || msrpVal <= 0 || priceVal <= 0 || leaseTerm <= 0) return null;

    const downVal = typeof downPayment === 'number' ? Math.max(0, downPayment) : 0;
    const tradeVal = typeof tradeIn === 'number' ? Math.max(0, tradeIn) : 0;
    const mfVal = typeof moneyFactor === 'number' ? Math.max(0, moneyFactor) : 0;
    const resVal = typeof residualPercent === 'number' ? Math.max(0, Math.min(100, residualPercent)) : 0;
    const taxVal = typeof salesTaxRate === 'number' ? Math.max(0, salesTaxRate) : 0;

    const capCost = Math.max(0, priceVal - downVal - tradeVal);
    const residualValue = msrpVal * (resVal / 100);
    const depreciationFee = Math.max(0, capCost - residualValue) / leaseTerm;
    const rentCharge = (capCost + residualValue) * mfVal;
    const baseMonthlyPayment = Math.max(0, depreciationFee + rentCharge);
    const taxAmount = baseMonthlyPayment * (taxVal / 100);
    const totalMonthlyPayment = baseMonthlyPayment + taxAmount;
    const totalLeaseCost = (totalMonthlyPayment * leaseTerm) + downVal + tradeVal;
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
          <div className="flex items-center justify-between border-b pb-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">Lease Parameters</h4>
            <button
              type="button"
              onClick={handleReset}
              className="text-xs font-semibold text-slate-500 hover:text-slate-800 flex items-center gap-1 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Reset
            </button>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">MSRP Sticker Price ({currencySymbol})</label>
              <DecimalInput
                value={msrp}
                onValueChange={setMsrp}
                className="w-full px-3 py-1.5 border rounded-lg text-xs font-bold"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Agreed Price ({currencySymbol})</label>
              <DecimalInput
                value={negotiatedPrice}
                onValueChange={setNegotiatedPrice}
                className="w-full px-3 py-1.5 border rounded-lg text-xs font-bold"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Down ({currencySymbol})</label>
              <DecimalInput
                value={downPayment}
                onValueChange={setDownPayment}
                className="w-full px-2.5 py-1.5 border rounded-lg text-xs font-bold"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Trade-In ({currencySymbol})</label>
              <DecimalInput
                value={tradeIn}
                onValueChange={setTradeIn}
                className="w-full px-2.5 py-1.5 border rounded-lg text-xs font-bold"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Term (Months)</label>
              <select
                value={leaseTerm}
                onChange={(e) => setLeaseTerm(Number(e.target.value))}
                className="w-full px-2 py-1.5 border rounded-lg text-xs font-bold bg-white"
              >
                <option value={24}>24 Mo</option>
                <option value={36}>36 Mo</option>
                <option value={39}>39 Mo</option>
                <option value={48}>48 Mo</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Residual %</label>
              <DecimalInput
                value={residualPercent}
                onValueChange={setResidualPercent}
                className="w-full px-2 py-1.5 border rounded-lg text-xs font-bold"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Money Factor</label>
              <DecimalInput
                value={moneyFactor}
                onValueChange={setMoneyFactor}
                className="w-full px-2 py-1.5 border rounded-lg text-xs font-bold"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Tax Rate %</label>
              <DecimalInput
                value={salesTaxRate}
                onValueChange={setSalesTaxRate}
                className="w-full px-2 py-1.5 border rounded-lg text-xs font-bold"
              />
            </div>
          </div>
        </div>

        {/* Results */}
        {results ? (
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
        ) : (
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 flex items-center justify-center text-center text-xs text-slate-500">
            Enter a valid MSRP and negotiated vehicle price to estimate your monthly lease payment.
          </div>
        )}
      </div>
    </div>
  );
};

// 3. Down Payment & LTV Calculator
export const DownPaymentCalculator: React.FC<BaseCalcProps> = ({ currencySymbol = '$' }) => {
  const [homePrice, setHomePrice] = useState<number | ''>(400000);
  const [downPaymentPercent, setDownPaymentPercent] = useState<number>(20);

  const hp = typeof homePrice === 'number' && homePrice > 0 ? homePrice : 0;
  const hasValidPrice = hp > 0;
  const downPaymentAmount = (hp * downPaymentPercent) / 100;
  const loanAmount = hp - downPaymentAmount;
  const ltv = 100 - downPaymentPercent;
  const requiresPmi = ltv > 80;

  const handleReset = () => {
    setHomePrice(400000);
    setDownPaymentPercent(20);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-6 rounded-2xl border border-slate-200">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold uppercase text-slate-700 tracking-wider">Purchase Details</h4>
            <button
              type="button"
              onClick={handleReset}
              className="text-xs font-semibold text-slate-500 hover:text-slate-800 flex items-center gap-1 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Reset
            </button>
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Home Purchase Price ({currencySymbol})</label>
            <DecimalInput
              value={homePrice}
              onValueChange={setHomePrice}
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
              {hasValidPrice
                ? `${currencySymbol}${downPaymentAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
                : '--'}
            </div>
          </div>

          <div className="space-y-2 text-xs text-slate-700 bg-white p-3.5 rounded-lg border border-slate-200">
            <div className="flex justify-between">
              <span>Loan Amount to Finance:</span>
              <span className="font-bold">{hasValidPrice ? `${currencySymbol}${loanAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : '--'}</span>
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

  const handleReset = () => {
    setRentMortgage(1800);
    setUtilities(300);
    setFoodGroceries(600);
    setInsuranceDebt(400);
    setOtherEssentials(300);
    setTargetMonths(6);
    setCurrentSavings(5000);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-6 rounded-2xl border border-slate-200">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold uppercase text-slate-700 tracking-wider">Monthly Essential Expenses</h4>
            <button
              type="button"
              onClick={handleReset}
              className="text-xs font-semibold text-slate-500 hover:text-slate-800 flex items-center gap-1 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Reset
            </button>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Housing (Rent/Mortgage)</label>
              <DecimalInput
                value={rentMortgage}
                onValueChange={setRentMortgage}
                className="w-full px-2.5 py-1.5 border rounded-lg text-xs font-bold"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Utilities & Internet</label>
              <DecimalInput
                value={utilities}
                onValueChange={setUtilities}
                className="w-full px-2.5 py-1.5 border rounded-lg text-xs font-bold"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Groceries & Food</label>
              <DecimalInput
                value={foodGroceries}
                onValueChange={setFoodGroceries}
                className="w-full px-2.5 py-1.5 border rounded-lg text-xs font-bold"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Insurance & Min Debt</label>
              <DecimalInput
                value={insuranceDebt}
                onValueChange={setInsuranceDebt}
                className="w-full px-2.5 py-1.5 border rounded-lg text-xs font-bold"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 pt-1">
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Other Essentials</label>
              <DecimalInput
                value={otherEssentials}
                onValueChange={setOtherEssentials}
                className="w-full px-2.5 py-1.5 border rounded-lg text-xs font-bold"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Target Cushion</label>
              <select
                value={targetMonths}
                onChange={(e) => setTargetMonths(Number(e.target.value))}
                className="w-full px-2 py-1.5 border rounded-lg text-xs font-bold bg-white"
              >
                <option value={3}>3 Months</option>
                <option value={6}>6 Months</option>
                <option value={9}>9 Months</option>
                <option value={12}>12 Months</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Saved ({currencySymbol})</label>
              <DecimalInput
                value={currentSavings}
                onValueChange={setCurrentSavings}
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
            <p className="text-xs text-orange-700 mt-1">Based on {currencySymbol}{monthlyEssentialTotal.toFixed(0)}/mo essential spending × {targetMonths} months</p>
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

  const handleReset = () => {
    setDeposit(10000);
    setApy(4.85);
    setTermMonths(12);
    setCompoundFreq(12);
  };

  const results = useMemo(() => {
    const dep = typeof deposit === 'number' ? deposit : 0;
    const apyVal = typeof apy === 'number' ? Math.max(0, apy) : 0;
    if (deposit === '' || dep <= 0) return null;

    const r = apyVal / 100;
    const t = termMonths / 12;
    const n = compoundFreq;
    const endingBalance = dep * Math.pow(1 + r / n, n * t);
    const totalInterest = endingBalance - dep;
    const totalYieldPct = (totalInterest / dep) * 100;

    return {
      endingBalance,
      totalInterest,
      totalYieldPct
    };
  }, [deposit, apy, termMonths, compoundFreq]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-6 rounded-2xl border border-slate-200">
        <div className="space-y-3.5">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold uppercase text-slate-700 tracking-wider">CD Investment Details</h4>
            <button
              type="button"
              onClick={handleReset}
              className="text-xs font-semibold text-slate-500 hover:text-slate-800 flex items-center gap-1 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Reset
            </button>
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Initial Deposit ({currencySymbol})</label>
            <DecimalInput
              value={deposit}
              onValueChange={setDeposit}
              className="w-full px-3 py-2 border rounded-lg text-sm font-bold"
            />
          </div>
          <div className="grid grid-cols-3 gap-2">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Interest Rate (%)</label>
              <DecimalInput
                value={apy}
                onValueChange={setApy}
                className="w-full px-2.5 py-2 border rounded-lg text-sm font-bold"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Term</label>
              <select
                value={termMonths}
                onChange={(e) => setTermMonths(Number(e.target.value))}
                className="w-full px-2 py-2 border rounded-lg text-xs font-bold bg-white"
              >
                <option value={6}>6 Months</option>
                <option value={12}>12 Months</option>
                <option value={18}>18 Months</option>
                <option value={24}>24 Months</option>
                <option value={36}>36 Months</option>
                <option value={60}>60 Months</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Compounding</label>
              <select
                value={compoundFreq}
                onChange={(e) => setCompoundFreq(Number(e.target.value))}
                className="w-full px-2 py-2 border rounded-lg text-xs font-bold bg-white"
              >
                <option value={365}>Daily</option>
                <option value={12}>Monthly</option>
                <option value={4}>Quarterly</option>
                <option value={1}>Annually</option>
              </select>
            </div>
          </div>
        </div>

        {results ? (
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
                <span>Total Term Return:</span>
                <span className="font-bold">{results.totalYieldPct.toFixed(2)}%</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 flex items-center justify-center text-center text-xs text-slate-500">
            Enter a positive initial deposit to calculate CD maturity balance and interest earned.
          </div>
        )}
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

  const handleReset = () => {
    setCurrentAge(30);
    setRetirementAge(65);
    setCurrentBalance(45000);
    setSalary(85000);
    setEmployeeContributionPercent(8);
    setEmployerMatchPercent(50);
    setEmployerMatchLimit(6);
    setExpectedReturn(7.5);
  };

  const results = useMemo(() => {
    if (currentAge === '' || retirementAge === '' || salary === '') return null;
    const cAge = currentAge;
    const rAge = retirementAge;
    if (rAge <= cAge) return null;

    const cBal = typeof currentBalance === 'number' ? currentBalance : 0;
    const sal = Math.max(0, salary);
    const ecPct = typeof employeeContributionPercent === 'number' ? Math.max(0, employeeContributionPercent) : 0;
    const emPct = typeof employerMatchPercent === 'number' ? Math.max(0, employerMatchPercent) : 0;
    const emLim = typeof employerMatchLimit === 'number' ? Math.max(0, employerMatchLimit) : 0;
    const expRet = typeof expectedReturn === 'number' ? expectedReturn : 0;

    const years = rAge - cAge;
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
      annualMatch: employerAnnual,
      years
    };
  }, [currentAge, retirementAge, currentBalance, salary, employeeContributionPercent, employerMatchPercent, employerMatchLimit, expectedReturn]);

  const invalidAge = typeof currentAge === 'number' && typeof retirementAge === 'number' && retirementAge <= currentAge;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-6 rounded-2xl border border-slate-200">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold uppercase text-slate-700 tracking-wider">401(k) Inputs</h4>
            <button
              type="button"
              onClick={handleReset}
              className="text-xs font-semibold text-slate-500 hover:text-slate-800 flex items-center gap-1 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Reset
            </button>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <div>
              <label className="block text-[11px] font-semibold text-slate-600 mb-1">Current Age</label>
              <DecimalInput
                allowDecimal={false}
                value={currentAge}
                onValueChange={setCurrentAge}
                className="w-full px-2.5 py-1.5 border rounded-lg text-xs font-bold"
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-slate-600 mb-1">Retire Age</label>
              <DecimalInput
                allowDecimal={false}
                value={retirementAge}
                onValueChange={setRetirementAge}
                className="w-full px-2.5 py-1.5 border rounded-lg text-xs font-bold"
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-slate-600 mb-1">Return %/yr</label>
              <DecimalInput
                value={expectedReturn}
                onValueChange={setExpectedReturn}
                className="w-full px-2.5 py-1.5 border rounded-lg text-xs font-bold"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Annual Salary ({currencySymbol})</label>
              <DecimalInput
                value={salary}
                onValueChange={setSalary}
                className="w-full px-2.5 py-1.5 border rounded-lg text-xs font-bold"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Current 401(k) ({currencySymbol})</label>
              <DecimalInput
                value={currentBalance}
                onValueChange={setCurrentBalance}
                className="w-full px-2.5 py-1.5 border rounded-lg text-xs font-bold"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 pt-1">
            <div>
              <label className="block text-[11px] font-semibold text-slate-600 mb-1">Your Contrib %</label>
              <DecimalInput
                value={employeeContributionPercent}
                onValueChange={setEmployeeContributionPercent}
                className="w-full px-2 py-1.5 border rounded-lg text-xs font-bold"
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-slate-600 mb-1">Match Rate %</label>
              <DecimalInput
                value={employerMatchPercent}
                onValueChange={setEmployerMatchPercent}
                className="w-full px-2 py-1.5 border rounded-lg text-xs font-bold"
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-slate-600 mb-1">Match Cap %</label>
              <DecimalInput
                value={employerMatchLimit}
                onValueChange={setEmployerMatchLimit}
                className="w-full px-2 py-1.5 border rounded-lg text-xs font-bold"
              />
            </div>
          </div>
        </div>

        {results ? (
          <div className="bg-gradient-to-br from-indigo-50 to-blue-50 p-5 rounded-xl border border-indigo-200 flex flex-col justify-between space-y-4">
            <div>
              <span className="text-xs font-bold text-indigo-900 uppercase tracking-wider">Projected 401(k) Nest Egg ({results.years} yrs)</span>
              <div className="text-3xl font-black text-indigo-950 font-mono-numbers mt-1">
                {currencySymbol}{results.balance.toLocaleString(undefined, { maximumFractionDigits: 0 })}
              </div>
              <p className="text-xs text-indigo-700 mt-1">Includes {currencySymbol}{results.annualMatch.toFixed(0)}/yr in employer match</p>
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
        ) : (
          <div className={`border rounded-xl p-6 flex items-center justify-center text-center text-xs ${invalidAge ? 'bg-rose-50 border-rose-200 text-rose-700 font-semibold' : 'bg-slate-50 border-slate-200 text-slate-500'}`}>
            {invalidAge
              ? 'Retirement age must be greater than your current age.'
              : 'Enter your age, salary, contribution, and return rate to project your 401(k) balance.'}
          </div>
        )}
      </div>
    </div>
  );
};

export const FourZeroOneKMatchCalculator = FourOhOneKCalculator;
