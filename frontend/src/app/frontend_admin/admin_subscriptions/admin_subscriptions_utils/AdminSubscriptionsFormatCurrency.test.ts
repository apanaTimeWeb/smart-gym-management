import { describe, expect, it } from 'vitest';
import { AdminSubscriptionsFormatCurrency } from '@/app/frontend_admin/admin_subscriptions/admin_subscriptions_utils/AdminSubscriptionsFormatCurrency';

describe('AdminSubscriptionsFormatCurrency', () => {
  it('formats minor-unit INR amounts using the supplied locale', () => {
    expect(AdminSubscriptionsFormatCurrency(123456, 'INR', 'en-IN')).toBe('₹1,234.56');
  });
  it('returns the documented placeholder for non-finite amounts', () => {
    expect(AdminSubscriptionsFormatCurrency(Number.NaN, 'INR', 'en-IN')).toBe('—');
  });
});
