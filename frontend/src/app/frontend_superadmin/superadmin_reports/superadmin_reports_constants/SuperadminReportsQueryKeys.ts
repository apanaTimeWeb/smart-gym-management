/**
 * @description Canonical query-key registry for Superadmin Reports server state.
 * @invariant Every report query includes its request-shaping parameters in the cache identity.
 */
export const SUPERADMIN_REPORTS_QUERY_KEYS = {
  all: ['superadmin_reports'] as const,
  revenue: (queryParams: Readonly<Record<string, string>>) => ['superadmin_reports', 'revenue', queryParams] as const,
  cancellations: (queryParams: Readonly<Record<string, string>>) => ['superadmin_reports', 'cancellations', queryParams] as const,
  health: (queryParams: Readonly<Record<string, string>>) => ['superadmin_reports', 'health', queryParams] as const,
  comparison: ['superadmin_reports', 'comparison'] as const,
} as const;
