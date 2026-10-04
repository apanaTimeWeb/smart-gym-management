import { SuperadminSystemOpsSummarySchema } from '@/app/frontend_superadmin/superadmin_system_ops/superadmin_system_ops_schemas/SuperadminSystemOpsTypesSchemas';
import { SuperadminLayoutApiFetch as apiFetch } from '@/app/frontend_superadmin/superadmin_layout/superadmin_layout_api/SuperadminLayoutApiFetch';

/**
 * RESPONSIBILITY: Module-owned TypeScript module SuperadminSystemOpsApi owned by the superadmin_system_ops feature boundary.
 * INTENT: Keep this file’s presentation, logic, and state responsibility isolated from unrelated business modules.
 * STATE DEPENDENCIES: No React/client state primitive detected.
 * MODULE DEPENDENCIES: @/app/frontend_superadmin/superadmin_layout/superadmin_layout_api/SuperadminLayoutApiFetch, @/app/frontend_superadmin/superadmin_system_ops/superadmin_system_ops_schemas/SuperadminSystemOpsTypesSchemas, @/app/frontend_superadmin/superadmin_system_ops/superadmin_system_ops_url_config, @/app/frontend_superadmin/superadmin_system_ops/superadmin_system_ops_types/SuperadminSystemOpsTypes, @/lib/api
 * EDGE CASES: Preserve implemented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 * REPAIR CONSTRAINT: Cross-feature business dependencies require explicit documentation; do not move business logic into global UI infrastructure.
 */
// RESPONSIBILITY: Provides API access for the Superadmin System Ops summary feature. No UI logic.
import { SUPERADMIN_SYSTEM_OPS_API } from '@/app/frontend_superadmin/superadmin_system_ops/superadmin_system_ops_url_config';

import type { SuperadminSystemOpsSummary } from '@/app/frontend_superadmin/superadmin_system_ops/superadmin_system_ops_types/SuperadminSystemOpsTypes';
import type { ApiResponse } from '@/lib/api';



export function fetchSuperadminSystemOpsSummary(): Promise<ApiResponse<SuperadminSystemOpsSummary>> {
  return apiFetch<ApiResponse<SuperadminSystemOpsSummary>>(SUPERADMIN_SYSTEM_OPS_API.SUMMARY, {
    dataSchema: SuperadminSystemOpsSummarySchema,
  });
}
