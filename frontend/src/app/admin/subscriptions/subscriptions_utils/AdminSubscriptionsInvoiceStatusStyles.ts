// RESPONSIBILITY: Defines Admin subscriptions invoice status presentation metadata owned by the subscriptions module.
import type { InvoiceStatus } from '@/app/admin/subscriptions/subscriptions_types/AdminSubscriptionsTypes';

export interface AdminSubscriptionsInvoiceStatusStyle {
  label: string;
  backgroundClass: string;
  textClass: string;
}

export const ADMIN_SUBSCRIPTIONS_INVOICE_STATUS_STYLES: Record<InvoiceStatus, AdminSubscriptionsInvoiceStatusStyle> = {
  paid: { label: 'Paid', backgroundClass: 'bg-success', textClass: 'text-success' },
  pending: { label: 'Pending', backgroundClass: 'bg-warning', textClass: 'text-warning' },
  failed: { label: 'Failed', backgroundClass: 'bg-danger', textClass: 'text-danger' },
  refunded: { label: 'Refunded', backgroundClass: 'bg-info', textClass: 'text-info' },
};
