"use client";
// DATA FLOW: feature API/schema → hook/context → useAdminBlacklistLogic consumers.
// RESPONSIBILITY: Business logic hook for the Blacklist module.

import { useCallback } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { adminToast } from '@/app/admin/admin_components/AdminFeedback/AdminToastService';
import { blacklistApi } from '@/app/admin/blacklist/blacklist_api/AdminBlacklistApi';
import { useAdminBlacklistStore } from '@/app/admin/blacklist/blacklist_store/useAdminBlacklistStore';
import { useAdminUrlQuerySync } from '@/app/admin/admin_utils/useAdminUrlQuerySync';
import { useAdminConfirm } from '@/app/admin/admin_components/AdminFeedback/useAdminConfirm';
import { BLACKLIST_ITEMS_PER_PAGE, EMPTY_BLACKLIST_FORM } from '@/app/admin/blacklist/blacklist_utils/AdminBlacklistSharedConstants';
import type { BlacklistFormValues, BlacklistedMember } from '@/app/admin/blacklist/blacklist_types/AdminBlacklistTypes';

export function useAdminBlacklistLogic() {
  const { confirm } = useAdminConfirm();
  const qc = useQueryClient();
  const { activeTab, setActiveTab, showModal, setShowModal, form, setForm, search, scopeFilter, gymFilter, currentPage, setCurrentPage } = useAdminBlacklistStore();
  useAdminUrlQuerySync([
    { key: 'search', value: search, defaultValue: '', setValue: useAdminBlacklistStore.getState().setSearch },
    { key: 'scope', value: scopeFilter, defaultValue: 'all', setValue: useAdminBlacklistStore.getState().setScopeFilter },
    { key: 'gym', value: gymFilter, defaultValue: 'all', setValue: useAdminBlacklistStore.getState().setGymFilter },
    { key: 'page', value: currentPage, defaultValue: 1, setValue: (value) => setCurrentPage(Math.max(1, Number(value) || 1)) },
  ]);

  const blacklistQuery = useQuery({
    queryKey: ['admin', 'blacklist', 'list'],
    queryFn: () => blacklistApi.fetchBlacklist().then((r) => r.data as BlacklistedMember[]),
    staleTime: 1000 * 60 * 2,
  });

  const { data: kpis } = useQuery({
    queryKey: ['admin', 'blacklist', 'kpis'],
    queryFn: () => blacklistApi.fetchKPIs().then((r) => r.data),
    staleTime: 1000 * 60 * 5,
  });

  const membersData = blacklistQuery.data ?? [];
  const status = blacklistQuery.status;

  const filtered = membersData.filter((m: BlacklistedMember) => {
    const matchSearch = !search || m.memberName.toLowerCase().includes(search.toLowerCase()) || m.memberId.toLowerCase().includes(search.toLowerCase()) || m.memberPhone.includes(search);
    const matchScope = scopeFilter === 'all' || m.scope === scopeFilter;
    const matchGym = gymFilter === 'all' || m.assignedGyms.includes(gymFilter) || m.assignedGyms.includes('all');
    return matchSearch && matchScope && matchGym;
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / BLACKLIST_ITEMS_PER_PAGE));
  const paginated = filtered.slice((currentPage - 1) * BLACKLIST_ITEMS_PER_PAGE, currentPage * BLACKLIST_ITEMS_PER_PAGE);

  /** Cross-branch view: only gym-specific bans, grouped by member phone for deduplication. */
  const gymSpecificEntries = membersData.filter((m: BlacklistedMember) => m.scope === 'specific' && m.isActive);

  const addMutation = useMutation({
    mutationFn: (payload: BlacklistFormValues) => blacklistApi.addToBlacklist(payload),
    onSuccess: (response) => { adminToast.success(response.message, 'admin-success-05f887bf44'); setShowModal(false); qc.invalidateQueries({ queryKey: ['admin', 'blacklist', 'list'] }); },
    onError: (err) => adminToast.error((err as Error).message, 'admin-error-1f0bf3da16'),
  });

  const removeMutation = useMutation({
    mutationFn: (id: string) => blacklistApi.removeFromBlacklist(id),
    onSuccess: (response) => { adminToast.success(response.message, 'admin-success-d13beab19d'); qc.invalidateQueries({ queryKey: ['admin', 'blacklist', 'list'] }); },
    onError: (err) => adminToast.error((err as Error).message, 'admin-error-e6e7045880'),
  });

  const toggleMutation = useMutation({
    mutationFn: (id: string) => blacklistApi.toggleBlacklist(id),
    onSuccess: (response) => { adminToast.success(response.message, 'admin-success-40f1704ed7'); qc.invalidateQueries({ queryKey: ['admin', 'blacklist', 'list'] }); },
    onError: (err) => adminToast.error((err as Error).message, 'admin-error-547e47fc01'),
  });

  const propagateMutation = useMutation({
    mutationFn: (id: string) => blacklistApi.propagateToAllBranches(id),
    onSuccess: (response) => { adminToast.success(response.message, 'admin-success-52cccb7033'); qc.invalidateQueries({ queryKey: ['admin', 'blacklist', 'list'] }); },
    onError: (err) => adminToast.error((err as Error).message, 'admin-error-86b564e1d9'),
  });

  const openAdd = useCallback(() => { setForm(EMPTY_BLACKLIST_FORM); setShowModal(true); }, [setForm, setShowModal]);

  const saveBlacklist = useCallback((data: BlacklistFormValues) => { addMutation.mutate(data); }, [addMutation]);

  const removeFromBlacklist = useCallback(async (id: string, name: string) => {
    const ok = await confirm({ title: 'Remove from Blacklist', message: `Remove ${name} from the blacklist? They will regain access to assigned gyms.`, confirmText: 'Remove', type: 'danger' });
    if (!ok) return;
    removeMutation.mutate(id);
  }, [confirm, removeMutation]);

  const toggleBlacklist = useCallback(async (id: string) => {
    const target = filtered.find((member) => member.id === id);
    if (!target) return;
    const nextAction = target.isActive ? 'restore' : 'blacklist';
    const confirmed = await confirm({
      title: nextAction === 'blacklist' ? 'Add to Blacklist' : 'Restore Member',
      message: nextAction === 'blacklist'
        ? `Blacklist ${target.memberName}? They will be blocked according to the selected scope.`
        : `Restore ${target.memberName}? Their current blacklist restriction will be removed.`,
      confirmText: nextAction === 'blacklist' ? 'Blacklist' : 'Restore',
      type: 'danger',
    });
    if (!confirmed) return;
    toggleMutation.mutate(id);
  }, [confirm, filtered, toggleMutation]);

  const propagateToAllBranches = useCallback(async (id: string, name: string) => {
    const ok = await confirm({
      title: 'Propagate Ban to All Branches',
      message: `Upgrade ${name}'s gym-specific ban to a GLOBAL ban? This will block them from every branch immediately.`,
      confirmText: 'Propagate',
      type: 'danger',
    });
    if (!ok) return;
    propagateMutation.mutate(id);
  }, [confirm, propagateMutation]);

  return {
    members: paginated, allMembers: filtered, gymSpecificEntries, status, kpis,
    activeTab, setActiveTab,
    showModal, setShowModal, form, openAdd, saveBlacklist,
    removeFromBlacklist, toggleBlacklist, propagateToAllBranches,
    saving: addMutation.isPending,
    propagating: propagateMutation.isPending,
    currentPage, setCurrentPage, totalPages, totalItems: filtered.length,
  };
}