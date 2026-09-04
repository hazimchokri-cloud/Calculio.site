export type CategoryId = 
  | 'financial'
  | 'fitness-health'
  | 'math-algebra'
  | 'conversion'
  | 'date-time'
  | 'construction'
  | 'real-estate'
  | 'business'
  | 'education'
  | 'engineering'
  | 'tax'
  | 'cryptocurrency'
  | 'construction-other';

export interface FormulaVariable {
  symbol: string;
  name: string;
  description: string;
  unit?: string;
}

export interface CalculationExample {
  title: string;
  scenario: string;
  inputs: Record<string, string | number>;
  steps: string[];
  result: string;
  takeaway?: string;
}

export interface PracticalUseCase {
  title: string;
  description: string;
  targetAudience: string;
  benefits: string[];
}

export interface CalculatorExplanation {
  howItWorks: {
    summary: string;
    steps: { title: string; detail: string }[];
    keyAssumptions?: string[];
  };
  formula: {
    title: string;
    equation: string;
    latex?: string;
    variables: FormulaVariable[];
    explanation: string;
  };
  examples: CalculationExample[];
  useCases: PracticalUseCase[];
  faqs?: { question: string; answer: string }[];
}

export interface CalculatorMeta {
  id: string;
  name: string;
  slug: string;
  category: CategoryId;
  description: string;
  shortDescription: string;
  iconName: string;
  popular?: boolean;
  featured?: boolean;
  recentlyAdded?: boolean;
  tags: string[];
  metaDescription?: string;
  metaKeywords?: string[];
  formulaSummary?: string;
  explanation?: CalculatorExplanation;
  faqs?: { question: string; answer: string }[];
  educationalContent?: {
    title: string;
    sections: { heading: string; body: string }[];
  };
}

export interface CategoryMeta {
  id: CategoryId;
  name: string;
  slug: string;
  description: string;
  iconName: string;
  color: string;
  badgeBg: string;
  badgeText: string;
  calculatorsCount: number;
}

export interface SavedCalculation {
  id: string;
  calculatorId: string;
  calculatorName: string;
  timestamp: number;
  summary: string;
  inputs: Record<string, any>;
  results: Record<string, any>;
}

export type UnitSystem = 'imperial' | 'metric';
export type CurrencyCode = 'USD' | 'EUR' | 'GBP' | 'CAD' | 'AUD' | 'JPY' | 'INR';
export type CurrencySymbol = '$' | '€' | '£' | '¥' | '₹' | 'C$' | 'A$';

export const CURRENCY_SYMBOLS: Record<CurrencyCode, CurrencySymbol> = {
  USD: '$',
  EUR: '€',
  GBP: '£',
  CAD: 'C$',
  AUD: 'A$',
  JPY: '¥',
  INR: '₹'
};

export interface BlogAuthor {
  name: string;
  role: string;
  avatar: string;
  bio: string;
  credentials: string;
}

export interface BlogSection {
  id: string;
  title: string;
  content: string[];
  formula?: {
    equation: string;
    description: string;
    variables?: { symbol: string; meaning: string }[];
  };
  callout?: {
    type: 'tip' | 'warning' | 'info' | 'example';
    title: string;
    text: string;
  };
  table?: {
    headers: string[];
    rows: string[][];
    caption?: string;
  };
}

export type BlogCategory = 
  | 'finance'
  | 'health-fitness'
  | 'math'
  | 'conversions'
  | 'real-estate'
  | 'business'
  | 'education'
  | 'general-calculations'
  | CategoryId
  | 'general-education';

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  coverImage: string;
  imageAlt?: string;
  category: BlogCategory | string;
  categoryLabel: string;
  author: BlogAuthor;
  publishedAt: string;
  updatedAt: string;
  readTimeMinutes: number;
  featured?: boolean;
  tags: string[];
  relatedCalculatorIds: string[];
  relatedBlogSlugs?: string[];
  sections: BlogSection[];
  keyTakeaways: string[];
  faqs: { question: string; answer: string }[];
  metaDescription: string;
  metaKeywords: string[];
}

export type AppViewMode = 
  | 'home' 
  | 'all-calculators' 
  | 'category' 
  | 'calculator' 
  | 'blog' 
  | 'blog-post' 
  | 'about' 
  | 'contact' 
  | 'sitemap'
  | 'privacy'
  | 'terms'
  | 'disclaimer'
  | 'not-found';

export interface BreadcrumbItem {
  label: string;
  href?: string;
  onClick?: () => void;
  active?: boolean;
}
