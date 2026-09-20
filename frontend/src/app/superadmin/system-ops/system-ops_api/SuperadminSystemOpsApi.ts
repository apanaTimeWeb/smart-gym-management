// RESPONSIBILITY: Provides API access for the Superadmin System Ops summary feature. No UI logic.
import type { ApiResponse } from '@/lib/api';
import { apiFetch } from '@/lib/api';
import { SuperadminSystemOpsUrlConfig } from '@/app/superadmin/system-ops/superadmin_system_ops_url_config';
import { SuperadminSystemOpsSummarySchema, type SuperadminSystemOpsSummary } from '@/app/superadmin/system-ops/system-ops_types/SuperadminSystemOpsTypes';

export function fetchSuperadminSystemOpsSummary(): Promise<ApiResponse<SuperadminSystemOpsSummary>> {
  return apiFetch<ApiResponse<SuperadminSystemOpsSummary>>(SuperadminSystemOpsUrlConfig.API.SUMMARY, {
    dataSchema: SuperadminSystemOpsSummarySchema,
  });
}
