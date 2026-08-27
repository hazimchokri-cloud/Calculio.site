import React, { useState, useMemo } from 'react';
import { ArrowLeftRight, Copy, Check, Sparkles, RefreshCw, Info } from 'lucide-react';
import { formatNumber, copyToClipboard } from '../../utils/formatters';
import { useCurrency } from '../../context/CurrencyContext';

type CategoryKey = 'length' | 'weight' | 'temperature' | 'area' | 'volume' | 'speed' | 'digital' | 'time' | 'energy' | 'currency';

interface UnitDefinition {
  id: string;
  name: string;
  symbol: string;
  toBase: (v: number) => number;
  fromBase: (v: number) => number;
}

const CONVERSION_CATEGORIES: Record<CategoryKey, { name: string; description?: string; units: UnitDefinition[] }> = {
  length: {
    name: 'Length & Distance',
    units: [
      { id: 'm', name: 'Meters', symbol: 'm', toBase: v => v, fromBase: v => v },
      { id: 'km', name: 'Kilometers', symbol: 'km', toBase: v => v * 1000, fromBase: v => v / 1000 },
      { id: 'cm', name: 'Centimeters', symbol: 'cm', toBase: v => v * 0.01, fromBase: v => v / 0.01 },
      { id: 'mm', name: 'Millimeters', symbol: 'mm', toBase: v => v * 0.001, fromBase: v => v / 0.001 },
      { id: 'mi', name: 'Miles', symbol: 'mi', toBase: v => v * 1609.344, fromBase: v => v / 1609.344 },
      { id: 'yd', name: 'Yards', symbol: 'yd', toBase: v => v * 0.9144, fromBase: v => v / 0.9144 },
      { id: 'ft', name: 'Feet', symbol: 'ft', toBase: v => v * 0.3048, fromBase: v => v / 0.3048 },
      { id: 'in', name: 'Inches', symbol: 'in', toBase: v => v * 0.0254, fromBase: v => v / 0.0254 },
      { id: 'nmi', name: 'Nautical Miles', symbol: 'nmi', toBase: v => v * 1852, fromBase: v => v / 1852 }
    ]
  },
  weight: {
    name: 'Weight & Mass',
    units: [
      { id: 'kg', name: 'Kilograms', symbol: 'kg', toBase: v => v, fromBase: v => v },
      { id: 'g', name: 'Grams', symbol: 'g', toBase: v => v * 0.001, fromBase: v => v / 0.001 },
      { id: 'mg', name: 'Milligrams', symbol: 'mg', toBase: v => v * 0.000001, fromBase: v => v / 0.000001 },
      { id: 'lb', name: 'Pounds (lbs)', symbol: 'lb', toBase: v => v * 0.45359237, fromBase: v => v / 0.45359237 },
      { id: 'oz', name: 'Ounces (oz)', symbol: 'oz', toBase: v => v * 0.028349523125, fromBase: v => v / 0.028349523125 },
      { id: 'ton_metric', name: 'Metric Tonne', symbol: 't', toBase: v => v * 1000, fromBase: v => v / 1000 },
      { id: 'stone', name: 'Stone (UK)', symbol: 'st', toBase: v => v * 6.35029318, fromBase: v => v / 6.35029318 }
    ]
  },
  temperature: {
    name: 'Temperature',
    units: [
      { id: 'c', name: 'Celsius', symbol: '°C', toBase: v => v, fromBase: v => v },
      { id: 'f', name: 'Fahrenheit', symbol: '°F', toBase: v => (v - 32) * (5 / 9), fromBase: v => v * (9 / 5) + 32 },
      { id: 'k', name: 'Kelvin', symbol: 'K', toBase: v => v - 273.15, fromBase: v => v + 273.15 }
    ]
  },
  area: {
    name: 'Area & Surface',
    units: [
      { id: 'sq_m', name: 'Square Meters', symbol: 'm²', toBase: v => v, fromBase: v => v },
      { id: 'sq_km', name: 'Square Kilometers', symbol: 'km²', toBase: v => v * 1000000, fromBase: v => v / 1000000 },
      { id: 'sq_ft', name: 'Square Feet', symbol: 'sq ft', toBase: v => v * 0.09290304, fromBase: v => v / 0.09290304 },
      { id: 'acre', name: 'Acres', symbol: 'ac', toBase: v => v * 4046.8564224, fromBase: v => v / 4046.8564224 },
      { id: 'hectare', name: 'Hectares', symbol: 'ha', toBase: v => v * 10000, fromBase: v => v / 10000 },
      { id: 'sq_yd', name: 'Square Yards', symbol: 'sq yd', toBase: v => v * 0.83612736, fromBase: v => v / 0.83612736 },
      { id: 'sq_in', name: 'Square Inches', symbol: 'sq in', toBase: v => v * 0.00064516, fromBase: v => v / 0.00064516 }
    ]
  },
  volume: {
    name: 'Volume & Capacity',
    units: [
      { id: 'l', name: 'Liters', symbol: 'L', toBase: v => v, fromBase: v => v },
      { id: 'ml', name: 'Milliliters', symbol: 'mL', toBase: v => v * 0.001, fromBase: v => v / 0.001 },
      { id: 'gal_us', name: 'Gallons (US)', symbol: 'gal (US)', toBase: v => v * 3.785411784, fromBase: v => v / 3.785411784 },
      { id: 'gal_uk', name: 'Gallons (Imperial)', symbol: 'gal (UK)', toBase: v => v * 4.54609, fromBase: v => v / 4.54609 },
      { id: 'cup_us', name: 'Cups (US)', symbol: 'cup', toBase: v => v * 0.2365882365, fromBase: v => v / 0.2365882365 },
      { id: 'fl_oz_us', name: 'Fluid Ounces (US)', symbol: 'fl oz', toBase: v => v * 0.0295735295625, fromBase: v => v / 0.0295735295625 },
      { id: 'cu_m', name: 'Cubic Meters', symbol: 'm³', toBase: v => v * 1000, fromBase: v => v / 1000 },
      { id: 'cu_ft', name: 'Cubic Feet', symbol: 'cu ft', toBase: v => v * 28.316846592, fromBase: v => v / 28.316846592 }
    ]
  },
  speed: {
    name: 'Speed & Velocity',
    units: [
      { id: 'mps', name: 'Meters per second', symbol: 'm/s', toBase: v => v, fromBase: v => v },
      { id: 'kmh', name: 'Kilometers per hour', symbol: 'km/h', toBase: v => v / 3.6, fromBase: v => v * 3.6 },
      { id: 'mph', name: 'Miles per hour', symbol: 'mph', toBase: v => v * 0.44704, fromBase: v => v / 0.44704 },
      { id: 'knot', name: 'Knots', symbol: 'kn', toBase: v => v * 0.5144444444444444, fromBase: v => v / 0.5144444444444444 },
      { id: 'ftps', name: 'Feet per second', symbol: 'ft/s', toBase: v => v * 0.3048, fromBase: v => v / 0.3048 }
    ]
  },
  energy: {
    name: 'Energy & Work',
    units: [
      { id: 'j', name: 'Joules', symbol: 'J', toBase: v => v, fromBase: v => v },
      { id: 'kj', name: 'Kilojoules', symbol: 'kJ', toBase: v => v * 1000, fromBase: v => v / 1000 },
      { id: 'cal', name: 'Calories (thermochemical)', symbol: 'cal', toBase: v => v * 4.184, fromBase: v => v / 4.184 },
      { id: 'kcal', name: 'Kilocalories / Food Cal', symbol: 'kcal', toBase: v => v * 4184, fromBase: v => v / 4184 },
      { id: 'wh', name: 'Watt-hours', symbol: 'Wh', toBase: v => v * 3600, fromBase: v => v / 3600 },
      { id: 'kwh', name: 'Kilowatt-hours', symbol: 'kWh', toBase: v => v * 3600000, fromBase: v => v / 3600000 },
      { id: 'btu', name: 'British Thermal Units (BTU)', symbol: 'BTU', toBase: v => v * 1055.05585, fromBase: v => v / 1055.05585 },
      { id: 'ftlb', name: 'Foot-pounds', symbol: 'ft⋅lb', toBase: v => v * 1.35581794833, fromBase: v => v / 1.35581794833 }
    ]
  },
  digital: {
    name: 'Digital Data Storage',
    units: [
      { id: 'bytes', name: 'Bytes (B)', symbol: 'B', toBase: v => v, fromBase: v => v },
      { id: 'kb', name: 'Kilobytes (KB)', symbol: 'KB', toBase: v => v * 1024, fromBase: v => v / 1024 },
      { id: 'mb', name: 'Megabytes (MB)', symbol: 'MB', toBase: v => v * (1024 * 1024), fromBase: v => v / (1024 * 1024) },
      { id: 'gb', name: 'Gigabytes (GB)', symbol: 'GB', toBase: v => v * (1024 * 1024 * 1024), fromBase: v => v / (1024 * 1024 * 1024) },
      { id: 'tb', name: 'Terabytes (TB)', symbol: 'TB', toBase: v => v * (1024 * 1024 * 1024 * 1024), fromBase: v => v / (1024 * 1024 * 1024 * 1024) },
      { id: 'pb', name: 'Petabytes (PB)', symbol: 'PB', toBase: v => v * (1024 * 1024 * 1024 * 1024 * 1024), fromBase: v => v / (1024 * 1024 * 1024 * 1024 * 1024) }
    ]
  },
  time: {
    name: 'Time Duration',
    units: [
      { id: 'sec', name: 'Seconds', symbol: 's', toBase: v => v, fromBase: v => v },
      { id: 'ms', name: 'Milliseconds', symbol: 'ms', toBase: v => v * 0.001, fromBase: v => v / 0.001 },
      { id: 'min', name: 'Minutes', symbol: 'min', toBase: v => v * 60, fromBase: v => v / 60 },
      { id: 'hr', name: 'Hours', symbol: 'h', toBase: v => v * 3600, fromBase: v => v / 3600 },
      { id: 'day', name: 'Days', symbol: 'd', toBase: v => v * 86400, fromBase: v => v / 86400 },
      { id: 'wk', name: 'Weeks', symbol: 'wk', toBase: v => v * 604800, fromBase: v => v / 604800 },
      { id: 'yr', name: 'Years (Standard 365 days)', symbol: 'yr', toBase: v => v * 31536000, fromBase: v => v / 31536000 }
    ]
  },
  currency: {
    name: 'Currency & Foreign Exchange',
    description: 'Calculated using standard international interbank exchange benchmark parity rates relative to USD.',
    units: [
      { id: 'usd', name: 'US Dollar (USD)', symbol: '$', toBase: v => v, fromBase: v => v },
      { id: 'eur', name: 'Euro (EUR)', symbol: '€', toBase: v => v / 0.92, fromBase: v => v * 0.92 },
      { id: 'gbp', name: 'British Pound (GBP)', symbol: '£', toBase: v => v / 0.79, fromBase: v => v * 0.79 },
      { id: 'cad', name: 'Canadian Dollar (CAD)', symbol: 'C$', toBase: v => v / 1.36, fromBase: v => v * 1.36 },
      { id: 'aud', name: 'Australian Dollar (AUD)', symbol: 'A$', toBase: v => v / 1.52, fromBase: v => v * 1.52 },
      { id: 'jpy', name: 'Japanese Yen (JPY)', symbol: '¥', toBase: v => v / 155.20, fromBase: v => v * 155.20 },
      { id: 'chf', name: 'Swiss Franc (CHF)', symbol: 'Fr', toBase: v => v / 0.90, fromBase: v => v * 0.90 },
      { id: 'inr', name: 'Indian Rupee (INR)', symbol: '₹', toBase: v => v / 83.45, fromBase: v => v * 83.45 },
      { id: 'cny', name: 'Chinese Yuan (CNY)', symbol: '¥', toBase: v => v / 7.23, fromBase: v => v * 7.23 },
      { id: 'aed', name: 'Emirati Dirham (AED)', symbol: 'د.إ', toBase: v => v / 3.6725, fromBase: v => v * 3.6725 }
    ]
  }
};

export const UnitConverter: React.FC = () => {
  const { rates, lastUpdated } = useCurrency();
  const [activeCategory, setActiveCategory] = useState<CategoryKey>('length');
  const [inputValue, setInputValue] = useState<number | ''>(1);
  const [fromUnitId, setFromUnitId] = useState<string>('m');
  const [toUnitId, setToUnitId] = useState<string>('ft');
  const [copied, setCopied] = useState<boolean>(false);

  // When category changes, reset units cleanly
  const handleCategoryChange = (cat: CategoryKey) => {
    setActiveCategory(cat);
    const units = CONVERSION_CATEGORIES[cat].units;
    setFromUnitId(units[0].id);
    setToUnitId(units[1] ? units[1].id : units[0].id);
  };

  const currentCategoryData = CONVERSION_CATEGORIES[activeCategory];
  const fromUnit = currentCategoryData.units.find(u => u.id === fromUnitId) || currentCategoryData.units[0];
  const toUnit = currentCategoryData.units.find(u => u.id === toUnitId) || currentCategoryData.units[1] || currentCategoryData.units[0];

  const convertedValue = useMemo(() => {
    if (inputValue === '' || isNaN(inputValue)) return null;
    const num = Number(inputValue);
    
    if (activeCategory === 'currency') {
      const fromCode = fromUnit.id.toUpperCase();
      const toCode = toUnit.id.toUpperCase();
      const rateFrom = rates[fromCode] || 1;
      const rateTo = rates[toCode] || 1;
      const inUsd = num / rateFrom;
      const res = inUsd * rateTo;
      return isNaN(res) || !isFinite(res) ? 0 : Number(res.toFixed(4));
    }

    const baseValue = fromUnit.toBase(num);
    const res = toUnit.fromBase(baseValue);
    return isNaN(res) || !isFinite(res) ? 0 : res;
  }, [inputValue, fromUnit, toUnit, activeCategory, rates]);

  const handleSwap = () => {
    const temp = fromUnitId;
    setFromUnitId(toUnitId);
    setToUnitId(temp);
  };

  const handleCopy = async () => {
    if (convertedValue === null) return;
    const text = `${inputValue} ${fromUnit.symbol} = ${convertedValue} ${toUnit.symbol}`;
    const ok = await copyToClipboard(text);
    if (ok) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleReset = () => {
    setActiveCategory('length');
    setInputValue(1);
    setFromUnitId('m');
    setToUnitId('ft');
  };

  return (
    <div className="space-y-6">
      {/* Category Pills Bar */}
      <div className="flex items-center justify-between gap-2 overflow-x-auto pb-2 border-b border-slate-200 scrollbar-none">
        <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none">
          {(Object.keys(CONVERSION_CATEGORIES) as CategoryKey[]).map(cat => (
            <button
              key={cat}
              onClick={() => handleCategoryChange(cat)}
              className={`px-3.5 py-1.5 text-xs font-bold rounded-xl whitespace-nowrap transition-all cursor-pointer ${
                activeCategory === cat
                  ? 'bg-orange-500 text-white shadow-xs'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {CONVERSION_CATEGORIES[cat].name}
            </button>
          ))}
        </div>
        <button
          onClick={handleReset}
          className="text-xs font-semibold text-slate-600 hover:text-slate-900 px-2.5 py-1.5 rounded-xl border border-slate-200 hover:bg-slate-50 transition-colors whitespace-nowrap"
        >
          Reset
        </button>
      </div>

      {currentCategoryData.description && (
        <div className="flex items-center gap-2 p-3 bg-orange-50/70 border border-orange-200 rounded-xl text-xs text-orange-900 font-medium">
          <Info className="w-4 h-4 shrink-0 text-orange-600" />
          <span>{currentCategoryData.description}</span>
        </div>
      )}

      {/* Converter Main Box */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        
        {/* From Box */}
        <div className="lg:col-span-5 bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-3">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-700">From</label>
          <input
            type="number"
            step="any"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value === '' ? '' : parseFloat(e.target.value))}
            placeholder="1"
            className="w-full px-4 py-3 text-2xl font-black font-mono-numbers text-slate-900 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500 bg-slate-50"
          />
          <select
            value={fromUnitId}
            onChange={(e) => setFromUnitId(e.target.value)}
            className="w-full px-3 py-2 text-sm font-semibold border border-slate-200 rounded-lg bg-white cursor-pointer"
          >
            {currentCategoryData.units.map(u => (
              <option key={u.id} value={u.id}>{u.name} ({u.symbol})</option>
            ))}
          </select>
        </div>

        {/* Swap Button */}
        <div className="lg:col-span-2 flex justify-center">
          <button
            onClick={handleSwap}
            className="p-3 bg-orange-100 hover:bg-orange-200 text-orange-800 rounded-full border border-orange-300 shadow-2xs hover:rotate-180 transition-all duration-300 cursor-pointer"
            title="Swap Units"
          >
            <ArrowLeftRight className="w-5 h-5" />
          </button>
        </div>

        {/* To Box */}
        <div className="lg:col-span-5 bg-gradient-to-br from-orange-500/10 to-orange-500/5 rounded-2xl p-6 border border-orange-200 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold uppercase tracking-wider text-orange-900">To (Result)</label>
            {convertedValue !== null && (
              <button
                onClick={handleCopy}
                className="text-xs text-orange-800 hover:text-orange-950 flex items-center gap-1 font-semibold cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-orange-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
            )}
          </div>
          <div className="w-full px-4 py-3 text-2xl font-black font-mono-numbers text-orange-950 bg-white/80 border border-orange-200 rounded-xl truncate min-h-[58px] flex items-center">
            {convertedValue !== null ? formatNumber(convertedValue, 6) : <span className="text-sm font-semibold text-orange-700">Please enter a value.</span>}
          </div>
          <select
            value={toUnitId}
            onChange={(e) => setToUnitId(e.target.value)}
            className="w-full px-3 py-2 text-sm font-semibold border border-orange-200 rounded-lg bg-white cursor-pointer"
          >
            {currentCategoryData.units.map(u => (
              <option key={u.id} value={u.id}>{u.name} ({u.symbol})</option>
            ))}
          </select>
        </div>
      </div>

      {/* Quick Conversion Table */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs space-y-4">
        <h4 className="text-sm font-bold text-slate-900">
          Quick Reference Table: {fromUnit.name} to {toUnit.name}
        </h4>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
          {[1, 5, 10, 25, 50, 100].map(val => {
            const converted = activeCategory === 'currency'
              ? ((val / (rates[fromUnit.id.toUpperCase()] || 1)) * (rates[toUnit.id.toUpperCase()] || 1))
              : toUnit.fromBase(fromUnit.toBase(val));
            return (
              <div
                key={val}
                onClick={() => setInputValue(val)}
                className="p-3 rounded-xl bg-slate-50 hover:bg-orange-50/70 border border-slate-200/70 cursor-pointer transition-colors text-center"
              >
                <span className="text-xs text-slate-700 block font-mono-numbers">{val} {fromUnit.symbol}</span>
                <strong className="text-sm text-slate-900 font-mono-numbers block mt-1">{formatNumber(converted, 3)} {toUnit.symbol}</strong>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
