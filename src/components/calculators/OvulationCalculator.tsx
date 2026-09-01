import React, { useState, useMemo } from 'react';
import { Calendar, Heart, Copy, Check, Bookmark, Sparkles } from 'lucide-react';
import { copyToClipboard } from '../../utils/formatters';

interface OvulationCalculatorProps {
  onSaveCalculation?: (summary: string, inputs: any, results: any) => void;
}

export const OvulationCalculator: React.FC<OvulationCalculatorProps> = ({ onSaveCalculation }) => {
  const todayStr = new Date().toISOString().split('T')[0];
  const [lmpDate, setLmpDate] = useState<string>(todayStr);
  const [cycleLength, setCycleLength] = useState<number | ''>(28);
  const [lutealPhase, setLutealPhase] = useState<number | ''>(14);
  const [copied, setCopied] = useState<boolean>(false);
  const [saved, setSaved] = useState<boolean>(false);

  const numCycleLength = typeof cycleLength === 'number' ? cycleLength : 28;
  const numLutealPhase = typeof lutealPhase === 'number' ? lutealPhase : 14;

  const calculations = useMemo(() => {
    if (!lmpDate) return null;
    const lmp = new Date(lmpDate);
    if (isNaN(lmp.getTime())) return null;

    // Ovulation occurs approximately (cycleLength - lutealPhase) days after LMP start
    const ovulationDayOffset = Math.max(7, numCycleLength - numLutealPhase);
    
    // Future 3 cycles prediction
    const cycles = [0, 1, 2].map(cycleIdx => {
      const cycleStart = new Date(lmp);
      cycleStart.setDate(cycleStart.getDate() + cycleIdx * numCycleLength);

      const ovulationDate = new Date(cycleStart);
      ovulationDate.setDate(ovulationDate.getDate() + ovulationDayOffset);

      const fertileStart = new Date(ovulationDate);
      fertileStart.setDate(fertileStart.getDate() - 5);

      const fertileEnd = new Date(ovulationDate);
      fertileEnd.setDate(fertileEnd.getDate() + 1);

      const nextPeriod = new Date(cycleStart);
      nextPeriod.setDate(nextPeriod.getDate() + numCycleLength);

      const fmt = (d: Date) => d.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });

      return {
        cycleNum: cycleIdx + 1,
        ovulationDate: fmt(ovulationDate),
        fertileWindow: `${fmt(fertileStart)} – ${fmt(fertileEnd)}`,
        nextPeriod: fmt(nextPeriod)
      };
    });

    return {
      currentCycle: cycles[0],
      futureCycles: cycles
    };
  }, [lmpDate, numCycleLength, numLutealPhase]);

  const handleCopy = async () => {
    if (!calculations) return;
    const cur = calculations.currentCycle;
    const text = `Ovulation & Fertile Window Summary:
Next Ovulation Day: ${cur.ovulationDate}
Most Fertile Window: ${cur.fertileWindow}
Next Period Expected: ${cur.nextPeriod}
Based on ${numCycleLength}-day cycle with ${numLutealPhase}-day luteal phase`;

    const ok = await copyToClipboard(text);
    if (ok) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleReset = () => {
    setLmpDate(todayStr);
    setCycleLength(28);
    setLutealPhase(14);
  };

  const handleSave = () => {
    if (onSaveCalculation && calculations) {
      onSaveCalculation(
        `Ovulation: ${calculations.currentCycle.ovulationDate} (Fertile: ${calculations.currentCycle.fertileWindow})`,
        { lmpDate, cycleLength, lutealPhase },
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
              <Calendar className="w-4 h-4 text-purple-600" />
              <span>Menstrual Cycle Details</span>
            </h2>
            <button
              onClick={handleReset}
              className="text-xs font-semibold text-slate-600 hover:text-slate-900 px-2.5 py-1 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors"
            >
              Reset
            </button>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700">First Day of Last Period</label>
            <input
              type="date"
              value={lmpDate}
              onChange={(e) => setLmpDate(e.target.value)}
              className="w-full p-2 text-sm font-semibold border border-slate-200 rounded-xl bg-slate-50/50 focus:bg-white focus:outline-none"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700 flex justify-between">
              <span>Cycle Length (usually 21 - 35 days)</span>
              <span className="text-purple-600 font-mono">{cycleLength} days</span>
            </label>
            <input
              type="range"
              min="21"
              max="40"
              value={cycleLength}
              onChange={(e) => setCycleLength(e.target.value === '' ? '' : Number(e.target.value))}
              className="w-full accent-purple-600 cursor-pointer"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700 flex justify-between">
              <span>Luteal Phase (usually 14 days)</span>
              <span className="text-purple-600 font-mono">{lutealPhase} days</span>
            </label>
            <input
              type="range"
              min="10"
              max="16"
              value={lutealPhase}
              onChange={(e) => setLutealPhase(e.target.value === '' ? '' : Number(e.target.value))}
              className="w-full accent-purple-600 cursor-pointer"
            />
          </div>
        </div>

        {/* Right Output */}
        {calculations ? (
          <div className="lg:col-span-6 space-y-4">
            <div className="bg-gradient-to-br from-slate-900 via-purple-950 to-slate-900 text-white rounded-2xl p-6 shadow-md relative">
              <div className="space-y-4">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-purple-300">
                    Next Approximate Ovulation Date
                  </span>
                  <div className="text-3xl sm:text-4xl font-black tracking-tight text-white mt-1">
                    {calculations.currentCycle.ovulationDate}
                  </div>
                  <div className="text-xs font-medium text-orange-300 mt-1">
                    Prime Fertile Window: {calculations.currentCycle.fertileWindow}
                  </div>
                </div>

                <div className="pt-3 border-t border-purple-900/60 space-y-2">
                  <span className="text-[10px] text-purple-300 uppercase font-bold block">Next 3 Cycles Forecast</span>
                  <div className="space-y-1.5 text-xs">
                    {calculations.futureCycles.map((c) => (
                      <div key={c.cycleNum} className="flex items-center justify-between p-2 rounded-lg bg-white/10">
                        <span className="font-bold text-white">Cycle {c.cycleNum}</span>
                        <span className="text-purple-200">Fertile: <strong>{c.fertileWindow}</strong></span>
                        <span className="text-orange-300">Ovulate: <strong>{c.ovulationDate}</strong></span>
                      </div>
                    ))}
                  </div>
                </div>

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
          </div>
        ) : (
          <div className="lg:col-span-6 bg-slate-50 p-6 rounded-2xl border border-slate-200 flex items-center justify-center text-center">
            <p className="text-xs font-medium text-slate-400">
              Select your period date and cycle length to calculate ovulation windows.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
