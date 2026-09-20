import { describe, expect, it } from 'vitest';
import { MANAGER_FINANCE_DATE_RANGE_OPTIONS } from '@/app/manager/finance/finance_utils/ManagerFinanceDateFilterConstants.ts';


describe('ManagerFinanceDateFilterConstants', () => {
  it('exports deterministic feature configuration', () => {
  expect(MANAGER_FINANCE_DATE_RANGE_OPTIONS).toBeDefined();
  });
});
