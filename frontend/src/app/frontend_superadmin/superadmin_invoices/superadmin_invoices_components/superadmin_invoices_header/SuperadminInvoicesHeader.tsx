'use client';
/**
 * RESPONSIBILITY: React component SuperadminInvoicesHeader owned by the superadmin_invoices feature boundary.
 * INTENT: Keep this file’s presentation, logic, and state responsibility isolated from unrelated business modules.
 * STATE DEPENDENCIES: No React/client state primitive detected.
 * MODULE DEPENDENCIES: lucide-react, @/app/frontend_superadmin/superadmin_invoices/superadmin_invoices_hooks/useSuperadminInvoicesInvoiceActions, @/app/frontend_superadmin/superadmin_invoices/superadmin_invoices_components/SuperadminInvoicesDateFilterDropdown, @/app/frontend_superadmin/superadmin_invoices/superadmin_invoices_types/SuperadminInvoicesHeaderTypes
 * EDGE CASES: Preserve implemented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 * REPAIR CONSTRAINT: Cross-feature business dependencies require explicit documentation; do not move business logic into global UI infrastructure.
 */
// RESPONSIBILITY: Renders invoice page actions and delegates export behavior to the invoice action hook.
import { Plus, ArrowUpRight } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';

import { SuperadminInvoicesDateFilterDropdown } from '@/app/frontend_superadmin/superadmin_invoices/superadmin_invoices_components/SuperadminInvoicesDateFilterDropdown';
import { useSuperadminInvoicesInvoiceActions } from '@/app/frontend_superadmin/superadmin_invoices/superadmin_invoices_hooks/useSuperadminInvoicesInvoiceActions';

import type { SuperadminInvoicesHeaderProps } from '@/app/frontend_superadmin/superadmin_invoices/superadmin_invoices_types/SuperadminInvoicesHeaderTypes';



/**
 * @description Owns the SuperadminInvoicesHeader responsibility within the superadmin_role feature boundary.
 * @dependencies Delegates domain behavior to the feature-local dependencies imported by this file.
 * @state Keeps server state in TanStack Query and module UI state in the owning feature state layer where applicable.
 * @edge-cases Preserves documented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 */
export default function SuperadminInvoicesHeader({ onLogPaymentClick }: SuperadminInvoicesHeaderProps) {
  const t = useTranslations('superadmin_invoices');
  const { exportInvoices, isExporting } = useSuperadminInvoicesInvoiceActions();
  const handleExportCSV = async () => {
    try {
      const response = await exportInvoices();
      toast.success(response.message, { id: 'invoice-export' });
    } catch (error: unknown) {
      toast.error(t('ui.invoice_export_error_retry_7c4e1b8d'), { id: 'invoice-export' });
    }
  };
  return (
    <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
      <div><h1 className="text-3xl font-bold text-primary">{t('ui.saas_revenue_amp_invoices_658922fe')}</h1><p className="mt-1 text-secondary">{t('ui.track_actual_payments_from_gym_owners_via_st_74241b46')}</p></div>
      <div className="flex flex-wrap items-center gap-3">
        <SuperadminInvoicesDateFilterDropdown />
        <button type="button" onClick={onLogPaymentClick} className="flex min-h-11 items-center gap-2 rounded-lg border border-border bg-input px-4 py-2 font-medium text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary motion-safe:transition-all motion-safe:duration-base motion-safe:ease-in-out motion-safe:active:scale-95" data-testid="superadmin_invoices-superadmin-invoices-header-header-log-manual-payment"><Plus size={18} strokeWidth={2} aria-hidden="true"/>{t('ui.log_manual_payment_e15e5207')}</button>
        <button type="button" onClick={() => void handleExportCSV()} disabled={isExporting} className="flex min-h-11 items-center gap-2 rounded-lg bg-primary px-4 py-2 font-medium text-on-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:cursor-not-allowed disabled:opacity-60 motion-safe:transition-all motion-safe:duration-base motion-safe:ease-in-out motion-safe:active:scale-95" data-testid="superadmin_invoices-superadmin-invoices-header-superadmin-invoices-header-button"><ArrowUpRight size={18} strokeWidth={2} aria-hidden="true"/>{isExporting ? t('ui.exporting_6cf5a1d2') : t('ui.export_csv_0e36f4bc')}</button>
      </div>
    </div>
  );
}
