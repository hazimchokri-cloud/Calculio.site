import React, { useState, useMemo } from 'react';
import { formatNumber, copyToClipboard } from '../../utils/formatters';
import { Scale, Check, Copy, ShieldCheck, Heart, AlertCircle, Info } from 'lucide-react';
import confetti from 'canvas-confetti';

interface BmiCalculatorProps {
  onSaveCalculation?: (summary: string, inputs: any, results: any) => void;
}

export const BmiCalculator: React.FC<BmiCalculatorProps> = ({ onSaveCalculation }) => {
  const [unitSystem, setUnitSystem] = useState<'imperial' | 'metric'>('imperial');
  
  // Imperial inputs
  const [feet, setFeet] = useState<number | ''>(5);
  const [inches, setInches] = useState<number | ''>(10);
  const [weightLbs, setWeightLbs] = useState<number | ''>(165);

  // Metric inputs
  const [heightCm, setHeightCm] = useState<number | ''>(178);
  const [weightKg, setWeightKg] = useState<number | ''>(75);

  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [age, setAge] = useState<number | ''>(28);
  const [copied, setCopied] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const numFeet = typeof feet === 'number' ? feet : 0;
  const numInches = typeof inches === 'number' ? inches : 0;
  const numWeightLbs = typeof weightLbs === 'number' ? weightLbs : 0;
  const numHeightCm = typeof heightCm === 'number' ? heightCm : 0;
  const numWeightKg = typeof weightKg === 'number' ? weightKg : 0;

  const isInputEmpty = unitSystem === 'imperial'
    ? feet === '' || inches === '' || weightLbs === ''
    : heightCm === '' || weightKg === '';

  const result = useMemo(() => {
    if (isInputEmpty) return null;

    let heightInMeters = 0;
    let weightInKg = 0;

    if (unitSystem === 'imperial') {
      const totalInches = (numFeet * 12) + numInches;
      heightInMeters = totalInches * 0.0254;
      weightInKg = numWeightLbs * 0.45359237;
    } else {
      heightInMeters = numHeightCm / 100;
      weightInKg = numWeightKg;
    }

    if (heightInMeters <= 0 || weightInKg <= 0) {
      return null;
    }

    const bmi = weightInKg / (heightInMeters * heightInMeters);
    const bmiPrime = bmi / 25.0;

    // Normal range is 18.5 to 24.9
    const minHealthyKg = 18.5 * (heightInMeters * heightInMeters);
    const maxHealthyKg = 24.9 * (heightInMeters * heightInMeters);
    const minHealthyLbs = minHealthyKg * 2.20462;
    const maxHealthyLbs = maxHealthyKg * 2.20462;

    let category = 'Normal weight';
    let color = 'text-orange-600';
    let bgColor = 'bg-orange-500';
    let badgeBg = 'bg-orange-50 border-orange-200 text-orange-800';

    if (bmi < 16) {
      category = 'Severe Thinness';
      color = 'text-blue-700';
      bgColor = 'bg-blue-600';
      badgeBg = 'bg-blue-50 border-blue-200 text-blue-800';
    } else if (bmi < 17) {
      category = 'Moderate Thinness';
      color = 'text-blue-600';
      bgColor = 'bg-blue-500';
      badgeBg = 'bg-blue-50 border-blue-200 text-blue-800';
    } else if (bmi < 18.5) {
      category = 'Mild Thinness / Underweight';
      color = 'text-cyan-600';
      bgColor = 'bg-cyan-500';
      badgeBg = 'bg-cyan-50 border-cyan-200 text-cyan-800';
    } else if (bmi < 25) {
      category = 'Normal & Healthy Weight';
      color = 'text-orange-600';
      bgColor = 'bg-orange-500';
      badgeBg = 'bg-orange-50 border-orange-200 text-orange-800';
    } else if (bmi < 30) {
      category = 'Overweight';
      color = 'text-orange-600';
      bgColor = 'bg-orange-500';
      badgeBg = 'bg-orange-50 border-orange-200 text-orange-800';
    } else if (bmi < 35) {
      category = 'Obese Class I';
      color = 'text-orange-600';
      bgColor = 'bg-orange-500';
      badgeBg = 'bg-orange-50 border-orange-200 text-orange-800';
    } else if (bmi < 40) {
      category = 'Obese Class II';
      color = 'text-rose-600';
      bgColor = 'bg-rose-500';
      badgeBg = 'bg-rose-50 border-rose-200 text-rose-800';
    } else {
      category = 'Obese Class III (Severe)';
      color = 'text-purple-700';
      bgColor = 'bg-purple-600';
      badgeBg = 'bg-purple-50 border-purple-200 text-purple-800';
    }

    // Gauge calculation: range from 15 to 40 BMI
    const gaugePercentage = Math.min(100, Math.max(0, ((bmi - 15) / (40 - 15)) * 100));

    return {
      bmi: Number(bmi.toFixed(1)),
      category,
      color,
      bgColor,
      badgeBg,
      minHealthyWeightKg: Number(minHealthyKg.toFixed(1)),
      maxHealthyWeightKg: Number(maxHealthyKg.toFixed(1)),
      minHealthyWeightLbs: Number(minHealthyLbs.toFixed(1)),
      maxHealthyWeightLbs: Number(maxHealthyLbs.toFixed(1)),
      bmiPrime: Number(bmiPrime.toFixed(2)),
      gaugePercentage
    };
  }, [isInputEmpty, unitSystem, numFeet, numInches, numWeightLbs, numHeightCm, numWeightKg]);

  const handleCopy = async () => {
    if (!result) return;
    const text = `BMI Calculator Result:
• BMI Score: ${result.bmi} kg/m² (${result.category})
• Healthy Weight Range: ${
      unitSystem === 'imperial'
        ? `${result.minHealthyWeightLbs} - ${result.maxHealthyWeightLbs} lbs`
        : `${result.minHealthyWeightKg} - ${result.maxHealthyWeightKg} kg`
    }
• BMI Prime: ${result.bmiPrime}`;

    const ok = await copyToClipboard(text);
    if (ok) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleSave = () => {
    if (!result) return;
    if (onSaveCalculation) {
      onSaveCalculation(
        `BMI: ${result.bmi} (${result.category})`,
        { unitSystem, feet, inches, weightLbs, heightCm, weightKg },
        { bmi: result.bmi, category: result.category }
      );
      setSavedSuccess(true);
      confetti({ particleCount: 40, spread: 60, origin: { y: 0.8 } });
      setTimeout(() => setSavedSuccess(false), 2500);
    }
  };

  const handleReset = () => {
    setUnitSystem('imperial');
    setFeet(5);
    setInches(10);
    setWeightLbs(165);
    setHeightCm(178);
    setWeightKg(75);
    setGender('male');
    setAge(28);
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Input Card */}
        <div className="lg:col-span-7 bg-[#FFFFFF] rounded-2xl p-6 sm:p-8 border border-[#E2E8F0] shadow-xs space-y-6">
          <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-4">
            <div>
              <h3 className="text-lg font-bold text-[#0F172A]">Body Measurements</h3>
              <p className="text-xs text-[#64748B]">Enter your height, weight, and demographics.</p>
            </div>
            
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleReset}
                className="text-xs font-semibold text-[#64748B] hover:text-[#0F172A] px-2.5 py-1.5 rounded-lg border border-[#E2E8F0] hover:bg-[#F8FAFC] transition-colors cursor-pointer"
              >
                Reset
              </button>
              {/* Unit Toggle */}
              <div className="flex bg-[#F8FAFC] p-1 rounded-xl border border-[#E2E8F0]">
                <button
                  type="button"
                  onClick={() => setUnitSystem('imperial')}
                  className={`px-3 py-1 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                    unitSystem === 'imperial' ? 'bg-[#F97316] text-white shadow-2xs' : 'text-[#64748B] hover:text-[#0F172A]'
                  }`}
                >
                  US Units (ft/lbs)
                </button>
                <button
                  type="button"
                  onClick={() => setUnitSystem('metric')}
                  className={`px-3 py-1 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                    unitSystem === 'metric' ? 'bg-[#F97316] text-white shadow-2xs' : 'text-[#64748B] hover:text-[#0F172A]'
                  }`}
                >
                  Metric (cm/kg)
                </button>
              </div>
            </div>
          </div>

          {/* Age & Gender */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-[#0F172A] block">Biological Sex</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setGender('male')}
                  className={`py-2 text-xs font-bold rounded-xl border transition-all cursor-pointer ${
                    gender === 'male' ? 'bg-[#FFF7ED] text-[#F97316] border-[#FDBA74]' : 'bg-[#FFFFFF] text-[#475569] border-[#E2E8F0] hover:bg-[#F8FAFC]'
                  }`}
                >
                  Male
                </button>
                <button
                  type="button"
                  onClick={() => setGender('female')}
                  className={`py-2 text-xs font-bold rounded-xl border transition-all cursor-pointer ${
                    gender === 'female' ? 'bg-[#FFF7ED] text-[#F97316] border-[#FDBA74]' : 'bg-[#FFFFFF] text-[#475569] border-[#E2E8F0] hover:bg-[#F8FAFC]'
                  }`}
                >
                  Female
                </button>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-[#0F172A] block">Age (Years)</label>
              <input
                type="number"
                min="1"
                max="120"
                value={age}
                onChange={(e) => setAge(e.target.value === '' ? '' : Number(e.target.value))}
                placeholder="28"
                className="w-full px-3 py-2 font-mono-numbers text-sm font-semibold border border-[#E2E8F0] rounded-xl focus:border-[#F97316] focus:outline-none bg-[#FFFFFF] text-[#0F172A]"
              />
            </div>
          </div>

          {/* Height Input */}
          {unitSystem === 'imperial' ? (
            <div className="space-y-2">
              <label className="text-sm font-semibold text-[#0F172A] block">Height</label>
              <div className="grid grid-cols-2 gap-4">
                <div className="relative">
                  <input
                    type="number"
                    min="1"
                    max="8"
                    value={feet}
                    onChange={(e) => setFeet(e.target.value === '' ? '' : Number(e.target.value))}
                    placeholder="5"
                    className="w-full px-3 py-2 text-sm font-mono-numbers font-semibold border border-[#E2E8F0] rounded-xl focus:border-[#F97316] focus:outline-none bg-[#FFFFFF] text-[#0F172A]"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-[#64748B]">ft</span>
                </div>
                <div className="relative">
                  <input
                    type="number"
                    min="0"
                    max="11"
                    value={inches}
                    onChange={(e) => setInches(e.target.value === '' ? '' : Number(e.target.value))}
                    placeholder="10"
                    className="w-full px-3 py-2 text-sm font-mono-numbers font-semibold border border-[#E2E8F0] rounded-xl focus:border-[#F97316] focus:outline-none bg-[#FFFFFF] text-[#0F172A]"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-[#64748B]">in</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-sm font-semibold text-[#0F172A]">Height</label>
                <span className="text-xs font-mono-numbers font-semibold text-[#64748B]">{numHeightCm} cm</span>
              </div>
              <input
                type="number"
                min="0"
                max="250"
                value={heightCm}
                onChange={(e) => setHeightCm(e.target.value === '' ? '' : Number(e.target.value))}
                placeholder="178"
                className="w-full px-3 py-2 text-sm font-mono-numbers font-semibold border border-[#E2E8F0] rounded-xl focus:border-[#F97316] focus:outline-none bg-[#FFFFFF] text-[#0F172A]"
              />
              <input
                type="range"
                min="100"
                max="220"
                value={numHeightCm || 178}
                onChange={(e) => setHeightCm(e.target.value === '' ? '' : Number(e.target.value))}
                className="w-full accent-[#F97316] cursor-pointer h-2 bg-[#E2E8F0] rounded-lg"
              />
            </div>
          )}

          {/* Weight Input */}
          {unitSystem === 'imperial' ? (
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-sm font-semibold text-[#0F172A]">Weight</label>
                <span className="text-xs font-mono-numbers font-semibold text-[#64748B]">{numWeightLbs} lbs</span>
              </div>
              <input
                type="number"
                min="0"
                max="600"
                value={weightLbs}
                onChange={(e) => setWeightLbs(e.target.value === '' ? '' : Number(e.target.value))}
                placeholder="165"
                className="w-full px-3 py-2 text-sm font-mono-numbers font-semibold border border-[#E2E8F0] rounded-xl focus:border-[#F97316] focus:outline-none bg-[#FFFFFF] text-[#0F172A]"
              />
              <input
                type="range"
                min="80"
                max="350"
                value={numWeightLbs || 165}
                onChange={(e) => setWeightLbs(e.target.value === '' ? '' : Number(e.target.value))}
                className="w-full accent-[#F97316] cursor-pointer h-2 bg-[#E2E8F0] rounded-lg"
              />
            </div>
          ) : (
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-sm font-semibold text-[#0F172A]">Weight</label>
                <span className="text-xs font-mono-numbers font-semibold text-[#64748B]">{numWeightKg} kg</span>
              </div>
              <input
                type="number"
                min="0"
                max="300"
                value={weightKg}
                onChange={(e) => setWeightKg(e.target.value === '' ? '' : Number(e.target.value))}
                placeholder="75"
                className="w-full px-3 py-2 text-sm font-mono-numbers font-semibold border border-[#E2E8F0] rounded-xl focus:border-[#F97316] focus:outline-none bg-[#FFFFFF] text-[#0F172A]"
              />
              <input
                type="range"
                min="35"
                max="160"
                value={numWeightKg || 75}
                onChange={(e) => setWeightKg(e.target.value === '' ? '' : Number(e.target.value))}
                className="w-full accent-[#F97316] cursor-pointer h-2 bg-[#E2E8F0] rounded-lg"
              />
            </div>
          )}
        </div>

        {/* Results Gauge Card */}
        <div className="lg:col-span-5 space-y-5">
          <div className="bg-[#FFF7ED] border border-[#FDBA74] text-[#0F172A] rounded-2xl p-6 sm:p-7 shadow-xs relative overflow-hidden">
            {result ? (
              <>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#9A3412] flex items-center gap-1">
                    <Scale className="w-4 h-4 text-[#F97316]" />
                    Body Mass Index (BMI)
                  </span>
                  <span className="px-2.5 py-0.5 text-xs font-bold rounded-md bg-[#FFEDD5] text-[#9A3412] border border-[#FDBA74]">
                    {result.category}
                  </span>
                </div>

                <div className="flex items-baseline gap-2 mb-4">
                  <span className="text-5xl font-black font-mono-numbers tracking-tight text-[#F97316]">
                    {result.bmi}
                  </span>
                  <span className="text-[#475569] text-sm font-semibold">kg/m²</span>
                </div>

                {/* Gauge visualization bar */}
                <div className="space-y-2 mb-6">
                  <div className="relative pt-4">
                    {/* Pointer Arrow */}
                    <div
                      className="absolute top-0 -translate-x-1/2 transition-all duration-300"
                      style={{ left: `${result.gaugePercentage}%` }}
                    >
                      <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[8px] border-t-[#0F172A] shadow-xs" />
                    </div>

                    {/* Gradient WHO color strip */}
                    <div className="h-3 w-full rounded-full overflow-hidden flex shadow-inner bg-[#E2E8F0]">
                      <div className="w-[14%] bg-[#0284C7]" title="Underweight (<18.5)" />
                      <div className="w-[26%] bg-[#F97316]" title="Normal (18.5 - 24.9)" />
                      <div className="w-[20%] bg-[#F97316]" title="Overweight (25 - 29.9)" />
                      <div className="w-[40%] bg-[#DC2626]" title="Obesity (30+)" />
                    </div>
                  </div>

                  <div className="flex justify-between text-[10px] text-[#64748B] font-mono-numbers px-1 font-semibold">
                    <span>15 (Under)</span>
                    <span>18.5</span>
                    <span>25.0</span>
                    <span>30.0</span>
                    <span>40+</span>
                  </div>
                </div>

                {/* Healthy Target Card */}
                <div className="border-t border-[#FDBA74]/60 pt-4 space-y-2 text-xs">
                  <div className="flex items-center justify-between text-[#475569]">
                    <span>Healthy Weight Range:</span>
                    <strong className="text-[#F97316] font-mono-numbers text-sm font-bold">
                      {unitSystem === 'imperial'
                        ? `${result.minHealthyWeightLbs} – ${result.maxHealthyWeightLbs} lbs`
                        : `${result.minHealthyWeightKg} – ${result.maxHealthyWeightKg} kg`}
                    </strong>
                  </div>

                  <div className="flex items-center justify-between text-[#64748B]">
                    <span>BMI Prime (Ratio to 25.0 max healthy):</span>
                    <span className="font-mono-numbers text-[#0F172A] font-bold">{result.bmiPrime}</span>
                  </div>
                </div>
              </>
            ) : (
              <div className="py-10 text-center space-y-2">
                <p className="text-[#F97316] text-sm font-semibold">Please enter a value.</p>
                <p className="text-xs text-[#64748B]">Fill in your height and weight to calculate your BMI.</p>
              </div>
            )}
          </div>

          {/* Action buttons */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={handleCopy}
              className="flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl border border-[#E2E8F0] bg-[#FFFFFF] hover:bg-[#FFF7ED] hover:text-[#F97316] text-[#0F172A] text-xs font-bold transition-all shadow-2xs cursor-pointer"
            >
              {copied ? <Check className="w-4 h-4 text-[#F97316]" /> : <Copy className="w-4 h-4 text-[#64748B]" />}
              <span>{copied ? 'Copied!' : 'Copy Summary'}</span>
            </button>

            <button
              onClick={handleSave}
              className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#F97316] hover:bg-[#EA580C] text-white text-xs font-bold transition-all shadow-2xs cursor-pointer"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>{savedSuccess ? 'Saved!' : 'Save to History'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* WHO Reference Table */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs space-y-3">
        <h4 className="text-sm font-bold text-slate-900">World Health Organization (WHO) BMI Classification</h4>
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-50 text-slate-700 font-semibold border-b border-slate-200">
              <tr>
                <th className="py-2 px-3">Classification</th>
                <th className="py-2 px-3">BMI Range (kg/m²)</th>
                <th className="py-2 px-3">Health Risk Level</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              <tr className="hover:bg-slate-50/60">
                <td className="py-2 px-3 font-medium text-cyan-700">Underweight</td>
                <td className="py-2 px-3 font-mono-numbers">&lt; 18.5</td>
                <td className="py-2 px-3 text-slate-600">Nutritional deficiency risk</td>
              </tr>
              <tr className="hover:bg-orange-50/40 bg-orange-50/20 font-semibold text-orange-900">
                <td className="py-2 px-3 text-orange-700">Normal / Healthy</td>
                <td className="py-2 px-3 font-mono-numbers">18.5 – 24.9</td>
                <td className="py-2 px-3 text-orange-700">Lowest cardiovascular risk</td>
              </tr>
              <tr className="hover:bg-slate-50/60">
                <td className="py-2 px-3 font-medium text-orange-700">Overweight</td>
                <td className="py-2 px-3 font-mono-numbers">25.0 – 29.9</td>
                <td className="py-2 px-3 text-slate-600">Increased risk of chronic disease</td>
              </tr>
              <tr className="hover:bg-slate-50/60">
                <td className="py-2 px-3 font-medium text-rose-700">Obese Class I & II</td>
                <td className="py-2 px-3 font-mono-numbers">30.0 – 39.9</td>
                <td className="py-2 px-3 text-slate-600">High risk of hypertension & type 2 diabetes</td>
              </tr>
              <tr className="hover:bg-slate-50/60">
                <td className="py-2 px-3 font-medium text-purple-700">Obese Class III (Severe)</td>
                <td className="py-2 px-3 font-mono-numbers">≥ 40.0</td>
                <td className="py-2 px-3 text-slate-600">Very high health risk</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
