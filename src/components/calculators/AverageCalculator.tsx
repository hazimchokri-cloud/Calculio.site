import React, { useState, useMemo } from 'react';
import { copyToClipboard, formatNumber } from '../../utils/formatters';
import { BarChart3, Plus, Trash2, Copy, Check, Bookmark, Layers } from 'lucide-react';

interface AverageCalculatorProps {
  onSaveCalculation?: (summary: string, inputs: any, results: any) => void;
}

interface WeightedItem {
  id: string;
  value: number;
  weight: number;
}

export const AverageCalculator: React.FC<AverageCalculatorProps> = ({ onSaveCalculation }) => {
  const [tab, setTab] = useState<'standard' | 'weighted'>('standard');

  // Standard Dataset
  const [dataInput, setDataInput] = useState<string>('12, 18, 25, 30, 42, 50, 65, 80');

  // Weighted Dataset
  const [weightedItems, setWeightedItems] = useState<WeightedItem[]>([
    { id: '1', value: 85, weight: 20 },
    { id: '2', value: 92, weight: 30 },
    { id: '3', value: 78, weight: 50 }
  ]);

  const [copied, setCopied] = useState<boolean>(false);
  const [saved, setSaved] = useState<boolean>(false);

  // Standard calculations
  const standardStats = useMemo(() => {
    const rawNumbers = dataInput
      .split(/[\s,;\n]+/)
      .map(v => parseFloat(v))
      .filter(v => !isNaN(v));

    if (rawNumbers.length === 0) return null;

    const count = rawNumbers.length;
    const sum = rawNumbers.reduce((acc, v) => acc + v, 0);
    const mean = sum / count;

    // Median
    const sorted = [...rawNumbers].sort((a, b) => a - b);
    const mid = Math.floor(sorted.length / 2);
    const median = sorted.length % 2 === 0 ? (sorted[mid - 1] + sorted[mid]) / 2 : sorted[mid];

    // Mode
    const freq: Record<number, number> = {};
    let maxFreq = 0;
    rawNumbers.forEach(n => {
      freq[n] = (freq[n] || 0) + 1;
      if (freq[n] > maxFreq) maxFreq = freq[n];
    });
    const modes: number[] = [];
    if (maxFreq > 1) {
      Object.keys(freq).forEach(k => {
        if (freq[Number(k)] === maxFreq) modes.push(Number(k));
      });
    }

    // Min, Max, Range
    const min = sorted[0];
    const max = sorted[sorted.length - 1];
    const range = max - min;

    // Geometric Mean (for positive values)
    const allPositive = rawNumbers.every(n => n > 0);
    let geometricMean: number | null = null;
    if (allPositive) {
      const logSum = rawNumbers.reduce((acc, v) => acc + Math.log(v), 0);
      geometricMean = Math.exp(logSum / count);
    }

    // Harmonic Mean (for non-zero positive values)
    let harmonicMean: number | null = null;
    if (allPositive) {
      const recipSum = rawNumbers.reduce((acc, v) => acc + 1 / v, 0);
      harmonicMean = count / recipSum;
    }

    return {
      count,
      sum,
      mean,
      median,
      mode: modes.length > 0 ? modes.join(', ') : 'No unique mode',
      min,
      max,
      range,
      geometricMean,
      harmonicMean
    };
  }, [dataInput]);

  // Weighted calculations
  const weightedStats = useMemo(() => {
    let totalWeight = 0;
    let weightedSum = 0;

    weightedItems.forEach(item => {
      if (!isNaN(item.value) && !isNaN(item.weight)) {
        weightedSum += item.value * item.weight;
        totalWeight += item.weight;
      }
    });

    if (totalWeight === 0) return null;

    const weightedAverage = weightedSum / totalWeight;

    return {
      weightedAverage,
      totalWeight,
      weightedSum
    };
  }, [weightedItems]);

  const addWeightedItem = () => {
    setWeightedItems(prev => [
      ...prev,
      { id: Date.now().toString(), value: 80, weight: 10 }
    ]);
  };

  const removeWeightedItem = (id: string) => {
    if (weightedItems.length <= 1) return;
    setWeightedItems(prev => prev.filter(item => item.id !== id));
  };

  const updateWeightedItem = (id: string, field: 'value' | 'weight', val: number) => {
    setWeightedItems(prev =>
      prev.map(item => (item.id === id ? { ...item, [field]: val } : item))
    );
  };

  const handleCopy = async () => {
    let text = '';
    if (tab === 'standard' && standardStats) {
      text = `Average / Mean: ${formatNumber(standardStats.mean, 4)}
Median: ${formatNumber(standardStats.median, 4)}
Mode: ${standardStats.mode}
Range: ${formatNumber(standardStats.range, 4)} (Min: ${standardStats.min}, Max: ${standardStats.max})
Count: ${standardStats.count}, Sum: ${formatNumber(standardStats.sum, 4)}`;
    } else if (tab === 'weighted' && weightedStats) {
      text = `Weighted Average: ${formatNumber(weightedStats.weightedAverage, 4)} (Total Weight: ${weightedStats.totalWeight})`;
    }

    const ok = await copyToClipboard(text);
    if (ok) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleSave = () => {
    if (!onSaveCalculation) return;
    if (tab === 'standard' && standardStats) {
      onSaveCalculation(
        `Mean: ${formatNumber(standardStats.mean, 2)} | Median: ${formatNumber(standardStats.median, 2)}`,
        { dataInput },
        standardStats
      );
    } else if (tab === 'weighted' && weightedStats) {
      onSaveCalculation(
        `Weighted Average: ${formatNumber(weightedStats.weightedAverage, 2)}`,
        { weightedItems },
        weightedStats
      );
    }
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleReset = () => {
    setDataInput('12, 18, 25, 30, 42, 50, 65, 80');
    setWeightedItems([
      { id: '1', value: 85, weight: 20 },
      { id: '2', value: 92, weight: 30 },
      { id: '3', value: 78, weight: 50 }
    ]);
  };

  return (
    <div className="space-y-6">
      {/* Navigation Tabs */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex gap-2 p-1.5 bg-slate-200/60 rounded-2xl max-w-md">
          <button
            onClick={() => setTab('standard')}
            className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all ${
              tab === 'standard' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Arithmetic & Geometric Mean
          </button>
          <button
            onClick={() => setTab('weighted')}
            className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all ${
              tab === 'weighted' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Weighted Average
          </button>
        </div>
        <button
          onClick={handleReset}
          className="text-xs font-semibold text-slate-600 hover:text-slate-900 px-3 py-1.5 rounded-xl border border-slate-200 hover:bg-slate-50 transition-colors"
        >
          Reset
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Inputs */}
        <div className="lg:col-span-6 bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-2xs space-y-4">
          {tab === 'standard' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <BarChart3 className="w-4 h-4 text-orange-600" />
                  <span>Enter Data Numbers</span>
                </h2>
              </div>
              <p className="text-xs text-slate-500">
                Separate values by commas, spaces, semicolons, or line breaks.
              </p>
              <textarea
                rows={4}
                value={dataInput}
                onChange={(e) => setDataInput(e.target.value)}
                placeholder="e.g. 10, 15, 20, 25, 30"
                className="w-full p-3 text-sm font-mono border border-slate-200 rounded-xl bg-slate-50/50 focus:bg-white focus:ring-2 focus:ring-orange-500 focus:outline-none"
              />
              <div className="flex flex-wrap gap-2 pt-1">
                {['5, 10, 15, 20, 25', '85, 90, 95, 70, 88', '100, 150, 200, 300, 500'].map(sample => (
                  <button
                    key={sample}
                    type="button"
                    onClick={() => setDataInput(sample)}
                    className="py-1 px-2 text-xs font-bold bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors"
                  >
                    {sample}
                  </button>
                ))}
              </div>
            </div>
          )}

          {tab === 'weighted' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <Layers className="w-4 h-4 text-orange-600" />
                  <span>Weighted Grade / Asset Values</span>
                </h2>
                <button
                  type="button"
                  onClick={addWeightedItem}
                  className="px-2.5 py-1 text-xs font-bold bg-orange-50 text-orange-700 border border-orange-200 rounded-lg hover:bg-orange-100 flex items-center gap-1"
                >
                  <Plus className="w-3 h-3" />
                  <span>Add Row</span>
                </button>
              </div>

              <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
                <div className="grid grid-cols-12 gap-2 text-[11px] font-bold text-slate-500 px-1">
                  <span className="col-span-6">Value / Score</span>
                  <span className="col-span-5">Weight (Points or %)</span>
                  <span className="col-span-1"></span>
                </div>
                {weightedItems.map((item) => (
                  <div key={item.id} className="grid grid-cols-12 gap-2 items-center">
                    <div className="col-span-6">
                      <input
                        type="number"
                        value={item.value || ''}
                        onChange={(e) => updateWeightedItem(item.id, 'value', parseFloat(e.target.value) || 0)}
                        className="w-full p-2 text-sm font-semibold border border-slate-200 rounded-lg bg-slate-50 focus:bg-white focus:outline-none"
                      />
                    </div>
                    <div className="col-span-5">
                      <input
                        type="number"
                        value={item.weight || ''}
                        onChange={(e) => updateWeightedItem(item.id, 'weight', parseFloat(e.target.value) || 0)}
                        className="w-full p-2 text-sm font-semibold border border-slate-200 rounded-lg bg-slate-50 focus:bg-white focus:outline-none"
                      />
                    </div>
                    <div className="col-span-1 flex justify-center">
                      <button
                        type="button"
                        onClick={() => removeWeightedItem(item.id)}
                        disabled={weightedItems.length <= 1}
                        className="p-1.5 text-slate-400 hover:text-rose-600 disabled:opacity-30"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Output */}
        <div className="lg:col-span-6 space-y-4">
          <div className="bg-gradient-to-br from-slate-900 via-orange-950 to-slate-900 text-white rounded-2xl p-6 shadow-md relative">
            {tab === 'standard' && standardStats && (
              <div className="space-y-4">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-orange-300">
                    Arithmetic Mean (Average)
                  </span>
                  <div className="text-4xl font-black tracking-tight text-white mt-1 font-mono">
                    {formatNumber(standardStats.mean, 4)}
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-3 border-t border-orange-900/60 text-xs">
                  <div className="bg-white/10 rounded-xl p-2.5">
                    <span className="text-[10px] text-slate-300 block">Median</span>
                    <span className="font-bold font-mono text-white text-sm">{formatNumber(standardStats.median, 2)}</span>
                  </div>
                  <div className="bg-white/10 rounded-xl p-2.5">
                    <span className="text-[10px] text-slate-300 block">Count (N)</span>
                    <span className="font-bold font-mono text-white text-sm">{standardStats.count}</span>
                  </div>
                  <div className="bg-white/10 rounded-xl p-2.5">
                    <span className="text-[10px] text-slate-300 block">Sum</span>
                    <span className="font-bold font-mono text-white text-sm">{formatNumber(standardStats.sum, 2)}</span>
                  </div>
                  <div className="bg-white/10 rounded-xl p-2.5">
                    <span className="text-[10px] text-slate-300 block">Min / Max</span>
                    <span className="font-bold font-mono text-white text-sm">{standardStats.min} / {standardStats.max}</span>
                  </div>
                  <div className="bg-white/10 rounded-xl p-2.5">
                    <span className="text-[10px] text-slate-300 block">Range</span>
                    <span className="font-bold font-mono text-white text-sm">{formatNumber(standardStats.range, 2)}</span>
                  </div>
                  <div className="bg-white/10 rounded-xl p-2.5">
                    <span className="text-[10px] text-slate-300 block">Mode</span>
                    <span className="font-bold font-mono text-white text-sm truncate">{standardStats.mode}</span>
                  </div>
                </div>

                {standardStats.geometricMean !== null && (
                  <div className="grid grid-cols-2 gap-2 pt-2 border-t border-orange-900/60 text-xs">
                    <div className="bg-white/10 rounded-xl p-2.5">
                      <span className="text-[10px] text-slate-300 block">Geometric Mean</span>
                      <span className="font-bold font-mono text-orange-300">{formatNumber(standardStats.geometricMean, 4)}</span>
                    </div>
                    <div className="bg-white/10 rounded-xl p-2.5">
                      <span className="text-[10px] text-slate-300 block">Harmonic Mean</span>
                      <span className="font-bold font-mono text-orange-300">{formatNumber(standardStats.harmonicMean || 0, 4)}</span>
                    </div>
                  </div>
                )}
              </div>
            )}

            {tab === 'weighted' && weightedStats && (
              <div className="space-y-4">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-orange-300">
                    Weighted Average
                  </span>
                  <div className="text-4xl font-black tracking-tight text-white mt-1 font-mono">
                    {formatNumber(weightedStats.weightedAverage, 4)}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-3 border-t border-orange-900/60 text-xs">
                  <div className="bg-white/10 rounded-xl p-3 backdrop-blur-xs">
                    <span className="text-[10px] text-slate-300 uppercase font-bold block">Total Weight</span>
                    <span className="text-lg font-bold text-white font-mono">{weightedStats.totalWeight}</span>
                  </div>
                  <div className="bg-white/10 rounded-xl p-3 backdrop-blur-xs">
                    <span className="text-[10px] text-slate-300 uppercase font-bold block">Weighted Sum</span>
                    <span className="text-lg font-bold text-orange-300 font-mono">{formatNumber(weightedStats.weightedSum, 2)}</span>
                  </div>
                </div>
              </div>
            )}

            <div className="flex items-center gap-2 pt-4 border-t border-orange-900/60">
              <button
                onClick={handleCopy}
                className="flex-1 py-2 px-3 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-bold text-white flex items-center justify-center gap-1.5 transition-colors border border-white/10"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-orange-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied' : 'Copy Stats'}</span>
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
