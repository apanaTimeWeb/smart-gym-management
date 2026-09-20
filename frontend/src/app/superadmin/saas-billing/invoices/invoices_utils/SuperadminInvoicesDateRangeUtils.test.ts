import { describe, expect, it } from 'vitest';
import { getSuperadminInvoicesPresetRange } from '@/app/superadmin/saas-billing/invoices/SuperadminInvoicesDateRangeUtils';

describe('getSuperadminInvoicesPresetRange', () => {
  it('returns deterministic preset bounds', () => {
    expect(getSuperadminInvoicesPresetRange('this_month', new Date(2026, 8, 20))).toEqual({ from: '2026-09-01', to: '2026-09-30' });
  });
});
