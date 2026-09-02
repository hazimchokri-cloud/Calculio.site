import React, { useState, useMemo } from 'react';
import { formatCurrency, formatNumber, copyToClipboard } from '../../utils/formatters';
import { Percent, DollarSign, HelpCircle, Copy, Check, Bookmark } from 'lucide-react';

interface AprCalculatorProps {
  currencySymbol?: string;
  onSaveCalculation?: (summary: string, inputs: any, results: any) => void;
}

export const AprCalculator: React.FC<AprCalculatorProps> = ({
  currencySymbol = '$',
  onSaveCalculation
}) => {
  const [loanAmount, setLoanAmount] = useState<number | ''>(200000);
  const [interestRate, setInterestRate] = useState<number | ''>(6.5);
  const [loanTermYears, setLoanTermYears] = useState<number | ''>(30);
  const [originationFee, setOriginationFee] = useState<number | ''>(2000);
  const [discountPoints, setDiscountPoints] = useState<number | ''>(1.0); // 1% = $2,000
  const [otherClosingCosts, setOtherClosingCosts] = useState<number | ''>(1500);
  const [copied, setCopied] = useState<boolean>(false);
  const [saved, setSaved] = useState<boolean>(false);

  const numLoanAmount = typeof loanAmount === 'number' ? loanAmount : 0;
  const numInterestRate = typeof interestRate === 'number' ? interestRate : 0;
  const numLoanTermYears = typeof loanTermYears === 'number' ? loanTermYears : 0;
  const numOriginationFee = typeof originationFee === 'number' ? originationFee : 0;
  const numDiscountPoints = typeof discountPoints === 'number' ? discountPoints : 0;
  const numOtherClosingCosts = typeof otherClosingCosts === 'number' ? otherClosingCosts : 0;

  const isInputEmpty = loanAmount === '' || interestRate === '' || loanTermYears === '';

  const calculations = useMemo(() => {
    try {
      if (isInputEmpty || numLoanAmount <= 0 || numLoanTermYears <= 0) return null;

      const P = Math.max(0, numLoanAmount);
      const nominalAnnual = Math.max(0, numInterestRate) / 100;
      const r = nominalAnnual / 12;
      const n = Math.max(1, numLoanTermYears * 12);

      // Monthly payment on the full note amount P
      let monthlyPayment = 0;
      if (r === 0) {
        monthlyPayment = P / n;
      } else {
        monthlyPayment = (P * (r * Math.pow(1 + r, n))) / (Math.pow(1 + r, n) - 1);
      }

      const pointsDollar = P * (Math.max(0, numDiscountPoints) / 100);
      const totalFinanceFees = numOriginationFee + pointsDollar + numOtherClosingCosts;
      const netProceeds = Math.max(0, P - totalFinanceFees);

      // Solve for APR via Newton-Raphson
      let apr = numInterestRate;
      if (totalFinanceFees > 0 && netProceeds > 0 && r > 0) {
        let rGuess = r;
        for (let i = 0; i < 30; i++) {
          const f = (monthlyPayment * (1 - Math.pow(1 + rGuess, -n))) / rGuess - netProceeds;
          const fPrime = (monthlyPayment * (n * Math.pow(1 + rGuess, -n - 1) * rGuess - (1 - Math.pow(1 + rGuess, -n)))) / (rGuess * rGuess);
          if (Math.abs(fPrime) < 1e-12) break;
          const rNext = rGuess - f / fPrime;
          if (Math.abs(rNext - rGuess) < 1e-8) {
            rGuess = rNext;
            break;
          }
          rGuess = rNext;
        }
        apr = Math.max(numInterestRate, rGuess * 12 * 100);
      }

      return {
        monthlyPayment,
        pointsDollar,
        totalFinanceFees,
        netProceeds,
        effectiveApr: apr,
        aprSpread: apr - numInterestRate
      };
    } catch {
      return null;
    }
  }, [isInputEmpty, numLoanAmount, numInterestRate, numLoanTermYears, numOriginationFee, numDiscountPoints, numOtherClosingCosts]);

  const handleCopy = async () => {
    if (!calculations) return;
    const text = `APR Calculation Summary:
Loan Amount: ${formatCurrency(numLoanAmount, currencySymbol)}
Stated Interest Rate: ${numInterestRate}%
Calculated True APR: ${calculations.effectiveApr.toFixed(3)}% (+${calculations.aprSpread.toFixed(3)}% spread)
Total Prepaid Finance Fees: ${formatCurrency(calculations.totalFinanceFees, currencySymbol)}
Monthly P&I Payment: ${formatCurrency(calculations.monthlyPayment, currencySymbol)}/mo`;

    const ok = await copyToClipboard(text);
    if (ok) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleSave = () => {
    if (!calculations) return;
    if (onSaveCalculation) {
      onSaveCalculation(
        `APR: ${numInterestRate}% Rate → ${calculations.effectiveApr.toFixed(3)}% True APR on ${formatCurrency(numLoanAmount, currencySymbol)} (${formatCurrency(calculations.totalFinanceFees, currencySymbol)} fees)`,
        { loanAmount, interestRate, loanTermYears, originationFee, discountPoints, otherClosingCosts },
        calculations
      );
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    }
  };

  const handleReset = () => {
    setLoanAmount(200000);
    setInterestRate(6.5);
    setLoanTermYears(30);
    setOriginationFee(2000);
    setDiscountPoints(1.0);
    setOtherClosingCosts(1500);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Inputs */}
        <div className="lg:col-span-6 bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-2xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Percent className="w-4 h-4 text-blue-600" />
              <span>Loan & Closing Costs</span>
            </h2>
            <div className="flex items-center gap-2">
              <button
                onClick={handleReset}
                className="text-xs font-semibold text-slate-600 hover:text-slate-900 px-2.5 py-1 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors"
              >
                Reset
              </button>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 flex justify-between">
              <span>Loan Amount</span>
              <span className="text-blue-600 font-mono">{formatCurrency(numLoanAmount, currencySymbol)}</span>
            </label>
            <input
              type="number"
              min="1000"
              max="5000000"
              step="5000"
              value={loanAmount}
              onChange={(e) => setLoanAmount(e.target.value === '' ? '' : Number(e.target.value))}
              placeholder="200000"
              className="w-full p-2 text-sm font-semibold border border-slate-200 rounded-xl bg-slate-50/50 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">Stated Interest Rate (%)</label>
              <input
                type="number"
                min="0.1"
                max="30"
                step="0.125"
                value={interestRate}
                onChange={(e) => setInterestRate(e.target.value === '' ? '' : Number(e.target.value))}
                placeholder="6.5"
                className="w-full p-2 text-sm font-semibold border border-slate-200 rounded-xl bg-slate-50/50 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">Loan Term (Years)</label>
              <input
                type="number"
                min="1"
                max="40"
                value={loanTermYears}
                onChange={(e) => setLoanTermYears(e.target.value === '' ? '' : Number(e.target.value))}
                placeholder="30"
                className="w-full p-2 text-sm font-semibold border border-slate-200 rounded-xl bg-slate-50/50 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="space-y-3 pt-2 border-t border-slate-100">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">Prepaid Finance Charges & Fees</h3>
            <div className="grid grid-cols-3 gap-2">
              <div>
                <label className="text-[10px] font-bold text-slate-500 block">Origination ({currencySymbol})</label>
                <input
                  type="number"
                  value={originationFee}
                  onChange={(e) => setOriginationFee(e.target.value === '' ? '' : Number(e.target.value))}
                  placeholder="2000"
                  className="w-full p-1.5 text-xs font-semibold border border-slate-200 rounded-lg bg-slate-50/50 focus:bg-white focus:outline-none"
                />
              </div>
              <div>
                <label className="text-[10px] font-bold text-slate-500 block">Points (%)</label>
                <input
                  type="number"
                  step="0.25"
                  value={discountPoints}
                  onChange={(e) => setDiscountPoints(e.target.value === '' ? '' : Number(e.target.value))}
                  placeholder="1.0"
                  className="w-full p-1.5 text-xs font-semibold border border-slate-200 rounded-lg bg-slate-50/50 focus:bg-white focus:outline-none"
                />
              </div>
              <div>
                <label className="text-[10px] font-bold text-slate-500 block">Other Fees ({currencySymbol})</label>
                <input
                  type="number"
                  value={otherClosingCosts}
                  onChange={(e) => setOtherClosingCosts(e.target.value === '' ? '' : Number(e.target.value))}
                  placeholder="1500"
                  className="w-full p-1.5 text-xs font-semibold border border-slate-200 rounded-lg bg-slate-50/50 focus:bg-white focus:outline-none"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Output */}
        <div className="lg:col-span-6 space-y-4">
          <div className="bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white rounded-2xl p-6 shadow-md relative">
            {calculations ? (
              <div className="space-y-4">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-blue-300">
                    Annual Percentage Rate (APR)
                  </span>
                  <div className="text-4xl font-black tracking-tight text-white mt-1 font-mono">
                    {calculations.effectiveApr.toFixed(3)}%
                  </div>
                  <div className="text-xs font-medium text-orange-300 mt-1">
                    +{calculations.aprSpread.toFixed(3)}% higher than the {numInterestRate}% base note rate
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-3 border-t border-blue-900/60">
                  <div className="bg-white/10 rounded-xl p-3 backdrop-blur-xs">
                    <span className="text-[10px] text-slate-300 uppercase font-bold block">Monthly Payment</span>
                    <span className="text-base font-bold text-white font-mono">{formatCurrency(calculations.monthlyPayment, currencySymbol)}</span>
                  </div>
                  <div className="bg-white/10 rounded-xl p-3 backdrop-blur-xs">
                    <span className="text-[10px] text-slate-300 uppercase font-bold block">Total Upfront Fees</span>
                    <span className="text-base font-bold text-white font-mono">{formatCurrency(calculations.totalFinanceFees, currencySymbol)}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-2">
                  <button
                    onClick={handleCopy}
                    className="flex-1 py-2 px-3 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-bold text-white flex items-center justify-center gap-1.5 transition-colors border border-white/10"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-orange-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? 'Copied' : 'Copy Summary'}</span>
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
            ) : (
              <div className="py-8 text-center space-y-2">
                <p className="text-orange-300 font-semibold text-sm">Please enter a value.</p>
                <p className="text-slate-400 text-xs">Enter a valid loan amount, interest rate, and term.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
