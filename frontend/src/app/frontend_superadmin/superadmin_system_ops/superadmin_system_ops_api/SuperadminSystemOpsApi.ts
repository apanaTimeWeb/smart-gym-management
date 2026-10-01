// RESPONSIBILITY: Provides API access for the Superadmin System Ops summary feature. No UI logic.
import { SuperadminLayoutApiFetch as apiFetch } from '@/app/frontend_superadmin/superadmin_layout/superadmin_layout_api/SuperadminLayoutApiFetch';
import { SuperadminSystemOpsSummarySchema } from '@/app/frontend_superadmin/superadmin_system_ops/superadmin_system_ops_schemas/SuperadminSystemOpsTypesSchemas';
import { SuperadminSystemOpsUrlConfig } from '@/app/frontend_superadmin/superadmin_system_ops/superadmin_system_ops_url_config';

import type { SuperadminSystemOpsSummary } from '@/app/frontend_superadmin/superadmin_system_ops/superadmin_system_ops_types/SuperadminSystemOpsTypes';
import type { ApiResponse } from '@/lib/api';

export function fetchSuperadminSystemOpsSummary(): Promise<ApiResponse<SuperadminSystemOpsSummary>> {
  return apiFetch<ApiResponse<SuperadminSystemOpsSummary>>(SuperadminSystemOpsUrlConfig.API.SUMMARY, {
    dataSchema: SuperadminSystemOpsSummarySchema,
  });
}
