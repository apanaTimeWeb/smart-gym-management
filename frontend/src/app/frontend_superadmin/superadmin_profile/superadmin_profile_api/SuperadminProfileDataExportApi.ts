import { SuperadminLayoutApiResponseSchema } from '@/app/frontend_superadmin/superadmin_layout/superadmin_layout_schemas/SuperadminLayoutApiResponseSchema';
import { SuperadminDataExportResponseSchema } from '@/app/frontend_superadmin/superadmin_profile/superadmin_profile_schemas/SuperadminProfileDataExportSchema';
import { SuperadminLayoutApiFetch as apiFetch } from '@/app/frontend_superadmin/superadmin_layout/superadmin_layout_api/SuperadminLayoutApiFetch';

/**
 * RESPONSIBILITY: Module-owned TypeScript module SuperadminProfileDataExportApi owned by the superadmin_profile feature boundary.
 * INTENT: Keep this file’s presentation, logic, and state responsibility isolated from unrelated business modules.
 * STATE DEPENDENCIES: No React/client state primitive detected.
 * MODULE DEPENDENCIES: @/app/frontend_superadmin/superadmin_layout/superadmin_layout_api/SuperadminLayoutApiFetch, @/app/frontend_superadmin/superadmin_layout/superadmin_layout_schemas/SuperadminLayoutApiResponseSchema, @/app/frontend_superadmin/superadmin_profile/superadmin_profile_schemas/SuperadminProfileDataExportSchema, @/app/frontend_superadmin/superadmin_profile/superadmin_profile_url_config, @/lib/api
 * EDGE CASES: Preserve implemented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 * REPAIR CONSTRAINT: Cross-feature business dependencies require explicit documentation; do not move business logic into global UI infrastructure.
 */
// RESPONSIBILITY: Owns the Superadmin tenant-data export request contract.
import { MODULE_URLS } from '@/app/frontend_superadmin/superadmin_profile/superadmin_profile_url_config';

import type { ApiResponse } from '@/lib/api';



export const superadminProfileDataExportApi = {
  requestFullDataExport: (idempotencyKey: string) => apiFetch<ApiResponse<null>>(MODULE_URLS.BACKEND_API.EXPORT_DATA, {
    method: 'POST',
    headers: { 'Idempotency-Key': idempotencyKey },
    responseSchema: SuperadminLayoutApiResponseSchema(SuperadminDataExportResponseSchema),
  }),
};
