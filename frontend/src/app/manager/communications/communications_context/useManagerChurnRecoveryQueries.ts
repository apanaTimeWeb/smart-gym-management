'use client';

import { useQuery } from '@tanstack/react-query';
import { ManagerCommunicationsApi } from '@/app/manager/communications/communications_api/ManagerCommunicationsApi';

export function useManagerChurnRecoveryQueries() {
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

  return {
    churnedMembers,
    churnLoading,
    churnError,
    churnKPIs,
  };
}
