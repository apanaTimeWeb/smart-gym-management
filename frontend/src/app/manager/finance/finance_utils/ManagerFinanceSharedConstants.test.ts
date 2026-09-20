import { describe, expect, it } from 'vitest';
import { FINANCE_METHOD_STYLES, FINANCE_PAYMENT_METHODS, FINANCE_STATUS_STYLES, FINANCE_TABS, PAYMENTS_TABLE_HEADERS } from '@/app/manager/finance/finance_utils/ManagerFinanceSharedConstants';


describe('ManagerFinanceSharedConstants', () => {
  it('keeps payment modes and status styles complete', () => {
    expect(FINANCE_PAYMENT_METHODS).toEqual(['UPI', 'Cash', 'Card', 'NetBanking']);
    expect(FINANCE_METHOD_STYLES.UPI?.text).toBe('text-primary');
    expect(FINANCE_STATUS_STYLES.PAID?.text).toBe('text-success');
  });

  it('keeps finance tabs and table columns stable', () => {
    expect(FINANCE_TABS).toEqual(['Payments', 'Summary']);
    expect(PAYMENTS_TABLE_HEADERS).toHaveLength(8);
  });
});
