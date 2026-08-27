import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext';
import { SUPPORTED_LANGUAGES } from '../../i18n/types';

interface LanguageSwitcherProps {
  variant?: 'compact' | 'full' | 'dropdown';
  className?: string;
}

export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({
  variant = 'dropdown',
  className = ''
}) => {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentLangObj = SUPPORTED_LANGUAGES.find(l => l.code === language) || SUPPORTED_LANGUAGES[0];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (variant === 'compact') {
    return (
      <div className={`flex items-center bg-[#F8FAFC] p-0.5 rounded-[8px] border border-[#E2E8F0] ${className}`}>
        {SUPPORTED_LANGUAGES.map((lang) => (
          <button
            key={lang.code}
            id={`lang-btn-${lang.code}`}
            type="button"
            onClick={() => setLanguage(lang.code)}
            className={`px-2.5 py-1 text-sm font-bold rounded-[6px] transition-all flex items-center gap-1 cursor-pointer ${
              language === lang.code
                ? 'bg-[#FFEDD5] text-[#9A3412] border border-[#FDBA74] shadow-xs'
                : 'text-[#475569] hover:text-[#0F172A]'
            }`}
            title={`Switch to ${lang.label}`}
          >
            <span>{lang.flag}</span>
            <span>{lang.code.toUpperCase()}</span>
          </button>
        ))}
      </div>
    );
  }

  return (
    <div ref={dropdownRef} className={`relative inline-block text-left ${className}`}>
      <button
        id="language-switcher-button"
        type="button"
        onClick={() => setIsOpen(prev => !prev)}
        className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold text-[#0F172A] bg-[#F8FAFC] hover:bg-[#FFF7ED] border border-[#E2E8F0] hover:border-[#FDBA74] rounded-[8px] transition-colors cursor-pointer shadow-xs focus:outline-none focus:ring-2 focus:ring-[#F97316]/20"
        aria-haspopup="true"
        aria-expanded={isOpen}
        aria-label="Change Language"
      >
        <span className="text-sm leading-none">{currentLangObj.flag}</span>
        <span className="font-bold uppercase text-[11px] text-[#0F172A]">{currentLangObj.code}</span>
        <ChevronDown className={`w-3 h-3 text-[#64748B] transition-transform ${isOpen ? 'rotate-180 text-[#F97316]' : ''}`} />
      </button>

      {isOpen && (
        <div 
          id="language-dropdown-menu"
          className="absolute right-0 mt-1.5 w-44 bg-white border border-[#E2E8F0] rounded-[10px] shadow-xl z-50 overflow-hidden py-1 animate-fadeIn"
          role="menu"
        >
          <div className="px-3 py-1.5 text-[10px] font-bold text-[#64748B] uppercase tracking-wider border-b border-[#E2E8F0] bg-[#F8FAFC]">
            Select Language
          </div>
          {SUPPORTED_LANGUAGES.map((lang) => {
            const isSelected = language === lang.code;
            return (
              <button
                key={lang.code}
                id={`lang-select-${lang.code}`}
                type="button"
                onClick={() => {
                  setLanguage(lang.code);
                  setIsOpen(false);
                }}
                className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between transition-colors cursor-pointer ${
                  isSelected ? 'bg-[#FFF7ED] text-[#F97316] font-bold border-l-2 border-[#F97316]' : 'text-[#0F172A] hover:bg-[#FFF7ED] font-medium'
                }`}
                role="menuitem"
              >
                <div className="flex items-center gap-2">
                  <span className="text-sm leading-none">{lang.flag}</span>
                  <div>
                    <span className="block text-[#0F172A]">{lang.nativeLabel}</span>
                    <span className="block text-[10px] text-[#475569] font-normal">{lang.label}</span>
                  </div>
                </div>
                {isSelected && <Check className="w-3.5 h-3.5 text-[#F97316] shrink-0" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
