import { describe, expect, it } from 'vitest';
import { adminHrPaymentFormSchema } from '@/app/frontend_admin/admin_hr/admin_hr_schemas/AdminHrPaymentFormSchema';

describe('AdminHr payment form contract', () => {
  it('rejects zero or negative payment amounts', () => {
    expect(adminHrPaymentFormSchema.safeParse({ amount: 0 }).success).toBe(false);
    expect(adminHrPaymentFormSchema.safeParse({ amount: -1 }).success).toBe(false);
  });
});
