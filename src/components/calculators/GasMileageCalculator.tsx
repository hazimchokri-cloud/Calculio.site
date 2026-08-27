import React, { useState, useMemo } from 'react';
import { Fuel, DollarSign, Users, Check, Copy, RefreshCw, Bookmark, Sparkles, Navigation, Gauge } from 'lucide-react';
import { formatCurrency, formatNumber, copyToClipboard } from '../../utils/formatters';

interface GasMileageProps {
  currencySymbol?: string;
  onSaveCalculation?: (summary: string, inputs: any, results: any) => void;
}

export const GasMileageCalculator: React.FC<GasMileageProps> = ({ 
  currencySymbol = '$',
  onSaveCalculation 
}) => {
  const [distanceMiles, setDistanceMiles] = useState<number | ''>(350);
  const [fuelEfficiencyMpg, setFuelEfficiencyMpg] = useState<number | ''>(28);
  const [gasPricePerGallon, setGasPricePerGallon] = useState<number | ''>(3.65);
  const [passengersCount, setPassengersCount] = useState<number | ''>(3);
  const [roundTrip, setRoundTrip] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const [saved, setSaved] = useState<boolean>(false);
  const [pulse, setPulse] = useState<boolean>(false);

  const numDistanceMiles = typeof distanceMiles === 'number' ? distanceMiles : 0;
  const numFuelEfficiencyMpg = typeof fuelEfficiencyMpg === 'number' ? fuelEfficiencyMpg : 0;
  const numGasPricePerGallon = typeof gasPricePerGallon === 'number' ? gasPricePerGallon : 0;
  const numPassengersCount = typeof passengersCount === 'number' ? passengersCount : 1;

  const isInputEmpty = distanceMiles === '' || fuelEfficiencyMpg === '' || gasPricePerGallon === '';

  const stats = useMemo(() => {
    if (isInputEmpty || numFuelEfficiencyMpg <= 0 || numDistanceMiles <= 0) return null;

    const effectiveDistance = roundTrip ? numDistanceMiles * 2 : numDistanceMiles;
    const gallonsUsed = numFuelEfficiencyMpg > 0 ? effectiveDistance / numFuelEfficiencyMpg : 0;
    const totalCost = gallonsUsed * numGasPricePerGallon;
    const costPerMile = effectiveDistance > 0 ? totalCost / effectiveDistance : 0;
    const costPerPerson = numPassengersCount > 0 ? totalCost / numPassengersCount : totalCost;

    // Metric equivalent
    const distanceKm = effectiveDistance * 1.60934;
    const litersUsed = gallonsUsed * 3.78541;
    const lPer100km = distanceKm > 0 ? (litersUsed / distanceKm) * 100 : 0;

    return {
      effectiveDistance,
      gallonsUsed: Number(gallonsUsed.toFixed(2)),
      litersUsed: Number(litersUsed.toFixed(2)),
      totalCost,
      costPerMile,
      costPerPerson,
      distanceKm: Number(distanceKm.toFixed(1)),
      lPer100km: Number(lPer100km.toFixed(1))
    };
  }, [isInputEmpty, numDistanceMiles, numFuelEfficiencyMpg, numGasPricePerGallon, numPassengersCount, roundTrip]);

  const handleCalculate = () => {
    setPulse(true);
    setTimeout(() => setPulse(false), 400);
  };

  const handleReset = () => {
    setDistanceMiles(350);
    setFuelEfficiencyMpg(28);
    setGasPricePerGallon(3.65);
    setPassengersCount(3);
    setRoundTrip(false);
  };

  const handleCopy = async () => {
    if (!stats) return;
    const text = `Road Trip Gas Calculation:
• Total Distance: ${stats.effectiveDistance} miles (${roundTrip ? 'Round Trip' : 'One Way'})
• Vehicle Efficiency: ${numFuelEfficiencyMpg} MPG (${stats.lPer100km} L/100km)
• Estimated Fuel Needed: ${stats.gallonsUsed} Gallons (${stats.litersUsed} L)
• Total Fuel Cost: ${formatCurrency(stats.totalCost, currencySymbol)}
• Split Per Person (${numPassengersCount} people): ${formatCurrency(stats.costPerPerson, currencySymbol)}`;

    const ok = await copyToClipboard(text);
    if (ok) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleSave = () => {
    if (onSaveCalculation && stats) {
      onSaveCalculation(
        `Gas Trip: ${stats.effectiveDistance} mi → ${formatCurrency(stats.totalCost, currencySymbol)} (${formatCurrency(stats.costPerPerson, currencySymbol)}/person)`,
        { distanceMiles, fuelEfficiencyMpg, gasPricePerGallon, passengersCount, roundTrip },
        stats
      );
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Inputs */}
        <div className="lg:col-span-7 bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-2xs space-y-5">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Fuel className="w-4 h-4 text-orange-600" />
              <span>Trip & Vehicle Parameters</span>
            </h3>
            <button
              type="button"
              onClick={handleReset}
              className="text-xs font-semibold text-slate-500 hover:text-slate-800 flex items-center gap-1 transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 block">Trip Distance (Miles)</label>
              <div className="relative">
                <input
                  type="number"
                  min="1"
                  value={distanceMiles}
                  onChange={(e) => setDistanceMiles(e.target.value === '' ? '' : Number(e.target.value))}
                  className="w-full px-3 py-2 font-mono font-semibold text-sm border border-slate-200 rounded-xl bg-slate-50/50 focus:bg-white focus:outline-none"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">mi</span>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 block">Fuel Economy (MPG)</label>
              <div className="relative">
                <input
                  type="number"
                  min="1"
                  value={fuelEfficiencyMpg}
                  onChange={(e) => setFuelEfficiencyMpg(e.target.value === '' ? '' : Number(e.target.value))}
                  className="w-full px-3 py-2 font-mono font-semibold text-sm border border-slate-200 rounded-xl bg-slate-50/50 focus:bg-white focus:outline-none"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">MPG</span>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 block">Gas Price per Gallon</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-xs font-bold">{currencySymbol}</span>
                <input
                  type="number"
                  step="0.05"
                  min="0.1"
                  value={gasPricePerGallon}
                  onChange={(e) => setGasPricePerGallon(e.target.value === '' ? '' : Number(e.target.value))}
                  className="w-full pl-7 pr-3 py-2 font-mono font-semibold text-sm border border-slate-200 rounded-xl bg-slate-50/50 focus:bg-white focus:outline-none"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 block">Number of Passengers (Split)</label>
              <div className="relative">
                <input
                  type="number"
                  min="1"
                  max="50"
                  value={passengersCount}
                  onChange={(e) => setPassengersCount(e.target.value === '' ? '' : Number(e.target.value))}
                  className="w-full px-3 py-2 font-mono font-semibold text-sm border border-slate-200 rounded-xl bg-slate-50/50 focus:bg-white focus:outline-none"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">people</span>
              </div>
            </div>
          </div>

          {/* Round trip toggle */}
          <div className="pt-2">
            <label className="flex items-center gap-2.5 cursor-pointer">
              <input
                type="checkbox"
                checked={roundTrip}
                onChange={(e) => setRoundTrip(e.target.checked)}
                className="w-4 h-4 text-orange-600 rounded"
              />
              <span className="text-xs font-semibold text-slate-700">Calculate as Round Trip (Double the miles)</span>
            </label>
          </div>

          {/* Action Buttons: Calculate & Reset */}
          <div className="flex gap-3 pt-2 border-t border-slate-100">
            <button
              type="button"
              onClick={handleCalculate}
              className="flex-1 py-3 px-4 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-xs transition-all active:scale-95"
            >
              <Sparkles className="w-4 h-4" />
              <span>Calculate Gas Cost</span>
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="py-3 px-4 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 font-bold text-sm flex items-center justify-center gap-2 transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Reset</span>
            </button>
          </div>
        </div>

        {/* Results */}
        <div className="lg:col-span-5 space-y-4">
          <div className={`bg-gradient-to-br from-slate-900 via-slate-800 to-orange-950 text-white rounded-2xl p-6 sm:p-7 shadow-lg relative overflow-hidden transition-transform ${pulse ? 'scale-[1.01]' : ''}`}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-orange-300">
                Total Trip Fuel Cost
              </span>
              <span className="px-2.5 py-1 text-xs font-bold bg-orange-500/20 text-orange-300 rounded-lg border border-orange-500/30">
                {stats.effectiveDistance} Miles
              </span>
            </div>

            <div className="flex items-baseline gap-2 mb-6">
              <span className="text-5xl font-black font-mono tracking-tight text-white">
                {formatCurrency(stats.totalCost, currencySymbol)}
              </span>
            </div>

            <div className="border-t border-slate-700/80 pt-4 space-y-2.5 text-xs">
              <div className="flex justify-between text-slate-300 items-center bg-white/10 p-2.5 rounded-xl">
                <span>Cost Per Person ({passengersCount} people):</span>
                <strong className="text-orange-300 font-mono text-base">{formatCurrency(stats.costPerPerson, currencySymbol)}</strong>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Fuel Required:</span>
                <strong className="text-white font-mono">{stats.gallonsUsed} Gallons ({stats.litersUsed} L)</strong>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Cost per Mile:</span>
                <strong className="text-white font-mono">{formatCurrency(stats.costPerMile, currencySymbol, 3)} / mi</strong>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Metric Equivalent:</span>
                <strong className="text-slate-300 font-mono">{stats.distanceKm} km ({stats.lPer100km} L/100km)</strong>
              </div>
            </div>

            {/* Action Bar */}
            <div className="flex items-center gap-2 pt-4 border-t border-slate-700">
              <button
                onClick={handleCopy}
                className="flex-1 py-2 px-3 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-bold text-white flex items-center justify-center gap-1.5 transition-colors border border-white/10"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-orange-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied' : 'Copy Trip Summary'}</span>
              </button>
              {onSaveCalculation && (
                <button
                  onClick={handleSave}
                  className="py-2 px-3 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-bold text-white flex items-center justify-center gap-1.5 transition-colors border border-white/10"
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
  );
};
