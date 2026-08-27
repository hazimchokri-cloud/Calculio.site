import React, { useState, useMemo } from 'react';
import { 
  FileCode, 
  Search, 
  Download, 
  Copy, 
  Check, 
  BookOpen, 
  ArrowRight,
  Globe2
} from 'lucide-react';
import { Breadcrumbs } from '../shared/Breadcrumbs';
import { generateSitemapXml, generateSitemapEntries } from '../../utils/sitemapGenerator';
import { copyToClipboard } from '../../utils/formatters';
import { useLanguage } from '../../i18n/LanguageContext';

interface SitemapViewProps {
  onSelectCalculator: (id: string) => void;
  onSelectCategory: (id: string) => void;
  onSelectPost: (slug: string) => void;
  onGoHome: () => void;
  onGoToAbout: () => void;
  onGoToContact: () => void;
  onGoToBlog: () => void;
  onGoToPrivacy?: () => void;
  onGoToTerms?: () => void;
  onGoToDisclaimer?: () => void;
  onGoToAllCalculators?: () => void;
}

export const SitemapView: React.FC<SitemapViewProps> = ({
  onSelectCalculator,
  onSelectCategory,
  onSelectPost,
  onGoHome,
  onGoToAbout,
  onGoToContact,
  onGoToBlog,
  onGoToPrivacy,
  onGoToTerms,
  onGoToDisclaimer,
  onGoToAllCalculators
}) => {
  const { t, calculators, categories, blogPosts } = useLanguage();
  const [activeTab, setActiveTab] = useState<'visual' | 'xml'>('visual');
  const [filterQuery, setFilterQuery] = useState('');
  const [copied, setCopied] = useState(false);

  const xmlContent = useMemo(() => generateSitemapXml(), []);
  const entries = useMemo(() => generateSitemapEntries(), []);

  const handleCopyXml = () => {
    copyToClipboard(xmlContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadXml = () => {
    const blob = new Blob([xmlContent], { type: 'application/xml;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'sitemap.xml';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const breadcrumbs = [
    { label: t('sitemap.title', 'XML Sitemap & Index'), active: true }
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Breadcrumb Navigation */}
        <Breadcrumbs items={breadcrumbs} onGoHome={onGoHome} />

        {/* Hero Header */}
        <div className="bg-[#FFFFFF] text-[#0F172A] rounded-3xl p-6 sm:p-10 shadow-xs space-y-4 border border-[#E2E8F0]">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFF7ED] text-[#F97316] text-xs font-bold border border-[#FDBA74]">
                <Globe2 className="w-3.5 h-3.5 text-[#F97316]" />
                <span>{t('sitemap.badge', 'Search Engine Optimization & Crawler Protocol')}</span>
              </div>
              <h1 className="text-2xl sm:text-4xl font-black text-[#0F172A]">
                {t('sitemap.headline', 'Calculio XML Sitemap & Complete Index')}
              </h1>
              <p className="text-xs sm:text-sm text-[#475569]">
                {t('sitemap.subtitle', 'A structured, machine-readable directory of all {count} indexed URLs across calculators, guides, and categories.').replace('{count}', entries.length.toString())}
              </p>
            </div>

            {/* Tab Selector */}
            <div className="flex items-center gap-1.5 p-1 bg-[#F8FAFC] rounded-2xl border border-[#E2E8F0]">
              <button
                type="button"
                onClick={() => setActiveTab('visual')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeTab === 'visual'
                    ? 'bg-[#F97316] text-[#FFFFFF] shadow-xs'
                    : 'text-[#64748B] hover:text-[#0F172A]'
                }`}
              >
                {t('sitemap.visualTab', 'Visual Tree')}
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('xml')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                  activeTab === 'xml'
                    ? 'bg-[#F97316] text-[#FFFFFF] shadow-xs'
                    : 'text-[#64748B] hover:text-[#0F172A]'
                }`}
              >
                <FileCode className="w-3.5 h-3.5" />
                <span>{t('sitemap.rawXmlTab', 'Raw XML')}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Visual Directory View */}
        {activeTab === 'visual' && (
          <div className="space-y-8">
            {/* Search Filter */}
            <div className="relative max-w-md">
              <Search className="w-4 h-4 text-[#64748B] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={filterQuery}
                onChange={(e) => setFilterQuery(e.target.value)}
                placeholder={t('sitemap.searchPlaceholder', 'Filter sitemap pages...')}
                className="w-full pl-10 pr-4 py-2.5 bg-[#FFFFFF] text-xs font-semibold rounded-xl border border-[#E2E8F0] text-[#0F172A] placeholder:text-[#64748B] focus:outline-none focus:border-[#F97316]"
              />
            </div>

            {/* Core Pages */}
            <div className="bg-[#FFFFFF] rounded-3xl p-6 border border-[#E2E8F0] shadow-xs space-y-4">
              <h2 className="font-bold text-sm text-[#0F172A] uppercase tracking-wider flex items-center gap-2">
                <Globe2 className="w-4 h-4 text-[#F97316]" />
                <span>{t('sitemap.corePages', 'Core Website Pages')}</span>
              </h2>

              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
                <button
                  onClick={onGoHome}
                  className="p-3.5 rounded-xl bg-[#F8FAFC] hover:bg-[#FFF7ED] border border-[#E2E8F0] hover:border-[#FDBA74] text-left transition-colors cursor-pointer"
                >
                  <span className="text-xs font-bold text-[#0F172A] block">{t('nav.home', 'Home')}</span>
                  <span className="text-[11px] font-mono text-[#64748B]">/</span>
                </button>
                {onGoToAllCalculators && (
                  <button
                    onClick={onGoToAllCalculators}
                    className="p-3.5 rounded-xl bg-[#F8FAFC] hover:bg-[#FFF7ED] border border-[#E2E8F0] hover:border-[#FDBA74] text-left transition-colors cursor-pointer"
                  >
                    <span className="text-xs font-bold text-[#0F172A] block">{t('nav.calculators', 'Directory')}</span>
                    <span className="text-[11px] font-mono text-[#64748B]">/calculators</span>
                  </button>
                )}
                <button
                  onClick={onGoToBlog}
                  className="p-3.5 rounded-xl bg-[#F8FAFC] hover:bg-[#FFF7ED] border border-[#E2E8F0] hover:border-[#FDBA74] text-left transition-colors cursor-pointer"
                >
                  <span className="text-xs font-bold text-[#0F172A] block">{t('nav.blog', 'Blog & Guides')}</span>
                  <span className="text-[11px] font-mono text-[#64748B]">/blog</span>
                </button>
                <button
                  onClick={onGoToAbout}
                  className="p-3.5 rounded-xl bg-[#F8FAFC] hover:bg-[#FFF7ED] border border-[#E2E8F0] hover:border-[#FDBA74] text-left transition-colors cursor-pointer"
                >
                  <span className="text-xs font-bold text-[#0F172A] block">{t('nav.about', 'About Calculio')}</span>
                  <span className="text-[11px] font-mono text-[#64748B]">/about</span>
                </button>
                <button
                  onClick={onGoToContact}
                  className="p-3.5 rounded-xl bg-[#F8FAFC] hover:bg-[#FFF7ED] border border-[#E2E8F0] hover:border-[#FDBA74] text-left transition-colors cursor-pointer"
                >
                  <span className="text-xs font-bold text-[#0F172A] block">{t('nav.contact', 'Contact Us')}</span>
                  <span className="text-[11px] font-mono text-[#64748B]">/contact</span>
                </button>
                {onGoToPrivacy && (
                  <button
                    onClick={onGoToPrivacy}
                    className="p-3.5 rounded-xl bg-[#F8FAFC] hover:bg-[#FFF7ED] border border-[#E2E8F0] hover:border-[#FDBA74] text-left transition-colors cursor-pointer"
                  >
                    <span className="text-xs font-bold text-[#0F172A] block">{t('footer.privacyPolicy', 'Privacy Policy')}</span>
                    <span className="text-[11px] font-mono text-[#64748B]">/privacy</span>
                  </button>
                )}
                {onGoToTerms && (
                  <button
                    onClick={onGoToTerms}
                    className="p-3.5 rounded-xl bg-[#F8FAFC] hover:bg-[#FFF7ED] border border-[#E2E8F0] hover:border-[#FDBA74] text-left transition-colors cursor-pointer"
                  >
                    <span className="text-xs font-bold text-[#0F172A] block">{t('footer.termsOfUse', 'Terms of Use')}</span>
                    <span className="text-[11px] font-mono text-[#64748B]">/terms</span>
                  </button>
                )}
                {onGoToDisclaimer && (
                  <button
                    onClick={onGoToDisclaimer}
                    className="p-3.5 rounded-xl bg-[#F8FAFC] hover:bg-[#FFF7ED] border border-[#E2E8F0] hover:border-[#FDBA74] text-left transition-colors cursor-pointer"
                  >
                    <span className="text-xs font-bold text-[#0F172A] block">{t('footer.disclaimerTitle', 'Disclaimer')}</span>
                    <span className="text-[11px] font-mono text-[#64748B]">/disclaimer</span>
                  </button>
                )}
              </div>
            </div>

            {/* Blog Articles */}
            <div className="bg-[#FFFFFF] rounded-3xl p-6 border border-[#E2E8F0] shadow-xs space-y-4">
              <h2 className="font-bold text-sm text-[#0F172A] uppercase tracking-wider flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-[#F97316]" />
                <span>{t('sitemap.blogArticles', 'Educational Blog Articles ({count})').replace('{count}', blogPosts.length.toString())}</span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {blogPosts.map(post => (
                  <div
                    key={post.slug}
                    onClick={() => onSelectPost(post.slug)}
                    className="p-3.5 rounded-2xl bg-[#F8FAFC] hover:bg-[#FFF7ED] border border-[#E2E8F0] hover:border-[#FDBA74] cursor-pointer transition-colors space-y-1"
                  >
                    <span className="text-[10px] font-bold text-[#F97316] uppercase">{post.categoryLabel}</span>
                    <h4 className="text-xs font-bold text-[#0F172A] line-clamp-1">{post.title}</h4>
                    <span className="text-[10px] font-mono text-[#64748B] block">/blog/{post.slug}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Calculators by Category */}
            <div className="space-y-6">
              {categories.map(cat => {
                const calcs = calculators.filter(c => c.category === cat.id);
                const matchingCalcs = filterQuery
                  ? calcs.filter(c => c.name.toLowerCase().includes(filterQuery.toLowerCase()) || c.description.toLowerCase().includes(filterQuery.toLowerCase()))
                  : calcs;

                if (matchingCalcs.length === 0) return null;

                return (
                  <div key={cat.id} className="bg-[#FFFFFF] rounded-3xl p-6 border border-[#E2E8F0] shadow-xs space-y-4">
                    <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-3">
                      <button
                        onClick={() => onSelectCategory(cat.id)}
                        className="flex items-center gap-2 text-left font-bold text-[#0F172A] hover:text-[#F97316] transition-colors cursor-pointer"
                      >
                        <span className="text-base">{cat.iconName}</span>
                        <span>{cat.name}</span>
                        <span className="text-xs font-mono text-[#64748B] font-normal">({matchingCalcs.length} {t('category.tools', 'tools')})</span>
                      </button>

                      <button
                        onClick={() => onSelectCategory(cat.id)}
                        className="text-xs font-bold text-[#F97316] hover:underline flex items-center gap-1 cursor-pointer"
                      >
                        <span>{t('category.categoryHub', 'Category Hub')}</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                      {matchingCalcs.map(calc => (
                        <div
                          key={calc.id}
                          onClick={() => onSelectCalculator(calc.id)}
                          className="p-3 rounded-2xl bg-[#F8FAFC] hover:bg-[#FFF7ED] border border-[#E2E8F0] hover:border-[#FDBA74] cursor-pointer transition-colors flex items-center justify-between group"
                        >
                          <div className="min-w-0 pr-2">
                            <span className="text-xs font-bold text-[#0F172A] group-hover:text-[#F97316] block truncate">
                              {calc.name}
                            </span>
                            <span className="text-[10px] text-[#64748B] truncate block">
                              {calc.shortDescription}
                            </span>
                          </div>
                          <ArrowRight className="w-3.5 h-3.5 text-[#64748B] group-hover:text-[#F97316] shrink-0" />
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Raw XML View */}
        {activeTab === 'xml' && (
          <div className="bg-[#FFFFFF] text-[#0F172A] rounded-3xl p-6 border border-[#E2E8F0] space-y-4 shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#E2E8F0] pb-4">
              <div className="flex items-center gap-2">
                <FileCode className="w-5 h-5 text-[#F97316]" />
                <span className="font-mono text-xs font-bold text-[#64748B]">sitemap.xml ({entries.length} URLs)</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleCopyXml}
                  className="px-3.5 py-1.5 bg-[#F8FAFC] hover:bg-[#FFF7ED] text-[#0F172A] text-xs font-bold rounded-xl transition-colors flex items-center gap-1.5 border border-[#E2E8F0] hover:border-[#FDBA74] cursor-pointer"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-[#F97316]" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? t('sitemap.copiedXml', 'Copied XML!') : t('sitemap.copyXml', 'Copy XML')}</span>
                </button>

                <button
                  type="button"
                  onClick={handleDownloadXml}
                  className="px-3.5 py-1.5 bg-[#F97316] hover:bg-[#EA580C] text-[#FFFFFF] text-xs font-bold rounded-xl transition-colors flex items-center gap-1.5 shadow-sm cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>{t('sitemap.downloadXml', 'Download sitemap.xml')}</span>
                </button>
              </div>
            </div>

            <pre className="p-4 bg-[#F8FAFC] rounded-2xl font-mono text-xs text-[#9A3412] overflow-x-auto max-h-[600px] leading-relaxed border border-[#E2E8F0]">
              {xmlContent}
            </pre>
          </div>
        )}

      </div>
    </div>
  );
};
