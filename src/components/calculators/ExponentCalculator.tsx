import React, { useState, useMemo } from 'react';
import { copyToClipboard, formatNumber } from '../../utils/formatters';
import { Zap, Copy, Check, Bookmark, BookOpen } from 'lucide-react';

interface ExponentCalculatorProps {
  onSaveCalculation?: (summary: string, inputs: any, results: any) => void;
}

export const ExponentCalculator: React.FC<ExponentCalculatorProps> = ({ onSaveCalculation }) => {
  const [base, setBase] = useState<number | ''>(2);
  const [exponent, setExponent] = useState<number | ''>(10);

  const [copied, setCopied] = useState<boolean>(false);
  const [saved, setSaved] = useState<boolean>(false);

  const exponentResults = useMemo(() => {
    try {
      if (base === '' || exponent === '' || typeof base !== 'number' || typeof exponent !== 'number') return null;

      // Evaluate base ^ exponent
      let result = Math.pow(base, exponent);
      let isInfinite = !isFinite(result);
      let isNanResult = isNaN(result);

      let scientific = !isInfinite && !isNanResult ? result.toExponential() : 'N/A';
      let formattedResult = !isInfinite && !isNanResult 
        ? (Math.abs(result) > 1e12 || (Math.abs(result) < 1e-6 && result !== 0) ? scientific : formatNumber(result, 6)) 
        : 'Overflow / Undefined';

      // Step explanation
      let stepExplanation = '';
      if (exponent === 0) {
        stepExplanation = `Any non-zero number raised to the power of 0 equals 1. (a⁰ = 1)`;
      } else if (exponent === 1) {
        stepExplanation = `Any number raised to the power of 1 equals itself. (a¹ = a)`;
      } else if (exponent < 0) {
        stepExplanation = `${base}^(${exponent}) = 1 / (${base}^${Math.abs(exponent)}) = 1 / ${Math.pow(base, Math.abs(exponent))}`;
      } else if (Number.isInteger(exponent) && exponent > 0 && exponent <= 10) {
        stepExplanation = `${Array(exponent).fill(base).join(' × ')} = ${result}`;
      } else if (!Number.isInteger(exponent)) {
        stepExplanation = `Fractional exponent: ${base}^(${exponent}) corresponds to radical calculation.`;
      }

      return {
        base,
        exponent,
        result,
        formattedResult,
        scientific,
        isInfinite,
        isNanResult,
        stepExplanation
      };
    } catch {
      return null;
    }
  }, [base, exponent]);

  const handleCopy = async () => {
    if (!exponentResults) return;
    const text = `${exponentResults.base}^${exponentResults.exponent} = ${exponentResults.formattedResult} (Scientific: ${exponentResults.scientific})`;
    const ok = await copyToClipboard(text);
    if (ok) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleSave = () => {
    if (!onSaveCalculation || !exponentResults) return;
    onSaveCalculation(
      `${exponentResults.base}^${exponentResults.exponent} = ${exponentResults.formattedResult}`,
      { base, exponent },
      exponentResults
    );
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Inputs */}
        <div className="lg:col-span-6 bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-2xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Zap className="w-4 h-4 text-amber-500" />
              <span>Base and Exponent Power</span>
            </h2>
            <button
              type="button"
              onClick={() => {
                setBase(2);
                setExponent(10);
              }}
              className="text-xs font-semibold text-slate-600 hover:text-slate-900 px-2.5 py-1 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors"
            >
              Reset
            </button>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">Base Number (a)</label>
              <input
                type="number"
                step="any"
                value={base}
                onChange={(e) => setBase(e.target.value === '' ? '' : parseFloat(e.target.value))}
                className="w-full p-2.5 text-base font-mono font-semibold border border-slate-200 rounded-xl bg-slate-50/50 focus:bg-white focus:outline-none"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">Exponent / Power (n)</label>
              <input
                type="number"
                step="any"
                value={exponent}
                onChange={(e) => setExponent(e.target.value === '' ? '' : parseFloat(e.target.value))}
                className="w-full p-2.5 text-base font-mono font-semibold border border-slate-200 rounded-xl bg-slate-50/50 focus:bg-white focus:outline-none"
              />
            </div>
          </div>

          <div className="space-y-2 pt-2">
            <label className="text-xs font-bold text-slate-700">Common Presets</label>
            <div className="flex flex-wrap gap-2">
              {[
                { label: '2¹⁰ (1,024)', b: 2, e: 10 },
                { label: '2³² (4.29B)', b: 2, e: 32 },
                { label: '10⁶ (1 Million)', b: 10, e: 6 },
                { label: '5³ (125)', b: 5, e: 3 },
                { label: '2⁻³ (0.125)', b: 2, e: -3 },
                { label: '9^0.5 (√9 = 3)', b: 9, e: 0.5 }
              ].map(preset => (
                <button
                  key={preset.label}
                  type="button"
                  onClick={() => {
                    setBase(preset.b);
                    setExponent(preset.e);
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
          {exponentResults ? (
            <div className="bg-gradient-to-br from-slate-900 via-amber-950 to-slate-900 text-white rounded-2xl p-6 shadow-md relative">
              <div className="space-y-4">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-amber-300">
                    Result ({exponentResults.base}<sup>{exponentResults.exponent}</sup>)
                  </span>
                  <div className="text-3xl sm:text-4xl font-black tracking-tight text-white mt-1 font-mono break-all">
                    {exponentResults.formattedResult}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-3 border-t border-amber-900/60 text-xs">
                  <div className="bg-white/10 rounded-xl p-3 backdrop-blur-xs">
                    <span className="text-[10px] text-slate-300 uppercase font-bold block">Scientific Notation</span>
                    <span className="text-base font-bold text-white font-mono">{exponentResults.scientific}</span>
                  </div>
                  <div className="bg-white/10 rounded-xl p-3 backdrop-blur-xs">
                    <span className="text-[10px] text-slate-300 uppercase font-bold block">Power Property</span>
                    <span className="text-xs font-bold text-amber-300">{exponentResults.stepExplanation}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-4 border-t border-amber-900/60">
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
          ) : (
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 text-center text-slate-500 text-sm">
              Please enter a valid base number and exponent to calculate powers and scientific notation.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
