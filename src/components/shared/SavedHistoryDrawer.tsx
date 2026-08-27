import React from 'react';
import { X, Trash2, Clock, Bookmark, ArrowRight } from 'lucide-react';
import { SavedCalculation } from '../../types';
import { useLanguage } from '../../i18n/LanguageContext';

interface SavedHistoryDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  savedCalculations: SavedCalculation[];
  onClearAll: () => void;
  onSelectCalculation: (calc: SavedCalculation) => void;
}

export const SavedHistoryDrawer: React.FC<SavedHistoryDrawerProps> = ({
  isOpen,
  onClose,
  savedCalculations,
  onClearAll,
  onSelectCalculation
}) => {
  const { t, language } = useLanguage();
  if (!isOpen) return null;

  const dateLocale = language === 'fr' ? 'fr-FR' : 'en-US';

  return (
    <div className="fixed inset-0 z-50 bg-[#0F172A]/50 backdrop-blur-sm flex justify-end animate-in fade-in duration-200">
      <div
        className="w-full max-w-md bg-[#FFFFFF] h-full shadow-2xl flex flex-col justify-between border-l border-[#E2E8F0]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="p-5 border-b border-[#E2E8F0] flex items-center justify-between bg-[#FFFFFF]">
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-[#F97316]" />
            <div>
              <h3 className="text-base font-bold text-[#0F172A]">{t('nav.savedCalculations', 'Calculation History')}</h3>
              <p className="text-xs text-[#64748B]">{t('common.locallySaved', 'Locally saved calculation results')}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-[#F8FAFC] text-[#64748B] hover:text-[#0F172A] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* List Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-[#F8FAFC]">
          {savedCalculations.length === 0 ? (
            <div className="py-20 text-center text-[#64748B] text-xs space-y-2">
              <Bookmark className="w-10 h-10 mx-auto text-[#E2E8F0] stroke-[1.5]" />
              <p className="font-semibold text-[#0F172A]">{t('common.noSavedCalculations', 'No calculations saved yet.')}</p>
              <p className="text-[11px] text-[#64748B] max-w-xs mx-auto">
                {t('common.saveHint', 'Click "Save Result" on any calculator to pin your figures for future sessions.')}
              </p>
            </div>
          ) : (
            savedCalculations.map((item) => (
              <div
                key={item.id}
                onClick={() => {
                  onSelectCalculation(item);
                  onClose();
                }}
                className="p-4 rounded-xl border border-[#E2E8F0] hover:border-[#FDBA74] hover:bg-[#FFF7ED] bg-[#FFFFFF] transition-all cursor-pointer space-y-2 group shadow-2xs"
              >
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-[#0F172A] group-hover:text-[#F97316] transition-colors">
                    {item.calculatorName}
                  </span>
                  <span className="text-[10px] text-[#64748B] font-mono-numbers">
                    {new Date(item.timestamp).toLocaleDateString(dateLocale, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>

                <p className="text-xs text-[#475569] font-medium line-clamp-2">
                  {item.summary}
                </p>

                <div className="flex items-center justify-end text-[11px] font-bold text-[#F97316] gap-1 group-hover:translate-x-0.5 transition-transform">
                  <span>{t('common.launch', 'Open Calculator')}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            ))
          )}
        </div>

        {/* Drawer Footer */}
        {savedCalculations.length > 0 && (
          <div className="p-4 border-t border-[#E2E8F0] bg-[#FFFFFF] flex items-center justify-between">
            <button
              onClick={onClearAll}
              className="text-xs text-[#DC2626] hover:text-red-700 font-semibold flex items-center gap-1.5 cursor-pointer"
            >
              <Trash2 className="w-4 h-4" />
              {t('common.clearAll', 'Clear History')}
            </button>
            <span className="text-xs text-[#64748B] font-mono-numbers">
              {savedCalculations.length} {t('common.saved', 'saved')}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
