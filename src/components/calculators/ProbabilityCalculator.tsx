import React, { useState, useMemo } from 'react';
import { copyToClipboard, formatNumber } from '../../utils/formatters';
import { Dices, Copy, Check, Bookmark, Sparkles } from 'lucide-react';

interface ProbabilityCalculatorProps {
  onSaveCalculation?: (summary: string, inputs: any, results: any) => void;
}

export const ProbabilityCalculator: React.FC<ProbabilityCalculatorProps> = ({ onSaveCalculation }) => {
  const [tab, setTab] = useState<'single' | 'two-events' | 'combinatorics'>('single');

  // Single event
  const [favorableOutcomes, setFavorableOutcomes] = useState<number | ''>(3);
  const [totalOutcomes, setTotalOutcomes] = useState<number | ''>(6);

  // Two Events
  const [probA, setProbA] = useState<number | ''>(0.5);
  const [probB, setProbB] = useState<number | ''>(0.25);
  const [areIndependent, setAreIndependent] = useState<boolean>(true);

  // Combinatorics
  const [nVal, setNVal] = useState<number | ''>(10);
  const [rVal, setRVal] = useState<number | ''>(3);

  const [copied, setCopied] = useState<boolean>(false);
  const [saved, setSaved] = useState<boolean>(false);

  const numFavorableOutcomes = typeof favorableOutcomes === 'number' ? favorableOutcomes : 0;
  const numTotalOutcomes = typeof totalOutcomes === 'number' ? totalOutcomes : 0;
  const numProbA = typeof probA === 'number' ? probA : 0;
  const numProbB = typeof probB === 'number' ? probB : 0;
  const numNVal = typeof nVal === 'number' ? nVal : 0;
  const numRVal = typeof rVal === 'number' ? rVal : 0;

  // Factorial helper
  const factorial = (n: number): number => {
    if (n < 0) return NaN;
    if (n === 0 || n === 1) return 1;
    let res = 1;
    for (let i = 2; i <= n; i++) {
      res *= i;
    }
    return res;
  };

  // Permutations nPr
  const nPr = (n: number, r: number): number => {
    if (n < 0 || r < 0 || r > n) return 0;
    let res = 1;
    for (let i = n; i > n - r; i--) {
      res *= i;
    }
    return res;
  };

  // Combinations nCr
  const nCr = (n: number, r: number): number => {
    if (n < 0 || r < 0 || r > n) return 0;
    if (r === 0 || r === n) return 1;
    if (r > n / 2) r = n - r;
    let res = 1;
    for (let i = 1; i <= r; i++) {
      res = (res * (n - i + 1)) / i;
    }
    return Math.round(res);
  };

  // Single event results
  const singleResults = useMemo(() => {
    if (favorableOutcomes === '' || totalOutcomes === '') return null;
    const fav = Math.max(0, numFavorableOutcomes);
    const tot = Math.max(1, numTotalOutcomes);

    if (fav > tot) return null;

    const prob = fav / tot;
    const percentage = `${(prob * 100).toFixed(2)}%`;
    const oddsInFavor = `${fav} : ${tot - fav}`;
    const oddsAgainst = `${tot - fav} : ${fav}`;
    const complementaryProb = 1 - prob;

    return {
      favorableOutcomes: fav,
      totalOutcomes: tot,
      prob,
      percentage,
      oddsInFavor,
      oddsAgainst,
      complementaryProb: (complementaryProb * 100).toFixed(2) + '%'
    };
  }, [favorableOutcomes, totalOutcomes, numFavorableOutcomes, numTotalOutcomes]);

  // Two events results
  const twoEventsResults = useMemo(() => {
    if (probA === '' || probB === '') return null;
    const pa = Math.min(1, Math.max(0, numProbA));
    const pb = Math.min(1, Math.max(0, numProbB));

    let pAnd = 0;
    let pOr = 0;

    if (areIndependent) {
      pAnd = pa * pb;
      pOr = pa + pb - pAnd;
    } else {
      // Assuming mutually exclusive
      pAnd = 0;
      pOr = Math.min(1, pa + pb);
    }

    const pNotA = 1 - pa;
    const pNotB = 1 - pb;

    return {
      pa,
      pb,
      pAnd: (pAnd * 100).toFixed(2) + '%',
      pOr: (pOr * 100).toFixed(2) + '%',
      pNotA: (pNotA * 100).toFixed(2) + '%',
      pNotB: (pNotB * 100).toFixed(2) + '%'
    };
  }, [probA, probB, numProbA, numProbB, areIndependent]);

  // Combinatorics results
  const combinatoricsResults = useMemo(() => {
    if (nVal === '' || rVal === '') return null;
    const n = Math.max(0, Math.round(numNVal));
    const r = Math.max(0, Math.round(numRVal));

    if (r > n) return null;

    const perm = nPr(n, r);
    const comb = nCr(n, r);

    return {
      n,
      r,
      permutations: formatNumber(perm, 0),
      combinations: formatNumber(comb, 0)
    };
  }, [nVal, rVal, numNVal, numRVal]);

  const handleReset = () => {
    setTab('single');
    setFavorableOutcomes(3);
    setTotalOutcomes(6);
    setProbA(0.5);
    setProbB(0.25);
    setAreIndependent(true);
    setNVal(10);
    setRVal(3);
  };

  const handleCopy = async () => {
    let text = '';
    if (tab === 'single' && singleResults) {
      text = `Probability of Event: ${singleResults.percentage} (Fraction: ${singleResults.favorableOutcomes}/${singleResults.totalOutcomes}, Odds: ${singleResults.oddsInFavor})`;
    } else if (tab === 'two-events' && twoEventsResults) {
      text = `P(A and B): ${twoEventsResults.pAnd} | P(A or B): ${twoEventsResults.pOr} (P(A)=${twoEventsResults.pa}, P(B)=${twoEventsResults.pb})`;
    } else if (tab === 'combinatorics' && combinatoricsResults) {
      text = `Permutations nPr(${combinatoricsResults.n}, ${combinatoricsResults.r}) = ${combinatoricsResults.permutations} | Combinations nCr = ${combinatoricsResults.combinations}`;
    }

    const ok = await copyToClipboard(text);
    if (ok) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleSave = () => {
    if (!onSaveCalculation) return;
    if (tab === 'single' && singleResults) {
      onSaveCalculation(
        `Probability P(E) = ${singleResults.percentage} (${singleResults.favorableOutcomes}/${singleResults.totalOutcomes})`,
        { favorableOutcomes, totalOutcomes },
        singleResults
      );
    } else if (tab === 'combinatorics' && combinatoricsResults) {
      onSaveCalculation(
        `nCr(${combinatoricsResults.n}, ${combinatoricsResults.r}) = ${combinatoricsResults.combinations}`,
        { nVal, rVal },
        combinatoricsResults
      );
    }
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Navigation Tabs */}
      <div className="flex items-center justify-between gap-3">
        <div className="flex gap-2 p-1.5 bg-slate-200/60 rounded-2xl max-w-md flex-1">
          <button
            onClick={() => setTab('single')}
            className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all ${
              tab === 'single' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Single Event
          </button>
          <button
            onClick={() => setTab('two-events')}
            className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all ${
              tab === 'two-events' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Two Events (A & B)
          </button>
          <button
            onClick={() => setTab('combinatorics')}
            className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all ${
              tab === 'combinatorics' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            nPr & nCr
          </button>
        </div>
        <button
          type="button"
          onClick={handleReset}
          className="text-xs font-semibold text-slate-600 hover:text-slate-900 px-3 py-2 rounded-xl border border-slate-200 hover:bg-slate-50 transition-colors"
        >
          Reset
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Inputs */}
        <div className="lg:col-span-6 bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-2xs space-y-4">
          {tab === 'single' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <Dices className="w-4 h-4 text-purple-600" />
                  <span>Single Event Probability P(E)</span>
                </h2>
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Number of Favorable Outcomes</label>
                <input
                  type="number"
                  min="0"
                  value={favorableOutcomes}
                  onChange={(e) => setFavorableOutcomes(e.target.value === '' ? '' : Math.max(0, parseInt(e.target.value)))}
                  className="w-full p-2.5 text-base font-mono font-semibold border border-slate-200 rounded-xl bg-slate-50/50 focus:bg-white focus:outline-none"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Total Possible Outcomes</label>
                <input
                  type="number"
                  min="1"
                  value={totalOutcomes}
                  onChange={(e) => setTotalOutcomes(e.target.value === '' ? '' : Math.max(1, parseInt(e.target.value)))}
                  className="w-full p-2.5 text-base font-mono font-semibold border border-slate-200 rounded-xl bg-slate-50/50 focus:bg-white focus:outline-none"
                />
              </div>
              <div className="flex flex-wrap gap-2 pt-1">
                {[
                  { label: 'Coin Flip (Heads)', fav: 1, tot: 2 },
                  { label: 'Single Die (Roll 6)', fav: 1, tot: 6 },
                  { label: 'Die (Even Number)', fav: 3, tot: 6 },
                  { label: 'Card Deck (Draw Ace)', fav: 4, tot: 52 },
                  { label: 'Card (Draw Heart)', fav: 13, tot: 52 }
                ].map(preset => (
                  <button
                    key={preset.label}
                    type="button"
                    onClick={() => {
                      setFavorableOutcomes(preset.fav);
                      setTotalOutcomes(preset.tot);
                    }}
                    className="py-1 px-2 text-xs font-bold bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors"
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {tab === 'two-events' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-purple-600" />
                  <span>Two Event Relationship (P(A) & P(B))</span>
                </h2>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Probability of A (0 to 1)</label>
                  <input
                    type="number"
                    step="0.05"
                    min="0"
                    max="1"
                    value={probA}
                    onChange={(e) => setProbA(e.target.value === '' ? '' : Math.max(0, Math.min(1, parseFloat(e.target.value))))}
                    className="w-full p-2.5 text-base font-mono font-semibold border border-slate-200 rounded-xl bg-slate-50/50 focus:bg-white focus:outline-none"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Probability of B (0 to 1)</label>
                  <input
                    type="number"
                    step="0.05"
                    min="0"
                    max="1"
                    value={probB}
                    onChange={(e) => setProbB(e.target.value === '' ? '' : Math.max(0, Math.min(1, parseFloat(e.target.value))))}
                    className="w-full p-2.5 text-base font-mono font-semibold border border-slate-200 rounded-xl bg-slate-50/50 focus:bg-white focus:outline-none"
                  />
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Event Relationship</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setAreIndependent(true)}
                    className={`py-2 text-xs font-bold rounded-xl border transition-all ${
                      areIndependent
                        ? 'bg-purple-600 text-white border-purple-600 shadow-2xs'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    Independent Events
                  </button>
                  <button
                    type="button"
                    onClick={() => setAreIndependent(false)}
                    className={`py-2 text-xs font-bold rounded-xl border transition-all ${
                      !areIndependent
                        ? 'bg-purple-600 text-white border-purple-600 shadow-2xs'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    Mutually Exclusive
                  </button>
                </div>
              </div>
            </div>
          )}

          {tab === 'combinatorics' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <Dices className="w-4 h-4 text-purple-600" />
                  <span>Permutations & Combinations (n & r)</span>
                </h2>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Total Items (n)</label>
                  <input
                    type="number"
                    min="1"
                    max="100"
                    value={nVal}
                    onChange={(e) => setNVal(e.target.value === '' ? '' : Math.max(1, parseInt(e.target.value)))}
                    className="w-full p-2.5 text-base font-mono font-semibold border border-slate-200 rounded-xl bg-slate-50/50 focus:bg-white focus:outline-none"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Items Chosen (r)</label>
                  <input
                    type="number"
                    min="0"
                    max={typeof nVal === 'number' ? nVal : 100}
                    value={rVal}
                    onChange={(e) => setRVal(e.target.value === '' ? '' : Math.max(0, parseInt(e.target.value)))}
                    className="w-full p-2.5 text-base font-mono font-semibold border border-slate-200 rounded-xl bg-slate-50/50 focus:bg-white focus:outline-none"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Output */}
        <div className="lg:col-span-6 space-y-4">
          <div className="bg-gradient-to-br from-slate-900 via-purple-950 to-slate-900 text-white rounded-2xl p-6 shadow-md relative">
            {tab === 'single' && singleResults && (
              <div className="space-y-4">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-purple-300">
                    Probability of Occurrence
                  </span>
                  <div className="text-4xl font-black tracking-tight text-white mt-1 font-mono">
                    {singleResults.percentage}
                  </div>
                  <div className="text-xs text-purple-200 mt-1 font-mono">
                    Decimal: {singleResults.prob.toFixed(4)} ({singleResults.favorableOutcomes} out of {singleResults.totalOutcomes})
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2.5 pt-3 border-t border-purple-900/60 text-xs">
                  <div className="bg-white/10 rounded-xl p-2.5">
                    <span className="text-[10px] text-slate-300 block">Odds in Favor</span>
                    <span className="font-bold font-mono text-white text-sm">{singleResults.oddsInFavor}</span>
                  </div>
                  <div className="bg-white/10 rounded-xl p-2.5">
                    <span className="text-[10px] text-slate-300 block">Odds Against</span>
                    <span className="font-bold font-mono text-white text-sm">{singleResults.oddsAgainst}</span>
                  </div>
                  <div className="bg-white/10 rounded-xl p-2.5 col-span-2">
                    <span className="text-[10px] text-slate-300 block">Complementary Probability P(not E)</span>
                    <span className="font-bold font-mono text-orange-300 text-sm">{singleResults.complementaryProb}</span>
                  </div>
                </div>
              </div>
            )}

            {tab === 'two-events' && twoEventsResults && (
              <div className="space-y-4">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-purple-300">
                    Joint Probability P(A and B)
                  </span>
                  <div className="text-4xl font-black tracking-tight text-white mt-1 font-mono">
                    {twoEventsResults.pAnd}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2.5 pt-3 border-t border-purple-900/60 text-xs">
                  <div className="bg-white/10 rounded-xl p-2.5">
                    <span className="text-[10px] text-slate-300 block">Union P(A or B)</span>
                    <span className="font-bold font-mono text-orange-300 text-sm">{twoEventsResults.pOr}</span>
                  </div>
                  <div className="bg-white/10 rounded-xl p-2.5">
                    <span className="text-[10px] text-slate-300 block">P(Not A)</span>
                    <span className="font-bold font-mono text-white text-sm">{twoEventsResults.pNotA}</span>
                  </div>
                </div>
              </div>
            )}

            {tab === 'combinatorics' && combinatoricsResults && (
              <div className="space-y-4">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-purple-300">
                    Combinations nCr (Order Does NOT Matter)
                  </span>
                  <div className="text-4xl font-black tracking-tight text-white mt-1 font-mono">
                    {combinatoricsResults.combinations}
                  </div>
                </div>

                <div className="bg-white/10 rounded-xl p-3 backdrop-blur-xs text-xs mt-3">
                  <span className="text-[10px] text-slate-300 uppercase font-bold block">Permutations nPr (Order Matters)</span>
                  <span className="text-xl font-bold text-orange-300 font-mono">{combinatoricsResults.permutations}</span>
                </div>
              </div>
            )}

            <div className="flex items-center gap-2 pt-4 border-t border-purple-900/60">
              <button
                onClick={handleCopy}
                className="flex-1 py-2 px-3 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-bold text-white flex items-center justify-center gap-1.5 transition-colors border border-white/10"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-orange-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied' : 'Copy Probability'}</span>
              </button>
              {onSaveCalculation && (
                <button
                  onClick={handleSave}
                  className="py-2 px-3 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-bold text-white flex items-center justify-center gap-1.5 transition-colors border border-white/10"
                >
                  <Bookmark className="w-3.5 h-3.5" />
                  <span>{saved ? 'Saved' : 'Save'}</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
