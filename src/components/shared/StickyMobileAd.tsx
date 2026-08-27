import React, { useState } from 'react';
import { Sparkles, X, ChevronUp, ChevronDown, ArrowUpRight } from 'lucide-react';

interface StickyMobileAdProps {
  slotId?: string;
  adClient?: string;
}

export const StickyMobileAd: React.FC<StickyMobileAdProps> = ({
  slotId = '6382910475'
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isMinimized, setIsMinimized] = useState(false);

  if (!isVisible) {
    return (
      <div className="lg:hidden fixed bottom-3 right-3 z-40">
        <button
          onClick={() => setIsVisible(true)}
          className="px-2.5 py-1 rounded-full bg-[#FFFFFF] text-[#64748B] text-[10px] font-semibold shadow-xs border border-[#CBD5E1] flex items-center gap-1 hover:text-[#F97316]"
          aria-label="Show Sponsored Offers"
        >
          <Sparkles className="w-3 h-3 text-[#F97316]" />
          <span>Offers</span>
        </button>
      </div>
    );
  }

  return (
    <aside 
      id={`sticky-mobile-ad-${slotId}`}
      aria-label="Sticky Mobile Advertisement"
      className="lg:hidden fixed bottom-0 left-0 right-0 z-40 px-3 pb-2 transition-all duration-300 pointer-events-auto"
    >
      <div className="max-w-md mx-auto bg-[#FFFFFF] rounded-xl border border-dashed border-[#CBD5E1] shadow-lg overflow-hidden">
        {/* Top Header Bar */}
        <div className="flex items-center justify-between px-3 py-1 bg-[#F8FAFC] border-b border-[#E2E8F0] text-[10px] font-semibold text-[#94A3B8]">
          <div className="flex items-center gap-1.5">
            <span className="bg-[#FFFFFF] text-[#64748B] border border-[#CBD5E1] px-1 py-0.2 rounded text-[9px] uppercase font-bold">
              Ad
            </span>
            <span className="truncate text-[#475569]">Compare 2026 Loan & Savings Rates</span>
          </div>

          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => setIsMinimized(prev => !prev)}
              className="p-1 rounded text-[#94A3B8] hover:text-[#0F172A] hover:bg-[#E2E8F0] transition-colors"
              aria-label={isMinimized ? 'Expand mobile ad' : 'Minimize mobile ad'}
            >
              {isMinimized ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
            </button>
            <button
              type="button"
              onClick={() => setIsVisible(false)}
              className="p-1 rounded text-[#94A3B8] hover:text-red-500 hover:bg-[#E2E8F0] transition-colors"
              aria-label="Close mobile advertisement"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* Ad Content (Expanded vs Minimized) */}
        {!isMinimized ? (
          <div className="p-2.5 flex items-center justify-between gap-3 bg-[#F8FAFC]">
            <div className="min-w-0">
              <div className="text-xs font-semibold text-[#0F172A] truncate">
                High-Yield Savings & Loan Offers
              </div>
              <div className="text-[11px] text-[#64748B] truncate">
                Up to 5.15% APY • Transparent terms
              </div>
            </div>

            <button
              type="button"
              onClick={() => window.open('https://google.com', '_blank', 'noopener,noreferrer')}
              className="shrink-0 px-2.5 py-1.5 bg-[#FFFFFF] hover:bg-[#FFF7ED] hover:text-[#F97316] text-[#475569] text-[11px] font-semibold rounded-lg border border-[#CBD5E1] transition-transform active:scale-95 flex items-center gap-1 cursor-pointer"
            >
              <span>View</span>
              <ArrowUpRight className="w-3 h-3 text-[#94A3B8]" />
            </button>
          </div>
        ) : (
          <div className="px-3 py-1 text-[11px] text-[#64748B] flex items-center justify-between bg-[#F8FAFC]">
            <span className="truncate">Compare savings and loan options</span>
            <button
              type="button"
              onClick={() => setIsMinimized(false)}
              className="text-[#F97316] font-semibold text-[10px] ml-2 shrink-0 underline cursor-pointer"
            >
              Expand
            </button>
          </div>
        )}
      </div>
    </aside>
  );
};
