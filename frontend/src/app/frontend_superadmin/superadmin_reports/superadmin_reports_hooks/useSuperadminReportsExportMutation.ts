'use client';
// DATA FLOW: Reports export control → mutation → feature export API → success/error toast.
// RESPONSIBILITY: Owns export-request lifecycle and idempotency for the Reports feature.
import { useRef } from 'react';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { SUPERADMIN_REPORTS_QUERY_KEYS } from '@/app/frontend_superadmin/superadmin_reports/superadmin_reports_constants/SuperadminReportsQueryKeys';
import { superadminReportsExportApi } from '@/app/frontend_superadmin/superadmin_reports/superadmin_reports_api/SuperadminReportsExportApi';



/**
 * @description Starts the documented Reports export request and exposes its pending state to the action control.
 * @dependencies Uses the feature export API and TanStack Query mutation lifecycle.
 * @edge-case The key is created when the export intent starts, reused across retries, and cleared only after a successful authoritative response.
 */
export function useSuperadminReportsExportMutation() {
  const queryClient = useQueryClient();
  const idempotencyKeyRef = useRef<string | null>(null);
  const mutation = useMutation({
    mutationFn: (idempotencyKey: string) => superadminReportsExportApi.requestExport(idempotencyKey),
    onSuccess: (response) => {
      void queryClient.invalidateQueries({ queryKey: SUPERADMIN_REPORTS_QUERY_KEYS.all });
      toast.success(response.message, { id: 'superadmin-reports-export' });
      idempotencyKeyRef.current = null;
    },
    onError: (error: unknown) => {
      toast.error(error instanceof Error ? error.message : String(error), { id: 'superadmin-reports-export-error' });
    },
  });
  const requestExport = () => { idempotencyKeyRef.current ??= crypto.randomUUID(); return mutation.mutateAsync(idempotencyKeyRef.current); };
  return { requestExport, isRequesting: mutation.isPending };
}
