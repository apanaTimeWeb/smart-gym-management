import { describe, expect, it } from 'vitest';
import { MANAGER_REPORTS_DATE_RANGE_OPTIONS } from '@/app/frontend_manager/manager_reports/manager_reports_constants/ManagerReportsDateFilterConstants';


describe('ManagerReportsDateFilterConstants', () => {
  it('exports deterministic feature configuration', () => {
  expect(MANAGER_REPORTS_DATE_RANGE_OPTIONS).toBeDefined();
  });
});
