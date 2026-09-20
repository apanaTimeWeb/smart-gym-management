import { describe, expect, it } from 'vitest';
import { resolveTrainerDashboardDateRange } from '@/app/trainer/dashboard/dashboard_utils/TrainerDashboardDateRangeUtils';

describe('resolveTrainerDashboardDateRange', () => {
  it('returns a deterministic current-month range', () => {
    const result = resolveTrainerDashboardDateRange('this_month', new Date('2026-09-19T12:00:00Z'));
    expect(result.startDate).toBe('2026-09-01');
    expect(result.endDate).toBe('2026-09-19');
  });

  it('returns the previous month range for last_month', () => {
    const result = resolveTrainerDashboardDateRange('last_month', new Date('2026-09-19T12:00:00Z'));
    expect(result.startDate).toBe('2026-08-01');
    expect(result.endDate).toBe('2026-08-31');
  });
});
