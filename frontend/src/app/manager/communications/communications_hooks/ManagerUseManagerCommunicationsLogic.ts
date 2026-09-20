// DATA FLOW: ManagerCommunicationsApi -> useManagerCommunicationsLogic -> ManagerCommunicationsMain -> child components
// RESPONSIBILITY: Business logic hook for the Manager Communications module.
'use client';
/** Manages UseCommunicationsLogic for the Manager module. */
import { useCallback } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { useManagerCommunicationsMutations } from '@/app/manager/communications/communications_hooks/ManagerUseManagerCommunicationsMutations';
import { useManagerCommunicationsQueries } from '@/app/manager/communications/communications_hooks/ManagerUseManagerCommunicationsQueries';
import { useManagerCommunicationsStore } from '@/app/manager/communications/communications_store/ManagerUseManagerCommunicationsStore';
import { COMM_ITEMS_PER_PAGE, COMM_SEGMENT_OPTIONS, COMM_MESSAGE_TEMPLATES } from '@/app/manager/communications/communications_utils/ManagerCommunicationsSharedConstants';
import { useManagerDebounce } from '@/app/manager/manager_infrastructure/ManagerDebounce';
import type { CommActiveTab } from '@/app/manager/communications/communications_types/ManagerCommunications_types';
import type { CommFormValues, CommSegment, CommAutomation } from '@/app/manager/communications/communications_types/ManagerCommunications_types';


/** Orchestrates the owning Manager feature behavior while preserving its documented state boundary. */
export function useManagerCommunicationsLogic() {
  const store = useManagerCommunicationsStore();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // URL state
  const activeTab = (searchParams.get('tab') as CommActiveTab) || 'compose';
  const currentPage = Math.max(1, Number(searchParams.get('page')) || 1);
  const historySearch = searchParams.get('search') ?? '';
  const historyChannelFilter = searchParams.get('channel') ?? 'all';
  const debouncedHistorySearch = useManagerDebounce(historySearch, 300);

  const updateURL = useCallback((params: Record<string, string | null>) => {
    const newParams = new URLSearchParams(searchParams.toString());
    Object.entries(params).forEach(([k, v]) => {
      if (v === null) newParams.delete(k);
      else newParams.set(k, v);
    });
    router.replace(`${pathname}?${newParams.toString()}`);
  }, [searchParams, pathname, router]);

  const setActiveTab = useCallback((tab: CommActiveTab) => {
    updateURL({ tab, page: null });
  }, [updateURL]);

  const setCurrentPage = useCallback((p: number) => {
    updateURL({ page: p > 1 ? p.toString() : null });
  }, [updateURL]);

  const setHistorySearch = useCallback((s: string) => {
    updateURL({ search: s || null, page: null });
  }, [updateURL]);

  const setHistoryChannelFilter = useCallback((c: string) => {
    updateURL({ channel: c === 'all' ? null : c, page: null });
  }, [updateURL]);

  // --- Server state ---
  const {
    campaigns,
    campaignsTotal,
    campaignsLoading,
    campaignsError, campaignsErrorValue,
    kpis,
    segmentRecipients,
    loadingRecipients,
    automations,
    automationsLoading } = useManagerCommunicationsQueries(store.selectedSegment, debouncedHistorySearch, historyChannelFilter, currentPage);

  const isPending = campaignsLoading;
  const isError = campaignsError;
  const errorMessage = campaignsErrorValue instanceof Error ? campaignsErrorValue.message : '';

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
      segmentLabel });
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
    isPending, isError, errorMessage,
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
    isUpdatingAutomation: automationMutation.isPending };
}
