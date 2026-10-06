import { describe, expect, it } from 'vitest';

import { SuperadminInvoicesManualPaymentFormSchema } from '@/app/frontend_superadmin/superadmin_invoices/superadmin_invoices_schemas/SuperadminInvoicesManualPaymentFormSchema';



describe('SuperadminInvoicesManualPaymentFormSchema', () => {
  it('accepts positive numeric strings from form inputs and coerces them to numbers', () => {
    expect(SuperadminInvoicesManualPaymentFormSchema.parse({ amount: '1250' })).toEqual({ amount: 1250 });
  });

  it.each([
    { amount: 0 },
    { amount: -1 },
    { amount: 'not-a-number' },
  ])('rejects an invalid manual payment amount: $amount', (value) => {
    expect(SuperadminInvoicesManualPaymentFormSchema.safeParse(value).success).toBe(false);
  });
});
