import { COUPON_STATUS } from '@/app/frontend_admin/admin_coupons/admin_coupons_constants/AdminCouponsConstants';
import { describe, expect, it, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useQuery } from '@tanstack/react-query';
import { useAdminCouponsLogic } from '@/app/frontend_admin/admin_coupons/admin_coupons_hooks/useAdminCouponsLogic';

const store = {
  showModal: false, setShowModal: vi.fn(), editId: null, setEditId: vi.fn(), form: {}, setForm: vi.fn(), search: '', statusFilter: 'all', currentPage: 1, setCurrentPage: vi.fn(), dateRange: 'all_time', setDateRange: vi.fn(),
};
const createMutation = { mutate: vi.fn(), isPending: false };
const updateMutation = { mutate: vi.fn(), isPending: false };
const deleteMutation = { mutate: vi.fn(), isPending: false };
const toggleMutation = { mutate: vi.fn(), isPending: false };
const getIntentKey = vi.fn((id: string) => `idem:${id}`);
const clearIntentKey = vi.fn();
vi.mock('next-intl', () => ({ useTranslations: () => (key: string) => key }));
vi.mock('@tanstack/react-query', () => ({ useQuery: vi.fn() }));
vi.mock('@/app/frontend_admin/admin_coupons/admin_coupons_store/useAdminCouponsStore', () => ({ useAdminCouponsStore: Object.assign(() => store, { getState: () => store }) }));
vi.mock('@/app/frontend_admin/admin_layout/admin_layout_utils/useAdminLayoutUrlQuerySync', () => ({ useAdminLayoutUrlQuerySync: vi.fn() }));
vi.mock('@/app/frontend_admin/admin_layout/admin_layout_feedback/useAdminLayoutConfirm', () => ({ useAdminLayoutConfirm: () => ({ confirm: vi.fn().mockResolvedValue(true) }) }));
vi.mock('@/app/frontend_admin/admin_coupons/admin_coupons_hooks/useAdminCouponsMutations', () => ({ useAdminCouponsMutations: () => ({ getIntentKey, clearIntentKey, createMutation, updateMutation, deleteMutation, toggleMutation }) }));

describe('useAdminCouponsLogic', () => {
  beforeEach(() => {
    store.showModal = false;
    store.editId = null;
    vi.mocked(useQuery).mockReturnValue({ data: { data: [{ id: 'c1', code: 'SAVE10', description: 'Save', type: 'PERCENTAGE', value: 10, minOrderAmount: 0, maxDiscount: 100, usageLimit: 10, assignedGyms: ['all'], validFrom: '2026-01-01', validUntil: '2026-12-31', status: COUPON_STATUS.ACTIVE }], meta: { total: 1 } }, status: 'success' } as never);
  });

  it('opens a create form and normalizes coupon payloads before mutation', () => {
    const { result } = renderHook(() => useAdminCouponsLogic());
    act(() => result.current.openAdd());
    expect(store.setEditId).toHaveBeenCalledWith(null);
    expect(store.setShowModal).toHaveBeenCalledWith(true);
    act(() => result.current.saveCoupon({ code: 'save20', description: 'Save', type: 'PERCENTAGE', value: '20', minOrderAmount: '0', maxDiscount: '100', usageLimit: '5', assignedGyms: ['all'], validFrom: '2026-01-01', validUntil: '2026-12-31' } as never));
    expect(createMutation.mutate).toHaveBeenCalledWith(expect.objectContaining({ payload: expect.objectContaining({ code: 'SAVE20', value: 20, usageLimit: 5, assignedGymNames: ['All Gyms'] }) }));
  });
});
