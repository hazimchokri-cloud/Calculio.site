import { CalculatorExplanation } from '../../types';

export const MATH_EXPLANATIONS: Record<string, CalculatorExplanation> = {
  'ratio-calculator': {
    introduction:
      'Ratios express how one quantity compares to another, whether you are scaling concrete mixes, adjusting baking recipes, calculating screen aspect ratios, or splitting partnership equity.\n\nThe Ratio & Proportion Calculator solves missing values in equivalent proportions (A : B = C : D), simplifies any pair of whole numbers into lowest terms using the Greatest Common Divisor (GCD), and divides a total amount across multi-part ratios.',
    howItWorks: {
      summary:
        'Depending on the selected tab, the calculator applies cross-multiplication to solve unknown terms in A : B = C : D, divides both terms by their GCD to reduce ratios, or allocates a total quantity proportionally across split weights.',
      steps: [
        {
          title: '1. Choose Ratio Operation Mode',
          detail: 'Select Solve Proportion (A : B = C : D), Simplify Ratio, or Divide Total by Ratio.'
        },
        {
          title: '2. Enter Known Numbers',
          detail: 'Provide any three of the four terms in a proportion (leaving one blank to solve), two terms to simplify, or a total and colon-separated ratio parts (e.g., 2:3:5).'
        },
        {
          title: '3. Execute Exact Arithmetic',
          detail: 'The tool cross-multiplies proportions, applies the Euclidean GCD algorithm for simplification, or computes share per part for quantity splitting.'
        },
        {
          title: '4. Inspect Reduced & Decimal Forms',
          detail: 'Review the solved value, simplified whole-number ratio, unit ratio (1 : n), and percentage breakdown.'
        }
      ],
      keyAssumptions: [
        'Non-zero values are required in proportion denominators (B, C, or D depending on which variable is solved).',
        'Simplification reduces integer pairs using their Greatest Common Divisor.',
        'Ratio divider accepts colon-separated positive parts such as 1:2:3.'
      ]
    },
    formula: {
      title: 'Proportion Cross-Multiplication & Ratio Reduction',
      equation: 'A / B = C / D  →  A × D = B × C  |  Simplified = (A / GCD) : (B / GCD)',
      variables: [
        { symbol: 'A, B', name: 'Base Ratio Terms', description: 'First pair of proportional quantities', unit: 'Number' },
        { symbol: 'C, D', name: 'Scaled Ratio Terms', description: 'Second pair maintaining equal proportion to A : B', unit: 'Number' },
        { symbol: 'GCD', name: 'Greatest Common Divisor', description: 'Largest integer dividing both A and B evenly', unit: 'Integer' }
      ],
      explanation:
        'Cross-multiplying A × D = B × C isolates any single missing term (for example, C = (A × D) / B), while dividing both sides of a ratio by GCD(A, B) leaves the smallest equivalent integers.'
    },
    examples: [
      {
        title: 'Solving a Scaled Proportion & Dividing Funds',
        scenario: 'Solve 4 : 6 = C : 15, then split a $1,000 bonus in a 2 : 3 : 5 ratio.',
        inputs: {
          'Proportion': '4 : 6 = C : 15',
          'Total Bonus': '$1,000',
          'Split Parts': '2 : 3 : 5'
        },
        steps: [
          'Cross-multiply to find C: C = (4 × 15) / 6 = 60 / 6 = 10',
          'Sum of split parts = 2 + 3 + 5 = 10 parts ($1,000 / 10 = $100 per part)',
          'Individual shares: 2 × $100 = $200, 3 × $100 = $300, 5 × $100 = $500'
        ],
        result: 'Unknown C = 10 | Split Shares: $200, $300, $500',
        takeaway: 'Notice 4:6 simplifies to 2:3 (GCD = 2), matching the equivalent reduced form of 10:15 (GCD = 5).'
      }
    ],
    understandingResults:
      'In proportion mode, double-check that matching quantities occupy matching positions on both sides (for example, Width : Height = New Width : New Height). In split mode, confirm that the sum of allocated shares equals your original total before rounding.',
    useCases: [
      {
        title: 'Design & Screen Aspect Ratios',
        description: 'Resize images, videos, or layouts proportionally without stretching or cropping.',
        targetAudience: 'Designers & Developers',
        benefits: ['Preserves exact aspect ratio', 'Prevents distortion', 'Instant 1 : n scaling factor']
      },
      {
        title: 'Recipes, Concrete & Profit Sharing',
        description: 'Scale multi-ingredient mixes or divide revenue across weighted partner shares.',
        targetAudience: 'Chefs, Builders & Partners',
        benefits: ['Handles multi-part colon ratios', 'Simplifies messy numbers', 'Zero rounding guesswork']
      }
    ],
    faqs: [
      {
        question: 'What is the difference between a ratio and a fraction?',
        answer: 'A ratio compares part-to-part or part-to-whole (such as 2 boys to 3 girls, or 2:3), whereas a fraction usually represents part-to-whole (2/5 of the group).'
      },
      {
        question: 'How do I scale an image keeping a 16:9 aspect ratio?',
        answer: 'Enter A = 16, B = 9, enter your desired width as C (or height as D), and leave the remaining field blank to solve.'
      }
    ],
    importantNotes: [
      'Maintain identical units within each pair of ratio terms.',
      'Leave only one proportion box empty when solving for an unknown.'
    ]
  },

  'average-calculator': {
    introduction:
      'The word "average" usually refers to the arithmetic mean, yet a single extreme outlier—like one billionaire in a neighborhood—can pull the arithmetic mean far above what is typical. Depending on your data, the median, mode, geometric mean, or harmonic mean tells a far more accurate story.\n\nThe Average Calculator computes Arithmetic Mean, Median, Mode, Range, Geometric Mean, Harmonic Mean, Sum, and Count from any comma- or space-separated dataset, plus Weighted Averages when items carry unequal importance.',
    howItWorks: {
      summary:
        'The calculator parses your numerical dataset (ignoring invalid tokens), sorts values to find the median, minimum, maximum, and mode frequencies, evaluates arithmetic, geometric (for positive values), and harmonic means, or computes Σ(x·w)/Σw in weighted mode.',
      steps: [
        {
          title: '1. Select Standard or Weighted Mode',
          detail: 'Choose Standard Dataset for raw lists of numbers or Weighted Average when each score carries a custom weight (such as course credits).'
        },
        {
          title: '2. Enter Data Values',
          detail: 'Paste or type numbers separated by commas, spaces, or line breaks.'
        },
        {
          title: '3. Compute Central Tendency & Spread',
          detail: 'The tool calculates Sum, Count, Arithmetic Mean, sorted Median, most frequent Mode(s), and Range (Max − Min).'
        },
        {
          title: '4. Compare Geometric & Harmonic Means',
          detail: 'For strictly positive datasets, Geometric Mean (ideal for growth rates) and Harmonic Mean (ideal for average rates/speeds) are computed automatically.'
        }
      ],
      keyAssumptions: [
        'Standard mode treats every valid number in the list with equal weight.',
        'Geometric and Harmonic means require all entries to be strictly positive (> 0).',
        'Datasets with every value appearing once have no unique mode.'
      ]
    },
    formula: {
      title: 'Arithmetic, Weighted, Geometric & Harmonic Means',
      equation: 'Mean = Σx / n | Weighted = Σ(w·x) / Σw | Geometric = (Πx)^(1/n) | Harmonic = n / Σ(1/x)',
      variables: [
        { symbol: 'Σx', name: 'Dataset Sum', description: 'Total of all numerical values in the sample', unit: 'Number' },
        { symbol: 'n', name: 'Count', description: 'Total number of valid data points', unit: 'Count' },
        { symbol: 'w', name: 'Weight Factor', description: 'Relative importance or credit weight assigned to each x', unit: 'Number' }
      ],
      explanation:
        'Arithmetic mean balances total sum evenly; median identifies the 50th percentile middle rank; geometric mean compounds multiplicative returns; harmonic mean averages rates over fixed distances.'
    },
    examples: [
      {
        title: 'Comparing Mean vs. Median on a Skewed Sample',
        scenario: 'Evaluate the dataset [10, 20, 20, 30, 70].',
        inputs: {
          'Dataset': '10, 20, 20, 30, 70'
        },
        steps: [
          'Count n = 5; Sum = 10 + 20 + 20 + 30 + 70 = 150',
          'Arithmetic Mean = 150 / 5 = 30',
          'Median (middle of sorted list) = 20; Mode (most frequent) = 20',
          'Range = 70 - 10 = 60'
        ],
        result: 'Mean: 30 | Median: 20 | Mode: 20 | Range: 60',
        takeaway: 'The single high value (70) pulls the Mean up to 30, while both the Median and Mode stay at 20.'
      }
    ],
    understandingResults:
      'Use the Arithmetic Mean for symmetric measurements (like lab test scores), the Median when extreme outliers skew the data (like salaries or home prices), the Geometric Mean for multi-year investment growth rates, and the Harmonic Mean when averaging speeds across equal-distance legs.',
    useCases: [
      {
        title: 'Academic Grading & Weighted Scores',
        description: 'Combine homework, midterm, and final exam grades using exact syllabus weights.',
        targetAudience: 'Students & Teachers',
        benefits: ['Supports Weighted Average mode', 'Checks mean vs. median class curve', 'Handles flexible lists']
      },
      {
        title: 'Financial & Rate Analysis',
        description: 'Compute geometric compound returns or harmonic price-to-earnings and speed averages.',
        targetAudience: 'Analysts & Researchers',
        benefits: ['Includes Geometric and Harmonic means', 'Highlights outlier skew', 'Instant summary statistics']
      }
    ],
    faqs: [
      {
        question: 'When should I use Median instead of Mean?',
        answer: 'Use the Median whenever extreme high or low outliers distort the average—such as household income, home prices, or reaction times.'
      },
      {
        question: 'Can a dataset have more than one mode?',
        answer: 'Yes. If two or more values tie for highest frequency (and appear more than once), the dataset is bimodal or multimodal.'
      }
    ],
    importantNotes: [
      'Double-check delimiter formatting when pasting columns from spreadsheets.',
      'Geometric and Harmonic means will show as unavailable if any value is zero or negative.'
    ]
  },

  'probability-calculator': {
    introduction:
      'Probability quantifies uncertainty from 0 (impossible) to 1 (certain), forming the backbone of statistics, risk management, genetics, and game theory. Even simple multi-event questions—like the chance of event A or event B occurring—often trip people up when overlap is forgotten.\n\nThe Probability Calculator supports three core modes: Single Event probability & odds, Two-Event joint/union/complement probabilities (independent or mutually exclusive), and Combinatorics for Permutations (nPr) and Combinations (nCr).',
    howItWorks: {
      summary:
        'The calculator evaluates favorable-to-total ratios and betting odds in Single Event mode, applies multiplication and inclusion-exclusion rules in Two Events mode, and computes factorial arrangement counts in Combinatorics mode.',
      steps: [
        {
          title: '1. Select Probability Mode',
          detail: 'Choose Single Event, Two Events (A & B), or Combinatorics (nPr / nCr).'
        },
        {
          title: '2. Enter Event Parameters',
          detail: 'Provide favorable/total outcomes, individual probabilities P(A) and P(B) with independence setting, or n and r counts.'
        },
        {
          title: '3. Compute Exact Probabilities & Odds',
          detail: 'The tool calculates probability in decimal and percent, complementary P(not A), odds in favor/against, or intersection and union probabilities.'
        },
        {
          title: '4. Inspect Combinatorial Counts',
          detail: 'In combinatorics mode, compare order-sensitive nPr permutations against order-independent nCr combinations.'
        }
      ],
      keyAssumptions: [
        'Probabilities must lie between 0 and 1 inclusive.',
        'Two-event P(A and B) = P(A) × P(B) assumes statistical independence; mutually exclusive events have P(A and B) = 0.',
        'Combinatorics supports integer inputs n ≥ r ≥ 0.'
      ]
    },
    formula: {
      title: 'Core Probability, Union & Combinatorics Equations',
      equation: 'P(A) = Favorable / Total | P(A ∪ B) = P(A) + P(B) - P(A ∩ B) | nCr = n! / [r!(n - r)!]',
      variables: [
        { symbol: 'P(A), P(B)', name: 'Event Probabilities', description: 'Likelihood of each event occurring (0 to 1)', unit: 'Decimal' },
        { symbol: 'P(A ∩ B)', name: 'Joint Probability', description: 'Chance both A and B happen (P(A)×P(B) if independent)', unit: 'Decimal' },
        { symbol: 'P(A ∪ B)', name: 'Union Probability', description: 'Chance A, B, or both happen (inclusion-exclusion)', unit: 'Decimal' },
        { symbol: 'nPr / nCr', name: 'Arrangements', description: 'Ordered permutations vs. unordered combinations', unit: 'Count' }
      ],
      explanation:
        'When two events can occur together, subtracting P(A ∩ B) from P(A) + P(B) avoids double-counting the overlap where both events happen simultaneously.'
    },
    examples: [
      {
        title: 'Two Independent Events Intersection & Union',
        scenario: 'Suppose P(A) = 0.5 (50%) and P(B) = 0.25 (25%), and the two events are independent.',
        inputs: {
          'P(A)': '0.50',
          'P(B)': '0.25',
          'Relationship': 'Independent'
        },
        steps: [
          'Joint probability P(A and B) = 0.50 × 0.25 = 0.125 (12.5%)',
          'Union probability P(A or B) = 0.50 + 0.25 - 0.125 = 0.625 (62.5%)',
          'Complement neither occurs P(neither) = 1 - 0.625 = 0.375 (37.5%)'
        ],
        result: 'P(A and B) = 12.5% | P(A or B) = 62.5%',
        takeaway: 'Without subtracting the 12.5% overlap, simply adding 50% + 25% would overstate P(A or B) at 75%.'
      }
    ],
    understandingResults:
      'Review both decimal (0–1) and percentage (0%–100%) forms alongside odds ratios ("a : b" favorable vs. unfavorable). Remember the difference between mutually exclusive events (cannot occur together, such as rolling a 2 and a 5 on one die) and independent events (one outcome does not alter the other, such as two coin flips).',
    useCases: [
      {
        title: 'Statistics & Probability Coursework',
        description: 'Verify single-event ratios, Venn diagram unions, and counting problems step by step.',
        targetAudience: 'Students & Instructors',
        benefits: ['Covers 3 distinct probability modes', 'Prevents overlap double-counting', 'Outputs odds and percentages']
      },
      {
        title: 'Risk & Scenario Modeling',
        description: 'Estimate combined failure or success rates across independent tests or trials.',
        targetAudience: 'Engineers & Analysts',
        benefits: ['Clear P(neither) and P(both) readouts', 'Fast sensitivity checks', 'Clean decimal formatting']
      }
    ],
    faqs: [
      {
        question: 'What is the difference between independent and mutually exclusive events?',
        answer: 'Independent events do not influence each other and can happen together; mutually exclusive events can never happen at the same time (so P(A and B) = 0).'
      },
      {
        question: 'When should I use Permutations (nPr) vs. Combinations (nCr)?',
        answer: 'Use nPr when order matters (like a 1st/2nd/3rd podium finish) and nCr when order does not matter (like choosing a 3-person committee).'
      }
    ],
    importantNotes: [
      'Very large factorials can exceed JavaScript floating-point precision above n = 170.',
      'Ensure event probabilities reflect genuine independence before multiplying P(A) × P(B).'
    ]
  },

  'statistics-calculator': {
    introduction:
      'Two datasets can share the exact same mean yet behave completely differently if one clusters tightly around the average while the other swings wildly between extremes. Measuring spread—variance and standard deviation—is essential for quality control, finance, and scientific research.\n\nThe Statistics & Standard Deviation Calculator computes both Sample (n − 1) and Population (n) variance and standard deviation alongside mean, median, mode, minimum, maximum, range, and sum for any list of numbers.',
    howItWorks: {
      summary:
        'The calculator parses your dataset, computes the arithmetic mean, sums the squared deviations (xᵢ − μ)² from the mean, and divides by N for population variance or by N − 1 (Bessel’s correction) for sample variance before taking square roots.',
      steps: [
        {
          title: '1. Paste or Enter Dataset',
          detail: 'Type or paste numbers separated by commas, spaces, or newlines.'
        },
        {
          title: '2. Compute Central Tendency & Sum',
          detail: 'The tool calculates Count (n), Sum, Mean, Median, Mode, Min, Max, and Range.'
        },
        {
          title: '3. Sum Squared Deviations',
          detail: 'Each number’s distance from the mean is squared and summed so positive and negative offsets do not cancel out.'
        },
        {
          title: '4. Output Sample & Population Spread',
          detail: 'Displays Sample Standard Deviation (s, divisor n − 1) and Population Standard Deviation (σ, divisor n) plus both variances.'
        }
      ],
      keyAssumptions: [
        'Sample statistics (s, s²) require at least n ≥ 2 observations.',
        'Uses Bessel’s correction (n − 1) for sample variance to yield an unbiased estimator.',
        'Input tokens that are non-numeric are ignored safely.'
      ]
    },
    formula: {
      title: 'Sample & Population Standard Deviation Formulas',
      equation: 'Sample: s = √[ Σ(xᵢ - x̄)² / (n - 1) ] | Population: σ = √[ Σ(xᵢ - μ)² / N ]',
      variables: [
        { symbol: 's / σ', name: 'Standard Deviation', description: 'Average spread around the mean in original units', unit: 'Data Unit' },
        { symbol: 's² / σ²', name: 'Variance', description: 'Average squared deviation from the mean', unit: 'Unit²' },
        { symbol: 'x̄ / μ', name: 'Mean', description: 'Arithmetic average of all observations', unit: 'Data Unit' },
        { symbol: 'n / N', name: 'Observation Count', description: 'Number of data points (n − 1 used for samples)', unit: 'Count' }
      ],
      explanation:
        'Dividing by (n − 1) for a sample corrects the slight downward bias that occurs when estimating spread relative to a sample mean rather than the true population mean.'
    },
    examples: [
      {
        title: '10-Observation Quality Sample Analysis',
        scenario: 'Analyze the measurements [4, 8, 6, 5, 3, 2, 8, 9, 2, 5].',
        inputs: {
          'Dataset (n = 10)': '4, 8, 6, 5, 3, 2, 8, 9, 2, 5'
        },
        steps: [
          'Sum = 52 → Mean (x̄) = 52 / 10 = 5.2',
          'Sum of squared deviations Σ(xᵢ - 5.2)² = 57.6',
          'Population Variance σ² = 57.6 / 10 = 5.76 → Population SD σ = √5.76 = 2.40',
          'Sample Variance s² = 57.6 / 9 = 6.40 → Sample SD s = √6.40 = 2.53'
        ],
        result: 'Mean: 5.2 | Sample SD (s): 2.53 | Population SD (σ): 2.40',
        takeaway: 'Knowing whether your dataset is a full population or a subset sample determines whether s (2.53) or σ (2.40) is reported.'
      }
    ],
    understandingResults:
      'Choose Sample Standard Deviation (s) when working with survey samples, lab trials, or subsets drawn from a larger population—it is the standard in most scientific papers. Use Population Standard Deviation (σ) only when your dataset includes every single member of the entire group being studied.',
    useCases: [
      {
        title: 'Lab Reports & Experimental Error',
        description: 'Calculate sample mean and standard deviation across repeated measurements.',
        targetAudience: 'Students & Researchers',
        benefits: ['Outputs both s and σ clearly', 'Includes variance and range', 'Fast copy/paste data entry']
      },
      {
        title: 'Manufacturing & Finance Volatility',
        description: 'Quantify consistency in batch weights or monthly return dispersion.',
        targetAudience: 'Engineers & Analysts',
        benefits: ['Flags wide variance', 'Shows min/max extremes', 'Zero spreadsheet setup']
      }
    ],
    faqs: [
      {
        question: 'Why is Sample Standard Deviation slightly larger than Population Standard Deviation?',
        answer: 'Sample SD divides squared deviations by (n − 1) instead of n, which widens the estimate slightly to compensate for sampling uncertainty.'
      },
      {
        question: 'What does a standard deviation of 0 mean?',
        answer: 'A standard deviation of 0 means every value in the dataset is identical, with zero variation.'
      }
    ],
    importantNotes: [
      'Extremely large outliers inflate standard deviation dramatically because deviations are squared.',
      'For skewed distributions, review Median and Range alongside Mean and Standard Deviation.'
    ]
  },

  'exponent-calculator': {
    introduction:
      'Exponents represent repeated multiplication and drive exponential growth, scientific notation, decibel scales, and compound interest formulas. While positive integer powers are straightforward, negative exponents, zero exponents, and fractional exponents (roots) follow specific algebraic rules that frequently cause sign errors.\n\nThe Exponent Calculator evaluates any real base raised to any positive, negative, zero, or fractional exponent (x^y), displaying standard decimal, high-precision, and scientific notation outputs along with algebraic simplification rules.',
    howItWorks: {
      summary:
        'The calculator computes Math.pow(base, exponent) using IEEE 754 floating-point precision, handles negative exponents as reciprocals (1 / x^|y|), detects zero-exponent identities, and formats huge or tiny outputs in scientific notation.',
      steps: [
        {
          title: '1. Enter Base (x) and Exponent (y)',
          detail: 'Provide any base number and any positive, negative, or decimal exponent.'
        },
        {
          title: '2. Apply Power & Reciprocal Laws',
          detail: 'Positive exponents multiply repeatedly; negative exponents take the reciprocal 1 / x^|y|; fractional exponents evaluate x^(p/q).'
        },
        {
          title: '3. Format Output & Scientific Notation',
          detail: 'Displays standard formatted output alongside normalized scientific notation (e.g., 1.024 × 10³) for extreme magnitudes.'
        }
      ],
      keyAssumptions: [
        '0⁰ is treated following IEEE 754 convention as 1, while 0 raised to a negative power is undefined (division by zero).',
        'Fractional exponents of negative bases (such as (-4)^0.5) are undefined in real numbers.',
        'Very large results above 10³⁰⁸ overflow double-precision limits into Infinity.'
      ]
    },
    formula: {
      title: 'Core Laws of Exponents',
      equation: 'x^n = x × x × ... × x (n times) | x^(-n) = 1 / x^n | x^(1/n) = ⁿ√x | x⁰ = 1 (x ≠ 0)',
      variables: [
        { symbol: 'x', name: 'Base', description: 'The number being multiplied by itself', unit: 'Real Number' },
        { symbol: 'y (or n)', name: 'Exponent / Power', description: 'Number of times the base factor is applied', unit: 'Real Number' }
      ],
      explanation:
        'Negative exponents flip the base into the denominator rather than making the answer negative; fractional exponents correspond to taking the denominator root of the base.'
    },
    examples: [
      {
        title: 'Negative Exponent Reciprocal Evaluation',
        scenario: 'Calculate 2 raised to the -3 power (2⁻³).',
        inputs: {
          'Base (x)': '2',
          'Exponent (y)': '-3'
        },
        steps: [
          'Apply the negative exponent law: 2⁻³ = 1 / 2³',
          'Evaluate the positive denominator power: 2³ = 2 × 2 × 2 = 8',
          'Divide: 1 / 8 = 0.125'
        ],
        result: '2⁻³ = 0.125 (1/8)',
        takeaway: 'A negative exponent produces a fraction between 0 and 1 for bases > 1—not a negative number.'
      }
    ],
    understandingResults:
      'Check scientific notation whenever results exceed millions or fall below millionths, as compact decimal strings can obscure scale. If you enter a negative base with a decimal exponent like 0.5, the calculator flags a real-number domain error because even roots of negative numbers are complex.',
    useCases: [
      {
        title: 'Algebra & Physics Calculations',
        description: 'Verify scientific notation powers, inverse-square laws, and fractional root powers quickly.',
        targetAudience: 'Students & Engineers',
        benefits: ['Handles negative & decimal powers', 'Outputs scientific notation', 'Prevents sign mistakes']
      },
      {
        title: 'Finance & Growth Modeling',
        description: 'Evaluate compounding factors such as (1 + r)^t before building multi-period spreadsheets.',
        targetAudience: 'Finance Students & Analysts',
        benefits: ['High-precision decimal output', 'Instant base/exponent swap', 'Zero mental arithmetic']
      }
    ],
    faqs: [
      {
        question: 'Why does any non-zero number raised to the power of 0 equal 1?',
        answer: 'By the quotient rule x^a / x^a = x^(a-a) = x⁰. Since any non-zero number divided by itself is 1, x⁰ must equal 1.'
      },
      {
        question: 'Does (-2)^4 equal -2^4?',
        answer: 'No. (-2)^4 = (-2)×(-2)×(-2)×(-2) = +16, whereas -2^4 applies the negative sign after the exponent to give -16.'
      }
    ],
    importantNotes: [
      'Use parentheses carefully in algebraic expressions when working with negative bases.',
      'Results exceeding ~10¹⁵ may lose trailing integer precision due to standard 64-bit floating-point limits.'
    ]
  },

  'square-root-calculator': {
    introduction:
      'Square roots, cube roots, and higher nth roots appear throughout geometry, physics, statistics, and engineering—from finding the side of a square field to computing standard deviations and solving Pythagorean distances.\n\nThe Square Root & Radical Calculator computes the principal nth root (defaulting to square root n = 2), handles real odd roots of negative numbers (such as ∛−27 = −3), checks whether a number is a perfect power, and simplifies square roots into exact reduced radical form (a√b).',
    howItWorks: {
      summary:
        'The calculator validates whether a real root exists for your radicand and root index, evaluates x^(1/n) (negating correctly for odd roots of negative inputs), and factors out the largest perfect square when n = 2 to display simplified radical form a√b.',
      steps: [
        {
          title: '1. Enter Radicand (x) and Root Index (n)',
          detail: 'Input the number inside the radical sign and choose the root degree (2 for square root, 3 for cube root, or any positive integer n).'
        },
        {
          title: '2. Check Domain & Odd/Even Parity',
          detail: 'Even roots require non-negative inputs in the real numbers; odd roots allow negative radicands.'
        },
        {
          title: '3. Simplify Square Radical (a√b)',
          detail: 'For square roots of integers, the tool extracts the largest perfect square factor to present exact simplified form alongside the decimal approximation.'
        }
      ],
      keyAssumptions: [
        'Displays the principal (non-negative for even n) real root.',
        'Even roots of negative numbers require complex/imaginary units and return a domain warning.',
        'Exact radical simplification a√b applies to integer square roots.'
      ]
    },
    formula: {
      title: 'Principal nth Root & Radical Simplification',
      equation: 'ⁿ√x = x^(1/n) | √(a² × b) = a√b',
      variables: [
        { symbol: 'x', name: 'Radicand', description: 'Number beneath the radical symbol', unit: 'Real Number' },
        { symbol: 'n', name: 'Root Index', description: 'Degree of the root (2 = square root, 3 = cube root)', unit: 'Integer ≥ 2' },
        { symbol: 'a√b', name: 'Simplified Radical', description: 'Exact radical extracted via largest perfect square factor a²', unit: 'Exact Form' }
      ],
      explanation:
        'Because √(a² × b) = √(a²) × √b = a√b, factoring out every squared prime leaves the smallest square-free integer b inside the radical sign.'
    },
    examples: [
      {
        title: 'Simplifying √72 into Exact Radical Form',
        scenario: 'Find both the exact simplified radical and decimal value of √72.',
        inputs: {
          'Radicand (x)': '72',
          'Root Index (n)': '2 (Square Root)'
        },
        steps: [
          'Identify the largest perfect square dividing 72: 72 = 36 × 2',
          'Split the radical: √72 = √36 × √2 = 6√2',
          'Evaluate decimal approximation: 6 × 1.41421356 = 8.48528'
        ],
        result: 'Exact Form: 6√2 | Decimal: 8.4853',
        takeaway: 'Keeping exact answers as 6√2 avoids compounding rounding errors in multi-step geometry proofs.'
      }
    ],
    understandingResults:
      'Use the simplified radical (e.g., 6√2) for exact math homework and algebraic proofs, and use the decimal readout when cutting physical materials or reporting engineering tolerances. Remember that solving an equation like x² = 72 yields two solutions (±6√2), whereas √72 denotes only the positive principal root.',
    useCases: [
      {
        title: 'Algebra & Geometry Simplification',
        description: 'Reduce square roots to simplest radical form a√b without manual prime factorization.',
        targetAudience: 'High School & College Students',
        benefits: ['Instant exact a√b reduction', 'Identifies perfect squares/cubes', 'Supports arbitrary nth roots']
      },
      {
        title: 'Cube & Higher Root Evaluation',
        description: 'Solve volume-to-side-length cube roots or compound CAGR nth roots cleanly.',
        targetAudience: 'Engineers & Finance Analysts',
        benefits: ['Supports negative cube roots', 'High decimal precision', 'Fast switching of index n']
      }
    ],
    faqs: [
      {
        question: 'Can I take the cube root of a negative number?',
        answer: 'Yes. Any odd root of a negative number is a real negative number—for example, ∛(-27) = -3 because (-3) × (-3) × (-3) = -27.'
      },
      {
        question: 'Why does √72 equal 6√2 instead of 3√8?',
        answer: '8 still contains the perfect square factor 4 (8 = 4 × 2), so √72 is only fully simplified once no square factor remains inside the radical.'
      }
    ],
    importantNotes: [
      'Root index n must be a positive integer ≥ 1 (normally ≥ 2).',
      'Even roots of negative radicands have no real-number solution.'
    ]
  },

  'geometry-calculator': {
    introduction:
      'From calculating flooring square footage and fencing perimeters to sizing cylindrical tanks, cones, and storage crates, spatial geometry formulas appear constantly in construction, packaging, and STEM coursework.\n\nThe Geometry Calculator covers eight core 2D and 3D shapes—Circle, Rectangle, Triangle (using Heron’s formula from three side lengths), Trapezoid, Sphere, Cylinder, Cone, and Cube—computing area, perimeter/circumference, total surface area, and volume cleanly in one place.',
    howItWorks: {
      summary:
        'Select any 2D planar figure or 3D solid, enter the required dimensions in consistent length units, and the calculator evaluates exact area, boundary length, surface area, and volume formulas using high-precision π.',
      steps: [
        {
          title: '1. Pick a 2D or 3D Shape',
          detail: 'Choose Circle, Rectangle, Triangle, Trapezoid, Sphere, Cylinder, Cone, or Cube.'
        },
        {
          title: '2. Enter Shape Dimensions',
          detail: 'Input radius, width/height, three triangle sides (checking the triangle inequality), or base/height values.'
        },
        {
          title: '3. Evaluate Geometric Equations',
          detail: 'For 2D shapes, computes Area and Perimeter/Circumference; for 3D solids, computes Volume and Total Surface Area.'
        }
      ],
      keyAssumptions: [
        'All dimensions for a given calculation use the same linear unit (cm, m, in, or ft).',
        'Triangle side lengths must satisfy the triangle inequality (each pair sums strictly greater than the third side).',
        '3D Cylinder and Cone surface areas include closed circular end caps / base.'
      ]
    },
    formula: {
      title: 'Key 2D & 3D Geometry Formulas',
      equation: 'Circle: A = πr² | Triangle (Heron): A = √[s(s-a)(s-b)(s-c)] | Cylinder: V = πr²h, SA = 2πrh + 2πr²',
      variables: [
        { symbol: 'r', name: 'Radius', description: 'Distance from center to boundary of circle, sphere, cylinder, or cone', unit: 'Length' },
        { symbol: 'h', name: 'Height', description: 'Perpendicular height of rectangle, trapezoid, cylinder, or cone', unit: 'Length' },
        { symbol: 's', name: 'Semi-Perimeter', description: '(a + b + c) / 2 used in Heron’s triangle area formula', unit: 'Length' }
      ],
      explanation:
        '2D outputs return linear units for perimeter and squared units (e.g., cm², ft²) for area; 3D outputs return squared units for surface area and cubic units (e.g., cm³, ft³) for volume.'
    },
    examples: [
      {
        title: 'Closed Cylinder Volume & Surface Area',
        scenario: 'Calculate the volume and total surface area of a cylindrical tank with radius 5 cm and height 10 cm.',
        inputs: {
          'Shape': 'Cylinder (3D)',
          'Radius (r)': '5 cm',
          'Height (h)': '10 cm'
        },
        steps: [
          'Volume V = π × 5² × 10 = 250π ≈ 785.40 cm³',
          'Lateral area = 2π × 5 × 10 = 100π ≈ 314.16 cm²',
          'Two circular end caps = 2 × π × 5² = 50π ≈ 157.08 cm²',
          'Total Surface Area = 150π ≈ 471.24 cm²'
        ],
        result: 'Volume: 785.40 cm³ | Surface Area: 471.24 cm²',
        takeaway: 'Keep track of dimensional units: volume scales with length cubed while surface area scales with length squared.'
      }
    ],
    understandingResults:
      'Verify that all entered measurements share a single unit before reading results—if radius is in inches and height is in feet, convert both to inches or both to feet first. When solving Triangle area from three sides, confirm any two sides exceed the third side or no physical triangle can exist.',
    useCases: [
      {
        title: 'Packaging, Tanks & Fabrication',
        description: 'Estimate sheet metal surface area and internal volume for cylinders, cones, and boxes.',
        targetAudience: 'Engineers, Makers & Contractors',
        benefits: ['8 essential 2D & 3D shapes', 'Computes slant height for cones', 'Instant volume and surface area']
      },
      {
        title: 'Geometry Homework Verification',
        description: 'Check Heron’s triangle areas, circle sectors, and 3D volume problems step by step.',
        targetAudience: 'Students & Teachers',
        benefits: ['Covers both 2D and 3D', 'Uses exact floating-point π', 'Prevents formula mix-ups']
      }
    ],
    faqs: [
      {
        question: 'How does Heron’s formula find triangle area without knowing the height?',
        answer: 'From three side lengths a, b, and c, semi-perimeter s = (a+b+c)/2 lets Heron’s formula compute Area = √[s(s-a)(s-b)(s-c)] directly.'
      },
      {
        question: 'Does Cylinder surface area include the top and bottom circles?',
        answer: 'Yes. Total Surface Area sums the curved lateral wall (2πrh) plus both circular end caps (2πr²).'
      }
    ],
    importantNotes: [
      'Always convert mixed input units (such as inches and feet) into one uniform unit first.',
      'For triangles, entering sides that violate a + b > c cannot form a valid closed triangle.'
    ]
  },

  'quadratic-solver-calculator': {
    introduction:
      'Quadratic polynomials of the form ax² + bx + c = 0 describe parabolic paths everywhere in math and science—from projectile arcs and bridge cables to profit-maximization curves and optical reflectors.\n\nThe Quadratic Equation Solver evaluates the discriminant Δ = b² − 4ac, computes real, double, or complex conjugate roots, handles the linear edge case when a = 0, and outputs the parabola’s vertex coordinates (h, k).',
    howItWorks: {
      summary:
        'The calculator reads coefficients a, b, and c, checks whether a = 0 (reducing to a linear equation), evaluates discriminant Δ = b² − 4ac, and branches between two real roots (Δ > 0), one repeated real root (Δ = 0), or complex conjugate roots (Δ < 0) while computing the vertex.',
      steps: [
        {
          title: '1. Enter Coefficients a, b & c',
          detail: 'Input the numeric values corresponding to ax² + bx + c = 0 (positive, negative, or decimal).'
        },
        {
          title: '2. Compute Discriminant Δ = b² − 4ac',
          detail: 'Determines immediately whether the parabola crosses the x-axis twice (Δ > 0), touches it once (Δ = 0), or misses it (Δ < 0).'
        },
        {
          title: '3. Solve Roots x₁ and x₂',
          detail: 'Applies the quadratic formula to output decimal real roots or complex roots formatted as real ± imag·i.'
        },
        {
          title: '4. Locate Parabola Vertex (h, k)',
          detail: 'Computes the axis of symmetry h = −b / (2a) and evaluates f(h) for the minimum or maximum turning point.'
        }
      ],
      keyAssumptions: [
        'Standard quadratic behavior requires coefficient a ≠ 0 (if a = 0, solves linear bx + c = 0).',
        'Roots and vertex coordinates are rounded cleanly to four and two decimal places respectively.',
        'Coefficients represent real numbers.'
      ]
    },
    formula: {
      title: 'Quadratic Formula, Discriminant & Vertex',
      equation: 'x = [ -b ± √(b² - 4ac) ] / (2a) | Δ = b² - 4ac | Vertex: h = -b/(2a), k = ah² + bh + c',
      variables: [
        { symbol: 'a, b, c', name: 'Polynomial Coefficients', description: 'Leading quadratic, linear, and constant coefficients', unit: 'Real Number' },
        { symbol: 'Δ', name: 'Discriminant', description: 'b² - 4ac; governs root count and real vs. complex nature', unit: 'Real Number' },
        { symbol: '(h, k)', name: 'Parabola Vertex', description: 'Exact turning point (minimum if a > 0, maximum if a < 0)', unit: 'Coordinates' }
      ],
      explanation:
        'When Δ ≥ 0, √Δ is real and yields real x-intercepts; when Δ < 0, √Δ introduces the imaginary unit i = √(−1), forming a complex conjugate pair.'
    },
    examples: [
      {
        title: 'Solving x² − 5x + 6 = 0',
        scenario: 'Find the roots, discriminant, and vertex of x² - 5x + 6 = 0.',
        inputs: {
          'a': '1',
          'b': '-5',
          'c': '6'
        },
        steps: [
          'Discriminant Δ = (-5)² - 4(1)(6) = 25 - 24 = 1 (Δ > 0 → two real roots)',
          'x₁ = [5 + √1] / 2 = 6 / 2 = 3.0000; x₂ = [5 - √1] / 2 = 4 / 2 = 2.0000',
          'Vertex x-coordinate h = -(-5) / (2×1) = 2.50',
          'Vertex y-coordinate k = (2.5)² - 5(2.5) + 6 = 6.25 - 12.5 + 6 = -0.25'
        ],
        result: 'Roots: x₁ = 3, x₂ = 2 | Vertex: (2.50, -0.25)',
        takeaway: 'Notice the vertex x = 2.50 sits halfway between the two roots x = 2 and x = 3.'
      }
    ],
    understandingResults:
      'Look first at the discriminant badge: "Two Real Roots" means the parabola crosses the horizontal axis twice, "One Double Root" means its vertex sits right on the axis, and "Complex Roots" means the curve never touches the x-axis in real space. If a > 0, the vertex (h, k) is the curve’s global minimum; if a < 0, it is the global maximum.',
    useCases: [
      {
        title: 'Algebra & Precalculus Checks',
        description: 'Verify factoring, completing the square, discriminant signs, and vertex graphing.',
        targetAudience: 'Students & Tutors',
        benefits: ['Handles complex conjugate roots', 'Displays discriminant and vertex', 'Solves linear a = 0 edge case']
      },
      {
        title: 'Physics Projectile Analysis',
        description: 'Solve time-of-flight intercepts and peak height vertex from parabolic height equations.',
        targetAudience: 'Physics & Engineering Users',
        benefits: ['Instant intercept timing', 'Vertex gives peak altitude', 'Supports decimal gravity coefficients']
      }
    ],
    faqs: [
      {
        question: 'What does a negative discriminant (Δ < 0) mean?',
        answer: 'It means the parabola never intersects the real x-axis, so the equation has two complex conjugate roots involving imaginary numbers (i).'
      },
      {
        question: 'Can I still use the solver if a = 0?',
        answer: 'Yes. If a = 0, the calculator detects a linear equation bx + c = 0 and returns its single root −c / b.'
      }
    ],
    importantNotes: [
      'Always keep track of negative signs on b and c when entering coefficients.',
      'Check rounding when substituting decimal roots back into high-order engineering checks.'
    ]
  },

  'pythagorean-calculator': {
    introduction:
      'The Pythagorean Theorem (a² + b² = c²) is one of the oldest and most practical rules in geometry. Whether squaring corners on a framing deck, finding diagonal screen sizes, or resolving perpendicular force vectors, knowing any two sides of a right triangle locks down the third side.\n\nThe Pythagorean Theorem Calculator accepts any two right-triangle sides (leave the unknown side blank) and solves for the hypotenuse c or either leg a or b, along with triangle area, perimeter, and interior angles.',
    howItWorks: {
      summary:
        'When both legs a and b are entered, the calculator computes c = √(a² + b²) along with acute angles α and β; when hypotenuse c and one leg are provided, it solves √(c² − leg²) and outputs area and perimeter.',
      steps: [
        {
          title: '1. Enter Any Two Known Sides',
          detail: 'Provide legs a and b to solve hypotenuse c, or enter hypotenuse c plus one leg and leave the target leg blank.'
        },
        {
          title: '2. Apply Pythagorean Identity',
          detail: 'Computes √(a² + b²) for the hypotenuse or √(c² − known_leg²) for a missing leg.'
        },
        {
          title: '3. Output Area, Perimeter & Angles',
          detail: 'Evaluates Area = 0.5 × a × b, Perimeter = a + b + c, and acute angles when solving for c.'
        }
      ],
      keyAssumptions: [
        'Applies strictly to Euclidean right triangles (one 90° angle opposite hypotenuse c).',
        'Hypotenuse c must be strictly longer than either leg a or b.',
        'Leave the side you want solved completely blank.'
      ]
    },
    formula: {
      title: 'Pythagorean Theorem & Right-Triangle Metrics',
      equation: 'c = √(a² + b²)  |  b = √(c² - a²)  |  Area = ½ × a × b',
      variables: [
        { symbol: 'a, b', name: 'Right-Angle Legs', description: 'The two perpendicular sides meeting at the 90° corner', unit: 'Length' },
        { symbol: 'c', name: 'Hypotenuse', description: 'Longest side opposite the 90° right angle', unit: 'Length' },
        { symbol: 'α, β', name: 'Acute Angles', description: 'Complementary angles summing to 90°', unit: 'Degrees' }
      ],
      explanation:
        'Squaring the two perpendicular legs and taking the square root yields the diagonal hypotenuse; subtracting a squared leg from c² recovers the missing leg.'
    },
    examples: [
      {
        title: 'Classic 6-8-10 Carpenter’s Check',
        scenario: 'A deck framer measures 6 ft along one rim joist and 8 ft along the perpendicular side. What diagonal confirms a square 90° corner?',
        inputs: {
          'Leg a': '6 ft',
          'Leg b': '8 ft',
          'Hypotenuse c': '(blank)'
        },
        steps: [
          'Square both legs: 6² + 8² = 36 + 64 = 100',
          'Take square root: c = √100 = 10.0000 ft',
          'Area = 0.5 × 6 × 8 = 24.00 sq ft; Perimeter = 6 + 8 + 10 = 24.00 ft'
        ],
        result: 'Hypotenuse (c) = 10.0000 ft | Area: 24 sq ft',
        takeaway: 'If the measured diagonal equals exactly 10 ft, the corner forms a true 90-degree angle.'
      }
    ],
    understandingResults:
      'Make sure the field for the unknown side is cleared empty—if all three inputs contain numbers, the calculator cannot know which side to solve. If entering c and one leg, c must be greater than the leg.',
    useCases: [
      {
        title: 'Carpentry & Framing Layout',
        description: 'Check 3-4-5 or scaled right-angle corners on foundations, decks, and tile walls.',
        targetAudience: 'Builders & DIYers',
        benefits: ['Instant diagonal verification', 'Works in any uniform unit', 'Includes area for material sizing']
      },
      {
        title: 'Trigonometry & Vector Resolution',
        description: 'Find resultant magnitudes and acute angles from orthogonal horizontal/vertical components.',
        targetAudience: 'Students & Engineers',
        benefits: ['Solves legs or hypotenuse', 'Displays perimeter and angles', '4-decimal precision']
      }
    ],
    faqs: [
      {
        question: 'Why does nothing calculate if I enter a value for c smaller than a?',
        answer: 'In any right triangle, the hypotenuse c is always strictly the longest side. If c ≤ a, no real right triangle can exist.'
      },
      {
        question: 'Do all three sides have to use the same unit?',
        answer: 'Yes. Convert feet and inches into decimal feet (or all inches) before entering lengths.'
      }
    ],
    importantNotes: [
      'Works only for 90° right triangles; oblique triangles require the Law of Cosines.',
      'Leave exactly one side blank so the solver knows which value to compute.'
    ]
  },

  'lcm-gcd-calculator': {
    introduction:
      'Finding common denominators for fractions, synchronizing repeating event schedules, or simplifying integer ratios all depend on two foundational concepts in number theory: the Greatest Common Divisor (GCD / GCF) and the Least Common Multiple (LCM).\n\nThe LCM & GCD Calculator applies the Euclidean division algorithm to find both the GCD and LCM of any two positive integers instantly, and displays the full prime factorization of each number.',
    howItWorks: {
      summary:
        'The calculator runs Euclid’s recursive remainder algorithm gcd(x, y) → gcd(y, x mod y) until the remainder reaches zero, derives LCM = (a × b) / GCD, and factors both inputs into prime factors.',
      steps: [
        {
          title: '1. Enter Two Positive Integers',
          detail: 'Input whole positive integers a and b.'
        },
        {
          title: '2. Run Euclidean Algorithm for GCD',
          detail: 'Repeatedly replace the larger integer with the remainder of dividing the larger by the smaller until remainder = 0.'
        },
        {
          title: '3. Derive LCM from GCD',
          detail: 'Multiply a × b and divide by GCD(a, b) to avoid prime-power overlap.'
        },
        {
          title: '4. Display Prime Factorizations',
          detail: 'Decomposes both integers into products of prime factors so you can see every shared factor.'
        }
      ],
      keyAssumptions: [
        'Inputs are positive integers ≥ 1 (decimals are rounded to nearest positive integer).',
        'Both numbers are factored via trial division into prime factors.'
      ]
    },
    formula: {
      title: 'Euclidean GCD & Least Common Multiple Relationship',
      equation: 'GCD(a, b) = GCD(b, a mod b)  |  LCM(a, b) = (a × b) / GCD(a, b)',
      variables: [
        { symbol: 'a, b', name: 'Input Integers', description: 'Two positive whole numbers to analyze', unit: 'Integer ≥ 1' },
        { symbol: 'GCD', name: 'Greatest Common Divisor', description: 'Largest integer dividing both a and b with zero remainder', unit: 'Integer' },
        { symbol: 'LCM', name: 'Least Common Multiple', description: 'Smallest positive integer divisible by both a and b', unit: 'Integer' }
      ],
      explanation:
        'Because multiplying a × b counts their shared prime factors twice, dividing by GCD(a, b) leaves the exact Least Common Multiple.'
    },
    examples: [
      {
        title: 'GCD, LCM & Prime Factors of 24 and 36',
        scenario: 'Find the GCD and LCM of 24 and 36.',
        inputs: {
          'First Integer': '24',
          'Second Integer': '36'
        },
        steps: [
          'Euclidean remainder steps: GCD(36, 24) → GCD(24, 12) → GCD(12, 0) = 12',
          'Compute LCM: (24 × 36) / 12 = 864 / 12 = 72',
          'Prime factors: 24 = 2 × 2 × 2 × 3; 36 = 2 × 2 × 3 × 3'
        ],
        result: 'GCD = 12 | LCM = 72',
        takeaway: 'Use GCD (12) to reduce the fraction 24/36 to 2/3, and use LCM (72) as the common denominator for 1/24 + 1/36.'
      }
    ],
    understandingResults:
      'GCD is always less than or equal to the smaller input integer and is used to simplify fractions or ratios to lowest terms. LCM is always greater than or equal to the larger input integer and tells you when two cyclical intervals align or what Least Common Denominator connects two fractions. If GCD = 1, the two integers are coprime.',
    useCases: [
      {
        title: 'Fraction Reduction & Common Denominators',
        description: 'Simplify large fractions by GCD or find exact LCD denominators with LCM.',
        targetAudience: 'Students & Teachers',
        benefits: ['Displays prime factor trees', 'Instant Euclidean math', 'Zero manual division errors']
      },
      {
        title: 'Gear Ratios & Maintenance Cycles',
        description: 'Calculate when two periodic cycles (e.g., 14-day and 21-day schedules) fall on the same day.',
        targetAudience: 'Schedulers & Engineers',
        benefits: ['Instant cycle alignment via LCM', 'Shared-factor visibility', 'Fast integer exploration']
      }
    ],
    faqs: [
      {
        question: 'Are GCD and GCF the same thing?',
        answer: 'Yes. Greatest Common Divisor (GCD), Greatest Common Factor (GCF), and Highest Common Factor (HCF) all denote the same largest shared integer divisor.'
      },
      {
        question: 'What if two numbers have a GCD of 1?',
        answer: 'Numbers with GCD = 1 are called coprime (or relatively prime), and their LCM is simply their product a × b.'
      }
    ],
    importantNotes: [
      'Both inputs must be non-zero positive integers.',
      'Very large multi-million primes can take noticeable time to trial-factor compared to typical classroom numbers.'
    ]
  },

  'logarithm-calculator': {
    introduction:
      'Logarithms answer the inverse question of exponents: to what power must a base b be raised to yield a target number x? They turn enormous multiplicative ranges—earthquake magnitudes, sound decibels, chemical pH acidity, and doubling times—into manageable linear scales.\n\nThe Logarithm & Natural Log Calculator evaluates any custom-base logarithm log_b(x) using the change-of-base identity while simultaneously displaying the Natural Log ln(x), Common Log log₁₀(x), and Binary Log log₂(x).',
    howItWorks: {
      summary:
        'After verifying that argument x > 0 and base b > 0 with b ≠ 1, the calculator evaluates log_b(x) = ln(x) / ln(b) alongside base-e, base-10, and base-2 logarithms to six decimal places.',
      steps: [
        {
          title: '1. Enter Argument x and Base b',
          detail: 'Specify any positive number x > 0 and any positive base b ≠ 1.'
        },
        {
          title: '2. Apply Change-of-Base Formula',
          detail: 'Divides the natural logarithm of x by the natural logarithm of b to solve arbitrary bases.'
        },
        {
          title: '3. Display Core Base Benchmarks',
          detail: 'Outputs custom log_b(x) alongside ln(x), log₁₀(x), and log₂(x) in one view.'
        }
      ],
      keyAssumptions: [
        'Logarithms are defined in the real numbers strictly for x > 0.',
        'Logarithm base must satisfy b > 0 and b ≠ 1 (since 1^k = 1 for all k).',
        'Results are rounded to six decimal places.'
      ]
    },
    formula: {
      title: 'Change-of-Base Logarithm Identity',
      equation: 'log_b(x) = ln(x) / ln(b)  ⟺  b^y = x',
      variables: [
        { symbol: 'x', name: 'Argument', description: 'Positive input value whose logarithm is sought (x > 0)', unit: 'Real > 0' },
        { symbol: 'b', name: 'Logarithm Base', description: 'Base of the exponential relationship (b > 0, b ≠ 1)', unit: 'Real' },
        { symbol: 'ln(x)', name: 'Natural Logarithm', description: 'Logarithm with Euler’s constant base e ≈ 2.71828', unit: 'Real' }
      ],
      explanation:
        'Because scientific environments compute base-e natural logs natively, dividing ln(x) by ln(b) unlocks any arbitrary base such as log₂, log₅, or log₁₂.'
    },
    examples: [
      {
        title: 'Evaluating Binary Log₂(64)',
        scenario: 'Find how many times 2 must be multiplied by itself to equal 64 using log_b(x).',
        inputs: {
          'Argument (x)': '64',
          'Base (b)': '2'
        },
        steps: [
          'Evaluate natural logs: ln(64) = 4.158883 and ln(2) = 0.693147',
          'Apply change of base: log₂(64) = 4.158883 / 0.693147 = 6.000000',
          'Comparison outputs: ln(64) = 4.158883 | log₁₀(64) = 1.806180'
        ],
        result: 'log₂(64) = 6.000000',
        takeaway: 'In computing, log₂(64) = 6 tells you that 64 distinct states require 6 binary bits.'
      }
    ],
    understandingResults:
      'Values of x between 0 and 1 return negative logarithms when b > 1 (for example, log₁₀(0.01) = −2), while log_b(1) always equals 0 for every valid base. Use ln(x) for continuous compounding and calculus, log₁₀(x) for pH/decibels/Richter scales, and log₂(x) for binary information theory.',
    useCases: [
      {
        title: 'Doubling-Time & Decay Calculations',
        description: 'Solve for time t in compound growth equations A = P(1 + r)^t using logarithms.',
        targetAudience: 'Finance & Biology Students',
        benefits: ['Instant custom-base math', 'Six-decimal accuracy', 'Side-by-side ln, log₁₀, log₂']
      },
      {
        title: 'Computer Science & Algorithm Complexity',
        description: 'Evaluate O(log₂ n) tree depths, bit widths, and Shannon entropy terms.',
        targetAudience: 'Developers & CS Students',
        benefits: ['Direct log₂(x) readout', 'Custom bases supported', 'Fast boundary checks']
      }
    ],
    faqs: [
      {
        question: 'Why is log_b(0) or log of a negative number undefined here?',
        answer: 'No real power can turn a positive base b into 0 or a negative number, so real logarithms require strictly positive arguments x > 0.'
      },
      {
        question: 'Why cannot the base b equal 1?',
        answer: '1 raised to any power always equals 1, so ln(1) = 0 and dividing by ln(1) would divide by zero.'
      }
    ],
    importantNotes: [
      'Ensure argument x > 0 and base b > 0, b ≠ 1.',
      'Six-decimal rounding may show values like 5.999999 or 6.000000 depending on floating-point inputs.'
    ]
  },

  'factorial-permutations-calculator': {
    introduction:
      'Counting how many distinct ways items can be ordered or selected is central to probability, cryptography, lottery odds, and scheduling. Factorials grow extraordinarily fast—10! is already 3.6 million, and 20! exceeds two quintillion.\n\nThe Factorials, Permutations & Combinations Calculator computes n!, order-sensitive Permutations (nPr), and order-independent Combinations (nCr) for integers up to n = 20 and subsets r ≤ n.',
    howItWorks: {
      summary:
        'Using recursive factorial evaluation over integers 0 ≤ n ≤ 20 and 0 ≤ r ≤ n, the calculator computes n!, divides by (n − r)! for permutations nPr, and divides further by r! for combinations nCr.',
      steps: [
        {
          title: '1. Enter Total Items n (0–20)',
          detail: 'Specify the size of the full pool of distinct items (capped at 20 to preserve exact integer scaling).'
        },
        {
          title: '2. Enter Subset Size r (r ≤ n)',
          detail: 'Specify how many items are being arranged or chosen from the pool.'
        },
        {
          title: '3. Evaluate n!, nPr & nCr',
          detail: 'Calculates full permutation n!, ordered subset arrangements nPr, and unordered subsets nCr simultaneously.'
        }
      ],
      keyAssumptions: [
        'Total pool size n is clamped to 0 ≤ n ≤ 20 and subset r must satisfy 0 ≤ r ≤ n.',
        'By convention, 0! = 1.',
        'Assumes sampling without replacement from distinct items.'
      ]
    },
    formula: {
      title: 'Factorial, Permutations (nPr) & Combinations (nCr)',
      equation: 'nPr = n! / (n - r)!  |  nCr = n! / [ r! × (n - r)! ]',
      variables: [
        { symbol: 'n', name: 'Total Pool Size', description: 'Total number of distinct items available (n ≤ 20)', unit: 'Integer' },
        { symbol: 'r', name: 'Subset Selected', description: 'Number of items chosen or arranged (0 ≤ r ≤ n)', unit: 'Integer' },
        { symbol: 'n!', name: 'Factorial', description: 'Product n × (n-1) × ... × 1 (with 0! = 1)', unit: 'Integer' }
      ],
      explanation:
        'Permutations count ordered sequences (ABC differs from CBA), whereas combinations divide nPr by r! to collapse duplicate orderings into a single subset.'
    },
    examples: [
      {
        title: 'Selecting 3 Finalists from 7 Candidates',
        scenario: 'Compare how many ways 3 prize winners (1st, 2nd, 3rd) vs. an unordered 3-person committee can be formed from 7 people.',
        inputs: {
          'Total Items (n)': '7',
          'Subset Items (r)': '3'
        },
        steps: [
          'Compute factorials: 7! = 5,040; 3! = 6; (7 - 3)! = 4! = 24',
          'Permutations (Order matters) ₇P₃ = 5,040 / 24 = 210 podium orders',
          'Combinations (Order irrelevant) ₇C₃ = 5,040 / (6 × 24) = 5,040 / 144 = 35 committees'
        ],
        result: '7! = 5,040 | ₇P₃ = 210 | ₇C₃ = 35',
        takeaway: 'Each 3-person committee can be ranked in 3! = 6 distinct orders, which is why 210 = 35 × 6.'
      }
    ],
    understandingResults:
      'nPr is always greater than or equal to nCr because reordering the same r items creates r! distinct permutations. If r exceeds n, the tool displays a validation prompt because you cannot choose more distinct items than exist in the pool without replacement.',
    useCases: [
      {
        title: 'Combinatorics & Discrete Math',
        description: 'Verify probability denominators, poker hand counts, and seating arrangements quickly.',
        targetAudience: 'Students & Instructors',
        benefits: ['Shows n!, nPr, and nCr together', 'Explains order distinction', 'Handles zero-edge cases (0! = 1)']
      },
      {
        title: 'Experiment & Design Combinations',
        description: 'Count A/B test feature pairings or password/PIN complexity subspaces.',
        targetAudience: 'Product Analysts & Developers',
        benefits: ['Instant subset counting', 'Readable thousands formatting', 'Zero manual factorial multiplication']
      }
    ],
    faqs: [
      {
        question: 'Why does 0! equal 1?',
        answer: 'There is exactly one way to arrange zero objects (the empty set), and defining 0! = 1 keeps nPn = n!/0! = n! algebraically consistent.'
      },
      {
        question: 'Why is n capped at 20?',
        answer: 'Above 20! (~2.43 × 10¹⁸), exact integers exceed safe IEEE 754 floating-point integer precision and lose trailing digit accuracy.'
      }
    ],
    importantNotes: [
      'Ensure r ≤ n so factorials remain defined.',
      'Applies to distinct items selected without repetition.'
    ]
  },

  'matrix-calculator': {
    introduction:
      'Matrices compactly represent linear transformations, geometric rotations, and systems of two simultaneous equations. Before you can solve A·x = b by multiplying by A⁻¹, you must test whether the matrix determinant is non-zero—a zero determinant means the transformation collapses space onto a line or point and cannot be reversed.\n\nThe 2×2 Matrix Determinant & Inverse Calculator computes det(A) = ad − bc and, whenever det(A) ≠ 0, outputs the complete 2×2 inverse matrix A⁻¹ to three decimal places.',
    howItWorks: {
      summary:
        'Given matrix elements [[a, b], [c, d]], the calculator computes the determinant ad − bc, checks for singularity (det = 0), and multiplies the adjugate matrix [[d, −b], [−c, a]] by 1 / det(A).',
      steps: [
        {
          title: '1. Enter Matrix Entries a, b, c, d',
          detail: 'Fill Row 1 (a, b) and Row 2 (c, d) in the 2×2 matrix grid.'
        },
        {
          title: '2. Compute Determinant det(A)',
          detail: 'Evaluates the main diagonal product minus the anti-diagonal product: ad − bc.'
        },
        {
          title: '3. Test Invertibility & Form A⁻¹',
          detail: 'If det ≠ 0, swaps a and d, negates b and c, and divides every element by det(A); if det = 0, flags the matrix as singular.'
        }
      ],
      keyAssumptions: [
        'Supports real-valued 2×2 square matrices.',
        'Matrices with det(A) = 0 are singular and have no inverse.',
        'Inverse entries are rounded to three decimal places.'
      ]
    },
    formula: {
      title: '2×2 Determinant & Adjugate Inverse Formula',
      equation: 'det(A) = ad - bc  |  A⁻¹ = (1 / det(A)) × [ [d, -b], [-c, a] ]',
      variables: [
        { symbol: 'a, b', name: 'Row 1 Entries', description: 'Top-left and top-right elements of matrix A', unit: 'Real Number' },
        { symbol: 'c, d', name: 'Row 2 Entries', description: 'Bottom-left and bottom-right elements of matrix A', unit: 'Real Number' },
        { symbol: 'det(A)', name: 'Determinant', description: 'Area scaling factor ad - bc; must be non-zero for A⁻¹ to exist', unit: 'Real Number' }
      ],
      explanation:
        'Multiplying A by A⁻¹ collapses off-diagonal terms to 0 and diagonal terms to det(A)/det(A) = 1, producing the 2×2 identity matrix I.'
    },
    examples: [
      {
        title: 'Inverting Matrix [[4, 7], [2, 6]]',
        scenario: 'Find the determinant and inverse of the 2×2 matrix A with Row 1 = [4, 7] and Row 2 = [2, 6].',
        inputs: {
          'Row 1 (a, b)': '4, 7',
          'Row 2 (c, d)': '2, 6'
        },
        steps: [
          'Determinant det(A) = (4 × 6) - (7 × 2) = 24 - 14 = 10',
          'Swap diagonal and negate off-diagonals: [[6, -7], [-2, 4]]',
          'Divide each entry by det(A) = 10: Row 1 = [0.600, -0.700], Row 2 = [-0.200, 0.400]'
        ],
        result: 'det(A) = 10 | A⁻¹ = [[0.600, -0.700], [-0.200, 0.400]]',
        takeaway: 'Quick check: Row 1 of A dot Col 1 of A⁻¹ = (4×0.6) + (7×-0.2) = 2.4 - 1.4 = 1.0.'
      }
    ],
    understandingResults:
      'Geometrically, |det(A)| tells you the factor by which matrix A scales 2D areas (a negative determinant indicates a reflection/flip in orientation). If the calculator reports a singular matrix (det = 0), the two rows or columns are linearly dependent (parallel) and any linear system A·x = b lacks a unique solution.',
    useCases: [
      {
        title: 'Solving 2×2 Linear Systems',
        description: 'Compute A⁻¹ rapidly to solve two-variable equations via x = A⁻¹b.',
        targetAudience: 'Linear Algebra Students',
        benefits: ['Instant singularity check', 'Exact adjugate inversion', 'Clean 2×2 visual grid']
      },
      {
        title: '2D Graphics & Robotics Transforms',
        description: 'Invert 2D rotation, shear, or coordinate-basis matrices cleanly.',
        targetAudience: 'Engineers & Programmers',
        benefits: ['Checks determinant orientation', '3-decimal inverse readout', 'Supports negative values']
      }
    ],
    faqs: [
      {
        question: 'Why does a determinant of zero mean no inverse exists?',
        answer: 'Forming the inverse requires dividing by det(A). When det(A) = 0, dividing by zero is impossible because the matrix collapses 2D space onto a 1D line or point.'
      },
      {
        question: 'How do I verify an inverse matrix is correct?',
        answer: 'Multiply the original matrix A by A⁻¹ (using matrix multiplication); the result should be the identity matrix [[1, 0], [0, 1]].'
      }
    ],
    importantNotes: [
      'Watch out for floating-point rounding when det(A) is a fraction like 3 or 7 (displayed to 3 decimal places).',
      'Designed specifically for 2×2 square matrices.'
    ]
  }
};
