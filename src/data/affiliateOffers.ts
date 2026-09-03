export interface AffiliateOffer {
  id: string;
  category: 'financial' | 'loan' | 'insurance' | 'health' | 'real-estate' | 'tax' | 'business' | 'construction' | 'education' | 'engineering' | 'cryptocurrency';
  title: string;
  provider: string;
  providerLogo?: string;
  badge?: string;
  highlight: string;
  description: string;
  keyFeatures: string[];
  ctaText: string;
  ctaUrl: string;
  rating: number;
  reviewCount: number;
  featured?: boolean;
  terms?: string;
}

export const AFFILIATE_OFFERS: AffiliateOffer[] = [
  // --- LOAN OFFERS ---
  {
    id: 'lending-tree-mortgage',
    category: 'loan',
    title: 'Compare Top Mortgage & Refinance Rates',
    provider: 'LendingTree Partners',
    badge: 'Lowest Rate Guarantee',
    highlight: 'Rates as low as 5.87% APR',
    description: 'Compare competing quotes from up to 5 accredited lenders in under 2 minutes without impacting your credit score.',
    keyFeatures: [
      'Zero initial credit score impact (soft pull)',
      'Compare fixed & adjustable 15/30-year terms',
      'Average customer savings of $3,400/year',
      'FHA, VA, Conventional & Jumbo options'
    ],
    ctaText: 'Check My Personalized Rates',
    ctaUrl: 'https://google.com',
    rating: 4.9,
    reviewCount: 14200,
    featured: true,
    terms: 'NMLS #1130. APR rates depend on credit profile and down payment.'
  },
  {
    id: 'sofi-personal-loans',
    category: 'loan',
    title: 'Low-Rate Personal & Debt Consolidation Loans',
    provider: 'SoFi Financial',
    badge: 'No Hidden Fees',
    highlight: 'Fixed rates from 8.99% - 25.81% APR with AutoPay',
    description: 'Consolidate high-interest credit card debt into a single low monthly payment with terms from 2 to 7 years.',
    keyFeatures: [
      'Borrow from $5,000 to $100,000',
      'No origination fees or prepayment penalties',
      'Same-day funding upon loan approval',
      'Unemployment protection program included'
    ],
    ctaText: 'View Personal Loan Rates',
    ctaUrl: 'https://google.com',
    rating: 4.8,
    reviewCount: 9800,
    terms: 'Loan terms subject to credit score verification.'
  },
  {
    id: 'autocredits-auto-refi',
    category: 'loan',
    title: 'Car Loan Refinance & Payment Reduction',
    provider: 'AutoApprove Network',
    badge: 'Save on Car Payments',
    highlight: 'Lower your car payment by an average of $108/mo',
    description: 'Lower your APR and free up cash flow by refinancing your existing new or used vehicle loan with premier credit unions.',
    keyFeatures: [
      'APR discounts for clean driving history',
      'Skip up to 2 monthly payments upon closing',
      'No paperwork hassle: digital title transfer',
      'Vehicles up to 10 years old eligible'
    ],
    ctaText: 'Lower My Auto Payment',
    ctaUrl: 'https://google.com',
    rating: 4.7,
    reviewCount: 6200,
    terms: 'Vehicle must be less than 10 years old with under 120,000 miles.'
  },

  // --- FINANCIAL PRODUCT RECOMMENDATIONS ---
  {
    id: 'marcus-high-yield-savings',
    category: 'financial',
    title: 'High-Yield Online Savings Account',
    provider: 'Marcus by Goldman Sachs',
    badge: 'Editor’s Choice Savings',
    highlight: 'Earn 5.15% APY with No Minimum Deposit',
    description: 'Put your emergency fund to work earning over 10× the national average with zero monthly maintenance fees.',
    keyFeatures: [
      '5.15% Variable Annual Percentage Yield',
      'FDIC insured up to $250,000 per depositor',
      'No minimum balance & no monthly fees',
      'Same-day transfers to external bank accounts'
    ],
    ctaText: 'Open Free Savings Account',
    ctaUrl: 'https://google.com',
    rating: 4.9,
    reviewCount: 22400,
    featured: true,
    terms: 'APY accurate as of current date. Subject to change.'
  },
  {
    id: 'chase-freedom-unlimited',
    category: 'financial',
    title: '0% Intro APR Balance Transfer & Cash Back Card',
    provider: 'Chase Freedom Unlimited®',
    badge: '$200 Welcome Bonus',
    highlight: '0% Intro APR for 15 Months on Purchases & Transfers',
    description: 'Pay down existing balances without interest charges for 15 months while earning unlimited 1.5% to 5% cash back.',
    keyFeatures: [
      '$200 bonus after spending $500 in first 3 months',
      '0% Intro APR for 15 billing cycles',
      '5% cash back on travel booked through Chase',
      '$0 annual fee forever'
    ],
    ctaText: 'Apply in 60 Seconds',
    ctaUrl: 'https://google.com',
    rating: 4.8,
    reviewCount: 31000,
    terms: 'Variable APR after 15 months: 20.49% - 29.24% based on creditworthiness.'
  },
  {
    id: 'vanguard-wealth-brokerage',
    category: 'financial',
    title: 'Commission-Free Index Fund & Retirement Investing',
    provider: 'Vanguard Index Investing',
    badge: 'Lowest Expense Ratios',
    highlight: 'Build Wealth with Low-Cost ETFs & Roth IRAs',
    description: 'Access low-cost index funds and automate your retirement portfolio with index pioneer Vanguard.',
    keyFeatures: [
      '$0 commission on all US stock and ETF trades',
      'Industry-low average expense ratio (0.08%)',
      'Traditional, Roth, and Rollover IRA support',
      'Automatic dividend reinvestment (DRIP)'
    ],
    ctaText: 'Start Investing Today',
    ctaUrl: 'https://google.com',
    rating: 4.9,
    reviewCount: 18500,
    terms: 'Investing involves market risk, including possible loss of principal.'
  },

  // --- INSURANCE OFFERS ---
  {
    id: 'policygenius-life-insurance',
    category: 'insurance',
    title: 'Term Life Insurance Comparison Engine',
    provider: 'Policygenius',
    badge: 'Save up to 40% on Coverage',
    highlight: '$1 Million Coverage Starting at $18/Month',
    description: 'Compare term life insurance policies from 30+ top-rated insurers in minutes with zero agent sales pressure.',
    keyFeatures: [
      'Policies available with no medical exam required',
      '10, 15, 20, 25, and 30-year guaranteed fixed terms',
      'A+ AM Best financial stability rating insurers',
      'Unbiased licensed agent support on demand'
    ],
    ctaText: 'Get Free Life Insurance Quotes',
    ctaUrl: 'https://google.com',
    rating: 4.9,
    reviewCount: 16700,
    featured: true,
    terms: 'Rates vary based on age, health history, and coverage amount.'
  },
  {
    id: 'lemonade-homeowners-insurance',
    category: 'insurance',
    title: 'Instant Homeowners & Renters Insurance',
    provider: 'Lemonade Insurance',
    badge: 'AI Powered In 90 Sec',
    highlight: 'Homeowners from $25/mo • Renters from $5/mo',
    description: 'Protect your home, personal property, and liability with digital claims and zero paperwork.',
    keyFeatures: [
      'Instant policy activation via mobile app',
      'Lightning-fast claims paid in seconds via AI',
      'Comprehensive dwelling and water damage options',
      'Giveback program donates unclaimed money to charity'
    ],
    ctaText: 'Check Home Insurance Quote',
    ctaUrl: 'https://google.com',
    rating: 4.7,
    reviewCount: 12400,
    terms: 'Availability varies by state. Subject to underwriting review.'
  },

  // --- HEALTH & FITNESS AFFILIATE PRODUCTS ---
  {
    id: 'withings-body-smart-scale',
    category: 'health',
    title: 'Smart Body Composition Scale & BMI Analyzer',
    provider: 'Withings Body Smart',
    badge: 'Clinically Validated',
    highlight: 'Precision Fat %, Muscle Mass, Water % & Visceral Fat',
    description: 'Pair your calculations with hospital-grade multi-frequency bioimpedance sensors that automatically sync with Apple Health and Google Fit.',
    keyFeatures: [
      'Position Control™ technology for accurate weight within 0.1 lb',
      'Full body composition metrics (Muscle, Fat, Bone, Water)',
      'Vascular Age & Standing Heart Rate monitoring',
      'Multi-user automatic recognition (up to 8 users)'
    ],
    ctaText: 'View Product on Amazon / Official Store',
    ctaUrl: 'https://google.com',
    rating: 4.8,
    reviewCount: 8900,
    featured: true,
    terms: 'Free 2-day delivery with Prime. 30-day money-back satisfaction guarantee.'
  },
  {
    id: 'factor-healthy-meal-prep',
    category: 'health',
    title: 'Doctor & Dietitian Crafted Macro-Balanced Meals',
    provider: 'Factor75 Nutrition',
    badge: '$130 Off First 5 Boxes',
    highlight: 'Chef-Prepared Calorie-Smart & Keto Meals Delivered',
    description: 'Match your calculated daily TDEE and calorie targets with fresh, chef-cooked meals ready to heat in 2 minutes.',
    keyFeatures: [
      'Calorie Smart (under 550 kcal) and High Protein options',
      'Fresh, never frozen with zero artificial preservatives',
      'Designed by licensed nutritionists for weight loss & muscle gain',
      'Flexible weekly menu with 35+ customizable meals'
    ],
    ctaText: 'Claim $130 Meal Prep Discount',
    ctaUrl: 'https://google.com',
    rating: 4.8,
    reviewCount: 15300,
    terms: 'Offer valid for new subscribers only. Discount distributed over 5 deliveries.'
  },
  {
    id: 'whoop-fitness-tracker',
    category: 'health',
    title: 'Continuous Heart Rate, Strain & Recovery Band',
    provider: 'WHOOP 4.0 Wearable',
    badge: 'Free Device + 1st Month Free',
    highlight: 'Track Real-Time Caloric Burn, Sleep & HRV 24/7',
    description: 'The ultimate wearable to measure exact cardiovascular strain, resting metabolic rate, and sleep performance.',
    keyFeatures: [
      'Continuous 24/7 biometric tracking without screen distractions',
      'Precise respiratory rate and skin temperature sensors',
      'Daily personalized recovery score and sleep coaching',
      'Waterproof design with wireless on-body battery pack'
    ],
    ctaText: 'Get WHOOP 4.0 Free Trial',
    ctaUrl: 'https://google.com',
    rating: 4.7,
    reviewCount: 11200,
    terms: 'Subscription required after trial. Cancel anytime.'
  },

  // --- REAL ESTATE & INVESTING OFFERS ---
  {
    id: 'dealcheck-real-estate',
    category: 'real-estate',
    title: 'Property Analysis & Investment Cash Flow Tool',
    provider: 'DealCheck Pro',
    badge: '14-Day Free Trial',
    highlight: 'Calculate Cap Rate, ROI & Cash-on-Cash in 60s',
    description: 'Analyze rental properties, BRRRR projects, multi-family units, and commercial flips with instant market rent estimates.',
    keyFeatures: [
      'Comprehensive cash flow and 30-year projections',
      'Instant property lookups with comps & tax records',
      'Downloadable PDF investment pitch decks',
      'Web, iOS, and Android real-time sync'
    ],
    ctaText: 'Start Free Analysis Trial',
    ctaUrl: 'https://google.com',
    rating: 4.9,
    reviewCount: 7800,
    featured: true
  },

  // --- TAX FILING OFFERS ---
  {
    id: 'turbotax-premier-tax',
    category: 'tax',
    title: 'Maximum Refund Guarantee & CPA Assistance',
    provider: 'TurboTax Live',
    badge: 'Save 20% on Filing',
    highlight: 'Get Expert CPA Tax Review',
    description: 'File federal and state taxes with automatic crypto, stock gain, and deduction imports backed by certified CPAs.',
    keyFeatures: [
      'Automatic W-2 & 1099 form importing',
      'Real-time deduction and tax credit finder',
      'Live CPA assistance and audit defense support',
      'Maximum refund guarantee or money back'
    ],
    ctaText: 'File Taxes with TurboTax',
    ctaUrl: 'https://google.com',
    rating: 4.8,
    reviewCount: 42000,
    featured: true
  },

  // --- BUSINESS & ACCOUNTING OFFERS ---
  {
    id: 'quickbooks-small-biz',
    category: 'business',
    title: 'All-in-One Accounting, Invoicing & Payroll',
    provider: 'Intuit QuickBooks',
    badge: '50% Off First 3 Months',
    highlight: 'Automate Expenses, Invoicing & Profit Tracking',
    description: 'Track income, automate expense categorization, and run payroll effortlessly for small businesses and freelancers.',
    keyFeatures: [
      'Automatic bank and credit card synchronization',
      'Send professional digital invoices with payment links',
      'Real-time P&L, balance sheets, and cash flow reports',
      'Mileage tracking and receipt capture app'
    ],
    ctaText: 'Claim 50% Business Discount',
    ctaUrl: 'https://google.com',
    rating: 4.8,
    reviewCount: 38500,
    featured: true
  },

  // --- CONSTRUCTION & CONTRACTOR OFFERS ---
  {
    id: 'homedepot-pro-rewards',
    category: 'construction',
    title: 'Contractor Volume Pricing & Bulk Material Delivery',
    provider: 'Home Depot Pro Xtra',
    badge: 'Volume Pricing Discounts',
    highlight: 'Save up to 20% on Bulk Concrete, Lumber & Drywall',
    description: 'Access exclusive tier discounts, dedicated job-site delivery, and material takeoff estimators.',
    keyFeatures: [
      'Volume tier pricing on lumber, cement, and fasteners',
      'Guaranteed job-site delivery scheduling',
      'Digital receipt management for client billing',
      'Exclusive tool rental discounts and perks'
    ],
    ctaText: 'Join Pro Xtra Free',
    ctaUrl: 'https://google.com',
    rating: 4.7,
    reviewCount: 9400,
    featured: true
  },

  // --- EDUCATION & ONLINE LEARNING OFFERS ---
  {
    id: 'coursera-plus-certifications',
    category: 'education',
    title: 'Unlimited Professional Certificates & College Degrees',
    provider: 'Coursera Plus',
    badge: '7-Day Free Trial',
    highlight: '7,000+ Accredited Courses from Google, IBM & Top Universities',
    description: 'Earn university certificates, STEM credentials, and career training across computer science, engineering, and data analysis.',
    keyFeatures: [
      'Accredited certificates recognized by Fortune 500 employers',
      'Unlimited access to 7,000+ interactive courses',
      'Hands-on laboratory projects and coding environments',
      'Self-paced learning with flexible deadlines'
    ],
    ctaText: 'Explore Coursera Plus Free',
    ctaUrl: 'https://google.com',
    rating: 4.9,
    reviewCount: 31000,
    featured: true
  },

  // --- CRYPTOCURRENCY & SECURITY OFFERS ---
  {
    id: 'ledger-hardware-wallet',
    category: 'cryptocurrency',
    title: 'Cold Storage Hardware Wallet for Bitcoin & Crypto',
    provider: 'Ledger Nano X',
    badge: 'Bank-Grade Security',
    highlight: 'Protect Your Crypto Assets from Exchange Hacks',
    description: 'Keep your private keys offline with military-grade EAL6+ certified secure chips and Bluetooth connectivity.',
    keyFeatures: [
      'Cold offline storage for over 5,500+ coins and tokens',
      'Bluetooth connectivity for mobile trading on Ledger Live',
      'Certified CC EAL6+ security element chip',
      'Backup seed phrase recovery system'
    ],
    ctaText: 'Order Ledger Hardware Wallet',
    ctaUrl: 'https://google.com',
    rating: 4.9,
    reviewCount: 19800,
    featured: true
  }
];

export function getOffersForCategory(categoryId: string): AffiliateOffer[] {
  if (categoryId === 'financial') {
    return AFFILIATE_OFFERS.filter(o => o.category === 'financial' || o.category === 'loan' || o.category === 'insurance');
  }
  if (categoryId === 'fitness-health') {
    return AFFILIATE_OFFERS.filter(o => o.category === 'health');
  }
  if (categoryId === 'real-estate') {
    return AFFILIATE_OFFERS.filter(o => o.category === 'real-estate' || o.category === 'loan' || o.category === 'insurance');
  }
  if (categoryId === 'tax') {
    return AFFILIATE_OFFERS.filter(o => o.category === 'tax' || o.category === 'financial');
  }
  if (categoryId === 'business') {
    return AFFILIATE_OFFERS.filter(o => o.category === 'business' || o.category === 'financial');
  }
  if (categoryId === 'construction') {
    return AFFILIATE_OFFERS.filter(o => o.category === 'construction');
  }
  if (categoryId === 'education') {
    return AFFILIATE_OFFERS.filter(o => o.category === 'education');
  }
  if (categoryId === 'cryptocurrency') {
    return AFFILIATE_OFFERS.filter(o => o.category === 'cryptocurrency' || o.category === 'financial');
  }
  // Default to featured offers
  return AFFILIATE_OFFERS.filter(o => o.featured);
}

export function getOffersForCalculator(calculatorId: string): AffiliateOffer[] {
  if (calculatorId.includes('rental') || calculatorId.includes('cap-rate')) {
    return AFFILIATE_OFFERS.filter(o => o.category === 'real-estate' || o.category === 'loan');
  }
  if (calculatorId.includes('tax')) {
    return AFFILIATE_OFFERS.filter(o => o.category === 'tax' || o.category === 'financial');
  }
  if (calculatorId.includes('break-even') || calculatorId.includes('profit-margin')) {
    return AFFILIATE_OFFERS.filter(o => o.category === 'business');
  }
  if (calculatorId.includes('concrete') || calculatorId.includes('flooring')) {
    return AFFILIATE_OFFERS.filter(o => o.category === 'construction');
  }
  if (calculatorId.includes('grade') || calculatorId.includes('gpa')) {
    return AFFILIATE_OFFERS.filter(o => o.category === 'education');
  }
  if (calculatorId.includes('crypto')) {
    return AFFILIATE_OFFERS.filter(o => o.category === 'cryptocurrency');
  }
  if (
    calculatorId.includes('mortgage') || 
    calculatorId.includes('loan') || 
    calculatorId.includes('debt') || 
    calculatorId.includes('apr')
  ) {
    return AFFILIATE_OFFERS.filter(o => o.category === 'loan' || o.id === 'policygenius-life-insurance' || o.id === 'lemonade-homeowners-insurance');
  }
  if (
    calculatorId.includes('investment') || 
    calculatorId.includes('compound') || 
    calculatorId.includes('retirement') || 
    calculatorId.includes('savings') || 
    calculatorId.includes('inflation') || 
    calculatorId.includes('salary')
  ) {
    return AFFILIATE_OFFERS.filter(o => o.category === 'financial');
  }
  if (
    calculatorId.includes('bmi') || 
    calculatorId.includes('calorie') || 
    calculatorId.includes('fat') || 
    calculatorId.includes('weight') || 
    calculatorId.includes('bmr') || 
    calculatorId.includes('heart') || 
    calculatorId.includes('water')
  ) {
    return AFFILIATE_OFFERS.filter(o => o.category === 'health');
  }
  return AFFILIATE_OFFERS.slice(0, 3);
}
