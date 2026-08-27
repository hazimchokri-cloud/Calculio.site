import { CategoryMeta, CalculatorMeta, BlogPost, CalculatorExplanation } from '../types';

export type Language = 'en' | 'fr' | 'ar';

export interface LanguageOption {
  code: Language;
  label: string;
  nativeLabel: string;
  flag: string;
}

export const SUPPORTED_LANGUAGES: LanguageOption[] = [
  {
    code: 'en',
    label: 'English',
    nativeLabel: 'English',
    flag: '🇺🇸'
  },
  {
    code: 'fr',
    label: 'French',
    nativeLabel: 'Français',
    flag: '🇫🇷'
  },
  {
    code: 'ar',
    label: 'Arabic',
    nativeLabel: 'العربية',
    flag: '🇸🇦'
  }
];

export interface TranslationDictionary {
  // Navigation & Header
  nav: {
    home: string;
    financial: string;
    health: string;
    math: string;
    conversion: string;
    blog: string;
    about: string;
    contact: string;
    sitemap: string;
    searchPlaceholder: string;
    searchShortcut: string;
    savedCalculations: string;
    allCalculators: string;
    currency: string;
    language: string;
    selectLanguage: string;
    categories: string;
    tagline: string;
  };

  // Common UI Actions & Words
  common: {
    calculate: string;
    calculating: string;
    reset: string;
    resetDefaults: string;
    share: string;
    copied: string;
    linkCopied: string;
    copyLink?: string;
    summaryCopied: string;
    print: string;
    exportCsv: string;
    save: string;
    saved: string;
    saveResult: string;
    copySummary: string;
    close: string;
    clear: string;
    clearAll: string;
    back: string;
    backToHome: string;
    browseAll: string;
    viewAll: string;
    launch: string;
    readMore: string;
    explore: string;
    learnMore: string;
    search: string;
    filter: string;
    all: string;
    results: string;
    result: string;
    summary: string;
    breakdown: string;
    parameters: string;
    inputs: string;
    options: string;
    notes: string;
    keyTakeaways: string;
    faq: string;
    frequentlyAskedQuestions: string;
    relatedTools: string;
    popularTools: string;
    freeOnlineTool: string;
    realTimeCalculation: string;
    updated: string;
    publishedOn: string;
    minRead: string;
    author: string;
    tableOfContents: string;
    showTable: string;
    hideTable: string;
    yearlySchedule: string;
    monthlySchedule: string;
    year: string;
    month: string;
    total: string;
    annual: string;
    monthly: string;
    daily: string;
    weekly: string;
    percent: string;
    rate: string;
    amount: string;
    value: string;
    status: string;
    verdict: string;
    details: string;
    disclaimer: string;
    educationalPurpose: string;
    noResults: string;
    noResultsFound: string;
    loading: string;
    popularSuggestions: string;
    pressEnterToLaunch: string;
    matchingTools: string;
    viewCategory: string;
    tools: string;
    calculators: string;
  };

  // Home page
  home: {
    badge: string;
    heroHeadline?: string;
    heroSubtitleClean?: string;
    searchPlaceholderClean?: string;
    popularCalculatorsHeading?: string;
    browseByCategoryHeading?: string;
    categoryGridSubtitleClean?: string;
    viewAllCalculators?: string;
    exploreCalculators?: string;
    heroTitlePrefix: string;
    heroTitleHighlight: string;
    heroSubtitle: string;
    searchPlaceholder: string;
    featuredTitle: string;
    featuredSubtitle: string;
    popularTitle: string;
    popularSubtitle: string;
    categoryGridTitle: string;
    categoryGridSubtitle: string;
    recentlyAddedTitle: string;
    recentlyAddedSubtitle: string;
    eduSectionTitle: string;
    eduSectionSubtitle: string;
    eduCard1Title: string;
    eduCard1Desc: string;
    eduCard2Title: string;
    eduCard2Desc: string;
    eduCard3Title: string;
    eduCard3Desc: string;
    eduCard4Title: string;
    eduCard4Desc: string;
    faqTitle: string;
    faqSubtitle: string;
    statEngines: string;
    statCategories: string;
    statAccuracy: string;
    statCost: string;
    statCostValue: string;
  };

  // Trust section
  trust?: {
    sectionHeading: string;
    sectionSubheading: string;
    accurateTitle: string;
    accurateDesc: string;
    fastTitle: string;
    fastDesc: string;
    freeTitle: string;
    freeDesc: string;
    everywhereTitle: string;
    everywhereDesc: string;
  };

  // Search & History Drawers
  searchModal: {
    title: string;
    placeholder: string;
    allCategories: string;
    filterByCategory: string;
    noResultsTitle: string;
    noResultsDesc: string;
    clearSearch: string;
    quickShortcuts: string;
    recentSearches: string;
  };

  historyDrawer: {
    title: string;
    subtitle: string;
    emptyTitle: string;
    emptyDesc: string;
    clearAll: string;
    clearConfirm: string;
    viewCalculator: string;
    deleteItem: string;
    savedOn: string;
  };

  // Categories
  categoryView: {
    allCategories: string;
    calculatorsCount: string;
    searchInCategory: string;
    categoryOverview: string;
    popularInCategory: string;
    allInCategory: string;
    backToCategories: string;
  };

  // Calculator Detail View
  calculatorView: {
    interactiveContainerTitle: string;
    explanationTitle: string;
    formulaTitle: string;
    stepByStepTitle: string;
    workedExamplesTitle: string;
    useCasesTitle: string;
    nextStepsPartner: string;
    nextStepsPartnerDesc: string;
    featuredOffers: string;
    relatedCalculators: string;
    shareCalculator: string;
    printCalculation: string;
    bookmarkCalculation: string;
    formulaVariables: string;
    keyAssumptions: string;
    calculationSteps: string;
    targetAudience: string;
    keyBenefits: string;
    takeaway: string;
  };

  // Blog
  blog: {
    title: string;
    subtitle: string;
    featuredArticle: string;
    latestArticles: string;
    allArticles: string;
    readArticle: string;
    filterByCategory: string;
    authorBio: string;
    credentials: string;
    relatedCalculators: string;
    relatedArticles: string;
    keyTakeawaysTitle: string;
    faqsTitle: string;
    backToBlog: string;
  };

  // Static Pages
  about: {
    title: string;
    subtitle?: string;
    badge?: string;
    heroSubtitle?: string;
    metricTools?: string;
    metricCost?: string;
    metricAccess?: string;
    metricPlatform?: string;
    whoWeAreBadge?: string;
    whoWeAreTitle?: string;
    whoWeAreP1?: string;
    whoWeAreP2?: string;
    whoWeAreP3?: string;
    missionBadge?: string;
    missionTitle?: string;
    missionSubtitle?: string;
    missionText?: string;
    missionPillar1Title?: string;
    missionPillar1Desc?: string;
    missionPillar2Title?: string;
    missionPillar2Desc?: string;
    missionPillar3Title?: string;
    missionPillar3Desc?: string;
    missionPillar4Title?: string;
    missionPillar4Desc?: string;
    whatWeOfferBadge?: string;
    whatWeOfferTitle?: string;
    whatWeOfferSubtitle?: string;
    viewAllCategories?: string;
    openCategory?: string;
    whyChooseBadge?: string;
    whyChooseTitle?: string;
    whyChooseSubtitle?: string;
    feature1Title?: string;
    feature1Desc?: string;
    feature2Title?: string;
    feature2Desc?: string;
    feature3Title?: string;
    feature3Desc?: string;
    feature4Title?: string;
    feature4Desc?: string;
    howItWorksBadge?: string;
    howItWorksTitle?: string;
    howItWorksSubtitle?: string;
    step1Title?: string;
    step1Desc?: string;
    step2Title?: string;
    step2Desc?: string;
    step3Title?: string;
    step3Desc?: string;
    accuracyBadge?: string;
    accuracyTitle?: string;
    accuracyText?: string;
    accuracyP1?: string;
    accuracyP2?: string;
    notePrefix?: string;
    accuracyNote?: string;
    privacyBadge?: string;
    privacyTitle?: string;
    privacyText?: string;
    privacyP1?: string;
    privacyClientSideTitle?: string;
    privacyClientSideDesc?: string;
    privacySavedHistoryTitle?: string;
    privacySavedHistoryDesc?: string;
    teamTitle?: string;
    teamText?: string;
    coverageTitle?: string;
    coverageText?: string;
    readyToCalculate?: string;
    readyToCalculateSubtitle?: string;
    exploreCalculatorsBtn?: string;
    browseGuidesBtn?: string;
  };

  contact: {
    title: string;
    subtitle: string;
    formName: string;
    formEmail: string;
    formSubject: string;
    formMessage: string;
    formCategory: string;
    formSubmit: string;
    formSending: string;
    formSuccess: string;
    formSuccessDesc: string;
    formError: string;
    infoTitle: string;
    infoDesc: string;
    responseSpeed: string;
    feedbackNotice: string;
  };

  sitemap: {
    title: string;
    subtitle: string;
    totalCalculators: string;
    totalCategories: string;
    totalArticles: string;
    jumpToSection: string;
    calculatorsDirectory: string;
    articlesDirectory: string;
    pagesDirectory: string;
  };

  share?: {
    modalTitle: string;
    modalSubtitle: string;
    choosePlatform: string;
    directLink: string;
    more: string;
  };

  // Footer
  footer: {
    aboutTitle: string;
    aboutText: string;
    calculatorsHeading?: string;
    resourcesHeading?: string;
    companyHeading?: string;
    stayUpdatedHeading?: string;
    newsletterDesc?: string;
    emailPlaceholder?: string;
    subscribed?: string;
    directory?: string;
    quickLinks: string;
    categories: string;
    legalEducational: string;
    disclaimer: string;
    disclaimerTitle?: string;
    allRightsReserved: string;
    builtWith: string;
    privacyPolicy: string;
    termsOfUse: string;
    termsOfService?: string;
    contactUs: string;
    sitemap: string;
    aboutUs: string;
  };

  // SEO metadata
  seo: {
    homeTitle: string;
    homeDescription: string;
    calcSuffix: string;
    categorySuffix: string;
    blogTitle: string;
    blogDescription: string;
    aboutTitle: string;
    aboutDescription: string;
    contactTitle: string;
    contactDescription: string;
    sitemapTitle: string;
    sitemapDescription: string;
  };

  // Calculator Labels & Inputs Translations
  calcLabels: Record<string, string>;
}
