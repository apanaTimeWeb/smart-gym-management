"use client";
import { COUPON_STATUS } from '@/app/frontend_admin/admin_coupons/admin_coupons_constants/AdminCouponsConstants';
// RESPONSIBILITY: Custom hook encapsulating all business logic for the Coupons module.
import { ADMIN_COUPONS_QUERY_KEYS } from '@/app/frontend_admin/admin_coupons/admin_coupons_constants/AdminCouponsQueryKeys';
// DATA FLOW: AdminCouponsMain → useAdminCouponsLogic → AdminCouponsApi

import { useCallback } from 'react';
import { useTranslations } from 'next-intl';
import { useQuery } from '@tanstack/react-query';
import { AdminCouponsApi } from '@/app/frontend_admin/admin_coupons/admin_coupons_api/AdminCouponsApi';
import { useAdminCouponsStore } from '@/app/frontend_admin/admin_coupons/admin_coupons_store/useAdminCouponsStore';
import { useAdminLayoutUrlQuerySync } from '@/app/frontend_admin/admin_layout/admin_layout_utils/useAdminLayoutUrlQuerySync';
import { useAdminLayoutConfirm } from '@/app/frontend_admin/admin_layout/admin_layout_feedback/useAdminLayoutConfirm';
import { EMPTY_COUPON_FORM, COUPONS_ITEMS_PER_PAGE } from '@/app/frontend_admin/admin_coupons/admin_coupons_constants/AdminCouponsConstants';
import type { Coupon, CouponFormValues } from '@/app/frontend_admin/admin_coupons/admin_coupons_types/AdminCouponsTypes';
import { useAdminCouponsMutations } from '@/app/frontend_admin/admin_coupons/admin_coupons_hooks/useAdminCouponsMutations';
/**
 * @description useAdminCouponsLogic: Custom hook encapsulating all business logic for the Coupons module.
 * @dependencies Consumes AdminCouponsQueryKeys, AdminCouponsApi, useAdminCouponsStore, useAdminLayoutUrlQuerySync, useAdminLayoutConfirm, AdminCouponsConstants.
 * @edge-case Preserves documented loading, empty, error, permission, and recovery behavior without owning presentation.
 */
export function useAdminCouponsLogic() {
  const { confirm } = useAdminLayoutConfirm();
  const t = useTranslations();
  const { showModal, setShowModal, editId, setEditId, form, setForm, search, statusFilter, currentPage, setCurrentPage, dateRange, setDateRange } = useAdminCouponsStore();
  useAdminLayoutUrlQuerySync([
    { key: 'search', value: search, defaultValue: '', setValue: (val) => useAdminCouponsStore.getState().setSearch(val as string) },
    { key: 'status', value: statusFilter, defaultValue: 'all', setValue: (val) => useAdminCouponsStore.getState().setStatusFilter(val as any) },
    { key: 'dateRange', value: dateRange, defaultValue: 'all_time', setValue: (val) => useAdminCouponsStore.getState().setDateRange(val as any) },
    { key: 'page', value: currentPage, defaultValue: 1, setValue: (value) => setCurrentPage(Math.max(1, Number(value) || 1)) },
  ]);

  const couponsQuery = useQuery({
    queryKey: ADMIN_COUPONS_QUERY_KEYS.key('list', search, statusFilter, dateRange, currentPage),
    queryFn: () => AdminCouponsApi.fetchCoupons({ page: currentPage, limit: COUPONS_ITEMS_PER_PAGE, search: search || undefined, status: statusFilter !== 'all' ? statusFilter as Coupon['status'] : undefined, dateRange }),
    staleTime: 1000 * 60 * 2,
  });

  const status = couponsQuery.status;
  const data = couponsQuery.data;

  const allCoupons = data?.data ?? [];
  const totalItems = data?.meta?.total ?? allCoupons.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / COUPONS_ITEMS_PER_PAGE));
  const paginated = allCoupons;

  const { getIntentKey, clearIntentKey, createMutation, updateMutation, deleteMutation, toggleMutation } = useAdminCouponsMutations();

  const openAdd = useCallback(() => { setEditId(null); setForm(EMPTY_COUPON_FORM); setShowModal(true); }, [setEditId, setForm, setShowModal]);

  const openEdit = useCallback((c: Coupon) => {
    setEditId(c.id);
    setForm({
      code: c.code, description: c.description, type: c.type,
      value: String(c.value), minOrderAmount: String(c.minOrderAmount),
      maxDiscount: String(c.maxDiscount), usageLimit: String(c.usageLimit),
      assignedGyms: c.assignedGyms, validFrom: c.validFrom, validUntil: c.validUntil,
    });
    setShowModal(true);
  }, [setEditId, setForm, setShowModal]);

  const saveCoupon = useCallback(async (data: CouponFormValues) => {
    const payload: Partial<Coupon> = {
      code: data.code.toUpperCase(), description: data.description, type: data.type,
      value: Number(data.value), minOrderAmount: Number(data.minOrderAmount),
      maxDiscount: Number(data.maxDiscount), usageLimit: Number(data.usageLimit),
      assignedGyms: data.assignedGyms,
      assignedGymNames: data.assignedGyms.includes('all') ? ['All Gyms'] : data.assignedGyms,
      validFrom: data.validFrom, validUntil: data.validUntil, status: COUPON_STATUS.ACTIVE,
    };
    if (editId) { const intentId = `update-coupon:${editId}`; updateMutation.mutate({ id: editId, payload: payload as any, idempotencyKey: getIntentKey(intentId), intentId }); }
    else { const intentId = 'create-coupon'; createMutation.mutate({ payload: payload as any, idempotencyKey: getIntentKey(intentId), intentId }); }
  }, [editId, createMutation, getIntentKey, updateMutation]);

  const deleteCoupon = useCallback(async (id: string) => {
    const intentId = `delete-coupon:${id}`;
    const ok = await confirm({ title: t('coupons.AdminCouponsConfirm.deleteTitle'), message: t('coupons.AdminCouponsConfirm.deleteMessage'), confirmText: t('coupons.AdminCouponsConfirm.deleteConfirm'), type: 'danger' });
    if (!ok) { clearIntentKey(intentId); return; }
    deleteMutation.mutate({ id, idempotencyKey: getIntentKey(intentId) });
  }, [confirm, clearIntentKey, deleteMutation, getIntentKey]);

  const toggleCoupon = useCallback((id: string) => { const intentId = `toggle-coupon:${id}`; toggleMutation.mutate({ id, idempotencyKey: getIntentKey(intentId), intentId }); }, [getIntentKey, toggleMutation]);

  const saving = createMutation.isPending || updateMutation.isPending;

  return { coupons: paginated, allCoupons, status, saving, showModal, setShowModal, editId, form, setForm, dateRange, setDateRange, openAdd, openEdit, saveCoupon, deleteCoupon, toggleCoupon, currentPage, setCurrentPage, totalPages, totalItems };
}
