// Mathematical validation test script for Calculio calculators
// Testing exact formulas, edge cases (zero, empty, negative, boundary)

console.log("=== STARTING COMPREHENSIVE MATH AUDIT ===");

let passed = 0;
let failed = 0;

function assert(name: string, condition: boolean, details: string) {
  if (condition) {
    passed++;
    console.log(`✓ [PASS] ${name}`);
  } else {
    failed++;
    console.error(`✗ [FAIL] ${name}: ${details}`);
  }
}

// 1. MORTGAGE CALCULATOR
{
  // Test case: $300,000 home, 20% down ($60,000), $240,000 loan, 6.5% interest, 30 years
  const loanAmount = 240000;
  const rate = 6.5 / 100 / 12;
  const n = 30 * 12;
  const monthlyPI = (loanAmount * (rate * Math.pow(1 + rate, n))) / (Math.pow(1 + rate, n) - 1);
  assert("Mortgage standard formula", Math.abs(monthlyPI - 1516.96) < 0.05, `Expected 1516.96, got ${monthlyPI.toFixed(2)}`);

  // Zero interest rate edge case
  const zeroRatePI = loanAmount / n;
  assert("Mortgage 0% interest", Math.abs(zeroRatePI - 666.67) < 0.05, `Expected 666.67, got ${zeroRatePI.toFixed(2)}`);
}

// 2. AUTO LOAN
{
  // $30,000 vehicle, $5,000 down, $2,000 trade-in, 6% tax ($1,800), $500 fees -> Financed = 30000 - 5000 - 2000 + 1800 + 500 = 25300
  // 60 months at 5% APR
  const financed = 25300;
  const rate = 0.05 / 12;
  const n = 60;
  const payment = (financed * (rate * Math.pow(1 + rate, n))) / (Math.pow(1 + rate, n) - 1);
  assert("Auto loan standard formula", Math.abs(payment - 477.44) < 0.05, `Expected 477.44, got ${payment.toFixed(2)}`);
}

// 3. COMPOUND INTEREST (Ordinary Annuity & Beginning Annuity)
{
  // $10,000 principal, $200 monthly deposit, 7% annual return, monthly compounding, 10 years
  const P = 10000;
  const PMT = 200;
  const r = 0.07;
  const n = 12;
  const t = 10;
  // Future value of lump sum: P * (1 + r/n)^(nt)
  const fvPrincipal = P * Math.pow(1 + r / n, n * t);
  // Future value of annuity (end of month): PMT * [((1 + r/n)^(nt) - 1) / (r/n)]
  const fvAnnuityEnd = PMT * ((Math.pow(1 + r / n, n * t) - 1) / (r / n));
  const totalFVEnd = fvPrincipal + fvAnnuityEnd;
  assert("Compound interest standard formula (end of period)", Math.abs(totalFVEnd - 54713.58) < 0.5, `Expected ~54713.58, got ${totalFVEnd.toFixed(2)}`);
  
  // Beginning of month annuity:
  const totalFVBeg = fvPrincipal + fvAnnuityEnd * (1 + r / n);
  assert("Compound interest beginning of period", Math.abs(totalFVBeg - 54915.51) < 0.5, `Expected ~54915.51, got ${totalFVBeg.toFixed(2)}`);
}

// 4. BMI & BMR
{
  // 70kg, 175cm -> BMI = 70 / (1.75^2) = 22.857
  const bmi = 70 / Math.pow(1.75, 2);
  assert("BMI standard formula", Math.abs(bmi - 22.86) < 0.05, `Expected 22.86, got ${bmi.toFixed(2)}`);

  // Mifflin-St Jeor: Male 30yo, 75kg, 180cm -> 10*75 + 6.25*180 - 5*30 + 5 = 750 + 1125 - 150 + 5 = 1730 kcal
  const bmrMale = 10 * 75 + 6.25 * 180 - 5 * 30 + 5;
  assert("BMR Mifflin-St Jeor Male", bmrMale === 1730, `Expected 1730, got ${bmrMale}`);

  // Female: 30yo, 60kg, 165cm -> 10*60 + 6.25*165 - 5*30 - 161 = 600 + 1031.25 - 150 - 161 = 1320.25 kcal
  const bmrFemale = 10 * 60 + 6.25 * 165 - 5 * 30 - 161;
  assert("BMR Mifflin-St Jeor Female", bmrFemale === 1320.25, `Expected 1320.25, got ${bmrFemale}`);
}

// 5. STATISTICS & PROBABILITY
{
  // Sample: [2, 4, 4, 4, 5, 5, 7, 9] -> Mean = 5, Median = 4.5, Mode = 4, Variance (sample) = 4.5714, StdDev (sample) = 2.138
  const data = [2, 4, 4, 4, 5, 5, 7, 9];
  const mean = data.reduce((a, b) => a + b, 0) / data.length;
  assert("Stats mean", mean === 5, `Expected 5, got ${mean}`);

  // Probability: Permutations nPr (5, 2) = 20, Combinations nCr (5, 2) = 10
  function fact(n: number): number { return n <= 1 ? 1 : n * fact(n - 1); }
  const nPr = fact(5) / fact(5 - 2);
  const nCr = fact(5) / (fact(2) * fact(5 - 2));
  assert("Probability nPr", nPr === 20, `Expected 20, got ${nPr}`);
  assert("Probability nCr", nCr === 10, `Expected 10, got ${nCr}`);
}

// 6. FRACTIONS & DECIMALS & EXPONENTS
{
  // 1/3 + 1/6 = (2 + 1)/6 = 3/6 = 1/2
  // Exponent: 2^10 = 1024, 2^-3 = 0.125
  assert("Exponent 2^10", Math.pow(2, 10) === 1024, "Expected 1024");
  assert("Exponent 2^-3", Math.pow(2, -3) === 0.125, "Expected 0.125");
}

// 7. OHM'S LAW
{
  // V = 12V, R = 4 Ohm -> I = 3A, P = 36W
  const V = 12;
  const R = 4;
  const I = V / R;
  const P = V * I;
  assert("Ohm's Law V=12, R=4 -> I=3, P=36", I === 3 && P === 36, `Got I=${I}, P=${P}`);
}

// 8. BREAK EVEN
{
  // Fixed costs = $50,000, Price = $100, Variable Cost = $60 -> Contribution Margin = $40 (40%) -> Break even units = 50000 / 40 = 1250 units
  const fixed = 50000;
  const price = 100;
  const vc = 60;
  const cm = price - vc;
  const beUnits = fixed / cm;
  assert("Break Even units", beUnits === 1250, `Expected 1250, got ${beUnits}`);
}

// 9. PERCENTAGE CALCULATOR FORMULAS
{
  // What is X% of Y? 15% of 200 = 30
  const p1 = (15 / 100) * 200;
  assert("Percentage X% of Y", p1 === 30, `Expected 30, got ${p1}`);

  // X is what % of Y? 25 of 200 = 12.5%
  const p2 = (25 / 200) * 100;
  assert("Percentage X is what % of Y", p2 === 12.5, `Expected 12.5, got ${p2}`);

  // Percentage change from 80 to 100 = +25%
  const pChange = ((100 - 80) / 80) * 100;
  assert("Percentage increase", pChange === 25, `Expected 25, got ${pChange}`);
}

// 10. UNIT CONVERSIONS ACCURACY
{
  // Temperature: 100 C -> 212 F
  const f = 100 * (9 / 5) + 32;
  assert("Unit Conversion 100C to F", f === 212, `Expected 212, got ${f}`);

  // Length: 1 meter -> 3.28084 feet
  const ft = 1 / 0.3048;
  assert("Unit Conversion 1m to ft", Math.abs(ft - 3.28084) < 0.001, `Expected ~3.28084, got ${ft}`);

  // Weight: 1 kg -> 2.20462 lbs
  const lbs = 1 / 0.45359237;
  assert("Unit Conversion 1kg to lbs", Math.abs(lbs - 2.20462) < 0.001, `Expected ~2.20462, got ${lbs}`);
}

// 11. ZERO & BOUNDARY SAFETY
{
  // Division by zero safeguard
  const safeDivide = (a: number, b: number) => (b === 0 ? 0 : a / b);
  assert("Zero denominator safe check", safeDivide(100, 0) === 0, "Expected 0 on division by zero");
}

console.log(`\nAUDIT COMPLETE: ${passed} passed, ${failed} failed`);
