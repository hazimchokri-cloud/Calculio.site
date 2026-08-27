import React, { useState, useEffect, useCallback } from 'react';
import { Calculator, Delete, RotateCcw, Copy, Check, Clock, ShieldCheck } from 'lucide-react';
import { copyToClipboard } from '../../utils/formatters';

interface ScientificCalculatorProps {
  onSaveCalculation?: (summary: string, inputs: any, results: any) => void;
}

export const ScientificCalculator: React.FC<ScientificCalculatorProps> = ({ onSaveCalculation }) => {
  const [display, setDisplay] = useState<string>('0');
  const [expression, setExpression] = useState<string>('');
  const [isRad, setIsRad] = useState<boolean>(false);
  const [isInv, setIsInv] = useState<boolean>(false);
  const [memory, setMemory] = useState<number>(0);
  const [history, setHistory] = useState<string[]>([]);
  const [copied, setCopied] = useState<boolean>(false);
  const [justCalculated, setJustCalculated] = useState<boolean>(false);

  // Helper for factorial
  const factorial = (n: number): number => {
    if (n < 0 || !Number.isInteger(n)) return NaN;
    if (n === 0 || n === 1) return 1;
    let res = 1;
    for (let i = 2; i <= Math.min(n, 170); i++) res *= i;
    return res;
  };

  const handleDigit = (digit: string) => {
    if (display === '0' || display === 'Error' || justCalculated) {
      setDisplay(digit);
      setJustCalculated(false);
    } else {
      setDisplay(display + digit);
    }
  };

  const handleDecimal = () => {
    if (justCalculated) {
      setDisplay('0.');
      setJustCalculated(false);
    } else if (!display.includes('.')) {
      setDisplay(display + '.');
    }
  };

  const handleOperator = (op: string) => {
    setExpression(`${display} ${op} `);
    setDisplay('0');
    setJustCalculated(false);
  };

  const handleClear = () => {
    setDisplay('0');
    setExpression('');
    setJustCalculated(false);
  };

  const handleBackspace = () => {
    if (display === 'Error' || display.length <= 1) {
      setDisplay('0');
    } else {
      setDisplay(display.slice(0, -1));
    }
  };

  const handleToggleSign = () => {
    if (display !== '0' && display !== 'Error') {
      if (display.startsWith('-')) {
        setDisplay(display.substring(1));
      } else {
        setDisplay('-' + display);
      }
    }
  };

  const handleScientificFunction = (fn: string) => {
    const val = parseFloat(display);
    if (isNaN(val)) return;

    let res = 0;
    const angleMultiplier = isRad ? 1 : Math.PI / 180;
    const invAngleMultiplier = isRad ? 1 : 180 / Math.PI;

    switch (fn) {
      case 'sin':
        res = !isInv ? Math.sin(val * angleMultiplier) : Math.asin(val) * invAngleMultiplier;
        break;
      case 'cos':
        res = !isInv ? Math.cos(val * angleMultiplier) : Math.acos(val) * invAngleMultiplier;
        break;
      case 'tan':
        res = !isInv ? Math.tan(val * angleMultiplier) : Math.atan(val) * invAngleMultiplier;
        break;
      case 'sqrt':
        res = Math.sqrt(val);
        break;
      case 'cbrt':
        res = Math.cbrt(val);
        break;
      case 'sqr':
        res = val * val;
        break;
      case 'cube':
        res = val * val * val;
        break;
      case 'inv':
        res = 1 / val;
        break;
      case 'ln':
        res = Math.log(val);
        break;
      case 'log':
        res = Math.log10(val);
        break;
      case 'exp':
        res = Math.exp(val);
        break;
      case 'fact':
        res = factorial(val);
        break;
      case 'percent':
        res = val / 100;
        break;
      case 'pi':
        res = Math.PI;
        break;
      case 'e':
        res = Math.E;
        break;
      default:
        return;
    }

    if (isNaN(res) || !isFinite(res)) {
      setDisplay('Error');
    } else {
      const formatted = Number(res.toFixed(10)).toString();
      setDisplay(formatted);
      setHistory(prev => [`${fn}(${val}) = ${formatted}`, ...prev.slice(0, 19)]);
    }
    setJustCalculated(true);
  };

  const handleEqual = () => {
    if (!expression) return;
    try {
      const fullExpr = expression + display;
      // Sanitize expression for safe eval of basic math
      const sanitized = fullExpr
        .replace(/×/g, '*')
        .replace(/÷/g, '/')
        .replace(/\^/g, '**');

      // Check if expression is only numbers and safe math operators
      if (!/^[0-9+\-*/().\s**]+$/.test(sanitized)) {
        setDisplay('Error');
        return;
      }

      // Safe evaluation
      const computed = Function(`"use strict"; return (${sanitized})`)();
      if (isNaN(computed) || !isFinite(computed)) {
        setDisplay('Error');
      } else {
        const formatted = Number(computed.toFixed(10)).toString();
        const historyEntry = `${fullExpr} = ${formatted}`;
        setHistory(prev => [historyEntry, ...prev.slice(0, 19)]);
        setDisplay(formatted);
        setExpression('');
        setJustCalculated(true);
      }
    } catch {
      setDisplay('Error');
    }
  };

  // Keyboard support
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if user is typing in an input field elsewhere
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) return;

      if (e.key >= '0' && e.key <= '9') {
        handleDigit(e.key);
      } else if (e.key === '.') {
        handleDecimal();
      } else if (e.key === '+' || e.key === '-') {
        handleOperator(e.key);
      } else if (e.key === '*') {
        handleOperator('×');
      } else if (e.key === '/') {
        handleOperator('÷');
      } else if (e.key === 'Enter' || e.key === '=') {
        e.preventDefault();
        handleEqual();
      } else if (e.key === 'Backspace') {
        handleBackspace();
      } else if (e.key === 'Escape') {
        handleClear();
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [display, expression, justCalculated]);

  const handleCopy = async () => {
    const ok = await copyToClipboard(display);
    if (ok) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Calculator Main Body */}
        <div className="lg:col-span-8 bg-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-800 space-y-6">
          
          {/* LCD Display */}
          <div className="bg-slate-950/80 rounded-2xl p-5 sm:p-6 border border-slate-800 shadow-inner flex flex-col justify-end min-h-[120px] text-right">
            <div className="text-slate-400 text-xs sm:text-sm font-mono-numbers h-6 truncate">
              {expression || ' '}
            </div>
            <div className="flex items-center justify-between mt-2">
              <span className="text-[11px] font-bold tracking-wider px-2 py-0.5 rounded bg-slate-800 text-slate-400">
                {isRad ? 'RAD' : 'DEG'}
              </span>
              <div className="text-3xl sm:text-5xl font-black font-mono-numbers tracking-tight text-white truncate max-w-full">
                {display}
              </div>
            </div>
          </div>

          {/* Top Mode Bar */}
          <div className="flex items-center justify-between gap-2 border-b border-slate-800 pb-3 text-xs font-semibold">
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => setIsRad(!isRad)}
                className={`px-3 py-1 rounded-lg border transition-all ${
                  isRad ? 'bg-indigo-600 border-indigo-500 text-white' : 'bg-slate-800 border-slate-700 text-slate-300'
                }`}
              >
                {isRad ? 'Rad' : 'Deg'}
              </button>
              <button
                type="button"
                onClick={() => setIsInv(!isInv)}
                className={`px-3 py-1 rounded-lg border transition-all ${
                  isInv ? 'bg-amber-600 border-amber-500 text-white' : 'bg-slate-800 border-slate-700 text-slate-300'
                }`}
              >
                Inv
              </button>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => setMemory(0)}
                className="px-2.5 py-1 rounded bg-slate-800/80 hover:bg-slate-700 text-slate-300 text-[11px]"
              >
                MC
              </button>
              <button
                type="button"
                onClick={() => setDisplay(memory.toString())}
                className="px-2.5 py-1 rounded bg-slate-800/80 hover:bg-slate-700 text-slate-300 text-[11px]"
              >
                MR
              </button>
              <button
                type="button"
                onClick={() => setMemory(m => m + parseFloat(display || '0'))}
                className="px-2.5 py-1 rounded bg-slate-800/80 hover:bg-slate-700 text-slate-300 text-[11px]"
              >
                M+
              </button>
              <button
                type="button"
                onClick={() => setMemory(m => m - parseFloat(display || '0'))}
                className="px-2.5 py-1 rounded bg-slate-800/80 hover:bg-slate-700 text-slate-300 text-[11px]"
              >
                M-
              </button>
            </div>
          </div>

          {/* Keypad Grid */}
          <div className="grid grid-cols-5 sm:grid-cols-6 gap-2 sm:gap-2.5 text-sm sm:text-base font-semibold">
            {/* Row 1 */}
            <button
              onClick={() => handleScientificFunction('sin')}
              className="py-3 bg-slate-800 hover:bg-slate-700 active:scale-95 text-indigo-300 rounded-xl transition-all"
            >
              {isInv ? 'sin⁻¹' : 'sin'}
            </button>
            <button
              onClick={() => handleScientificFunction('cos')}
              className="py-3 bg-slate-800 hover:bg-slate-700 active:scale-95 text-indigo-300 rounded-xl transition-all"
            >
              {isInv ? 'cos⁻¹' : 'cos'}
            </button>
            <button
              onClick={() => handleScientificFunction('tan')}
              className="py-3 bg-slate-800 hover:bg-slate-700 active:scale-95 text-indigo-300 rounded-xl transition-all"
            >
              {isInv ? 'tan⁻¹' : 'tan'}
            </button>
            <button
              onClick={() => handleScientificFunction('ln')}
              className="py-3 bg-slate-800 hover:bg-slate-700 active:scale-95 text-indigo-300 rounded-xl transition-all"
            >
              ln
            </button>
            <button
              onClick={() => handleScientificFunction('log')}
              className="py-3 bg-slate-800 hover:bg-slate-700 active:scale-95 text-indigo-300 rounded-xl transition-all"
            >
              log
            </button>
            <button
              onClick={handleClear}
              className="py-3 bg-rose-600/30 text-rose-300 border border-rose-500/40 hover:bg-rose-600/50 active:scale-95 rounded-xl transition-all font-bold"
            >
              AC
            </button>

            {/* Row 2 */}
            <button
              onClick={() => handleScientificFunction('pi')}
              className="py-3 bg-slate-800 hover:bg-slate-700 active:scale-95 text-indigo-300 rounded-xl transition-all"
            >
              π
            </button>
            <button
              onClick={() => handleScientificFunction('e')}
              className="py-3 bg-slate-800 hover:bg-slate-700 active:scale-95 text-indigo-300 rounded-xl transition-all"
            >
              e
            </button>
            <button
              onClick={() => handleScientificFunction('sqrt')}
              className="py-3 bg-slate-800 hover:bg-slate-700 active:scale-95 text-indigo-300 rounded-xl transition-all"
            >
              √x
            </button>
            <button
              onClick={() => handleScientificFunction('sqr')}
              className="py-3 bg-slate-800 hover:bg-slate-700 active:scale-95 text-indigo-300 rounded-xl transition-all"
            >
              x²
            </button>
            <button
              onClick={() => handleScientificFunction('fact')}
              className="py-3 bg-slate-800 hover:bg-slate-700 active:scale-95 text-indigo-300 rounded-xl transition-all"
            >
              x!
            </button>
            <button
              onClick={handleBackspace}
              className="py-3 bg-slate-800 hover:bg-slate-700 text-slate-300 active:scale-95 rounded-xl transition-all flex items-center justify-center"
            >
              <Delete className="w-5 h-5" />
            </button>

            {/* Row 3 */}
            <button
              onClick={() => handleScientificFunction('inv')}
              className="py-3 bg-slate-800 hover:bg-slate-700 active:scale-95 text-indigo-300 rounded-xl transition-all"
            >
              1/x
            </button>
            <button
              onClick={() => handleDigit('7')}
              className="py-3 bg-slate-700/80 hover:bg-slate-600 active:scale-95 text-white rounded-xl transition-all font-mono-numbers text-lg"
            >
              7
            </button>
            <button
              onClick={() => handleDigit('8')}
              className="py-3 bg-slate-700/80 hover:bg-slate-600 active:scale-95 text-white rounded-xl transition-all font-mono-numbers text-lg"
            >
              8
            </button>
            <button
              onClick={() => handleDigit('9')}
              className="py-3 bg-slate-700/80 hover:bg-slate-600 active:scale-95 text-white rounded-xl transition-all font-mono-numbers text-lg"
            >
              9
            </button>
            <button
              onClick={() => handleOperator('÷')}
              className="py-3 bg-amber-600/30 text-amber-300 border border-amber-500/40 hover:bg-amber-600/50 active:scale-95 rounded-xl transition-all text-xl"
            >
              ÷
            </button>
            <button
              onClick={() => handleScientificFunction('percent')}
              className="py-3 bg-slate-800 hover:bg-slate-700 active:scale-95 text-indigo-300 rounded-xl transition-all"
            >
              %
            </button>

            {/* Row 4 */}
            <button
              onClick={() => handleScientificFunction('exp')}
              className="py-3 bg-slate-800 hover:bg-slate-700 active:scale-95 text-indigo-300 rounded-xl transition-all"
            >
              eˣ
            </button>
            <button
              onClick={() => handleDigit('4')}
              className="py-3 bg-slate-700/80 hover:bg-slate-600 active:scale-95 text-white rounded-xl transition-all font-mono-numbers text-lg"
            >
              4
            </button>
            <button
              onClick={() => handleDigit('5')}
              className="py-3 bg-slate-700/80 hover:bg-slate-600 active:scale-95 text-white rounded-xl transition-all font-mono-numbers text-lg"
            >
              5
            </button>
            <button
              onClick={() => handleDigit('6')}
              className="py-3 bg-slate-700/80 hover:bg-slate-600 active:scale-95 text-white rounded-xl transition-all font-mono-numbers text-lg"
            >
              6
            </button>
            <button
              onClick={() => handleOperator('×')}
              className="py-3 bg-amber-600/30 text-amber-300 border border-amber-500/40 hover:bg-amber-600/50 active:scale-95 rounded-xl transition-all text-xl"
            >
              ×
            </button>
            <button
              onClick={() => handleOperator('^')}
              className="py-3 bg-slate-800 hover:bg-slate-700 active:scale-95 text-indigo-300 rounded-xl transition-all"
            >
              xʸ
            </button>

            {/* Row 5 */}
            <button
              onClick={handleToggleSign}
              className="py-3 bg-slate-800 hover:bg-slate-700 active:scale-95 text-slate-300 rounded-xl transition-all"
            >
              ±
            </button>
            <button
              onClick={() => handleDigit('1')}
              className="py-3 bg-slate-700/80 hover:bg-slate-600 active:scale-95 text-white rounded-xl transition-all font-mono-numbers text-lg"
            >
              1
            </button>
            <button
              onClick={() => handleDigit('2')}
              className="py-3 bg-slate-700/80 hover:bg-slate-600 active:scale-95 text-white rounded-xl transition-all font-mono-numbers text-lg"
            >
              2
            </button>
            <button
              onClick={() => handleDigit('3')}
              className="py-3 bg-slate-700/80 hover:bg-slate-600 active:scale-95 text-white rounded-xl transition-all font-mono-numbers text-lg"
            >
              3
            </button>
            <button
              onClick={() => handleOperator('-')}
              className="py-3 bg-amber-600/30 text-amber-300 border border-amber-500/40 hover:bg-amber-600/50 active:scale-95 rounded-xl transition-all text-xl"
            >
              −
            </button>
            <button
              onClick={() => handleScientificFunction('cube')}
              className="py-3 bg-slate-800 hover:bg-slate-700 active:scale-95 text-indigo-300 rounded-xl transition-all"
            >
              x³
            </button>

            {/* Row 6 */}
            <button
              onClick={() => handleDigit('(')}
              className="py-3 bg-slate-800 hover:bg-slate-700 active:scale-95 text-slate-300 rounded-xl transition-all"
            >
              (
            </button>
            <button
              onClick={() => handleDigit('0')}
              className="py-3 bg-slate-700/80 hover:bg-slate-600 active:scale-95 text-white rounded-xl transition-all font-mono-numbers text-lg"
            >
              0
            </button>
            <button
              onClick={handleDecimal}
              className="py-3 bg-slate-700/80 hover:bg-slate-600 active:scale-95 text-white rounded-xl transition-all font-mono-numbers text-lg"
            >
              .
            </button>
            <button
              onClick={handleEqual}
              className="py-3 bg-orange-600 hover:bg-orange-500 active:scale-95 text-white rounded-xl transition-all font-black text-xl shadow-md col-span-2"
            >
              =
            </button>
            <button
              onClick={() => handleOperator('+')}
              className="py-3 bg-amber-600/30 text-amber-300 border border-amber-500/40 hover:bg-amber-600/50 active:scale-95 rounded-xl transition-all text-xl"
            >
              +
            </button>
          </div>
        </div>

        {/* History Tape & Quick Functions */}
        <div className="lg:col-span-4 bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-indigo-600" />
              <h3 className="text-sm font-bold text-slate-900">Calculation Tape</h3>
            </div>
            {history.length > 0 && (
              <button
                onClick={() => setHistory([])}
                className="text-[11px] text-slate-700 hover:text-slate-900"
              >
                Clear
              </button>
            )}
          </div>

          {history.length === 0 ? (
            <div className="py-12 text-center text-xs text-slate-700 space-y-1">
              <Calculator className="w-8 h-8 mx-auto text-slate-300 mb-2" />
              <p>Your calculation history will appear here.</p>
              <p className="text-[11px]">Supports full keyboard input & shortcuts.</p>
            </div>
          ) : (
            <div className="space-y-2 max-h-96 overflow-y-auto pr-1">
              {history.map((entry, idx) => (
                <div
                  key={idx}
                  onClick={() => {
                    const parts = entry.split('=');
                    if (parts[1]) setDisplay(parts[1].trim());
                  }}
                  className="p-2.5 rounded-xl bg-slate-50 hover:bg-indigo-50/60 border border-slate-200/60 cursor-pointer text-xs font-mono-numbers text-slate-700 transition-colors group flex items-center justify-between"
                  title="Click to load result"
                >
                  <span className="truncate">{entry}</span>
                  <span className="opacity-0 group-hover:opacity-100 text-[10px] font-sans text-indigo-600 font-bold shrink-0 ml-2">
                    Use
                  </span>
                </div>
              ))}
            </div>
          )}

          <div className="pt-2 border-t border-slate-100">
            <button
              onClick={handleCopy}
              className="w-full flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-semibold transition-all"
            >
              {copied ? <Check className="w-4 h-4 text-orange-600" /> : <Copy className="w-4 h-4 text-slate-700" />}
              {copied ? 'Result Copied!' : 'Copy Current Result'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
