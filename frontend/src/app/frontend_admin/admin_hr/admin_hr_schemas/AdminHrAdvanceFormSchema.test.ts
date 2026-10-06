import { describe, expect, it } from 'vitest';
import { adminHrAdvanceFormSchema } from '@/app/frontend_admin/admin_hr/admin_hr_schemas/AdminHrAdvanceFormSchema';

describe('AdminHrAdvanceFormSchema', () => {
  it('accepts a valid salary advance payload', () => {
    const result = adminHrAdvanceFormSchema.safeParse({ staffId: 'staff-1', amount: 5000, notes: 'Travel advance', paymentMode: 'UPI' });
    expect(result.success).toBe(true);
  });

  it('rejects missing staff and non-positive amounts', () => {
    const result = adminHrAdvanceFormSchema.safeParse({ staffId: '', amount: 0, notes: '', paymentMode: 'Cash' });
    expect(result.success).toBe(false);
  });
});
