"use client";
// RESPONSIBILITY: Custom hook encapsulating all business logic for the Coupons module.
// DATA FLOW: AdminCouponsMain → useAdminCouponsLogic → couponsApi

import { useCallback } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { couponsApi } from '@/app/admin/coupons/coupons_api/AdminCouponsApi';
import { useAdminCouponsStore } from '@/app/admin/coupons/coupons_store/useAdminCouponsStore';
import { useAdminUrlQuerySync } from '@/app/admin/admin_utils/useAdminUrlQuerySync';
import { useAdminConfirm } from '@/app/admin/admin_components/AdminFeedback/useAdminConfirm';
import { EMPTY_COUPON_FORM, COUPONS_ITEMS_PER_PAGE } from '@/app/admin/coupons/coupons_utils/AdminCouponsSharedConstants';
import type { Coupon, CouponFormValues } from '@/app/admin/coupons/coupons_types/AdminCouponsTypes';

export function useAdminCouponsLogic() {
  const { confirm } = useAdminConfirm();
  const qc = useQueryClient();
  const { showModal, setShowModal, editId, setEditId, form, setForm, search, statusFilter, currentPage, setCurrentPage } = useAdminCouponsStore();
  useAdminUrlQuerySync([
    { key: 'search', value: search, defaultValue: '', setValue: useAdminCouponsStore.getState().setSearch },
    { key: 'status', value: statusFilter, defaultValue: 'all', setValue: useAdminCouponsStore.getState().setStatusFilter },
    { key: 'page', value: currentPage, defaultValue: 1, setValue: (value) => setCurrentPage(Math.max(1, Number(value) || 1)) },
  ]);

  const couponsQuery = useQuery({
    queryKey: ['admin', 'coupons', 'list'],
    queryFn: () => couponsApi.fetchCoupons().then(r => r.data ?? []),
    staleTime: 1000 * 60 * 2,
  });

  const status = couponsQuery.status;
  const data = couponsQuery.data;

  // Client-side filter
  const allCoupons = data ?? [];
  const filtered = allCoupons.filter((c: Coupon) => {
    const matchSearch = !search || c.code.toLowerCase().includes(search.toLowerCase()) || c.description.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === 'all' || c.status === statusFilter;
    return matchSearch && matchStatus;
  });
  const totalPages = Math.max(1, Math.ceil(filtered.length / COUPONS_ITEMS_PER_PAGE));
  const paginated = filtered.slice((currentPage - 1) * COUPONS_ITEMS_PER_PAGE, currentPage * COUPONS_ITEMS_PER_PAGE);

  const createMutation = useMutation({
    mutationFn: (payload: Partial<Coupon>) => couponsApi.createCoupon(payload),
    onSuccess: (res) => { toast.success(res.message, { id: 'admin-success-28c64429b0' }); setShowModal(false); qc.invalidateQueries({ queryKey: ['admin', 'coupons', 'list'] }); },
    onError: (err) => toast.error((err as Error).message, { id: 'admin-error-000fe5d6ed' }),
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: Partial<Coupon> }) => couponsApi.updateCoupon(id, payload),
    onSuccess: (res) => { toast.success(res.message, { id: 'admin-success-268a88738b' }); setShowModal(false); qc.invalidateQueries({ queryKey: ['admin', 'coupons', 'list'] }); },
    onError: (err) => toast.error((err as Error).message, { id: 'admin-error-1bf98dcfe1' }),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => couponsApi.deleteCoupon(id),
    onSuccess: (res) => { toast.success(res.message, { id: 'admin-success-1eef48be92' }); qc.invalidateQueries({ queryKey: ['admin', 'coupons', 'list'] }); },
    onError: (err) => toast.error((err as Error).message, { id: 'admin-error-aedbe2342a' }),
  });

  const toggleMutation = useMutation({
    mutationFn: (id: string) => couponsApi.toggleCoupon(id),
    onSuccess: (res) => { toast.success(res.message, { id: 'admin-success-c9f979e51f' }); qc.invalidateQueries({ queryKey: ['admin', 'coupons', 'list'] }); },
    onError: (err) => toast.error((err as Error).message, { id: 'admin-error-4febc5f64f' }),
  });

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
      validFrom: data.validFrom, validUntil: data.validUntil, status: 'active',
    };
    if (editId) { updateMutation.mutate({ id: editId, payload }); }
    else { createMutation.mutate(payload); }
  }, [editId, createMutation, updateMutation]);

  const deleteCoupon = useCallback(async (id: string) => {
    const ok = await confirm({ title: 'Delete Coupon', message: 'This coupon will be permanently deleted. This action cannot be undone.', confirmText: 'Delete', type: 'danger' });
    if (!ok) return;
    deleteMutation.mutate(id);
  }, [confirm, deleteMutation]);

  const toggleCoupon = useCallback((id: string) => { toggleMutation.mutate(id); }, [toggleMutation]);

  const saving = createMutation.isPending || updateMutation.isPending;

  return { coupons: paginated, allCoupons, status, saving, showModal, setShowModal, editId, form, setForm, openAdd, openEdit, saveCoupon, deleteCoupon, toggleCoupon, currentPage, setCurrentPage, totalPages, totalItems: filtered.length };
}