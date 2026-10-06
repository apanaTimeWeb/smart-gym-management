'use client';
// DATA FLOW: View → useSuperadminGlobalAuditExportMutation → feature export API → acknowledgement.
// RESPONSIBILITY: Owns the Global Audit export mutation lifecycle and idempotency key. No JSX.
import { useRef } from 'react';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { superadminGlobalAuditExportApi } from '@/app/frontend_superadmin/superadmin_global_audit/superadmin_global_audit_api/SuperadminGlobalAuditExportApi';
import { SUPERADMIN_AUDIT_QUERY_KEYS } from '@/app/frontend_superadmin/superadmin_global_audit/superadmin_global_audit_constants/SuperadminGlobalAuditQueryKeys';



/**
 * @description Executes a Global Audit export request with a stable per-attempt idempotency key.
 * @dependencies Uses the feature export API and TanStack Query mutation state.
 * @edge-case A failed request keeps the key for the retry attempt; a successful request clears it before the next export.
 */
export function useSuperadminGlobalAuditExportMutation() {
  const queryClient = useQueryClient();
  const idempotencyKeyRef = useRef<string | null>(null);
  const mutation = useMutation({
    mutationFn: async () => {
      idempotencyKeyRef.current ??= crypto.randomUUID();
      const response = await superadminGlobalAuditExportApi.requestExport(idempotencyKeyRef.current);
      if (!response.success) throw new Error(response.message);
      idempotencyKeyRef.current = null;
      return response;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: SUPERADMIN_AUDIT_QUERY_KEYS.all });
    },
  });
  return { requestExport: () => mutation.mutateAsync(), isRequesting: mutation.isPending };
}
