import React, { useState, useMemo } from 'react';
import { Percent, Check, Copy, RefreshCw, Bookmark, Sparkles, TrendingUp, TrendingDown, ArrowRight, BarChart2 } from 'lucide-react';
import { formatNumber, copyToClipboard } from '../../utils/formatters';

interface PercentageCalculatorProps {
  onSaveCalculation?: (summary: string, inputs: any, results: any) => void;
}

type Mode = 'percent-of' | 'find-percent' | 'change' | 'difference' | 'discount';

export const PercentageCalculator: React.FC<PercentageCalculatorProps> = ({ onSaveCalculation }) => {
  const [activeMode, setActiveMode] = useState<Mode>('percent-of');

  // Mode 1: What is X% of Y?
  const [p1Percent, setP1Percent] = useState<number | ''>(15);
  const [p1Value, setP1Value] = useState<number | ''>(250);

  // Mode 2: X is what % of Y?
  const [p2Part, setP2Part] = useState<number | ''>(45);
  const [p2Total, setP2Total] = useState<number | ''>(180);

  // Mode 3: Percent Change from A to B
  const [p3Start, setP3Start] = useState<number | ''>(50);
  const [p3End, setP3End] = useState<number | ''>(75);

  // Mode 4: Percent Difference between A and B
  const [p4A, setP4A] = useState<number | ''>(100);
  const [p4B, setP4B] = useState<number | ''>(130);

  // Mode 5: Discount & Sales Price
  const [p5Price, setP5Price] = useState<number | ''>(120);
  const [p5Discount, setP5Discount] = useState<number | ''>(20);

  const [copied, setCopied] = useState(false);
  const [saved, setSaved] = useState(false);
  const [pulse, setPulse] = useState(false);

  // Trigger calculation feedback
  const handleCalculate = () => {
    setPulse(true);
    setTimeout(() => setPulse(false), 400);
  };

  const handleReset = () => {
    if (activeMode === 'percent-of') {
      setP1Percent(15);
      setP1Value(250);
    } else if (activeMode === 'find-percent') {
      setP2Part(45);
      setP2Total(180);
    } else if (activeMode === 'change') {
      setP3Start(50);
      setP3End(75);
    } else if (activeMode === 'difference') {
      setP4A(100);
      setP4B(130);
    } else if (activeMode === 'discount') {
      setP5Price(120);
      setP5Discount(20);
    }
  };

  const results = useMemo(() => {
    switch (activeMode) {
      case 'percent-of': {
        if (p1Percent === '' || p1Value === '') return null;
        const result = (Number(p1Percent) / 100) * Number(p1Value);
        const remainder = Number(p1Value) - result;
        const formula = `(${p1Percent} / 100) × ${p1Value} = ${formatNumber(result, 4)}`;
        return {
          title: `${p1Percent}% of ${p1Value}`,
          mainResult: formatNumber(result, 4),
          mainLabel: 'Result Value',
          formula,
          breakdown: [
            { label: 'Percentage Input', value: `${p1Percent}%` },
            { label: 'Base Value', value: `${p1Value}` },
            { label: 'Calculated Portion', value: formatNumber(result, 4) },
            { label: 'Remaining Balance', value: formatNumber(remainder, 4) }
          ],
          percentRatio: Math.min(100, Math.max(0, Number(p1Percent)))
        };
      }
      case 'find-percent': {
        if (p2Part === '' || p2Total === '') return null;
        const numPart = Number(p2Part);
        const numTotal = Number(p2Total);
        const pct = numTotal !== 0 ? (numPart / numTotal) * 100 : 0;
        const formula = `(${p2Part} / ${p2Total}) × 100 = ${formatNumber(pct, 2)}%`;
        return {
          title: `${p2Part} of ${p2Total}`,
          mainResult: `${formatNumber(pct, 2)}%`,
          mainLabel: 'Percentage Share',
          formula,
          breakdown: [
            { label: 'Part Value (Numerator)', value: `${p2Part}` },
            { label: 'Total Value (Denominator)', value: `${p2Total}` },
            { label: 'Percentage Equivalent', value: `${formatNumber(pct, 4)}%` },
            { label: 'Decimal Ratio', value: formatNumber(numPart / (numTotal || 1), 6) }
          ],
          percentRatio: Math.min(100, Math.max(0, pct))
        };
      }
      case 'change': {
        if (p3Start === '' || p3End === '') return null;
        const numStart = Number(p3Start);
        const numEnd = Number(p3End);
        const diff = numEnd - numStart;
        const changePct = numStart !== 0 ? (diff / Math.abs(numStart)) * 100 : 0;
        const isIncrease = changePct >= 0;
        const formula = `((${p3End} - ${p3Start}) / |${p3Start}|) × 100 = ${isIncrease ? '+' : ''}${formatNumber(changePct, 2)}%`;
        return {
          title: `Change from ${p3Start} to ${p3End}`,
          mainResult: `${isIncrease ? '+' : ''}${formatNumber(changePct, 2)}%`,
          mainLabel: isIncrease ? 'Percentage Increase' : 'Percentage Decrease',
          isPositive: isIncrease,
          formula,
          breakdown: [
            { label: 'Initial Value', value: `${p3Start}` },
            { label: 'Final Value', value: `${p3End}` },
            { label: 'Absolute Difference', value: `${diff > 0 ? '+' : ''}${formatNumber(diff, 2)}` },
            { label: 'Multiplier Factor', value: `${formatNumber(numEnd / (numStart || 1), 4)}x` }
          ],
          percentRatio: Math.min(100, Math.max(0, Math.abs(changePct)))
        };
      }
      case 'difference': {
        if (p4A === '' || p4B === '') return null;
        const numA = Number(p4A);
        const numB = Number(p4B);
        const avg = (numA + numB) / 2;
        const diff = Math.abs(numA - numB);
        const pctDiff = avg !== 0 ? (diff / avg) * 100 : 0;
        const formula = `|${p4A} - ${p4B}| / ((${p4A} + ${p4B}) / 2) × 100 = ${formatNumber(pctDiff, 2)}%`;
        return {
          title: `Difference between ${p4A} and ${p4B}`,
          mainResult: `${formatNumber(pctDiff, 2)}%`,
          mainLabel: 'Percentage Difference',
          formula,
          breakdown: [
            { label: 'First Value (A)', value: `${p4A}` },
            { label: 'Second Value (B)', value: `${p4B}` },
            { label: 'Absolute Difference', value: formatNumber(diff, 2) },
            { label: 'Average of Both Values', value: formatNumber(avg, 2) }
          ],
          percentRatio: Math.min(100, Math.max(0, pctDiff))
        };
      }
      case 'discount': {
        if (p5Price === '' || p5Discount === '') return null;
        const numPrice = Number(p5Price);
        const numDiscount = Number(p5Discount);
        const discountAmount = (numPrice * numDiscount) / 100;
        const finalPrice = Math.max(0, numPrice - discountAmount);
        const formula = `${p5Price} - (${p5Price} × ${p5Discount} / 100) = ${formatNumber(finalPrice, 2)}`;
        return {
          title: `${p5Discount}% off of $${p5Price}`,
          mainResult: `$${formatNumber(finalPrice, 2)}`,
          mainLabel: 'Final Discounted Price',
          formula,
          breakdown: [
            { label: 'Original Retail Price', value: `$${formatNumber(numPrice, 2)}` },
            { label: 'Discount Percentage', value: `${p5Discount}%` },
            { label: 'You Save (Savings)', value: `$${formatNumber(discountAmount, 2)}` },
            { label: 'Final Payable Price', value: `$${formatNumber(finalPrice, 2)}` }
          ],
          percentRatio: Math.min(100, Math.max(0, numDiscount))
        };
      }
    }
  }, [activeMode, p1Percent, p1Value, p2Part, p2Total, p3Start, p3End, p4A, p4B, p5Price, p5Discount]);

  const handleCopy = async () => {
    if (!results) return;
    const text = `${results.title}: ${results.mainLabel} = ${results.mainResult} (Formula: ${results.formula})`;
    const ok = await copyToClipboard(text);
    if (ok) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleSave = () => {
    if (!onSaveCalculation || !results) return;
    onSaveCalculation(
      `${results.title} → ${results.mainResult}`,
      { activeMode },
      results
    );
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Mode Navigation Bar */}
      <div className="flex flex-wrap gap-2 p-1.5 bg-slate-200/60 rounded-2xl">
        {[
          { id: 'percent-of', label: 'What is X% of Y?' },
          { id: 'find-percent', label: 'X is what % of Y?' },
          { id: 'change', label: '% Increase / Decrease' },
          { id: 'difference', label: '% Difference' },
          { id: 'discount', label: 'Discount & Sale' }
        ].map(item => (
          <button
            key={item.id}
            type="button"
            onClick={() => setActiveMode(item.id as Mode)}
            className={`py-2 px-3.5 rounded-xl text-xs font-bold transition-all ${
              activeMode === item.id 
                ? 'bg-white text-blue-700 shadow-2xs' 
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Inputs Card */}
        <div className="lg:col-span-6 bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-2xs space-y-5">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Percent className="w-4 h-4 text-blue-600" />
              <span>Input Parameters</span>
            </h2>
            <button
              type="button"
              onClick={handleReset}
              className="text-xs font-semibold text-slate-500 hover:text-slate-800 flex items-center gap-1 transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          </div>

          {/* Mode 1: What is X% of Y? */}
          {activeMode === 'percent-of' && (
            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 flex justify-between">
                  <span>Percentage (%)</span>
                  <span className="text-blue-600 font-mono">{p1Percent !== '' ? `${p1Percent}%` : ''}</span>
                </label>
                <div className="relative">
                  <input
                    type="number"
                    step="any"
                    value={p1Percent}
                    onChange={(e) => setP1Percent(e.target.value === '' ? '' : parseFloat(e.target.value))}
                    placeholder="15"
                    className="w-full p-2.5 text-base font-mono font-semibold border border-slate-200 rounded-xl bg-slate-50/50 focus:bg-white focus:outline-none"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 font-bold">%</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="100"
                  value={p1Percent !== '' ? Math.min(100, Math.max(1, Number(p1Percent))) : 15}
                  onChange={(e) => setP1Percent(e.target.value === '' ? '' : Number(e.target.value))}
                  className="w-full accent-blue-600 cursor-pointer"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Total Value (Y)</label>
                <input
                  type="number"
                  step="any"
                  value={p1Value}
                  onChange={(e) => setP1Value(e.target.value === '' ? '' : parseFloat(e.target.value))}
                  placeholder="250"
                  className="w-full p-2.5 text-base font-mono font-semibold border border-slate-200 rounded-xl bg-slate-50/50 focus:bg-white focus:outline-none"
                />
              </div>

              {/* Quick Presets */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {[5, 10, 15, 20, 25, 50, 75].map(pct => (
                  <button
                    key={pct}
                    type="button"
                    onClick={() => setP1Percent(pct)}
                    className="py-1 px-2 text-xs font-bold bg-slate-100 hover:bg-slate-200 rounded-lg text-slate-700 transition-colors"
                  >
                    {pct}%
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Mode 2: Find percentage */}
          {activeMode === 'find-percent' && (
            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Part (X)</label>
                <input
                  type="number"
                  step="any"
                  value={p2Part}
                  onChange={(e) => setP2Part(e.target.value === '' ? '' : parseFloat(e.target.value))}
                  placeholder="45"
                  className="w-full p-2.5 text-base font-mono font-semibold border border-slate-200 rounded-xl bg-slate-50/50 focus:bg-white focus:outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Total / Whole (Y)</label>
                <input
                  type="number"
                  step="any"
                  value={p2Total}
                  onChange={(e) => setP2Total(e.target.value === '' ? '' : parseFloat(e.target.value))}
                  placeholder="180"
                  className="w-full p-2.5 text-base font-mono font-semibold border border-slate-200 rounded-xl bg-slate-50/50 focus:bg-white focus:outline-none"
                />
              </div>
            </div>
          )}

          {/* Mode 3: Percent Change */}
          {activeMode === 'change' && (
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Initial Starting Value</label>
                <input
                  type="number"
                  step="any"
                  value={p3Start}
                  onChange={(e) => setP3Start(e.target.value === '' ? '' : parseFloat(e.target.value))}
                  placeholder="50"
                  className="w-full p-2.5 text-base font-mono font-semibold border border-slate-200 rounded-xl bg-slate-50/50 focus:bg-white focus:outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Final Ending Value</label>
                <input
                  type="number"
                  step="any"
                  value={p3End}
                  onChange={(e) => setP3End(e.target.value === '' ? '' : parseFloat(e.target.value))}
                  placeholder="75"
                  className="w-full p-2.5 text-base font-mono font-semibold border border-slate-200 rounded-xl bg-slate-50/50 focus:bg-white focus:outline-none"
                />
              </div>
            </div>
          )}

          {/* Mode 4: Percent Difference */}
          {activeMode === 'difference' && (
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">First Value (A)</label>
                <input
                  type="number"
                  step="any"
                  value={p4A}
                  onChange={(e) => setP4A(e.target.value === '' ? '' : parseFloat(e.target.value))}
                  placeholder="100"
                  className="w-full p-2.5 text-base font-mono font-semibold border border-slate-200 rounded-xl bg-slate-50/50 focus:bg-white focus:outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Second Value (B)</label>
                <input
                  type="number"
                  step="any"
                  value={p4B}
                  onChange={(e) => setP4B(e.target.value === '' ? '' : parseFloat(e.target.value))}
                  placeholder="130"
                  className="w-full p-2.5 text-base font-mono font-semibold border border-slate-200 rounded-xl bg-slate-50/50 focus:bg-white focus:outline-none"
                />
              </div>
            </div>
          )}

          {/* Mode 5: Discount */}
          {activeMode === 'discount' && (
            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Original Item Price ($)</label>
                <input
                  type="number"
                  step="any"
                  value={p5Price}
                  onChange={(e) => setP5Price(e.target.value === '' ? '' : parseFloat(e.target.value))}
                  placeholder="120"
                  className="w-full p-2.5 text-base font-mono font-semibold border border-slate-200 rounded-xl bg-slate-50/50 focus:bg-white focus:outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 flex justify-between">
                  <span>Discount Percentage (%)</span>
                  <span className="text-blue-600 font-mono">{p5Discount !== '' ? `${p5Discount}%` : ''}</span>
                </label>
                <input
                  type="number"
                  step="any"
                  value={p5Discount}
                  onChange={(e) => setP5Discount(e.target.value === '' ? '' : parseFloat(e.target.value))}
                  placeholder="20"
                  className="w-full p-2.5 text-base font-mono font-semibold border border-slate-200 rounded-xl bg-slate-50/50 focus:bg-white focus:outline-none"
                />
              </div>
            </div>
          )}

          {/* Action Buttons: Calculate & Reset */}
          <div className="flex gap-3 pt-2 border-t border-slate-100">
            <button
              type="button"
              onClick={handleCalculate}
              className="flex-1 py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-xs transition-all active:scale-95"
            >
              <Sparkles className="w-4 h-4" />
              <span>Calculate</span>
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="py-3 px-4 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 font-bold text-sm flex items-center justify-center gap-2 transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Reset</span>
            </button>
          </div>
        </div>

        {/* Right Output Results Card */}
        <div className="lg:col-span-6 space-y-4">
          <div className={`bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white rounded-2xl p-6 shadow-md relative transition-transform ${pulse ? 'scale-[1.01]' : ''}`}>
            {results ? (
              <div className="space-y-4">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-blue-300">
                    {results.mainLabel}
                  </span>
                  <div className="text-4xl sm:text-5xl font-black tracking-tight text-white mt-1 font-mono">
                    {results.mainResult}
                  </div>
                </div>

                {/* Visual percentage representation bar */}
                <div className="space-y-1.5 pt-2">
                  <div className="flex justify-between text-xs text-slate-300">
                    <span>Visual Proportion</span>
                    <span className="font-mono font-bold text-blue-300">{results.percentRatio.toFixed(1)}%</span>
                  </div>
                  <div className="h-3 bg-white/10 rounded-full overflow-hidden p-0.5">
                    <div
                      className="h-full bg-gradient-to-r from-blue-400 to-orange-400 rounded-full transition-all duration-500"
                      style={{ width: `${Math.min(100, Math.max(2, results.percentRatio))}%` }}
                    />
                  </div>
                </div>

                {/* Calculation Breakdown Grid */}
                <div className="grid grid-cols-2 gap-2 pt-3 border-t border-blue-900/60 text-xs">
                  {results.breakdown.map((item, idx) => (
                    <div key={idx} className="bg-white/10 rounded-xl p-2.5 backdrop-blur-xs">
                      <span className="text-[10px] text-slate-300 uppercase font-bold block">{item.label}</span>
                      <span className="text-sm font-bold text-white font-mono">{item.value}</span>
                    </div>
                  ))}
                </div>

                {/* Formula Explanation */}
                <div className="bg-white/5 rounded-xl p-3 border border-white/10 text-xs">
                  <span className="text-[10px] text-slate-300 font-bold uppercase block mb-1">Step-by-Step Formula</span>
                  <span className="font-mono text-orange-300 break-all">{results.formula}</span>
                </div>
              </div>
            ) : (
              <div className="py-12 text-center space-y-2">
                <p className="text-amber-300 text-sm font-semibold">Please enter a value.</p>
                <p className="text-xs text-slate-400">Fill in the input fields above to calculate the percentage.</p>
              </div>
            )}

            {/* Action Bar */}
            <div className="flex items-center gap-2 pt-4 border-t border-blue-900/60">
              <button
                onClick={handleCopy}
                className="flex-1 py-2 px-3 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-bold text-white flex items-center justify-center gap-1.5 transition-colors border border-white/10"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-orange-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied' : 'Copy Result'}</span>
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
      </div>
    </div>
  );
};
