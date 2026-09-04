import fs from 'fs';
import path from 'path';
import { generateSitemapEntries } from '../src/utils/sitemapGenerator';
import { CALCULATORS } from '../src/data/calculatorDirectory';
import { CATEGORIES } from '../src/data/categories';
import { BLOG_POSTS } from '../src/data/blogPosts';
import { 
  CATEGORY_URL_PREFIX, 
  getCalculatorUrl, 
  getCategoryUrl, 
  getBlogPostUrl,
  buildCalculatorSchema,
  buildArticleSchema
} from '../src/utils/seo';

const BASE_URL = 'https://calculio.site';

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

interface RouteConfig {
  routePath: string; // e.g. "/about" or "/financial-calculators/mortgage-calculator"
  title: string;
  description: string;
  canonicalUrl: string;
  schema?: Record<string, any> | Record<string, any>[];
}

function buildRoutes(): RouteConfig[] {
  const routes: RouteConfig[] = [];
  const sitemapEntries = generateSitemapEntries(BASE_URL);

  // Map sitemap entries to RouteConfig
  for (const entry of sitemapEntries) {
    const rawPath = entry.loc.replace(BASE_URL, '');
    const cleanPath = rawPath.replace(/^\/+|\/+$/g, '');
    if (!cleanPath) {
      // Homepage is dist/index.html
      continue;
    }

    let description = 'Free, fast, and mathematically verified online calculation tools with transparent formulas and step-by-step breakdowns on Calculio.';
    let schema: any = undefined;

    // Check if calculator
    const calc = CALCULATORS.find(c => {
      const calcUrl = getCalculatorUrl(c).replace(/^\/+|\/+$/g, '');
      return calcUrl === cleanPath || c.id === cleanPath;
    });

    if (calc) {
      description = calc.metaDescription || calc.description;
      schema = buildCalculatorSchema(calc, BASE_URL);
    } else {
      // Check if category
      const cat = CATEGORIES.find(c => {
        const catUrl = getCategoryUrl(c).replace(/^\/+|\/+$/g, '');
        return catUrl === cleanPath;
      });
      if (cat) {
        description = `${cat.description} Explore verified online calculators with instant calculation results.`;
      } else {
        // Check if blog post
        const post = BLOG_POSTS.find(p => {
          const postUrl = getBlogPostUrl(p.slug).replace(/^\/+|\/+$/g, '');
          return postUrl === cleanPath;
        });
        if (post) {
          description = post.metaDescription || post.excerpt;
          schema = buildArticleSchema(post, BASE_URL);
        } else if (cleanPath === 'about') {
          description = 'About Calculio - Learn our mission to simplify everyday math and financial calculations, our editorial integrity, and client-side privacy.';
        } else if (cleanPath === 'contact') {
          description = 'Contact Calculio support, report a calculation issue, or suggest a new calculation engine.';
        } else if (cleanPath === 'calculators') {
          description = 'Directory of all free online calculators across finance, fitness, math, conversions, business, real estate, and daily calculations.';
        } else if (cleanPath === 'blog') {
          description = 'Calculio Blog - Formulas, amortization math, and in-depth calculation guides.';
        } else if (cleanPath === 'sitemap') {
          description = 'Complete XML sitemap and directory index of all calculation tools on Calculio.';
        } else if (cleanPath === 'privacy') {
          description = 'Calculio Privacy Policy - How we protect your data with 100% private, client-side calculations.';
        } else if (cleanPath === 'terms') {
          description = 'Calculio Terms of Use - Guidelines and agreements for using Calculio calculation tools.';
        } else if (cleanPath === 'disclaimer') {
          description = 'Calculio Disclaimer - Terms covering calculator estimates, formulas, and informational content.';
        }
      }
    }

    routes.push({
      routePath: `/${cleanPath}`,
      title: entry.title,
      description,
      canonicalUrl: entry.loc,
      schema
    });
  }

  // Direct calculator ID aliases: e.g. /mortgage-calculator in addition to /financial-calculators/mortgage-calculator
  for (const calc of CALCULATORS) {
    const directPath = `/${calc.id}`;
    const canonicalPath = getCalculatorUrl(calc);
    if (directPath !== canonicalPath) {
      routes.push({
        routePath: directPath,
        title: `${calc.name} - Free Online Calculator | Calculio`,
        description: calc.metaDescription || calc.description,
        canonicalUrl: `${BASE_URL}${canonicalPath}`,
        schema: buildCalculatorSchema(calc, BASE_URL)
      });
    }
  }

  // Common aliases
  const aliases = [
    {
      routePath: '/all-calculators',
      title: 'All Free Online Calculators | Calculio Directory',
      description: 'Browse all free online calculators across finance, health, math, business, and daily tools.',
      canonicalUrl: `${BASE_URL}/calculators`
    },
    {
      routePath: '/privacy-policy',
      title: 'Privacy Policy | Calculio',
      description: 'Calculio Privacy Policy - How we protect your data with 100% private, client-side calculations.',
      canonicalUrl: `${BASE_URL}/privacy`
    },
    {
      routePath: '/terms-of-use',
      title: 'Terms of Use | Calculio',
      description: 'Calculio Terms of Use - Guidelines and agreements for using Calculio calculation tools.',
      canonicalUrl: `${BASE_URL}/terms`
    },
    {
      routePath: '/terms-of-service',
      title: 'Terms of Service | Calculio',
      description: 'Calculio Terms of Service - Guidelines and agreements for using Calculio calculation tools.',
      canonicalUrl: `${BASE_URL}/terms`
    },
    {
      routePath: '/disclosure',
      title: 'Disclaimer & Disclosure | Calculio',
      description: 'Calculio Disclaimer - Terms covering calculator estimates, formulas, and informational content.',
      canonicalUrl: `${BASE_URL}/disclaimer`
    }
  ];

  for (const alias of aliases) {
    routes.push(alias);
  }

  // Deduplicate by routePath
  const seen = new Set<string>();
  const uniqueRoutes: RouteConfig[] = [];
  for (const r of routes) {
    if (!seen.has(r.routePath)) {
      seen.add(r.routePath);
      uniqueRoutes.push(r);
    }
  }

  return uniqueRoutes;
}

function run() {
  const distDir = path.resolve(process.cwd(), 'dist');
  const indexHtmlPath = path.join(distDir, 'index.html');

  if (!fs.existsSync(indexHtmlPath)) {
    console.error('Error: dist/index.html not found! Run "vite build" before generating static routes.');
    process.exit(1);
  }

  const baseHtml = fs.readFileSync(indexHtmlPath, 'utf8');
  const routes = buildRoutes();

  console.log(`Generating ${routes.length} static HTML route files in dist/...`);

  let count = 0;
  for (const r of routes) {
    const cleanSegments = r.routePath.replace(/^\/+|\/+$/g, '').split('/');
    const targetDir = path.join(distDir, ...cleanSegments);

    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
    }

    let customizedHtml = baseHtml;

    // Update Title
    customizedHtml = customizedHtml.replace(
      /<title>.*?<\/title>/i,
      `<title>${escapeHtml(r.title)}</title>`
    );

    // Update Meta Description
    if (customizedHtml.match(/<meta\s+name=["']description["'][^>]*>/i)) {
      customizedHtml = customizedHtml.replace(
        /<meta\s+name=["']description["'][^>]*>/i,
        `<meta name="description" content="${escapeHtml(r.description)}" />`
      );
    }

    // Update Canonical Link
    if (customizedHtml.match(/<link\s+rel=["']canonical["'][^>]*>/i)) {
      customizedHtml = customizedHtml.replace(
        /<link\s+rel=["']canonical["'][^>]*>/i,
        `<link rel="canonical" href="${r.canonicalUrl}" />`
      );
    } else {
      customizedHtml = customizedHtml.replace(
        /<\/head>/i,
        `  <link rel="canonical" href="${r.canonicalUrl}" />\n  </head>`
      );
    }

    // Update Open Graph tags
    customizedHtml = customizedHtml.replace(
      /<meta\s+property=["']og:title["'][^>]*>/i,
      `<meta property="og:title" content="${escapeHtml(r.title)}" />`
    );
    customizedHtml = customizedHtml.replace(
      /<meta\s+property=["']og:description["'][^>]*>/i,
      `<meta property="og:description" content="${escapeHtml(r.description)}" />`
    );
    customizedHtml = customizedHtml.replace(
      /<meta\s+property=["']og:url["'][^>]*>/i,
      `<meta property="og:url" content="${r.canonicalUrl}" />`
    );

    // Inject JSON-LD Schema if present
    if (r.schema) {
      const schemaScript = `  <script id="calculio-jsonld-schema" type="application/ld+json">${JSON.stringify(r.schema)}</script>\n`;
      customizedHtml = customizedHtml.replace(/<\/head>/i, `${schemaScript}  </head>`);
    }

    const destFile = path.join(targetDir, 'index.html');
    fs.writeFileSync(destFile, customizedHtml, 'utf8');
    count++;
  }

  // Ensure .nojekyll exists in dist/
  const noJekyllDist = path.join(distDir, '.nojekyll');
  fs.writeFileSync(noJekyllDist, '', 'utf8');

  // Ensure CNAME exists in dist/
  const cnameDist = path.join(distDir, 'CNAME');
  if (!fs.existsSync(cnameDist)) {
    fs.writeFileSync(cnameDist, 'calculio.site\n', 'utf8');
  }

  console.log(`Successfully generated ${count} static HTML routes, .nojekyll, and CNAME in dist/!`);
}

run();
