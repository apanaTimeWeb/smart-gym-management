import { renderHook, act } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { useSuperadminCouponsMutations } from '@/app/frontend_superadmin/superadmin_coupons/superadmin_coupons_hooks/useSuperadminCouponsMutations';



const mutate = vi.fn(async <T,>(execute: () => Promise<unknown>, options: { onSuccess?: (value: unknown) => void }) => { const result = await execute(); options.onSuccess?.(result); return result as T; });
vi.mock('@/app/frontend_superadmin/superadmin_coupons/superadmin_coupons_hooks/useSuperadminCouponsMutation', () => ({ useSuperadminCouponsMutation: () => ({ mutate, isMutating: false }) }));
vi.mock('@/app/frontend_superadmin/superadmin_coupons/superadmin_coupons_api/SuperadminCouponsApi', () => ({ couponsApi: { createCoupon: vi.fn(), updateCoupon: vi.fn(), deleteCoupon: vi.fn(), restoreCoupon: vi.fn(), updateCouponStatus: vi.fn() } }));

describe('useSuperadminCouponsMutations', () => {
  it('removes a deleted coupon through the caller-owned updater', async () => {
    const updateCoupons = vi.fn((updater: (items: Array<{ id: string }>) => Array<{ id: string }>) => updater([{ id: 'c-1' }, { id: 'c-2' }]) );
    const form = { reset: vi.fn() } as never;
    const { result } = renderHook(() => useSuperadminCouponsMutations(updateCoupons as never, vi.fn(), vi.fn(), vi.fn(), { id: 'c-1' } as never, form));
    await act(async () => { await result.current.handleDeleteCoupon('c-1'); });
    expect(updateCoupons).toHaveBeenCalledTimes(1);
    expect((updateCoupons as typeof vi.fn).mock.results[0]?.value).toEqual([{ id: 'c-2' }]);
  });
});
