import React, { useState, useMemo } from 'react';
import { Flame, ShieldCheck, Check, Copy, Activity, Utensils, Award } from 'lucide-react';
import { formatNumber, copyToClipboard } from '../../utils/formatters';
import confetti from 'canvas-confetti';

interface CalorieTdeeProps {
  onSaveCalculation?: (summary: string, inputs: any, results: any) => void;
}

export const CalorieTdeeCalculator: React.FC<CalorieTdeeProps> = ({ onSaveCalculation }) => {
  const [unitSystem, setUnitSystem] = useState<'imperial' | 'metric'>('imperial');
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [age, setAge] = useState<number | ''>(30);
  
  // Imperial
  const [feet, setFeet] = useState<number | ''>(5);
  const [inches, setInches] = useState<number | ''>(10);
  const [weightLbs, setWeightLbs] = useState<number | ''>(175);

  // Metric
  const [heightCm, setHeightCm] = useState<number | ''>(178);
  const [weightKg, setWeightKg] = useState<number | ''>(79);

  const [activityLevel, setActivityLevel] = useState<number | ''>(1.375); // 1.2 Sedentary, 1.375 Light, 1.55 Moderate, 1.725 Heavy, 1.9 Athlete
  const [goal, setGoal] = useState<'mild_cut' | 'cut' | 'maintain' | 'mild_bulk' | 'bulk'>('maintain');
  const [dietPlan, setDietPlan] = useState<'balanced' | 'high_protein' | 'low_carb' | 'keto'>('balanced');

  const [copied, setCopied] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const numAge = typeof age === 'number' ? age : 0;
  const numFeet = typeof feet === 'number' ? feet : 0;
  const numInches = typeof inches === 'number' ? inches : 0;
  const numWeightLbs = typeof weightLbs === 'number' ? weightLbs : 0;
  const numHeightCm = typeof heightCm === 'number' ? heightCm : 0;
  const numWeightKg = typeof weightKg === 'number' ? weightKg : 0;
  const numActivityLevel = typeof activityLevel === 'number' ? activityLevel : 1.375;

  const isInputEmpty = unitSystem === 'imperial'
    ? age === '' || feet === '' || inches === '' || weightLbs === ''
    : age === '' || heightCm === '' || weightKg === '';

  const handleReset = () => {
    setUnitSystem('imperial');
    setGender('male');
    setAge(30);
    setFeet(5);
    setInches(10);
    setWeightLbs(175);
    setHeightCm(178);
    setWeightKg(79);
    setActivityLevel(1.375);
    setGoal('maintain');
    setDietPlan('balanced');
  };

  const stats = useMemo(() => {
    try {
      if (isInputEmpty) return null;

      let hCm = 0;
      let wKg = 0;

      if (unitSystem === 'imperial') {
        const totalIn = (numFeet * 12) + numInches;
        hCm = totalIn * 2.54;
        wKg = numWeightLbs * 0.45359237;
      } else {
        hCm = numHeightCm;
        wKg = numWeightKg;
      }

      if (hCm <= 0 || wKg <= 0 || numAge <= 0) return null;

      // Mifflin-St Jeor formula
      let bmr = 10 * wKg + 6.25 * hCm - 5 * numAge;
      if (gender === 'male') {
        bmr += 5;
      } else {
        bmr -= 161;
      }

      const tdee = bmr * numActivityLevel;

      // Adjust for goal
      let targetCalories = tdee;
      if (goal === 'mild_cut') targetCalories = tdee - 250; // -0.5 lb / week
      if (goal === 'cut') targetCalories = tdee - 500; // -1 lb / week
      if (goal === 'mild_bulk') targetCalories = tdee + 250; // +0.5 lb / week
      if (goal === 'bulk') targetCalories = tdee + 500; // +1 lb / week

      targetCalories = Math.max(1200, Math.round(targetCalories));

      // Macro distributions
      let carbPct = 0.45;
      let proteinPct = 0.30;
      let fatPct = 0.25;

      if (dietPlan === 'high_protein') {
        carbPct = 0.35;
        proteinPct = 0.40;
        fatPct = 0.25;
      } else if (dietPlan === 'low_carb') {
        carbPct = 0.20;
        proteinPct = 0.40;
        fatPct = 0.40;
      } else if (dietPlan === 'keto') {
        carbPct = 0.05;
        proteinPct = 0.25;
        fatPct = 0.70;
      }

      // Carbs: 4 cal/g, Protein: 4 cal/g, Fat: 9 cal/g
      const proteinGrams = Math.round((targetCalories * proteinPct) / 4);
      const carbGrams = Math.round((targetCalories * carbPct) / 4);
      const fatGrams = Math.round((targetCalories * fatPct) / 9);

      return {
        bmr: Math.round(bmr),
        tdee: Math.round(tdee),
        targetCalories,
        proteinGrams,
        carbGrams,
        fatGrams,
        carbPct: Math.round(carbPct * 100),
        proteinPct: Math.round(proteinPct * 100),
        fatPct: Math.round(fatPct * 100),
        mildLossCal: Math.round(tdee - 250),
        lossCal: Math.round(tdee - 500),
        mildGainCal: Math.round(tdee + 250),
        gainCal: Math.round(tdee + 500)
      };
    } catch {
      return null;
    }
  }, [isInputEmpty, unitSystem, gender, numAge, numFeet, numInches, numWeightLbs, numHeightCm, numWeightKg, numActivityLevel, goal, dietPlan]);

  const handleCopy = async () => {
    if (!stats) return;
    const text = `Calorie & Macro Plan:
• BMR: ${stats.bmr} kcal/day
• TDEE (Maintenance): ${stats.tdee} kcal/day
• Target Calories: ${stats.targetCalories} kcal/day
• Protein: ${stats.proteinGrams}g (${stats.proteinPct}%)
• Carbs: ${stats.carbGrams}g (${stats.carbPct}%)
• Fats: ${stats.fatGrams}g (${stats.fatPct}%)`;

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
        `Calories: ${stats.targetCalories} kcal (${stats.proteinGrams}g P / ${stats.carbGrams}g C / ${stats.fatGrams}g F)`,
        { age, gender, activityLevel, goal, dietPlan },
        { tdee: stats.tdee, targetCalories: stats.targetCalories }
      );
      setSavedSuccess(true);
      confetti({ particleCount: 40, spread: 60, origin: { y: 0.8 } });
      setTimeout(() => setSavedSuccess(false), 2500);
    }
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Input Column */}
        <div className="lg:col-span-7 bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <h3 className="text-lg font-bold text-slate-900">Your Demographics & Activity</h3>
              <p className="text-xs text-slate-700">Calculates precise metabolic expenditure (Mifflin-St Jeor equation).</p>
            </div>
            
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleReset}
                className="text-xs font-semibold text-slate-600 hover:text-slate-900 px-2.5 py-1 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors"
              >
                Reset
              </button>
              <div className="flex bg-slate-100 p-1 rounded-lg">
                <button
                  type="button"
                  onClick={() => setUnitSystem('imperial')}
                  className={`px-3 py-1 text-xs font-bold rounded-md transition-all ${
                    unitSystem === 'imperial' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  US Units
                </button>
                <button
                  type="button"
                  onClick={() => setUnitSystem('metric')}
                  className={`px-3 py-1 text-xs font-bold rounded-md transition-all ${
                    unitSystem === 'metric' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Metric
                </button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-slate-700 block">Biological Sex</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setGender('male')}
                  className={`py-2 text-xs font-bold rounded-lg border transition-all ${
                    gender === 'male' ? 'bg-orange-50 text-orange-800 border-orange-300' : 'bg-white text-slate-700 border-slate-200'
                  }`}
                >
                  Male
                </button>
                <button
                  type="button"
                  onClick={() => setGender('female')}
                  className={`py-2 text-xs font-bold rounded-lg border transition-all ${
                    gender === 'female' ? 'bg-orange-50 text-orange-800 border-orange-300' : 'bg-white text-slate-700 border-slate-200'
                  }`}
                >
                  Female
                </button>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-slate-700 block">Age</label>
              <input
                type="number"
                min="10"
                max="110"
                value={age}
                onChange={(e) => setAge(e.target.value === '' ? '' : Number(e.target.value))}
                className="w-full px-3 py-2 font-mono-numbers text-sm font-semibold border border-slate-200 rounded-lg focus:ring-2 focus:ring-orange-500 bg-slate-50/50"
              />
            </div>
          </div>

          {/* Height and Weight */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {unitSystem === 'imperial' ? (
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-slate-700 block">Height (ft & in)</label>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="number"
                    value={feet}
                    onChange={(e) => setFeet(e.target.value === '' ? '' : Number(e.target.value))}
                    placeholder="Feet"
                    className="w-full px-3 py-2 text-sm font-mono-numbers border border-slate-200 rounded-lg bg-slate-50/50"
                  />
                  <input
                    type="number"
                    value={inches}
                    onChange={(e) => setInches(e.target.value === '' ? '' : Number(e.target.value))}
                    placeholder="Inches"
                    className="w-full px-3 py-2 text-sm font-mono-numbers border border-slate-200 rounded-lg bg-slate-50/50"
                  />
                </div>
              </div>
            ) : (
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-slate-700 block">Height (cm)</label>
                <input
                  type="number"
                  value={heightCm}
                  onChange={(e) => setHeightCm(e.target.value === '' ? '' : Number(e.target.value))}
                  className="w-full px-3 py-2 text-sm font-mono-numbers border border-slate-200 rounded-lg bg-slate-50/50"
                />
              </div>
            )}

            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-slate-700 block">Weight ({unitSystem === 'imperial' ? 'lbs' : 'kg'})</label>
              <input
                type="number"
                value={unitSystem === 'imperial' ? weightLbs : weightKg}
                onChange={(e) => {
                  const val = e.target.value === '' ? '' : Number(e.target.value);
                  if (unitSystem === 'imperial') setWeightLbs(val);
                  else setWeightKg(val);
                }}
                className="w-full px-3 py-2 text-sm font-mono-numbers border border-slate-200 rounded-lg bg-slate-50/50"
              />
            </div>
          </div>

          {/* Activity Level */}
          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-slate-700 block">Daily Physical Activity</label>
            <select
              value={activityLevel}
              onChange={(e) => setActivityLevel(e.target.value === '' ? '' : Number(e.target.value))}
              className="w-full px-3 py-2.5 text-xs font-semibold border border-slate-200 rounded-lg focus:ring-2 focus:ring-orange-500 bg-slate-50"
            >
              <option value={1.2}>Sedentary (Little or no exercise, desk job)</option>
              <option value={1.375}>Lightly Active (Exercise 1-3 days/week)</option>
              <option value={1.55}>Moderately Active (Exercise 3-5 days/week)</option>
              <option value={1.725}>Very Active (Hard exercise 6-7 days/week)</option>
              <option value={1.9}>Extremely Active (Physical job or 2x daily training)</option>
            </select>
          </div>

          {/* Goal & Diet Pattern */}
          <div className="pt-2 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-slate-700 block">Fitness Goal</label>
              <select
                value={goal}
                onChange={(e) => setGoal(e.target.value as any)}
                className="w-full px-3 py-2 text-xs font-semibold border border-slate-200 rounded-lg bg-slate-50"
              >
                <option value="cut">Weight Loss (-1 lb/week, -500 kcal)</option>
                <option value="mild_cut">Mild Weight Loss (-0.5 lb/week, -250 kcal)</option>
                <option value="maintain">Maintain Weight (TDEE)</option>
                <option value="mild_bulk">Mild Muscle Gain (+0.5 lb/week, +250 kcal)</option>
                <option value="bulk">Weight / Muscle Gain (+1 lb/week, +500 kcal)</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-slate-700 block">Macro Ratio</label>
              <select
                value={dietPlan}
                onChange={(e) => setDietPlan(e.target.value as any)}
                className="w-full px-3 py-2 text-xs font-semibold border border-slate-200 rounded-lg bg-slate-50"
              >
                <option value="balanced">Balanced (45% Carb / 30% Protein / 25% Fat)</option>
                <option value="high_protein">High Protein (35% Carb / 40% Protein / 25% Fat)</option>
                <option value="low_carb">Low Carb (20% Carb / 40% Protein / 40% Fat)</option>
                <option value="keto">Keto (5% Carb / 25% Protein / 70% Fat)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results Card */}
        <div className="lg:col-span-5 space-y-5">
          <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-orange-950 text-white rounded-2xl p-6 sm:p-7 shadow-lg relative overflow-hidden">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-orange-300 flex items-center gap-1">
                <Flame className="w-4 h-4 text-orange-400" />
                Target Daily Energy Needs
              </span>
              <span className="px-2 py-0.5 text-xs font-bold bg-orange-500/20 text-orange-300 rounded border border-orange-500/30">
                {goal.replace('_', ' ').toUpperCase()}
              </span>
            </div>

            {stats ? (
              <>
                <div className="flex items-baseline gap-2 mb-6">
                  <span className="text-5xl font-black font-mono-numbers tracking-tight text-white">
                    {formatNumber(stats.targetCalories, 0)}
                  </span>
                  <span className="text-slate-300 text-sm font-medium">Calories / day</span>
                </div>

                {/* Macro Breakdown 3 Cards */}
                <div className="grid grid-cols-3 gap-2 mb-6">
                  <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700 text-center">
                    <span className="text-[11px] text-blue-300 font-semibold block">Protein</span>
                    <strong className="text-lg font-black font-mono-numbers text-white block my-0.5">{stats.proteinGrams}g</strong>
                    <span className="text-[10px] text-slate-400 font-mono-numbers">{stats.proteinPct}%</span>
                  </div>

                  <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700 text-center">
                    <span className="text-[11px] text-orange-300 font-semibold block">Carbs</span>
                    <strong className="text-lg font-black font-mono-numbers text-white block my-0.5">{stats.carbGrams}g</strong>
                    <span className="text-[10px] text-slate-400 font-mono-numbers">{stats.carbPct}%</span>
                  </div>

                  <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700 text-center">
                    <span className="text-[11px] text-rose-300 font-semibold block">Fats</span>
                    <strong className="text-lg font-black font-mono-numbers text-white block my-0.5">{stats.fatGrams}g</strong>
                    <span className="text-[10px] text-slate-400 font-mono-numbers">{stats.fatPct}%</span>
                  </div>
                </div>

                {/* Baseline Reference Grid */}
                <div className="border-t border-slate-700 pt-4 grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="text-slate-400 block">Basal Metabolic Rate (BMR):</span>
                    <strong className="text-white font-mono-numbers">{stats.bmr} kcal</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Maintenance (TDEE):</span>
                    <strong className="text-orange-300 font-mono-numbers">{stats.tdee} kcal</strong>
                  </div>
                </div>
              </>
            ) : (
              <div className="py-8 text-center space-y-2">
                <p className="text-orange-300 font-semibold text-sm">Please enter a value.</p>
                <p className="text-slate-400 text-xs">Fill in your age, height, and weight to calculate calories.</p>
              </div>
            )}
          </div>

          {/* Action buttons */}
          {stats && (
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={handleCopy}
                className="flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold transition-all shadow-2xs"
              >
                {copied ? <Check className="w-4 h-4 text-orange-600" /> : <Copy className="w-4 h-4 text-slate-700" />}
                {copied ? 'Copied!' : 'Copy Plan'}
              </button>

              <button
                type="button"
                onClick={handleSave}
                className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold transition-all shadow-2xs"
              >
                <ShieldCheck className="w-4 h-4" />
                {savedSuccess ? 'Saved!' : 'Save Result'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
