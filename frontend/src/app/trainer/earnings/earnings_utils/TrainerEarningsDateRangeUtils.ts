// RESPONSIBILITY: Resolves Earnings date-range presets into server-query date windows. Kept inside Earnings to preserve business/config isolation.
import type { TrainerEarningsDateRange } from '@/app/trainer/earnings/earnings_utils/TrainerEarningsDateRangeConstants';

const toDateValue = (date: Date) => `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;

export function resolveTrainerEarningsDateRange(range: TrainerEarningsDateRange, referenceDate = new Date()) {
  const year = referenceDate.getFullYear();
  const month = referenceDate.getMonth();
  const end = toDateValue(referenceDate);
  if (range === 'custom') return { startDate: '', endDate: '' };
  if (range === 'this_year') return { startDate: `${year}-01-01`, endDate: end };
  if (range === 'last_month') {
    const start = new Date(year, month - 1, 1);
    const last = new Date(year, month, 0);
    return { startDate: toDateValue(start), endDate: toDateValue(last) };
  }
  const monthsBack = range === 'last_6_months' ? 5 : range === 'last_3_months' ? 2 : 0;
  const start = new Date(year, month - monthsBack, 1);
  return { startDate: toDateValue(start), endDate: end };
}
