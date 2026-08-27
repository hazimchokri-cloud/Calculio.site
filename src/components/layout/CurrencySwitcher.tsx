import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';
import { useCurrency, SUPPORTED_CURRENCIES } from '../../context/CurrencyContext';

interface CurrencySwitcherProps {
  className?: string;
}

export const CurrencySwitcher: React.FC<CurrencySwitcherProps> = ({
  className = ''
}) => {
  const { currency, setCurrency, currentCurrencyItem } = useCurrency();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close dropdown on Escape key
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const handleSelect = (code: typeof currency) => {
    setCurrency(code);
    setIsOpen(false);
  };

  return (
    <div ref={dropdownRef} className={`relative inline-block text-left ${className}`}>
      {/* Selector Trigger Button */}
      <button
        id="currency-switcher-button"
        type="button"
        onClick={() => setIsOpen(prev => !prev)}
        className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold text-[#0F172A] bg-[#F8FAFC] hover:bg-[#FFF7ED] border border-[#E2E8F0] hover:border-[#FDBA74] rounded-[8px] transition-colors cursor-pointer shadow-xs focus:outline-none focus:ring-2 focus:ring-[#F97316]/20"
        aria-haspopup="true"
        aria-expanded={isOpen}
        aria-label="Change Currency"
      >
        <span className="text-sm leading-none">{currentCurrencyItem.flag}</span>
        <span className="font-mono-numbers font-bold text-[#0F172A] text-xs">{currentCurrencyItem.symbol}</span>
        <span className="font-bold uppercase text-[#0F172A] text-[11px]">{currentCurrencyItem.code}</span>
        <ChevronDown className={`w-3 h-3 text-[#64748B] transition-transform duration-150 ${isOpen ? 'rotate-180 text-[#F97316]' : ''}`} />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div 
          id="currency-dropdown-menu"
          className="absolute right-0 mt-1.5 w-60 bg-white border border-[#E2E8F0] rounded-[10px] shadow-xl z-50 overflow-hidden py-1 animate-fadeIn divide-y divide-[#E2E8F0]"
          role="menu"
        >
          <div className="px-3 py-1.5 text-[10px] font-bold text-[#64748B] uppercase tracking-wider bg-[#F8FAFC]">
            Select Currency
          </div>

          <div className="py-1">
            {SUPPORTED_CURRENCIES.map((c) => {
              const isSelected = currency === c.code;
              return (
                <button
                  key={c.code}
                  id={`currency-select-${c.code.toLowerCase()}`}
                  type="button"
                  onClick={() => handleSelect(c.code)}
                  className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between transition-colors cursor-pointer ${
                    isSelected ? 'bg-[#FFF7ED] text-[#F97316] font-bold border-l-2 border-[#F97316]' : 'text-[#0F172A] hover:bg-[#FFF7ED] font-medium'
                  }`}
                  role="menuitem"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span className="text-sm leading-none shrink-0">{c.flag}</span>
                    <div className="truncate">
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-[#0F172A]">{c.code}</span>
                        <span className="text-[#475569] font-normal">({c.symbol})</span>
                      </div>
                      <span className="block text-[11px] text-[#64748B] truncate font-normal">
                        {c.name}
                      </span>
                    </div>
                  </div>
                  {isSelected && <Check className="w-3.5 h-3.5 text-[#F97316] shrink-0 ml-2" />}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
