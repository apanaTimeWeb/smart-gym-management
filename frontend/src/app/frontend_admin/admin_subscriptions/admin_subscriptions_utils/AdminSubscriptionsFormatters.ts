/**
 * @description AdminSubscriptionsFormatters: Owns the AdminSubscriptionsFormatters responsibility for the admin_subscriptions feature.
 * @dependencies Uses only the owning feature's typed inputs, constants, and approved global infrastructure.
 * @edge-case Preserves null/empty/error inputs according to the feature contract and does not own server state.
 */
/** RESPONSIBILITY: Formats Admin Subscriptions date display values using the active UI locale. */
export const formatDate = (value: string, locale: string): string =>
  new Intl.DateTimeFormat(locale, { day: "2-digit", month: "short", year: "numeric" }).format(new Date(value));
