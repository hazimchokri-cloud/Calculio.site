import React, { useState, useMemo } from 'react';
import { Calendar, Heart, Baby, Copy, Check, Bookmark, Sparkles } from 'lucide-react';
import { copyToClipboard } from '../../utils/formatters';

interface PregnancyCalculatorProps {
  onSaveCalculation?: (summary: string, inputs: any, results: any) => void;
}

export const PregnancyCalculator: React.FC<PregnancyCalculatorProps> = ({ onSaveCalculation }) => {
  // Default to ~12 weeks ago
  const defaultDate = new Date();
  defaultDate.setDate(defaultDate.getDate() - 84);
  const defaultDateStr = defaultDate.toISOString().split('T')[0];

  const [lmpDate, setLmpDate] = useState<string>(defaultDateStr);
  const [cycleLength, setCycleLength] = useState<number | ''>(28);
  const [copied, setCopied] = useState<boolean>(false);
  const [saved, setSaved] = useState<boolean>(false);

  const numCycleLength = typeof cycleLength === 'number' ? cycleLength : 28;

  const calculations = useMemo(() => {
    if (!lmpDate) return null;
    const lmp = new Date(lmpDate);
    if (isNaN(lmp.getTime())) {
      return null;
    }

    const today = new Date();
    const diffTime = today.getTime() - lmp.getTime();
    const totalDays = Math.max(0, Math.floor(diffTime / (1000 * 60 * 60 * 24)));
    const currentWeeks = Math.floor(totalDays / 7);
    const currentDays = totalDays % 7;

    // Due Date Naegele's rule: LMP + 280 days + (cycleLength - 28)
    const cycleAdjustment = numCycleLength - 28;
    const dueDate = new Date(lmp);
    dueDate.setDate(dueDate.getDate() + 280 + cycleAdjustment);

    // Conception Date: LMP + 14 + cycleAdjustment
    const conceptionDate = new Date(lmp);
    conceptionDate.setDate(conceptionDate.getDate() + 14 + cycleAdjustment);

    // Trimester
    let trimester = 'First Trimester (Weeks 1 - 13)';
    if (currentWeeks >= 28) {
      trimester = 'Third Trimester (Weeks 28 - 40+)';
    } else if (currentWeeks >= 14) {
      trimester = 'Second Trimester (Weeks 14 - 27)';
    }

    // Fetal comparison
    const COMPARISONS: Record<number, { fruit: string; length: string; weight: string }> = {
      4: { fruit: 'Poppy seed', length: '1 mm', weight: '< 1 g' },
      8: { fruit: 'Raspberry', length: '1.6 cm', weight: '1 g' },
      12: { fruit: 'Plum', length: '5.4 cm', weight: '14 g' },
      16: { fruit: 'Avocado', length: '11.6 cm', weight: '100 g' },
      20: { fruit: 'Banana', length: '25 cm', weight: '300 g' },
      24: { fruit: 'Corn ear', length: '30 cm', weight: '600 g' },
      28: { fruit: 'Eggplant', length: '37 cm', weight: '1 kg' },
      32: { fruit: 'Squash', length: '42 cm', weight: '1.7 kg' },
      36: { fruit: 'Honeydew melon', length: '47 cm', weight: '2.6 kg' },
      40: { fruit: 'Watermelon', length: '51 cm', weight: '3.4 kg' }
    };

    let nearestWeek = Math.min(40, Math.max(4, Math.round(currentWeeks / 4) * 4));
    const fruitInfo = COMPARISONS[nearestWeek] || COMPARISONS[12];

    const daysRemaining = Math.max(0, Math.floor((dueDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)));
    const percentComplete = Math.min(100, Math.max(0, Math.round((totalDays / 280) * 100)));

    return {
      currentWeeks,
      currentDays,
      dueDate: dueDate.toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' }),
      conceptionDate: conceptionDate.toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' }),
      trimester,
      fruitInfo,
      daysRemaining,
      percentComplete
    };
  }, [lmpDate, numCycleLength]);

  const handleCopy = async () => {
    if (!calculations) return;
    const text = `Pregnancy Timeline Summary:
Gestational Age: ${calculations.currentWeeks} weeks, ${calculations.currentDays} days
Estimated Due Date (EDD): ${calculations.dueDate}
Estimated Conception: ${calculations.conceptionDate}
Current Stage: ${calculations.trimester}
Progress: ${calculations.percentComplete}% (${calculations.daysRemaining} days remaining)
Fetal Size: About the size of a ${calculations.fruitInfo.fruit}`;

    const ok = await copyToClipboard(text);
    if (ok) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleReset = () => {
    setLmpDate(defaultDateStr);
    setCycleLength(28);
  };

  const handleSave = () => {
    if (onSaveCalculation && calculations) {
      onSaveCalculation(
        `Pregnancy: ${calculations.currentWeeks}w ${calculations.currentDays}d → Due ${calculations.dueDate}`,
        { lmpDate, cycleLength },
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
              <Baby className="w-4 h-4 text-rose-600" />
              <span>Pregnancy Dates</span>
            </h2>
            <button
              onClick={handleReset}
              className="text-xs font-semibold text-slate-600 hover:text-slate-900 px-2.5 py-1 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors"
            >
              Reset
            </button>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700">First Day of Last Menstrual Period (LMP)</label>
            <input
              type="date"
              value={lmpDate}
              onChange={(e) => setLmpDate(e.target.value)}
              className="w-full p-2 text-sm font-semibold border border-slate-200 rounded-xl bg-slate-50/50 focus:bg-white focus:outline-none"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 flex justify-between">
              <span>Average Menstrual Cycle Length</span>
              <span className="text-rose-600 font-mono">{cycleLength} days</span>
            </label>
            <input
              type="range"
              min="21"
              max="40"
              value={cycleLength}
              onChange={(e) => setCycleLength(e.target.value === '' ? '' : Number(e.target.value))}
              className="w-full accent-rose-600 cursor-pointer"
            />
          </div>
        </div>

        {/* Right Output */}
        {calculations && (
          <div className="lg:col-span-6 space-y-4">
            <div className="bg-gradient-to-br from-slate-900 via-rose-950 to-slate-900 text-white rounded-2xl p-6 shadow-md relative">
              <div className="space-y-4">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-rose-300">
                    Current Gestational Age
                  </span>
                  <div className="text-3xl sm:text-4xl font-black tracking-tight text-white mt-1">
                    {calculations.currentWeeks} Weeks, {calculations.currentDays} Days
                  </div>
                  <div className="text-xs font-medium text-orange-300 mt-1">
                    Estimated Due Date: {calculations.dueDate} ({calculations.daysRemaining} days left)
                  </div>
                </div>

                <div className="space-y-1.5 pt-2 border-t border-rose-900/60">
                  <div className="flex justify-between text-xs font-bold text-slate-300">
                    <span>Pregnancy Progress</span>
                    <span>{calculations.percentComplete}%</span>
                  </div>
                  <div className="w-full h-2.5 rounded-full bg-white/10 overflow-hidden">
                    <div className="bg-rose-500 h-full rounded-full transition-all" style={{ width: `${calculations.percentComplete}%` }} />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs pt-2">
                  <div className="bg-white/10 rounded-xl p-2.5">
                    <span className="text-[10px] text-slate-300 block">Current Stage</span>
                    <span className="font-bold text-white text-[11px]">{calculations.trimester}</span>
                  </div>
                  <div className="bg-white/10 rounded-xl p-2.5">
                    <span className="text-[10px] text-slate-300 block">Fetal Size Analogy</span>
                    <span className="font-bold text-rose-300 text-[11px]">Size of a {calculations.fruitInfo.fruit}</span>
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
        )}
      </div>
    </div>
  );
};
