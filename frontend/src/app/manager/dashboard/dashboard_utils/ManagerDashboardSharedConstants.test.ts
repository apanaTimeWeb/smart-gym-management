import { describe, expect, it } from 'vitest';
import { DASHBOARD_PLAN_BG_COLORS, DASHBOARD_RECENT_MEMBERS_PAGE_SIZE, DASHBOARD_STATUS_STYLES, RECENT_MEMBERS_HEADERS } from '@/app/manager/dashboard/dashboard_utils/ManagerDashboardSharedConstants';

describe('ManagerDashboardSharedConstants', () => {
  it('provides semantic dashboard status styles', () => {
    expect(DASHBOARD_STATUS_STYLES.ACTIVE?.text).toBe('text-success');
    expect(DASHBOARD_STATUS_STYLES.EXPIRED?.text).toBe('text-danger');
  });

  it('keeps the recent-members table contract stable', () => {
    expect(DASHBOARD_RECENT_MEMBERS_PAGE_SIZE).toBe(5);
    expect(RECENT_MEMBERS_HEADERS).toEqual(['Member', 'Plan', 'Status', 'Joined', 'Amount']);
    expect(Object.keys(DASHBOARD_PLAN_BG_COLORS)).toEqual(expect.arrayContaining(['BASIC', 'GOLD', 'PREMIUM']));
  });
});
