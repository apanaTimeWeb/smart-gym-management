import { describe, expect, it, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useAdminCouponsModalForm } from '@/app/frontend_admin/admin_coupons/admin_coupons_components/admin_coupons_modal/useAdminCouponsModalForm';

const store = { showModal: true, setShowModal: vi.fn(), editId: 'c1', form: { code: 'SAVE10', assignedGyms: ['g1'] }, saveCoupon: vi.fn(), saving: false };
vi.mock('@/app/frontend_admin/admin_coupons/admin_coupons_hooks/useAdminCouponsLogic', () => ({ useAdminCouponsLogic: () => store }));
vi.mock('@/app/frontend_admin/admin_coupons/admin_coupons_hooks/useAdminCouponsUnsavedChangesGuard', () => ({ useAdminCouponsUnsavedChangesGuard: () => ({ confirmDiscardIfDirty: vi.fn().mockResolvedValue(true) }) }));

describe('useAdminCouponsModalForm', () => {
  it('preserves edit identity and supports gym selection with an all fallback', () => {
    const { result } = renderHook(() => useAdminCouponsModalForm());
    expect(result.current.editId).toBe('c1');
    expect(result.current.selectedGyms).toEqual(['g1']);
    act(() => result.current.toggleGym('g2'));
    expect(result.current.selectedGyms).toEqual(['g1', 'g2']);
    act(() => result.current.toggleGym('g1'));
    act(() => result.current.toggleGym('g2'));
    expect(result.current.selectedGyms).toEqual(['all']);
  });
});
