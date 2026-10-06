'use client';
// DATA FLOW: URL/local UI state or feature input → feature hook → module-owned TanStack Query/Zustand mutation/query → observable UI result.
import { useCallback } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { COMM_ITEMS_PER_PAGE, COMM_SEGMENT_OPTIONS, COMM_MESSAGE_TEMPLATES } from '@/app/frontend_manager/manager_communications/manager_communications_constants/ManagerCommunicationsSharedConstants';
import { useManagerCommunicationsMutations } from '@/app/frontend_manager/manager_communications/manager_communications_hooks/useManagerCommunicationsMutations';
import { useManagerCommunicationsQueries } from '@/app/frontend_manager/manager_communications/manager_communications_hooks/useManagerCommunicationsQueries';
import { useManagerCommunicationsStore } from '@/app/frontend_manager/manager_communications/manager_communications_store/useManagerCommunicationsStore';
import { useManagerDebounce } from '@/app/frontend_manager/manager_infrastructure/useManagerDebounce';
import type { CommActiveTab } from '@/app/frontend_manager/manager_communications/manager_communications_types/ManagerCommunicationsTypes';
import type { CommFormValues, CommSegment, CommAutomation } from '@/app/frontend_manager/manager_communications/manager_communications_types/ManagerCommunicationsTypes';


/** Orchestrates the owning Manager feature behavior while preserving its documented state boundary. */
/**
 * @description Coordinates communications feature state and its documented UI/API boundary through useManagerCommunicationsLogic.
 * @dependencies Uses useManagerCommunicationsMutations, useManagerCommunicationsQueries, useManagerCommunicationsStore, ManagerCommunicationsSharedConstants.
 * @edge-case surfaces request errors without exposing transport details; preserves explicit loading state until the query or mutation settles; preserves shareable filter, search, sort, or pagination state in the URL.
 */
/** @description Module-owned custom hook for the owning Manager feature. @dependencies Uses documented module state/API infrastructure only. @edge-case Preserves loading, empty, error, retry, and permission-sensitive behavior defined by the feature contract. */
// DATA FLOW: Feature API/Query or module UI state → custom hook → owning feature component
/**
 * @description useManagerCommunicationsLogic owns the communications feature-level flow described by the module contract.
 * @dependencies Uses feature-owned APIs, query keys, schemas, types, constants, stores, and approved global infrastructure only.
 * @edge-case Preserves loading, empty, error, retry, cancellation, permission, and direct-URL behavior documented for this flow.
 */
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

  const { sendMutation, automationMutation, sendCampaign, updateAutomation } = useManagerCommunicationsMutations();


  /** Called when segment changes - auto-fills the message template. */
  const handleSegmentChange = useCallback((segment: CommSegment) => {
    store.setSelectedSegment(segment);
  }, [store]);

  const handleSend = useCallback((form: CommFormValues) => {
    const segmentLabel = COMM_SEGMENT_OPTIONS.find(o => o.value === store.selectedSegment)?.label ?? store.selectedSegment;
    sendCampaign({
      title: form.title,
      channel: form.channel,
      segment: form.segment,
      message: form.message,
      subject: form.subject,
      recipientCount: segmentRecipients.length,
      segmentLabel,
    });
  }, [segmentRecipients.length, sendCampaign, store.selectedSegment]);

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
    updateAutomation,
    isUpdatingAutomation: automationMutation.isPending };
}
