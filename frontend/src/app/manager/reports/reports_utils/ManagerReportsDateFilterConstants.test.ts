import { describe, expect, it } from 'vitest';
import { MANAGER_REPORTS_DATE_RANGE_OPTIONS } from '@/app/manager/reports/reports_utils/ManagerReportsDateFilterConstants.ts';


describe('ManagerReportsDateFilterConstants', () => {
  it('exports deterministic feature configuration', () => {
  expect(MANAGER_REPORTS_DATE_RANGE_OPTIONS).toBeDefined();
  });
});
