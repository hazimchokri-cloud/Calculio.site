import { CalculatorMeta, CalculatorExplanation } from '../types';

export const CURATED_EXPLANATIONS: Record<string, CalculatorExplanation> = {
  // ==========================================
  // --- FINANCIAL CALCULATORS ---
  // ==========================================
  'mortgage-calculator': {
    introduction: 'The Mortgage Calculator is one of the most critical tools for prospective homeowners and real estate investors. Buying a home is likely the largest financial commitment you will ever make, and understanding the monthly cost is essential for long-term financial stability. This calculator doesn\'t just estimate your loan; it provides a comprehensive breakdown of "PITI" (Principal, Interest, Taxes, and Insurance), allowing you to see the full impact of your purchase on your monthly budget.\n\nBy using this tool, you can model different scenarios—such as varying down payments or interest rates—to find the "sweet spot" where your dream home meets your financial reality. Whether you are a first-time buyer exploring the market or a seasoned investor calculating cash flow on a rental property, this guide and calculator provide the clarity needed to navigate the complex world of home financing.',
    howItWorks: {
      summary: 'Our Mortgage Calculator uses industry-standard amortization algorithms to compute your periodic mortgage payment. It considers the principal loan amount, annual interest rate, and loan term, while also integrating recurring homeownership costs such as property taxes and insurance.',
      steps: [
        {
          title: '1. Net Principal Determination',
          detail: 'We calculate the actual amount you need to borrow by subtracting your down payment from the total home price.'
        },
        {
          title: '2. Base Monthly Payment (P&I)',
          detail: 'Using the fixed-rate mortgage formula, we determine the base amount required to pay off the principal and interest over the loan term.'
        },
        {
          title: '3. Escrow and Ancillary Costs',
          detail: 'We add monthly estimates for property taxes, homeowners insurance, HOA fees, and PMI (if applicable) to give you the "true" monthly cost.'
        },
        {
          title: '4. Amortization Schedule Generation',
          detail: 'The tool generates a month-by-month table showing how each payment is split between interest and principal reduction.'
        }
      ],
      keyAssumptions: [
        'The interest rate remains fixed for the duration of the loan.',
        'Payments are made on time every month.',
        'Escrow items like taxes and insurance are estimated based on your inputs.'
      ]
    },
    formula: {
      title: 'Fixed-Rate Monthly Mortgage Formula (P&I)',
      equation: 'M = P × [ r(1 + r)^n ] / [ (1 + r)^n - 1 ]',
      variables: [
        { symbol: 'M', name: 'Monthly Payment', description: 'Base monthly principal and interest payment', unit: 'Currency ($)' },
        { symbol: 'P', name: 'Principal Loan Amount', description: 'Total amount borrowed after the down payment', unit: 'Currency ($)' },
        { symbol: 'r', name: 'Monthly Interest Rate', description: 'Annual interest rate divided by 12 (e.g., 6% / 12 = 0.005)', unit: 'Decimal' },
        { symbol: 'n', name: 'Total Number of Payments', description: 'Loan term in years multiplied by 12 (e.g., 30 years = 360)', unit: 'Months' }
      ],
      explanation: 'This standard formula determines the fixed payment required to bring a loan balance to zero over a set number of periods. Your total monthly check (PITI) will be M + (Annual Taxes/12) + (Annual Insurance/12) + HOA + PMI.'
    },
    examples: [
      {
        title: '30-Year Fixed with 20% Down',
        scenario: 'A buyer purchases a $500,000 home with an $100,000 (20%) down payment at a 6.5% interest rate for 30 years.',
        inputs: {
          'Home Price': '$500,000',
          'Down Payment': '$100,000',
          'Interest Rate': '6.5%',
          'Term': '30 Years',
          'Property Tax': '$6,000/yr',
          'Home Insurance': '$1,200/yr'
        },
        steps: [
          'Loan Amount (P) = $500,000 - $100,000 = $400,000',
          'Monthly Interest (r) = 0.065 / 12 = 0.005417',
          'Total Payments (n) = 30 * 12 = 360',
          'Monthly P&I (M) = $400,000 * [0.005417(1.005417)^360] / [(1.005417)^360 - 1] = $2,528.27',
          'Add Taxes & Insurance = $2,528.27 + $500 (Taxes) + $100 (Insurance) = $3,128.27'
        ],
        result: 'Total Monthly Payment: $3,128.27',
        takeaway: 'Putting 20% down eliminates PMI, saving you hundreds of dollars per month.'
      },
      {
        title: 'FHA Loan with 3.5% Down',
        scenario: 'A first-time buyer uses an FHA loan for a $300,000 home with 3.5% down ($10,500) at 7% interest for 30 years.',
        inputs: {
          'Home Price': '$300,000',
          'Down Payment': '$10,500',
          'Interest Rate': '7.0%',
          'PMI/MIP': '0.55% annual'
        },
        steps: [
          'Loan Amount = $289,500',
          'Monthly P&I = $1,926.05',
          'Monthly MIP = ($289,500 * 0.0055) / 12 = $132.69',
          'Total (excl. tax/ins) = $2,058.74'
        ],
        result: 'Monthly Payment (P&I + MIP): $2,058.74',
        takeaway: 'Lower down payments result in higher monthly costs due to larger loan balances and insurance fees.'
      }
    ],
    understandingResults: 'Your result represents the total estimated monthly commitment for your mortgage. It is divided into two main parts: the "Debt Service" (Principal and Interest) and "Escrow" (Taxes, Insurance, and Fees). In the early years of your mortgage, a larger portion of your payment goes toward interest. As the years progress, more of your payment goes toward the principal. Use the amortization table to see how your home equity builds over time.',
    useCases: [
      {
        title: 'Home Buying Budgeting',
        description: 'Calculate your monthly payment to ensure it fits within your 28/36 debt-to-income ratio limits.',
        targetAudience: 'Home Buyers',
        benefits: ['Avoid overspending', 'Understand full PITI cost', 'Compare loan terms']
      },
      {
        title: 'Investment Property ROI',
        description: 'Analyze potential rental properties by calculating exact debt obligations to determine net cash flow.',
        targetAudience: 'Real Estate Investors',
        benefits: ['Accurate cash flow projections', 'Leverage analysis', 'Expense planning']
      }
    ],
    faqs: [
      {
        question: 'What is PITI?',
        answer: 'PITI stands for Principal, Interest, Taxes, and Insurance. These four elements make up the bulk of your monthly mortgage payment.'
      },
      {
        question: 'How can I lower my monthly payment?',
        answer: 'You can lower your payment by making a larger down payment, securing a lower interest rate, or opting for a longer loan term (like 30 years instead of 15).'
      },
      {
        question: 'What is Private Mortgage Insurance (PMI)?',
        answer: 'PMI is a fee required if you put down less than 20%. It protects the lender, not you, but it allows you to buy a home with a smaller down payment.'
      },
      {
        question: 'Should I choose a 15-year or 30-year term?',
        answer: 'A 15-year mortgage has higher monthly payments but saves you a massive amount of interest over time. A 30-year term is more affordable monthly but more expensive in the long run.'
      }
    ],
    importantNotes: [
      'Property taxes and insurance rates vary significantly by location.',
      'Interest rates change daily based on market conditions and your credit score.',
      'HOA fees are not included in all mortgages but must be factored into your personal budget.'
    ]
  },

  'compound-interest-calculator': {
    introduction: 'Compound interest is often called the "eighth wonder of the world" because of its power to turn small, consistent savings into significant wealth over time. Unlike simple interest, which is only earned on the original amount you save, compound interest is earned on both your initial investment and the interest that accumulates from previous periods. This creates a "snowball effect" that accelerates wealth creation. Our Compound Interest Calculator helps you visualize this growth, allowing you to model various interest rates, contribution frequencies, and time horizons to plan for your financial future.',
    howItWorks: {
      summary: 'The calculator applies the mathematical principles of compounding to your principal and recurring contributions. It solves for the Future Value (FV) of your investment by iterating through compounding periods over your specified duration.',
      steps: [
        {
          title: '1. Principal Growth',
          detail: 'We calculate how your starting balance grows on its own through compounding interest.'
        },
        {
          title: '2. Contribution Accumulation',
          detail: 'If you add money regularly, we calculate the future value of those additions (known as an annuity).'
        },
        {
          title: '3. Frequency Adjustment',
          detail: 'Interest is adjusted based on how often it compounds—daily, monthly, or annually—which impacts the final yield.'
        },
        {
          title: '4. Wealth Breakdown',
          detail: 'The tool separates your total contributions from the interest earned to show how much of your wealth was "free money" from compounding.'
        }
      ],
      keyAssumptions: [
        'The interest rate remains constant throughout the period.',
        'Contributions are made at the end of each period.',
        'All interest is reinvested and not withdrawn.'
      ]
    },
    formula: {
      title: 'Compound Interest with Contributions Formula',
      equation: 'A = P(1 + r/n)^(nt) + PMT × [ ((1 + r/n)^(nt) - 1) / (r/n) ]',
      variables: [
        { symbol: 'A', name: 'Future Balance', description: 'The total value of the investment at the end of the term', unit: 'Currency ($)' },
        { symbol: 'P', name: 'Initial Principal', description: 'The starting amount of your investment', unit: 'Currency ($)' },
        { symbol: 'r', name: 'Annual Interest Rate', description: 'Nominal interest rate (e.g., 8% = 0.08)', unit: 'Decimal' },
        { symbol: 'n', name: 'Compounding Frequency', description: 'Number of times interest compounds per year', unit: 'Count' },
        { symbol: 't', name: 'Time', description: 'Duration of the investment in years', unit: 'Years' },
        { symbol: 'PMT', name: 'Periodic Contribution', description: 'The amount you add to the investment every period', unit: 'Currency ($)' }
      ],
      explanation: 'The first part of the formula handles the growth of your initial lump sum. The second part (the annuity portion) handles the growth of your recurring contributions.'
    },
    examples: [
      {
        title: 'The Power of 20 Years',
        scenario: 'An investor starts with $10,000 and adds $500 every month for 20 years with an 8% return compounded monthly.',
        inputs: {
          'Initial Principal': '$10,000',
          'Monthly Addition': '$500',
          'Annual Rate': '8%',
          'Years': '20'
        },
        steps: [
          'Initial $10k grows to: $10,000 * (1 + 0.08/12)^240 = $49,268',
          'Monthly $500s grow to: $500 * [((1.00667)^240 - 1) / 0.00667] = $294,510',
          'Total Future Value: $49,268 + $294,510 = $343,778'
        ],
        result: 'Final Balance: $343,778',
        takeaway: 'Your total contributions were $130,000, but your final balance is $343,778—over $200k in pure interest!'
      }
    ],
    understandingResults: 'Your results show the projected total value of your investment account. Pay close attention to the "Total Interest" figure; this represents the growth generated by your money working for you. In long-term scenarios, you will notice that the interest earned eventually begins to grow faster than your actual contributions—this is the magic of the compounding curve. Use this data to determine if you are saving enough to reach your financial goals, such as retirement or a child\'s education.',
    useCases: [
      {
        title: 'Retirement Planning',
        description: 'See how consistent 401(k) or IRA contributions grow over a 30-40 year career.',
        targetAudience: 'Long-term Investors',
        benefits: ['Visualizing long-term wealth', 'Goal setting', 'Contribution adjustment']
      },
      {
        title: 'Savings Account Yields',
        description: 'Calculate the difference between simple savings and high-yield compound interest accounts.',
        targetAudience: 'Savers',
        benefits: ['Maximize interest income', 'Compare bank offers', 'Inflation protection']
      }
    ],
    faqs: [
      {
        question: 'What is the Rule of 72?',
        answer: 'The Rule of 72 is a quick way to estimate how long it takes for money to double. Divide 72 by your interest rate (e.g., at 8%, 72/8 = 9 years to double).'
      },
      {
        question: 'Why does compounding frequency matter?',
        answer: 'The more frequently interest compounds (e.g., daily vs. annually), the more interest you earn because your interest begins earning its own interest sooner.'
      },
      {
        question: 'Is compound interest guaranteed?',
        answer: 'In products like savings accounts or CDs, the rate is often guaranteed. In the stock market, the "rate" is an average estimate and will fluctuate.'
      }
    ],
    importantNotes: [
      'Taxes on interest are not included in this calculation.',
      'Inflation will reduce the purchasing power of your future balance.',
      'Past performance in investments does not guarantee future results.'
    ]
  },

  'loan-calculator': {
    introduction: 'Managing debt is a vital skill in modern personal finance. Whether you are taking out a personal loan for a home project, a student loan for education, or a business loan for expansion, knowing the exact cost of borrowing is essential. Our Loan Calculator provides a transparent view into your debt obligations. It helps you see beyond the "monthly payment" to understand the "total cost of interest," giving you the power to compare different loan offers and choose the one that saves you the most money over time.',
    howItWorks: {
      summary: 'The calculator uses a standard amortization model to determine the fixed periodic payment required to repay a loan. Each payment is divided between accrued interest and principal reduction.',
      steps: [
        {
          title: '1. Interest Rate Conversion',
          detail: 'The annual percentage rate (APR) is converted into a periodic interest rate matching your payment frequency.'
        },
        {
          title: '2. Installment Calculation',
          detail: 'We apply the amortization formula to find the level payment that retires the debt exactly by the end of the term.'
        },
        {
          title: '3. Debt Breakdown',
          detail: 'The tool calculates the total amount of interest paid over the life of the loan and the total repayment sum.'
        }
      ],
      keyAssumptions: [
        'No payments are missed or late.',
        'There are no extra principal payments made (unless using the advanced features).',
        'Fees like origination fees are either included in the principal or ignored for simple math.'
      ]
    },
    formula: {
      title: 'Standard Loan Amortization Formula',
      equation: 'P = [ r(PV) ] / [ 1 - (1 + r)^-n ]',
      variables: [
        { symbol: 'P', name: 'Periodic Payment', description: 'The amount paid every period (month, week, etc.)', unit: 'Currency ($)' },
        { symbol: 'PV', name: 'Present Value (Principal)', description: 'The total amount borrowed', unit: 'Currency ($)' },
        { symbol: 'r', name: 'Periodic Interest Rate', description: 'APR divided by number of periods per year', unit: 'Decimal' },
        { symbol: 'n', name: 'Total Number of Periods', description: 'Total payments over the loan term', unit: 'Count' }
      ],
      explanation: 'This formula calculates the amount needed to pay off a loan with a fixed interest rate and fixed term. Each payment first covers the interest for that period, and the remainder reduces the principal.'
    },
    examples: [
      {
        title: 'Personal Loan for Debt Consolidation',
        scenario: 'A borrower takes out a $15,000 personal loan at a 10% APR for 3 years to pay off high-interest credit cards.',
        inputs: {
          'Loan Amount': '$15,000',
          'APR': '10%',
          'Term': '3 Years'
        },
        steps: [
          'Monthly rate = 0.10 / 12 = 0.00833',
          'Total payments = 36',
          'Monthly Payment = $15,000 * [0.00833 / (1 - (1.00833)^-36)] = $484.01'
        ],
        result: 'Monthly Payment: $484.01 | Total Interest: $2,424.36',
        takeaway: 'Consolidating 20% credit cards into a 10% loan saves thousands in interest.'
      }
    ],
    understandingResults: 'Your results highlight the monthly payment you must commit to, but more importantly, they show the "Total Cost of Interest." This is the extra money you pay for the privilege of borrowing. Compare this figure across different loan terms; you will see that while a longer term (e.g., 5 years instead of 3) lowers your monthly payment, it significantly increases the total interest you pay over the life of the loan.',
    useCases: [
      {
        title: 'Debt Consolidation',
        description: 'Analyze if moving credit card debt to an installment loan saves money.',
        targetAudience: 'Borrowers',
        benefits: ['Lower APRs', 'Single monthly payment', 'Fixed payoff date']
      },
      {
        title: 'Business Equipment Financing',
        description: 'Calculate the monthly overhead for new machinery or technology.',
        targetAudience: 'Business Owners',
        benefits: ['Budget planning', 'Expense tracking', 'ROI analysis']
      }
    ],
    faqs: [
      {
        question: 'What is the difference between APR and Interest Rate?',
        answer: 'The interest rate is the base cost of borrowing. The APR (Annual Percentage Rate) includes the interest rate plus any lender fees, giving a more accurate view of total cost.'
      },
      {
        question: 'Can I pay off my loan early?',
        answer: 'Most modern personal loans allow for early payoff without penalties, which can save you a significant amount in interest. Check your contract for "prepayment penalties."'
      },
      {
        question: 'How does my credit score affect the calculation?',
        answer: 'Lenders use your credit score to set your APR. A higher score typically results in a lower APR, reducing your monthly payment and total cost.'
      }
    ],
    importantNotes: [
      'Does not include potential late fees or penalties.',
      'Check for hidden origination fees before signing a loan agreement.',
      'Ensure the loan is "simple interest" and not "pre-computed interest."'
    ]
  },

  'bmi-calculator': {
    introduction: 'Body Mass Index (BMI) is a globally recognized screening tool used to estimate whether a person has a healthy body weight for their height. While it does not measure body fat directly, it is a highly useful indicator of health risks associated with being underweight, overweight, or obese. This calculator is designed for adults (20 years and older) and uses the standardized formulas developed by the World Health Organization (WHO) and the Centers for Disease Control and Prevention (CDC).\n\nUnderstanding your BMI is the first step toward managing your weight and reducing the risk of chronic conditions such as heart disease, type 2 diabetes, and certain cancers. Our tool provides not just your score, but a clear classification and a healthy weight range tailored to your height, giving you a concrete target for your wellness journey.',
    howItWorks: {
      summary: 'The BMI Calculator performs a mathematical comparison of your mass relative to the square of your height. It normalizes measurements into standardized units to ensure accuracy across both Metric and Imperial systems.',
      steps: [
        {
          title: '1. Unit Normalization',
          detail: 'We convert your height and weight into kilograms and meters (for metric) or pounds and inches (for imperial).'
        },
        {
          title: '2. Square of Height',
          detail: 'Height is squared because weight-to-height ratio is more accurate when scaled quadratically.'
        },
        {
          title: '3. Index Calculation',
          detail: 'Weight is divided by the squared height (with a scaling factor of 703 for imperial units).'
        },
        {
          title: '4. Category Mapping',
          detail: 'Your score is mapped against WHO clinical ranges to determine your weight category.'
        }
      ],
      keyAssumptions: [
        'Applicable only to adults (20+ years old).',
        'Assumes standard physiological proportions.',
        'Does not distinguish between muscle mass and fat mass.'
      ]
    },
    formula: {
      title: 'Standard BMI Formulas',
      equation: 'Metric: BMI = kg / m²  |  Imperial: BMI = 703 × lbs / in²',
      variables: [
        { symbol: 'BMI', name: 'Body Mass Index', description: 'The resulting mass-to-height ratio score', unit: 'kg/m²' },
        { symbol: 'kg / lbs', name: 'Weight', description: 'Total body mass', unit: 'Kilograms or Pounds' },
        { symbol: 'm / in', name: 'Height', description: 'Total standing height', unit: 'Meters or Inches' }
      ],
      explanation: 'The imperial formula includes the factor 703 to convert square inches and pounds into the metric equivalent (kg/m²) used by the medical community.'
    },
    examples: [
      {
        title: 'Average Adult Male',
        scenario: 'An adult male stands 5 ft 10 in (70 inches) and weighs 180 lbs.',
        inputs: {
          'Height': '70 inches',
          'Weight': '180 lbs'
        },
        steps: [
          'Square the height: 70 * 70 = 4,900',
          'Multiply weight by 703: 180 * 703 = 126,540',
          'Divide: 126,540 / 4,900 = 25.82'
        ],
        result: 'BMI: 25.8 (Overweight)',
        takeaway: 'A score of 25.8 is just slightly into the overweight category (25.0 - 29.9).'
      }
    ],
    understandingResults: 'Your BMI result falls into one of four primary categories: Underweight (<18.5), Normal (18.5–24.9), Overweight (25–29.9), or Obese (30+). It is important to remember that BMI is a "screening tool" and not a "diagnostic tool." For example, a highly muscular athlete might have a high BMI but very low body fat. Conversely, an elderly person with low muscle mass might have a "normal" BMI but high body fat. Use this result as a starting point for a conversation with your healthcare provider.',
    useCases: [
      {
        title: 'Initial Health Screening',
        description: 'Assess baseline weight status as part of a general health checkup.',
        targetAudience: 'General Public',
        benefits: ['Fast results', 'Evidence-based ranges', 'Easy tracking']
      },
      {
        title: 'Fitness Goal Setting',
        description: 'Determine a realistic target weight range to reach a healthy category.',
        targetAudience: 'Fitness Enthusiasts',
        benefits: ['Concrete targets', 'Progress monitoring', 'Health risk assessment']
      }
    ],
    faqs: [
      {
        question: 'Is BMI accurate for athletes?',
        answer: 'No, BMI often overestimates body fat in athletes or people with high muscle mass because muscle is much denser than fat.'
      },
      {
        question: 'Is BMI different for men and women?',
        answer: 'The formula is the same for both, but women naturally tend to have a higher body fat percentage than men at the same BMI.'
      },
      {
        question: 'What is a "Healthy" BMI?',
        answer: 'A BMI between 18.5 and 24.9 is considered the "Normal" or healthy range for most adults.'
      }
    ],
    importantNotes: [
      'Not suitable for children, pregnant women, or elite athletes.',
      'Does not account for age-related muscle loss.',
      'Should be used alongside other metrics like waist circumference.'
    ]
  },

  'calorie-tdee-calculator': {
    introduction: 'To lose weight, gain muscle, or maintain your current physique, you must first understand your energy balance. Your Total Daily Energy Expenditure (TDEE) is the total number of calories your body burns in a 24-hour period, including sleep, work, exercise, and even digesting food. Our Calorie & TDEE Calculator uses the Mifflin-St Jeor equation—regarded as the most accurate clinical formula—to provide you with a precise caloric roadmap based on your age, gender, activity level, and goals.',
    howItWorks: {
      summary: 'The calculator determines your Basal Metabolic Rate (BMR) and then applies an activity multiplier (Physical Activity Level or PAL) to estimate your total daily calorie burn.',
      steps: [
        {
          title: '1. BMR Calculation',
          detail: 'We calculate the calories your body needs to survive at total rest using the Mifflin-St Jeor formula.'
        },
        {
          title: '2. Activity Scaling',
          detail: 'We multiply your BMR by a factor (1.2 to 1.9) based on your weekly exercise and daily movement.'
        },
        {
          title: '3. Goal Adjustment',
          detail: 'For weight loss, we subtract calories (usually 500); for muscle gain, we add calories (usually 250-500).'
        },
        {
          title: '4. Macro Breakdown',
          detail: 'The tool provides a target ratio of Protein, Fats, and Carbs to fuel your specific goal.'
        }
      ],
      keyAssumptions: [
        'Body composition is relatively standard (no extreme muscle mass or obesity).',
        'Activity levels are reported accurately.',
        'Metabolic health is within normal ranges.'
      ]
    },
    formula: {
      title: 'Mifflin-St Jeor BMR & TDEE Equation',
      equation: 'Men: BMR = (10 × W) + (6.25 × H) - (5 × A) + 5 | Women: BMR = (10 × W) + (6.25 × H) - (5 × A) - 161',
      variables: [
        { symbol: 'W', name: 'Weight', description: 'Body weight in kilograms', unit: 'kg' },
        { symbol: 'H', name: 'Height', description: 'Height in centimeters', unit: 'cm' },
        { symbol: 'A', name: 'Age', description: 'Age in years', unit: 'Years' },
        { symbol: 'TDEE', name: 'Total Expenditure', description: 'BMR × Activity Multiplier', unit: 'kcal/day' }
      ],
      explanation: 'TDEE is your "maintenance" level. Eating exactly this amount will result in no weight change. Deficits lead to loss; surpluses lead to gain.'
    },
    examples: [
      {
        title: 'Office Worker with Moderate Exercise',
        scenario: 'A 30-year-old female, 5 ft 6 in (168 cm), 150 lbs (68 kg), exercising 3 times a week.',
        inputs: {
          'Age': '30',
          'Weight': '68 kg',
          'Height': '168 cm',
          'Activity': 'Moderate'
        },
        steps: [
          'BMR = (10 * 68) + (6.25 * 168) - (5 * 30) - 161 = 1,419 kcal',
          'TDEE = 1,419 * 1.55 (Moderate factor) = 2,199 kcal'
        ],
        result: 'Maintenance Calories: 2,200 kcal/day',
        takeaway: 'To lose 1 lb per week, this person should aim for 1,700 kcal/day.'
      }
    ],
    understandingResults: 'Your results provide three key numbers: your Maintenance Calories (TDEE), your Cutting Calories (for fat loss), and your Bulking Calories (for muscle gain). To lose fat sustainably, aim for the "Cutting" target, which is usually 500 calories below maintenance. To gain muscle while minimizing fat, use the "Lean Bulk" target. Consistency is key—measure your progress over 2-3 weeks before adjusting these numbers up or down.',
    useCases: [
      {
        title: 'Fat Loss Transformation',
        description: 'Set a precise caloric deficit to lose weight without crashing your metabolism.',
        targetAudience: 'Dieters',
        benefits: ['Sustainable loss', 'No starvation', 'Scientific precision']
      },
      {
        title: 'Muscle Building (Bulking)',
        description: 'Calculate the surplus needed to build muscle without gaining excessive body fat.',
        targetAudience: 'Athletes',
        benefits: ['Clean bulking', 'Fuel performance', 'Optimized protein intake']
      }
    ],
    faqs: [
      {
        question: 'How many calories are in a pound of fat?',
        answer: 'Approximately 3,500 calories. A daily deficit of 500 calories usually leads to 1 lb of fat loss per week.'
      },
      {
        question: 'Should I eat back my exercise calories?',
        answer: 'No, the "Activity Level" multiplier already accounts for your exercise. Eating them back often leads to overconsumption.'
      },
      {
        question: 'Why is my scale not moving?',
        answer: 'Water retention, muscle gain, or inaccurate tracking (hidden calories in oils/sauces) are common reasons. Stick to your TDEE for 3 weeks to see trends.'
      }
    ],
    importantNotes: [
      'Calories are an estimate; metabolic rates vary by individual.',
      'Very low-calorie diets (<1200 for women, <1500 for men) should be medically supervised.',
      'Focus on food quality (macros), not just the calorie number.'
    ]
  },

  'percentage-calculator': {
    introduction: 'Percentages are a fundamental part of our daily lives, appearing everywhere from retail discounts and restaurant tips to bank interest and business growth reports. Despite their prevalence, calculating percentage changes or relative differences can often be confusing. Our Percentage Calculator is a versatile "all-in-one" tool designed to handle every possible percentage scenario. Whether you need to find a specific part of a whole, calculate a price increase, or determine a percent decrease, this tool provides instant, accurate results.',
    howItWorks: {
      summary: 'The calculator uses base-100 arithmetic to solve for various unknowns in a percentage equation. It supports multiple modes including basic percentages, percentage change, and percentage difference.',
      steps: [
        {
          title: '1. Operation Identification',
          detail: 'The tool determines if you are looking for a value, a rate, or a relative change.'
        },
        {
          title: '2. Decimal Conversion',
          detail: 'Percentages are converted into decimal form (e.g., 20% becomes 0.20) to perform the math.'
        },
        {
          title: '3. Algebraic Execution',
          detail: 'The relevant formula (multiplication, division, or variance) is applied to the inputs.'
        }
      ],
      keyAssumptions: [
        'Inputs are numerical.',
        'Calculations are based on a standard 100-base system.'
      ]
    },
    formula: {
      title: 'Primary Percentage Formulas',
      equation: 'Value = (P/100) × Total | % Change = [(New - Old) / Old] × 100',
      variables: [
        { symbol: 'P', name: 'Percent', description: 'The rate per hundred', unit: '%' },
        { symbol: 'Total', name: 'Base', description: 'The whole amount being calculated from', unit: 'Number' },
        { symbol: '% Change', name: 'Variance', description: 'The relative increase or decrease', unit: '%' }
      ],
      explanation: 'To find a percentage, you essentially divide the part by the whole and multiply by 100. To find the value, you multiply the whole by the decimal version of the percent.'
    },
    examples: [
      {
        title: 'Retail Sales Discount',
        scenario: 'A $120 jacket is on sale for 30% off. What is the final price?',
        inputs: {
          'Original Price': '$120',
          'Discount': '30%'
        },
        steps: [
          'Calculate discount amount: $120 * 0.30 = $36',
          'Subtract from original: $120 - $36 = $84'
        ],
        result: 'Final Price: $84',
        takeaway: 'You saved $36 on this purchase.'
      }
    ],
    understandingResults: 'Percentage results tell you the relative proportion of one number to another. A positive "Percentage Change" indicates an increase (growth), while a negative one indicates a decrease (loss). In "Percentage Difference," the result shows how much two numbers vary relative to their average. Always pay attention to whether you are looking for the "Percentage of a number" versus "What percent one number is of another," as the order of inputs matters.',
    useCases: [
      {
        title: 'Shopping & Tips',
        description: 'Calculate sales tax, clearance discounts, and restaurant gratuity instantly.',
        targetAudience: 'Consumers',
        benefits: ['Save money', 'Fair tipping', 'Budget accuracy']
      },
      {
        title: 'Business Analysis',
        description: 'Track year-over-year revenue growth or profit margin percentages.',
        targetAudience: 'Business Owners',
        benefits: ['Growth tracking', 'Performance metrics', 'Data-driven decisions']
      }
    ],
    faqs: [
      {
        question: 'What is the difference between a percentage and a percentage point?',
        answer: 'A percentage is a ratio, while a percentage point is the absolute difference between two percentages (e.g., going from 5% to 7% is a 2 percentage point increase, but a 40% increase).'
      },
      {
        question: 'How do I calculate a percent decrease?',
        answer: 'Subtract the new value from the old value, divide by the old value, and multiply by 100.'
      }
    ],
    importantNotes: [
      'Ensure the "Base" or "Old Value" is not zero to avoid division errors.',
      'Percent changes can be greater than 100%.'
    ]
  },

  'fraction-calculator': {
    introduction: 'Fractions are a cornerstone of mathematics, yet they are often one of the most challenging concepts for students and DIY builders alike. Whether you are adjusting a recipe, measuring lumber for a home project, or solving algebraic equations, performing arithmetic with fractions requires precision and a clear understanding of numerators and denominators. Our Fraction Calculator is designed to remove the guesswork, providing step-by-step solutions for adding, subtracting, multiplying, and dividing both proper and improper fractions, as well as mixed numbers.',
    howItWorks: {
      summary: 'The calculator uses the rules of rational number arithmetic to evaluate expressions. It automatically finds the Least Common Denominator (LCD) for addition and subtraction and handles simplification at every step.',
      steps: [
        {
          title: '1. Mixed Number Conversion',
          detail: 'If mixed numbers are entered, they are converted into improper fractions (e.g., 1 1/2 becomes 3/2).'
        },
        {
          title: '2. Denominator Alignment',
          detail: 'For addition and subtraction, the tool finds the LCD to ensure the fractions are comparable.'
        },
        {
          title: '3. Arithmetic Execution',
          detail: 'The numerators are operated upon based on the selected operator (+, -, *, /).'
        },
        {
          title: '4. Simplification',
          detail: 'The resulting fraction is reduced to its lowest terms using the Greatest Common Divisor (GCD).'
        }
      ],
      keyAssumptions: [
        'Denominators cannot be zero.',
        'Inputs are integers or standard mixed numbers.'
      ]
    },
    formula: {
      title: 'Fraction Arithmetic Rules',
      equation: '(a/b) ± (c/d) | (a/b) * (c/d) | (a/b) / (c/d)',
      variables: [
        { symbol: 'a, c', name: 'Numerators', description: 'The top numbers indicating the parts', unit: 'Integer' },
        { symbol: 'b, d', name: 'Denominators', description: 'The bottom numbers indicating the whole', unit: 'Integer' }
      ],
      explanation: 'To multiply, you multiply across. To divide, you multiply the first fraction by the reciprocal of the second. To add or subtract, you must have a common denominator.'
    },
    examples: [
      {
        title: 'Adding Fractions',
        scenario: 'Find the sum of 1/2 and 1/3.',
        inputs: {
          'Fraction 1': '1/2',
          'Fraction 2': '1/3'
        },
        steps: [
          'Find LCD: 2 and 3 have an LCD of 6.',
          'Convert: 1/2 = 3/6, 1/3 = 2/6',
          'Add: 3/6 + 2/6 = 5/6'
        ],
        result: 'Result: 5/6',
        takeaway: 'The answer is already in its simplest form.'
      }
    ],
    understandingResults: 'The calculator provides three versions of the result: the simplified fraction, the improper fraction (if applicable), and the decimal equivalent. For practical uses like cooking or construction, the simplified mixed number is often the most useful. The decimal version is helpful for comparing the fraction to other numerical data.',
    useCases: [
      {
        title: 'Education & Homework',
        description: 'Verify school assignments and understand the steps of fraction reduction.',
        targetAudience: 'Students & Parents',
        benefits: ['Step-by-step learning', 'Instant verification', 'Conceptual clarity']
      },
      {
        title: 'DIY & Woodworking',
        description: 'Calculate lengths and offsets when working with imperial tape measures.',
        targetAudience: 'DIYers & Carpenters',
        benefits: ['Accurate cuts', 'Measurement splitting', 'Waste reduction']
      }
    ],
    faqs: [
      {
        question: 'What is a simplified fraction?',
        answer: 'A fraction is simplified when the numerator and denominator have no common factors other than 1.'
      },
      {
        question: 'How do you turn a fraction into a decimal?',
        answer: 'Simply divide the numerator by the denominator (e.g., 1/4 = 1 ÷ 4 = 0.25).'
      }
    ],
    importantNotes: [
      'Ensure you convert mixed numbers correctly if doing manual verification.',
      'Always use the simplified version for final results.'
    ]
  },

  'decimal-calculator': {
    introduction: 'In science, finance, and engineering, precision is paramount. Decimals allow us to represent parts of a whole with high granularity, but managing long strings of numbers and applying correct rounding rules can be prone to human error. Our Decimal Calculator provides a high-precision environment for performing basic and advanced arithmetic with decimal numbers. It also serves as a robust converter, allowing you to translate decimals into fractions and percentages instantly, with customizable precision settings to meet your specific needs.',
    howItWorks: {
      summary: 'The calculator uses floating-point and arbitrary-precision logic to ensure that results remain accurate even when dealing with many decimal places. It handles standard operations and specialized rounding modes.',
      steps: [
        {
          title: '1. Precision Initialization',
          detail: 'The tool identifies the number of decimal places in your inputs to set the baseline precision.'
        },
        {
          title: '2. Arithmetic Processing',
          detail: 'Operations are performed using the IEEE 754 standard for floating-point math or big-integer logic for exactness.'
        },
        {
          title: '3. Conversion Logic',
          detail: 'If requested, the decimal is converted to a fraction by finding the power of 10 that eliminates the decimal point.'
        },
        {
          title: '4. Rounding Application',
          detail: 'Results are rounded based on your preference (e.g., Round to Nearest, Floor, Ceiling).'
        }
      ],
      keyAssumptions: [
        'Inputs are valid real numbers.',
        'Default precision is set to 10 decimal places.'
      ]
    },
    formula: {
      title: 'Decimal to Fraction Conversion',
      equation: 'Decimal = a.bc... -> (abc...) / 10^n',
      variables: [
        { symbol: 'n', name: 'Decimal Count', description: 'The number of digits after the decimal point', unit: 'Integer' }
      ],
      explanation: 'To convert a decimal to a fraction, we place the decimal digits over 1 followed by the same number of zeros as there are decimal places, then simplify.'
    },
    examples: [
      {
        title: 'Precision Division',
        scenario: 'Divide 10 by 3 with 4 decimal places of precision.',
        inputs: {
          'Dividend': '10',
          'Divisor': '3',
          'Precision': '4'
        },
        steps: [
          'Perform division: 10 / 3 = 3.333333...',
          'Apply rounding: 3.3333'
        ],
        result: 'Result: 3.3333',
        takeaway: 'The precision setting ensures your result fits your data requirements.'
      }
    ],
    understandingResults: 'Your result is displayed in clear decimal format. If you see a repeating decimal (like 0.333...), the calculator may provide a truncated or rounded version based on your settings. Pay attention to the "Fraction Equivalent" section if you need an exact representation that decimals cannot easily show.',
    useCases: [
      {
        title: 'Scientific Data Entry',
        description: 'Process experimental results that require high-precision floating point math.',
        targetAudience: 'Researchers & Scientists',
        benefits: ['Accuracy', 'Formatting control', 'Error reduction']
      },
      {
        title: 'Financial Budgeting',
        description: 'Calculate unit costs or currency conversions with multiple decimal points.',
        targetAudience: 'Accountants & Analysts',
        benefits: ['Currency precision', 'Clear rounding', 'Easy exports']
      }
    ],
    faqs: [
      {
        question: 'What is the difference between a float and a decimal?',
        answer: 'In computing, floats are approximations for speed, while decimals (fixed-point) are used for exactness, especially in money calculations.'
      },
      {
        question: 'How do I round a decimal to the nearest tenth?',
        answer: 'Look at the hundredths place. If it is 5 or greater, round up. If not, keep the tenths digit as is.'
      }
    ],
    importantNotes: [
      'Be aware of floating-point errors in very large calculations.',
      'Check your rounding mode before finalizing results.'
    ]
  },

  'scientific-calculator': {
    introduction: 'In the world of mathematics, science, and engineering, a basic four-function calculator is often insufficient. Advanced problems require a Scientific Calculator—a tool designed to evaluate trigonometric functions, logarithms, exponentials, and complex algebraic expressions. Our online Scientific Calculator provides a professional-grade interface that adheres to standard mathematical rules, including Operator Precedence (PEMDAS/BODMAS). Whether you are solving for "x" in a calculus class, calculating vectors for a physics lab, or exploring the properties of pi and e, this calculator provides the precision and flexibility needed for higher-level computation.',
    howItWorks: {
      summary: 'The calculator uses a sophisticated expression parser to evaluate multi-step mathematical strings. It handles everything from basic arithmetic to advanced transcendental functions while respecting parenthesis nesting and operator hierarchy.',
      steps: [
        {
          title: '1. Expression Parsing',
          detail: 'Your input is broken down into numbers, constants, and operators to identify the order of operations.'
        },
        {
          title: '2. Constant & Angle Resolution',
          detail: 'Scientific constants (π, e) are inserted with high precision, and trig functions are evaluated based on your DEG/RAD setting.'
        },
        {
          title: '3. Hierarchical Execution',
          detail: 'The tool follows PEMDAS rules: Parentheses first, then Exponents, then Multiplication/Division, and finally Addition/Subtraction.'
        },
        {
          title: '4. Memory Management',
          detail: 'You can use M+, M-, and MR to store and recall intermediate results for multi-part problems.'
        }
      ],
      keyAssumptions: [
        'Inputs must follow valid algebraic syntax.',
        'Calculations use floating-point precision (IEEE 754).',
        'Trigonometric inputs assume the current DEG/RAD mode.'
      ]
    },
    formula: {
      title: 'Common Scientific Functions',
      equation: 'y = f(x) | sin(x), log(x), x^y, √x',
      variables: [
        { symbol: 'π (Pi)', name: 'Archimedes\' Constant', description: 'Ratio of circumference to diameter', unit: '~3.14159' },
        { symbol: 'e', name: 'Euler\'s Number', description: 'Base of natural logarithms', unit: '~2.71828' },
        { symbol: 'x!', name: 'Factorial', description: 'Product of all integers up to x', unit: 'Integer' }
      ],
      explanation: 'Unlike a basic calculator, the scientific model handles functional relationships where the output depends on one or more variables passed into a specific mathematical operator.'
    },
    examples: [
      {
        title: 'Trigonometric Problem',
        scenario: 'Calculate the height of a building given a 30-degree angle of elevation and a 50-meter distance from the base.',
        inputs: {
          'Distance': '50',
          'Angle': '30°'
        },
        steps: [
          'Use tangent: height = distance * tan(angle)',
          'In calculator: 50 * tan(30) = 28.86'
        ],
        result: 'Building Height: 28.87 meters',
        takeaway: 'Ensure the calculator is set to DEG (Degrees) mode for this problem.'
      }
    ],
    understandingResults: 'The results from a scientific calculator are often precise floating-point numbers. In many scientific contexts, you should pay attention to "Significant Figures" and round your result based on the precision of your initial measurements. If the calculator returns "NaN" or "Error," it is likely due to an undefined operation, such as dividing by zero or taking the square root of a negative number (without complex mode).',
    useCases: [
      {
        title: 'STEM Education',
        description: 'Complete homework for Algebra, Trigonometry, Calculus, and Physics.',
        targetAudience: 'Students',
        benefits: ['Fast verification', 'Learn operator precedence', 'Access to constants']
      },
      {
        title: 'Engineering & Design',
        description: 'Calculate angles, forces, and dimensions for technical projects.',
        targetAudience: 'Engineers',
        benefits: ['High precision', 'Memory recall', 'Advanced functions']
      }
    ],
    faqs: [
      {
        question: 'What is the difference between Degrees and Radians?',
        answer: 'Degrees (360 per circle) are common in everyday life and engineering. Radians (2π per circle) are the standard unit of angular measure in calculus and advanced physics.'
      },
      {
        question: 'What does the "Exp" button do?',
        answer: 'The Exp button allows you to enter numbers in scientific notation (e.g., 5 Exp 3 = 5000).'
      },
      {
        question: 'How does the Memory (M+) work?',
        answer: 'M+ adds the current display value to the memory register. MR (Memory Recall) brings that value back to the screen.'
      }
    ],
    importantNotes: [
      'Always double-check your angle mode (DEG/RAD) before trig calculations.',
      'Log(x) usually refers to log base 10, while Ln(x) is log base e (natural log).'
    ]
  },

  'date-calculator': {
    introduction: 'Time is our most valuable resource, yet calculating the exact difference between two dates can be surprisingly difficult due to leap years, varying month lengths, and working schedules. Our Date Calculator is designed to solve these complexities instantly. Whether you need to know exactly how many days are left until a project deadline, calculate your precise age in weeks and hours, or determine a future date by adding a specific number of business days, this tool provides a comprehensive chronological breakdown.',
    howItWorks: {
      summary: 'The tool uses standardized calendar algorithms to measure the elapsed time between two points in the Gregorian calendar. It account for every variable, including UTC offsets and leap years.',
      steps: [
        {
          title: '1. Epoch Normalization',
          detail: 'Both dates are converted into millisecond timestamps from a fixed reference point (the Unix Epoch).'
        },
        {
          title: '2. Delta Calculation',
          detail: 'We subtract the start timestamp from the end timestamp to get the total elapsed duration.'
        },
        {
          title: '3. Unit Decomposition',
          detail: 'The total duration is broken down into Years, Months, Weeks, Days, and Hours for readability.'
        },
        {
          title: '4. Business Logic Filtering',
          detail: 'If requested, we iterate through the range to exclude Saturdays, Sundays, and holidays to find "working days."'
        }
      ],
      keyAssumptions: [
        'Assumes the Gregorian Calendar system.',
        'Uses standard 24-hour days.',
        'Inclusive calculation adds the start day to the total.'
      ]
    },
    formula: {
      title: 'Chronological Math',
      equation: 'Difference = Date_End - Date_Start',
      variables: [
        { symbol: 'Days', name: 'Calendar Days', description: 'Total 24-hour periods elapsed', unit: 'Count' },
        { symbol: 'Business Days', name: 'Work Days', description: 'Days excluding weekends', unit: 'Count' },
        { symbol: 'Weeks', name: 'Seven-Day Blocks', description: 'Total weeks elapsed', unit: 'Count' }
      ],
      explanation: 'Date math is complex because months are not equal lengths. Our tool calculates months by tracking the transition of days relative to the specific month and year.'
    },
    examples: [
      {
        title: 'Project Deadline Tracking',
        scenario: 'A project starts on January 1st and must be finished by March 15th. How many business days are available?',
        inputs: {
          'Start Date': 'Jan 1',
          'End Date': 'Mar 15'
        },
        steps: [
          'Calculate total days: 73 days',
          'Subtract weekends: ~20 days',
          'Final count: 53 business days'
        ],
        result: '53 Business Days',
        takeaway: 'Knowing business days helps in realistic resource planning.'
      }
    ],
    understandingResults: 'Your results provide a multi-layered view of time. "Total Days" is the most common metric for countdowns. "Years, Months, Days" is better for understanding age or long-term durations. If you are using the "Business Days" result, remember that it typically excludes weekends but may not include regional public holidays unless manually specified.',
    useCases: [
      {
        title: 'Legal & Contractual Milestones',
        description: 'Calculate 30-day notice periods or contractual expiration dates.',
        targetAudience: 'Legal Professionals',
        benefits: ['Accuracy', 'Leap year support', 'Standardized results']
      },
      {
        title: 'Event Planning',
        description: 'Create countdowns for weddings, launches, or travel.',
        targetAudience: 'Personal Users',
        benefits: ['Visualizing time', 'Detailed breakdowns', 'Easy planning']
      }
    ],
    faqs: [
      {
        question: 'Does this calculator account for leap years?',
        answer: 'Yes, it automatically detects leap years (like 2024 or 2028) and adjusts the February day count accordingly.'
      },
      {
        question: 'What is a "Business Day"?',
        answer: 'A business day is typically defined as Monday through Friday. It excludes Saturdays and Sundays.'
      },
      {
        question: 'Can I add time to a date?',
        answer: 'Yes, use the "Add/Subtract" mode to find a future or past date by entering a number of days, weeks, or months.'
      }
    ],
    importantNotes: [
      'Time zone differences are not factored into simple date calculations.',
      'Check if your specific industry defines "Business Days" differently.'
    ]
  }
};

/**
 * Intelligent dynamic fallback generator to ensure EVERY single calculator
 * has a comprehensive, robust, and highly informative Explanation Section!
 */
export function getCalculatorExplanation(calculator: CalculatorMeta): CalculatorExplanation {
  if (CURATED_EXPLANATIONS[calculator.id]) {
    return CURATED_EXPLANATIONS[calculator.id];
  }

  // Generate dynamic tailored explanation based on category and metadata
  const name = calculator.name;
  const desc = calculator.description;
  const formula = calculator.formulaSummary || 'Result = f(Input_1, Input_2, ... Input_n)';

  const categoryContext = {
    financial: {
      focus: 'financial and mathematical amortization principles',
      audience: 'Investors, Homeowners, Financial Planners, and Consumers',
      benefit1: 'Make sound borrowing, investment, and repayment decisions',
      benefit2: 'Minimize interest costs and maximize financial yields'
    },
    'fitness-health': {
      focus: 'clinical health metrics and physiological formulas',
      audience: 'Individuals, Athletes, Fitness Coaches, and Healthcare Practitioners',
      benefit1: 'Track biometric benchmarks with standardized clinical formulas',
      benefit2: 'Set realistic nutrition, body composition, and wellness targets'
    },
    'math-algebra': {
      focus: 'rigorous algebraic, geometric, and statistical proofs',
      audience: 'Students, Educators, Researchers, and Engineers',
      benefit1: 'Verify complex homework and coursework calculations step-by-step',
      benefit2: 'Eliminate manual arithmetic error with double-precision computing'
    },
    conversion: {
      focus: 'standardized international metric and imperial conversion ratios (SI / NIST standards)',
      audience: 'Travelers, Scientists, Culinary Experts, and Technical Professionals',
      benefit1: 'Convert between measurement standards instantly with zero rounding error',
      benefit2: 'Cross-reference global units across engineering, cooking, and science'
    },
    'date-time': {
      focus: 'chronological algorithms, calendar epochs, and time math',
      audience: 'Project Managers, Event Planners, HR Specialists, and Students',
      benefit1: 'Determine elapsed milestones and work schedules accurately',
      benefit2: 'Account for leap years, variable month lengths, and weekend hours'
    },
    'construction-other': {
      focus: 'applied practical estimation formulas and material sizing',
      audience: 'Contractors, DIY Builders, Students, and Consumers',
      benefit1: 'Estimate project materials and logistical requirements with precision',
      benefit2: 'Prevent budget overruns through structured estimations'
    }
  }[calculator.category] || {
    focus: 'standardized computational and mathematical formulas',
    audience: 'Professionals, Students, and Everyday Users',
    benefit1: 'Achieve fast, accurate answers for complex calculations',
    benefit2: 'Save time and eliminate manual calculation errors'
  };

  return {
    introduction: `The ${name} is a professional-grade digital tool designed to simplify ${desc.toLowerCase()} Whether you are a student, professional, or everyday user, this calculator provides a reliable way to compute complex results with mathematical precision. By automating the underlying formulas, we help you save time and eliminate the risk of manual arithmetic errors. This resource is tailored for ${categoryContext.audience.toLowerCase()} looking for quick, accurate solutions to real-world problems.`,
    howItWorks: {
      summary: `The ${name} evaluation process is engineered to handle ${desc.toLowerCase()} It takes your customized numerical inputs, validates parameter boundaries, and executes high-precision algorithms based on ${categoryContext.focus} to deliver instant results.`,
      steps: [
        {
          title: '1. Input Parameter Collection',
          detail: `Enter your specific values into the interactive fields. Our system validates these in real-time to ensure they fall within acceptable mathematical ranges.`
        },
        {
          title: '2. Algorithmic Processing',
          detail: `Once inputs are received, the calculator applies the core principles of ${categoryContext.focus}. We use IEEE 754 double-precision arithmetic to maintain accuracy across all calculation steps.`
        },
        {
          title: '3. Multi-Metric Output Generation',
          detail: `The resulting data is formatted into clear, readable metrics. Depending on the calculator type, you may see primary results, percentage breakdowns, and comparative statistics.`
        },
        {
          title: '4. Result Interpretation & Export',
          detail: `Analyze your final solution using our "Understanding Your Results" guide below. You can also copy the summary to your clipboard or print the full report for your records.`
        }
      ],
      keyAssumptions: [
        'All inputs are treated as accurate and within standard mathematical bounds.',
        'Calculations assume a standard context (e.g., base-10 math, standard metric/imperial ratios).',
        'Rounding is performed at the final step to preserve maximum intermediate precision.'
      ]
    },
    formula: {
      title: `${name} Computation Formula`,
      equation: formula,
      variables: [
        { symbol: 'Input Variables', name: 'User Parameters', description: 'The numerical values provided by the user in the input form.', unit: 'Variable' },
        { symbol: 'Resulting Value', name: 'Computed Output', description: 'The final mathematical solution derived from the formula.', unit: 'Standard Output' }
      ],
      explanation: `The logic behind this tool is rooted in ${categoryContext.focus}. By following these established mathematical rules, the ${name} ensures repeatable and verifiable results for every use case.`
    },
    examples: [
      {
        title: `Standard ${name} Example`,
        scenario: `A typical use case where a user needs to compute ${desc.toLowerCase().replace('.', '')}.`,
        inputs: {
          'Baseline Value': '100',
          'Adjustment Factor': '10'
        },
        steps: [
          'Enter the baseline parameters into the input fields.',
          'The calculator identifies the correct mathematical model based on the ${categoryContext.focus}.',
          'The final result is rendered instantly on the screen.'
        ],
        result: `Formatted Numerical Result`,
        takeaway: `This example demonstrates how the ${name} provides immediate clarity for standard tasks.`
      }
    ],
    understandingResults: `When reviewing your results from the ${name}, it is important to consider the context of your inputs. The final value represents a mathematically derived solution based on the parameters you provided. If the results seem unexpected, double-check your input units (e.g., Metric vs. Imperial) and ensure all values are within realistic ranges. These results are designed to assist in ${categoryContext.benefit1.toLowerCase()} and should be used as a primary reference point for your planning or analysis.`,
    useCases: [
      {
        title: `Planning & Projections`,
        description: `Model different scenarios and outcomes before committing to a specific course of action.`,
        targetAudience: categoryContext.audience,
        benefits: [categoryContext.benefit1, categoryContext.benefit2, 'Instant scenario modeling']
      },
      {
        title: `Quality Assurance & Verification`,
        description: `Use the tool to double-check manual calculations found in paperwork, textbooks, or professional quotes.`,
        targetAudience: 'Professionals and Students',
        benefits: ['Eliminate human arithmetic errors', 'Save time on repetitive math', 'Structured results for documentation']
      }
    ],
    faqs: calculator.faqs || [
      {
        question: `How reliable are the calculations from the ${name}?`,
        answer: `Our calculators are built using industry-standard mathematical models and clinical formulas. We use high-precision floating point arithmetic to ensure that the results are as accurate as possible based on the data you provide.`
      },
      {
        question: `Can I use these results for official or legal documentation?`,
        answer: `While the ${name} is highly accurate, it is intended for educational and informational purposes. For high-stakes decisions—especially in finance, health, or law—we always recommend consulting with a certified professional.`
      },
      {
        question: `Does this calculator support both Metric and Imperial units?`,
        answer: `Where applicable, our tools provide toggles to switch between different unit systems, ensuring compatibility with global standards.`
      }
    ],
    importantNotes: [
      `Accuracy is dependent on the precision of the user's inputs.`,
      `The results are theoretical and may vary slightly in real-world applications due to external variables.`,
      `This tool should be used as a guide and not as the sole basis for critical decision-making.`
    ]
  };
}
