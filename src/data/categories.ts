import { CategoryMeta } from '../types';

export const CATEGORIES: CategoryMeta[] = [
  {
    id: 'financial',
    name: 'Financial Calculators',
    slug: 'financial',
    description: 'Mortgage, loans, investments, compound interest, savings goals, credit card payoffs, retirement, APR, and amortization schedules.',
    iconName: 'DollarSign',
    color: 'orange',
    badgeBg: 'bg-orange-50 text-orange-700 border-orange-200',
    badgeText: 'Finance & Money',
    calculatorsCount: 23
  },
  {
    id: 'fitness-health',
    name: 'Fitness & Health',
    slug: 'fitness-health',
    description: 'BMI, body fat %, BMR metabolism, calories & TDEE, ideal weight, pregnancy, due dates, ovulation fertility, water intake, and heart rate zones.',
    iconName: 'Activity',
    color: 'rose',
    badgeBg: 'bg-rose-50 text-rose-700 border-rose-200',
    badgeText: 'Health & Body',
    calculatorsCount: 17
  },
  {
    id: 'math-algebra',
    name: 'Math & Algebra',
    slug: 'math-algebra',
    description: 'Percentages, fractions, decimals, scientific calculator, ratios, averages, probability, statistics, exponents, radicals, and 2D/3D geometry.',
    iconName: 'Calculator',
    color: 'blue',
    badgeBg: 'bg-blue-50 text-blue-700 border-blue-200',
    badgeText: 'Math & Science',
    calculatorsCount: 17
  },
  {
    id: 'real-estate',
    name: 'Real Estate Calculators',
    slug: 'real-estate',
    description: 'Rental property ROI, capitalization rate (Cap Rate), cash-on-cash returns, gross rent multiplier, and rental cash flow analysis.',
    iconName: 'Building',
    color: 'indigo',
    badgeBg: 'bg-indigo-50 text-indigo-700 border-indigo-200',
    badgeText: 'Property & Investing',
    calculatorsCount: 6
  },
  {
    id: 'tax',
    name: 'Tax Calculators',
    slug: 'tax',
    description: 'Federal and state income tax brackets, capital gains tax, sales tax, effective tax rate, standard deductions, and take-home pay.',
    iconName: 'Receipt',
    color: 'teal',
    badgeBg: 'bg-teal-50 text-teal-700 border-teal-200',
    badgeText: 'Taxes & Deductions',
    calculatorsCount: 5
  },
  {
    id: 'business',
    name: 'Business Calculators',
    slug: 'business',
    description: 'Break-even point analysis, gross and net profit margins, markup pricing, customer lifetime value (LTV), and operating cash flow.',
    iconName: 'Briefcase',
    color: 'sky',
    badgeBg: 'bg-sky-50 text-sky-700 border-sky-200',
    badgeText: 'Commerce & Strategy',
    calculatorsCount: 8
  },
  {
    id: 'construction',
    name: 'Construction Calculators',
    slug: 'construction',
    description: 'Concrete yardage and bags, flooring and tile estimates with waste factor, drywall sheets, paint coverage, and framing lumber.',
    iconName: 'HardHat',
    color: 'orange',
    badgeBg: 'bg-orange-50 text-orange-700 border-orange-200',
    badgeText: 'Building & Remodeling',
    calculatorsCount: 6
  },
  {
    id: 'engineering',
    name: 'Engineering Calculators',
    slug: 'engineering',
    description: 'Ohm’s law (voltage, current, resistance, power), beam deflection, torque, Reynolds number, and electrical power formulas.',
    iconName: 'Cpu',
    color: 'violet',
    badgeBg: 'bg-violet-50 text-violet-700 border-violet-200',
    badgeText: 'Circuits & Physics',
    calculatorsCount: 5
  },
  {
    id: 'education',
    name: 'Education Calculators',
    slug: 'education',
    description: 'Final exam grade needed, high school and college GPA calculation, test curve scores, and weighted assignment grading.',
    iconName: 'GraduationCap',
    color: 'orange',
    badgeBg: 'bg-orange-50 text-orange-700 border-orange-200',
    badgeText: 'Grades & Academic',
    calculatorsCount: 1
  },
  {
    id: 'cryptocurrency',
    name: 'Cryptocurrency Calculators',
    slug: 'cryptocurrency',
    description: 'Crypto profit/loss calculator, dollar-cost averaging (DCA) simulator, transaction fee deductions, and staking APY rewards.',
    iconName: 'Coins',
    color: 'orange',
    badgeBg: 'bg-orange-50 text-orange-700 border-orange-200',
    badgeText: 'Crypto & Web3',
    calculatorsCount: 4
  },
  {
    id: 'conversion',
    name: 'Conversions & Units',
    slug: 'conversion',
    description: 'Convert length, temperature, weight, volume, speed, area, and digital data storage seamlessly.',
    iconName: 'ArrowLeftRight',
    color: 'orange',
    badgeBg: 'bg-orange-50 text-orange-700 border-orange-200',
    badgeText: 'Unit Converters',
    calculatorsCount: 1
  },
  {
    id: 'date-time',
    name: 'Date & Time',
    slug: 'date-time',
    description: 'Days between dates, exact age breakdown, work hours, business days, and time duration calculations.',
    iconName: 'Calendar',
    color: 'indigo',
    badgeBg: 'bg-indigo-50 text-indigo-700 border-indigo-200',
    badgeText: 'Date & Time',
    calculatorsCount: 2
  },
  {
    id: 'construction-other',
    name: 'Other & Lifestyle',
    slug: 'construction-other',
    description: 'College GPA calculator, gas trip mileage & cost splitter, and everyday utilities.',
    iconName: 'Layers',
    color: 'purple',
    badgeBg: 'bg-purple-50 text-purple-700 border-purple-200',
    badgeText: 'Everyday & Tools',
    calculatorsCount: 5
  }
];
