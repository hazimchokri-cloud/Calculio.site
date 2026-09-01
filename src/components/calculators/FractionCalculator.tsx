import React, { useState, useMemo } from 'react';
import { Divide, Plus, Minus, X, ArrowRight, Check, Copy, RefreshCw, Bookmark, Sparkles, PieChart } from 'lucide-react';
import { formatNumber, copyToClipboard } from '../../utils/formatters';

interface FractionCalculatorProps {
  onSaveCalculation?: (summary: string, inputs: any, results: any) => void;
}

export const FractionCalculator: React.FC<FractionCalculatorProps> = ({ onSaveCalculation }) => {
  const [num1, setNum1] = useState<number | ''>(3);
  const [den1, setDen1] = useState<number | ''>(4);
  const [op, setOp] = useState<'+' | '-' | '×' | '÷'>('+');
  const [num2, setNum2] = useState<number | ''>(2);
  const [den2, setDen2] = useState<number | ''>(5);
  const [copied, setCopied] = useState<boolean>(false);
  const [saved, setSaved] = useState<boolean>(false);
  const [pulse, setPulse] = useState<boolean>(false);

  const gcd = (a: number, b: number): number => {
    a = Math.abs(a);
    b = Math.abs(b);
    while (b) {
      const t = b;
      b = a % b;
      a = t;
    }
    return a || 1;
  };

  const handleCalculate = () => {
    setPulse(true);
    setTimeout(() => setPulse(false), 400);
  };

  const handleReset = () => {
    setNum1(3);
    setDen1(4);
    setOp('+');
    setNum2(2);
    setDen2(5);
  };

  const calculation = useMemo(() => {
    if (num1 === '' || den1 === '' || num2 === '' || den2 === '') {
      return null;
    }
    const n1 = typeof num1 === 'number' ? num1 : 0;
    const d1 = typeof den1 === 'number' ? den1 : 1;
    const n2 = typeof num2 === 'number' ? num2 : 0;
    const d2 = typeof den2 === 'number' ? den2 : 1;

    if (d1 === 0 || d2 === 0) {
      return { error: 'Denominator cannot be zero (division by zero)', simpNum: 0, simpDen: 1, divisor: 1, decimal: 0, steps: '', mixedStr: '' };
    }

    let unsimplifiedNum = 0;
    let unsimplifiedDen = 1;
    let steps = '';

    if (op === '+') {
      unsimplifiedNum = (n1 * d2) + (n2 * d1);
      unsimplifiedDen = d1 * d2;
      steps = `Step 1: Find common denominator (${d1} × ${d2} = ${unsimplifiedDen}).\nStep 2: (${n1} × ${d2}) + (${n2} × ${d1}) = ${n1 * d2} + ${n2 * d1} = ${unsimplifiedNum}.\nStep 3: Unreduced = ${unsimplifiedNum}/${unsimplifiedDen}`;
    } else if (op === '-') {
      unsimplifiedNum = (n1 * d2) - (n2 * d1);
      unsimplifiedDen = d1 * d2;
      steps = `Step 1: Common denominator (${d1} × ${d2} = ${unsimplifiedDen}).\nStep 2: (${n1} × ${d2}) - (${n2} × ${d1}) = ${n1 * d2} - ${n2 * d1} = ${unsimplifiedNum}.\nStep 3: Unreduced = ${unsimplifiedNum}/${unsimplifiedDen}`;
    } else if (op === '×') {
      unsimplifiedNum = n1 * n2;
      unsimplifiedDen = d1 * d2;
      steps = `Step 1: Multiply numerators (${n1} × ${n2} = ${unsimplifiedNum}).\nStep 2: Multiply denominators (${d1} × ${d2} = ${unsimplifiedDen}).\nStep 3: Unreduced = ${unsimplifiedNum}/${unsimplifiedDen}`;
    } else if (op === '÷') {
      if (n2 === 0) return { error: 'Cannot divide by a zero fraction', simpNum: 0, simpDen: 1, divisor: 1, decimal: 0, steps: '', mixedStr: '' };
      unsimplifiedNum = n1 * d2;
      unsimplifiedDen = d1 * n2;
      steps = `Step 1: Invert second fraction (${n2}/${d2} → ${d2}/${n2}).\nStep 2: Multiply (${n1} × ${d2}) / (${d1} × ${n2}) = ${unsimplifiedNum}/${unsimplifiedDen}`;
    }

    const divisor = gcd(unsimplifiedNum, unsimplifiedDen);
    let simpNum = unsimplifiedNum / divisor;
    let simpDen = unsimplifiedDen / divisor;

    if (simpDen < 0) {
      simpNum = -simpNum;
      simpDen = -simpDen;
    }

    const decimal = simpNum / simpDen;

    // Mixed number format
    let mixedStr = '';
    if (Math.abs(simpNum) >= simpDen && simpDen !== 1) {
      const whole = Math.floor(Math.abs(simpNum) / simpDen) * (simpNum < 0 ? -1 : 1);
      const rem = Math.abs(simpNum) % simpDen;
      mixedStr = rem === 0 ? `${whole}` : `${whole} ${rem}/${simpDen}`;
    }

    return {
      error: null,
      simpNum,
      simpDen,
      divisor,
      decimal,
      steps,
      mixedStr
    };
  }, [num1, den1, op, num2, den2]);

  const handleCopy = async () => {
    if (!calculation || calculation.error) return;
    const text = `${num1}/${den1} ${op} ${num2}/${den2} = ${calculation.simpNum}/${calculation.simpDen} (Decimal: ${formatNumber(calculation.decimal, 4)})`;
    const ok = await copyToClipboard(text);
    if (ok) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleSave = () => {
    if (onSaveCalculation && calculation && !calculation.error) {
      onSaveCalculation(
        `Fraction: ${num1}/${den1} ${op} ${num2}/${den2} = ${calculation.simpNum}/${calculation.simpDen}`,
        { num1, den1, op, num2, den2 },
        { result: `${calculation.simpNum}/${calculation.simpDen}`, decimal: calculation.decimal }
      );
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Inputs */}
        <div className="lg:col-span-6 bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-2xs space-y-5">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Divide className="w-4 h-4 text-blue-600" />
              <span>Fraction Equation Inputs</span>
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

          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-5 py-6 bg-slate-50 rounded-2xl border border-slate-200/60">
            {/* Fraction 1 */}
            <div className="flex flex-col items-center gap-1.5 w-20">
              <label className="text-[10px] text-slate-500 font-bold uppercase">Fraction 1</label>
              <input
                type="number"
                value={num1}
                onChange={(e) => setNum1(e.target.value === '' ? '' : Number(e.target.value))}
                className="w-full text-center px-2 py-2 font-mono font-bold text-lg border border-slate-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <div className="w-full h-1 bg-slate-700 rounded-full" />
              <input
                type="number"
                value={den1}
                onChange={(e) => setDen1(e.target.value === '' ? '' : Number(e.target.value))}
                className="w-full text-center px-2 py-2 font-mono font-bold text-lg border border-slate-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Operation selector dropdown / buttons */}
            <div className="flex flex-col gap-1.5">
              <span className="text-[10px] text-slate-500 font-bold uppercase text-center">Op</span>
              <div className="grid grid-cols-2 gap-1 bg-white p-1 rounded-xl border border-slate-200">
                {(['+', '-', '×', '÷'] as const).map(sym => (
                  <button
                    key={sym}
                    type="button"
                    onClick={() => setOp(sym)}
                    className={`w-7 h-7 rounded-lg font-bold text-sm flex items-center justify-center transition-all ${
                      op === sym ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    {sym}
                  </button>
                ))}
              </div>
            </div>

            {/* Fraction 2 */}
            <div className="flex flex-col items-center gap-1.5 w-20">
              <label className="text-[10px] text-slate-500 font-bold uppercase">Fraction 2</label>
              <input
                type="number"
                value={num2}
                onChange={(e) => setNum2(e.target.value === '' ? '' : Number(e.target.value))}
                className="w-full text-center px-2 py-2 font-mono font-bold text-lg border border-slate-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <div className="w-full h-1 bg-slate-700 rounded-full" />
              <input
                type="number"
                value={den2}
                onChange={(e) => setDen2(e.target.value === '' ? '' : Number(e.target.value))}
                className="w-full text-center px-2 py-2 font-mono font-bold text-lg border border-slate-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Quick Presets */}
          <div className="flex flex-wrap items-center gap-1.5 pt-1">
            <span className="text-xs font-semibold text-slate-500 mr-1">Presets:</span>
            {[
              { label: '1/2 + 1/3', n1: 1, d1: 2, op: '+' as const, n2: 1, d2: 3 },
              { label: '3/4 - 1/8', n1: 3, d1: 4, op: '-' as const, n2: 1, d2: 8 },
              { label: '2/5 × 5/6', n1: 2, d1: 5, op: '×' as const, n2: 5, d2: 6 },
              { label: '7/8 ÷ 1/4', n1: 7, d1: 8, op: '÷' as const, n2: 1, d2: 4 },
            ].map((p, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  setNum1(p.n1);
                  setDen1(p.d1);
                  setOp(p.op);
                  setNum2(p.n2);
                  setDen2(p.d2);
                }}
                className="text-xs font-bold px-2 py-1 bg-slate-100 hover:bg-slate-200 rounded-lg text-slate-700 transition-colors"
              >
                {p.label}
              </button>
            ))}
          </div>

          {/* Action Buttons: Calculate & Reset */}
          <div className="flex gap-3 pt-2 border-t border-slate-100">
            <button
              type="button"
              onClick={handleCalculate}
              className="flex-1 py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-xs transition-all active:scale-95"
            >
              <Sparkles className="w-4 h-4" />
              <span>Calculate Fraction</span>
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

        {/* Results */}
        <div className="lg:col-span-6 space-y-4">
          <div className={`bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white rounded-2xl p-6 shadow-md relative transition-transform ${pulse ? 'scale-[1.01]' : ''}`}>
            {!calculation ? (
              <div className="py-8 text-center text-slate-400 text-xs">
                Enter valid numerator and denominator values to calculate fraction solution.
              </div>
            ) : calculation.error ? (
              <div className="p-4 bg-rose-500/20 border border-rose-500/40 rounded-xl text-rose-300 text-sm font-semibold">
                {calculation.error}
              </div>
            ) : (
              <div className="space-y-5">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-blue-300">
                    Reduced Solution
                  </span>
                  
                  <div className="flex items-center gap-6 mt-3">
                    <div className="flex flex-col items-center gap-1 min-w-[70px] bg-white/10 px-4 py-2.5 rounded-2xl">
                      <span className="text-3xl sm:text-4xl font-black font-mono text-white">{calculation.simpNum}</span>
                      {calculation.simpDen !== 1 && (
                        <>
                          <div className="w-full h-1 bg-blue-400 rounded-full" />
                          <span className="text-3xl sm:text-4xl font-black font-mono text-white">{calculation.simpDen}</span>
                        </>
                      )}
                    </div>

                    <div className="space-y-1 text-sm font-mono border-l border-white/10 pl-4">
                      <div>Decimal: <strong className="text-orange-300 font-bold">{formatNumber(calculation.decimal, 6)}</strong></div>
                      {calculation.mixedStr && <div>Mixed: <strong className="text-amber-300 font-bold">{calculation.mixedStr}</strong></div>}
                      {calculation.divisor > 1 && <div className="text-xs text-slate-300">Reduced by GCD: {calculation.divisor}</div>}
                    </div>
                  </div>
                </div>

                {/* Step by Step breakdown */}
                {calculation.steps && (
                  <div className="bg-white/5 rounded-xl p-3.5 border border-white/10 text-xs font-mono space-y-1 text-slate-200">
                    <span className="text-[10px] text-blue-300 font-bold uppercase block font-sans mb-1">
                      Step-by-Step Mathematical Breakdown
                    </span>
                    <pre className="whitespace-pre-wrap font-mono text-xs leading-relaxed text-slate-300">
                      {calculation.steps}
                    </pre>
                  </div>
                )}

                {/* Action Bar */}
                <div className="flex items-center gap-2 pt-2 border-t border-blue-900/60">
                  <button
                    onClick={handleCopy}
                    className="flex-1 py-2 px-3 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-bold text-white flex items-center justify-center gap-1.5 transition-colors border border-white/10"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-orange-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? 'Copied' : 'Copy Solution'}</span>
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
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
