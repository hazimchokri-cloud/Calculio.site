import re
import os

html_path = 'public/assets/aistudio/Compound_Interest_Calculator_1e87b0c8.html'
ts_path = 'src/data/blog/financePosts.ts'

with open(html_path, 'r', encoding='utf-8') as f:
    html_content = f.read()

body_match = re.search(r'<body>(.*?)</body>', html_content, re.DOTALL)
if body_match:
    body_content = body_match.group(1)
    body_content = re.sub(r'^.*?<hr />', '', body_content, flags=re.DOTALL).strip()
else:
    body_content = "Content Error"

body_content = body_content.replace('`', '\\`').replace('${', '\\${')

with open(ts_path, 'r', encoding='utf-8') as f:
    ts_content = f.read()

slug = 'estimate-savings-growth-compound-interest'
slug_marker = f"slug: '{slug}'"
slug_pos = ts_content.find(slug_marker)

if slug_pos == -1:
    print("Could not find slug")
    exit(1)

# Find the start of the object {
start_pos = ts_content.rfind('{', 0, slug_pos)

# Since we know this is the LAST post in the array (verified in previous view_file),
# we can just find the very last ]; and keep everything before start_pos and after ];
# Wait, actually let's just find the last ]; and replace everything from start_pos to it.

last_array_end = ts_content.rfind('];')
if last_array_end == -1:
    print("Could not find end of array")
    exit(1)

new_post_object = f"""{{
    slug: 'estimate-savings-growth-compound-interest',
    title: 'Compound Interest Calculator: Estimate Your Savings Growth',
    excerpt: "Want to see how a savings balance could grow over time? Learn how to estimate future balances, understand the compound interest formula, and see real-world examples with the Calculio Compound Interest Calculator.",
    coverImage: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&w=1200&h=675&q=80',
    imageAlt: 'Growth chart showing the exponential curve of compound interest over time',
    category: 'finance',
    categoryLabel: 'Finance',
    author: BLOG_AUTHORS.davidSterling,
    publishedAt: '2026-11-10',
    updatedAt: '2026-11-10',
    readTimeMinutes: 10,
    featured: false,
    tags: ['Compound Interest', 'Savings Growth', 'Financial Planning', 'Investing', 'Wealth Building'],
    relatedCalculatorIds: ['compound-interest-calculator', 'investment-calculator', 'savings-goal-calculator'],
    metaDescription: "Estimate how savings grow with Calculio's free compound interest calculator. Learn the formula, APY vs. nominal rate, and see worked examples with real numbers.",
    metaKeywords: ['compound interest calculator', 'savings growth', 'compound interest formula', 'calculate compound interest', 'APY vs nominal rate'],
    keyTakeaways: [
      'Future balance estimation requires five key inputs: principal, interest rate, frequency, time, and contributions.',
      'Compound interest is calculated on both the principal and previously earned interest, creating a "snowball" effect.',
      'The standard formula for compound interest is A = P(1 + r/n)^(nt).',
      'Higher compounding frequency (e.g., daily vs. annual) results in higher ending balances for the same nominal rate.',
      'Regular monthly contributions significantly accelerate wealth building compared to a one-time lump sum.',
      'Inflation, taxes, and fees are critical real-world factors that can reduce the effective value of a projection.'
    ],
    faqs: [
      {{
        question: 'What is a compound interest calculator?',
        answer: "A compound interest calculator estimates how a balance grows when earned interest is added back and starts earning interest too. Inputs usually include a starting amount, an interest rate, a time period, a compounding frequency, and optional regular deposits."
      }},
      {{
        question: 'How do I calculate compound interest by hand?',
        answer: "Use A = P(1 + r/n)^(nt). Convert the rate to a decimal, divide it by the number of compounding periods per year, and raise (1 + r/n) to the power of n × t. Multiply the result by the principal, then subtract the principal to get the interest earned."
      }},
      {{
        question: 'Is APY the same as the interest rate?',
        answer: "No. The nominal interest rate does not include compounding within the year, while APY does. A 5% nominal rate compounded monthly equals an APY of about 5.116%."
      }},
      {{
        question: 'Does daily compounding earn much more than monthly compounding?',
        answer: "Usually only a little. For example, daily compounding on $5,000 at 5% for five years earns about $3.23 more than monthly compounding. The rate and the saving period matter far more than the compounding frequency."
      }},
      {{
        question: 'How accurate are compound interest projections?',
        answer: "They are only as accurate as the assumptions behind them. Variable rates, taxes, fees, withdrawals, and market-driven investment returns can all make real results differ. Testing a lower-rate scenario gives a more realistic range."
      }}
    ],
    sections: [
      {{
        id: 'main-content',
        title: '',
        content: [],
        htmlContent: `{body_content}`
      }}
    ]
  }}"""

new_ts_content = ts_content[:start_pos] + new_post_object + "\n];\n"

with open(ts_path, 'w', encoding='utf-8') as f:
    f.write(new_ts_content)
print("Successfully reset and updated financePosts.ts")
