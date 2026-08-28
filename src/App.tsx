import React, { useState, useEffect, useCallback } from 'react';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { HeroSection } from './components/home/HeroSection';
import { FeaturedCalculators } from './components/home/FeaturedCalculators';
import { CategoryGrid } from './components/home/CategoryGrid';
import { TrustAndFaqSection } from './components/home/TrustAndFaqSection';
import { CategoryView } from './components/views/CategoryView';
import { CalculatorDetailView } from './components/views/CalculatorDetailView';
import { BlogListView } from './components/views/BlogListView';
import { BlogPostView } from './components/views/BlogPostView';
import { AboutView } from './components/views/AboutView';
import { ContactView } from './components/views/ContactView';
import { SitemapView } from './components/views/SitemapView';
import { AllCalculatorsView } from './components/views/AllCalculatorsView';
import { LegalView, LegalTab } from './components/views/LegalView';
import { QuickSearchModal } from './components/shared/QuickSearchModal';
import { SavedHistoryDrawer } from './components/shared/SavedHistoryDrawer';
import { CALCULATORS } from './data/calculatorDirectory';
import { CATEGORIES } from './data/categories';
import { BLOG_POSTS } from './data/blogPosts';
import { 
  CurrencyCode, 
  SavedCalculation, 
  CURRENCY_SYMBOLS, 
  AppViewMode, 
  BlogPost 
} from './types';
import { 
  updateDocumentSeo, 
  getCalculatorUrl, 
  getCategoryUrl, 
  getBlogPostUrl,
  CATEGORY_URL_PREFIX,
  URL_PREFIX_TO_CATEGORY,
  buildCalculatorSchema,
  buildArticleSchema,
  buildBreadcrumbSchema
} from './utils/seo';
import { LanguageProvider, useLanguage } from './i18n/LanguageContext';
import { CurrencyProvider, useCurrency } from './context/CurrencyContext';
import { ErrorBoundary } from './components/shared/ErrorBoundary';

function AppContent() {
  const { t, language, getCalculator, getCategory, getBlogPost } = useLanguage();
  const { currency, setCurrency, currencySymbol } = useCurrency();
  const [viewMode, setViewMode] = useState<AppViewMode>('home');
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>('financial');
  const [selectedCalculatorId, setSelectedCalculatorId] = useState<string>('mortgage-calculator');
  const [selectedBlogSlug, setSelectedBlogSlug] = useState<string>('how-mortgage-calculations-work');
  const [legalTab, setLegalTab] = useState<LegalTab>('privacy');
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState<boolean>(false);

  // Saved calculations from local storage
  const [savedCalculations, setSavedCalculations] = useState<SavedCalculation[]>(() => {
    try {
      const stored = localStorage.getItem('calculio_saved_calculations');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  // Sync to local storage
  useEffect(() => {
    try {
      localStorage.setItem('calculio_saved_calculations', JSON.stringify(savedCalculations));
    } catch (e) {
      console.warn('Failed to save to local storage', e);
    }
  }, [savedCalculations]);

  // Global keyboard shortcut for Quick Search (Cmd+K / Ctrl+K or /)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      const isInput = target && (
        target.tagName === 'INPUT' || 
        target.tagName === 'TEXTAREA' || 
        target.tagName === 'SELECT' || 
        target.isContentEditable
      );

      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(prev => !prev);
      } else if (e.key === '/' && !isInput && !isSearchOpen) {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSearchOpen]);

  // Parse path and route initially
  const routeFromPath = useCallback((pathname: string) => {
    const cleanPath = pathname.replace(/^\/+|\/+$/g, '');
    if (!cleanPath) {
      setViewMode('home');
      return;
    }

    const segments = cleanPath.split('/');

    // Check blog routes
    if (segments[0] === 'blog') {
      if (segments[1]) {
        const post = BLOG_POSTS.find(p => p.slug === segments[1]);
        if (post) {
          setSelectedBlogSlug(post.slug);
          setViewMode('blog-post');
          return;
        }
      }
      setViewMode('blog');
      return;
    }

    // Check Static pages
    if (cleanPath === 'calculators' || cleanPath === 'all-calculators') {
      setViewMode('all-calculators');
      return;
    }
    if (cleanPath === 'about') {
      setViewMode('about');
      return;
    }
    if (cleanPath === 'contact') {
      setViewMode('contact');
      return;
    }
    if (cleanPath === 'sitemap') {
      setViewMode('sitemap');
      return;
    }
    if (cleanPath === 'privacy' || cleanPath === 'privacy-policy') {
      setLegalTab('privacy');
      setViewMode('privacy');
      return;
    }
    if (cleanPath === 'terms' || cleanPath === 'terms-of-use' || cleanPath === 'terms-of-service') {
      setLegalTab('terms');
      setViewMode('terms');
      return;
    }
    if (cleanPath === 'disclaimer' || cleanPath === 'disclosure') {
      setLegalTab('disclaimer');
      setViewMode('disclaimer');
      return;
    }

    // Check category prefix or calculator path
    const prefix = segments[0];
    const catId = URL_PREFIX_TO_CATEGORY[prefix] || prefix;
    const isCategory = CATEGORIES.some(c => c.id === catId);

    if (isCategory) {
      if (segments[1]) {
        const calc = CALCULATORS.find(c => c.id === segments[1]);
        if (calc) {
          setSelectedCalculatorId(calc.id);
          setSelectedCategoryId(calc.category);
          setViewMode('calculator');
          return;
        }
      }
      setSelectedCategoryId(catId);
      setViewMode('category');
      return;
    }

    // Direct calculator lookup by ID
    const directCalc = CALCULATORS.find(c => c.id === segments[0]);
    if (directCalc) {
      setSelectedCalculatorId(directCalc.id);
      setSelectedCategoryId(directCalc.category);
      setViewMode('calculator');
      return;
    }

    // Default fallback
    setViewMode('home');
  }, []);

  // Initialize from browser URL and listen to popstate
  useEffect(() => {
    try {
      if (typeof window !== 'undefined' && window.location) {
        routeFromPath(window.location.pathname);

        const handlePopState = () => {
          try {
            routeFromPath(window.location.pathname);
          } catch (_) {}
        };
        window.addEventListener('popstate', handlePopState);
        return () => window.removeEventListener('popstate', handlePopState);
      }
    } catch (_) {}
  }, [routeFromPath]);

  // Update URL history state helper
  const navigateUrl = (url: string) => {
    try {
      if (typeof window !== 'undefined' && window.location && window.history) {
        if (window.location.pathname !== url) {
          window.history.pushState({}, '', url);
        }
      }
    } catch (_) {
      // In restricted iframe environments, pushState is silently handled
    }
  };

  // View Navigation Handlers
  const handleGoHome = () => {
    setViewMode('home');
    navigateUrl('/');
    try {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (_) {}
  };

  const handleGoToAllCalculators = (categoryId?: string) => {
    if (typeof categoryId === 'string' && categoryId !== 'all') {
      const validCat = CATEGORIES.find(c => c.id === categoryId);
      if (validCat) {
        setSelectedCategoryId(validCat.id);
      }
    }
    setViewMode('all-calculators');
    navigateUrl('/calculators');
    try {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (_) {}
  };

  const handleSelectCategory = (categoryId: string) => {
    const validId = typeof categoryId === 'string' ? categoryId : 'financial';
    const validCat = CATEGORIES.find(c => c.id === validId) || CATEGORIES[0];
    setSelectedCategoryId(validCat.id);
    setViewMode('category');
    navigateUrl(getCategoryUrl(validCat));
    try {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (_) {}
  };

  const handleSelectCalculator = (calculatorId: string) => {
    const validId = typeof calculatorId === 'string' ? calculatorId : 'mortgage-calculator';
    const calc = CALCULATORS.find(c => c.id === validId) || CALCULATORS[0];
    setSelectedCalculatorId(calc.id);
    setSelectedCategoryId(calc.category);
    setViewMode('calculator');
    navigateUrl(getCalculatorUrl(calc));
    try {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (_) {}
  };

  const handleGoToBlog = () => {
    setViewMode('blog');
    navigateUrl('/blog');
    try {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (_) {}
  };

  const handleSelectPost = (slug: string) => {
    const validSlug = typeof slug === 'string' ? slug : 'how-mortgage-calculations-work';
    const post = BLOG_POSTS.find(p => p.slug === validSlug) || BLOG_POSTS[0];
    setSelectedBlogSlug(post.slug);
    setViewMode('blog-post');
    navigateUrl(getBlogPostUrl(post.slug));
    try {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (_) {}
  };

  const handleGoToAbout = () => {
    setViewMode('about');
    navigateUrl('/about');
    try {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (_) {}
  };

  const handleGoToContact = () => {
    setViewMode('contact');
    navigateUrl('/contact');
    try {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (_) {}
  };

  const handleGoToSitemap = () => {
    setViewMode('sitemap');
    navigateUrl('/sitemap');
    try {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (_) {}
  };

  const handleGoToPrivacy = () => {
    setLegalTab('privacy');
    setViewMode('privacy');
    navigateUrl('/privacy');
    try {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (_) {}
  };

  const handleGoToTerms = () => {
    setLegalTab('terms');
    setViewMode('terms');
    navigateUrl('/terms');
    try {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (_) {}
  };

  const handleGoToDisclaimer = () => {
    setLegalTab('disclaimer');
    setViewMode('disclaimer');
    navigateUrl('/disclaimer');
    try {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (_) {}
  };

  const handleSaveCalculation = useCallback((summary: string, inputs: any, results: any) => {
    const calc = getCalculator(selectedCalculatorId);
    const newEntry: SavedCalculation = {
      id: Date.now().toString(),
      calculatorId: selectedCalculatorId,
      calculatorName: calc ? calc.name : 'Calculation',
      summary,
      timestamp: Date.now(),
      inputs,
      results
    };
    setSavedCalculations(prev => [newEntry, ...prev]);
  }, [selectedCalculatorId, getCalculator]);

  const handleClearSavedHistory = () => {
    setSavedCalculations([]);
  };

  const currentCalculator = getCalculator(selectedCalculatorId);
  const currentCategory = getCategory(selectedCategoryId);
  const currentBlogPost = getBlogPost(selectedBlogSlug);

  // Dynamic SEO Synchronization
  useEffect(() => {
    const origin = typeof window !== 'undefined' ? window.location.origin : 'https://calculio.site';

    if (viewMode === 'calculator') {
      const calcSchema = buildCalculatorSchema(currentCalculator, origin);
      const breadcrumbSchema = buildBreadcrumbSchema([
        { name: t('nav.home', 'Home'), url: origin },
        { name: currentCategory.name, url: `${origin}${getCategoryUrl(currentCategory)}` },
        { name: currentCalculator.name, url: `${origin}${getCalculatorUrl(currentCalculator)}` }
      ]);

      updateDocumentSeo({
        title: `${currentCalculator.name} - ${t('seo.calcSuffix', 'Free Online Calculator | Calculio')}`,
        description: currentCalculator.metaDescription || currentCalculator.description,
        keywords: currentCalculator.metaKeywords || currentCalculator.tags,
        canonicalUrl: getCalculatorUrl(currentCalculator),
        schema: [calcSchema, breadcrumbSchema]
      });
    } else if (viewMode === 'blog-post') {
      const articleSchema = buildArticleSchema(currentBlogPost, origin);
      const breadcrumbSchema = buildBreadcrumbSchema([
        { name: t('nav.home', 'Home'), url: origin },
        { name: t('nav.blog', 'Blog'), url: `${origin}/blog` },
        { name: currentBlogPost.title, url: `${origin}${getBlogPostUrl(currentBlogPost.slug)}` }
      ]);

      updateDocumentSeo({
        title: `${currentBlogPost.title} | ${t('nav.tagline', 'Calculio Guides')}`,
        description: currentBlogPost.metaDescription || currentBlogPost.excerpt,
        keywords: currentBlogPost.metaKeywords || currentBlogPost.tags,
        canonicalUrl: getBlogPostUrl(currentBlogPost.slug),
        ogType: 'article',
        ogImage: currentBlogPost.coverImage,
        author: currentBlogPost.author.name,
        publishedTime: currentBlogPost.publishedAt,
        modifiedTime: currentBlogPost.updatedAt,
        schema: [articleSchema, breadcrumbSchema]
      });
    } else if (viewMode === 'all-calculators') {
      updateDocumentSeo({
        title: t('seo.allCalculatorsTitle', 'All Free Online Calculators | Calculio Directory'),
        description: t('seo.allCalculatorsDesc', 'Browse all free online calculators across finance, health, math, business, real estate, taxes, and daily tools. Accurate, instant results.'),
        canonicalUrl: '/calculators'
      });
    } else if (viewMode === 'blog') {
      updateDocumentSeo({
        title: t('seo.blogTitle', 'Calculio Blog - Formulas, Amortization Math & Health Guides'),
        description: t('seo.blogDescription', 'Educational articles, mathematical proofs, and step-by-step calculation guides by quantitative financial analysts and kinesiology researchers.'),
        keywords: ['calculator blog', 'mortgage math', 'bmi calculation formula', 'compound interest rule of 72', 'unit conversion guide'],
        canonicalUrl: '/blog'
      });
    } else if (viewMode === 'category') {
      updateDocumentSeo({
        title: `${currentCategory.name} - ${t('seo.categorySuffix', 'Free Online Calculation Tools | Calculio')}`,
        description: `${currentCategory.description} Browse all ${currentCategory.calculatorsCount} verified precision calculation engines.`,
        canonicalUrl: getCategoryUrl(currentCategory)
      });
    } else if (viewMode === 'about') {
      updateDocumentSeo({
        title: t('seo.aboutTitle', 'About Calculio - Free, Fast & Accessible Online Calculators'),
        description: t('seo.aboutDescription', 'Learn about Calculio, our mission to simplify everyday math and financial calculations, our diverse tool categories, and our commitment to client-side privacy.'),
        canonicalUrl: '/about'
      });
    } else if (viewMode === 'contact') {
      updateDocumentSeo({
        title: t('seo.contactTitle', 'Contact Us & Request a Calculator | Calculio Community Support'),
        description: t('seo.contactDescription', 'Suggest new calculators, report calculation bugs, or connect with Calculio quantitative analysts and mathematical engineers.'),
        canonicalUrl: '/contact'
      });
    } else if (viewMode === 'sitemap') {
      updateDocumentSeo({
        title: t('seo.sitemapTitle', 'XML Sitemap & Complete Directory Index | Calculio'),
        description: t('seo.sitemapDescription', 'Complete XML sitemap and directory index of all calculation engines, educational guides, and mathematical tools on Calculio.'),
        canonicalUrl: '/sitemap'
      });
    } else if (viewMode === 'privacy') {
      updateDocumentSeo({
        title: 'Privacy Policy | Calculio',
        description: 'Learn how Calculio collects, uses, protects, and handles information when you use our calculators, tools, and website.',
        canonicalUrl: '/privacy'
      });
    } else if (viewMode === 'terms') {
      updateDocumentSeo({
        title: 'Terms of Use | Calculio',
        description: 'Read the Terms of Use for Calculio, including rules for using our calculators, tools, content, and website.',
        canonicalUrl: '/terms'
      });
    } else if (viewMode === 'disclaimer') {
      updateDocumentSeo({
        title: 'Disclaimer | Calculio',
        description: 'Read the Calculio Disclaimer covering calculator results, informational content, third-party data, and use of our online tools.',
        canonicalUrl: '/disclaimer'
      });
    } else {
      updateDocumentSeo({
        title: t('seo.homeTitle', 'Calculio - Free Online Calculators (Finance, Health, Math & Conversions)'),
        description: t('seo.homeDescription', 'Free, fast, and mathematically verified online calculators for mortgages, loans, compound interest, BMI, body fat, scientific math, and unit conversions.'),
        keywords: ['online calculator', 'mortgage calculator', 'loan calculator', 'bmi calculator', 'compound interest calculator', 'unit converter'],
        canonicalUrl: '/'
      });
    }
  }, [viewMode, currentCalculator, currentCategory, currentBlogPost, language, t]);

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-[#0F172A] font-sans selection:bg-[#F97316] selection:text-white">
      {/* Navigation Header */}
      <Navbar
        onGoHome={handleGoHome}
        onGoToAllCalculators={handleGoToAllCalculators}
        onSelectCategory={handleSelectCategory}
        onGoToBlog={handleGoToBlog}
        onGoToAbout={handleGoToAbout}
        onGoToContact={handleGoToContact}
        onGoToSitemap={handleGoToSitemap}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenHistory={() => setIsHistoryOpen(true)}
        savedCount={savedCalculations.length}
        currency={currency}
        onChangeCurrency={setCurrency}
        currentView={viewMode}
        selectedCategoryId={selectedCategoryId}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        <ErrorBoundary>
        {/* VIEW 1: Home View */}
        {viewMode === 'home' && (
          <div>
            {/* 1. Clean Hero with Main Calculator Search */}
            <HeroSection
              onSelectCalculator={handleSelectCalculator}
              onSelectCategory={handleSelectCategory}
              onBrowseAll={handleGoToAllCalculators}
              onScrollToPopular={() => {
                document.getElementById('popular-calculators-section')?.scrollIntoView({ behavior: 'smooth' });
              }}
            />

            {/* 2. Popular Calculators */}
            <FeaturedCalculators
              onSelectCalculator={handleSelectCalculator}
              onViewAllCalculators={handleGoToAllCalculators}
            />

            {/* 3. Browse by Category */}
            <CategoryGrid
              onSelectCategory={handleSelectCategory}
              onSelectCalculator={handleSelectCalculator}
            />

            {/* 4. Trust + FAQ (Two Columns) */}
            <TrustAndFaqSection />
          </div>
        )}

        {/* VIEW 2: All Calculators Complete Directory View */}
        {viewMode === 'all-calculators' && (
          <AllCalculatorsView
            onSelectCalculator={handleSelectCalculator}
            onSelectCategory={handleSelectCategory}
            onGoHome={handleGoHome}
            initialCategory={selectedCategoryId !== 'all' ? selectedCategoryId : undefined}
          />
        )}

        {/* VIEW 3: Category Directory View */}
        {viewMode === 'category' && (
          <CategoryView
            categoryId={selectedCategoryId}
            onSelectCalculator={handleSelectCalculator}
            onSelectCategory={handleSelectCategory}
            onGoHome={handleGoHome}
          />
        )}

        {/* VIEW 4: Calculator Detail View */}
        {viewMode === 'calculator' && (
          <CalculatorDetailView
            calculator={currentCalculator}
            currencySymbol={currencySymbol}
            onSelectCalculator={handleSelectCalculator}
            onSelectCategory={handleSelectCategory}
            onGoHome={handleGoHome}
            onSaveCalculation={handleSaveCalculation}
            onGoToDisclaimer={handleGoToDisclaimer}
          />
        )}

        {/* VIEW 5: Blog Articles List View */}
        {viewMode === 'blog' && (
          <BlogListView
            onSelectPost={handleSelectPost}
            onSelectCategory={handleSelectCategory}
            onSelectCalculator={handleSelectCalculator}
            onGoHome={handleGoHome}
          />
        )}

        {/* VIEW 6: Single Blog Post Guide View */}
        {viewMode === 'blog-post' && (
          <BlogPostView
            post={currentBlogPost}
            onSelectPost={handleSelectPost}
            onSelectCalculator={handleSelectCalculator}
            onSelectCategory={handleSelectCategory}
            onGoToBlogList={handleGoToBlog}
            onGoHome={handleGoHome}
          />
        )}

        {/* VIEW 7: About Us View */}
        {viewMode === 'about' && (
          <AboutView
            onGoHome={handleGoHome}
            onGoToBlog={handleGoToBlog}
            onGoToContact={handleGoToContact}
            onSelectCategory={handleSelectCategory}
          />
        )}

        {/* VIEW 8: Contact & Request View */}
        {viewMode === 'contact' && (
          <ContactView
            onGoHome={handleGoHome}
            onGoToAbout={handleGoToAbout}
            onGoToBlog={handleGoToBlog}
          />
        )}

        {/* VIEW 9: XML Sitemap Inspector View */}
        {viewMode === 'sitemap' && (
          <SitemapView
            onSelectCalculator={handleSelectCalculator}
            onSelectCategory={handleSelectCategory}
            onSelectPost={handleSelectPost}
            onGoHome={handleGoHome}
            onGoToAbout={handleGoToAbout}
            onGoToContact={handleGoToContact}
            onGoToBlog={handleGoToBlog}
            onGoToPrivacy={handleGoToPrivacy}
            onGoToTerms={handleGoToTerms}
            onGoToDisclaimer={handleGoToDisclaimer}
            onGoToAllCalculators={handleGoToAllCalculators}
          />
        )}

        {/* VIEW 10: Legal, Privacy Policy, Terms & Disclaimer View */}
        {(viewMode === 'privacy' || viewMode === 'terms' || viewMode === 'disclaimer') && (
          <LegalView
            activeTab={legalTab}
            onChangeTab={(tab) => {
              setLegalTab(tab);
              setViewMode(tab);
              navigateUrl(`/${tab}`);
            }}
            onGoHome={handleGoHome}
            onGoToAbout={handleGoToAbout}
            onGoToContact={handleGoToContact}
            onGoToAllCalculators={handleGoToAllCalculators}
          />
        )}
        </ErrorBoundary>
      </main>

      {/* Footer */}
      <Footer
        onSelectCalculator={handleSelectCalculator}
        onSelectCategory={handleSelectCategory}
        onGoHome={handleGoHome}
        onGoToAllCalculators={handleGoToAllCalculators}
        onGoToBlog={handleGoToBlog}
        onGoToAbout={handleGoToAbout}
        onGoToContact={handleGoToContact}
        onGoToSitemap={handleGoToSitemap}
        onGoToPrivacy={handleGoToPrivacy}
        onGoToTerms={handleGoToTerms}
        onGoToDisclaimer={handleGoToDisclaimer}
        onSelectPost={handleSelectPost}
      />

      {/* Spotlight Search Modal */}
      <QuickSearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectCalculator={handleSelectCalculator}
        onSelectCategory={handleSelectCategory}
      />

      {/* Calculation History Drawer */}
      <SavedHistoryDrawer
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
        savedCalculations={savedCalculations}
        onClearAll={handleClearSavedHistory}
        onSelectCalculation={(item) => handleSelectCalculator(item.calculatorId)}
      />
    </div>
  );
}

export default function App() {
  return (
    <CurrencyProvider>
      <LanguageProvider>
        <AppContent />
      </LanguageProvider>
    </CurrencyProvider>
  );
}
