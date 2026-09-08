// RESPONSIBILITY: Modularized API client for the Superadmin System Health module.
// Covers fetching live system metrics (CPU, RAM, disk, uptime) and service statuses.
// DATA FLOW: SuperadminSystemApi → superadmin_api.ts (re-exported) → UI hooks

import { apiFetch } from '@/lib/api';
import type { ApiResponse } from '@/lib/api';
import { SuperadminUrlConfig } from '@/app/superadmin/superadmin_url_config';
import type { SystemHealthData } from '@/app/superadmin/system/system_types/system_types';

/**
 * Fetches full system health data: CPU, memory, disk, uptime, Node version, and service statuses.
 */
export function fetchSystemHealth() {
  return apiFetch<ApiResponse<SystemHealthData>>(SuperadminUrlConfig.BACKEND_API.SYSTEM_BASE);
}

/**
 * Fetches a lightweight health probe — used for polling/ping checks.
 */
export function fetchHealthProbe() {
  return apiFetch<ApiResponse<{ status: string; timestamp: string }>>(`${SuperadminUrlConfig.BACKEND_API.SYSTEM_BASE}/health`);
}
