import React, { useState, useMemo } from 'react';
import { formatCurrency, formatNumber, copyToClipboard } from '../../utils/formatters';
import { ShieldCheck, HeartHandshake, TrendingUp, DollarSign, Copy, Check, Bookmark, AlertTriangle, CheckCircle2 } from 'lucide-react';

interface RetirementCalculatorProps {
  currencySymbol?: string;
  onSaveCalculation?: (summary: string, inputs: any, results: any) => void;
}

export const RetirementCalculator: React.FC<RetirementCalculatorProps> = ({
  currencySymbol = '$',
  onSaveCalculation
}) => {
  const [currentAge, setCurrentAge] = useState<number | ''>(32);
  const [retirementAge, setRetirementAge] = useState<number | ''>(65);
  const [lifeExpectancy, setLifeExpectancy] = useState<number | ''>(88);
  const [currentSavings, setCurrentSavings] = useState<number | ''>(45000);
  const [annualSavings, setAnnualSavings] = useState<number | ''>(10000);
  const [preRetirementReturn, setPreRetirementReturn] = useState<number | ''>(7.5);
  const [postRetirementReturn, setPostRetirementReturn] = useState<number | ''>(5.0);
  const [desiredAnnualIncome, setDesiredAnnualIncome] = useState<number | ''>(60000);
  const [copied, setCopied] = useState<boolean>(false);
  const [saved, setSaved] = useState<boolean>(false);

  const numCurrentAge = typeof currentAge === 'number' ? currentAge : 32;
  const numRetirementAge = typeof retirementAge === 'number' ? retirementAge : 65;
  const numLifeExpectancy = typeof lifeExpectancy === 'number' ? lifeExpectancy : 88;
  const numCurrentSavings = typeof currentSavings === 'number' ? currentSavings : 0;
  const numAnnualSavings = typeof annualSavings === 'number' ? annualSavings : 0;
  const numPreRetirementReturn = typeof preRetirementReturn === 'number' ? preRetirementReturn : 0;
  const numPostRetirementReturn = typeof postRetirementReturn === 'number' ? postRetirementReturn : 0;
  const numDesiredAnnualIncome = typeof desiredAnnualIncome === 'number' ? desiredAnnualIncome : 0;

  const isInputEmpty = currentAge === '' || retirementAge === '' || lifeExpectancy === '' || desiredAnnualIncome === '';

  const calculations = useMemo(() => {
    if (isInputEmpty || numCurrentAge <= 0) return null;
    const yearsToRetire = Math.max(1, numRetirementAge - numCurrentAge);
    const yearsInRetirement = Math.max(1, numLifeExpectancy - numRetirementAge);
    const rPre = Math.max(0, numPreRetirementReturn) / 100;
    const rPost = Math.max(0, numPostRetirementReturn) / 100;

    // Accumulation phase
    // FV = P*(1+r)^t + PMT * [((1+r)^t - 1) / r]
    let nestEggAtRetirement = 0;
    if (rPre === 0) {
      nestEggAtRetirement = numCurrentSavings + numAnnualSavings * yearsToRetire;
    } else {
      nestEggAtRetirement = numCurrentSavings * Math.pow(1 + rPre, yearsToRetire) + numAnnualSavings * ((Math.pow(1 + rPre, yearsToRetire) - 1) / rPre);
    }

    // 4% Safe Withdrawal Rule Benchmark
    const safeWithdrawalIncome = nestEggAtRetirement * 0.04;

    // Needed nest egg based on desired income and annuity formula for retirement duration
    let neededNestEgg = 0;
    if (rPost === 0) {
      neededNestEgg = numDesiredAnnualIncome * yearsInRetirement;
    } else {
      neededNestEgg = (numDesiredAnnualIncome * (1 - Math.pow(1 + rPost, -yearsInRetirement))) / rPost;
    }

    const surplusOrShortfall = nestEggAtRetirement - neededNestEgg;
    const isOnTrack = surplusOrShortfall >= 0;

    return {
      yearsToRetire,
      yearsInRetirement,
      nestEggAtRetirement,
      safeWithdrawalIncome,
      neededNestEgg,
      surplusOrShortfall,
      isOnTrack
    };
  }, [isInputEmpty, numCurrentAge, numRetirementAge, numLifeExpectancy, numCurrentSavings, numAnnualSavings, numPreRetirementReturn, numPostRetirementReturn, numDesiredAnnualIncome]);

  const handleCopy = async () => {
    if (!calculations) return;
    const text = `Retirement Plan (${numCurrentAge} to ${numRetirementAge}):
Projected Nest Egg at Age ${numRetirementAge}: ${formatCurrency(calculations.nestEggAtRetirement, currencySymbol)}
Target Needed Nest Egg: ${formatCurrency(calculations.neededNestEgg, currencySymbol)}
Status: ${calculations.isOnTrack ? 'ON TRACK (Surplus: ' + formatCurrency(calculations.surplusOrShortfall, currencySymbol) + ')' : 'SHORTFALL (' + formatCurrency(Math.abs(calculations.surplusOrShortfall), currencySymbol) + ')'}
4% Rule Safe Annual Income: ${formatCurrency(calculations.safeWithdrawalIncome, currencySymbol)}/year`;

    const ok = await copyToClipboard(text);
    if (ok) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleReset = () => {
    setCurrentAge(32);
    setRetirementAge(65);
    setLifeExpectancy(88);
    setCurrentSavings(45000);
    setAnnualSavings(10000);
    setPreRetirementReturn(7.5);
    setPostRetirementReturn(5.0);
    setDesiredAnnualIncome(60000);
  };

  const handleSave = () => {
    if (!calculations) return;
    if (onSaveCalculation) {
      onSaveCalculation(
        `Retirement Plan (Age ${numCurrentAge} → ${numRetirementAge}): Projected ${formatCurrency(calculations.nestEggAtRetirement, currencySymbol)} vs Target ${formatCurrency(calculations.neededNestEgg, currencySymbol)}`,
        { currentAge, retirementAge, lifeExpectancy, currentSavings, annualSavings, preRetirementReturn, postRetirementReturn, desiredAnnualIncome },
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
        <div className="lg:col-span-6 bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-2xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-orange-600" />
              <span>Retirement Horizon</span>
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

          {/* Ages */}
          <div className="grid grid-cols-3 gap-3">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Current Age</label>
              <input
                type="number"
                min="18"
                max="80"
                value={currentAge}
                onChange={(e) => setCurrentAge(e.target.value === '' ? '' : Number(e.target.value))}
                className="w-full p-2 text-sm font-semibold border border-slate-200 rounded-xl bg-slate-50/50 focus:bg-white focus:ring-2 focus:ring-orange-500 focus:outline-none"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Retire Age</label>
              <input
                type="number"
                min="19"
                max="90"
                value={retirementAge}
                onChange={(e) => setRetirementAge(e.target.value === '' ? '' : Number(e.target.value))}
                className="w-full p-2 text-sm font-semibold border border-slate-200 rounded-xl bg-slate-50/50 focus:bg-white focus:ring-2 focus:ring-orange-500 focus:outline-none"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Life Expectancy</label>
              <input
                type="number"
                min="20"
                max="105"
                value={lifeExpectancy}
                onChange={(e) => setLifeExpectancy(e.target.value === '' ? '' : Number(e.target.value))}
                className="w-full p-2 text-sm font-semibold border border-slate-200 rounded-xl bg-slate-50/50 focus:bg-white focus:ring-2 focus:ring-orange-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Current Nest Egg */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 flex justify-between">
              <span>Current Retirement Savings</span>
              <span className="text-orange-600 font-mono">{formatCurrency(numCurrentSavings, currencySymbol)}</span>
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-sm">{currencySymbol}</span>
              <input
                type="number"
                min="0"
                max="10000000"
                step="5000"
                value={currentSavings}
                onChange={(e) => setCurrentSavings(e.target.value === '' ? '' : Number(e.target.value))}
                className="w-full pl-8 pr-3 py-2 text-sm font-semibold border border-slate-200 rounded-xl bg-slate-50/50 focus:bg-white focus:ring-2 focus:ring-orange-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Annual Savings Addition */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 flex justify-between">
              <span>Annual Contribution (401k / IRA)</span>
              <span className="text-orange-600 font-mono">{formatCurrency(numAnnualSavings, currencySymbol)}/yr</span>
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-sm">{currencySymbol}</span>
              <input
                type="number"
                min="0"
                max="100000"
                step="1000"
                value={annualSavings}
                onChange={(e) => setAnnualSavings(e.target.value === '' ? '' : Number(e.target.value))}
                className="w-full pl-8 pr-3 py-2 text-sm font-semibold border border-slate-200 rounded-xl bg-slate-50/50 focus:bg-white focus:ring-2 focus:ring-orange-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Desired Post-Retirement Annual Income */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 flex justify-between">
              <span>Desired Annual Retirement Budget</span>
              <span className="text-orange-600 font-mono">{formatCurrency(numDesiredAnnualIncome, currencySymbol)}/yr</span>
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-sm">{currencySymbol}</span>
              <input
                type="number"
                min="10000"
                max="500000"
                step="5000"
                value={desiredAnnualIncome}
                onChange={(e) => setDesiredAnnualIncome(e.target.value === '' ? '' : Number(e.target.value))}
                className="w-full pl-8 pr-3 py-2 text-sm font-semibold border border-slate-200 rounded-xl bg-slate-50/50 focus:bg-white focus:ring-2 focus:ring-orange-500 focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Right Output */}
        <div className="lg:col-span-6 space-y-4">
          {calculations && (
            <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white rounded-2xl p-6 shadow-md relative">
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-300">
                      Projected Nest Egg at Age {retirementAge}
                    </span>
                    {calculations.isOnTrack ? (
                      <span className="text-[10px] bg-orange-500/20 text-orange-300 font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" /> On Track
                      </span>
                    ) : (
                      <span className="text-[10px] bg-rose-500/20 text-rose-300 font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                        <AlertTriangle className="w-3 h-3" /> Shortfall
                      </span>
                    )}
                  </div>
                  <div className="text-3xl sm:text-4xl font-black tracking-tight text-white mt-1">
                    {formatCurrency(calculations.nestEggAtRetirement, currencySymbol)}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-3 border-t border-slate-700">
                  <div className="bg-white/10 rounded-xl p-3 backdrop-blur-xs">
                    <span className="text-[10px] text-slate-300 uppercase font-bold block">Target Required Nest Egg</span>
                    <span className="text-base font-bold text-white font-mono">{formatCurrency(calculations.neededNestEgg, currencySymbol)}</span>
                  </div>
                  <div className="bg-white/10 rounded-xl p-3 backdrop-blur-xs">
                    <span className="text-[10px] text-slate-300 uppercase font-bold block">4% Rule Safe Income</span>
                    <span className="text-base font-bold text-orange-300 font-mono">{formatCurrency(calculations.safeWithdrawalIncome, currencySymbol)}/yr</span>
                  </div>
                </div>

                {/* Action Buttons */}
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
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
