import React, { useState, useMemo } from 'react';
import { CalculatorMeta } from '../../types';
import { Calculator, Sparkles, Copy, Check, RotateCcw, Info, ArrowRight } from 'lucide-react';
import { copyToClipboard } from '../../utils/formatters';

interface GenericConfigurableCalculatorProps {
  calculator: CalculatorMeta;
  currencySymbol?: string;
  onSave?: (summary: string, inputs: any, results: any) => void;
}

export const GenericConfigurableCalculator: React.FC<GenericConfigurableCalculatorProps> = ({
  calculator,
  currencySymbol = '$',
  onSave
}) => {
  // Configurable dynamic inputs
  const [valA, setValA] = useState<number | ''>(100);
  const [valB, setValB] = useState<number | ''>(20);
  const [valC, setValC] = useState<number | ''>(5);
  const [copied, setCopied] = useState(false);

  const numA = typeof valA === 'number' ? valA : 0;
  const numB = typeof valB === 'number' ? valB : 0;
  const numC = typeof valC === 'number' ? valC : 0;

  const isInputEmpty = valA === '' || valB === '';

  // Dynamic computation based on formula or generic ratios
  const results = useMemo(() => {
    if (isInputEmpty) return null;
    const sum = numA + numB + numC;
    const ratio = numB > 0 ? (numA / numB) : 0;
    const percentage = numB > 0 ? ((numA / numB) * 100) : 0;
    const formattedResult = (numA * (1 + (numB / 100))).toFixed(2);

    return {
      primaryResult: formattedResult,
      sum: sum.toLocaleString(),
      ratio: ratio.toFixed(2),
      percentage: percentage.toFixed(1) + '%'
    };
  }, [isInputEmpty, numA, numB, numC]);

  const handleCopy = () => {
    if (!results) return;
    const text = `${calculator.name} Result:
Primary Output: ${results.primaryResult}
Inputs: A=${numA}, B=${numB}, C=${numC}`;
    copyToClipboard(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReset = () => {
    setValA(100);
    setValB(20);
    setValC(5);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-[#FFFFFF] p-6 rounded-2xl border border-[#E2E8F0] shadow-xs">
        <div className="space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-[#E2E8F0]">
            <div className="flex items-center gap-2">
              <Calculator className="w-4 h-4 text-[#F97316]" />
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#0F172A]">
                {calculator.name} Inputs
              </h4>
            </div>
            <button
              onClick={handleReset}
              className="text-xs font-semibold text-[#475569] hover:text-[#0F172A] px-2.5 py-1 rounded-lg border border-[#E2E8F0] hover:bg-[#F8FAFC] transition-colors cursor-pointer"
            >
              Reset
            </button>
          </div>

          <p className="text-xs text-[#475569] leading-relaxed">
            {calculator.description}
          </p>

          <div className="space-y-3 pt-2">
            <div>
              <label className="block text-xs font-bold text-[#0F172A] mb-1">Primary Value / Quantity</label>
              <input
                type="number"
                value={valA}
                onChange={(e) => setValA(e.target.value === '' ? '' : Number(e.target.value))}
                placeholder="100"
                className="w-full px-3 py-2 border border-[#E2E8F0] rounded-xl text-xs font-bold text-[#0F172A] bg-[#F8FAFC] focus:bg-[#FFFFFF] focus:border-[#F97316] focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-[#0F172A] mb-1">Rate / Factor / Multiplier</label>
              <input
                type="number"
                value={valB}
                onChange={(e) => setValB(e.target.value === '' ? '' : Number(e.target.value))}
                placeholder="20"
                className="w-full px-3 py-2 border border-[#E2E8F0] rounded-xl text-xs font-bold text-[#0F172A] bg-[#F8FAFC] focus:bg-[#FFFFFF] focus:border-[#F97316] focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-[#0F172A] mb-1">Adjustment / Period (Optional)</label>
              <input
                type="number"
                value={valC}
                onChange={(e) => setValC(e.target.value === '' ? '' : Number(e.target.value))}
                placeholder="5"
                className="w-full px-3 py-2 border border-[#E2E8F0] rounded-xl text-xs font-bold text-[#0F172A] bg-[#F8FAFC] focus:bg-[#FFFFFF] focus:border-[#F97316] focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Results Block */}
        {results ? (
          <div className="bg-[#FFF7ED] p-6 rounded-2xl border border-[#FDBA74] flex flex-col justify-between space-y-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#FDBA74]">
                <span className="text-xs font-bold uppercase tracking-wider text-[#9A3412]">Computed Output</span>
                <span className="text-[10px] font-bold bg-[#FFFFFF] text-[#9A3412] px-2 py-0.5 rounded-full border border-[#FDBA74]">
                  Real-Time
                </span>
              </div>

              <div className="p-4 bg-[#FFFFFF] rounded-xl border border-[#FDBA74] shadow-2xs text-center space-y-1 min-h-[88px] flex flex-col justify-center">
                <span className="text-[11px] font-bold text-[#64748B] uppercase">Primary Computed Result</span>
                <div className="text-3xl font-black text-[#9A3412] font-mono">
                  {results.primaryResult}
                </div>
              </div>

              <div className="bg-[#FFFFFF] p-3.5 rounded-xl border border-[#FDBA74] space-y-2 text-xs text-[#475569]">
                <div className="flex justify-between">
                  <span>Calculated Ratio:</span>
                  <span className="font-bold text-[#0F172A] font-mono">{results.ratio}</span>
                </div>
                <div className="flex justify-between">
                  <span>Relative Percentage:</span>
                  <span className="font-bold text-[#0F172A] font-mono">{results.percentage}</span>
                </div>
                <div className="flex justify-between">
                  <span>Combined Sum:</span>
                  <span className="font-bold text-[#0F172A] font-mono">{results.sum}</span>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-[#FDBA74]">
              <button
                type="button"
                onClick={handleCopy}
                className="w-full py-2 px-3 rounded-xl bg-[#FFFFFF] hover:bg-[#FFF7ED] border border-[#FDBA74] text-xs font-bold text-[#0F172A] hover:text-[#F97316] flex items-center justify-center gap-1.5 transition-all shadow-2xs cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-[#F97316]" /> : <Copy className="w-3.5 h-3.5 text-[#64748B]" />}
                <span>{copied ? 'Copied' : 'Copy Results'}</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-[#F8FAFC] p-6 rounded-2xl border border-[#E2E8F0] flex items-center justify-center text-center">
            <p className="text-xs font-medium text-[#94A3B8]">
              Enter values above to calculate results.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
