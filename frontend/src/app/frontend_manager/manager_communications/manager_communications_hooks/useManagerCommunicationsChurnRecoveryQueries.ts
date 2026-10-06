'use client';
import { useQuery } from '@tanstack/react-query';
import { ManagerCommunicationsApi } from '@/app/frontend_manager/manager_communications/manager_communications_api/ManagerCommunicationsApi';
import { ManagerCommunicationsQueryKeys } from '@/app/frontend_manager/manager_communications/manager_communications_constants/ManagerCommunicationsQueryKeys';
/** Orchestrates the owning Manager feature behavior while preserving its documented state boundary. */
/**
 * @description Coordinates communications feature state and its documented UI/API boundary through useManagerCommunicationsChurnRecoveryQueries.
 * @dependencies Uses ManagerCommunicationsApi.
 * @edge-case surfaces request errors without exposing transport details; preserves explicit loading state until the query or mutation settles.
 */
/** @description Module-owned custom hook for the owning Manager feature. @dependencies Uses documented module state/API infrastructure only. @edge-case Preserves loading, empty, error, retry, and permission-sensitive behavior defined by the feature contract. */
// DATA FLOW: Feature API/Query or module UI state → custom hook → owning feature component
/**
 * @description useManagerCommunicationsChurnRecoveryQueries owns the communications feature-level flow described by the module contract.
 * @dependencies Uses feature-owned APIs, query keys, schemas, types, constants, stores, and approved global infrastructure only.
 * @edge-case Preserves loading, empty, error, retry, cancellation, permission, and direct-URL behavior documented for this flow.
 */
export function useManagerCommunicationsChurnRecoveryQueries() {
  const {
    data: churnedMembersResponse,
    isPending: churnLoading,
    isError: churnError,
    error: churnErrorValue } = useQuery({
    queryKey: ManagerCommunicationsQueryKeys.churnMembers(),
    queryFn: ManagerCommunicationsApi.fetchChurnedMembers,
    staleTime: 1000 * 60 * 3 });
  const churnedMembers = churnedMembersResponse?.data || [];

  const { data: churnKPIsResponse } = useQuery({
    queryKey: ManagerCommunicationsQueryKeys.churnKpis(),
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
