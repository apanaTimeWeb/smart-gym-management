import { act, renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { useSuperadminCouponsMain } from '@/app/frontend_superadmin/superadmin_coupons/superadmin_coupons_hooks/useSuperadminCouponsMain';



vi.mock('@/app/frontend_superadmin/superadmin_coupons/superadmin_coupons_hooks/useSuperadminCoupons', () => ({ useSuperadminCoupons: () => ({ coupons: [], status: 'success' }) }));

describe('useSuperadminCouponsMain', () => {
  it('opens the history drawer from the feature-scoped browser event and cleans up on unmount', () => {
    const coupon = { id: 'CPN-1', code: 'SAVE', status: 'ACTIVE' } as never;
    const { result, unmount } = renderHook(() => useSuperadminCouponsMain());
    act(() => document.dispatchEvent(new CustomEvent('open-coupon-history', { detail: coupon })));
    expect(result.current.isDrawerOpen).toBe(true);
    expect(result.current.drawerCoupon).toEqual(coupon);
    unmount();
  });
});
