import React, { useState } from 'react';
import { 
  Clock, 
  Calendar, 
  Share2, 
  Printer, 
  Check, 
  ArrowRight, 
  Calculator, 
  Sparkles, 
  BookOpen, 
  HelpCircle, 
  Tag, 
  ShieldCheck,
  ChevronDown
} from 'lucide-react';
import { BlogPost, CalculatorMeta } from '../../types';
import { Breadcrumbs } from '../shared/Breadcrumbs';
import { AdSlot } from '../shared/AdSlot';
import { AffiliateOffersSection } from '../shared/AffiliateOffersSection';
import { ShareModal } from '../shared/ShareModal';
import { PrintReportHeader } from '../shared/PrintReportHeader';
import { PrintReportFooter } from '../shared/PrintReportFooter';
import { useLanguage } from '../../i18n/LanguageContext';

const FALLBACK_BLOG_IMAGE = 'https://images.unsplash.com/photo-1554224154-26032ffc0d07?auto=format&fit=crop&w=1200&h=675&q=80';
const FALLBACK_AVATAR = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80';

interface BlogPostViewProps {
  post: BlogPost;
  onSelectPost: (slug: string) => void;
  onSelectCalculator: (calculatorId: string) => void;
  onSelectCategory: (categoryId: string) => void;
  onGoToBlogList: () => void;
  onGoHome: () => void;
}

export const BlogPostView: React.FC<BlogPostViewProps> = ({
  post,
  onSelectPost,
  onSelectCalculator,
  onSelectCategory,
  onGoToBlogList,
  onGoHome
}) => {
  const { t, getBlogPost, calculators, blogPosts, language } = useLanguage();
  const localizedPost = getBlogPost(post.slug) || post;
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Related calculators
  const relatedCalculators = localizedPost.relatedCalculatorIds
    .map(id => calculators.find(c => c.id === id))
    .filter(Boolean) as CalculatorMeta[];

  // Related posts
  const relatedPosts = (localizedPost.relatedBlogSlugs || [])
    .map(slug => blogPosts.find(p => p.slug === slug))
    .filter(Boolean) as BlogPost[];

  const getMatchingCategory = (cat: string) => {
    if (cat === 'finance' || cat === 'financial') return 'financial';
    if (cat === 'health-fitness' || cat === 'fitness-health') return 'fitness-health';
    if (cat === 'math' || cat === 'math-algebra') return 'math-algebra';
    if (cat === 'conversions' || cat === 'conversion') return 'conversion';
    if (cat === 'real-estate') return 'real-estate';
    if (cat === 'business') return 'business';
    if (cat === 'education' || cat === 'general-calculations') return 'math-algebra';
    return 'financial';
  };

  const handleShare = () => {
    setIsShareOpen(true);
  };

  const handlePrint = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    if (typeof window !== 'undefined') {
      window.print();
    }
  };

  const dateLocale = language === 'fr' ? 'fr-FR' : 'en-US';

  const breadcrumbs = [
    { label: t('blog.title', 'Blog'), onClick: onGoToBlogList },
    { label: localizedPost.title, active: true }
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-6 sm:py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Printable Article Header (Print only) */}
        <PrintReportHeader
          title={localizedPost.title}
          category={localizedPost.categoryLabel}
          description={localizedPost.excerpt}
          author={`${localizedPost.author.name} (${localizedPost.author.role})`}
          date={new Date(localizedPost.publishedAt).toLocaleDateString(dateLocale, { month: 'long', day: 'numeric', year: 'numeric' })}
        />

        {/* Breadcrumbs Navigation */}
        <div className="no-print">
          <Breadcrumbs items={breadcrumbs} onGoHome={onGoHome} />
        </div>

        {/* Top Header Ad Placement */}
        <AdSlot type="header-banner" />

        {/* Article Header Container */}
        <header className="space-y-6 max-w-4xl">
          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={() => onSelectCategory(getMatchingCategory(localizedPost.category))}
              className="px-3.5 py-1.5 rounded-full bg-[#FFF7ED] hover:bg-[#FFEDD5] text-[#F97316] text-sm font-bold transition-colors border border-[#FDBA74] cursor-pointer"
            >
              {localizedPost.categoryLabel}
            </button>
            <span className="text-[#E2E8F0]">•</span>
            <span className="text-sm text-[#64748B] flex items-center gap-1">
              <Clock className="w-4 h-4 text-[#64748B]" />
              {localizedPost.readTimeMinutes} {t('blog.minRead', 'min read')}
            </span>
            <span className="text-[#E2E8F0]">•</span>
            <span className="text-sm text-[#64748B] flex items-center gap-1">
              <Calendar className="w-4 h-4 text-[#64748B]" />
              {t('blog.publishedOn', 'Published on')} {new Date(localizedPost.publishedAt).toLocaleDateString(dateLocale, { month: 'long', day: 'numeric', year: 'numeric' })}
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-[#0F172A] tracking-tight leading-[1.18]">
            {localizedPost.title}
          </h1>

          <p className="text-lg sm:text-xl text-[#475569] leading-relaxed">
            {localizedPost.excerpt}
          </p>

          {/* Author Byline Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 p-4 sm:p-5 rounded-2xl bg-[#FFFFFF] border border-[#E2E8F0] shadow-xs">
            <div className="flex items-center gap-3.5">
              <img
                src={localizedPost.author.avatar}
                alt={localizedPost.author.name}
                className="w-12 h-12 rounded-full object-cover border-2 border-[#FDBA74]"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  const target = e.currentTarget;
                  if (target.src !== FALLBACK_AVATAR) {
                    target.src = FALLBACK_AVATAR;
                  }
                }}
              />
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-base font-bold text-[#0F172A]">{localizedPost.author.name}</span>
                  <ShieldCheck className="w-4.5 h-4.5 text-[#F97316]" aria-label="Verified Author & Subject Matter Expert" />
                </div>
                <span className="text-sm text-[#475569] block">{localizedPost.author.role}</span>
                <span className="text-xs text-[#64748B] font-medium">{localizedPost.author.credentials}</span>
              </div>
            </div>

            {/* Actions: Share & Print */}
            <div className="flex items-center gap-2">
              <button
                id="blog-post-share-button"
                type="button"
                onClick={handleShare}
                aria-label={t('common.share', 'Share')}
                className="px-4 py-2 rounded-xl bg-[#FFFFFF] hover:bg-[#FFF7ED] text-[#0F172A] hover:text-[#F97316] text-sm font-semibold flex items-center gap-1.5 transition-colors border border-[#E2E8F0] hover:border-[#FDBA74] shadow-2xs active:scale-95 cursor-pointer"
              >
                <Share2 className="w-4 h-4 text-[#64748B]" />
                <span>{t('common.share', 'Share')}</span>
              </button>

              <button
                id="blog-post-print-button"
                type="button"
                onClick={handlePrint}
                aria-label={t('common.print', 'Print')}
                className="px-4 py-2 rounded-xl bg-[#F8FAFC] hover:bg-[#FFF7ED] text-[#0F172A] text-sm font-semibold flex items-center gap-1.5 transition-colors border border-[#E2E8F0] hover:border-[#FDBA74] cursor-pointer"
              >
                <Printer className="w-4 h-4 text-[#64748B]" />
                <span className="hidden sm:inline">{t('common.print', 'Print')}</span>
              </button>
            </div>
          </div>
        </header>

        {/* Featured Image */}
        <div className="w-full max-w-5xl rounded-3xl overflow-hidden shadow-md border border-[#E2E8F0] relative bg-[#F1F5F9]">
          <img
            src={localizedPost.coverImage}
            alt={localizedPost.imageAlt || localizedPost.title}
            className="w-full h-72 sm:h-96 lg:h-[440px] object-cover"
            referrerPolicy="no-referrer"
            onError={(e) => {
              const target = e.currentTarget;
              if (target.src !== FALLBACK_BLOG_IMAGE) {
                target.src = FALLBACK_BLOG_IMAGE;
              }
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
        </div>

        {/* Main Two-Column Layout: Article Body + Sticky Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 max-w-7xl">
          
          {/* Main Article Content Column (8 cols) */}
          <main className="lg:col-span-8 space-y-8">
            
            {/* Key Takeaways Card */}
            {localizedPost.keyTakeaways && localizedPost.keyTakeaways.length > 0 && (
              <div className="p-6 sm:p-7 rounded-3xl bg-[#FFF7ED] border border-[#FDBA74] shadow-xs space-y-3">
                <div className="flex items-center gap-2 text-[#9A3412] font-bold text-base">
                  <Sparkles className="w-4.5 h-4.5 text-[#F97316]" />
                  <span>{t('blog.keyTakeaways', 'Key Educational Takeaways')}</span>
                </div>
                <ul className="space-y-2.5">
                  {localizedPost.keyTakeaways.map((point, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-sm sm:text-base text-[#475569] leading-relaxed">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#F97316] mt-2 shrink-0" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* In-Content Jump Table of Contents (Mobile & Tablet) */}
            <div className="lg:hidden p-5 rounded-2xl bg-[#FFFFFF] border border-[#E2E8F0] space-y-2">
              <span className="text-sm font-bold text-[#0F172A] flex items-center gap-1.5">
                <BookOpen className="w-4 h-4 text-[#F97316]" />
                {t('blog.toc', 'Table of Contents')}
              </span>
              <div className="space-y-1">
                {localizedPost.sections.map((section, idx) => (
                  <a
                    key={section.id}
                    href={`#${section.id}`}
                    className="block text-sm text-[#475569] hover:text-[#F97316] py-1.5 border-b border-[#E2E8F0] last:border-0"
                  >
                    {idx + 1}. {section.title.replace(/^\d+\.\s*/, '')}
                  </a>
                ))}
              </div>
            </div>

            {/* Article Sections */}
            <div className="space-y-10">
              {localizedPost.sections.map((section, sectionIdx) => (
                <section key={section.id} id={section.id} className="space-y-4 scroll-mt-24">
                  <h2 className="text-2xl sm:text-3xl font-bold text-[#0F172A] tracking-tight border-b border-[#E2E8F0] pb-2.5">
                    {section.title}
                  </h2>

                  {/* Paragraphs */}
                  <div className="space-y-3.5 text-base sm:text-[17px] text-[#475569] leading-relaxed font-normal">
                    {section.content.map((paragraph, pIdx) => (
                      <p key={pIdx}>
                        {paragraph}
                      </p>
                    ))}
                  </div>

                  {/* Mathematical Formula Callout */}
                  {section.formula && (
                    <div className="p-6 rounded-2xl bg-[#FFFFFF] text-[#0F172A] shadow-xs space-y-3.5 border border-[#E2E8F0]">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-bold text-[#F97316] uppercase tracking-wider">
                          {t('blog.mathEquation', 'Mathematical Equation')}
                        </span>
                        <span className="text-xs text-[#64748B] font-mono">
                          {section.formula.description}
                        </span>
                      </div>

                      <div className="p-3.5 bg-[#F8FAFC] rounded-xl font-mono text-sm sm:text-base text-[#9A3412] overflow-x-auto text-center border border-[#E2E8F0] font-bold">
                        {section.formula.equation}
                      </div>

                      {section.formula.variables && (
                        <div className="pt-2.5 border-t border-[#E2E8F0] space-y-2">
                          <span className="text-xs font-bold text-[#64748B]">{t('blog.where', 'Where:')}</span>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                            {section.formula.variables.map((v, vIdx) => (
                              <div key={vIdx} className="flex items-center gap-2 text-[#475569]">
                                <span className="font-mono text-[#9A3412] font-bold bg-[#FFF7ED] px-1.5 py-0.5 rounded text-xs border border-[#FDBA74]">
                                  {v.symbol}
                                </span>
                                <span>= {v.meaning}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Callout Box */}
                  {section.callout && (
                    <div className={`p-5 sm:p-6 rounded-2xl border space-y-2 ${
                      section.callout.type === 'tip'
                        ? 'bg-[#FFF7ED] border-[#FDBA74] text-[#9A3412]'
                        : section.callout.type === 'example'
                        ? 'bg-[#FFF7ED] border-[#FDBA74] text-[#9A3412]'
                        : section.callout.type === 'warning'
                        ? 'bg-[#FEF2F2] border-[#FECACA] text-[#991B1B]'
                        : 'bg-[#F8FAFC] border-[#E2E8F0] text-[#0F172A]'
                    }`}>
                      <div className="flex items-center gap-2 font-bold text-sm sm:text-base">
                        <Sparkles className="w-4.5 h-4.5" />
                        <span>{section.callout.title}</span>
                      </div>
                      <p className="text-sm sm:text-base leading-relaxed whitespace-pre-line font-medium opacity-90">
                        {section.callout.text}
                      </p>
                    </div>
                  )}

                  {/* Structured Table */}
                  {section.table && (
                    <div className="overflow-x-auto rounded-2xl border border-[#E2E8F0] shadow-2xs my-5">
                      <table className="w-full text-left text-sm sm:text-base divide-y divide-[#E2E8F0]">
                        <thead className="bg-[#F8FAFC] text-[#0F172A] font-bold">
                          <tr>
                            {section.table.headers.map((h, hIdx) => (
                              <th key={hIdx} className="p-3.5 sm:p-4">
                                {h}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-[#E2E8F0] bg-[#FFFFFF]">
                          {section.table.rows.map((row, rIdx) => (
                            <tr key={rIdx} className="hover:bg-[#FFF7ED] transition-colors">
                              {row.map((cell, cIdx) => (
                                <td key={cIdx} className={`p-3.5 sm:p-4 text-[#475569] ${cIdx === 0 ? 'font-bold text-[#0F172A]' : ''}`}>
                                  {cell}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                      {section.table.caption && (
                        <div className="p-3 bg-[#F8FAFC] text-xs text-[#64748B] text-center border-t border-[#E2E8F0] font-medium">
                          {section.table.caption}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Mid-Article In-Content Native Ad Placement (after Section 2) */}
                  {sectionIdx === 1 && (
                    <div className="my-6">
                      <AdSlot type="in-content" />
                    </div>
                  )}
                </section>
              ))}
            </div>

            {/* Embedded Direct Interactive Related Calculators */}
            {relatedCalculators.length > 0 && (
              <div className="p-6 sm:p-8 rounded-3xl bg-[#FFFFFF] text-[#0F172A] space-y-5 shadow-xs border border-[#E2E8F0]">
                <div className="space-y-1.5">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFF7ED] text-[#F97316] text-xs font-bold border border-[#FDBA74]">
                    <Calculator className="w-4 h-4" />
                    <span>{t('blog.interactiveToolsBadge', 'Interactive Tools Mentioned in this Guide')}</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black text-[#0F172A]">
                    {t('blog.putFormulaToWork', 'Put This Formula to Work')}
                  </h3>
                  <p className="text-sm sm:text-base text-[#475569]">
                    {t('blog.calculatePersonalized', 'Calculate your exact personalized numbers with our free, verified calculation engines.')}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {relatedCalculators.map(calc => (
                    <div
                      key={calc.id}
                      onClick={() => onSelectCalculator(calc.id)}
                      className="p-4 rounded-2xl bg-[#F8FAFC] hover:bg-[#FFF7ED] border border-[#E2E8F0] hover:border-[#FDBA74] cursor-pointer transition-all flex items-center justify-between group"
                    >
                      <div className="space-y-1 min-w-0 pr-2">
                        <h4 className="font-bold text-base text-[#0F172A] group-hover:text-[#F97316] transition-colors truncate">
                          {calc.name}
                        </h4>
                        <p className="text-xs sm:text-sm text-[#475569] line-clamp-1">
                          {calc.shortDescription || calc.description}
                        </p>
                      </div>

                      <div className="w-9 h-9 rounded-xl bg-[#F97316] text-[#FFFFFF] flex items-center justify-center shrink-0 shadow-xs">
                        <ArrowRight className="w-4.5 h-4.5" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Author Detailed Bio Card */}
            <div className="p-6 sm:p-8 rounded-3xl bg-[#FFFFFF] border border-[#E2E8F0] shadow-xs flex flex-col sm:flex-row gap-5 items-start">
              <img
                src={localizedPost.author.avatar}
                alt={localizedPost.author.name}
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border border-[#E2E8F0] shrink-0"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  const target = e.currentTarget;
                  if (target.src !== FALLBACK_AVATAR) {
                    target.src = FALLBACK_AVATAR;
                  }
                }}
              />
              <div className="space-y-2">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#F97316]">{t('blog.reviewedBy', 'Written & Reviewed By')}</span>
                  <h3 className="font-black text-lg sm:text-xl text-[#0F172A]">{localizedPost.author.name}</h3>
                  <span className="text-sm font-semibold text-[#475569]">{localizedPost.author.role} • {localizedPost.author.credentials}</span>
                </div>
                <p className="text-sm sm:text-base text-[#475569] leading-relaxed">
                  {localizedPost.author.bio}
                </p>
              </div>
            </div>

            {/* FAQ Accordion */}
            {localizedPost.faqs && localizedPost.faqs.length > 0 && (
              <div className="p-6 sm:p-8 rounded-3xl bg-[#FFFFFF] border border-[#E2E8F0] shadow-xs space-y-4">
                <div className="flex items-center gap-2 text-[#0F172A] font-bold text-lg sm:text-xl">
                  <HelpCircle className="w-5 h-5 text-[#F97316]" />
                  <span>{t('blog.faqTitle', 'Frequently Asked Questions')}</span>
                </div>

                <div className="divide-y divide-[#E2E8F0]">
                  {localizedPost.faqs.map((faq, idx) => {
                    const isOpen = openFaqIndex === idx;
                    return (
                      <div key={idx} className="py-3.5">
                        <button
                          type="button"
                          onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                          className="w-full flex items-center justify-between text-left gap-4 font-bold text-sm sm:text-base text-[#0F172A] hover:text-[#F97316] transition-colors cursor-pointer"
                        >
                          <span>{faq.question}</span>
                          <ChevronDown className={`w-4.5 h-4.5 text-[#64748B] transition-transform ${isOpen ? 'rotate-180 text-[#F97316]' : ''}`} />
                        </button>
                        {isOpen && (
                          <div className="mt-2.5 text-sm sm:text-base text-[#475569] leading-relaxed">
                            {faq.answer}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Bottom Ad Placement */}
            <AdSlot type="banner" />

          </main>

          {/* Sidebar Column (4 cols) */}
          <aside className="lg:col-span-4 space-y-6">
            
            {/* Sticky Table of Contents Container */}
            <div className="sticky top-24 space-y-6">
              
              {/* Table of Contents Card */}
              <div className="p-5 sm:p-6 rounded-3xl bg-[#FFFFFF] border border-[#E2E8F0] shadow-xs space-y-3">
                <span className="text-sm font-bold uppercase tracking-wider text-[#64748B] flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-[#F97316]" />
                  <span>{t('blog.toc', 'Table of Contents')}</span>
                </span>

                <nav className="space-y-1">
                  {localizedPost.sections.map((section, idx) => (
                    <a
                      key={section.id}
                      href={`#${section.id}`}
                      className="block p-2 rounded-xl text-sm font-semibold text-[#475569] hover:text-[#F97316] hover:bg-[#FFF7ED] transition-colors leading-snug"
                    >
                      <span className="text-[#64748B] mr-1.5">{idx + 1}.</span>
                      {section.title.replace(/^\d+\.\s*/, '')}
                    </a>
                  ))}
                </nav>
              </div>

              {/* Related Calculators Sidebar Widget */}
              <div className="p-5 sm:p-6 rounded-3xl bg-[#FFFFFF] text-[#0F172A] shadow-xs space-y-3 border border-[#E2E8F0]">
                <div className="flex items-center gap-2 text-sm font-bold text-[#F97316] uppercase tracking-wider">
                  <Calculator className="w-4 h-4" />
                  <span>{t('blog.relatedCalculators', 'Related Calculators')}</span>
                </div>

                <div className="space-y-2">
                  {relatedCalculators.map(calc => (
                    <button
                      key={calc.id}
                      onClick={() => onSelectCalculator(calc.id)}
                      className="w-full p-3 rounded-xl bg-[#F8FAFC] hover:bg-[#FFF7ED] text-left transition-colors flex items-center justify-between text-sm font-semibold text-[#0F172A] hover:text-[#F97316] group cursor-pointer border border-[#E2E8F0] hover:border-[#FDBA74]"
                    >
                      <span className="truncate pr-2">{calc.name}</span>
                      <ArrowRight className="w-4 h-4 text-[#F97316] group-hover:translate-x-0.5 transition-transform shrink-0" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Sidebar Ad Placement */}
              <AdSlot type="sidebar" />

              {/* Sidebar Partner Offers */}
              <AffiliateOffersSection
                categoryId={localizedPost.category === 'general-education' ? 'financial' : localizedPost.category}
                layout="compact-sidebar"
                title={t('calcView.featuredPartnerOffers', 'Recommended Partner Deals')}
                limit={2}
              />

              {/* Tags Cloud */}
              <div className="p-5 sm:p-6 rounded-3xl bg-[#FFFFFF] border border-[#E2E8F0] space-y-2">
                <span className="text-sm font-bold uppercase tracking-wider text-[#64748B] flex items-center gap-1.5">
                  <Tag className="w-4 h-4 text-[#64748B]" />
                  <span>{t('blog.articleTags', 'Article Tags')}</span>
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {localizedPost.tags.map(tag => (
                    <span key={tag} className="text-xs font-medium bg-[#F8FAFC] text-[#475569] border border-[#E2E8F0] px-3 py-1 rounded-lg">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

            </div>
          </aside>

        </div>

        {/* Bottom Related Articles Section */}
        {relatedPosts.length > 0 && (
          <div className="pt-12 border-t border-[#E2E8F0] space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <h3 className="text-xl sm:text-2xl font-black text-[#0F172A]">{t('blog.recommendedReading', 'Recommended Reading')}</h3>
                <p className="text-xs sm:text-sm text-[#475569]">{t('blog.exploreMoreDeepDives', 'Explore more calculation principles and mathematical deep-dives.')}</p>
              </div>

              <button
                onClick={onGoToBlogList}
                className="text-xs font-bold text-[#F97316] hover:text-[#EA580C] flex items-center gap-1 cursor-pointer"
              >
                <span>{t('blog.viewAllGuides', 'View All Guides')}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {relatedPosts.map(relPost => (
                <div
                  key={relPost.slug}
                  onClick={() => onSelectPost(relPost.slug)}
                  className="p-5 rounded-3xl bg-[#FFFFFF] border border-[#E2E8F0] hover:border-[#FDBA74] shadow-xs hover:shadow-md cursor-pointer transition-all flex gap-4 items-center group"
                >
                  <img
                    src={relPost.coverImage}
                    alt={relPost.imageAlt || relPost.title}
                    className="w-24 h-24 rounded-2xl object-cover shrink-0"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      const target = e.currentTarget;
                      if (target.src !== FALLBACK_BLOG_IMAGE) {
                        target.src = FALLBACK_BLOG_IMAGE;
                      }
                    }}
                  />
                  <div className="space-y-1 min-w-0 flex-1">
                    <span className="text-[10px] font-bold uppercase text-[#F97316]">{relPost.categoryLabel}</span>
                    <h4 className="font-bold text-sm text-[#0F172A] group-hover:text-[#F97316] transition-colors line-clamp-2">
                      {relPost.title}
                    </h4>
                    <span className="text-[11px] text-[#64748B] flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {relPost.readTimeMinutes} {t('blog.minRead', 'min read')}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Printable Article Footer (Print only) */}
        <PrintReportFooter category={localizedPost.category} />

      </div>

      {/* Share Modal */}
      <ShareModal
        isOpen={isShareOpen}
        onClose={() => setIsShareOpen(false)}
        title={localizedPost.title}
        description={localizedPost.excerpt}
        category={localizedPost.categoryLabel}
      />
    </div>
  );
};
