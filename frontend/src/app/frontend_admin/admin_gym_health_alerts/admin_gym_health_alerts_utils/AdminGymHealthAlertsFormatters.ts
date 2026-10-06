/**
 * @description AdminGymHealthAlertsFormatters: Owns the AdminGymHealthAlertsFormatters responsibility for the admin_gym_health_alerts feature.
 * @dependencies Uses only the owning feature's typed inputs, constants, and approved global infrastructure.
 * @edge-case Preserves null/empty/error inputs according to the feature contract and does not own server state.
 */
/** RESPONSIBILITY: Formats Admin Gym Health Alert timestamps using the active UI locale. */
export const formatDateTime = (value: string, locale: string): string =>
  new Intl.DateTimeFormat(locale, {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  }).format(new Date(value));
