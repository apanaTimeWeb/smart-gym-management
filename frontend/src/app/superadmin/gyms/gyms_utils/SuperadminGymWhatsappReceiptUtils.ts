// RESPONSIBILITY: Formats timestamps used by the Superadmin Gym WhatsApp receipt flow.
/** Formats a timestamp using the application locale for a customer-facing receipt. */
export function formatSuperadminGymWhatsappReceiptDate(now = new Date(), locale: string): string {
  return new Intl.DateTimeFormat(locale, { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true }).format(now);
}
