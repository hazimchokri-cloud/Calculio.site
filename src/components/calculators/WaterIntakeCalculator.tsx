import React, { useState, useMemo } from 'react';
import { Droplet, Activity, Sun, Copy, Check, Bookmark } from 'lucide-react';
import { copyToClipboard, formatNumber } from '../../utils/formatters';

interface WaterIntakeCalculatorProps {
  onSaveCalculation?: (summary: string, inputs: any, results: any) => void;
}

export const WaterIntakeCalculator: React.FC<WaterIntakeCalculatorProps> = ({ onSaveCalculation }) => {
  const [unitSystem, setUnitSystem] = useState<'imperial' | 'metric'>('imperial');
  const [weightLbs, setWeightLbs] = useState<number | ''>(160);
  const [weightKg, setWeightKg] = useState<number | ''>(72);
  const [exerciseMinutes, setExerciseMinutes] = useState<number | ''>(45);
  const [climate, setClimate] = useState<'temperate' | 'hot' | 'very_hot'>('temperate');
  const [specialCondition, setSpecialCondition] = useState<'none' | 'pregnant' | 'breastfeeding'>('none');
  const [copied, setCopied] = useState<boolean>(false);
  const [saved, setSaved] = useState<boolean>(false);

  const numWeightLbs = typeof weightLbs === 'number' ? weightLbs : 0;
  const numWeightKg = typeof weightKg === 'number' ? weightKg : 0;
  const numExerciseMinutes = typeof exerciseMinutes === 'number' ? exerciseMinutes : 0;

  const isInputEmpty = unitSystem === 'imperial' ? weightLbs === '' : weightKg === '';

  const calculations = useMemo(() => {
    if (isInputEmpty) return null;
    const weightInLbs = unitSystem === 'imperial' ? numWeightLbs : numWeightKg * 2.20462;
    if (weightInLbs <= 0) return null;

    // Baseline rule: 0.5 to 0.67 oz per pound of body weight
    let totalOz = weightInLbs * 0.55;

    // Exercise addition: ~12 oz per 30 minutes of moderate-to-intense exercise
    totalOz += (numExerciseMinutes / 30) * 12;

    // Climate addition
    if (climate === 'hot') totalOz += 16;
    if (climate === 'very_hot') totalOz += 24;

    // Pregnancy & Nursing
    if (specialCondition === 'pregnant') totalOz += 10;
    if (specialCondition === 'breastfeeding') totalOz += 24;

    const totalMl = totalOz * 29.5735;
    const totalLiters = totalMl / 1000;
    const standardGlasses = totalOz / 8; // 8 oz glass

    return {
      totalOz: Math.round(totalOz),
      totalMl: Math.round(totalMl),
      totalLiters: totalLiters.toFixed(2),
      standardGlasses: Math.round(standardGlasses * 10) / 10
    };
  }, [isInputEmpty, unitSystem, numWeightLbs, numWeightKg, numExerciseMinutes, climate, specialCondition]);

  const handleCopy = async () => {
    if (!calculations) return;
    const text = `Daily Water Intake Recommendation:
Daily Hydration: ${calculations.totalLiters} Liters (${calculations.totalOz} fl oz)
Equivalent to: ~${calculations.standardGlasses} glasses (8 oz each) / ${calculations.totalMl} ml
Factors: ${numExerciseMinutes} min daily activity, ${climate} climate`;

    const ok = await copyToClipboard(text);
    if (ok) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleReset = () => {
    setUnitSystem('imperial');
    setWeightLbs(160);
    setWeightKg(72);
    setExerciseMinutes(45);
    setClimate('temperate');
    setSpecialCondition('none');
  };

  const handleSave = () => {
    if (!calculations || !onSaveCalculation) return;
    onSaveCalculation(
      `Hydration Goal: ${calculations.totalLiters} L / ${calculations.totalOz} oz (${calculations.standardGlasses} glasses/day)`,
      { unitSystem, weightLbs, weightKg, exerciseMinutes, climate, specialCondition },
      calculations
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
              <Droplet className="w-4 h-4 text-cyan-600" />
              <span>Hydration Lifestyle Factors</span>
            </h2>
            <div className="flex items-center gap-2">
              <button
                onClick={handleReset}
                className="text-xs font-semibold text-slate-600 hover:text-slate-900 px-2.5 py-1 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors"
              >
                Reset
              </button>
              <div className="flex rounded-lg bg-slate-100 p-0.5 text-xs font-bold">
                <button
                  type="button"
                  onClick={() => setUnitSystem('imperial')}
                  className={`px-2.5 py-1 rounded-md transition-all ${unitSystem === 'imperial' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600'}`}
                >
                  Imperial (lbs)
                </button>
                <button
                  type="button"
                  onClick={() => setUnitSystem('metric')}
                  className={`px-2.5 py-1 rounded-md transition-all ${unitSystem === 'metric' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600'}`}
                >
                  Metric (kg)
                </button>
              </div>
            </div>
          </div>

          {/* Weight */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 flex justify-between">
              <span>Body Weight</span>
              <span className="text-cyan-600 font-mono">{unitSystem === 'imperial' ? `${weightLbs} lbs` : `${weightKg} kg`}</span>
            </label>
            <input
              type="number"
              min="50"
              max="400"
              value={unitSystem === 'imperial' ? (weightLbs || '') : (weightKg || '')}
              onChange={(e) => {
                const val = Number(e.target.value);
                if (unitSystem === 'imperial') setWeightLbs(val);
                else setWeightKg(val);
              }}
              className="w-full p-2 text-sm font-semibold border border-slate-200 rounded-xl bg-slate-50/50 focus:bg-white focus:outline-none"
            />
          </div>

          {/* Exercise Minutes */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 flex justify-between">
              <span>Daily Exercise / Sweat Time</span>
              <span className="text-cyan-600 font-mono">{exerciseMinutes} mins/day</span>
            </label>
            <input
              type="range"
              min="0"
              max="180"
              step="15"
              value={exerciseMinutes}
              onChange={(e) => setExerciseMinutes(e.target.value === '' ? '' : Number(e.target.value))}
              className="w-full accent-cyan-600 cursor-pointer"
            />
          </div>

          {/* Climate */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700">Climate & Environment</label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'temperate', label: 'Moderate' },
                { id: 'hot', label: 'Hot / Sunny' },
                { id: 'very_hot', label: 'Very Hot / Dry' }
              ].map(c => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setClimate(c.id as any)}
                  className={`py-2 text-xs font-bold rounded-xl border transition-all ${
                    climate === c.id
                      ? 'bg-cyan-600 text-white shadow-2xs'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {c.label}
                </button>
              ))}
            </div>
          </div>

          {/* Special Condition */}
          <div className="space-y-1 pt-2 border-t border-slate-100">
            <label className="text-xs font-bold text-slate-700">Special Condition (Optional)</label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'none', label: 'None' },
                { id: 'pregnant', label: 'Pregnant' },
                { id: 'breastfeeding', label: 'Nursing' }
              ].map(cond => (
                <button
                  key={cond.id}
                  type="button"
                  onClick={() => setSpecialCondition(cond.id as any)}
                  className={`py-2 text-xs font-bold rounded-xl border transition-all ${
                    specialCondition === cond.id
                      ? 'bg-cyan-600 text-white shadow-2xs'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {cond.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Output */}
        <div className="lg:col-span-6 space-y-4">
          <div className="bg-gradient-to-br from-slate-900 via-cyan-950 to-slate-900 text-white rounded-2xl p-6 shadow-md relative">
            <div className="space-y-4">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-cyan-300">
                  Target Daily Water Intake
                </span>
                <div className="text-4xl font-black tracking-tight text-white mt-1 font-mono">
                  {calculations ? `${calculations.totalLiters} Liters` : '—'}
                  {calculations && (
                    <span className="text-sm font-normal text-slate-300 ml-2">({calculations.totalOz} fl oz)</span>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-3 border-t border-cyan-900/60">
                <div className="bg-white/10 rounded-xl p-3 backdrop-blur-xs">
                  <span className="text-[10px] text-slate-300 uppercase font-bold block">Standard 8oz Glasses</span>
                  <span className="text-xl font-bold text-cyan-300 font-mono">
                    {calculations ? `~${calculations.standardGlasses} glasses` : '—'}
                  </span>
                </div>
                <div className="bg-white/10 rounded-xl p-3 backdrop-blur-xs">
                  <span className="text-[10px] text-slate-300 uppercase font-bold block">Milliliters</span>
                  <span className="text-xl font-bold text-white font-mono">
                    {calculations ? `${formatNumber(calculations.totalMl)} ml` : '—'}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <button
                  type="button"
                  disabled={!calculations}
                  onClick={handleCopy}
                  className="flex-1 py-2 px-3 rounded-xl bg-white/10 hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed text-xs font-bold text-white flex items-center justify-center gap-1.5 transition-colors border border-white/10"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-orange-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied' : 'Copy Summary'}</span>
                </button>
                {onSaveCalculation && (
                  <button
                    type="button"
                    disabled={!calculations}
                    onClick={handleSave}
                    className="py-2 px-3 rounded-xl bg-white/10 hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed text-xs font-bold text-white flex items-center justify-center gap-1.5 transition-colors border border-white/10"
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
    </div>
  );
};
