"use client";
// RESPONSIBILITY: Business logic hook for the Blacklist module.
import { ADMIN_BLACKLIST_QUERY_KEYS } from '@/app/frontend_admin/admin_blacklist/admin_blacklist_constants/AdminBlacklistQueryKeys';
// DATA FLOW: feature API/schema → hook/context → useAdminBlacklistLogic consumers.

import { useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';
import { AdminBlacklistApi } from '@/app/frontend_admin/admin_blacklist/admin_blacklist_api/AdminBlacklistApi';
import { useTranslations } from 'next-intl';
import { useAdminBlacklistStore } from '@/app/frontend_admin/admin_blacklist/admin_blacklist_store/useAdminBlacklistStore';
import { useAdminLayoutUrlQuerySync } from '@/app/frontend_admin/admin_layout/admin_layout_utils/useAdminLayoutUrlQuerySync';
import { useAdminLayoutConfirm } from '@/app/frontend_admin/admin_layout/admin_layout_feedback/useAdminLayoutConfirm';
import { BLACKLIST_ITEMS_PER_PAGE, EMPTY_BLACKLIST_FORM } from '@/app/frontend_admin/admin_blacklist/admin_blacklist_constants/AdminBlacklistConstants';
import type { BlacklistFormValues, BlacklistedMember, BlacklistScope } from '@/app/frontend_admin/admin_blacklist/admin_blacklist_types/AdminBlacklistTypes';
import { useAdminBlacklistMutations } from '@/app/frontend_admin/admin_blacklist/admin_blacklist_hooks/useAdminBlacklistMutations';
/**
 * @description useAdminBlacklistLogic: Business logic hook for the Blacklist module.
 * @dependencies Consumes AdminBlacklistQueryKeys, AdminBlacklistApi, useAdminBlacklistStore, useAdminLayoutUrlQuerySync, useAdminLayoutConfirm, AdminBlacklistConstants.
 * @edge-case Preserves documented loading, empty, error, permission, and recovery behavior without owning presentation.
 */
export function useAdminBlacklistLogic() {
  const t = useTranslations();
  const { confirm } = useAdminLayoutConfirm();
  const { activeTab, setActiveTab, showModal, setShowModal, form, setForm, search, scopeFilter, gymFilter, currentPage, setCurrentPage } = useAdminBlacklistStore();
  useAdminLayoutUrlQuerySync([
    { key: 'search', value: search, defaultValue: '', setValue: useAdminBlacklistStore.getState().setSearch },
    { key: 'scope', value: scopeFilter, defaultValue: 'all', setValue: useAdminBlacklistStore.getState().setScopeFilter },
    { key: 'gym', value: gymFilter, defaultValue: 'all', setValue: useAdminBlacklistStore.getState().setGymFilter },
    { key: 'page', value: currentPage, defaultValue: 1, setValue: (value) => setCurrentPage(Math.max(1, Number(value) || 1)) },
  ]);

  const queryParams = { page: currentPage, limit: BLACKLIST_ITEMS_PER_PAGE, search: search || undefined, scope: scopeFilter === 'all' ? undefined : (scopeFilter as BlacklistScope), gymId: gymFilter === 'all' ? undefined : gymFilter };
  const blacklistQuery = useQuery({ queryKey: ADMIN_BLACKLIST_QUERY_KEYS.key('list', queryParams), queryFn: () => AdminBlacklistApi.fetchBlacklist(queryParams), staleTime: 1000 * 60 * 2 });
  const crossGymQuery = useQuery({ queryKey: ADMIN_BLACKLIST_QUERY_KEYS.key('cross-gym'), queryFn: () => AdminBlacklistApi.fetchBlacklist({ page: 1, limit: 100, scope: 'specific' }), staleTime: 1000 * 60 * 2 });

  const { data: kpis } = useQuery({
    queryKey: ADMIN_BLACKLIST_QUERY_KEYS.key('kpis'),
    queryFn: () => AdminBlacklistApi.fetchKPIs().then((r) => r.data),
    staleTime: 1000 * 60 * 5,
  });

  const membersData = blacklistQuery.data?.data ?? [];
  const totalItems = blacklistQuery.data?.meta?.total ?? membersData.length;
  const status = blacklistQuery.status;
  const paginated = membersData;
  const gymSpecificEntries = (crossGymQuery.data?.data ?? []).filter((m: BlacklistedMember) => m.scope === 'specific' && m.isActive);

  const { getIntentKey, clearIntentKey, addMutation, removeMutation, toggleMutation, propagateMutation } = useAdminBlacklistMutations();

  const openAdd = useCallback(() => { setForm(EMPTY_BLACKLIST_FORM); setShowModal(true); }, [setForm, setShowModal]);

  const saveBlacklist = useCallback((data: BlacklistFormValues) => { const intentId = 'add-blacklist'; addMutation.mutate({ payload: data, idempotencyKey: getIntentKey(intentId) }); }, [addMutation, getIntentKey]);

  const removeFromBlacklist = useCallback(async (id: string, name: string) => {
    const intentId = `remove-blacklist:${id}`;
    const ok = await confirm({ title: t('blacklist.AdminBlacklistConfirm.removeTitle'), message: t('blacklist.AdminBlacklistConfirm.removeMessage', { name }), confirmText: t('blacklist.AdminBlacklistConfirm.removeConfirm'), type: 'danger' });
    if (!ok) { clearIntentKey(intentId); return; }
    removeMutation.mutate({ id, idempotencyKey: getIntentKey(intentId) });
  }, [clearIntentKey, confirm, removeMutation, getIntentKey]);

  const toggleBlacklist = useCallback(async (id: string) => {
    const target = membersData.find((member) => member.id === id);
    if (!target) return;
    const nextAction = target.isActive ? 'restore' : 'blacklist';
    const intentId = `toggle-blacklist:${id}`;
    const confirmed = await confirm({      title: nextAction === 'blacklist' ? t('blacklist.AdminBlacklistConfirm.addTitle') : t('blacklist.AdminBlacklistConfirm.restoreTitle'),
      message: nextAction === 'blacklist'
        ? t('blacklist.AdminBlacklistConfirm.addMessage', { name: target.memberName })
        : t('blacklist.AdminBlacklistConfirm.restoreMessage', { name: target.memberName }),
      confirmText: nextAction === 'blacklist' ? t('blacklist.AdminBlacklistConfirm.addConfirm') : t('blacklist.AdminBlacklistConfirm.restoreConfirm'),
      type: 'danger',
    });
    if (!confirmed) { clearIntentKey(intentId); return; }
    toggleMutation.mutate({ id, idempotencyKey: getIntentKey(intentId) });
  }, [clearIntentKey, confirm, getIntentKey, membersData, toggleMutation]);

  const propagateToAllBranches = useCallback(async (id: string, name: string) => {
    const intentId = `propagate-blacklist:${id}`;
    const ok = await confirm({
      title: t('blacklist.AdminBlacklistConfirm.propagateTitle'),
      message: t('blacklist.AdminBlacklistConfirm.propagateMessage', { name }),
      confirmText: t('blacklist.AdminBlacklistConfirm.propagateConfirm'),
      type: 'danger',
    });
    if (!ok) { clearIntentKey(intentId); return; }
    propagateMutation.mutate({ id, idempotencyKey: getIntentKey(intentId) });
  }, [clearIntentKey, confirm, getIntentKey, propagateMutation]);

  return {
    members: paginated, allMembers: paginated, gymSpecificEntries, status, kpis,
    activeTab, setActiveTab,
    showModal, setShowModal, form, openAdd, saveBlacklist,
    removeFromBlacklist, toggleBlacklist, propagateToAllBranches,
    saving: addMutation.isPending,
    propagating: propagateMutation.isPending,
    currentPage, setCurrentPage, totalPages: Math.max(1, Math.ceil(totalItems / BLACKLIST_ITEMS_PER_PAGE)), totalItems,
  };
}
