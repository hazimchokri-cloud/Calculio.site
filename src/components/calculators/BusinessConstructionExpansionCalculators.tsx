import React, { useState, useMemo } from 'react';
import { RotateCcw } from 'lucide-react';
import { DecimalInput } from '../shared/DecimalInput';

interface BaseCalcProps {
  currencySymbol?: string;
  onSave?: (summary: string, inputs: any, results: any) => void;
}

// 1. CAC & LTV Ratio Calculator
export const CacLtvCalculator: React.FC<BaseCalcProps> = ({ currencySymbol = '$' }) => {
  const [salesMarketingCost, setSalesMarketingCost] = useState<number | ''>(25000);
  const [newCustomers, setNewCustomers] = useState<number | ''>(100);
  const [avgRevenuePerUser, setAvgRevenuePerUser] = useState<number | ''>(85);
  const [grossMarginPct, setGrossMarginPct] = useState<number | ''>(75);
  const [churnRatePct, setChurnRatePct] = useState<number | ''>(4.0);

  const handleReset = () => {
    setSalesMarketingCost(25000);
    setNewCustomers(100);
    setAvgRevenuePerUser(85);
    setGrossMarginPct(75);
    setChurnRatePct(4.0);
  };

  const results = useMemo(() => {
    if (
      salesMarketingCost === '' ||
      newCustomers === '' ||
      avgRevenuePerUser === '' ||
      grossMarginPct === '' ||
      churnRatePct === ''
    ) {
      return null;
    }

    const smc = salesMarketingCost;
    const nc = newCustomers;
    const arpu = avgRevenuePerUser;
    const gm = grossMarginPct;
    const cr = churnRatePct;

    if (smc < 0 || nc <= 0 || arpu < 0) {
      return { error: 'Enter non-negative spend and ARPU, and at least 1 customer acquired.' } as const;
    }
    if (gm <= 0 || gm > 100) {
      return { error: 'Gross margin must be greater than 0% and at most 100%.' } as const;
    }
    if (cr <= 0 || cr > 100) {
      return { error: 'Monthly churn rate must be greater than 0% and at most 100%.' } as const;
    }

    const cac = smc / nc;
    const avgLifespanMonths = 1 / (cr / 100);
    const ltv = arpu * (gm / 100) * avgLifespanMonths;
    const ltvCacRatio = cac > 0 ? ltv / cac : Infinity;

    let healthStatus = 'Healthy (3:1 to 5:1)';
    let badgeColor = 'bg-orange-100 text-orange-800';

    if (ltvCacRatio < 1) {
      healthStatus = 'Critical (Losing Money on Acquisition)';
      badgeColor = 'bg-red-100 text-red-800';
    } else if (ltvCacRatio < 3) {
      healthStatus = 'Low Margin / Vulnerable';
      badgeColor = 'bg-amber-100 text-amber-800';
    } else if (ltvCacRatio > 6) {
      healthStatus = 'Under-investing (Could grow faster)';
      badgeColor = 'bg-blue-100 text-blue-800';
    }

    return { cac, ltv, ltvCacRatio, avgLifespanMonths, healthStatus, badgeColor };
  }, [salesMarketingCost, newCustomers, avgRevenuePerUser, grossMarginPct, churnRatePct]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-6 rounded-2xl border border-slate-200">
        <div className="space-y-3.5">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold uppercase text-slate-700 tracking-wider">Acquisition &amp; Customer Metrics</h4>
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
              <label className="block text-xs font-semibold text-slate-600 mb-1">Marketing Spend ({currencySymbol})</label>
              <DecimalInput
                value={salesMarketingCost}
                onValueChange={setSalesMarketingCost}
                className="w-full px-2.5 py-1.5 border rounded-lg text-xs font-bold"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">New Customers Acquired</label>
              <DecimalInput
                value={newCustomers}
                onValueChange={setNewCustomers}
                allowDecimal={false}
                className="w-full px-2.5 py-1.5 border rounded-lg text-xs font-bold"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2">
            <div>
              <label className="block text-[11px] font-semibold text-slate-600 mb-1">ARPU ({currencySymbol}/mo)</label>
              <DecimalInput
                value={avgRevenuePerUser}
                onValueChange={setAvgRevenuePerUser}
                className="w-full px-2.5 py-1.5 border rounded-lg text-xs font-bold"
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-slate-600 mb-1">Gross Margin %</label>
              <DecimalInput
                value={grossMarginPct}
                onValueChange={setGrossMarginPct}
                className="w-full px-2.5 py-1.5 border rounded-lg text-xs font-bold"
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-slate-600 mb-1">Monthly Churn %</label>
              <DecimalInput
                value={churnRatePct}
                onValueChange={setChurnRatePct}
                className="w-full px-2.5 py-1.5 border rounded-lg text-xs font-bold"
              />
            </div>
          </div>
        </div>

        {results && !('error' in results) ? (
          <div className="bg-gradient-to-br from-indigo-50 to-blue-50 p-5 rounded-xl border border-indigo-200 flex flex-col justify-between space-y-4">
            <div>
              <div className="flex justify-between items-center gap-2">
                <span className="text-xs font-bold text-indigo-900 uppercase tracking-wider">LTV : CAC Ratio</span>
                <span className={`px-2 py-0.5 rounded text-[11px] font-bold ${results.badgeColor}`}>
                  {results.healthStatus}
                </span>
              </div>
              <div className="text-3xl font-black text-indigo-950 font-mono-numbers mt-2">
                {results.ltvCacRatio === Infinity ? '∞' : `${results.ltvCacRatio.toFixed(2)}x`}
              </div>
            </div>

            <div className="bg-white p-3 rounded-lg border border-indigo-100 text-xs text-slate-700 space-y-1">
              <div className="flex justify-between">
                <span>Customer Acquisition Cost (CAC):</span>
                <span className="font-bold text-red-700">{currencySymbol}{results.cac.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Customer Lifetime Value (LTV):</span>
                <span className="font-bold text-orange-700">{currencySymbol}{results.ltv.toFixed(2)}</span>
              </div>
              <div className="flex justify-between border-t pt-1">
                <span>Average Customer Lifetime:</span>
                <span className="font-bold">{results.avgLifespanMonths.toFixed(1)} months</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 text-center text-slate-500 text-xs flex items-center justify-center">
            {results && 'error' in results
              ? results.error
              : 'Enter your acquisition and customer metrics to calculate LTV:CAC.'}
          </div>
        )}
      </div>
    </div>
  );
};

// 2. Markup vs Margin Pricing Calculator
export const MarkupMarginCalculator: React.FC<BaseCalcProps> = ({ currencySymbol = '$' }) => {
  const [cost, setCost] = useState<number | ''>(50);
  const [sellingPrice, setSellingPrice] = useState<number | ''>(80);

  const handleReset = () => {
    setCost(50);
    setSellingPrice(80);
  };

  const results = useMemo(() => {
    if (cost === '' || sellingPrice === '') return null;
    const c = cost;
    const sp = sellingPrice;
    if (c <= 0 || sp <= 0) {
      return { error: 'Both cost basis and selling price must be greater than zero.' } as const;
    }
    const profit = sp - c;
    const markupPct = (profit / c) * 100;
    const marginPct = (profit / sp) * 100;
    return { profit, markupPct, marginPct };
  }, [cost, sellingPrice]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-6 rounded-2xl border border-slate-200">
        <div className="space-y-3.5">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold uppercase text-slate-700 tracking-wider">Product Pricing</h4>
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
              <label className="block text-xs font-semibold text-slate-600 mb-1">Item Cost Basis ({currencySymbol})</label>
              <DecimalInput
                value={cost}
                onValueChange={setCost}
                className="w-full px-3 py-1.5 border rounded-lg text-xs font-bold"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Selling Price ({currencySymbol})</label>
              <DecimalInput
                value={sellingPrice}
                onValueChange={setSellingPrice}
                className="w-full px-3 py-1.5 border rounded-lg text-xs font-bold"
              />
            </div>
          </div>
        </div>

        {results && !('error' in results) ? (
          <div className="bg-gradient-to-br from-orange-50 to-teal-50 p-5 rounded-xl border border-orange-200 flex flex-col justify-between space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <span className="text-xs font-bold text-orange-900 uppercase tracking-wider">Gross Margin</span>
                <div className="text-2xl font-black text-orange-950 font-mono-numbers mt-1">{results.marginPct.toFixed(2)}%</div>
              </div>
              <div>
                <span className="text-xs font-bold text-blue-900 uppercase tracking-wider">Cost Markup</span>
                <div className="text-2xl font-black text-blue-950 font-mono-numbers mt-1">{results.markupPct.toFixed(2)}%</div>
              </div>
            </div>

            <div className="bg-white p-3 rounded-lg border border-orange-100 text-xs text-slate-700 space-y-1">
              <div className="flex justify-between">
                <span>Gross Profit per Unit:</span>
                <span className={`font-bold ${results.profit < 0 ? 'text-red-700' : 'text-orange-700'}`}>
                  {results.profit < 0 ? '-' : ''}{currencySymbol}{Math.abs(results.profit).toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 text-center text-slate-500 text-xs flex items-center justify-center">
            {results && 'error' in results
              ? results.error
              : 'Enter your cost basis and selling price to calculate margins.'}
          </div>
        )}
      </div>
    </div>
  );
};

// 3. Inventory Turnover Ratio Calculator
export const InventoryTurnoverCalculator: React.FC<BaseCalcProps> = ({ currencySymbol = '$' }) => {
  const [cogs, setCogs] = useState<number | ''>(450000);
  const [beginningInventory, setBeginningInventory] = useState<number | ''>(80000);
  const [endingInventory, setEndingInventory] = useState<number | ''>(100000);

  const handleReset = () => {
    setCogs(450000);
    setBeginningInventory(80000);
    setEndingInventory(100000);
  };

  const results = useMemo(() => {
    if (cogs === '' || beginningInventory === '' || endingInventory === '') return null;
    const c = cogs;
    const bi = beginningInventory;
    const ei = endingInventory;
    if (c < 0 || bi < 0 || ei < 0) {
      return { error: 'Enter non-negative COGS and inventory balances.' } as const;
    }
    const avgInventory = (bi + ei) / 2;
    if (avgInventory <= 0) {
      return { error: 'Average inventory must be greater than zero to compute turnover.' } as const;
    }
    const turnoverRatio = c / avgInventory;
    const daysToSell = turnoverRatio > 0 ? 365 / turnoverRatio : Infinity;
    return { avgInventory, turnoverRatio, daysToSell };
  }, [cogs, beginningInventory, endingInventory]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-6 rounded-2xl border border-slate-200">
        <div className="space-y-3.5">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold uppercase text-slate-700 tracking-wider">Cost of Goods &amp; Inventory</h4>
            <button
              type="button"
              onClick={handleReset}
              className="text-xs font-semibold text-slate-500 hover:text-slate-900 flex items-center gap-1 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Reset
            </button>
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Annual Cost of Goods Sold (COGS) ({currencySymbol})</label>
            <DecimalInput
              value={cogs}
              onValueChange={setCogs}
              className="w-full px-3 py-1.5 border rounded-lg text-xs font-bold"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Beginning Inventory ({currencySymbol})</label>
              <DecimalInput
                value={beginningInventory}
                onValueChange={setBeginningInventory}
                className="w-full px-3 py-1.5 border rounded-lg text-xs font-bold"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Ending Inventory ({currencySymbol})</label>
              <DecimalInput
                value={endingInventory}
                onValueChange={setEndingInventory}
                className="w-full px-3 py-1.5 border rounded-lg text-xs font-bold"
              />
            </div>
          </div>
        </div>

        {results && !('error' in results) ? (
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-5 rounded-xl border border-blue-200 flex flex-col justify-between space-y-4">
            <div>
              <span className="text-xs font-bold text-blue-900 uppercase tracking-wider">Inventory Turnover Ratio</span>
              <div className="text-3xl font-black text-blue-950 font-mono-numbers mt-1">
                {results.turnoverRatio.toFixed(2)} times / year
              </div>
            </div>

            <div className="bg-white p-3 rounded-lg border border-blue-100 text-xs text-slate-700 space-y-1">
              <div className="flex justify-between">
                <span>Days Sales of Inventory (DSI):</span>
                <span className="font-bold">
                  {results.daysToSell === Infinity ? 'N/A (0 COGS)' : `${results.daysToSell.toFixed(1)} days`}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Average Inventory Level:</span>
                <span className="font-bold">{currencySymbol}{results.avgInventory.toLocaleString()}</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 text-center text-slate-500 text-xs flex items-center justify-center">
            {results && 'error' in results
              ? results.error
              : 'Enter your COGS and inventory levels to calculate turnover.'}
          </div>
        )}
      </div>
    </div>
  );
};

// 4. EBITDA Calculator
export const EbitdaCalculator: React.FC<BaseCalcProps> = ({ currencySymbol = '$' }) => {
  const [revenue, setRevenue] = useState<number | ''>(1200000);
  const [cogs, setCogs] = useState<number | ''>(400000);
  const [operatingExpenses, setOperatingExpenses] = useState<number | ''>(350000);
  const [depreciation, setDepreciation] = useState<number | ''>(45000);
  const [amortization, setAmortization] = useState<number | ''>(15000);

  const handleReset = () => {
    setRevenue(1200000);
    setCogs(400000);
    setOperatingExpenses(350000);
    setDepreciation(45000);
    setAmortization(15000);
  };

  const results = useMemo(() => {
    if (
      revenue === '' ||
      cogs === '' ||
      operatingExpenses === '' ||
      depreciation === '' ||
      amortization === ''
    ) {
      return null;
    }

    const rev = revenue;
    const costG = cogs;
    const opex = operatingExpenses;
    const dep = depreciation;
    const amort = amortization;

    const grossProfit = rev - costG;
    const operatingIncome = grossProfit - opex;
    const ebitda = operatingIncome + dep + amort;
    const ebitdaMargin = rev > 0 ? (ebitda / rev) * 100 : null;

    return { grossProfit, operatingIncome, ebitda, ebitdaMargin };
  }, [revenue, cogs, operatingExpenses, depreciation, amortization]);

  const fmtSigned = (val: number, decimals = 0) =>
    `${val < 0 ? '-' : ''}${currencySymbol}${Math.abs(val).toLocaleString(undefined, {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals
    })}`;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-6 rounded-2xl border border-slate-200">
        <div className="space-y-3.5">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold uppercase text-slate-700 tracking-wider">P&amp;L Operating Figures</h4>
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
              <label className="block text-xs font-semibold text-slate-600 mb-1">Total Revenue ({currencySymbol})</label>
              <DecimalInput
                value={revenue}
                onValueChange={setRevenue}
                className="w-full px-2.5 py-1.5 border rounded-lg text-xs font-bold"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">COGS ({currencySymbol})</label>
              <DecimalInput
                value={cogs}
                onValueChange={setCogs}
                className="w-full px-2.5 py-1.5 border rounded-lg text-xs font-bold"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Operating Expenses (OPEX excl. D&amp;A)</label>
            <DecimalInput
              value={operatingExpenses}
              onValueChange={setOperatingExpenses}
              className="w-full px-2.5 py-1.5 border rounded-lg text-xs font-bold"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Depreciation ({currencySymbol})</label>
              <DecimalInput
                value={depreciation}
                onValueChange={setDepreciation}
                className="w-full px-2.5 py-1.5 border rounded-lg text-xs font-bold"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Amortization ({currencySymbol})</label>
              <DecimalInput
                value={amortization}
                onValueChange={setAmortization}
                className="w-full px-2.5 py-1.5 border rounded-lg text-xs font-bold"
              />
            </div>
          </div>
        </div>

        {results ? (
          <div className="bg-gradient-to-br from-indigo-50 to-blue-50 p-5 rounded-xl border border-indigo-200 flex flex-col justify-between space-y-4">
            <div>
              <span className="text-xs font-bold text-indigo-900 uppercase tracking-wider">EBITDA</span>
              <div className="text-3xl font-black text-indigo-950 font-mono-numbers mt-1">
                {fmtSigned(results.ebitda, 2)}
              </div>
              <span className="text-xs text-indigo-700 font-semibold">
                EBITDA Margin: {results.ebitdaMargin === null ? 'N/A (0 revenue)' : `${results.ebitdaMargin.toFixed(1)}%`}
              </span>
            </div>

            <div className="bg-white p-3 rounded-lg border border-indigo-100 text-xs text-slate-700 space-y-1">
              <div className="flex justify-between">
                <span>Operating Income (EBIT):</span>
                <span className="font-bold">{fmtSigned(results.operatingIncome)}</span>
              </div>
              <div className="flex justify-between">
                <span>Gross Profit:</span>
                <span className="font-bold text-orange-700">{fmtSigned(results.grossProfit)}</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 text-center text-slate-500 text-xs flex items-center justify-center">
            Enter your P&amp;L operating figures to calculate EBITDA.
          </div>
        )}
      </div>
    </div>
  );
};

// 5. Startup Burn Rate & Runway Calculator
export const BurnRateCalculator: React.FC<BaseCalcProps> = ({ currencySymbol = '$' }) => {
  const [cashBalance, setCashBalance] = useState<number | ''>(350000);
  const [monthlyRevenue, setMonthlyRevenue] = useState<number | ''>(15000);
  const [monthlyExpenses, setMonthlyExpenses] = useState<number | ''>(45000);

  const handleReset = () => {
    setCashBalance(350000);
    setMonthlyRevenue(15000);
    setMonthlyExpenses(45000);
  };

  const results = useMemo(() => {
    if (cashBalance === '' || monthlyRevenue === '' || monthlyExpenses === '') return null;
    const cash = cashBalance;
    const rev = monthlyRevenue;
    const exp = monthlyExpenses;
    if (cash < 0 || rev < 0 || exp < 0) {
      return { error: 'Cash balance, revenue, and expenses must be non-negative.' } as const;
    }

    const grossBurn = exp;
    const netBurn = exp - rev;
    const runwayMonths = netBurn > 0 ? cash / netBurn : Infinity;

    return { grossBurn, netBurn, runwayMonths };
  }, [cashBalance, monthlyRevenue, monthlyExpenses]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-6 rounded-2xl border border-slate-200">
        <div className="space-y-3.5">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold uppercase text-slate-700 tracking-wider">Cash &amp; Monthly Burn</h4>
            <button
              type="button"
              onClick={handleReset}
              className="text-xs font-semibold text-slate-500 hover:text-slate-900 flex items-center gap-1 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Reset
            </button>
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Current Cash in Bank ({currencySymbol})</label>
            <DecimalInput
              value={cashBalance}
              onValueChange={setCashBalance}
              className="w-full px-3 py-1.5 border rounded-lg text-xs font-bold"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Monthly Gross Expenses ({currencySymbol})</label>
              <DecimalInput
                value={monthlyExpenses}
                onValueChange={setMonthlyExpenses}
                className="w-full px-3 py-1.5 border rounded-lg text-xs font-bold"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Monthly Revenue ({currencySymbol})</label>
              <DecimalInput
                value={monthlyRevenue}
                onValueChange={setMonthlyRevenue}
                className="w-full px-3 py-1.5 border rounded-lg text-xs font-bold"
              />
            </div>
          </div>
        </div>

        {results && !('error' in results) ? (
          <div className="bg-gradient-to-br from-amber-50 to-orange-50 p-5 rounded-xl border border-amber-200 flex flex-col justify-between space-y-4">
            <div>
              <span className="text-xs font-bold text-amber-900 uppercase tracking-wider">Estimated Cash Runway</span>
              <div className="text-3xl font-black text-amber-950 font-mono-numbers mt-1">
                {results.runwayMonths === Infinity
                  ? results.netBurn < 0
                    ? 'Cash-Flow Positive'
                    : 'Break-Even (0 Net Burn)'
                  : `${results.runwayMonths.toFixed(1)} Months`}
              </div>
            </div>

            <div className="bg-white p-3 rounded-lg border border-amber-100 text-xs text-slate-700 space-y-1">
              <div className="flex justify-between">
                <span>{results.netBurn <= 0 ? 'Net Monthly Surplus:' : 'Net Monthly Burn:'}</span>
                {results.netBurn <= 0 ? (
                  <span className="font-bold text-emerald-700">
                    +{currencySymbol}{Math.abs(results.netBurn).toLocaleString()} / mo
                  </span>
                ) : (
                  <span className="font-bold text-red-700">
                    {currencySymbol}{results.netBurn.toLocaleString()} / mo
                  </span>
                )}
              </div>
              <div className="flex justify-between">
                <span>Gross Monthly Burn:</span>
                <span className="font-bold">{currencySymbol}{results.grossBurn.toLocaleString()} / mo</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 text-center text-slate-500 text-xs flex items-center justify-center">
            {results && 'error' in results
              ? results.error
              : 'Enter your cash balance, expenses, and revenue to calculate runway.'}
          </div>
        )}
      </div>
    </div>
  );
};

// 6. Paint Coverage & Gallons Calculator
export const PaintCalculator: React.FC<BaseCalcProps> = () => {
  const [roomLength, setRoomLength] = useState<number | ''>(14);
  const [roomWidth, setRoomWidth] = useState<number | ''>(12);
  const [ceilingHeight, setCeilingHeight] = useState<number | ''>(9);
  const [doors, setDoors] = useState<number | ''>(2);
  const [windows, setWindows] = useState<number | ''>(2);
  const [coats, setCoats] = useState<number | ''>(2);

  const handleReset = () => {
    setRoomLength(14);
    setRoomWidth(12);
    setCeilingHeight(9);
    setDoors(2);
    setWindows(2);
    setCoats(2);
  };

  const results = useMemo(() => {
    if (roomLength === '' || roomWidth === '' || ceilingHeight === '') return null;
    const rl = roomLength;
    const rw = roomWidth;
    const ch = ceilingHeight;
    const d = typeof doors === 'number' ? doors : 0;
    const w = typeof windows === 'number' ? windows : 0;
    const c = typeof coats === 'number' ? coats : 1;

    if (rl <= 0 || rw <= 0 || ch <= 0 || c < 1) {
      return { error: 'Enter positive room dimensions and at least 1 coat.' } as const;
    }

    const wallPerimeter = 2 * (rl + rw);
    const grossWallArea = wallPerimeter * ch;
    const doorDeduction = d * 20;
    const windowDeduction = w * 15;
    const netArea = Math.max(0, grossWallArea - doorDeduction - windowDeduction);
    const totalSqFtToPaint = netArea * c;
    const gallonsNeeded = Math.ceil(totalSqFtToPaint / 350);

    return { grossWallArea, netArea, totalSqFtToPaint, gallonsNeeded, coats: c };
  }, [roomLength, roomWidth, ceilingHeight, doors, windows, coats]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-6 rounded-2xl border border-slate-200">
        <div className="space-y-3.5">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold uppercase text-slate-700 tracking-wider">Room Dimensions (Feet)</h4>
            <button
              type="button"
              onClick={handleReset}
              className="text-xs font-semibold text-slate-500 hover:text-slate-900 flex items-center gap-1 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Reset
            </button>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <div>
              <label className="block text-[11px] font-semibold text-slate-600 mb-1">Length (ft)</label>
              <DecimalInput
                value={roomLength}
                onValueChange={setRoomLength}
                className="w-full px-2 py-1.5 border rounded-lg text-xs font-bold"
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-slate-600 mb-1">Width (ft)</label>
              <DecimalInput
                value={roomWidth}
                onValueChange={setRoomWidth}
                className="w-full px-2 py-1.5 border rounded-lg text-xs font-bold"
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-slate-600 mb-1">Ceiling (ft)</label>
              <DecimalInput
                value={ceilingHeight}
                onValueChange={setCeilingHeight}
                className="w-full px-2 py-1.5 border rounded-lg text-xs font-bold"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2">
            <div>
              <label className="block text-[11px] font-semibold text-slate-600 mb-1">Doors</label>
              <DecimalInput
                value={doors}
                onValueChange={setDoors}
                allowDecimal={false}
                className="w-full px-2 py-1.5 border rounded-lg text-xs font-bold"
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-slate-600 mb-1">Windows</label>
              <DecimalInput
                value={windows}
                onValueChange={setWindows}
                allowDecimal={false}
                className="w-full px-2 py-1.5 border rounded-lg text-xs font-bold"
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-slate-600 mb-1">Coats</label>
              <DecimalInput
                value={coats}
                onValueChange={setCoats}
                allowDecimal={false}
                className="w-full px-2 py-1.5 border rounded-lg text-xs font-bold"
              />
            </div>
          </div>
          <p className="text-[11px] text-slate-500">
            Walls only (excludes ceiling). Deducts ~20 sq ft per door and ~15 sq ft per window.
          </p>
        </div>

        {results && !('error' in results) ? (
          <div className="bg-gradient-to-br from-blue-50 to-sky-50 p-5 rounded-xl border border-blue-200 flex flex-col justify-between space-y-4">
            <div>
              <span className="text-xs font-bold text-blue-900 uppercase tracking-wider">Paint Required (Walls Only)</span>
              <div className="text-3xl font-black text-blue-950 font-mono-numbers mt-1">
                {results.gallonsNeeded} {results.gallonsNeeded === 1 ? 'Gallon' : 'Gallons'}
              </div>
              <p className="text-xs text-blue-800 mt-1">Based on {results.coats} coats ({results.totalSqFtToPaint.toLocaleString(undefined, { maximumFractionDigits: 1 })} sq ft total coverage)</p>
            </div>

            <div className="bg-white p-3 rounded-lg border border-blue-100 text-xs text-slate-700 space-y-1">
              <div className="flex justify-between">
                <span>Net Wall Area:</span>
                <span className="font-bold">{results.netArea.toLocaleString(undefined, { maximumFractionDigits: 1 })} sq ft</span>
              </div>
              <div className="flex justify-between">
                <span>Coverage per Gallon:</span>
                <span>~350 sq ft</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 text-center text-slate-500 text-xs flex items-center justify-center">
            {results && 'error' in results
              ? results.error
              : 'Enter room length, width, and ceiling height to calculate paint gallons.'}
          </div>
        )}
      </div>
    </div>
  );
};

// 7. Drywall Sheets & Screws Calculator
export const DrywallCalculator: React.FC<BaseCalcProps> = () => {
  const [wallSqFt, setWallSqFt] = useState<number | ''>(600);
  const [sheetSize, setSheetSize] = useState<'4x8' | '4x12'>('4x8');
  const [wastePct, setWastePct] = useState<number | ''>(10);

  const handleReset = () => {
    setWallSqFt(600);
    setSheetSize('4x8');
    setWastePct(10);
  };

  const results = useMemo(() => {
    if (wallSqFt === '') return null;
    const wSqFt = wallSqFt;
    const waste = typeof wastePct === 'number' ? wastePct : 0;
    if (wSqFt <= 0 || waste < 0) {
      return { error: 'Enter a positive surface area and a non-negative waste percentage.' } as const;
    }
    const sheetSqFt = sheetSize === '4x8' ? 32 : 48;
    const totalSqFtWithWaste = wSqFt * (1 + waste / 100);
    const sheetsNeeded = Math.ceil(totalSqFtWithWaste / sheetSqFt);
    const screwsPerSheet = sheetSize === '4x8' ? 32 : 48;
    const screwsNeeded = sheetsNeeded * screwsPerSheet;
    const compoundGallons = Math.ceil(totalSqFtWithWaste * 0.004);

    return { sheetsNeeded, screwsNeeded, compoundGallons, screwsPerSheet };
  }, [wallSqFt, sheetSize, wastePct]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-6 rounded-2xl border border-slate-200">
        <div className="space-y-3.5">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold uppercase text-slate-700 tracking-wider">Surface Area &amp; Sheet Size</h4>
            <button
              type="button"
              onClick={handleReset}
              className="text-xs font-semibold text-slate-500 hover:text-slate-900 flex items-center gap-1 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Reset
            </button>
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Total Wall &amp; Ceiling Area (sq ft)</label>
            <DecimalInput
              value={wallSqFt}
              onValueChange={setWallSqFt}
              className="w-full px-3 py-1.5 border rounded-lg text-xs font-bold"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Sheet Dimensions</label>
              <select
                value={sheetSize}
                onChange={(e) => setSheetSize(e.target.value as '4x8' | '4x12')}
                className="w-full px-2.5 py-1.5 border rounded-lg text-xs font-bold bg-white"
              >
                <option value="4x8">4 ft × 8 ft (32 sq ft)</option>
                <option value="4x12">4 ft × 12 ft (48 sq ft)</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Waste Margin %</label>
              <DecimalInput
                value={wastePct}
                onValueChange={setWastePct}
                className="w-full px-2.5 py-1.5 border rounded-lg text-xs font-bold"
              />
            </div>
          </div>
        </div>

        {results && !('error' in results) ? (
          <div className="bg-gradient-to-br from-slate-50 to-blue-50 p-5 rounded-xl border border-slate-200 flex flex-col justify-between space-y-4">
            <div>
              <span className="text-xs font-bold text-slate-600 uppercase tracking-wider">Drywall Sheets Needed</span>
              <div className="text-3xl font-black text-slate-900 font-mono-numbers mt-1">
                {results.sheetsNeeded} Sheets ({sheetSize})
              </div>
            </div>

            <div className="bg-white p-3 rounded-lg border border-slate-200 text-xs text-slate-700 space-y-1">
              <div className="flex justify-between">
                <span>Drywall Screws (~{results.screwsPerSheet}/sheet):</span>
                <span className="font-bold">{results.screwsNeeded.toLocaleString()} screws</span>
              </div>
              <div className="flex justify-between">
                <span>Joint Compound Mud:</span>
                <span className="font-bold">~{results.compoundGallons} {results.compoundGallons === 1 ? 'Gallon' : 'Gallons'}</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 text-center text-slate-500 text-xs flex items-center justify-center">
            {results && 'error' in results
              ? results.error
              : 'Enter total surface area to calculate drywall sheets.'}
          </div>
        )}
      </div>
    </div>
  );
};

// 8. Mulch & Gravel Volume Calculator
export const MulchGravelCalculator: React.FC<BaseCalcProps> = () => {
  const [areaSqFt, setAreaSqFt] = useState<number | ''>(300);
  const [depthInches, setDepthInches] = useState<number | ''>(3);

  const handleReset = () => {
    setAreaSqFt(300);
    setDepthInches(3);
  };

  const results = useMemo(() => {
    if (areaSqFt === '' || depthInches === '') return null;
    const aSqFt = areaSqFt;
    const dInches = depthInches;
    if (aSqFt <= 0 || dInches <= 0) {
      return { error: 'Area and depth must both be greater than zero.' } as const;
    }

    const cubicFeet = aSqFt * (dInches / 12);
    const cubicYards = cubicFeet / 27;
    const tonsOfGravel = cubicYards * 1.4;
    const bagsTwoCuFt = Math.ceil(cubicFeet / 2);

    return { cubicFeet, cubicYards, tonsOfGravel, bagsTwoCuFt };
  }, [areaSqFt, depthInches]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-6 rounded-2xl border border-slate-200">
        <div className="space-y-3.5">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold uppercase text-slate-700 tracking-wider">Coverage Area</h4>
            <button
              type="button"
              onClick={handleReset}
              className="text-xs font-semibold text-slate-500 hover:text-slate-900 flex items-center gap-1 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Reset
            </button>
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Area (sq ft)</label>
            <DecimalInput
              value={areaSqFt}
              onValueChange={setAreaSqFt}
              className="w-full px-3 py-1.5 border rounded-lg text-xs font-bold"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Depth (Inches)</label>
            <DecimalInput
              value={depthInches}
              onValueChange={setDepthInches}
              className="w-full px-3 py-1.5 border rounded-lg text-xs font-bold"
            />
          </div>
        </div>

        {results && !('error' in results) ? (
          <div className="bg-gradient-to-br from-amber-50 to-yellow-50 p-5 rounded-xl border border-amber-200 flex flex-col justify-between space-y-4">
            <div>
              <span className="text-xs font-bold text-amber-900 uppercase tracking-wider">Bulk Volume Required</span>
              <div className="text-3xl font-black text-amber-950 font-mono-numbers mt-1">
                {results.cubicYards.toFixed(2)} Cubic Yards
              </div>
              <span className="text-xs text-amber-800 font-semibold">({results.cubicFeet.toFixed(1)} cu ft)</span>
            </div>

            <div className="bg-white p-3 rounded-lg border border-amber-100 text-xs text-slate-700 space-y-1">
              <div className="flex justify-between">
                <span>Standard 2 cu ft Bags (Mulch):</span>
                <span className="font-bold text-slate-900">{results.bagsTwoCuFt} bags</span>
              </div>
              <div className="flex justify-between">
                <span>Weight if Gravel (~1.4 tons/yd³):</span>
                <span className="font-bold text-slate-900">{results.tonsOfGravel.toFixed(2)} Tons</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 text-center text-slate-500 text-xs flex items-center justify-center">
            {results && 'error' in results
              ? results.error
              : 'Enter area and depth to calculate mulch or gravel requirements.'}
          </div>
        )}
      </div>
    </div>
  );
};

// 9. Decking & Board Footage Calculator
export const DeckLumberCalculator: React.FC<BaseCalcProps> = () => {
  const [deckLength, setDeckLength] = useState<number | ''>(16);
  const [deckWidth, setDeckWidth] = useState<number | ''>(12);
  const [boardWidthInches, setBoardWidthInches] = useState<number>(5.5);

  const handleReset = () => {
    setDeckLength(16);
    setDeckWidth(12);
    setBoardWidthInches(5.5);
  };

  const results = useMemo(() => {
    if (deckLength === '' || deckWidth === '') return null;
    const dL = deckLength;
    const dW = deckWidth;
    if (dL <= 0 || dW <= 0) {
      return { error: 'Both deck length and deck width must be greater than zero.' } as const;
    }

    const totalDeckSqFt = dL * dW;
    const boardWidthFeet = boardWidthInches / 12;
    const linearFeetNeeded = totalDeckSqFt / boardWidthFeet;
    const standard16FtBoards = Math.ceil((linearFeetNeeded / 16) * 1.1);

    return { totalDeckSqFt, linearFeetNeeded, standard16FtBoards };
  }, [deckLength, deckWidth, boardWidthInches]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-6 rounded-2xl border border-slate-200">
        <div className="space-y-3.5">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold uppercase text-slate-700 tracking-wider">Deck Dimensions (Feet)</h4>
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
              <label className="block text-xs font-semibold text-slate-600 mb-1">Deck Length (ft)</label>
              <DecimalInput
                value={deckLength}
                onValueChange={setDeckLength}
                className="w-full px-3 py-1.5 border rounded-lg text-xs font-bold"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Deck Width (ft)</label>
              <DecimalInput
                value={deckWidth}
                onValueChange={setDeckWidth}
                className="w-full px-3 py-1.5 border rounded-lg text-xs font-bold"
              />
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Decking Plank Width (Inches)</label>
            <select
              value={boardWidthInches}
              onChange={(e) => setBoardWidthInches(Number(e.target.value))}
              className="w-full px-3 py-1.5 border rounded-lg text-xs font-bold bg-white"
            >
              <option value={5.5}>5.5 inches (Standard 2x6 / 5/4x6)</option>
              <option value={3.5}>3.5 inches (Standard 2x4)</option>
              <option value={7.25}>7.25 inches (Standard 2x8)</option>
            </select>
          </div>
        </div>

        {results && !('error' in results) ? (
          <div className="bg-gradient-to-br from-orange-50 to-teal-50 p-5 rounded-xl border border-orange-200 flex flex-col justify-between space-y-4">
            <div>
              <span className="text-xs font-bold text-orange-900 uppercase tracking-wider">Total Linear Footage</span>
              <div className="text-3xl font-black text-orange-950 font-mono-numbers mt-1">
                {Math.ceil(results.linearFeetNeeded)} Linear Feet
              </div>
              <span className="text-xs text-orange-700">{results.totalDeckSqFt.toLocaleString(undefined, { maximumFractionDigits: 1 })} sq ft deck area</span>
            </div>

            <div className="bg-white p-3 rounded-lg border border-orange-100 text-xs text-slate-700 space-y-1">
              <div className="flex justify-between">
                <span>16-Foot Boards Needed (10% waste):</span>
                <span className="font-bold text-slate-900">{results.standard16FtBoards} Boards</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 text-center text-slate-500 text-xs flex items-center justify-center">
            {results && 'error' in results
              ? results.error
              : 'Enter deck length and width to calculate board requirements.'}
          </div>
        )}
      </div>
    </div>
  );
};
