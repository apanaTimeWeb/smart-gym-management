import { act, renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { useSuperadminInvoicesMain } from '@/app/frontend_superadmin/superadmin_invoices/superadmin_invoices_hooks/useSuperadminInvoicesMain';



const setShowAddModal = vi.fn();
const handleLogManualPayment = vi.fn().mockResolvedValue(true);
vi.mock('@/app/frontend_superadmin/superadmin_invoices/superadmin_invoices_hooks/useSuperadminInvoicesPage', () => ({ useSuperadminInvoicesPage: () => ({ selectedGym: { id: 'GYM-1', plan: 'PRO' }, setShowAddModal, handleLogManualPayment }) }));

describe('useSuperadminInvoicesMain', () => {
  it('closes the payment modal only after the recording flow completes', async () => {
    const { result } = renderHook(() => useSuperadminInvoicesMain());
    await act(async () => { await result.current.handleSavePayment(5000); });
    expect(handleLogManualPayment).toHaveBeenCalledWith('GYM-1', 5000, 'PRO');
    expect(setShowAddModal).toHaveBeenCalledWith(false);
  });
});
