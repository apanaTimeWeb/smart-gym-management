/**
 * @description Central query-key registry for the owning feature.
 * @dependencies None.
 * @edge-case Query keys are the sole TanStack Query cache identity source for this feature.
 */

export const SUPERADMIN_TEAM_QUERY_KEYS = {
  all: ["superadmin_team"] as const,
  list: (params: unknown) => ["superadmin_team", "list", params] as const,
  overview: ["superadmin_team", "overview"] as const,
  tenants: ["superadmin_team", "tenants"] as const,
  subscriptionPlans: ["superadmin_team", "subscription-plans"] as const,
  modalTenants: ["superadmin_team", "modal-tenants"] as const,
  modalRecipientCount: ["superadmin_team", "modal-recipient-count"] as const,
  redemptions: (id: string) => ["superadmin_team", "redemptions", id] as const,
  detailBusinessOverview: (id: string) => ["superadmin_team", "detail-business-overview", id] as const,
} as const;
