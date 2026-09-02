import { CalculatorMeta, CategoryMeta, BlogPost } from '../types';
import { CATEGORIES } from '../data/categories';

export interface SeoConfig {
  title: string;
  description: string;
  keywords?: string[];
  canonicalUrl?: string;
  ogType?: 'website' | 'article' | 'profile';
  ogImage?: string;
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
  schema?: Record<string, any> | Record<string, any>[];
}

/**
 * Category URL path mapping
 */
export const CATEGORY_URL_PREFIX: Record<string, string> = {
  'financial': 'financial-calculators',
  'fitness-health': 'health-calculators',
  'math-algebra': 'math-calculators',
  'real-estate': 'real-estate-calculators',
  'tax': 'tax-calculators',
  'business': 'business-calculators',
  'construction': 'construction-calculators',
  'engineering': 'engineering-calculators',
  'education': 'education-calculators',
  'cryptocurrency': 'crypto-calculators',
  'conversion': 'conversion-calculators',
  'date-time': 'date-time-calculators',
  'construction-other': 'other-calculators'
};

/**
 * Reverse mapping from URL prefix to CategoryId
 */
export const URL_PREFIX_TO_CATEGORY: Record<string, string> = {
  'financial-calculators': 'financial',
  'financial': 'financial',
  'health-calculators': 'fitness-health',
  'fitness-health': 'fitness-health',
  'math-calculators': 'math-algebra',
  'math-algebra': 'math-algebra',
  'real-estate-calculators': 'real-estate',
  'real-estate': 'real-estate',
  'tax-calculators': 'tax',
  'tax': 'tax',
  'business-calculators': 'business',
  'business': 'business',
  'construction-calculators': 'construction',
  'construction': 'construction',
  'engineering-calculators': 'engineering',
  'engineering': 'engineering',
  'education-calculators': 'education',
  'education': 'education',
  'crypto-calculators': 'cryptocurrency',
  'cryptocurrency': 'cryptocurrency',
  'conversion-calculators': 'conversion',
  'conversion': 'conversion',
  'date-time-calculators': 'date-time',
  'date-time': 'date-time',
  'other-calculators': 'construction-other',
  'construction-other': 'construction-other'
};

/**
 * Generates canonical SEO friendly path for a calculator
 */
export function getCalculatorUrl(calc: CalculatorMeta): string {
  const prefix = CATEGORY_URL_PREFIX[calc.category] || 'calculators';
  return `/${prefix}/${calc.id}`;
}

/**
 * Generates canonical SEO friendly path for a category
 */
export function getCategoryUrl(category: CategoryMeta | string): string {
  const catId = typeof category === 'string' ? category : category.id;
  const prefix = CATEGORY_URL_PREFIX[catId] || catId;
  return `/${prefix}`;
}

/**
 * Generates canonical SEO friendly path for a blog post
 */
export function getBlogPostUrl(slug: string): string {
  return `/blog/${slug}`;
}

/**
 * Helper to update HTML document head metadata tags and JSON-LD schema
 */
export function updateDocumentSeo(config: SeoConfig) {
  try {
    if (typeof document === 'undefined') return;

    // Title
    document.title = config.title;

    // Meta description
    let descEl = document.querySelector('meta[name="description"]') as HTMLMetaElement | null;
    if (!descEl) {
      descEl = document.createElement('meta');
      descEl.name = 'description';
      document.head.appendChild(descEl);
    }
    descEl.content = config.description;

    // Meta keywords
    if (config.keywords && config.keywords.length > 0) {
      let kwEl = document.querySelector('meta[name="keywords"]') as HTMLMetaElement | null;
      if (!kwEl) {
        kwEl = document.createElement('meta');
        kwEl.name = 'keywords';
        document.head.appendChild(kwEl);
      }
      kwEl.content = config.keywords.join(', ');
    }

    // Canonical link
    const CANONICAL_ORIGIN = 'https://calculio.site';

    const fullCanonical = config.canonicalUrl 
      ? (config.canonicalUrl.startsWith('http') ? config.canonicalUrl : `${CANONICAL_ORIGIN}${config.canonicalUrl.startsWith('/') ? config.canonicalUrl : `/${config.canonicalUrl}`}`)
      : CANONICAL_ORIGIN;

    let canonEl = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonEl) {
      canonEl = document.createElement('link');
      canonEl.rel = 'canonical';
      document.head.appendChild(canonEl);
    }
    canonEl.href = fullCanonical;

    // Open Graph helper
    const setOgTag = (property: string, content: string) => {
      let tag = document.querySelector(`meta[property="${property}"]`) as HTMLMetaElement | null;
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute('property', property);
        document.head.appendChild(tag);
      }
      tag.content = content;
    };

    setOgTag('og:title', config.title);
    setOgTag('og:description', config.description);
    setOgTag('og:url', fullCanonical);
    setOgTag('og:type', config.ogType || 'website');
    setOgTag('og:site_name', 'Calculio - Free Online Calculators');
    setOgTag('og:image', config.ogImage || 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=1200&q=80');

    if (config.author) {
      setOgTag('article:author', config.author);
    }
    if (config.publishedTime) {
      setOgTag('article:published_time', config.publishedTime);
    }
    if (config.modifiedTime) {
      setOgTag('article:modified_time', config.modifiedTime);
    }

    // Twitter Cards
    const setTwitterTag = (name: string, content: string) => {
      let tag = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement | null;
      if (!tag) {
        tag = document.createElement('meta');
        tag.name = name;
        document.head.appendChild(tag);
      }
      tag.content = content;
    };

    setTwitterTag('twitter:card', 'summary_large_image');
    setTwitterTag('twitter:title', config.title);
    setTwitterTag('twitter:description', config.description);
    setTwitterTag('twitter:image', config.ogImage || 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=1200&q=80');

    // JSON-LD Structured Data Injection
    let schemaScript = document.getElementById('calculio-jsonld-schema') as HTMLScriptElement | null;
    if (!schemaScript) {
      schemaScript = document.createElement('script');
      schemaScript.id = 'calculio-jsonld-schema';
      schemaScript.type = 'application/ld+json';
      document.head.appendChild(schemaScript);
    }

    const defaultBaseSchema = {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: 'Calculio',
      url: CANONICAL_ORIGIN,
      potentialAction: {
        '@type': 'SearchAction',
        target: `${CANONICAL_ORIGIN}/calculators?q={search_term_string}`,
        'query-input': 'required name=search_term_string'
      }
    };

    const finalSchema = config.schema 
      ? (Array.isArray(config.schema) ? [defaultBaseSchema, ...config.schema] : [defaultBaseSchema, config.schema])
      : defaultBaseSchema;

    schemaScript.textContent = JSON.stringify(finalSchema, null, 2);
  } catch (e) {
    // Fail silently in restricted environment
  }
}

/**
 * Generate Schema for a Calculator
 */
export function buildCalculatorSchema(calc: CalculatorMeta, origin: string = 'https://calculio.site') {
  const cat = CATEGORIES.find(c => c.id === calc.category);
  const url = `${origin}${getCalculatorUrl(calc)}`;

  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: calc.name,
    headline: `${calc.name} - Free Online Tool`,
    description: calc.description,
    applicationCategory: cat ? cat.name : 'UtilityApplication',
    operatingSystem: 'All (Web Browser, iOS, Android, macOS, Windows)',
    url: url,
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD'
    },
    featureList: [
      'Instant real-time calculations',
      'Interactive formula explanations',
      'Visual breakdown charts',
      'Print-ready export and calculation history'
    ]
  };
}

/**
 * Generate Schema for a Blog Article
 */
export function buildArticleSchema(post: BlogPost, origin: string = 'https://calculio.site') {
  const url = `${origin}${getBlogPostUrl(post.slug)}`;

  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url
    },
    headline: post.title,
    description: post.excerpt,
    image: post.coverImage,
    author: {
      '@type': 'Person',
      name: post.author.name,
      jobTitle: post.author.role
    },
    publisher: {
      '@type': 'Organization',
      name: 'Calculio Editorial Team',
      logo: {
        '@type': 'ImageObject',
        url: `${origin}/favicon.ico`
      }
    },
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    keywords: post.tags.join(', ')
  };
}

/**
 * Generate BreadcrumbList Schema
 */
export function buildBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url
    }))
  };
}
