/**
 * @description AdminCampaignsWhatsAppUtils: Owns the AdminCampaignsWhatsAppUtils responsibility for the admin_campaigns feature.
 * @dependencies Uses only the owning feature's typed inputs, constants, and approved global infrastructure.
 * @edge-case Preserves null/empty/error inputs according to the feature contract and does not own server state.
 */
import type { AdminCampaignsRecipient } from '@/app/frontend_admin/admin_campaigns/admin_campaigns_types/AdminCampaignsTypes';
import { buildAdminCampaignsWhatsAppWebUrl } from '@/app/frontend_admin/admin_campaigns/admin_campaigns_constants/AdminCampaignsExternalUrlConstants';

/**
 * Replaces `{name}` variables in the message with the recipient's details.
 */
export function replaceAdminCampaignVariables(body: string, recipient: AdminCampaignsRecipient): string {
  if (!body) return '';
  return body.replace(/\{name\}/g, recipient.name);
}

/**
 * Sanitizes phone numbers by stripping all non-numeric characters.
 */
function sanitizePhone(phone: string): string {
  if (!phone) return '';
  return phone.replace(/\D/g, '');
}

/**
 * Builds a wa.me URL for the specified phone number and message.
 */
export function buildAdminWhatsAppLink(phone: string, text: string): string {
  const cleanPhone = sanitizePhone(phone);
  if (!cleanPhone) return '';
  return buildAdminCampaignsWhatsAppWebUrl(cleanPhone, text.trim());
}
