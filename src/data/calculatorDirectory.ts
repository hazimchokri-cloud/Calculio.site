import { CalculatorMeta } from '../types';

export const CALCULATORS: CalculatorMeta[] = [
  // ==========================================
  // --- FINANCIAL CALCULATORS ---
  // ==========================================
  {
    id: 'mortgage-calculator',
    name: 'Mortgage Calculator',
    slug: 'mortgage',
    category: 'financial',
    description: 'Estimate your monthly mortgage payments including principal, interest, taxes, home insurance, PMI, and HOA fees with an interactive amortization schedule.',
    shortDescription: 'Monthly payments, total interest, and full amortization schedule.',
    iconName: 'Home',
    popular: true,
    featured: true,
    tags: ['mortgage', 'loan', 'real estate', 'home', 'amortization', 'property tax', 'interest'],
    formulaSummary: 'Monthly Payment P = L * [c(1 + c)^n] / [(1 + c)^n - 1], where L is loan amount, c is monthly interest rate, and n is total monthly payments.',
    faqs: [
      {
        question: 'What is included in a monthly mortgage payment (PITI)?',
        answer: 'PITI stands for Principal, Interest, Taxes, and Insurance. Most homeowners pay all four as part of their escrow payment, along with potential Private Mortgage Insurance (PMI) or HOA dues.'
      },
      {
        question: 'How do extra payments affect my mortgage?',
        answer: 'Extra payments reduce the principal balance directly, lowering total interest paid over time and shortening the overall loan payoff term.'
      }
    ]
  },
  {
    id: 'loan-calculator',
    name: 'Loan Calculator',
    slug: 'loan',
    category: 'financial',
    description: 'General loan payment calculator for any fixed-rate installment loan with customizable term, interest rate, extra payments, and payoff schedule.',
    shortDescription: 'Calculate monthly payments and total interest on any fixed loan.',
    iconName: 'DollarSign',
    popular: true,
    featured: true,
    tags: ['loan', 'principal', 'interest', 'term', 'monthly payment', 'borrowing'],
    formulaSummary: 'P = (r * PV) / (1 - (1 + r)^(-n))'
  },
  {
    id: 'auto-loan-calculator',
    name: 'Auto Loan Calculator',
    slug: 'auto-loan',
    category: 'financial',
    description: 'Calculate monthly car loan payments, total interest, sales tax, trade-in equity, and total overall purchase cost.',
    shortDescription: 'Calculate car loan payments, sales tax, and dealer fees.',
    iconName: 'Car',
    popular: true,
    featured: false,
    tags: ['car', 'vehicle', 'auto loan', 'financing', 'trade-in', 'dealer'],
    formulaSummary: 'Loan = (Vehicle Price - Down Payment - Trade-in) + Sales Tax + Fees.'
  },
  {
    id: 'personal-loan-calculator',
    name: 'Personal Loan Calculator',
    slug: 'personal-loan',
    category: 'financial',
    description: 'Calculate unsecured personal loan payments, origination fees, total borrowing costs, and compare term options (2 to 7 years).',
    shortDescription: 'Monthly payments, origination fees, and repayment schedules.',
    iconName: 'Wallet',
    popular: true,
    featured: false,
    tags: ['personal loan', 'debt', 'borrowing', 'origination fee', 'unsecured loan']
  },
  {
    id: 'interest-calculator',
    name: 'Interest Calculator (Simple & Compound)',
    slug: 'interest',
    category: 'financial',
    description: 'Compare simple interest vs compounding interest frequencies (annually, semi-annually, quarterly, monthly, daily) side by side.',
    shortDescription: 'Compare Simple vs Compound interest growth across frequencies.',
    iconName: 'Percent',
    popular: true,
    featured: false,
    tags: ['interest', 'simple interest', 'compound interest', 'growth', 'apr']
  },
  {
    id: 'compound-interest-calculator',
    name: 'Compound Interest Calculator',
    slug: 'compound-interest',
    category: 'financial',
    description: 'Calculate the future value of your savings or investment portfolio with regular deposits and compounding frequency (daily, monthly, annually).',
    shortDescription: 'Project future investment growth and compounding returns.',
    iconName: 'TrendingUp',
    popular: true,
    featured: true,
    tags: ['investing', 'savings', 'interest', 'compound', 'growth', 'stocks', 'roi', 'retirement'],
    formulaSummary: 'A = P(1 + r/n)^(nt) + PMT * [((1 + r/n)^(nt) - 1) / (r/n)]'
  },
  {
    id: 'investment-calculator',
    name: 'Investment Calculator',
    slug: 'investment',
    category: 'financial',
    description: 'Forecast asset growth with inflation-adjusted real returns, expected returns, capital gains taxes, and monthly accumulation.',
    shortDescription: 'Future portfolio wealth with inflation-adjusted real returns.',
    iconName: 'LineChart',
    popular: true,
    featured: true,
    tags: ['investment', 'stocks', 'portfolio', 'index funds', 'inflation adjusted', 'real return']
  },
  {
    id: 'savings-calculator',
    name: 'Savings Calculator',
    slug: 'savings',
    category: 'financial',
    description: 'Determine how much you need to save each month to hit a target savings goal or see what your fixed monthly deposits will grow into with High-Yield Savings (HYSA).',
    shortDescription: 'Find required monthly savings for target goals or HYSA growth.',
    iconName: 'PiggyBank',
    popular: true,
    featured: false,
    tags: ['savings', 'hysa', 'emergency fund', 'goal', 'bank', 'interest']
  },
  {
    id: 'retirement-calculator',
    name: 'Retirement Calculator',
    slug: 'retirement',
    category: 'financial',
    description: 'Project your nest egg at retirement, evaluate the 4% safe withdrawal rule, calculate post-retirement annual income, and see if you are on track or facing a shortfall.',
    shortDescription: 'Project retirement nest egg, 4% rule safe income, and readiness.',
    iconName: 'ShieldCheck',
    popular: true,
    featured: true,
    tags: ['retirement', '401k', 'ira', 'nest egg', 'fire', 'financial independence', '4 percent rule']
  },
  {
    id: 'inflation-calculator',
    name: 'Inflation Calculator',
    slug: 'inflation',
    category: 'financial',
    description: 'Calculate how inflation erodes purchasing power over time and discover the future equivalent value of money.',
    shortDescription: 'Measure purchasing power changes across years.',
    iconName: 'Coins',
    popular: false,
    recentlyAdded: true,
    tags: ['inflation', 'cpi', 'purchasing power', 'money', 'economy']
  },
  {
    id: 'credit-card-calculator',
    name: 'Credit Card Payoff Calculator',
    slug: 'credit-card',
    category: 'financial',
    description: 'Calculate credit card payoff time, compare fixed monthly payments against the minimum payment trap, and calculate interest saved.',
    shortDescription: 'Beat the minimum payment trap and calculate debt-free timeline.',
    iconName: 'CreditCard',
    popular: true,
    featured: true,
    tags: ['credit card', 'debt', 'minimum payment', 'revolving debt', 'apr', 'interest']
  },
  {
    id: 'debt-payoff-calculator',
    name: 'Debt Payoff Calculator (Snowball & Avalanche)',
    slug: 'debt-payoff',
    category: 'financial',
    description: 'Simulate Debt Snowball (lowest balance first) vs Debt Avalanche (highest APR first) across all your debts with extra monthly payments.',
    shortDescription: 'Accelerate debt freedom with Snowball and Avalanche payoff models.',
    iconName: 'Layers',
    popular: true,
    featured: false,
    tags: ['debt payoff', 'snowball', 'avalanche', 'credit cards', 'debt free', 'accelerator']
  },
  {
    id: 'apr-calculator',
    name: 'APR Calculator',
    slug: 'apr',
    category: 'financial',
    description: 'Determine the true Annual Percentage Rate (APR) on loans including upfront origination fees, discount points, and closing charges.',
    shortDescription: 'Calculate true APR and effective borrowing cost with fees.',
    iconName: 'Percent',
    popular: false,
    tags: ['apr', 'interest rate', 'closing costs', 'points', 'origination', 'mortgage']
  },
  {
    id: 'amortization-calculator',
    name: 'Amortization Calculator & Schedule',
    slug: 'amortization',
    category: 'financial',
    description: 'Generate full monthly and annual loan amortization schedules with principal/interest breakdowns and exportable CSV tables.',
    shortDescription: 'Comprehensive annual & monthly amortization schedules with CSV export.',
    iconName: 'Table',
    popular: true,
    featured: false,
    tags: ['amortization', 'schedule', 'principal', 'interest', 'csv', 'table']
  },
  {
    id: 'roi-calculator',
    name: 'ROI Calculator (Return on Investment)',
    slug: 'roi',
    category: 'financial',
    description: 'Calculate total return on investment percentage, net profit, and Compound Annual Growth Rate (CAGR) across holding periods.',
    shortDescription: 'Total ROI %, net profit, and annualized Compound Annual Growth Rate (CAGR).',
    iconName: 'TrendingUp',
    popular: true,
    tags: ['roi', 'return on investment', 'cagr', 'profit', 'yield', 'investing']
  },
  {
    id: 'salary-calculator',
    name: 'Salary & Take-Home Pay Calculator',
    slug: 'salary',
    category: 'financial',
    description: 'Convert between hourly wages, daily, weekly, bi-weekly, monthly, and annual salaries with estimated federal/state tax deductions and net pay.',
    shortDescription: 'Convert hourly to annual salary with tax deduction estimates.',
    iconName: 'Briefcase',
    popular: true,
    featured: true,
    tags: ['salary', 'wage', 'hourly', 'income', 'paycheck', 'taxes', 'net pay', 'gross pay']
  },

  // ==========================================
  // --- HEALTH & FITNESS CALCULATORS ---
  // ==========================================
  {
    id: 'bmi-calculator',
    name: 'BMI Calculator',
    slug: 'bmi',
    category: 'fitness-health',
    description: 'Calculate Body Mass Index (BMI) and discover your World Health Organization classification, healthy weight range, and prime index.',
    shortDescription: 'Calculate Body Mass Index, healthy weight range, and category.',
    iconName: 'Scale',
    popular: true,
    featured: true,
    tags: ['bmi', 'body mass index', 'weight', 'health', 'fitness', 'diet', 'obesity', 'underweight']
  },
  {
    id: 'body-fat-calculator',
    name: 'Body Fat Percentage Calculator',
    slug: 'body-fat',
    category: 'fitness-health',
    description: 'Calculate body fat percentage using the official U.S. Navy circumference method with neck, waist, and hip measurements.',
    shortDescription: 'Estimate body fat % and lean mass using Navy circumference method.',
    iconName: 'Activity',
    popular: true,
    tags: ['body fat', 'navy method', 'lean mass', 'fat mass', 'fitness']
  },
  {
    id: 'calorie-tdee-calculator',
    name: 'Calorie & TDEE Calculator',
    slug: 'calorie',
    category: 'fitness-health',
    description: 'Estimate your Basal Metabolic Rate (BMR), Total Daily Energy Expenditure (TDEE), and calorie targets for fat loss or muscle gain.',
    shortDescription: 'BMR, TDEE, weight loss calories, and macro gram breakdowns.',
    iconName: 'Flame',
    popular: true,
    featured: true,
    tags: ['calorie', 'tdee', 'bmr', 'macros', 'protein', 'weight loss', 'deficit', 'nutrition']
  },
  {
    id: 'bmr-calculator',
    name: 'BMR Calculator (Basal Metabolic Rate)',
    slug: 'bmr',
    category: 'fitness-health',
    description: 'Calculate daily calories burned at complete rest using the Mifflin-St Jeor, Revised Harris-Benedict, and Katch-McArdle equations.',
    shortDescription: 'Calories burned at rest via Mifflin-St Jeor, Harris-Benedict, Katch.',
    iconName: 'Flame',
    popular: true,
    featured: false,
    tags: ['bmr', 'basal metabolic rate', 'calories', 'metabolism', 'mifflin']
  },
  {
    id: 'ideal-weight-calculator',
    name: 'Ideal Weight Calculator',
    slug: 'ideal-weight',
    category: 'fitness-health',
    description: 'Calculate consensus ideal body weight using Devine, Robinson, Miller, and Hamwi medical equations alongside healthy BMI targets.',
    shortDescription: 'Consensus ideal weight via Devine, Robinson, Miller, Hamwi formulas.',
    iconName: 'Scale',
    popular: true,
    featured: false,
    tags: ['ideal weight', 'ibw', 'healthy weight', 'devine', 'hamwi', 'weight loss']
  },
  {
    id: 'pregnancy-calculator',
    name: 'Pregnancy Calculator',
    slug: 'pregnancy',
    category: 'fitness-health',
    description: 'Track gestational age in weeks and days, current trimester, estimated due date, and fetal development comparisons.',
    shortDescription: 'Gestational age in weeks & days, trimesters, and baby size guide.',
    iconName: 'Baby',
    popular: true,
    featured: true,
    tags: ['pregnancy', 'due date', 'gestation', 'trimester', 'baby', 'conception']
  },
  {
    id: 'due-date-calculator',
    name: 'Due Date Calculator',
    slug: 'due-date',
    category: 'fitness-health',
    description: 'Calculate your baby estimated due date (EDD) by Last Menstrual Period (LMP), Conception Date, Ultrasound Dating, or IVF transfer.',
    shortDescription: 'Estimate due date by LMP, Conception, Ultrasound, or IVF.',
    iconName: 'Baby',
    popular: true,
    featured: false,
    tags: ['due date', 'edd', 'pregnancy', 'ultrasound', 'ivf', 'conception']
  },
  {
    id: 'ovulation-calculator',
    name: 'Ovulation & Fertility Calculator',
    slug: 'ovulation',
    category: 'fitness-health',
    description: 'Forecast your most fertile window, ovulation day, and future menstrual cycle calendars to optimize conception planning.',
    shortDescription: 'Fertile window dates, ovulation day, and 3-month fertility calendar.',
    iconName: 'Calendar',
    popular: true,
    featured: false,
    tags: ['ovulation', 'fertility', 'fertile window', 'menstrual cycle', 'conception']
  },
  {
    id: 'water-intake-calculator',
    name: 'Water Intake Calculator',
    slug: 'water-intake',
    category: 'fitness-health',
    description: 'Calculate daily fluid hydration requirements in liters, ounces, and glasses tailored to your body weight, workout routine, and climate.',
    shortDescription: 'Daily hydration recommendations in liters, ounces, and glasses.',
    iconName: 'Droplet',
    popular: true,
    featured: false,
    tags: ['water', 'hydration', 'fluid', 'glasses', 'oz', 'liters', 'exercise']
  },
  {
    id: 'macro-calculator',
    name: 'Macro Calculator',
    slug: 'macro',
    category: 'fitness-health',
    description: 'Calculate exact daily protein, carbohydrate, and fat gram distributions for cutting, lean bulking, keto, or balanced diets.',
    shortDescription: 'Protein, carb, and fat gram targets for cutting or muscle gain.',
    iconName: 'Flame',
    popular: true,
    featured: false,
    tags: ['macros', 'macronutrients', 'protein', 'carbs', 'fats', 'keto', 'diet']
  },
  {
    id: 'heart-rate-calculator',
    name: 'Target Heart Rate Calculator',
    slug: 'heart-rate',
    category: 'fitness-health',
    description: 'Calculate maximum heart rate and 5 aerobic exercise intensity zones (Zone 1 to Zone 5) using the Karvonen HRR and Tanaka formulas.',
    shortDescription: 'Target Heart Rate training Zones 1-5 with Karvonen & Tanaka formulas.',
    iconName: 'Heart',
    popular: true,
    featured: true,
    tags: ['heart rate', 'cardio', 'zones', 'zone 2', 'vo2 max', 'karvonen', 'bpm']
  },

  // ==========================================
  // --- MATH & ALGEBRA ---
  // ==========================================
  {
    id: 'percentage-calculator',
    name: 'Percentage Calculator',
    slug: 'percentage',
    category: 'math-algebra',
    description: 'Solve four popular percentage equations: What is X% of Y, X is what % of Y, percentage increase/decrease, and percentage difference.',
    shortDescription: 'Find percentages, % changes, discounts, and percentage difference.',
    iconName: 'Percent',
    popular: true,
    featured: true,
    tags: ['percentage', 'percent', 'discount', 'percent change', 'increase', 'decrease', 'math']
  },
  {
    id: 'fraction-calculator',
    name: 'Fraction Calculator',
    slug: 'fraction',
    category: 'math-algebra',
    description: 'Add, subtract, multiply, and divide fractions and mixed numbers with step-by-step simplification, greatest common divisor (GCD), and decimal equivalents.',
    shortDescription: 'Add, subtract, multiply & divide fractions with step-by-step steps.',
    iconName: 'Divide',
    popular: true,
    featured: false,
    recentlyAdded: true,
    tags: ['fraction', 'math', 'simplify', 'numerator', 'denominator', 'gcd', 'lcm']
  },
  {
    id: 'decimal-calculator',
    name: 'Decimal Calculator',
    slug: 'decimal',
    category: 'math-algebra',
    description: 'Convert between decimals, fractions, and percentages, perform high-precision decimal operations, and apply custom rounding rules.',
    shortDescription: 'Convert decimals to fractions and perform precision rounding.',
    iconName: 'ArrowRightLeft',
    popular: true,
    featured: false,
    tags: ['decimal', 'fraction', 'percentage', 'rounding', 'precision', 'math']
  },
  {
    id: 'scientific-calculator',
    name: 'Scientific Calculator',
    slug: 'scientific',
    category: 'math-algebra',
    description: 'Full-featured online scientific calculator with trigonometric (sin, cos, tan), logarithmic, exponential, power, factorial, and memory registers.',
    shortDescription: 'Trig functions, logarithms, powers, factorials, and history memory.',
    iconName: 'Calculator',
    popular: true,
    featured: true,
    tags: ['scientific', 'calculator', 'trigonometry', 'sin', 'cos', 'tan', 'log', 'ln', 'square root', 'math']
  },
  {
    id: 'ratio-calculator',
    name: 'Ratio & Proportion Calculator',
    slug: 'ratio',
    category: 'math-algebra',
    description: 'Solve equivalent proportions (A:B = C:D), simplify ratios to lowest terms, and divide total quantities proportionally.',
    shortDescription: 'Solve proportions A:B = C:D, simplify ratios, and divide quantities.',
    iconName: 'Percent',
    popular: true,
    featured: false,
    tags: ['ratio', 'proportion', 'simplify ratio', 'scale', 'math']
  },
  {
    id: 'average-calculator',
    name: 'Average Calculator (Mean, Median, Mode)',
    slug: 'average',
    category: 'math-algebra',
    description: 'Calculate arithmetic mean, geometric mean, harmonic mean, median, mode, range, and weighted averages for any dataset.',
    shortDescription: 'Mean, median, mode, range, and weighted average calculator.',
    iconName: 'BarChart3',
    popular: true,
    featured: false,
    tags: ['average', 'mean', 'median', 'mode', 'weighted average', 'geometric mean']
  },
  {
    id: 'probability-calculator',
    name: 'Probability Calculator',
    slug: 'probability',
    category: 'math-algebra',
    description: 'Calculate single event probability, joint P(A and B), union P(A or B), odds in favor/against, and permutations (nPr) / combinations (nCr).',
    shortDescription: 'Single/joint probabilities, odds, permutations nPr & combinations nCr.',
    iconName: 'Dices',
    popular: true,
    featured: false,
    tags: ['probability', 'odds', 'permutations', 'combinations', 'dice', 'coin', 'stats']
  },
  {
    id: 'statistics-calculator',
    name: 'Statistics & Standard Deviation',
    slug: 'statistics',
    category: 'math-algebra',
    description: 'Calculate mean, median, mode, sample & population standard deviation, variance, range, and sum for any data set.',
    shortDescription: 'Mean, median, mode, standard deviation, and variance for datasets.',
    iconName: 'BarChart2',
    popular: true,
    tags: ['statistics', 'mean', 'median', 'mode', 'standard deviation', 'variance', 'sample', 'population']
  },
  {
    id: 'exponent-calculator',
    name: 'Exponent Calculator',
    slug: 'exponent',
    category: 'math-algebra',
    description: 'Calculate powers, negative exponents, fractional powers, and large number exponential evaluations with scientific notation.',
    shortDescription: 'Calculate powers, negative exponents, and scientific notation.',
    iconName: 'Zap',
    popular: false,
    tags: ['exponent', 'power', 'base', 'scientific notation', 'algebra', 'math']
  },
  {
    id: 'square-root-calculator',
    name: 'Square Root & Radical Calculator',
    slug: 'square-root',
    category: 'math-algebra',
    description: 'Calculate principal square roots, cube roots, nth roots, and simplify radicals into exact radical forms (a√b).',
    shortDescription: 'Square roots, cube roots, nth roots, and radical simplification.',
    iconName: 'Radical',
    popular: true,
    featured: false,
    tags: ['square root', 'cube root', 'nth root', 'radicals', 'simplify radical', 'math']
  },
  {
    id: 'geometry-calculator',
    name: 'Geometry Calculator (2D & 3D Shapes)',
    slug: 'geometry',
    category: 'math-algebra',
    description: 'Calculate area, perimeter, circumference, surface area, and volume for Circles, Rectangles, Triangles, Trapezoids, Spheres, Cylinders, Cones, and Cubes.',
    shortDescription: 'Area, perimeter, surface area, and volume for 2D & 3D shapes.',
    iconName: 'Shapes',
    popular: true,
    featured: true,
    tags: ['geometry', 'area', 'perimeter', 'volume', 'surface area', 'circle', 'triangle', 'sphere', 'cone']
  },

  // ==========================================
  // --- CONVERSION & UNITS ---
  // ==========================================
  {
    id: 'unit-converter',
    name: 'All-in-One Unit Converter',
    slug: 'unit-converter',
    category: 'conversion',
    description: 'Instantly convert between length, temperature, weight/mass, volume, area, speed, time, pressure, and digital storage units.',
    shortDescription: 'Convert length, weight, temperature, area, volume, and data.',
    iconName: 'ArrowLeftRight',
    popular: true,
    featured: true,
    tags: ['convert', 'unit converter', 'length', 'weight', 'temperature', 'meters', 'feet', 'celsius', 'fahrenheit', 'kg', 'lbs']
  },

  // ==========================================
  // --- DATE & TIME ---
  // ==========================================
  {
    id: 'date-calculator',
    name: 'Date Difference & Days Between',
    slug: 'date',
    category: 'date-time',
    description: 'Calculate the exact number of days, weeks, months, business days (excluding weekends), and hours between any two dates.',
    shortDescription: 'Calculate days between dates, working days, and age breakdown.',
    iconName: 'Calendar',
    popular: true,
    featured: true,
    tags: ['date', 'days between', 'calendar', 'business days', 'work days', 'age', 'weeks', 'time']
  },

  // ==========================================
  // --- REAL ESTATE CALCULATORS ---
  // ==========================================
  {
    id: 'rental-roi-calculator',
    name: 'Rental Property ROI & Cash Flow Calculator',
    slug: 'rental-roi',
    category: 'real-estate',
    description: 'Analyze real estate investments, monthly net cash flow, capitalization rate (Cap Rate), cash-on-cash return, and gross rent multiplier.',
    shortDescription: 'Monthly cash flow, cap rate, cash-on-cash return, and NOI.',
    iconName: 'Building',
    popular: true,
    featured: true,
    tags: ['real estate', 'rental', 'roi', 'cap rate', 'cash flow', 'property', 'investment'],
    formulaSummary: 'Cap Rate = (Annual NOI / Purchase Price) * 100; Cash-on-Cash = (Annual Cash Flow / Total Cash Invested) * 100.'
  },
  {
    id: 'cap-rate-calculator',
    name: 'Capitalization Rate (Cap Rate) Calculator',
    slug: 'cap-rate',
    category: 'real-estate',
    description: 'Calculate property capitalization rate, Net Operating Income (NOI), and property market valuation for commercial and residential real estate.',
    shortDescription: 'Calculate property capitalization rate and Net Operating Income.',
    iconName: 'Building2',
    popular: false,
    tags: ['cap rate', 'noi', 'valuation', 'real estate', 'commercial property']
  },

  // ==========================================
  // --- TAX CALCULATORS ---
  // ==========================================
  {
    id: 'income-tax-calculator',
    name: 'Income Tax & Take-Home Pay Calculator',
    slug: 'income-tax',
    category: 'tax',
    description: 'Calculate federal income tax, FICA (Social Security & Medicare), state taxes, standard deductions, and net monthly take-home salary.',
    shortDescription: 'Federal brackets, FICA, state tax, and net paycheck amount.',
    iconName: 'Receipt',
    popular: true,
    featured: true,
    tags: ['tax', 'income tax', 'paycheck', 'take-home', 'federal tax', 'fica', 'deductions'],
    formulaSummary: 'Taxable Income = Gross Income - Pre-tax Deductions - Standard Deduction.'
  },
  {
    id: 'sales-tax-calculator',
    name: 'Sales Tax & Total Price Calculator',
    slug: 'sales-tax',
    category: 'tax',
    description: 'Calculate sales tax amount, pre-tax price, total price with tax, and multi-item checkout discounts.',
    shortDescription: 'Calculate sales tax, total purchase cost, and reverse pre-tax price.',
    iconName: 'Tag',
    popular: false,
    tags: ['sales tax', 'tax rate', 'vat', 'checkout', 'receipt', 'price']
  },

  // ==========================================
  // --- BUSINESS CALCULATORS ---
  // ==========================================
  {
    id: 'break-even-calculator',
    name: 'Business Break-Even Analysis Calculator',
    slug: 'break-even',
    category: 'business',
    description: 'Calculate the exact number of units and revenue required to cover fixed and variable costs and reach zero profit/loss.',
    shortDescription: 'Break-even unit volume, revenue threshold, and contribution margin.',
    iconName: 'Briefcase',
    popular: true,
    featured: true,
    tags: ['business', 'break-even', 'fixed costs', 'margin', 'units', 'pricing', 'revenue'],
    formulaSummary: 'Break-Even Units = Fixed Costs / (Price per Unit - Variable Cost per Unit).'
  },
  {
    id: 'profit-margin-calculator',
    name: 'Profit Margin & Markup Calculator',
    slug: 'profit-margin',
    category: 'business',
    description: 'Calculate gross profit margin, net profit margin, and cost markup percentage for wholesale and retail pricing.',
    shortDescription: 'Gross margin, net margin, and markup percentage.',
    iconName: 'TrendingUp',
    popular: true,
    tags: ['profit margin', 'markup', 'gross margin', 'cost of goods', 'pricing']
  },

  // ==========================================
  // --- CONSTRUCTION CALCULATORS ---
  // ==========================================
  {
    id: 'concrete-calculator',
    name: 'Concrete Volume & Bags Calculator',
    slug: 'concrete',
    category: 'construction',
    description: 'Calculate cubic yards and cubic meters of concrete needed for slabs, footings, and round columns, including pre-mix bag estimates and waste margin.',
    shortDescription: 'Cubic yards, cubic meters, and 60lb/80lb bags with waste factor.',
    iconName: 'HardHat',
    popular: true,
    featured: true,
    tags: ['concrete', 'construction', 'slab', 'footing', 'column', 'cubic yards', 'bags', 'remodel'],
    formulaSummary: 'Cubic Yards = (Length ft * Width ft * Depth ft) / 27.'
  },
  {
    id: 'flooring-calculator',
    name: 'Tile & Flooring Area Calculator',
    slug: 'flooring',
    category: 'construction',
    description: 'Calculate square footage/meters of flooring, number of tile boxes needed, and waste factor for hardwood, laminate, vinyl, and ceramic tile.',
    shortDescription: 'Square footage, tile counts, box quantities, and waste allowance.',
    iconName: 'Square',
    popular: false,
    tags: ['flooring', 'tile', 'hardwood', 'laminate', 'square feet', 'remodel']
  },

  // ==========================================
  // --- ENGINEERING CALCULATORS ---
  // ==========================================
  {
    id: 'ohms-law-calculator',
    name: 'Ohm’s Law & Electrical Power Calculator',
    slug: 'ohms-law',
    category: 'engineering',
    description: 'Calculate Voltage (V), Current (I), Resistance (R), and Power (P) in electrical circuits from any two known parameters.',
    shortDescription: 'Voltage, current, resistance, and wattage power in electrical circuits.',
    iconName: 'Cpu',
    popular: true,
    featured: true,
    tags: ['ohms law', 'voltage', 'current', 'resistance', 'power', 'watts', 'amps', 'volts', 'engineering'],
    formulaSummary: 'V = I * R; P = V * I = I^2 * R = V^2 / R.'
  },

  // ==========================================
  // --- EDUCATION CALCULATORS ---
  // ==========================================
  {
    id: 'final-grade-calculator',
    name: 'Final Exam Grade Calculator',
    slug: 'final-grade',
    category: 'education',
    description: 'Calculate the exact score needed on your final exam to earn your desired course grade (A, B, C) based on current grade and exam weight.',
    shortDescription: 'Find the final exam score needed to achieve your target class grade.',
    iconName: 'GraduationCap',
    popular: true,
    featured: true,
    tags: ['grade', 'final exam', 'school', 'college', 'exam score', 'target grade', 'academic'],
    formulaSummary: 'Required Final = (Target - Current * (1 - Weight)) / Weight.'
  },

  // ==========================================
  // --- CRYPTOCURRENCY CALCULATORS ---
  // ==========================================
  {
    id: 'crypto-profit-calculator',
    name: 'Crypto Profit & Loss (PnL) Calculator',
    slug: 'crypto-profit',
    category: 'cryptocurrency',
    description: 'Calculate net profit, return on investment (ROI %), and total exit value for cryptocurrency trades including exchange fees.',
    shortDescription: 'Net profit, ROI %, exchange fee deductions, and payout totals.',
    iconName: 'Coins',
    popular: true,
    featured: true,
    tags: ['crypto', 'bitcoin', 'profit', 'roi', 'pnl', 'exchange fee', 'ethereum', 'trading'],
    formulaSummary: 'Net Profit = (Coins * Sell Price - Sell Fee) - Initial Investment.'
  },

  // ==========================================
  // --- OTHER / ACADEMIC / LIFESTYLE ---
  // ==========================================
  {
    id: 'gpa-calculator',
    name: 'GPA & College Grade Calculator',
    slug: 'gpa',
    category: 'construction-other',
    description: 'Calculate semester and cumulative Grade Point Average (GPA) with weighted and unweighted scales (4.0, 4.33, 5.0) and credit hours.',
    shortDescription: 'Semester and cumulative GPA with course credits & scales.',
    iconName: 'GraduationCap',
    popular: true,
    recentlyAdded: true,
    tags: ['gpa', 'grades', 'college', 'school', 'credits', 'weighted gpa', 'academic']
  },
  {
    id: 'gas-mileage-calculator',
    name: 'Gas Mileage & Trip Cost Calculator',
    slug: 'gas-mileage',
    category: 'construction-other',
    description: 'Calculate road trip fuel cost, MPG (miles per gallon), liters per 100km, and cost-per-passenger splitting.',
    shortDescription: 'Trip gas cost, fuel consumption, and passenger cost splitting.',
    iconName: 'Fuel',
    popular: false,
    recentlyAdded: true,
    tags: ['gas', 'fuel', 'mpg', 'trip cost', 'mileage', 'road trip', 'split cost']
  },

  // ==========================================
  // --- FINANCIAL EXPANSION CALCULATORS ---
  // ==========================================
  {
    id: 'loan-comparison-calculator',
    name: 'Loan Comparison Calculator',
    slug: 'loan-comparison',
    category: 'financial',
    description: 'Compare two loans side-by-side to see differences in monthly payment, total interest paid, and total lifetime cost.',
    shortDescription: 'Side-by-side loan terms, monthly payments, and total interest comparison.',
    iconName: 'Scale',
    popular: true,
    recentlyAdded: true,
    tags: ['loan comparison', 'compare loans', 'mortgage', 'interest rate', 'finance'],
    formulaSummary: 'Compares PMT = (r*PV)/(1 - (1+r)^-n) for Loan A vs Loan B.'
  },
  {
    id: 'car-lease-calculator',
    name: 'Car Lease vs. Buy Calculator',
    slug: 'car-lease',
    category: 'financial',
    description: 'Calculate auto lease monthly payments, depreciation fee, rent charge (money factor), and compare against buying.',
    shortDescription: 'Auto lease payments, money factor APR, and total lease costs.',
    iconName: 'Car',
    popular: true,
    recentlyAdded: true,
    tags: ['car lease', 'lease vs buy', 'auto loan', 'money factor', 'residual value'],
    formulaSummary: 'Monthly Lease = (Cap Cost - Residual)/Term + (Cap Cost + Residual) * Money Factor.'
  },
  {
    id: 'down-payment-calculator',
    name: 'Down Payment Savings Calculator',
    slug: 'down-payment',
    category: 'financial',
    description: 'Calculate how long it will take to save your target down payment for a house or car with regular monthly savings.',
    shortDescription: 'Target savings timeframe and monthly contribution requirements.',
    iconName: 'PiggyBank',
    popular: false,
    recentlyAdded: true,
    tags: ['down payment', 'savings', 'home buying', 'mortgage', 'goal'],
    formulaSummary: 'Months Needed = (Target Down Payment - Current Savings) / Monthly Savings.'
  },
  {
    id: 'emergency-fund-calculator',
    name: 'Emergency Fund Calculator',
    slug: 'emergency-fund',
    category: 'financial',
    description: 'Calculate recommended emergency savings cushion (3 to 12 months of essential living expenses) and savings timeline.',
    shortDescription: 'Target safety net buffer based on monthly living expenses.',
    iconName: 'ShieldCheck',
    popular: true,
    recentlyAdded: true,
    tags: ['emergency fund', 'savings', 'safety net', 'budget', 'personal finance'],
    formulaSummary: 'Target Fund = Essential Monthly Expenses * Desired Months of Coverage.'
  },
  {
    id: 'cd-calculator',
    name: 'Certificate of Deposit (CD) Calculator',
    slug: 'cd-calculator',
    category: 'financial',
    description: 'Calculate total interest and ending balance for bank Certificate of Deposit (CD) accounts at fixed APY rates.',
    shortDescription: 'Guaranteed fixed-rate return and maturity value on CD savings.',
    iconName: 'DollarSign',
    popular: false,
    recentlyAdded: true,
    tags: ['cd', 'certificate of deposit', 'bank', 'apy', 'fixed rate', 'interest'],
    formulaSummary: 'Maturity Value = Principal * (1 + APY/Compounding)^(Compounding * Term).'
  },
  {
    id: '401k-match-calculator',
    name: '401(k) Employer Match Calculator',
    slug: '401k-match',
    category: 'financial',
    description: 'Maximize your employer 401(k) match and calculate total annual retirement contributions with free employer money.',
    shortDescription: 'Employer match optimization and combined annual retirement contributions.',
    iconName: 'Briefcase',
    popular: true,
    recentlyAdded: true,
    tags: ['401k match', 'employer match', 'retirement', 'salary deferral', 'investing'],
    formulaSummary: 'Employer Match = Min(Your Contribution %, Match Cap %) * Match Rate * Salary.'
  },

  // ==========================================
  // --- HEALTH & FITNESS EXPANSION ---
  // ==========================================
  {
    id: 'pace-calculator',
    name: 'Running Pace & Race Time Calculator',
    slug: 'pace',
    category: 'fitness-health',
    description: 'Calculate running pace per mile or kilometer, finish times for 5K, 10K, Half Marathon, and Full Marathon races.',
    shortDescription: 'Mile/km splits and race finish time projections for runners.',
    iconName: 'Timer',
    popular: true,
    recentlyAdded: true,
    tags: ['running', 'pace', 'marathon', '5k', '10k', 'splits', 'fitness', 'cardio'],
    formulaSummary: 'Pace = Total Time / Total Distance.'
  },
  {
    id: 'one-rep-max-calculator',
    name: 'One-Rep Max (1RM) Calculator',
    slug: 'one-rep-max',
    category: 'fitness-health',
    description: 'Estimate your maximum one-rep lifting strength using Brzycki, Epley, and Lombardi exercise science formulas.',
    shortDescription: 'Estimated 1RM max strength and training percentages (50%-95%).',
    iconName: 'Dumbbell',
    popular: true,
    recentlyAdded: true,
    tags: ['1rm', 'one rep max', 'bench press', 'squat', 'deadlift', 'strength', 'gym'],
    formulaSummary: 'Epley: 1RM = Weight * (1 + Reps/30); Brzycki: 1RM = Weight * (36 / (37 - Reps)).'
  },
  {
    id: 'waist-to-hip-calculator',
    name: 'Waist-to-Hip Ratio (WHR) Calculator',
    slug: 'waist-to-hip',
    category: 'fitness-health',
    description: 'Calculate waist-to-hip ratio (WHR) and evaluate cardiovascular and metabolic health risk based on WHO standards.',
    shortDescription: 'Body fat distribution and WHO cardiovascular health risk assessment.',
    iconName: 'Activity',
    popular: false,
    recentlyAdded: true,
    tags: ['whr', 'waist to hip', 'body composition', 'health risk', 'cardiovascular'],
    formulaSummary: 'WHR = Waist Circumference / Hip Circumference.'
  },
  {
    id: 'sleep-cycle-calculator',
    name: 'Sleep Cycle & Wake-Up Calculator',
    slug: 'sleep-cycle',
    category: 'fitness-health',
    description: 'Calculate optimal bedtimes and wake times aligned with natural 90-minute REM sleep cycles to avoid grogginess.',
    shortDescription: 'Optimal bedtime and wake-up schedule based on 90-min REM cycles.',
    iconName: 'Moon',
    popular: true,
    recentlyAdded: true,
    tags: ['sleep', 'sleep cycle', 'bedtime', 'rem cycle', 'circadian rhythm', 'wake up'],
    formulaSummary: 'Cycle Duration = 90 minutes + 15 minutes average sleep latency.'
  },
  {
    id: 'alcohol-calorie-calculator',
    name: 'Alcohol Calories & Units Calculator',
    slug: 'alcohol-calories',
    category: 'fitness-health',
    description: 'Calculate total calories and standard alcohol units consumed from beer, wine, cocktails, and liquor shots.',
    shortDescription: 'Calorie count and standard drink units from alcoholic beverages.',
    iconName: 'Wine',
    popular: false,
    recentlyAdded: true,
    tags: ['alcohol', 'calories', 'beer', 'wine', 'cocktails', 'diet', 'nutrition'],
    formulaSummary: 'Calories = Grams of pure ethanol * 7 kcal/g + Carbohydrate calories.'
  },
  {
    id: 'lean-body-mass-calculator',
    name: 'Lean Body Mass (LBM) Calculator',
    slug: 'lean-body-mass',
    category: 'fitness-health',
    description: 'Calculate lean muscle mass weight and fat mass using Boer, James, and Hume clinical formulas.',
    shortDescription: 'Lean muscle vs fat mass estimation via validated clinical equations.',
    iconName: 'UserCheck',
    popular: false,
    recentlyAdded: true,
    tags: ['lean body mass', 'lbm', 'muscle mass', 'body fat', 'boer', 'james'],
    formulaSummary: 'Boer Formula: Men LBM = 0.407*W + 0.267*H - 19.2; Women LBM = 0.252*W + 0.473*H - 48.3.'
  },

  // ==========================================
  // --- MATH & ALGEBRA EXPANSION ---
  // ==========================================
  {
    id: 'quadratic-solver-calculator',
    name: 'Quadratic Equation Solver',
    slug: 'quadratic-solver',
    category: 'math-algebra',
    description: 'Solve quadratic polynomial equations ax² + bx + c = 0 with real and complex roots, discriminant, and vertex coordinates.',
    shortDescription: 'Roots, discriminant (Δ), and vertex coordinates for quadratic equations.',
    iconName: 'Binary',
    popular: true,
    recentlyAdded: true,
    tags: ['quadratic', 'algebra', 'roots', 'discriminant', 'parabola', 'polynomial', 'math'],
    formulaSummary: 'x = (-b ± √(b² - 4ac)) / 2a.'
  },
  {
    id: 'pythagorean-calculator',
    name: 'Pythagorean Theorem Calculator',
    slug: 'pythagorean',
    category: 'math-algebra',
    description: 'Solve right triangle sides (hypotenuse c, leg a, or leg b) and calculate triangle area and perimeter.',
    shortDescription: 'Solve right triangle hypotenuse, legs, area, and perimeter.',
    iconName: 'Triangle',
    popular: true,
    recentlyAdded: true,
    tags: ['pythagorean', 'geometry', 'triangle', 'hypotenuse', 'right triangle', 'math'],
    formulaSummary: 'a² + b² = c².'
  },
  {
    id: 'lcm-gcd-calculator',
    name: 'LCM & GCD Calculator',
    slug: 'lcm-gcd',
    category: 'math-algebra',
    description: 'Find the Least Common Multiple (LCM) and Greatest Common Divisor (GCD / GCF) of two integers using the Euclidean algorithm.',
    shortDescription: 'Least common multiple and greatest common factor with Euclidean steps.',
    iconName: 'Divide',
    popular: false,
    recentlyAdded: true,
    tags: ['lcm', 'gcd', 'gcf', 'factors', 'multiples', 'divisors', 'integers', 'math'],
    formulaSummary: 'LCM(a, b) = (|a * b|) / GCD(a, b).'
  },
  {
    id: 'logarithm-calculator',
    name: 'Logarithm & Natural Log Calculator',
    slug: 'logarithm',
    category: 'math-algebra',
    description: 'Calculate natural logarithm (ln), common logarithm (log₁₀), binary log (log₂), and arbitrary base logarithm log_b(x).',
    shortDescription: 'Log base 10, base 2, natural log (ln), and custom base logarithms.',
    iconName: 'Calculator',
    popular: false,
    recentlyAdded: true,
    tags: ['logarithm', 'log', 'natural log', 'ln', 'exponent', 'algebra', 'math'],
    formulaSummary: 'log_b(x) = ln(x) / ln(b).'
  },
  {
    id: 'factorial-permutations-calculator',
    name: 'Factorials, Permutations & Combinations Calculator',
    slug: 'factorial-permutations',
    category: 'math-algebra',
    description: 'Calculate factorial (n!), permutations nPr, and combinations nCr for probability and combinatorics problems.',
    shortDescription: 'Factorials n!, permutations nPr, and combinations nCr.',
    iconName: 'Hash',
    popular: false,
    recentlyAdded: true,
    tags: ['factorial', 'permutations', 'combinations', 'ncr', 'npr', 'combinatorics', 'math'],
    formulaSummary: 'nPr = n! / (n - r)!; nCr = n! / [r! * (n - r)!].'
  },
  {
    id: 'matrix-calculator',
    name: '2x2 Matrix Determinant & Inverse Calculator',
    slug: 'matrix',
    category: 'math-algebra',
    description: 'Calculate determinant, trace, matrix inverse, and eigenvalues for 2x2 square matrices in linear algebra.',
    shortDescription: '2x2 matrix determinant det(A), matrix inverse A⁻¹, and trace.',
    iconName: 'Grid',
    popular: false,
    recentlyAdded: true,
    tags: ['matrix', 'determinant', 'inverse matrix', 'linear algebra', 'math'],
    formulaSummary: 'det(A) = ad - bc; A⁻¹ = (1/det) * [[d, -b], [-c, a]].'
  },

  // ==========================================
  // --- REAL ESTATE EXPANSION ---
  // ==========================================
  {
    id: 'rent-vs-buy-calculator',
    name: 'Rent vs. Buy Home Calculator',
    slug: 'rent-vs-buy',
    category: 'real-estate',
    description: 'Comprehensive financial comparison between buying a home vs renting and investing the difference over a multi-year horizon.',
    shortDescription: 'Long-term net wealth comparison between buying a home and renting.',
    iconName: 'Building',
    popular: true,
    recentlyAdded: true,
    tags: ['rent vs buy', 'real estate', 'home ownership', 'mortgage', 'renting'],
    formulaSummary: 'Net Buy Cost = Total Outflows (PITI + Maintenance) - Built Equity (Appreciation).'
  },
  {
    id: 'refinance-calculator',
    name: 'Mortgage Refinance Breakeven Calculator',
    slug: 'refinance',
    category: 'real-estate',
    description: 'Calculate monthly payment reduction, closing cost breakeven timeline, and lifetime interest savings from refinancing.',
    shortDescription: 'Monthly savings and breakeven months on mortgage refinancing.',
    iconName: 'RefreshCw',
    popular: true,
    recentlyAdded: true,
    tags: ['refinance', 'mortgage', 'interest rate', 'breakeven', 'closing costs'],
    formulaSummary: 'Breakeven Months = Refinance Closing Costs / Monthly Payment Savings.'
  },
  {
    id: 'cash-on-cash-calculator',
    name: 'Cash-on-Cash Return Calculator',
    slug: 'cash-on-cash',
    category: 'real-estate',
    description: 'Calculate Cash-on-Cash (CoC) return rate for real estate rental property investments based on out-of-pocket capital.',
    shortDescription: 'Annual pre-tax cash flow yield on actual invested cash.',
    iconName: 'DollarSign',
    popular: true,
    recentlyAdded: true,
    tags: ['cash on cash', 'coc return', 'rental property', 'real estate roi', 'investing'],
    formulaSummary: 'CoC Return % = (Annual Pre-Tax Cash Flow / Total Cash Invested) * 100.'
  },
  {
    id: 'grm-calculator',
    name: 'Gross Rent Multiplier (GRM) Calculator',
    slug: 'grm',
    category: 'real-estate',
    description: 'Calculate Gross Rent Multiplier (GRM) to quickly screen and evaluate commercial or residential income property valuations.',
    shortDescription: 'Property purchase price relative to annual gross rental income.',
    iconName: 'Building2',
    popular: false,
    recentlyAdded: true,
    tags: ['grm', 'gross rent multiplier', 'real estate', 'valuation', 'rental income'],
    formulaSummary: 'GRM = Property Purchase Price / Gross Annual Rental Income.'
  },

  // ==========================================
  // --- TAX EXPANSION ---
  // ==========================================
  {
    id: 'capital-gains-tax-calculator',
    name: 'Capital Gains Tax Calculator',
    slug: 'capital-gains',
    category: 'tax',
    description: 'Estimate short-term and long-term capital gains taxes on stocks, real estate, crypto, and precious metals sales.',
    shortDescription: 'Federal short-term vs long-term capital gains tax estimation.',
    iconName: 'Receipt',
    popular: true,
    recentlyAdded: true,
    tags: ['capital gains', 'tax', 'stocks', 'crypto tax', 'profit', 'irs brackets'],
    formulaSummary: 'Capital Gain = Selling Price - Cost Basis; Tax = Gain * Tax Bracket %.'
  },
  {
    id: 'tip-calculator',
    name: 'Tip & Bill Splitter Calculator',
    slug: 'tip',
    category: 'tax',
    description: 'Calculate tip percentages (15%, 18%, 20%, 25%) on dining checks and split the bill evenly among group members.',
    shortDescription: 'Tip amounts and equal per-person bill split totals.',
    iconName: 'Utensils',
    popular: true,
    recentlyAdded: true,
    tags: ['tip', 'bill split', 'restaurant', 'gratuity', 'dining', 'everyday'],
    formulaSummary: 'Per Person = (Bill Total * (1 + Tip %)) / Number of People.'
  },
  {
    id: 'vat-calculator',
    name: 'VAT & Reverse VAT Calculator',
    slug: 'vat',
    category: 'tax',
    description: 'Calculate Value Added Tax (VAT / GST) to add to net prices or reverse-calculate net amounts from gross receipts.',
    shortDescription: 'Add or remove VAT/GST percentages from gross or net prices.',
    iconName: 'Percent',
    popular: false,
    recentlyAdded: true,
    tags: ['vat', 'gst', 'sales tax', 'value added tax', 'gross price', 'net price'],
    formulaSummary: 'Add VAT: Gross = Net * (1 + Rate); Remove VAT: Net = Gross / (1 + Rate).'
  },

  // ==========================================
  // --- BUSINESS EXPANSION ---
  // ==========================================
  {
    id: 'cac-ltv-calculator',
    name: 'CAC & LTV Ratio Calculator',
    slug: 'cac-ltv',
    category: 'business',
    description: 'Measure unit economics: Customer Acquisition Cost (CAC), Customer Lifetime Value (LTV), and LTV:CAC health ratio.',
    shortDescription: 'Customer acquisition cost, customer lifetime value, and ratio analysis.',
    iconName: 'TrendingUp',
    popular: true,
    recentlyAdded: true,
    tags: ['cac', 'ltv', 'saas metrics', 'unit economics', 'marketing roi', 'business'],
    formulaSummary: 'CAC = Spend / Customers; LTV = ARPU * Gross Margin % * (1 / Churn Rate).'
  },
  {
    id: 'markup-margin-calculator',
    name: 'Markup vs. Margin Pricing Calculator',
    slug: 'markup-margin',
    category: 'business',
    description: 'Convert between cost markup percentage and gross profit margin percentage to ensure profitable product pricing.',
    shortDescription: 'Convert between cost markup % and gross profit margin %.',
    iconName: 'DollarSign',
    popular: true,
    recentlyAdded: true,
    tags: ['markup', 'margin', 'pricing', 'profit', 'retail', 'wholesale', 'business'],
    formulaSummary: 'Markup % = (Price - Cost)/Cost * 100; Margin % = (Price - Cost)/Price * 100.'
  },
  {
    id: 'inventory-turnover-calculator',
    name: 'Inventory Turnover Ratio Calculator',
    slug: 'inventory-turnover',
    category: 'business',
    description: 'Calculate annual inventory turnover ratio and Days Sales of Inventory (DSI) to optimize supply chain efficiency.',
    shortDescription: 'Inventory turnover velocity and Days Sales of Inventory (DSI).',
    iconName: 'Layers',
    popular: false,
    recentlyAdded: true,
    tags: ['inventory turnover', 'dsi', 'supply chain', 'cogs', 'operations', 'business'],
    formulaSummary: 'Turnover = COGS / Average Inventory; DSI = 365 / Turnover.'
  },
  {
    id: 'ebitda-calculator',
    name: 'EBITDA & Operating Profit Calculator',
    slug: 'ebitda',
    category: 'business',
    description: 'Calculate Earnings Before Interest, Taxes, Depreciation, and Amortization (EBITDA) and operating margin percentage.',
    shortDescription: 'Earnings Before Interest, Taxes, Depreciation & Amortization.',
    iconName: 'Briefcase',
    popular: true,
    recentlyAdded: true,
    tags: ['ebitda', 'operating income', 'ebit', 'financial analysis', 'corporate finance'],
    formulaSummary: 'EBITDA = Operating Profit (EBIT) + Depreciation + Amortization.'
  },
  {
    id: 'burn-rate-calculator',
    name: 'Startup Cash Burn Rate & Runway Calculator',
    slug: 'burn-rate',
    category: 'business',
    description: 'Calculate gross burn, net monthly burn, and total runway months remaining for early-stage startups.',
    shortDescription: 'Net monthly burn and remaining startup runway in months.',
    iconName: 'Flame',
    popular: true,
    recentlyAdded: true,
    tags: ['burn rate', 'runway', 'startup', 'cash flow', 'venture capital', 'founder'],
    formulaSummary: 'Runway Months = Cash Balance / (Monthly Expenses - Monthly Revenue).'
  },

  // ==========================================
  // --- CONSTRUCTION EXPANSION ---
  // ==========================================
  {
    id: 'paint-calculator',
    name: 'Paint Coverage & Gallons Calculator',
    slug: 'paint',
    category: 'construction',
    description: 'Calculate gallons of paint needed for room walls and ceilings including door/window deductions and multiple coats.',
    shortDescription: 'Gallons of interior/exterior paint needed based on room dimensions.',
    iconName: 'Paintbrush',
    popular: true,
    recentlyAdded: true,
    tags: ['paint', 'coverage', 'gallons', 'home improvement', 'walls', 'remodel'],
    formulaSummary: 'Gallons = (Net Wall Area sq ft * Number of Coats) / 350 sq ft/gal.'
  },
  {
    id: 'drywall-calculator',
    name: 'Drywall Sheets & Screws Calculator',
    slug: 'drywall',
    category: 'construction',
    description: 'Estimate number of 4x8 or 4x12 drywall sheets, drywall screws, and joint compound mud gallons with waste factor.',
    shortDescription: 'Drywall sheet counts (4x8/4x12), screws, and joint compound mud.',
    iconName: 'Square',
    popular: false,
    recentlyAdded: true,
    tags: ['drywall', 'sheetrock', 'gypsum', 'construction', 'remodel', 'screws'],
    formulaSummary: 'Sheets = (Total Area sq ft * (1 + Waste %)) / Sheet sq ft (32 or 48).'
  },
  {
    id: 'mulch-gravel-calculator',
    name: 'Mulch & Gravel Volume Calculator',
    slug: 'mulch-gravel',
    category: 'construction',
    description: 'Calculate cubic yards, cubic feet, bagged mulch counts, and gravel tonnage needed for landscaping beds.',
    shortDescription: 'Cubic yards, cubic feet, 2 cu ft bags, and gravel tonnage.',
    iconName: 'Boxes',
    popular: true,
    recentlyAdded: true,
    tags: ['mulch', 'gravel', 'landscaping', 'cubic yards', 'garden', 'soil'],
    formulaSummary: 'Cubic Yards = (Area sq ft * (Depth inches / 12)) / 27.'
  },
  {
    id: 'deck-lumber-calculator',
    name: 'Decking & Lumber Board Footage Calculator',
    slug: 'deck-lumber',
    category: 'construction',
    description: 'Calculate total linear feet and board counts needed for outdoor patio decks based on plank dimensions.',
    shortDescription: 'Linear footage and 16-ft board counts for outdoor deck flooring.',
    iconName: 'HardHat',
    popular: false,
    recentlyAdded: true,
    tags: ['decking', 'lumber', 'board footage', 'patio', 'carpentry', 'construction'],
    formulaSummary: 'Linear Feet = Deck Area sq ft / (Board Width inches / 12).'
  },

  // ==========================================
  // --- ENGINEERING & SCIENCE EXPANSION ---
  // ==========================================
  {
    id: 'density-calculator',
    name: 'Density, Mass & Volume Calculator',
    slug: 'density',
    category: 'engineering',
    description: 'Solve for density (ρ), mass (m), or volume (V) using the physical density formula ρ = m / V.',
    shortDescription: 'Density, mass, and volume relationships in g/cm³ and kg/m³.',
    iconName: 'Cpu',
    popular: false,
    recentlyAdded: true,
    tags: ['density', 'mass', 'volume', 'physics', 'chemistry', 'engineering'],
    formulaSummary: 'Density ρ = Mass / Volume.'
  },
  {
    id: 'energy-calculator',
    name: 'Kinetic & Potential Energy Calculator',
    slug: 'energy',
    category: 'engineering',
    description: 'Calculate translational kinetic energy (0.5 mv²) and gravitational potential energy (mgh) in Joules.',
    shortDescription: 'Kinetic energy (½mv²) and gravitational potential energy (mgh) in Joules.',
    iconName: 'Zap',
    popular: false,
    recentlyAdded: true,
    tags: ['energy', 'kinetic energy', 'potential energy', 'physics', 'joules'],
    formulaSummary: 'KE = 0.5 * m * v²; PE = m * g * h.'
  },
  {
    id: 'pressure-calculator',
    name: 'Pressure & Force Calculator (P = F/A)',
    slug: 'pressure',
    category: 'engineering',
    description: 'Calculate mechanical pressure from force and surface area in Pascals, PSI, Bar, and Atmospheres.',
    shortDescription: 'Pressure from force and area in Pascals (Pa), PSI, Bar, and atm.',
    iconName: 'Activity',
    popular: false,
    recentlyAdded: true,
    tags: ['pressure', 'force', 'pascals', 'psi', 'bar', 'atm', 'physics'],
    formulaSummary: 'Pressure P = Force F / Area A.'
  },
  {
    id: 'speed-of-sound-calculator',
    name: 'Speed of Sound & Mach Calculator',
    slug: 'speed-of-sound',
    category: 'engineering',
    description: 'Calculate the speed of sound in air at any temperature and determine Mach flight speed numbers.',
    shortDescription: 'Speed of sound in air based on temperature and Mach conversions.',
    iconName: 'Gauge',
    popular: false,
    recentlyAdded: true,
    tags: ['speed of sound', 'mach', 'acoustics', 'aerodynamics', 'physics'],
    formulaSummary: 'c = 331.3 * √(1 + T_c / 273.15) m/s; Mach = Speed / c.'
  },

  // ==========================================
  // --- EVERYDAY / DATE-TIME / ACADEMIC / CRYPTO ---
  // ==========================================
  {
    id: 'time-card-calculator',
    name: 'Work Hours & Time Card Calculator',
    slug: 'time-card',
    category: 'date-time',
    description: 'Calculate daily clocked work hours, weekly overtime hours (1.5x pay), and total gross paycheck wages.',
    shortDescription: 'Daily clocked hours, 1.5x overtime hours, and gross wages.',
    iconName: 'Clock',
    popular: true,
    recentlyAdded: true,
    tags: ['time card', 'work hours', 'timesheet', 'payroll', 'overtime', 'wages'],
    formulaSummary: 'Gross Pay = (Regular Hours * Rate) + (Overtime Hours * 1.5 * Rate).'
  },
  {
    id: 'exact-age-calculator',
    name: 'Exact Age in Seconds & Days Calculator',
    slug: 'exact-age',
    category: 'date-time',
    description: 'Break down your exact chronological age in total days, hours, minutes, seconds, and estimated lifetime heartbeats.',
    shortDescription: 'Exact age breakdown in total days, hours, seconds, and heartbeats.',
    iconName: 'Calendar',
    popular: true,
    recentlyAdded: true,
    tags: ['age', 'birthday', 'exact age', 'days lived', 'seconds lived', 'date of birth'],
    formulaSummary: 'Elapsed Time = Current Timestamp - Date of Birth Timestamp.'
  },
  {
    id: 'time-zone-calculator',
    name: 'Time Zone Difference & Meeting Planner',
    slug: 'time-zone',
    category: 'construction-other',
    description: 'Convert meeting times instantly across global time zones (UTC, EST, PST, CET, GST, IST, JST, AEST).',
    shortDescription: 'Global time converter and multi-city meeting planner.',
    iconName: 'Globe',
    popular: true,
    recentlyAdded: true,
    tags: ['time zone', 'world clock', 'meeting planner', 'utc', 'est', 'pst', 'gmt'],
    formulaSummary: 'Target Time = Origin Time + (Target UTC Offset - Origin UTC Offset).'
  },
  {
    id: 'net-worth-calculator',
    name: 'Personal Net Worth Tracker Calculator',
    slug: 'net-worth',
    category: 'construction-other',
    description: 'Calculate your total personal financial net worth by tallying all assets (cash, investments, real estate) minus liabilities.',
    shortDescription: 'Personal balance sheet: Total Assets minus Total Liabilities.',
    iconName: 'DollarSign',
    popular: true,
    recentlyAdded: true,
    tags: ['net worth', 'assets', 'liabilities', 'financial planning', 'wealth'],
    formulaSummary: 'Net Worth = Total Assets - Total Liabilities.'
  },
  {
    id: 'dog-age-calculator',
    name: 'Dog Years to Human Years Calculator',
    slug: 'dog-age',
    category: 'construction-other',
    description: 'Convert your dog’s chronological age to equivalent human years based on size and breed development curves.',
    shortDescription: 'Breed-size adjusted human age conversion for dogs.',
    iconName: 'Dog',
    popular: true,
    recentlyAdded: true,
    tags: ['dog age', 'dog years', 'pets', 'puppy', 'veterinary', 'human age'],
    formulaSummary: 'AVMA size-adjusted model: Year 1 = 15 yrs, Year 2 = +9 yrs, subsequent years +4 to +7 yrs by size.'
  },
  {
    id: 'cooking-converter-calculator',
    name: 'Cooking & Kitchen Ratio Converter',
    slug: 'cooking-converter',
    category: 'conversion',
    description: 'Convert cooking volume and mass: cups to grams for flour/sugar/butter, tablespoons, teaspoons, and fluid ounces.',
    shortDescription: 'Cups to grams for flour/sugar/butter, tablespoons, and fluid ounces.',
    iconName: 'Utensils',
    popular: true,
    recentlyAdded: true,
    tags: ['cooking', 'baking', 'cups to grams', 'tablespoons', 'kitchen converter', 'recipe'],
    formulaSummary: '1 Cup = 16 Tbsp = 48 Tsp = 8 fl oz = Density-dependent Grams.'
  },
  {
    id: 'crypto-dca-calculator',
    name: 'Crypto Dollar Cost Averaging (DCA) Simulator',
    slug: 'crypto-dca',
    category: 'cryptocurrency',
    description: 'Simulate recurring cryptocurrency DCA investments (weekly or monthly) vs lump-sum with historical growth compounding.',
    shortDescription: 'Recurring DCA strategy simulator and portfolio growth forecasting.',
    iconName: 'Coins',
    popular: true,
    recentlyAdded: true,
    tags: ['crypto dca', 'dollar cost averaging', 'bitcoin', 'ethereum', 'investing strategy'],
    formulaSummary: 'Compounded DCA accumulation portfolio formula with monthly deposits.'
  },
  {
    id: 'staking-rewards-calculator',
    name: 'Crypto Staking APY & Rewards Calculator',
    slug: 'staking-rewards',
    category: 'cryptocurrency',
    description: 'Calculate daily, monthly, and annual compounding rewards from cryptocurrency proof-of-stake (PoS) staking.',
    shortDescription: 'Compounded staking yields and token rewards from PoS staking APY.',
    iconName: 'Coins',
    popular: true,
    recentlyAdded: true,
    tags: ['staking', 'apy', 'crypto rewards', 'proof of stake', 'solana', 'ethereum'],
    formulaSummary: 'Ending Balance = Staked Amount * (1 + APY / 365)^Days.'
  },
  {
    id: 'impermanent-loss-calculator',
    name: 'Impermanent Loss (IL) Calculator',
    slug: 'impermanent-loss',
    category: 'cryptocurrency',
    description: 'Calculate Uniswap / AMM liquidity pool impermanent loss percentage based on divergence in token prices.',
    shortDescription: 'DEX AMM liquidity provider impermanent loss vs holding.',
    iconName: 'TrendingDown',
    popular: false,
    recentlyAdded: true,
    tags: ['impermanent loss', 'amm', 'liquidity pool', 'uniswap', 'defi', 'yield farming'],
    formulaSummary: 'IL = (2 * √k) / (1 + k) - 1, where k is the price ratio change.'
  }
];

