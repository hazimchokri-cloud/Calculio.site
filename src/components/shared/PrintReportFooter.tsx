import React from 'react';

interface PrintReportFooterProps {
  category?: string;
}

export const PrintReportFooter: React.FC<PrintReportFooterProps> = ({ category }) => {
  const currentYear = new Date().getFullYear();

  return (
    <div className="hidden print:block mt-12 pt-6 border-t-2 border-[#E2E8F0] space-y-2 text-center">
      <div className="text-xs font-bold text-[#0F172A]">
        Calculio — Transparent, Free & Accurate Calculation Tools
      </div>
      <p className="text-[10px] text-[#64748B] max-w-xl mx-auto leading-relaxed">
        {category === 'health'
          ? 'Notice: Calculations are based on standard clinical and physiological formulas for educational modeling. They do not constitute formal medical diagnosis or prescription.'
          : category === 'tax' || category === 'financial' || category === 'real-estate'
          ? 'Notice: Mathematical calculations are estimates for informational and planning purposes only. Consult a certified financial planner, CPA, or mortgage advisor for statutory decisions.'
          : 'Notice: Calculations are computed using standard mathematical and scientific models. Always verify mission-critical parameters independently.'}
      </p>
      <div className="text-[10px] text-[#94A3B8] font-mono">
        © {currentYear} Calculio (https://calculio.site) • All rights reserved.
      </div>
    </div>
  );
};
