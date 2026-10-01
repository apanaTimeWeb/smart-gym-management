
export const SUPERADMIN_INFRASTRUCTURE_STATUS_OPTIONS = [
  { value: 'ALL', labelKey: 'ui.status_all_nodes' },
  { value: 'HEALTHY', labelKey: 'ui.status_healthy' },
  { value: 'DEGRADED', labelKey: 'ui.status_degraded' },
  { value: 'DOWN', labelKey: 'ui.status_down' },
];

export const SUPERADMIN_INFRASTRUCTURE_STATUS_CODES = { HEALTHY: 'HEALTHY', DEGRADED: 'DEGRADED', DOWN: 'DOWN', CONNECTED: 'CONNECTED', DISCONNECTED: 'DISCONNECTED', STALE: 'STALE' } as const;
