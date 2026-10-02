/**
 * @description Canonical TanStack Query key registry for the Superadmin Tickets feature.
 * @invariant Query identity preserves list, detail, and service-insights resource identities.
 */
export const SUPERADMIN_TICKETS_QUERY_KEYS = {
  all: ['superadmin_tickets', 'tickets'] as const,
  list: (queryParams: Readonly<Record<string, string>>) => ['superadmin_tickets', 'tickets', queryParams] as const,
  detail: (ticketId: string) => ['superadmin_tickets', 'tickets', 'detail', ticketId] as const,
  serviceInsights: ['superadmin_tickets', 'tickets_service_insights'] as const,
} as const;
