import React, { useState, useMemo } from 'react';
import { Briefcase, TrendingUp, HardHat, DollarSign, RotateCcw, Copy, Check, Layers } from 'lucide-react';
import { copyToClipboard } from '../../utils/formatters';

interface BaseCalcProps {
  currencySymbol?: string;
  onSave?: (summary: string, inputs: any, results: any) => void;
}

// 1. CAC & LTV Ratio Calculator
export const CacLtvCalculator: React.FC<BaseCalcProps> = ({ currencySymbol = '$' }) => {
  const [salesMarketingCost, setSalesMarketingCost] = useState<number | ''>(25000);
  const [newCustomers, setNewCustomers] = useState<number | ''>(100);
  const [avgRevenuePerUser, setAvgRevenuePerUser] = useState<number | ''>(85); // per month
  const [grossMarginPct, setGrossMarginPct] = useState<number | ''>(75);
  const [churnRatePct, setChurnRatePct] = useState<number | ''>(4.0); // 4% monthly churn

  const results = useMemo(() => {
    const smc = typeof salesMarketingCost === 'number' ? salesMarketingCost : 0;
    const nc = typeof newCustomers === 'number' ? newCustomers : 0;
    const arpu = typeof avgRevenuePerUser === 'number' ? avgRevenuePerUser : 0;
    const gm = typeof grossMarginPct === 'number' ? grossMarginPct : 0;
    const cr = typeof churnRatePct === 'number' ? churnRatePct : 0;

    const cac = nc > 0 ? smc / nc : 0;
    const avgLifespanMonths = cr > 0 ? 1 / (cr / 100) : 24;
    const ltv = arpu * (gm / 100) * avgLifespanMonths;
    const ltvCacRatio = cac > 0 ? ltv / cac : 0;

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
          <h4 className="text-xs font-bold uppercase text-slate-700 tracking-wider">Acquisition & Customer Metrics</h4>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Marketing Spend ({currencySymbol})</label>
              <input
                type="number"
                value={salesMarketingCost}
                onChange={(e) => setSalesMarketingCost(e.target.value === '' ? '' : Math.max(0, Number(e.target.value)))}
                className="w-full px-2.5 py-1.5 border rounded-lg text-xs font-bold"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">New Customers Acquired</label>
              <input
                type="number"
                value={newCustomers}
                onChange={(e) => setNewCustomers(e.target.value === '' ? '' : Math.max(0, Number(e.target.value)))}
                className="w-full px-2.5 py-1.5 border rounded-lg text-xs font-bold"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2">
            <div>
              <label className="block text-[11px] font-semibold text-slate-600 mb-1">ARPU ({currencySymbol}/mo)</label>
              <input
                type="number"
                value={avgRevenuePerUser}
                onChange={(e) => setAvgRevenuePerUser(e.target.value === '' ? '' : Math.max(0, Number(e.target.value)))}
                className="w-full px-2.5 py-1.5 border rounded-lg text-xs font-bold"
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-slate-600 mb-1">Gross Margin %</label>
              <input
                type="number"
                value={grossMarginPct}
                onChange={(e) => setGrossMarginPct(e.target.value === '' ? '' : Number(e.target.value))}
                className="w-full px-2.5 py-1.5 border rounded-lg text-xs font-bold"
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-slate-600 mb-1">Monthly Churn %</label>
              <input
                type="number"
                step="0.1"
                value={churnRatePct}
                onChange={(e) => setChurnRatePct(e.target.value === '' ? '' : Math.max(0, Number(e.target.value)))}
                className="w-full px-2.5 py-1.5 border rounded-lg text-xs font-bold"
              />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-indigo-50 to-blue-50 p-5 rounded-xl border border-indigo-200 flex flex-col justify-between space-y-4">
          <div>
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold text-indigo-900 uppercase tracking-wider">LTV : CAC Ratio</span>
              <span className={`px-2 py-0.5 rounded text-[11px] font-bold ${results.badgeColor}`}>
                {results.healthStatus}
              </span>
            </div>
            <div className="text-3xl font-black text-indigo-950 font-mono-numbers mt-2">
              {results.ltvCacRatio.toFixed(2)}x
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
      </div>
    </div>
  );
};

// 2. Markup vs Margin Pricing Calculator
export const MarkupMarginCalculator: React.FC<BaseCalcProps> = ({ currencySymbol = '$' }) => {
  const [cost, setCost] = useState<number | ''>(50);
  const [sellingPrice, setSellingPrice] = useState<number | ''>(80);

  const c = typeof cost === 'number' ? cost : 0;
  const sp = typeof sellingPrice === 'number' ? sellingPrice : 0;

  const profit = sp - c;
  const markupPct = c > 0 ? (profit / c) * 100 : 0;
  const marginPct = sp > 0 ? (profit / sp) * 100 : 0;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-6 rounded-2xl border border-slate-200">
        <div className="space-y-3.5">
          <h4 className="text-xs font-bold uppercase text-slate-700 tracking-wider">Product Pricing</h4>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Item Cost Basis ({currencySymbol})</label>
              <input
                type="number"
                value={cost}
                onChange={(e) => setCost(e.target.value === '' ? '' : Math.max(0, Number(e.target.value)))}
                className="w-full px-3 py-1.5 border rounded-lg text-xs font-bold"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Selling Price ({currencySymbol})</label>
              <input
                type="number"
                value={sellingPrice}
                onChange={(e) => setSellingPrice(e.target.value === '' ? '' : Math.max(0, Number(e.target.value)))}
                className="w-full px-3 py-1.5 border rounded-lg text-xs font-bold"
              />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-orange-50 to-teal-50 p-5 rounded-xl border border-orange-200 flex flex-col justify-between space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <span className="text-xs font-bold text-orange-900 uppercase tracking-wider">Gross Margin</span>
              <div className="text-2xl font-black text-orange-950 font-mono-numbers mt-1">{marginPct.toFixed(2)}%</div>
            </div>
            <div>
              <span className="text-xs font-bold text-blue-900 uppercase tracking-wider">Cost Markup</span>
              <div className="text-2xl font-black text-blue-950 font-mono-numbers mt-1">{markupPct.toFixed(2)}%</div>
            </div>
          </div>

          <div className="bg-white p-3 rounded-lg border border-orange-100 text-xs text-slate-700 space-y-1">
            <div className="flex justify-between">
              <span>Gross Profit per Unit:</span>
              <span className="font-bold text-orange-700">{currencySymbol}{profit.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// 3. Inventory Turnover Ratio Calculator
export const InventoryTurnoverCalculator: React.FC<BaseCalcProps> = ({ currencySymbol = '$' }) => {
  const [cogs, setCogs] = useState<number | ''>(450000);
  const [beginningInventory, setBeginningInventory] = useState<number | ''>(80000);
  const [endingInventory, setEndingInventory] = useState<number | ''>(100000);

  const c = typeof cogs === 'number' ? cogs : 0;
  const bi = typeof beginningInventory === 'number' ? beginningInventory : 0;
  const ei = typeof endingInventory === 'number' ? endingInventory : 0;

  const avgInventory = (bi + ei) / 2;
  const turnoverRatio = avgInventory > 0 ? c / avgInventory : 0;
  const daysToSell = turnoverRatio > 0 ? 365 / turnoverRatio : 0;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-6 rounded-2xl border border-slate-200">
        <div className="space-y-3.5">
          <h4 className="text-xs font-bold uppercase text-slate-700 tracking-wider">Cost of Goods & Inventory</h4>
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Annual Cost of Goods Sold (COGS) ({currencySymbol})</label>
            <input
              type="number"
              value={cogs}
              onChange={(e) => setCogs(e.target.value === '' ? '' : Math.max(0, Number(e.target.value)))}
              className="w-full px-3 py-1.5 border rounded-lg text-xs font-bold"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Beginning Inventory ({currencySymbol})</label>
              <input
                type="number"
                value={beginningInventory}
                onChange={(e) => setBeginningInventory(e.target.value === '' ? '' : Math.max(0, Number(e.target.value)))}
                className="w-full px-3 py-1.5 border rounded-lg text-xs font-bold"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Ending Inventory ({currencySymbol})</label>
              <input
                type="number"
                value={endingInventory}
                onChange={(e) => setEndingInventory(e.target.value === '' ? '' : Math.max(0, Number(e.target.value)))}
                className="w-full px-3 py-1.5 border rounded-lg text-xs font-bold"
              />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-5 rounded-xl border border-blue-200 flex flex-col justify-between space-y-4">
          <div>
            <span className="text-xs font-bold text-blue-900 uppercase tracking-wider">Inventory Turnover Ratio</span>
            <div className="text-3xl font-black text-blue-950 font-mono-numbers mt-1">
              {turnoverRatio.toFixed(2)} times / year
            </div>
          </div>

          <div className="bg-white p-3 rounded-lg border border-blue-100 text-xs text-slate-700 space-y-1">
            <div className="flex justify-between">
              <span>Days Sales of Inventory (DSI):</span>
              <span className="font-bold">{daysToSell.toFixed(1)} days</span>
            </div>
            <div className="flex justify-between">
              <span>Average Inventory Level:</span>
              <span className="font-bold">{currencySymbol}{avgInventory.toLocaleString()}</span>
            </div>
          </div>
        </div>
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

  const rev = typeof revenue === 'number' ? revenue : 0;
  const costG = typeof cogs === 'number' ? cogs : 0;
  const opex = typeof operatingExpenses === 'number' ? operatingExpenses : 0;
  const dep = typeof depreciation === 'number' ? depreciation : 0;
  const amort = typeof amortization === 'number' ? amortization : 0;

  const grossProfit = rev - costG;
  const operatingIncome = grossProfit - opex; // EBIT
  const ebitda = operatingIncome + dep + amort;
  const ebitdaMargin = rev > 0 ? (ebitda / rev) * 100 : 0;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-6 rounded-2xl border border-slate-200">
        <div className="space-y-3.5">
          <h4 className="text-xs font-bold uppercase text-slate-700 tracking-wider">P&L Operating Figures</h4>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Total Revenue ({currencySymbol})</label>
              <input
                type="number"
                value={revenue}
                onChange={(e) => setRevenue(e.target.value === '' ? '' : Math.max(0, Number(e.target.value)))}
                className="w-full px-2.5 py-1.5 border rounded-lg text-xs font-bold"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">COGS ({currencySymbol})</label>
              <input
                type="number"
                value={cogs}
                onChange={(e) => setCogs(e.target.value === '' ? '' : Math.max(0, Number(e.target.value)))}
                className="w-full px-2.5 py-1.5 border rounded-lg text-xs font-bold"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Operating Expenses (OPEX excl. D&A)</label>
            <input
              type="number"
              value={operatingExpenses}
              onChange={(e) => setOperatingExpenses(e.target.value === '' ? '' : Math.max(0, Number(e.target.value)))}
              className="w-full px-2.5 py-1.5 border rounded-lg text-xs font-bold"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Depreciation ({currencySymbol})</label>
              <input
                type="number"
                value={depreciation}
                onChange={(e) => setDepreciation(e.target.value === '' ? '' : Math.max(0, Number(e.target.value)))}
                className="w-full px-2.5 py-1.5 border rounded-lg text-xs font-bold"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Amortization ({currencySymbol})</label>
              <input
                type="number"
                value={amortization}
                onChange={(e) => setAmortization(e.target.value === '' ? '' : Math.max(0, Number(e.target.value)))}
                className="w-full px-2.5 py-1.5 border rounded-lg text-xs font-bold"
              />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-indigo-50 to-blue-50 p-5 rounded-xl border border-indigo-200 flex flex-col justify-between space-y-4">
          <div>
            <span className="text-xs font-bold text-indigo-900 uppercase tracking-wider">EBITDA</span>
            <div className="text-3xl font-black text-indigo-950 font-mono-numbers mt-1">
              {currencySymbol}{ebitda.toLocaleString(undefined, { minimumFractionDigits: 2 })}
            </div>
            <span className="text-xs text-indigo-700 font-semibold">EBITDA Margin: {ebitdaMargin.toFixed(1)}%</span>
          </div>

          <div className="bg-white p-3 rounded-lg border border-indigo-100 text-xs text-slate-700 space-y-1">
            <div className="flex justify-between">
              <span>Operating Income (EBIT):</span>
              <span className="font-bold">{currencySymbol}{operatingIncome.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span>Gross Profit:</span>
              <span className="font-bold text-orange-700">{currencySymbol}{grossProfit.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// 5. Startup Burn Rate & Runway Calculator
export const BurnRateCalculator: React.FC<BaseCalcProps> = ({ currencySymbol = '$' }) => {
  const [cashBalance, setCashBalance] = useState<number | ''>(350000);
  const [monthlyRevenue, setMonthlyRevenue] = useState<number | ''>(15000);
  const [monthlyExpenses, setMonthlyExpenses] = useState<number | ''>(45000);

  const cash = typeof cashBalance === 'number' ? cashBalance : 0;
  const rev = typeof monthlyRevenue === 'number' ? monthlyRevenue : 0;
  const exp = typeof monthlyExpenses === 'number' ? monthlyExpenses : 0;

  const grossBurn = exp;
  const netBurn = exp - rev;
  const runwayMonths = netBurn > 0 ? cash / netBurn : Infinity;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-6 rounded-2xl border border-slate-200">
        <div className="space-y-3.5">
          <h4 className="text-xs font-bold uppercase text-slate-700 tracking-wider">Cash & Monthly Burn</h4>
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Current Cash in Bank ({currencySymbol})</label>
            <input
              type="number"
              value={cashBalance}
              onChange={(e) => setCashBalance(e.target.value === '' ? '' : Math.max(0, Number(e.target.value)))}
              className="w-full px-3 py-1.5 border rounded-lg text-xs font-bold"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Monthly Gross Expenses ({currencySymbol})</label>
              <input
                type="number"
                value={monthlyExpenses}
                onChange={(e) => setMonthlyExpenses(e.target.value === '' ? '' : Math.max(0, Number(e.target.value)))}
                className="w-full px-3 py-1.5 border rounded-lg text-xs font-bold"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Monthly Revenue ({currencySymbol})</label>
              <input
                type="number"
                value={monthlyRevenue}
                onChange={(e) => setMonthlyRevenue(e.target.value === '' ? '' : Math.max(0, Number(e.target.value)))}
                className="w-full px-3 py-1.5 border rounded-lg text-xs font-bold"
              />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-amber-50 to-orange-50 p-5 rounded-xl border border-amber-200 flex flex-col justify-between space-y-4">
          <div>
            <span className="text-xs font-bold text-amber-900 uppercase tracking-wider">Estimated Cash Runway</span>
            <div className="text-3xl font-black text-amber-950 font-mono-numbers mt-1">
              {runwayMonths === Infinity ? 'Profitable (Infinite)' : `${runwayMonths.toFixed(1)} Months`}
            </div>
          </div>

          <div className="bg-white p-3 rounded-lg border border-amber-100 text-xs text-slate-700 space-y-1">
            <div className="flex justify-between">
              <span>Net Monthly Burn:</span>
              <span className="font-bold text-red-700">{currencySymbol}{netBurn.toLocaleString()} / mo</span>
            </div>
            <div className="flex justify-between">
              <span>Gross Monthly Burn:</span>
              <span className="font-bold">{currencySymbol}{grossBurn.toLocaleString()} / mo</span>
            </div>
          </div>
        </div>
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

  const results = useMemo(() => {
    const rl = typeof roomLength === 'number' ? roomLength : 0;
    const rw = typeof roomWidth === 'number' ? roomWidth : 0;
    const ch = typeof ceilingHeight === 'number' ? ceilingHeight : 0;
    const d = typeof doors === 'number' ? doors : 0;
    const w = typeof windows === 'number' ? windows : 0;
    const c = typeof coats === 'number' ? coats : 1;

    const wallPerimeter = 2 * (rl + rw);
    const grossWallArea = wallPerimeter * ch;
    const doorDeduction = d * 20; // ~20 sq ft per door
    const windowDeduction = w * 15; // ~15 sq ft per window
    const netArea = Math.max(0, grossWallArea - doorDeduction - windowDeduction);
    const totalSqFtToPaint = netArea * c;
    
    // Standard 1 gallon covers approx 350-400 sq ft
    const gallonsNeeded = Math.ceil(totalSqFtToPaint / 350);

    return { grossWallArea, netArea, totalSqFtToPaint, gallonsNeeded };
  }, [roomLength, roomWidth, ceilingHeight, doors, windows, coats]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-6 rounded-2xl border border-slate-200">
        <div className="space-y-3.5">
          <h4 className="text-xs font-bold uppercase text-slate-700 tracking-wider">Room Dimensions (Feet)</h4>
          <div className="grid grid-cols-3 gap-2">
            <div>
              <label className="block text-[11px] font-semibold text-slate-600 mb-1">Length (ft)</label>
              <input
                type="number"
                value={roomLength}
                onChange={(e) => setRoomLength(e.target.value === '' ? '' : Math.max(0, Number(e.target.value)))}
                className="w-full px-2 py-1.5 border rounded-lg text-xs font-bold"
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-slate-600 mb-1">Width (ft)</label>
              <input
                type="number"
                value={roomWidth}
                onChange={(e) => setRoomWidth(e.target.value === '' ? '' : Math.max(0, Number(e.target.value)))}
                className="w-full px-2 py-1.5 border rounded-lg text-xs font-bold"
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-slate-600 mb-1">Ceiling (ft)</label>
              <input
                type="number"
                value={ceilingHeight}
                onChange={(e) => setCeilingHeight(e.target.value === '' ? '' : Math.max(0, Number(e.target.value)))}
                className="w-full px-2 py-1.5 border rounded-lg text-xs font-bold"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2">
            <div>
              <label className="block text-[11px] font-semibold text-slate-600 mb-1">Doors</label>
              <input
                type="number"
                value={doors}
                onChange={(e) => setDoors(e.target.value === '' ? '' : Math.max(0, Number(e.target.value)))}
                className="w-full px-2 py-1.5 border rounded-lg text-xs font-bold"
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-slate-600 mb-1">Windows</label>
              <input
                type="number"
                value={windows}
                onChange={(e) => setWindows(e.target.value === '' ? '' : Math.max(0, Number(e.target.value)))}
                className="w-full px-2 py-1.5 border rounded-lg text-xs font-bold"
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-slate-600 mb-1">Coats</label>
              <input
                type="number"
                value={coats}
                onChange={(e) => setCoats(e.target.value === '' ? '' : Math.max(1, Number(e.target.value)))}
                className="w-full px-2 py-1.5 border rounded-lg text-xs font-bold"
              />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-50 to-sky-50 p-5 rounded-xl border border-blue-200 flex flex-col justify-between space-y-4">
          <div>
            <span className="text-xs font-bold text-blue-900 uppercase tracking-wider">Paint Required</span>
            <div className="text-3xl font-black text-blue-950 font-mono-numbers mt-1">
              {results.gallonsNeeded} Gallons
            </div>
            <p className="text-xs text-blue-800 mt-1">Based on {coats || 1} coats ({results.totalSqFtToPaint} sq ft total coverage)</p>
          </div>

          <div className="bg-white p-3 rounded-lg border border-blue-100 text-xs text-slate-700 space-y-1">
            <div className="flex justify-between">
              <span>Net Wall Area:</span>
              <span className="font-bold">{results.netArea} sq ft</span>
            </div>
            <div className="flex justify-between">
              <span>Coverage per Gallon:</span>
              <span>~350 sq ft</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// 7. Drywall Sheets & Screws Calculator
export const DrywallCalculator: React.FC<BaseCalcProps> = () => {
  const [wallSqFt, setWallSqFt] = useState<number | ''>(600);
  const [sheetSize, setSheetSize] = useState<'4x8' | '4x12'>('4x8');
  const [wastePct, setWastePct] = useState<number | ''>(10);

  const wSqFt = typeof wallSqFt === 'number' ? wallSqFt : 0;
  const waste = typeof wastePct === 'number' ? wastePct : 0;

  const sheetSqFt = sheetSize === '4x8' ? 32 : 48;
  const totalSqFtWithWaste = wSqFt * (1 + waste / 100);
  const sheetsNeeded = Math.ceil(totalSqFtWithWaste / sheetSqFt);
  const screwsNeeded = sheetsNeeded * 32; // ~32 screws per 4x8 sheet
  const compoundGallons = Math.ceil(sheetsNeeded * 0.05); // ~0.05 gal joint compound per sheet

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-6 rounded-2xl border border-slate-200">
        <div className="space-y-3.5">
          <h4 className="text-xs font-bold uppercase text-slate-700 tracking-wider">Surface Area & Sheet Size</h4>
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Total Wall & Ceiling Area (sq ft)</label>
            <input
              type="number"
              value={wallSqFt}
              onChange={(e) => setWallSqFt(e.target.value === '' ? '' : Math.max(0, Number(e.target.value)))}
              className="w-full px-3 py-1.5 border rounded-lg text-xs font-bold"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Sheet Dimensions</label>
              <select
                value={sheetSize}
                onChange={(e) => setSheetSize(e.target.value as any)}
                className="w-full px-2.5 py-1.5 border rounded-lg text-xs font-bold"
              >
                <option value="4x8">4 ft × 8 ft (32 sq ft)</option>
                <option value="4x12">4 ft × 12 ft (48 sq ft)</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Waste Margin %</label>
              <input
                type="number"
                value={wastePct}
                onChange={(e) => setWastePct(e.target.value === '' ? '' : Number(e.target.value))}
                className="w-full px-2.5 py-1.5 border rounded-lg text-xs font-bold"
              />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-slate-50 to-blue-50 p-5 rounded-xl border border-slate-200 flex flex-col justify-between space-y-4">
          <div>
            <span className="text-xs font-bold text-slate-600 uppercase tracking-wider">Drywall Sheets Needed</span>
            <div className="text-3xl font-black text-slate-900 font-mono-numbers mt-1">
              {sheetsNeeded} Sheets ({sheetSize})
            </div>
          </div>

          <div className="bg-white p-3 rounded-lg border border-slate-200 text-xs text-slate-700 space-y-1">
            <div className="flex justify-between">
              <span>Drywall Screws (~32/sheet):</span>
              <span className="font-bold">{screwsNeeded.toLocaleString()} screws</span>
            </div>
            <div className="flex justify-between">
              <span>Joint Compound Mud:</span>
              <span className="font-bold">~{compoundGallons} Gallons</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// 8. Mulch & Gravel Volume Calculator
export const MulchGravelCalculator: React.FC<BaseCalcProps> = () => {
  const [areaSqFt, setAreaSqFt] = useState<number | ''>(300);
  const [depthInches, setDepthInches] = useState<number | ''>(3);

  const aSqFt = typeof areaSqFt === 'number' ? areaSqFt : 0;
  const dInches = typeof depthInches === 'number' ? depthInches : 0;

  const cubicFeet = aSqFt * (dInches / 12);
  const cubicYards = cubicFeet / 27;
  const tonsOfGravel = cubicYards * 1.4; // standard ~1.4 tons per cubic yard of gravel
  const bagsTwoCuFt = Math.ceil(cubicFeet / 2); // 2 cu ft mulch bags

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-6 rounded-2xl border border-slate-200">
        <div className="space-y-3.5">
          <h4 className="text-xs font-bold uppercase text-slate-700 tracking-wider">Coverage Area</h4>
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Area (sq ft)</label>
            <input
              type="number"
              value={areaSqFt}
              onChange={(e) => setAreaSqFt(e.target.value === '' ? '' : Math.max(0, Number(e.target.value)))}
              className="w-full px-3 py-1.5 border rounded-lg text-xs font-bold"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Depth (Inches)</label>
            <input
              type="number"
              step="0.5"
              value={depthInches}
              onChange={(e) => setDepthInches(e.target.value === '' ? '' : Math.max(0, Number(e.target.value)))}
              className="w-full px-3 py-1.5 border rounded-lg text-xs font-bold"
            />
          </div>
        </div>

        <div className="bg-gradient-to-br from-amber-50 to-yellow-50 p-5 rounded-xl border border-amber-200 flex flex-col justify-between space-y-4">
          <div>
            <span className="text-xs font-bold text-amber-900 uppercase tracking-wider">Bulk Volume Required</span>
            <div className="text-3xl font-black text-amber-950 font-mono-numbers mt-1">
              {cubicYards.toFixed(2)} Cubic Yards
            </div>
            <span className="text-xs text-amber-800 font-semibold">({cubicFeet.toFixed(1)} cu ft)</span>
          </div>

          <div className="bg-white p-3 rounded-lg border border-amber-100 text-xs text-slate-700 space-y-1">
            <div className="flex justify-between">
              <span>Standard 2 cu ft Bags (Mulch):</span>
              <span className="font-bold text-slate-900">{bagsTwoCuFt} bags</span>
            </div>
            <div className="flex justify-between">
              <span>Weight if Gravel (~1.4 tons/yd³):</span>
              <span className="font-bold text-slate-900">{tonsOfGravel.toFixed(2)} Tons</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// 9. Decking & Board Footage Calculator
export const DeckLumberCalculator: React.FC<BaseCalcProps> = () => {
  const [deckLength, setDeckLength] = useState<number | ''>(16); // ft
  const [deckWidth, setDeckWidth] = useState<number | ''>(12); // ft
  const [boardWidthInches, setBoardWidthInches] = useState<number>(5.5); // standard 5.5" (nominal 6")

  const dL = typeof deckLength === 'number' ? deckLength : 0;
  const dW = typeof deckWidth === 'number' ? deckWidth : 0;

  const totalDeckSqFt = dL * dW;
  const boardWidthFeet = boardWidthInches / 12;
  const linearFeetNeeded = boardWidthFeet > 0 ? totalDeckSqFt / boardWidthFeet : 0;
  const standard16FtBoards = Math.ceil(linearFeetNeeded / 16 * 1.1); // with 10% waste

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-6 rounded-2xl border border-slate-200">
        <div className="space-y-3.5">
          <h4 className="text-xs font-bold uppercase text-slate-700 tracking-wider">Deck Dimensions (Feet)</h4>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Deck Length (ft)</label>
              <input
                type="number"
                value={deckLength}
                onChange={(e) => setDeckLength(e.target.value === '' ? '' : Math.max(0, Number(e.target.value)))}
                className="w-full px-3 py-1.5 border rounded-lg text-xs font-bold"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Deck Width (ft)</label>
              <input
                type="number"
                value={deckWidth}
                onChange={(e) => setDeckWidth(e.target.value === '' ? '' : Math.max(0, Number(e.target.value)))}
                className="w-full px-3 py-1.5 border rounded-lg text-xs font-bold"
              />
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Decking Plank Width (Inches)</label>
            <select
              value={boardWidthInches}
              onChange={(e) => setBoardWidthInches(Number(e.target.value))}
              className="w-full px-3 py-1.5 border rounded-lg text-xs font-bold"
            >
              <option value={5.5}>5.5 inches (Standard 2x6 / 5/4x6)</option>
              <option value={3.5}>3.5 inches (Standard 2x4)</option>
              <option value={7.25}>7.25 inches (Standard 2x8)</option>
            </select>
          </div>
        </div>

        <div className="bg-gradient-to-br from-orange-50 to-teal-50 p-5 rounded-xl border border-orange-200 flex flex-col justify-between space-y-4">
          <div>
            <span className="text-xs font-bold text-orange-900 uppercase tracking-wider">Total Linear Footage</span>
            <div className="text-3xl font-black text-orange-950 font-mono-numbers mt-1">
              {Math.ceil(linearFeetNeeded)} Linear Feet
            </div>
            <span className="text-xs text-orange-700">{totalDeckSqFt} sq ft deck area</span>
          </div>

          <div className="bg-white p-3 rounded-lg border border-orange-100 text-xs text-slate-700 space-y-1">
            <div className="flex justify-between">
              <span>16-Foot Boards Needed (10% waste):</span>
              <span className="font-bold text-slate-900">{standard16FtBoards} Boards</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
