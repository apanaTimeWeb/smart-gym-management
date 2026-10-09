/**
 * Builds the external WhatsApp delivery URL for the Members feature.
 * @param phone Digits-only member phone number.
 * @param message User-approved message content.
 */
export function TrainerMembersBuildWhatsAppUrl(phone: string, message: string): string {
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}
