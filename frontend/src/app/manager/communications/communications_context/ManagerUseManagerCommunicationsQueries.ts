'use client';
// DATA FLOW: Manager module state/API data → useManagerCommunicationsQueries → owning Manager UI components.
/** Manages UseCommunicationsQueries for the Manager module. */
import { useQuery } from '@tanstack/react-query';
import { ManagerCommunicationsApi } from '@/app/manager/communications/communications_api/ManagerCommunicationsApi';
import type { CommSegment } from '@/app/manager/communications/communications_types/ManagerCommunications_types';

export function useManagerCommunicationsQueries(selectedSegment: CommSegment) {
  const { data: campaignsResponse, isLoading: campaignsLoading, isError: campaignsError } = useQuery({
    queryKey: ['manager', 'communications', 'campaigns'],
    queryFn: ManagerCommunicationsApi.fetchCampaigns,
    staleTime: 1000 * 60 * 2,
  });
  const campaigns = campaignsResponse?.data || [];

  const { data: kpisResponse } = useQuery({
    queryKey: ['manager', 'communications', 'kpis'],
    queryFn: ManagerCommunicationsApi.fetchKPIs,
    staleTime: 1000 * 60 * 5,
  });
  const kpis = kpisResponse?.data || undefined;

  const { data: segmentRecipientsResponse, isFetching: loadingRecipients } = useQuery({
    queryKey: ['manager', 'communications', 'segment', selectedSegment],
    queryFn: () => ManagerCommunicationsApi.fetchSegmentRecipients(selectedSegment),
    enabled: selectedSegment !== 'custom',
    staleTime: 1000 * 60,
  });
  const segmentRecipients = segmentRecipientsResponse?.data || [];

  const { data: automationsResponse, isLoading: automationsLoading } = useQuery({
    queryKey: ['manager', 'communications', 'automations'],
    queryFn: ManagerCommunicationsApi.fetchAutomations,
    staleTime: 1000 * 60 * 5,
  });
  const automations = automationsResponse?.data || [];

  return {
    campaigns,
    campaignsLoading,
    campaignsError,
    kpis,
    segmentRecipients,
    loadingRecipients,
    automations,
    automationsLoading,
  };
}
