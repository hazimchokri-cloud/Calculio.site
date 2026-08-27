import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import { Language, SUPPORTED_LANGUAGES, TranslationDictionary } from './types';
import { enLocale } from './locales/en';
import { frLocale } from './locales/fr';
import { arLocale } from './locales/ar';
import { CategoryMeta, CalculatorMeta, BlogPost, CalculatorExplanation } from '../types';
import { CATEGORIES } from '../data/categories';
import { CALCULATORS } from '../data/calculatorDirectory';
import { BLOG_POSTS } from '../data/blogPosts';
import { CURATED_EXPLANATIONS } from '../data/calculatorExplanations';
import { CATEGORIES_FR } from './data/categoriesFr';
import { CALCULATORS_FR_MAP } from './data/calculatorsFr';
import { BLOG_POSTS_FR_MAP } from './data/blogPostsFr';
import { EXPLANATIONS_FR_MAP } from './data/explanationsFr';
import { CATEGORIES_AR } from './data/categoriesAr';
import { CALCULATORS_AR_MAP } from './data/calculatorsAr';
import { BLOG_POSTS_AR_MAP } from './data/blogPostsAr';

interface LanguageContextValue {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string, fallback?: string, params?: Record<string, string | number>) => string;
  getCategory: (category: CategoryMeta | string) => CategoryMeta;
  getCalculator: (calculator: CalculatorMeta | string) => CalculatorMeta;
  getBlogPost: (post: BlogPost | string) => BlogPost;
  getExplanation: (calcId: string) => CalculatorExplanation | undefined;
  categories: CategoryMeta[];
  calculators: CalculatorMeta[];
  blogPosts: BlogPost[];
}

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

const LOCALES: Record<Language, TranslationDictionary> = {
  en: enLocale,
  fr: frLocale,
  ar: arLocale
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    try {
      const stored = (localStorage.getItem('calculio_lang') || localStorage.getItem('calchub_lang')) as Language | null;
      if (stored && (stored === 'en' || stored === 'fr' || stored === 'ar')) {
        return stored;
      }
      // Check browser navigator language
      if (typeof navigator !== 'undefined' && navigator.language) {
        const navLang = navigator.language.toLowerCase();
        if (navLang.startsWith('ar')) return 'ar';
        if (navLang.startsWith('fr')) return 'fr';
      }
    } catch {
      // ignore
    }
    return 'en';
  });

  const setLanguage = useCallback((newLang: Language) => {
    setLanguageState(newLang);
    try {
      localStorage.setItem('calculio_lang', newLang);
    } catch {
      // ignore
    }
    if (typeof document !== 'undefined') {
      document.documentElement.lang = newLang;
      document.documentElement.dir = newLang === 'ar' ? 'rtl' : 'ltr';
    }
  }, []);

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = language;
      document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    }
  }, [language]);

  // Nested translation lookup
  const t = useCallback((path: string, fallback?: string, params?: Record<string, string | number>): string => {
    const dict = LOCALES[language] || enLocale;
    const parts = path.split('.');
    let current: any = dict;

    for (const part of parts) {
      if (current && typeof current === 'object' && part in current) {
        current = current[part];
      } else {
        // Fallback to English dictionary
        let enCurrent: any = enLocale;
        for (const enPart of parts) {
          if (enCurrent && typeof enCurrent === 'object' && enPart in enCurrent) {
            enCurrent = enCurrent[enPart];
          } else {
            enCurrent = undefined;
            break;
          }
        }
        current = enCurrent;
        break;
      }
    }

    let result = typeof current === 'string' ? current : (fallback || path);

    if (params) {
      Object.entries(params).forEach(([key, val]) => {
        result = result.replace(new RegExp(`{${key}}`, 'g'), String(val));
      });
    }

    return result;
  }, [language]);

  // Localized Categories
  const getCategory = useCallback((category: CategoryMeta | string): CategoryMeta => {
    const catId = typeof category === 'string' ? category : category.id;
    const baseCategory = CATEGORIES.find(c => c.id === catId) || (typeof category === 'object' ? category : CATEGORIES[0]);

    if (language === 'fr') {
      const frCat = CATEGORIES_FR.find(c => c.id === catId);
      if (frCat) {
        return {
          ...baseCategory,
          name: frCat.name,
          description: frCat.description,
          badgeText: frCat.badgeText
        };
      }
    } else if (language === 'ar') {
      const arCat = CATEGORIES_AR.find(c => c.id === catId);
      if (arCat) {
        return {
          ...baseCategory,
          name: arCat.name,
          description: arCat.description,
          badgeText: arCat.badgeText
        };
      }
    }

    return baseCategory;
  }, [language]);

  // Localized Calculators
  const getCalculator = useCallback((calculator: CalculatorMeta | string): CalculatorMeta => {
    const calcId = typeof calculator === 'string' ? calculator : calculator.id;
    const baseCalc = CALCULATORS.find(c => c.id === calcId) || (typeof calculator === 'object' ? calculator : CALCULATORS[0]);

    if (language === 'fr') {
      const frOverride = CALCULATORS_FR_MAP[calcId];
      if (frOverride) {
        return {
          ...baseCalc,
          name: frOverride.name || baseCalc.name,
          description: frOverride.description || baseCalc.description,
          shortDescription: frOverride.shortDescription || baseCalc.shortDescription,
          tags: frOverride.tags || baseCalc.tags,
          formulaSummary: frOverride.formulaSummary || baseCalc.formulaSummary,
          faqs: frOverride.faqs || baseCalc.faqs
        };
      }
    } else if (language === 'ar') {
      const arOverride = CALCULATORS_AR_MAP[calcId];
      if (arOverride) {
        return {
          ...baseCalc,
          name: arOverride.name || baseCalc.name,
          description: arOverride.description || baseCalc.description,
          shortDescription: arOverride.shortDescription || baseCalc.shortDescription,
          tags: arOverride.tags || baseCalc.tags,
          formulaSummary: arOverride.formulaSummary || baseCalc.formulaSummary,
          faqs: arOverride.faqs || baseCalc.faqs
        };
      }
    }

    return baseCalc;
  }, [language]);

  // Localized Blog Posts
  const getBlogPost = useCallback((post: BlogPost | string): BlogPost => {
    const slug = typeof post === 'string' ? post : post.slug;
    const basePost = BLOG_POSTS.find(p => p.slug === slug) || (typeof post === 'object' ? post : BLOG_POSTS[0]);

    if (language === 'fr') {
      const frOverride = BLOG_POSTS_FR_MAP[slug];
      if (frOverride) {
        return {
          ...basePost,
          title: frOverride.title || basePost.title,
          excerpt: frOverride.excerpt || basePost.excerpt,
          categoryLabel: frOverride.categoryLabel || basePost.categoryLabel,
          tags: frOverride.tags || basePost.tags,
          metaDescription: frOverride.metaDescription || basePost.metaDescription,
          keyTakeaways: frOverride.keyTakeaways || basePost.keyTakeaways,
          faqs: frOverride.faqs || basePost.faqs,
          sections: frOverride.sections || basePost.sections
        };
      }
    } else if (language === 'ar') {
      const arOverride = BLOG_POSTS_AR_MAP[slug];
      if (arOverride) {
        return {
          ...basePost,
          title: arOverride.title || basePost.title,
          excerpt: arOverride.excerpt || basePost.excerpt,
          categoryLabel: arOverride.categoryLabel || basePost.categoryLabel,
          tags: arOverride.tags || basePost.tags,
          metaDescription: arOverride.metaDescription || basePost.metaDescription,
          keyTakeaways: arOverride.keyTakeaways || basePost.keyTakeaways,
          faqs: arOverride.faqs || basePost.faqs,
          sections: arOverride.sections || basePost.sections
        };
      }
    }

    return basePost;
  }, [language]);

  // Localized Explanation
  const getExplanation = useCallback((calcId: string): CalculatorExplanation | undefined => {
    const baseExplanation = CURATED_EXPLANATIONS[calcId];
    if (!baseExplanation) return undefined;

    if (language === 'fr') {
      const frExp = EXPLANATIONS_FR_MAP[calcId];
      if (frExp) {
        return {
          ...baseExplanation,
          howItWorks: frExp.howItWorks ? { ...baseExplanation.howItWorks, ...frExp.howItWorks } : baseExplanation.howItWorks,
          formula: frExp.formula ? { ...baseExplanation.formula, ...frExp.formula } : baseExplanation.formula,
          useCases: frExp.useCases || baseExplanation.useCases,
          faqs: frExp.faqs || baseExplanation.faqs
        };
      }
    }

    return baseExplanation;
  }, [language]);

  // All localized collections
  const categories = useMemo(() => {
    return CATEGORIES.map(cat => getCategory(cat));
  }, [getCategory]);

  const calculators = useMemo(() => {
    return CALCULATORS.map(calc => getCalculator(calc));
  }, [getCalculator]);

  const blogPosts = useMemo(() => {
    return BLOG_POSTS.map(post => getBlogPost(post));
  }, [getBlogPost]);

  const contextValue = useMemo<LanguageContextValue>(() => ({
    language,
    setLanguage,
    t,
    getCategory,
    getCalculator,
    getBlogPost,
    getExplanation,
    categories,
    calculators,
    blogPosts
  }), [language, setLanguage, t, getCategory, getCalculator, getBlogPost, getExplanation, categories, calculators, blogPosts]);

  return (
    <LanguageContext.Provider value={contextValue}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextValue => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

