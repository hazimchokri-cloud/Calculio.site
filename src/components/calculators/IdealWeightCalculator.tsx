import React, { useState, useMemo } from 'react';
import { formatNumber, copyToClipboard } from '../../utils/formatters';
import { Scale, Copy, Check, Bookmark, Heart } from 'lucide-react';

interface IdealWeightCalculatorProps {
  onSaveCalculation?: (summary: string, inputs: any, results: any) => void;
}

export const IdealWeightCalculator: React.FC<IdealWeightCalculatorProps> = ({ onSaveCalculation }) => {
  const [unitSystem, setUnitSystem] = useState<'metric' | 'imperial'>('metric');
  const [gender, setGender] = useState<'male' | 'female'>('female');
  const [heightCm, setHeightCm] = useState<number | ''>(168);
  const [heightFt, setHeightFt] = useState<number | ''>(5);
  const [heightIn, setHeightIn] = useState<number | ''>(6);
  const [copied, setCopied] = useState<boolean>(false);
  const [saved, setSaved] = useState<boolean>(false);

  const numHeightCm = typeof heightCm === 'number' ? heightCm : 0;
  const numHeightFt = typeof heightFt === 'number' ? heightFt : 0;
  const numHeightIn = typeof heightIn === 'number' ? heightIn : 0;

  const isInputEmpty = unitSystem === 'metric' ? heightCm === '' : (heightFt === '' || heightIn === '');

  const calculations = useMemo(() => {
    if (isInputEmpty) return null;

    let totalInches = unitSystem === 'metric' ? numHeightCm / 2.54 : numHeightFt * 12 + numHeightIn;
    if (totalInches <= 0) return null;
    totalInches = Math.max(36, totalInches);
    const inchesOver5Ft = Math.max(0, totalInches - 60);

    // 1. Devine Formula (1974)
    // Men: 50.0 kg + 2.3 kg per inch over 5 feet
    // Women: 45.5 kg + 2.3 kg per inch over 5 feet
    const devineKg = gender === 'male' ? 50.0 + 2.3 * inchesOver5Ft : 45.5 + 2.3 * inchesOver5Ft;

    // 2. Robinson Formula (1983)
    // Men: 52 kg + 1.9 kg per inch over 5 feet
    // Women: 49 kg + 1.7 kg per inch over 5 feet
    const robinsonKg = gender === 'male' ? 52.0 + 1.9 * inchesOver5Ft : 49.0 + 1.7 * inchesOver5Ft;

    // 3. Miller Formula (1983)
    // Men: 56.2 kg + 1.41 kg per inch over 5 feet
    // Women: 53.1 kg + 1.36 kg per inch over 5 feet
    const millerKg = gender === 'male' ? 56.2 + 1.41 * inchesOver5Ft : 53.1 + 1.36 * inchesOver5Ft;

    // 4. Hamwi Formula (1964)
    // Men: 48.0 kg + 2.7 kg per inch over 5 feet
    // Women: 45.5 kg + 2.2 kg per inch over 5 feet
    const hamwiKg = gender === 'male' ? 48.0 + 2.7 * inchesOver5Ft : 45.5 + 2.2 * inchesOver5Ft;

    // Healthy BMI Range (18.5 - 24.9)
    const heightMeters = (totalInches * 2.54) / 100;
    const bmiMinKg = 18.5 * (heightMeters * heightMeters);
    const bmiMaxKg = 24.9 * (heightMeters * heightMeters);

    const toDisplay = (kg: number) => {
      if (unitSystem === 'metric') return `${kg.toFixed(1)} kg`;
      return `${(kg * 2.20462).toFixed(1)} lbs`;
    };

    const avgIdealKg = (devineKg + robinsonKg + millerKg + hamwiKg) / 4;

    return {
      avgIdealKg,
      avgDisplay: toDisplay(avgIdealKg),
      devine: toDisplay(devineKg),
      robinson: toDisplay(robinsonKg),
      miller: toDisplay(millerKg),
      hamwi: toDisplay(hamwiKg),
      bmiRange: `${toDisplay(bmiMinKg)} - ${toDisplay(bmiMaxKg)}`
    };
  }, [isInputEmpty, unitSystem, gender, numHeightCm, numHeightFt, numHeightIn]);

  const handleCopy = async () => {
    if (!calculations) return;
    const text = `Ideal Body Weight (IBW) Summary:
Height: ${unitSystem === 'metric' ? `${numHeightCm} cm` : `${numHeightFt}'${numHeightIn}"`} (${gender})
Average Ideal Weight: ${calculations.avgDisplay}
Healthy BMI Range (18.5 - 24.9): ${calculations.bmiRange}
Devine Formula: ${calculations.devine}
Robinson Formula: ${calculations.robinson}
Miller Formula: ${calculations.miller}
Hamwi Formula: ${calculations.hamwi}`;

    const ok = await copyToClipboard(text);
    if (ok) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleReset = () => {
    setUnitSystem('metric');
    setGender('female');
    setHeightCm(168);
    setHeightFt(5);
    setHeightIn(6);
  };

  const handleSave = () => {
    if (onSaveCalculation && calculations) {
      onSaveCalculation(
        `Ideal Weight: ~${calculations.avgDisplay} (${gender}, ${unitSystem === 'metric' ? `${numHeightCm}cm` : `${numHeightFt}'${numHeightIn}"`})`,
        { gender, unitSystem, heightCm },
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
              <Scale className="w-4 h-4 text-orange-600" />
              <span>Body Measurements</span>
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
                  Metric (cm)
                </button>
                <button
                  type="button"
                  onClick={() => setUnitSystem('imperial')}
                  className={`px-2.5 py-1 rounded-md transition-all ${unitSystem === 'imperial' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600'}`}
                >
                  Imperial (ft/in)
                </button>
              </div>
            </div>
          </div>

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
                      ? 'bg-orange-600 text-white shadow-2xs'
                      : 'bg-slate-50 text-slate-700 border border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {g}
                </button>
              ))}
            </div>
          </div>

          {unitSystem === 'metric' ? (
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 flex justify-between">
                <span>Height (cm)</span>
                <span className="text-orange-600 font-mono">{heightCm} cm</span>
              </label>
              <input
                type="number"
                min="100"
                max="240"
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
        </div>

        {/* Right Output */}
        <div className="lg:col-span-6 space-y-4">
          <div className="bg-gradient-to-br from-slate-900 via-orange-950 to-slate-900 text-white rounded-2xl p-6 shadow-md relative">
            <div className="space-y-4">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-orange-300">
                  Consensus Ideal Body Weight
                </span>
                <div className="text-4xl font-black tracking-tight text-white mt-1 font-mono">
                  {calculations ? calculations.avgDisplay : '—'}
                </div>
                {calculations && (
                  <div className="text-xs font-medium text-slate-300 mt-1">
                    Healthy WHO BMI Range: {calculations.bmiRange}
                  </div>
                )}
              </div>

              <div className="grid grid-cols-2 gap-2 pt-3 border-t border-orange-900/60 text-xs">
                <div className="bg-white/10 rounded-xl p-2.5">
                  <span className="text-[10px] text-slate-300 block">Devine Formula</span>
                  <span className="font-bold font-mono text-white">{calculations ? calculations.devine : '—'}</span>
                </div>
                <div className="bg-white/10 rounded-xl p-2.5">
                  <span className="text-[10px] text-slate-300 block">Robinson Formula</span>
                  <span className="font-bold font-mono text-white">{calculations ? calculations.robinson : '—'}</span>
                </div>
                <div className="bg-white/10 rounded-xl p-2.5">
                  <span className="text-[10px] text-slate-300 block">Miller Formula</span>
                  <span className="font-bold font-mono text-white">{calculations ? calculations.miller : '—'}</span>
                </div>
                <div className="bg-white/10 rounded-xl p-2.5">
                  <span className="text-[10px] text-slate-300 block">Hamwi Formula</span>
                  <span className="font-bold font-mono text-white">{calculations ? calculations.hamwi : '—'}</span>
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
