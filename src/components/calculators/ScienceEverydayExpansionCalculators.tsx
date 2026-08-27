import React, { useState, useMemo } from 'react';
import { Clock, Zap, Activity, Coins, Utensils, Dog, Globe, RotateCcw, Copy, Check, TrendingUp, DollarSign } from 'lucide-react';
import { copyToClipboard } from '../../utils/formatters';

interface BaseCalcProps {
  currencySymbol?: string;
  onSave?: (summary: string, inputs: any, results: any) => void;
}

// 1. Density, Mass & Volume Calculator (ρ = m / V)
export const DensityCalculator: React.FC<BaseCalcProps> = () => {
  const [solveFor, setSolveFor] = useState<'density' | 'mass' | 'volume'>('density');
  const [mass, setMass] = useState(500); // grams
  const [volume, setVolume] = useState(250); // cm³ or mL
  const [density, setDensity] = useState(2.0); // g/cm³

  const results = useMemo(() => {
    if (solveFor === 'density') {
      const d = volume > 0 ? mass / volume : 0;
      return { output: d.toFixed(3), unit: 'g/cm³ (or kg/L)', label: 'Calculated Density' };
    } else if (solveFor === 'mass') {
      const m = density * volume;
      return { output: m.toFixed(2), unit: 'grams', label: 'Calculated Mass' };
    } else {
      const v = density > 0 ? mass / density : 0;
      return { output: v.toFixed(2), unit: 'cm³ (mL)', label: 'Calculated Volume' };
    }
  }, [solveFor, mass, volume, density]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-6 rounded-2xl border border-slate-200">
        <div className="space-y-3.5">
          <h4 className="text-xs font-bold uppercase text-slate-700 tracking-wider">Target Variable to Solve</h4>
          <div className="grid grid-cols-3 gap-2">
            {(['density', 'mass', 'volume'] as const).map((mode) => (
              <button
                key={mode}
                type="button"
                onClick={() => setSolveFor(mode)}
                className={`py-1.5 text-xs font-bold rounded-lg border capitalize transition-colors ${solveFor === mode ? 'bg-blue-600 border-blue-600 text-white' : 'bg-slate-50 border-slate-200 text-slate-700'}`}
              >
                {mode}
              </button>
            ))}
          </div>

          <div className="space-y-3 pt-2">
            {solveFor !== 'mass' && (
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Mass (grams)</label>
                <input
                  type="number"
                  value={mass}
                  onChange={(e) => setMass(Math.max(0, Number(e.target.value)))}
                  className="w-full px-3 py-1.5 border rounded-lg text-xs font-bold"
                />
              </div>
            )}
            {solveFor !== 'volume' && (
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Volume (cm³ or mL)</label>
                <input
                  type="number"
                  value={volume}
                  onChange={(e) => setVolume(Math.max(0, Number(e.target.value)))}
                  className="w-full px-3 py-1.5 border rounded-lg text-xs font-bold"
                />
              </div>
            )}
            {solveFor !== 'density' && (
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Density (g/cm³)</label>
                <input
                  type="number"
                  value={density}
                  onChange={(e) => setDensity(Math.max(0, Number(e.target.value)))}
                  className="w-full px-3 py-1.5 border rounded-lg text-xs font-bold"
                />
              </div>
            )}
          </div>
        </div>

        <div className="bg-gradient-to-br from-indigo-50 to-blue-50 p-5 rounded-xl border border-indigo-200 flex flex-col justify-between space-y-4">
          <div>
            <span className="text-xs font-bold text-indigo-900 uppercase tracking-wider">{results.label}</span>
            <div className="text-3xl font-black text-indigo-950 font-mono-numbers mt-1">
              {results.output} <span className="text-sm font-normal text-indigo-700">{results.unit}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// 2. Kinetic & Potential Energy Calculator
export const EnergyCalculator: React.FC<BaseCalcProps> = () => {
  const [massKg, setMassKg] = useState(10);
  const [velocityMs, setVelocityMs] = useState(15);
  const [heightM, setHeightM] = useState(20);

  const kineticEnergyJoules = 0.5 * massKg * Math.pow(velocityMs, 2);
  const potentialEnergyJoules = massKg * 9.80665 * heightM;
  const totalMechanicalJoules = kineticEnergyJoules + potentialEnergyJoules;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-6 rounded-2xl border border-slate-200">
        <div className="space-y-3.5">
          <h4 className="text-xs font-bold uppercase text-slate-700 tracking-wider">Physical Parameters</h4>
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Mass (kg)</label>
            <input
              type="number"
              value={massKg}
              onChange={(e) => setMassKg(Math.max(0, Number(e.target.value)))}
              className="w-full px-3 py-1.5 border rounded-lg text-xs font-bold"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Velocity (m/s)</label>
              <input
                type="number"
                value={velocityMs}
                onChange={(e) => setVelocityMs(Math.max(0, Number(e.target.value)))}
                className="w-full px-2.5 py-1.5 border rounded-lg text-xs font-bold"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Height (meters)</label>
              <input
                type="number"
                value={heightM}
                onChange={(e) => setHeightM(Math.max(0, Number(e.target.value)))}
                className="w-full px-2.5 py-1.5 border rounded-lg text-xs font-bold"
              />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-orange-50 to-orange-100/60 p-5 rounded-xl border border-orange-200 flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <div>
              <span className="text-xs font-bold text-orange-900 uppercase tracking-wider">Kinetic Energy (0.5 mv²)</span>
              <div className="text-2xl font-black text-orange-950 font-mono-numbers">{kineticEnergyJoules.toLocaleString(undefined, { maximumFractionDigits: 2 })} J</div>
            </div>
            <div>
              <span className="text-xs font-bold text-orange-900 uppercase tracking-wider">Gravitational Potential Energy (mgh)</span>
              <div className="text-2xl font-black text-orange-950 font-mono-numbers">{potentialEnergyJoules.toLocaleString(undefined, { maximumFractionDigits: 2 })} J</div>
            </div>
          </div>

          <div className="bg-white p-3 rounded-lg border border-orange-100 text-xs text-slate-700">
            <div className="flex justify-between font-bold text-slate-900">
              <span>Total Mechanical Energy:</span>
              <span>{totalMechanicalJoules.toLocaleString(undefined, { maximumFractionDigits: 2 })} Joules</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// 3. Pressure & Force Calculator (P = F / A)
export const PressureCalculator: React.FC<BaseCalcProps> = () => {
  const [forceN, setForceN] = useState(500); // Newtons
  const [areaM2, setAreaM2] = useState(0.05); // m²

  const pressurePascals = areaM2 > 0 ? forceN / areaM2 : 0;
  const pressurePsi = pressurePascals * 0.000145038;
  const pressureBar = pressurePascals / 100000;
  const pressureAtm = pressurePascals / 101325;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-6 rounded-2xl border border-slate-200">
        <div className="space-y-3.5">
          <h4 className="text-xs font-bold uppercase text-slate-700 tracking-wider">Applied Force & Area</h4>
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Perpendicular Force (Newtons)</label>
            <input
              type="number"
              value={forceN}
              onChange={(e) => setForceN(Math.max(0, Number(e.target.value)))}
              className="w-full px-3 py-1.5 border rounded-lg text-xs font-bold"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Surface Area (m²)</label>
            <input
              type="number"
              step="0.001"
              value={areaM2}
              onChange={(e) => setAreaM2(Math.max(0.0001, Number(e.target.value)))}
              className="w-full px-3 py-1.5 border rounded-lg text-xs font-bold"
            />
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-5 rounded-xl border border-blue-200 flex flex-col justify-between space-y-4">
          <div>
            <span className="text-xs font-bold text-blue-900 uppercase tracking-wider">Calculated Pressure</span>
            <div className="text-3xl font-black text-blue-950 font-mono-numbers mt-1">
              {pressurePascals.toLocaleString()} Pa
            </div>
          </div>

          <div className="bg-white p-3 rounded-lg border border-blue-100 text-xs text-slate-700 space-y-1">
            <div className="flex justify-between"><span>Pounds per Square Inch (PSI):</span><span className="font-bold">{pressurePsi.toFixed(3)} psi</span></div>
            <div className="flex justify-between"><span>Bar:</span><span className="font-bold">{pressureBar.toFixed(4)} bar</span></div>
            <div className="flex justify-between"><span>Atmospheres (atm):</span><span className="font-bold">{pressureAtm.toFixed(4)} atm</span></div>
          </div>
        </div>
      </div>
    </div>
  );
};

// 4. Speed of Sound & Mach Calculator
export const SpeedOfSoundCalculator: React.FC<BaseCalcProps> = () => {
  const [temperatureC, setTemperatureC] = useState(20);
  const [objectSpeedKmh, setObjectSpeedKmh] = useState(1235);

  const speedOfSoundMs = 331.3 * Math.sqrt(1 + temperatureC / 273.15);
  const speedOfSoundKmh = speedOfSoundMs * 3.6;
  const speedOfSoundMph = speedOfSoundKmh * 0.621371;
  const machNumber = speedOfSoundKmh > 0 ? objectSpeedKmh / speedOfSoundKmh : 0;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-6 rounded-2xl border border-slate-200">
        <div className="space-y-3.5">
          <h4 className="text-xs font-bold uppercase text-slate-700 tracking-wider">Air Conditions & Vehicle Speed</h4>
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Air Temperature (°C)</label>
            <input
              type="number"
              value={temperatureC}
              onChange={(e) => setTemperatureC(Number(e.target.value))}
              className="w-full px-3 py-1.5 border rounded-lg text-xs font-bold"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Object Speed (km/h)</label>
            <input
              type="number"
              value={objectSpeedKmh}
              onChange={(e) => setObjectSpeedKmh(Math.max(0, Number(e.target.value)))}
              className="w-full px-3 py-1.5 border rounded-lg text-xs font-bold"
            />
          </div>
        </div>

        <div className="bg-gradient-to-br from-sky-50 to-indigo-50 p-5 rounded-xl border border-sky-200 flex flex-col justify-between space-y-4">
          <div>
            <span className="text-xs font-bold text-sky-900 uppercase tracking-wider">Speed of Sound at {temperatureC}°C</span>
            <div className="text-3xl font-black text-sky-950 font-mono-numbers mt-1">
              {speedOfSoundMs.toFixed(1)} m/s
            </div>
            <span className="text-xs text-sky-800 font-semibold">({speedOfSoundKmh.toFixed(1)} km/h • {speedOfSoundMph.toFixed(1)} mph)</span>
          </div>

          <div className="bg-white p-3 rounded-lg border border-sky-100 text-xs text-slate-700">
            <div className="flex justify-between font-bold text-slate-900">
              <span>Mach Equivalent:</span>
              <span className="text-blue-700">Mach {machNumber.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// 5. Work Hours & Time Card Calculator
export const TimeCardCalculator: React.FC<BaseCalcProps> = ({ currencySymbol = '$' }) => {
  const [hourlyWage, setHourlyWage] = useState(25);
  const [hoursMon, setHoursMon] = useState(8);
  const [hoursTue, setHoursTue] = useState(8);
  const [hoursWed, setHoursWed] = useState(8);
  const [hoursThu, setHoursThu] = useState(8.5);
  const [hoursFri, setHoursFri] = useState(9);

  const totalHours = hoursMon + hoursTue + hoursWed + hoursThu + hoursFri;
  const regularHours = Math.min(40, totalHours);
  const overtimeHours = Math.max(0, totalHours - 40);
  const regularPay = regularHours * hourlyWage;
  const overtimePay = overtimeHours * (hourlyWage * 1.5);
  const totalGrossPay = regularPay + overtimePay;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-6 rounded-2xl border border-slate-200">
        <div className="space-y-3.5">
          <h4 className="text-xs font-bold uppercase text-slate-700 tracking-wider">Daily Clocked Hours</h4>
          <div className="grid grid-cols-5 gap-1.5">
            {[['Mon', hoursMon, setHoursMon], ['Tue', hoursTue, setHoursTue], ['Wed', hoursWed, setHoursWed], ['Thu', hoursThu, setHoursThu], ['Fri', hoursFri, setHoursFri]].map(([day, val, setter]: any) => (
              <div key={day}>
                <label className="block text-[10px] text-slate-500 text-center">{day}</label>
                <input
                  type="number"
                  step="0.5"
                  value={val}
                  onChange={(e) => setter(Math.max(0, Number(e.target.value)))}
                  className="w-full p-1 border rounded text-center text-xs font-bold"
                />
              </div>
            ))}
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Hourly Base Wage ({currencySymbol})</label>
            <input
              type="number"
              value={hourlyWage}
              onChange={(e) => setHourlyWage(Math.max(0, Number(e.target.value)))}
              className="w-full px-3 py-1.5 border rounded-lg text-xs font-bold"
            />
          </div>
        </div>

        <div className="bg-gradient-to-br from-orange-50 to-teal-50 p-5 rounded-xl border border-orange-200 flex flex-col justify-between space-y-4">
          <div>
            <span className="text-xs font-bold text-orange-900 uppercase tracking-wider">Total Weekly Gross Pay</span>
            <div className="text-3xl font-black text-orange-950 font-mono-numbers mt-1">
              {currencySymbol}{totalGrossPay.toFixed(2)}
            </div>
            <span className="text-xs text-orange-700 font-semibold">{totalHours} Total Clocked Hours</span>
          </div>

          <div className="bg-white p-3 rounded-lg border border-orange-100 text-xs text-slate-700 space-y-1">
            <div className="flex justify-between"><span>Regular Pay ({regularHours} hrs @ {currencySymbol}{hourlyWage}):</span><span>{currencySymbol}{regularPay.toFixed(2)}</span></div>
            <div className="flex justify-between"><span>Overtime Pay ({overtimeHours} hrs @ 1.5x):</span><span className="font-bold text-orange-700">+{currencySymbol}{overtimePay.toFixed(2)}</span></div>
          </div>
        </div>
      </div>
    </div>
  );
};

// 6. Exact Age in Seconds, Hours & Days
export const ExactAgeCalculator: React.FC<BaseCalcProps> = () => {
  const [birthYear, setBirthYear] = useState(1995);
  const [birthMonth, setBirthMonth] = useState(6);
  const [birthDay, setBirthDay] = useState(15);

  const results = useMemo(() => {
    const birth = new Date(birthYear, birthMonth - 1, birthDay);
    const now = new Date();
    const diffMs = Math.max(0, now.getTime() - birth.getTime());

    const totalSeconds = Math.floor(diffMs / 1000);
    const totalMinutes = Math.floor(totalSeconds / 60);
    const totalHours = Math.floor(totalMinutes / 60);
    const totalDays = Math.floor(totalHours / 24);
    const years = (totalDays / 365.2425).toFixed(2);
    const heartbeats = Math.floor(totalMinutes * 75); // approx 75 bpm

    return { totalSeconds, totalHours, totalDays, years, heartbeats };
  }, [birthYear, birthMonth, birthDay]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-6 rounded-2xl border border-slate-200">
        <div className="space-y-3.5">
          <h4 className="text-xs font-bold uppercase text-slate-700 tracking-wider">Date of Birth</h4>
          <div className="grid grid-cols-3 gap-2">
            <div>
              <label className="block text-[11px] font-semibold text-slate-600 mb-1">Month</label>
              <select
                value={birthMonth}
                onChange={(e) => setBirthMonth(Number(e.target.value))}
                className="w-full px-2 py-1.5 border rounded-lg text-xs font-bold"
              >
                {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map((m, i) => (
                  <option key={m} value={i + 1}>{m}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-slate-600 mb-1">Day</label>
              <input
                type="number"
                value={birthDay}
                onChange={(e) => setBirthDay(Math.max(1, Math.min(31, Number(e.target.value))))}
                className="w-full px-2 py-1.5 border rounded-lg text-xs font-bold"
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-slate-600 mb-1">Year</label>
              <input
                type="number"
                value={birthYear}
                onChange={(e) => setBirthYear(Number(e.target.value))}
                className="w-full px-2 py-1.5 border rounded-lg text-xs font-bold"
              />
            </div>
          </div>
        </div>

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
      </div>
    </div>
  );
};

// 7. Time Zone Difference & Meeting Planner
export const TimeZoneCalculator: React.FC<BaseCalcProps> = () => {
  const [baseTimeHour, setBaseTimeHour] = useState(14); // 2 PM
  const [originZoneOffset, setOriginZoneOffset] = useState(-5); // UTC-5 EST

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

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-6 rounded-2xl border border-slate-200">
        <div className="space-y-3.5">
          <h4 className="text-xs font-bold uppercase text-slate-700 tracking-wider">Origin Meeting Time</h4>
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Origin Hour (0 - 23 24h clock)</label>
            <input
              type="number"
              value={baseTimeHour}
              onChange={(e) => setBaseTimeHour(Math.max(0, Math.min(23, Number(e.target.value))))}
              className="w-full px-3 py-1.5 border rounded-lg text-xs font-bold"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Your Base Zone</label>
            <select
              value={originZoneOffset}
              onChange={(e) => setOriginZoneOffset(Number(e.target.value))}
              className="w-full px-3 py-1.5 border rounded-lg text-xs font-bold"
            >
              {zones.map((z) => (
                <option key={z.name} value={z.offset}>{z.name} (UTC{z.offset >= 0 ? `+${z.offset}` : z.offset})</option>
              ))}
            </select>
          </div>
        </div>

        <div className="bg-gradient-to-br from-slate-900 to-indigo-950 text-white p-5 rounded-xl flex flex-col justify-between space-y-3">
          <span className="text-xs font-bold text-indigo-300 uppercase tracking-wider">World Converted Times</span>
          <div className="space-y-1.5 text-xs">
            {zones.map((z) => {
              const diff = z.offset - originZoneOffset;
              let targetHour = (baseTimeHour + diff) % 24;
              if (targetHour < 0) targetHour += 24;
              const formatted = `${Math.floor(targetHour)}:${(targetHour % 1 === 0.5 ? '30' : '00')}`;
              return (
                <div key={z.name} className="flex justify-between border-b border-white/10 pb-1">
                  <span className="text-slate-300">{z.name}:</span>
                  <span className="font-mono font-bold text-white">{formatted}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

// 8. Personal Net Worth Tracker Calculator
export const NetWorthCalculator: React.FC<BaseCalcProps> = ({ currencySymbol = '$' }) => {
  const [cashChecking, setCashChecking] = useState(25000);
  const [investments, setInvestments] = useState(85000);
  const [realEstateVal, setRealEstateVal] = useState(350000);
  const [vehiclesOther, setVehiclesOther] = useState(20000);

  const [mortgageDebt, setMortgageDebt] = useState(260000);
  const [studentDebt, setStudentDebt] = useState(15000);
  const [carLoans, setCarLoans] = useState(8000);
  const [creditCardDebt, setCreditCardDebt] = useState(2000);

  const totalAssets = cashChecking + investments + realEstateVal + vehiclesOther;
  const totalLiabilities = mortgageDebt + studentDebt + carLoans + creditCardDebt;
  const netWorth = totalAssets - totalLiabilities;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-6 rounded-2xl border border-slate-200">
        <div className="space-y-4">
          <div className="space-y-2 p-3 bg-orange-50/50 rounded-xl border border-orange-100">
            <span className="text-xs font-bold text-orange-800 uppercase tracking-wider block">Assets</span>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <input type="number" value={cashChecking} onChange={(e) => setCashChecking(Number(e.target.value))} placeholder="Cash" className="p-1.5 border rounded bg-white" />
              <input type="number" value={investments} onChange={(e) => setInvestments(Number(e.target.value))} placeholder="Investments" className="p-1.5 border rounded bg-white" />
              <input type="number" value={realEstateVal} onChange={(e) => setRealEstateVal(Number(e.target.value))} placeholder="Real Estate" className="p-1.5 border rounded bg-white" />
              <input type="number" value={vehiclesOther} onChange={(e) => setVehiclesOther(Number(e.target.value))} placeholder="Vehicles" className="p-1.5 border rounded bg-white" />
            </div>
          </div>

          <div className="space-y-2 p-3 bg-red-50/50 rounded-xl border border-red-100">
            <span className="text-xs font-bold text-red-800 uppercase tracking-wider block">Liabilities</span>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <input type="number" value={mortgageDebt} onChange={(e) => setMortgageDebt(Number(e.target.value))} placeholder="Mortgage" className="p-1.5 border rounded bg-white" />
              <input type="number" value={studentDebt} onChange={(e) => setStudentDebt(Number(e.target.value))} placeholder="Student Loans" className="p-1.5 border rounded bg-white" />
              <input type="number" value={carLoans} onChange={(e) => setCarLoans(Number(e.target.value))} placeholder="Auto Loan" className="p-1.5 border rounded bg-white" />
              <input type="number" value={creditCardDebt} onChange={(e) => setCreditCardDebt(Number(e.target.value))} placeholder="Credit Cards" className="p-1.5 border rounded bg-white" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-5 rounded-xl border border-blue-200 flex flex-col justify-between space-y-4">
          <div>
            <span className="text-xs font-bold text-blue-900 uppercase tracking-wider">Total Net Worth</span>
            <div className="text-3xl font-black text-blue-950 font-mono-numbers mt-1">
              {currencySymbol}{netWorth.toLocaleString(undefined, { minimumFractionDigits: 2 })}
            </div>
          </div>

          <div className="bg-white p-3 rounded-lg border border-blue-100 text-xs space-y-1.5 text-slate-700">
            <div className="flex justify-between"><span>Total Assets:</span><span className="font-bold text-orange-700">{currencySymbol}{totalAssets.toLocaleString()}</span></div>
            <div className="flex justify-between"><span>Total Liabilities:</span><span className="font-bold text-red-700">{currencySymbol}{totalLiabilities.toLocaleString()}</span></div>
          </div>
        </div>
      </div>
    </div>
  );
};

// 9. Dog Years to Human Years Calculator
export const DogAgeCalculator: React.FC<BaseCalcProps> = () => {
  const [dogAge, setDogAge] = useState(4);
  const [dogSize, setDogSize] = useState<'small' | 'medium' | 'large' | 'giant'>('medium');

  const humanAge = useMemo(() => {
    if (dogAge <= 0) return 0;
    if (dogAge === 1) return 15;
    if (dogAge === 2) return 24;

    const remainingYears = dogAge - 2;
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
          <h4 className="text-xs font-bold uppercase text-slate-700 tracking-wider">Dog Age & Breed Size</h4>
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Dog Age (Calendar Years)</label>
            <input
              type="number"
              value={dogAge}
              onChange={(e) => setDogAge(Math.max(0.5, Number(e.target.value)))}
              className="w-full px-3 py-1.5 border rounded-lg text-xs font-bold"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Breed Size Category</label>
            <select
              value={dogSize}
              onChange={(e) => setDogSize(e.target.value as any)}
              className="w-full px-3 py-1.5 border rounded-lg text-xs font-bold"
            >
              <option value="small">Small (&lt; 20 lbs / 9 kg)</option>
              <option value="medium">Medium (21 - 50 lbs / 10 - 23 kg)</option>
              <option value="large">Large (51 - 90 lbs / 24 - 40 kg)</option>
              <option value="giant">Giant (&gt; 90 lbs / 41+ kg)</option>
            </select>
          </div>
        </div>

        <div className="bg-gradient-to-br from-orange-50 to-orange-100/60 p-5 rounded-xl border border-orange-200 flex flex-col justify-between space-y-4">
          <div>
            <span className="text-xs font-bold text-orange-900 uppercase tracking-wider">Equivalent Human Age</span>
            <div className="text-3xl font-black text-orange-950 font-mono-numbers mt-1">
              ~{humanAge} Human Years
            </div>
          </div>
          <div className="bg-white p-3 rounded-lg border border-orange-100 text-xs text-slate-700">
            <p>Calculated using American Veterinary Medical Association (AVMA) size-adjusted developmental curves.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

// 10. Cooking & Kitchen Ratio Converter
export const CookingConverterCalculator: React.FC<BaseCalcProps> = () => {
  const [cups, setCups] = useState(1);
  const [ingredient, setIngredient] = useState<'flour' | 'sugar' | 'butter' | 'liquid'>('flour');

  const conversions = useMemo(() => {
    const tablespoons = cups * 16;
    const teaspoons = cups * 48;
    const fluidOunces = cups * 8;
    const milliliters = cups * 236.588;

    // Weight in grams depends on ingredient density
    let gramsPerCup = 120; // all-purpose flour
    if (ingredient === 'sugar') gramsPerCup = 200; // granulated sugar
    else if (ingredient === 'butter') gramsPerCup = 227; // 2 sticks
    else if (ingredient === 'liquid') gramsPerCup = 240; // water/milk

    const grams = cups * gramsPerCup;

    return { tablespoons, teaspoons, fluidOunces, milliliters: milliliters.toFixed(1), grams: grams.toFixed(0) };
  }, [cups, ingredient]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-6 rounded-2xl border border-slate-200">
        <div className="space-y-3.5">
          <h4 className="text-xs font-bold uppercase text-slate-700 tracking-wider">Volume & Ingredient</h4>
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Measuring Cups</label>
            <input
              type="number"
              step="0.25"
              value={cups}
              onChange={(e) => setCups(Math.max(0, Number(e.target.value)))}
              className="w-full px-3 py-1.5 border rounded-lg text-xs font-bold"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Ingredient for Gram Weight</label>
            <select
              value={ingredient}
              onChange={(e) => setIngredient(e.target.value as any)}
              className="w-full px-3 py-1.5 border rounded-lg text-xs font-bold"
            >
              <option value="flour">All-Purpose Flour (~120g/cup)</option>
              <option value="sugar">Granulated Sugar (~200g/cup)</option>
              <option value="butter">Butter (~227g/cup)</option>
              <option value="liquid">Water / Milk (~240g/cup)</option>
            </select>
          </div>
        </div>

        <div className="bg-gradient-to-br from-orange-50 to-teal-50 p-5 rounded-xl border border-orange-200 flex flex-col justify-between space-y-4">
          <div>
            <span className="text-xs font-bold text-orange-900 uppercase tracking-wider">Weight & Volume Equivalents</span>
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
      </div>
    </div>
  );
};

// 11. Crypto DCA (Dollar Cost Averaging) Simulator
export const CryptoDcaCalculator: React.FC<BaseCalcProps> = ({ currencySymbol = '$' }) => {
  const [monthlyDeposit, setMonthlyDeposit] = useState(250);
  const [months, setMonths] = useState(24);
  const [expectedAnnualGrowth, setExpectedAnnualGrowth] = useState(25);

  const results = useMemo(() => {
    const totalInvested = monthlyDeposit * months;
    const monthlyRate = expectedAnnualGrowth / 100 / 12;
    let portfolioValue = 0;

    for (let m = 0; m < months; m++) {
      portfolioValue = (portfolioValue + monthlyDeposit) * (1 + monthlyRate);
    }

    const profit = portfolioValue - totalInvested;
    const roiPct = totalInvested > 0 ? (profit / totalInvested) * 100 : 0;

    return { totalInvested, portfolioValue, profit, roiPct };
  }, [monthlyDeposit, months, expectedAnnualGrowth]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-6 rounded-2xl border border-slate-200">
        <div className="space-y-3.5">
          <h4 className="text-xs font-bold uppercase text-slate-700 tracking-wider">Recurring Purchase Plan</h4>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Monthly Deposit ({currencySymbol})</label>
              <input
                type="number"
                value={monthlyDeposit}
                onChange={(e) => setMonthlyDeposit(Math.max(0, Number(e.target.value)))}
                className="w-full px-2.5 py-1.5 border rounded-lg text-xs font-bold"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Duration (Months)</label>
              <input
                type="number"
                value={months}
                onChange={(e) => setMonths(Math.max(1, Number(e.target.value)))}
                className="w-full px-2.5 py-1.5 border rounded-lg text-xs font-bold"
              />
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Expected Annual Asset Appreciation (%)</label>
            <input
              type="number"
              value={expectedAnnualGrowth}
              onChange={(e) => setExpectedAnnualGrowth(Number(e.target.value))}
              className="w-full px-3 py-1.5 border rounded-lg text-xs font-bold"
            />
          </div>
        </div>

        <div className="bg-gradient-to-br from-indigo-50 to-purple-50 p-5 rounded-xl border border-indigo-200 flex flex-col justify-between space-y-4">
          <div>
            <span className="text-xs font-bold text-indigo-900 uppercase tracking-wider">Projected Portfolio Value</span>
            <div className="text-3xl font-black text-indigo-950 font-mono-numbers mt-1">
              {currencySymbol}{results.portfolioValue.toLocaleString(undefined, { maximumFractionDigits: 2 })}
            </div>
            <span className="text-xs text-indigo-700 font-semibold">Total Profit: +{currencySymbol}{results.profit.toLocaleString(undefined, { maximumFractionDigits: 2 })} ({results.roiPct.toFixed(1)}% ROI)</span>
          </div>

          <div className="bg-white p-3 rounded-lg border border-indigo-100 text-xs text-slate-700">
            <div className="flex justify-between"><span>Total Out-of-Pocket Cash Invested:</span><span className="font-bold">{currencySymbol}{results.totalInvested.toLocaleString()}</span></div>
          </div>
        </div>
      </div>
    </div>
  );
};

// 12. Crypto Staking APY & Rewards Calculator
export const StakingRewardsCalculator: React.FC<BaseCalcProps> = ({ currencySymbol = '$' }) => {
  const [stakedAmount, setStakedAmount] = useState(5000);
  const [apyPercent, setApyPercent] = useState(6.5);
  const [stakingDays, setStakingDays] = useState(365);

  const dailyRate = apyPercent / 100 / 365;
  const endingAmount = stakedAmount * Math.pow(1 + dailyRate, stakingDays);
  const rewardEarned = endingAmount - stakedAmount;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-6 rounded-2xl border border-slate-200">
        <div className="space-y-3.5">
          <h4 className="text-xs font-bold uppercase text-slate-700 tracking-wider">Staking Pool Parameters</h4>
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Staked Crypto Tokens / Value</label>
            <input
              type="number"
              value={stakedAmount}
              onChange={(e) => setStakedAmount(Math.max(0, Number(e.target.value)))}
              className="w-full px-3 py-1.5 border rounded-lg text-xs font-bold"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Staking APY (%)</label>
              <input
                type="number"
                step="0.1"
                value={apyPercent}
                onChange={(e) => setApyPercent(Math.max(0, Number(e.target.value)))}
                className="w-full px-2.5 py-1.5 border rounded-lg text-xs font-bold"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Staking Duration (Days)</label>
              <input
                type="number"
                value={stakingDays}
                onChange={(e) => setStakingDays(Math.max(1, Number(e.target.value)))}
                className="w-full px-2.5 py-1.5 border rounded-lg text-xs font-bold"
              />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-orange-50 to-teal-50 p-5 rounded-xl border border-orange-200 flex flex-col justify-between space-y-4">
          <div>
            <span className="text-xs font-bold text-orange-900 uppercase tracking-wider">Compounded Staking Yield</span>
            <div className="text-3xl font-black text-orange-950 font-mono-numbers mt-1">
              +{rewardEarned.toFixed(2)}
            </div>
            <span className="text-xs text-orange-700 font-semibold">Total Balance: {endingAmount.toFixed(2)} tokens</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// 13. Impermanent Loss Calculator
export const ImpermanentLossCalculator: React.FC<BaseCalcProps> = () => {
  const [priceChangeA, setPriceChangeA] = useState(100); // 100% up (2x)
  const [priceChangeB, setPriceChangeB] = useState(0); // 0% stable

  const results = useMemo(() => {
    // Relative price ratio change k
    const ratioA = 1 + priceChangeA / 100;
    const ratioB = 1 + priceChangeB / 100;
    const k = ratioA / ratioB;

    if (k <= 0) return { ilPct: 0, holdValue: 0, poolValue: 0 };
    // Standard AMM Impermanent Loss formula: IL = (2 * sqrt(k)) / (1 + k) - 1
    const ilFactor = (2 * Math.sqrt(k)) / (1 + k) - 1;
    const ilPct = Math.abs(ilFactor * 100);

    return { ilPct: ilPct.toFixed(2) };
  }, [priceChangeA, priceChangeB]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-6 rounded-2xl border border-slate-200">
        <div className="space-y-3.5">
          <h4 className="text-xs font-bold uppercase text-slate-700 tracking-wider">Liquidity Pool Asset Price Changes</h4>
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Asset A Price Change (%)</label>
            <input
              type="number"
              value={priceChangeA}
              onChange={(e) => setPriceChangeA(Number(e.target.value))}
              className="w-full px-3 py-1.5 border rounded-lg text-xs font-bold"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Asset B Price Change (%)</label>
            <input
              type="number"
              value={priceChangeB}
              onChange={(e) => setPriceChangeB(Number(e.target.value))}
              className="w-full px-3 py-1.5 border rounded-lg text-xs font-bold"
            />
          </div>
        </div>

        <div className="bg-gradient-to-br from-red-50 to-orange-50 p-5 rounded-xl border border-red-200 flex flex-col justify-between space-y-4">
          <div>
            <span className="text-xs font-bold text-red-900 uppercase tracking-wider">Impermanent Loss (IL)</span>
            <div className="text-3xl font-black text-red-950 font-mono-numbers mt-1">
              -{results.ilPct}%
            </div>
            <p className="text-xs text-red-800 mt-1">Loss compared to simply holding both assets outside the liquidity pool.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
