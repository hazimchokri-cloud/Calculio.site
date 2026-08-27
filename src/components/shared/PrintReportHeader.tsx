import React from 'react';
import { Calculator } from 'lucide-react';

interface PrintReportHeaderProps {
  title: string;
  category?: string;
  description?: string;
  type?: 'calculator' | 'article' | 'report';
  author?: string;
  date?: string;
}

export const PrintReportHeader: React.FC<PrintReportHeaderProps> = ({
  title,
  category,
  description,
  type = 'calculator',
  author,
  date
}) => {
  const currentUrl = typeof window !== 'undefined' ? window.location.href : 'https://calculio.site';
  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  return (
    <div className="hidden print:block mb-8 pb-6 border-b-2 border-[#0F172A] space-y-4">
      {/* Top Brand Bar */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-[#0F172A] text-white flex items-center justify-center font-black text-base">
            C
          </div>
          <div>
            <div className="text-xl font-extrabold tracking-tight text-[#0F172A]">
              Calcul<span className="text-[#F97316]">io</span>
            </div>
            <div className="text-[10px] uppercase font-bold tracking-wider text-[#64748B]">
              Precision Online Calculation & Financial Tools
            </div>
          </div>
        </div>

        <div className="text-right">
          <div className="text-xs font-bold text-[#0F172A]">Official Calculation Report</div>
          <div className="text-[11px] text-[#64748B]">Generated: {date || currentDate}</div>
        </div>
      </div>

      {/* Report Info Banner */}
      <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl p-4 flex items-start justify-between gap-4">
        <div className="space-y-1">
          {category && (
            <span className="inline-block text-[10px] font-extrabold uppercase tracking-wider text-[#F97316] bg-[#F97316]/10 px-2 py-0.5 rounded border border-[#F97316]/20">
              {category}
            </span>
          )}
          <h1 className="text-xl font-black text-[#0F172A] tracking-tight">
            {title}
          </h1>
          {description && (
            <p className="text-xs text-[#475569] leading-relaxed max-w-2xl">
              {description}
            </p>
          )}
          {author && (
            <div className="text-[11px] font-semibold text-[#64748B]">
              Author / Analyst: {author}
            </div>
          )}
        </div>

        <div className="text-right text-[10px] font-mono text-[#64748B] shrink-0 max-w-[200px] truncate">
          <div>Source URL:</div>
          <div className="text-[#F97316] underline truncate">{currentUrl}</div>
        </div>
      </div>
    </div>
  );
};
