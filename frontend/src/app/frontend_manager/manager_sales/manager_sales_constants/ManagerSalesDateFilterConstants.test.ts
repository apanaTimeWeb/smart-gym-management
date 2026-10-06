import { describe, expect, it } from 'vitest';
import { MANAGER_SALES_DATE_RANGE_OPTIONS } from '@/app/frontend_manager/manager_sales/manager_sales_constants/ManagerSalesDateFilterConstants';


describe('ManagerSalesDateFilterConstants', () => {
  it('exports deterministic feature configuration', () => {
  expect(MANAGER_SALES_DATE_RANGE_OPTIONS).toBeDefined();
  });
});
