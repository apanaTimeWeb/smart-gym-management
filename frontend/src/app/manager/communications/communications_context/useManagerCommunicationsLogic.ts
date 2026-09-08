// RESPONSIBILITY: Business logic hook for the Manager Communications module.
// DATA FLOW: ManagerCommunicationsApi → useManagerCommunicationsLogic → ManagerCommunicationsMain → child components
'use client';

import { useCallback } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { ManagerCommunicationsApi } from '@/app/manager/communications/communications_api/ManagerCommunicationsApi';
import { useManagerCommunicationsStore } from '@/app/manager/communications/communications_store/useManagerCommunicationsStore';
import { COMM_ITEMS_PER_PAGE, COMM_MESSAGE_TEMPLATES, COMM_SEGMENT_OPTIONS } from '@/app/manager/communications/communications_utils/ManagerCommunicationsSharedConstants';
import type { CommFormValues, CommSegment, FetchState } from '@/app/manager/communications/communications_types/communications_types';

export function useManagerCommunicationsLogic() {
  const qc = useQueryClient();
  const store = useManagerCommunicationsStore();

  // --- Server state ---
  const { data: campaigns = [], isLoading: campaignsLoading, isError: campaignsError } = useQuery({
    queryKey: ['managerCommunications', 'campaigns'],
    queryFn: ManagerCommunicationsApi.fetchCampaigns,
    staleTime: 1000 * 60 * 2,
  });

  const { data: kpis } = useQuery({
    queryKey: ['managerCommunications', 'kpis'],
    queryFn: ManagerCommunicationsApi.fetchKPIs,
    staleTime: 1000 * 60 * 5,
  });

  const { data: segmentRecipients = [], isFetching: loadingRecipients } = useQuery({
    queryKey: ['managerCommunications', 'segment', store.selectedSegment],
    queryFn: () => ManagerCommunicationsApi.fetchSegmentRecipients(store.selectedSegment),
    enabled: store.selectedSegment !== 'custom',
    staleTime: 1000 * 60,
  });

  const fetchState: FetchState = campaignsLoading ? 'loading' : campaignsError ? 'error' : 'success';

  // --- Filtered history ---
  const filteredCampaigns = campaigns.filter(c => {
    const matchSearch = !store.historySearch || c.title.toLowerCase().includes(store.historySearch.toLowerCase());
    const matchChannel = store.historyChannelFilter === 'all' || c.channel === store.historyChannelFilter;
    return matchSearch && matchChannel;
  });

  const totalPages = Math.max(1, Math.ceil(filteredCampaigns.length / COMM_ITEMS_PER_PAGE));
  const paginatedCampaigns = filteredCampaigns.slice(
    (store.currentPage - 1) * COMM_ITEMS_PER_PAGE,
    store.currentPage * COMM_ITEMS_PER_PAGE
  );

  // --- Send mutation ---
  const sendMutation = useMutation({
    mutationFn: (payload: CommFormValues & { recipientCount: number; segmentLabel: string }) =>
      ManagerCommunicationsApi.sendCampaign(payload),
    onSuccess: () => {
      toast.success('Campaign queued successfully');
      store.resetComposer();
      store.setActiveTab('history');
      qc.invalidateQueries({ queryKey: ['managerCommunications'] });
    },
    onError: (err) => toast.error((err as Error).message),
  });

  /** Called when segment changes — auto-fills the message template. */
  const handleSegmentChange = useCallback((segment: CommSegment) => {
    store.setSelectedSegment(segment);
    const tpl = COMM_MESSAGE_TEMPLATES[segment];
    store.setComposerMessage(tpl.message);
    store.setComposerSubject(tpl.subject);
  }, [store]);

  const handleSend = useCallback(() => {
    const segmentLabel = COMM_SEGMENT_OPTIONS.find(o => o.value === store.selectedSegment)?.label ?? store.selectedSegment;
    sendMutation.mutate({
      title:          store.composerTitle,
      channel:        store.selectedChannel,
      segment:        store.selectedSegment,
      message:        store.composerMessage,
      subject:        store.composerSubject,
      recipientCount: segmentRecipients.length,
      segmentLabel,
    });
  }, [store, segmentRecipients.length, sendMutation]);

  return {
    // KPIs
    kpis,
    // Tabs
    activeTab: store.activeTab,
    setActiveTab: store.setActiveTab,
    // Composer
    selectedSegment: store.selectedSegment,
    selectedChannel: store.selectedChannel,
    setSelectedChannel: store.setSelectedChannel,
    composerTitle: store.composerTitle,
    setComposerTitle: store.setComposerTitle,
    composerMessage: store.composerMessage,
    setComposerMessage: store.setComposerMessage,
    composerSubject: store.composerSubject,
    setComposerSubject: store.setComposerSubject,
    handleSegmentChange,
    segmentRecipients,
    loadingRecipients,
    handleSend,
    sending: sendMutation.isPending,
    // History
    paginatedCampaigns,
    filteredCampaigns,
    fetchState,
    historySearch: store.historySearch,
    setHistorySearch: store.setHistorySearch,
    historyChannelFilter: store.historyChannelFilter,
    setHistoryChannelFilter: store.setHistoryChannelFilter,
    currentPage: store.currentPage,
    setCurrentPage: store.setCurrentPage,
    totalPages,
  };
}
