'use client';
// RESPONSIBILITY: Business logic hook for the Churn Recovery / Win-Back tab.
// DATA FLOW: ManagerCommunicationsApi -> useManagerChurnRecoveryLogic -> ManagerChurnRecoveryTab -> child components
import { useCallback, useMemo } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { useManagerCommunicationsStore } from '@/app/manager/communications/communications_store/useManagerCommunicationsStore';
import { CHURN_ITEMS_PER_PAGE } from '@/app/manager/communications/communications_utils/ManagerCommunicationsSharedConstants';
import { CHURN_WIN_BACK_TEMPLATES } from '@/app/manager/communications/communications_fixtures/ManagerCommunicationsMockData';
import type { ChurnedMember, CommChannel, FetchState, WinBackTemplateTier } from '@/app/manager/communications/communications_types/communications_types';
import { useManagerChurnRecoveryQueries } from '@/app/manager/communications/communications_context/useManagerChurnRecoveryQueries';
import { useManagerChurnRecoveryMutations } from '@/app/manager/communications/communications_context/useManagerChurnRecoveryMutations';

export function useManagerChurnRecoveryLogic() {
  const store = useManagerCommunicationsStore();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // URL state
  const churnSearch = searchParams.get('c_search') ?? store.churnSearch;
  const churnReasonFilter = searchParams.get('c_reason') ?? store.churnReasonFilter;
  const churnCurrentPage = searchParams.has('c_page') ? Number(searchParams.get('c_page')) : store.churnCurrentPage;

  const updateURL = useCallback((params: Record<string, string | null>) => {
    const newParams = new URLSearchParams(searchParams.toString());
    Object.entries(params).forEach(([k, v]) => {
      if (v === null) newParams.delete(k);
      else newParams.set(k, v);
    });
    router.replace(`${pathname}?${newParams.toString()}`);
  }, [searchParams, pathname, router]);

  const setChurnSearch = useCallback((s: string) => {
    store.setChurnSearch(s);
    updateURL({ c_search: s || null, c_page: '1' });
  }, [store, updateURL]);

  const setChurnReasonFilter = useCallback((r: string) => {
    store.setChurnReasonFilter(r);
    updateURL({ c_reason: r === 'all' ? null : r, c_page: '1' });
  }, [store, updateURL]);

  const setChurnCurrentPage = useCallback((p: number) => {
    store.setChurnCurrentPage(p);
    updateURL({ c_page: p.toString() });
  }, [store, updateURL]);

  const { churnedMembers, churnLoading, churnError, churnKPIs } = useManagerChurnRecoveryQueries();
  const { winBackMutation } = useManagerChurnRecoveryMutations(store.closeChurnComposer);

  const fetchState: FetchState = churnLoading ? 'loading' : churnError ? 'error' : 'success';

  const filteredMembers = useMemo(() => {
    return churnedMembers.filter((m: ChurnedMember) => {
      const matchSearch = !churnSearch || m.name.toLowerCase().includes(churnSearch.toLowerCase());
      const matchReason = churnReasonFilter === 'all' || m.reason === churnReasonFilter;
      return matchSearch && matchReason;
    });
  }, [churnedMembers, churnSearch, churnReasonFilter]);

  const totalPages = Math.max(1, Math.ceil(filteredMembers.length / CHURN_ITEMS_PER_PAGE));
  const paginatedMembers = filteredMembers.slice((churnCurrentPage - 1) * CHURN_ITEMS_PER_PAGE, churnCurrentPage * CHURN_ITEMS_PER_PAGE);

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
    winBackMutation.mutate({ memberId: member.memberId, memberName: member.name, phone: member.phone, email: member.email, channel, templateTier, message, subject });
  }, [winBackMutation]);

  const selectedMember = useMemo(
    () => churnedMembers.find((m: ChurnedMember) => m.memberId === store.selectedChurnedMemberId) ?? null,
    [churnedMembers, store.selectedChurnedMemberId],
  );

  return {
    churnKPIs,
    paginatedMembers,
    filteredMembers,
    fetchState,
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
    CHURN_WIN_BACK_TEMPLATES,
  };
}
