'use client';
// RESPONSIBILITY: Business logic hook for the Manager Communications module.
// DATA FLOW: ManagerCommunicationsApi -> useManagerCommunicationsLogic -> ManagerCommunicationsMain -> child components
/** Manages UseCommunicationsLogic for the Manager module. */
import { useCallback } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { useManagerCommunicationsStore, type CommActiveTab } from '@/app/manager/communications/communications_store/ManagerUseManagerCommunicationsStore';
import { COMM_ITEMS_PER_PAGE, COMM_SEGMENT_OPTIONS } from '@/app/manager/communications/communications_utils/ManagerCommunicationsSharedConstants';
import { COMM_MESSAGE_TEMPLATES } from '@/app/manager/communications/communications_fixtures/ManagerCommunicationsMockData';
import type { CommFormValues, CommSegment, CommAutomation } from '@/app/manager/communications/communications_types/ManagerCommunications_types';
import { useManagerCommunicationsQueries } from '@/app/manager/communications/communications_context/ManagerUseManagerCommunicationsQueries';
import { useManagerCommunicationsMutations } from '@/app/manager/communications/communications_context/ManagerUseManagerCommunicationsMutations';

export function useManagerCommunicationsLogic() {
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
    campaignsTotal,
    campaignsLoading,
    campaignsError,
    kpis,
    segmentRecipients,
    loadingRecipients,
    automations,
    automationsLoading,
  } = useManagerCommunicationsQueries(store.selectedSegment, historySearch, historyChannelFilter, currentPage);

  const isLoading = campaignsLoading;
  const isError = campaignsError;

  const paginatedCampaigns = campaigns;
  const totalPages = Math.max(1, Math.ceil((campaignsTotal || 0) / COMM_ITEMS_PER_PAGE));
  const filteredCampaigns = campaigns;

  const { sendMutation, automationMutation } = useManagerCommunicationsMutations();


  /** Called when segment changes - auto-fills the message template. */
  const handleSegmentChange = useCallback((segment: CommSegment) => {
    store.setSelectedSegment(segment);
  }, [store]);

  const handleSend = useCallback((form: CommFormValues) => {
    const segmentLabel = COMM_SEGMENT_OPTIONS.find(o => o.value === store.selectedSegment)?.label ?? store.selectedSegment;
    sendMutation.mutate({
      title:          form.title,
      channel:        form.channel,
      segment:        form.segment,
      message:        form.message,
      subject:        form.subject,
      recipientCount: segmentRecipients.length,
      segmentLabel,
    });
  }, [store.selectedSegment, segmentRecipients.length, sendMutation]);

  return {
    kpis,
    activeTab,
    setActiveTab,
    selectedSegment: store.selectedSegment,
    selectedChannel: store.selectedChannel,
    setSelectedChannel: store.setSelectedChannel,
    templateDefaults: COMM_MESSAGE_TEMPLATES[store.selectedSegment],
    handleSegmentChange,
    segmentRecipients,
    loadingRecipients,
    handleSend,
    sending: sendMutation.isPending,
    paginatedCampaigns,
    filteredCampaigns,
    isLoading, isError,
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
