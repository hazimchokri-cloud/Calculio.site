/**
 * Utilities for locale-safe decimal/numeric input across desktop and mobile browsers.
 * Supports period (".") and comma (",") decimal separators, partial typing ("6.", ".5", "-"),
 * empty values, zero, and prevents HTML5 type="number" stepMismatch / locale rejection issues.
 */

export function normalizeDecimalString(
  raw: string,
  options: { allowNegative?: boolean; allowDecimal?: boolean } = {}
): string {
  const { allowNegative = false, allowDecimal = true } = options;
  if (!raw) return '';

  // Convert commas and fullwidth dots to standard ASCII period
  let cleaned = raw.replace(/,/g, '.').replace(/。/g, '.');

  let result = '';
  let hasDecimal = false;

  for (let i = 0; i < cleaned.length; i++) {
    const ch = cleaned[i];
    if (ch >= '0' && ch <= '9') {
      result += ch;
    } else if (allowDecimal && ch === '.' && !hasDecimal) {
      hasDecimal = true;
      result += '.';
    } else if (allowNegative && ch === '-' && result.length === 0) {
      result += '-';
    }
  }

  return result;
}

/**
 * Parses a number or locale-normalized string into a finite number, or null if empty / incomplete.
 */
export function parseLocaleNumber(value: string | number | null | undefined): number | null {
  if (value === null || value === undefined) return null;
  if (typeof value === 'number') {
    return Number.isFinite(value) ? value : null;
  }
  const normalized = value.trim().replace(/,/g, '.');
  if (normalized === '' || normalized === '-' || normalized === '.' || normalized === '-.') {
    return null;
  }
  const parsed = Number(normalized);
  return Number.isFinite(parsed) ? parsed : null;
}

/**
 * Formats a numeric value cleanly for display inside an input without forcing trailing zeros.
 */
export function toInputString(value: number | '' | string): string {
  if (value === '' || value === null || value === undefined) return '';
  return String(value);
}

/**
 * Parses a comma- and/or whitespace-separated list of numbers cleanly.
 * Avoids treating a single decimal comma (like "6,5") inside space-delimited inputs ambiguously
 * while supporting standard "10, 20, 30.5" lists.
 */
export function parseNumberList(raw: string): number[] {
  if (!raw || !raw.trim()) return [];
  // Split on commas (with optional space), semicolons, newlines, or whitespace
  const tokens = raw
    .split(/[\s,;]+/)
    .map((s) => s.trim())
    .filter(Boolean);

  const nums: number[] = [];
  for (const token of tokens) {
    const n = Number(token);
    if (Number.isFinite(n)) {
      nums.push(n);
    }
  }
  return nums;
}
