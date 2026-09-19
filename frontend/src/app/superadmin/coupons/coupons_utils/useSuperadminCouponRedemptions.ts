// RESPONSIBILITY: Loads the redemption history for one coupon through the Coupons API/query boundary.
'use client';
import { useQuery } from '@tanstack/react-query';
import { couponsApi } from '@/app/superadmin/coupons/coupons_api/SuperadminCouponsApi';

/**
 * Purpose: Keep coupon redemption records in TanStack Query rather than component fallback state.
 * Inputs: selected coupon id or null.
 * Output: query state for redemption history.
 * Side effects: network/cache activity only.
 * Invariant: the query is enabled only for the selected coupon resource.
 */
export function useSuperadminCouponRedemptions(couponId: string | null) {
  return useQuery({
    queryKey: ['superadmin', 'coupons', 'redemptions', couponId],
    queryFn: () => couponsApi.fetchRedemptions(couponId as string),
    enabled: Boolean(couponId),
  });
}
