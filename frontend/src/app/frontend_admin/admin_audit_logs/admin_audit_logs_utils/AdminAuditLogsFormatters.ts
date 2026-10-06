/**
 * @description AdminAuditLogsFormatters: Owns the AdminAuditLogsFormatters responsibility for the admin_audit_logs feature.
 * @dependencies Uses only the owning feature's typed inputs, constants, and approved global infrastructure.
 * @edge-case Preserves null/empty/error inputs according to the feature contract and does not own server state.
 */
/** RESPONSIBILITY: Formats Admin Audit Logs timestamps using the active UI locale. */
export const formatDateTime = (value: string, locale: string, withSeconds = false): string =>
  new Intl.DateTimeFormat(locale, {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    ...(withSeconds ? { second: "2-digit" as const } : {}),
    hour12: true,
  }).format(new Date(value));
