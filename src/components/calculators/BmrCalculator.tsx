import React, { useState, useMemo } from 'react';
import { formatNumber, copyToClipboard } from '../../utils/formatters';
import { Flame, Activity, Copy, Check, Bookmark, Scale } from 'lucide-react';

interface BmrCalculatorProps {
  onSaveCalculation?: (summary: string, inputs: any, results: any) => void;
}

export const BmrCalculator: React.FC<BmrCalculatorProps> = ({ onSaveCalculation }) => {
  const [unitSystem, setUnitSystem] = useState<'metric' | 'imperial'>('metric');
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [age, setAge] = useState<number | ''>(28);
  const [heightCm, setHeightCm] = useState<number | ''>(178);
  const [heightFt, setHeightFt] = useState<number | ''>(5);
  const [heightIn, setHeightIn] = useState<number | ''>(10);
  const [weightKg, setWeightKg] = useState<number | ''>(76);
  const [weightLbs, setWeightLbs] = useState<number | ''>(168);
  const [bodyFatPct, setBodyFatPct] = useState<number | ''>(18);
  const [copied, setCopied] = useState<boolean>(false);
  const [saved, setSaved] = useState<boolean>(false);

  const numAge = typeof age === 'number' ? age : 0;
  const numHeightCm = typeof heightCm === 'number' ? heightCm : 0;
  const numHeightFt = typeof heightFt === 'number' ? heightFt : 0;
  const numHeightIn = typeof heightIn === 'number' ? heightIn : 0;
  const numWeightKg = typeof weightKg === 'number' ? weightKg : 0;
  const numWeightLbs = typeof weightLbs === 'number' ? weightLbs : 0;
  const numBodyFatPct = typeof bodyFatPct === 'number' ? bodyFatPct : 20;

  const isInputEmpty = unitSystem === 'metric'
    ? age === '' || heightCm === '' || weightKg === ''
    : age === '' || heightFt === '' || heightIn === '' || weightLbs === '';

  const calculations = useMemo(() => {
    if (isInputEmpty) return null;

    let weightInKg = unitSystem === 'metric' ? numWeightKg : numWeightLbs * 0.45359237;
    let heightInCmVal = unitSystem === 'metric' ? numHeightCm : (numHeightFt * 12 + numHeightIn) * 2.54;

    if (weightInKg <= 0 || heightInCmVal <= 0 || numAge <= 0) return null;

    weightInKg = Math.max(20, weightInKg);
    heightInCmVal = Math.max(50, heightInCmVal);
    const validAge = Math.max(10, numAge);

    // 1. Mifflin-St Jeor Equation (Most accurate standard)
    let bmrMifflin = 10 * weightInKg + 6.25 * heightInCmVal - 5 * validAge + (gender === 'male' ? 5 : -161);

    // 2. Revised Harris-Benedict Equation
    let bmrHarris = gender === 'male'
      ? 13.397 * weightInKg + 4.799 * heightInCmVal - 5.677 * validAge + 88.362
      : 9.247 * weightInKg + 3.098 * heightInCmVal - 4.330 * validAge + 447.593;

    // 3. Katch-McArdle Equation (Based on Lean Body Mass)
    const leanMassKg = weightInKg * (1 - numBodyFatPct / 100);
    const bmrKatch = 370 + 21.6 * leanMassKg;

    // Activity Multipliers based on Mifflin
    const activityLevels = [
      { label: 'Sedentary (Little or no exercise)', mult: 1.2 },
      { label: 'Light (Exercise 1-3 times/week)', mult: 1.375 },
      { label: 'Moderate (Exercise 4-5 times/week)', mult: 1.55 },
      { label: 'Very Active (Intense exercise 6-7 times/week)', mult: 1.725 },
      { label: 'Extra Active (Hard manual job or 2x training)', mult: 1.9 }
    ].map(lvl => ({
      ...lvl,
      calories: Math.round(bmrMifflin * lvl.mult)
    }));

    return {
      bmrMifflin: Math.round(bmrMifflin),
      bmrHarris: Math.round(bmrHarris),
      bmrKatch: Math.round(bmrKatch),
      activityLevels
    };
  }, [isInputEmpty, unitSystem, gender, numAge, numHeightCm, numHeightFt, numHeightIn, numWeightKg, numWeightLbs, numBodyFatPct]);

  const handleCopy = async () => {
    if (!calculations) return;
    const text = `Basal Metabolic Rate (BMR) Summary:
Mifflin-St Jeor (Standard): ${calculations.bmrMifflin} kcal/day
Revised Harris-Benedict: ${calculations.bmrHarris} kcal/day
Katch-McArdle (Lean Mass): ${calculations.bmrKatch} kcal/day
Sedentary TDEE: ${calculations.activityLevels[0].calories} kcal/day
Moderate Activity TDEE: ${calculations.activityLevels[2].calories} kcal/day`;

    const ok = await copyToClipboard(text);
    if (ok) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleReset = () => {
    setUnitSystem('metric');
    setGender('male');
    setAge(28);
    setHeightCm(178);
    setHeightFt(5);
    setHeightIn(10);
    setWeightKg(76);
    setWeightLbs(168);
    setBodyFatPct(18);
  };

  const handleSave = () => {
    if (!calculations) return;
    if (onSaveCalculation) {
      onSaveCalculation(
        `BMR: ${calculations.bmrMifflin} kcal/day (${gender}, ${age}y, ${unitSystem === 'metric' ? `${weightKg}kg` : `${weightLbs}lbs`})`,
        { gender, age, unitSystem, heightCm, weightKg },
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
              <Flame className="w-4 h-4 text-rose-600" />
              <span>Biometric Inputs</span>
            </h2>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleReset}
                className="text-xs font-semibold text-slate-600 hover:text-slate-900 px-2.5 py-1 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors"
              >
                Reset
              </button>
              <div className="flex rounded-lg bg-slate-100 p-0.5 text-xs font-bold">
                <button
                  type="button"
                  onClick={() => setUnitSystem('metric')}
                  className={`px-2.5 py-1 rounded-md transition-all ${unitSystem === 'metric' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600'}`}
                >
                  Metric (kg/cm)
                </button>
                <button
                  type="button"
                  onClick={() => setUnitSystem('imperial')}
                  className={`px-2.5 py-1 rounded-md transition-all ${unitSystem === 'imperial' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600'}`}
                >
                  Imperial (lbs/ft)
                </button>
              </div>
            </div>
          </div>

          {/* Gender */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700">Biological Sex</label>
            <div className="grid grid-cols-2 gap-2">
              {(['male', 'female'] as const).map(g => (
                <button
                  key={g}
                  type="button"
                  onClick={() => setGender(g)}
                  className={`py-2 rounded-xl text-xs font-bold uppercase transition-all ${
                    gender === g
                      ? 'bg-rose-600 text-white shadow-2xs'
                      : 'bg-slate-50 text-slate-700 border border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {g}
                </button>
              ))}
            </div>
          </div>

          {/* Age */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700 flex justify-between">
              <span>Age</span>
              <span className="text-rose-600 font-mono">{age} years</span>
            </label>
            <input
              type="number"
              min="10"
              max="100"
              value={age}
              onChange={(e) => setAge(e.target.value === '' ? '' : Number(e.target.value))}
              className="w-full p-2 text-sm font-semibold border border-slate-200 rounded-xl bg-slate-50/50 focus:bg-white focus:outline-none"
            />
          </div>

          {/* Height */}
          {unitSystem === 'metric' ? (
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 flex justify-between">
                <span>Height (cm)</span>
                <span className="text-rose-600 font-mono">{heightCm} cm</span>
              </label>
              <input
                type="number"
                min="50"
                max="250"
                value={heightCm}
                onChange={(e) => setHeightCm(e.target.value === '' ? '' : Number(e.target.value))}
                className="w-full p-2 text-sm font-semibold border border-slate-200 rounded-xl bg-slate-50/50 focus:bg-white focus:outline-none"
              />
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-2">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Feet</label>
                <input
                  type="number"
                  min="3"
                  max="8"
                  value={heightFt}
                  onChange={(e) => setHeightFt(e.target.value === '' ? '' : Number(e.target.value))}
                  className="w-full p-2 text-sm font-semibold border border-slate-200 rounded-xl bg-slate-50/50 focus:bg-white focus:outline-none"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Inches</label>
                <input
                  type="number"
                  min="0"
                  max="11"
                  value={heightIn}
                  onChange={(e) => setHeightIn(e.target.value === '' ? '' : Number(e.target.value))}
                  className="w-full p-2 text-sm font-semibold border border-slate-200 rounded-xl bg-slate-50/50 focus:bg-white focus:outline-none"
                />
              </div>
            </div>
          )}

          {/* Weight */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700 flex justify-between">
              <span>Weight ({unitSystem === 'metric' ? 'kg' : 'lbs'})</span>
              <span className="text-rose-600 font-mono">{unitSystem === 'metric' ? `${weightKg} kg` : `${weightLbs} lbs`}</span>
            </label>
            <input
              type="number"
              min="20"
              max="350"
              value={unitSystem === 'metric' ? weightKg : weightLbs}
              onChange={(e) => {
                const val = e.target.value === '' ? '' : Number(e.target.value);
                if (unitSystem === 'metric') setWeightKg(val);
                else setWeightLbs(val);
              }}
              className="w-full p-2 text-sm font-semibold border border-slate-200 rounded-xl bg-slate-50/50 focus:bg-white focus:outline-none"
            />
          </div>

          {/* Body Fat % (Optional for Katch-McArdle) */}
          <div className="space-y-1 pt-2 border-t border-slate-100">
            <label className="text-xs font-bold text-slate-700 flex justify-between">
              <span>Body Fat % (Optional for Katch-McArdle)</span>
              <span className="text-slate-500 font-mono">{bodyFatPct}%</span>
            </label>
            <input
              type="number"
              min="3"
              max="60"
              value={bodyFatPct}
              onChange={(e) => setBodyFatPct(e.target.value === '' ? '' : Number(e.target.value))}
              className="w-full p-2 text-sm font-semibold border border-slate-200 rounded-xl bg-slate-50/50 focus:bg-white focus:outline-none"
            />
          </div>
        </div>

        {/* Right Output */}
        <div className="lg:col-span-6 space-y-4">
          <div className="bg-gradient-to-br from-slate-900 via-rose-950 to-slate-900 text-white rounded-2xl p-6 shadow-md relative">
            <div className="space-y-4">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-rose-300">
                  Basal Metabolic Rate (BMR)
                </span>
                <div className="text-4xl font-black tracking-tight text-white mt-1 font-mono">
                  {calculations ? formatNumber(calculations.bmrMifflin) : '—'}
                  <span className="text-sm font-normal text-slate-300 ml-1.5">Calories / day at complete rest</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-3 border-t border-rose-900/60">
                <div className="bg-white/10 rounded-xl p-3 backdrop-blur-xs">
                  <span className="text-[10px] text-slate-300 uppercase font-bold block">Harris-Benedict</span>
                  <span className="text-base font-bold text-white font-mono">{calculations ? `${formatNumber(calculations.bmrHarris)} kcal` : '—'}</span>
                </div>
                <div className="bg-white/10 rounded-xl p-3 backdrop-blur-xs">
                  <span className="text-[10px] text-slate-300 uppercase font-bold block">Katch-McArdle (LBM)</span>
                  <span className="text-base font-bold text-white font-mono">{calculations ? `${formatNumber(calculations.bmrKatch)} kcal` : '—'}</span>
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

          {/* Daily TDEE Multipliers Table */}
          <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-2xs space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">Daily Maintenance Calories by Activity</h3>
            <div className="space-y-1.5 text-xs">
              {calculations ? (
                calculations.activityLevels.map((lvl, idx) => (
                  <div key={idx} className="flex items-center justify-between py-1.5 px-2 rounded-lg bg-slate-50 hover:bg-rose-50 transition-colors">
                    <span className="text-slate-700 font-medium">{lvl.label}</span>
                    <span className="font-bold text-slate-900 font-mono-numbers">{formatNumber(lvl.calories)} kcal/day</span>
                  </div>
                ))
              ) : (
                <div className="text-xs text-slate-500 py-3 text-center">
                  Please enter your age, height, and weight to view daily activity maintenance calories.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
