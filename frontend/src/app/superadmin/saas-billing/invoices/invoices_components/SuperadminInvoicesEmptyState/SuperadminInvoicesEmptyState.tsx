// RESPONSIBILITY: Renders the empty state UI for the Invoices table when no invoices exist. Shows icon, message, and CTA to log first payment.
'use client';
import { Receipt } from 'lucide-react';
import type { SuperadminInvoicesEmptyStateProps } from '@/app/superadmin/saas-billing/invoices/invoices_types/SuperadminInvoicesEmptyStateTypes';

export default function SuperadminInvoicesEmptyState({ onLogPaymentClick }: SuperadminInvoicesEmptyStateProps) {
    return (<div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="w-16 h-16 rounded-full bg-card border border-border flex items-center justify-center mb-4">
        <Receipt size={18} className="w-8 text-secondary opacity-50"/>
      </div>
      <h3 className="text-base font-semibold text-primary">No Invoices Yet</h3>
      <p className="text-sm text-secondary mt-1 max-w-xs">No payment records found. Log a manual payment to get started.</p>
      <button onClick={onLogPaymentClick} className="mt-4 px-4 py-2 bg-primary hover:bg-primary-hover text-on-primary text-sm font-medium rounded-lg motion-safe:transition-all motion-safe:duration-base motion-safe:ease-in-out motion-safe:active:scale-95">
        Log Manual Payment
      </button>
    </div>);
}
