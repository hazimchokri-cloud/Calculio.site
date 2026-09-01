import React, { useState, useMemo } from 'react';
import { Calendar, Baby, Heart, Copy, Check, Bookmark, Sparkles } from 'lucide-react';
import { copyToClipboard } from '../../utils/formatters';

interface DueDateCalculatorProps {
  onSaveCalculation?: (summary: string, inputs: any, results: any) => void;
}

export const DueDateCalculator: React.FC<DueDateCalculatorProps> = ({ onSaveCalculation }) => {
  const [calcMethod, setCalcMethod] = useState<'lmp' | 'conception' | 'ultrasound' | 'ivf'>('lmp');
  
  const todayStr = new Date().toISOString().split('T')[0];
  const [inputDate, setInputDate] = useState<string>(todayStr);
  const [cycleLength, setCycleLength] = useState<number | ''>(28);
  const [ultrasoundWeeks, setUltrasoundWeeks] = useState<number | ''>(8);
  const [ultrasoundDays, setUltrasoundDays] = useState<number | ''>(3);
  const [ivfType, setIvfType] = useState<'day3' | 'day5'>('day5');
  const [copied, setCopied] = useState<boolean>(false);
  const [saved, setSaved] = useState<boolean>(false);

  const calculations = useMemo(() => {
    const baseDate = new Date(inputDate);
    if (isNaN(baseDate.getTime())) return null;

    const numCycleLength = typeof cycleLength === 'number' ? cycleLength : 28;
    const numUltrasoundWeeks = typeof ultrasoundWeeks === 'number' ? ultrasoundWeeks : 0;
    const numUltrasoundDays = typeof ultrasoundDays === 'number' ? ultrasoundDays : 0;

    let dueDate = new Date(baseDate);

    if (calcMethod === 'lmp') {
      // Due = LMP + 280 days + (cycle - 28)
      dueDate.setDate(dueDate.getDate() + 280 + (numCycleLength - 28));
    } else if (calcMethod === 'conception') {
      // Due = Conception + 266 days
      dueDate.setDate(dueDate.getDate() + 266);
    } else if (calcMethod === 'ultrasound') {
      // Due = Scan Date + (280 - (scanWeeks*7 + scanDays))
      const daysAtScan = numUltrasoundWeeks * 7 + numUltrasoundDays;
      const daysRemainingFromScan = 280 - daysAtScan;
      dueDate.setDate(dueDate.getDate() + daysRemainingFromScan);
    } else if (calcMethod === 'ivf') {
      // IVF 3-day transfer: + 263 days; 5-day transfer: + 261 days
      const daysToAdd = ivfType === 'day5' ? 261 : 263;
      dueDate.setDate(dueDate.getDate() + daysToAdd);
    }

    const today = new Date();
    const daysUntilDue = Math.floor((dueDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    const currentGestationalDays = 280 - daysUntilDue;
    const currentWeeks = Math.max(0, Math.floor(currentGestationalDays / 7));
    const currentDays = Math.max(0, currentGestationalDays % 7);

    return {
      dueDate: dueDate.toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }),
      daysUntilDue: Math.max(0, daysUntilDue),
      currentWeeks,
      currentDays,
      trimester: currentWeeks >= 28 ? 'Third Trimester' : currentWeeks >= 14 ? 'Second Trimester' : 'First Trimester'
    };
  }, [calcMethod, inputDate, cycleLength, ultrasoundWeeks, ultrasoundDays, ivfType]);

  const handleCopy = async () => {
    if (!calculations) return;
    const text = `Estimated Due Date: ${calculations.dueDate}
Days Remaining: ${calculations.daysUntilDue} days
Current Gestation: ${calculations.currentWeeks} weeks, ${calculations.currentDays} days (${calculations.trimester})`;

    const ok = await copyToClipboard(text);
    if (ok) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleSave = () => {
    if (onSaveCalculation && calculations) {
      onSaveCalculation(
        `Due Date: ${calculations.dueDate} (${calcMethod.toUpperCase()})`,
        { calcMethod, inputDate, cycleLength },
        calculations
      );
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    }
  };

  const handleReset = () => {
    setCalcMethod('lmp');
    setInputDate(todayStr);
    setCycleLength(28);
    setUltrasoundWeeks(8);
    setUltrasoundDays(3);
    setIvfType('day5');
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Inputs */}
        <div className="lg:col-span-6 bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-2xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Baby className="w-4 h-4 text-pink-600" />
              <span>Due Date Estimator</span>
            </h2>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleReset}
                className="text-xs font-semibold text-slate-600 hover:text-slate-900 px-2.5 py-1 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors"
              >
                Reset
              </button>
            </div>
          </div>

          {/* Method selector */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 p-1 bg-slate-100 rounded-xl text-xs font-bold">
            {(['lmp', 'conception', 'ultrasound', 'ivf'] as const).map(m => (
              <button
                key={m}
                type="button"
                onClick={() => setCalcMethod(m)}
                className={`py-1.5 rounded-lg capitalize transition-all ${
                  calcMethod === m ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600'
                }`}
              >
                {m === 'lmp' ? 'Last Period' : m === 'ivf' ? 'IVF Transfer' : m}
              </button>
            ))}
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700">
              {calcMethod === 'lmp' && 'First Day of Last Period'}
              {calcMethod === 'conception' && 'Date of Conception'}
              {calcMethod === 'ultrasound' && 'Date of Ultrasound'}
              {calcMethod === 'ivf' && 'Date of Embryo Transfer'}
            </label>
            <input
              type="date"
              value={inputDate}
              onChange={(e) => setInputDate(e.target.value)}
              className="w-full p-2 text-sm font-semibold border border-slate-200 rounded-xl bg-slate-50/50 focus:bg-white focus:outline-none"
            />
          </div>

          {calcMethod === 'lmp' && (
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 flex justify-between">
                <span>Cycle Length</span>
                <span className="text-pink-600 font-mono">{cycleLength} days</span>
              </label>
              <input
                type="range"
                min="21"
                max="40"
                value={cycleLength}
                onChange={(e) => setCycleLength(e.target.value === '' ? '' : Number(e.target.value))}
                className="w-full accent-pink-600 cursor-pointer"
              />
            </div>
          )}

          {calcMethod === 'ultrasound' && (
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-xs font-bold text-slate-700">Weeks at Scan</label>
                <input
                  type="number"
                  min="4"
                  max="40"
                  value={ultrasoundWeeks}
                  onChange={(e) => setUltrasoundWeeks(e.target.value === '' ? '' : Number(e.target.value))}
                  className="w-full p-2 text-sm font-semibold border border-slate-200 rounded-xl bg-slate-50/50 focus:bg-white focus:outline-none"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-700">Days at Scan</label>
                <input
                  type="number"
                  min="0"
                  max="6"
                  value={ultrasoundDays}
                  onChange={(e) => setUltrasoundDays(e.target.value === '' ? '' : Number(e.target.value))}
                  className="w-full p-2 text-sm font-semibold border border-slate-200 rounded-xl bg-slate-50/50 focus:bg-white focus:outline-none"
                />
              </div>
            </div>
          )}

          {calcMethod === 'ivf' && (
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Embryo Stage</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setIvfType('day3')}
                  className={`py-2 text-xs font-bold rounded-xl border ${ivfType === 'day3' ? 'bg-pink-600 text-white' : 'bg-slate-50 text-slate-700'}`}
                >
                  Day 3 Embryo
                </button>
                <button
                  type="button"
                  onClick={() => setIvfType('day5')}
                  className={`py-2 text-xs font-bold rounded-xl border ${ivfType === 'day5' ? 'bg-pink-600 text-white' : 'bg-slate-50 text-slate-700'}`}
                >
                  Day 5 Blastocyst
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Right Output */}
        {calculations ? (
          <div className="lg:col-span-6 space-y-4">
            <div className="bg-gradient-to-br from-slate-900 via-pink-950 to-slate-900 text-white rounded-2xl p-6 shadow-md relative">
              <div className="space-y-4">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-pink-300">
                    Estimated Due Date (EDD)
                  </span>
                  <div className="text-2xl sm:text-3xl font-black tracking-tight text-white mt-1">
                    {calculations.dueDate}
                  </div>
                  <div className="text-xs font-medium text-orange-300 mt-1">
                    {calculations.daysUntilDue} days to go
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-3 border-t border-pink-900/60">
                  <div className="bg-white/10 rounded-xl p-3 backdrop-blur-xs">
                    <span className="text-[10px] text-slate-300 uppercase font-bold block">Current Gestation</span>
                    <span className="text-base font-bold text-white font-mono">{calculations.currentWeeks}w {calculations.currentDays}d</span>
                  </div>
                  <div className="bg-white/10 rounded-xl p-3 backdrop-blur-xs">
                    <span className="text-[10px] text-slate-300 uppercase font-bold block">Trimester</span>
                    <span className="text-base font-bold text-pink-300">{calculations.trimester}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-2">
                  <button
                    onClick={handleCopy}
                    className="flex-1 py-2 px-3 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-bold text-white flex items-center justify-center gap-1.5 transition-colors border border-white/10"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-orange-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? 'Copied' : 'Copy Due Date'}</span>
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
        ) : (
          <div className="lg:col-span-6 bg-slate-50 p-6 rounded-2xl border border-slate-200 flex items-center justify-center text-center">
            <p className="text-xs font-medium text-slate-400">
              Select or enter a valid date to calculate your estimated due date.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
