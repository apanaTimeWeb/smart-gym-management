'use client';// DATA FLOW: Inputs enter useSuperadminInvoicesInvoiceActions, flow through its feature-owned state/API dependencies, and return typed UI state/actions to the owning Superadmin feature.
// RESPONSIBILITY: Owns invoice export/download/email actions for Superadmin invoice surfaces.
import { useRef } from 'react';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { invoicesApi } from '@/app/frontend_superadmin/superadmin_invoices/superadmin_invoices_api/SuperadminInvoicesApi';
import { SUPERADMIN_INVOICES_QUERY_KEYS } from '@/app/frontend_superadmin/superadmin_invoices/superadmin_invoices_constants/SuperadminInvoicesQueryKeys';


/**
 * Purpose: Encapsulates asynchronous invoice actions so table/header views remain presentation-focused.
 * Inputs: invoice identifier or optional export parameters.
 * Output: feature action functions and pending flags.
 * Side effects: browser navigation/window opening only after validated API responses.
 * Invariant: invoice components do not import the API service directly.
 */
/**
 * @description Manages invoices state, queries, and UI interactions for useSuperadminInvoicesInvoiceActions.
 * @dependencies Consumes only owning-module state/API contracts and approved global infrastructure.
 * @edge-case Preserves loading, error, cancellation, retry, and repeated-action behavior.
 */
// DATA FLOW: Module API/query/store state → useSuperadminInvoicesInvoiceActions → consuming feature component.
export function useSuperadminInvoicesInvoiceActions() {
  const queryClient = useQueryClient();
  const resendKeysRef = useRef(new Map<string, string>());
  const exportMutation = useMutation({
    mutationFn: (params?: Record<string, string>) => invoicesApi.exportInvoiceReport(params),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: SUPERADMIN_INVOICES_QUERY_KEYS.recoveryCenter });
    },
  });
  const downloadMutation = useMutation({
    mutationFn: (id: string) => invoicesApi.fetchInvoiceDownloadUrl(id),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: SUPERADMIN_INVOICES_QUERY_KEYS.recoveryCenter });
    },
  });
  const resendMutation = useMutation({
    mutationFn: ({ id, idempotencyKey }: { id: string; idempotencyKey: string }) => invoicesApi.resendInvoiceEmail(id, idempotencyKey),
    onSuccess: async (response, variables) => {
      resendKeysRef.current.delete(variables.id);
      if (response.success) await queryClient.invalidateQueries({ queryKey: SUPERADMIN_INVOICES_QUERY_KEYS.all });
    },
  });
  return {
    exportInvoices: async (params?: Record<string, string>) => {
      const response = await exportMutation.mutateAsync(params);
      if (!response.success || !response.data?.downloadUrl) throw new Error(response.message);
      window.open(response.data.downloadUrl, '_blank');
      return response;
    },
    downloadInvoice: async (id: string) => {
      const response = await downloadMutation.mutateAsync(id);
      if (!response.success || !response.data?.downloadUrl) throw new Error(response.message);
      window.open(response.data.downloadUrl, '_blank');
      return response;
    },
    resendInvoice: (id: string) => resendMutation.mutateAsync({ id, idempotencyKey: resendKeysRef.current.get(id) ?? (resendKeysRef.current.set(id, crypto.randomUUID()).get(id) as string) }),
    isExporting: exportMutation.isPending,
    isDownloading: downloadMutation.isPending,
    isResending: resendMutation.isPending,
  };
}
