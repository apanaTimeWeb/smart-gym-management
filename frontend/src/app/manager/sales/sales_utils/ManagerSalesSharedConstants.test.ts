import { describe, expect, it } from 'vitest';
import { DATE_FILTERS, SALES_TABS } from '@/app/manager/sales/sales_utils/ManagerSalesSharedConstants';


describe('ManagerSalesSharedConstants', () => {
  it('keeps sales filters and tabs stable', () => {
    expect(DATE_FILTERS).toEqual(['Today', 'This Week', 'This Month', 'This Year', 'Custom']);
    expect(SALES_TABS).toContain('Pending Payments');
  });
});
