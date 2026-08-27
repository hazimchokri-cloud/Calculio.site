import React, { useState, useMemo } from 'react';
import { Briefcase, TrendingUp, HardHat, DollarSign, RotateCcw, Copy, Check, Layers } from 'lucide-react';
import { copyToClipboard } from '../../utils/formatters';

interface BaseCalcProps {
  currencySymbol?: string;
  onSave?: (summary: string, inputs: any, results: any) => void;
}

// 1. CAC & LTV Ratio Calculator
export const CacLtvCalculator: React.FC<BaseCalcProps> = ({ currencySymbol = '$' }) => {
  const [salesMarketingCost, setSalesMarketingCost] = useState(25000);
  const [newCustomers, setNewCustomers] = useState(100);
  const [avgRevenuePerUser, setAvgRevenuePerUser] = useState(85); // per month
  const [grossMarginPct, setGrossMarginPct] = useState(75);
  const [churnRatePct, setChurnRatePct] = useState(4.0); // 4% monthly churn

  const results = useMemo(() => {
    const cac = newCustomers > 0 ? salesMarketingCost / newCustomers : 0;
    const avgLifespanMonths = churnRatePct > 0 ? 1 / (churnRatePct / 100) : 24;
    const ltv = avgRevenuePerUser * (grossMarginPct / 100) * avgLifespanMonths;
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
                onChange={(e) => setSalesMarketingCost(Math.max(0, Number(e.target.value)))}
                className="w-full px-2.5 py-1.5 border rounded-lg text-xs font-bold"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">New Customers Acquired</label>
              <input
                type="number"
                value={newCustomers}
                onChange={(e) => setNewCustomers(Math.max(1, Number(e.target.value)))}
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
                onChange={(e) => setAvgRevenuePerUser(Math.max(0, Number(e.target.value)))}
                className="w-full px-2 py-1.5 border rounded-lg text-xs font-bold"
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-slate-600 mb-1">Gross Margin %</label>
              <input
                type="number"
                value={grossMarginPct}
                onChange={(e) => setGrossMarginPct(Number(e.target.value))}
                className="w-full px-2 py-1.5 border rounded-lg text-xs font-bold"
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-slate-600 mb-1">Monthly Churn %</label>
              <input
                type="number"
                step="0.1"
                value={churnRatePct}
                onChange={(e) => setChurnRatePct(Math.max(0.1, Number(e.target.value)))}
                className="w-full px-2 py-1.5 border rounded-lg text-xs font-bold"
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
  const [cost, setCost] = useState(50);
  const [sellingPrice, setSellingPrice] = useState(80);

  const profit = sellingPrice - cost;
  const markupPct = cost > 0 ? (profit / cost) * 100 : 0;
  const marginPct = sellingPrice > 0 ? (profit / sellingPrice) * 100 : 0;

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
                onChange={(e) => setCost(Math.max(0, Number(e.target.value)))}
                className="w-full px-3 py-1.5 border rounded-lg text-xs font-bold"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Selling Price ({currencySymbol})</label>
              <input
                type="number"
                value={sellingPrice}
                onChange={(e) => setSellingPrice(Math.max(0, Number(e.target.value)))}
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
  const [cogs, setCogs] = useState(450000);
  const [beginningInventory, setBeginningInventory] = useState(80000);
  const [endingInventory, setEndingInventory] = useState(100000);

  const avgInventory = (beginningInventory + endingInventory) / 2;
  const turnoverRatio = avgInventory > 0 ? cogs / avgInventory : 0;
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
              onChange={(e) => setCogs(Math.max(0, Number(e.target.value)))}
              className="w-full px-3 py-1.5 border rounded-lg text-xs font-bold"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Beginning Inventory ({currencySymbol})</label>
              <input
                type="number"
                value={beginningInventory}
                onChange={(e) => setBeginningInventory(Math.max(0, Number(e.target.value)))}
                className="w-full px-3 py-1.5 border rounded-lg text-xs font-bold"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Ending Inventory ({currencySymbol})</label>
              <input
                type="number"
                value={endingInventory}
                onChange={(e) => setEndingInventory(Math.max(0, Number(e.target.value)))}
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
  const [revenue, setRevenue] = useState(1200000);
  const [cogs, setCogs] = useState(400000);
  const [operatingExpenses, setOperatingExpenses] = useState(350000);
  const [depreciation, setDepreciation] = useState(45000);
  const [amortization, setAmortization] = useState(15000);

  const grossProfit = revenue - cogs;
  const operatingIncome = grossProfit - operatingExpenses; // EBIT
  const ebitda = operatingIncome + depreciation + amortization;
  const ebitdaMargin = revenue > 0 ? (ebitda / revenue) * 100 : 0;

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
                onChange={(e) => setRevenue(Math.max(0, Number(e.target.value)))}
                className="w-full px-2.5 py-1.5 border rounded-lg text-xs font-bold"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">COGS ({currencySymbol})</label>
              <input
                type="number"
                value={cogs}
                onChange={(e) => setCogs(Math.max(0, Number(e.target.value)))}
                className="w-full px-2.5 py-1.5 border rounded-lg text-xs font-bold"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Operating Expenses (OPEX excl. D&A)</label>
            <input
              type="number"
              value={operatingExpenses}
              onChange={(e) => setOperatingExpenses(Math.max(0, Number(e.target.value)))}
              className="w-full px-2.5 py-1.5 border rounded-lg text-xs font-bold"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Depreciation ({currencySymbol})</label>
              <input
                type="number"
                value={depreciation}
                onChange={(e) => setDepreciation(Math.max(0, Number(e.target.value)))}
                className="w-full px-2.5 py-1.5 border rounded-lg text-xs font-bold"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Amortization ({currencySymbol})</label>
              <input
                type="number"
                value={amortization}
                onChange={(e) => setAmortization(Math.max(0, Number(e.target.value)))}
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
  const [cashBalance, setCashBalance] = useState(350000);
  const [monthlyRevenue, setMonthlyRevenue] = useState(15000);
  const [monthlyExpenses, setMonthlyExpenses] = useState(45000);

  const grossBurn = monthlyExpenses;
  const netBurn = monthlyExpenses - monthlyRevenue;
  const runwayMonths = netBurn > 0 ? cashBalance / netBurn : Infinity;

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
              onChange={(e) => setCashBalance(Math.max(0, Number(e.target.value)))}
              className="w-full px-3 py-1.5 border rounded-lg text-xs font-bold"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Monthly Gross Expenses ({currencySymbol})</label>
              <input
                type="number"
                value={monthlyExpenses}
                onChange={(e) => setMonthlyExpenses(Math.max(0, Number(e.target.value)))}
                className="w-full px-3 py-1.5 border rounded-lg text-xs font-bold"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Monthly Revenue ({currencySymbol})</label>
              <input
                type="number"
                value={monthlyRevenue}
                onChange={(e) => setMonthlyRevenue(Math.max(0, Number(e.target.value)))}
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
  const [roomLength, setRoomLength] = useState(14);
  const [roomWidth, setRoomWidth] = useState(12);
  const [ceilingHeight, setCeilingHeight] = useState(9);
  const [doors, setDoors] = useState(2);
  const [windows, setWindows] = useState(2);
  const [coats, setCoats] = useState(2);

  const results = useMemo(() => {
    const wallPerimeter = 2 * (roomLength + roomWidth);
    const grossWallArea = wallPerimeter * ceilingHeight;
    const doorDeduction = doors * 20; // ~20 sq ft per door
    const windowDeduction = windows * 15; // ~15 sq ft per window
    const netArea = Math.max(0, grossWallArea - doorDeduction - windowDeduction);
    const totalSqFtToPaint = netArea * coats;
    
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
                onChange={(e) => setRoomLength(Math.max(1, Number(e.target.value)))}
                className="w-full px-2 py-1.5 border rounded-lg text-xs font-bold"
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-slate-600 mb-1">Width (ft)</label>
              <input
                type="number"
                value={roomWidth}
                onChange={(e) => setRoomWidth(Math.max(1, Number(e.target.value)))}
                className="w-full px-2 py-1.5 border rounded-lg text-xs font-bold"
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-slate-600 mb-1">Ceiling (ft)</label>
              <input
                type="number"
                value={ceilingHeight}
                onChange={(e) => setCeilingHeight(Math.max(1, Number(e.target.value)))}
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
                onChange={(e) => setDoors(Math.max(0, Number(e.target.value)))}
                className="w-full px-2 py-1.5 border rounded-lg text-xs font-bold"
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-slate-600 mb-1">Windows</label>
              <input
                type="number"
                value={windows}
                onChange={(e) => setWindows(Math.max(0, Number(e.target.value)))}
                className="w-full px-2 py-1.5 border rounded-lg text-xs font-bold"
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-slate-600 mb-1">Coats</label>
              <input
                type="number"
                value={coats}
                onChange={(e) => setCoats(Math.max(1, Number(e.target.value)))}
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
            <p className="text-xs text-blue-800 mt-1">Based on {coats} coats ({results.totalSqFtToPaint} sq ft total coverage)</p>
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
  const [wallSqFt, setWallSqFt] = useState(600);
  const [sheetSize, setSheetSize] = useState<'4x8' | '4x12'>('4x8');
  const [wastePct, setWastePct] = useState(10);

  const sheetSqFt = sheetSize === '4x8' ? 32 : 48;
  const totalSqFtWithWaste = wallSqFt * (1 + wastePct / 100);
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
              onChange={(e) => setWallSqFt(Math.max(1, Number(e.target.value)))}
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
                onChange={(e) => setWastePct(Number(e.target.value))}
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
  const [areaSqFt, setAreaSqFt] = useState(300);
  const [depthInches, setDepthInches] = useState(3);

  const cubicFeet = areaSqFt * (depthInches / 12);
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
              onChange={(e) => setAreaSqFt(Math.max(1, Number(e.target.value)))}
              className="w-full px-3 py-1.5 border rounded-lg text-xs font-bold"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Depth (Inches)</label>
            <input
              type="number"
              step="0.5"
              value={depthInches}
              onChange={(e) => setDepthInches(Math.max(0.5, Number(e.target.value)))}
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
  const [deckLength, setDeckLength] = useState(16); // ft
  const [deckWidth, setDeckWidth] = useState(12); // ft
  const [boardWidthInches, setBoardWidthInches] = useState(5.5); // standard 5.5" (nominal 6")

  const totalDeckSqFt = deckLength * deckWidth;
  const boardWidthFeet = boardWidthInches / 12;
  const linearFeetNeeded = totalDeckSqFt / boardWidthFeet;
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
                onChange={(e) => setDeckLength(Math.max(1, Number(e.target.value)))}
                className="w-full px-3 py-1.5 border rounded-lg text-xs font-bold"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Deck Width (ft)</label>
              <input
                type="number"
                value={deckWidth}
                onChange={(e) => setDeckWidth(Math.max(1, Number(e.target.value)))}
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
