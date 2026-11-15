import { CalculatorExplanation } from '../../types';

export const FINANCIAL_EXPLANATIONS: Record<string, CalculatorExplanation> = {
  'auto-loan-calculator': {
    introduction:
      'Financing a vehicle involves more than negotiating the sticker price. Sales tax, title and registration fees, down payments, and trade-in equity (or negative equity from an existing loan) all change the actual principal you borrow.\n\nThe Auto Loan Calculator helps you estimate your monthly car payment, out-the-door price, and total lifetime interest before visiting a dealership. It is useful for comparing loan terms (such as 48 vs. 60 or 72 months), testing larger down payments, and evaluating whether a dealer financing offer fits your monthly budget.',
    howItWorks: {
      summary:
        'The calculator computes your taxable vehicle price after subtracting net trade-in equity, adds sales tax and dealership fees to find the out-the-door price, subtracts your down payment and trade-in credit to determine the financed principal, and applies standard fixed-rate loan amortization.',
      steps: [
        {
          title: '1. Enter Vehicle Price, Tax & Fees',
          detail: 'Input the negotiated vehicle price, your local sales tax percentage, and title or registration fees.'
        },
        {
          title: '2. Apply Down Payment & Trade-In',
          detail: 'Enter any cash down payment, trade-in allowance, and remaining balance owed on your trade-in vehicle.'
        },
        {
          title: '3. Choose APR & Term Length',
          detail: 'Specify the annual interest rate (APR) and loan duration in months (for example, 36, 48, 60, or 72 months).'
        },
        {
          title: '4. Review Payment & Total Cost',
          detail: 'Inspect the monthly payment, financed loan principal, total interest paid, and total out-of-pocket vehicle cost.'
        }
      ],
      keyAssumptions: [
        'Interest rate remains fixed for the full auto loan term.',
        'Net trade-in equity (trade-in value minus amount owed) reduces taxable price where applicable.',
        'Payments are made monthly with no prepayment penalties or late fees.'
      ]
    },
    formula: {
      title: 'Auto Loan Financed Principal & Monthly Payment Formula',
      equation: 'M = P × [ r(1 + r)^n ] / [ (1 + r)^n - 1 ]',
      variables: [
        { symbol: 'M', name: 'Monthly Payment', description: 'Fixed monthly principal and interest payment', unit: 'Currency ($)' },
        { symbol: 'P', name: 'Financed Principal', description: 'Vehicle Price + Sales Tax + Fees - Down Payment - Net Trade-In', unit: 'Currency ($)' },
        { symbol: 'r', name: 'Monthly Interest Rate', description: 'Annual APR divided by 12 (e.g., 6.0% / 12 = 0.005)', unit: 'Decimal' },
        { symbol: 'n', name: 'Loan Term', description: 'Number of monthly installment payments', unit: 'Months' }
      ],
      explanation:
        'First, net trade-in value reduces the taxable amount, and sales tax plus title fees are added to form the out-the-door cost. Subtracting your down payment and net trade-in yields P, which is amortized over n months at rate r.'
    },
    examples: [
      {
        title: '60-Month Car Loan with Trade-In',
        scenario: 'A buyer purchases a $35,000 SUV with $5,000 down, a $2,000 paid-off trade-in, 6.5% sales tax, $850 in title/fees, and a 6.0% APR for 60 months.',
        inputs: {
          'Vehicle Price': '$35,000',
          'Down Payment': '$5,000',
          'Net Trade-In': '$2,000',
          'Sales Tax & Fees': '6.5% + $850',
          'APR / Term': '6.0% / 60 mos'
        },
        steps: [
          'Taxable price = $35,000 - $2,000 = $33,000; Sales tax = $33,000 × 6.5% = $2,145',
          'Out-the-door price = $35,000 + $2,145 + $850 = $37,995',
          'Financed principal (P) = $37,995 - $5,000 - $2,000 = $30,995',
          'Monthly rate (r) = 0.06 / 12 = 0.005; M = $30,995 × [0.005(1.005)^60] / [(1.005)^60 - 1] = $599.22'
        ],
        result: 'Monthly Payment: $599.22 | Total Interest: $4,958.20',
        takeaway: 'Shorter loan terms increase monthly payments slightly but substantially reduce total interest paid on a depreciating asset.'
      }
    ],
    understandingResults:
      'Focus on both the monthly payment and the Total Interest Paid. Longer terms (72 or 84 months) lower the monthly payment but keep you owing more than the car is worth for longer while adding thousands in extra interest. Compare the out-the-door financed amount across lenders before signing.',
    useCases: [
      {
        title: 'Dealership Offer Comparison',
        description: 'Verify dealer monthly quotes and spot added fees or marked-up interest rates before signing.',
        targetAudience: 'Car Buyers',
        benefits: ['Accurate out-the-door budgeting', 'Compare 48 vs. 60 vs. 72-month terms', 'Avoid negative equity']
      },
      {
        title: 'Pre-Approval Budgeting',
        description: 'Test how different down payments and trade-in values change your target vehicle budget.',
        targetAudience: 'Auto Shoppers',
        benefits: ['Set realistic price ceilings', 'Optimize down payment size', 'Estimate total ownership financing cost']
      }
    ],
    faqs: [
      {
        question: 'Does a trade-in reduce sales tax?',
        answer: 'In most U.S. states, sales tax is calculated on the vehicle price minus the trade-in allowance. Some states tax the full purchase price—check your local DMV rules.'
      },
      {
        question: 'What happens if I owe more on my trade-in than it is worth?',
        answer: 'Negative equity (when amount owed exceeds trade-in value) reduces your net trade-in credit to zero or rolls the remaining balance into the new loan, increasing your financed principal.'
      },
      {
        question: 'What is a good auto loan term length?',
        answer: 'Financial planners generally recommend 36 to 60 months so you build equity faster than the vehicle depreciates.'
      }
    ],
    importantNotes: [
      'Auto insurance, fuel, and maintenance costs are not included in the monthly loan payment.',
      'Manufacturer 0% APR promotions may forfeit cash-back rebates; compare total cost both ways.'
    ]
  },

  'personal-loan-calculator': {
    introduction:
      'Unsecured personal loans are commonly used for debt consolidation, home repairs, medical expenses, or major purchases without collateral. However, many lenders deduct an upfront origination fee from your loan proceeds while charging interest on the full face amount.\n\nThe Personal Loan Calculator estimates your monthly installment, net cash received after origination fees, total interest paid, and true effective APR so you can compare lenders on an apples-to-apples basis.',
    howItWorks: {
      summary:
        'The calculator computes your fixed monthly payment on the full loan amount using standard amortization, subtracts any origination fee to find your net cash proceeds, and solves for the effective APR using Newton-Raphson root-finding.',
      steps: [
        {
          title: '1. Enter Loan Amount & Credit Tier',
          detail: 'Specify the requested loan principal and review typical rate expectations based on credit profile.'
        },
        {
          title: '2. Set Interest Rate, Term & Origination Fee',
          detail: 'Input the quoted nominal interest rate, repayment term in months, and any upfront origination fee percentage.'
        },
        {
          title: '3. Compute Payment & Net Proceeds',
          detail: 'The tool calculates the fixed monthly payment and subtracts the origination fee from the disbursed cash.'
        },
        {
          title: '4. Inspect Effective APR',
          detail: 'Review the true APR reflecting both the interest rate and upfront origination cost.'
        }
      ],
      keyAssumptions: [
        'Origination fees are deducted from initial loan proceeds rather than paid separately out of pocket.',
        'The interest rate is fixed over the chosen term with equal monthly payments.'
      ]
    },
    formula: {
      title: 'Amortized Payment & Effective APR Equations',
      equation: 'M = P × [ r(1 + r)^n ] / [ (1 + r)^n - 1 ]  |  Net Proceeds = P × (1 - f)',
      variables: [
        { symbol: 'M', name: 'Monthly Payment', description: 'Fixed monthly payment based on full principal P', unit: 'Currency ($)' },
        { symbol: 'P', name: 'Loan Amount', description: 'Gross face value of the personal loan', unit: 'Currency ($)' },
        { symbol: 'r', name: 'Monthly Interest Rate', description: 'Nominal annual rate divided by 12', unit: 'Decimal' },
        { symbol: 'n', name: 'Term Length', description: 'Total monthly payments', unit: 'Months' },
        { symbol: 'f', name: 'Origination Fee Rate', description: 'Upfront lender fee percentage as a decimal', unit: 'Decimal' }
      ],
      explanation:
        'Because your monthly payment M services the full principal P while you only receive P(1 - f) in cash, the true borrowing rate (effective APR) is the annualized rate r_eff that equates the present value of all M payments to Net Proceeds.'
    },
    examples: [
      {
        title: 'Personal Loan with 3% Origination Fee',
        scenario: 'A borrower takes a $15,000 personal loan at 12.0% interest for 36 months with a 3% origination fee.',
        inputs: {
          'Loan Amount': '$15,000',
          'Interest Rate': '12.0%',
          'Loan Term': '36 months',
          'Origination Fee': '3.0%'
        },
        steps: [
          'Origination fee = $15,000 × 3% = $450; Net cash received = $15,000 - $450 = $14,550',
          'Monthly rate (r) = 0.12 / 12 = 0.01',
          'Monthly payment (M) = $15,000 × [0.01(1.01)^36] / [(1.01)^36 - 1] = $498.21',
          'Total repaid = $498.21 × 36 = $17,935.56 (Total interest = $2,935.56)'
        ],
        result: 'Monthly Payment: $498.21 | Net Cash: $14,550 | Effective APR: 14.13%',
        takeaway: 'A 3% origination fee raises the true borrowing cost from 12.00% nominal interest to an effective 14.13% APR.'
      }
    ],
    understandingResults:
      'Always compare the Effective APR rather than the headline interest rate when evaluating personal loans. If you need exactly $15,000 in cash after a 3% origination fee, you will need to borrow slightly more to cover the upfront deduction. Also check whether the total repaid fits comfortably within your debt-to-income budget.',
    useCases: [
      {
        title: 'Credit Card Consolidation',
        description: 'Determine whether an installment loan with an origination fee still beats revolving card APRs.',
        targetAudience: 'Debt Consolidators',
        benefits: ['Uncover hidden fee impact', 'Lock in a fixed payoff date', 'Compare lender quotes accurately']
      },
      {
        title: 'Home Improvement Financing',
        description: 'Budget predictable monthly installments for renovations without tapping home equity.',
        targetAudience: 'Homeowners',
        benefits: ['No collateral required', 'Clear total interest cost', 'Fast term comparisons']
      }
    ],
    faqs: [
      {
        question: 'Why is the Effective APR higher than the interest rate?',
        answer: 'Because the origination fee reduces the cash you receive upfront while your monthly payments still repay the full gross loan amount plus interest.'
      },
      {
        question: 'How does my credit score affect personal loan rates?',
        answer: 'Borrowers with Good to Excellent credit typically qualify for lower APRs and lower or zero origination fees, while fair-credit loans often carry higher rates and 3%–8% fees.'
      }
    ],
    importantNotes: [
      'Verify with your lender whether prepayment penalties apply before paying off a personal loan early.',
      'Late payment fees are not included in effective APR estimates.'
    ]
  },

  'interest-calculator': {
    introduction:
      'Understanding the difference between simple interest and compound interest is essential for evaluating loans, savings accounts, certificates of deposit, and bonds. Simple interest grows linearly on the original principal alone, whereas compound interest earns interest on previously accumulated interest.\n\nThe Interest Calculator lets you compare simple interest side-by-side with daily, monthly, quarterly, or annual compounding over any time horizon, and estimates how quickly your money doubles using the Rule of 72.',
    howItWorks: {
      summary:
        'The tool evaluates both the linear simple-interest equation and the exponential compounding formula across your chosen principal, annual rate, time period, and compounding frequency, then builds a year-by-year growth comparison.',
      steps: [
        {
          title: '1. Enter Principal & Interest Rate',
          detail: 'Input your starting deposit or loan principal and the annual nominal interest rate.'
        },
        {
          title: '2. Set Time Period & Compounding Frequency',
          detail: 'Specify the duration in years and choose how often interest compounds (annually, semi-annually, quarterly, monthly, or daily).'
        },
        {
          title: '3. Compare Simple vs. Compound Growth',
          detail: 'Review the dollar advantage earned from compounding, total ending balance, and Rule of 72 doubling estimate.'
        }
      ],
      keyAssumptions: [
        'No additional deposits or withdrawals occur after the initial principal.',
        'The nominal annual interest rate remains constant throughout the period.'
      ]
    },
    formula: {
      title: 'Simple Interest vs. Compound Interest Formulas',
      equation: 'Simple: I = P × r × t  |  Compound: A = P(1 + r/n)^(nt)',
      variables: [
        { symbol: 'P', name: 'Principal', description: 'Starting investment or loan amount', unit: 'Currency ($)' },
        { symbol: 'r', name: 'Annual Interest Rate', description: 'Nominal annual rate in decimal form', unit: 'Decimal' },
        { symbol: 't', name: 'Time', description: 'Duration in years', unit: 'Years' },
        { symbol: 'n', name: 'Compounding Periods', description: 'Number of times interest compounds per year (e.g., 12 for monthly, 365 for daily)', unit: 'Count/yr' },
        { symbol: 'A', name: 'Compound Total', description: 'Total future balance including principal and compound interest', unit: 'Currency ($)' }
      ],
      explanation:
        'Simple interest adds a fixed P×r amount every year. Compound interest applies the periodic rate r/n to the growing balance n×t times, creating exponential acceleration over longer horizons.'
    },
    examples: [
      {
        title: '10-Year Simple vs. Monthly Compound Growth',
        scenario: 'Compare $10,000 invested at a 5% annual rate for 10 years under simple interest versus monthly compounding.',
        inputs: {
          'Principal (P)': '$10,000',
          'Annual Rate (r)': '5.0%',
          'Time (t)': '10 Years',
          'Compounding (n)': 'Monthly (12)'
        },
        steps: [
          'Simple interest = $10,000 × 0.05 × 10 = $5,000.00 (Total: $15,000.00)',
          'Compound total = $10,000 × (1 + 0.05/12)^(12×10) = $10,000 × (1.004167)^120 = $16,470.09',
          'Compound interest earned = $16,470.09 - $10,000 = $6,470.09',
          'Compounding advantage = $6,470.09 - $5,000.00 = $1,470.09'
        ],
        result: 'Compound Balance: $16,470.09 vs. Simple Balance: $15,000.00 (+$1,470.09 extra)',
        takeaway: 'Even at a moderate 5% rate, monthly compounding generates nearly 30% more interest than simple interest over 10 years.'
      }
    ],
    understandingResults:
      'Look at the "Compounding Advantage" figure to see how much extra interest comes strictly from interest earning interest. Over short periods (1–2 years), simple and compound totals stay close, but over decades the gap widens dramatically. The Rule of 72 value (72 ÷ rate) gives a quick mental benchmark for how many years it takes to double your principal.',
    useCases: [
      {
        title: 'Comparing Savings & CD Offers',
        description: 'Evaluate how daily versus monthly or quarterly compounding changes total yield.',
        targetAudience: 'Savers & Investors',
        benefits: ['Quantify compounding frequency impact', 'Verify bank APY claims', 'Project lump-sum growth']
      },
      {
        title: 'Evaluating Simple-Interest Loans',
        description: 'Understand interest accrual on short-term notes or personal agreements.',
        targetAudience: 'Students & Borrowers',
        benefits: ['Clear year-by-year breakdown', 'Visualize linear vs. exponential curves', 'Quick Rule of 72 checks']
      }
    ],
    faqs: [
      {
        question: 'Does daily compounding earn much more than monthly compounding?',
        answer: 'The difference between monthly and daily compounding is modest compared to the jump from simple to compound interest, though daily compounding always produces a slightly higher effective annual yield (APY).'
      },
      {
        question: 'When is simple interest used in the real world?',
        answer: 'Simple interest is common in short-term personal notes, certain auto loans, Treasury bills, and non-reinvesting coupon bonds.'
      }
    ],
    importantNotes: [
      'Taxes on interest income and inflation are excluded from nominal interest figures.',
      'Higher compounding frequency works against you on debt and in your favor on savings.'
    ]
  },

  'investment-calculator': {
    introduction:
      'Long-term investing relies on three levers: starting capital, consistent recurring contributions, and average annual return—alongside the silent drag of inflation. Seeing nominal future balances alone can overstate future lifestyle purchasing power.\n\nThe Investment Calculator projects your portfolio growth over years or decades with regular monthly contributions and includes an optional inflation adjustment to show both your nominal ending balance and its real purchasing power in today’s dollars.',
    howItWorks: {
      summary:
        'The calculator compounds your initial investment and monthly deposits month by month at your expected annual rate of return, then optionally discounts the projected balance by your expected annual inflation rate.',
      steps: [
        {
          title: '1. Enter Initial Capital & Monthly Contribution',
          detail: 'Input your starting portfolio balance and the amount you plan to invest each month.'
        },
        {
          title: '2. Set Time Horizon & Expected Return',
          detail: 'Choose your investing duration in years and your expected annualized return percentage.'
        },
        {
          title: '3. Enable Optional Inflation Adjustment',
          detail: 'Toggle inflation adjustment and set an annual CPI assumption (for example, 2.5%) to inspect real purchasing power.'
        },
        {
          title: '4. Compare Contributions vs. Investment Gains',
          detail: 'Review nominal ending value, total principal contributed, investment earnings, and inflation-adjusted real value.'
        }
      ],
      keyAssumptions: [
        'Returns are compounded monthly based on the specified annual return.',
        'Inflation adjustment discounts future nominal dollars using (1 + inflation)^t.'
      ]
    },
    formula: {
      title: 'Future Portfolio Value & Inflation-Adjusted Real Value',
      equation: 'FV = P(1 + r/12)^(12t) + PMT × [((1 + r/12)^(12t) - 1) / (r/12)]  |  Real Value = FV / (1 + i)^t',
      variables: [
        { symbol: 'FV', name: 'Nominal Future Value', description: 'Projected portfolio balance before adjusting for inflation', unit: 'Currency ($)' },
        { symbol: 'P', name: 'Initial Investment', description: 'Starting lump-sum capital', unit: 'Currency ($)' },
        { symbol: 'PMT', name: 'Monthly Contribution', description: 'Recurring monthly deposit', unit: 'Currency ($)' },
        { symbol: 'r', name: 'Expected Annual Return', description: 'Annual nominal return rate as a decimal', unit: 'Decimal' },
        { symbol: 't', name: 'Time Horizon', description: 'Investment duration in years', unit: 'Years' },
        { symbol: 'i', name: 'Annual Inflation Rate', description: 'Expected annual inflation rate used to compute today’s-dollar purchasing power', unit: 'Decimal' }
      ],
      explanation:
        'The future value sums the compounded growth of your starting lump sum and the annuity stream of monthly contributions. Dividing by (1 + i)^t translates that future balance into equivalent purchasing power today.'
    },
    examples: [
      {
        title: '10-Year Portfolio with Inflation Adjustment',
        scenario: 'An investor starts with $20,000, contributes $500/month for 10 years, earns a 6% annual return, and assumes 2.5% annual inflation.',
        inputs: {
          'Initial Investment': '$20,000',
          'Monthly Contribution': '$500',
          'Duration': '10 Years (120 mos)',
          'Annual Return': '6.0%',
          'Inflation Rate': '2.5%'
        },
        steps: [
          'Lump-sum growth = $20,000 × (1 + 0.06/12)^120 = $20,000 × 1.819397 = $36,387.93',
          'Contributions growth = $500 × [(1.819397 - 1) / 0.005] = $81,939.67',
          'Nominal ending balance = $36,387.93 + $81,939.67 = $118,327.60 (Total contributed: $80,000)',
          'Real value in today’s dollars = $118,327.60 / (1.025)^10 = $92,437.34'
        ],
        result: 'Nominal Value: $118,328 | Real Value (2.5% Inflation): $92,437',
        takeaway: 'Adjusting for inflation reveals that $118,328 in 10 years buys roughly what $92,437 buys today.'
      }
    ],
    understandingResults:
      'Compare Total Contributions against Investment Gains to see how much heavy lifting compounding does over your timeline. When planning for distant milestones (15+ years away), rely on the inflation-adjusted real balance so you do not underestimate the future cost of living.',
    useCases: [
      {
        title: 'Wealth Building & Brokerage Projections',
        description: 'Model index-fund or diversified portfolio growth across 5- to 30-year horizons.',
        targetAudience: 'Individual Investors',
        benefits: ['Visualize nominal vs. real returns', 'Test contribution increases', 'Track principal-to-gain ratio']
      },
      {
        title: 'Education & Major Goal Funding',
        description: 'Estimate how monthly deposits accumulate toward college tuition or future business capital.',
        targetAudience: 'Families & Planners',
        benefits: ['Inflation-aware goal sizing', 'Clear year-by-year milestones', 'Scenario stress-testing']
      }
    ],
    faqs: [
      {
        question: 'Should I turn on inflation adjustment?',
        answer: 'Yes for long-term planning (5+ years). Real purchasing power prevents overestimating how far a future nominal balance will stretch.'
      },
      {
        question: 'Are market returns guaranteed to stay constant at 7%–8%?',
        answer: 'No. Market returns fluctuate year to year; calculators use a constant average annualized return for baseline modeling.'
      }
    ],
    importantNotes: [
      'Capital gains taxes, dividend taxes, and fund expense ratios are not deducted automatically—subtract estimated fees from your expected return.',
      'Historical market averages do not guarantee future performance.'
    ]
  },

  'savings-calculator': {
    introduction:
      'Whether you are saving for a home down payment, a wedding, or an emergency reserve, knowing either how much you need to set aside each month or what your current savings habit will yield takes the guesswork out of budgeting.\n\nThe Savings Calculator supports two modes: solving for the required monthly deposit to hit a specific dollar goal by a deadline, or projecting the future balance produced by your current monthly savings in a high-yield account.',
    howItWorks: {
      summary:
        'Using monthly compounding based on your account’s Annual Percentage Yield (APY), the calculator solves the annuity equation either forward (for Future Balance) or backward (for Required Monthly Contribution).',
      steps: [
        {
          title: '1. Select Calculation Mode',
          detail: 'Choose "Find Monthly Deposit" to hit a savings target, or "Find Future Balance" to project current savings habits.'
        },
        {
          title: '2. Enter Initial Balance & Target/Contribution',
          detail: 'Provide your starting savings and either your target goal amount or your planned monthly contribution.'
        },
        {
          title: '3. Set Timeline & Account APY',
          detail: 'Enter the number of years and your savings account APY (for example, 4.5% for a high-yield savings account).'
        },
        {
          title: '4. Review Principal vs. Earned Interest',
          detail: 'See your exact monthly deposit target (or future balance) and how much of the total comes from compound interest.'
        }
      ],
      keyAssumptions: [
        'Interest compounds monthly at APY / 12 with contributions made consistently each month.',
        'APY remains constant over the selected savings horizon.'
      ]
    },
    formula: {
      title: 'Savings Goal & Future Balance Equations',
      equation: 'PMT = [ FV - P(1 + r)^n ] / [ ((1 + r)^n - 1) / r ]  |  FV = P(1 + r)^n + PMT × [ ((1 + r)^n - 1) / r ]',
      variables: [
        { symbol: 'FV', name: 'Target / Future Balance', description: 'Desired savings goal or projected ending balance', unit: 'Currency ($)' },
        { symbol: 'P', name: 'Initial Savings', description: 'Starting deposit already saved', unit: 'Currency ($)' },
        { symbol: 'PMT', name: 'Monthly Contribution', description: 'Amount saved each month', unit: 'Currency ($)' },
        { symbol: 'r', name: 'Monthly Interest Rate', description: 'Annual APY divided by 12', unit: 'Decimal' },
        { symbol: 'n', name: 'Total Months', description: 'Savings timeline in years multiplied by 12', unit: 'Months' }
      ],
      explanation:
        'In target mode, the calculator grows your starting balance P over n months, subtracts it from your goal FV, and divides the remaining gap by the monthly annuity factor to find PMT.'
    },
    examples: [
      {
        title: 'Saving $25,000 in 3 Years',
        scenario: 'A saver starts with $5,000 in a 4.5% APY high-yield savings account and wants $25,000 in 3 years (36 months).',
        inputs: {
          'Savings Goal (FV)': '$25,000',
          'Initial Savings (P)': '$5,000',
          'Timeline': '3 Years (36 mos)',
          'APY': '4.5%'
        },
        steps: [
          'Monthly rate (r) = 0.045 / 12 = 0.00375',
          'Initial $5,000 future value = $5,000 × (1.00375)^36 = $5,721.24',
          'Remaining goal needed from contributions = $25,000 - $5,721.24 = $19,278.76',
          'Annuity factor = ((1.00375)^36 - 1) / 0.00375 = 38.4661; Required PMT = $19,278.76 / 38.4661 = $501.19/mo'
        ],
        result: 'Required Monthly Savings: $501.19 | Total Interest Earned: $1,957.16',
        takeaway: 'Earning 4.5% APY contributes nearly $2,000 toward the $25,000 goal without extra out-of-pocket deposits.'
      }
    ],
    understandingResults:
      'In goal-seeking mode, the required monthly contribution tells you the exact automated transfer to set up each payday. If that monthly figure exceeds your budget, extend the timeline or start with a higher-yield account. Check the "Interest Earned" share to see how much yield accelerates your timeline.',
    useCases: [
      {
        title: 'Down Payment & Car Fund Planning',
        description: 'Calculate the exact monthly transfer needed to reach a purchase target by a specific year.',
        targetAudience: 'Home & Car Savers',
        benefits: ['Actionable monthly transfer target', 'See impact of HYSA interest', 'Track total principal vs. yield']
      },
      {
        title: 'Emergency Reserve Building',
        description: 'Project how quickly steady monthly savings build a multi-month cash safety net.',
        targetAudience: 'Households',
        benefits: ['Test multiple timelines', 'Visualize compound interest boost', 'Zero risk of under-saving']
      }
    ],
    faqs: [
      {
        question: 'What is the difference between APR and APY on savings?',
        answer: 'APY (Annual Percentage Yield) reflects the effective annual return including compounding, while APR is the base nominal rate without compounding.'
      },
      {
        question: 'Can I still reach my goal if interest rates drop?',
        answer: 'If bank APYs decline, your earned interest falls slightly, meaning you will need a marginally higher monthly deposit or a few extra months to reach the same target.'
      }
    ],
    importantNotes: [
      'Interest earned in taxable savings accounts is generally subject to income tax.',
      'High-yield savings rates are variable and can change with central bank policy.'
    ]
  },

  'retirement-calculator': {
    introduction:
      'Planning for retirement requires balancing two distinct phases: accumulating assets during your working years and drawing down your nest egg reliably once paychecks stop. A small shortfall in annual savings or an overly optimistic withdrawal rate can make the difference between a surplus and running short late in life.\n\nThe Retirement Calculator models both phases—projecting your projected nest egg at retirement, estimating sustainable annual income under the 4% safe withdrawal benchmark, and comparing your projected balance against the capital required to fund your desired retirement lifestyle.',
    howItWorks: {
      summary:
        'The calculator compounds your current savings and annual contributions up to retirement age, then evaluates the present value of an annuity over your expected years in retirement to check whether your projected nest egg meets your income goal.',
      steps: [
        {
          title: '1. Enter Ages & Life Expectancy',
          detail: 'Provide your current age, target retirement age, and planning life expectancy to establish both accumulation and drawdown horizons.'
        },
        {
          title: '2. Input Savings, Contributions & Returns',
          detail: 'Enter your current retirement balance, annual savings amount, and expected pre- and post-retirement annual return rates.'
        },
        {
          title: '3. Specify Desired Retirement Income',
          detail: 'Enter the annual income you want your portfolio to support during retirement.'
        },
        {
          title: '4. Compare Projected Nest Egg vs. Needed Capital',
          detail: 'Review your projected retirement balance, 4% rule annual income, required nest egg, and surplus or shortfall status.'
        }
      ],
      keyAssumptions: [
        'Contributions are added annually until retirement age at the pre-retirement return rate.',
        'Retirement drawdown uses the post-retirement return rate over (Life Expectancy - Retirement Age) years.'
      ]
    },
    formula: {
      title: 'Accumulation Nest Egg & Drawdown Annuity Formulas',
      equation: 'FV = P(1 + r_pre)^t + PMT × [((1 + r_pre)^t - 1) / r_pre]  |  Needed = Income × [1 - (1 + r_post)^(-y)] / r_post',
      variables: [
        { symbol: 'FV', name: 'Projected Nest Egg', description: 'Portfolio value at retirement age', unit: 'Currency ($)' },
        { symbol: 'P', name: 'Current Savings', description: 'Existing retirement account balance', unit: 'Currency ($)' },
        { symbol: 'PMT', name: 'Annual Savings', description: 'Amount contributed per year before retirement', unit: 'Currency ($)' },
        { symbol: 'r_pre / r_post', name: 'Return Rates', description: 'Pre-retirement and post-retirement annual returns', unit: 'Decimal' },
        { symbol: 't / y', name: 'Phase Durations', description: 'Years until retirement (t) and years in retirement (y)', unit: 'Years' }
      ],
      explanation:
        'The accumulation formula grows your savings to retirement age, while the drawdown formula determines the exact lump sum needed at retirement to generate your target annual income for y years. The 4% benchmark (0.04 × FV) provides an independent sustainability check.'
    },
    examples: [
      {
        title: '30-Year Accumulation to Age 65',
        scenario: 'A 35-year-old with $50,000 saved contributes $12,000/year until age 65 at a 7.0% pre-retirement return, targeting $60,000/year in retirement.',
        inputs: {
          'Age / Retire Age': '35 / 65 (30 yrs)',
          'Current Savings': '$50,000',
          'Annual Savings': '$12,000',
          'Pre-Retirement Return': '7.0%',
          'Desired Income': '$60,000/yr'
        },
        steps: [
          'Growth of $50,000 = $50,000 × (1.07)^30 = $380,612.75',
          'Growth of $12,000/yr = $12,000 × [((1.07)^30 - 1) / 0.07] = $1,133,529.43',
          'Projected nest egg = $380,612.75 + $1,133,529.43 = $1,514,142',
          '4% safe withdrawal income = $1,514,142 × 0.04 = $60,566/year'
        ],
        result: 'Projected Nest Egg: $1,514,142 | 4% Rule Income: $60,566/yr (On Track)',
        takeaway: 'Consistent $12,000 annual savings over 30 years builds over $1.5M, satisfying a $60,000/year 4% withdrawal target.'
      }
    ],
    understandingResults:
      'Review whether your status shows a Surplus or Shortfall relative to your Needed Nest Egg, and check the 4% Safe Withdrawal benchmark. If you face a shortfall, increasing annual savings, working 2–3 additional years, or reducing target portfolio withdrawals (especially once Social Security or pensions are factored in) closes the gap rapidly.',
    useCases: [
      {
        title: 'Retirement Readiness Checkup',
        description: 'Verify whether your current savings rate keeps you on track for your target retirement age.',
        targetAudience: 'Working Professionals',
        benefits: ['Quantify surplus or shortfall', 'Test retirement age trade-offs', 'Benchmark with the 4% rule']
      },
      {
        title: 'Catch-Up Savings Planning',
        description: 'See how boosting annual contributions in your 40s or 50s affects retirement income.',
        targetAudience: 'Mid-Career Savers',
        benefits: ['Clear income replacement target', 'Model conservative post-retirement returns', 'Stress-test longevity']
      }
    ],
    faqs: [
      {
        question: 'What is the 4% safe withdrawal rule?',
        answer: 'Derived from the Trinity Study, the 4% rule suggests withdrawing 4% of your initial retirement portfolio in year one (and adjusting for inflation thereafter) historically sustained a diversified portfolio over a 30-year retirement.'
      },
      {
        question: 'Should I use nominal or inflation-adjusted returns?',
        answer: 'Using real (inflation-adjusted) returns—such as 5%–6% instead of 8%—keeps your projected nest egg and desired retirement income in today’s purchasing power.'
      }
    ],
    importantNotes: [
      'Social Security benefits, pensions, and account withdrawal taxes (Traditional vs. Roth) are not modeled separately.',
      'Sequence-of-returns risk can affect real portfolios if steep market drops occur early in retirement.'
    ]
  },

  'inflation-calculator': {
    introduction:
      'Inflation steadily erodes the purchasing power of cash over time: what costs $1,000 today will require significantly more nominal dollars 10 or 20 years from now. Conversely, a fixed sum held in low-interest cash loses real value each year.\n\nThe Inflation Calculator quantifies both sides of inflation: how much more expensive goods and services will become in the future, and what today’s nominal dollar amount will actually buy in the future at a given annual inflation rate.',
    howItWorks: {
      summary:
        'The calculator compounds your starting dollar figure forward by the annual inflation rate to determine future equivalent cost, and discounts it backward by the same compounding factor to measure future purchasing power.',
      steps: [
        {
          title: '1. Enter Today’s Dollar Amount',
          detail: 'Input the cash amount, budget item, or future payout you want to evaluate.'
        },
        {
          title: '2. Set Annual Inflation Rate & Years',
          detail: 'Provide an assumed annual CPI inflation rate (such as 3.0% historical average) and the number of years.'
        },
        {
          title: '3. Compare Future Cost vs. Purchasing Power',
          detail: 'Inspect how much money will be needed to match today’s lifestyle, cumulative inflation %, and the real purchasing power remaining.'
        }
      ],
      keyAssumptions: [
        'Inflation compounds annually at a constant average rate over the entire period.',
        'Calculations measure general purchasing power without item-specific price volatility.'
      ]
    },
    formula: {
      title: 'Compound Inflation & Purchasing Power Equations',
      equation: 'Future Cost = A × (1 + i)^t  |  Purchasing Power = A / (1 + i)^t',
      variables: [
        { symbol: 'A', name: 'Initial Amount', description: 'Starting value in today’s dollars', unit: 'Currency ($)' },
        { symbol: 'i', name: 'Annual Inflation Rate', description: 'Average annual inflation rate in decimal form', unit: 'Decimal' },
        { symbol: 't', name: 'Time Period', description: 'Number of years', unit: 'Years' }
      ],
      explanation:
        'Future Cost tells you how many future dollars equal today’s A. Purchasing Power tells you how much a fixed nominal sum A in year t is worth in today’s dollars.'
    },
    examples: [
      {
        title: '15-Year Purchasing Power Erosion at 3% Inflation',
        scenario: 'Determine the future cost of a $1,000 basket of goods and the real value of $1,000 held in 0%-interest cash after 15 years at 3.0% inflation.',
        inputs: {
          'Starting Amount (A)': '$1,000',
          'Annual Inflation (i)': '3.0%',
          'Years (t)': '15'
        },
        steps: [
          'Compounding factor = (1 + 0.03)^15 = 1.557967',
          'Future equivalent cost = $1,000 × 1.557967 = $1,557.97',
          'Future purchasing power = $1,000 / 1.557967 = $641.86',
          'Cumulative inflation = (1.557967 - 1) × 100 = 55.8%'
        ],
        result: 'Future Equivalent Cost: $1,557.97 | Purchasing Power of $1,000: $641.86',
        takeaway: 'At 3% annual inflation, cash sitting idle loses nearly 36% of its real buying power over 15 years.'
      }
    ],
    understandingResults:
      'Use "Future Cost" when budgeting future expenses like college tuition or retirement spending, and use "Purchasing Power" to evaluate fixed-dollar annuities, pensions, or uninvested cash reserves. To preserve wealth, your after-tax investment yield must exceed the inflation rate.',
    useCases: [
      {
        title: 'Salary & Pension Evaluation',
        description: 'Check whether a fixed pension or stagnant salary keeps up with rising consumer prices.',
        targetAudience: 'Employees & Retirees',
        benefits: ['Quantify real income loss', 'Plan cost-of-living adjustments', 'Benchmark savings yields against CPI']
      },
      {
        title: 'Long-Term Savings Goals',
        description: 'Adjust future savings targets upward so your goal covers tomorrow’s prices.',
        targetAudience: 'Financial Planners',
        benefits: ['Avoid underfunded future goals', 'Understand cumulative inflation', 'Simple two-way readout']
      }
    ],
    faqs: [
      {
        question: 'What is a realistic long-term inflation assumption?',
        answer: 'Historically, U.S. Consumer Price Index (CPI) inflation has averaged roughly 2.5% to 3.3% per year over multi-decade periods, though short-term spikes can be higher.'
      },
      {
        question: 'How does inflation affect debt?',
        answer: 'Moderate inflation erodes the real value of fixed-rate debt payments over time, while reducing the real value of fixed cash holdings.'
      }
    ],
    importantNotes: [
      'Real-world inflation varies by category (healthcare, housing, education) and fluctuates year to year.',
      'This tool models steady annualized compounding rather than historical year-by-year CPI tables.'
    ]
  },

  'credit-card-calculator': {
    introduction:
      'Making only minimum payments on a high-APR credit card can trap balances in decades of revolving interest because minimum formulas mostly cover monthly finance charges and barely touch principal.\n\nThe Credit Card Payoff Calculator compares your credit card’s minimum-payment trajectory against either a fixed monthly payment or a target payoff deadline, showing exact months saved and total interest avoided.',
    howItWorks: {
      summary:
        'The calculator simulates month-by-month revolving interest accrual at APR / 12 under two schedules in parallel: a standard minimum payment (floor of $25 or percentage of balance plus interest) and your accelerated fixed-payment or target-month plan.',
      steps: [
        {
          title: '1. Enter Balance & Card APR',
          detail: 'Input your current credit card balance, annual interest rate (APR), and minimum payment percentage.'
        },
        {
          title: '2. Choose Fixed Payment or Target Payoff Months',
          detail: 'Select whether to enter a fixed monthly budget you can pay or a target number of months to become debt-free.'
        },
        {
          title: '3. Compare Payoff Timelines & Interest Saved',
          detail: 'Inspect how many months and how much total interest your custom plan saves compared with paying minimums.'
        }
      ],
      keyAssumptions: [
        'No new purchases or additional charges are added to the card during payoff.',
        'Minimum payment equals the greater of $25 or (balance × min% + monthly interest), capped at remaining balance + interest.'
      ]
    },
    formula: {
      title: 'Monthly Interest & Target Payoff Payment Equations',
      equation: 'I_m = B_m × (APR / 12)  |  M = B × [ r(1 + r)^n ] / [ (1 + r)^n - 1 ]',
      variables: [
        { symbol: 'B', name: 'Card Balance', description: 'Current unpaid credit card balance', unit: 'Currency ($)' },
        { symbol: 'APR', name: 'Annual Percentage Rate', description: 'Annual card interest rate', unit: 'Percent (%)' },
        { symbol: 'r', name: 'Monthly Rate', description: 'APR divided by 12', unit: 'Decimal' },
        { symbol: 'M', name: 'Monthly Payment', description: 'Fixed payment required to clear the balance in n months', unit: 'Currency ($)' },
        { symbol: 'I_m', name: 'Monthly Interest', description: 'Finance charge accrued in month m', unit: 'Currency ($)' }
      ],
      explanation:
        'Each month, accrued interest B_m × r is paid first, and only the remainder of your payment reduces the principal balance. Increasing your monthly payment above the minimum shrinks B_m faster, compounding interest savings.'
    },
    examples: [
      {
        title: 'Paying $300/Month on a $6,000 Balance',
        scenario: 'A cardholder owes $6,000 at 24.0% APR and commits to paying a fixed $300 every month.',
        inputs: {
          'Balance': '$6,000',
          'APR': '24.0% (2.0%/mo)',
          'Fixed Monthly Payment': '$300'
        },
        steps: [
          'Month 1 interest = $6,000 × (0.24 / 12) = $120.00',
          'Month 1 principal reduction = $300.00 - $120.00 = $180.00 (New balance: $5,820)',
          'Iterating monthly payments until balance reaches $0 takes 26 months',
          'Total paid = $7,739.24 ($6,000 principal + $1,739.24 interest)'
        ],
        result: 'Payoff Time: 26 Months | Total Interest: $1,739.24',
        takeaway: 'Committing to a fixed $300 payment clears a $6,000 balance in just over 2 years, avoiding years of minimum-payment interest.'
      }
    ],
    understandingResults:
      'Pay close attention to the "Months Saved" and "Interest Saved" metrics versus the minimum-payment baseline. If your fixed monthly payment does not exceed the first month’s accrued interest (Balance × APR / 12), the balance will never pay down—you must raise your payment above monthly interest charges or lower the APR.',
    useCases: [
      {
        title: 'High-APR Payoff Acceleration',
        description: 'See exactly how much faster an extra $50–$150 per month eliminates credit card debt.',
        targetAudience: 'Cardholders',
        benefits: ['Clear debt-free date', 'Side-by-side minimum comparison', 'Instant target-month budgeting']
      },
      {
        title: 'Balance Transfer Planning',
        description: 'Determine the monthly payment needed to wipe out a balance before a promotional window ends.',
        targetAudience: 'Personal Finance Planners',
        benefits: ['Exact target-month payment calculation', 'Avoid deferred interest traps', 'Compare payoff scenarios']
      }
    ],
    faqs: [
      {
        question: 'Why do minimum payments take so long to pay off a card?',
        answer: 'Minimum payments decline as your balance shrinks, stretching the tail of the debt over 15–30+ years and multiplying total interest.'
      },
      {
        question: 'What happens if my chosen payment is less than monthly interest?',
        answer: 'The balance will grow instead of shrink; the calculator warns when a payment is insufficient to cover accrued interest.'
      }
    ],
    importantNotes: [
      'Assumes a fixed APR and no annual fees, late fees, or new purchases.',
      'Paying more than once a month or paying early in the billing cycle can reduce average daily balance interest further.'
    ]
  },

  'debt-payoff-calculator': {
    introduction:
      'When you carry multiple debts—such as credit cards, auto loans, and student loans—deciding which balance to attack first directly affects both your total interest bill and how fast you gain momentum.\n\nThe Debt Payoff Calculator lets you list multiple debts and compare the two proven payoff frameworks: the Debt Avalanche (highest interest rate first for maximum savings) and the Debt Snowball (smallest balance first for quick psychological wins), complete with automatic payment rollover.',
    howItWorks: {
      summary:
        'The simulator sorts your debts by highest APR (Avalanche) or lowest balance (Snowball), pays minimums on every account each month, and funnels your extra monthly budget plus any freed-up minimum payments from paid-off accounts into the top-priority debt.',
      steps: [
        {
          title: '1. Choose Avalanche or Snowball Strategy',
          detail: 'Select Debt Avalanche to minimize interest cost or Debt Snowball to eliminate small balances fastest.'
        },
        {
          title: '2. Enter Extra Monthly Paydown Budget',
          detail: 'Specify how much additional cash above total minimums you can put toward debt each month.'
        },
        {
          title: '3. Add Each Debt’s Balance, APR & Minimum',
          detail: 'Input all balances, annual interest rates, and minimum monthly payments for your accounts.'
        },
        {
          title: '4. Review Payoff Order, Timeline & Savings',
          detail: 'Inspect your debt-free timeline, total interest paid, and how each freed minimum payment rolls into the next debt.'
        }
      ],
      keyAssumptions: [
        'Total monthly cash committed remains constant: as each debt is eliminated, its minimum payment rolls over into the next priority debt.',
        'Interest accrues monthly at APR / 12 with no new borrowing added.'
      ]
    },
    formula: {
      title: 'Monthly Rollover Simulation Logic',
      equation: 'Monthly Payment_priority = Min_priority + Extra Budget + Σ(Freed Minimums)',
      variables: [
        { symbol: 'Min_priority', name: 'Priority Debt Minimum', description: 'Required minimum payment on the active target debt', unit: 'Currency ($)' },
        { symbol: 'Extra Budget', name: 'Extra Monthly Cash', description: 'Additional monthly amount dedicated to debt elimination', unit: 'Currency ($)' },
        { symbol: 'Σ(Freed Minimums)', name: 'Rolled-Over Payments', description: 'Sum of minimum payments from debts already paid to zero', unit: 'Currency ($)' }
      ],
      explanation:
        'Each month, every non-zero debt accrues interest (Balance × APR / 12) and receives its minimum payment. Any remaining extra budget—plus minimums from retired debts—accelerates principal reduction on the active priority debt.'
    },
    examples: [
      {
        title: 'Avalanche vs. Snowball on Two Debts',
        scenario: 'A borrower owes $4,000 at 22% APR ($120 minimum) and $8,000 at 15% APR ($160 minimum), plus $200/month extra ($480 total monthly budget).',
        inputs: {
          'Debt 1': '$4,000 @ 22% ($120 min)',
          'Debt 2': '$8,000 @ 15% ($160 min)',
          'Extra Monthly Budget': '$200'
        },
        steps: [
          'Priority target (here both Avalanche & Snowball select Debt 1 first): receives $120 + $200 = $320/month',
          'Debt 2 receives its $160 minimum until Debt 1 hits $0 (in ~15 months)',
          'Once Debt 1 is paid off, its $120 minimum rolls into Debt 2: Debt 2 now receives $160 + $120 + $200 = $480/month',
          'Accelerated rollover clears Debt 2 roughly 16 months later instead of dragging out for years'
        ],
        result: 'Debt-Free in ~31 Months with Automated Rollover Acceleration',
        takeaway: 'Keeping your total monthly payment fixed and rolling over freed minimums creates compounding payoff momentum.'
      }
    ],
    understandingResults:
      'Toggle between Avalanche and Snowball using the same debt list to compare total interest paid versus how quickly the first account closes. Avalanche always saves the most money mathematically (or ties when the highest-rate debt is also the smallest), while Snowball frees up cash-flow milestones sooner if small balances motivate you to stay consistent.',
    useCases: [
      {
        title: 'Multi-Card & Loan Elimination',
        description: 'Organize credit cards, medical bills, and personal loans into a single unified payoff roadmap.',
        targetAudience: 'Debt-Free Planners',
        benefits: ['Automatic payment rollover', 'Compare Avalanche vs. Snowball', 'See exact payoff order']
      },
      {
        title: 'Side-Hustle & Raise Allocation',
        description: 'Test how applying an extra $100–$300/month slashes months off your debt-free date.',
        targetAudience: 'Budgeters',
        benefits: ['Quantify extra-payment ROI', 'Avoid missed minimums', 'Track interest savings']
      }
    ],
    faqs: [
      {
        question: 'Which saves more money: Debt Avalanche or Debt Snowball?',
        answer: 'Debt Avalanche always costs the same or less in total interest because it eliminates the highest-APR balance first.'
      },
      {
        question: 'Why does payment rollover matter so much?',
        answer: 'Instead of spending the freed-up cash after paying off your first account, rolling it into the next debt keeps your total outflow steady and rapidly shrinks remaining principal.'
      }
    ],
    importantNotes: [
      'Always pay at least the minimum due on every account to avoid late fees and credit-score damage.',
      'Does not account for promotional 0% APR expiration dates; prioritize expiring deferred-interest balances manually if needed.'
    ]
  },

  'apr-calculator': {
    introduction:
      'Two lenders can advertise the exact same 6.5% interest rate yet charge meaningfully different borrowing costs once origination fees, discount points, and closing charges are added. That is why federal lending laws require disclosing the Annual Percentage Rate (APR).\n\nThe APR Calculator reveals the true annualized cost of a loan by factoring upfront origination fees, mortgage discount points, and closing costs into the effective financing rate.',
    howItWorks: {
      summary:
        'The calculator computes the monthly payment on your full note amount at the nominal interest rate, deducts total finance fees (origination fees + points + other closing fees) to find net loan proceeds, and uses Newton-Raphson iteration to solve for the APR that matches those payments to net proceeds.',
      steps: [
        {
          title: '1. Enter Loan Amount, Note Rate & Term',
          detail: 'Provide the principal loan amount, quoted nominal interest rate, and loan term in years.'
        },
        {
          title: '2. Add Upfront Lender Fees & Points',
          detail: 'Input origination fees, discount points (% of loan amount), and other financed or prepaid closing fees.'
        },
        {
          title: '3. Inspect True APR vs. Note Rate',
          detail: 'Compare the quoted interest rate against the true effective APR, net loan proceeds, and total cost of borrowing.'
        }
      ],
      keyAssumptions: [
        'All entered lender fees and discount points are treated as prepaid finance charges paid at closing.',
        'The loan is held for its full scheduled term (paying off early makes upfront fees weigh even more heavily on effective APR).'
      ]
    },
    formula: {
      title: 'True APR Implicit Present Value Equation',
      equation: 'Net Proceeds = P - Fees = Σ [ M / (1 + APR/12)^k ]  (for k = 1 to n)',
      variables: [
        { symbol: 'P', name: 'Gross Loan Amount', description: 'Face principal amount on the loan note', unit: 'Currency ($)' },
        { symbol: 'Fees', name: 'Total Finance Fees', description: 'Origination fee + (Points% × P) + Other lender closing fees', unit: 'Currency ($)' },
        { symbol: 'M', name: 'Monthly Payment', description: 'Scheduled monthly payment calculated from P at the nominal note rate', unit: 'Currency ($)' },
        { symbol: 'n', name: 'Total Months', description: 'Loan term in years × 12', unit: 'Months' },
        { symbol: 'APR', name: 'Annual Percentage Rate', description: '12 × monthly discount rate equating the payment stream to Net Proceeds', unit: 'Percent (%)' }
      ],
      explanation:
        'Lenders calculate your monthly payment M from the full loan P, but because Fees reduce the effective net cash borrowed (P - Fees), the effective rate APR exceeds the stated note rate.'
    },
    examples: [
      {
        title: '30-Year Mortgage with 1 Point & Closing Fees',
        scenario: 'A $200,000 30-year loan has a 6.5% note rate, $2,000 origination fee, 1.0 discount point ($2,000), and $1,500 in other lender fees.',
        inputs: {
          'Loan Amount': '$200,000',
          'Note Interest Rate': '6.5%',
          'Term': '30 Years (360 mos)',
          'Total Fees': '$2,000 + $2,000 + $1,500 = $5,500'
        },
        steps: [
          'Monthly payment at 6.5% on $200,000 = $1,264.14',
          'Net loan proceeds = $200,000 - $5,500 = $194,500',
          'Solve for monthly rate r_eff where PV($1,264.14, 360 mos, r_eff) = $194,500',
          'Newton-Raphson converges to r_eff = 0.005642/mo → APR = 0.005642 × 12 = 6.77%'
        ],
        result: 'Quoted Rate: 6.50% | True APR: 6.77% (+0.27% fee spread)',
        takeaway: '$5,500 in upfront fees adds 0.27% to the effective annual cost over 30 years—and even more if you refinance early.'
      }
    ],
    understandingResults:
      'Look at the spread between the Interest Rate and the True APR. A low headline rate paired with heavy points and origination fees can cost more than a slightly higher rate with zero lender fees—especially if you plan to sell or refinance within 5–7 years.',
    useCases: [
      {
        title: 'Comparing Mortgage Loan Estimates',
        description: 'Benchmark two competing lender quotes that mix different interest rates, points, and origination fees.',
        targetAudience: 'Homebuyers & Refinancers',
        benefits: ['Apples-to-apples rate comparison', 'Spot costly junk fees', 'Evaluate discount point trade-offs']
      },
      {
        title: 'Short-Term vs. Long-Term Fee Impact',
        description: 'Understand how upfront fees distort the effective rate on shorter 5- or 15-year loans.',
        targetAudience: 'Borrowers',
        benefits: ['Precise Newton-Raphson APR math', 'Clear net proceeds readout', 'Better lender negotiation']
      }
    ],
    faqs: [
      {
        question: 'Why does APR matter more than interest rate when shopping loans?',
        answer: 'APR folds lender fees and discount points into a single annualized cost metric, preventing lenders from disguising high upfront fees behind an artificially low headline rate.'
      },
      {
        question: 'Does APR account for selling or refinancing early?',
        answer: 'Standard APR assumes you keep the loan for its full term. If you refinance in 5 years, upfront fees are amortized over fewer years, making the effective rate higher.'
      }
    ],
    importantNotes: [
      'Third-party costs not required by the lender (like optional inspections or owner’s title insurance) are normally excluded from APR.',
      'Adjustable-rate loans (ARMs) can change after the initial fixed period, altering actual lifetime APR.'
    ]
  },

  'amortization-calculator': {
    introduction:
      'On a fixed-rate loan, your monthly payment stays identical every month, yet the split between interest and principal shifts dramatically over time. In year one, most of your payment covers interest; in the final years, almost all of it retires principal.\n\nThe Amortization Calculator generates a complete monthly or annual schedule and models the impact of extra monthly principal payments, showing exact years shaved off your loan and lifetime interest saved.',
    howItWorks: {
      summary:
        'The tool calculates your required base monthly payment from principal, rate, and term, then iterates month by month—charging interest on the remaining balance, applying leftover payment plus any extra monthly payment to principal—until the balance reaches zero.',
      steps: [
        {
          title: '1. Enter Loan Amount, Rate & Term',
          detail: 'Input the loan balance, annual interest rate, and repayment term in years.'
        },
        {
          title: '2. Add Optional Extra Monthly Principal',
          detail: 'Specify an extra monthly amount (for example, $100/month) to test accelerated payoff.'
        },
        {
          title: '3. Toggle Annual or Monthly Schedule',
          detail: 'Switch between a high-level yearly summary and a granular month-by-month breakdown.'
        },
        {
          title: '4. Inspect Interest Saved & Payoff Speedup',
          detail: 'Review how much lifetime interest and how many months or years are eliminated by extra principal payments.'
        }
      ],
      keyAssumptions: [
        'Extra monthly payments go 100% toward reducing principal with zero prepayment penalties.',
        'Interest rate remains fixed across the full amortization period.'
      ]
    },
    formula: {
      title: 'Amortization Payment & Balance Update Equations',
      equation: 'M = P × [ r(1 + r)^n ] / [ (1 + r)^n - 1 ]  |  B_(k) = B_(k-1) - (M - B_(k-1)×r + Extra)',
      variables: [
        { symbol: 'M', name: 'Base Monthly Payment', description: 'Scheduled monthly principal and interest payment', unit: 'Currency ($)' },
        { symbol: 'P', name: 'Loan Principal', description: 'Initial borrowed amount', unit: 'Currency ($)' },
        { symbol: 'r', name: 'Monthly Interest Rate', description: 'Annual rate divided by 12', unit: 'Decimal' },
        { symbol: 'n', name: 'Scheduled Months', description: 'Loan term in years × 12', unit: 'Months' },
        { symbol: 'Extra', name: 'Extra Principal', description: 'Optional additional monthly principal payment', unit: 'Currency ($)' }
      ],
      explanation:
        'Because each month’s interest equals remaining balance × r, every extra dollar paid toward principal today permanently eliminates future compounding interest on that dollar for the remainder of the loan.'
    },
    examples: [
      {
        title: '$300,000 Mortgage with $100 Extra Monthly Principal',
        scenario: 'Compare a standard 30-year $300,000 loan at 6.0% APR against adding $100/month in extra principal.',
        inputs: {
          'Loan Amount': '$300,000',
          'Interest Rate': '6.0%',
          'Term': '30 Years (360 mos)',
          'Extra Monthly': '$100'
        },
        steps: [
          'Base monthly P&I = $300,000 × [0.005(1.005)^360] / [(1.005)^360 - 1] = $1,798.65',
          'Standard 30-year total interest = $347,515',
          'Adding $100/month raises total monthly payment to $1,898.65, cutting payoff from 360 to 313 months (26 yrs, 1 mo)',
          'Accelerated total interest = $294,168 → Interest saved = $53,346'
        ],
        result: 'Payoff Shortened by 47 Months (~4 Years) | Interest Saved: $53,346',
        takeaway: 'Just $100 extra per month saves over $53,000 in interest and shaves nearly four full years off a 30-year loan.'
      }
    ],
    understandingResults:
      'Use the amortization table to identify your "crossover point"—the year when the principal portion of your payment exceeds the interest portion—and track your remaining balance at milestones like year 5 or year 10. Confirm with your servicer that extra payments are applied strictly to principal, not held as early installments.',
    useCases: [
      {
        title: 'Extra Payment ROI Analysis',
        description: 'Decide whether putting extra cash toward mortgage principal beats investing elsewhere.',
        targetAudience: 'Homeowners',
        benefits: ['Exact months/years saved', 'Lifetime interest comparison', 'Printable annual & monthly tables']
      },
      {
        title: 'Equity Milestone Planning',
        description: 'Check when your loan balance drops below 80% LTV to request PMI removal.',
        targetAudience: 'Mortgage Borrowers',
        benefits: ['Month-by-month balance tracking', 'Clear principal vs. interest split', 'Instant scenario updates']
      }
    ],
    faqs: [
      {
        question: 'Why is interest so high in the first few years of a loan?',
        answer: 'Interest is calculated each month on the remaining balance. Because the balance is largest at the beginning of the loan, early payments go mostly toward interest.'
      },
      {
        question: 'Can I make extra principal payments without refinancing?',
        answer: 'Yes—most residential mortgages and auto loans allow extra principal payments with no penalty, giving you the interest savings of a shorter term while keeping flexibility.'
      }
    ],
    importantNotes: [
      'Property taxes, homeowners insurance, and escrow charges are excluded from principal-and-interest schedules.',
      'Notify your lender when submitting extra funds so they apply directly to principal reduction.'
    ]
  },

  'roi-calculator': {
    introduction:
      'Total Return on Investment (ROI) tells you the raw percentage gain or loss on a project or asset, but it ignores time: a 50% return earned over 1 year is vastly superior to a 50% return spread across 10 years.\n\nThe ROI Calculator computes both Total ROI and Annualized ROI (Compound Annual Growth Rate, or CAGR) over your exact holding period so you can compare investments of different durations on equal footing.',
    howItWorks: {
      summary:
        'The calculator subtracts initial investment from ending returned value to compute net profit, divides by initial cost for Total ROI %, and takes the (1/t)-th power of the ending-to-initial ratio to derive annualized CAGR.',
      steps: [
        {
          title: '1. Enter Initial Investment & Returned Value',
          detail: 'Input your total starting capital invested and the final ending value or payout received.'
        },
        {
          title: '2. Specify Holding Period in Years',
          detail: 'Enter how many years (including decimals like 3.5) the capital was committed.'
        },
        {
          title: '3. Compare Total ROI vs. Annualized CAGR',
          detail: 'Inspect net profit, cumulative return percentage, and equivalent compound annual growth rate.'
        }
      ],
      keyAssumptions: [
        'Cash flows occur solely at entry and exit (no interim deposits or withdrawals).',
        'Holding period is greater than zero to compute annualized growth.'
      ]
    },
    formula: {
      title: 'Total ROI & Annualized CAGR Formulas',
      equation: 'Total ROI (%) = [(F - P) / P] × 100  |  Annualized ROI (CAGR) = [(F / P)^(1/t) - 1] × 100',
      variables: [
        { symbol: 'P', name: 'Initial Investment', description: 'Total upfront cost or invested capital', unit: 'Currency ($)' },
        { symbol: 'F', name: 'Returned Amount', description: 'Ending value or total cash returned', unit: 'Currency ($)' },
        { symbol: 't', name: 'Holding Period', description: 'Duration capital remained invested', unit: 'Years' }
      ],
      explanation:
        'Total ROI measures overall percentage gain regardless of time. CAGR converts that cumulative return into the steady annual compound rate required to grow P into F over t years.'
    },
    examples: [
      {
        title: '4-Year Investment Performance',
        scenario: 'An investor puts $10,000 into a small business project and receives $15,000 back after 4 years.',
        inputs: {
          'Initial Investment (P)': '$10,000',
          'Returned Amount (F)': '$15,000',
          'Holding Period (t)': '4 Years'
        },
        steps: [
          'Net Profit = $15,000 - $10,000 = $5,000',
          'Total ROI = ($5,000 / $10,000) × 100 = 50.0%',
          'Annualized CAGR = [(15,000 / 10,000)^(1/4) - 1] × 100 = [(1.5)^0.25 - 1] × 100 = 10.67%'
        ],
        result: 'Net Profit: $5,000 | Total ROI: 50.0% | Annualized ROI (CAGR): 10.67%',
        takeaway: 'A 50% total gain over 4 years equates to an annualized 10.67% compound return, making it easy to benchmark against index funds or savings rates.'
      }
    ],
    understandingResults:
      'Always evaluate both metrics together. Use Total ROI to measure total dollar profitability relative to cost, and use Annualized ROI (CAGR) whenever comparing investments held for different lengths of time (such as a 2-year flip versus a 7-year stock holding).',
    useCases: [
      {
        title: 'Comparing Multi-Year Investments',
        description: 'Normalize returns across stocks, real estate deals, and business projects of varying durations.',
        targetAudience: 'Investors & Analysts',
        benefits: ['True time-adjusted CAGR', 'Instant net profit calculation', 'Simple benchmark comparisons']
      },
      {
        title: 'Marketing & Project Evaluation',
        description: 'Assess whether capital expenditures or campaigns delivered above-hurdle returns.',
        targetAudience: 'Business Owners',
        benefits: ['Measure capital efficiency', 'Spot low-annualized traps', 'Fast what-if modeling']
      }
    ],
    faqs: [
      {
        question: 'Why is Annualized ROI lower than Total ROI divided by years?',
        answer: 'Because CAGR accounts for compounding. For example, 50% over 4 years is 10.67% compounded annually rather than 12.5% simple average.'
      },
      {
        question: 'Does this calculator handle investment losses?',
        answer: 'Yes. If Returned Amount is less than Initial Investment, both Total ROI and Annualized ROI appear as negative percentages.'
      }
    ],
    importantNotes: [
      'Ensure Initial Investment includes transaction fees, commissions, and taxes if measuring net after-fee ROI.',
      'For investments with irregular interim cash flows, use Internal Rate of Return (IRR) instead of simple CAGR.'
    ]
  },

  'salary-calculator': {
    introduction:
      'A job offer quoted as "$38.50 per hour" or "$80,000 per year" rarely tells the whole story until you translate it across pay periods and subtract federal taxes, state taxes, FICA payroll taxes, and pre-tax benefit deductions.\n\nThe Salary & Take-Home Pay Calculator converts seamlessly between hourly, bi-weekly, monthly, and annual compensation while estimating your net take-home paycheck across every frequency.',
    howItWorks: {
      summary:
        'The calculator annualizes your pay rate using your weekly work hours (52 weeks per year), subtracts pre-tax deductions (such as 401(k) or health premiums) to determine taxable pay for federal and state rates, applies FICA payroll tax to gross pay, and divides the remaining net income across all pay intervals.',
      steps: [
        {
          title: '1. Select Pay Frequency & Enter Compensation',
          detail: 'Choose Hourly, Annual, Monthly, or Bi-Weekly input mode and enter your gross pay amount plus weekly hours.'
        },
        {
          title: '2. Adjust Tax Rates & Pre-Tax Deductions',
          detail: 'Enter estimated federal, state, and FICA tax percentages along with annual pre-tax deductions (401(k), HSA, health insurance).'
        },
        {
          title: '3. View Gross & Net Pay Across All Intervals',
          detail: 'Review equivalent hourly, bi-weekly, monthly, and annual pay before and after taxes and deductions.'
        }
      ],
      keyAssumptions: [
        'Annualized hourly pay assumes 52 paid weeks per year (hours/week × 52).',
        'Pre-tax deductions lower federal and state taxable income, while FICA applies to gross wages.'
      ]
    },
    formula: {
      title: 'Pay Conversion & Net Take-Home Equations',
      equation: 'Gross Annual = Hourly × Hours/wk × 52  |  Net Annual = Gross Annual - [(Gross - PreTax)×(Fed% + State%) + Gross×FICA% + PreTax]',
      variables: [
        { symbol: 'Gross Annual', name: 'Annual Gross Pay', description: 'Total yearly pay before taxes and deductions', unit: 'Currency ($)' },
        { symbol: 'PreTax', name: 'Pre-Tax Deductions', description: 'Annual 401(k), HSA, and qualifying benefit contributions', unit: 'Currency ($)' },
        { symbol: 'Fed% / State%', name: 'Effective Income Tax Rates', description: 'Estimated effective federal and state tax percentages', unit: 'Percent (%)' },
        { symbol: 'FICA%', name: 'Payroll Tax Rate', description: 'Social Security & Medicare rate (standard 7.65%)', unit: 'Percent (%)' }
      ],
      explanation:
        'Pre-tax deductions reduce the taxable base for income taxes before applying your effective federal and state rates, while FICA payroll taxes apply directly to gross annual earnings.'
    },
    examples: [
      {
        title: '$80,000 Annual Salary Take-Home Breakdown',
        scenario: 'A full-time employee earns $80,000/year (40 hrs/week) with $4,000 in annual pre-tax deductions, 14% effective federal tax, 5% state tax, and 7.65% FICA.',
        inputs: {
          'Gross Annual Salary': '$80,000',
          'Weekly Hours': '40 (2,080 hrs/yr)',
          'Pre-Tax Deductions': '$4,000',
          'Fed / State / FICA': '14% / 5% / 7.65%'
        },
        steps: [
          'Gross hourly equivalent = $80,000 / 2,080 = $38.46/hr',
          'Taxable income = $80,000 - $4,000 = $76,000',
          'Federal tax = $76,000 × 14% = $10,640; State tax = $76,000 × 5% = $3,800; FICA = $80,000 × 7.65% = $6,120',
          'Total deductions & taxes = $20,560 + $4,000 = $24,560 → Net annual take-home = $80,000 - $24,560 = $55,440 ($4,620/mo)'
        ],
        result: 'Net Annual: $55,440 | Monthly Take-Home: $4,620 | Bi-Weekly (26/yr): $2,132.31',
        takeaway: 'After taxes and $4,000 in pre-tax savings, an $80,000 salary delivers roughly $4,620 per month in spendable take-home cash.'
      }
    ],
    understandingResults:
      'Compare both your "Gross" and "Net Take-Home" rows when evaluating job offers or building a household budget. Remember that monthly take-home (Net ÷ 12) differs slightly from two bi-weekly paychecks (Net ÷ 26 × 2) because bi-weekly pay produces two "three-paycheck" months each year.',
    useCases: [
      {
        title: 'Job Offer Evaluation',
        description: 'Convert hourly contract rates into equivalent annual salaries and net monthly take-home pay.',
        targetAudience: 'Job Seekers',
        benefits: ['Compare hourly vs. salaried offers', 'Factor in 401(k) pre-tax savings', 'Estimate monthly budget cash flow']
      },
      {
        title: 'Raise & Deduction Planning',
        description: 'See how increasing pre-tax 401(k) contributions lowers income taxes and affects net paychecks.',
        targetAudience: 'Salaried Employees',
        benefits: ['Instant bi-weekly & monthly view', 'Clear effective tax impact', 'Pre-tax benefit modeling']
      }
    ],
    faqs: [
      {
        question: 'How many hours are in a standard work year?',
        answer: 'At 40 hours per week for 52 weeks, a standard full-time year equals 2,080 hours (unpaid time off reduces actual paid hours if hourly).'
      },
      {
        question: 'Should I enter my marginal or effective federal tax rate?',
        answer: 'Enter your effective (average) federal tax rate—not your top marginal bracket—for the closest estimate of annual take-home pay.'
      }
    ],
    importantNotes: [
      'Uses user-supplied effective tax percentages rather than progressive bracket tables; use the Income Tax Calculator for bracket-by-bracket federal estimates.',
      'Does not include post-tax deductions such as Roth 401(k), union dues, or wage garnishments.'
    ]
  },

  'loan-comparison-calculator': {
    introduction:
      'Choosing between two loans is rarely as simple as picking the lower interest rate or the lower monthly payment. A 15-year loan carries a higher monthly payment than a 30-year loan yet can save hundreds of thousands of dollars in lifetime interest.\n\nThe Loan Comparison Calculator evaluates Loan Option A and Loan Option B side-by-side, displaying each option’s monthly payment, total interest cost, and the exact dollar gap in both monthly cash flow and total interest.',
    howItWorks: {
      summary:
        'The calculator runs identical fixed-rate amortization equations independently on Option A and Option B, then computes the absolute difference in monthly payment and total lifetime interest to identify the lower-cost loan.',
      steps: [
        {
          title: '1. Configure Loan Option A',
          detail: 'Enter the principal amount, annual interest rate (APR), and term in years for your first loan quote.'
        },
        {
          title: '2. Configure Loan Option B',
          detail: 'Enter the principal, APR, and term in years for the competing loan offer or term length.'
        },
        {
          title: '3. Compare Monthly Payment vs. Total Interest',
          detail: 'Review both side-by-side result cards plus the summary banner showing which option saves more total interest and the monthly payment trade-off.'
        }
      ],
      keyAssumptions: [
        'Both loans are fixed-rate, fully amortizing installment loans with monthly payments.',
        'Comparison focuses on principal and interest; upfront lender fees should be checked alongside APR.'
      ]
    },
    formula: {
      title: 'Side-by-Side Loan Amortization & Interest Comparison',
      equation: 'M = P × [ r(1 + r)^n ] / [ (1 + r)^n - 1 ]  |  Total Interest = (M × n) - P',
      variables: [
        { symbol: 'M', name: 'Monthly Payment', description: 'Scheduled monthly principal and interest payment for each loan', unit: 'Currency ($)' },
        { symbol: 'P', name: 'Loan Amount', description: 'Principal borrowed in Option A or Option B', unit: 'Currency ($)' },
        { symbol: 'r', name: 'Monthly Rate', description: 'Annual APR divided by 12', unit: 'Decimal' },
        { symbol: 'n', name: 'Total Payments', description: 'Term in years multiplied by 12', unit: 'Months' }
      ],
      explanation:
        'Total Interest equals total scheduled payments (M × n) minus the starting principal P. Comparing Option A against Option B reveals the exact monthly cash-flow premium required to achieve lifetime interest savings.'
    },
    examples: [
      {
        title: '30-Year Loan vs. 15-Year Loan on $250,000',
        scenario: 'Compare a $250,000 30-year loan at 6.5% APR (Option A) against a 15-year loan at 5.8% APR (Option B).',
        inputs: {
          'Option A': '$250,000 @ 6.5% / 30 yrs',
          'Option B': '$250,000 @ 5.8% / 15 yrs'
        },
        steps: [
          'Option A (30 yrs, 360 mos): Monthly payment = $1,580.17; Total interest = ($1,580.17 × 360) - $250,000 = $318,861',
          'Option B (15 yrs, 180 mos): Monthly payment = $2,082.72; Total interest = ($2,082.72 × 180) - $250,000 = $124,890',
          'Monthly difference = $2,082.72 - $1,580.17 = $502.55/mo higher for Option B',
          'Lifetime interest difference = $318,861 - $124,890 = $193,971 saved with Option B'
        ],
        result: 'Option B Saves $193,971 in Total Interest for $502.55/mo Extra',
        takeaway: 'Shortening the term and securing a lower rate cuts lifetime interest by more than 60%, provided your budget comfortably handles the higher monthly payment.'
      }
    ],
    understandingResults:
      'Weigh the "Monthly Payment Difference" against the "Lifetime Interest Difference." If Option B saves massive total interest but strains your emergency savings or monthly cash flow, taking Option A and making voluntary extra principal payments gives you flexibility without locking in a higher mandatory payment.',
    useCases: [
      {
        title: '15-Year vs. 30-Year Mortgage Decisions',
        description: 'Quantify the exact cash-flow vs. interest-savings trade-off between mortgage terms.',
        targetAudience: 'Homebuyers & Refinancers',
        benefits: ['Instant side-by-side breakdown', 'Clear cash-flow premium readout', 'Unbiased cost comparison']
      },
      {
        title: 'Evaluating Rate Buy-Downs or Competing Lenders',
        description: 'Compare two lender offers with different principal sizes (if rolling in fees) or interest rates.',
        targetAudience: 'Borrowers',
        benefits: ['Test different loan amounts', 'Identify cheaper lifetime option', 'Fast parameter resets']
      }
    ],
    faqs: [
      {
        question: 'Should I always pick the loan with lower total interest?',
        answer: 'Not necessarily—if a shorter term leaves your budget tight with no emergency cushion, a longer-term loan with optional extra principal payments may be safer.'
      },
      {
        question: 'Can I compare auto or personal loans with this tool?',
        answer: 'Yes. Any two fixed-rate installment loans with terms entered in years (including fractional years like 3 or 5 years) can be compared.'
      }
    ],
    importantNotes: [
      'Upfront origination fees and discount points should be evaluated alongside monthly P&I using the APR Calculator.',
      'Results assume all payments are made on schedule with no prepayment.'
    ]
  },

  'car-lease-calculator': {
    introduction:
      'Auto lease pricing relies on industry jargon—capitalized cost, residual value, and money factor—that makes it difficult for shoppers to tell whether a dealer’s monthly quote is fair or inflated.\n\nThe Car Lease Calculator breaks down any lease offer into its exact components: net capitalized cost, residual value, monthly depreciation fee, monthly rent (finance) charge, equivalent APR, sales tax, and total lease cost over the full term.',
    howItWorks: {
      summary:
        'The calculator determines your net capitalized cost (negotiated price minus down payment and trade-in) and the car’s projected residual value (MSRP × residual %), then splits the monthly payment into depreciation plus finance rent charge and adds monthly sales tax.',
      steps: [
        {
          title: '1. Enter MSRP, Negotiated Price & Cap Reductions',
          detail: 'Input the vehicle MSRP, agreed selling price, cash down payment, and any trade-in credit.'
        },
        {
          title: '2. Set Lease Term, Residual % & Money Factor',
          detail: 'Select the lease duration (typically 24, 36, or 48 months), residual percentage of MSRP, and dealer money factor (e.g., 0.0021).'
        },
        {
          title: '3. Add Sales Tax Rate',
          detail: 'Enter your local monthly sales tax percentage applied to lease payments.'
        },
        {
          title: '4. Inspect Depreciation, Rent Charge & Equivalent APR',
          detail: 'Review how much of your payment covers vehicle depreciation versus interest (money factor × 2,400).'
        }
      ],
      keyAssumptions: [
        'Sales tax is applied monthly to the base lease payment (common in most states; some states tax the full price or total payments upfront).',
        'Residual value is calculated as a percentage of MSRP, while depreciation uses Negotiated Cap Cost.'
      ]
    },
    formula: {
      title: 'Standard Auto Lease Monthly Payment Equations',
      equation: 'Depreciation = (Cap Cost - Residual) / Term  |  Rent Charge = (Cap Cost + Residual) × Money Factor  |  Equiv. APR = MF × 2,400',
      variables: [
        { symbol: 'Cap Cost', name: 'Net Capitalized Cost', description: 'Negotiated Price - Down Payment - Trade-In', unit: 'Currency ($)' },
        { symbol: 'Residual', name: 'Residual Value', description: 'Projected end-of-lease value = MSRP × Residual %', unit: 'Currency ($)' },
        { symbol: 'MF', name: 'Money Factor', description: 'Lease financing factor (approx. APR / 2,400)', unit: 'Decimal' },
        { symbol: 'Term', name: 'Lease Term', description: 'Number of monthly lease payments', unit: 'Months' }
      ],
      explanation:
        'A lease charges you for two things each month: the value the car loses during the lease (Depreciation) plus a financing fee on the average capital tied up (Rent Charge = (Cap Cost + Residual) × MF). Adding sales tax gives the total monthly payment.'
    },
    examples: [
      {
        title: '36-Month Lease on a $35,000 MSRP Vehicle',
        scenario: 'A lessee negotiates a $35,000 MSRP car down to $32,000, puts $2,500 down, and signs a 36-month lease with a 58% residual, 0.0021 money factor, and 7.0% tax.',
        inputs: {
          'MSRP / Negotiated Price': '$35,000 / $32,000',
          'Down Payment': '$2,500',
          'Residual % / Term': '58% / 36 mos',
          'Money Factor / Tax': '0.0021 / 7.0%'
        },
        steps: [
          'Net Cap Cost = $32,000 - $2,500 = $29,500; Residual Value = $35,000 × 58% = $20,300',
          'Monthly Depreciation = ($29,500 - $20,300) / 36 = $255.56',
          'Monthly Rent Charge = ($29,500 + $20,300) × 0.0021 = $104.58 (Equiv. APR = 0.0021 × 2,400 = 5.04%)',
          'Base payment = $255.56 + $104.58 = $360.14; Plus 7% tax ($25.21) = $385.35/mo'
        ],
        result: 'Monthly Payment: $385.35 | Equivalent APR: 5.04% | Total 36-Mo Outlay: $16,373',
        takeaway: 'Negotiating the vehicle price down below MSRP lowers Net Cap Cost directly while keeping the MSRP-based residual value high, shrinking monthly depreciation.'
      }
    ],
    understandingResults:
      'Always convert the dealer’s Money Factor into Equivalent APR (MF × 2,400) so you can tell whether lease financing is competitive with bank auto loans. Notice also that large cash down payments ("cap cost reduction") are typically at risk if the leased vehicle is totaled or stolen early.',
    useCases: [
      {
        title: 'Auditing Dealership Lease Worksheets',
        description: 'Verify dealer quotes and spot marked-up money factors or inflated cap costs before signing.',
        targetAudience: 'Car Lessees',
        benefits: ['Expose hidden equivalent APR', 'Separate depreciation from finance fees', 'Compare residual percentages']
      },
      {
        title: 'Negotiation Prep',
        description: 'Test how lowering the negotiated price by $1,500–$3,000 reduces your monthly lease payment.',
        targetAudience: 'Auto Shoppers',
        benefits: ['Quantify price-cut impact', 'Model 24 vs. 36-month terms', 'Estimate total multi-year lease spend']
      }
    ],
    faqs: [
      {
        question: 'Why do you multiply Money Factor by 2,400 to get APR?',
        answer: 'Because the rent charge multiplies MF by (Cap Cost + Residual), which approximates twice the average balance, converting a monthly rate over 12 months requires multiplying by 2 × 12 × 100 = 2,400.'
      },
      {
        question: 'Is it smart to put a large down payment on a car lease?',
        answer: 'Usually no. If the car is stolen or totaled early, insurance pays the leasing company and your upfront cap-cost down payment is typically not refunded.'
      }
    ],
    importantNotes: [
      'Acquisition fees, dealer documentation fees, disposition fees, and excess mileage penalties are not added unless rolled into Negotiated Price.',
      'Verify whether your state taxes monthly payments, total lease payments, or full vehicle value.'
    ]
  },

  'down-payment-calculator': {
    introduction:
      'Your down payment percentage is one of the biggest levers in home financing: it determines your starting mortgage size, your Loan-to-Value (LTV) ratio, and whether you will be required to pay Private Mortgage Insurance (PMI).\n\nThe Down Payment Savings Calculator lets you adjust your home price and down payment percentage interactively to see the exact upfront cash needed, the resulting mortgage principal, your LTV ratio, and whether PMI is triggered.',
    howItWorks: {
      summary:
        'The calculator multiplies the home purchase price by your chosen down payment percentage to find upfront cash required, subtracts it from the purchase price to compute the loan principal, and evaluates whether LTV exceeds the 80% threshold for PMI.',
      steps: [
        {
          title: '1. Enter Home Purchase Price',
          detail: 'Input the target price of the home you plan to buy.'
        },
        {
          title: '2. Adjust Down Payment Percentage Slider',
          detail: 'Slide between 0% and 100% (or click quick presets like 3.5%, 5%, 10%, 15%, 20%) to model scenarios.'
        },
        {
          title: '3. Check LTV Ratio & PMI Status',
          detail: 'Inspect your required down payment cash, mortgage loan amount, Loan-to-Value percentage, and whether PMI applies.'
        }
      ],
      keyAssumptions: [
        'PMI is flagged whenever Loan-to-Value (LTV) exceeds 80% (i.e., down payment below 20%) on conventional financing.',
        'Closing costs (typically 2%–5% of purchase price) are separate from down payment cash.'
      ]
    },
    formula: {
      title: 'Down Payment, Loan Principal & LTV Equations',
      equation: 'Down Payment = Price × (DP% / 100)  |  Loan = Price - Down Payment  |  LTV = 100% - DP%',
      variables: [
        { symbol: 'Price', name: 'Home Purchase Price', description: 'Agreed purchase price of the property', unit: 'Currency ($)' },
        { symbol: 'DP%', name: 'Down Payment Percent', description: 'Percentage of purchase price paid upfront', unit: 'Percent (%)' },
        { symbol: 'Loan', name: 'Mortgage Principal', description: 'Remaining balance financed via mortgage', unit: 'Currency ($)' },
        { symbol: 'LTV', name: 'Loan-to-Value Ratio', description: 'Percentage of home value financed by the lender', unit: 'Percent (%)' }
      ],
      explanation:
        'Lenders price risk primarily by LTV. Putting 20% or more down keeps LTV at or below 80%, typically eliminating monthly Private Mortgage Insurance and unlocking better interest rates.'
    },
    examples: [
      {
        title: 'Comparing 20% vs. 10% Down on a $400,000 Home',
        scenario: 'A homebuyer evaluates putting 20% down versus 10% down on a $400,000 property.',
        inputs: {
          'Home Purchase Price': '$400,000',
          'Down Payment Option A': '20%',
          'Down Payment Option B': '10%'
        },
        steps: [
          'At 20% down: Cash = $400,000 × 20% = $80,000; Loan = $320,000; LTV = 80% (No PMI required)',
          'At 10% down: Cash = $400,000 × 10% = $40,000; Loan = $360,000; LTV = 90% (PMI required)'
        ],
        result: '20% Down: $80,000 Cash / 80% LTV (No PMI) vs. 10% Down: $40,000 Cash / 90% LTV (PMI)',
        takeaway: 'Reaching the 20% threshold reduces your mortgage principal by $40,000 and eliminates ongoing PMI fees.'
      }
    ],
    understandingResults:
      'Use the LTV indicator as a quick decision guide: an LTV above 80% means you will likely pay monthly PMI (often 0.3%–1.5% of the loan annually) until your equity reaches 20%. However, draining all your cash reserves just to hit 20% can leave you without an emergency fund—keep 2%–5% extra budgeted for closing costs and move-in reserves.',
    useCases: [
      {
        title: 'First-Time Buyer Cash Budgeting',
        description: 'Determine exact cash targets for FHA 3.5%, conventional 5%–10%, or PMI-free 20% down options.',
        targetAudience: 'Homebuyers',
        benefits: ['Instant LTV check', 'Clear PMI threshold warning', 'Test price ceilings quickly']
      },
      {
        title: 'Pre-Offer Scenario Modeling',
        description: 'Pair your calculated loan principal with the Mortgage Calculator to check monthly P&I payments.',
        targetAudience: 'House Hunters',
        benefits: ['Interactive percentage slider', 'Immediate principal readout', 'Avoid cash surprises']
      }
    ],
    faqs: [
      {
        question: 'Do I always need 20% down to buy a home?',
        answer: 'No. Conventional loans allow as little as 3%–5% down for qualified buyers, FHA loans start at 3.5%, and VA/USDA loans can offer 0% down, though lower down payments usually add mortgage insurance.'
      },
      {
        question: 'What is Loan-to-Value (LTV)?',
        answer: 'LTV is the ratio of your mortgage amount to the home’s appraised value or purchase price. Lower LTV represents lower lender risk.'
      }
    ],
    importantNotes: [
      'Closing costs (origination, appraisal, title, prepaid taxes/insurance) are not included in the down payment figure.',
      'VA loans generally do not charge monthly PMI even above 80% LTV, though a funding fee may apply.'
    ]
  },

  'emergency-fund-calculator': {
    introduction:
      'An emergency fund protects you from going into high-interest debt when unexpected job loss, medical bills, or urgent home and car repairs strike. Sizing that fund properly starts with your true essential monthly expenses—not discretionary lifestyle spending.\n\nThe Emergency Fund Calculator totals your non-negotiable monthly living costs across housing, utilities, groceries, insurance/debt minimums, and other essentials, calculates your 3- to 12-month target reserve, and tracks your exact shortfall and percentage funded.',
    howItWorks: {
      summary:
        'The calculator sums your core monthly survival expenses, multiplies that monthly burn by your chosen coverage duration (3, 6, 9, or 12 months), and compares the target reserve against your current emergency savings.',
      steps: [
        {
          title: '1. Enter Essential Monthly Living Costs',
          detail: 'Input monthly rent/mortgage, utilities, groceries, insurance & minimum debt payments, and other must-pay expenses.'
        },
        {
          title: '2. Select Months of Coverage',
          detail: 'Choose a 3-, 6-, 9-, or 12-month safety runway depending on income stability and household dependents.'
        },
        {
          title: '3. Enter Current Emergency Savings',
          detail: 'Input how much liquid cash you already hold in checking or high-yield savings accounts.'
        },
        {
          title: '4. Review Target Reserve & Remaining Shortfall',
          detail: 'See your monthly essential baseline, total target fund, percentage funded, and remaining dollars needed.'
        }
      ],
      keyAssumptions: [
        'Discretionary expenses (vacations, dining out, entertainment) can be paused during an emergency and are excluded from core essentials.',
        'Emergency reserves should sit in liquid, FDIC/NCUA-insured cash accounts rather than volatile investments.'
      ]
    },
    formula: {
      title: 'Emergency Reserve & Shortfall Equations',
      equation: 'Target Fund = Monthly Essentials × Target Months  |  Shortfall = max(0, Target Fund - Current Savings)',
      variables: [
        { symbol: 'Monthly Essentials', name: 'Core Monthly Burn', description: 'Housing + Utilities + Groceries + Insurance/Debt + Other Essentials', unit: 'Currency ($)' },
        { symbol: 'Target Months', name: 'Coverage Horizon', description: 'Desired months of expenses covered (3 to 12)', unit: 'Months' },
        { symbol: 'Target Fund', name: 'Recommended Reserve', description: 'Total cash cushion needed', unit: 'Currency ($)' },
        { symbol: 'Shortfall', name: 'Savings Gap', description: 'Additional cash needed to fully fund the reserve', unit: 'Currency ($)' }
      ],
      explanation:
        'Multiplying core monthly survival costs by your chosen runway sets a realistic cash target without forcing you to over-save for non-essential luxuries.'
    },
    examples: [
      {
        title: '6-Month Household Reserve Target',
        scenario: 'A household spends $1,800 on housing, $300 on utilities, $600 on groceries, $400 on insurance/minimums, and $300 on other essentials, with $5,000 saved for a 6-month target.',
        inputs: {
          'Monthly Essentials': '$1,800 + $300 + $600 + $400 + $300 = $3,400',
          'Target Duration': '6 Months',
          'Current Savings': '$5,000'
        },
        steps: [
          'Total Monthly Essentials = $3,400/month',
          '6-Month Target Fund = $3,400 × 6 = $20,400',
          'Remaining Shortfall = $20,400 - $5,000 = $15,400',
          'Percent Funded = ($5,000 / $20,400) × 100 = 24.5%'
        ],
        result: 'Target Fund: $20,400 | Funded: 24.5% | Remaining Shortfall: $15,400',
        takeaway: 'Breaking a $20,400 goal into essential categories clarifies your exact monthly burn and remaining savings gap.'
      }
    ],
    understandingResults:
      'A 3-month cushion generally fits dual-income households in stable industries; 6 months is the standard benchmark for most families; 9–12 months is advisable for single-income households, freelancers, or commission-based earners. Once your Shortfall reaches $0, redirect surplus monthly savings toward retirement or investments.',
    useCases: [
      {
        title: 'Financial Foundation Planning',
        description: 'Establish a concrete dollar target before prioritizing aggressive investing or extra mortgage payments.',
        targetAudience: 'Households & Young Professionals',
        benefits: ['Clear essential-only baseline', 'Visual progress percentage', 'Flexible 3–12 month horizons']
      },
      {
        title: 'Freelance & Variable-Income Buffering',
        description: 'Size a larger 9- or 12-month cash runway to smooth out seasonal revenue swings.',
        targetAudience: 'Self-Employed Workers',
        benefits: ['Protects against income dips', 'Prevents credit card reliance', 'Easy progress check-ins']
      }
    ],
    faqs: [
      {
        question: 'Where should I keep my emergency fund?',
        answer: 'Keep it in an FDIC-insured High-Yield Savings Account (HYSA) or money market account where it earns interest while remaining accessible within 1–2 business days.'
      },
      {
        question: 'Should I include dining out and subscriptions in essential expenses?',
        answer: 'No. Include only obligations you must pay during a crisis (housing, food, utilities, insurance, healthcare, minimum debt payments).'
      }
    ],
    importantNotes: [
      'Recalculate your emergency target after major life changes such as buying a home, having children, or changing income stability.',
      'Avoid locking emergency funds into illiquid CDs with heavy early-withdrawal penalties unless structured as a ladder.'
    ]
  },

  'cd-calculator': {
    introduction:
      'Certificates of Deposit (CDs) lock in a guaranteed yield for a fixed term—ranging from 3 months to 5 years—protecting your principal from rate cuts while typically outpaying standard checking or savings accounts.\n\nThe Certificate of Deposit (CD) Calculator computes your exact maturity balance, total interest earned, and effective annual yield across daily, monthly, quarterly, or annual compounding schedules.',
    howItWorks: {
      summary:
        'The calculator converts your CD term from months to years, applies the compound interest formula using your chosen compounding frequency, and reports ending balance, net interest earned, and percentage return.',
      steps: [
        {
          title: '1. Enter Initial CD Deposit',
          detail: 'Input the lump sum you plan to lock into the Certificate of Deposit.'
        },
        {
          title: '2. Set Interest Rate / APY & Term Length',
          detail: 'Enter the annual rate and select the CD maturity term in months (for example, 6, 12, 24, 36, or 60 months).'
        },
        {
          title: '3. Select Compounding Frequency',
          detail: 'Choose daily (365), monthly (12), quarterly (4), or annual (1) compounding to match the bank’s terms.'
        },
        {
          title: '4. Inspect Maturity Value & Interest Earned',
          detail: 'Review your exact ending payout at maturity and total guaranteed interest generated.'
        }
      ],
      keyAssumptions: [
        'Funds remain untouched until the CD maturity date (no early withdrawals or penalties).',
        'Interest stays inside the CD to compound rather than being transferred out monthly.'
      ]
    },
    formula: {
      title: 'Certificate of Deposit Maturity Formula',
      equation: 'A = P × (1 + r / n)^(n × t)  |  Interest Earned = A - P',
      variables: [
        { symbol: 'A', name: 'Maturity Balance', description: 'Total payout (principal + interest) when the CD matures', unit: 'Currency ($)' },
        { symbol: 'P', name: 'Initial Deposit', description: 'Starting lump-sum deposit placed in the CD', unit: 'Currency ($)' },
        { symbol: 'r', name: 'Annual Rate', description: 'Annual nominal interest rate as a decimal', unit: 'Decimal' },
        { symbol: 'n', name: 'Compounding Frequency', description: 'Compounding periods per year (1, 4, 12, or 365)', unit: 'Count/yr' },
        { symbol: 't', name: 'Term in Years', description: 'CD term in months divided by 12', unit: 'Years' }
      ],
      explanation:
        'Each compounding interval adds r/n of the current balance, so more frequent compounding (daily vs. quarterly) produces slightly higher total interest at maturity.'
    },
    examples: [
      {
        title: '12-Month CD with Monthly Compounding',
        scenario: 'A saver deposits $10,000 into a 12-month CD earning a 4.80% annual rate compounded monthly.',
        inputs: {
          'Initial Deposit (P)': '$10,000',
          'Annual Rate (r)': '4.80%',
          'Term': '12 Months (t = 1 yr)',
          'Compounding (n)': 'Monthly (12)'
        },
        steps: [
          'Periodic monthly rate = 0.048 / 12 = 0.004',
          'Total periods = 12 × 1 = 12',
          'Maturity Balance = $10,000 × (1.004)^12 = $10,490.70',
          'Total Interest Earned = $10,490.70 - $10,000 = $490.70'
        ],
        result: 'Maturity Balance: $10,490.70 | Interest Earned: $490.70',
        takeaway: 'Monthly compounding lifts a 4.80% nominal rate to an effective 4.91% yield over one year.'
      }
    ],
    understandingResults:
      'Compare the net interest earned across multiple term lengths (such as a 12-month vs. 36-month CD) to decide whether locking funds longer is worth sacrificing liquidity. If banks quote APY directly, remember that APY already bakes in compounding frequency, whereas nominal APR requires compounding adjustment.',
    useCases: [
      {
        title: 'Building a CD Ladder',
        description: 'Project maturity payouts across staggered 6-, 12-, 24-, and 36-month CDs.',
        targetAudience: 'Conservative Savers',
        benefits: ['Predictable maturity cash flows', 'Compare bank compounding rules', 'Lock in peak interest rates']
      },
      {
        title: 'Short-Term Cash Parking',
        description: 'Measure guaranteed returns on funds earmarked for a home purchase or tax bill next year.',
        targetAudience: 'Goal Savers',
        benefits: ['Zero principal market risk', 'Exact interest readout', 'Compare against HYSA yields']
      }
    ],
    faqs: [
      {
        question: 'What happens if I withdraw money from a CD before maturity?',
        answer: 'Most traditional CDs charge an early-withdrawal penalty (commonly 3 to 12 months of interest), which can reduce your net return or principal.'
      },
      {
        question: 'Are CDs insured against bank failure?',
        answer: 'Yes—CDs at FDIC-insured banks and NCUA-insured credit unions are typically covered up to $250,000 per depositor, per institution, per ownership category.'
      }
    ],
    importantNotes: [
      'CD interest is generally taxed as ordinary income in the year it is credited, even before maturity on multi-year CDs.',
      'Watch out for automatic rollover windows at maturity if you intend to move the funds.'
    ]
  },

  '401k-match-calculator': {
    introduction:
      'An employer 401(k) match is effectively an immediate, guaranteed return on your retirement contributions—yet contributing below the match cap leaves free compensation on the table.\n\nThe 401(k) Employer Match Calculator computes your annual employee deferral, the exact dollar match contributed by your employer based on their formula and cap, and your projected retirement balance separating your contributions, employer match, and compound investment growth.',
    howItWorks: {
      summary:
        'The calculator determines your annual contribution from salary and deferral percentage, calculates the employer match up to the eligible salary cap, and compounds the combined annual contributions plus your current balance year by year until retirement age.',
      steps: [
        {
          title: '1. Enter Ages, Current Balance & Annual Salary',
          detail: 'Provide your current age, retirement age, existing 401(k) balance, and gross annual salary.'
        },
        {
          title: '2. Set Your Contribution & Employer Match Rules',
          detail: 'Input your salary deferral %, your employer’s match rate (e.g., 50% or 100%), and the employer match cap % (e.g., up to 6% of salary).'
        },
        {
          title: '3. Specify Expected Annual Return',
          detail: 'Enter an estimated long-term annual portfolio return percentage.'
        },
        {
          title: '4. Inspect Free Employer Match & Projected Growth',
          detail: 'Review your yearly employer match, total projected balance, and the breakdown between employee deposits, employer match, and investment gains.'
        }
      ],
      keyAssumptions: [
        'Salary, contribution percentage, and employer match formula remain constant until retirement age.',
        'Combined annual contributions compound once per year at the expected return rate.'
      ]
    },
    formula: {
      title: 'Employer Match & Annual Compounding Equations',
      equation: 'Match = Salary × min(Employee%, Cap%) × Match%  |  B_(y) = (B_(y-1) + Employee + Match) × (1 + r)',
      variables: [
        { symbol: 'Employee', name: 'Annual Employee Contribution', description: 'Salary × Employee Contribution %', unit: 'Currency ($)' },
        { symbol: 'Match', name: 'Annual Employer Match', description: 'Employer contribution capped at the match limit % of salary', unit: 'Currency ($)' },
        { symbol: 'r', name: 'Expected Annual Return', description: 'Projected portfolio growth rate per year', unit: 'Decimal' },
        { symbol: 'B_(y)', name: 'Projected Balance', description: 'Ending 401(k) balance after y compounding years', unit: 'Currency ($)' }
      ],
      explanation:
        'Only employee deferrals up to Cap% earn the employer’s Match%. Contributing less than Cap% forfeits part of the match; contributing more adds to your tax-advantaged growth even though the employer match stops at the cap.'
    },
    examples: [
      {
        title: '50% Match Up to 6% on an $85,000 Salary',
        scenario: 'A 30-year-old earning $85,000 with $45,000 saved contributes 8% of salary, while the employer matches 50% up to 6% of salary, growing at 7.5% annually to age 65 (35 years).',
        inputs: {
          'Current Balance': '$45,000',
          'Salary': '$85,000',
          'Employee Deferral': '8% ($6,800/yr)',
          'Employer Match': '50% up to 6% cap',
          'Return / Years': '7.5% / 35 yrs'
        },
        steps: [
          'Employee annual contribution = $85,000 × 8% = $6,800/yr',
          'Matched salary % = min(8%, 6%) = 6%; Employer annual match = $85,000 × 6% × 50% = $2,550/yr',
          'Total annual contribution = $6,800 + $2,550 = $9,350/yr',
          'Compounded annually for 35 years at 7.5%: Ending 401(k) Balance = $2,116,021'
        ],
        result: 'Annual Free Match: $2,550 | Projected Balance at Age 65: $2,116,021',
        takeaway: 'Capture at least the full 6% match threshold—that $2,550 annual employer match alone compounds into hundreds of thousands of dollars by retirement.'
      }
    ],
    understandingResults:
      'Verify first that your Employee Contribution % is at least equal to the Employer Match Limit % so you capture 100% of available matching dollars. Then examine the "Total Growth" share versus total contributions to see how starting early lets compounding dominate your final balance.',
    useCases: [
      {
        title: 'Optimizing Payroll 401(k) Deferrals',
        description: 'Find the minimum percentage of your paycheck required to unlock the entire employer match.',
        targetAudience: 'Plan Participants',
        benefits: ['Avoid leaving free match behind', 'See lifetime impact of +1%–2% deferrals', 'Separate match vs. personal contributions']
      },
      {
        title: 'Job Offer Benefits Comparison',
        description: 'Compare the long-term dollar value of a 50%-up-to-6% match versus a 100%-up-to-4% match.',
        targetAudience: 'Job Candidates',
        benefits: ['Quantify hidden compensation', 'Multi-decade compounding view', 'Instant match-rule modeling']
      }
    ],
    faqs: [
      {
        question: 'Do IRS 401(k) contribution limits restrict my deferrals?',
        answer: 'Yes. The IRS sets annual caps on employee elective deferrals (plus catch-up allowances for ages 50+); employer matches do not count toward your personal employee elective limit.'
      },
      {
        question: 'What is a 401(k) vesting schedule?',
        answer: 'Your own contributions are always 100% yours, but employer match dollars may vest over 1–6 years of service depending on your company’s plan rules.'
      }
    ],
    importantNotes: [
      'Does not automatically enforce annual IRS dollar contribution limits if your salary × percentage exceeds statutory caps.',
      'Traditional 401(k) withdrawals are taxed as ordinary income in retirement; Roth 401(k) employee contributions are after-tax.'
    ]
  }
};
