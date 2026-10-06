import type { AdminSalesWhatsAppReceiptData } from '@/app/frontend_admin/admin_sales/admin_sales_types/AdminSalesWhatsAppTypes';

/**
 * Builds a plain-text WhatsApp payment reminder from the exact fields used by the Sales pending-payment flow.
 * @remarks The formatter stays inside the Sales feature so message composition cannot create a global business dependency.
 */
/** Formats the supplied receipt payload as readable plain text for the WhatsApp handoff. */
export const AdminSalesWhatsAppFormatter = {
  formatReceipt(payload: AdminSalesWhatsAppReceiptData): string {
    const lines = [payload.title, payload.subtitle, payload.date, ''];
    Object.entries(payload.customerInfo).forEach(([label, value]) => lines.push(`${label}: ${value}`));
    payload.sections.forEach((section) => {
      lines.push('', section.title);
      Object.entries(section.items).forEach(([label, value]) => lines.push(`${label}: ${value}`));
    });
    lines.push('', payload.footer);
    return lines.join('\n');
  },
} as const;
