import React, { useState, useMemo } from 'react';
import { Cpu, Zap, Activity, RotateCcw, Copy, Check, Info } from 'lucide-react';
import { copyToClipboard } from '../../utils/formatters';

interface OhmsLawCalculatorProps {
  onSave?: (summary: string, inputs: any, results: any) => void;
}

export const OhmsLawCalculator: React.FC<OhmsLawCalculatorProps> = ({
  onSave
}) => {
  // Two known parameters will calculate the other two
  const [voltage, setVoltage] = useState<string>('12'); // Volts (V)
  const [current, setCurrent] = useState<string>('2'); // Amperes (I / A)
  const [resistance, setResistance] = useState<string>(''); // Ohms (R / Ω)
  const [power, setPower] = useState<string>(''); // Watts (P / W)

  const [copied, setCopied] = useState(false);

  const results = useMemo(() => {
    const v = voltage.trim() === '' ? null : parseFloat(voltage);
    const i = current.trim() === '' ? null : parseFloat(current);
    const r = resistance.trim() === '' ? null : parseFloat(resistance);
    const p = power.trim() === '' ? null : parseFloat(power);

    const validV = v !== null && !isNaN(v) && v > 0;
    const validI = i !== null && !isNaN(i) && i > 0;
    const validR = r !== null && !isNaN(r) && r > 0;
    const validP = p !== null && !isNaN(p) && p > 0;

    const count = [validV, validI, validR, validP].filter(Boolean).length;
    if (count < 2) {
      return null;
    }

    let calcV = validV ? v : null;
    let calcI = validI ? i : null;
    let calcR = validR ? r : null;
    let calcP = validP ? p : null;

    // Case 1: V and I known
    if (calcV !== null && calcI !== null && calcI !== 0) {
      calcR = calcV / calcI;
      calcP = calcV * calcI;
    }
    // Case 2: V and R known
    else if (calcV !== null && calcR !== null && calcR !== 0) {
      calcI = calcV / calcR;
      calcP = Math.pow(calcV, 2) / calcR;
    }
    // Case 3: V and P known
    else if (calcV !== null && calcP !== null && calcV !== 0) {
      calcI = calcP / calcV;
      calcR = Math.pow(calcV, 2) / calcP;
    }
    // Case 4: I and R known
    else if (calcI !== null && calcR !== null) {
      calcV = calcI * calcR;
      calcP = Math.pow(calcI, 2) * calcR;
    }
    // Case 5: I and P known
    else if (calcI !== null && calcP !== null && calcI !== 0) {
      calcV = calcP / calcI;
      calcR = calcP / Math.pow(calcI, 2);
    }
    // Case 6: R and P known
    else if (calcR !== null && calcP !== null && calcR !== 0) {
      calcV = Math.sqrt(calcP * calcR);
      calcI = Math.sqrt(calcP / calcR);
    }

    return {
      voltage: calcV !== null ? Math.round(calcV * 1000) / 1000 : 0,
      current: calcI !== null ? Math.round(calcI * 1000) / 1000 : 0,
      resistance: calcR !== null ? Math.round(calcR * 1000) / 1000 : 0,
      power: calcP !== null ? Math.round(calcP * 1000) / 1000 : 0
    };
  }, [voltage, current, resistance, power]);

  const handleCopy = () => {
    if (!results) return;
    const text = `Ohm's Law Calculation:
Voltage (V): ${results.voltage} V
Current (I): ${results.current} A
Resistance (R): ${results.resistance} Ω
Power (P): ${results.power} W`;
    copyToClipboard(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReset = () => {
    setVoltage('12');
    setCurrent('2');
    setResistance('');
    setPower('');
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
              <Cpu className="w-4 h-4 text-violet-600" />
              <span>Ohm's Law & Electrical Power Engine</span>
            </h4>
            <p className="text-[11px] text-slate-500 mt-0.5">Enter any 2 values to calculate the remaining 2 variables.</p>
          </div>
          <button
            type="button"
            onClick={handleReset}
            className="text-xs font-bold text-violet-700 hover:text-violet-900 flex items-center gap-1 self-start"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Inputs</span>
          </button>
        </div>

        {/* 4 Inputs in a grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-black text-slate-900">Voltage (V)</label>
              <span className="text-[10px] font-bold text-violet-600 bg-violet-100 px-1.5 py-0.5 rounded">Volts (V)</span>
            </div>
            <input
              type="number"
              step="any"
              placeholder="e.g. 12"
              value={voltage}
              onChange={(e) => setVoltage(e.target.value)}
              className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm font-bold focus:ring-2 focus:ring-violet-500"
            />
            <span className="text-[10px] text-slate-500 block">Formula: V = I × R</span>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-black text-slate-900">Current (I)</label>
              <span className="text-[10px] font-bold text-amber-600 bg-amber-100 px-1.5 py-0.5 rounded">Amps (A)</span>
            </div>
            <input
              type="number"
              step="any"
              placeholder="e.g. 2"
              value={current}
              onChange={(e) => setCurrent(e.target.value)}
              className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm font-bold focus:ring-2 focus:ring-violet-500"
            />
            <span className="text-[10px] text-slate-500 block">Formula: I = V / R</span>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-black text-slate-900">Resistance (R)</label>
              <span className="text-[10px] font-bold text-orange-600 bg-orange-100 px-1.5 py-0.5 rounded">Ohms (Ω)</span>
            </div>
            <input
              type="number"
              step="any"
              placeholder="e.g. 6"
              value={resistance}
              onChange={(e) => setResistance(e.target.value)}
              className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm font-bold focus:ring-2 focus:ring-violet-500"
            />
            <span className="text-[10px] text-slate-500 block">Formula: R = V / I</span>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-black text-slate-900">Power (P)</label>
              <span className="text-[10px] font-bold text-rose-600 bg-rose-100 px-1.5 py-0.5 rounded">Watts (W)</span>
            </div>
            <input
              type="number"
              step="any"
              placeholder="e.g. 24"
              value={power}
              onChange={(e) => setPower(e.target.value)}
              className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm font-bold focus:ring-2 focus:ring-violet-500"
            />
            <span className="text-[10px] text-slate-500 block">Formula: P = V × I</span>
          </div>
        </div>

        {/* Dynamic Computed Results Banner */}
        {results ? (
          <div className="p-5 rounded-2xl bg-gradient-to-r from-violet-900 to-indigo-950 text-white flex flex-col md:flex-row items-center justify-between gap-4 shadow-sm">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full md:w-auto text-center md:text-left">
              <div>
                <span className="text-[10px] uppercase text-violet-200 block font-semibold">Voltage</span>
                <span className="text-xl font-black font-mono-numbers text-white">{results.voltage} V</span>
              </div>
              <div>
                <span className="text-[10px] uppercase text-violet-200 block font-semibold">Current</span>
                <span className="text-xl font-black font-mono-numbers text-amber-300">{results.current} A</span>
              </div>
              <div>
                <span className="text-[10px] uppercase text-violet-200 block font-semibold">Resistance</span>
                <span className="text-xl font-black font-mono-numbers text-orange-300">{results.resistance} Ω</span>
              </div>
              <div>
                <span className="text-[10px] uppercase text-violet-200 block font-semibold">Power</span>
                <span className="text-xl font-black font-mono-numbers text-rose-300">{results.power} W</span>
              </div>
            </div>

            <button
              type="button"
              onClick={handleCopy}
              className="w-full md:w-auto px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl text-xs font-bold text-white flex items-center justify-center gap-1.5 transition-all shrink-0"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-orange-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy All'}</span>
            </button>
          </div>
        ) : (
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-center text-slate-500 text-xs">
            Enter any two valid electrical values above to calculate the remaining parameters.
          </div>
        )}
      </div>
    </div>
  );
};
