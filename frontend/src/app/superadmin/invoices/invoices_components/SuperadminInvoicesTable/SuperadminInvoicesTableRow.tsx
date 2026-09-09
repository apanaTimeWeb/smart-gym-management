// RESPONSIBILITY: Renders a single row in the Invoices table with WhatsApp, Email resend, and PDF download actions.
import React from 'react';
import { Receipt, MessageCircle, Mail } from 'lucide-react';
import toast from 'react-hot-toast';
import { WhatsAppFormatter } from '@/lib/whatsapp_formatter';
import { invoicesApi } from '@/app/superadmin/invoices/superadmin_invoices_api/superadmin_invoices_api';
import type { SaaSInvoice } from '@/app/superadmin/invoices/superadmin_invoices_types/superadmin_invoices_types';

const STATUS_COLORS: Record<SaaSInvoice['status'], string> = {
  PAID: 'text-success bg-success/10',
  PENDING: 'text-warning bg-warning/10',
  FAILED: 'text-danger bg-danger-bg/10',
  OVERDUE: 'text-danger bg-danger-bg/10',
};

interface InvoicesTableRowProps {
  invoice: SaaSInvoice;
}

export default function SuperadminInvoicesTableRow({ invoice: inv }: InvoicesTableRowProps) {
  const handleShareWhatsApp = (e: React.MouseEvent) => {
    e.stopPropagation();
    const dateStr = new Date(inv.issuedAt).toLocaleDateString('en-IN', {
      day: '2-digit', month: 'short', year: 'numeric',
    });
    const waText = WhatsAppFormatter.formatReceipt({
      title: 'Smart Gym 360',
      subtitle: 'SaaS Invoice / Receipt',
      date: dateStr,
      customerInfo: {
        'Tenant': inv.tenantName,
        'Invoice ID': inv.id,
      },
      sections: [
        {
          items: {
            'Plan': inv.planName,
            'Amount': `₹${inv.amount.toFixed(2)}`,
            'Status': inv.status,
          },
        },
      ],
      footer: inv.status === 'PAID' ? 'Thank you for your business!' : 'Please pay the pending amount.',
    });
    window.open(`https://wa.me/?text=${encodeURIComponent(waText)}`, '_blank');
  };

  const handleDownload = async (e: React.MouseEvent) => {
    e.stopPropagation();
    toast.loading(`Fetching PDF for ${inv.id}...`, { id: `dl-${inv.id}` });
    try {
      const res = await invoicesApi.getDownloadUrl(inv.id);
      if (res.data?.downloadUrl) {
        window.open(res.data.downloadUrl, '_blank');
        toast.success('Download started.', { id: `dl-${inv.id}` });
      } else {
        toast.error(res.message || 'Download URL not found.', { id: `dl-${inv.id}` });
      }
    } catch {
      toast.error('Failed to download invoice.', { id: `dl-${inv.id}` });
    }
  };

  const handleResendEmail = async (e: React.MouseEvent) => {
    e.stopPropagation();
    toast.loading(`Resending invoice ${inv.id}...`, { id: `resend-${inv.id}` });
    try {
      const res = await invoicesApi.resendInvoiceEmail(inv.id);
      toast.success(res.message || 'Invoice resent successfully.', { id: `resend-${inv.id}` });
    } catch {
      toast.error('Failed to resend invoice.', { id: `resend-${inv.id}` });
    }
  };

  return (
    <tr className="hover:bg-input motion-safe:transition-colors">
      <td className="p-4 text-sm font-mono text-secondary">{inv.id || 'N/A'}</td>
      <td className="p-4 text-sm font-bold text-foreground">{inv.tenantName || 'Unknown Tenant'}</td>
      <td className="p-4 text-sm text-secondary font-mono">{inv.taxId || 'N/A'}</td>
      <td className="p-4 text-sm text-secondary">{inv.planName || 'N/A'}</td>
      <td className="p-4 text-sm text-secondary capitalize">{inv.invoiceType ? inv.invoiceType.replace('_', ' ').toLowerCase() : 'N/A'}</td>
      <td className="p-4 text-sm font-bold text-foreground">₹{Number(inv.amount || 0).toFixed(2)}</td>
      <td className="p-4">
        <span className={`px-2.5 py-1 rounded-md text-xs font-bold ${STATUS_COLORS[inv.status] || 'bg-secondary/10 text-secondary'}`}>
          {inv.status || 'UNKNOWN'}
        </span>
      </td>
      <td className="p-4 text-sm text-secondary">{inv.issuedAt ? new Date(inv.issuedAt).toLocaleDateString('en-IN') : 'N/A'}</td>
      <td className="p-4 text-right flex items-center justify-end gap-2">
        <button
          title="Resend to Email"
          onClick={handleResendEmail}
          className="text-secondary hover:text-primary motion-safe:transition-colors p-1.5 bg-input hover:bg-primary/10 rounded-md border border-border"
          aria-label={`Resend invoice ${inv.id} to email`}
        >
          <Mail className="w-4 h-4" />
        </button>
        <button
          title="Share via WhatsApp"
          onClick={handleShareWhatsApp}
          className="text-secondary hover:text-[#25D366] motion-safe:transition-colors p-1.5 bg-input hover:bg-[#25D366]/10 rounded-md border border-border"
          aria-label={`Share invoice ${inv.id} via WhatsApp`}
        >
          <MessageCircle className="w-4 h-4" />
        </button>
        <button
          onClick={handleDownload}
          className="text-sm font-medium text-primary hover:underline flex items-center gap-1"
          aria-label={`Download PDF for invoice ${inv.id}`}
        >
          <Receipt size={14} /> View
        </button>
      </td>
    </tr>
  );
}
