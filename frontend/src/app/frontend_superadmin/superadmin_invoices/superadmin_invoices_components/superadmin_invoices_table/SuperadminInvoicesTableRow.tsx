'use client';
import * as WhatsAppFormatter from '@/app/frontend_superadmin/superadmin_invoices/superadmin_invoices_utils/SuperadminInvoicesWhatsappReceiptFormatter';
import { MessageCircle, Mail, Receipt } from 'lucide-react';
import { formatDate } from '@/lib/formatters';
import { useLocale, useTranslations } from 'next-intl';
import { useSuperadminInvoicesInvoiceActions } from '@/app/frontend_superadmin/superadmin_invoices/superadmin_invoices_hooks/useSuperadminInvoicesInvoiceActions';
import { SUPERADMIN_INVOICE_STATUS_CODES } from '@/app/frontend_superadmin/superadmin_invoices/superadmin_invoices_constants/SuperadminInvoicesConstants';
import { toast } from 'sonner';

// RESPONSIBILITY: Renders and composes SuperadminInvoicesTableRow for the owning feature module; business logic and API transport remain in module-owned hooks/services.
import React from 'react';

import { MODULE_URLS } from '@/app/frontend_superadmin/superadmin_invoices/superadmin_invoices_url_config';
import { formatCurrency as SuperadminInvoicesFormatCurrency } from '@/app/frontend_superadmin/superadmin_invoices/superadmin_invoices_utils/SuperadminInvoicesFormatCurrency';

import type { SuperadminInvoicesTableRowProps } from '@/app/frontend_superadmin/superadmin_invoices/superadmin_invoices_types/SuperadminInvoicesTableRowTypes';
import type { SaaSInvoice } from '@/app/frontend_superadmin/superadmin_invoices/superadmin_invoices_types/SuperadminInvoicesTypes';
import type { MouseEvent } from 'react';


const STATUS_COLORS: Record<SaaSInvoice['status'], string> = {
    PAID: 'text-success bg-success-bg',
    PENDING: 'text-warning bg-warning-bg',
    FAILED: 'text-danger bg-danger-bg',
    OVERDUE: 'text-danger bg-danger-bg',
};

/** @description Renders a single invoice table row and its permitted row actions. @dependencies Receives a feature-owned invoice record and action callbacks. @edge-case Nullable paid-at and payment fields render safely without breaking row semantics. */
export default function SuperadminInvoicesTableRow({ invoice: inv }: SuperadminInvoicesTableRowProps) {
  const t = useTranslations('superadmin_invoices');
    const locale = useLocale();

    const { downloadInvoice, resendInvoice, isDownloading, isResending } = useSuperadminInvoicesInvoiceActions();
    const handleShareWhatsApp = (e: MouseEvent) => {
        e.stopPropagation();
        const dateStr = formatDate(inv.issuedAt);
        const waText = WhatsAppFormatter.formatReceipt({
            title: t('ui.whatsapp_invoice_title'),
            subtitle: t('ui.whatsapp_invoice_subtitle'),
            date: dateStr,
            customerInfo: {
                [t('ui.whatsapp_gym')]: inv.tenantName,
                [t('ui.whatsapp_invoice_id')]: inv.id,
            },
            sections: [
                {
                    items: {
                        [t('ui.whatsapp_plan')]: inv.planName,
                        [t('ui.whatsapp_amount')]: SuperadminInvoicesFormatCurrency(inv.amount, inv.currency || 'INR', locale),
                        [t('ui.whatsapp_status')]: inv.status,
                    },
                },
            ],
            footer: inv.status === SUPERADMIN_INVOICE_STATUS_CODES.PAID ? t('ui.whatsapp_thank_you') : t('ui.whatsapp_payment_reminder'),
        });
        window.open(MODULE_URLS.EXTERNAL.WHATSAPP_SHARE(waText), '_blank', 'noopener,noreferrer');
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
            toast.error(t('ui.invoice_download_error_retry_1c4a8e2d'), { id: `dl-${inv.id}` });
        }
    };
    const handleResendEmail = async (e: MouseEvent) => {
        e.stopPropagation();
        try {
            const res = await resendInvoice(inv.id);
            toast.success(res.message, { id: `resend-${inv.id}` });
        }
        catch (error: unknown) {
            toast.error(t('ui.invoice_email_error_retry_4e5d7b3a'), { id: `resend-${inv.id}` });
        }
    };
    return (<tr className="hover:bg-input motion-safe:transition-colors">
      <td className="p-4 text-sm font-mono text-secondary">{inv.id || '—'}</td>
      <td className="p-4 text-sm font-bold text-primary">{inv.tenantName || '—'}</td>
      <td className="p-4 text-sm text-secondary font-mono">{inv.taxId || '—'}</td>
      <td className="p-4 text-sm text-secondary">{inv.planName || '—'}</td>
      <td className="p-4 text-sm text-secondary capitalize">{inv.invoiceType ? inv.invoiceType.replace('_', ' ').toLowerCase() : '—'}</td>
      <td className="p-4 text-sm font-bold text-primary">{SuperadminInvoicesFormatCurrency(Number(inv.amount || 0), inv.currency || 'INR', locale)}</td>
      <td className="p-4">
        <span className={`px-2.5 py-1 rounded-md text-xs font-bold ${STATUS_COLORS[inv.status] || 'bg-surface-highlight text-secondary'}`}>
          {inv.status || 'UNKNOWN'}
        </span>
      </td>
      <td className="p-4 text-sm text-secondary">{inv.issuedAt ? formatDate(inv.issuedAt) : '—'}</td>
      <td className="p-4 text-right flex items-center justify-end gap-2">
        <button title={t('ui.resend_to_email_737e04cb')} onClick={handleResendEmail} disabled={isResending} className="text-secondary hover:text-primary motion-safe:transition-colors p-1.5 bg-input hover:bg-primary-subtle rounded-md border border-border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page" aria-label={t('ui.resend_invoice_aria', { id: inv.id })} data-testid="superadmin_invoices-superadmin-invoices-table-row-row-resend-to-email">
          <Mail size={18}/>
        </button>
        <button title={t('ui.share_via_whatsapp_3c1a812c')} onClick={handleShareWhatsApp} className="text-secondary hover:text-success motion-safe:transition-colors p-1.5 bg-input hover:bg-success-bg rounded-md border border-border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page" aria-label={t('ui.share_invoice_whatsapp_aria', { id: inv.id })} data-testid="superadmin_invoices-superadmin-invoices-table-row-share-via-whats-app">
          <MessageCircle size={18}/>
        </button>
        <button onClick={handleDownload} disabled={isDownloading} className="text-sm font-medium text-primary hover:underline flex items-center gap-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page" aria-label={t('ui.download_invoice_pdf_aria', { id: inv.id })} data-testid="superadmin_invoices-superadmin-invoices-table-row-table-row-download-pdf">
          <Receipt size={18} strokeWidth={2}/> {t('ui.download_pdf_26072986')}</button>
      </td>
    </tr>);
}

