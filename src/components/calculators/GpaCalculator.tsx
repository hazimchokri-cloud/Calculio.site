import React, { useState, useMemo } from 'react';
import { GraduationCap, Plus, Trash2, Check, Copy, RefreshCw, Bookmark, Sparkles, Award } from 'lucide-react';
import { formatNumber, copyToClipboard } from '../../utils/formatters';
import confetti from 'canvas-confetti';

interface Course {
  id: string;
  name: string;
  grade: string;
  credits: number;
}

interface GpaCalculatorProps {
  onSaveCalculation?: (summary: string, inputs: any, results: any) => void;
}

const GRADE_POINTS: Record<string, number> = {
  'A+': 4.0,
  'A': 4.0,
  'A-': 3.7,
  'B+': 3.3,
  'B': 3.0,
  'B-': 2.7,
  'C+': 2.3,
  'C': 2.0,
  'C-': 1.7,
  'D+': 1.3,
  'D': 1.0,
  'F': 0.0
};

export const GpaCalculator: React.FC<GpaCalculatorProps> = ({ onSaveCalculation }) => {
  const [courses, setCourses] = useState<Course[]>([
    { id: '1', name: 'Calculus I', grade: 'A', credits: 4 },
    { id: '2', name: 'Computer Science 101', grade: 'A-', credits: 3 },
    { id: '3', name: 'Physics Mechanics', grade: 'B+', credits: 4 },
    { id: '4', name: 'English Composition', grade: 'A', credits: 3 }
  ]);

  const [priorGpa, setPriorGpa] = useState<number | ''>(3.5);
  const [priorCredits, setPriorCredits] = useState<number | ''>(30);
  const [includePrior, setIncludePrior] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const [saved, setSaved] = useState<boolean>(false);
  const [pulse, setPulse] = useState<boolean>(false);

  const stats = useMemo(() => {
    let semesterQualityPoints = 0;
    let semesterCredits = 0;

    courses.forEach(c => {
      const creditsNum = typeof c.credits === 'number' ? c.credits : 0;
      if (creditsNum > 0) {
        const pts = GRADE_POINTS[c.grade] ?? 0;
        semesterQualityPoints += pts * creditsNum;
        semesterCredits += creditsNum;
      }
    });

    const numPriorGpa = typeof priorGpa === 'number' ? priorGpa : 0;
    const numPriorCredits = typeof priorCredits === 'number' ? priorCredits : 0;

    if (semesterCredits <= 0 && (!includePrior || numPriorCredits <= 0)) {
      return null;
    }

    const semesterGpa = semesterCredits > 0 ? semesterQualityPoints / semesterCredits : 0;

    let cumulativeGpa = semesterGpa;
    let cumulativeCredits = semesterCredits;

    if (includePrior && numPriorCredits > 0) {
      const totalPoints = (numPriorGpa * numPriorCredits) + semesterQualityPoints;
      cumulativeCredits = numPriorCredits + semesterCredits;
      cumulativeGpa = cumulativeCredits > 0 ? totalPoints / cumulativeCredits : 0;
    }

    let standing = 'Satisfactory';
    let badgeColor = 'bg-blue-500/20 text-blue-300 border-blue-500/40';

    const effectiveGpa = includePrior ? cumulativeGpa : semesterGpa;
    if (effectiveGpa >= 3.8) {
      standing = "Summa Cum Laude / Dean's List";
      badgeColor = 'bg-orange-500/20 text-orange-300 border-orange-500/40';
    } else if (effectiveGpa >= 3.5) {
      standing = 'Magna Cum Laude / Honors';
      badgeColor = 'bg-orange-500/20 text-orange-300 border-orange-500/40';
    } else if (effectiveGpa >= 3.0) {
      standing = 'Good Academic Standing';
      badgeColor = 'bg-blue-500/20 text-blue-300 border-blue-500/40';
    } else if (effectiveGpa >= 2.0) {
      standing = 'Satisfactory';
      badgeColor = 'bg-amber-500/20 text-amber-300 border-amber-500/40';
    } else {
      standing = 'Academic Warning';
      badgeColor = 'bg-rose-500/20 text-rose-300 border-rose-500/40';
    }

    return {
      semesterGpa: Number(semesterGpa.toFixed(2)),
      semesterCredits,
      cumulativeGpa: Number(cumulativeGpa.toFixed(2)),
      cumulativeCredits,
      standing,
      badgeColor,
      gaugePct: Math.min(100, Math.max(0, (effectiveGpa / 4.0) * 100))
    };
  }, [courses, priorGpa, priorCredits, includePrior]);

  const addCourse = () => {
    setCourses(prev => [
      ...prev,
      { id: Date.now().toString(), name: `Course ${prev.length + 1}`, grade: 'A', credits: 3 }
    ]);
  };

  const removeCourse = (id: string) => {
    if (courses.length > 1) {
      setCourses(prev => prev.filter(c => c.id !== id));
    }
  };

  const updateCourse = (id: string, field: keyof Course, val: any) => {
    setCourses(prev => prev.map(c => c.id === id ? { ...c, [field]: val } : c));
  };

  const handleCalculate = () => {
    setPulse(true);
    if (stats && stats.semesterGpa >= 3.5) {
      confetti({ particleCount: 30, spread: 50, origin: { y: 0.8 } });
    }
    setTimeout(() => setPulse(false), 400);
  };

  const handleReset = () => {
    setCourses([
      { id: '1', name: 'Course 1', grade: 'A', credits: 3 },
      { id: '2', name: 'Course 2', grade: 'B+', credits: 3 },
      { id: '3', name: 'Course 3', grade: 'A-', credits: 3 },
      { id: '4', name: 'Course 4', grade: 'B', credits: 3 }
    ]);
    setIncludePrior(false);
    setPriorGpa(3.5);
    setPriorCredits(30);
  };

  const handleCopy = async () => {
    if (!stats) return;
    const text = `GPA Calculation:
• Semester GPA: ${stats.semesterGpa} (${stats.semesterCredits} Credits)
• Academic Standing: ${stats.standing}
${includePrior ? `• Cumulative GPA: ${stats.cumulativeGpa} (${stats.cumulativeCredits} Total Credits)` : ''}`;

    const ok = await copyToClipboard(text);
    if (ok) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleSave = () => {
    if (!stats) return;
    if (onSaveCalculation) {
      onSaveCalculation(
        `GPA: ${stats.semesterGpa} (${stats.semesterCredits} Credits) - ${stats.standing}`,
        { courses, includePrior, priorGpa, priorCredits },
        stats
      );
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Course Rows */}
        <div className="lg:col-span-7 bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-2xs space-y-5">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <GraduationCap className="w-4 h-4 text-indigo-600" />
              <span>Current Semester Courses</span>
            </h3>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleReset}
                className="text-xs font-semibold text-slate-500 hover:text-slate-800 flex items-center gap-1 transition-colors"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Reset</span>
              </button>
              <button
                type="button"
                onClick={addCourse}
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-bold transition-all"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Course</span>
              </button>
            </div>
          </div>

          <div className="space-y-2.5">
            <div className="grid grid-cols-12 gap-2 text-[11px] font-bold text-slate-500 uppercase px-1">
              <span className="col-span-6">Course Title</span>
              <span className="col-span-3">Grade</span>
              <span className="col-span-2 text-center">Credits</span>
              <span className="col-span-1"></span>
            </div>

            {courses.map((c) => (
              <div key={c.id} className="grid grid-cols-12 gap-2 items-center">
                <input
                  type="text"
                  value={c.name}
                  onChange={(e) => updateCourse(c.id, 'name', e.target.value)}
                  className="col-span-6 px-3 py-2 text-xs font-medium border border-slate-200 rounded-xl bg-slate-50/50 focus:bg-white focus:outline-none"
                  placeholder="Course Name"
                />

                <select
                  value={c.grade}
                  onChange={(e) => updateCourse(c.id, 'grade', e.target.value)}
                  className="col-span-3 px-2.5 py-2 text-xs font-bold border border-slate-200 rounded-xl bg-white focus:outline-none"
                >
                  {Object.keys(GRADE_POINTS).map(g => (
                    <option key={g} value={g}>{g} ({GRADE_POINTS[g].toFixed(1)})</option>
                  ))}
                </select>

                <input
                  type="number"
                  min="0.5"
                  max="12"
                  step="0.5"
                  value={c.credits}
                  onChange={(e) => updateCourse(c.id, 'credits', e.target.value === '' ? '' : Number(e.target.value))}
                  className="col-span-2 px-2 py-2 text-xs text-center font-mono font-semibold border border-slate-200 rounded-xl bg-slate-50/50 focus:bg-white focus:outline-none"
                  title="Credit Hours"
                />

                <button
                  type="button"
                  onClick={() => removeCourse(c.id)}
                  disabled={courses.length <= 1}
                  className="col-span-1 p-2 text-slate-400 hover:text-rose-600 disabled:opacity-30 flex justify-center"
                  title="Remove Course"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>

          {/* Cumulative Prior GPA checkbox */}
          <div className="pt-4 border-t border-slate-100 space-y-3">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={includePrior}
                onChange={(e) => setIncludePrior(e.target.checked)}
                className="w-4 h-4 text-indigo-600 rounded"
              />
              <span className="text-xs font-semibold text-slate-700">Include Prior Cumulative GPA & Credits</span>
            </label>

            {includePrior && (
              <div className="grid grid-cols-2 gap-4 p-3.5 bg-slate-50 rounded-xl border border-slate-200/60">
                <div>
                  <label className="text-xs text-slate-700 font-bold mb-1 block">Prior Cumulative GPA</label>
                  <input
                    type="number"
                    min="0"
                    max="4.0"
                    step="0.01"
                    value={priorGpa}
                    onChange={(e) => setPriorGpa(e.target.value === '' ? '' : Number(e.target.value))}
                    className="w-full px-3 py-1.5 text-xs font-mono border border-slate-200 rounded-lg bg-white"
                  />
                </div>
                <div>
                  <label className="text-xs text-slate-700 font-bold mb-1 block">Prior Total Credits</label>
                  <input
                    type="number"
                    min="0"
                    max="200"
                    value={priorCredits}
                    onChange={(e) => setPriorCredits(e.target.value === '' ? '' : Number(e.target.value))}
                    className="w-full px-3 py-1.5 text-xs font-mono border border-slate-200 rounded-lg bg-white"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Action Buttons: Calculate & Reset */}
          <div className="flex gap-3 pt-2 border-t border-slate-100">
            <button
              type="button"
              onClick={handleCalculate}
              className="flex-1 py-3 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-xs transition-all active:scale-95"
            >
              <Sparkles className="w-4 h-4" />
              <span>Calculate GPA</span>
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

        {/* Results Card */}
        <div className="lg:col-span-5 space-y-4">
          {stats ? (
            <div className={`bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950 text-white rounded-2xl p-6 sm:p-7 shadow-lg relative overflow-hidden transition-transform ${pulse ? 'scale-[1.01]' : ''}`}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-indigo-300">
                  Semester Grade Point Average
                </span>
                <span className={`px-2.5 py-1 text-xs font-bold rounded-lg border ${stats.badgeColor}`}>
                  {stats.standing}
                </span>
              </div>

              <div className="flex items-baseline gap-2 mb-4">
                <span className="text-5xl font-black font-mono tracking-tight text-white">
                  {stats.semesterGpa.toFixed(2)}
                </span>
                <span className="text-slate-300 text-sm font-medium">/ 4.00</span>
              </div>

              {/* Visual Gauge Bar */}
              <div className="space-y-1.5 mb-5">
                <div className="flex justify-between text-[11px] text-slate-300">
                  <span>0.0 (F)</span>
                  <span>2.0 (C)</span>
                  <span>3.0 (B)</span>
                  <span className="text-orange-300 font-bold">4.0 (A)</span>
                </div>
                <div className="h-3 bg-white/10 rounded-full overflow-hidden p-0.5">
                  <div
                    className="h-full bg-gradient-to-r from-amber-400 via-blue-400 to-orange-400 rounded-full transition-all duration-500"
                    style={{ width: `${stats.gaugePct}%` }}
                  />
                </div>
              </div>

              <div className="border-t border-slate-700/80 pt-4 space-y-2 text-xs">
                <div className="flex justify-between text-slate-300">
                  <span>Semester Course Credits:</span>
                  <strong className="text-white font-mono">{stats.semesterCredits} Credits</strong>
                </div>

                {includePrior && (
                  <div className="flex justify-between text-slate-300 pt-2 border-t border-slate-700">
                    <span>Overall Cumulative GPA:</span>
                    <strong className="text-orange-300 font-mono text-base">{stats.cumulativeGpa.toFixed(2)} ({stats.cumulativeCredits} Credits)</strong>
                  </div>
                )}
              </div>

              {/* Action Bar */}
              <div className="flex items-center gap-2 pt-4 border-t border-slate-700">
                <button
                  onClick={handleCopy}
                  className="flex-1 py-2 px-3 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-bold text-white flex items-center justify-center gap-1.5 transition-colors border border-white/10"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-orange-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied' : 'Copy GPA Summary'}</span>
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
              Enter your course credits and grades to compute your Grade Point Average.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
