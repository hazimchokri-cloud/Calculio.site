import React, { useState, useMemo } from 'react';
import { Calculator, RotateCcw, Copy, Check, Sparkles, Hash } from 'lucide-react';
import { copyToClipboard } from '../../utils/formatters';

interface BaseCalcProps {
  currencySymbol?: string;
  onSave?: (summary: string, inputs: any, results: any) => void;
}

// 1. Quadratic Equation Solver (ax² + bx + c = 0)
export const QuadraticSolver: React.FC<BaseCalcProps> = () => {
  const [a, setA] = useState(1);
  const [b, setB] = useState(-5);
  const [c, setC] = useState(6);

  const results = useMemo(() => {
    if (a === 0) {
      if (b === 0) return { type: 'Invalid', text: 'Not an equation' };
      const root = -c / b;
      return {
        type: 'Linear',
        x1: root.toFixed(4),
        discriminant: 0,
        vertexX: 0,
        vertexY: 0,
        explanation: `Linear equation: ${b}x + ${c} = 0 → x = ${root}`
      };
    }

    const disc = b * b - 4 * a * c;
    const vertexX = -b / (2 * a);
    const vertexY = a * vertexX * vertexX + b * vertexX + c;

    if (disc > 0) {
      const x1 = (-b + Math.sqrt(disc)) / (2 * a);
      const x2 = (-b - Math.sqrt(disc)) / (2 * a);
      return {
        type: 'Two Real Roots',
        x1: x1.toFixed(4),
        x2: x2.toFixed(4),
        discriminant: disc.toFixed(2),
        vertexX: vertexX.toFixed(2),
        vertexY: vertexY.toFixed(2),
        formula: `x = [ -(${b}) ± √(${disc.toFixed(2)}) ] / (2 * ${a})`
      };
    } else if (disc === 0) {
      const x = -b / (2 * a);
      return {
        type: 'One Double Root',
        x1: x.toFixed(4),
        x2: x.toFixed(4),
        discriminant: 0,
        vertexX: vertexX.toFixed(2),
        vertexY: vertexY.toFixed(2),
        formula: `x = -(${b}) / (2 * ${a})`
      };
    } else {
      const real = (-b / (2 * a)).toFixed(4);
      const imag = (Math.sqrt(-disc) / (2 * a)).toFixed(4);
      return {
        type: 'Complex Roots',
        x1: `${real} + ${imag}i`,
        x2: `${real} - ${imag}i`,
        discriminant: disc.toFixed(2),
        vertexX: vertexX.toFixed(2),
        vertexY: vertexY.toFixed(2),
        formula: `Discriminant Δ = ${disc.toFixed(2)} < 0 (Complex conjugates)`
      };
    }
  }, [a, b, c]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-6 rounded-2xl border border-slate-200">
        <div className="space-y-4">
          <div className="p-3 bg-slate-50 rounded-xl border text-center font-mono text-sm font-bold text-slate-800">
            {a}x² {b >= 0 ? `+ ${b}` : `- ${Math.abs(b)}`}x {c >= 0 ? `+ ${c}` : `- ${Math.abs(c)}`} = 0
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Coefficient a</label>
              <input
                type="number"
                value={a}
                onChange={(e) => setA(Number(e.target.value))}
                className="w-full px-3 py-2 border rounded-lg text-sm font-bold"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Coefficient b</label>
              <input
                type="number"
                value={b}
                onChange={(e) => setB(Number(e.target.value))}
                className="w-full px-3 py-2 border rounded-lg text-sm font-bold"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Constant c</label>
              <input
                type="number"
                value={c}
                onChange={(e) => setC(Number(e.target.value))}
                className="w-full px-3 py-2 border rounded-lg text-sm font-bold"
              />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-5 rounded-xl border border-blue-200 flex flex-col justify-between space-y-4">
          <div>
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold text-blue-900 uppercase tracking-wider">Solution Roots</span>
              <span className="text-[11px] font-bold bg-blue-100 text-blue-800 px-2 py-0.5 rounded">{results.type}</span>
            </div>
            <div className="mt-3 space-y-1">
              <div className="text-2xl font-black text-blue-950 font-mono-numbers">
                x₁ = {results.x1}
              </div>
              {results.x2 && results.x2 !== results.x1 && (
                <div className="text-2xl font-black text-blue-950 font-mono-numbers">
                  x₂ = {results.x2}
                </div>
              )}
            </div>
          </div>

          <div className="bg-white p-3 rounded-lg border border-blue-100 text-xs text-slate-700 space-y-1">
            <div className="flex justify-between">
              <span>Discriminant (Δ = b² - 4ac):</span>
              <span className="font-bold">{results.discriminant}</span>
            </div>
            <div className="flex justify-between">
              <span>Parabola Vertex (h, k):</span>
              <span className="font-bold">({results.vertexX}, {results.vertexY})</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// 2. Pythagorean Theorem Calculator (a² + b² = c²)
export const PythagoreanCalculator: React.FC<BaseCalcProps> = () => {
  const [sideA, setSideA] = useState<number | ''>(3);
  const [sideB, setSideB] = useState<number | ''>(4);
  const [sideC, setSideC] = useState<number | ''>('');

  const results = useMemo(() => {
    const numA = typeof sideA === 'number' ? sideA : 0;
    const numB = typeof sideB === 'number' ? sideB : 0;
    const numC = typeof sideC === 'number' ? sideC : 0;

    // If A and B given -> solve C
    if (numA > 0 && numB > 0 && !numC) {
      const cCalc = Math.sqrt(numA * numA + numB * numB);
      const area = 0.5 * numA * numB;
      const perimeter = numA + numB + cCalc;
      const alphaDeg = (Math.asin(numA / cCalc) * (180 / Math.PI)).toFixed(1);
      const betaDeg = (90 - Number(alphaDeg)).toFixed(1);
      return {
        solvedSide: 'Hypotenuse (c)',
        value: cCalc.toFixed(4),
        area: area.toFixed(2),
        perimeter: perimeter.toFixed(2),
        angles: `α ≈ ${alphaDeg}°, β ≈ ${betaDeg}°, γ = 90°`
      };
    }

    // If C and A given -> solve B
    if (numC > 0 && numA > 0 && numC > numA) {
      const bCalc = Math.sqrt(numC * numC - numA * numA);
      const area = 0.5 * numA * bCalc;
      const perimeter = numA + bCalc + numC;
      return {
        solvedSide: 'Leg (b)',
        value: bCalc.toFixed(4),
        area: area.toFixed(2),
        perimeter: perimeter.toFixed(2),
        angles: `Right Triangle`
      };
    }

    // If C and B given -> solve A
    if (numC > 0 && numB > 0 && numC > numB) {
      const aCalc = Math.sqrt(numC * numC - numB * numB);
      const area = 0.5 * aCalc * numB;
      const perimeter = aCalc + numB + numC;
      return {
        solvedSide: 'Leg (a)',
        value: aCalc.toFixed(4),
        area: area.toFixed(2),
        perimeter: perimeter.toFixed(2),
        angles: `Right Triangle`
      };
    }

    return null;
  }, [sideA, sideB, sideC]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-6 rounded-2xl border border-slate-200">
        <div className="space-y-3.5">
          <h4 className="text-xs font-bold uppercase text-slate-700 tracking-wider">Enter Any 2 Sides (Leave 1 Blank)</h4>
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Leg a</label>
            <input
              type="number"
              value={sideA}
              onChange={(e) => setSideA(e.target.value === '' ? '' : Math.max(0, Number(e.target.value)))}
              placeholder="Leave blank to solve"
              className="w-full px-3 py-1.5 border rounded-lg text-xs font-bold"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Leg b</label>
            <input
              type="number"
              value={sideB}
              onChange={(e) => setSideB(e.target.value === '' ? '' : Math.max(0, Number(e.target.value)))}
              placeholder="Leave blank to solve"
              className="w-full px-3 py-1.5 border rounded-lg text-xs font-bold"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Hypotenuse c (Longest Side)</label>
            <input
              type="number"
              value={sideC}
              onChange={(e) => setSideC(e.target.value === '' ? '' : Math.max(0, Number(e.target.value)))}
              placeholder="Leave blank to solve"
              className="w-full px-3 py-1.5 border rounded-lg text-xs font-bold"
            />
          </div>
        </div>

        <div className="bg-gradient-to-br from-orange-50 to-teal-50 p-5 rounded-xl border border-orange-200 flex flex-col justify-between space-y-4">
          <div>
            <span className="text-xs font-bold text-orange-900 uppercase tracking-wider">Solved Unknown Side</span>
            <div className="text-3xl font-black text-orange-950 font-mono-numbers mt-1">
              {results ? results.value : 'Enter 2 sides'}
            </div>
            {results && <span className="text-xs text-orange-800 font-semibold">{results.solvedSide}</span>}
          </div>

          {results && (
            <div className="bg-white p-3 rounded-lg border border-orange-100 text-xs text-slate-700 space-y-1">
              <div className="flex justify-between">
                <span>Triangle Area:</span>
                <span className="font-bold">{results.area} sq units</span>
              </div>
              <div className="flex justify-between">
                <span>Total Perimeter:</span>
                <span className="font-bold">{results.perimeter} units</span>
              </div>
              <div className="flex justify-between">
                <span>Angles:</span>
                <span className="font-bold">{results.angles}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// 3. LCM & GCD / GCF Calculator
export const LcmGcdCalculator: React.FC<BaseCalcProps> = () => {
  const [num1, setNum1] = useState(24);
  const [num2, setNum2] = useState(36);

  const results = useMemo(() => {
    const a = Math.abs(Math.round(num1));
    const b = Math.abs(Math.round(num2));
    if (a === 0 || b === 0) return null;

    // Euclidean algorithm for GCD
    const gcd = (x: number, y: number): number => (y === 0 ? x : gcd(y, x % y));
    const g = gcd(a, b);
    const lcm = (a * b) / g;

    // Prime factors helper
    const getPrimeFactors = (n: number) => {
      const factors: number[] = [];
      let d = 2;
      while (n >= 2) {
        if (n % d === 0) {
          factors.push(d);
          n /= d;
        } else {
          d++;
        }
      }
      return factors.join(' × ');
    };

    return {
      gcd: g,
      lcm: lcm,
      factorsA: getPrimeFactors(a),
      factorsB: getPrimeFactors(b)
    };
  }, [num1, num2]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-6 rounded-2xl border border-slate-200">
        <div className="space-y-4">
          <h4 className="text-xs font-bold uppercase text-slate-700 tracking-wider">Two Positive Integers</h4>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">First Integer</label>
              <input
                type="number"
                value={num1}
                onChange={(e) => setNum1(Math.max(1, Number(e.target.value)))}
                className="w-full px-3 py-2 border rounded-lg text-sm font-bold"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Second Integer</label>
              <input
                type="number"
                value={num2}
                onChange={(e) => setNum2(Math.max(1, Number(e.target.value)))}
                className="w-full px-3 py-2 border rounded-lg text-sm font-bold"
              />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-indigo-50 p-5 rounded-xl border border-purple-200 flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <div>
              <span className="text-xs font-bold text-purple-900 uppercase tracking-wider">Greatest Common Divisor (GCD / GCF)</span>
              <div className="text-2xl font-black text-purple-950 font-mono-numbers">{results?.gcd}</div>
            </div>
            <div>
              <span className="text-xs font-bold text-purple-900 uppercase tracking-wider">Least Common Multiple (LCM)</span>
              <div className="text-2xl font-black text-purple-950 font-mono-numbers">{results?.lcm}</div>
            </div>
          </div>

          {results && (
            <div className="bg-white p-2.5 rounded-lg border border-purple-100 text-[11px] text-slate-700 space-y-1">
              <div>Prime Factorization of {num1}: <span className="font-bold">{results.factorsA}</span></div>
              <div>Prime Factorization of {num2}: <span className="font-bold">{results.factorsB}</span></div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// 4. Logarithm Calculator (log10, ln, log2, log_b(x))
export const LogarithmCalculator: React.FC<BaseCalcProps> = () => {
  const [valX, setValX] = useState(100);
  const [baseB, setBaseB] = useState(10);

  const results = useMemo(() => {
    if (valX <= 0 || baseB <= 0 || baseB === 1) return null;
    const logCustom = Math.log(valX) / Math.log(baseB);
    const lnX = Math.log(valX);
    const log10X = Math.log10(valX);
    const log2X = Math.log2(valX);

    return {
      logCustom: logCustom.toFixed(6),
      lnX: lnX.toFixed(6),
      log10X: log10X.toFixed(6),
      log2X: log2X.toFixed(6)
    };
  }, [valX, baseB]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-6 rounded-2xl border border-slate-200">
        <div className="space-y-3.5">
          <h4 className="text-xs font-bold uppercase text-slate-700 tracking-wider">Logarithm Arguments</h4>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Argument x (x &gt; 0)</label>
              <input
                type="number"
                step="any"
                value={valX}
                onChange={(e) => setValX(Math.max(0.000001, Number(e.target.value)))}
                className="w-full px-3 py-1.5 border rounded-lg text-xs font-bold"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Base b (b &gt; 0, b ≠ 1)</label>
              <input
                type="number"
                step="any"
                value={baseB}
                onChange={(e) => setBaseB(Math.max(0.000001, Number(e.target.value)))}
                className="w-full px-3 py-1.5 border rounded-lg text-xs font-bold"
              />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-50 to-sky-50 p-5 rounded-xl border border-blue-200 flex flex-col justify-between space-y-4">
          <div>
            <span className="text-xs font-bold text-blue-900 uppercase tracking-wider">log_{baseB}({valX})</span>
            <div className="text-3xl font-black text-blue-950 font-mono-numbers mt-1">
              {results ? results.logCustom : 'Invalid input'}
            </div>
          </div>

          {results && (
            <div className="bg-white p-3 rounded-lg border border-blue-100 text-xs text-slate-700 space-y-1">
              <div className="flex justify-between">
                <span>Natural Log ln({valX}):</span>
                <span className="font-bold">{results.lnX}</span>
              </div>
              <div className="flex justify-between">
                <span>Common Log log₁₀({valX}):</span>
                <span className="font-bold">{results.log10X}</span>
              </div>
              <div className="flex justify-between">
                <span>Binary Log log₂({valX}):</span>
                <span className="font-bold">{results.log2X}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// 5. Factorial, Permutations (nPr) & Combinations (nCr)
export const FactorialCalculator: React.FC<BaseCalcProps> = () => {
  const [n, setN] = useState(7);
  const [r, setR] = useState(3);

  const results = useMemo(() => {
    const fact = (num: number): number => (num <= 1 ? 1 : num * fact(num - 1));
    if (n < 0 || r < 0 || r > n || n > 20) return null;

    const nFact = fact(n);
    const rFact = fact(r);
    const nMinusRFact = fact(n - r);

    const nPr = nFact / nMinusRFact;
    const nCr = nFact / (rFact * nMinusRFact);

    return { nFact, nPr, nCr };
  }, [n, r]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-6 rounded-2xl border border-slate-200">
        <div className="space-y-3.5">
          <h4 className="text-xs font-bold uppercase text-slate-700 tracking-wider">Set Parameters</h4>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Total Items (n ≤ 20)</label>
              <input
                type="number"
                value={n}
                onChange={(e) => setN(Math.max(0, Math.min(20, Number(e.target.value))))}
                className="w-full px-3 py-1.5 border rounded-lg text-xs font-bold"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Subset Items (r ≤ n)</label>
              <input
                type="number"
                value={r}
                onChange={(e) => setR(Math.max(0, Math.min(n, Number(e.target.value))))}
                className="w-full px-3 py-1.5 border rounded-lg text-xs font-bold"
              />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-slate-50 to-blue-50 p-5 rounded-xl border border-slate-200 flex flex-col justify-between space-y-3">
          <div className="space-y-2">
            <div className="flex justify-between items-center bg-white p-2 rounded-lg border">
              <span className="text-xs text-slate-600">Factorial ({n}!):</span>
              <span className="font-black text-slate-900 font-mono-numbers">{results?.nFact.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center bg-white p-2 rounded-lg border">
              <span className="text-xs text-slate-600">Permutations <sub>{n}</sub>P<sub>{r}</sub> (Order matters):</span>
              <span className="font-black text-blue-700 font-mono-numbers">{results?.nPr.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center bg-white p-2 rounded-lg border">
              <span className="text-xs text-slate-600">Combinations <sub>{n}</sub>C<sub>{r}</sub> (Order does not matter):</span>
              <span className="font-black text-orange-700 font-mono-numbers">{results?.nCr.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// 6. 2x2 Matrix Determinant & Inverse Calculator
export const Matrix2x2Calculator: React.FC<BaseCalcProps> = () => {
  const [a, setA] = useState(4);
  const [b, setB] = useState(7);
  const [c, setC] = useState(2);
  const [d, setD] = useState(6);

  const results = useMemo(() => {
    const det = a * d - b * c;
    if (det === 0) {
      return { det: 0, invertible: false };
    }
    const invA = (d / det).toFixed(3);
    const invB = (-b / det).toFixed(3);
    const invC = (-c / det).toFixed(3);
    const invD = (a / det).toFixed(3);

    return {
      det,
      invertible: true,
      invA, invB, invC, invD
    };
  }, [a, b, c, d]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-6 rounded-2xl border border-slate-200">
        <div className="space-y-3.5">
          <h4 className="text-xs font-bold uppercase text-slate-700 tracking-wider">2x2 Matrix Elements [A]</h4>
          <div className="grid grid-cols-2 gap-3 p-4 bg-slate-50 rounded-xl border border-slate-300">
            <div>
              <label className="text-[10px] text-slate-500 block">Row 1, Col 1 (a)</label>
              <input
                type="number"
                value={a}
                onChange={(e) => setA(Number(e.target.value))}
                className="w-full p-2 border rounded-lg text-center font-bold bg-white"
              />
            </div>
            <div>
              <label className="text-[10px] text-slate-500 block">Row 1, Col 2 (b)</label>
              <input
                type="number"
                value={b}
                onChange={(e) => setB(Number(e.target.value))}
                className="w-full p-2 border rounded-lg text-center font-bold bg-white"
              />
            </div>
            <div>
              <label className="text-[10px] text-slate-500 block">Row 2, Col 1 (c)</label>
              <input
                type="number"
                value={c}
                onChange={(e) => setC(Number(e.target.value))}
                className="w-full p-2 border rounded-lg text-center font-bold bg-white"
              />
            </div>
            <div>
              <label className="text-[10px] text-slate-500 block">Row 2, Col 2 (d)</label>
              <input
                type="number"
                value={d}
                onChange={(e) => setD(Number(e.target.value))}
                className="w-full p-2 border rounded-lg text-center font-bold bg-white"
              />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-indigo-50 to-blue-50 p-5 rounded-xl border border-indigo-200 flex flex-col justify-between space-y-4">
          <div>
            <span className="text-xs font-bold text-indigo-900 uppercase tracking-wider">Determinant det(A) = ad - bc</span>
            <div className="text-3xl font-black text-indigo-950 font-mono-numbers mt-1">
              {results.det}
            </div>
          </div>

          <div className="bg-white p-3 rounded-lg border border-indigo-100 text-xs space-y-2">
            <span className="font-bold text-slate-700 block">Inverse Matrix A⁻¹:</span>
            {results.invertible ? (
              <div className="grid grid-cols-2 gap-2 text-center font-mono font-bold text-slate-900 bg-slate-50 p-2 rounded border">
                <div>{results.invA}</div>
                <div>{results.invB}</div>
                <div>{results.invC}</div>
                <div>{results.invD}</div>
              </div>
            ) : (
              <span className="text-red-600 font-semibold">Matrix is singular (det = 0, no inverse exists).</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export const QuadraticSolverCalculator = QuadraticSolver;
export const FactorialPermutationsCalculator = FactorialCalculator;
export const MatrixCalculator = Matrix2x2Calculator;
