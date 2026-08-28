import React, { useState, useMemo } from 'react';
import { copyToClipboard, formatNumber } from '../../utils/formatters';
import { Percent, ArrowRightLeft, Copy, Check, Bookmark, Split } from 'lucide-react';

interface RatioCalculatorProps {
  onSaveCalculation?: (summary: string, inputs: any, results: any) => void;
}

export const RatioCalculator: React.FC<RatioCalculatorProps> = ({ onSaveCalculation }) => {
  const [mode, setMode] = useState<'solve' | 'simplify' | 'divide'>('solve');

  // Solve A:B = C:D (one is X)
  const [valA, setValA] = useState<string>('4');
  const [valB, setValB] = useState<string>('6');
  const [valC, setValC] = useState<string>('12');
  const [valD, setValD] = useState<string>(''); // Target X

  // Simplify Ratio
  const [simpA, setSimpA] = useState<number | ''>(36);
  const [simpB, setSimpB] = useState<number | ''>(48);

  // Divide Total by Ratio
  const [totalAmount, setTotalAmount] = useState<number | ''>(500);
  const [ratioPartsStr, setRatioPartsStr] = useState<string>('2 : 3 : 5');

  const [copied, setCopied] = useState<boolean>(false);
  const [saved, setSaved] = useState<boolean>(false);

  const gcd = (a: number, b: number): number => {
    a = Math.abs(a);
    b = Math.abs(b);
    while (b) {
      const t = b;
      b = a % b;
      a = t;
    }
    return a;
  };

  // Solve A/B = C/D
  const solveResults = useMemo(() => {
    const a = valA === '' ? null : parseFloat(valA);
    const b = valB === '' ? null : parseFloat(valB);
    const c = valC === '' ? null : parseFloat(valC);
    const d = valD === '' ? null : parseFloat(valD);

    let solvedVar = '';
    let solvedVal: number | null = null;

    if (a === null && b !== null && c !== null && d !== null && d !== 0) {
      solvedVar = 'A';
      solvedVal = (b * c) / d;
    } else if (b === null && a !== null && c !== null && d !== null && c !== 0) {
      solvedVar = 'B';
      solvedVal = (a * d) / c;
    } else if (c === null && a !== null && b !== null && d !== null && b !== 0) {
      solvedVar = 'C';
      solvedVal = (a * d) / b;
    } else if (d === null && a !== null && b !== null && c !== null && a !== 0) {
      solvedVar = 'D';
      solvedVal = (b * c) / a;
    }

    return {
      solvedVar,
      solvedVal,
      displayA: a !== null ? a : (solvedVar === 'A' ? solvedVal : '?'),
      displayB: b !== null ? b : (solvedVar === 'B' ? solvedVal : '?'),
      displayC: c !== null ? c : (solvedVar === 'C' ? solvedVal : '?'),
      displayD: d !== null ? d : (solvedVar === 'D' ? solvedVal : '?')
    };
  }, [valA, valB, valC, valD]);

  // Simplify A:B
  const simplifyResults = useMemo(() => {
    if (simpA === '' || simpB === '') return null;
    const a = Math.round(Number(simpA));
    const b = Math.round(Number(simpB));
    if (isNaN(a) || isNaN(b) || a <= 0 || b <= 0) return null;

    const divisor = gcd(a, b);
    const reducedA = a / divisor;
    const reducedB = b / divisor;
    const decimalRatio = (a / b).toFixed(4);

    return {
      original: `${a} : ${b}`,
      reduced: `${reducedA} : ${reducedB}`,
      divisor,
      decimalRatio,
      percentage: `${((reducedA / (reducedA + reducedB)) * 100).toFixed(1)}% to ${((reducedB / (reducedA + reducedB)) * 100).toFixed(1)}%`
    };
  }, [simpA, simpB]);

  // Divide Total by Multi-Part Ratio
  const divideResults = useMemo(() => {
    if (totalAmount === '') return null;
    const numTotal = Number(totalAmount);
    const parts = ratioPartsStr
      .split(/[:,\s]+/)
      .map(p => parseFloat(p))
      .filter(p => !isNaN(p) && p > 0);

    if (parts.length === 0 || numTotal <= 0) return null;

    const sumParts = parts.reduce((acc, p) => acc + p, 0);
    const unitValue = numTotal / sumParts;

    const shares = parts.map((part, idx) => ({
      part,
      percentage: ((part / sumParts) * 100).toFixed(1),
      amount: (part * unitValue).toFixed(2)
    }));

    return {
      totalAmount: numTotal,
      sumParts,
      shares
    };
  }, [totalAmount, ratioPartsStr]);

  const handleCopy = async () => {
    let text = '';
    if (mode === 'solve' && solveResults.solvedVal !== null) {
      text = `Ratio Proportion Solution: ${solveResults.displayA} : ${solveResults.displayB} = ${solveResults.displayC} : ${solveResults.displayD} (${solveResults.solvedVar} = ${solveResults.solvedVal})`;
    } else if (mode === 'simplify' && simplifyResults) {
      text = `Ratio Simplification: ${simplifyResults.original} simplifies to ${simplifyResults.reduced} (Decimal: ${simplifyResults.decimalRatio})`;
    } else if (mode === 'divide' && divideResults) {
      text = `Proportional Division of ${totalAmount} in ratio ${ratioPartsStr}: ${divideResults.shares.map(s => `${s.amount} (${s.percentage}%)`).join(', ')}`;
    }

    const ok = await copyToClipboard(text);
    if (ok) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleReset = () => {
    setMode('solve');
    setValA('4');
    setValB('6');
    setValC('12');
    setValD('');
    setSimpA(36);
    setSimpB(48);
    setTotalAmount(500);
    setRatioPartsStr('2 : 3 : 5');
  };

  const handleSave = () => {
    if (!onSaveCalculation) return;
    if (mode === 'solve' && solveResults.solvedVal !== null) {
      onSaveCalculation(
        `Ratio Proportion: ${solveResults.displayA}:${solveResults.displayB} = ${solveResults.displayC}:${solveResults.displayD}`,
        { valA, valB, valC, valD },
        solveResults
      );
    } else if (mode === 'simplify' && simplifyResults) {
      onSaveCalculation(
        `Ratio ${simplifyResults.original} = ${simplifyResults.reduced}`,
        { simpA, simpB },
        simplifyResults
      );
    }
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Navigation Tabs */}
      <div className="flex items-center justify-between gap-3">
        <div className="flex gap-2 p-1.5 bg-slate-200/60 rounded-2xl max-w-md flex-1">
          <button
            onClick={() => setMode('solve')}
            className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all ${
              mode === 'solve' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Proportions (A:B = C:D)
          </button>
          <button
            onClick={() => setMode('simplify')}
            className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all ${
              mode === 'simplify' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Simplify Ratio
          </button>
          <button
            onClick={() => setMode('divide')}
            className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all ${
              mode === 'divide' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Split Proportions
          </button>
        </div>
        <button
          type="button"
          onClick={handleReset}
          className="text-xs font-semibold text-slate-600 hover:text-slate-900 px-3 py-2 rounded-xl border border-slate-200 hover:bg-slate-50 transition-colors"
        >
          Reset
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Inputs */}
        <div className="lg:col-span-6 bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-2xs space-y-4">
          {mode === 'solve' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <ArrowRightLeft className="w-4 h-4 text-indigo-600" />
                  <span>Solve Proportional Equation (A : B = C : D)</span>
                </h2>
              </div>
              <p className="text-xs text-slate-500">Leave any one field blank to solve for it automatically.</p>

              <div className="grid grid-cols-2 gap-4 items-center bg-slate-50 p-4 rounded-xl">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-700">Left Ratio (A : B)</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      placeholder="A"
                      value={valA}
                      onChange={(e) => setValA(e.target.value)}
                      className="w-full p-2 text-center font-bold text-sm bg-white border border-slate-200 rounded-lg focus:ring-1 focus:ring-indigo-500 focus:outline-none"
                    />
                    <span className="font-bold text-slate-400">:</span>
                    <input
                      type="number"
                      placeholder="B"
                      value={valB}
                      onChange={(e) => setValB(e.target.value)}
                      className="w-full p-2 text-center font-bold text-sm bg-white border border-slate-200 rounded-lg focus:ring-1 focus:ring-indigo-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-700">Right Ratio (C : D)</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      placeholder="C"
                      value={valC}
                      onChange={(e) => setValC(e.target.value)}
                      className="w-full p-2 text-center font-bold text-sm bg-white border border-slate-200 rounded-lg focus:ring-1 focus:ring-indigo-500 focus:outline-none"
                    />
                    <span className="font-bold text-slate-400">:</span>
                    <input
                      type="number"
                      placeholder="D (Empty for X)"
                      value={valD}
                      onChange={(e) => setValD(e.target.value)}
                      className="w-full p-2 text-center font-bold text-sm bg-white border border-slate-200 rounded-lg focus:ring-1 focus:ring-indigo-500 focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {mode === 'simplify' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <Percent className="w-4 h-4 text-indigo-600" />
                  <span>Simplify & Reduce Ratio</span>
                </h2>
              </div>
              <div className="grid grid-cols-2 gap-3 items-center">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">First Term (A)</label>
                  <input
                    type="number"
                    min="1"
                    value={simpA}
                    onChange={(e) => setSimpA(e.target.value === '' ? '' : Number(e.target.value))}
                    className="w-full p-2.5 text-base font-mono font-semibold border border-slate-200 rounded-xl bg-slate-50/50 focus:bg-white focus:outline-none"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Second Term (B)</label>
                  <input
                    type="number"
                    min="1"
                    value={simpB}
                    onChange={(e) => setSimpB(e.target.value === '' ? '' : Number(e.target.value))}
                    className="w-full p-2.5 text-base font-mono font-semibold border border-slate-200 rounded-xl bg-slate-50/50 focus:bg-white focus:outline-none"
                  />
                </div>
              </div>
            </div>
          )}

          {mode === 'divide' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <Split className="w-4 h-4 text-indigo-600" />
                  <span>Divide Quantity into Ratio Parts</span>
                </h2>
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Total Quantity / Amount</label>
                <input
                  type="number"
                  min="1"
                  value={totalAmount}
                  onChange={(e) => setTotalAmount(e.target.value === '' ? '' : Number(e.target.value))}
                  className="w-full p-2.5 text-base font-mono font-semibold border border-slate-200 rounded-xl bg-slate-50/50 focus:bg-white focus:outline-none"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Ratio Shares (Separated by colons or spaces)</label>
                <input
                  type="text"
                  value={ratioPartsStr}
                  onChange={(e) => setRatioPartsStr(e.target.value)}
                  placeholder="e.g. 2 : 3 : 5"
                  className="w-full p-2.5 text-base font-mono font-semibold border border-slate-200 rounded-xl bg-slate-50/50 focus:bg-white focus:outline-none"
                />
              </div>
            </div>
          )}
        </div>

        {/* Right Output */}
        <div className="lg:col-span-6 space-y-4">
          <div className="bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white rounded-2xl p-6 shadow-md relative">
            {mode === 'solve' && (
              <div className="space-y-4">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-300">
                    Solved Proportional Equivalent
                  </span>
                  <div className="text-3xl sm:text-4xl font-black tracking-tight text-white mt-1 font-mono">
                    {solveResults.displayA} : {solveResults.displayB} = {solveResults.displayC} : {solveResults.displayD}
                  </div>
                  {solveResults.solvedVal !== null && (
                    <div className="text-xs font-medium text-orange-300 mt-1">
                      Solved {solveResults.solvedVar} = {formatNumber(solveResults.solvedVal, 4)}
                    </div>
                  )}
                </div>
              </div>
            )}

            {mode === 'simplify' && simplifyResults && (
              <div className="space-y-4">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-300">
                    Simplified Lowest Terms
                  </span>
                  <div className="text-4xl font-black tracking-tight text-white mt-1 font-mono">
                    {simplifyResults.reduced}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-3 border-t border-indigo-900/60 text-xs">
                  <div className="bg-white/10 rounded-xl p-3 backdrop-blur-xs">
                    <span className="text-[10px] text-slate-300 uppercase font-bold block">Decimal Value</span>
                    <span className="text-lg font-bold text-orange-300 font-mono">{simplifyResults.decimalRatio}</span>
                  </div>
                  <div className="bg-white/10 rounded-xl p-3 backdrop-blur-xs">
                    <span className="text-[10px] text-slate-300 uppercase font-bold block">Greatest Common Factor</span>
                    <span className="text-lg font-bold text-white font-mono">{simplifyResults.divisor}</span>
                  </div>
                </div>
              </div>
            )}

            {mode === 'divide' && divideResults && (
              <div className="space-y-4">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-300">
                    Proportional Shares Breakdown
                  </span>
                  <div className="space-y-2 mt-2">
                    {divideResults.shares.map((share, idx) => (
                      <div key={idx} className="flex items-center justify-between p-2.5 rounded-xl bg-white/10 text-xs">
                        <span className="font-bold text-white">Part {idx + 1} ({share.part} units / {share.percentage}%)</span>
                        <span className="font-bold text-orange-300 text-sm font-mono">{share.amount}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            <div className="flex items-center gap-2 pt-4 border-t border-indigo-900/60">
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
        </div>
      </div>
    </div>
  );
};
