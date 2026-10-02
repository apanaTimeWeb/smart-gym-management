/**
 * @description Central query-key registry for the owning feature.
 * @dependencies None.
 * @edge-case Query keys are the sole TanStack Query cache identity source for this feature.
 */

export const SUPERADMIN_USAGE_METERS_QUERY_KEYS = {
  all: ["superadmin_usage_meters"] as const,
  list: (params: Readonly<Record<string, string>>) => ["superadmin_usage_meters", "list", params] as const,
  overview: ["superadmin_usage_meters", "overview"] as const,
  tenants: ["superadmin_usage_meters", "tenants"] as const,
  subscriptionPlans: ["superadmin_usage_meters", "subscription-plans"] as const,
  modalTenants: ["superadmin_usage_meters", "modal-tenants"] as const,
  modalRecipientCount: ["superadmin_usage_meters", "modal-recipient-count"] as const,
  redemptions: (id: string) => ["superadmin_usage_meters", "redemptions", id] as const,
  detailBusinessOverview: (id: string) => ["superadmin_usage_meters", "detail-business-overview", id] as const,
} as const;
