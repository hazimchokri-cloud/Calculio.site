import React, { useState, useMemo } from 'react';
import { HardHat, Ruler, Package, DollarSign, RotateCcw, Copy, Check, Info, Sparkles } from 'lucide-react';
import { copyToClipboard } from '../../utils/formatters';

interface ConcreteCalculatorProps {
  currencySymbol?: string;
  onSave?: (summary: string, inputs: any, results: any) => void;
}

export const ConcreteCalculator: React.FC<ConcreteCalculatorProps> = ({
  currencySymbol = '$',
  onSave
}) => {
  const [shape, setShape] = useState<'slab' | 'footing' | 'column'>('slab');
  const [unit, setUnit] = useState<'imperial' | 'metric'>('imperial');
  
  // Slab dimensions
  const [length, setLength] = useState<number | ''>(20); // feet or meters
  const [width, setWidth] = useState<number | ''>(10);   // feet or meters
  const [depth, setDepth] = useState<number | ''>(4);    // inches or centimeters
  
  // Column dimensions
  const [diameter, setDiameter] = useState<number | ''>(12); // inches or cm
  const [height, setHeight] = useState<number | ''>(8);      // feet or meters
  const [quantity, setQuantity] = useState<number | ''>(1);
  
  // Waste factor & cost
  const [wasteMargin, setWasteMargin] = useState<number | ''>(10); // 10%
  const [pricePerUnit, setPricePerUnit] = useState<number | ''>(140); // per cu yard or cu meter

  const [copied, setCopied] = useState(false);

  const numLength = typeof length === 'number' ? length : 0;
  const numWidth = typeof width === 'number' ? width : 0;
  const numDepth = typeof depth === 'number' ? depth : 0;
  const numDiameter = typeof diameter === 'number' ? diameter : 0;
  const numHeight = typeof height === 'number' ? height : 0;
  const numQuantity = typeof quantity === 'number' ? quantity : 1;
  const numWasteMargin = typeof wasteMargin === 'number' ? wasteMargin : 0;
  const numPricePerUnit = typeof pricePerUnit === 'number' ? pricePerUnit : 0;

  const isInputEmpty = shape === 'column'
    ? diameter === '' || height === ''
    : length === '' || width === '' || depth === '';

  const results = useMemo(() => {
    if (isInputEmpty) return null;

    let volumeCubicYards = 0;
    let volumeCubicMeters = 0;

    if (unit === 'imperial') {
      if (shape === 'slab' || shape === 'footing') {
        const depthFeet = numDepth / 12;
        const cubicFeet = numLength * numWidth * depthFeet * numQuantity;
        volumeCubicYards = cubicFeet / 27;
        volumeCubicMeters = volumeCubicYards * 0.764555;
      } else {
        // Cylindrical Column
        const radiusFeet = (numDiameter / 2) / 12;
        const cubicFeet = Math.PI * Math.pow(radiusFeet, 2) * numHeight * numQuantity;
        volumeCubicYards = cubicFeet / 27;
        volumeCubicMeters = volumeCubicYards * 0.764555;
      }
    } else {
      // Metric
      if (shape === 'slab' || shape === 'footing') {
        const depthMeters = numDepth / 100;
        volumeCubicMeters = numLength * numWidth * depthMeters * numQuantity;
        volumeCubicYards = volumeCubicMeters * 1.30795;
      } else {
        const radiusMeters = (numDiameter / 2) / 100;
        volumeCubicMeters = Math.PI * Math.pow(radiusMeters, 2) * numHeight * numQuantity;
        volumeCubicYards = volumeCubicMeters * 1.30795;
      }
    }

    const wasteMultiplier = 1 + (numWasteMargin / 100);
    const totalVolumeYards = volumeCubicYards * wasteMultiplier;
    const totalVolumeMeters = volumeCubicMeters * wasteMultiplier;

    // Premix bags: 1 cu yard ≈ 60 of 60lb bags or 45 of 80lb bags
    const bags60lb = Math.ceil(totalVolumeYards * 60);
    const bags80lb = Math.ceil(totalVolumeYards * 45);

    const estimatedTotalCost = (unit === 'imperial' ? totalVolumeYards : totalVolumeMeters) * numPricePerUnit;

    return {
      volumeCubicYards: Math.round(totalVolumeYards * 100) / 100,
      volumeCubicMeters: Math.round(totalVolumeMeters * 100) / 100,
      rawYards: Math.round(volumeCubicYards * 100) / 100,
      bags60lb,
      bags80lb,
      estimatedTotalCost: Math.round(estimatedTotalCost * 100) / 100
    };
  }, [isInputEmpty, shape, unit, numLength, numWidth, numDepth, numDiameter, numHeight, numQuantity, numWasteMargin, numPricePerUnit]);

  const handleCopy = () => {
    if (!results) return;
    const text = `Concrete Calculation:
Volume: ${results.volumeCubicYards} cu yds (${results.volumeCubicMeters} m³)
Pre-mix Bags: ${results.bags80lb} (80 lb) or ${results.bags60lb} (60 lb)
Est. Cost: ${currencySymbol}${results.estimatedTotalCost.toLocaleString()}`;
    copyToClipboard(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReset = () => {
    setShape('slab');
    setUnit('imperial');
    setLength(20);
    setWidth(10);
    setDepth(4);
    setDiameter(12);
    setHeight(8);
    setQuantity(1);
    setWasteMargin(10);
    setPricePerUnit(140);
  };

  return (
    <div className="space-y-6">
      {/* Form Controls */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
              <HardHat className="w-4 h-4 text-orange-600" />
              <span>Project Structure</span>
            </h4>
            <div className="flex items-center gap-1 bg-slate-100 p-0.5 rounded-lg text-xs font-bold">
              <button
                type="button"
                onClick={() => setUnit('imperial')}
                className={`px-2.5 py-1 rounded-md transition-all ${unit === 'imperial' ? 'bg-white shadow-xs text-slate-900' : 'text-slate-600'}`}
              >
                Feet / Inches
              </button>
              <button
                type="button"
                onClick={() => setUnit('metric')}
                className={`px-2.5 py-1 rounded-md transition-all ${unit === 'metric' ? 'bg-white shadow-xs text-slate-900' : 'text-slate-600'}`}
              >
                Meters / CM
              </button>
            </div>
          </div>

          {/* Shape Selector */}
          <div className="grid grid-cols-3 gap-2">
            <button
              type="button"
              onClick={() => setShape('slab')}
              className={`p-2.5 rounded-xl border text-xs font-bold text-center transition-all ${shape === 'slab' ? 'border-orange-500 bg-orange-50 text-orange-900 shadow-2xs' : 'border-slate-200 hover:bg-slate-50 text-slate-700'}`}
            >
              Slab / Patio
            </button>
            <button
              type="button"
              onClick={() => setShape('footing')}
              className={`p-2.5 rounded-xl border text-xs font-bold text-center transition-all ${shape === 'footing' ? 'border-orange-500 bg-orange-50 text-orange-900 shadow-2xs' : 'border-slate-200 hover:bg-slate-50 text-slate-700'}`}
            >
              Footing / Wall
            </button>
            <button
              type="button"
              onClick={() => setShape('column')}
              className={`p-2.5 rounded-xl border text-xs font-bold text-center transition-all ${shape === 'column' ? 'border-orange-500 bg-orange-50 text-orange-900 shadow-2xs' : 'border-slate-200 hover:bg-slate-50 text-slate-700'}`}
            >
              Round Column
            </button>
          </div>

          {/* Dimensions Inputs */}
          {shape !== 'column' ? (
            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Length ({unit === 'imperial' ? 'ft' : 'm'})
                </label>
                <input
                  type="number"
                  min="0.1"
                  step="0.5"
                  value={length}
                  onChange={(e) => setLength(e.target.value === '' ? '' : Math.max(0, Number(e.target.value)))}
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs font-bold focus:ring-2 focus:ring-orange-500"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Width ({unit === 'imperial' ? 'ft' : 'm'})
                </label>
                <input
                  type="number"
                  min="0.1"
                  step="0.5"
                  value={width}
                  onChange={(e) => setWidth(e.target.value === '' ? '' : Math.max(0, Number(e.target.value)))}
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs font-bold focus:ring-2 focus:ring-orange-500"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Thickness ({unit === 'imperial' ? 'in' : 'cm'})
                </label>
                <input
                  type="number"
                  min="1"
                  step="0.5"
                  value={depth}
                  onChange={(e) => setDepth(e.target.value === '' ? '' : Math.max(0, Number(e.target.value)))}
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs font-bold focus:ring-2 focus:ring-orange-500"
                />
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Diameter ({unit === 'imperial' ? 'in' : 'cm'})
                </label>
                <input
                  type="number"
                  min="1"
                  value={diameter}
                  onChange={(e) => setDiameter(e.target.value === '' ? '' : Math.max(0, Number(e.target.value)))}
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs font-bold focus:ring-2 focus:ring-orange-500"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Height ({unit === 'imperial' ? 'ft' : 'm'})
                </label>
                <input
                  type="number"
                  min="0.1"
                  value={height}
                  onChange={(e) => setHeight(e.target.value === '' ? '' : Math.max(0, Number(e.target.value)))}
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs font-bold focus:ring-2 focus:ring-orange-500"
                />
              </div>
            </div>
          )}

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Quantity</label>
              <input
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value === '' ? '' : Math.max(0, Number(e.target.value)))}
                className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs font-bold"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Waste Factor (%)</label>
              <input
                type="number"
                min="0"
                max="50"
                value={wasteMargin}
                onChange={(e) => setWasteMargin(e.target.value === '' ? '' : Math.max(0, Number(e.target.value)))}
                className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs font-bold"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Price / {unit === 'imperial' ? 'yd³' : 'm³'}</label>
              <input
                type="number"
                min="0"
                value={pricePerUnit}
                onChange={(e) => setPricePerUnit(e.target.value === '' ? '' : Math.max(0, Number(e.target.value)))}
                className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs font-bold"
              />
            </div>
          </div>
        </div>

        {/* Results Dashboard */}
        {results ? (
          <div className="bg-gradient-to-br from-orange-50/70 to-orange-100/50 p-5 rounded-2xl border border-orange-200/80 flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-orange-200/70">
                <span className="text-xs font-bold uppercase tracking-wider text-orange-900">Total Concrete Needed</span>
                <span className="text-[10px] font-bold bg-orange-200/80 text-orange-900 px-2 py-0.5 rounded-full">
                  Includes +{wasteMargin}% Waste
                </span>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3">
                <div className="bg-white p-3 rounded-xl border border-orange-200 shadow-2xs">
                  <span className="text-[10px] font-semibold text-slate-500 uppercase block">Cubic Yards</span>
                  <span className="text-xl font-black text-slate-900">{results.volumeCubicYards} yd³</span>
                </div>
                <div className="bg-white p-3 rounded-xl border border-orange-200 shadow-2xs">
                  <span className="text-[10px] font-semibold text-slate-500 uppercase block">Cubic Meters</span>
                  <span className="text-xl font-black text-slate-900">{results.volumeCubicMeters} m³</span>
                </div>
              </div>

              {/* Premix Bag Breakdown */}
              <div className="mt-3 bg-white p-3.5 rounded-xl border border-orange-200 space-y-2">
                <span className="text-xs font-bold text-slate-900 flex items-center gap-1">
                  <Package className="w-3.5 h-3.5 text-orange-600" />
                  <span>Pre-Mix Bag Equivalents:</span>
                </span>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="p-2 bg-slate-50 rounded-lg text-center">
                    <span className="text-slate-500 text-[10px] block">80 lb (36 kg) Bags</span>
                    <span className="font-extrabold text-orange-900 text-sm">{results.bags80lb} bags</span>
                  </div>
                  <div className="p-2 bg-slate-50 rounded-lg text-center">
                    <span className="text-slate-500 text-[10px] block">60 lb (27 kg) Bags</span>
                    <span className="font-extrabold text-orange-900 text-sm">{results.bags60lb} bags</span>
                  </div>
                </div>
              </div>

              <div className="mt-3 flex items-center justify-between p-3 bg-orange-100/70 rounded-xl border border-orange-300/80">
                <span className="text-xs font-bold text-orange-900">Estimated Ready-Mix Cost:</span>
                <span className="text-base font-extrabold text-orange-950 font-mono-numbers">
                  {currencySymbol}{results.estimatedTotalCost.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Action Row */}
            <div className="flex items-center gap-2 pt-3 border-t border-orange-200/80">
              <button
                type="button"
                onClick={handleCopy}
                className="flex-1 py-2 px-3 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-xs font-bold text-slate-700 flex items-center justify-center gap-1.5 transition-all shadow-2xs"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-orange-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="py-2 px-3 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-xs font-bold text-slate-700 flex items-center justify-center gap-1 transition-all"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 flex items-center justify-center text-center">
            <p className="text-xs font-medium text-slate-400">
              Enter dimensions to calculate concrete volume and pre-mix bags.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
