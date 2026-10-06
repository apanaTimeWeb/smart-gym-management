// RESPONSIBILITY: Builds feature-owned WhatsApp web destinations for campaign follow-up actions.
import { ADMIN_CAMPAIGNS_EXTERNAL_URLS } from '@/app/frontend_admin/admin_campaigns/admin_campaigns_url_config';

export function buildAdminCampaignsWhatsAppWebUrl(phone: string, message: string): string {
  const digits = phone.replace(/\D/g, '');
  return digits ? `${ADMIN_CAMPAIGNS_EXTERNAL_URLS.whatsappWeb}/${digits}?text=${encodeURIComponent(message)}` : '';
}
