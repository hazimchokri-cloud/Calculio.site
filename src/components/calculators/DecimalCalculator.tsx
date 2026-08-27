import React, { useState, useMemo } from 'react';
import { copyToClipboard } from '../../utils/formatters';
import { Divide, RefreshCw, Copy, Check, Bookmark, ArrowRightLeft } from 'lucide-react';

interface DecimalCalculatorProps {
  onSaveCalculation?: (summary: string, inputs: any, results: any) => void;
}

export const DecimalCalculator: React.FC<DecimalCalculatorProps> = ({ onSaveCalculation }) => {
  const [tab, setTab] = useState<'convert' | 'operations' | 'rounding'>('convert');

  // Conversion State
  const [decimalInput, setDecimalInput] = useState<string>('0.875');

  // Operations State
  const [num1, setNum1] = useState<string>('12.45');
  const [num2, setNum2] = useState<string>('3.2');
  const [op, setOp] = useState<'+' | '-' | '*' | '/'>('+');

  // Rounding State
  const [roundInput, setRoundInput] = useState<string>('14.85672');
  const [decimalPlaces, setDecimalPlaces] = useState<number>(2);

  const [copied, setCopied] = useState<boolean>(false);
  const [saved, setSaved] = useState<boolean>(false);

  // Greatest Common Divisor helper
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

  // Convert decimal to simplified fraction
  const decimalToFraction = (dec: number) => {
    if (isNaN(dec)) return { num: 0, den: 1, text: '0' };
    const str = dec.toString();
    const parts = str.split('.');
    if (parts.length === 1) {
      return { num: dec, den: 1, text: `${dec}/1` };
    }
    const decimalPlacesCount = parts[1].length;
    const denominator = Math.pow(10, decimalPlacesCount);
    const numerator = Math.round(dec * denominator);
    const divisor = gcd(numerator, denominator);
    const simpNum = numerator / divisor;
    const simpDen = denominator / divisor;
    return {
      num: simpNum,
      den: simpDen,
      text: `${simpNum}/${simpDen}`
    };
  };

  const conversionResults = useMemo(() => {
    const val = parseFloat(decimalInput);
    if (isNaN(val)) return null;

    const fraction = decimalToFraction(val);
    const percentage = `${(val * 100).toFixed(4).replace(/\.?0+$/, '')}%`;
    const scientific = val.toExponential();

    return {
      value: val,
      fraction: fraction.text,
      numerator: fraction.num,
      denominator: fraction.den,
      percentage,
      scientific
    };
  }, [decimalInput]);

  const operationResults = useMemo(() => {
    const a = parseFloat(num1);
    const b = parseFloat(num2);
    if (isNaN(a) || isNaN(b)) return null;

    let res = 0;
    if (op === '+') res = a + b;
    else if (op === '-') res = a - b;
    else if (op === '*') res = a * b;
    else if (op === '/') res = b !== 0 ? a / b : NaN;

    return {
      a,
      b,
      op,
      result: isNaN(res) ? 'Undefined (Division by zero)' : res.toString(),
      fraction: !isNaN(res) ? decimalToFraction(res).text : 'N/A'
    };
  }, [num1, num2, op]);

  const roundingResults = useMemo(() => {
    const val = parseFloat(roundInput);
    if (isNaN(val)) return null;

    const fixed = val.toFixed(decimalPlaces);
    const ceil = Math.ceil(val * Math.pow(10, decimalPlaces)) / Math.pow(10, decimalPlaces);
    const floor = Math.floor(val * Math.pow(10, decimalPlaces)) / Math.pow(10, decimalPlaces);
    const whole = Math.round(val);

    return {
      val,
      fixed,
      ceil: ceil.toFixed(decimalPlaces),
      floor: floor.toFixed(decimalPlaces),
      whole
    };
  }, [roundInput, decimalPlaces]);

  const handleCopy = async () => {
    let text = '';
    if (tab === 'convert' && conversionResults) {
      text = `Decimal Conversion (${conversionResults.value}):
Fraction: ${conversionResults.fraction}
Percentage: ${conversionResults.percentage}
Scientific: ${conversionResults.scientific}`;
    } else if (tab === 'operations' && operationResults) {
      text = `${operationResults.a} ${operationResults.op} ${operationResults.b} = ${operationResults.result} (Fraction: ${operationResults.fraction})`;
    } else if (tab === 'rounding' && roundingResults) {
      text = `Rounding ${roundingResults.val} to ${decimalPlaces} decimals: ${roundingResults.fixed} (Floor: ${roundingResults.floor}, Ceil: ${roundingResults.ceil})`;
    }

    const ok = await copyToClipboard(text);
    if (ok) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleSave = () => {
    if (!onSaveCalculation) return;
    if (tab === 'convert' && conversionResults) {
      onSaveCalculation(
        `Decimal ${conversionResults.value} = ${conversionResults.fraction} = ${conversionResults.percentage}`,
        { decimalInput },
        conversionResults
      );
    } else if (tab === 'operations' && operationResults) {
      onSaveCalculation(
        `${operationResults.a} ${operationResults.op} ${operationResults.b} = ${operationResults.result}`,
        { num1, num2, op },
        operationResults
      );
    }
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleReset = () => {
    setDecimalInput('0.875');
    setNum1('12.45');
    setNum2('3.2');
    setOp('+');
    setRoundInput('14.85672');
    setDecimalPlaces(2);
  };

  return (
    <div className="space-y-6">
      {/* Navigation Tabs */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex gap-2 p-1.5 bg-slate-200/60 rounded-2xl max-w-md">
          <button
            onClick={() => setTab('convert')}
            className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all ${
              tab === 'convert' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Convert Formats
          </button>
          <button
            onClick={() => setTab('operations')}
            className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all ${
              tab === 'operations' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600'
            }`}
          >
            Arithmetic
          </button>
          <button
            onClick={() => setTab('rounding')}
            className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all ${
              tab === 'rounding' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600'
            }`}
          >
            Rounding
          </button>
        </div>
        <button
          onClick={handleReset}
          className="text-xs font-semibold text-slate-600 hover:text-slate-900 px-3 py-1.5 rounded-xl border border-slate-200 hover:bg-slate-50 transition-colors"
        >
          Reset
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Inputs */}
        <div className="lg:col-span-6 bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-2xs space-y-4">
          {tab === 'convert' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <ArrowRightLeft className="w-4 h-4 text-blue-600" />
                  <span>Decimal to Fraction / %</span>
                </h2>
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Enter Decimal Number</label>
                <input
                  type="text"
                  value={decimalInput}
                  onChange={(e) => setDecimalInput(e.target.value)}
                  placeholder="e.g. 0.875 or 3.1415"
                  className="w-full p-3 text-lg font-mono font-semibold border border-slate-200 rounded-xl bg-slate-50/50 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
              <div className="flex flex-wrap gap-2 pt-1">
                {['0.125', '0.25', '0.333', '0.5', '0.625', '0.75', '0.875', '1.618'].map(v => (
                  <button
                    key={v}
                    type="button"
                    onClick={() => setDecimalInput(v)}
                    className="py-1 px-2 text-xs font-bold bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors"
                  >
                    {v}
                  </button>
                ))}
              </div>
            </div>
          )}

          {tab === 'operations' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <Divide className="w-4 h-4 text-blue-600" />
                  <span>Decimal Precision Arithmetic</span>
                </h2>
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">First Number</label>
                <input
                  type="text"
                  value={num1}
                  onChange={(e) => setNum1(e.target.value)}
                  className="w-full p-2.5 text-base font-mono font-semibold border border-slate-200 rounded-xl bg-slate-50/50 focus:bg-white focus:outline-none"
                />
              </div>
              <div className="grid grid-cols-4 gap-2">
                {[
                  { sym: '+', label: 'Add (+)' },
                  { sym: '-', label: 'Subtract (-)' },
                  { sym: '*', label: 'Multiply (×)' },
                  { sym: '/', label: 'Divide (÷)' }
                ].map(item => (
                  <button
                    key={item.sym}
                    type="button"
                    onClick={() => setOp(item.sym as any)}
                    className={`py-2 text-xs font-bold rounded-xl border transition-all ${
                      op === item.sym
                        ? 'bg-blue-600 text-white border-blue-600 shadow-2xs'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Second Number</label>
                <input
                  type="text"
                  value={num2}
                  onChange={(e) => setNum2(e.target.value)}
                  className="w-full p-2.5 text-base font-mono font-semibold border border-slate-200 rounded-xl bg-slate-50/50 focus:bg-white focus:outline-none"
                />
              </div>
            </div>
          )}

          {tab === 'rounding' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <RefreshCw className="w-4 h-4 text-blue-600" />
                  <span>Decimal Rounding Engine</span>
                </h2>
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Value to Round</label>
                <input
                  type="text"
                  value={roundInput}
                  onChange={(e) => setRoundInput(e.target.value)}
                  className="w-full p-2.5 text-base font-mono font-semibold border border-slate-200 rounded-xl bg-slate-50/50 focus:bg-white focus:outline-none"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 flex justify-between">
                  <span>Decimal Places</span>
                  <span className="text-blue-600 font-mono">{decimalPlaces} places</span>
                </label>
                <div className="grid grid-cols-5 gap-2">
                  {[0, 1, 2, 3, 4].map(dp => (
                    <button
                      key={dp}
                      type="button"
                      onClick={() => setDecimalPlaces(dp)}
                      className={`py-1.5 text-xs font-bold rounded-xl border transition-all ${
                        decimalPlaces === dp
                          ? 'bg-blue-600 text-white border-blue-600 shadow-2xs'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {dp}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Output */}
        <div className="lg:col-span-6 space-y-4">
          <div className="bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white rounded-2xl p-6 shadow-md relative">
            {tab === 'convert' && conversionResults && (
              <div className="space-y-4">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-blue-300">
                    Simplified Fraction
                  </span>
                  <div className="text-4xl font-black tracking-tight text-white mt-1 font-mono">
                    {conversionResults.fraction}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-3 border-t border-blue-900/60 text-xs">
                  <div className="bg-white/10 rounded-xl p-3 backdrop-blur-xs">
                    <span className="text-[10px] text-slate-300 uppercase font-bold block">Percentage</span>
                    <span className="text-lg font-bold text-orange-300 font-mono">{conversionResults.percentage}</span>
                  </div>
                  <div className="bg-white/10 rounded-xl p-3 backdrop-blur-xs">
                    <span className="text-[10px] text-slate-300 uppercase font-bold block">Scientific Notation</span>
                    <span className="text-lg font-bold text-white font-mono">{conversionResults.scientific}</span>
                  </div>
                </div>
              </div>
            )}

            {tab === 'operations' && operationResults && (
              <div className="space-y-4">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-blue-300">
                    Result ({operationResults.a} {operationResults.op} {operationResults.b})
                  </span>
                  <div className="text-3xl sm:text-4xl font-black tracking-tight text-white mt-1 font-mono">
                    {operationResults.result}
                  </div>
                </div>

                <div className="bg-white/10 rounded-xl p-3 backdrop-blur-xs text-xs">
                  <span className="text-[10px] text-slate-300 uppercase font-bold block">Equivalent Fraction</span>
                  <span className="text-lg font-bold text-orange-300 font-mono">{operationResults.fraction}</span>
                </div>
              </div>
            )}

            {tab === 'rounding' && roundingResults && (
              <div className="space-y-4">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-blue-300">
                    Standard Rounded Result
                  </span>
                  <div className="text-4xl font-black tracking-tight text-white mt-1 font-mono">
                    {roundingResults.fixed}
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 pt-3 border-t border-blue-900/60 text-xs">
                  <div className="bg-white/10 rounded-xl p-2.5">
                    <span className="text-[10px] text-slate-300 block">Round Down (Floor)</span>
                    <span className="font-bold font-mono text-white">{roundingResults.floor}</span>
                  </div>
                  <div className="bg-white/10 rounded-xl p-2.5">
                    <span className="text-[10px] text-slate-300 block">Round Up (Ceil)</span>
                    <span className="font-bold font-mono text-white">{roundingResults.ceil}</span>
                  </div>
                  <div className="bg-white/10 rounded-xl p-2.5">
                    <span className="text-[10px] text-slate-300 block">Nearest Integer</span>
                    <span className="font-bold font-mono text-white">{roundingResults.whole}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex items-center gap-2 pt-4 border-t border-blue-900/60">
              <button
                onClick={handleCopy}
                className="flex-1 py-2 px-3 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-bold text-white flex items-center justify-center gap-1.5 transition-colors border border-white/10"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-orange-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied' : 'Copy Results'}</span>
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
