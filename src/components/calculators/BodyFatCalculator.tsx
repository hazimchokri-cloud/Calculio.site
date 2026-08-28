import React, { useState, useMemo } from 'react';
import { Activity, ShieldCheck, Check, Copy } from 'lucide-react';
import { formatNumber, copyToClipboard } from '../../utils/formatters';
import confetti from 'canvas-confetti';

interface BodyFatCalculatorProps {
  onSaveCalculation?: (summary: string, inputs: any, results: any) => void;
}

export const BodyFatCalculator: React.FC<BodyFatCalculatorProps> = ({ onSaveCalculation }) => {
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [unitSystem, setUnitSystem] = useState<'imperial' | 'metric'>('imperial');
  const [age, setAge] = useState<number | ''>(30);

  // Imperial (inches, lbs)
  const [heightIn, setHeightIn] = useState<number | ''>(70);
  const [weightLbs, setWeightLbs] = useState<number | ''>(175);
  const [neckIn, setNeckIn] = useState<number | ''>(15.5);
  const [waistIn, setWaistIn] = useState<number | ''>(34);
  const [hipIn, setHipIn] = useState<number | ''>(38); // female

  const [copied, setCopied] = useState<boolean>(false);

  const numHeightIn = typeof heightIn === 'number' ? heightIn : 0;
  const numWeightLbs = typeof weightLbs === 'number' ? weightLbs : 0;
  const numNeckIn = typeof neckIn === 'number' ? neckIn : 0;
  const numWaistIn = typeof waistIn === 'number' ? waistIn : 0;
  const numHipIn = typeof hipIn === 'number' ? hipIn : 0;

  const isInputEmpty = heightIn === '' || weightLbs === '' || neckIn === '' || waistIn === '' || (gender === 'female' && hipIn === '');

  const handleUnitToggle = (sys: 'imperial' | 'metric') => {
    if (sys === unitSystem) return;
    if (sys === 'metric') {
      // Imperial -> Metric
      setHeightIn(Math.round(numHeightIn * 2.54));
      setWeightLbs(Math.round(numWeightLbs * 0.45359237 * 10) / 10);
      setNeckIn(Math.round(numNeckIn * 2.54 * 10) / 10);
      setWaistIn(Math.round(numWaistIn * 2.54 * 10) / 10);
      setHipIn(Math.round(numHipIn * 2.54 * 10) / 10);
    } else {
      // Metric -> Imperial
      setHeightIn(Math.round(numHeightIn / 2.54));
      setWeightLbs(Math.round((numWeightLbs / 0.45359237) * 10) / 10);
      setNeckIn(Math.round((numNeckIn / 2.54) * 10) / 10);
      setWaistIn(Math.round((numWaistIn / 2.54) * 10) / 10);
      setHipIn(Math.round((numHipIn / 2.54) * 10) / 10);
    }
    setUnitSystem(sys);
  };

  const handleReset = () => {
    setGender('male');
    setUnitSystem('imperial');
    setAge(30);
    setHeightIn(70);
    setWeightLbs(175);
    setNeckIn(15.5);
    setWaistIn(34);
    setHipIn(38);
  };

  const stats = useMemo(() => {
    if (isInputEmpty) return null;

    let hIn = numHeightIn;
    let wLbs = numWeightLbs;
    let nIn = numNeckIn;
    let wsIn = numWaistIn;
    let hpIn = numHipIn;

    if (unitSystem === 'metric') {
      // In metric mode, input numbers are cm and kg
      hIn = numHeightIn / 2.54;
      wLbs = numWeightLbs * 2.20462;
      nIn = numNeckIn / 2.54;
      wsIn = numWaistIn / 2.54;
      hpIn = numHipIn / 2.54;
    }

    if (hIn <= 0 || wLbs <= 0 || nIn <= 0 || wsIn <= 0) return null;

    let bodyFatPercent = 0;

    if (gender === 'male') {
      // US Navy Male: 86.010 * log10(waist - neck) - 70.041 * log10(height) + 36.76
      const diff = wsIn - nIn;
      if (diff > 0 && hIn > 0) {
        bodyFatPercent = 86.010 * Math.log10(diff) - 70.041 * Math.log10(hIn) + 36.76;
      }
    } else {
      // US Navy Female: 163.205 * log10(waist + hip - neck) - 97.684 * log10(height) - 78.387
      const sum = wsIn + hpIn - nIn;
      if (sum > 0 && hIn > 0) {
        bodyFatPercent = 163.205 * Math.log10(sum) - 97.684 * Math.log10(hIn) - 78.387;
      }
    }

    bodyFatPercent = Math.max(2, Math.min(60, bodyFatPercent));

    const totalWeightUser = numWeightLbs;
    const fatMass = (totalWeightUser * bodyFatPercent) / 100;
    const leanMass = totalWeightUser - fatMass;

    let category = 'Fitness';
    if (gender === 'male') {
      if (bodyFatPercent < 6) category = 'Essential Fat';
      else if (bodyFatPercent < 14) category = 'Athletes';
      else if (bodyFatPercent < 18) category = 'Fitness';
      else if (bodyFatPercent < 25) category = 'Average';
      else category = 'Obese';
    } else {
      if (bodyFatPercent < 14) category = 'Essential Fat';
      else if (bodyFatPercent < 21) category = 'Athletes';
      else if (bodyFatPercent < 25) category = 'Fitness';
      else if (bodyFatPercent < 32) category = 'Average';
      else category = 'Obese';
    }

    return {
      bodyFatPercent: Number(bodyFatPercent.toFixed(1)),
      fatMass: Number(fatMass.toFixed(1)),
      leanMass: Number(leanMass.toFixed(1)),
      unitLabel: unitSystem === 'imperial' ? 'lbs' : 'kg',
      category
    };
  }, [isInputEmpty, gender, unitSystem, numHeightIn, numWeightLbs, numNeckIn, numWaistIn, numHipIn]);

  const handleCopy = async () => {
    if (!stats) return;
    const text = `Body Fat Estimate (U.S. Navy Method):
• Body Fat Percentage: ${stats.bodyFatPercent}% (${stats.category})
• Fat Mass: ${stats.fatMass} ${stats.unitLabel}
• Lean Muscle Mass: ${stats.leanMass} ${stats.unitLabel}`;

    const ok = await copyToClipboard(text);
    if (ok) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Inputs */}
        <div className="lg:col-span-7 bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-5">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="text-base font-bold text-slate-900">U.S. Navy Body Circumferences</h3>
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
                  onClick={() => handleUnitToggle('imperial')}
                  className={`px-3 py-1 text-xs font-bold rounded-md ${
                    unitSystem === 'imperial' ? 'bg-white shadow-2xs' : 'text-slate-600'
                  }`}
                >
                  Inches / lbs
                </button>
                <button
                  type="button"
                  onClick={() => handleUnitToggle('metric')}
                  className={`px-3 py-1 text-xs font-bold rounded-md ${
                    unitSystem === 'metric' ? 'bg-white shadow-2xs' : 'text-slate-600'
                  }`}
                >
                  cm / kg
                </button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700 block">Sex</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setGender('male')}
                  className={`py-2 text-xs font-bold rounded-lg border ${
                    gender === 'male' ? 'bg-rose-50 text-rose-700 border-rose-300' : 'bg-white text-slate-700'
                  }`}
                >
                  Male
                </button>
                <button
                  type="button"
                  onClick={() => setGender('female')}
                  className={`py-2 text-xs font-bold rounded-lg border ${
                    gender === 'female' ? 'bg-rose-50 text-rose-700 border-rose-300' : 'bg-white text-slate-700'
                  }`}
                >
                  Female
                </button>
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700 block">Height ({unitSystem === 'imperial' ? 'in' : 'cm'})</label>
              <input
                type="number"
                value={heightIn}
                onChange={(e) => setHeightIn(e.target.value === '' ? '' : Number(e.target.value))}
                className="w-full px-3 py-1.5 text-xs font-mono-numbers border border-slate-200 rounded-lg bg-slate-50"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">Weight ({unitSystem === 'imperial' ? 'lbs' : 'kg'})</label>
              <input
                type="number"
                value={weightLbs}
                onChange={(e) => setWeightLbs(e.target.value === '' ? '' : Number(e.target.value))}
                className="w-full px-3 py-1.5 text-xs font-mono-numbers border border-slate-200 rounded-lg bg-slate-50"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">Neck Circumference ({unitSystem === 'imperial' ? 'in' : 'cm'})</label>
              <input
                type="number"
                step="0.1"
                value={neckIn}
                onChange={(e) => setNeckIn(e.target.value === '' ? '' : Number(e.target.value))}
                className="w-full px-3 py-1.5 text-xs font-mono-numbers border border-slate-200 rounded-lg bg-slate-50"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">Waist (at navel) ({unitSystem === 'imperial' ? 'in' : 'cm'})</label>
              <input
                type="number"
                step="0.1"
                value={waistIn}
                onChange={(e) => setWaistIn(e.target.value === '' ? '' : Number(e.target.value))}
                className="w-full px-3 py-1.5 text-xs font-mono-numbers border border-slate-200 rounded-lg bg-slate-50"
              />
            </div>

            {gender === 'female' && (
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">Hip Circumference ({unitSystem === 'imperial' ? 'in' : 'cm'})</label>
                <input
                  type="number"
                  step="0.1"
                  value={hipIn}
                  onChange={(e) => setHipIn(e.target.value === '' ? '' : Number(e.target.value))}
                  className="w-full px-3 py-1.5 text-xs font-mono-numbers border border-slate-200 rounded-lg bg-slate-50"
                />
              </div>
            )}
          </div>
        </div>

        {/* Results */}
        <div className="lg:col-span-5 space-y-5">
          <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-rose-950 text-white rounded-2xl p-6 sm:p-7 shadow-lg relative overflow-hidden">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-rose-300">
                Body Fat Percentage
              </span>
              <span className="px-2 py-0.5 text-xs font-bold bg-rose-500/20 text-rose-300 rounded border border-rose-500/30">
                {stats.category}
              </span>
            </div>

            <div className="flex items-baseline gap-2 mb-6">
              <span className="text-5xl font-black font-mono-numbers tracking-tight text-white">
                {stats.bodyFatPercent}%
              </span>
            </div>

            <div className="border-t border-slate-700/80 pt-4 space-y-2 text-xs">
              <div className="flex justify-between text-slate-300">
                <span>Fat Mass:</span>
                <strong className="text-rose-300 font-mono-numbers text-sm">{stats.fatMass} {stats.unitLabel}</strong>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Lean Body Mass:</span>
                <strong className="text-orange-300 font-mono-numbers text-sm">{stats.leanMass} {stats.unitLabel}</strong>
              </div>
            </div>
          </div>

          <button
            onClick={handleCopy}
            className="w-full flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold transition-all shadow-2xs"
          >
            {copied ? <Check className="w-4 h-4 text-orange-600" /> : <Copy className="w-4 h-4 text-slate-700" />}
            {copied ? 'Copied' : 'Copy Body Fat Summary'}
          </button>
        </div>
      </div>
    </div>
  );
};
