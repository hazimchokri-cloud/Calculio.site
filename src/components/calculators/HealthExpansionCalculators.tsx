import React, { useState, useMemo } from 'react';
import { Moon, RotateCcw } from 'lucide-react';
import { DecimalInput } from '../shared/DecimalInput';

interface BaseCalcProps {
  currencySymbol?: string;
  onSave?: (summary: string, inputs: any, results: any) => void;
}

// 1. Running & Walking Pace Calculator
export const PaceCalculator: React.FC<BaseCalcProps> = () => {
  const [distance, setDistance] = useState<number | ''>(5);
  const [distanceUnit, setDistanceUnit] = useState<'km' | 'miles'>('km');
  const [hours, setHours] = useState<number | ''>(0);
  const [minutes, setMinutes] = useState<number | ''>(28);
  const [seconds, setSeconds] = useState<number | ''>(30);

  const handleReset = () => {
    setDistance(5);
    setDistanceUnit('km');
    setHours(0);
    setMinutes(28);
    setSeconds(30);
  };

  const results = useMemo(() => {
    const d = typeof distance === 'number' ? distance : 0;
    const h = typeof hours === 'number' ? Math.max(0, hours) : 0;
    const m = typeof minutes === 'number' ? Math.max(0, minutes) : 0;
    const s = typeof seconds === 'number' ? Math.max(0, seconds) : 0;

    const totalSeconds = h * 3600 + m * 60 + s;
    if (totalSeconds <= 0 || d <= 0) return null;

    const roundedPaceSec = Math.round(totalSeconds / d);
    const paceMin = Math.floor(roundedPaceSec / 60);
    const paceSec = roundedPaceSec % 60;

    const speed = (d / (totalSeconds / 3600)).toFixed(2);

    const distKm = distanceUnit === 'km' ? d : d * 1.60934;
    const paceSecPerKm = totalSeconds / distKm;

    const formatTime = (sec: number) => {
      const totalRounded = Math.round(sec);
      const hh = Math.floor(totalRounded / 3600);
      const mm = Math.floor((totalRounded % 3600) / 60);
      const ss = totalRounded % 60;
      return `${hh > 0 ? hh + 'h ' : ''}${mm}m ${ss < 10 ? '0' : ''}${ss}s`;
    };

    return {
      paceFormatted: `${paceMin}:${paceSec < 10 ? '0' : ''}${paceSec} / ${distanceUnit}`,
      speedFormatted: `${speed} ${distanceUnit}/h`,
      fiveK: formatTime(paceSecPerKm * 5),
      tenK: formatTime(paceSecPerKm * 10),
      halfMarathon: formatTime(paceSecPerKm * 21.0975),
      marathon: formatTime(paceSecPerKm * 42.195)
    };
  }, [distance, distanceUnit, hours, minutes, seconds]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-6 rounded-2xl border border-slate-200">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold uppercase text-slate-700 tracking-wider">Run / Walk Details</h4>
            <button
              type="button"
              onClick={handleReset}
              className="text-xs font-semibold text-slate-500 hover:text-slate-800 flex items-center gap-1 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Reset
            </button>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Distance</label>
              <DecimalInput
                value={distance}
                onValueChange={setDistance}
                className="w-full px-3 py-2 border rounded-lg text-sm font-bold"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Unit</label>
              <select
                value={distanceUnit}
                onChange={(e) => setDistanceUnit(e.target.value as 'km' | 'miles')}
                className="w-full px-3 py-2 border rounded-lg text-sm font-bold bg-white"
              >
                <option value="km">Kilometers (km)</option>
                <option value="miles">Miles (mi)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Total Time</label>
            <div className="grid grid-cols-3 gap-2">
              <div>
                <span className="text-[10px] text-slate-400">Hours</span>
                <DecimalInput
                  allowDecimal={false}
                  value={hours}
                  onValueChange={setHours}
                  className="w-full px-2 py-1.5 border rounded-lg text-xs font-bold"
                />
              </div>
              <div>
                <span className="text-[10px] text-slate-400">Minutes</span>
                <DecimalInput
                  allowDecimal={false}
                  value={minutes}
                  onValueChange={(v) => setMinutes(v === '' ? '' : Math.min(59, v))}
                  className="w-full px-2 py-1.5 border rounded-lg text-xs font-bold"
                />
              </div>
              <div>
                <span className="text-[10px] text-slate-400">Seconds</span>
                <DecimalInput
                  allowDecimal={false}
                  value={seconds}
                  onValueChange={(v) => setSeconds(v === '' ? '' : Math.min(59, v))}
                  className="w-full px-2 py-1.5 border rounded-lg text-xs font-bold"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-orange-50 to-teal-50 p-5 rounded-xl border border-orange-200 flex flex-col justify-between space-y-4">
          <div>
            <span className="text-xs font-bold text-orange-900 uppercase tracking-wider">Average Pace</span>
            <div className="text-3xl font-black text-orange-950 font-mono-numbers mt-1">
              {results ? results.paceFormatted : '--:--'}
            </div>
            <span className="text-xs text-orange-700 font-semibold">Speed: {results ? results.speedFormatted : '--'}</span>
          </div>

          {results && (
            <div className="bg-white p-3 rounded-lg border border-orange-100 space-y-1.5 text-xs text-slate-700">
              <span className="font-bold text-[11px] text-slate-500 uppercase tracking-wider block">Race Projections at this Pace:</span>
              <div className="grid grid-cols-2 gap-2 text-[11px]">
                <div>5K: <span className="font-bold">{results.fiveK}</span></div>
                <div>10K: <span className="font-bold">{results.tenK}</span></div>
                <div>Half Marathon: <span className="font-bold">{results.halfMarathon}</span></div>
                <div>Marathon: <span className="font-bold">{results.marathon}</span></div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// 2. One Rep Max (1RM) Calculator
export const OneRepMaxCalculator: React.FC<BaseCalcProps> = () => {
  const [weightLifted, setWeightLifted] = useState<number | ''>(185);
  const [reps, setReps] = useState(6);
  const [unit, setUnit] = useState<'lbs' | 'kg'>('lbs');

  const handleReset = () => {
    setWeightLifted(185);
    setReps(6);
    setUnit('lbs');
  };

  const results = useMemo(() => {
    const w = typeof weightLifted === 'number' ? weightLifted : 0;
    if (w <= 0 || reps <= 0) return null;
    // Brzycki formula: 1RM = Weight / (1.0278 - (0.0278 * Reps))
    const brzycki = reps === 1 ? w : w / (1.0278 - (0.0278 * Math.min(reps, 15)));
    // Epley formula: 1RM = Weight * (1 + 0.0333 * Reps)
    const epley = reps === 1 ? w : w * (1 + 0.0333 * reps);
    // Consensus avg
    const oneRm = Math.round((brzycki + epley) / 2);

    const percentages = [
      { pct: 95, reps: '1-2 reps', weight: Math.round(oneRm * 0.95) },
      { pct: 90, reps: '3-4 reps', weight: Math.round(oneRm * 0.90) },
      { pct: 85, reps: '5-6 reps', weight: Math.round(oneRm * 0.85) },
      { pct: 80, reps: '7-8 reps', weight: Math.round(oneRm * 0.80) },
      { pct: 75, reps: '9-10 reps', weight: Math.round(oneRm * 0.75) },
      { pct: 70, reps: '11-12 reps', weight: Math.round(oneRm * 0.70) },
    ];

    return { oneRm, brzycki: Math.round(brzycki), epley: Math.round(epley), percentages };
  }, [weightLifted, reps]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-6 rounded-2xl border border-slate-200">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold uppercase text-slate-700 tracking-wider">Lift Performance</h4>
            <button
              type="button"
              onClick={handleReset}
              className="text-xs font-semibold text-slate-500 hover:text-slate-800 flex items-center gap-1 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Reset
            </button>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Weight Lifted</label>
              <DecimalInput
                value={weightLifted}
                onValueChange={setWeightLifted}
                className="w-full px-3 py-2 border rounded-lg text-sm font-bold"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Unit</label>
              <select
                value={unit}
                onChange={(e) => setUnit(e.target.value as 'lbs' | 'kg')}
                className="w-full px-3 py-2 border rounded-lg text-sm font-bold bg-white"
              >
                <option value="lbs">Pounds (lbs)</option>
                <option value="kg">Kilograms (kg)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Repetitions Completed ({reps})</label>
            <input
              type="range"
              min="1"
              max="15"
              value={reps}
              onChange={(e) => setReps(Number(e.target.value))}
              className="w-full accent-blue-600 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400 pt-1">
              <span>1 Rep</span>
              <span>5 Reps</span>
              <span>10 Reps</span>
              <span>15 Reps</span>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-indigo-50 p-5 rounded-xl border border-purple-200 flex flex-col justify-between space-y-4">
          <div>
            <span className="text-xs font-bold text-purple-900 uppercase tracking-wider">Estimated 1 Rep Max (1RM)</span>
            <div className="text-3xl font-black text-purple-950 font-mono-numbers mt-1">
              {results ? results.oneRm : '--'} {unit}
            </div>
            <span className="text-xs text-purple-700">Brzycki: {results?.brzycki || '--'}{unit} • Epley: {results?.epley || '--'}{unit}</span>
          </div>

          {results && (
            <div className="bg-white p-3 rounded-lg border border-purple-100 text-xs space-y-1">
              <span className="font-bold text-[10px] text-slate-500 uppercase tracking-wider block">Training Percentages:</span>
              <div className="grid grid-cols-2 gap-x-3 gap-y-1 text-[11px]">
                {results.percentages.map((p) => (
                  <div key={p.pct} className="flex justify-between">
                    <span className="text-slate-600">{p.pct}% ({p.reps}):</span>
                    <span className="font-bold text-purple-900">{p.weight} {unit}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// 3. Waist-to-Hip Ratio (WHR) Calculator
export const WaistToHipCalculator: React.FC<BaseCalcProps> = () => {
  const [waist, setWaist] = useState<number | ''>(32);
  const [hip, setHip] = useState<number | ''>(40);
  const [gender, setGender] = useState<'female' | 'male'>('female');

  const handleReset = () => {
    setWaist(32);
    setHip(40);
    setGender('female');
  };

  const results = useMemo(() => {
    const w = typeof waist === 'number' ? waist : 0;
    const h = typeof hip === 'number' ? hip : 0;
    if (waist === '' || hip === '' || w <= 0 || h <= 0) return null;

    const whr = w / h;
    let risk = 'Low Risk';
    let badgeColor = 'bg-orange-100 text-orange-800';
    let bodyShape = 'Pear / Balanced';

    if (gender === 'female') {
      if (whr > 0.85) {
        risk = 'High Risk';
        badgeColor = 'bg-red-100 text-red-800';
        bodyShape = 'Apple (Abdominal Weight)';
      } else if (whr >= 0.80) {
        risk = 'Moderate Risk';
        badgeColor = 'bg-amber-100 text-amber-800';
        bodyShape = 'Balanced';
      }
    } else {
      if (whr > 0.95) {
        risk = 'High Risk';
        badgeColor = 'bg-red-100 text-red-800';
        bodyShape = 'Apple (Abdominal Weight)';
      } else if (whr >= 0.90) {
        risk = 'Moderate Risk';
        badgeColor = 'bg-amber-100 text-amber-800';
        bodyShape = 'Balanced';
      }
    }

    return { whr, risk, badgeColor, bodyShape };
  }, [waist, hip, gender]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-6 rounded-2xl border border-slate-200">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold uppercase text-slate-700 tracking-wider">Body Measurements (Inches or cm)</h4>
            <button
              type="button"
              onClick={handleReset}
              className="text-xs font-semibold text-slate-500 hover:text-slate-800 flex items-center gap-1 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Reset
            </button>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Waist Circumference</label>
              <DecimalInput
                value={waist}
                onValueChange={setWaist}
                className="w-full px-3 py-2 border rounded-lg text-sm font-bold"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Hip Circumference</label>
              <DecimalInput
                value={hip}
                onValueChange={setHip}
                className="w-full px-3 py-2 border rounded-lg text-sm font-bold"
              />
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Biological Sex</label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setGender('female')}
                className={`py-2 text-xs font-bold rounded-lg border transition-colors cursor-pointer ${gender === 'female' ? 'bg-pink-50 border-pink-300 text-pink-700' : 'bg-white border-slate-200 text-slate-600'}`}
              >
                Female
              </button>
              <button
                type="button"
                onClick={() => setGender('male')}
                className={`py-2 text-xs font-bold rounded-lg border transition-colors cursor-pointer ${gender === 'male' ? 'bg-blue-50 border-blue-300 text-blue-700' : 'bg-white border-slate-200 text-slate-600'}`}
              >
                Male
              </button>
            </div>
          </div>
        </div>

        <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 flex flex-col justify-between space-y-4">
          {results ? (
            <>
              <div>
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Waist-to-Hip Ratio (WHR)</span>
                <div className="text-3xl font-black text-slate-900 font-mono-numbers mt-1">
                  {results.whr.toFixed(2)}
                </div>
                <div className="mt-2 inline-flex items-center gap-2">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${results.badgeColor}`}>
                    {results.risk}
                  </span>
                  <span className="text-xs text-slate-600 font-medium">Shape: {results.bodyShape}</span>
                </div>
              </div>

              <div className="bg-white p-3 rounded-lg border border-slate-200 text-xs text-slate-600 space-y-1">
                <span className="font-bold text-slate-800">WHO Guidelines:</span>
                <p>Women with WHR &lt; 0.80 and Men with WHR &lt; 0.90 have lowest cardiovascular risk.</p>
              </div>
            </>
          ) : (
            <div className="h-full flex items-center justify-center text-center text-xs text-slate-500 py-8">
              Enter positive waist and hip circumferences in the same unit (inches or cm) to calculate WHR.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// 4. Sleep Cycle & Bedtime Calculator
export const SleepCycleCalculator: React.FC<BaseCalcProps> = () => {
  const [wakeHour, setWakeHour] = useState(7);
  const [wakeMinute, setWakeMinute] = useState(0);
  const [wakeAmPm, setWakeAmPm] = useState<'AM' | 'PM'>('AM');

  const handleReset = () => {
    setWakeHour(7);
    setWakeMinute(0);
    setWakeAmPm('AM');
  };

  const bedtimes = useMemo(() => {
    let hour24 = wakeHour % 12;
    if (wakeAmPm === 'PM') hour24 += 12;

    const wakeTimeMinutes = hour24 * 60 + wakeMinute;
    const fallAsleepAllowance = 15; // 15 mins to fall asleep

    // Calculate 6, 5, 4, 3 sleep cycles (90 min each)
    const cycles = [6, 5, 4, 3].map((cycleCount) => {
      const sleepDuration = cycleCount * 90 + fallAsleepAllowance;
      let bedtimeTotalMinutes = wakeTimeMinutes - sleepDuration;
      if (bedtimeTotalMinutes < 0) bedtimeTotalMinutes += 24 * 60;

      const bHour24 = Math.floor(bedtimeTotalMinutes / 60);
      const bMin = bedtimeTotalMinutes % 60;
      const ampm = bHour24 >= 12 ? 'PM' : 'AM';
      const displayHour = bHour24 % 12 === 0 ? 12 : bHour24 % 12;
      const formatted = `${displayHour}:${bMin < 10 ? '0' : ''}${bMin} ${ampm}`;

      return {
        cycles: cycleCount,
        hours: (cycleCount * 1.5).toFixed(1),
        time: formatted,
        recommended: cycleCount === 5 || cycleCount === 6
      };
    });

    return cycles;
  }, [wakeHour, wakeMinute, wakeAmPm]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-6 rounded-2xl border border-slate-200">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Moon className="w-5 h-5 text-indigo-600" />
              <h4 className="text-xs font-bold uppercase text-slate-700 tracking-wider">I Need to Wake Up At</h4>
            </div>
            <button
              type="button"
              onClick={handleReset}
              className="text-xs font-semibold text-slate-500 hover:text-slate-800 flex items-center gap-1 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Reset
            </button>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Hour</label>
              <select
                value={wakeHour}
                onChange={(e) => setWakeHour(Number(e.target.value))}
                className="w-full px-2 py-1.5 border rounded-lg text-xs font-bold bg-white"
              >
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(h => (
                  <option key={h} value={h}>{h}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Minute</label>
              <select
                value={wakeMinute}
                onChange={(e) => setWakeMinute(Number(e.target.value))}
                className="w-full px-2 py-1.5 border rounded-lg text-xs font-bold bg-white"
              >
                {[0, 15, 30, 45].map(m => (
                  <option key={m} value={m}>{m < 10 ? '0' : ''}{m}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">AM/PM</label>
              <select
                value={wakeAmPm}
                onChange={(e) => setWakeAmPm(e.target.value as 'AM' | 'PM')}
                className="w-full px-2 py-1.5 border rounded-lg text-xs font-bold bg-white"
              >
                <option value="AM">AM</option>
                <option value="PM">PM</option>
              </select>
            </div>
          </div>
          <p className="text-xs text-slate-500">
            A standard human sleep cycle lasts approximately 90 minutes. Waking up between cycles prevents morning grogginess.
          </p>
        </div>

        <div className="bg-gradient-to-br from-indigo-900 to-slate-900 text-white p-5 rounded-xl flex flex-col justify-between space-y-4">
          <div>
            <span className="text-xs font-bold text-indigo-300 uppercase tracking-wider">Suggested Bedtimes</span>
            <div className="grid grid-cols-2 gap-2 mt-3">
              {bedtimes.map((b) => (
                <div key={b.cycles} className={`p-2.5 rounded-lg border ${b.recommended ? 'bg-indigo-600/30 border-indigo-400' : 'bg-white/5 border-white/10'}`}>
                  <div className="text-base font-black text-white font-mono-numbers">{b.time}</div>
                  <div className="text-[10px] text-indigo-200 mt-0.5">{b.cycles} cycles ({b.hours} hrs)</div>
                </div>
              ))}
            </div>
          </div>
          <span className="text-[11px] text-slate-400">Includes 15 minutes average time to fall asleep.</span>
        </div>
      </div>
    </div>
  );
};

// 5. Alcohol Units & Calorie Burn Calculator
export const AlcoholCaloriesCalculator: React.FC<BaseCalcProps> = () => {
  const [beers, setBeers] = useState<number | ''>(2); // 12oz regular beer
  const [wineGlasses, setWineGlasses] = useState<number | ''>(1); // 5oz wine
  const [cocktails, setCocktails] = useState<number | ''>(0); // mixed drink

  const handleReset = () => {
    setBeers(2);
    setWineGlasses(1);
    setCocktails(0);
  };

  const results = useMemo(() => {
    const b = typeof beers === 'number' ? Math.max(0, beers) : 0;
    const w = typeof wineGlasses === 'number' ? Math.max(0, wineGlasses) : 0;
    const c = typeof cocktails === 'number' ? Math.max(0, cocktails) : 0;

    const totalCal = Math.round(b * 150 + w * 125 + c * 220);
    const totalUnits = b * 1.5 + w * 2.1 + c * 2.0;

    const milesToRun = (totalCal / 100).toFixed(1);
    const briskWalkingMin = Math.round(totalCal / 5);

    return { totalCal, totalUnits: totalUnits.toFixed(1), milesToRun, briskWalkingMin };
  }, [beers, wineGlasses, cocktails]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-6 rounded-2xl border border-slate-200">
        <div className="space-y-3.5">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold uppercase text-slate-700 tracking-wider">Drinks Consumed</h4>
            <button
              type="button"
              onClick={handleReset}
              className="text-xs font-semibold text-slate-500 hover:text-slate-800 flex items-center gap-1 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Reset
            </button>
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Standard Beers / Cider (12 oz, 5% ABV)</label>
            <DecimalInput
              value={beers}
              onValueChange={setBeers}
              className="w-full px-3 py-1.5 border rounded-lg text-xs font-bold"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Glasses of Wine (5 oz, 12% ABV)</label>
            <DecimalInput
              value={wineGlasses}
              onValueChange={setWineGlasses}
              className="w-full px-3 py-1.5 border rounded-lg text-xs font-bold"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Cocktails / Mixed Spirits (1.5 oz spirit + mixer)</label>
            <DecimalInput
              value={cocktails}
              onValueChange={setCocktails}
              className="w-full px-3 py-1.5 border rounded-lg text-xs font-bold"
            />
          </div>
        </div>

        <div className="bg-gradient-to-br from-amber-50 to-orange-50 p-5 rounded-xl border border-amber-200 flex flex-col justify-between space-y-4">
          <div>
            <span className="text-xs font-bold text-amber-900 uppercase tracking-wider">Total Beverage Calories</span>
            <div className="text-3xl font-black text-amber-950 font-mono-numbers mt-1">
              {results.totalCal} kcal
            </div>
            <span className="text-xs text-amber-800 font-semibold">{results.totalUnits} UK-style Alcohol Units</span>
          </div>

          <div className="bg-white p-3 rounded-lg border border-amber-100 text-xs text-slate-700 space-y-1.5">
            <span className="font-bold text-[11px] text-slate-500 uppercase tracking-wider block">Equivalent Exercise to Burn Off:</span>
            <div className="flex justify-between">
              <span>Brisk Walking:</span>
              <span className="font-bold text-slate-900">{results.briskWalkingMin} minutes</span>
            </div>
            <div className="flex justify-between">
              <span>Running at 6 mph:</span>
              <span className="font-bold text-slate-900">{results.milesToRun} miles</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// 6. Lean Body Mass (LBM) Calculator
export const LeanBodyMassCalculator: React.FC<BaseCalcProps> = () => {
  const [weightKg, setWeightKg] = useState<number | ''>(75);
  const [heightCm, setHeightCm] = useState<number | ''>(178);
  const [gender, setGender] = useState<'male' | 'female'>('male');

  const handleReset = () => {
    setWeightKg(75);
    setHeightCm(178);
    setGender('male');
  };

  const results = useMemo(() => {
    const w = typeof weightKg === 'number' ? weightKg : 0;
    const h = typeof heightCm === 'number' ? heightCm : 0;

    if (w <= 0 || h <= 0) return null;
    let boerLbm = 0;
    let jamesLbm = 0;

    if (gender === 'male') {
      boerLbm = (0.407 * w) + (0.267 * h) - 19.2;
      jamesLbm = (1.1 * w) - 128 * Math.pow(w / h, 2);
    } else {
      boerLbm = (0.252 * w) + (0.473 * h) - 48.3;
      jamesLbm = (1.07 * w) - 148 * Math.pow(w / h, 2);
    }

    const rawAvg = (boerLbm + jamesLbm) / 2;
    const outOfRange = rawAvg <= 0 || rawAvg > w;
    const avgLbm = Math.min(w, Math.max(1, rawAvg));
    const fatMass = Math.max(0, w - avgLbm);
    const fatPercentage = (fatMass / w) * 100;

    return {
      lbmKg: avgLbm.toFixed(1),
      lbmLbs: (avgLbm * 2.20462).toFixed(1),
      fatMassKg: fatMass.toFixed(1),
      fatPercentage: fatPercentage.toFixed(1),
      outOfRange
    };
  }, [weightKg, heightCm, gender]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-6 rounded-2xl border border-slate-200">
        <div className="space-y-3.5">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold uppercase text-slate-700 tracking-wider">Body Metrics</h4>
            <button
              type="button"
              onClick={handleReset}
              className="text-xs font-semibold text-slate-500 hover:text-slate-800 flex items-center gap-1 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Reset
            </button>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Total Body Weight (kg)</label>
              <DecimalInput
                value={weightKg}
                onValueChange={setWeightKg}
                className="w-full px-3 py-1.5 border rounded-lg text-xs font-bold"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Height (cm)</label>
              <DecimalInput
                value={heightCm}
                onValueChange={setHeightCm}
                className="w-full px-3 py-1.5 border rounded-lg text-xs font-bold"
              />
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Biological Sex</label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setGender('male')}
                className={`py-2 text-xs font-bold rounded-lg border transition-colors cursor-pointer ${gender === 'male' ? 'bg-blue-50 border-blue-300 text-blue-700' : 'bg-white border-slate-200 text-slate-600'}`}
              >
                Male
              </button>
              <button
                type="button"
                onClick={() => setGender('female')}
                className={`py-2 text-xs font-bold rounded-lg border transition-colors cursor-pointer ${gender === 'female' ? 'bg-pink-50 border-pink-300 text-pink-700' : 'bg-white border-slate-200 text-slate-600'}`}
              >
                Female
              </button>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-teal-50 to-orange-50 p-5 rounded-xl border border-teal-200 flex flex-col justify-between space-y-4">
          <div>
            <span className="text-xs font-bold text-teal-900 uppercase tracking-wider">Lean Body Mass (LBM)</span>
            <div className="text-3xl font-black text-teal-950 font-mono-numbers mt-1">
              {results ? results.lbmKg : '--'} kg
              <span className="text-sm font-normal text-teal-700 ml-2">({results ? results.lbmLbs : '--'} lbs)</span>
            </div>
            <p className="text-[11px] text-teal-700 mt-1">Average of Boer &amp; James clinical LBM formulas.</p>
          </div>

          <div className="bg-white p-3 rounded-lg border border-teal-100 text-xs text-slate-700 space-y-1">
            <div className="flex justify-between">
              <span>Estimated Fat Mass:</span>
              <span className="font-bold">{results ? results.fatMassKg : '--'} kg</span>
            </div>
            <div className="flex justify-between">
              <span>Implied Body Fat:</span>
              <span className="font-bold text-teal-800">{results ? results.fatPercentage : '--'}%</span>
            </div>
            {results?.outOfRange && (
              <p className="text-[11px] text-amber-700 font-medium pt-1">Note: Extreme height/weight proportions exceed standard empirical bounds; clamped to body weight.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export const AlcoholCalorieCalculator = AlcoholCaloriesCalculator;
