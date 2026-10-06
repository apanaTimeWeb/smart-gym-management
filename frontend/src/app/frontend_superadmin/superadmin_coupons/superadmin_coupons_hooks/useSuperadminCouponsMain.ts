'use client';
// DATA FLOW: Coupon page → local drawer event state + useSuperadminCoupons → composed child views.
// RESPONSIBILITY: Owns route-level coupon drawer coordination and delegates CRUD/filter state to the feature hook.
import { useEffect, useState } from 'react';

import { useSuperadminCoupons } from '@/app/frontend_superadmin/superadmin_coupons/superadmin_coupons_hooks/useSuperadminCoupons';

import type { Coupon } from '@/app/frontend_superadmin/superadmin_coupons/superadmin_coupons_types/SuperadminCouponsTypes';



/**
 * @description Coordinates Coupon page drawer state and the feature-owned history-opening browser event.
 * @dependencies Composes the Coupons data hook and registers a scoped event listener during client lifecycle.
 * @edge-case The listener is always removed on unmount so repeated navigation cannot accumulate duplicate drawer openings.
 */
export function useSuperadminCouponsMain() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [drawerCoupon, setDrawerCoupon] = useState<Coupon | null>(null);
// EFFECT INTENT: Subscribes to the module-owned history-open event and removes the exact listener on unmount; dependency array is intentionally empty because the handler is stable for the hook lifetime.
  useEffect(() => {
    const handleOpenHistory = (event: Event) => {
      const customEvent = event as CustomEvent<Coupon>;
      setDrawerCoupon(customEvent.detail);
      setIsDrawerOpen(true);
    };
    document.addEventListener('open-coupon-history', handleOpenHistory);
    return () => document.removeEventListener('open-coupon-history', handleOpenHistory);
  }, []);
  return { ...useSuperadminCoupons(), isDrawerOpen, setIsDrawerOpen, drawerCoupon };
}
