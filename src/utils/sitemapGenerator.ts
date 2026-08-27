import { CALCULATORS } from '../data/calculatorDirectory';
import { CATEGORIES } from '../data/categories';
import { BLOG_POSTS } from '../data/blogPosts';
import { getCalculatorUrl, getCategoryUrl, getBlogPostUrl } from './seo';

export interface SitemapEntry {
  loc: string;
  lastmod: string;
  changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority: string;
  title: string;
  category?: string;
}

export function generateSitemapEntries(baseUrl: string = 'https://calculio.site'): SitemapEntry[] {
  const currentDate = new Date().toISOString().split('T')[0];
  const entries: SitemapEntry[] = [];

  // Home
  entries.push({
    loc: `${baseUrl}/`,
    lastmod: currentDate,
    changefreq: 'daily',
    priority: '1.0',
    title: 'Calculio - Free Online Calculators Hub'
  });

  // Calculators Directory
  entries.push({
    loc: `${baseUrl}/calculators`,
    lastmod: currentDate,
    changefreq: 'daily',
    priority: '0.9',
    title: 'All Online Calculators Directory - Calculio'
  });

  // Blog Home
  entries.push({
    loc: `${baseUrl}/blog`,
    lastmod: currentDate,
    changefreq: 'daily',
    priority: '0.8',
    title: 'Calculio Blog - Calculation Guides & Mathematical Insights'
  });

  // About & Contact
  entries.push({
    loc: `${baseUrl}/about`,
    lastmod: '2026-08-26',
    changefreq: 'monthly',
    priority: '0.5',
    title: 'About Calculio - Editorial Standards & Calculation Precision'
  });

  entries.push({
    loc: `${baseUrl}/contact`,
    lastmod: '2026-08-26',
    changefreq: 'monthly',
    priority: '0.5',
    title: 'Contact Us & Calculator Request - Calculio'
  });

  // Legal & Policy Pages
  entries.push({
    loc: `${baseUrl}/privacy`,
    lastmod: '2026-08-26',
    changefreq: 'monthly',
    priority: '0.4',
    title: 'Privacy Policy | Calculio'
  });

  entries.push({
    loc: `${baseUrl}/terms`,
    lastmod: '2026-08-26',
    changefreq: 'monthly',
    priority: '0.4',
    title: 'Terms of Use | Calculio'
  });

  entries.push({
    loc: `${baseUrl}/disclaimer`,
    lastmod: '2026-08-26',
    changefreq: 'monthly',
    priority: '0.4',
    title: 'Disclaimer | Calculio'
  });

  entries.push({
    loc: `${baseUrl}/sitemap`,
    lastmod: '2026-08-26',
    changefreq: 'monthly',
    priority: '0.3',
    title: 'Visual & XML Sitemap | Calculio'
  });

  // Categories
  CATEGORIES.forEach(cat => {
    entries.push({
      loc: `${baseUrl}${getCategoryUrl(cat)}`,
      lastmod: currentDate,
      changefreq: 'weekly',
      priority: '0.9',
      title: `${cat.name} - Calculio Directory`,
      category: cat.name
    });
  });

  // Calculators
  CALCULATORS.forEach(calc => {
    const cat = CATEGORIES.find(c => c.id === calc.category);
    entries.push({
      loc: `${baseUrl}${getCalculatorUrl(calc)}`,
      lastmod: currentDate,
      changefreq: 'weekly',
      priority: calc.popular || calc.featured ? '0.8' : '0.7',
      title: calc.name,
      category: cat ? cat.name : undefined
    });
  });

  // Blog Posts
  BLOG_POSTS.forEach(post => {
    entries.push({
      loc: `${baseUrl}${getBlogPostUrl(post.slug)}`,
      lastmod: post.updatedAt || post.publishedAt,
      changefreq: 'monthly',
      priority: '0.7',
      title: post.title,
      category: post.categoryLabel
    });
  });

  // Deduplicate by loc to guarantee no duplicate canonical URLs
  const seen = new Set<string>();
  const uniqueEntries: SitemapEntry[] = [];
  for (const entry of entries) {
    if (!seen.has(entry.loc)) {
      seen.add(entry.loc);
      uniqueEntries.push(entry);
    }
  }

  return uniqueEntries;
}

function escapeXml(str: string): string {
  return str.replace(/[<>&'"]/g, c => {
    switch (c) {
      case '<': return '&lt;';
      case '>': return '&gt;';
      case '&': return '&amp;';
      case '\'': return '&apos;';
      case '"': return '&quot;';
      default: return c;
    }
  });
}

export function generateSitemapXml(baseUrl: string = 'https://calculio.site'): string {
  const entries = generateSitemapEntries(baseUrl);

  const xmlUrls = entries.map(e => `  <url>
    <loc>${escapeXml(e.loc)}</loc>
    <lastmod>${e.lastmod}</lastmod>
    <changefreq>${e.changefreq}</changefreq>
    <priority>${e.priority}</priority>
  </url>`).join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${xmlUrls}
</urlset>`;
}
