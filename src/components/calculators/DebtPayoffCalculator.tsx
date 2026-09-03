import React, { useState, useMemo } from 'react';
import { formatCurrency, formatNumber, copyToClipboard } from '../../utils/formatters';
import { DollarSign, Zap, TrendingDown, Plus, Trash2, Copy, Check, Bookmark, Layers } from 'lucide-react';

interface DebtItem {
  id: string;
  name: string;
  balance: number | '';
  rate: number | '';
  minPayment: number | '';
}

interface DebtPayoffCalculatorProps {
  currencySymbol?: string;
  onSaveCalculation?: (summary: string, inputs: any, results: any) => void;
}

export const DebtPayoffCalculator: React.FC<DebtPayoffCalculatorProps> = ({
  currencySymbol = '$',
  onSaveCalculation
}) => {
  const [strategy, setStrategy] = useState<'avalanche' | 'snowball'>('avalanche');
  const [extraMonthly, setExtraMonthly] = useState<number | ''>(200);
  const [debts, setDebts] = useState<DebtItem[]>([
    { id: '1', name: 'Credit Card A', balance: 4500, rate: 22.5, minPayment: 120 },
    { id: '2', name: 'Personal Loan', balance: 8000, rate: 10.5, minPayment: 190 },
    { id: '3', name: 'Auto Loan', balance: 14000, rate: 5.5, minPayment: 280 }
  ]);
  const [copied, setCopied] = useState<boolean>(false);
  const [saved, setSaved] = useState<boolean>(false);

  const handleAddDebt = () => {
    setDebts(prev => [
      ...prev,
      { id: Date.now().toString(), name: `Debt ${prev.length + 1}`, balance: 3000, rate: 15.0, minPayment: 80 }
    ]);
  };

  const handleRemoveDebt = (id: string) => {
    if (debts.length <= 1) return;
    setDebts(prev => prev.filter(d => d.id !== id));
  };

  const handleUpdateDebt = (id: string, field: keyof DebtItem, value: any) => {
    setDebts(prev => prev.map(d => d.id === id ? { ...d, [field]: value } : d));
  };

  const numExtraMonthly = typeof extraMonthly === 'number' ? extraMonthly : 0;

  const calculations = useMemo(() => {
    try {
      const hasValidDebts = debts.some(d => typeof d.balance === 'number' && d.balance > 0 && typeof d.minPayment === 'number' && d.minPayment > 0);
      if (!hasValidDebts) {
        return null;
      }

      const totalBalance = debts.reduce((sum, d) => sum + (typeof d.balance === 'number' && d.balance > 0 ? d.balance : 0), 0);
      const totalMinPayments = debts.reduce((sum, d) => sum + (typeof d.minPayment === 'number' && d.minPayment > 0 ? d.minPayment : 0), 0);
      const totalMonthlyBudget = totalMinPayments + numExtraMonthly;

      if (totalBalance <= 0 || totalMinPayments <= 0) {
        return null;
      }

      // Simulate payoff order
      // Avalanche: sort descending by interest rate
      // Snowball: sort ascending by balance
      const sortedDebts = [...debts].map(d => ({
        ...d,
        balance: typeof d.balance === 'number' ? Math.max(0, d.balance) : 0,
        rate: typeof d.rate === 'number' ? Math.max(0, d.rate) : 0,
        minPayment: typeof d.minPayment === 'number' ? Math.max(0, d.minPayment) : 0
      })).filter(d => d.balance > 0).sort((a, b) => {
        if (strategy === 'avalanche') {
          return b.rate - a.rate;
        } else {
          return a.balance - b.balance;
        }
      });

      if (sortedDebts.length === 0) {
        return null;
      }

      // Run monthly simulation
      let currentDebts = sortedDebts.map(d => ({ ...d, currentBal: d.balance }));
      let months = 0;
      let totalInterestPaid = 0;
      const maxMonths = 360;

      while (currentDebts.some(d => d.currentBal > 0.01) && months < maxMonths) {
        months++;
        let extraAvailable = numExtraMonthly;

        // 1. Accrue interest & pay minimums
        currentDebts.forEach(d => {
          if (d.currentBal > 0) {
            const interest = d.currentBal * (d.rate / 100 / 12);
            totalInterestPaid += interest;
            d.currentBal += interest;

            const pay = Math.min(d.currentBal, d.minPayment);
            d.currentBal = Math.max(0, d.currentBal - pay);

            if (d.currentBal <= 0) {
              // Debt is paid off, its min payment becomes available for rollover!
              extraAvailable += d.minPayment - pay;
            }
          } else {
            // Rollover paid off debt's minimum payment
            extraAvailable += d.minPayment;
          }
        });

        // 2. Put all extra available cash toward the priority debt
        for (const d of currentDebts) {
          if (d.currentBal > 0 && extraAvailable > 0) {
            const pay = Math.min(d.currentBal, extraAvailable);
            d.currentBal = Math.max(0, d.currentBal - pay);
            extraAvailable -= pay;
          }
        }
      }

      return {
        totalBalance,
        totalMinPayments,
        totalMonthlyBudget,
        monthsToPayoff: months,
        yearsToPayoff: (months / 12).toFixed(1),
        totalInterestPaid,
        totalPaid: totalBalance + totalInterestPaid
      };
    } catch {
      return null;
    }
  }, [debts, numExtraMonthly, strategy]);

  const handleCopy = async () => {
    if (!calculations) return;
    const text = `Debt Payoff Strategy (${strategy.toUpperCase()}):
Total Debt Balance: ${formatCurrency(calculations.totalBalance, currencySymbol)}
Total Monthly Payment Budget: ${formatCurrency(calculations.totalMonthlyBudget, currencySymbol)}/mo (inc. +${formatCurrency(numExtraMonthly, currencySymbol)} extra)
Time to Total Debt Freedom: ${calculations.monthsToPayoff} Months (${calculations.yearsToPayoff} Years)
Total Interest Paid: ${formatCurrency(calculations.totalInterestPaid, currencySymbol)}
Total Repayment: ${formatCurrency(calculations.totalPaid, currencySymbol)}`;

    const ok = await copyToClipboard(text);
    if (ok) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleReset = () => {
    setStrategy('avalanche');
    setExtraMonthly(200);
    setDebts([
      { id: '1', name: 'Credit Card A', balance: 4500, rate: 22.5, minPayment: 120 },
      { id: '2', name: 'Personal Loan', balance: 8000, rate: 10.5, minPayment: 190 },
      { id: '3', name: 'Auto Loan', balance: 14000, rate: 5.5, minPayment: 280 }
    ]);
  };

  const handleSave = () => {
    if (!calculations) return;
    if (onSaveCalculation) {
      onSaveCalculation(
        `Debt Freedom: ${formatCurrency(calculations.totalBalance, currencySymbol)} paid off in ${calculations.monthsToPayoff} mo via ${strategy.toUpperCase()} (${formatCurrency(calculations.totalMonthlyBudget, currencySymbol)}/mo)`,
        { strategy, extraMonthly, debts },
        calculations
      );
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Inputs */}
        <div className="lg:col-span-7 bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-2xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Layers className="w-4 h-4 text-indigo-600" />
              <span>Your Debts & Strategy</span>
            </h2>
            <div className="flex items-center gap-2">
              <button
                onClick={handleReset}
                className="text-xs font-semibold text-slate-600 hover:text-slate-900 px-2 py-1 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors"
              >
                Reset
              </button>
              <div className="flex rounded-lg bg-slate-100 p-0.5 text-xs font-bold">
                <button
                  type="button"
                  onClick={() => setStrategy('avalanche')}
                  className={`px-2.5 py-1 rounded-md transition-all ${
                    strategy === 'avalanche' ? 'bg-white text-indigo-900 shadow-2xs' : 'text-slate-600'
                  }`}
                >
                  Avalanche
                </button>
                <button
                  type="button"
                  onClick={() => setStrategy('snowball')}
                  className={`px-2.5 py-1 rounded-md transition-all ${
                    strategy === 'snowball' ? 'bg-white text-indigo-900 shadow-2xs' : 'text-slate-600'
                  }`}
                >
                  Snowball
                </button>
              </div>
            </div>
          </div>

          {/* Debts list */}
          <div className="space-y-3">
            {debts.map((debt, index) => (
              <div key={debt.id} className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                <div className="flex items-center justify-between">
                  <input
                    type="text"
                    value={debt.name}
                    onChange={(e) => handleUpdateDebt(debt.id, 'name', e.target.value)}
                    className="text-xs font-bold bg-transparent border-b border-slate-300 focus:border-indigo-600 focus:outline-none text-slate-900"
                  />
                  {debts.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveDebt(debt.id)}
                      className="text-slate-400 hover:text-rose-600 transition-colors p-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 block">Balance ({currencySymbol})</label>
                    <input
                      type="number"
                      value={debt.balance}
                      onChange={(e) => handleUpdateDebt(debt.id, 'balance', e.target.value === '' ? '' : Number(e.target.value))}
                      className="w-full p-1.5 text-xs font-semibold bg-white border border-slate-200 rounded-lg focus:ring-1 focus:ring-indigo-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 block">Interest Rate (%)</label>
                    <input
                      type="number"
                      step="0.1"
                      value={debt.rate}
                      onChange={(e) => handleUpdateDebt(debt.id, 'rate', e.target.value === '' ? '' : Number(e.target.value))}
                      className="w-full p-1.5 text-xs font-semibold bg-white border border-slate-200 rounded-lg focus:ring-1 focus:ring-indigo-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 block">Min Payment ({currencySymbol})</label>
                    <input
                      type="number"
                      value={debt.minPayment}
                      onChange={(e) => handleUpdateDebt(debt.id, 'minPayment', e.target.value === '' ? '' : Number(e.target.value))}
                      className="w-full p-1.5 text-xs font-semibold bg-white border border-slate-200 rounded-lg focus:ring-1 focus:ring-indigo-500 focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            ))}

            <button
              type="button"
              onClick={handleAddDebt}
              className="w-full py-2 border border-dashed border-indigo-300 rounded-xl text-xs font-bold text-indigo-600 hover:bg-indigo-50 flex items-center justify-center gap-1.5 transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Another Debt</span>
            </button>
          </div>

          {/* Extra Monthly Payment */}
          <div className="space-y-1.5 pt-2 border-t border-slate-100">
            <label className="text-xs font-bold text-slate-700 flex justify-between">
              <span className="flex items-center gap-1 text-orange-600">
                <Zap className="w-3.5 h-3.5" />
                Extra Monthly Payment Accelerator
              </span>
              <span className="text-orange-600 font-mono">+{formatCurrency(numExtraMonthly, currencySymbol)}/mo</span>
            </label>
            <input
              type="number"
              min="0"
              max="5000"
              step="50"
              value={extraMonthly}
              onChange={(e) => setExtraMonthly(e.target.value === '' ? '' : Number(e.target.value))}
              className="w-full p-2 text-sm font-semibold border border-slate-200 rounded-xl bg-slate-50/50 focus:bg-white focus:ring-2 focus:ring-orange-500 focus:outline-none"
            />
          </div>
        </div>

        {/* Right Output */}
        <div className="lg:col-span-5 space-y-4">
          {calculations ? (
            <div className="bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white rounded-2xl p-6 shadow-md relative">
              <div className="space-y-4">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-300">
                    Total Debt Freedom in
                  </span>
                  <div className="text-3xl sm:text-4xl font-black tracking-tight text-white mt-1">
                    {calculations.monthsToPayoff} Months
                    <span className="text-sm font-normal text-slate-300 ml-1">({calculations.yearsToPayoff} yrs)</span>
                  </div>
                  <div className="text-xs font-medium text-orange-300 mt-1">
                    Total Monthly Budget: {formatCurrency(calculations.totalMonthlyBudget, currencySymbol)}/mo
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-3 border-t border-indigo-900/60">
                  <div className="bg-white/10 rounded-xl p-3 backdrop-blur-xs">
                    <span className="text-[10px] text-slate-300 uppercase font-bold block">Total Debt Principal</span>
                    <span className="text-base font-bold text-white font-mono">{formatCurrency(calculations.totalBalance, currencySymbol)}</span>
                  </div>
                  <div className="bg-white/10 rounded-xl p-3 backdrop-blur-xs">
                    <span className="text-[10px] text-slate-300 uppercase font-bold block">Total Interest Paid</span>
                    <span className="text-base font-bold text-amber-300 font-mono">{formatCurrency(calculations.totalInterestPaid, currencySymbol)}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-2">
                  <button
                    onClick={handleCopy}
                    className="flex-1 py-2 px-3 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-bold text-white flex items-center justify-center gap-1.5 transition-colors border border-white/10"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-orange-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? 'Copied' : 'Copy Plan'}</span>
                  </button>
                  {onSaveCalculation && (
                    <button
                      onClick={handleSave}
                      className="py-2 px-3 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-bold text-white flex items-center justify-center gap-1.5 transition-colors border border-white/10"
                    >
                      <Bookmark className="w-3.5 h-3.5" />
                      <span>{saved ? 'Saved' : 'Save'}</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 text-center text-slate-500 text-sm">
              Enter your debt balances, interest rates, and minimum payments to calculate your payoff timeline.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
