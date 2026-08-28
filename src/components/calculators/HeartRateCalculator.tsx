import React, { useState, useMemo } from 'react';
import { Heart, Activity, Flame, Zap, Copy, Check, Bookmark } from 'lucide-react';
import { copyToClipboard } from '../../utils/formatters';

interface HeartRateCalculatorProps {
  onSaveCalculation?: (summary: string, inputs: any, results: any) => void;
}

export const HeartRateCalculator: React.FC<HeartRateCalculatorProps> = ({ onSaveCalculation }) => {
  const [age, setAge] = useState<number | ''>(30);
  const [restingHr, setRestingHr] = useState<number | ''>(62);
  const [formula, setFormula] = useState<'tanaka' | 'fox' | 'karvonen'>('karvonen');
  const [copied, setCopied] = useState<boolean>(false);
  const [saved, setSaved] = useState<boolean>(false);

  const numAge = typeof age === 'number' ? age : 0;
  const numRestingHr = typeof restingHr === 'number' ? restingHr : 0;

  const isInputEmpty = age === '' || restingHr === '';

  const calculations = useMemo(() => {
    if (isInputEmpty || numAge <= 0 || numRestingHr <= 0) return null;

    const validAge = Math.max(10, numAge);
    const validRhr = Math.max(35, numRestingHr);

    // Max HR formulas
    // Tanaka: 208 - (0.7 * age)
    // Fox: 220 - age
    const maxHrTanaka = Math.round(208 - 0.7 * validAge);
    const maxHrFox = Math.round(220 - validAge);
    const baseMaxHr = formula === 'fox' ? maxHrFox : maxHrTanaka;

    // Zones definition (5-zone standard)
    const ZONES_CONFIG = [
      {
        zone: 'Zone 1 (Active Recovery)',
        pctRange: '50% - 60%',
        minPct: 0.50,
        maxPct: 0.60,
        desc: 'Warm-up, cooldown, active recovery',
        color: 'text-blue-500'
      },
      {
        zone: 'Zone 2 (Aerobic Base / Fat Burn)',
        pctRange: '60% - 70%',
        minPct: 0.60,
        maxPct: 0.70,
        desc: 'Mitochondrial density, all-day endurance base',
        color: 'text-orange-500'
      },
      {
        zone: 'Zone 3 (Tempo / Aerobic Power)',
        pctRange: '70% - 80%',
        minPct: 0.70,
        maxPct: 0.80,
        desc: 'Cardiovascular efficiency, steady-state pace',
        color: 'text-amber-500'
      },
      {
        zone: 'Zone 4 (Lactate Threshold)',
        pctRange: '80% - 90%',
        minPct: 0.80,
        maxPct: 0.90,
        desc: 'High speed endurance, hard sustained effort',
        color: 'text-orange-500'
      },
      {
        zone: 'Zone 5 (VO2 Max / Anaerobic Peak)',
        pctRange: '90% - 100%',
        minPct: 0.90,
        maxPct: 1.00,
        desc: 'Maximum sprints, HIIT intervals, peak capacity',
        color: 'text-rose-500'
      }
    ];

    const zones = ZONES_CONFIG.map(z => {
      let minBpm = 0;
      let maxBpm = 0;

      if (formula === 'karvonen') {
        // Karvonen Heart Rate Reserve: Target HR = ((MaxHR - RHR) * %intensity) + RHR
        const hrr = baseMaxHr - validRhr;
        minBpm = Math.round(hrr * z.minPct + validRhr);
        maxBpm = Math.round(hrr * z.maxPct + validRhr);
      } else {
        // Standard % of Max HR
        minBpm = Math.round(baseMaxHr * z.minPct);
        maxBpm = Math.round(baseMaxHr * z.maxPct);
      }

      return {
        ...z,
        rangeBpm: `${minBpm} – ${maxBpm} BPM`
      };
    });

    return {
      maxHrTanaka,
      maxHrFox,
      baseMaxHr,
      zones
    };
  }, [isInputEmpty, numAge, numRestingHr, formula]);

  const handleCopy = async () => {
    if (!calculations) return;
    const text = `Target Heart Rate Zones (Age ${numAge}, RHR ${numRestingHr} BPM):
Estimated Max HR: ${calculations.baseMaxHr} BPM (${formula.toUpperCase()})
Zone 1 (Recovery 50-60%): ${calculations.zones[0].rangeBpm}
Zone 2 (Endurance Base 60-70%): ${calculations.zones[1].rangeBpm}
Zone 3 (Tempo 70-80%): ${calculations.zones[2].rangeBpm}
Zone 4 (Threshold 80-90%): ${calculations.zones[3].rangeBpm}
Zone 5 (VO2 Max 90-100%): ${calculations.zones[4].rangeBpm}`;

    const ok = await copyToClipboard(text);
    if (ok) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleReset = () => {
    setAge(30);
    setRestingHr(62);
    setFormula('karvonen');
  };

  const handleSave = () => {
    if (onSaveCalculation && calculations) {
      onSaveCalculation(
        `Target HR: Max ${calculations.baseMaxHr} BPM | Zone 2 Base: ${calculations.zones[1].rangeBpm} (Age ${numAge})`,
        { age, restingHr, formula },
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
        <div className="lg:col-span-5 bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-2xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Heart className="w-4 h-4 text-rose-600" />
              <span>Cardiovascular Inputs</span>
            </h2>
            <button
              onClick={handleReset}
              className="text-xs font-semibold text-slate-600 hover:text-slate-900 px-2.5 py-1 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors"
            >
              Reset
            </button>
          </div>

          <div className="space-y-1.5">
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

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 flex justify-between">
              <span>Resting Heart Rate (RHR)</span>
              <span className="text-rose-600 font-mono">{restingHr} BPM</span>
            </label>
            <input
              type="number"
              min="35"
              max="130"
              value={restingHr}
              onChange={(e) => setRestingHr(e.target.value === '' ? '' : Number(e.target.value))}
              className="w-full p-2 text-sm font-semibold border border-slate-200 rounded-xl bg-slate-50/50 focus:bg-white focus:outline-none"
            />
          </div>

          <div className="space-y-1 pt-2 border-t border-slate-100">
            <label className="text-xs font-bold text-slate-700">Calculation Method</label>
            <div className="grid grid-cols-3 gap-1.5 p-1 bg-slate-100 rounded-xl text-xs font-bold">
              {[
                { id: 'karvonen', label: 'Karvonen (HRR)' },
                { id: 'tanaka', label: 'Tanaka' },
                { id: 'fox', label: 'Fox (220-Age)' }
              ].map(m => (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => setFormula(m.id as any)}
                  className={`py-1.5 px-1 rounded-lg text-[11px] text-center transition-all ${
                    formula === m.id ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600'
                  }`}
                >
                  {m.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Output */}
        <div className="lg:col-span-7 space-y-4">
          {calculations && (
            <div className="bg-gradient-to-br from-slate-900 via-rose-950 to-slate-900 text-white rounded-2xl p-6 shadow-md relative">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-rose-300">
                      Estimated Max Heart Rate
                    </span>
                    <div className="text-3xl sm:text-4xl font-black tracking-tight text-white mt-0.5 font-mono">
                      {calculations.baseMaxHr} <span className="text-base font-normal text-slate-300">BPM</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleCopy}
                      className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold flex items-center gap-1.5 transition-colors border border-white/10"
                    >
                      {copied ? <Check className="w-4 h-4 text-orange-400" /> : <Copy className="w-4 h-4" />}
                      <span>{copied ? 'Copied' : 'Copy'}</span>
                    </button>
                    {onSaveCalculation && (
                      <button
                        onClick={handleSave}
                        className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold flex items-center gap-1.5 transition-colors border border-white/10"
                      >
                        <Bookmark className="w-4 h-4" />
                        <span>{saved ? 'Saved' : 'Save'}</span>
                      </button>
                    )}
                  </div>
                </div>

                {/* Zones Breakdown Table */}
                <div className="space-y-1.5 pt-2 border-t border-rose-900/60">
                  {calculations.zones.map((z, idx) => (
                    <div key={idx} className="flex items-center justify-between p-2.5 rounded-xl bg-white/10 backdrop-blur-xs text-xs">
                      <div>
                        <div className="font-bold text-white flex items-center gap-1.5">
                          <span className={`w-2 h-2 rounded-full ${idx === 1 ? 'bg-orange-400' : idx === 3 ? 'bg-amber-400' : idx === 4 ? 'bg-rose-400' : 'bg-blue-400'}`} />
                          <span>{z.zone}</span>
                        </div>
                        <span className="text-[10px] text-slate-300">{z.desc}</span>
                      </div>
                      <div className="text-right">
                        <span className="font-bold font-mono text-orange-300 text-sm block">{z.rangeBpm}</span>
                        <span className="text-[10px] text-slate-300 font-mono">{z.pctRange}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
