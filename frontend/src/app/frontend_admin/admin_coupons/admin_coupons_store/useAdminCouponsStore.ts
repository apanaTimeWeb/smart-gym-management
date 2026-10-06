// RESPONSIBILITY: Zustand store for Coupons module UI state — modal, form, filters.
"use client";
import type { AdminCouponsStore } from '@/app/frontend_admin/admin_coupons/admin_coupons_types/AdminCouponsStoreTypes';

// DATA FLOW: feature API/schema → hook/context → useAdminCouponsStore consumers.
import { create } from 'zustand';
import type { CouponFormValues } from '@/app/frontend_admin/admin_coupons/admin_coupons_types/AdminCouponsTypes';
import { EMPTY_COUPON_FORM } from '@/app/frontend_admin/admin_coupons/admin_coupons_constants/AdminCouponsConstants';
/**
 * @description useAdminCouponsStore: Zustand store for Coupons module UI state — modal, form, filters.
 * @dependencies Consumes AdminCouponsStoreTypes, AdminCouponsTypes, AdminCouponsConstants.
 * @edge-case Preserves documented loading, empty, error, permission, and recovery behavior without owning presentation.
 */
export const useAdminCouponsStore = create<AdminCouponsStore>((set) => ({
  showModal: false,
  setShowModal: (v) => set({ showModal: v }),
  editId: null,
  setEditId: (id) => set({ editId: id }),
  form: EMPTY_COUPON_FORM,
  setForm: (f) => set({ form: f }),
  search: '',
  setSearch: (s) => set({ search: s, currentPage: 1 }),
  statusFilter: 'all',
  setStatusFilter: (s) => set({ statusFilter: s, currentPage: 1 }),
  currentPage: 1,
  setCurrentPage: (p) => set({ currentPage: p }),
  dateRange: 'all_time',
  setDateRange: (s) => set({ dateRange: s, currentPage: 1 }),
}));
