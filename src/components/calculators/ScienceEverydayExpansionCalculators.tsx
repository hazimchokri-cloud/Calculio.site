import React, { useState, useMemo } from 'react';
import { RotateCcw } from 'lucide-react';
import { DecimalInput } from '../shared/DecimalInput';
import { getDaysInMonth } from '../../utils/dateUtils';

interface BaseCalcProps {
  currencySymbol?: string;
  onSave?: (summary: string, inputs: any, results: any) => void;
}

// 1. Density, Mass & Volume Calculator (ρ = m / V)
export const DensityCalculator: React.FC<BaseCalcProps> = () => {
  const [solveFor, setSolveFor] = useState<'density' | 'mass' | 'volume'>('density');
  const [mass, setMass] = useState<number | ''>(500);
  const [volume, setVolume] = useState<number | ''>(250);
  const [density, setDensity] = useState<number | ''>(2.0);

  const handleReset = () => {
    setSolveFor('density');
    setMass(500);
    setVolume(250);
    setDensity(2.0);
  };

  const results = useMemo(() => {
    if (solveFor === 'density') {
      if (mass === '' || volume === '') return null;
      if (mass < 0 || volume <= 0) return { error: 'Mass must be non-negative and volume must be greater than zero.' } as const;
      const calcD = mass / volume;
      return { output: calcD.toFixed(3), unit: 'g/cm³ (or kg/L)', label: 'Calculated Density' };
    } else if (solveFor === 'mass') {
      if (density === '' || volume === '') return null;
      if (density < 0 || volume < 0) return { error: 'Density and volume must be non-negative.' } as const;
      const calcM = density * volume;
      return { output: calcM.toFixed(2), unit: 'grams', label: 'Calculated Mass' };
    } else {
      if (mass === '' || density === '') return null;
      if (mass < 0 || density <= 0) return { error: 'Mass must be non-negative and density must be greater than zero.' } as const;
      const calcV = mass / density;
      return { output: calcV.toFixed(2), unit: 'cm³ (mL)', label: 'Calculated Volume' };
    }
  }, [solveFor, mass, volume, density]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-6 rounded-2xl border border-slate-200">
        <div className="space-y-3.5">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold uppercase text-slate-700 tracking-wider">Target Variable to Solve</h4>
            <button
              type="button"
              onClick={handleReset}
              className="text-xs font-semibold text-slate-500 hover:text-slate-900 flex items-center gap-1 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Reset
            </button>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {(['density', 'mass', 'volume'] as const).map((mode) => (
              <button
                key={mode}
                type="button"
                onClick={() => setSolveFor(mode)}
                className={`py-1.5 text-xs font-bold rounded-lg border capitalize transition-colors ${solveFor === mode ? 'bg-orange-600 border-orange-600 text-white' : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'}`}
              >
                {mode}
              </button>
            ))}
          </div>

          <div className="space-y-3 pt-2">
            {solveFor !== 'mass' && (
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Mass (grams)</label>
                <DecimalInput
                  value={mass}
                  onValueChange={setMass}
                  className="w-full px-3 py-1.5 border rounded-lg text-xs font-bold"
                />
              </div>
            )}
            {solveFor !== 'volume' && (
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Volume (cm³ or mL)</label>
                <DecimalInput
                  value={volume}
                  onValueChange={setVolume}
                  className="w-full px-3 py-1.5 border rounded-lg text-xs font-bold"
                />
              </div>
            )}
            {solveFor !== 'density' && (
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Density (g/cm³)</label>
                <DecimalInput
                  value={density}
                  onValueChange={setDensity}
                  className="w-full px-3 py-1.5 border rounded-lg text-xs font-bold"
                />
              </div>
            )}
          </div>
        </div>

        {results && !('error' in results) ? (
          <div className="bg-gradient-to-br from-indigo-50 to-blue-50 p-5 rounded-xl border border-indigo-200 flex flex-col justify-between space-y-4">
            <div>
              <span className="text-xs font-bold text-indigo-900 uppercase tracking-wider">{results.label}</span>
              <div className="text-3xl font-black text-indigo-950 font-mono-numbers mt-1">
                {results.output} <span className="text-sm font-normal text-indigo-700">{results.unit}</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 text-center text-slate-500 text-xs flex items-center justify-center">
            {results && 'error' in results ? results.error : 'Enter valid numbers for the required fields to calculate.'}
          </div>
        )}
      </div>
    </div>
  );
};

// 2. Kinetic & Potential Energy Calculator
export const EnergyCalculator: React.FC<BaseCalcProps> = () => {
  const [massKg, setMassKg] = useState<number | ''>(10);
  const [velocityMs, setVelocityMs] = useState<number | ''>(15);
  const [heightM, setHeightM] = useState<number | ''>(20);

  const handleReset = () => {
    setMassKg(10);
    setVelocityMs(15);
    setHeightM(20);
  };

  const results = useMemo(() => {
    if (massKg === '' || velocityMs === '' || heightM === '') return null;
    if (massKg < 0) return { error: 'Mass must be non-negative.' } as const;
    const m = massKg;
    const v = velocityMs;
    const h = heightM;

    const kineticEnergyJoules = 0.5 * m * Math.pow(v, 2);
    const potentialEnergyJoules = m * 9.80665 * h;
    const totalMechanicalJoules = kineticEnergyJoules + potentialEnergyJoules;

    return { kineticEnergyJoules, potentialEnergyJoules, totalMechanicalJoules };
  }, [massKg, velocityMs, heightM]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-6 rounded-2xl border border-slate-200">
        <div className="space-y-3.5">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold uppercase text-slate-700 tracking-wider">Physical Parameters</h4>
            <button
              type="button"
              onClick={handleReset}
              className="text-xs font-semibold text-slate-500 hover:text-slate-900 flex items-center gap-1 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Reset
            </button>
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Mass (kg)</label>
            <DecimalInput
              value={massKg}
              onValueChange={setMassKg}
              className="w-full px-3 py-1.5 border rounded-lg text-xs font-bold"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Velocity (m/s)</label>
              <DecimalInput
                value={velocityMs}
                onValueChange={setVelocityMs}
                allowNegative
                className="w-full px-2.5 py-1.5 border rounded-lg text-xs font-bold"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Height (meters)</label>
              <DecimalInput
                value={heightM}
                onValueChange={setHeightM}
                allowNegative
                className="w-full px-2.5 py-1.5 border rounded-lg text-xs font-bold"
              />
            </div>
          </div>
        </div>

        {results && !('error' in results) ? (
          <div className="bg-gradient-to-br from-orange-50 to-orange-100/60 p-5 rounded-xl border border-orange-200 flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div>
                <span className="text-xs font-bold text-orange-900 uppercase tracking-wider">Kinetic Energy (0.5 mv²)</span>
                <div className="text-2xl font-black text-orange-950 font-mono-numbers">{results.kineticEnergyJoules.toLocaleString(undefined, { maximumFractionDigits: 2 })} J</div>
              </div>
              <div>
                <span className="text-xs font-bold text-orange-900 uppercase tracking-wider">Gravitational Potential Energy (mgh)</span>
                <div className="text-2xl font-black text-orange-950 font-mono-numbers">{results.potentialEnergyJoules.toLocaleString(undefined, { maximumFractionDigits: 2 })} J</div>
              </div>
            </div>

            <div className="bg-white p-3 rounded-lg border border-orange-100 text-xs text-slate-700">
              <div className="flex justify-between font-bold text-slate-900">
                <span>Total Mechanical Energy:</span>
                <span>{results.totalMechanicalJoules.toLocaleString(undefined, { maximumFractionDigits: 2 })} Joules</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 text-center text-slate-500 text-xs flex items-center justify-center">
            {results && 'error' in results ? results.error : 'Enter mass, velocity, and height to calculate energy values.'}
          </div>
        )}
      </div>
    </div>
  );
};

// 3. Pressure & Force Calculator (P = F / A)
export const PressureCalculator: React.FC<BaseCalcProps> = () => {
  const [forceN, setForceN] = useState<number | ''>(500);
  const [areaM2, setAreaM2] = useState<number | ''>(0.05);

  const handleReset = () => {
    setForceN(500);
    setAreaM2(0.05);
  };

  const results = useMemo(() => {
    if (forceN === '' || areaM2 === '') return null;
    if (forceN < 0 || areaM2 <= 0) {
      return { error: 'Force must be non-negative and surface area must be greater than zero.' } as const;
    }
    const f = forceN;
    const a = areaM2;

    const pressurePascals = f / a;
    const pressurePsi = pressurePascals * 0.0001450377;
    const pressureBar = pressurePascals / 100000;
    const pressureAtm = pressurePascals / 101325;

    return { pressurePascals, pressurePsi, pressureBar, pressureAtm };
  }, [forceN, areaM2]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-6 rounded-2xl border border-slate-200">
        <div className="space-y-3.5">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold uppercase text-slate-700 tracking-wider">Applied Force &amp; Area</h4>
            <button
              type="button"
              onClick={handleReset}
              className="text-xs font-semibold text-slate-500 hover:text-slate-900 flex items-center gap-1 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Reset
            </button>
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Perpendicular Force (Newtons)</label>
            <DecimalInput
              value={forceN}
              onValueChange={setForceN}
              className="w-full px-3 py-1.5 border rounded-lg text-xs font-bold"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Surface Area (m²)</label>
            <DecimalInput
              value={areaM2}
              onValueChange={setAreaM2}
              className="w-full px-3 py-1.5 border rounded-lg text-xs font-bold"
            />
          </div>
        </div>

        {results && !('error' in results) ? (
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-5 rounded-xl border border-blue-200 flex flex-col justify-between space-y-4">
            <div>
              <span className="text-xs font-bold text-blue-900 uppercase tracking-wider">Calculated Pressure</span>
              <div className="text-3xl font-black text-blue-950 font-mono-numbers mt-1">
                {results.pressurePascals.toLocaleString()} Pa
              </div>
            </div>

            <div className="bg-white p-3 rounded-lg border border-blue-100 text-xs text-slate-700 space-y-1">
              <div className="flex justify-between"><span>Pounds per Square Inch (PSI):</span><span className="font-bold">{results.pressurePsi.toFixed(3)} psi</span></div>
              <div className="flex justify-between"><span>Bar:</span><span className="font-bold">{results.pressureBar.toFixed(4)} bar</span></div>
              <div className="flex justify-between"><span>Atmospheres (atm):</span><span className="font-bold">{results.pressureAtm.toFixed(4)} atm</span></div>
            </div>
          </div>
        ) : (
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 text-center text-slate-500 text-xs flex items-center justify-center">
            {results && 'error' in results ? results.error : 'Enter perpendicular force and surface area to calculate pressure.'}
          </div>
        )}
      </div>
    </div>
  );
};

// 4. Speed of Sound & Mach Calculator
export const SpeedOfSoundCalculator: React.FC<BaseCalcProps> = () => {
  const [temperatureC, setTemperatureC] = useState<number | ''>(20);
  const [objectSpeedKmh, setObjectSpeedKmh] = useState<number | ''>(1235);

  const handleReset = () => {
    setTemperatureC(20);
    setObjectSpeedKmh(1235);
  };

  const results = useMemo(() => {
    if (temperatureC === '' || objectSpeedKmh === '') return null;
    const tc = temperatureC;
    const osk = objectSpeedKmh;
    if (tc < -273.15) {
      return { error: 'Temperature cannot be below absolute zero (−273.15 °C).' } as const;
    }
    if (osk < 0) {
      return { error: 'Object speed must be non-negative.' } as const;
    }

    const speedOfSoundMs = 331.3 * Math.sqrt(1 + tc / 273.15);
    const speedOfSoundKmh = speedOfSoundMs * 3.6;
    const speedOfSoundMph = speedOfSoundKmh * 0.621371;
    const machNumber = speedOfSoundKmh > 0 ? osk / speedOfSoundKmh : 0;

    return { tc, speedOfSoundMs, speedOfSoundKmh, speedOfSoundMph, machNumber };
  }, [temperatureC, objectSpeedKmh]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-6 rounded-2xl border border-slate-200">
        <div className="space-y-3.5">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold uppercase text-slate-700 tracking-wider">Air Conditions &amp; Vehicle Speed</h4>
            <button
              type="button"
              onClick={handleReset}
              className="text-xs font-semibold text-slate-500 hover:text-slate-900 flex items-center gap-1 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Reset
            </button>
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Air Temperature (°C)</label>
            <DecimalInput
              value={temperatureC}
              onValueChange={setTemperatureC}
              allowNegative
              className="w-full px-3 py-1.5 border rounded-lg text-xs font-bold"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Object Speed (km/h)</label>
            <DecimalInput
              value={objectSpeedKmh}
              onValueChange={setObjectSpeedKmh}
              className="w-full px-3 py-1.5 border rounded-lg text-xs font-bold"
            />
          </div>
        </div>

        {results && !('error' in results) ? (
          <div className="bg-gradient-to-br from-sky-50 to-indigo-50 p-5 rounded-xl border border-sky-200 flex flex-col justify-between space-y-4">
            <div>
              <span className="text-xs font-bold text-sky-900 uppercase tracking-wider">Speed of Sound at {results.tc}°C</span>
              <div className="text-3xl font-black text-sky-950 font-mono-numbers mt-1">
                {results.speedOfSoundMs.toFixed(1)} m/s
              </div>
              <span className="text-xs text-sky-800 font-semibold">({results.speedOfSoundKmh.toFixed(1)} km/h • {results.speedOfSoundMph.toFixed(1)} mph)</span>
            </div>

            <div className="bg-white p-3 rounded-lg border border-sky-100 text-xs text-slate-700">
              <div className="flex justify-between font-bold text-slate-900">
                <span>Mach Equivalent:</span>
                <span className="text-blue-700">Mach {results.machNumber.toFixed(2)}</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 text-center text-slate-500 text-xs flex items-center justify-center">
            {results && 'error' in results ? results.error : 'Enter air temperature and object speed to calculate speed of sound and Mach number.'}
          </div>
        )}
      </div>
    </div>
  );
};

// 5. Work Hours & Time Card Calculator
export const TimeCardCalculator: React.FC<BaseCalcProps> = ({ currencySymbol = '$' }) => {
  const [hourlyWage, setHourlyWage] = useState<number | ''>(25);
  const [hoursMon, setHoursMon] = useState<number | ''>(8);
  const [hoursTue, setHoursTue] = useState<number | ''>(8);
  const [hoursWed, setHoursWed] = useState<number | ''>(8);
  const [hoursThu, setHoursThu] = useState<number | ''>(8.5);
  const [hoursFri, setHoursFri] = useState<number | ''>(9);

  const handleReset = () => {
    setHourlyWage(25);
    setHoursMon(8);
    setHoursTue(8);
    setHoursWed(8);
    setHoursThu(8.5);
    setHoursFri(9);
  };

  const results = useMemo(() => {
    if (
      hourlyWage === '' ||
      hoursMon === '' ||
      hoursTue === '' ||
      hoursWed === '' ||
      hoursThu === '' ||
      hoursFri === ''
    ) {
      return null;
    }

    const hw = hourlyWage;
    const hM = hoursMon;
    const hTu = hoursTue;
    const hW = hoursWed;
    const hTh = hoursThu;
    const hF = hoursFri;

    if (hw < 0 || hM < 0 || hTu < 0 || hW < 0 || hTh < 0 || hF < 0) {
      return { error: 'Daily hours and hourly wage must be non-negative.' } as const;
    }

    const totalHours = hM + hTu + hW + hTh + hF;
    const regularHours = Math.min(40, totalHours);
    const overtimeHours = Math.max(0, totalHours - 40);
    const regularPay = regularHours * hw;
    const overtimePay = overtimeHours * (hw * 1.5);
    const totalGrossPay = regularPay + overtimePay;

    return { totalHours, regularHours, overtimeHours, regularPay, overtimePay, totalGrossPay, hw };
  }, [hourlyWage, hoursMon, hoursTue, hoursWed, hoursThu, hoursFri]);

  const dayRows: { label: string; val: number | ''; setter: React.Dispatch<React.SetStateAction<number | ''>> }[] = [
    { label: 'Mon', val: hoursMon, setter: setHoursMon },
    { label: 'Tue', val: hoursTue, setter: setHoursTue },
    { label: 'Wed', val: hoursWed, setter: setHoursWed },
    { label: 'Thu', val: hoursThu, setter: setHoursThu },
    { label: 'Fri', val: hoursFri, setter: setHoursFri }
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-6 rounded-2xl border border-slate-200">
        <div className="space-y-3.5">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold uppercase text-slate-700 tracking-wider">Daily Clocked Hours</h4>
            <button
              type="button"
              onClick={handleReset}
              className="text-xs font-semibold text-slate-500 hover:text-slate-900 flex items-center gap-1 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Reset
            </button>
          </div>
          <div className="grid grid-cols-5 gap-1.5">
            {dayRows.map((d) => (
              <div key={d.label}>
                <label className="block text-[10px] text-slate-500 text-center mb-0.5">{d.label}</label>
                <DecimalInput
                  value={d.val}
                  onValueChange={d.setter}
                  className="w-full p-1 border rounded text-center text-xs font-bold"
                />
              </div>
            ))}
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Hourly Base Wage ({currencySymbol})</label>
            <DecimalInput
              value={hourlyWage}
              onValueChange={setHourlyWage}
              className="w-full px-3 py-1.5 border rounded-lg text-xs font-bold"
            />
          </div>
        </div>

        {results && !('error' in results) ? (
          <div className="bg-gradient-to-br from-orange-50 to-teal-50 p-5 rounded-xl border border-orange-200 flex flex-col justify-between space-y-4">
            <div>
              <span className="text-xs font-bold text-orange-900 uppercase tracking-wider">Total Weekly Gross Pay</span>
              <div className="text-3xl font-black text-orange-950 font-mono-numbers mt-1">
                {currencySymbol}{results.totalGrossPay.toFixed(2)}
              </div>
              <span className="text-xs text-orange-700 font-semibold">{results.totalHours.toFixed(2).replace(/\.00$/, '')} Total Clocked Hours</span>
            </div>

            <div className="bg-white p-3 rounded-lg border border-orange-100 text-xs text-slate-700 space-y-1">
              <div className="flex justify-between"><span>Regular Pay ({results.regularHours} hrs @ {currencySymbol}{results.hw}):</span><span>{currencySymbol}{results.regularPay.toFixed(2)}</span></div>
              <div className="flex justify-between"><span>Overtime Pay ({results.overtimeHours} hrs @ 1.5x):</span><span className="font-bold text-orange-700">+{currencySymbol}{results.overtimePay.toFixed(2)}</span></div>
            </div>
          </div>
        ) : (
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 text-center text-slate-500 text-xs flex items-center justify-center">
            {results && 'error' in results ? results.error : 'Enter clocked hours for each day and hourly base wage to calculate pay.'}
          </div>
        )}
      </div>
    </div>
  );
};

// 6. Exact Age in Seconds, Hours & Days
export const ExactAgeCalculator: React.FC<BaseCalcProps> = () => {
  const [birthYear, setBirthYear] = useState<number | ''>(1995);
  const [birthMonth, setBirthMonth] = useState<number>(6);
  const [birthDay, setBirthDay] = useState<number | ''>(15);

  const handleReset = () => {
    setBirthYear(1995);
    setBirthMonth(6);
    setBirthDay(15);
  };

  const results = useMemo(() => {
    if (birthYear === '' || birthDay === '') return null;
    const by = Math.trunc(birthYear);
    const bd = Math.trunc(birthDay);
    const maxDay = getDaysInMonth(by, birthMonth);
    const now = new Date();

    if (by < 1900 || by > now.getFullYear()) {
      return { error: `Enter a valid birth year between 1900 and ${now.getFullYear()}.` } as const;
    }
    if (bd < 1 || bd > maxDay) {
      return { error: `Month ${birthMonth} of ${by} has ${maxDay} days. Enter a day between 1 and ${maxDay}.` } as const;
    }

    const birth = new Date(by, birthMonth - 1, bd);
    if (birth.getTime() > now.getTime()) {
      return { error: 'Birth date cannot be in the future.' } as const;
    }

    const diffMs = now.getTime() - birth.getTime();
    const totalSeconds = Math.floor(diffMs / 1000);
    const totalMinutes = Math.floor(totalSeconds / 60);
    const totalHours = Math.floor(totalMinutes / 60);
    const totalDays = Math.floor(totalHours / 24);
    const years = (totalDays / 365.2425).toFixed(2);
    const heartbeats = Math.floor(totalMinutes * 75);

    return { totalSeconds, totalHours, totalDays, years, heartbeats };
  }, [birthYear, birthMonth, birthDay]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-6 rounded-2xl border border-slate-200">
        <div className="space-y-3.5">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold uppercase text-slate-700 tracking-wider">Date of Birth</h4>
            <button
              type="button"
              onClick={handleReset}
              className="text-xs font-semibold text-slate-500 hover:text-slate-900 flex items-center gap-1 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Reset
            </button>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <div>
              <label className="block text-[11px] font-semibold text-slate-600 mb-1">Month</label>
              <select
                value={birthMonth}
                onChange={(e) => setBirthMonth(Number(e.target.value))}
                className="w-full px-2 py-1.5 border rounded-lg text-xs font-bold bg-white"
              >
                {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map((m, i) => (
                  <option key={m} value={i + 1}>{m}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-slate-600 mb-1">Day</label>
              <DecimalInput
                value={birthDay}
                onValueChange={setBirthDay}
                allowDecimal={false}
                className="w-full px-2 py-1.5 border rounded-lg text-xs font-bold"
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-slate-600 mb-1">Year</label>
              <DecimalInput
                value={birthYear}
                onValueChange={setBirthYear}
                allowDecimal={false}
                className="w-full px-2 py-1.5 border rounded-lg text-xs font-bold"
              />
            </div>
          </div>
        </div>

        {results && !('error' in results) ? (
          <div className="bg-gradient-to-br from-indigo-50 to-blue-50 p-5 rounded-xl border border-indigo-200 flex flex-col justify-between space-y-4">
            <div>
              <span className="text-xs font-bold text-indigo-900 uppercase tracking-wider">Exact Elapsed Lifespan</span>
              <div className="text-3xl font-black text-indigo-950 font-mono-numbers mt-1">
                {results.years} Years
              </div>
              <span className="text-xs text-indigo-700 font-semibold">{results.totalDays.toLocaleString()} Days lived</span>
            </div>

            <div className="bg-white p-3 rounded-lg border border-indigo-100 text-xs text-slate-700 space-y-1">
              <div className="flex justify-between"><span>Total Hours:</span><span className="font-bold">{results.totalHours.toLocaleString()} hrs</span></div>
              <div className="flex justify-between"><span>Total Seconds:</span><span className="font-bold">{results.totalSeconds.toLocaleString()} s</span></div>
              <div className="flex justify-between border-t pt-1"><span>Estimated Heartbeats:</span><span className="font-bold text-red-600">~{results.heartbeats.toLocaleString()} beats</span></div>
            </div>
          </div>
        ) : (
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 text-center text-slate-500 text-xs flex items-center justify-center">
            {results && 'error' in results ? results.error : 'Enter your date of birth to calculate exact elapsed lifespan.'}
          </div>
        )}
      </div>
    </div>
  );
};

// 7. Time Zone Difference & Meeting Planner
export const TimeZoneCalculator: React.FC<BaseCalcProps> = () => {
  const [baseTimeHour, setBaseTimeHour] = useState<number | ''>(14);
  const [baseTimeMinute, setBaseTimeMinute] = useState<number | ''>(0);
  const [originZoneOffset, setOriginZoneOffset] = useState<number>(-5);

  const handleReset = () => {
    setBaseTimeHour(14);
    setBaseTimeMinute(0);
    setOriginZoneOffset(-5);
  };

  const zones = [
    { name: 'US Pacific (PST/PDT)', offset: -8 },
    { name: 'US Eastern (EST/EDT)', offset: -5 },
    { name: 'London / UTC (GMT)', offset: 0 },
    { name: 'Central Europe (CET)', offset: 1 },
    { name: 'Dubai (GST)', offset: 4 },
    { name: 'India (IST)', offset: 5.5 },
    { name: 'Tokyo (JST)', offset: 9 },
    { name: 'Sydney (AEST)', offset: 10 }
  ];

  const results = useMemo(() => {
    if (baseTimeHour === '' || baseTimeMinute === '') return null;
    const h = Math.trunc(baseTimeHour);
    const m = Math.trunc(baseTimeMinute);
    if (h < 0 || h > 23 || m < 0 || m > 59) {
      return { error: 'Enter an hour between 0 and 23 and minutes between 0 and 59.' } as const;
    }
    const baseMinutes = h * 60 + m;
    return { baseMinutes };
  }, [baseTimeHour, baseTimeMinute]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-6 rounded-2xl border border-slate-200">
        <div className="space-y-3.5">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold uppercase text-slate-700 tracking-wider">Origin Meeting Time</h4>
            <button
              type="button"
              onClick={handleReset}
              className="text-xs font-semibold text-slate-500 hover:text-slate-900 flex items-center gap-1 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Reset
            </button>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Hour (0–23)</label>
              <DecimalInput
                value={baseTimeHour}
                onValueChange={setBaseTimeHour}
                allowDecimal={false}
                className="w-full px-3 py-1.5 border rounded-lg text-xs font-bold"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Minute (0–59)</label>
              <DecimalInput
                value={baseTimeMinute}
                onValueChange={setBaseTimeMinute}
                allowDecimal={false}
                className="w-full px-3 py-1.5 border rounded-lg text-xs font-bold"
              />
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Your Base Zone (Standard Offset)</label>
            <select
              value={originZoneOffset}
              onChange={(e) => setOriginZoneOffset(Number(e.target.value))}
              className="w-full px-3 py-1.5 border rounded-lg text-xs font-bold bg-white"
            >
              {zones.map((z) => (
                <option key={z.name} value={z.offset}>{z.name} (UTC{z.offset >= 0 ? `+${z.offset}` : z.offset})</option>
              ))}
            </select>
          </div>
        </div>

        {results && !('error' in results) ? (
          <div className="bg-gradient-to-br from-slate-900 to-indigo-950 text-white p-5 rounded-xl flex flex-col justify-between space-y-3">
            <span className="text-xs font-bold text-indigo-300 uppercase tracking-wider">World Converted Times</span>
            <div className="space-y-1.5 text-xs">
              {zones.map((z) => {
                const diffMinutes = Math.round((z.offset - originZoneOffset) * 60);
                const rawMinutes = results.baseMinutes + diffMinutes;
                const dayShift = Math.floor(rawMinutes / 1440);
                const modMinutes = ((rawMinutes % 1440) + 1440) % 1440;
                const hh = String(Math.floor(modMinutes / 60)).padStart(2, '0');
                const mm = String(modMinutes % 60).padStart(2, '0');
                const dayLabel = dayShift > 0 ? ' (+1d)' : dayShift < 0 ? ' (-1d)' : '';
                return (
                  <div key={z.name} className="flex justify-between border-b border-white/10 pb-1">
                    <span className="text-slate-300">{z.name}:</span>
                    <span className="font-mono font-bold text-white">{hh}:{mm}{dayLabel}</span>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 text-center text-slate-500 text-xs flex items-center justify-center">
            {results && 'error' in results ? results.error : 'Enter origin hour (0-23) and minutes (0-59) to convert across world time zones.'}
          </div>
        )}
      </div>
    </div>
  );
};

// 8. Personal Net Worth Tracker Calculator
export const NetWorthCalculator: React.FC<BaseCalcProps> = ({ currencySymbol = '$' }) => {
  const [cashChecking, setCashChecking] = useState<number | ''>(25000);
  const [investments, setInvestments] = useState<number | ''>(85000);
  const [realEstateVal, setRealEstateVal] = useState<number | ''>(350000);
  const [vehiclesOther, setVehiclesOther] = useState<number | ''>(20000);

  const [mortgageDebt, setMortgageDebt] = useState<number | ''>(260000);
  const [studentDebt, setStudentDebt] = useState<number | ''>(15000);
  const [carLoans, setCarLoans] = useState<number | ''>(8000);
  const [creditCardDebt, setCreditCardDebt] = useState<number | ''>(2000);

  const handleReset = () => {
    setCashChecking(25000);
    setInvestments(85000);
    setRealEstateVal(350000);
    setVehiclesOther(20000);
    setMortgageDebt(260000);
    setStudentDebt(15000);
    setCarLoans(8000);
    setCreditCardDebt(2000);
  };

  const results = useMemo(() => {
    if (
      cashChecking === '' ||
      investments === '' ||
      realEstateVal === '' ||
      vehiclesOther === '' ||
      mortgageDebt === '' ||
      studentDebt === '' ||
      carLoans === '' ||
      creditCardDebt === ''
    ) {
      return null;
    }

    const totalAssets = cashChecking + investments + realEstateVal + vehiclesOther;
    const totalLiabilities = mortgageDebt + studentDebt + carLoans + creditCardDebt;
    const netWorth = totalAssets - totalLiabilities;

    return { totalAssets, totalLiabilities, netWorth };
  }, [cashChecking, investments, realEstateVal, vehiclesOther, mortgageDebt, studentDebt, carLoans, creditCardDebt]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-6 rounded-2xl border border-slate-200">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold uppercase text-slate-700 tracking-wider">Balance Sheet Inputs</h4>
            <button
              type="button"
              onClick={handleReset}
              className="text-xs font-semibold text-slate-500 hover:text-slate-900 flex items-center gap-1 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Reset
            </button>
          </div>
          <div className="space-y-2 p-3 bg-orange-50/50 rounded-xl border border-orange-100">
            <span className="text-xs font-bold text-orange-800 uppercase tracking-wider block">Assets ({currencySymbol})</span>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div>
                <label className="block text-[10px] text-slate-500 mb-0.5">Cash / Checking</label>
                <DecimalInput value={cashChecking} onValueChange={setCashChecking} className="w-full p-1.5 border rounded bg-white font-bold" />
              </div>
              <div>
                <label className="block text-[10px] text-slate-500 mb-0.5">Investments / Stocks</label>
                <DecimalInput value={investments} onValueChange={setInvestments} className="w-full p-1.5 border rounded bg-white font-bold" />
              </div>
              <div>
                <label className="block text-[10px] text-slate-500 mb-0.5">Real Estate</label>
                <DecimalInput value={realEstateVal} onValueChange={setRealEstateVal} className="w-full p-1.5 border rounded bg-white font-bold" />
              </div>
              <div>
                <label className="block text-[10px] text-slate-500 mb-0.5">Vehicles / Other</label>
                <DecimalInput value={vehiclesOther} onValueChange={setVehiclesOther} className="w-full p-1.5 border rounded bg-white font-bold" />
              </div>
            </div>
          </div>

          <div className="space-y-2 p-3 bg-red-50/50 rounded-xl border border-red-100">
            <span className="text-xs font-bold text-red-800 uppercase tracking-wider block">Liabilities ({currencySymbol})</span>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div>
                <label className="block text-[10px] text-slate-500 mb-0.5">Mortgage</label>
                <DecimalInput value={mortgageDebt} onValueChange={setMortgageDebt} className="w-full p-1.5 border rounded bg-white font-bold" />
              </div>
              <div>
                <label className="block text-[10px] text-slate-500 mb-0.5">Student Loans</label>
                <DecimalInput value={studentDebt} onValueChange={setStudentDebt} className="w-full p-1.5 border rounded bg-white font-bold" />
              </div>
              <div>
                <label className="block text-[10px] text-slate-500 mb-0.5">Auto Loans</label>
                <DecimalInput value={carLoans} onValueChange={setCarLoans} className="w-full p-1.5 border rounded bg-white font-bold" />
              </div>
              <div>
                <label className="block text-[10px] text-slate-500 mb-0.5">Credit Cards</label>
                <DecimalInput value={creditCardDebt} onValueChange={setCreditCardDebt} className="w-full p-1.5 border rounded bg-white font-bold" />
              </div>
            </div>
          </div>
        </div>

        {results ? (
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-5 rounded-xl border border-blue-200 flex flex-col justify-between space-y-4">
            <div>
              <span className="text-xs font-bold text-blue-900 uppercase tracking-wider">Total Net Worth</span>
              <div className="text-3xl font-black text-blue-950 font-mono-numbers mt-1">
                {results.netWorth < 0 ? '-' : ''}{currencySymbol}{Math.abs(results.netWorth).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </div>
            </div>

            <div className="bg-white p-3 rounded-lg border border-blue-100 text-xs space-y-1.5 text-slate-700">
              <div className="flex justify-between"><span>Total Assets:</span><span className="font-bold text-orange-700">{currencySymbol}{results.totalAssets.toLocaleString()}</span></div>
              <div className="flex justify-between"><span>Total Liabilities:</span><span className="font-bold text-red-700">{currencySymbol}{results.totalLiabilities.toLocaleString()}</span></div>
            </div>
          </div>
        ) : (
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 text-center text-slate-500 text-xs flex items-center justify-center">
            Enter your asset and liability values to calculate net worth.
          </div>
        )}
      </div>
    </div>
  );
};

// 9. Dog Years to Human Years Calculator
export const DogAgeCalculator: React.FC<BaseCalcProps> = () => {
  const [dogAge, setDogAge] = useState<number | ''>(4);
  const [dogSize, setDogSize] = useState<'small' | 'medium' | 'large' | 'giant'>('medium');

  const handleReset = () => {
    setDogAge(4);
    setDogSize('medium');
  };

  const humanAge = useMemo(() => {
    if (dogAge === '') return null;
    const da = dogAge;
    if (da < 0) return null;
    if (da === 0) return 0;
    if (da <= 1) return da * 15;
    if (da <= 2) return 15 + (da - 1) * 9;

    const remainingYears = da - 2;
    let multiplier = 4;
    if (dogSize === 'small') multiplier = 4;
    else if (dogSize === 'medium') multiplier = 5;
    else if (dogSize === 'large') multiplier = 6;
    else multiplier = 7;

    return 24 + remainingYears * multiplier;
  }, [dogAge, dogSize]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-6 rounded-2xl border border-slate-200">
        <div className="space-y-3.5">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold uppercase text-slate-700 tracking-wider">Dog Age &amp; Breed Size</h4>
            <button
              type="button"
              onClick={handleReset}
              className="text-xs font-semibold text-slate-500 hover:text-slate-900 flex items-center gap-1 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Reset
            </button>
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Dog Age (Calendar Years)</label>
            <DecimalInput
              value={dogAge}
              onValueChange={setDogAge}
              className="w-full px-3 py-1.5 border rounded-lg text-xs font-bold"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Breed Size Category</label>
            <select
              value={dogSize}
              onChange={(e) => setDogSize(e.target.value as 'small' | 'medium' | 'large' | 'giant')}
              className="w-full px-3 py-1.5 border rounded-lg text-xs font-bold bg-white"
            >
              <option value="small">Small (&lt; 20 lbs / 9 kg)</option>
              <option value="medium">Medium (21 - 50 lbs / 10 - 23 kg)</option>
              <option value="large">Large (51 - 90 lbs / 24 - 40 kg)</option>
              <option value="giant">Giant (&gt; 90 lbs / 41+ kg)</option>
            </select>
          </div>
        </div>

        {humanAge !== null ? (
          <div className="bg-gradient-to-br from-orange-50 to-orange-100/60 p-5 rounded-xl border border-orange-200 flex flex-col justify-between space-y-4">
            <div>
              <span className="text-xs font-bold text-orange-900 uppercase tracking-wider">Equivalent Human Age</span>
              <div className="text-3xl font-black text-orange-950 font-mono-numbers mt-1">
                ~{Number(humanAge.toFixed(1))} Human Years
              </div>
            </div>
            <div className="bg-white p-3 rounded-lg border border-orange-100 text-xs text-slate-700">
              <p>Calculated using American Veterinary Medical Association (AVMA) piecewise size-adjusted developmental curves (15 yr Year 1, +9 yr Year 2, +4–7 yr/yr thereafter).</p>
            </div>
          </div>
        ) : (
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 text-center text-slate-500 text-xs flex items-center justify-center">
            Enter your dog&apos;s age to calculate human age equivalent.
          </div>
        )}
      </div>
    </div>
  );
};

// 10. Cooking & Kitchen Ratio Converter
export const CookingConverterCalculator: React.FC<BaseCalcProps> = () => {
  const [cups, setCups] = useState<number | ''>(1);
  const [ingredient, setIngredient] = useState<'flour' | 'sugar' | 'butter' | 'liquid'>('flour');

  const handleReset = () => {
    setCups(1);
    setIngredient('flour');
  };

  const conversions = useMemo(() => {
    if (cups === '' || cups < 0) return null;
    const c = cups;
    const tablespoons = Number((c * 16).toFixed(2));
    const teaspoons = Number((c * 48).toFixed(2));
    const fluidOunces = Number((c * 8).toFixed(2));
    const milliliters = c * 236.588;

    let gramsPerCup = 120;
    if (ingredient === 'sugar') gramsPerCup = 200;
    else if (ingredient === 'butter') gramsPerCup = 227;
    else if (ingredient === 'liquid') gramsPerCup = 240;

    const grams = c * gramsPerCup;

    return { tablespoons, teaspoons, fluidOunces, milliliters: milliliters.toFixed(1), grams: grams.toFixed(0) };
  }, [cups, ingredient]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-6 rounded-2xl border border-slate-200">
        <div className="space-y-3.5">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold uppercase text-slate-700 tracking-wider">Volume &amp; Ingredient</h4>
            <button
              type="button"
              onClick={handleReset}
              className="text-xs font-semibold text-slate-500 hover:text-slate-900 flex items-center gap-1 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Reset
            </button>
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Measuring Cups</label>
            <DecimalInput
              value={cups}
              onValueChange={setCups}
              className="w-full px-3 py-1.5 border rounded-lg text-xs font-bold"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Ingredient for Gram Weight</label>
            <select
              value={ingredient}
              onChange={(e) => setIngredient(e.target.value as 'flour' | 'sugar' | 'butter' | 'liquid')}
              className="w-full px-3 py-1.5 border rounded-lg text-xs font-bold bg-white"
            >
              <option value="flour">All-Purpose Flour (~120g/cup)</option>
              <option value="sugar">Granulated Sugar (~200g/cup)</option>
              <option value="butter">Butter (~227g/cup)</option>
              <option value="liquid">Water / Milk (~240g/cup)</option>
            </select>
          </div>
        </div>

        {conversions ? (
          <div className="bg-gradient-to-br from-orange-50 to-teal-50 p-5 rounded-xl border border-orange-200 flex flex-col justify-between space-y-4">
            <div>
              <span className="text-xs font-bold text-orange-900 uppercase tracking-wider">Weight &amp; Volume Equivalents</span>
              <div className="text-3xl font-black text-orange-950 font-mono-numbers mt-1">
                {conversions.grams} grams
              </div>
            </div>

            <div className="bg-white p-3 rounded-lg border border-orange-100 text-xs text-slate-700 space-y-1">
              <div className="flex justify-between"><span>Tablespoons:</span><span className="font-bold">{conversions.tablespoons} tbsp</span></div>
              <div className="flex justify-between"><span>Teaspoons:</span><span className="font-bold">{conversions.teaspoons} tsp</span></div>
              <div className="flex justify-between"><span>Fluid Ounces:</span><span className="font-bold">{conversions.fluidOunces} fl oz</span></div>
              <div className="flex justify-between"><span>Milliliters:</span><span className="font-bold">{conversions.milliliters} mL</span></div>
            </div>
          </div>
        ) : (
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 text-center text-slate-500 text-xs flex items-center justify-center">
            Enter measuring cup volume to calculate kitchen equivalents.
          </div>
        )}
      </div>
    </div>
  );
};

// 11. Crypto DCA (Dollar Cost Averaging) Simulator
export const CryptoDcaCalculator: React.FC<BaseCalcProps> = ({ currencySymbol = '$' }) => {
  const [monthlyDeposit, setMonthlyDeposit] = useState<number | ''>(250);
  const [months, setMonths] = useState<number | ''>(24);
  const [expectedAnnualGrowth, setExpectedAnnualGrowth] = useState<number | ''>(25);

  const handleReset = () => {
    setMonthlyDeposit(250);
    setMonths(24);
    setExpectedAnnualGrowth(25);
  };

  const results = useMemo(() => {
    if (monthlyDeposit === '' || months === '' || expectedAnnualGrowth === '') return null;
    const md = monthlyDeposit;
    const mo = Math.trunc(months);
    const eag = expectedAnnualGrowth;
    if (md < 0 || mo < 1 || mo > 600) {
      return { error: 'Enter a non-negative deposit and a duration between 1 and 600 months.' } as const;
    }

    const totalInvested = md * mo;
    const monthlyRate = eag / 100 / 12;
    let portfolioValue = 0;

    for (let m = 0; m < mo; m++) {
      portfolioValue = Math.max(0, (portfolioValue + md) * (1 + monthlyRate));
    }

    const profit = portfolioValue - totalInvested;
    const roiPct = totalInvested > 0 ? (profit / totalInvested) * 100 : 0;

    return { totalInvested, portfolioValue, profit, roiPct };
  }, [monthlyDeposit, months, expectedAnnualGrowth]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-6 rounded-2xl border border-slate-200">
        <div className="space-y-3.5">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold uppercase text-slate-700 tracking-wider">Recurring Purchase Plan</h4>
            <button
              type="button"
              onClick={handleReset}
              className="text-xs font-semibold text-slate-500 hover:text-slate-900 flex items-center gap-1 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Reset
            </button>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Monthly Deposit ({currencySymbol})</label>
              <DecimalInput
                value={monthlyDeposit}
                onValueChange={setMonthlyDeposit}
                className="w-full px-2.5 py-1.5 border rounded-lg text-xs font-bold"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Duration (Months)</label>
              <DecimalInput
                value={months}
                onValueChange={setMonths}
                allowDecimal={false}
                className="w-full px-2.5 py-1.5 border rounded-lg text-xs font-bold"
              />
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Expected Annual Asset Appreciation (%)</label>
            <DecimalInput
              value={expectedAnnualGrowth}
              onValueChange={setExpectedAnnualGrowth}
              allowNegative
              className="w-full px-3 py-1.5 border rounded-lg text-xs font-bold"
            />
          </div>
        </div>

        {results && !('error' in results) ? (
          <div className="bg-gradient-to-br from-indigo-50 to-purple-50 p-5 rounded-xl border border-indigo-200 flex flex-col justify-between space-y-4">
            <div>
              <span className="text-xs font-bold text-indigo-900 uppercase tracking-wider">Projected Portfolio Value</span>
              <div className="text-3xl font-black text-indigo-950 font-mono-numbers mt-1">
                {currencySymbol}{results.portfolioValue.toLocaleString(undefined, { maximumFractionDigits: 2 })}
              </div>
              <span className={`text-xs font-semibold ${results.profit < 0 ? 'text-red-700' : 'text-indigo-700'}`}>
                Total {results.profit < 0 ? 'Loss' : 'Profit'}: {results.profit < 0 ? '-' : '+'}{currencySymbol}{Math.abs(results.profit).toLocaleString(undefined, { maximumFractionDigits: 2 })} ({results.roiPct.toFixed(1)}% ROI)
              </span>
            </div>

            <div className="bg-white p-3 rounded-lg border border-indigo-100 text-xs text-slate-700">
              <div className="flex justify-between"><span>Total Out-of-Pocket Cash Invested:</span><span className="font-bold">{currencySymbol}{results.totalInvested.toLocaleString()}</span></div>
            </div>
          </div>
        ) : (
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 text-center text-slate-500 text-xs flex items-center justify-center">
            {results && 'error' in results ? results.error : 'Enter deposit amount, duration, and expected growth rate to calculate DCA projection.'}
          </div>
        )}
      </div>
    </div>
  );
};

// 12. Crypto Staking APY & Rewards Calculator
export const StakingRewardsCalculator: React.FC<BaseCalcProps> = () => {
  const [stakedAmount, setStakedAmount] = useState<number | ''>(5000);
  const [apyPercent, setApyPercent] = useState<number | ''>(6.5);
  const [stakingDays, setStakingDays] = useState<number | ''>(365);

  const handleReset = () => {
    setStakedAmount(5000);
    setApyPercent(6.5);
    setStakingDays(365);
  };

  const results = useMemo(() => {
    if (stakedAmount === '' || apyPercent === '' || stakingDays === '') return null;
    const sa = stakedAmount;
    const apy = apyPercent;
    const sd = Math.trunc(stakingDays);
    if (sa < 0 || apy < 0 || sd < 1) {
      return { error: 'Enter non-negative staked amount & APY, and at least 1 staking day.' } as const;
    }

    const dailyRate = apy / 100 / 365;
    const endingAmount = sa * Math.pow(1 + dailyRate, sd);
    const rewardEarned = endingAmount - sa;

    return { endingAmount, rewardEarned };
  }, [stakedAmount, apyPercent, stakingDays]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-6 rounded-2xl border border-slate-200">
        <div className="space-y-3.5">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold uppercase text-slate-700 tracking-wider">Staking Pool Parameters</h4>
            <button
              type="button"
              onClick={handleReset}
              className="text-xs font-semibold text-slate-500 hover:text-slate-900 flex items-center gap-1 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Reset
            </button>
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Staked Crypto Tokens / Value</label>
            <DecimalInput
              value={stakedAmount}
              onValueChange={setStakedAmount}
              className="w-full px-3 py-1.5 border rounded-lg text-xs font-bold"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Staking APY (%)</label>
              <DecimalInput
                value={apyPercent}
                onValueChange={setApyPercent}
                className="w-full px-2.5 py-1.5 border rounded-lg text-xs font-bold"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Staking Duration (Days)</label>
              <DecimalInput
                value={stakingDays}
                onValueChange={setStakingDays}
                allowDecimal={false}
                className="w-full px-2.5 py-1.5 border rounded-lg text-xs font-bold"
              />
            </div>
          </div>
        </div>

        {results && !('error' in results) ? (
          <div className="bg-gradient-to-br from-orange-50 to-teal-50 p-5 rounded-xl border border-orange-200 flex flex-col justify-between space-y-4">
            <div>
              <span className="text-xs font-bold text-orange-900 uppercase tracking-wider">Compounded Staking Yield</span>
              <div className="text-3xl font-black text-orange-950 font-mono-numbers mt-1">
                +{results.rewardEarned.toFixed(2)}
              </div>
              <span className="text-xs text-orange-700 font-semibold">Total Balance: {results.endingAmount.toFixed(2)} tokens</span>
            </div>
          </div>
        ) : (
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 text-center text-slate-500 text-xs flex items-center justify-center">
            {results && 'error' in results ? results.error : 'Enter staked amount, APY, and staking days to calculate yield.'}
          </div>
        )}
      </div>
    </div>
  );
};

// 13. Impermanent Loss Calculator
export const ImpermanentLossCalculator: React.FC<BaseCalcProps> = () => {
  const [priceChangeA, setPriceChangeA] = useState<number | ''>(100);
  const [priceChangeB, setPriceChangeB] = useState<number | ''>(0);

  const handleReset = () => {
    setPriceChangeA(100);
    setPriceChangeB(0);
  };

  const results = useMemo(() => {
    if (priceChangeA === '' || priceChangeB === '') return null;
    const pca = priceChangeA;
    const pcb = priceChangeB;

    if (pca <= -100 || pcb <= -100) {
      return { error: 'Asset price change must be greater than -100%.' } as const;
    }

    const ratioA = 1 + pca / 100;
    const ratioB = 1 + pcb / 100;
    const k = ratioA / ratioB;

    const ilFactor = (2 * Math.sqrt(k)) / (1 + k) - 1;
    const ilPct = Math.abs(ilFactor * 100);

    return { ilPct: ilPct.toFixed(2) };
  }, [priceChangeA, priceChangeB]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-6 rounded-2xl border border-slate-200">
        <div className="space-y-3.5">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold uppercase text-slate-700 tracking-wider">Liquidity Pool Asset Price Changes</h4>
            <button
              type="button"
              onClick={handleReset}
              className="text-xs font-semibold text-slate-500 hover:text-slate-900 flex items-center gap-1 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Reset
            </button>
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Asset A Price Change (%)</label>
            <DecimalInput
              value={priceChangeA}
              onValueChange={setPriceChangeA}
              allowNegative
              className="w-full px-3 py-1.5 border rounded-lg text-xs font-bold"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Asset B Price Change (%)</label>
            <DecimalInput
              value={priceChangeB}
              onValueChange={setPriceChangeB}
              allowNegative
              className="w-full px-3 py-1.5 border rounded-lg text-xs font-bold"
            />
          </div>
        </div>

        {results && !('error' in results) ? (
          <div className="bg-gradient-to-br from-red-50 to-orange-50 p-5 rounded-xl border border-red-200 flex flex-col justify-between space-y-4">
            <div>
              <span className="text-xs font-bold text-red-900 uppercase tracking-wider">Impermanent Loss (IL)</span>
              <div className="text-3xl font-black text-red-950 font-mono-numbers mt-1">
                -{results.ilPct}%
              </div>
              <p className="text-xs text-red-800 mt-1">Loss compared to simply holding both assets outside the liquidity pool.</p>
            </div>
          </div>
        ) : (
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 text-center text-slate-500 text-xs flex items-center justify-center">
            {results && 'error' in results ? results.error : 'Enter asset price change percentages to calculate impermanent loss.'}
          </div>
        )}
      </div>
    </div>
  );
};
