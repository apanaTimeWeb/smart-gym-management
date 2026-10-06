import { describe, expect, it } from 'vitest';
import { adminHrPaymentFormSchema } from '@/app/frontend_admin/admin_hr/admin_hr_schemas/AdminHrPaymentFormSchema';

describe('adminHrPaymentFormSchema', () => {
  it('accepts a positive integer amount', () => expect(adminHrPaymentFormSchema.parse({ amount: 1000 }).amount).toBe(1000));
  it('rejects non-positive amounts', () => { expect(() => adminHrPaymentFormSchema.parse({ amount: 0 })).toThrow(); expect(() => adminHrPaymentFormSchema.parse({ amount: -1 })).toThrow(); });
});
