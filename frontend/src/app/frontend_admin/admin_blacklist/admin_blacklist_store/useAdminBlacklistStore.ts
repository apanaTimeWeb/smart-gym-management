// RESPONSIBILITY: Zustand store for Blacklist module UI state.
"use client";
import type { AdminBlacklistStore } from '@/app/frontend_admin/admin_blacklist/admin_blacklist_types/AdminBlacklistStoreTypes';

// DATA FLOW: feature API/schema → hook/context → useAdminBlacklistStore consumers.
import { create } from 'zustand';
import type { BlacklistFormValues } from '@/app/frontend_admin/admin_blacklist/admin_blacklist_types/AdminBlacklistTypes';
import type { BlacklistActiveTab } from '@/app/frontend_admin/admin_blacklist/admin_blacklist_types/AdminBlacklistTypes';
import { EMPTY_BLACKLIST_FORM } from '@/app/frontend_admin/admin_blacklist/admin_blacklist_constants/AdminBlacklistConstants';
/**
 * @description useAdminBlacklistStore: Zustand store for Blacklist module UI state.
 * @dependencies Consumes AdminBlacklistStoreTypes, AdminBlacklistTypes, AdminBlacklistConstants, AdminBlacklistConstants.
 * @edge-case Preserves documented loading, empty, error, permission, and recovery behavior without owning presentation.
 */
export const useAdminBlacklistStore = create<AdminBlacklistStore>((set) => ({
  activeTab: 'all',
  setActiveTab: (t) => set({ activeTab: t }),
  showModal: false,
  setShowModal: (v) => set({ showModal: v }),
  form: EMPTY_BLACKLIST_FORM,
  setForm: (f) => set({ form: f }),
  search: '',
  setSearch: (s) => set({ search: s, currentPage: 1 }),
  scopeFilter: 'all',
  setScopeFilter: (s) => set({ scopeFilter: s, currentPage: 1 }),
  gymFilter: 'all',
  setGymFilter: (g) => set({ gymFilter: g, currentPage: 1 }),
  currentPage: 1,
  setCurrentPage: (p) => set({ currentPage: p }),
}));
