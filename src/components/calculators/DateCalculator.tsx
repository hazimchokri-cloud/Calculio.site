import React, { useState, useMemo } from 'react';
import { Calendar as CalendarIcon, Clock, Check, Copy, RefreshCw, Bookmark, Sparkles, Plus, Minus, ArrowRight, Briefcase } from 'lucide-react';
import { formatNumber, copyToClipboard } from '../../utils/formatters';

interface DateCalculatorProps {
  onSaveCalculation?: (summary: string, inputs: any, results: any) => void;
}

type DateMode = 'difference' | 'add-subtract';

export const DateCalculator: React.FC<DateCalculatorProps> = ({ onSaveCalculation }) => {
  const todayStr = new Date().toISOString().split('T')[0];
  const nextMonthStr = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

  const [mode, setMode] = useState<DateMode>('difference');
  const [startDate, setStartDate] = useState<string>(todayStr);
  const [endDate, setEndDate] = useState<string>(nextMonthStr);
  const [includeEndDay, setIncludeEndDay] = useState<boolean>(false);

  // Add / Subtract days mode
  const [baseDate, setBaseDate] = useState<string>(todayStr);
  const [addOp, setAddOp] = useState<'add' | 'subtract'>('add');
  const [numDays, setNumDays] = useState<number | ''>(45);
  const [numWeeks, setNumWeeks] = useState<number | ''>(0);
  const [numMonths, setNumMonths] = useState<number | ''>(0);

  const [copied, setCopied] = useState<boolean>(false);
  const [saved, setSaved] = useState<boolean>(false);
  const [pulse, setPulse] = useState<boolean>(false);

  const handleCalculate = () => {
    setPulse(true);
    setTimeout(() => setPulse(false), 400);
  };

  const handleReset = () => {
    setStartDate(todayStr);
    setEndDate(nextMonthStr);
    setIncludeEndDay(false);
    setBaseDate(todayStr);
    setAddOp('add');
    setNumDays(45);
    setNumWeeks(0);
    setNumMonths(0);
  };

  const diffResult = useMemo(() => {
    if (mode !== 'difference') return null;

    const d1 = new Date(startDate);
    const d2 = new Date(endDate);

    if (isNaN(d1.getTime()) || isNaN(d2.getTime())) {
      return null;
    }

    const start = d1 < d2 ? d1 : d2;
    const end = d1 < d2 ? d2 : d1;
    const isReversed = d1 > d2;

    const diffTime = Math.abs(end.getTime() - start.getTime());
    let totalDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    if (includeEndDay) totalDays += 1;

    // Calculate business days (Monday-Friday)
    let businessDays = 0;
    let weekendDays = 0;
    const cur = new Date(start);
    const stopTime = end.getTime() + (includeEndDay ? 24 * 60 * 60 * 1000 : 0);

    while (cur.getTime() < stopTime) {
      const dayOfWeek = cur.getDay(); // 0 is Sunday, 6 is Saturday
      if (dayOfWeek === 0 || dayOfWeek === 6) {
        weekendDays++;
      } else {
        businessDays++;
      }
      cur.setDate(cur.getDate() + 1);
    }

    const weeks = Math.floor(totalDays / 7);
    const remainingDays = totalDays % 7;
    const totalHours = totalDays * 24;
    const totalMinutes = totalHours * 60;

    return {
      totalDays,
      businessDays,
      weekendDays,
      weeks,
      remainingDays,
      totalHours,
      totalMinutes,
      isReversed,
      businessRatio: totalDays > 0 ? (businessDays / totalDays) * 100 : 0
    };
  }, [mode, startDate, endDate, includeEndDay]);

  const addResult = useMemo(() => {
    if (mode !== 'add-subtract') return null;

    const b = new Date(baseDate);
    if (isNaN(b.getTime())) return null;

    const numDaysSafe = typeof numDays === 'number' ? numDays : 0;
    const numWeeksSafe = typeof numWeeks === 'number' ? numWeeks : 0;
    const numMonthsSafe = typeof numMonths === 'number' ? numMonths : 0;

    const totalDaysToAdd = numDaysSafe + (numWeeksSafe * 7);
    const targetDate = new Date(b);

    if (addOp === 'add') {
      targetDate.setMonth(targetDate.getMonth() + numMonthsSafe);
      targetDate.setDate(targetDate.getDate() + totalDaysToAdd);
    } else {
      targetDate.setMonth(targetDate.getMonth() - numMonthsSafe);
      targetDate.setDate(targetDate.getDate() - totalDaysToAdd);
    }

    const options: Intl.DateTimeFormatOptions = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };

    return {
      formatted: targetDate.toLocaleDateString('en-US', options),
      iso: targetDate.toISOString().split('T')[0],
      dayOfWeek: targetDate.toLocaleDateString('en-US', { weekday: 'long' }),
      totalDaysOffset: totalDaysToAdd + (numMonthsSafe * 30.4)
    };
  }, [mode, baseDate, addOp, numDays, numWeeks, numMonths]);

  const handleCopy = async () => {
    let text = '';
    if (mode === 'difference' && diffResult) {
      text = `Date Difference (${startDate} to ${endDate}):\n• Total Days: ${diffResult.totalDays} days (${diffResult.weeks} wks, ${diffResult.remainingDays} days)\n• Business Days: ${diffResult.businessDays} days\n• Weekend Days: ${diffResult.weekendDays} days\n• Total Hours: ${formatNumber(diffResult.totalHours)} hrs`;
    } else if (mode === 'add-subtract' && addResult) {
      text = `${baseDate} ${addOp === 'add' ? '+' : '-'} ${numDays} days = ${addResult.formatted} (${addResult.iso})`;
    }

    const ok = await copyToClipboard(text);
    if (ok) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleSave = () => {
    if (!onSaveCalculation) return;
    if (mode === 'difference' && diffResult) {
      onSaveCalculation(
        `Date Difference: ${diffResult.totalDays} days (${startDate} to ${endDate})`,
        { startDate, endDate, includeEndDay },
        diffResult
      );
    } else if (mode === 'add-subtract' && addResult) {
      onSaveCalculation(
        `Date Shift: ${baseDate} ${addOp === 'add' ? '+' : '-'} ${numDays}d → ${addResult.iso}`,
        { baseDate, addOp, numDays, numWeeks, numMonths },
        addResult
      );
    }
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Mode Navigation */}
      <div className="flex gap-2 p-1.5 bg-slate-200/60 rounded-2xl w-fit">
        <button
          type="button"
          onClick={() => setMode('difference')}
          className={`py-2 px-4 rounded-xl text-xs font-bold transition-all ${
            mode === 'difference' ? 'bg-white text-indigo-700 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Days Between Two Dates
        </button>
        <button
          type="button"
          onClick={() => setMode('add-subtract')}
          className={`py-2 px-4 rounded-xl text-xs font-bold transition-all ${
            mode === 'add-subtract' ? 'bg-white text-indigo-700 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Add / Subtract Days
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Controls Column */}
        <div className="lg:col-span-6 bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-2xs space-y-5">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <CalendarIcon className="w-4 h-4 text-indigo-600" />
              <span>{mode === 'difference' ? 'Date Range Inputs' : 'Date Math Parameters'}</span>
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

          {mode === 'difference' ? (
            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Start Date</label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full px-3 py-2 text-sm font-semibold border border-slate-200 rounded-xl bg-slate-50/50 focus:bg-white focus:outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">End Date</label>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full px-3 py-2 text-sm font-semibold border border-slate-200 rounded-xl bg-slate-50/50 focus:bg-white focus:outline-none"
                />
              </div>

              <label className="flex items-center gap-2.5 cursor-pointer pt-1">
                <input
                  type="checkbox"
                  checked={includeEndDay}
                  onChange={(e) => setIncludeEndDay(e.target.checked)}
                  className="w-4 h-4 text-indigo-600 rounded border-slate-300 focus:ring-indigo-500"
                />
                <span className="text-xs font-medium text-slate-700">Include end day in calculation (+1 day)</span>
              </label>

              {/* Quick Preset Intervals */}
              <div className="flex flex-wrap gap-1.5 pt-2">
                <span className="text-xs font-semibold text-slate-500 mr-1">Quick Select:</span>
                {[
                  { label: '+7 Days', d: 7 },
                  { label: '+30 Days', d: 30 },
                  { label: '+90 Days', d: 90 },
                  { label: '+365 Days', d: 365 },
                ].map(p => (
                  <button
                    key={p.label}
                    type="button"
                    onClick={() => {
                      const st = new Date(startDate);
                      st.setDate(st.getDate() + p.d);
                      setEndDate(st.toISOString().split('T')[0]);
                    }}
                    className="text-xs font-bold px-2 py-1 bg-slate-100 hover:bg-slate-200 rounded-lg text-slate-700 transition-colors"
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Starting Base Date</label>
                <input
                  type="date"
                  value={baseDate}
                  onChange={(e) => setBaseDate(e.target.value)}
                  className="w-full px-3 py-2 text-sm font-semibold border border-slate-200 rounded-xl bg-slate-50/50 focus:bg-white focus:outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Operation</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setAddOp('add')}
                    className={`py-2 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 border transition-all ${
                      addOp === 'add' ? 'bg-indigo-50 border-indigo-500 text-indigo-700' : 'bg-white border-slate-200 text-slate-700'
                    }`}
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Time (+)</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setAddOp('subtract')}
                    className={`py-2 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 border transition-all ${
                      addOp === 'subtract' ? 'bg-indigo-50 border-indigo-500 text-indigo-700' : 'bg-white border-slate-200 text-slate-700'
                    }`}
                  >
                    <Minus className="w-3.5 h-3.5" />
                    <span>Subtract Time (-)</span>
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Days</label>
                  <input
                    type="number"
                    min="0"
                    value={numDays}
                    onChange={(e) => setNumDays(e.target.value === '' ? '' : Number(e.target.value))}
                    className="w-full px-3 py-2 text-sm font-mono font-semibold border border-slate-200 rounded-xl bg-slate-50/50 focus:bg-white focus:outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Weeks</label>
                  <input
                    type="number"
                    min="0"
                    value={numWeeks}
                    onChange={(e) => setNumWeeks(e.target.value === '' ? '' : Number(e.target.value))}
                    className="w-full px-3 py-2 text-sm font-mono font-semibold border border-slate-200 rounded-xl bg-slate-50/50 focus:bg-white focus:outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Months</label>
                  <input
                    type="number"
                    min="0"
                    value={numMonths}
                    onChange={(e) => setNumMonths(e.target.value === '' ? '' : Number(e.target.value))}
                    className="w-full px-3 py-2 text-sm font-mono font-semibold border border-slate-200 rounded-xl bg-slate-50/50 focus:bg-white focus:outline-none"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Action Buttons: Calculate & Reset */}
          <div className="flex gap-3 pt-2 border-t border-slate-100">
            <button
              type="button"
              onClick={handleCalculate}
              className="flex-1 py-3 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-xs transition-all active:scale-95"
            >
              <Sparkles className="w-4 h-4" />
              <span>Calculate Date</span>
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

        {/* Results Column */}
        <div className="lg:col-span-6 space-y-4">
          <div className={`bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white rounded-2xl p-6 shadow-md relative transition-transform ${pulse ? 'scale-[1.01]' : ''}`}>
            {mode === 'difference' && diffResult && (
              <div className="space-y-4">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-300">
                    Total Elapsed Time
                  </span>
                  <div className="text-4xl sm:text-5xl font-black tracking-tight text-white mt-1 font-mono">
                    {diffResult.totalDays}
                    <span className="text-lg font-normal text-slate-300 ml-2">Days</span>
                  </div>
                  <p className="text-xs text-indigo-300 mt-1">
                    Equivalent to {diffResult.weeks} weeks and {diffResult.remainingDays} days
                  </p>
                </div>

                {/* Business vs Weekend distribution bar */}
                <div className="space-y-1.5 pt-2">
                  <div className="flex justify-between text-xs text-slate-300">
                    <span className="flex items-center gap-1"><Briefcase className="w-3.5 h-3.5 text-orange-400" /> Business: {diffResult.businessDays}d</span>
                    <span className="text-amber-300">Weekend: {diffResult.weekendDays}d</span>
                  </div>
                  <div className="h-3 bg-white/10 rounded-full overflow-hidden flex">
                    <div
                      className="h-full bg-orange-500"
                      style={{ width: `${diffResult.businessRatio}%` }}
                      title={`Business days: ${diffResult.businessDays}`}
                    />
                    <div
                      className="h-full bg-amber-500"
                      style={{ width: `${100 - diffResult.businessRatio}%` }}
                      title={`Weekend days: ${diffResult.weekendDays}`}
                    />
                  </div>
                </div>

                {/* Breakdown Grid */}
                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-indigo-900/60 text-xs">
                  <div className="bg-white/10 rounded-xl p-2.5 backdrop-blur-xs">
                    <span className="text-[10px] text-slate-300 uppercase font-bold block">Business Working Days</span>
                    <span className="text-base font-bold text-orange-300 font-mono">{diffResult.businessDays} days</span>
                  </div>
                  <div className="bg-white/10 rounded-xl p-2.5 backdrop-blur-xs">
                    <span className="text-[10px] text-slate-300 uppercase font-bold block">Weekend Days</span>
                    <span className="text-base font-bold text-amber-300 font-mono">{diffResult.weekendDays} days</span>
                  </div>
                  <div className="bg-white/10 rounded-xl p-2.5 backdrop-blur-xs">
                    <span className="text-[10px] text-slate-300 uppercase font-bold block">Total Hours</span>
                    <span className="text-sm font-bold text-white font-mono">{formatNumber(diffResult.totalHours)} hrs</span>
                  </div>
                  <div className="bg-white/10 rounded-xl p-2.5 backdrop-blur-xs">
                    <span className="text-[10px] text-slate-300 uppercase font-bold block">Total Minutes</span>
                    <span className="text-sm font-bold text-white font-mono">{formatNumber(diffResult.totalMinutes)} mins</span>
                  </div>
                </div>
              </div>
            )}

            {mode === 'add-subtract' && addResult && (
              <div className="space-y-4">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-300">
                    Calculated Result Date
                  </span>
                  <div className="text-2xl sm:text-3xl font-black tracking-tight text-white mt-1">
                    {addResult.formatted}
                  </div>
                  <span className="inline-block mt-2 px-3 py-1 bg-indigo-500/30 border border-indigo-400/40 rounded-lg text-xs font-mono font-bold text-indigo-200">
                    ISO: {addResult.iso} • {addResult.dayOfWeek}
                  </span>
                </div>

                <div className="p-3.5 bg-white/10 rounded-xl text-xs text-slate-200 border border-white/10 space-y-1">
                  <span className="text-[10px] text-indigo-300 uppercase font-bold block">Offset Summary</span>
                  <div>{addOp === 'add' ? 'Added' : 'Subtracted'} {numDays} days, {numWeeks} weeks, {numMonths} months from {baseDate}.</div>
                </div>
              </div>
            )}

            {/* Action Bar */}
            <div className="flex items-center gap-2 pt-4 border-t border-indigo-900/60">
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
        </div>
      </div>
    </div>
  );
};
