import { describe, expect, it, vi, beforeEach } from 'vitest';
import React from 'react';
import { renderHook, act, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AdminCouponsApi } from '@/app/frontend_admin/admin_coupons/admin_coupons_api/AdminCouponsApi';
import { useAdminCouponsMutations } from '@/app/frontend_admin/admin_coupons/admin_coupons_hooks/useAdminCouponsMutations';

vi.mock('@/app/frontend_admin/admin_coupons/admin_coupons_api/AdminCouponsApi', () => ({
  AdminCouponsApi: {
    createCoupon: vi.fn().mockResolvedValue({ message: 'ok' }),
    updateCoupon: vi.fn().mockResolvedValue({ message: 'ok' }),
    deleteCoupon: vi.fn().mockResolvedValue({ message: 'ok' }),
    toggleCoupon: vi.fn().mockResolvedValue({ message: 'ok' })
  },
}));

const wrapper = ({ children }: { children: React.ReactNode }) => {
  const client = new QueryClient({ defaultOptions: { queries: { retry: false }, mutations: { retry: false } } });
  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
};

describe('useAdminCouponsMutations', () => {
  beforeEach(() => { vi.clearAllMocks(); });

  it('executes the mutation through the module API boundary', async () => {
    const { result } = renderHook(() => useAdminCouponsMutations(), { wrapper });
    await act(async () => { await result.current.createMutation.mutateAsync({ id: 'id-1', staffId: 'staff-1', planId: 'plan-1', permission: 'view', enabled: true, payload: {}, data: {}, planName: 'Pro', intentId: 'intent-1', idempotencyKey: 'idem-1' } as never); });
    await waitFor(() => expect(AdminCouponsApi.createCoupon).toHaveBeenCalled());
  });
});
