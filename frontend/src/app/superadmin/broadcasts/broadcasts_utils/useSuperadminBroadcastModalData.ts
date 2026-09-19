// DATA FLOW: SuperadminBroadcastModal → useSuperadminBroadcastModalData → Broadcasts API → TanStack Query cache.
'use client';

import { useQuery } from '@tanstack/react-query';
import { broadcastsApi } from '@/app/superadmin/broadcasts/broadcasts_api/SuperadminBroadcastsApi';
import type { SuperadminBroadcastsTenant } from '@/app/superadmin/broadcasts/broadcasts_types/SuperadminBroadcastsTypes';

/**
 * Purpose: Owns server-state reads required by the Broadcast create/edit modal.
 * Input: enabled flag controlled by modal visibility and no business state.
 * Output: tenant options, loading/error state, and recipient-count preview data.
 */
export function useSuperadminBroadcastModalData(enabled: boolean, shouldLoadRecipientCount: boolean) {
  const tenantsQuery = useQuery({
    queryKey: ['superadmin', 'broadcasts', 'modal-tenants'],
    queryFn: () => broadcastsApi.fetchTenants(),
    enabled,
  });

  const recipientCountQuery = useQuery({
    queryKey: ['superadmin', 'broadcasts', 'modal-recipient-count'],
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
