'use client';
import { useQuery } from '@tanstack/react-query';
import { ManagerCommunicationsApi } from '@/app/frontend_manager/manager_communications/manager_communications_api/ManagerCommunicationsApi';
import { ManagerCommunicationsQueryKeys } from '@/app/frontend_manager/manager_communications/manager_communications_constants/ManagerCommunicationsQueryKeys';
import type { CommSegment } from '@/app/frontend_manager/manager_communications/manager_communications_types/ManagerCommunicationsTypes';
/** Orchestrates the owning Manager feature behavior while preserving its documented state boundary. */
/**
 * @description Coordinates communications feature state and its documented UI/API boundary through useManagerCommunicationsQueries.
 * @dependencies Uses ManagerCommunicationsApi, ManagerCommunicationsTypes.
 * @edge-case surfaces request errors without exposing transport details; preserves explicit loading state until the query or mutation settles.
 */
/** @description Module-owned custom hook for the owning Manager feature. @dependencies Uses documented module state/API infrastructure only. @edge-case Preserves loading, empty, error, retry, and permission-sensitive behavior defined by the feature contract. */
// DATA FLOW: Feature API/Query or module UI state → custom hook → owning feature component
/**
 * @description useManagerCommunicationsQueries owns the communications feature-level flow described by the module contract.
 * @dependencies Uses feature-owned APIs, query keys, schemas, types, constants, stores, and approved global infrastructure only.
 * @edge-case Preserves loading, empty, error, retry, cancellation, permission, and direct-URL behavior documented for this flow.
 */
export function useManagerCommunicationsQueries(selectedSegment: CommSegment, search: string, channel: string, page: number) {
  const { data: campaignsResponse, isPending: campaignsLoading, isError: campaignsError, error: campaignsErrorValue } = useQuery({
    queryKey: ManagerCommunicationsQueryKeys.campaigns({ search, channel, page, limit: 10 }),
    queryFn: () => ManagerCommunicationsApi.fetchCampaigns({ search, channel, page: String(page), limit: '10' }),
    staleTime: 1000 * 60 * 2 });
  const campaigns = campaignsResponse?.data?.campaigns ?? [];
  const campaignsTotal = campaignsResponse?.data?.total ?? 0;

  const { data: kpisResponse } = useQuery({
    queryKey: ManagerCommunicationsQueryKeys.kpis(),
    queryFn: ManagerCommunicationsApi.fetchCommunicationKPIs,
    staleTime: 1000 * 60 * 5 });
  const kpis = kpisResponse?.data || undefined;

  const { data: segmentRecipientsResponse, isFetching: loadingRecipients } = useQuery({
    queryKey: ManagerCommunicationsQueryKeys.segment(selectedSegment),
    queryFn: () => ManagerCommunicationsApi.fetchSegmentRecipients(selectedSegment),
    enabled: selectedSegment !== 'custom',
    staleTime: 1000 * 60 });
  const segmentRecipients = segmentRecipientsResponse?.data || [];

  const { data: automationsResponse, isPending: automationsLoading } = useQuery({
    queryKey: ManagerCommunicationsQueryKeys.automations(),
    queryFn: ManagerCommunicationsApi.fetchAutomations,
    staleTime: 1000 * 60 * 5 });
  const automations = automationsResponse?.data || [];

  return {
    campaigns,
    campaignsTotal,
    campaignsLoading,
    campaignsError,
    campaignsErrorValue,
    kpis,
    segmentRecipients,
    loadingRecipients,
    automations,
    automationsLoading };
}
