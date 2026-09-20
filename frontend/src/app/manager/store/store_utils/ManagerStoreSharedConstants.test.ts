import { describe, expect, it } from 'vitest';
import { CATEGORIES, ERR_EMPTY_ORDER, PAYMENT_METHODS } from '@/app/manager/store/store_utils/ManagerStoreSharedConstants';


describe('ManagerStoreSharedConstants', () => {
  it('keeps store filters and payment modes stable', () => {
    expect(CATEGORIES).toContain('Merchandise');
    expect(PAYMENT_METHODS).toEqual(['UPI', 'Cash']);
    expect(ERR_EMPTY_ORDER).toContain('Add items');
  });
});
