// RESPONSIBILITY: Renders a single row in the Invoices table with WhatsApp, Email resend, and PDF download actions.
'use client';
import React from 'react';
import type { MouseEvent } from 'react';
import { Receipt, MessageCircle, Mail } from 'lucide-react';
import toast from 'react-hot-toast';
import { WhatsAppFormatter } from '@/lib/whatsapp_formatter';
import { useSuperadminInvoiceActions } from '@/app/superadmin/saas-billing/invoices/invoices_utils/useSuperadminInvoiceActions';
import type { SaaSInvoice } from '@/app/superadmin/saas-billing/invoices/invoices_types/SuperadminInvoicesTypes';
import { formatCurrencyFromMinorUnits, formatDate } from '@/lib/formatters';
import { InvoicesUrlConfig } from '@/app/superadmin/saas-billing/invoices/superadmin_invoices_url_config';
import type { SuperadminInvoicesTableRowProps } from '@/app/superadmin/saas-billing/invoices/invoices_types/SuperadminInvoicesTableRowTypes';
const STATUS_COLORS: Record<SaaSInvoice['status'], string> = {
    PAID: 'text-success bg-success-bg',
    PENDING: 'text-warning bg-warning-bg',
    FAILED: 'text-danger bg-danger-bg',
    OVERDUE: 'text-danger bg-danger-bg',
};

export default function SuperadminInvoicesTableRow({ invoice: inv }: SuperadminInvoicesTableRowProps) {
    const { downloadInvoice, resendInvoice, isDownloading, isResending } = useSuperadminInvoiceActions();
    const handleShareWhatsApp = (e: MouseEvent) => {
        e.stopPropagation();
        const dateStr = formatDate(inv.issuedAt);
        const waText = WhatsAppFormatter.formatReceipt({
            title: 'Smart Gym 360',
            subtitle: 'SaaS Invoice / Receipt',
            date: dateStr,
            customerInfo: {
                'Gym': inv.tenantName,
                'Invoice ID': inv.id,
            },
            sections: [
                {
                    items: {
                        'Plan': inv.planName,
                        'Amount': formatCurrencyFromMinorUnits(inv.amount),
                        'Status': inv.status,
                    },
                },
            ],
            footer: inv.status === 'PAID' ? 'Thank you for your business!' : 'Please pay the pending amount.',
        });
        window.open(InvoicesUrlConfig.EXTERNAL.WHATSAPP_SHARE(waText), '_blank', 'noopener,noreferrer');
    };
    const handleDownload = async (e: MouseEvent) => {
        e.stopPropagation();
        try {
            const res = await downloadInvoice(inv.id);
            if (res.data?.downloadUrl) {
                window.open(res.data.downloadUrl, '_blank');
                toast.success(res.message, { id: `dl-${inv.id}` });
            }
            else {
                toast.error(res.message, { id: `dl-${inv.id}` });
            }
        }
        catch (error: unknown) {
            toast.error(error instanceof Error ? error.message : '', { id: `dl-${inv.id}` });
        }
    };
    const handleResendEmail = async (e: MouseEvent) => {
        e.stopPropagation();
        try {
            const res = await resendInvoice(inv.id);
            toast.success(res.message, { id: `resend-${inv.id}` });
        }
        catch (error: unknown) {
            toast.error(error instanceof Error ? error.message : '', { id: `resend-${inv.id}` });
        }
    };
    return (<tr className="hover:bg-input motion-safe:transition-colors">
      <td className="p-4 text-sm font-mono text-secondary">{inv.id || '—'}</td>
      <td className="p-4 text-sm font-bold text-primary">{inv.tenantName || '—'}</td>
      <td className="p-4 text-sm text-secondary font-mono">{inv.taxId || '—'}</td>
      <td className="p-4 text-sm text-secondary">{inv.planName || '—'}</td>
      <td className="p-4 text-sm text-secondary capitalize">{inv.invoiceType ? inv.invoiceType.replace('_', ' ').toLowerCase() : '—'}</td>
      <td className="p-4 text-sm font-bold text-primary">{formatCurrencyFromMinorUnits(Number(inv.amount || 0))}</td>
      <td className="p-4">
        <span className={`px-2.5 py-1 rounded-md text-xs font-bold ${STATUS_COLORS[inv.status] || 'bg-surface-highlight text-secondary'}`}>
          {inv.status || 'UNKNOWN'}
        </span>
      </td>
      <td className="p-4 text-sm text-secondary">{inv.issuedAt ? formatDate(inv.issuedAt) : '—'}</td>
      <td className="p-4 text-right flex items-center justify-end gap-2">
        <button title="Resend to Email" onClick={handleResendEmail} disabled={isResending} className="text-secondary hover:text-primary motion-safe:transition-colors p-1.5 bg-input hover:bg-primary-subtle rounded-md border border-border" aria-label={`Resend invoice ${inv.id} to email`}>
          <Mail size={18} className="w-4"/>
        </button>
        <button title="Share via WhatsApp" onClick={handleShareWhatsApp} className="text-secondary hover:text-success motion-safe:transition-colors p-1.5 bg-input hover:bg-success-bg rounded-md border border-border" aria-label={`Share invoice ${inv.id} via WhatsApp`}>
          <MessageCircle size={18} className="w-4"/>
        </button>
        <button onClick={handleDownload} disabled={isDownloading} className="text-sm font-medium text-primary hover:underline flex items-center gap-1" aria-label={`Download invoice PDF ${inv.id}`}>
          <Receipt size={18} strokeWidth={2}/> Download PDF
        </button>
      </td>
    </tr>);
}
