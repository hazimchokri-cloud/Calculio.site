import React, { useState, useMemo } from 'react';
import { GraduationCap, Award, Percent, RotateCcw, Copy, Check, Info } from 'lucide-react';
import { copyToClipboard } from '../../utils/formatters';

interface FinalGradeCalculatorProps {
  currencySymbol?: string;
  onSave?: (summary: string, inputs: any, results: any) => void;
}

export const FinalGradeCalculator: React.FC<FinalGradeCalculatorProps> = ({
  onSave
}) => {
  const [currentGrade, setCurrentGrade] = useState<number | ''>(85); // 85%
  const [targetGrade, setTargetGrade] = useState<number | ''>(90); // 90% (A)
  const [finalWeight, setFinalWeight] = useState<number | ''>(25); // 25% of overall grade

  const [copied, setCopied] = useState(false);

  const numCurrentGrade = typeof currentGrade === 'number' ? currentGrade : 0;
  const numTargetGrade = typeof targetGrade === 'number' ? targetGrade : 0;
  const numFinalWeight = typeof finalWeight === 'number' ? finalWeight : 0;

  const isInputEmpty = currentGrade === '' || targetGrade === '' || finalWeight === '';

  const results = useMemo(() => {
    if (isInputEmpty || numFinalWeight <= 0) return null;

    // Formula: Required Final = (Target - Current * (1 - Weight)) / Weight
    const currentWeight = (100 - numFinalWeight) / 100;
    const finalWeightDecimal = numFinalWeight / 100;

    const requiredScore = finalWeightDecimal > 0
      ? (numTargetGrade - (numCurrentGrade * currentWeight)) / finalWeightDecimal
      : 0;

    let difficultyStatus = 'Achievable';
    let difficultyColor = 'text-orange-700 bg-orange-50 border-orange-200';

    if (requiredScore > 100) {
      difficultyStatus = 'Extra Credit Needed (>100%)';
      difficultyColor = 'text-rose-700 bg-rose-50 border-rose-200';
    } else if (requiredScore > 90) {
      difficultyStatus = 'Challenging (90-100%)';
      difficultyColor = 'text-amber-700 bg-amber-50 border-amber-200';
    } else if (requiredScore <= 0) {
      difficultyStatus = 'Already Guaranteed (≤0%)';
      difficultyColor = 'text-blue-700 bg-blue-50 border-blue-200';
    }

    return {
      requiredScore: Math.round(requiredScore * 10) / 10,
      difficultyStatus,
      difficultyColor
    };
  }, [isInputEmpty, numCurrentGrade, numTargetGrade, numFinalWeight]);

  const handleCopy = () => {
    if (!results) return;
    const text = `Final Exam Grade Needed:
Current Grade: ${numCurrentGrade}%
Target Final Grade: ${numTargetGrade}%
Final Exam Weight: ${numFinalWeight}%
Required Exam Score: ${results.requiredScore}% (${results.difficultyStatus})`;
    copyToClipboard(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReset = () => {
    setCurrentGrade(85);
    setTargetGrade(90);
    setFinalWeight(25);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
              <GraduationCap className="w-4 h-4 text-orange-600" />
              <span>Grade & Weight Inputs</span>
            </h4>
            <button
              onClick={handleReset}
              className="text-xs font-semibold text-slate-600 hover:text-slate-900 px-2.5 py-1 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors"
            >
              Reset
            </button>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Your Current Grade (%)</label>
            <input
              type="number"
              min="0"
              max="150"
              step="0.5"
              value={currentGrade}
              onChange={(e) => setCurrentGrade(e.target.value === '' ? '' : Number(e.target.value))}
              placeholder="85"
              className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs font-bold"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Desired Overall Class Grade (%)</label>
            <div className="grid grid-cols-4 gap-2 mb-2">
              {[
                { label: 'A (90%)', val: 90 },
                { label: 'B (80%)', val: 80 },
                { label: 'C (70%)', val: 70 },
                { label: 'Pass (60%)', val: 60 }
              ].map(preset => (
                <button
                  key={preset.val}
                  type="button"
                  onClick={() => setTargetGrade(preset.val)}
                  className={`py-1 rounded-lg text-[11px] font-bold border transition-all ${
                    targetGrade === preset.val
                      ? 'bg-orange-600 text-white border-orange-600 shadow-2xs'
                      : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  {preset.label}
                </button>
              ))}
            </div>
            <input
              type="number"
              min="0"
              max="100"
              step="0.5"
              value={targetGrade}
              onChange={(e) => setTargetGrade(e.target.value === '' ? '' : Number(e.target.value))}
              placeholder="90"
              className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs font-bold"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Final Exam Weight (%)</label>
            <input
              type="number"
              min="1"
              max="100"
              step="1"
              value={finalWeight}
              onChange={(e) => setFinalWeight(e.target.value === '' ? '' : Number(e.target.value))}
              placeholder="25"
              className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs font-bold"
            />
            <span className="text-[10px] text-slate-500 mt-1 block">What percent of your whole grade is the final exam worth?</span>
          </div>
        </div>

        {/* Results Card */}
        {results && (
          <div className="bg-gradient-to-br from-orange-50 to-teal-50/60 p-6 rounded-2xl border border-orange-200 flex flex-col justify-between space-y-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-orange-200">
                <span className="text-xs font-bold uppercase tracking-wider text-orange-900">Required Final Exam Score</span>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${results.difficultyColor}`}>
                  {results.difficultyStatus}
                </span>
              </div>

              <div className="p-5 bg-white rounded-xl border border-orange-200 shadow-2xs text-center space-y-1">
                <span className="text-[11px] font-bold text-slate-500 uppercase">You Need To Score:</span>
                <div className="text-4xl font-black text-orange-950 font-mono-numbers">
                  {results.requiredScore}%
                </div>
                <p className="text-xs text-slate-600 font-medium pt-1">
                  To achieve your target grade of <strong>{targetGrade}%</strong> overall.
                </p>
              </div>

              <div className="bg-white p-3.5 rounded-xl border border-orange-100 space-y-1.5 text-xs text-slate-700">
                <span className="font-bold text-slate-900 block">Calculation Formula:</span>
                <div className="font-mono text-[11px] p-2 bg-slate-50 rounded-lg text-slate-800">
                  Score = [Target - Current × (1 - Weight)] ÷ Weight
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-orange-200">
              <button
                type="button"
                onClick={handleCopy}
                className="w-full py-2 px-3 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-xs font-bold text-slate-700 flex items-center justify-center gap-1.5 transition-all shadow-2xs"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-orange-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied Result' : 'Copy Grade Target'}</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
