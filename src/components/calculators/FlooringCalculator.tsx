import React, { useState, useMemo } from 'react';
import { Layers, RotateCcw, Copy, Check } from 'lucide-react';
import { copyToClipboard, formatCurrency, formatNumber } from '../../utils/formatters';
import { DecimalInput } from '../shared/DecimalInput';

interface FlooringCalculatorProps {
  currencySymbol?: string;
  onSave?: (summary: string, inputs: any, results: any) => void;
}

export const FlooringCalculator: React.FC<FlooringCalculatorProps> = ({
  currencySymbol = '$',
  onSave
}) => {
  const [unit, setUnit] = useState<'ft' | 'm'>('ft');
  const [length, setLength] = useState<number | ''>(15);
  const [width, setWidth] = useState<number | ''>(12);
  const [wastePercent, setWastePercent] = useState<number | ''>(10);
  const [coveragePerBox, setCoveragePerBox] = useState<number | ''>(20);
  const [pricePerBox, setPricePerBox] = useState<number | ''>(55);
  const [copied, setCopied] = useState(false);

  const areaUnitLabel = unit === 'ft' ? 'sq ft' : 'm²';

  const handleReset = () => {
    setUnit('ft');
    setLength(15);
    setWidth(12);
    setWastePercent(10);
    setCoveragePerBox(20);
    setPricePerBox(55);
  };

  const results = useMemo(() => {
    if (length === '' || width === '' || wastePercent === '' || coveragePerBox === '') return null;
    const l = typeof length === 'number' ? length : 0;
    const w = typeof width === 'number' ? width : 0;
    const waste = typeof wastePercent === 'number' ? Math.max(0, wastePercent) : 0;
    const boxCov = typeof coveragePerBox === 'number' ? coveragePerBox : 0;
    const price = typeof pricePerBox === 'number' ? Math.max(0, pricePerBox) : 0;

    if (l <= 0 || w <= 0 || boxCov <= 0) return null;

    const netArea = l * w;
    const wasteArea = netArea * (waste / 100);
    const totalAreaNeeded = netArea + wasteArea;
    const exactBoxes = totalAreaNeeded / boxCov;
    const boxesNeeded = Math.ceil(exactBoxes);
    const totalPurchasedArea = boxesNeeded * boxCov;
    const estimatedCost = boxesNeeded * price;
    const costPerUnitArea = netArea > 0 ? estimatedCost / netArea : 0;

    return {
      netArea,
      wasteArea,
      totalAreaNeeded,
      boxesNeeded,
      totalPurchasedArea,
      estimatedCost,
      costPerUnitArea
    };
  }, [length, width, wastePercent, coveragePerBox, pricePerBox]);

  const handleCopy = async () => {
    if (!results) return;
    const text = `Flooring Material Estimate:
• Room Size: ${length} × ${width} ${unit} (${formatNumber(results.netArea, 2)} ${areaUnitLabel})
• Total Area w/ ${wastePercent}% Waste: ${formatNumber(results.totalAreaNeeded, 2)} ${areaUnitLabel}
• Boxes Needed: ${results.boxesNeeded} boxes (${formatNumber(results.totalPurchasedArea, 2)} ${areaUnitLabel} purchased)
• Estimated Material Cost: ${formatCurrency(results.estimatedCost, currencySymbol)}`;
    const ok = await copyToClipboard(text);
    if (ok) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-slate-100">
        <div className="inline-flex rounded-xl bg-slate-100 p-1">
          <button
            type="button"
            onClick={() => {
              setUnit('ft');
              setLength(15);
              setWidth(12);
              setCoveragePerBox(20);
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              unit === 'ft' ? 'bg-white text-orange-600 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Feet & Sq Ft
          </button>
          <button
            type="button"
            onClick={() => {
              setUnit('m');
              setLength(5);
              setWidth(4);
              setCoveragePerBox(2);
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              unit === 'm' ? 'bg-white text-orange-600 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Meters & m²
          </button>
        </div>

        <button
          type="button"
          onClick={handleReset}
          className="text-xs font-semibold text-slate-500 hover:text-slate-800 flex items-center gap-1 cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" /> Reset
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-5 bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 space-y-4">
          <h4 className="text-xs font-bold uppercase text-slate-700 tracking-wider flex items-center gap-1.5">
            <Layers className="w-4 h-4 text-orange-500" />
            <span>Room & Flooring Box Specs</span>
          </h4>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Room Length ({unit})</label>
              <DecimalInput
                value={length}
                onValueChange={setLength}
                className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm font-bold text-slate-900 focus:outline-none focus:border-orange-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Room Width ({unit})</label>
              <DecimalInput
                value={width}
                onValueChange={setWidth}
                className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm font-bold text-slate-900 focus:outline-none focus:border-orange-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Waste Factor (%)</label>
              <DecimalInput
                value={wastePercent}
                onValueChange={setWastePercent}
                className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm font-bold text-slate-900 focus:outline-none focus:border-orange-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Coverage / Box ({areaUnitLabel})</label>
              <DecimalInput
                value={coveragePerBox}
                onValueChange={setCoveragePerBox}
                className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm font-bold text-slate-900 focus:outline-none focus:border-orange-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">
              Price Per Box ({currencySymbol}) <span className="text-slate-400 font-normal">Optional</span>
            </label>
            <DecimalInput
              value={pricePerBox}
              onValueChange={setPricePerBox}
              className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm font-bold text-slate-900 focus:outline-none focus:border-orange-500"
            />
          </div>
        </div>

        <div className="lg:col-span-7">
          {results ? (
            <div className="bg-gradient-to-br from-orange-50 to-amber-50 p-6 rounded-2xl border border-orange-200 space-y-5">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-orange-800 block">
                    Flooring Boxes / Cartons Needed
                  </span>
                  <div className="text-3xl sm:text-4xl font-black text-slate-900 font-mono-numbers mt-1">
                    {results.boxesNeeded} <span className="text-lg font-bold text-slate-600">boxes</span>
                  </div>
                  <p className="text-xs text-orange-800 mt-1">
                    Covers {formatNumber(results.totalPurchasedArea, 2)} {areaUnitLabel} total (includes {wastePercent}% cut waste)
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleCopy}
                    className="px-3 py-1.5 rounded-lg bg-white border border-orange-200 text-xs font-bold text-slate-700 hover:text-orange-600 flex items-center gap-1 cursor-pointer"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? 'Copied' : 'Copy'}</span>
                  </button>
                  {onSave && (
                    <button
                      type="button"
                      onClick={() =>
                        onSave(
                          `Flooring: ${results.boxesNeeded} boxes (${formatNumber(results.totalAreaNeeded, 1)} ${areaUnitLabel})`,
                          { unit, length, width, wastePercent, coveragePerBox, pricePerBox },
                          results
                        )
                      }
                      className="px-3 py-1.5 rounded-lg bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold cursor-pointer"
                    >
                      Save
                    </button>
                  )}
                </div>
              </div>

              <div className="bg-white rounded-xl border border-orange-100 p-4 space-y-2 text-xs sm:text-sm text-slate-700">
                <div className="flex justify-between">
                  <span>Net Floor Area:</span>
                  <span className="font-mono-numbers font-bold text-slate-900">{formatNumber(results.netArea, 2)} {areaUnitLabel}</span>
                </div>
                <div className="flex justify-between">
                  <span>Waste Allowance ({wastePercent}%):</span>
                  <span className="font-mono-numbers font-semibold">{formatNumber(results.wasteArea, 2)} {areaUnitLabel}</span>
                </div>
                <div className="flex justify-between">
                  <span>Total Required Area:</span>
                  <span className="font-mono-numbers font-bold text-orange-700">{formatNumber(results.totalAreaNeeded, 2)} {areaUnitLabel}</span>
                </div>
                {results.estimatedCost > 0 && (
                  <div className="flex justify-between pt-2 border-t border-slate-100 font-bold text-slate-900">
                    <span>Estimated Material Cost:</span>
                    <span className="font-mono-numbers">{formatCurrency(results.estimatedCost, currencySymbol)}</span>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8 text-center text-slate-500 text-sm">
              Enter positive room length, width, and box coverage to estimate flooring materials.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
