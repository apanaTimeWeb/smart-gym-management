// RESPONSIBILITY: Business logic hook for the Manager Communications module.
// DATA FLOW: ManagerCommunicationsApi -> useManagerCommunicationsLogic -> ManagerCommunicationsMain -> child components
'use client';

import { useCallback } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { ManagerCommunicationsApi } from '@/app/manager/communications/communications_api/ManagerCommunicationsApi';
import { useManagerCommunicationsStore, type CommActiveTab } from '@/app/manager/communications/communications_store/useManagerCommunicationsStore';
import { COMM_ITEMS_PER_PAGE, COMM_SEGMENT_OPTIONS } from '@/app/manager/communications/communications_utils/ManagerCommunicationsSharedConstants';
import { COMM_MESSAGE_TEMPLATES } from '@/app/manager/communications/communications_fixtures/ManagerCommunicationsMockData';
import type { CommFormValues, CommSegment, FetchState, CommAutomation } from '@/app/manager/communications/communications_types/communications_types';
import { useManagerCommunicationsQueries } from '@/app/manager/communications/communications_context/useManagerCommunicationsQueries';

export function useManagerCommunicationsLogic() {
  const qc = useQueryClient();
  const store = useManagerCommunicationsStore();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // URL state
  const activeTab = (searchParams.get('tab') as CommActiveTab) || store.activeTab;
  const currentPage = searchParams.has('page') ? Number(searchParams.get('page')) : store.currentPage;
  const historySearch = searchParams.get('search') ?? store.historySearch;
  const historyChannelFilter = searchParams.get('channel') ?? store.historyChannelFilter;

  const updateURL = useCallback((params: Record<string, string | null>) => {
    const newParams = new URLSearchParams(searchParams.toString());
    Object.entries(params).forEach(([k, v]) => {
      if (v === null) newParams.delete(k);
      else newParams.set(k, v);
    });
    router.replace(`${pathname}?${newParams.toString()}`);
  }, [searchParams, pathname, router]);

  const setActiveTab = useCallback((tab: string) => {
    store.setActiveTab(tab as CommActiveTab);
    updateURL({ tab });
  }, [store, updateURL]);

  const setCurrentPage = useCallback((p: number) => {
    store.setCurrentPage(p);
    updateURL({ page: p.toString() });
  }, [store, updateURL]);

  const setHistorySearch = useCallback((s: string) => {
    store.setHistorySearch(s);
    updateURL({ search: s || null, page: '1' });
  }, [store, updateURL]);

  const setHistoryChannelFilter = useCallback((c: string) => {
    store.setHistoryChannelFilter(c);
    updateURL({ channel: c === 'all' ? null : c, page: '1' });
  }, [store, updateURL]);

  // --- Server state ---
  const {
    campaigns,
    campaignsLoading,
    campaignsError,
    kpis,
    segmentRecipients,
    loadingRecipients,
    automations,
    automationsLoading,
  } = useManagerCommunicationsQueries(store.selectedSegment);

  const fetchState: FetchState = campaignsLoading ? 'loading' : campaignsError ? 'error' : 'success';

  // --- Filtered history ---
  const filteredCampaigns = campaigns.filter(c => {
    const matchSearch = !historySearch || c.title.toLowerCase().includes(historySearch.toLowerCase());
    const matchChannel = historyChannelFilter === 'all' || c.channel === historyChannelFilter;
    return matchSearch && matchChannel;
  });

  const totalPages = Math.max(1, Math.ceil(filteredCampaigns.length / COMM_ITEMS_PER_PAGE));
  const paginatedCampaigns = filteredCampaigns.slice(
    (currentPage - 1) * COMM_ITEMS_PER_PAGE,
    currentPage * COMM_ITEMS_PER_PAGE
  );

  const sendMutation = useMutation({
    mutationFn: (payload: CommFormValues & { recipientCount: number; segmentLabel: string }) =>
      ManagerCommunicationsApi.sendCampaign(payload),
    onSuccess: (res) => {
      toast.success(res.message || 'Campaign queued successfully');
      store.resetComposer();
      setActiveTab('history');
      qc.invalidateQueries({ queryKey: ['manager', 'communications'] });
    },
    onError: (err) => toast.error((err as Error).message),
  });

  const automationMutation = useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: Partial<CommAutomation> }) =>
      ManagerCommunicationsApi.updateAutomation(id, payload),
    onSuccess: (res) => {
      qc.invalidateQueries({ queryKey: ['manager', 'communications', 'automations'] });
      toast.success(res.message || 'Automation updated successfully');
    },
    onError: (err) => toast.error((err as Error).message),
  });


  /** Called when segment changes - auto-fills the message template. */
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
    kpis,
    activeTab,
    setActiveTab,
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
    paginatedCampaigns,
    filteredCampaigns,
    fetchState,
    historySearch,
    setHistorySearch,
    historyChannelFilter,
    setHistoryChannelFilter,
    currentPage,
    setCurrentPage,
    totalPages,
    automations,
    automationsLoading,
    updateAutomation: (id: string, payload: Partial<CommAutomation>) => automationMutation.mutate({ id, payload }),
    isUpdatingAutomation: automationMutation.isPending,
  };
}
