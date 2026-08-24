import React from 'react';
import { Receipt } from 'lucide-react';
import toast from 'react-hot-toast';
import type { SaaSInvoice } from '@/app/superadmin/invoices/invoices_types/invoices_types';

const STATUS_COLORS: Record<SaaSInvoice['status'], string> = {
  PAID: 'text-success bg-success/10',
  PENDING: 'text-warning bg-warning/10',
  FAILED: 'text-destructive bg-destructive/10',
};

interface InvoicesTableRowProps {
  invoice: SaaSInvoice;
}

export default function InvoicesTableRow({ invoice: inv }: InvoicesTableRowProps) {
  return (
    <tr className="hover:bg-input transition-colors cursor-pointer">
      <td className="p-4 text-sm font-mono text-secondary">{inv.id}</td>
      <td className="p-4 text-sm font-bold text-foreground">{inv.tenantName}</td>
      <td className="p-4 text-sm text-secondary">{inv.planName}</td>
      <td className="p-4 text-sm font-bold text-foreground">${inv.amount.toFixed(2)} {inv.currency}</td>
      <td className="p-4">
        <span className={`px-2.5 py-1 rounded-md text-xs font-bold ${STATUS_COLORS[inv.status]}`}>
          {inv.status}
        </span>
      </td>
      <td className="p-4 text-sm text-secondary">{new Date(inv.date).toLocaleDateString()}</td>
      <td className="p-4 text-right">
        <button 
          onClick={(e) => { e.stopPropagation(); toast.success(`Downloading PDF for invoice ${inv.id}`); }}
          className="text-sm font-medium text-primary hover:underline flex items-center gap-1 justify-end w-full"
        >
          <Receipt size={14} /> View
        </button>
      </td>
    </tr>
  );
}
