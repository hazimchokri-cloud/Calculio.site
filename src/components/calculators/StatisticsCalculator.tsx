import React, { useState, useMemo } from 'react';
import { BarChart2, Check, Copy } from 'lucide-react';
import { formatNumber, copyToClipboard } from '../../utils/formatters';

export const StatisticsCalculator: React.FC = () => {
  const [dataInput, setDataInput] = useState<string>('12, 18, 24, 30, 30, 42, 55, 68, 72, 90');
  const [copied, setCopied] = useState<boolean>(false);

  const stats = useMemo(() => {
    // Parse numbers separated by commas, spaces, or newlines
    const raw = dataInput
      .split(/[\s,;\n]+/)
      .map(s => s.trim())
      .filter(s => s.length > 0 && !isNaN(Number(s)))
      .map(Number);

    if (raw.length === 0) return null;

    const count = raw.length;
    const sorted = [...raw].sort((a, b) => a - b);
    const min = sorted[0];
    const max = sorted[sorted.length - 1];
    const range = max - min;
    const sum = sorted.reduce((acc, val) => acc + val, 0);
    const mean = sum / count;

    // Median
    let median = 0;
    const mid = Math.floor(count / 2);
    if (count % 2 === 0) {
      median = (sorted[mid - 1] + sorted[mid]) / 2;
    } else {
      median = sorted[mid];
    }

    // Mode
    const freqMap: Record<number, number> = {};
    let maxFreq = 0;
    sorted.forEach(n => {
      freqMap[n] = (freqMap[n] || 0) + 1;
      if (freqMap[n] > maxFreq) maxFreq = freqMap[n];
    });

    const modes: number[] = [];
    if (maxFreq > 1) {
      Object.keys(freqMap).forEach(k => {
        if (freqMap[Number(k)] === maxFreq) modes.push(Number(k));
      });
    }

    // Variance & Standard Deviation
    const sqDiffs = sorted.map(val => Math.pow(val - mean, 2));
    const sqSum = sqDiffs.reduce((acc, val) => acc + val, 0);

    const sampleVariance = count > 1 ? sqSum / (count - 1) : 0;
    const sampleStdDev = Math.sqrt(sampleVariance);

    const popVariance = sqSum / count;
    const popStdDev = Math.sqrt(popVariance);

    return {
      count,
      min,
      max,
      range,
      sum,
      mean: Number(mean.toFixed(4)),
      median: Number(median.toFixed(4)),
      modes: modes.length > 0 ? modes.join(', ') : 'None (all unique)',
      sampleVariance: Number(sampleVariance.toFixed(4)),
      sampleStdDev: Number(sampleStdDev.toFixed(4)),
      popVariance: Number(popVariance.toFixed(4)),
      popStdDev: Number(popStdDev.toFixed(4))
    };
  }, [dataInput]);

  const handleCopy = async () => {
    if (!stats) return;
    const text = `Statistics Summary:
• Count (N): ${stats.count}
• Mean (Average): ${stats.mean}
• Median: ${stats.median}
• Mode: ${stats.modes}
• Sample Std Deviation: ${stats.sampleStdDev} (Variance: ${stats.sampleVariance})
• Population Std Deviation: ${stats.popStdDev}
• Min: ${stats.min} | Max: ${stats.max} | Range: ${stats.range} | Sum: ${stats.sum}`;

    const ok = await copyToClipboard(text);
    if (ok) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleReset = () => {
    setDataInput('12, 18, 24, 30, 30, 42, 55, 68, 72, 90');
  };

  const handleClear = () => {
    setDataInput('');
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Input */}
        <div className="lg:col-span-6 bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="text-base font-bold text-slate-900">Dataset Values</h3>
            <div className="flex items-center gap-2">
              <button
                onClick={handleReset}
                className="text-xs font-semibold text-slate-600 hover:text-slate-900 px-2 py-1 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors"
              >
                Reset
              </button>
              <button
                onClick={handleClear}
                className="text-xs font-semibold text-slate-600 hover:text-slate-900 px-2 py-1 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors"
              >
                Clear
              </button>
              <span className="text-xs text-slate-700 font-mono-numbers">
                {stats ? `${stats.count} values` : '0 values'}
              </span>
            </div>
          </div>

          <p className="text-xs text-slate-700">Enter numbers separated by commas, spaces, or line breaks:</p>

          <textarea
            rows={5}
            value={dataInput}
            onChange={(e) => setDataInput(e.target.value)}
            className="w-full p-3 font-mono-numbers text-xs font-semibold border border-slate-200 rounded-xl bg-slate-50 focus:ring-2 focus:ring-blue-500"
            placeholder="e.g. 10, 20, 30, 40, 50"
          />

          <div className="flex gap-2">
            <button
              onClick={() => setDataInput('15, 22, 33, 40, 40, 52, 60, 75, 88')}
              className="text-xs text-blue-700 bg-blue-50 hover:bg-blue-100 font-semibold px-2.5 py-1 rounded-lg border border-blue-200"
            >
              Preset 1
            </button>
            <button
              onClick={() => setDataInput('100, 102, 105, 98, 97, 101, 104, 99')}
              className="text-xs text-blue-700 bg-blue-50 hover:bg-blue-100 font-semibold px-2.5 py-1 rounded-lg border border-blue-200"
            >
              Preset 2
            </button>
          </div>
        </div>

        {/* Results */}
        <div className="lg:col-span-6 space-y-5">
          {stats && (
            <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-blue-950 text-white rounded-2xl p-6 sm:p-7 shadow-lg relative overflow-hidden">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-blue-300">
                  Sample Mean (Average)
                </span>
                <span className="px-2 py-0.5 text-xs font-bold bg-blue-500/20 text-blue-300 rounded border border-blue-500/30">
                  N = {stats.count}
                </span>
              </div>

              <div className="flex items-baseline gap-2 mb-6">
                <span className="text-5xl font-black font-mono-numbers tracking-tight text-white">
                  {formatNumber(stats.mean, 2)}
                </span>
              </div>

              <div className="border-t border-slate-700/80 pt-4 grid grid-cols-2 gap-3 text-xs">
                <div>
                  <span className="text-slate-400 block">Median:</span>
                  <strong className="text-white font-mono-numbers text-sm">{stats.median}</strong>
                </div>
                <div>
                  <span className="text-slate-400 block">Mode:</span>
                  <strong className="text-white font-mono-numbers text-sm">{stats.modes}</strong>
                </div>
                <div>
                  <span className="text-slate-400 block">Sample Std Dev (s):</span>
                  <strong className="text-orange-300 font-mono-numbers text-sm">{stats.sampleStdDev}</strong>
                </div>
                <div>
                  <span className="text-slate-400 block">Sample Variance (s²):</span>
                  <strong className="text-white font-mono-numbers text-sm">{stats.sampleVariance}</strong>
                </div>
                <div>
                  <span className="text-slate-400 block">Range (Max - Min):</span>
                  <strong className="text-white font-mono-numbers text-sm">{stats.range} ({stats.min} to {stats.max})</strong>
                </div>
                <div>
                  <span className="text-slate-400 block">Sum (Σx):</span>
                  <strong className="text-white font-mono-numbers text-sm">{formatNumber(stats.sum)}</strong>
                </div>
              </div>
            </div>
          )}

          <button
            onClick={handleCopy}
            className="w-full flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold transition-all shadow-2xs"
          >
            {copied ? <Check className="w-4 h-4 text-orange-600" /> : <Copy className="w-4 h-4 text-slate-700" />}
            {copied ? 'Copied' : 'Copy Statistical Report'}
          </button>
        </div>
      </div>
    </div>
  );
};
