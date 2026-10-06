'use client';
// DATA FLOW: SuperadminBroadcastsBroadcastModal → useSuperadminBroadcastsBroadcastModalData → Broadcasts API → TanStack Query cache.
import { useQuery } from '@tanstack/react-query';

import { broadcastsApi } from '@/app/frontend_superadmin/superadmin_broadcasts/superadmin_broadcasts_api/SuperadminBroadcastsApi';
import { SUPERADMIN_BROADCASTS_QUERY_KEYS } from '@/app/frontend_superadmin/superadmin_broadcasts/superadmin_broadcasts_constants/SuperadminBroadcastsQueryKeys';

import type { SuperadminBroadcastsTenant } from '@/app/frontend_superadmin/superadmin_broadcasts/superadmin_broadcasts_types/SuperadminBroadcastsTypes';



/**
 * Purpose: Owns server-state reads required by the Broadcast create/edit modal.
 * Input: enabled flag controlled by modal visibility and no business state.
 * Output: tenant options, loading/error state, and recipient-count preview data.
 */
/**
 * @description Manages broadcasts state, queries, and UI interactions for useSuperadminBroadcastsBroadcastModalData.
 * @dependencies Consumes only owning-module state/API contracts and approved global infrastructure.
 * @edge-case Preserves loading, error, cancellation, retry, and repeated-action behavior.
 */
// DATA FLOW: Module API/query/store state → useSuperadminBroadcastsBroadcastModalData → consuming feature component.
export function useSuperadminBroadcastsBroadcastModalData(enabled: boolean, shouldLoadRecipientCount: boolean) {
  const tenantsQuery = useQuery({
    queryKey: SUPERADMIN_BROADCASTS_QUERY_KEYS.modalTenants,
    queryFn: () => broadcastsApi.fetchTenants(),
    enabled,
  });

  const recipientCountQuery = useQuery({
    queryKey: SUPERADMIN_BROADCASTS_QUERY_KEYS.modalRecipientCount,
    queryFn: () => broadcastsApi.fetchRecipientCount(),
    enabled: enabled && shouldLoadRecipientCount,
  });

  return {
    gyms: (tenantsQuery.data?.data as SuperadminBroadcastsTenant[] | undefined) ?? [],
    isPendingGyms: tenantsQuery.isPending,
    gymsError: tenantsQuery.error,
    recipientCount: recipientCountQuery.data?.data?.count,
    isRecipientCountLoading: recipientCountQuery.isPending,
  };
}
