import { CalculatorExplanation } from '../../types';

export const BUSINESS_REAL_ESTATE_TAX_EXPLANATIONS: Record<string, CalculatorExplanation> = {
  'rental-roi-calculator': {
    introduction:
      'Evaluating a rental property requires looking past the monthly rent check to see how mortgage debt, property taxes, insurance, vacancy, and repairs affect real returns. A property with strong rent can still lose money each month if expenses and financing costs are underestimated.\n\nThe Rental Property ROI & Cash Flow Calculator combines acquisition costs, financing terms, and operating expenses into core real estate metrics: monthly cash flow, Net Operating Income (NOI), Capitalization Rate, Cash-on-Cash return, Gross Rent Multiplier (GRM), and Operating Expense Ratio (OER). It helps investors screen deals before making an offer.',
    howItWorks: {
      summary:
        'The calculator separates property operating performance from financing costs so you can evaluate both the unleveraged asset yield (Cap Rate) and your actual return on invested cash (Cash-on-Cash Return).',
      steps: [
        {
          title: '1. Total Cash Invested & Loan Principal',
          detail: 'Down payment, closing costs, and initial rehab budget are summed into Total Cash Invested. Subtracting the down payment from purchase price establishes the mortgage principal.'
        },
        {
          title: '2. Operating Expenses & Vacancy Reserve',
          detail: 'Monthly property taxes, insurance, and HOA fees are added to percentage allowances for repairs, vacancy, and property management.'
        },
        {
          title: '3. Net Operating Income (NOI)',
          detail: 'Annual operating expenses are subtracted from gross annual rental income to determine NOI before mortgage payments.'
        },
        {
          title: '4. Debt Service & Return Ratios',
          detail: 'Monthly mortgage principal and interest are deducted from monthly NOI to calculate net cash flow, Cash-on-Cash return, Cap Rate, GRM, and OER.'
        }
      ],
      keyAssumptions: [
        'Mortgage debt service uses a fixed-rate amortizing principal and interest payment.',
        'Capitalization Rate excludes debt financing so properties can be compared on an all-cash basis.',
        'Appreciation, tax depreciation, and income tax effects are excluded from operating cash flow.'
      ]
    },
    formula: {
      title: 'Core Rental Investment Formulas',
      equation: 'Cap Rate = (Annual NOI / Price) × 100 | CoC = (Annual Cash Flow / Cash Invested) × 100',
      variables: [
        { symbol: 'NOI', name: 'Net Operating Income', description: 'Annual Gross Income minus Annual Operating Expenses (excluding mortgage)', unit: 'Currency ($/yr)' },
        { symbol: 'Price', name: 'Purchase Price', description: 'Total acquisition price of the property', unit: 'Currency ($)' },
        { symbol: 'CoC', name: 'Cash-on-Cash Return', description: 'Annual pre-tax cash flow divided by total cash invested', unit: '%' },
        { symbol: 'GRM', name: 'Gross Rent Multiplier', description: 'Purchase Price divided by Annual Gross Income', unit: 'Ratio' }
      ],
      explanation:
        'NOI measures property profitability independent of how it is financed. Subtracting annual mortgage principal and interest from NOI gives annual pre-tax cash flow, which is compared against your out-of-pocket cash (down payment, closing costs, and rehab).'
    },
    examples: [
      {
        title: 'Single-Family Rental Analysis',
        scenario: 'An investor buys a $300,000 home with 20% down ($60,000), $6,000 closing costs, $4,000 rehab, a 6.5% 30-year loan ($240,000), $2,600/month rent, $4,800/yr tax/insurance, and 18% combined maintenance/vacancy/management.',
        inputs: {
          'Purchase Price': '$300,000',
          'Total Cash Invested': '$70,000',
          'Monthly Rent': '$2,600 ($31,200/yr)',
          'Mortgage (P&I)': '$1,516.96/mo'
        },
        steps: [
          'Monthly operating expenses = $300 tax + $100 ins + $130 maint (5%) + $130 vac (5%) + $208 mgmt (8%) = $868/mo ($10,416/yr)',
          'Annual NOI = $31,200 - $10,416 = $20,784 ($1,732/mo)',
          'Cap Rate = ($20,784 / $300,000) × 100 = 6.93%',
          'Monthly Cash Flow = $1,732 - $1,516.96 = $215.04/mo ($2,580.48/yr)',
          'Cash-on-Cash Return = ($2,580.48 / $70,000) × 100 = 3.69%'
        ],
        result: 'Cap Rate: 6.93% | Monthly Cash Flow: $215.04 | CoC: 3.69%',
        takeaway: 'With current mortgage rates around 6.5%, an asset with a 6.93% cap rate produces positive but modest immediate cash flow.'
      }
    ],
    understandingResults:
      'Focus on both Monthly Cash Flow and Cash-on-Cash Return. Positive cash flow indicates the property pays for its operating costs and mortgage without monthly out-of-pocket contributions. An Operating Expense Ratio (OER) between 30% and 45% is typical for residential rentals; suspiciously low expense estimates can make a marginal deal look artificially profitable.',
    useCases: [
      {
        title: 'Deal Screening Before Offers',
        description: 'Run quick sensitivity checks on rent, interest rates, and repair reserves before submitting an offer.',
        targetAudience: 'Residential Real Estate Investors',
        benefits: ['Prevents negative cash flow surprises', 'Quantifies cash needed at closing', 'Compares leverage scenarios']
      },
      {
        title: 'Self-Management vs. Property Manager',
        description: 'Toggle the management fee percentage to see how hiring a manager affects net yield.',
        targetAudience: 'Landlords',
        benefits: ['Clear fee impact', 'Accurate reserve budgeting', 'Better hold-or-sell analysis']
      }
    ],
    faqs: [
      {
        question: 'What is the difference between Cap Rate and Cash-on-Cash Return?',
        answer: 'Cap Rate ignores financing and measures return as if you paid all cash (NOI / Price). Cash-on-Cash Return includes mortgage payments and divides net cash flow by the actual cash you put into the deal.'
      },
      {
        question: 'What is a good Operating Expense Ratio (OER)?',
        answer: 'For many single-family and small multifamily rentals, OER ranges from 35% to 50% of gross rent once taxes, insurance, maintenance, vacancy, and management are realistically accounted for.'
      }
    ],
    importantNotes: [
      'Always verify local property tax reassessment rules after a sale—taxes often jump to match the new purchase price.',
      'Large capital expenditures such as roofs and HVAC systems should be budgeted via maintenance reserves.'
    ]
  },

  'cap-rate-calculator': {
    introduction:
      'Capitalization Rate (Cap Rate) is the benchmark metric used across commercial and residential real estate to compare property yields on an apples-to-apples basis. Because it removes loan structure from the calculation, Cap Rate isolates the earning power of the physical property relative to its market price.\n\nThe Cap Rate Calculator determines Net Operating Income (NOI), Cap Rate, Operating Expense Ratio (OER), and Gross Rent Multiplier (GRM) from rental income and property operating expenses.',
    howItWorks: {
      summary:
        'The calculator computes annual gross scheduled income, deducts operating costs (taxes, insurance, HOA, maintenance, vacancy, and management), and divides the resulting Net Operating Income by the property price.',
      steps: [
        {
          title: '1. Sum Annual Gross Income',
          detail: 'Monthly rent and ancillary income (such as parking or laundry) are annualized over 12 months.'
        },
        {
          title: '2. Deduct Operating Expenses',
          detail: 'Fixed expenses (taxes, insurance, HOA) and variable allowances (vacancy, repairs, management) are subtracted from gross income.'
        },
        {
          title: '3. Compute Net Operating Income (NOI)',
          detail: 'The remaining annual income before debt service is your NOI.'
        },
        {
          title: '4. Divide NOI by Property Price',
          detail: 'Dividing annual NOI by purchase price and multiplying by 100 yields the property capitalization rate.'
        }
      ],
      keyAssumptions: [
        'Mortgage principal and interest payments are excluded from operating expenses.',
        'Property value reflects current acquisition price or market valuation.',
        'Income and expenses represent stabilized annual performance.'
      ]
    },
    formula: {
      title: 'Capitalization Rate & NOI Formula',
      equation: 'Cap Rate = (Annual NOI / Property Price) × 100',
      variables: [
        { symbol: 'NOI', name: 'Net Operating Income', description: 'Annual Gross Revenue minus Annual Operating Expenses', unit: 'Currency ($)' },
        { symbol: 'Property Price', name: 'Asset Value', description: 'Purchase price or current appraised market value', unit: 'Currency ($)' },
        { symbol: 'Cap Rate', name: 'Capitalization Rate', description: 'Unleveraged annual yield on property value', unit: '%' }
      ],
      explanation:
        'Rearranging the equation (Property Value = NOI / Cap Rate) also lets appraisers and investors estimate what a property is worth given market cap rates in the neighborhood.'
    },
    examples: [
      {
        title: 'Duplex Valuation & Cap Rate Check',
        scenario: 'A duplex listed at $450,000 generates $48,000 in annual gross rent with $14,400 in total annual operating expenses (taxes, insurance, repairs, vacancy, and management).',
        inputs: {
          'Property Price': '$450,000',
          'Annual Gross Rent': '$48,000',
          'Annual Operating Expenses': '$14,400'
        },
        steps: [
          'Annual NOI = $48,000 - $14,400 = $33,600',
          'Cap Rate = ($33,600 / $450,000) × 100 = 7.47%',
          'Operating Expense Ratio (OER) = ($14,400 / $48,000) × 100 = 30.0%'
        ],
        result: 'Cap Rate: 7.47% | Annual NOI: $33,600',
        takeaway: 'If comparable duplexes in the neighborhood trade at a 7.5% cap rate, a $450,000 asking price is aligned with market value.'
      }
    ],
    understandingResults:
      'Higher cap rates indicate higher current income yield per dollar of property price, often associated with higher-risk or value-add markets. Lower cap rates (for example, 4% to 5.5%) are common in prime neighborhoods where buyers accept lower immediate yield in exchange for lower perceived risk or stronger rent growth expectations.',
    useCases: [
      {
        title: 'Comparing Multiple Properties',
        description: 'Rank competing listings quickly regardless of how each seller suggests financing the purchase.',
        targetAudience: 'Property Investors & Brokers',
        benefits: ['Unbiased property comparison', 'Clear yield benchmark', 'Fast valuation sanity check']
      },
      {
        title: 'Assessing Asking Price Fairness',
        description: 'Verify whether a seller listing reflects realistic operating expenses or inflated pro-forma NOI.',
        targetAudience: 'Commercial & Multifamily Buyers',
        benefits: ['Exposes omitted expenses', 'Supports offer price negotiation', 'Measures OER discipline']
      }
    ],
    faqs: [
      {
        question: 'Does Cap Rate include my mortgage payment?',
        answer: 'No. By definition, Cap Rate excludes mortgage debt service so that two investors considering different down payments see the exact same property yield.'
      },
      {
        question: 'Can Cap Rate be higher than my mortgage rate?',
        answer: 'Yes. When Cap Rate exceeds the mortgage interest rate, leverage is positive and increases Cash-on-Cash return; when Cap Rate is below the borrowing rate, debt creates negative leverage.'
      }
    ],
    importantNotes: [
      'Seller marketing sheets sometimes omit vacancy or management fees—include them for accurate Cap Rate comparisons.',
      'Cap Rate is a snapshot of Year 1 stabilized performance, not a multi-year internal rate of return (IRR).'
    ]
  },

  'rent-vs-buy-calculator': {
    introduction:
      'Deciding whether to rent an apartment or buy a home depends on far more than comparing a monthly rent check to a mortgage payment. Homeownership brings property taxes, insurance, maintenance, and an upfront down payment, while also building equity through principal paydown and potential appreciation.\n\nThe Rent vs. Buy Calculator simulates both paths year by year over your planned stay duration, comparing cumulative rent payments (with annual rent inflation) against cumulative homeownership costs minus estimated home equity.',
    howItWorks: {
      summary:
        'The calculator runs an annual loop across your planned stay duration, projecting escalating rent outflows alongside fixed mortgage payments, property taxes, insurance, maintenance, and cumulative equity growth.',
      steps: [
        {
          title: '1. Compute Base Homeownership Costs',
          detail: 'Subtracts your down payment from the home price to compute a 30-year fixed principal and interest payment, plus annual property tax/insurance (1.5% of home value) and maintenance (1%).'
        },
        {
          title: '2. Compound Annual Rent & Home Value',
          detail: 'Rent increases each year by your rent inflation rate, while the home price compounds at your assumed annual appreciation rate.'
        },
        {
          title: '3. Track Cumulative Outflows & Equity',
          detail: 'Accumulates total rent paid versus total buying cash outlays (including the down payment) and deducts estimated home equity at the end of your stay.'
        },
        {
          title: '4. Identify the Financial Winner',
          detail: 'Compares net 100% unrecoverable rent cost against net buying cost after equity to show which option leaves you ahead.'
        }
      ],
      keyAssumptions: [
        'Home purchase assumes a 30-year fixed mortgage term.',
        'Estimated annual property taxes and insurance total 1.5% of home price, plus 1.0% for maintenance.',
        'Closing costs, agent selling commissions, and investment opportunity cost on the down payment are simplified.'
      ]
    },
    formula: {
      title: 'Cumulative Net Cost Comparison',
      equation: 'Net Buy Cost = Total Cash Outlaid - (Future Home Value - Remaining Loan Balance)',
      variables: [
        { symbol: 'Net Buy Cost', name: 'Net Cost of Buying', description: 'Down payment plus cumulative P&I, taxes, insurance, and maintenance minus ending home equity', unit: 'Currency ($)' },
        { symbol: 'Total Rent', name: 'Cumulative Rent Paid', description: 'Sum of escalating annual rent over stay duration', unit: 'Currency ($)' },
        { symbol: 'Future Home Value', name: 'Appreciated Property Value', description: 'Home Price × (1 + Appreciation Rate)^Years', unit: 'Currency ($)' }
      ],
      explanation:
        'While renting carries zero equity return, buying ties up cash and incurs transaction and maintenance costs. Over short holding periods, renting often wins; over longer periods, fixed P&I and appreciation tend to favor buying.'
    },
    examples: [
      {
        title: '7-Year Stay Horizon Comparison',
        scenario: 'Compare renting at $2,200/month (3% annual rent increase) against buying a $400,000 home with 20% down ($80,000) at a 6.5% rate and 3% annual appreciation over 7 years.',
        inputs: {
          'Monthly Rent / Increase': '$2,200 / 3%',
          'Home Price / Down Payment': '$400,000 / 20% ($80,000)',
          'Mortgage Rate': '6.5% (30-yr fixed)',
          'Stay Duration': '7 Years'
        },
        steps: [
          'Monthly mortgage P&I on $320,000 loan = $2,022.62 ($24,271/yr)',
          'Estimated annual taxes/insurance (1.5% = $6,000) + maintenance (1% = $4,000) = $10,000/yr ($34,271/yr total)',
          '7-year cumulative rent (at 3% escalation) = $202,289',
          'Year 7 home value = $491,950 | Remaining loan balance = $289,332 → Amortized equity = $202,618',
          '7-year buy cash outlay ($80,000 down + 7 × $34,271) = $319,900, minus $202,618 equity → Net Buy Cost = $117,282'
        ],
        result: 'Buying wins by ~$85,007 over 7 years (before selling commissions)',
        takeaway: 'Staying 7+ years gives home appreciation and principal reduction enough time to outweigh upfront down payment and ownership expenses.'
      }
    ],
    understandingResults:
      'Look carefully at the net cost difference rather than only the Year 1 monthly payment gap. If you expect to move within 2 to 4 years, remember that typical realtor and closing fees (roughly 6% to 8% of sale price) are not subtracted inside this simplified model, so buying needs a clear margin to overcome transaction costs.',
    useCases: [
      {
        title: 'First-Time Buyer Timing',
        description: 'Test how long you must live in a home before buying overtakes renting financially.',
        targetAudience: 'Prospective Homebuyers',
        benefits: ['Quantifies multi-year breakeven', 'Tests appreciation sensitivity', 'Models rising rent impact']
      },
      {
        title: 'Relocation Housing Choice',
        description: 'Evaluate whether to lease or purchase when moving for a new multi-year job assignment.',
        targetAudience: 'Relocating Professionals',
        benefits: ['Clear horizon comparison', 'Avoids premature buying', 'Accounts for upkeep expenses']
      }
    ],
    faqs: [
      {
        question: 'Why does stay duration matter so much in Rent vs. Buy?',
        answer: 'Early mortgage payments go predominantly toward interest rather than principal, and ownership entails taxes and maintenance. Longer stays allow appreciation and rising rents to tip the balance toward buying.'
      },
      {
        question: 'What if home prices stay flat instead of appreciating?',
        answer: 'Set appreciation to 0% in the calculator to stress-test whether buying still makes financial sense without market price gains.'
      }
    ],
    importantNotes: [
      'Real estate selling commissions (typically 5%–6%) and closing fees reduce net proceeds upon sale.',
      'Property taxes and homeowner insurance vary widely by county and state.'
    ]
  },

  'refinance-calculator': {
    introduction:
      'Lower interest rates do not automatically make refinancing worthwhile—lender origination fees, appraisal costs, and title charges create an upfront hurdle that must be recovered through monthly savings before you come out ahead.\n\nThe Mortgage Refinance Calculator compares your remaining current loan payment against a proposed new mortgage payment, calculates exact monthly savings, and tells you the break-even timeline in months so you know whether refinancing pays off before you move or pay off the home.',
    howItWorks: {
      summary:
        'The tool amortizes both your existing balance (over its remaining years at your current rate) and the new refinanced loan (over your chosen new term at the new rate), then divides closing costs by the monthly payment reduction.',
      steps: [
        {
          title: '1. Calculate Current Monthly Payment',
          detail: 'Uses your remaining loan balance, current interest rate, and remaining years to compute your baseline monthly P&I.'
        },
        {
          title: '2. Compute New Refinanced Payment',
          detail: 'Applies the new interest rate and new loan term (for example, 15 or 30 years) to your balance.'
        },
        {
          title: '3. Measure Monthly Savings',
          detail: 'Subtracts the new monthly P&I payment from your current payment.'
        },
        {
          title: '4. Find Break-Even Point',
          detail: 'Divides total closing costs by monthly savings and rounds up to show how many months it takes to recover the refinance fees.'
        }
      ],
      keyAssumptions: [
        'Closing costs are paid upfront rather than rolled into the new loan balance.',
        'Both current and proposed loans are fixed-rate fully amortizing mortgages.',
        'Monthly escrow items (property tax and insurance) remain unchanged and cancel out in comparison.'
      ]
    },
    formula: {
      title: 'Refinance Savings & Break-Even Formula',
      equation: 'Break-Even Months = ⌈ Closing Costs / (Current Payment - New Payment) ⌉',
      variables: [
        { symbol: 'Current Payment', name: 'Existing Monthly P&I', description: 'Amortized payment on remaining balance at old rate', unit: 'Currency ($)' },
        { symbol: 'New Payment', name: 'Refinanced Monthly P&I', description: 'Amortized payment on balance at new rate and term', unit: 'Currency ($)' },
        { symbol: 'Closing Costs', name: 'Refinance Fees', description: 'Total lender, appraisal, title, and origination charges', unit: 'Currency ($)' }
      ],
      explanation:
        'Only when monthly savings remain positive and you keep the new mortgage longer than the break-even month count do you begin realizing net cash-flow savings from the refinance.'
    },
    examples: [
      {
        title: 'Dropping from 7.2% to 5.8%',
        scenario: 'A homeowner with a $300,000 remaining balance and 30 years left at 7.2% refinances into a new 30-year loan at 5.8% with $4,500 in closing costs.',
        inputs: {
          'Current Balance': '$300,000',
          'Current Rate / Term': '7.2% / 30 yrs',
          'New Rate / Term': '5.8% / 30 yrs',
          'Closing Costs': '$4,500'
        },
        steps: [
          'Current monthly P&I (r = 0.006, n = 360) = $2,036.37',
          'New monthly P&I (r = 0.004833, n = 360) = $1,760.27',
          'Monthly savings = $2,036.37 - $1,760.27 = $276.10',
          'Break-even point = ⌈ $4,500 / $276.10 ⌉ = 17 months'
        ],
        result: 'Monthly Savings: $276.10 | Break-Even: 17 Months',
        takeaway: 'If the homeowner stays in the property for at least 17 months, the refinance pays back all closing fees and saves $276/month thereafter.'
      }
    ],
    understandingResults:
      'Compare the Break-Even Months against how long you realistically plan to keep the home or mortgage. Also check whether resetting back to a 30-year term adds extra years of interest—if you already paid down 5 to 10 years, test a 20-year or 15-year refinance term to avoid extending your payoff horizon.',
    useCases: [
      {
        title: 'Rate-and-Term Refinance Evaluation',
        description: 'Verify whether a drop of 0.75% to 1.50% in market mortgage rates justifies closing fees.',
        targetAudience: 'Homeowners',
        benefits: ['Clear payback timeline', 'Avoids costly fee traps', 'Compares 15-yr vs 30-yr resets']
      },
      {
        title: 'Comparing Lender Fee Quotes',
        description: 'Test zero-point offers with higher rates against lower rates that require discount points.',
        targetAudience: 'Mortgage Borrowers',
        benefits: ['Quantifies discount point payback', 'Supports lender negotiation', 'Transparent cost comparison']
      }
    ],
    faqs: [
      {
        question: 'Should I refinance if the new loan resets my 30-year clock?',
        answer: 'Lowering your monthly payment can still help cash flow, but resetting the term means paying interest over more total years. You can keep paying your old higher payment to retire the new loan much faster.'
      },
      {
        question: 'What counts as refinance closing costs?',
        answer: 'Include lender origination fees, discount points, appraisal, credit report, and title/settlement fees. Exclude prepaid property taxes or insurance escrow funding since you owe those regardless.'
      }
    ],
    importantNotes: [
      'A negative or "Never" break-even occurs when shortening the term (such as 30-year to 15-year) raises your monthly payment even though it saves substantial lifetime interest.',
      'Check whether your existing mortgage carries any prepayment penalty.'
    ]
  },

  'cash-on-cash-calculator': {
    introduction:
      'When using a mortgage to buy rental real estate, your return on the property purchase price (Cap Rate) can look very different from the return on your actual out-of-pocket cash. Cash-on-Cash Return isolates your leveraged annual yield by comparing pre-tax annual cash flow against every dollar you wrote checks for at closing and during renovation.\n\nThe Cash-on-Cash Return Calculator totals your down payment, closing fees, and rehab expenses to compute Total Cash Invested, then expresses your annual and monthly cash flow as a crisp percentage yield.',
    howItWorks: {
      summary:
        'The calculator adds your upfront acquisition and renovation cash outlays to determine your denominator, then divides annual pre-tax cash flow by that total cash invested.',
      steps: [
        {
          title: '1. Total Upfront Cash Invested',
          detail: 'Adds down payment, buyer closing costs, and upfront rehab/repair capital to determine your true cash basis.'
        },
        {
          title: '2. Divide Annual Cash Flow by Cash Basis',
          detail: 'Takes your net annual pre-tax cash flow (after operating costs and mortgage debt) and divides it by Total Cash Invested.'
        },
        {
          title: '3. Derive Monthly Income & Yield %',
          detail: 'Converts annual cash flow into monthly profit and formats Cash-on-Cash Return as an annual percentage.'
        }
      ],
      keyAssumptions: [
        'Annual cash flow already reflects operating expenses and debt service.',
        'Metric measures pre-tax cash yield and excludes loan principal paydown and appreciation.'
      ]
    },
    formula: {
      title: 'Cash-on-Cash Return Formula',
      equation: 'CoC % = [ Annual Cash Flow / (Down Payment + Closing Costs + Rehab) ] × 100',
      variables: [
        { symbol: 'Annual Cash Flow', name: 'Pre-Tax Net Cash Flow', description: 'Annual rental income minus operating expenses and annual mortgage payments', unit: 'Currency ($/yr)' },
        { symbol: 'Total Cash Invested', name: 'Upfront Equity', description: 'Sum of down payment, closing costs, and initial repairs', unit: 'Currency ($)' },
        { symbol: 'CoC %', name: 'Cash-on-Cash Return', description: 'Annual dividend-like yield on cash invested', unit: '%' }
      ],
      explanation:
        'Unlike total ROI, Cash-on-Cash Return strictly measures liquid cash generated each year per dollar of liquid cash committed to the investment.'
    },
    examples: [
      {
        title: 'Value-Add Rental Cash Yield',
        scenario: 'An investor puts $50,000 down, pays $5,000 in closing costs, and spends $10,000 on light rehab. The property clears $6,240 per year ($520/month) after all bills and mortgage payments.',
        inputs: {
          'Down Payment': '$50,000',
          'Closing Costs': '$5,000',
          'Rehab / Repairs': '$10,000',
          'Annual Cash Flow': '$6,240'
        },
        steps: [
          'Total Cash Invested = $50,000 + $5,000 + $10,000 = $65,000',
          'Monthly Cash Flow = $6,240 / 12 = $520/mo',
          'Cash-on-Cash Return = ($6,240 / $65,000) × 100 = 9.60%'
        ],
        result: 'Cash-on-Cash Return: 9.6% | Total Cash Invested: $65,000',
        takeaway: 'Every $1 invested in the deal earns nearly 10 cents per year in pre-tax cash flow, before counting equity paydown or appreciation.'
      }
    ],
    understandingResults:
      'Real estate investors commonly compare Cash-on-Cash Return against passive alternatives such as index funds or high-yield bonds. Many cash-flow investors target 8% to 12%+, while buyers in high-appreciation coastal markets often accept 3% to 6% in exchange for expected long-term price growth.',
    useCases: [
      {
        title: 'Comparing Leveraged Deals',
        description: 'Determine whether a lower-down-payment loan improves cash yield or hurts it due to higher debt payments.',
        targetAudience: 'Rental Property Investors',
        benefits: ['Measures capital efficiency', 'Factors in rehab overruns', 'Easy cross-asset comparison']
      }
    ],
    faqs: [
      {
        question: 'Does Cash-on-Cash Return include mortgage principal paydown?',
        answer: 'No. Principal paydown builds equity rather than spendable cash, so it is excluded from Cash-on-Cash Return and captured instead in Total Return on Equity.'
      },
      {
        question: 'Can Cash-on-Cash Return exceed 100%?',
        answer: 'Yes, for example in BRRRR deals where refinancing pulls out almost all initial cash invested while the property still generates positive monthly cash flow.'
      }
    ],
    importantNotes: [
      'Do not forget closing costs and immediate make-ready repairs—leaving them out artificially inflates CoC.',
      'Re-calculate after property stabilization or refinancing to monitor Return on Equity (ROE).'
    ]
  },

  'grm-calculator': {
    introduction:
      'Before building a full expense spreadsheet for a multifamily or single-family listing, real estate investors use the Gross Rent Multiplier (GRM) as a rapid screening ratio. GRM compares the asking price directly against gross annual rental income.\n\nThe Gross Rent Multiplier Calculator divides property purchase price by annual gross scheduled rent so you can compare dozens of listings in seconds and spot properties priced out of line with local rental norms.',
    howItWorks: {
      summary:
        'The calculator computes the ratio between acquisition price and annualized gross rent before operating expenses or financing.',
      steps: [
        {
          title: '1. Enter Property Purchase Price',
          detail: 'Input the listing or target offer price for the rental building.'
        },
        {
          title: '2. Enter Annual Gross Rent',
          detail: 'Provide total yearly gross rent across all units before deducting vacancies or expenses.'
        },
        {
          title: '3. Calculate GRM Ratio',
          detail: 'Divides purchase price by annual gross rent to express how many years of gross rent equal the price.'
        }
      ],
      keyAssumptions: [
        'Annual gross rent assumes full occupancy before operating expenses.',
        'Does not account for differences in property taxes, utility billing, or building condition.'
      ]
    },
    formula: {
      title: 'Gross Rent Multiplier Formula',
      equation: 'GRM = Property Purchase Price / Annual Gross Scheduled Rent',
      variables: [
        { symbol: 'GRM', name: 'Gross Rent Multiplier', description: 'Years of gross rent required to equal purchase price', unit: 'Multiplier' },
        { symbol: 'Purchase Price', name: 'Property Price', description: 'Market or asking price of the real estate asset', unit: 'Currency ($)' },
        { symbol: 'Gross Rent', name: 'Annual Gross Rent', description: 'Monthly rent × 12 across all units', unit: 'Currency ($/yr)' }
      ],
      explanation:
        'A lower GRM means you pay fewer dollars per dollar of gross rental revenue. Conversely, multiplying local average GRM by a building’s gross rent provides a quick rough market price estimate.'
    },
    examples: [
      {
        title: 'Screening a Fourplex Listing',
        scenario: 'A fourplex is listed for $360,000 and collects $3,750/month ($45,000/year) in total gross rent.',
        inputs: {
          'Property Price': '$360,000',
          'Annual Gross Rent': '$45,000'
        },
        steps: [
          'Divide price by annual gross rent: $360,000 / $45,000 = 8.00'
        ],
        result: 'Gross Rent Multiplier (GRM): 8.00',
        takeaway: 'At a GRM of 8.00 (within the common 6–9 benchmark), the property warrants a deeper expense and NOI underwriting.'
      }
    ],
    understandingResults:
      'In many U.S. rental markets, a GRM between 6 and 9 signals reasonable cash-flow potential, while ratios above 12 indicate higher prices relative to gross rent (typical of appreciation-heavy coastal cities). Always follow up low-GRM leads with a full NOI and Cap Rate check because older buildings can carry unusually high repair or tax burdens.',
    useCases: [
      {
        title: 'MLS & Deal Pipeline Triage',
        description: 'Filter large lists of rental properties quickly down to the handful worth detailed inspection.',
        targetAudience: 'Real Estate Investors & Wholesalers',
        benefits: ['Instant rough valuation', 'Zero complex spreadsheets required', 'Easy market-to-market comparison']
      }
    ],
    faqs: [
      {
        question: 'What is the difference between GRM and Cap Rate?',
        answer: 'GRM looks only at gross rent, ignoring taxes, insurance, and repairs. Cap Rate uses Net Operating Income after expenses, making Cap Rate far more accurate for final underwriting.'
      },
      {
        question: 'Can a property with a low GRM still be a bad deal?',
        answer: 'Yes. If a building requires major deferred maintenance or has landlord-paid heating and high property taxes, net cash flow can still be weak despite a low GRM.'
      }
    ],
    importantNotes: [
      'Use actual in-place rents as well as market rents—pro-forma seller rents often overstate achievable income.',
      'Only compare GRMs across similar property types in the same utility-responsibility class.'
    ]
  },

  'income-tax-calculator': {
    introduction:
      'Knowing your gross salary is only half the picture—what actually lands in your checking account depends on pre-tax retirement or health deductions, standard deductions, progressive federal brackets, FICA payroll taxes, and state income taxes.\n\nThe Income Tax & Take-Home Pay Calculator estimates your annual, monthly, and bi-weekly net paycheck for Single, Married Filing Jointly, or Head of Household statuses, showing exact dollar breakdowns for federal tax, Social Security and Medicare (FICA), state tax, and your overall effective tax rate.',
    howItWorks: {
      summary:
        'The calculator subtracts pre-tax deductions and your filing status standard deduction from gross income, applies progressive federal tax brackets, adds FICA payroll taxes and estimated state tax, and computes net take-home pay.',
      steps: [
        {
          title: '1. Compute Taxable Income',
          detail: 'Subtracts pre-tax contributions (such as 401(k) and HSA) and the standard deduction ($15,000 Single, $30,000 Married Joint, $22,500 Head of Household) from gross annual income.'
        },
        {
          title: '2. Apply Progressive Federal Brackets',
          detail: 'Taxes each slice of taxable income sequentially across the 10%, 12%, 22%, 24%, and 32% marginal federal brackets.'
        },
        {
          title: '3. Calculate FICA Payroll & State Tax',
          detail: 'Computes Social Security (6.2% up to $176,100) and Medicare (1.45% on all gross wages), plus your estimated state tax rate applied to taxable income.'
        },
        {
          title: '4. Derive Net Take-Home Pay',
          detail: 'Subtracts total taxes and pre-tax deductions from gross salary to report annual, monthly, and bi-weekly paychecks.'
        }
      ],
      keyAssumptions: [
        'Uses 2025 IRS standard deductions ($15,000 Single, $30,000 Married Joint, $22,500 Head of Household) and progressive federal brackets.',
        'FICA Social Security wage cap is $176,100 for 2025 (6.2% SS + 1.45% Medicare).',
        'Pre-tax deductions reduce federal and state taxable income, while FICA applies to gross wages.'
      ]
    },
    formula: {
      title: 'Taxable Income & Take-Home Pay Formula',
      equation: 'Net Pay = Gross Income - (Federal Tax + FICA + State Tax) - Pre-Tax Deductions',
      variables: [
        { symbol: 'Gross Income', name: 'Annual Salary', description: 'Total yearly wage or salary before deductions', unit: 'Currency ($)' },
        { symbol: 'Taxable Income', name: 'Federal Taxable Base', description: 'max(0, Gross Income - Pre-Tax Deductions - Standard Deduction)', unit: 'Currency ($)' },
        { symbol: 'FICA', name: 'Payroll Taxes', description: '6.2% Social Security (up to wage cap) + 1.45% Medicare', unit: 'Currency ($)' },
        { symbol: 'Effective Rate', name: 'Average Tax Rate', description: '(Total Taxes / Gross Income) × 100', unit: '%' }
      ],
      explanation:
        'Federal taxes are marginal, not flat: entering the 22% bracket only taxes dollars above the 12% threshold at 22%, leaving earlier income taxed at 10% and 12%.'
    },
    examples: [
      {
        title: 'Single Filer Earning $85,000',
        scenario: 'A single employee earns $85,000/year, contributes $6,000 pre-tax to a 401(k)/HSA, and lives in a state with a 5% estimated state income tax.',
        inputs: {
          'Gross Annual Income': '$85,000',
          'Filing Status': 'Single ($15,000 Std. Deduction)',
          'Pre-Tax Deductions': '$6,000',
          'State Tax Rate': '5%'
        },
        steps: [
          'Taxable income = $85,000 - $6,000 - $15,000 = $64,000',
          'Federal tax = (10% × $11,925) + (12% × $36,550) + (22% × $15,525) = $1,192.50 + $4,386.00 + $3,415.50 = $8,994',
          'FICA = (6.2% × $85,000 = $5,270) + (1.45% × $85,000 = $1,232.50) = $6,502.50 ($6,503 rounded)',
          'State tax = 5% × $64,000 = $3,200 | Total taxes = $18,697',
          'Net annual take-home = $85,000 - $18,696.50 - $6,000 = $60,304/yr (~$5,025/mo)'
        ],
        result: 'Net Take-Home: $60,304/yr ($5,025/mo) | Effective Tax: 22.0%',
        takeaway: 'Even though this filer sits in the 22% marginal federal bracket, progressive brackets plus standard and pre-tax deductions keep total effective tax at 22% across federal, state, and FICA combined.'
      }
    ],
    understandingResults:
      'Focus on both Effective Tax Rate and Monthly Take-Home Pay when planning your budget. Pre-tax 401(k) and HSA contributions lower your cash paycheck slightly today while cutting federal and state tax bills immediately. Use bi-weekly take-home estimates if your employer runs 26 pay periods per year.',
    useCases: [
      {
        title: 'Job Offer & Raise Evaluation',
        description: 'See how much net cash a new salary or state relocation actually adds after taxes.',
        targetAudience: 'Job Seekers & Employees',
        benefits: ['Realistic monthly budget check', 'Shows 401(k) tax shield', 'Compares state tax burdens']
      },
      {
        title: 'Withholding & Deduction Planning',
        description: 'Estimate how increasing pre-tax retirement savings changes taxable income and total tax liability.',
        targetAudience: 'Taxpayers & Savers',
        benefits: ['Optimizes pre-tax deductions', 'Separates FICA vs income tax', 'Prevents paycheck surprises']
      }
    ],
    faqs: [
      {
        question: 'Why is my effective tax rate lower than my tax bracket?',
        answer: 'The standard deduction shields your first $15,000–$30,000 from federal income tax completely, and lower progressive brackets (10% and 12%) apply to the initial slices of taxable income.'
      },
      {
        question: 'Does contributing to a 401(k) reduce Social Security and Medicare taxes?',
        answer: 'No. Traditional 401(k) contributions lower federal and most state income taxes, but FICA payroll taxes still apply to full gross wages (HSA payroll contributions, however, may bypass FICA).'
      }
    ],
    importantNotes: [
      'Tax credits (such as Child Tax Credit), itemized deductions, and local municipal taxes are not modeled in this streamlined estimator.',
      'Always verify official IRS brackets and state forms when filing taxes.'
    ]
  },

  'sales-tax-calculator': {
    introduction:
      'Retail price tags rarely match the amount charged at checkout once state, county, and city sales taxes are added—and invoices often show only a tax-inclusive total when you need to separate the pre-tax item price.\n\nThe Sales Tax & Total Price guide explains both forward tax calculation (calculating tax and final price from a sticker amount) and reverse pre-tax calculation (backing out sales tax from a combined receipt total).',
    howItWorks: {
      summary:
        'Forward sales tax multiplies the pre-tax price by the combined tax rate as a decimal and adds it to the subtotal; reverse calculation divides the tax-inclusive total by (1 + rate) to recover the base price.',
      steps: [
        {
          title: '1. Combine Local Sales Tax Rates',
          detail: 'Add state, county, and city tax rates together into one total sales tax percentage (for example, 6% + 2.25% = 8.25%).'
        },
        {
          title: '2. Forward Calculation (Add Tax)',
          detail: 'Multiply the pre-tax subtotal by (Tax Rate / 100) to find the tax dollar amount, then add it to the subtotal.'
        },
        {
          title: '3. Reverse Calculation (Extract Pre-Tax)',
          detail: 'When starting from a final receipt total, divide by (1 + Tax Rate / 100) instead of subtracting the percentage from the gross total.'
        }
      ],
      keyAssumptions: [
        'All items in the subtotal are subject to the same combined sales tax rate.',
        'Discounts or coupons are applied to the pre-tax price before computing sales tax where standard rules apply.'
      ]
    },
    formula: {
      title: 'Forward & Reverse Sales Tax Formulas',
      equation: 'Total = Price × (1 + r) | Pre-Tax Price = Total / (1 + r)',
      variables: [
        { symbol: 'Price', name: 'Pre-Tax Subtotal', description: 'Item cost before sales tax', unit: 'Currency ($)' },
        { symbol: 'r', name: 'Sales Tax Rate', description: 'Combined tax percentage as a decimal (e.g., 8.25% = 0.0825)', unit: 'Decimal' },
        { symbol: 'Total', name: 'Final Checkout Price', description: 'Subtotal plus sales tax', unit: 'Currency ($)' }
      ],
      explanation:
        'A common mistake when reversing tax from a total receipt is multiplying the total by the tax rate—which overstates the tax. Dividing by (1 + r) accurately recovers the original base price.'
    },
    examples: [
      {
        title: 'Calculating Checkout Total & Reversing a Receipt',
        scenario: 'A laptop costs $1,200 before tax in a city with an 8.25% combined sales tax rate.',
        inputs: {
          'Pre-Tax Price': '$1,200.00',
          'Sales Tax Rate': '8.25% (0.0825)'
        },
        steps: [
          'Sales tax amount = $1,200.00 × 0.0825 = $99.00',
          'Total checkout price = $1,200.00 + $99.00 = $1,299.00',
          'Reverse verification from $1,299.00: Pre-tax = $1,299.00 / 1.0825 = $1,200.00'
        ],
        result: 'Sales Tax: $99.00 | Final Total: $1,299.00',
        takeaway: 'Dividing $1,299.00 by 1.0825 restores the exact $1,200.00 pre-tax price, whereas subtracting 8.25% of $1,299 would give the wrong figure ($1,191.83).'
      }
    ],
    understandingResults:
      'Use the forward calculation when budgeting major purchases such as vehicles, appliances, or business equipment, and use the reverse formula when splitting tax-inclusive invoices for bookkeeping or expense reports.',
    useCases: [
      {
        title: 'Big-Ticket Purchase Budgeting',
        description: 'Estimate true out-the-door checkout prices on electronics, furniture, and equipment.',
        targetAudience: 'Consumers & Procurement Teams',
        benefits: ['Avoids checkout surprises', 'Easy multi-jurisdiction math', 'Accurate invoice verification']
      },
      {
        title: 'Bookkeeping & Receipt Reconciliation',
        description: 'Separate net expense from recoverable or deductible sales tax on tax-inclusive receipts.',
        targetAudience: 'Small Business Owners & Accountants',
        benefits: ['Correct reverse tax extraction', 'Clean expense categorization', 'Audit-ready subtotals']
      }
    ],
    faqs: [
      {
        question: 'Why cannot I just subtract 8% from a tax-inclusive total to find the original price?',
        answer: 'Because the 8% tax was charged on the smaller pre-tax price, not on the larger final total. You must divide the total by 1.08 instead.'
      },
      {
        question: 'Are shipping fees subject to sales tax?',
        answer: 'It depends on your state or jurisdiction—some tax shipping when bundled with taxable goods, while others exempt separately stated delivery charges.'
      }
    ],
    importantNotes: [
      'Tax rates vary by state, county, city, and special transit districts; certain categories like groceries or clothing may be exempt or taxed at reduced rates.'
    ]
  },

  'capital-gains-tax-calculator': {
    introduction:
      'Selling appreciated stocks, cryptocurrency, or real estate triggers capital gains tax, and the rate you owe depends heavily on how long you held the asset. Holding an investment for 12 months or longer unlocks preferential long-term federal tax rates instead of ordinary income brackets.\n\nThe Capital Gains Tax Calculator computes your net profit from purchase and selling prices, selects either short-term or long-term federal rates based on your holding period and taxable income, and displays estimated tax due alongside your net after-tax proceeds.',
    howItWorks: {
      summary:
        'The calculator subtracts cost basis from sale proceeds to find your capital gain, then applies either simplified long-term brackets (0%, 15%, or 20%) for assets held 12+ months or ordinary income bracket estimates for assets held under 12 months.',
      steps: [
        {
          title: '1. Compute Net Capital Gain',
          detail: 'Subtracts the original purchase price (cost basis) from the selling price to find gross profit or capital loss.'
        },
        {
          title: '2. Classify Holding Period',
          detail: 'Holding periods of 12 months or more qualify for Long-Term Capital Gains treatment; shorter periods are treated as Short-Term.'
        },
        {
          title: '3. Determine Applicable Tax Rate',
          detail: 'For Long-Term gains, assigns 0% (taxable income ≤ $47,025), 15% (≤ $518,900), or 20% (> $518,900). For Short-Term gains, estimates ordinary rates (12%, 22%, 24%, or 35%) based on income.'
        },
        {
          title: '4. Estimate Tax & Net Proceeds',
          detail: 'Multiplies positive gains by the selected tax rate and subtracts tax from the selling price to show cash kept.'
        }
      ],
      keyAssumptions: [
        'Uses single-filer federal threshold approximations ($47,025 and $518,900 for long-term brackets).',
        'Capital losses result in $0 estimated tax in this standalone calculation.',
        'Does not include state capital gains taxes or the 3.8% Net Investment Income Tax (NIIT).'
      ]
    },
    formula: {
      title: 'Capital Gains & Net Proceeds Formula',
      equation: 'Tax = max(0, Sale Price - Purchase Price) × Rate | Net Proceeds = Sale Price - Tax',
      variables: [
        { symbol: 'Capital Gain', name: 'Taxable Profit', description: 'Selling Price minus Purchase Price', unit: 'Currency ($)' },
        { symbol: 'Rate', name: 'Capital Gains Rate', description: '0%/15%/20% for long-term (≥12 mos) or ordinary bracket for short-term', unit: '%' },
        { symbol: 'Net Proceeds', name: 'After-Tax Cash', description: 'Total sale value kept after paying estimated federal tax', unit: 'Currency ($)' }
      ],
      explanation:
        'Long-term capital gains rates are substantially lower than ordinary income rates, often saving investors 7 to 15 percentage points on realized profits simply by crossing the 12-month holding mark.'
    },
    examples: [
      {
        title: 'Long-Term Stock Sale vs. Short-Term Sale',
        scenario: 'An investor with $80,000 in annual taxable income sells shares bought for $25,000 for $45,000 after holding them for 18 months.',
        inputs: {
          'Purchase Price': '$25,000',
          'Selling Price': '$45,000',
          'Holding Period': '18 months (Long-Term)',
          'Taxable Income': '$80,000'
        },
        steps: [
          'Capital Gain = $45,000 - $25,000 = $20,000',
          'Holding ≥ 12 months + $80,000 income → 15% Long-Term rate',
          'Estimated Federal Tax = $20,000 × 15% = $3,000',
          'Net Proceeds = $45,000 - $3,000 = $42,000'
        ],
        result: 'Gain: $20,000 | Est. Tax (15%): $3,000 | Net Proceeds: $42,000',
        takeaway: 'Had the same shares been sold after 10 months (short-term at 22%), estimated tax would jump to $4,400—costing an extra $1,400.'
      }
    ],
    understandingResults:
      'Pay special attention to the classification badge ("Long-Term" vs. "Short-Term") and the tax percentage rate. If you are sitting near 11 months of ownership with large unrealized gains, waiting past one full year can materially reduce your federal tax bill.',
    useCases: [
      {
        title: 'Timing Stock or Crypto Profit-Taking',
        description: 'Compare selling immediately at short-term rates versus waiting for the 12-month long-term threshold.',
        targetAudience: 'Retail Investors',
        benefits: ['Quantifies waiting payoff', 'Sets realistic cash tax reserves', 'Clarifies net sale proceeds']
      }
    ],
    faqs: [
      {
        question: 'When does a gain become long-term?',
        answer: 'For U.S. federal taxes, an asset generally qualifies as long-term when held for more than one year (12+ months in this simplified model).'
      },
      {
        question: 'What if I sell at a loss?',
        answer: 'If selling price is below purchase price, you incur a capital loss with $0 tax on the sale, which may offset other capital gains or up to $3,000 of ordinary income per year.'
      }
    ],
    importantNotes: [
      'High earners may also owe an extra 3.8% Net Investment Income Tax plus applicable state capital gains taxes.',
      'Real estate primary residence sales may qualify for Section 121 exclusions ($250k single / $500k married) not modeled here.'
    ]
  },

  'tip-calculator': {
    introduction:
      'Splitting a restaurant tab among friends or calculating a fair gratuity quickly at the end of a meal should not require awkward mental math. Whether you want to reward great service with 20% or divide a group dinner evenly, speed and clarity matter.\n\nThe Tip & Split Bill Calculator computes the exact tip amount, total bill including gratuity, and per-person split (both total per person and tip per person) with quick preset buttons for 15%, 18%, 20%, and 25% plus custom percentages and party sizes from 1 to 20.',
    howItWorks: {
      summary:
        'The calculator multiplies your base bill amount by the selected tip percentage, adds the gratuity to produce the total payable check, and divides both total and tip evenly by your group size.',
      steps: [
        {
          title: '1. Enter Base Bill Amount',
          detail: 'Type the restaurant check subtotal or bill amount.'
        },
        {
          title: '2. Choose Tip Percentage',
          detail: 'Tap a quick preset (15%, 18%, 20%, 25%) or enter any custom tip percentage.'
        },
        {
          title: '3. Set Group Split Count',
          detail: 'Slide or select the number of diners sharing the check (1 to 20 people).'
        },
        {
          title: '4. Read Per-Person Share',
          detail: 'View the exact total per person, tip per person, combined tip, and grand total.'
        }
      ],
      keyAssumptions: [
        'The group splits the bill and gratuity evenly among all diners.',
        'Tip is calculated directly on the bill amount entered (whether pre-tax or post-tax).'
      ]
    },
    formula: {
      title: 'Tip & Even Split Formulas',
      equation: 'Tip = Bill × (Tip% / 100) | Per Person = (Bill + Tip) / People',
      variables: [
        { symbol: 'Bill', name: 'Check Amount', description: 'Restaurant subtotal or bill before gratuity', unit: 'Currency ($)' },
        { symbol: 'Tip%', name: 'Gratuity Percentage', description: 'Desired tip rate (e.g., 15%–25%)', unit: '%' },
        { symbol: 'People', name: 'Split Count', description: 'Number of diners sharing the bill', unit: 'Count' }
      ],
      explanation:
        'Adding the computed tip to the bill gives the full check total, and dividing both values by the party size yields exact equal shares.'
    },
    examples: [
      {
        title: 'Group Dinner Split 4 Ways',
        scenario: 'Four friends finish dinner with a $120.00 bill and agree on an 18% tip.',
        inputs: {
          'Bill Amount': '$120.00',
          'Tip Percentage': '18%',
          'Split Between': '4 people'
        },
        steps: [
          'Total Tip = $120.00 × 0.18 = $21.60',
          'Grand Total = $120.00 + $21.60 = $141.60',
          'Per Person Total = $141.60 / 4 = $35.40',
          'Per Person Tip = $21.60 / 4 = $5.40'
        ],
        result: 'Per Person: $35.40 (Includes $5.40 Tip) | Total: $141.60',
        takeaway: 'Each diner pays $35.40, covering their $30.00 meal share plus $5.40 toward the $21.60 tip.'
      }
    ],
    understandingResults:
      'The main highlighted card shows what each person owes in total, along with the per-person tip share underneath. Check your restaurant receipt before paying to make sure an automatic large-party service charge has not already been added.',
    useCases: [
      {
        title: 'Group Dining & Happy Hours',
        description: 'Split shared appetizers and checks cleanly without under-tipping servers.',
        targetAudience: 'Diners & Travelers',
        benefits: ['Instant mental-math replacement', 'Fair server gratuity', 'Zero split confusion']
      }
    ],
    faqs: [
      {
        question: 'Should you tip on the pre-tax subtotal or the post-tax total?',
        answer: 'Etiquette traditionally calculates tips on the pre-tax food and drink subtotal, though either figure can be entered in the Bill Amount field.'
      },
      {
        question: 'What is a standard tip in the United States?',
        answer: 'For sit-down table service, 15% to 20% is standard, with 20%–25% common for attentive or large-group service.'
      }
    ],
    importantNotes: [
      'Always check the printed bill for included auto-gratuity on groups of 6 or more before adding an extra tip.'
    ]
  },

  'vat-calculator': {
    introduction:
      'Value-Added Tax (VAT) or Goods and Services Tax (GST) appears on quotes, invoices, and retail receipts across the UK, Europe, Australia, Canada, and dozens of other countries. Because B2B quotes often list net prices excluding VAT while retail tags display gross VAT-inclusive prices, businesses and freelancers constantly switch between adding and stripping out VAT.\n\nThe VAT / GST Calculator supports both modes—Add VAT (Net to Gross) and Remove VAT (Gross to Net)—displaying Net Price, exact VAT Amount, and Gross Total for any percentage rate.',
    howItWorks: {
      summary:
        'In Add mode, the tool multiplies the net price by the VAT rate to add tax; in Remove mode, it divides the gross price by (1 + VAT rate) to extract the embedded tax without percentage distortion.',
      steps: [
        {
          title: '1. Select Calculation Direction',
          detail: 'Toggle between "Add VAT (Net → Gross)" and "Remove VAT (Gross → Net)".'
        },
        {
          title: '2. Enter Price & VAT Rate',
          detail: 'Input the monetary amount and applicable VAT/GST percentage (such as 20%, 15%, 10%, or 5%).'
        },
        {
          title: '3. Apply Mode-Specific Math',
          detail: 'Multiplies Net by VAT rate when adding, or divides Gross by (1 + VAT/100) when removing.'
        }
      ],
      keyAssumptions: [
        'Applies a single uniform VAT/GST percentage to the entire invoice amount.',
        'Results are rounded cleanly to two decimal places for currency invoicing.'
      ]
    },
    formula: {
      title: 'Add VAT & Remove VAT Equations',
      equation: 'Add: Gross = Net × (1 + r) | Remove: Net = Gross / (1 + r)',
      variables: [
        { symbol: 'Net', name: 'Net Price (Excl. VAT)', description: 'Base goods or services price before VAT', unit: 'Currency' },
        { symbol: 'Gross', name: 'Gross Price (Incl. VAT)', description: 'Final invoice price including VAT', unit: 'Currency' },
        { symbol: 'r', name: 'VAT Rate', description: 'VAT percentage expressed as a decimal (e.g., 20% = 0.20)', unit: 'Decimal' }
      ],
      explanation:
        'Removing 20% VAT from $240 requires dividing by 1.20 ($200 Net, $40 VAT), NOT subtracting 20% of $240 ($48), because 20% was originally charged on $200.'
    },
    examples: [
      {
        title: 'Extracting 20% VAT from a Gross Receipt',
        scenario: 'A contractor pays a $240.00 gross invoice in a 20% VAT region and needs the Net cost and recoverable VAT amount.',
        inputs: {
          'Mode': 'Remove VAT (Gross → Net)',
          'Gross Amount': '$240.00',
          'VAT Rate': '20%'
        },
        steps: [
          'Net Amount = $240.00 / (1 + 0.20) = $240.00 / 1.20 = $200.00',
          'Extracted VAT = $240.00 - $200.00 = $40.00'
        ],
        result: 'Net Price: $200.00 | VAT Portion: $40.00 | Gross: $240.00',
        takeaway: 'Dividing by 1.20 avoids overstating deductible input VAT on expense claims.'
      }
    ],
    understandingResults:
      'Review the three-line breakdown showing Net Price, VAT Amount, and Gross Total. Businesses registered for VAT report the VAT Amount column on periodic tax returns, while consumers pay the Gross Total.',
    useCases: [
      {
        title: 'Freelance & Agency Invoicing',
        description: 'Convert agreed net service fees into VAT-compliant client invoices.',
        targetAudience: 'Freelancers & Small Businesses',
        benefits: ['Accurate invoice totals', 'Supports any global VAT/GST rate', 'Prevents reverse-math errors']
      },
      {
        title: 'VAT Expense Reclaim Bookkeeping',
        description: 'Extract embedded VAT from VAT-inclusive travel, hotel, and supply receipts.',
        targetAudience: 'Bookkeepers & Accountants',
        benefits: ['Exact input-tax separation', 'Speeds up quarterly VAT filing', 'Consistent rounding']
      }
    ],
    faqs: [
      {
        question: 'Why does removing 20% VAT equal 16.67% of the gross price?',
        answer: 'Because 0.20 / 1.20 = 0.16667. Since VAT is 20% of the net amount, it makes up one-sixth (16.67%) of the gross total.'
      },
      {
        question: 'Does this calculator also work for GST in Australia, Canada, or India?',
        answer: 'Yes. Goods and Services Tax (GST) follows the exact same net-to-gross and gross-to-net percentage math—just enter your local GST rate (e.g., 5%, 10%, 12%, or 18%).'
      }
    ],
    importantNotes: [
      'Verify whether specific line items qualify for reduced, zero-rated, or exempt VAT status in your jurisdiction.'
    ]
  },

  'break-even-calculator': {
    introduction:
      'Launching a product or adjusting prices without knowing your break-even point leaves profitability to guesswork. Every unit sold must first pay for its direct variable cost (materials, shipping, payment fees) and then contribute its leftover margin toward fixed overhead like rent, software, and payroll.\n\nThe Business Break-Even Analysis Calculator determines your per-unit contribution margin, contribution margin ratio, exact break-even unit volume and revenue, plus projected net profit and profit margin at your expected sales volume.',
    howItWorks: {
      summary:
        'The calculator subtracts variable cost per unit from selling price to compute contribution margin, then divides total fixed costs by that unit contribution margin to identify the zero-profit threshold.',
      steps: [
        {
          title: '1. Compute Unit Contribution Margin',
          detail: 'Subtracts direct variable cost per unit from selling price to measure how much each unit contributes toward fixed overhead.'
        },
        {
          title: '2. Solve Break-Even Units & Revenue',
          detail: 'Divides total fixed costs by unit contribution margin (rounded up to the next whole unit) and multiplies by selling price for break-even revenue.'
        },
        {
          title: '3. Project Net Profit at Target Volume',
          detail: 'Using your expected unit volume, compares total revenue against fixed plus total variable costs to report net profit and profit margin.'
        },
        {
          title: '4. Visualize Revenue vs. Total Cost',
          detail: 'Plots total revenue against the total cost curve so you can see where profits emerge past the break-even intersection.'
        }
      ],
      keyAssumptions: [
        'Selling price and variable cost per unit stay constant across the analyzed production volume.',
        'Fixed costs remain flat within the operating period.',
        'Unit price exceeds variable cost per unit (positive contribution margin).'
      ]
    },
    formula: {
      title: 'Break-Even Units & Contribution Margin Formulas',
      equation: 'Break-Even Units = ⌈ Fixed Costs / (Price - Variable Cost) ⌉',
      variables: [
        { symbol: 'Fixed Costs', name: 'Fixed Overhead', description: 'Rent, salaries, insurance, and recurring costs unaffected by volume', unit: 'Currency ($)' },
        { symbol: 'Price', name: 'Unit Selling Price', description: 'Revenue earned per single unit sold', unit: 'Currency ($)' },
        { symbol: 'Variable Cost', name: 'Unit Variable Cost', description: 'Direct materials, fulfillment, and fees per unit', unit: 'Currency ($)' },
        { symbol: 'Contribution Margin', name: 'Per-Unit Margin', description: 'Price minus Variable Cost available to cover fixed overhead', unit: 'Currency ($)' }
      ],
      explanation:
        'Break-even units tell you the minimum sales volume needed to avoid losing money; every unit sold above that number adds its full contribution margin straight to net profit.'
    },
    examples: [
      {
        title: 'Monthly Subscription Box Break-Even',
        scenario: 'A business has $12,000 in monthly fixed overhead, sells each box for $50 with $20 variable cost per box, and expects to ship 600 boxes this month.',
        inputs: {
          'Fixed Costs': '$12,000',
          'Selling Price per Unit': '$50',
          'Variable Cost per Unit': '$20',
          'Expected Sales Volume': '600 units'
        },
        steps: [
          'Unit Contribution Margin = $50 - $20 = $30 (60.0% ratio)',
          'Break-Even Units = ⌈ $12,000 / $30 ⌉ = 400 units',
          'Break-Even Revenue = 400 × $50 = $20,000',
          'At 600 units: Revenue = $30,000 | Total Costs = $12,000 + (600 × $20) = $24,000',
          'Net Profit = $30,000 - $24,000 = $6,000 (20.0% Net Profit Margin)'
        ],
        result: 'Break-Even: 400 units ($20,000) | Profit at 600 units: $6,000',
        takeaway: 'The first 400 boxes pay the $12,000 overhead; each of the next 200 boxes adds $30 directly to profit ($6,000).'
      }
    ],
    understandingResults:
      'Compare Break-Even Units against your realistic monthly sales capacity. If Break-Even Units sit dangerously close to your maximum sales estimate, your business has a thin margin of safety and should explore lowering fixed overhead, trimming variable unit costs, or raising prices.',
    useCases: [
      {
        title: 'Product Pricing & Launch Planning',
        description: 'Verify how many units a new product must sell each month to justify marketing and tooling overhead.',
        targetAudience: 'Founders & Product Managers',
        benefits: ['Tests pricing sensitivity', 'Sets clear sales quotas', 'Identifies underwater SKUs']
      },
      {
        title: 'Hiring & Fixed Overhead Decisions',
        description: 'Model how adding fixed payroll or warehouse rent raises your required monthly sales floor.',
        targetAudience: 'Small Business Owners',
        benefits: ['Quantifies overhead risk', 'Supports expansion budgeting', 'Highlights margin of safety']
      }
    ],
    faqs: [
      {
        question: 'What happens if variable cost equals or exceeds unit price?',
        answer: 'Contribution margin becomes zero or negative, meaning the business loses money on every additional unit sold and can never break even through higher volume alone.'
      },
      {
        question: 'What is Contribution Margin Ratio?',
        answer: 'It is (Price - Variable Cost) / Price as a percentage, telling you how many cents of every sales dollar remain to pay fixed costs and profit.'
      }
    ],
    importantNotes: [
      'Volume discounts from suppliers or overtime labor can change variable unit costs at higher output tiers.',
      'Ensure all semi-variable expenses (like credit card fees and shipping) are included in variable cost.'
    ]
  },

  'profit-margin-calculator': {
    introduction:
      'Understanding profit margin across both individual products and total operating volume keeps pricing sustainable as fixed overhead scales. Focusing solely on unit gross margin can hide the impact of rent and payroll, while looking only at revenue masks razor-thin product economics.\n\nThe Profit Margin calculator computes per-unit gross contribution margin (dollars and percentage) alongside total revenue, total combined costs, net dollar profit, and overall net profit margin at any sales volume.',
    howItWorks: {
      summary:
        'Using unit selling price, variable unit cost, fixed overhead, and expected unit volume, the calculator computes both product-level contribution margin and business-level net profit margin.',
      steps: [
        {
          title: '1. Measure Unit Contribution Margin',
          detail: 'Subtracts direct unit cost from unit selling price and divides by selling price to express gross contribution margin %.'
        },
        {
          title: '2. Sum Revenue & Total Costs',
          detail: 'Multiplies units sold by unit price for total revenue, then adds fixed overhead to total variable costs.'
        },
        {
          title: '3. Compute Net Profit & Net Margin %',
          detail: 'Subtracts total costs from total revenue and expresses net profit as a percentage of total revenue.'
        }
      ],
      keyAssumptions: [
        'Gross/contribution margin measures revenue minus direct variable cost before fixed overhead.',
        'Net profit margin measures bottom-line profit after fixed and variable expenses.'
      ]
    },
    formula: {
      title: 'Contribution Margin & Net Profit Margin Formulas',
      equation: 'Unit Margin % = [(Price - Cost) / Price] × 100 | Net Margin % = (Net Profit / Revenue) × 100',
      variables: [
        { symbol: 'Price', name: 'Unit Selling Price', description: 'Price charged per unit', unit: 'Currency ($)' },
        { symbol: 'Cost', name: 'Variable Cost per Unit', description: 'Direct COGS and per-unit fulfillment cost', unit: 'Currency ($)' },
        { symbol: 'Fixed Costs', name: 'Overhead', description: 'Period fixed operating expenses', unit: 'Currency ($)' },
        { symbol: 'Net Profit', name: 'Bottom-Line Earnings', description: 'Total Revenue minus (Fixed Costs + Total Variable Costs)', unit: 'Currency ($)' }
      ],
      explanation:
        'Unit margin shows pricing power on each sale, while Net Margin shows how well fixed overhead is absorbed at your current sales volume.'
    },
    examples: [
      {
        title: 'Product Line Profitability Check',
        scenario: 'A merchant sells 250 units at $80 each, with $32 variable cost per unit and $4,800 in monthly fixed overhead.',
        inputs: {
          'Selling Price': '$80/unit',
          'Variable Cost': '$32/unit',
          'Fixed Overhead': '$4,800',
          'Sales Volume': '250 units'
        },
        steps: [
          'Unit Contribution Margin = $80 - $32 = $48 (48 / 80 = 60.0%)',
          'Total Revenue = 250 × $80 = $20,000',
          'Total Costs = $4,800 + (250 × $32) = $4,800 + $8,000 = $12,800',
          'Net Profit = $20,000 - $12,800 = $7,200',
          'Net Profit Margin = ($7,200 / $20,000) × 100 = 36.0%'
        ],
        result: 'Contribution Margin: 60.0% | Net Profit: $7,200 | Net Margin: 36.0%',
        takeaway: 'Higher sales volume above break-even spreads the $4,800 fixed overhead thinner, pushing net profit margin closer toward the 60% unit margin.'
      }
    ],
    understandingResults:
      'If your unit contribution margin is healthy (for example, 50%+) but net profit margin is low or negative, the bottleneck is usually insufficient sales volume or oversized fixed overhead—not unit pricing.',
    useCases: [
      {
        title: 'Discount & Promotion Testing',
        description: 'Check how a 15% seasonal discount compresses net profit margin and how much extra volume is needed to offset it.',
        targetAudience: 'E-Commerce & Retail Sellers',
        benefits: ['Prevents margin-destroying promos', 'Separates COGS from overhead', 'Clear volume targets']
      }
    ],
    faqs: [
      {
        question: 'Why is Net Profit Margin always lower than Unit Gross Margin?',
        answer: 'Because fixed costs like rent, marketing, and salaries must be paid out of gross profit before arriving at net profit.'
      },
      {
        question: 'Is Profit Margin the same as Markup?',
        answer: 'No. Profit margin divides profit by selling price, whereas markup divides profit by cost—a 50% markup equals only a 33.3% margin.'
      }
    ],
    importantNotes: [
      'Remember to factor in payment processing fees, packaging, and returns into variable unit cost.'
    ]
  },

  'cac-ltv-calculator': {
    introduction:
      'Spending aggressively on ads to acquire customers looks impressive on top-line revenue charts, but can quietly bankrupt a subscription or repeat-purchase business if acquisition costs exceed lifetime gross profit. Unit economics hinge on the balance between Customer Acquisition Cost (CAC) and Customer Lifetime Value (LTV).\n\nThe CAC & LTV Ratio Calculator computes your exact CAC, average customer lifespan in months from churn rate, gross-margin-adjusted LTV, and your LTV:CAC ratio with instant health status diagnostics.',
    howItWorks: {
      summary:
        'The calculator divides marketing spend by new customers for CAC, inverts monthly churn to derive expected customer lifespan, multiplies ARPU by gross margin and lifespan for LTV, and evaluates the LTV:CAC ratio.',
      steps: [
        {
          title: '1. Calculate Customer Acquisition Cost (CAC)',
          detail: 'Divides total sales and marketing spend by the number of newly acquired customers.'
        },
        {
          title: '2. Estimate Customer Lifespan',
          detail: 'Takes the reciprocal of monthly churn rate (1 / Churn Decimal) to estimate how many months an average customer stays active.'
        },
        {
          title: '3. Compute Gross-Margin LTV',
          detail: 'Multiplies Monthly ARPU by Gross Margin percentage and average customer lifespan in months.'
        },
        {
          title: '4. Score the LTV:CAC Ratio',
          detail: 'Divides LTV by CAC and flags the result (<1 Critical, 1–3 Low Margin, 3–6 Healthy, >6 Under-investing).'
        }
      ],
      keyAssumptions: [
        'Monthly churn rate remains steady across customer cohorts.',
        'LTV is adjusted by Gross Margin so fulfillment/COGS costs are excluded from profit value.',
        'CAC includes all attributable ad and acquisition expenses for the period.'
      ]
    },
    formula: {
      title: 'CAC, LTV & Unit Economics Formulas',
      equation: 'CAC = Spend / Customers | LTV = ARPU × Gross Margin × (1 / Churn)',
      variables: [
        { symbol: 'CAC', name: 'Customer Acquisition Cost', description: 'Marketing and sales cost per acquired customer', unit: 'Currency ($)' },
        { symbol: 'ARPU', name: 'Average Revenue Per User', description: 'Monthly recurring or repeat revenue per active customer', unit: 'Currency ($/mo)' },
        { symbol: 'Gross Margin', name: 'Gross Margin %', description: 'Share of revenue kept after direct cost of delivery', unit: 'Decimal' },
        { symbol: 'Churn', name: 'Monthly Churn Rate', description: 'Fraction of active customers cancelling each month', unit: 'Decimal' }
      ],
      explanation:
        'Adjusting LTV by Gross Margin ensures you compare acquisition cost against gross profit rather than raw top-line revenue.'
    },
    examples: [
      {
        title: 'SaaS Subscription Unit Economics',
        scenario: 'A software startup spends $15,000 to win 100 customers paying $60/month with a 75% gross margin and 5% monthly churn.',
        inputs: {
          'Marketing Spend': '$15,000',
          'New Customers': '100',
          'Monthly ARPU': '$60',
          'Gross Margin / Churn': '75% / 5% monthly'
        },
        steps: [
          'CAC = $15,000 / 100 = $150 per customer',
          'Average Lifespan = 1 / 0.05 = 20 months',
          'LTV = $60 × 0.75 × 20 = $900 gross profit per customer',
          'LTV:CAC Ratio = $900 / $150 = 6.0x'
        ],
        result: 'CAC: $150 | LTV: $900 | LTV:CAC Ratio: 6.0x (Healthy)',
        takeaway: 'Each customer earns 6× their acquisition cost in lifetime gross profit over an average 20-month stay.'
      }
    ],
    understandingResults:
      'Industry benchmarks look for an LTV:CAC ratio of at least 3.0x. Ratios below 1.0x lose money on every new customer; ratios between 1.0x and 3.0x leave little room for fixed overhead; ratios above 6.0x often indicate you can afford to invest more aggressively in growth channels without sacrificing profitability.',
    useCases: [
      {
        title: 'Ad Budget Scaling Decisions',
        description: 'Verify whether raising paid acquisition bids keeps LTV:CAC safely above 3.0x.',
        targetAudience: 'SaaS Founders & Growth Marketers',
        benefits: ['Connects retention to ad spend', 'Uses margin-adjusted LTV', 'Flags churn sensitivity early']
      }
    ],
    faqs: [
      {
        question: 'Why must Gross Margin be included in LTV?',
        answer: 'If a customer pays $100/month on a product with 40% gross margin, only $40/month is available to pay back CAC and company overhead—using $100 overstates true value by 2.5×.'
      },
      {
        question: 'How does reducing churn affect LTV?',
        answer: 'Cutting monthly churn in half (for example, from 5% to 2.5%) doubles average customer lifespan from 20 to 40 months, doubling LTV.'
      }
    ],
    importantNotes: [
      'Early-stage startups with small customer samples should track CAC payback period (months to recover CAC) alongside LTV:CAC.'
    ]
  },

  'markup-margin-calculator': {
    introduction:
      'Confusing markup percentage with profit margin percentage is one of the most expensive pricing mistakes in retail and wholesale. Applying a 40% markup to product cost does NOT yield a 40% profit margin—it yields only a 28.6% margin, leaving far less cash than budgeted for expenses.\n\nThe Markup vs. Margin Calculator takes your Cost Basis and Selling Price and simultaneously outputs Gross Profit, Markup %, and Profit Margin % so your pricing targets and financial statements match.',
    howItWorks: {
      summary:
        'From Cost Basis and Selling Price, the tool calculates dollar gross profit and divides it by Cost Basis for Markup % and by Selling Price for Margin %.',
      steps: [
        {
          title: '1. Calculate Gross Profit',
          detail: 'Subtracts Cost Basis from Selling Price to find exact dollar gross profit per item.'
        },
        {
          title: '2. Compute Markup Percentage',
          detail: 'Divides dollar profit by Cost Basis and multiplies by 100 to show how much cost was marked up.'
        },
        {
          title: '3. Compute Profit Margin Percentage',
          detail: 'Divides dollar profit by Selling Price and multiplies by 100 to show what share of revenue is gross profit.'
        }
      ],
      keyAssumptions: [
        'Cost Basis represents direct landed unit cost.',
        'Selling Price is positive and represents net sale price before sales tax.'
      ]
    },
    formula: {
      title: 'Markup vs. Margin Equations',
      equation: 'Markup % = [(Price - Cost) / Cost] × 100 | Margin % = [(Price - Cost) / Price] × 100',
      variables: [
        { symbol: 'Cost', name: 'Cost Basis', description: 'Direct wholesale or manufacturing cost of item', unit: 'Currency ($)' },
        { symbol: 'Price', name: 'Selling Price', description: 'Price charged to the customer', unit: 'Currency ($)' },
        { symbol: 'Markup %', name: 'Cost Markup', description: 'Profit expressed as a percentage of cost', unit: '%' },
        { symbol: 'Margin %', name: 'Gross Margin', description: 'Profit expressed as a percentage of selling price', unit: '%' }
      ],
      explanation:
        'Because Selling Price is larger than Cost whenever an item is profitable, Profit Margin % is always lower than Markup % for the same transaction.'
    },
    examples: [
      {
        title: 'Pricing a $60 Wholesale Item at $100',
        scenario: 'A retailer buys a product for $60 and lists it for $100.',
        inputs: {
          'Cost Basis': '$60.00',
          'Selling Price': '$100.00'
        },
        steps: [
          'Gross Profit = $100.00 - $60.00 = $40.00',
          'Markup % = ($40.00 / $60.00) × 100 = 66.67%',
          'Profit Margin % = ($40.00 / $100.00) × 100 = 40.00%'
        ],
        result: 'Profit: $40.00 | Markup: 66.67% | Margin: 40.00%',
        takeaway: 'Achieving a true 40% gross margin requires a 66.67% markup on cost—a 40% markup would price the item at $84 and yield only a 28.57% margin.'
      }
    ],
    understandingResults:
      'Use Markup % when setting sticker prices from supplier invoices, and use Margin % when reading income statements or checking how much of gross sales remains to pay rent, marketing, and salaries.',
    useCases: [
      {
        title: 'Retail & Wholesale Pricing Sheets',
        description: 'Convert target gross margins into exact cost-multiplier markups for catalog pricing.',
        targetAudience: 'Merchants & Wholesalers',
        benefits: ['Eliminates markup/margin mix-ups', 'Protects target gross margins', 'Fast price sanity check']
      }
    ],
    faqs: [
      {
        question: 'Can Profit Margin ever exceed 100%?',
        answer: 'No, provided cost is zero or positive—gross profit cannot exceed 100% of the selling price. Markup, however, can easily be 200%, 500%, or higher.'
      },
      {
        question: 'How do I convert a desired Margin % into Markup %?',
        answer: 'Divide Margin % by (100 - Margin %). For a 50% margin: 50 / (100 - 50) = 1.00, or a 100% markup (doubling cost).'
      }
    ],
    importantNotes: [
      'Always use total landed cost (including inbound freight and customs duties) rather than raw factory unit price.'
    ]
  },

  'inventory-turnover-calculator': {
    introduction:
      'Cash locked in slow-moving warehouse inventory earns zero return and incurs storage, insurance, and obsolescence costs. Tracking how fast goods turn over helps businesses balance stock availability against working capital efficiency.\n\nThe Inventory Turnover Calculator uses annual Cost of Goods Sold (COGS) and your beginning and ending inventory balances to compute Average Inventory, Annual Inventory Turnover Ratio, and Days Sales of Inventory (DSI).',
    howItWorks: {
      summary:
        'The tool averages beginning and ending inventory to smooth balance-sheet fluctuations, divides COGS by average inventory for turnover count, and divides 365 days by turnover to show average shelf days.',
      steps: [
        {
          title: '1. Compute Average Inventory Value',
          detail: 'Takes the midpoint of Beginning Inventory and Ending Inventory across the 12-month period.'
        },
        {
          title: '2. Calculate Inventory Turnover Ratio',
          detail: 'Divides annual COGS by Average Inventory (not total sales revenue, keeping cost valuation consistent).'
        },
        {
          title: '3. Convert to Days Sales of Inventory (DSI)',
          detail: 'Divides 365 days by the Turnover Ratio to show how many days stock sits before selling.'
        }
      ],
      keyAssumptions: [
        'Beginning and ending inventory fairly represent average inventory levels over the year.',
        'COGS and inventory balances are valued using consistent accounting methods (FIFO, LIFO, or weighted average).'
      ]
    },
    formula: {
      title: 'Inventory Turnover & DSI Formulas',
      equation: 'Turnover = COGS / [(Beg + End) / 2] | DSI = 365 / Turnover',
      variables: [
        { symbol: 'COGS', name: 'Cost of Goods Sold', description: 'Annual direct cost of inventory sold during the period', unit: 'Currency ($)' },
        { symbol: 'Beg / End', name: 'Beginning & Ending Inventory', description: 'Inventory cost value at start and end of period', unit: 'Currency ($)' },
        { symbol: 'DSI', name: 'Days Sales of Inventory', description: 'Average number of days inventory is held before sale', unit: 'Days' }
      ],
      explanation:
        'Using COGS rather than retail revenue avoids distorting turnover with retail markup changes, directly comparing cost moved against cost held.'
    },
    examples: [
      {
        title: 'E-Commerce Warehouse Turnover Check',
        scenario: 'An online retailer records $365,000 in annual COGS, with $45,000 beginning inventory and $55,000 ending inventory.',
        inputs: {
          'Annual COGS': '$365,000',
          'Beginning Inventory': '$45,000',
          'Ending Inventory': '$55,000'
        },
        steps: [
          'Average Inventory = ($45,000 + $55,000) / 2 = $50,000',
          'Inventory Turnover = $365,000 / $50,000 = 7.30 turns/year',
          'Days Sales of Inventory (DSI) = 365 / 7.30 = 50.0 days'
        ],
        result: 'Turnover: 7.30x/year | DSI: 50.0 Days',
        takeaway: 'Stock cycles completely roughly every 50 days, freeing working capital faster than slower-turning 3x–4x benchmarks.'
      }
    ],
    understandingResults:
      'Higher turnover (and lower DSI) generally signals strong sales velocity and lean working capital, though excessively high turnover can warn of frequent stockouts and lost sales. Always compare your turnover against peers in the same industry—grocery stores turn inventory 15x+ per year, while luxury jewelry may turn 1x–2x.',
    useCases: [
      {
        title: 'Working Capital & Reorder Planning',
        description: 'Spot bloated SKUs tying up cash before peak ordering seasons.',
        targetAudience: 'Operations Managers & Retailers',
        benefits: ['Frees trapped warehouse cash', 'Reduces dead-stock write-offs', 'Optimizes safety stock days']
      }
    ],
    faqs: [
      {
        question: 'Why divide COGS by Average Inventory instead of Revenue?',
        answer: 'Inventory on the balance sheet is recorded at cost, not retail selling price. Dividing COGS (at cost) by inventory (at cost) ensures both numerator and denominator match.'
      },
      {
        question: 'When can simple beginning/ending average be misleading?',
        answer: 'For highly seasonal businesses where year-end inventory is unusually depleted or stocked up, averaging 12 monthly ending balances gives a cleaner figure.'
      }
    ],
    importantNotes: [
      'A high turnover ratio caused by chronic under-stocking can hurt customer retention just as excess stock hurts cash flow.'
    ]
  },

  'ebitda-calculator': {
    introduction:
      'When buyers, lenders, or private equity analysts compare two companies with different debt loads, tax structures, or equipment depreciation schedules, net income can be distorted by financing and non-cash accounting charges. EBITDA—Earnings Before Interest, Taxes, Depreciation, and Amortization—strips those items away to reveal core operating cash generation.\n\nThe EBITDA Calculator computes Gross Profit, Operating Income (EBIT), total EBITDA, and EBITDA Margin % directly from revenue, COGS, operating expenses, depreciation, and amortization.',
    howItWorks: {
      summary:
        'The calculator derives Gross Profit and EBIT along the income statement, then adds back non-cash depreciation and amortization charges to yield EBITDA and EBITDA Margin.',
      steps: [
        {
          title: '1. Compute Gross Profit',
          detail: 'Subtracts direct Cost of Goods Sold (COGS) from total Revenue.'
        },
        {
          title: '2. Calculate Operating Income (EBIT)',
          detail: 'Subtracts Selling, General & Administrative (SG&A) and operating expenses from Gross Profit.'
        },
        {
          title: '3. Add Back Depreciation & Amortization',
          detail: 'Adds non-cash equipment depreciation and intangible asset amortization to EBIT to produce EBITDA.'
        },
        {
          title: '4. Compute EBITDA Margin %',
          detail: 'Divides EBITDA by total Revenue and multiplies by 100 to measure core operating profitability.'
        }
      ],
      keyAssumptions: [
        'Operating Expenses entered include Depreciation and Amortization expenses (following standard GAAP/IFRS reporting before add-back).',
        'Interest and income taxes are excluded from Operating Income (EBIT).'
      ]
    },
    formula: {
      title: 'EBIT & EBITDA Equations',
      equation: 'EBITDA = (Revenue - COGS - Operating Expenses) + Depreciation + Amortization',
      variables: [
        { symbol: 'EBIT', name: 'Operating Income', description: 'Gross Profit minus Operating Expenses', unit: 'Currency ($)' },
        { symbol: 'D&A', name: 'Depreciation & Amortization', description: 'Non-cash write-downs of physical equipment and intangible assets', unit: 'Currency ($)' },
        { symbol: 'EBITDA Margin', name: 'Operating Cash Margin', description: '(EBITDA / Revenue) × 100', unit: '%' }
      ],
      explanation:
        'Adding Depreciation and Amortization back to EBIT approximates operating cash flow before working capital swings, debt interest, taxes, and capital expenditures.'
    },
    examples: [
      {
        title: 'Mid-Market Manufacturing EBITDA',
        scenario: 'A company records $1,200,000 revenue, $500,000 COGS, $400,000 operating expenses, $45,000 depreciation, and $15,000 amortization.',
        inputs: {
          'Total Revenue': '$1,200,000',
          'COGS': '$500,000',
          'Operating Expenses': '$400,000',
          'Depreciation + Amortization': '$45,000 + $15,000'
        },
        steps: [
          'Gross Profit = $1,200,000 - $500,000 = $700,000',
          'Operating Income (EBIT) = $700,000 - $400,000 = $300,000',
          'EBITDA = $300,000 + $45,000 + $15,000 = $360,000',
          'EBITDA Margin = ($360,000 / $1,200,000) × 100 = 30.0%'
        ],
        result: 'EBITDA: $360,000 | EBIT: $300,000 | EBITDA Margin: 30.0%',
        takeaway: 'Adding back $60,000 in non-cash D&A reveals a 30.0% operating cash margin used in common EV/EBITDA business valuations.'
      }
    ],
    understandingResults:
      'EBITDA Margin allows fair benchmarking across competitors regardless of debt structure. However, remember that capital-intensive businesses must still spend real cash replacing worn machinery—so EBITDA should not be mistaken for free cash flow when CapEx is high.',
    useCases: [
      {
        title: 'Business Valuation & Exit Prep',
        description: 'Prepare clean EBITDA and margin figures before applying industry valuation multiples.',
        targetAudience: 'Business Owners & M&A Analysts',
        benefits: ['Standardized valuation basis', 'Separates EBIT vs EBITDA', 'Highlights operating efficiency']
      }
    ],
    faqs: [
      {
        question: 'What is the difference between EBIT and EBITDA?',
        answer: 'EBIT (Operating Income) already reflects depreciation and amortization expenses. EBITDA adds those non-cash expenses back.'
      },
      {
        question: 'When can EBITDA be misleading?',
        answer: 'In asset-heavy industries like trucking, manufacturing, or telecom, ongoing capital expenditures (CapEx) consume real cash that EBITDA ignores.'
      }
    ],
    importantNotes: [
      'Ensure Depreciation & Amortization are already deducted inside your Operating Expenses figure before adding them back, otherwise they will be double-counted.'
    ]
  },

  'burn-rate-calculator': {
    introduction:
      'For startups and pre-profit growth companies, cash runway is the single most critical survival metric. Knowing how fast cash reserves shrink each month gives founders lead time to cut expenses, accelerate revenue, or close a funding round before bank balances run dangerously low.\n\nThe Startup Burn Rate & Cash Runway Calculator distinguishes between Gross Burn (total monthly spending) and Net Burn (spending minus monthly revenue), calculating your exact cash runway in months and flagging safe vs. urgent cash zones.',
    howItWorks: {
      summary:
        'The calculator subtracts recurring monthly revenue from total monthly operating expenses to derive Net Burn, then divides current cash balance by Net Burn to determine remaining runway months.',
      steps: [
        {
          title: '1. Measure Gross Monthly Burn',
          detail: 'Uses total monthly cash expenses (payroll, rent, cloud, marketing) as Gross Burn.'
        },
        {
          title: '2. Compute Net Monthly Burn',
          detail: 'Subtracts monthly cash revenue from monthly expenses; negative Net Burn indicates cash-flow profitability.'
        },
        {
          title: '3. Derive Cash Runway Months',
          detail: 'Divides current cash on hand by Net Burn (or reports infinite runway when revenue meets or exceeds expenses).'
        }
      ],
      keyAssumptions: [
        'Monthly revenue and operating expenses remain roughly constant across the runway horizon.',
        'Does not model lump-sum future tax bills, severance costs, or receivable collection delays.'
      ]
    },
    formula: {
      title: 'Net Burn Rate & Runway Equations',
      equation: 'Net Burn = Monthly Expenses - Monthly Revenue | Runway = Cash Balance / Net Burn',
      variables: [
        { symbol: 'Gross Burn', name: 'Total Monthly Outflow', description: 'Total operating cash spent per month', unit: 'Currency ($/mo)' },
        { symbol: 'Net Burn', name: 'Net Cash Loss', description: 'Monthly cash deficit after subtracting monthly revenue', unit: 'Currency ($/mo)' },
        { symbol: 'Runway', name: 'Cash Runway', description: 'Months until cash reserves reach zero if Net Burn > 0', unit: 'Months' }
      ],
      explanation:
        'When Monthly Revenue exceeds Monthly Expenses, Net Burn is negative (cash-flow positive) and runway becomes infinite (self-sustaining).'
    },
    examples: [
      {
        title: 'Seed-Stage Startup Runway Check',
        scenario: 'A startup holds $450,000 in the bank, spends $75,000/month across payroll and infrastructure, and brings in $30,000/month in revenue.',
        inputs: {
          'Cash Balance': '$450,000',
          'Monthly Expenses (Gross Burn)': '$75,000',
          'Monthly Revenue': '$30,000'
        },
        steps: [
          'Gross Burn = $75,000/month',
          'Net Burn = $75,000 - $30,000 = $45,000/month',
          'Cash Runway = $450,000 / $45,000 = 10.0 months'
        ],
        result: 'Net Burn: $45,000/mo | Cash Runway: 10.0 Months',
        takeaway: 'Because fundraising commonly takes 4 to 6 months, a 10-month runway signals it is time to begin investor outreach or trim burn immediately.'
      }
    ],
    understandingResults:
      'Founders generally aim to maintain 12 to 18+ months of cash runway to stay in a comfortable operating window. Dropping below 6 months ("Red Zone") leaves little buffer for missed sales targets or slow investor diligence.',
    useCases: [
      {
        title: 'Board Reporting & Fundraising Timing',
        description: 'Plan when to start raising a bridge or Series A round well ahead of cash depletion.',
        targetAudience: 'Startup Founders & CFOs',
        benefits: ['Clear cash-zero horizon', 'Tests hiring vs runway tradeoffs', 'Separates gross vs net burn']
      }
    ],
    faqs: [
      {
        question: 'What is the difference between Gross Burn and Net Burn?',
        answer: 'Gross Burn is total cash spent per month; Net Burn is total cash spent minus cash revenue collected. Net Burn determines your actual runway.'
      },
      {
        question: 'How much runway should a startup keep before fundraising?',
        answer: 'Most advisors recommend starting a new funding round with at least 9 to 12 months of runway remaining so the company negotiates from strength.'
      }
    ],
    importantNotes: [
      'Always use cash-basis collections rather than booked annual contracts paid monthly when assessing immediate bank runway.'
    ]
  }
};
