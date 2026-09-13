'use client';

import { useQuery } from '@tanstack/react-query';
import { ManagerCommunicationsApi } from '@/app/manager/communications/communications_api/ManagerCommunicationsApi';
import type { CommSegment } from '@/app/manager/communications/communications_types/communications_types';

export function useManagerCommunicationsQueries(selectedSegment: CommSegment) {
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
    queryKey: ['managerCommunications', 'segment', selectedSegment],
    queryFn: () => ManagerCommunicationsApi.fetchSegmentRecipients(selectedSegment),
    enabled: selectedSegment !== 'custom',
    staleTime: 1000 * 60,
  });

  const { data: automations = [], isLoading: automationsLoading } = useQuery({
    queryKey: ['managerCommunications', 'automations'],
    queryFn: ManagerCommunicationsApi.fetchAutomations,
    staleTime: 1000 * 60 * 5,
  });

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
