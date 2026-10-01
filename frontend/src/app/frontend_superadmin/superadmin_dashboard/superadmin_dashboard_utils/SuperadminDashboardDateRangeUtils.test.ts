import { describe, expect, it } from 'vitest';

import { getSuperadminDashboardPresetRange } from '@/app/frontend_superadmin/superadmin_dashboard/superadmin_dashboard_utils/SuperadminDashboardDateRangeUtils';

describe('getSuperadminDashboardPresetRange', () => {
  it('returns month bounds', () => {
    expect(getSuperadminDashboardPresetRange('this_month', new Date(2026, 8, 20))).toEqual({ from: '2026-09-01', to: '2026-09-30' });
  });
});
