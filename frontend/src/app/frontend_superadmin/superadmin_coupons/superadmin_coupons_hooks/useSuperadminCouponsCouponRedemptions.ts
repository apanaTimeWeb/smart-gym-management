'use client';// DATA FLOW: Inputs enter useSuperadminCouponsCouponRedemptions, flow through its feature-owned state/API dependencies, and return typed UI state/actions to the owning Superadmin feature.
// RESPONSIBILITY: Loads the redemption history for one coupon through the Coupons API/query boundary.
import { useQuery } from '@tanstack/react-query';

import { couponsApi } from '@/app/frontend_superadmin/superadmin_coupons/superadmin_coupons_api/SuperadminCouponsApi';
import { SUPERADMIN_COUPONS_QUERY_KEYS } from '@/app/frontend_superadmin/superadmin_coupons/superadmin_coupons_constants/SuperadminCouponsQueryKeys';



/**
 * Purpose: Keep coupon redemption records in TanStack Query rather than component fallback state.
 * Inputs: selected coupon id or null.
 * Output: query state for redemption history.
 * Side effects: network/cache activity only.
 * Invariant: the query is enabled only for the selected coupon resource.
 */
/**
 * @description Manages coupons state, queries, and UI interactions for useSuperadminCouponsCouponRedemptions.
 * @dependencies Consumes only owning-module state/API contracts and approved global infrastructure.
 * @edge-case Preserves loading, error, cancellation, retry, and repeated-action behavior.
 */
// DATA FLOW: Module API/query/store state → useSuperadminCouponsCouponRedemptions → consuming feature component.
export function useSuperadminCouponsCouponRedemptions(couponId: string | null) {
  return useQuery({
    queryKey: SUPERADMIN_COUPONS_QUERY_KEYS.redemptions(couponId),
    queryFn: () => couponsApi.fetchRedemptions(couponId as string),
    enabled: Boolean(couponId),
  });
}
