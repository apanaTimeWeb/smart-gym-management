import { describe, expect, it } from 'vitest';
import { MANAGER_DASHBOARD_DATE_RANGE_OPTIONS } from '@/app/frontend_manager/manager_dashboard/manager_dashboard_constants/ManagerDashboardDateFilterConstants';


describe('ManagerDashboardDateFilterConstants', () => {
  it('exports deterministic feature configuration', () => {
  expect(MANAGER_DASHBOARD_DATE_RANGE_OPTIONS).toBeDefined();
  });
});
