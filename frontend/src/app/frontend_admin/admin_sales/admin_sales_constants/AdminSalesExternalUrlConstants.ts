// RESPONSIBILITY: Builds feature-owned WhatsApp web destinations for Sales follow-up actions.
import { ADMIN_SALES_EXTERNAL_URLS } from '@/app/frontend_admin/admin_sales/admin_sales_url_config';

export function buildAdminSalesWhatsAppWebUrl(phone: string, message: string): string {
  const digits = phone.replace(/\D/g, '');
  return digits ? `${ADMIN_SALES_EXTERNAL_URLS.whatsappWeb}/${digits}?text=${encodeURIComponent(message)}` : '';
}
