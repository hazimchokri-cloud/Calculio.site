import React, { useState, useMemo } from 'react';
import { formatCurrency, formatNumber, downloadCsv, copyToClipboard } from '../../utils/formatters';
import { Car, DollarSign, Calendar, Percent, ShieldCheck, Check, Copy } from 'lucide-react';
import confetti from 'canvas-confetti';

interface AutoLoanProps {
  currencySymbol?: string;
  onSaveCalculation?: (summary: string, inputs: any, results: any) => void;
}

export const AutoLoanCalculator: React.FC<AutoLoanProps> = ({
  currencySymbol = '$',
  onSaveCalculation
}) => {
  const [vehiclePrice, setVehiclePrice] = useState<number | ''>(35000);
  const [interestRate, setInterestRate] = useState<number | ''>(5.9);
  const [loanTermMonths, setLoanTermMonths] = useState<number>(60);
  const [downPayment, setDownPayment] = useState<number | ''>(5000);
  const [tradeInValue, setTradeInValue] = useState<number | ''>(2000);
  const [tradeInOwed, setTradeInOwed] = useState<number | ''>(0);
  const [salesTaxPercent, setSalesTaxPercent] = useState<number | ''>(6.5);
  const [titleAndFees, setTitleAndFees] = useState<number | ''>(850);
  const [copied, setCopied] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const numVehiclePrice = typeof vehiclePrice === 'number' ? vehiclePrice : 0;
  const numInterestRate = typeof interestRate === 'number' ? interestRate : 0;
  const numDownPayment = typeof downPayment === 'number' ? downPayment : 0;
  const numTradeInValue = typeof tradeInValue === 'number' ? tradeInValue : 0;
  const numTradeInOwed = typeof tradeInOwed === 'number' ? tradeInOwed : 0;
  const numSalesTaxPercent = typeof salesTaxPercent === 'number' ? salesTaxPercent : 0;
  const numTitleAndFees = typeof titleAndFees === 'number' ? titleAndFees : 0;

  const isInputEmpty = vehiclePrice === '' || interestRate === '';

  const calc = useMemo(() => {
    if (isInputEmpty || numVehiclePrice <= 0) return null;

    const netTradeIn = Math.max(0, numTradeInValue - numTradeInOwed);
    const taxablePrice = Math.max(0, numVehiclePrice - netTradeIn);
    const salesTaxAmount = (taxablePrice * numSalesTaxPercent) / 100;
    const totalOutTheDoor = numVehiclePrice + salesTaxAmount + numTitleAndFees;

    const totalFinanced = Math.max(0, totalOutTheDoor - numDownPayment - netTradeIn);

    const monthlyRate = numInterestRate / 100 / 12;
    let monthlyPayment = 0;
    if (monthlyRate > 0) {
      monthlyPayment = (totalFinanced * (monthlyRate * Math.pow(1 + monthlyRate, loanTermMonths))) /
        (Math.pow(1 + monthlyRate, loanTermMonths) - 1);
    } else {
      monthlyPayment = totalFinanced / loanTermMonths;
    }

    const totalInterest = (monthlyPayment * loanTermMonths) - totalFinanced;
    const totalVehicleCost = totalOutTheDoor + Math.max(0, totalInterest);

    return {
      netTradeIn,
      salesTaxAmount,
      totalOutTheDoor,
      totalFinanced,
      monthlyPayment,
      totalInterest: Math.max(0, totalInterest),
      totalVehicleCost
    };
  }, [isInputEmpty, numVehiclePrice, numInterestRate, loanTermMonths, numDownPayment, numTradeInValue, numTradeInOwed, numSalesTaxPercent, numTitleAndFees]);

  const handleCopy = async () => {
    if (!calc) return;
    const text = `Auto Loan Summary:
• Vehicle Price: ${formatCurrency(numVehiclePrice, currencySymbol)}
• Down Payment & Trade-in: ${formatCurrency(numDownPayment + calc.netTradeIn, currencySymbol)}
• Total Financed: ${formatCurrency(calc.totalFinanced, currencySymbol)}
• Monthly Payment: ${formatCurrency(calc.monthlyPayment, currencySymbol)} (${loanTermMonths} Months @ ${numInterestRate}%)
• Total Interest: ${formatCurrency(calc.totalInterest, currencySymbol)}
• Total Out-the-Door Cost: ${formatCurrency(calc.totalVehicleCost, currencySymbol)}`;

    const ok = await copyToClipboard(text);
    if (ok) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleSave = () => {
    if (!calc) return;
    if (onSaveCalculation) {
      onSaveCalculation(
        `Auto Loan: ${formatCurrency(calc.monthlyPayment, currencySymbol)}/mo for ${formatCurrency(numVehiclePrice, currencySymbol)} car`,
        { vehiclePrice, downPayment, loanTermMonths, interestRate },
        { monthlyPayment: calc.monthlyPayment, totalInterest: calc.totalInterest }
      );
      setSavedSuccess(true);
      confetti({ particleCount: 40, spread: 60, origin: { y: 0.8 } });
      setTimeout(() => setSavedSuccess(false), 2500);
    }
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Controls */}
        <div className="lg:col-span-7 bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <h3 className="text-lg font-bold text-slate-900">Vehicle & Loan Details</h3>
              <p className="text-xs text-slate-700">Calculate total cost including sales tax, trade-in, and interest charges.</p>
            </div>
            <button
              onClick={() => {
                setVehiclePrice(35000);
                setInterestRate(5.9);
                setLoanTermMonths(60);
                setDownPayment(5000);
                setTradeInValue(2000);
                setTradeInOwed(0);
                setSalesTaxPercent(6.5);
                setTitleAndFees(850);
              }}
              className="text-xs text-slate-700 hover:text-slate-900 font-semibold px-2.5 py-1 rounded-lg border border-slate-200"
            >
              Reset
            </button>
          </div>

          {/* Vehicle Price */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-sm font-semibold text-slate-700 flex items-center gap-1.5">
                <Car className="w-4 h-4 text-blue-600" />
                Vehicle Purchase Price
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-700 text-sm font-semibold">{currencySymbol}</span>
                <input
                  type="number"
                  value={vehiclePrice}
                  onChange={(e) => setVehiclePrice(e.target.value === '' ? '' : Number(e.target.value))}
                  placeholder="35000"
                  className="w-36 pl-7 pr-3 py-1.5 text-right font-mono-numbers font-semibold text-sm border border-slate-200 rounded-lg bg-slate-50/50"
                />
              </div>
            </div>
            <input
              type="range"
              min="5000"
              max="150000"
              step="1000"
              value={numVehiclePrice || 35000}
              onChange={(e) => setVehiclePrice(e.target.value === '' ? '' : Number(e.target.value))}
              className="w-full accent-blue-600 cursor-pointer h-2 bg-slate-200 rounded-lg"
            />
          </div>

          {/* Down Payment & Trade-In */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-slate-700 mb-1 block">Cash Down Payment</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-700 text-xs font-semibold">{currencySymbol}</span>
                <input
                  type="number"
                  value={downPayment}
                  onChange={(e) => setDownPayment(e.target.value === '' ? '' : Number(e.target.value))}
                  placeholder="5000"
                  className="w-full pl-6 pr-2 py-1.5 text-xs font-mono-numbers border border-slate-200 rounded-lg bg-slate-50/50"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 mb-1 block">Trade-in Allowance</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-700 text-xs font-semibold">{currencySymbol}</span>
                <input
                  type="number"
                  value={tradeInValue}
                  onChange={(e) => setTradeInValue(e.target.value === '' ? '' : Number(e.target.value))}
                  placeholder="2000"
                  className="w-full pl-6 pr-2 py-1.5 text-xs font-mono-numbers border border-slate-200 rounded-lg bg-slate-50/50"
                />
              </div>
            </div>
          </div>

          {/* Term & Rate */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-slate-700 block">Loan Term (Months)</label>
              <div className="grid grid-cols-4 gap-1">
                {[36, 48, 60, 72].map(m => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => setLoanTermMonths(m)}
                    className={`py-2 text-xs font-bold rounded-lg border transition-all ${
                      loanTermMonths === m
                        ? 'bg-blue-600 text-white border-blue-600 shadow-2xs'
                        : 'bg-white text-slate-700 border-slate-200'
                    }`}
                  >
                    {m} mo
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-slate-700 block">Interest Rate (APR)</label>
              <div className="relative">
                <input
                  type="number"
                  min="0"
                  max="25"
                  step="0.1"
                  value={interestRate}
                  onChange={(e) => setInterestRate(e.target.value === '' ? '' : Number(e.target.value))}
                  placeholder="5.9"
                  className="w-full pl-3 pr-7 py-2 font-mono-numbers text-sm font-semibold border border-slate-200 rounded-lg bg-slate-50/50"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-700 text-xs font-bold">%</span>
              </div>
            </div>
          </div>

          {/* Tax & Dealer Fees */}
          <div className="pt-2 border-t border-slate-100 grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-slate-700 mb-1 block">Sales Tax Rate (%)</label>
              <input
                type="number"
                value={salesTaxPercent}
                onChange={(e) => setSalesTaxPercent(e.target.value === '' ? '' : Number(e.target.value))}
                placeholder="6.5"
                className="w-full px-3 py-1.5 text-xs font-mono-numbers border border-slate-200 rounded-lg bg-slate-50/50"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-700 mb-1 block">Title, Reg & Dealer Fees</label>
              <div className="relative">
                <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-700 text-xs font-semibold">{currencySymbol}</span>
                <input
                  type="number"
                  value={titleAndFees}
                  onChange={(e) => setTitleAndFees(e.target.value === '' ? '' : Number(e.target.value))}
                  placeholder="850"
                  className="w-full pl-6 pr-2 py-1.5 text-xs font-mono-numbers border border-slate-200 rounded-lg bg-slate-50/50"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Results Card */}
        <div className="lg:col-span-5 space-y-5">
          <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-blue-950 text-white rounded-2xl p-6 sm:p-7 shadow-lg relative overflow-hidden">
            {calc ? (
              <>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold uppercase tracking-wider text-blue-300">
                    Monthly Auto Payment
                  </span>
                  <span className="px-2 py-0.5 text-xs font-bold bg-blue-500/20 text-blue-300 rounded border border-blue-500/30">
                    {loanTermMonths} Months @ {numInterestRate}%
                  </span>
                </div>

                <div className="flex items-baseline gap-2 mb-6">
                  <span className="text-5xl font-black font-mono-numbers tracking-tight text-white">
                    {formatCurrency(calc.monthlyPayment, currencySymbol)}
                  </span>
                  <span className="text-slate-300 text-sm font-medium">/ month</span>
                </div>

                <div className="border-t border-slate-700/80 pt-4 space-y-2 text-xs">
                  <div className="flex justify-between text-slate-300">
                    <span>Total Amount Financed:</span>
                    <strong className="text-white font-mono-numbers">{formatCurrency(calc.totalFinanced, currencySymbol)}</strong>
                  </div>
                  <div className="flex justify-between text-slate-300">
                    <span>Sales Tax Amount:</span>
                    <strong className="text-white font-mono-numbers">{formatCurrency(calc.salesTaxAmount, currencySymbol)}</strong>
                  </div>
                  <div className="flex justify-between text-slate-300">
                    <span>Total Interest Paid:</span>
                    <strong className="text-blue-300 font-mono-numbers">{formatCurrency(calc.totalInterest, currencySymbol)}</strong>
                  </div>
                  <div className="flex justify-between text-slate-300 pt-2 border-t border-slate-700">
                    <span>Total Cost of Vehicle:</span>
                    <strong className="text-orange-300 font-mono-numbers text-sm">{formatCurrency(calc.totalVehicleCost, currencySymbol)}</strong>
                  </div>
                </div>
              </>
            ) : (
              <div className="py-8 text-center space-y-2">
                <p className="text-amber-300 font-semibold text-sm">Please enter a value.</p>
                <p className="text-slate-400 text-xs">Enter a valid purchase price and interest rate.</p>
              </div>
            )}
          </div>

          {/* Actions */}
          {calc && (
            <div className="flex items-center gap-2">
              <button
                onClick={handleCopy}
                className="flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold transition-all shadow-2xs"
              >
                {copied ? <Check className="w-4 h-4 text-orange-600" /> : <Copy className="w-4 h-4 text-slate-700" />}
                {copied ? 'Copied' : 'Copy Summary'}
              </button>

              <button
                onClick={handleSave}
                className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all shadow-2xs"
              >
                <ShieldCheck className="w-4 h-4" />
                {savedSuccess ? 'Saved!' : 'Save Result'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
