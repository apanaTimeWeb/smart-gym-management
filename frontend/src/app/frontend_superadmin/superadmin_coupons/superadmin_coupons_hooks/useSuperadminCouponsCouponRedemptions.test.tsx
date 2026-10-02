import { couponsApi } from '@/app/frontend_superadmin/superadmin_coupons/superadmin_coupons_api/SuperadminCouponsApi';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { useSuperadminCouponsCouponRedemptions } from '@/app/frontend_superadmin/superadmin_coupons/superadmin_coupons_hooks/useSuperadminCouponsCouponRedemptions';

import type { ReactNode } from 'react';


vi.mock('@/app/frontend_superadmin/superadmin_coupons/superadmin_coupons_api/SuperadminCouponsApi', () => ({ couponsApi: vi.fn() }));
describe('useSuperadminCouponsCouponRedemptions', () => {
  it('executes the hook query contract and reaches a successful query state', async () => {
    vi.mocked(couponsApi).mockResolvedValue({ success: true, message: 'ok', data: [] } as never);
    const client = new QueryClient({ defaultOptions: { queries: { retry: false }, mutations: { retry: false } } });
    const wrapper = ({ children }: { children: ReactNode }) => <QueryClientProvider client={client}>{children}</QueryClientProvider>;
    const { result } = renderHook(() => useSuperadminCouponsCouponRedemptions(), { wrapper });
    await waitFor(() => expect(result.current.status).toBe('success'));
    expect(result.current.isError).toBe(false);
  });
});
