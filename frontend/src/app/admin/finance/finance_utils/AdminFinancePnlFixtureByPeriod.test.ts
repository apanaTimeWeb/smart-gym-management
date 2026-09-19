import { describe, expect, it } from 'vitest';
import { getAdminFinancePnlFixtureByPeriod } from '@/app/admin/finance/finance_utils/AdminFinancePnlFixtureByPeriod';

describe('getAdminFinancePnlFixtureByPeriod', () => {
  it('returns period-specific fixture values', () => {
    const thisMonth = getAdminFinancePnlFixtureByPeriod('THIS_MONTH');
    const lastMonth = getAdminFinancePnlFixtureByPeriod('LAST_MONTH');
    expect(thisMonth[0]?.revenue).not.toBe(lastMonth[0]?.revenue);
  });
});
