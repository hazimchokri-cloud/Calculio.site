import React, { useState } from 'react';
import { 
  AffiliateOffer, 
  AFFILIATE_OFFERS, 
  getOffersForCalculator, 
  getOffersForCategory 
} from '../../data/affiliateOffers';
import { 
  Sparkles, 
  Star, 
  CheckCircle2, 
  ArrowUpRight, 
  ShieldCheck, 
  Info,
  DollarSign,
  HeartPulse,
  Building2,
  Lock
} from 'lucide-react';

interface AffiliateOffersSectionProps {
  calculatorId?: string;
  categoryId?: string;
  title?: string;
  subtitle?: string;
  showCategoryFilters?: boolean;
  limit?: number;
  layout?: 'grid' | 'cards' | 'compact-sidebar';
}

export const AffiliateOffersSection: React.FC<AffiliateOffersSectionProps> = ({
  calculatorId,
  categoryId,
  title,
  subtitle,
  showCategoryFilters = false,
  limit,
  layout = 'grid'
}) => {
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'loan' | 'financial' | 'insurance' | 'health'>('all');

  // Determine which offers to show
  let offers: AffiliateOffer[] = [];
  if (calculatorId) {
    offers = getOffersForCalculator(calculatorId);
  } else if (categoryId) {
    offers = getOffersForCategory(categoryId);
  } else {
    offers = AFFILIATE_OFFERS;
  }

  if (selectedFilter !== 'all') {
    offers = offers.filter(o => o.category === selectedFilter);
  }

  if (limit) {
    offers = offers.slice(0, limit);
  }

  if (offers.length === 0) {
    offers = AFFILIATE_OFFERS.slice(0, 3);
  }

  const defaultTitle = calculatorId
    ? 'Recommended Financial & Health Solutions'
    : 'Top Verified Partner Offers & Rates';

  const defaultSubtitle = 'Handpicked services and tools to help you execute on your calculation results.';

  const getCategoryBadge = (category: AffiliateOffer['category']) => {
    switch (category) {
      case 'loan':
        return { label: 'Loan Offer', bg: 'bg-[#FFF7ED] text-[#9A3412] border-[#FDBA74]' };
      case 'financial':
        return { label: 'Financial Product', bg: 'bg-[#FFF7ED] text-[#F97316] border-[#FDBA74]' };
      case 'insurance':
        return { label: 'Insurance Quote', bg: 'bg-[#FFF7ED] text-[#EA580C] border-[#FDBA74]' };
      case 'health':
        return { label: 'Health & Fitness', bg: 'bg-[#FFF7ED] text-[#F97316] border-[#FDBA74]' };
      default:
        return { label: 'Partner Offer', bg: 'bg-[#F8FAFC] text-[#0F172A] border-[#E2E8F0]' };
    }
  };

  // Compact sidebar variant
  if (layout === 'compact-sidebar') {
    return (
      <aside 
        id="sidebar-affiliate-recommendations" 
        aria-label="Partner Recommendations"
        className="rounded-2xl border border-[#E2E8F0] bg-[#FFFFFF] p-4 shadow-xs space-y-4"
      >
        <div className="flex items-center justify-between pb-2 border-b border-[#E2E8F0]">
          <div className="flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-[#F97316]" />
            <h4 className="text-xs font-bold text-[#0F172A] uppercase tracking-wide">
              {title || 'Top Partner Deals'}
            </h4>
          </div>
          <span className="text-[9px] font-semibold text-[#64748B] uppercase tracking-wider">
            Sponsored
          </span>
        </div>

        <div className="space-y-3">
          {offers.slice(0, 2).map(offer => {
            const badge = getCategoryBadge(offer.category);
            return (
              <div 
                key={offer.id} 
                className="p-3 rounded-xl bg-[#F8FAFC] hover:bg-[#FFF7ED] border border-[#E2E8F0] hover:border-[#FDBA74] transition-all space-y-2 group"
              >
                <div className="flex items-center justify-between">
                  <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded border ${badge.bg}`}>
                    {offer.badge || badge.label}
                  </span>
                  <div className="flex items-center gap-0.5 text-[10px] font-bold text-[#F97316]">
                    <Star className="w-3 h-3 fill-[#F97316] text-[#F97316]" />
                    <span>{offer.rating}</span>
                  </div>
                </div>

                <div>
                  <h5 className="text-xs font-bold text-[#0F172A] group-hover:text-[#F97316] transition-colors line-clamp-1">
                    {offer.title}
                  </h5>
                  <p className="text-[11px] font-semibold text-[#9A3412] mt-0.5">
                    {offer.highlight}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => window.open(offer.ctaUrl, '_blank', 'noopener,noreferrer')}
                  className="w-full py-1.5 px-2.5 rounded-lg bg-[#F97316] hover:bg-[#EA580C] text-white text-[11px] font-bold transition-all flex items-center justify-center gap-1 shadow-2xs cursor-pointer"
                >
                  <span>{offer.ctaText}</span>
                  <ArrowUpRight className="w-3 h-3" />
                </button>
              </div>
            );
          })}
        </div>

        <div className="pt-2 border-t border-[#E2E8F0] flex items-center justify-center text-[10px] text-[#64748B] gap-1">
          <ShieldCheck className="w-3 h-3 text-[#F97316]" />
          <span>Verified Partner Offers</span>
        </div>
      </aside>
    );
  }

  // Full Grid / Card Variant
  return (
    <section 
      id="affiliate-offers-module" 
      aria-label="Recommended Partner Offers and Services"
      className="w-full my-8 py-2"
    >
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Sparkles className="w-4 h-4 text-[#F97316]" />
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#F97316]">
              Featured Opportunities & Savings
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-extrabold text-[#0F172A] tracking-tight">
            {title || defaultTitle}
          </h3>
          <p className="text-xs sm:text-sm text-[#475569] mt-1 max-w-2xl">
            {subtitle || defaultSubtitle}
          </p>
        </div>

        {/* Affiliate Disclosure Pill */}
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#F8FAFC] text-[#64748B] text-[10px] font-medium border border-[#E2E8F0] shrink-0 self-start sm:self-auto">
          <Info className="w-3 h-3 text-[#64748B]" />
          <span>Sponsored / Affiliate Partnerships</span>
        </div>
      </div>

      {/* Optional Category Filter Pills */}
      {showCategoryFilters && (
        <div className="flex flex-wrap items-center gap-2 mb-6" role="tablist">
          <button
            onClick={() => setSelectedFilter('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              selectedFilter === 'all'
                ? 'bg-[#F97316] text-white shadow-xs'
                : 'bg-[#FFFFFF] hover:bg-[#FFF7ED] text-[#475569] border border-[#E2E8F0]'
            }`}
          >
            All Offers
          </button>
          <button
            onClick={() => setSelectedFilter('loan')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              selectedFilter === 'loan'
                ? 'bg-[#F97316] text-white shadow-xs'
                : 'bg-[#FFFFFF] hover:bg-[#FFF7ED] text-[#9A3412] border border-[#E2E8F0]'
            }`}
          >
            Loan Offers
          </button>
          <button
            onClick={() => setSelectedFilter('financial')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              selectedFilter === 'financial'
                ? 'bg-[#F97316] text-white shadow-xs'
                : 'bg-[#FFFFFF] hover:bg-[#FFF7ED] text-[#F97316] border border-[#E2E8F0]'
            }`}
          >
            Financial Products
          </button>
          <button
            onClick={() => setSelectedFilter('insurance')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              selectedFilter === 'insurance'
                ? 'bg-[#F97316] text-white shadow-xs'
                : 'bg-[#FFFFFF] hover:bg-[#FFF7ED] text-[#EA580C] border border-[#E2E8F0]'
            }`}
          >
            Insurance Quotes
          </button>
          <button
            onClick={() => setSelectedFilter('health')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              selectedFilter === 'health'
                ? 'bg-[#F97316] text-white shadow-xs'
                : 'bg-[#FFFFFF] hover:bg-[#FFF7ED] text-[#F97316] border border-[#E2E8F0]'
            }`}
          >
            Health & Fitness Tech
          </button>
        </div>
      )}

      {/* Offers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {offers.map(offer => {
          const badge = getCategoryBadge(offer.category);
          return (
            <div
              key={offer.id}
              className={`rounded-2xl border bg-[#FFFFFF] p-5 sm:p-6 transition-all hover:shadow-md flex flex-col justify-between ${
                offer.featured
                  ? 'border-[#F97316] ring-1 ring-[#F97316]/30 shadow-xs'
                  : 'border-[#E2E8F0] shadow-2xs'
              }`}
            >
              <div className="space-y-4">
                {/* Header: Badge & Rating */}
                <div className="flex items-center justify-between gap-2">
                  <span className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-md border ${badge.bg}`}>
                    {offer.badge || badge.label}
                  </span>
                  
                  <div className="flex items-center gap-1 bg-[#F8FAFC] px-2 py-0.5 rounded-md border border-[#E2E8F0] text-[#9A3412] text-xs font-bold">
                    <Star className="w-3.5 h-3.5 fill-[#F97316] text-[#F97316]" />
                    <span>{offer.rating}</span>
                    <span className="text-[10px] text-[#64748B] font-normal">({(offer.reviewCount / 1000).toFixed(1)}k)</span>
                  </div>
                </div>

                {/* Title & Provider */}
                <div>
                  <span className="text-[11px] font-bold text-[#64748B] uppercase tracking-wider block">
                    {offer.provider}
                  </span>
                  <h4 className="text-base font-extrabold text-[#0F172A] mt-0.5 leading-snug">
                    {offer.title}
                  </h4>
                </div>

                {/* Highlight Callout */}
                <div className="p-3 rounded-xl bg-[#FFF7ED] border border-[#FDBA74]">
                  <span className="text-xs font-black text-[#9A3412] block">
                    {offer.highlight}
                  </span>
                  <p className="text-xs text-[#475569] mt-1 leading-relaxed">
                    {offer.description}
                  </p>
                </div>

                {/* Bulleted Features */}
                <ul className="space-y-1.5 pt-1">
                  {offer.keyFeatures.map((feat, fIdx) => (
                    <li key={fIdx} className="flex items-start gap-2 text-xs text-[#475569]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#F97316] mt-0.5 shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Bottom CTA Action */}
              <div className="pt-5 mt-4 border-t border-[#E2E8F0] space-y-2">
                <button
                  type="button"
                  onClick={() => window.open(offer.ctaUrl, '_blank', 'noopener,noreferrer')}
                  className="w-full py-2.5 px-4 bg-[#F97316] hover:bg-[#EA580C] text-white text-xs sm:text-sm font-bold rounded-xl transition-all shadow-xs flex items-center justify-center gap-2 active:scale-98 cursor-pointer"
                >
                  <span>{offer.ctaText}</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>

                {offer.terms && (
                  <p className="text-[10px] text-[#64748B] text-center leading-tight">
                    {offer.terms}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
