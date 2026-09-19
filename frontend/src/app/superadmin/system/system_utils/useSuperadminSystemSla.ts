// RESPONSIBILITY: Owns System SLA query state and downtime-credit mutation.
'use client';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { systemApi } from '@/app/superadmin/system/system_api/SuperadminSystemApi';
/**
 * Purpose: Encapsulates the SLA table's server reads and credit action.
 * Inputs: SLA query parameters and optional tenant credit action.
 * Output: query, mutation action, pending/error state.
 * Side effects: invalidates SLA query state after successful credit issuance.
 * Invariant: server SLA state is never stored in Zustand or local component state.
 */
export function useSuperadminSystemSla(queryParams?: Record<string, string>) {
  const queryClient = useQueryClient();
  const query = useQuery({ queryKey: ['superadmin', 'system', 'sla', queryParams], queryFn: () => systemApi.fetchSystemInfo(queryParams) });
  const credit = useMutation({ mutationFn: ({ tenantId, idempotencyKey }: { tenantId: string; idempotencyKey: string }) => systemApi.issueDowntimeCredit(tenantId, idempotencyKey), onSuccess: async (response) => { if (!response.success) throw new Error(response.message); await queryClient.invalidateQueries({ queryKey: ['superadmin', 'system', 'sla'] }); } });
  return { query, issueCredit: (tenantId: string, idempotencyKey: string) => credit.mutateAsync({ tenantId, idempotencyKey }), isIssuing: credit.isPending, issueError: credit.error };
}
