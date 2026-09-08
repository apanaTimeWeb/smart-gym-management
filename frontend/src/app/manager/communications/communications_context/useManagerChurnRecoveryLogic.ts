// RESPONSIBILITY: Business logic hook for the Churn Recovery / Win-Back tab.
// DATA FLOW: ManagerCommunicationsApi → useManagerChurnRecoveryLogic → ManagerChurnRecoveryTab → child components
'use client';

import { useCallback, useMemo } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { ManagerCommunicationsApi } from '@/app/manager/communications/communications_api/ManagerCommunicationsApi';
import { useManagerCommunicationsStore } from '@/app/manager/communications/communications_store/useManagerCommunicationsStore';
import {
  CHURN_ITEMS_PER_PAGE,
  CHURN_WIN_BACK_TEMPLATES,
} from '@/app/manager/communications/communications_utils/ManagerCommunicationsSharedConstants';
import type {
  ChurnedMember,
  CommChannel,
  FetchState,
  WinBackTemplateTier,
} from '@/app/manager/communications/communications_types/communications_types';

export function useManagerChurnRecoveryLogic() {
  const qc = useQueryClient();
  const store = useManagerCommunicationsStore();

  // ─── Server State ───────────────────────────────────────────────────────────

  const {
    data: churnedMembers = [],
    isLoading: churnLoading,
    isError: churnError,
  } = useQuery({
    queryKey: ['managerCommunications', 'churn', 'members'],
    queryFn: ManagerCommunicationsApi.fetchChurnedMembers,
    staleTime: 1000 * 60 * 3,
  });

  const { data: churnKPIs } = useQuery({
    queryKey: ['managerCommunications', 'churn', 'kpis'],
    queryFn: ManagerCommunicationsApi.fetchChurnKPIs,
    staleTime: 1000 * 60 * 5,
  });

  const fetchState: FetchState = churnLoading ? 'loading' : churnError ? 'error' : 'success';

  // ─── Filtered + Paginated Members ──────────────────────────────────────────

  const filteredMembers = useMemo(() => {
    return churnedMembers.filter((m: ChurnedMember) => {
      const matchSearch = !store.churnSearch
        || m.name.toLowerCase().includes(store.churnSearch.toLowerCase());
      const matchReason = store.churnReasonFilter === 'all'
        || m.reason === store.churnReasonFilter;
      return matchSearch && matchReason;
    });
  }, [churnedMembers, store.churnSearch, store.churnReasonFilter]);

  const totalPages = Math.max(1, Math.ceil(filteredMembers.length / CHURN_ITEMS_PER_PAGE));
  const paginatedMembers = filteredMembers.slice(
    (store.churnCurrentPage - 1) * CHURN_ITEMS_PER_PAGE,
    store.churnCurrentPage * CHURN_ITEMS_PER_PAGE,
  );

  // ─── Derive template tier from days since exit ──────────────────────────────

  const getTemplateTier = useCallback((daysSinceExit: number): WinBackTemplateTier => {
    if (daysSinceExit <= 7)  return '7_days';
    if (daysSinceExit <= 30) return '30_days';
    return '90_days';
  }, []);

  // ─── Win-Back Mutation ──────────────────────────────────────────────────────

  const winBackMutation = useMutation({
    mutationFn: (payload: {
      memberId: string;
      memberName: string;
      phone: string;
      email: string;
      channel: CommChannel;
      templateTier: WinBackTemplateTier;
      message: string;
      subject: string;
    }) => ManagerCommunicationsApi.sendWinBackMessage(payload),
    onSuccess: () => {
      toast.success('Win-back message sent successfully');
      store.closeChurnComposer();
      qc.invalidateQueries({ queryKey: ['managerCommunications'] });
    },
    onError: (err) => toast.error((err as Error).message),
  });

  // ─── Exposed Handlers ───────────────────────────────────────────────────────

  /** Opens the win-back composer drawer for a specific churned member. */
  const handleOpenComposer = useCallback((memberId: string) => {
    store.openChurnComposer(memberId);
  }, [store]);

  /** Sends a win-back message for the given member. */
  const handleSendWinBack = useCallback((
    member: ChurnedMember,
    channel: CommChannel,
    templateTier: WinBackTemplateTier,
    message: string,
    subject: string,
  ) => {
    winBackMutation.mutate({
      memberId: member.memberId,
      memberName: member.name,
      phone: member.phone,
      email: member.email,
      channel,
      templateTier,
      message,
      subject,
    });
  }, [winBackMutation]);

  /** Returns the selected churned member object by ID from store. */
  const selectedMember = useMemo(
    () => churnedMembers.find((m: ChurnedMember) => m.memberId === store.selectedChurnedMemberId) ?? null,
    [churnedMembers, store.selectedChurnedMemberId],
  );

  return {
    // KPIs
    churnKPIs,
    // Table data
    paginatedMembers,
    filteredMembers,
    fetchState,
    totalPages,
    // Filters
    churnSearch: store.churnSearch,
    setChurnSearch: store.setChurnSearch,
    churnReasonFilter: store.churnReasonFilter,
    setChurnReasonFilter: store.setChurnReasonFilter,
    churnCurrentPage: store.churnCurrentPage,
    setChurnCurrentPage: store.setChurnCurrentPage,
    // Composer drawer
    isChurnComposerOpen: store.isChurnComposerOpen,
    openChurnComposer: handleOpenComposer,
    closeChurnComposer: store.closeChurnComposer,
    selectedMember,
    // Send
    handleSendWinBack,
    isSending: winBackMutation.isPending,
    // Utilities
    getTemplateTier,
    CHURN_WIN_BACK_TEMPLATES,
  };
}
