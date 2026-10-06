'use client';
// DATA FLOW: URL/local UI state or feature input → feature hook → module-owned TanStack Query/Zustand mutation/query → observable UI result.
import { useCallback, useMemo } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { CANCELLATIONS_ITEMS_PER_PAGE } from '@/app/frontend_manager/manager_communications/manager_communications_constants/ManagerCommunicationsSharedConstants';
import { CANCELLATIONS_WIN_BACK_TEMPLATES } from '@/app/frontend_manager/manager_communications/manager_communications_constants/ManagerCommunicationsSharedConstants';
import { useManagerCommunicationsChurnRecoveryMutations } from '@/app/frontend_manager/manager_communications/manager_communications_hooks/useManagerCommunicationsChurnRecoveryMutations';
import { useManagerCommunicationsChurnRecoveryQueries } from '@/app/frontend_manager/manager_communications/manager_communications_hooks/useManagerCommunicationsChurnRecoveryQueries';
import { useManagerCommunicationsStore } from '@/app/frontend_manager/manager_communications/manager_communications_store/useManagerCommunicationsStore';
import type { ChurnedMember, CommChannel, WinBackTemplateTier } from '@/app/frontend_manager/manager_communications/manager_communications_types/ManagerCommunicationsTypes';


/** Orchestrates the owning Manager feature behavior while preserving its documented state boundary. */
/**
 * @description Coordinates communications feature state and its documented UI/API boundary through useManagerCommunicationsChurnRecoveryLogic.
 * @dependencies Uses useManagerCommunicationsChurnRecoveryMutations, useManagerCommunicationsChurnRecoveryQueries, useManagerCommunicationsStore, ManagerCommunicationsSharedConstants.
 * @edge-case surfaces request errors without exposing transport details; preserves explicit loading state until the query or mutation settles; preserves shareable filter, search, sort, or pagination state in the URL.
 */
/** @description Module-owned custom hook for the owning Manager feature. @dependencies Uses documented module state/API infrastructure only. @edge-case Preserves loading, empty, error, retry, and permission-sensitive behavior defined by the feature contract. */
// DATA FLOW: Feature API/Query or module UI state → custom hook → owning feature component
/**
 * @description useManagerCommunicationsChurnRecoveryLogic owns the communications feature-level flow described by the module contract.
 * @dependencies Uses feature-owned APIs, query keys, schemas, types, constants, stores, and approved global infrastructure only.
 * @edge-case Preserves loading, empty, error, retry, cancellation, permission, and direct-URL behavior documented for this flow.
 */
export function useManagerCommunicationsChurnRecoveryLogic() {
  const store = useManagerCommunicationsStore();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // URL state
  const churnSearch = searchParams.get('c_search') ?? '';
  const churnReasonFilter = searchParams.get('c_reason') ?? 'all';
  const churnCurrentPage = Math.max(1, Number(searchParams.get('c_page')) || 1);

  const updateURL = useCallback((params: Record<string, string | null>) => {
    const newParams = new URLSearchParams(searchParams.toString());
    Object.entries(params).forEach(([k, v]) => {
      if (v === null) newParams.delete(k);
      else newParams.set(k, v);
    });
    router.replace(`${pathname}?${newParams.toString()}`);
  }, [searchParams, pathname, router]);

  const setChurnSearch = useCallback((s: string) => {
    updateURL({ c_search: s || null, c_page: null });
  }, [updateURL]);

  const setChurnReasonFilter = useCallback((r: string) => {
    updateURL({ c_reason: r === 'all' ? null : r, c_page: null });
  }, [updateURL]);

  const setChurnCurrentPage = useCallback((p: number) => {
    updateURL({ c_page: p > 1 ? p.toString() : null });
  }, [updateURL]);

  const { churnedMembers, churnLoading, churnError, churnErrorValue, churnKPIs } = useManagerCommunicationsChurnRecoveryQueries();
  const { winBackMutation, sendWinBackMessage } = useManagerCommunicationsChurnRecoveryMutations(store.closeChurnComposer);

  const isPending = churnLoading;
  const isError = churnError;
  const errorMessage = churnErrorValue instanceof Error ? churnErrorValue.message : '';

  const filteredMembers = useMemo(() => {
    return churnedMembers.filter((m: ChurnedMember) => {
      const matchSearch = !churnSearch || m.name.toLowerCase().includes(churnSearch.toLowerCase());
      const matchReason = churnReasonFilter === 'all' || m.reason === churnReasonFilter;
      return matchSearch && matchReason;
    });
  }, [churnedMembers, churnSearch, churnReasonFilter]);

  const totalPages = Math.max(1, Math.ceil(filteredMembers.length / CANCELLATIONS_ITEMS_PER_PAGE));
  const paginatedMembers = filteredMembers.slice((churnCurrentPage - 1) * CANCELLATIONS_ITEMS_PER_PAGE, churnCurrentPage * CANCELLATIONS_ITEMS_PER_PAGE);

  const getTemplateTier = useCallback((daysSinceExit: number): WinBackTemplateTier => {
    if (daysSinceExit <= 7) return '7_days';
    if (daysSinceExit <= 30) return '30_days';
    return '90_days';
  }, []);

  const handleOpenComposer = useCallback((memberId: string) => {
    store.openChurnComposer(memberId);
  }, [store]);

  const handleSendWinBack = useCallback((
    member: ChurnedMember,
    channel: CommChannel,
    templateTier: WinBackTemplateTier,
    message: string,
    subject: string,
  ) => {
    sendWinBackMessage({ memberId: member.memberId, memberName: member.name, phone: member.phone, email: member.email, channel, templateTier, message, subject });
  }, [sendWinBackMessage]);

  const selectedMember = useMemo(
    () => churnedMembers.find((m: ChurnedMember) => m.memberId === store.selectedChurnedMemberId) ?? null,
    [churnedMembers, store.selectedChurnedMemberId],
  );

  return {
    churnKPIs,
    paginatedMembers,
    filteredMembers,
    isPending, isError, errorMessage,
    totalPages,
    churnSearch,
    setChurnSearch,
    churnReasonFilter,
    setChurnReasonFilter,
    churnCurrentPage,
    setChurnCurrentPage,
    isChurnComposerOpen: store.isChurnComposerOpen,
    openChurnComposer: handleOpenComposer,
    closeChurnComposer: store.closeChurnComposer,
    selectedMember,
    handleSendWinBack,
    isSending: winBackMutation.isPending,
    getTemplateTier,
    CANCELLATIONS_WIN_BACK_TEMPLATES };
}
