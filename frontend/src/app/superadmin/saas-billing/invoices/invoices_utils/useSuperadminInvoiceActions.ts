// RESPONSIBILITY: Owns invoice export/download/email actions for Superadmin invoice surfaces.
'use client';
import { useMutation } from '@tanstack/react-query';
import { invoicesApi } from '@/app/superadmin/saas-billing/invoices/invoices_api/SuperadminInvoicesApi';
/**
 * Purpose: Encapsulates asynchronous invoice actions so table/header views remain presentation-focused.
 * Inputs: invoice identifier or optional export parameters.
 * Output: feature action functions and pending flags.
 * Side effects: browser navigation/window opening only after validated API responses.
 * Invariant: invoice components do not import the API service directly.
 */
export function useSuperadminInvoiceActions() {
  const exportMutation = useMutation({ mutationFn: (params?: Record<string, string>) => invoicesApi.exportInvoiceReport(params) });
  const downloadMutation = useMutation({ mutationFn: (id: string) => invoicesApi.fetchInvoiceDownloadUrl(id) });
  const resendMutation = useMutation({ mutationFn: (id: string) => invoicesApi.resendInvoiceEmail(id) });
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
    resendInvoice: (id: string) => resendMutation.mutateAsync(id),
    isExporting: exportMutation.isPending,
    isDownloading: downloadMutation.isPending,
    isResending: resendMutation.isPending,
  };
}
