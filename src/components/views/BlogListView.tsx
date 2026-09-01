import React, { useState, useMemo } from 'react';
import { 
  BookOpen, 
  Search, 
  Clock, 
  Calendar, 
  ArrowRight, 
  Sparkles
} from 'lucide-react';
import { Breadcrumbs } from '../shared/Breadcrumbs';
import { AdSlot } from '../shared/AdSlot';
import { useLanguage } from '../../i18n/LanguageContext';

const FALLBACK_BLOG_IMAGE = 'https://images.unsplash.com/photo-1554224154-26032ffc0d07?auto=format&fit=crop&w=1200&h=675&q=80';
const FALLBACK_AVATAR = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80';

interface BlogListViewProps {
  onSelectPost: (slug: string) => void;
  onSelectCategory: (categoryId: string) => void;
  onSelectCalculator: (calculatorId: string) => void;
  onGoHome: () => void;
}

export const BlogListView: React.FC<BlogListViewProps> = ({
  onSelectPost,
  onSelectCategory,
  onSelectCalculator,
  onGoHome
}) => {
  const { t, blogPosts, categories, language } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCatFilter, setSelectedCatFilter] = useState<string>('all');

  const featuredPost = useMemo(() => {
    return blogPosts.find(p => p.featured) || blogPosts[0];
  }, [blogPosts]);

  const filteredPosts = useMemo(() => {
    return blogPosts.filter(post => {
      let matchCat = selectedCatFilter === 'all';
      if (!matchCat) {
        if (selectedCatFilter === 'finance') {
          matchCat = post.category === 'finance' || post.category === 'financial';
        } else if (selectedCatFilter === 'health-fitness') {
          matchCat = post.category === 'health-fitness' || post.category === 'fitness-health';
        } else if (selectedCatFilter === 'math') {
          matchCat = post.category === 'math' || post.category === 'math-algebra';
        } else if (selectedCatFilter === 'conversions') {
          matchCat = post.category === 'conversions' || post.category === 'conversion';
        } else {
          matchCat = post.category === selectedCatFilter;
        }
      }

      const q = searchQuery.toLowerCase().trim();
      const matchQuery = !q || 
        post.title.toLowerCase().includes(q) ||
        post.excerpt.toLowerCase().includes(q) ||
        post.tags.some(t => t.toLowerCase().includes(q)) ||
        post.author.name.toLowerCase().includes(q);
      
      return matchCat && matchQuery;
    });
  }, [blogPosts, searchQuery, selectedCatFilter]);

  const breadcrumbs = [
    { label: t('blog.title', 'Blog & Educational Guides'), active: true }
  ];

  const dateLocale = language === 'fr' ? 'fr-FR' : 'en-US';

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Breadcrumb Navigation */}
        <Breadcrumbs items={breadcrumbs} onGoHome={onGoHome} />

        {/* Top Header & Search Banner */}
        <div className="bg-[#FFFFFF] border border-[#E2E8F0] rounded-2xl p-6 sm:p-10 shadow-xs">
          <div className="max-w-3xl space-y-3">
            <h1 className="text-2xl sm:text-4xl font-bold tracking-tight text-[#0F172A] leading-tight">
              {t('blog.heroHeadline', 'Guides & Articles')}
            </h1>

            <p className="text-base sm:text-[17px] text-[#475569] leading-relaxed max-w-2xl">
              {t('blog.heroSubtitle', 'Learn the exact formulas, financial rules of thumb, and health principles behind everyday calculations.')}
            </p>

            {/* Search Input */}
            <div className="pt-2 max-w-md">
              <div className="relative flex items-center">
                <Search className="w-4.5 h-4.5 text-[#64748B] absolute left-3.5 pointer-events-none" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={t('blog.searchPlaceholder', 'Search articles...')}
                  className="w-full pl-10 pr-4 py-3 bg-[#FFFFFF] text-[#0F172A] text-sm sm:text-base rounded-xl border border-[#E2E8F0] focus:border-[#F97316] focus:outline-none transition-all placeholder:text-[#64748B]"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Ad Placement: Top Leaderboard */}
        <AdSlot type="header-banner" />

        {/* Featured Hero Article */}
        {featuredPost && !searchQuery && selectedCatFilter === 'all' && (
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-[#64748B]">
              <Sparkles className="w-4 h-4 text-[#F97316]" />
              <span>{t('blog.featuredGuide', 'Featured In-Depth Guide')}</span>
            </div>

            <div 
              onClick={() => onSelectPost(featuredPost.slug)}
              className="bg-[#FFFFFF] rounded-3xl border border-[#E2E8F0] shadow-xs hover:border-[#FDBA74] hover:shadow-md transition-all overflow-hidden cursor-pointer group grid grid-cols-1 lg:grid-cols-12 gap-0"
            >
              <div className="lg:col-span-7 h-64 sm:h-80 lg:h-full min-h-[260px] relative overflow-hidden bg-[#F1F5F9]">
                <img
                  src={featuredPost.coverImage}
                  alt={featuredPost.imageAlt || featuredPost.title}
                  width={800}
                  height={450}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                  decoding="async"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    const target = e.currentTarget;
                    if (target.src !== FALLBACK_BLOG_IMAGE) {
                      target.src = FALLBACK_BLOG_IMAGE;
                    }
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                <span className="absolute top-4 left-4 px-3.5 py-1.5 rounded-full bg-[#F97316] text-[#FFFFFF] text-xs font-bold shadow-md">
                  {featuredPost.categoryLabel}
                </span>
              </div>

              <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-sm text-[#64748B] font-semibold">
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-4 h-4 text-[#64748B]" />
                      {featuredPost.readTimeMinutes} {t('blog.minRead', 'min read')}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-4 h-4 text-[#64748B]" />
                      {new Date(featuredPost.publishedAt).toLocaleDateString(dateLocale, { month: 'short', day: 'numeric', year: 'numeric' })}
                    </span>
                  </div>

                  <h2 className="text-xl sm:text-3xl font-black text-[#0F172A] group-hover:text-[#F97316] transition-colors leading-snug">
                    {featuredPost.title}
                  </h2>

                  <p className="text-sm sm:text-base text-[#475569] leading-relaxed line-clamp-3">
                    {featuredPost.excerpt}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#E2E8F0] flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img 
                      src={featuredPost.author.avatar} 
                      alt={featuredPost.author.name}
                      width={40}
                      height={40}
                      loading="lazy"
                      decoding="async"
                      className="w-10 h-10 rounded-full object-cover border border-[#E2E8F0]"
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        const target = e.currentTarget;
                        if (target.src !== FALLBACK_AVATAR) {
                          target.src = FALLBACK_AVATAR;
                        }
                      }}
                    />
                    <div>
                      <span className="text-sm font-bold text-[#0F172A] block">{featuredPost.author.name}</span>
                      <span className="text-xs text-[#64748B] block truncate max-w-[180px]">{featuredPost.author.role}</span>
                    </div>
                  </div>

                  <div className="w-9 h-9 rounded-full bg-[#FFF7ED] text-[#F97316] group-hover:bg-[#F97316] group-hover:text-[#FFFFFF] flex items-center justify-center transition-all">
                    <ArrowRight className="w-4.5 h-4.5" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Filter Category Tabs */}
        <div className="flex items-center justify-between flex-wrap gap-3 pt-4 border-b border-[#E2E8F0] pb-3">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
            <button
              onClick={() => setSelectedCatFilter('all')}
              className={`px-4 py-2 rounded-full text-sm font-bold transition-all shrink-0 cursor-pointer ${
                selectedCatFilter === 'all'
                  ? 'bg-[#F97316] text-[#FFFFFF] shadow-2xs'
                  : 'bg-[#FFFFFF] text-[#475569] hover:bg-[#FFF7ED] border border-[#E2E8F0]'
              }`}
            >
              {t('blog.allArticles', 'All Articles')} ({blogPosts.length})
            </button>
            <button
              onClick={() => setSelectedCatFilter('finance')}
              className={`px-4 py-2 rounded-full text-sm font-bold transition-all shrink-0 cursor-pointer ${
                selectedCatFilter === 'finance' || selectedCatFilter === 'financial'
                  ? 'bg-[#F97316] text-[#FFFFFF] shadow-2xs'
                  : 'bg-[#FFFFFF] text-[#475569] hover:bg-[#FFF7ED] border border-[#E2E8F0]'
              }`}
            >
              {t('categories.finance', 'Finance')}
            </button>
            <button
              onClick={() => setSelectedCatFilter('health-fitness')}
              className={`px-4 py-2 rounded-full text-sm font-bold transition-all shrink-0 cursor-pointer ${
                selectedCatFilter === 'health-fitness' || selectedCatFilter === 'fitness-health'
                  ? 'bg-[#F97316] text-white shadow-2xs'
                  : 'bg-[#FFFFFF] text-[#475569] hover:bg-[#FFF7ED] border border-[#E2E8F0]'
              }`}
            >
              {t('categories.health', 'Health & Fitness')}
            </button>
            <button
              onClick={() => setSelectedCatFilter('math')}
              className={`px-4 py-2 rounded-full text-sm font-bold transition-all shrink-0 cursor-pointer ${
                selectedCatFilter === 'math' || selectedCatFilter === 'math-algebra'
                  ? 'bg-[#0EA5E9] text-white shadow-2xs'
                  : 'bg-[#FFFFFF] text-[#475569] hover:bg-[#FFF7ED] border border-[#E2E8F0]'
              }`}
            >
              {t('categories.math', 'Math')}
            </button>
            <button
              onClick={() => setSelectedCatFilter('conversions')}
              className={`px-4 py-2 rounded-full text-sm font-bold transition-all shrink-0 cursor-pointer ${
                selectedCatFilter === 'conversions' || selectedCatFilter === 'conversion'
                  ? 'bg-[#F97316] text-[#FFFFFF] shadow-2xs'
                  : 'bg-[#FFFFFF] text-[#475569] hover:bg-[#FFF7ED] border border-[#E2E8F0]'
              }`}
            >
              {t('categories.conversions', 'Conversions')}
            </button>
            <button
              onClick={() => setSelectedCatFilter('real-estate')}
              className={`px-4 py-2 rounded-full text-sm font-bold transition-all shrink-0 cursor-pointer ${
                selectedCatFilter === 'real-estate'
                  ? 'bg-[#F97316] text-[#FFFFFF] shadow-2xs'
                  : 'bg-[#FFFFFF] text-[#475569] hover:bg-[#FFF7ED] border border-[#E2E8F0]'
              }`}
            >
              {t('categories.realEstate', 'Real Estate')}
            </button>
            <button
              onClick={() => setSelectedCatFilter('business')}
              className={`px-4 py-2 rounded-full text-sm font-bold transition-all shrink-0 cursor-pointer ${
                selectedCatFilter === 'business'
                  ? 'bg-[#7C3AED] text-white shadow-2xs'
                  : 'bg-[#FFFFFF] text-[#475569] hover:bg-[#FFF7ED] border border-[#E2E8F0]'
              }`}
            >
              {t('categories.business', 'Business')}
            </button>
            <button
              onClick={() => setSelectedCatFilter('education')}
              className={`px-4 py-2 rounded-full text-sm font-bold transition-all shrink-0 cursor-pointer ${
                selectedCatFilter === 'education'
                  ? 'bg-[#0D9488] text-white shadow-2xs'
                  : 'bg-[#FFFFFF] text-[#475569] hover:bg-[#FFF7ED] border border-[#E2E8F0]'
              }`}
            >
              {t('categories.education', 'Education')}
            </button>
            <button
              onClick={() => setSelectedCatFilter('general-calculations')}
              className={`px-4 py-2 rounded-full text-sm font-bold transition-all shrink-0 cursor-pointer ${
                selectedCatFilter === 'general-calculations'
                  ? 'bg-[#F97316] text-[#FFFFFF] shadow-2xs'
                  : 'bg-[#FFFFFF] text-[#475569] hover:bg-[#FFF7ED] border border-[#E2E8F0]'
              }`}
            >
              {t('categories.generalCalculations', 'General Calculations')}
            </button>
          </div>

          <span className="text-sm text-[#64748B] font-semibold">
            {t('common.showingResults', `Showing ${filteredPosts.length} guides`, { count: filteredPosts.length })}
          </span>
        </div>

        {/* Article Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredPosts.map((post) => (
            <article
              key={post.slug}
              onClick={() => onSelectPost(post.slug)}
              className="bg-[#FFFFFF] rounded-2xl border border-[#E2E8F0] shadow-xs hover:border-[#FDBA74] hover:shadow-md transition-all overflow-hidden flex flex-col justify-between cursor-pointer group"
            >
              <div>
                {/* Card Image with Fixed 16:9 Aspect Ratio */}
                <div className="aspect-[16/9] w-full relative overflow-hidden bg-[#F1F5F9]">
                  <img
                    src={post.coverImage}
                    alt={post.imageAlt || post.title}
                    width={480}
                    height={270}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                    decoding="async"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      const target = e.currentTarget;
                      if (target.src !== FALLBACK_BLOG_IMAGE) {
                        target.src = FALLBACK_BLOG_IMAGE;
                      }
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                  <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-[#FFFFFF]/90 backdrop-blur-xs text-[#0F172A] text-xs font-bold border border-[#E2E8F0]">
                    {post.categoryLabel}
                  </span>
                </div>

                {/* Card Content */}
                <div className="p-5 sm:p-6 space-y-3">
                  <div className="flex items-center gap-2 text-xs text-[#64748B] font-semibold">
                    <span>{new Date(post.publishedAt).toLocaleDateString(dateLocale, { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-[#64748B]" />
                      {post.readTimeMinutes} {t('blog.minRead', 'min read')}
                    </span>
                  </div>

                  <h3 className="font-bold text-lg sm:text-xl text-[#0F172A] group-hover:text-[#F97316] transition-colors line-clamp-2 leading-snug">
                    {post.title}
                  </h3>

                  <p className="text-sm sm:text-base text-[#475569] line-clamp-3 leading-relaxed">
                    {post.excerpt}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {post.tags.slice(0, 3).map(tag => (
                      <span key={tag} className="text-xs font-medium bg-[#F8FAFC] text-[#475569] border border-[#E2E8F0] px-2.5 py-1 rounded-md">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Author & Footer Action */}
              <div className="p-5 sm:p-6 pt-3 border-t border-[#E2E8F0] flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <img 
                    src={post.author.avatar} 
                    alt={post.author.name}
                    className="w-8 h-8 rounded-full object-cover border border-[#E2E8F0]"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      const target = e.currentTarget;
                      if (target.src !== FALLBACK_AVATAR) {
                        target.src = FALLBACK_AVATAR;
                      }
                    }}
                  />
                  <span className="text-sm font-semibold text-[#475569] truncate max-w-[140px]">
                    {post.author.name}
                  </span>
                </div>

                <span className="text-sm font-bold text-[#F97316] group-hover:translate-x-1 transition-transform flex items-center gap-1">
                  {t('blog.readGuide', 'Read Guide')} <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </article>
          ))}
        </div>

        {/* Ad Placement: Bottom In-Feed */}
        <AdSlot type="banner" />

        {/* Quick Categories Bar */}
        <div className="bg-[#FFFFFF] rounded-2xl border border-[#E2E8F0] p-6 sm:p-8 space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="space-y-1">
              <h3 className="font-bold text-[#0F172A] text-lg sm:text-xl">{t('blog.lookingForEngines', 'Looking for instant calculation engines?')}</h3>
              <p className="text-sm sm:text-base text-[#475569]">{t('blog.exploreLibrary', 'Explore our library of 100+ precision mathematical and financial tools.')}</p>
            </div>
            <button
              onClick={onGoHome}
              className="px-5 py-2.5 bg-[#F97316] hover:bg-[#EA580C] text-[#FFFFFF] rounded-xl text-sm font-bold transition-all shadow-xs flex items-center gap-1.5 cursor-pointer shrink-0"
            >
              <span>{t('blog.exploreAllCalculators', 'Explore All Calculators')}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 pt-2">
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className="p-3.5 rounded-xl bg-[#F8FAFC] hover:bg-[#FFF7ED] border border-[#E2E8F0] hover:border-[#FDBA74] text-left transition-all group cursor-pointer"
              >
                <span className="text-xl block mb-1">{cat.iconName}</span>
                <span className="font-bold text-sm text-[#0F172A] group-hover:text-[#F97316] block truncate">{cat.name}</span>
                <span className="text-xs text-[#64748B]">{cat.calculatorsCount} {t('common.tools', 'tools')}</span>
              </button>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
