import type { AdminCampaignsRecipient } from '@/app/admin/campaigns/campaigns_types/AdminCampaignsTypes';

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
  const encodedText = encodeURIComponent(text.trim());
  return `https://wa.me/${cleanPhone}?text=${encodedText}`;
}
