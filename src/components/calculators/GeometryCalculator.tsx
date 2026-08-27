import React, { useState, useMemo } from 'react';
import { copyToClipboard, formatNumber } from '../../utils/formatters';
import { Shapes, Copy, Check, Bookmark, Box } from 'lucide-react';

interface GeometryCalculatorProps {
  onSaveCalculation?: (summary: string, inputs: any, results: any) => void;
}

type ShapeType = 'circle' | 'rectangle' | 'triangle' | 'trapezoid' | 'sphere' | 'cylinder' | 'cone' | 'cube';

export const GeometryCalculator: React.FC<GeometryCalculatorProps> = ({ onSaveCalculation }) => {
  const [shape, setShape] = useState<ShapeType>('circle');

  // Circle / Sphere
  const [radius, setRadius] = useState<number | ''>(5);

  // Rectangle / Cube / Cylinder / Cone / Triangle
  const [length, setLength] = useState<number | ''>(10);
  const [width, setWidth] = useState<number | ''>(6);
  const [height, setHeight] = useState<number | ''>(8);

  // Triangle sides for Heron's formula
  const [sideA, setSideA] = useState<number | ''>(5);
  const [sideB, setSideB] = useState<number | ''>(6);
  const [sideC, setSideC] = useState<number | ''>(7);

  // Trapezoid bases
  const [baseA, setBaseA] = useState<number | ''>(8);
  const [baseB, setBaseB] = useState<number | ''>(14);

  const [copied, setCopied] = useState<boolean>(false);
  const [saved, setSaved] = useState<boolean>(false);

  const numRadius = typeof radius === 'number' ? radius : 0;
  const numLength = typeof length === 'number' ? length : 0;
  const numWidth = typeof width === 'number' ? width : 0;
  const numHeight = typeof height === 'number' ? height : 0;
  const numSideA = typeof sideA === 'number' ? sideA : 0;
  const numSideB = typeof sideB === 'number' ? sideB : 0;
  const numSideC = typeof sideC === 'number' ? sideC : 0;
  const numBaseA = typeof baseA === 'number' ? baseA : 0;
  const numBaseB = typeof baseB === 'number' ? baseB : 0;

  const geometryResults = useMemo(() => {
    switch (shape) {
      case 'circle': {
        if (radius === '') return null;
        const r = Math.max(0, numRadius);
        const diameter = 2 * r;
        const area = Math.PI * r * r;
        const circumference = 2 * Math.PI * r;
        return {
          title: 'Circle (2D)',
          primaryLabel: 'Area',
          primaryValue: formatNumber(area, 4),
          secondaryLabel: 'Circumference (Perimeter)',
          secondaryValue: formatNumber(circumference, 4),
          extra: `Diameter = ${formatNumber(diameter, 2)}`
        };
      }
      case 'rectangle': {
        if (length === '' || width === '') return null;
        const l = Math.max(0, numLength);
        const w = Math.max(0, numWidth);
        const area = l * w;
        const perimeter = 2 * (l + w);
        const diagonal = Math.sqrt(l * l + w * w);
        return {
          title: 'Rectangle (2D)',
          primaryLabel: 'Area',
          primaryValue: formatNumber(area, 4),
          secondaryLabel: 'Perimeter',
          secondaryValue: formatNumber(perimeter, 4),
          extra: `Diagonal = ${formatNumber(diagonal, 4)}`
        };
      }
      case 'triangle': {
        if (sideA === '' || sideB === '' || sideC === '') return null;
        const a = Math.max(0, numSideA);
        const b = Math.max(0, numSideB);
        const c = Math.max(0, numSideC);
        const perimeter = a + b + c;
        const s = perimeter / 2;
        // Heron's formula
        const areaSquared = s * (s - a) * (s - b) * (s - c);
        const isValid = a + b > c && a + c > b && b + c > a;
        const area = isValid && areaSquared > 0 ? Math.sqrt(areaSquared) : 0;
        return {
          title: 'Triangle (2D - Heron’s Formula)',
          primaryLabel: 'Area',
          primaryValue: isValid ? formatNumber(area, 4) : 'Invalid Triangle Sides',
          secondaryLabel: 'Perimeter',
          secondaryValue: formatNumber(perimeter, 4),
          extra: isValid ? `Semi-perimeter s = ${formatNumber(s, 2)}` : 'Sides do not form a valid closed triangle'
        };
      }
      case 'trapezoid': {
        if (baseA === '' || baseB === '' || height === '') return null;
        const a = Math.max(0, numBaseA);
        const b = Math.max(0, numBaseB);
        const h = Math.max(0, numHeight);
        const area = ((a + b) / 2) * h;
        return {
          title: 'Trapezoid (2D)',
          primaryLabel: 'Area',
          primaryValue: formatNumber(area, 4),
          secondaryLabel: 'Average Base Width',
          secondaryValue: formatNumber((a + b) / 2, 2),
          extra: `Height h = ${h}, Base a = ${a}, Base b = ${b}`
        };
      }
      case 'sphere': {
        if (radius === '') return null;
        const r = Math.max(0, numRadius);
        const volume = (4 / 3) * Math.PI * Math.pow(r, 3);
        const surfaceArea = 4 * Math.PI * r * r;
        return {
          title: 'Sphere (3D)',
          primaryLabel: 'Volume',
          primaryValue: formatNumber(volume, 4),
          secondaryLabel: 'Surface Area',
          secondaryValue: formatNumber(surfaceArea, 4),
          extra: `Radius r = ${r}`
        };
      }
      case 'cylinder': {
        if (radius === '' || height === '') return null;
        const r = Math.max(0, numRadius);
        const h = Math.max(0, numHeight);
        const volume = Math.PI * r * r * h;
        const lateralArea = 2 * Math.PI * r * h;
        const totalSurfaceArea = lateralArea + 2 * (Math.PI * r * r);
        return {
          title: 'Cylinder (3D)',
          primaryLabel: 'Volume',
          primaryValue: formatNumber(volume, 4),
          secondaryLabel: 'Total Surface Area',
          secondaryValue: formatNumber(totalSurfaceArea, 4),
          extra: `Lateral Area = ${formatNumber(lateralArea, 4)}`
        };
      }
      case 'cone': {
        if (radius === '' || height === '') return null;
        const r = Math.max(0, numRadius);
        const h = Math.max(0, numHeight);
        const slantHeight = Math.sqrt(r * r + h * h);
        const volume = (1 / 3) * Math.PI * r * r * h;
        const surfaceArea = Math.PI * r * (r + slantHeight);
        return {
          title: 'Cone (3D)',
          primaryLabel: 'Volume',
          primaryValue: formatNumber(volume, 4),
          secondaryLabel: 'Surface Area',
          secondaryValue: formatNumber(surfaceArea, 4),
          extra: `Slant Height (s) = ${formatNumber(slantHeight, 4)}`
        };
      }
      case 'cube': {
        if (length === '') return null;
        const s = Math.max(0, numLength);
        const volume = Math.pow(s, 3);
        const surfaceArea = 6 * s * s;
        const spaceDiagonal = s * Math.sqrt(3);
        return {
          title: 'Cube (3D)',
          primaryLabel: 'Volume',
          primaryValue: formatNumber(volume, 4),
          secondaryLabel: 'Surface Area',
          secondaryValue: formatNumber(surfaceArea, 4),
          extra: `Space Diagonal = ${formatNumber(spaceDiagonal, 4)}`
        };
      }
      default:
        return null;
    }
  }, [shape, radius, length, width, height, sideA, sideB, sideC, baseA, baseB, numRadius, numLength, numWidth, numHeight, numSideA, numSideB, numSideC, numBaseA, numBaseB]);

  const handleReset = () => {
    setShape('circle');
    setRadius(5);
    setLength(10);
    setWidth(6);
    setHeight(8);
    setSideA(5);
    setSideB(6);
    setSideC(7);
    setBaseA(8);
    setBaseB(14);
  };

  const handleCopy = async () => {
    if (!geometryResults) return;
    const text = `${geometryResults.title} Calculations:
${geometryResults.primaryLabel}: ${geometryResults.primaryValue}
${geometryResults.secondaryLabel}: ${geometryResults.secondaryValue}
${geometryResults.extra}`;
    const ok = await copyToClipboard(text);
    if (ok) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleSave = () => {
    if (!onSaveCalculation || !geometryResults) return;
    onSaveCalculation(
      `${geometryResults.title} - ${geometryResults.primaryLabel}: ${geometryResults.primaryValue}`,
      { shape, radius, length, width, height },
      geometryResults
    );
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Shape Selector Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap gap-2 p-1.5 bg-slate-200/60 rounded-2xl">
          {[
            { id: 'circle', label: 'Circle' },
            { id: 'rectangle', label: 'Rectangle' },
            { id: 'triangle', label: 'Triangle' },
            { id: 'trapezoid', label: 'Trapezoid' },
            { id: 'sphere', label: 'Sphere' },
            { id: 'cylinder', label: 'Cylinder' },
            { id: 'cone', label: 'Cone' },
            { id: 'cube', label: 'Cube' }
          ].map(item => (
            <button
              key={item.id}
              type="button"
              onClick={() => setShape(item.id as ShapeType)}
              className={`py-1.5 px-3 rounded-xl text-xs font-bold transition-all ${
                shape === item.id ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
        <button
          type="button"
          onClick={handleReset}
          className="text-xs font-semibold text-slate-600 hover:text-slate-900 px-3 py-1.5 rounded-xl border border-slate-200 hover:bg-slate-50 transition-colors"
        >
          Reset
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Inputs */}
        <div className="lg:col-span-6 bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-2xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Shapes className="w-4 h-4 text-orange-600" />
              <span>Geometric Parameters</span>
            </h2>
          </div>

          {(shape === 'circle' || shape === 'sphere') && (
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">Radius (r)</label>
              <input
                type="number"
                min="0"
                step="any"
                value={radius}
                onChange={(e) => setRadius(parseFloat(e.target.value) || 0)}
                className="w-full p-2.5 text-base font-mono font-semibold border border-slate-200 rounded-xl bg-slate-50/50 focus:bg-white focus:outline-none"
              />
            </div>
          )}

          {shape === 'rectangle' && (
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Length (l)</label>
                <input
                  type="number"
                  min="0"
                  step="any"
                  value={length}
                  onChange={(e) => setLength(parseFloat(e.target.value) || 0)}
                  className="w-full p-2.5 text-base font-mono font-semibold border border-slate-200 rounded-xl bg-slate-50/50 focus:bg-white focus:outline-none"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Width (w)</label>
                <input
                  type="number"
                  min="0"
                  step="any"
                  value={width}
                  onChange={(e) => setWidth(parseFloat(e.target.value) || 0)}
                  className="w-full p-2.5 text-base font-mono font-semibold border border-slate-200 rounded-xl bg-slate-50/50 focus:bg-white focus:outline-none"
                />
              </div>
            </div>
          )}

          {shape === 'triangle' && (
            <div className="grid grid-cols-3 gap-2">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Side a</label>
                <input
                  type="number"
                  min="0"
                  step="any"
                  value={sideA}
                  onChange={(e) => setSideA(parseFloat(e.target.value) || 0)}
                  className="w-full p-2 text-sm font-mono font-semibold border border-slate-200 rounded-xl bg-slate-50/50 focus:bg-white focus:outline-none"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Side b</label>
                <input
                  type="number"
                  min="0"
                  step="any"
                  value={sideB}
                  onChange={(e) => setSideB(parseFloat(e.target.value) || 0)}
                  className="w-full p-2 text-sm font-mono font-semibold border border-slate-200 rounded-xl bg-slate-50/50 focus:bg-white focus:outline-none"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Side c</label>
                <input
                  type="number"
                  min="0"
                  step="any"
                  value={sideC}
                  onChange={(e) => setSideC(parseFloat(e.target.value) || 0)}
                  className="w-full p-2 text-sm font-mono font-semibold border border-slate-200 rounded-xl bg-slate-50/50 focus:bg-white focus:outline-none"
                />
              </div>
            </div>
          )}

          {shape === 'trapezoid' && (
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Top Base (a)</label>
                  <input
                    type="number"
                    min="0"
                    step="any"
                    value={baseA}
                    onChange={(e) => setBaseA(parseFloat(e.target.value) || 0)}
                    className="w-full p-2.5 text-base font-mono font-semibold border border-slate-200 rounded-xl bg-slate-50/50 focus:bg-white focus:outline-none"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Bottom Base (b)</label>
                  <input
                    type="number"
                    min="0"
                    step="any"
                    value={baseB}
                    onChange={(e) => setBaseB(parseFloat(e.target.value) || 0)}
                    className="w-full p-2.5 text-base font-mono font-semibold border border-slate-200 rounded-xl bg-slate-50/50 focus:bg-white focus:outline-none"
                  />
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Vertical Height (h)</label>
                <input
                  type="number"
                  min="0"
                  step="any"
                  value={height}
                  onChange={(e) => setHeight(parseFloat(e.target.value) || 0)}
                  className="w-full p-2.5 text-base font-mono font-semibold border border-slate-200 rounded-xl bg-slate-50/50 focus:bg-white focus:outline-none"
                />
              </div>
            </div>
          )}

          {(shape === 'cylinder' || shape === 'cone') && (
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Radius (r)</label>
                <input
                  type="number"
                  min="0"
                  step="any"
                  value={radius}
                  onChange={(e) => setRadius(parseFloat(e.target.value) || 0)}
                  className="w-full p-2.5 text-base font-mono font-semibold border border-slate-200 rounded-xl bg-slate-50/50 focus:bg-white focus:outline-none"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Height (h)</label>
                <input
                  type="number"
                  min="0"
                  step="any"
                  value={height}
                  onChange={(e) => setHeight(parseFloat(e.target.value) || 0)}
                  className="w-full p-2.5 text-base font-mono font-semibold border border-slate-200 rounded-xl bg-slate-50/50 focus:bg-white focus:outline-none"
                />
              </div>
            </div>
          )}

          {shape === 'cube' && (
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">Side Edge Length (s)</label>
              <input
                type="number"
                min="0"
                step="any"
                value={length}
                onChange={(e) => setLength(parseFloat(e.target.value) || 0)}
                className="w-full p-2.5 text-base font-mono font-semibold border border-slate-200 rounded-xl bg-slate-50/50 focus:bg-white focus:outline-none"
              />
            </div>
          )}
        </div>

        {/* Right Output */}
        <div className="lg:col-span-6 space-y-4">
          <div className="bg-gradient-to-br from-slate-900 via-teal-950 to-slate-900 text-white rounded-2xl p-6 shadow-md relative">
            {geometryResults && (
              <div className="space-y-4">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-teal-300">
                    {geometryResults.primaryLabel}
                  </span>
                  <div className="text-4xl font-black tracking-tight text-white mt-1 font-mono">
                    {geometryResults.primaryValue}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-3 border-t border-teal-900/60 text-xs">
                  <div className="bg-white/10 rounded-xl p-3 backdrop-blur-xs">
                    <span className="text-[10px] text-slate-300 uppercase font-bold block">{geometryResults.secondaryLabel}</span>
                    <span className="text-lg font-bold text-teal-300 font-mono">{geometryResults.secondaryValue}</span>
                  </div>
                  <div className="bg-white/10 rounded-xl p-3 backdrop-blur-xs">
                    <span className="text-[10px] text-slate-300 uppercase font-bold block">Properties</span>
                    <span className="text-xs font-bold text-white leading-tight block mt-1">{geometryResults.extra}</span>
                  </div>
                </div>
              </div>
            )}

            <div className="flex items-center gap-2 pt-4 border-t border-teal-900/60">
              <button
                onClick={handleCopy}
                className="flex-1 py-2 px-3 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-bold text-white flex items-center justify-center gap-1.5 transition-colors border border-white/10"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-orange-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied' : 'Copy Shape Results'}</span>
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
