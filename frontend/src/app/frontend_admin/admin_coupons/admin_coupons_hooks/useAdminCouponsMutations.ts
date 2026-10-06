"use client";

// DATA FLOW: Coupon form/action → mutation hook → AdminCouponsApi → TanStack Query invalidation → coupon UI and backend feedback.
// RESPONSIBILITY: Owns all TanStack Query mutations and cache updates for Admin Coupons.

import { useCallback, useRef } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ADMIN_COUPONS_QUERY_KEYS } from '@/app/frontend_admin/admin_coupons/admin_coupons_constants/AdminCouponsQueryKeys';
import { AdminCouponsApi } from '@/app/frontend_admin/admin_coupons/admin_coupons_api/AdminCouponsApi';
import { useAdminCouponsStore } from '@/app/frontend_admin/admin_coupons/admin_coupons_store/useAdminCouponsStore';
import { adminToast } from '@/app/frontend_admin/admin_layout/admin_layout_feedback/AdminLayoutToastService';
import { getAdminBackendMessage } from '@/app/frontend_admin/admin_layout/admin_layout_feedback/AdminLayoutBackendMessage';
import { clearAdminIdempotencyKey, getAdminIdempotencyKey } from '@/app/frontend_admin/admin_layout/admin_layout_utils/AdminLayoutIdempotencyIntentStore';
import type { Coupon } from '@/app/frontend_admin/admin_coupons/admin_coupons_types/AdminCouponsTypes';
/**
 * @description useAdminCouponsMutations: Owns all TanStack Query mutations and cache updates for Admin Coupons.
 * @dependencies Consumes AdminCouponsQueryKeys, AdminCouponsApi, useAdminCouponsStore, AdminLayoutToastService, AdminLayoutBackendMessage, AdminLayoutIdempotencyIntentStore.
 * @edge-case Preserves documented loading, empty, error, permission, and recovery behavior without owning presentation.
 */
export function useAdminCouponsMutations() {
  const queryClient = useQueryClient();
  const store = useAdminCouponsStore();
  const idempotencyKeysRef = useRef(new Map<string, string>());
  const getIntentKey = useCallback((intentId: string) => getAdminIdempotencyKey(idempotencyKeysRef.current, intentId), []);
  const clearIntentKey = useCallback((intentId: string) => clearAdminIdempotencyKey(idempotencyKeysRef.current, intentId), []);
  const invalidate = () => void queryClient.invalidateQueries({ queryKey: ADMIN_COUPONS_QUERY_KEYS.key('list') });

  const createMutation = useMutation({
    mutationFn: ({ payload, idempotencyKey, intentId }: { payload: Partial<Coupon>; idempotencyKey: string; intentId: string }) => AdminCouponsApi.createCoupon(payload, idempotencyKey),
    onSuccess: (res, variables) => { clearIntentKey(variables.intentId); adminToast.success(res.message, 'admin-success-28c64429b0'); store.setShowModal(false); invalidate(); },
    onError: (err) => { const message = getAdminBackendMessage(err); if (message) adminToast.error(message, 'admin-error-000fe5d6ed'); },
  });
  const updateMutation = useMutation({
    mutationFn: ({ id, payload, idempotencyKey, intentId }: { id: string; payload: Partial<Coupon>; idempotencyKey: string; intentId: string }) => AdminCouponsApi.updateCoupon(id, payload, idempotencyKey),
    onSuccess: (res, variables) => { clearIntentKey(variables.intentId); adminToast.success(res.message, 'admin-success-268a88738b'); store.setShowModal(false); invalidate(); },
    onError: (err) => { const message = getAdminBackendMessage(err); if (message) adminToast.error(message, 'admin-error-1bf98dcfe1'); },
  });
  const deleteMutation = useMutation({
    mutationFn: ({ id, idempotencyKey }: { id: string; idempotencyKey: string }) => AdminCouponsApi.deleteCoupon(id, idempotencyKey),
    onSuccess: (res, variables) => { adminToast.success(res.message, 'admin-success-1eef48be92'); clearIntentKey(`delete-coupon:${variables.id}`); invalidate(); },
    onError: (err) => { const message = getAdminBackendMessage(err); if (message) adminToast.error(message, 'admin-error-aedbe2342a'); },
  });
  const toggleMutation = useMutation({
    mutationFn: ({ id, idempotencyKey, intentId }: { id: string; idempotencyKey: string; intentId: string }) => AdminCouponsApi.toggleCoupon(id, idempotencyKey),
    onSuccess: (res, variables) => { clearIntentKey(variables.intentId); adminToast.success(res.message, 'admin-success-c9f979e51f'); invalidate(); },
    onError: (err) => { const message = getAdminBackendMessage(err); if (message) adminToast.error(message, 'admin-error-4febc5f64f'); },
  });

  return { getIntentKey, clearIntentKey, createMutation, updateMutation, deleteMutation, toggleMutation };
}
