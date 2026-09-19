"use client";
// DATA FLOW: feature API/schema → hook/context → useAdminBlacklistLogic consumers.
// RESPONSIBILITY: Business logic hook for the Blacklist module.

import { useCallback, useRef } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { adminToast } from '@/app/admin/admin_layout/AdminFeedback/AdminToastService';
import { blacklistApi } from '@/app/admin/blacklist/blacklist_api/AdminBlacklistApi';
import { useAdminBlacklistStore } from '@/app/admin/blacklist/blacklist_store/useAdminBlacklistStore';
import { useAdminUrlQuerySync } from '@/app/admin/admin_layout/admin_utils/useAdminUrlQuerySync';
import { useAdminConfirm } from '@/app/admin/admin_layout/AdminFeedback/useAdminConfirm';
import { clearAdminIdempotencyKey, getAdminIdempotencyKey } from '@/app/admin/admin_layout/admin_utils/AdminIdempotencyIntentStore';
import { BLACKLIST_ITEMS_PER_PAGE, EMPTY_BLACKLIST_FORM } from '@/app/admin/blacklist/blacklist_utils/AdminBlacklistSharedConstants';
import type { BlacklistFormValues, BlacklistedMember, BlacklistScope } from '@/app/admin/blacklist/blacklist_types/AdminBlacklistTypes';

export function useAdminBlacklistLogic() {
  const { confirm } = useAdminConfirm();
  const qc = useQueryClient();
  const idempotencyKeysRef = useRef(new Map<string, string>());
  const getIntentKey = useCallback((intentId: string) => getAdminIdempotencyKey(idempotencyKeysRef.current, intentId), []);
  const clearIntentKey = useCallback((intentId: string) => clearAdminIdempotencyKey(idempotencyKeysRef.current, intentId), []);
  const { activeTab, setActiveTab, showModal, setShowModal, form, setForm, search, scopeFilter, gymFilter, currentPage, setCurrentPage } = useAdminBlacklistStore();
  useAdminUrlQuerySync([
    { key: 'search', value: search, defaultValue: '', setValue: useAdminBlacklistStore.getState().setSearch },
    { key: 'scope', value: scopeFilter, defaultValue: 'all', setValue: useAdminBlacklistStore.getState().setScopeFilter },
    { key: 'gym', value: gymFilter, defaultValue: 'all', setValue: useAdminBlacklistStore.getState().setGymFilter },
    { key: 'page', value: currentPage, defaultValue: 1, setValue: (value) => setCurrentPage(Math.max(1, Number(value) || 1)) },
  ]);

  const queryParams = { page: currentPage, limit: BLACKLIST_ITEMS_PER_PAGE, search: search || undefined, scope: scopeFilter === 'all' ? undefined : (scopeFilter as BlacklistScope), gymId: gymFilter === 'all' ? undefined : gymFilter };
  const blacklistQuery = useQuery({ queryKey: ['admin', 'blacklist', 'list', queryParams], queryFn: () => blacklistApi.fetchBlacklist(queryParams), staleTime: 1000 * 60 * 2 });
  const crossGymQuery = useQuery({ queryKey: ['admin', 'blacklist', 'cross-gym'], queryFn: () => blacklistApi.fetchBlacklist({ page: 1, limit: 100, scope: 'specific' }), staleTime: 1000 * 60 * 2 });

  const { data: kpis } = useQuery({
    queryKey: ['admin', 'blacklist', 'kpis'],
    queryFn: () => blacklistApi.fetchKPIs().then((r) => r.data),
    staleTime: 1000 * 60 * 5,
  });

  const membersData = blacklistQuery.data?.data ?? [];
  const totalItems = blacklistQuery.data?.meta?.total ?? membersData.length;
  const status = blacklistQuery.status;
  const paginated = membersData;
  const gymSpecificEntries = (crossGymQuery.data?.data ?? []).filter((m: BlacklistedMember) => m.scope === 'specific' && m.isActive);

  const addMutation = useMutation({
    mutationFn: (payload: BlacklistFormValues) => blacklistApi.addToBlacklist(payload),
    onSuccess: (response) => { adminToast.success(response.message, 'admin-success-05f887bf44'); setShowModal(false); qc.invalidateQueries({ queryKey: ['admin', 'blacklist', 'list'] }); },
    onError: (err) => adminToast.error((err as Error).message, 'admin-error-1f0bf3da16'),
  });

  const removeMutation = useMutation({
    mutationFn: ({ id, idempotencyKey }: { id: string; idempotencyKey: string }) => blacklistApi.removeFromBlacklist(id, idempotencyKey),
    onSuccess: (response, variables) => { adminToast.success(response.message, 'admin-success-d13beab19d'); idempotencyKeysRef.current.delete(`remove-blacklist:${variables.id}`); qc.invalidateQueries({ queryKey: ['admin', 'blacklist', 'list'] }); },
    onError: (err) => adminToast.error((err as Error).message, 'admin-error-e6e7045880'),
  });

  const toggleMutation = useMutation({
    mutationFn: ({ id, idempotencyKey }: { id: string; idempotencyKey: string }) => blacklistApi.toggleBlacklist(id, idempotencyKey),
    onSuccess: (response, variables) => { adminToast.success(response.message, 'admin-success-40f1704ed7'); idempotencyKeysRef.current.delete(`toggle-blacklist:${variables.id}`); qc.invalidateQueries({ queryKey: ['admin', 'blacklist', 'list'] }); },
    onError: (err) => adminToast.error((err as Error).message, 'admin-error-547e47fc01'),
  });

  const propagateMutation = useMutation({
    mutationFn: ({ id, idempotencyKey }: { id: string; idempotencyKey: string }) => blacklistApi.propagateToAllBranches(id, idempotencyKey),
    onSuccess: (response, variables) => { adminToast.success(response.message, 'admin-success-52cccb7033'); idempotencyKeysRef.current.delete(`propagate-blacklist:${variables.id}`); qc.invalidateQueries({ queryKey: ['admin', 'blacklist', 'list'] }); },
    onError: (err) => adminToast.error((err as Error).message, 'admin-error-86b564e1d9'),
  });

  const openAdd = useCallback(() => { setForm(EMPTY_BLACKLIST_FORM); setShowModal(true); }, [setForm, setShowModal]);

  const saveBlacklist = useCallback((data: BlacklistFormValues) => { addMutation.mutate(data); }, [addMutation]);

  const removeFromBlacklist = useCallback(async (id: string, name: string) => {
    const intentId = `remove-blacklist:${id}`;
    const ok = await confirm({ title: 'Remove from Blacklist', message: `Remove ${name} from the blacklist? They will regain access to assigned gyms.`, confirmText: 'Remove', type: 'danger' });
    if (!ok) { clearIntentKey(intentId); return; }
    removeMutation.mutate({ id, idempotencyKey: getIntentKey(intentId) });
  }, [clearIntentKey, confirm, removeMutation, getIntentKey]);

  const toggleBlacklist = useCallback(async (id: string) => {
    const target = membersData.find((member) => member.id === id);
    if (!target) return;
    const nextAction = target.isActive ? 'restore' : 'blacklist';
    const intentId = `toggle-blacklist:${id}`;
    const confirmed = await confirm({      title: nextAction === 'blacklist' ? 'Add to Blacklist' : 'Restore Member',
      message: nextAction === 'blacklist'
        ? `Blacklist ${target.memberName}? They will be blocked according to the selected scope.`
        : `Restore ${target.memberName}? Their current blacklist restriction will be removed.`,
      confirmText: nextAction === 'blacklist' ? 'Blacklist' : 'Restore',
      type: 'danger',
    });
    if (!confirmed) { clearIntentKey(intentId); return; }
    toggleMutation.mutate({ id, idempotencyKey: getIntentKey(intentId) });
  }, [clearIntentKey, confirm, getIntentKey, membersData, toggleMutation]);

  const propagateToAllBranches = useCallback(async (id: string, name: string) => {
    const intentId = `propagate-blacklist:${id}`;
    const ok = await confirm({
      title: 'Propagate Ban to All Branches',
      message: `Upgrade ${name}'s gym-specific ban to a GLOBAL ban? This will block them from every branch immediately.`,
      confirmText: 'Propagate',
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