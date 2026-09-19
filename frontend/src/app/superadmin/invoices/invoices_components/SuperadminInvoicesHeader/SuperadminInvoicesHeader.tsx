// RESPONSIBILITY: Renders invoice page actions and delegates export behavior to the invoice action hook.
'use client';
import { Plus, ArrowUpRight } from 'lucide-react';
import toast from 'react-hot-toast';
import { useSuperadminInvoiceActions } from '@/app/superadmin/invoices/invoices_utils/useSuperadminInvoiceActions';
import { SuperadminDateFilterDropdown } from '@/app/superadmin/superadmin_components/SuperadminShared/SuperadminDateFilterDropdown';
import type { SuperadminInvoicesHeaderProps } from '@/app/superadmin/invoices/invoices_types/SuperadminInvoicesHeaderTypes';



export default function SuperadminInvoicesHeader({ onLogPaymentClick }: SuperadminInvoicesHeaderProps) {
  const { exportInvoices, isExporting } = useSuperadminInvoiceActions();
  const handleExportCSV = async () => {
    try {
      const response = await exportInvoices();
      toast.success(response.message, { id: 'invoice-export' });
    } catch (error: unknown) {
      toast.error(error instanceof Error ? error.message : '', { id: 'invoice-export' });
    }
  };
  return (
    <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
      <div><h1 className="text-3xl font-bold text-primary">SaaS Revenue &amp; Invoices</h1><p className="mt-1 text-secondary">Track actual payments from gym owners via Stripe/Razorpay.</p></div>
      <div className="flex flex-wrap items-center gap-3">
        <SuperadminDateFilterDropdown />
        <button type="button" onClick={onLogPaymentClick} className="flex min-h-11 items-center gap-2 rounded-lg border border-border bg-input px-4 py-2 font-medium text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary motion-safe:transition-all motion-safe:duration-base motion-safe:ease-in-out motion-safe:active:scale-95"><Plus size={18} strokeWidth={2} aria-hidden="true" />Log Manual Payment</button>
        <button type="button" onClick={() => void handleExportCSV()} disabled={isExporting} className="flex min-h-11 items-center gap-2 rounded-lg bg-primary px-4 py-2 font-medium text-on-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:cursor-not-allowed disabled:opacity-60 motion-safe:transition-all motion-safe:duration-base motion-safe:ease-in-out motion-safe:active:scale-95"><ArrowUpRight size={18} strokeWidth={2} aria-hidden="true" />{isExporting ? 'Exporting...' : 'Export CSV'}</button>
      </div>
    </div>
  );
}
