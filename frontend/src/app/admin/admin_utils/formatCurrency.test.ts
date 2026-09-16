import { describe, expect, it } from 'vitest';
import { formatCurrency } from '@/app/admin/admin_utils/formatCurrency';

describe('formatCurrency', () => {
  it('formats INR values consistently', () => {
    expect(formatCurrency(1000)).toMatch(/₹/);
    expect(formatCurrency(1000)).toMatch(/1,000/);
  });
});
