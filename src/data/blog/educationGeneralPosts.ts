import { BlogPost } from '../../types';
import { BLOG_AUTHORS } from '../blogAuthors';

export const EDUCATION_GENERAL_POSTS: BlogPost[] = [
  {
    slug: 'how-to-calculate-gpa-weighted-vs-unweighted',
    title: 'How to Calculate GPA: Weighted vs Unweighted 4.0 & 5.0 Scales',
    excerpt: 'Master high school and college Grade Point Average (GPA) calculations. Learn unweighted 4.0 vs weighted 5.0 AP/IB scales, credit-hour weighted math, and cumulative GPA formulas.',
    coverImage: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&h=675&q=80',
    imageAlt: 'Graduation cap and academic transcript report card representing GPA calculations',
    category: 'education',
    categoryLabel: 'Education',
    author: BLOG_AUTHORS.marcusVance,
    publishedAt: '2026-07-10',
    updatedAt: '2026-08-19',
    readTimeMinutes: 12,
    featured: true,
    tags: ['GPA Calculation', 'Weighted GPA', 'Unweighted GPA', 'Grade Point Average', 'College Admissions', 'Academic Math'],
    relatedCalculatorIds: ['gpa-calculator', 'percentage-calculator'],
    relatedBlogSlugs: ['how-to-calculate-an-average-mean-median-mode', 'how-to-calculate-a-percentage-step-by-step-guide'],
    metaDescription: 'Learn how to calculate GPA for high school and college. Weighted vs unweighted 4.0/5.0 scales, credit hour formula [Σ(Points * Credits) / Total Credits], and examples.',
    metaKeywords: ['how to calculate gpa', 'gpa formula', 'weighted vs unweighted gpa', 'calculate cumulative gpa', 'grade point average scale'],
    keyTakeaways: [
      'Grade Point Average (GPA) standardizes academic performance into a single numerical index between 0.0 and 4.0 (or 5.0 for weighted scales).',
      'College & Credit-Weighted GPA Formula: GPA = [ Σ (Grade Quality Points × Course Credit Hours) ] ÷ Total Credit Hours Attempted.',
      'Unweighted GPA Scale (0.0 to 4.0): Treats all courses equally regardless of difficulty (A = 4.0, B = 3.0, C = 2.0, D = 1.0, F = 0.0).',
      'Weighted GPA Scale (0.0 to 5.0): Grants extra quality points for rigorous coursework (+0.5 for Honors courses, +1.0 for AP/IB/Dual-Enrollment courses; an A in AP = 5.0).',
      'Cumulative GPA combines all semester grade points divided by all cumulative credit hours across your entire academic career.'
    ],
    faqs: [
      {
        question: 'Do college admissions officers look at Weighted or Unweighted GPA?',
        answer: 'Most selective universities evaluate both: They use Unweighted GPA to assess raw academic consistency across applicants from different high schools, while looking at Weighted GPA and course transcripts to measure academic rigor (how many challenging AP/IB classes were taken).'
      },
      {
        question: 'How do plus and minus letter grades affect your 4.0 GPA?',
        answer: 'Standard collegiate quality points: A/A+ = 4.0, A- = 3.7, B+ = 3.3, B = 3.0, B- = 2.7, C+ = 2.3, C = 2.0, C- = 1.7, D+ = 1.3, D = 1.0, F = 0.0.'
      }
    ],
    sections: [
      {
        id: 'the-gpa-formula',
        title: '1. The Universal Credit-Weighted GPA Formula',
        content: [
          'Calculate collegiate and high school GPA using standard quality point math:'
        ],
        formula: {
          equation: 'GPA = [ Σ ( Course Quality Points × Credit Hours ) ] / Total Attempted Credit Hours\nSemester Quality Points = Grade Value × Credit Hours',
          description: 'Standard Academic Grade Point Average Equation',
          variables: [
            { symbol: 'Course Quality Points', meaning: 'Numerical grade value earned (e.g., A = 4.0, B = 3.0)' },
            { symbol: 'Credit Hours', meaning: 'Academic course weight / lecture hours per week (e.g. 3.0 or 4.0 credits)' },
            { symbol: 'Total Attempted Credit Hours', meaning: 'Sum of all course credits attempted in the semester/degree' }
          ]
        }
      },
      {
        id: 'letter-grade-scale-table',
        title: '2. Standard Letter Grade Quality Points Scale Matrix',
        content: [
          'Standard conversion matrix across unweighted, honors, and AP/IB courses:'
        ],
        table: {
          headers: ['Letter Grade', 'Percentage Score', 'Standard Unweighted (4.0)', 'Honors (+0.5)', 'AP / IB (+1.0)'],
          rows: [
            ['A+ / A', '93% – 100%', '4.00', '4.50', '5.00'],
            ['A-', '90% – 92%', '3.70', '4.20', '4.70'],
            ['B+', '87% – 89%', '3.30', '3.80', '4.30'],
            ['B', '83% – 86%', '3.00', '3.50', '4.00'],
            ['B-', '80% – 82%', '2.70', '3.20', '3.70'],
            ['C+', '77% – 79%', '2.30', '2.80', '3.30'],
            ['C', '73% – 76%', '2.00', '2.50', '3.00'],
            ['D', '60% – 69%', '1.00', '1.00', '1.00'],
            ['F', 'Below 60%', '0.00', '0.00', '0.00']
          ],
          caption: 'Complete academic GPA grading scale matrix'
        }
      }
    ]
  },
  {
    slug: 'how-to-calculate-hours-between-two-times',
    title: 'How to Calculate Hours Between Two Times: Payroll & Time Cards',
    excerpt: 'Master time and elapsed duration calculations. Learn how to calculate hours worked across midnight, convert clock minutes to decimal hours for payroll, and deduct unpaid breaks.',
    coverImage: 'https://images.unsplash.com/photo-1508962914676-134849a727f0?auto=format&fit=crop&w=1200&h=675&q=80',
    imageAlt: 'Vintage clock face and modern digital time tracking timesheet representing hours calculations',
    category: 'education',
    categoryLabel: 'Education',
    author: BLOG_AUTHORS.marcusVance,
    publishedAt: '2026-07-12',
    updatedAt: '2026-08-19',
    readTimeMinutes: 11,
    featured: false,
    tags: ['Hours Between Times', 'Time Card Calculation', 'Payroll Math', 'Decimal Hours', 'Military Time', 'Work Hours'],
    relatedCalculatorIds: ['time-calculator', 'hours-calculator'],
    relatedBlogSlugs: ['how-to-calculate-your-exact-age-in-years-months-days', 'how-to-calculate-a-percentage-step-by-step-guide'],
    metaDescription: 'Learn how to calculate hours between two times for payroll. Midnight crossover math, converting minutes to decimal hours [Minutes / 60], and time card examples.',
    metaKeywords: ['how to calculate hours between two times', 'time card calculator math', 'convert minutes to decimal hours', 'calculate hours worked', 'time difference formula'],
    keyTakeaways: [
      'Standard Elapsed Time: Elapsed Time = End Time - Start Time - Unpaid Break Duration.',
      'Military Time (24-Hour Clock): Converting 12-hour AM/PM to 24-hour time eliminates subtraction confusion (e.g. 5:30 PM becomes 17:30).',
      'The Midnight Crossover Rule: When a shift crosses midnight (End Time < Start Time), add 24 hours to the End Time before subtracting: Elapsed = (End Time + 24:00) - Start Time.',
      'Converting Minutes to Decimal Hours for Payroll: Divide minutes by 60 (e.g. 45 minutes = 45 ÷ 60 = 0.75 hours; 8 hours and 45 minutes = 8.75 decimal hours).',
      'Gross Wage Formula: Gross Pay = Decimal Hours Worked × Hourly Wage Rate (8.75 hrs × $20/hr = $175.00).'
    ],
    faqs: [
      {
        question: 'Why do payroll systems require decimal hours instead of hours and minutes?',
        answer: 'Time is base-60 (sexagesimal), while currency and payroll systems are base-10 (decimal). Multiplying an hourly wage by minutes directly produces catastrophic errors (e.g., 8 hours 30 minutes is 8.5 hours, NOT 8.30; multiplying $20 × 8.30 underpays the employee by $4.00).'
      },
      {
        question: 'How do you calculate a night shift that crosses midnight (e.g., 9:30 PM to 6:00 AM)?',
        answer: 'Convert to 24-hour time: 9:30 PM = 21:30, 6:00 AM = 06:00. Because 06:00 is smaller than 21:30, add 24:00 to 06:00 = 30:00. Subtract: 30:00 - 21:30 = 8 hours and 30 minutes (8.50 decimal hours).'
      }
    ],
    sections: [
      {
        id: 'minutes-to-decimal-table',
        title: '1. Minutes to Decimal Hours Payroll Conversion Matrix',
        content: [
          'Use this standard payroll conversion chart for every 5-minute time interval:'
        ],
        table: {
          headers: ['Clock Minutes', 'Decimal Fraction', 'Clock Minutes', 'Decimal Fraction'],
          rows: [
            ['5 min', '0.083 hrs', '35 min', '0.583 hrs'],
            ['10 min', '0.167 hrs', '40 min', '0.667 hrs'],
            ['15 min (Quarter Hr)', '0.250 hrs', '45 min (Three Quarters)', '0.750 hrs'],
            ['20 min', '0.333 hrs', '50 min', '0.833 hrs'],
            ['25 min', '0.417 hrs', '55 min', '0.917 hrs'],
            ['30 min (Half Hr)', '0.500 hrs', '60 min (Full Hr)', '1.000 hrs']
          ],
          caption: 'Standard payroll minutes to decimal hours table'
        }
      }
    ]
  },
  {
    slug: 'how-to-calculate-your-exact-age-in-years-months-days',
    title: 'How to Calculate Your Exact Age in Years, Months, and Days',
    excerpt: 'Master calendar date arithmetic. Learn how to calculate chronological age, handle leap-year February 29 birthdays, navigate varying month lengths (28 to 31 days), and calculate exact total days lived.',
    coverImage: 'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&w=1200&h=675&q=80',
    imageAlt: 'Calendar page with marked birth date and stopwatch representing chronological age calculations',
    category: 'education',
    categoryLabel: 'Education',
    author: BLOG_AUTHORS.marcusVance,
    publishedAt: '2026-07-15',
    updatedAt: '2026-08-19',
    readTimeMinutes: 11,
    featured: false,
    tags: ['Age Calculation', 'Chronological Age', 'Calendar Math', 'Leap Years', 'Date Arithmetic', 'Everyday Math'],
    relatedCalculatorIds: ['age-calculator', 'date-calculator', 'time-calculator'],
    relatedBlogSlugs: ['how-to-calculate-hours-between-two-times', 'scientific-notation-how-to-write-calculate-convert'],
    metaDescription: 'Learn how to calculate exact chronological age in years, months, and days. Date arithmetic borrowing rules, leap-year handling, and total days lived formulas.',
    metaKeywords: ['how to calculate exact age', 'chronological age formula', 'calculate age in years months days', 'date arithmetic borrowing', 'age calculator math'],
    keyTakeaways: [
      'Chronological age is calculated by subtracting Birth Date (Year, Month, Day) from Current Reference Date (Year, Month, Day).',
      'The "Borrowing" Rule in Date Arithmetic: When subtracting days and Current Day < Birth Day, borrow 1 month from the current month (adding the exact number of days in the preceding month: 28, 29, 30, or 31).',
      'When Current Month < Birth Month, borrow 1 year from the current year (adding 12 months to the current month).',
      'Leap Year Rule (Gregorian Calendar): A year is a leap year if divisible by 4, except for end-of-century years which must be divisible by 400 (e.g. 2000 was a leap year; 1900 was not).',
      'Total Days Lived: Total Days = (Completed Normal Years × 365) + (Number of Leap Days in Lifespan) + (Days in Incomplete Current Year).'
    ],
    faqs: [
      {
        question: 'How do legal systems treat someone born on Leap Day (February 29)?',
        answer: 'In common law jurisdictions (such as the UK and most US states), individuals born on February 29 legally turn a year older on March 1 in non-leap years. Some jurisdictions legally recognize February 28 as the statutory anniversary.'
      },
      {
        question: 'Why can you not simply divide total days lived by 365.25 to get exact years, months, and days?',
        answer: 'Because calendar months vary in length (28, 29, 30, or 31 days). A decimal result like 24.38 years cannot accurately determine the exact day count of the current month without calendar-specific date arithmetic.'
      }
    ],
    sections: [
      {
        id: 'date-subtraction-walkthrough',
        title: '1. Step-by-Step Date Arithmetic Borrowing Walkthrough',
        content: [
          'Let us calculate the exact age on August 19, 2026 for someone born on November 25, 1998:'
        ],
        callout: {
          type: 'example',
          title: 'Chronological Age Borrowing Calculation',
          text: 'Target Date: August 19, 2026 (2026-08-19)\nBirth Date: November 25, 1998 (1998-11-25)\n\nStep 1: Subtract Days (19 - 25)\n• 19 is smaller than 25, so we must borrow 1 month from August.\n• July (preceding month) has 31 days.\n• New Days = 19 + 31 = 50 days.\n• Months remaining in 2026 = 8 - 1 = 7 (July).\n• Days = 50 - 25 = 25 Days.\n\nStep 2: Subtract Months (7 - 11)\n• 7 is smaller than 11, so we borrow 1 year from 2026.\n• Add 12 months: 7 + 12 = 19 months.\n• Years remaining = 2026 - 1 = 2025.\n• Months = 19 - 11 = 8 Months.\n\nStep 3: Subtract Years (2025 - 1998)\n• Years = 2025 - 1998 = 27 Years.\n\nExact Result: 27 Years, 8 Months, and 25 Days.'
        }
      }
    ]
  },
  {
    slug: 'scientific-notation-how-to-write-calculate-convert',
    title: 'Scientific Notation: How to Write, Convert, and Calculate',
    excerpt: 'Master scientific and engineering notation. Learn standard form a × 10^b, convert extremely large astronomical and microscopic numbers, and perform addition, multiplication, and division with exponents.',
    coverImage: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=1200&h=675&q=80',
    imageAlt: 'Astrophysics equations, powers of ten, and scientific notation exponents on chalkboard',
    category: 'education',
    categoryLabel: 'Education',
    author: BLOG_AUTHORS.marcusVance,
    publishedAt: '2026-07-18',
    updatedAt: '2026-08-19',
    readTimeMinutes: 12,
    featured: false,
    tags: ['Scientific Notation', 'Exponents', 'Standard Form', 'Engineering Notation', 'Physics Math', 'Math Rules'],
    relatedCalculatorIds: ['scientific-calculator', 'percentage-calculator'],
    relatedBlogSlugs: ['how-to-calculate-a-percentage-step-by-step-guide', 'how-to-convert-different-units-of-length'],
    metaDescription: 'Complete tutorial on scientific notation. Master standard form a * 10^b (1 <= |a| < 10), multiplying and dividing exponents, and metric SI prefixes.',
    metaKeywords: ['how to write scientific notation', 'scientific notation formula', 'convert to scientific notation', 'multiplying scientific notation', 'standard form math'],
    keyTakeaways: [
      'Scientific notation expresses numbers as a × 10^b, where the coefficient a satisfies 1 ≤ |a| < 10, and exponent b is an integer.',
      'Positive Exponents (b > 0) represent large numbers ≥ 10 (decimal point moves to the right).',
      'Negative Exponents (b < 0) represent tiny decimals between 0 and 1 (decimal point moves to the left).',
      'Multiplication Rule: Multiply coefficients and ADD exponents: (a × 10^m) × (c × 10^n) = (a × c) × 10^(m + n).',
      'Division Rule: Divide coefficients and SUBTRACT exponents: (a × 10^m) ÷ (c × 10^n) = (a ÷ c) × 10^(m - n).',
      'Engineering Notation: Exponents must always be multiples of 3 (e.g. 10^3, 10^6, 10^-9) matching SI metric prefixes (kilo, mega, micro, nano).'
    ],
    faqs: [
      {
        question: 'Why must the coefficient "a" always be between 1.0 and 9.999...?',
        answer: 'By international mathematical convention, having exactly one non-zero digit to the left of the decimal point establishes a universal standardized form, eliminating ambiguity across scientific publications.'
      },
      {
        question: 'What is the speed of light and the mass of an electron in scientific notation?',
        answer: 'Speed of Light in vacuum (c) = 2.99792 × 10^8 m/s (~300,000,000 m/s). Mass of an electron (m_e) = 9.10938 × 10^-31 kg.'
      }
    ],
    sections: [
      {
        id: 'scientific-notation-arithmetic-rules',
        title: '1. Arithmetic Operations in Scientific Notation',
        content: [
          'Use standard exponent laws to calculate with scientific numbers:'
        ],
        formula: {
          equation: 'Standard Form: N = a × 10^b   (where 1 ≤ |a| < 10)\nMultiplication: ( a × 10^m ) × ( c × 10^n ) = ( a · c ) × 10^( m + n )\nDivision: ( a × 10^m ) / ( c × 10^n ) = ( a / c ) × 10^( m - n )\nPower of a Power: ( a × 10^m )^k = a^k × 10^( m · k )',
          description: 'Standard Scientific Notation Algebraic Operations',
          variables: [
            { symbol: 'a, c', meaning: 'Coefficients / mantissas (must satisfy 1 ≤ |a| < 10)' },
            { symbol: 'm, n', meaning: 'Integer powers of ten representing order of magnitude' }
          ]
        }
      },
      {
        id: 'si-prefixes-table',
        title: '2. Metric SI Unit Prefixes & Scientific Notation Reference',
        content: [
          'Connect standard scientific exponents to international metric prefixes:'
        ],
        table: {
          headers: ['SI Prefix', 'Symbol', 'Power of 10 Exponent', 'Standard Decimal Value', 'Everyday Example'],
          rows: [
            ['Giga-', 'G', '10^9', '1,000,000,000', 'Gigahertz (GHz), Gigabytes (GB)'],
            ['Mega-', 'M', '10^6', '1,000,000', 'Megawatt (MW), Megapixels'],
            ['Kilo-', 'k', '10^3', '1,000', 'Kilogram (kg), Kilometer (km)'],
            ['Base Unit', '—', '10^0', '1', 'Meter, Liter, Gram, Second'],
            ['Milli-', 'm', '10^-3', '0.001', 'Millimeter (mm), Milligram (mg)'],
            ['Micro-', 'μ', '10^-6', '0.000001', 'Micrometer (micron), Microgram'],
            ['Nano-', 'n', '10^-9', '0.000000001', 'Nanometer (computer chip transistors)']
          ],
          caption: 'SI metric prefixes and scientific powers of 10'
        }
      }
    ]
  },
  {
    slug: 'how-to-calculate-sales-tax-and-discounts',
    title: 'How to Calculate Sales Tax, Discounts & Tips: Retail Math Guide',
    excerpt: 'Master commercial retail shopping math. Learn how to calculate percentage discounts, stacked promo codes, combined sales tax, restaurant gratuity tips, and pre-tax receipt totals.',
    coverImage: 'https://images.unsplash.com/photo-1556740758-90de374c12ad?auto=format&fit=crop&w=1200&h=675&q=80',
    imageAlt: 'Retail shopping cart, discount coupon tags, and sales tax receipt calculations',
    category: 'education',
    categoryLabel: 'Education',
    author: BLOG_AUTHORS.marcusVance,
    publishedAt: '2026-07-22',
    updatedAt: '2026-08-19',
    readTimeMinutes: 11,
    featured: false,
    tags: ['Sales Tax', 'Discounts', 'Tip Calculation', 'Retail Math', 'Shopping Math', 'Everyday Calculations'],
    relatedCalculatorIds: ['discount-calculator', 'percentage-calculator', 'tip-calculator'],
    relatedBlogSlugs: ['how-to-calculate-a-percentage-step-by-step-guide', 'how-to-calculate-percentage-increase-and-decrease'],
    metaDescription: 'Learn how to calculate sales tax, discounts, and tips. Discount formula [Price * (1 - Discount)], sales tax math, reverse tax formulas, and receipt breakdowns.',
    metaKeywords: ['how to calculate sales tax', 'discount formula', 'calculate sales tax and tip', 'how to calculate discount percentage', 'retail shopping math'],
    keyTakeaways: [
      'Discount Price Formula: Final Discounted Price = Original Price × (1 - Discount Rate decimal).',
      'Sales Tax Formula: Sales Tax Amount = Taxable Subtotal × Tax Rate decimal; Total Price = Subtotal × (1 + Tax Rate).',
      'Order of Operations: Discounts are applied FIRST to reduce the subtotal; sales tax is calculated SECOND on the reduced subtotal.',
      'Reverse Sales Tax: To extract the pre-tax price from a total receipt, divide by (1 + Tax Rate decimal), do NOT subtract the tax rate directly.',
      'Stacked Discounts Trap: A 30% discount followed by an additional 20% coupon equals a 44% net discount (0.70 × 0.80 = 0.56), not 50% off.'
    ],
    faqs: [
      {
        question: 'Why is sales tax calculated AFTER the discount instead of before?',
        answer: 'In nearly all US states and jurisdictions, sales tax is legally assessed only on the actual transaction amount paid by the customer after store discounts are deducted.'
      },
      {
        question: 'How do you calculate a restaurant tip quickly in your head?',
        answer: 'For a 20% tip: Move the decimal point one place left (10%) and double that number (e.g. On a $64.00 bill: 10% is $6.40; $6.40 × 2 = $12.80 tip). For a 15% tip: Take 10% ($6.40) and add half of that ($3.20) = $9.60 tip.'
      }
    ],
    sections: [
      {
        id: 'the-retail-math-formulas',
        title: '1. Master Retail Shopping & Sales Tax Formulas',
        content: [
          'Use these standard equations for retail and restaurant shopping calculations:'
        ],
        formula: {
          equation: 'Discount Amount = Original Price × Discount Rate\nDiscounted Subtotal = Original Price × ( 1 - Discount Rate )\nSales Tax Amount = Discounted Subtotal × Sales Tax Rate\nTotal Final Cost = Discounted Subtotal × ( 1 + Sales Tax Rate )\nPre-Tax Price from Receipt = Total Receipt / ( 1 + Sales Tax Rate )',
          description: 'Master Retail Shopping and Commercial Tax Equations',
          variables: [
            { symbol: 'Original Price', meaning: 'The manufacturer\'s suggested retail price (MSRP)' },
            { symbol: 'Discount Rate', meaning: 'Promotional discount expressed as decimal (e.g. 25% = 0.25)' },
            { symbol: 'Sales Tax Rate', meaning: 'State + local combined sales tax decimal (e.g. 8.25% = 0.0825)' }
          ]
        }
      },
      {
        id: 'complete-shopping-worked-example',
        title: '2. Complete Retail Shopping Receipt Case Study',
        content: [
          'Let us calculate the final receipt for a $120 jacket with a 25% store discount and 8.5% sales tax:'
        ],
        callout: {
          type: 'example',
          title: 'Step-by-Step Retail Walkthrough',
          text: 'Given Parameters:\n• Original Jacket MSRP = $120.00\n• Store Discount = 25% (0.25)\n• Combined City/State Sales Tax = 8.5% (0.085)\n\nStep 1: Calculate Discount Savings & Subtotal\n• Dollar Savings = $120.00 × 0.25 = $30.00\n• Discounted Subtotal = $120.00 - $30.00 = $90.00\n\nStep 2: Calculate Sales Tax\n• Sales Tax = $90.00 × 0.085 = $7.65\n\nStep 3: Calculate Final Amount Paid at Register\n• Total Cost = $90.00 (Subtotal) + $7.65 (Tax) = $97.65'
        }
      }
    ]
  }
];
