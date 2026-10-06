import { describe, expect, it } from 'vitest';

import { getSuperadminInvoicesPresetRange } from '@/app/frontend_superadmin/superadmin_invoices/superadmin_invoices_utils/SuperadminInvoicesDateRangeUtils';



describe('getSuperadminInvoicesPresetRange', () => {
  it('returns deterministic preset bounds', () => {
    expect(getSuperadminInvoicesPresetRange('this_month', new Date(2026, 8, 20))).toEqual({ from: '2026-09-01', to: '2026-09-30' });
  });
});
