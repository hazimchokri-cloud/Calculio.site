import React from 'react';
import { Sparkles, ExternalLink, ShieldCheck, Layers, ArrowUpRight } from 'lucide-react';

export type AdSlotType = 
  | 'header-banner' 
  | 'in-content' 
  | 'sidebar' 
  | 'footer-banner'
  | 'banner'   // legacy compatibility
  | 'card'
  | 'inline';

interface AdSlotProps {
  type?: AdSlotType;
  slotId?: string;
  className?: string;
  adClient?: string;
  showPlaceholderInfo?: boolean;
}

export const AdSlot: React.FC<AdSlotProps> = ({ 
  type = 'in-content',
  slotId,
  className = '',
  adClient = 'ca-pub-XXXXXXXXXXXXXXXX'
}) => {
  // Normalize type
  const normalizedType: 'header-banner' | 'in-content' | 'sidebar' | 'footer-banner' = 
    type === 'header-banner' || type === 'banner' ? 'header-banner'
    : type === 'sidebar' || type === 'card' ? 'sidebar'
    : type === 'footer-banner' ? 'footer-banner'
    : 'in-content';

  const defaultSlotIds: Record<string, string> = {
    'header-banner': '9182736450',
    'in-content': '5463728190',
    'sidebar': '3829104756',
    'footer-banner': '7261549382'
  };

  const currentSlotId = slotId || defaultSlotIds[normalizedType];

  /*
   * -------------------------------------------------------------
   * GOOGLE ADSENSE INTEGRATION NOTE:
   * To deploy with live Google AdSense ads, replace the inner placeholder
   * with the standard AdSense script tag and <ins> markup:
   *
   * <ins className="adsbygoogle"
   *      style={{ display: 'block' }}
   *      data-ad-client={adClient}
   *      data-ad-slot={currentSlotId}
   *      data-ad-format="auto"
   *      data-full-width-responsive="true"></ins>
   * -------------------------------------------------------------
   */

  // 1. HEADER BANNER AD (728x90 Leaderboard / 970x90 Super Leaderboard / Responsive)
  if (normalizedType === 'header-banner') {
    return (
      <aside 
        id={`ad-slot-header-${currentSlotId}`}
        aria-label="Header Advertisement Banner"
        className={`w-full max-w-7xl mx-auto my-3 transition-all ${className}`}
      >
        <div className="flex items-center justify-between px-2 pb-1 text-[10px] font-semibold uppercase tracking-wider text-[#94A3B8]">
          <span>Advertisement</span>
          <span className="text-[9px] font-mono text-[#94A3B8]">728×90 Responsive</span>
        </div>

        <div className="relative rounded-xl border border-dashed border-[#CBD5E1] bg-[#F8FAFC] p-3.5 sm:p-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-[#94A3B8]">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-8 h-8 rounded-lg bg-[#FFFFFF] border border-[#CBD5E1] flex items-center justify-center shrink-0 text-[#94A3B8]">
              <Sparkles className="w-4 h-4 text-[#94A3B8]" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-[9px] font-bold uppercase px-1.5 py-0.5 rounded bg-[#FFFFFF] text-[#64748B] border border-[#CBD5E1]">
                  Ad
                </span>
                <h4 className="text-xs font-semibold text-[#475569] truncate">
                  Smart Financial Planning & Rate Comparison
                </h4>
              </div>
              <p className="text-[11px] text-[#64748B] mt-0.5 line-clamp-1">
                Compare verified mortgage rates, high-yield savings APYs, and personal loan options.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => window.open('https://google.com', '_blank', 'noopener,noreferrer')}
              className="px-3 py-1.5 bg-[#FFFFFF] hover:bg-[#FFF7ED] hover:text-[#F97316] hover:border-[#F97316] text-[#475569] text-xs font-semibold rounded-lg border border-[#CBD5E1] transition-all flex items-center gap-1 cursor-pointer"
            >
              <span>Explore</span>
              <ArrowUpRight className="w-3 h-3 text-[#94A3B8]" />
            </button>
          </div>
        </div>
      </aside>
    );
  }

  // 2. SIDEBAR AD (300x250 Medium Rectangle or 300x600 Half-Page Skyscraper)
  if (normalizedType === 'sidebar') {
    return (
      <aside 
        id={`ad-slot-sidebar-${currentSlotId}`}
        aria-label="Sidebar Desktop Advertisement"
        className={`w-full transition-all ${className}`}
      >
        <div className="flex items-center justify-between px-1 pb-1 text-[10px] font-semibold uppercase tracking-wider text-[#94A3B8]">
          <span>Sponsored Ad</span>
          <span className="text-[9px] font-mono text-[#94A3B8]">300×250</span>
        </div>

        <div className="p-4 rounded-xl bg-[#F8FAFC] border border-dashed border-[#CBD5E1] text-[#94A3B8] space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="text-[9px] font-bold uppercase tracking-wide bg-[#FFFFFF] text-[#64748B] border border-[#CBD5E1] px-1.5 py-0.5 rounded">
              Partner
            </span>
            <span className="text-[9px] font-mono text-[#94A3B8]">Slot: #{currentSlotId.slice(-4)}</span>
          </div>

          <div className="space-y-1">
            <h5 className="text-xs font-semibold text-[#475569] leading-snug">
              High-Yield Savings & CD Rate Comparison
            </h5>
            <p className="text-[11px] text-[#64748B] leading-relaxed">
              Earn competitive APY on emergency funds with FDIC-insured accounts and transparent terms.
            </p>
          </div>

          <div className="pt-1">
            <button
              type="button"
              onClick={() => window.open('https://google.com', '_blank', 'noopener,noreferrer')}
              className="w-full py-1.5 bg-[#FFFFFF] hover:bg-[#FFF7ED] hover:text-[#F97316] hover:border-[#F97316] text-[#475569] text-xs font-semibold rounded-lg border border-[#CBD5E1] transition-all text-center flex items-center justify-center gap-1 cursor-pointer"
            >
              <span>View Rates</span>
              <ArrowUpRight className="w-3 h-3 text-[#94A3B8]" />
            </button>
          </div>

          <div className="pt-1.5 border-t border-[#E2E8F0] flex items-center justify-center text-[9px] text-[#94A3B8] gap-1">
            <ShieldCheck className="w-3 h-3 text-[#94A3B8]" />
            <span>AdSense Placement</span>
          </div>
        </div>
      </aside>
    );
  }

  // 3. IN-CONTENT AD (Fluid Native / 728x90 In-Article Banner)
  if (normalizedType === 'in-content') {
    return (
      <aside 
        id={`ad-slot-incontent-${currentSlotId}`}
        aria-label="In-Content Advertisement"
        className={`w-full my-4 transition-all ${className}`}
      >
        <div className="flex items-center justify-between px-2 pb-1 text-[10px] font-semibold uppercase tracking-wider text-[#94A3B8]">
          <span>Advertisement</span>
          <span className="text-[9px] font-mono text-[#94A3B8]">Fluid In-Article</span>
        </div>

        <div className="rounded-xl border border-dashed border-[#CBD5E1] bg-[#F8FAFC] p-3.5 sm:p-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-[#94A3B8]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#FFFFFF] border border-[#CBD5E1] flex items-center justify-center shrink-0 text-[#94A3B8]">
              <Layers className="w-4 h-4 text-[#94A3B8]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[9px] font-bold text-[#64748B] bg-[#FFFFFF] px-1.5 py-0.5 rounded border border-[#CBD5E1]">
                  Ad
                </span>
                <span className="text-xs font-semibold text-[#475569]">
                  Automated Budgeting & Loan Calculators
                </span>
              </div>
              <p className="text-[11px] text-[#64748B] mt-0.5">
                Optimize payoff timelines and track financial milestones with real-time sync.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => window.open('https://google.com', '_blank', 'noopener,noreferrer')}
            className="shrink-0 px-3 py-1.5 bg-[#FFFFFF] hover:bg-[#FFF7ED] text-[#475569] hover:text-[#F97316] hover:border-[#F97316] border border-[#CBD5E1] text-xs font-semibold rounded-lg transition-colors flex items-center gap-1 cursor-pointer"
          >
            <span>Learn More</span>
            <ExternalLink className="w-3 h-3 text-[#94A3B8]" />
          </button>
        </div>
      </aside>
    );
  }

  // 4. FOOTER BANNER AD (728x90 Leaderboard / Bottom Sticky or Anchored Banner)
  return (
    <aside 
      id={`ad-slot-footer-${currentSlotId}`}
      aria-label="Footer Advertisement Banner"
      className={`w-full max-w-7xl mx-auto my-4 transition-all ${className}`}
    >
      <div className="flex items-center justify-between px-2 pb-1 text-[10px] font-semibold uppercase tracking-wider text-[#94A3B8]">
        <span>Advertisement</span>
        <span className="text-[9px] font-mono text-[#94A3B8]">Leaderboard</span>
      </div>

      <div className="rounded-xl border border-dashed border-[#CBD5E1] bg-[#F8FAFC] text-[#94A3B8] p-3.5 sm:p-4 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#FFFFFF] border border-[#CBD5E1] flex items-center justify-center shrink-0 text-[#94A3B8]">
            <Sparkles className="w-4 h-4 text-[#94A3B8]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[9px] font-bold uppercase tracking-wider text-[#64748B] bg-[#FFFFFF] px-1.5 py-0.5 rounded border border-[#CBD5E1]">
                Sponsor
              </span>
              <h4 className="text-xs font-semibold text-[#475569]">
                Zero-Fee Investment & Portfolio Management
              </h4>
            </div>
            <p className="text-[11px] text-[#64748B] mt-0.5">
              Build a diversified long-term portfolio with automatic dividend reinvestment and clear fee structures.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => window.open('https://google.com', '_blank', 'noopener,noreferrer')}
          className="shrink-0 px-3 py-1.5 bg-[#FFFFFF] hover:bg-[#FFF7ED] hover:text-[#F97316] hover:border-[#F97316] text-[#475569] text-xs font-semibold rounded-lg border border-[#CBD5E1] transition-all flex items-center gap-1 cursor-pointer"
        >
          <span>Get Started</span>
          <ArrowUpRight className="w-3 h-3 text-[#94A3B8]" />
        </button>
      </div>
    </aside>
  );
};
