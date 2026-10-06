import { describe, expect, it } from 'vitest';
import { adminHrDueFormSchema } from '@/app/frontend_admin/admin_hr/admin_hr_schemas/AdminHrDueFormSchema';

describe('AdminHrDueFormSchema', () => {
  it('accepts a valid due-payment payload', () => {
    const result = adminHrDueFormSchema.safeParse({ staffId: 'staff-1', amount: 3500, notes: 'Monthly due', paymentMode: 'Bank Transfer' });
    expect(result.success).toBe(true);
  });

  it('rejects zero amount and unsupported payment modes', () => {
    const result = adminHrDueFormSchema.safeParse({ staffId: 'staff-1', amount: 0, notes: '', paymentMode: 'Wallet' });
    expect(result.success).toBe(false);
  });
});
