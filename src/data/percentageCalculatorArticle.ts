export const PERCENTAGE_CALCULATOR_FAQ_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How do you calculate a percentage of a number?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Divide the percentage by 100, then multiply by the number. For example, 20% of 150 is 0.20 × 150 = 30.'
      }
    },
    {
      '@type': 'Question',
      name: 'How do you find what percent one number is of another?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Divide the part by the whole, then multiply by 100%. For example, 30 ÷ 150 × 100% = 20%.'
      }
    },
    {
      '@type': 'Question',
      name: 'How do you calculate percentage increase or decrease?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Subtract the original value from the new value, divide by the original value, and multiply by 100%. Going from 80 to 100 is a 25% increase.'
      }
    },
    {
      '@type': 'Question',
      name: "Why don't a 20% increase and a 20% decrease cancel out?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The second change is applied to a new base. $100 plus 20% is $120, and 20% of $120 is $24, so the result is $96, not $100.'
      }
    },
    {
      '@type': 'Question',
      name: 'How do you find the original value before a percentage change?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Divide the final value by the change factor. A $120 price after a 20% increase had an original value of $120 ÷ 1.20 = $100.'
      }
    },
    {
      '@type': 'Question',
      name: 'What is the difference between percentage difference and percent error?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Percentage difference compares two values using their average as the base. Percent error compares a measurement with an accepted reference value, which is the base.'
      }
    },
    {
      '@type': 'Question',
      name: 'What is the difference between percentage points and percent?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Percentage points measure the gap between two rates, while percent measures the change relative to the starting rate. Going from 20% to 25% is +5 percentage points, or a 25% relative increase.'
      }
    }
  ]
};

export const PERCENTAGE_CALCULATOR_ARTICLE_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  mainEntityOfPage: {
    '@type': 'WebPage',
    '@id': 'https://calculio.site/math-calculators/percentage-calculator'
  },
  headline: 'Percentage Calculator: Formulas, Examples & Free Tool',
  description:
    'Free percentage calculator: find X% of Y, percentage change, difference and error. Clear formulas, step-by-step examples and common mistakes.',
  image: 'https://calculio.site/assets/calculio-percentage-cover.webp',
  author: {
    '@type': 'Organization',
    name: 'Calculio',
    url: 'https://calculio.site'
  },
  publisher: {
    '@type': 'Organization',
    name: 'Calculio',
    url: 'https://calculio.site'
  }
};

export const PERCENTAGE_CALCULATOR_ARTICLE_BODY_HTML = `
<p>You use a percentage calculator to find a part, express a part as a percentage of a whole, or measure a change against a starting value. Your first step is choosing the base: the amount that represents 100%.</p>

<p>A <a href="/math-calculators/percentage-calculator">percent calculator</a> handles the arithmetic, while the formula helps you check the result. Finding 20% of 150 gives you 30; finding what percent 30 is of 150 gives you 20%. The numbers are the same, but the questions are different.</p>

<div class="cta"><strong>Need a quick answer?</strong> Try the free <a href="/math-calculators/percentage-calculator">Percentage Calculator on Calculio</a>, then come back to verify the result with the formulas below.</div>

<h2>How Do You Calculate Percentages With Calculio?</h2>
<p>Identify the unknown in your question: the part, the percentage, or the whole. Enter your numbers in the <a href="/math-calculators/percentage-calculator">Calculio percentage calculator</a>, and keep the matching formula nearby so you can check the arithmetic independently.</p>

<h3>What Does a Percentage Represent?</h3>
<p>A percentage expresses an amount per hundred. 20% means 20 out of every 100, which you can also write as 20/100 or 0.20.</p>

<figure>
<svg class="w-full max-w-full h-auto block mx-auto" role="img" aria-label="Grid of 100 dots with 20 highlighted, showing that 20 percent means 20 out of every 100" viewBox="0 0 560 288" width="560" font-family="system-ui,Segoe UI,Arial,sans-serif">
<defs>
<pattern id="f2g" width="24" height="24" patternUnits="userSpaceOnUse"><circle cx="12" cy="12" r="9" fill="#e2e8f0"/></pattern>
<pattern id="f2c" width="24" height="24" patternUnits="userSpaceOnUse"><circle cx="12" cy="12" r="9" fill="#f97316"/></pattern>
<linearGradient id="f2bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fff7ed"/><stop offset="1" stop-color="#f8fafc"/></linearGradient>
</defs>
<rect width="560" height="288" fill="url(#f2bg)"/>
<rect x="24" y="24" width="240" height="240" fill="url(#f2g)"/>
<rect x="24" y="24" width="240" height="48" fill="url(#f2c)"/>
<text x="300" y="118" font-size="72" font-weight="800" fill="#ea580c">20%</text>
<text x="300" y="158" font-size="21" fill="#334155">20 out of every 100</text>
<rect x="300" y="182" width="96" height="40" rx="20" fill="#ffedd5"/>
<text x="348" y="209" font-size="18" font-weight="700" fill="#9a3412" text-anchor="middle">20/100</text>
<rect x="408" y="182" width="96" height="40" rx="20" fill="#f1f5f9"/>
<text x="456" y="209" font-size="18" font-weight="700" fill="#0f172a" text-anchor="middle">0.20</text>
</svg>
<figcaption>20% means 20 parts out of 100, the same as 20/100 or 0.20.</figcaption>
</figure>

<p>Percentages let you compare proportions on a common scale: 30 correct answers out of 150 is 30/150, equivalent to 20/100 or 20%. A percentage can also exceed 100% when the compared amount is larger than the base. For example, 150 is 150% of 100.</p>

<h3>How Do You Choose the Right Calculation Type?</h3>
<p>Write down what you know and what you need to find. These three relationships cover the basic part–whole questions, and in each one the whole is your base:</p>

<figure>
<svg class="w-full max-w-full h-auto block mx-auto" role="img" aria-label="Three percentage formulas: finding the part, the percentage and the whole, each with an example" viewBox="0 0 720 220" width="720" font-family="system-ui,Segoe UI,Arial,sans-serif">
<rect width="720" height="220" fill="#f8fafc"/>
<g>
<rect x="18" y="20" width="216" height="180" rx="16" fill="#fff" stroke="#e2e8f0"/>
<rect x="38" y="40" width="40" height="6" rx="3" fill="#f97316"/>
<text x="38" y="72" font-size="15" font-weight="700" fill="#1e293b">What is X% of Y?</text>
<text x="38" y="116" font-size="21" font-weight="800" fill="#ea580c">(X ÷ 100) × Y</text>
<line x1="38" y1="138" x2="214" y2="138" stroke="#e2e8f0"/>
<text x="38" y="170" font-size="14" fill="#475569">20% of 150 → <tspan font-weight="700" fill="#ea580c">30</tspan></text>
</g>
<g>
<rect x="252" y="20" width="216" height="180" rx="16" fill="#fff" stroke="#e2e8f0"/>
<rect x="272" y="40" width="40" height="6" rx="3" fill="#0f172a"/>
<text x="272" y="72" font-size="15" font-weight="700" fill="#1e293b">What percent is A of B?</text>
<text x="272" y="116" font-size="21" font-weight="800" fill="#0f172a">(A ÷ B) × 100%</text>
<line x1="272" y1="138" x2="448" y2="138" stroke="#e2e8f0"/>
<text x="272" y="170" font-size="14" fill="#475569">30 of 150 → <tspan font-weight="700" fill="#0f172a">20%</tspan></text>
</g>
<g>
<rect x="486" y="20" width="216" height="180" rx="16" fill="#fff" stroke="#e2e8f0"/>
<rect x="506" y="40" width="40" height="6" rx="3" fill="#d97706"/>
<text x="506" y="72" font-size="15" font-weight="700" fill="#1e293b">A is X% of what?</text>
<text x="506" y="116" font-size="21" font-weight="800" fill="#b45309">A ÷ (X ÷ 100)</text>
<line x1="506" y1="138" x2="682" y2="138" stroke="#e2e8f0"/>
<text x="506" y="170" font-size="14" fill="#475569">30 is 20% of → <tspan font-weight="700" fill="#b45309">150</tspan></text>
</g>
</svg>
<figcaption>The three basic percentage questions, each with its formula and a worked result.</figcaption>
</figure>

<div class="table-container">
<table>
<thead>
<tr><th>Your question</th><th>What you know</th><th>Formula you use</th></tr>
</thead>
<tbody>
<tr><td>What is X% of Y?</td><td>Percentage and whole</td><td>Part = (X ÷ 100) × Y</td></tr>
<tr><td>What percent is A of B?</td><td>Part and whole</td><td>Percentage = (A ÷ B) × 100%</td></tr>
<tr><td>A is X% of what number?</td><td>Part and percentage</td><td>Whole = A ÷ (X ÷ 100)</td></tr>
</tbody>
</table>
</div>

<p>Label the whole before entering numbers so the numerator and denominator stay in the right order. A percentage of a value keeps the value's units; "what percent" answers use the percent symbol.</p>

<h3>How Do You Calculate X Percent of Y?</h3>
<p>Divide X by 100, then multiply by Y:</p>
<p class="formula">Part = (Percentage ÷ 100) × Whole</p>
<p>For 20% of 150: 20 ÷ 100 = 0.20, then 0.20 × 150 = 30. A quick mental check: 10% of 150 is 15, so 20% is double, or 30. That catches most decimal-entry mistakes. To skip the steps, use the <a href="/math-calculators/percentage-calculator">percentage of a number calculator</a>.</p>

<h3>What Percent Is One Number of Another?</h3>
<p>Divide the part by the whole, then multiply by 100%:</p>
<p class="formula">Percentage = (Part ÷ Whole) × 100%</p>
<p>For 30 and 150: (30 ÷ 150) × 100% = 20%. Keep the whole in the denominator. Reversing the numbers asks a different question: 150 is 500% of 30.</p>

<h3>How Do You Find the Whole From a Part and Its Percentage?</h3>
<p>Divide the part by the percentage written as a decimal. This gives you the amount that represents 100%:</p>
<p class="formula">Whole = Part ÷ (Percentage ÷ 100)</p>
<p>If 30 is 20% of the total, then 30 ÷ 0.20 = 150. Multiplying 150 by 0.20 returns 30, which confirms it. This method fails for 0%, because it requires dividing by zero.</p>

<h2>How Do You Calculate Percentage Increase and Decrease?</h2>
<p>Compare the change with the original value. To apply a change, multiply the starting amount by an increase or decrease factor. The <a href="/math-calculators/percentage-calculator">percentage increase and decrease calculator</a> does both in one step.</p>

<h3>What Is the Percentage Change Between Two Values?</h3>
<p>For a positive original value, subtract the original from the new amount, then divide by the original:</p>
<p class="formula">Percentage change = [(New − Original) ÷ Original] × 100%</p>

<figure>
<svg class="w-full max-w-full h-auto block mx-auto" role="img" aria-label="Bar chart showing a change from 80 to 100, which is a 25 percent increase" viewBox="0 0 560 290" width="560" font-family="system-ui,Segoe UI,Arial,sans-serif">
<defs>
<linearGradient id="f4a" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#cbd5e1"/><stop offset="1" stop-color="#94a3b8"/></linearGradient>
<linearGradient id="f4b" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fb923c"/><stop offset="1" stop-color="#ea580c"/></linearGradient>
<linearGradient id="f4bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fff7ed"/><stop offset="1" stop-color="#f8fafc"/></linearGradient>
<marker id="f4m" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="#ea580c"/></marker>
</defs>
<rect width="560" height="290" fill="url(#f4bg)"/>
<line x1="40" y1="240" x2="520" y2="240" stroke="#cbd5e1" stroke-width="2"/>
<rect x="100" y="80" width="110" height="160" rx="10" fill="url(#f4a)"/>
<rect x="350" y="40" width="110" height="200" rx="10" fill="url(#f4b)"/>
<text x="155" y="70" font-size="26" font-weight="800" fill="#334155" text-anchor="middle">80</text>
<text x="405" y="30" font-size="26" font-weight="800" fill="#c2410c" text-anchor="middle">100</text>
<text x="155" y="266" font-size="15" fill="#64748b" text-anchor="middle">Original</text>
<text x="405" y="266" font-size="15" fill="#64748b" text-anchor="middle">New</text>
<line x1="226" y1="150" x2="334" y2="150" stroke="#ea580c" stroke-width="4" stroke-linecap="round" marker-end="url(#f4m)"/>
<rect x="238" y="102" width="84" height="36" rx="18" fill="#ea580c"/>
<text x="280" y="127" font-size="18" font-weight="800" fill="#fff" text-anchor="middle">+25%</text>
<text x="280" y="180" font-size="13" fill="#475569" text-anchor="middle">(100 − 80) ÷ 80</text>
</svg>
<figcaption>From 80 to 100: (100 − 80) ÷ 80 × 100% = 25% increase.</figcaption>
</figure>

<p>Going from 100 to 80 is a 20% decrease, because the base is now 100. Always enter the original first and the new amount second. If the starting value is negative, state your convention. If a balance crosses zero, report the absolute change alongside the starting and ending balances.</p>

<h3>How Do You Increase or Decrease a Number by a Percentage?</h3>
<p>Multiply the original value by one plus the decimal rate for an increase, or one minus the decimal rate for a decrease:</p>
<ul>
<li><strong>Increase:</strong> New value = Original × (1 + Rate ÷ 100)</li>
<li><strong>Decrease:</strong> New value = Original × (1 − Rate ÷ 100)</li>
</ul>
<p>With a $150 price, a 20% increase gives $150 × 1.20 = $180, and a 20% decrease gives $150 × 0.80 = $120. In both cases the adjustment is $30; the final value includes the original amount.</p>

<h3>How Do You Recover the Original Value After a Percentage Change?</h3>
<p>Reverse the multiplication with division. Divide the final amount by the factor that was applied:</p>
<ul>
<li><strong>After an increase:</strong> Original = Final ÷ (1 + Rate ÷ 100)</li>
<li><strong>After a decrease:</strong> Original = Final ÷ (1 − Rate ÷ 100)</li>
</ul>
<p>If a tax-inclusive price is $120 after a 20% tax, the pretax amount is $120 ÷ 1.20 = $100. Do not subtract 20% of $120: that treats the final price as the base.</p>

<h3>Why Do Equal Percentage Increases and Decreases Not Cancel Out?</h3>
<p>The second change is applied to the amount produced by the first, so it works from a new base.</p>

<figure>
<svg class="w-full max-w-full h-auto block mx-auto" role="img" aria-label="Bar chart: 100 dollars rises 20 percent to 120 dollars, then falls 20 percent to 96 dollars" viewBox="0 0 600 316" width="600" font-family="system-ui,Segoe UI,Arial,sans-serif">
<defs>
<linearGradient id="f5a" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#cbd5e1"/><stop offset="1" stop-color="#94a3b8"/></linearGradient>
<linearGradient id="f5b" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fb923c"/><stop offset="1" stop-color="#ea580c"/></linearGradient>
<linearGradient id="f5c" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fb7185"/><stop offset="1" stop-color="#e11d48"/></linearGradient>
<linearGradient id="f5bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fff7ed"/><stop offset="1" stop-color="#f8fafc"/></linearGradient>
</defs>
<rect width="600" height="316" fill="url(#f5bg)"/>
<line x1="30" y1="250" x2="570" y2="250" stroke="#cbd5e1" stroke-width="2"/>
<rect x="440" y="90" width="100" height="160" rx="10" fill="none" stroke="#94a3b8" stroke-width="2" stroke-dasharray="6 5"/>
<rect x="60" y="90" width="100" height="160" rx="10" fill="url(#f5a)"/>
<rect x="250" y="58" width="100" height="192" rx="10" fill="url(#f5b)"/>
<rect x="440" y="96.4" width="100" height="153.6" rx="10" fill="url(#f5c)"/>
<text x="110" y="80" font-size="24" font-weight="800" fill="#334155" text-anchor="middle">$100</text>
<text x="300" y="48" font-size="24" font-weight="800" fill="#c2410c" text-anchor="middle">$120</text>
<text x="490" y="120" font-size="24" font-weight="800" fill="#fff" text-anchor="middle">$96</text>
<rect x="165" y="118" width="80" height="34" rx="17" fill="#ea580c"/>
<text x="205" y="141" font-size="17" font-weight="800" fill="#fff" text-anchor="middle">+20%</text>
<rect x="355" y="118" width="80" height="34" rx="17" fill="#e11d48"/>
<text x="395" y="141" font-size="17" font-weight="800" fill="#fff" text-anchor="middle">−20%</text>
<text x="110" y="275" font-size="14" fill="#64748b" text-anchor="middle">Start</text>
<text x="300" y="275" font-size="14" fill="#64748b" text-anchor="middle">After +20%</text>
<text x="490" y="275" font-size="14" fill="#64748b" text-anchor="middle">After −20%</text>
<text x="300" y="303" font-size="14" font-weight="600" fill="#9f1239" text-anchor="middle">Not back to $100: the drop is 20% of $120, which is $24.</text>
</svg>
<figcaption>A 20% rise followed by a 20% drop leaves you at $96.</figcaption>
</figure>

<p>To check successive changes, multiply the factors: <strong>$100 × 1.20 × 0.80 = $96</strong>. Adding the signed rates would ignore the changing base.</p>

<h2>When Should You Use Percentage Difference or Percent Error?</h2>
<p>Use percentage difference to compare two positive values on equal footing, and percent error to compare a measurement with an accepted reference. The denominator changes with the purpose of the comparison.</p>

<h3>How Does Percentage Difference Compare Two Values?</h3>
<p>When neither value is a starting point or reference, use their average as the base:</p>
<p class="formula">Percentage difference = |A − B| ÷ [(A + B) ÷ 2] × 100%</p>
<p>For 80 and 100, the gap is 20 and the average is 90, so 20 ÷ 90 × 100% ≈ 22.22%. Swapping the values gives the same result. Use positive quantities with a nonzero average; signed values that cancel each other need a different method.</p>

<h3>How Does Percent Error Compare a Measurement With a Reference?</h3>
<p>Divide the absolute gap by the magnitude of the accepted reference:</p>
<p class="formula">Percent error = |Measured − Reference| ÷ |Reference| × 100%</p>
<p>A measurement of 98 against a reference of 100 gives |98 − 100| ÷ 100 × 100% = 2%. If your assignment requires a signed percent error, follow its sign convention to show direction. A zero reference leaves relative percent error undefined.</p>

<h2>How Do You Convert Percentages, Fractions, and Decimals?</h2>
<p>Treat the percent symbol as "divided by 100." That lets you move between decimals and fractions without changing the value.</p>

<h3>How Do You Convert Between Percentages and Decimals?</h3>
<p>Divide by 100 to go from percent to decimal. Multiply by 100 and add the percent symbol to go from decimal to percent.</p>
<div class="table-container">
<table>
<thead>
<tr><th>Starting value</th><th>Conversion</th><th>Result</th></tr>
</thead>
<tbody>
<tr><td>20%</td><td>20 ÷ 100</td><td>0.20</td></tr>
<tr><td>0.20</td><td>0.20 × 100%</td><td>20%</td></tr>
<tr><td>125%</td><td>125 ÷ 100</td><td>1.25</td></tr>
<tr><td>0.3786</td><td>0.3786 × 100%</td><td>37.86%</td></tr>
</tbody>
</table>
</div>
<p>In any formula that calls for a <a href="/math-calculators/decimal-calculator">decimal rate</a>, enter 0.20 for 20%.</p>

<h3>How Do You Convert Between Fractions and Percentages?</h3>
<p>For <a href="/math-calculators/fraction-calculator">fraction to percent</a>, divide the numerator by the denominator and multiply by 100%: 3 ÷ 4 × 100% = 75%. For percent to fraction, write the percentage over 100 and simplify: 75/100 = 3/4.</p>
<p>If a fraction produces a repeating decimal, keep the fraction (or full calculator precision) until the final step. You can report 1/3 as about 33.33% while keeping its exact value for later arithmetic.</p>

<h2>How Can You Apply Percentages Without Common Mistakes?</h2>
<p>Name the base before calculating, and label amounts with their units and time periods. That habit prevents most errors in purchases, grades, and business figures.</p>

<h3>How Do Discounts and Taxes Affect the Final Price?</h3>
<p>Apply each rate to its own taxable or discountable amount. When tax applies to the discounted price:</p>
<p class="formula">Final price = Original price × (1 − Discount rate) × (1 + Tax rate)</p>

<figure>
<svg class="w-full max-w-full h-auto block mx-auto" role="img" aria-label="Price steps: 100 dollars original, 80 dollars after a 20 percent discount, 86.40 dollars after 8 percent tax" viewBox="0 0 600 316" width="600" font-family="system-ui,Segoe UI,Arial,sans-serif">
<defs>
<linearGradient id="f6a" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#cbd5e1"/><stop offset="1" stop-color="#94a3b8"/></linearGradient>
<linearGradient id="f6b" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fb7185"/><stop offset="1" stop-color="#e11d48"/></linearGradient>
<linearGradient id="f6c" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fb923c"/><stop offset="1" stop-color="#ea580c"/></linearGradient>
<linearGradient id="f6bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fff7ed"/><stop offset="1" stop-color="#f8fafc"/></linearGradient>
</defs>
<rect width="600" height="316" fill="url(#f6bg)"/>
<line x1="30" y1="250" x2="570" y2="250" stroke="#cbd5e1" stroke-width="2"/>
<rect x="60" y="90" width="100" height="160" rx="10" fill="url(#f6a)"/>
<rect x="250" y="122" width="100" height="128" rx="10" fill="url(#f6b)"/>
<rect x="440" y="111.8" width="100" height="138.2" rx="10" fill="url(#f6c)"/>
<text x="110" y="80" font-size="24" font-weight="800" fill="#334155" text-anchor="middle">$100</text>
<text x="300" y="112" font-size="24" font-weight="800" fill="#9f1239" text-anchor="middle">$80</text>
<text x="490" y="102" font-size="24" font-weight="800" fill="#c2410c" text-anchor="middle">$86.40</text>
<rect x="165" y="150" width="80" height="34" rx="17" fill="#e11d48"/>
<text x="205" y="173" font-size="17" font-weight="800" fill="#fff" text-anchor="middle">−20%</text>
<rect x="355" y="150" width="80" height="34" rx="17" fill="#d97706"/>
<text x="395" y="173" font-size="17" font-weight="800" fill="#fff" text-anchor="middle">+8%</text>
<text x="110" y="275" font-size="14" fill="#64748b" text-anchor="middle">Original</text>
<text x="300" y="275" font-size="14" fill="#64748b" text-anchor="middle">After discount</text>
<text x="490" y="275" font-size="14" fill="#64748b" text-anchor="middle">Final price</text>
<text x="300" y="303" font-size="14" font-weight="600" fill="#9a3412" text-anchor="middle">Tax is charged on $80, not on $100: $80 × 0.08 = $6.40</text>
</svg>
<figcaption>Discount first, then tax on the discounted price.</figcaption>
</figure>

<p>For a $100 item with a 20% discount and 8% <a href="/tax-calculators/sales-tax-calculator">sales tax</a>: $100 × 0.80 = $80, tax is $80 × 0.08 = $6.40, and the total is $86.40. Check the receipt's taxable subtotal, especially with coupons or extra charges, and use the rates that apply to your purchase.</p>

<h3>How Do You Compare Salary Changes, Interest Rates, and Investment Returns?</h3>
<p>For a salary change, divide the raise by the original salary. Going from $50,000 to $55,000 is $5,000 ÷ $50,000 × 100% = 10%.</p>
<p>Simple interest uses the original principal, while <a href="/financial-calculators/compound-interest-calculator">annual compounding</a> grows the balance each year:</p>
<ul>
<li><strong>Simple interest:</strong> Interest = Principal × Annual decimal rate × Years</li>
<li><strong>Annual compounding:</strong> Ending balance = Principal × (1 + Annual decimal rate)^Years</li>
</ul>
<p>With $1,000 at 5% for two years, simple interest gives $1,100 and annual compounding gives $1,102.50. For investment returns, include fees and distributions, and use a cash-flow-aware method if you make deposits or withdrawals during the period.</p>

<h3>How Do You Calculate Test Scores and Interpret Survey Results?</h3>
<p>For test scores, divide earned points by available points: 18 ÷ 20 × 100% = 90%. If categories carry different weights, multiply each category score by its decimal weight and add the results.</p>
<p>For surveys, define who belongs in the denominator. If 80 of 100 valid respondents report satisfaction, the result is 80%, and your interpretation should name the question and the respondents. When combining groups, add the counts first. Averaging group percentages only matches the count-based result when the groups are the same size.</p>

<h3>How Do You Calculate Profit Margins, Market Share, and Conversion Rates?</h3>
<p>Choose the denominator the metric specifies. <a href="/business-calculators/profit-margin-calculator">Profit margin</a> uses revenue, while markup uses cost.</p>
<div class="table-container">
<table>
<thead>
<tr><th>Metric</th><th>Formula</th><th>Example</th></tr>
</thead>
<tbody>
<tr><td>Gross profit margin</td><td>(Revenue − COGS) ÷ Revenue × 100%</td><td>($100 − $60) ÷ $100 × 100% = 40%</td></tr>
<tr><td>Markup</td><td>(Selling price − Cost) ÷ Cost × 100%</td><td>($100 − $60) ÷ $60 × 100% ≈ 66.67%</td></tr>
<tr><td>Market share</td><td>Your sales ÷ Total market sales × 100%</td><td>$200,000 ÷ $1,000,000 × 100% = 20%</td></tr>
<tr><td>Conversion rate</td><td>Conversions ÷ Eligible opportunities × 100%</td><td>30 ÷ 1,000 × 100% = 3%</td></tr>
</tbody>
</table>
</div>
<p>For market share, match the geography, period, and sales basis; revenue share and unit share answer different questions. For conversion rates, say whether the denominator counts visitors, sessions, or leads, and keep that definition consistent across reporting periods.</p>

<h3>How Do You Avoid Percentage-Point, Zero-Base, and Rounding Errors?</h3>
<p>First decide whether you are describing a gap between rates or a relative change. If a conversion rate rises from 20% to 25%, that is a 5-percentage-point increase and a 25% relative increase.</p>

<figure>
<svg class="w-full max-w-full h-auto block mx-auto" role="img" aria-label="Conversion rate from 20 percent to 25 percent: a gain of 5 percentage points, which is a 25 percent relative increase" viewBox="0 0 560 250" width="560" font-family="system-ui,Segoe UI,Arial,sans-serif">
<defs>
<linearGradient id="f7a" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#94a3b8"/><stop offset="1" stop-color="#64748b"/></linearGradient>
<linearGradient id="f7b" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#fb923c"/><stop offset="1" stop-color="#ea580c"/></linearGradient>
<linearGradient id="f7bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fff7ed"/><stop offset="1" stop-color="#f8fafc"/></linearGradient>
</defs>
<rect width="560" height="250" fill="url(#f7bg)"/>
<text x="40" y="32" font-size="14" fill="#64748b">Conversion rate (track = 100% of visitors)</text>
<rect x="40" y="46" width="400" height="36" rx="18" fill="#e2e8f0"/>
<rect x="40" y="46" width="80" height="36" rx="18" fill="url(#f7a)"/>
<text x="456" y="71" font-size="20" font-weight="800" fill="#334155">20%</text>
<rect x="40" y="102" width="400" height="36" rx="18" fill="#e2e8f0"/>
<rect x="40" y="102" width="100" height="36" rx="18" fill="url(#f7b)"/>
<rect x="120" y="102" width="20" height="36" fill="#f59e0b"/>
<rect x="120" y="102" width="20" height="36" rx="0" fill="#f59e0b"/>
<text x="456" y="127" font-size="20" font-weight="800" fill="#c2410c">25%</text>
<rect x="40" y="166" width="230" height="38" rx="19" fill="#fef3c7"/>
<text x="155" y="191" font-size="16" font-weight="800" fill="#92400e" text-anchor="middle">+5 percentage points</text>
<rect x="284" y="166" width="236" height="38" rx="19" fill="#ffedd5"/>
<text x="402" y="191" font-size="16" font-weight="800" fill="#9a3412" text-anchor="middle">+25% relative (5 ÷ 20)</text>
<text x="280" y="232" font-size="13" fill="#64748b" text-anchor="middle">Percentage points = the gap between rates. Percent = change relative to the old rate.</text>
</svg>
<figcaption>Percentage points and percent describe two different things.</figcaption>
</figure>

<p>Run through these checks before reporting a result:</p>
<ul>
<li><strong>Zero base:</strong> If the starting value is zero, percentage change is undefined. Report the absolute change and both values.</li>
<li><strong>Values above 100%:</strong> Twice the base is 200% of it, while a part inside its whole stays at or below 100%.</li>
<li><strong>Rounding:</strong> Keep full precision through intermediate steps and round only the displayed result. For money, follow the rounding rules of your receipt, accounting system, or assignment.</li>
<li><strong>Reversed denominator:</strong> Read the formula aloud as "part divided by whole" or "change divided by original."</li>
</ul>

<h2>Choose the Right Base for Accurate Percentages</h2>
<p>Accurate percentages start with knowing what represents 100%: the whole for part–whole questions, the original value for percentage change, and the accepted reference for percent error. Then confirm your answer with Calculio's <a href="/math-calculators/percentage-calculator">free online percentage calculator</a>.</p>

<div class="cta"><strong>Calculate it now:</strong> <a href="/math-calculators/percentage-calculator">Open the Percentage Calculator →</a></div>

<h2>Percentage Calculator FAQ</h2>

<h3>How do you calculate a percentage of a number?</h3>
<p>Divide the percentage by 100, then multiply by the number. For example, 20% of 150 is 0.20 × 150 = 30.</p>

<h3>How do you find what percent one number is of another?</h3>
<p>Divide the part by the whole, then multiply by 100%. For example, 30 ÷ 150 × 100% = 20%.</p>

<h3>How do you calculate percentage increase or decrease?</h3>
<p>Subtract the original value from the new value, divide by the original value, and multiply by 100%. Going from 80 to 100 is a 25% increase.</p>

<h3>Why don't a 20% increase and a 20% decrease cancel out?</h3>
<p>The second change is applied to a new base. $100 plus 20% is $120, and 20% of $120 is $24, so the result is $96, not $100.</p>

<h3>How do you find the original value before a percentage change?</h3>
<p>Divide the final value by the change factor. A $120 price after a 20% increase had an original value of $120 ÷ 1.20 = $100.</p>

<h3>What is the difference between percentage difference and percent error?</h3>
<p>Percentage difference compares two values using their average as the base. Percent error compares a measurement with an accepted reference value, which is the base.</p>

<h3>What is the difference between percentage points and percent?</h3>
<p>Percentage points measure the gap between two rates, while percent measures the change relative to the starting rate. Going from 20% to 25% is +5 percentage points, or a 25% relative increase.</p>
`;

export const PERCENTAGE_CALCULATOR_ARTICLE_HTML = `
<h2>Percentage Calculator: Formulas and Practical Examples</h2>

<figure>
  <img
    src="/assets/calculio-percentage-cover.webp"
    alt="Percentage calculator cover showing 20% of 150 equals 30"
    width="1200"
    height="630"
    loading="eager"
    decoding="async"
    referrerpolicy="no-referrer"
    class="border border-[#E2E8F0]"
  />
</figure>
${PERCENTAGE_CALCULATOR_ARTICLE_BODY_HTML}`;
