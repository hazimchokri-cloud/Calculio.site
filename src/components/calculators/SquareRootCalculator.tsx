import React, { useState, useMemo } from 'react';
import { copyToClipboard, formatNumber } from '../../utils/formatters';
import { Radical, Copy, Check, Bookmark } from 'lucide-react';

interface SquareRootCalculatorProps {
  onSaveCalculation?: (summary: string, inputs: any, results: any) => void;
}

export const SquareRootCalculator: React.FC<SquareRootCalculatorProps> = ({ onSaveCalculation }) => {
  const [radicand, setRadicand] = useState<number | ''>(72);
  const [rootDegree, setRootDegree] = useState<number | ''>(2); // 2 = square root, 3 = cube root, etc.

  const [copied, setCopied] = useState<boolean>(false);
  const [saved, setSaved] = useState<boolean>(false);

  // Simplify square root: √x = a√b
  const simplifySquareRoot = (n: number) => {
    if (!Number.isInteger(n) || n <= 0) return null;
    let outside = 1;
    let inside = n;
    let d = 2;
    while (d * d <= inside) {
      if (inside % (d * d) === 0) {
        outside *= d;
        inside /= d * d;
      } else {
        d++;
      }
    }
    return {
      outside,
      inside,
      simplifiedText: outside === 1 ? `√${inside}` : inside === 1 ? `${outside}` : `${outside}√${inside}`
    };
  };

  const rootResults = useMemo(() => {
    if (radicand === '' || rootDegree === '' || typeof radicand !== 'number' || typeof rootDegree !== 'number' || rootDegree <= 0) return null;

    let result: number | null = null;
    let isImaginary = false;

    if (radicand < 0 && rootDegree % 2 === 0) {
      isImaginary = true;
    } else if (radicand < 0 && rootDegree % 2 !== 0) {
      result = -Math.pow(-radicand, 1 / rootDegree);
    } else {
      result = Math.pow(radicand, 1 / rootDegree);
    }

    const isPerfect = result !== null && Number.isInteger(result);
    const simplifiedRadical = rootDegree === 2 && radicand > 0 ? simplifySquareRoot(radicand) : null;

    return {
      radicand,
      rootDegree,
      result,
      isImaginary,
      isPerfect,
      simplifiedRadical
    };
  }, [radicand, rootDegree]);

  const handleCopy = async () => {
    if (!rootResults) return;
    const text = rootResults.isImaginary 
      ? `Root of negative number with even degree is imaginary.`
      : `Root degree ${rootResults.rootDegree} of ${rootResults.radicand} = ${rootResults.result}`;
    const ok = await copyToClipboard(text);
    if (ok) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleSave = () => {
    if (!onSaveCalculation || !rootResults || rootResults.result === null) return;
    onSaveCalculation(
      `${rootDegree === 2 ? '√' : `${rootDegree}√`}${radicand} = ${formatNumber(rootResults.result, 4)}`,
      { radicand, rootDegree },
      rootResults
    );
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleReset = () => {
    setRadicand(72);
    setRootDegree(2);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Inputs */}
        <div className="lg:col-span-6 bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-2xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <span className="text-xl font-bold font-mono text-cyan-600">√</span>
              <span>Radical Input</span>
            </h2>
            <button
              onClick={handleReset}
              className="text-xs font-semibold text-slate-600 hover:text-slate-900 px-2.5 py-1 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors"
            >
              Reset
            </button>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">Root Degree (n)</label>
              <input
                type="number"
                min="1"
                max="100"
                value={rootDegree}
                onChange={(e) => setRootDegree(e.target.value === '' ? '' : parseInt(e.target.value))}
                className="w-full p-2.5 text-base font-mono font-semibold border border-slate-200 rounded-xl bg-slate-50/50 focus:bg-white focus:outline-none"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">Radicand Number (x)</label>
              <input
                type="number"
                step="any"
                value={radicand}
                onChange={(e) => setRadicand(e.target.value === '' ? '' : parseFloat(e.target.value))}
                className="w-full p-2.5 text-base font-mono font-semibold border border-slate-200 rounded-xl bg-slate-50/50 focus:bg-white focus:outline-none"
              />
            </div>
          </div>

          <div className="space-y-2 pt-2">
            <label className="text-xs font-bold text-slate-700">Quick Roots</label>
            <div className="flex flex-wrap gap-2">
              {[
                { label: '√2 (1.414)', d: 2, x: 2 },
                { label: '√3 (1.732)', d: 2, x: 3 },
                { label: '√144 (12)', d: 2, x: 144 },
                { label: '∛27 (3)', d: 3, x: 27 },
                { label: '∛125 (5)', d: 3, x: 125 },
                { label: '⁴√16 (2)', d: 4, x: 16 }
              ].map(preset => (
                <button
                  key={preset.label}
                  type="button"
                  onClick={() => {
                    setRootDegree(preset.d);
                    setRadicand(preset.x);
                  }}
                  className="py-1 px-2.5 text-xs font-bold bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors"
                >
                  {preset.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Output */}
        <div className="lg:col-span-6 space-y-4">
          <div className="bg-gradient-to-br from-slate-900 via-cyan-950 to-slate-900 text-white rounded-2xl p-6 shadow-md relative">
            {rootResults ? (
              <div className="space-y-4">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-cyan-300">
                    Principal Root Value
                  </span>
                  <div className="text-3xl sm:text-4xl font-black tracking-tight text-white mt-1 font-mono">
                    {rootResults.isImaginary ? 'Imaginary (Complex)' : formatNumber(rootResults.result || 0, 8)}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-3 border-t border-cyan-900/60 text-xs">
                  {rootResults.simplifiedRadical && (
                    <div className="bg-white/10 rounded-xl p-3 backdrop-blur-xs">
                      <span className="text-[10px] text-slate-300 uppercase font-bold block">Simplified Radical</span>
                      <span className="text-lg font-bold text-cyan-300 font-mono">{rootResults.simplifiedRadical.simplifiedText}</span>
                    </div>
                  )}
                  <div className="bg-white/10 rounded-xl p-3 backdrop-blur-xs">
                    <span className="text-[10px] text-slate-300 uppercase font-bold block">Perfect Root?</span>
                    <span className="text-lg font-bold text-orange-300 font-mono">
                      {rootResults.isPerfect ? 'Yes (Integer)' : 'No (Irrational)'}
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="py-8 text-center space-y-2">
                <p className="text-amber-300 font-semibold text-sm">Please enter a value.</p>
                <p className="text-slate-400 text-xs">Enter a valid radicand and root degree.</p>
              </div>
            )}

            <div className="flex items-center gap-2 pt-4 border-t border-cyan-900/60">
              <button
                onClick={handleCopy}
                className="flex-1 py-2 px-3 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-bold text-white flex items-center justify-center gap-1.5 transition-colors border border-white/10"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-orange-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied' : 'Copy Root'}</span>
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
