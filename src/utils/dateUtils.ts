/**
 * Local calendar date utilities (avoids UTC midnight vs local timezone off-by-one day bugs
 * caused by `new Date("YYYY-MM-DD")`).
 */

export function parseLocalDate(dateStr: string): Date | null {
  if (!dateStr || typeof dateStr !== 'string') return null;
  const match = dateStr.trim().match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (!match) return null;

  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);

  if (!Number.isInteger(year) || !Number.isInteger(month) || !Number.isInteger(day)) {
    return null;
  }
  if (month < 1 || month > 12 || day < 1 || day > 31) {
    return null;
  }

  const d = new Date(year, month - 1, day);
  // Set full year explicitly to support years 0-99 accurately if needed
  d.setFullYear(year);

  // Reject silent calendar rollovers like Feb 31 -> Mar 3
  if (d.getFullYear() !== year || d.getMonth() !== month - 1 || d.getDate() !== day) {
    return null;
  }
  return d;
}

export function formatLocalIsoDate(date: Date): string {
  const y = String(date.getFullYear()).padStart(4, '0');
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

export function addLocalDays(date: Date, days: number): Date {
  const next = new Date(date.getFullYear(), date.getMonth(), date.getDate() + Math.trunc(days));
  return next;
}

export function diffLocalCalendarDays(start: Date, end: Date): number {
  const utcStart = Date.UTC(start.getFullYear(), start.getMonth(), start.getDate());
  const utcEnd = Date.UTC(end.getFullYear(), end.getMonth(), end.getDate());
  return Math.round((utcEnd - utcStart) / 86400000);
}

/**
 * Counts Mon-Fri business days between start (inclusive) and end (exclusive of end date,
 * matching chronological elapsed business days or inclusive count when toggled) in O(1) time.
 */
export function countWeekdaysBetween(start: Date, end: Date, inclusive = false): number {
  const sUtc = Date.UTC(start.getFullYear(), start.getMonth(), start.getDate());
  const eUtc = Date.UTC(end.getFullYear(), end.getMonth(), end.getDate());
  const minUtc = Math.min(sUtc, eUtc);
  const maxUtc = Math.max(sUtc, eUtc);

  let totalDays = Math.round((maxUtc - minUtc) / 86400000);
  if (inclusive) totalDays += 1;
  if (totalDays <= 0) return 0;

  const fullWeeks = Math.floor(totalDays / 7);
  let weekdays = fullWeeks * 5;
  const remainder = totalDays % 7;

  const startDayOfWeek = new Date(minUtc).getUTCDay(); // 0=Sun..6=Sat
  for (let i = 0; i < remainder; i++) {
    const dow = (startDayOfWeek + i) % 7;
    if (dow !== 0 && dow !== 6) {
      weekdays += 1;
    }
  }
  return weekdays;
}

export function getDaysInMonth(year: number, month1Based: number): number {
  return new Date(year, month1Based, 0).getDate();
}
