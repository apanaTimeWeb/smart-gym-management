'use client';
// DATA FLOW: Manager module state/API data → useManagerChurnRecoveryQueries → owning Manager UI components.
/** Manages UseChurnRecoveryQueries for the Manager module. */
import { useQuery } from '@tanstack/react-query';
import { ManagerCommunicationsApi } from '@/app/manager/communications/communications_api/ManagerCommunicationsApi';

export function useManagerChurnRecoveryQueries() {
  const {
    data: churnedMembersResponse,
    isLoading: churnLoading,
    isError: churnError,
    error: churnErrorValue } = useQuery({
    queryKey: ['manager', 'communications', 'churn', 'members'],
    queryFn: ManagerCommunicationsApi.fetchChurnedMembers,
    staleTime: 1000 * 60 * 3 });
  const churnedMembers = churnedMembersResponse?.data || [];

  const { data: churnKPIsResponse } = useQuery({
    queryKey: ['manager', 'communications', 'churn', 'kpis'],
    queryFn: ManagerCommunicationsApi.fetchChurnKPIs,
    staleTime: 1000 * 60 * 5 });
  const churnKPIs = churnKPIsResponse?.data || undefined;

  return {
    churnedMembers,
    churnLoading,
    churnError,
    churnErrorValue,
    churnKPIs };
}
