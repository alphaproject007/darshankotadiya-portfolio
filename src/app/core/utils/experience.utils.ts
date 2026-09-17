import { Experience } from '../models/experience.model';

export function calculateEmploymentMonths(
  experiences: readonly Experience[],
  referenceDate = new Date()
): number {
  const months = new Set<string>();

  for (const experience of experiences) {
    if (experience.type === 'career-break') {
      continue;
    }

    const start = parseMonth(experience.period.start, referenceDate);
    const end = parseMonth(experience.period.end, referenceDate);
    if (!start || !end || start > end) {
      continue;
    }

    const cursor = new Date(start.year, start.month - 1, 1);
    const last = new Date(end.year, end.month - 1, 1);
    while (cursor <= last) {
      months.add(`${cursor.getFullYear()}-${cursor.getMonth() + 1}`);
      cursor.setMonth(cursor.getMonth() + 1);
    }
  }

  return months.size;
}

export function formatEmploymentDuration(totalMonths: number): string {
  const years = Math.floor(totalMonths / 12);
  const months = totalMonths % 12;
  return months === 0 ? `${years}+ Years` : `${years}.${months}+ Years`;
}

function parseMonth(
  value: string | null | undefined,
  referenceDate: Date
): { year: number; month: number } | null {
  if (!value || value.toLowerCase() === 'present') {
    return { year: referenceDate.getFullYear(), month: referenceDate.getMonth() + 1 };
  }

  const match = /^(\d{4})-(\d{2})$/.exec(value);
  if (!match) {
    return null;
  }

  return { year: Number(match[1]), month: Number(match[2]) };
}
