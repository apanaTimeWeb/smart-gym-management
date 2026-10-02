import { act, renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { useSuperadminInvoicesManualPaymentForm } from '@/app/frontend_superadmin/superadmin_invoices/superadmin_invoices_hooks/useSuperadminInvoicesManualPaymentForm';



describe('useSuperadminInvoicesManualPaymentForm', () => {
  it('registers the validated amount field and exposes submitting/error state', () => {
    const onSave = vi.fn().mockResolvedValue(true);
    const { result } = renderHook(() => useSuperadminInvoicesManualPaymentForm(onSave));
    expect(result.current.register('amount').name).toBe('amount');
    expect(result.current.errors).toEqual({});
    expect(result.current.isSubmitting).toBe(false);
  });
});
