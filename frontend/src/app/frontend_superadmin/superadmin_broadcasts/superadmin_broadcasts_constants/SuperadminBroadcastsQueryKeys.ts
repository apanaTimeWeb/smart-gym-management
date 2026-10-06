/**
 * @description Central TanStack Query key registry for Broadcasts.
 * @dependencies None.
 * @edge-case Keys remain stable across retries so mutations reconcile the exact affected cache.
 */
export const SUPERADMIN_BROADCASTS_QUERY_KEYS = {
  all: ["superadmin_broadcasts"] as const,
  list: (params: unknown) => ["superadmin_broadcasts", "list", params] as const,
  tenants: ["superadmin_broadcasts", "tenants"] as const,
  modalTenants: ["superadmin_broadcasts", "modal-tenants"] as const,
  modalRecipientCount: ["superadmin_broadcasts", "modal-recipient-count"] as const,
  detail: (id: string) => ["superadmin_broadcasts", "detail", id] as const,
  audienceInsights: ["superadmin_broadcasts", "audience-insights"] as const,
} as const;
