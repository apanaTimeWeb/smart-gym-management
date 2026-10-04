import { SuperadminLayoutApiResponseSchema } from '@/app/frontend_superadmin/superadmin_layout/superadmin_layout_schemas/SuperadminLayoutApiResponseSchema';
import { SuperadminReportsExportResponseSchema } from '@/app/frontend_superadmin/superadmin_reports/superadmin_reports_schemas/SuperadminReportsExportResponseSchema';
import { SuperadminLayoutApiFetch as apiFetch } from '@/app/frontend_superadmin/superadmin_layout/superadmin_layout_api/SuperadminLayoutApiFetch';

/**
 * RESPONSIBILITY: Module-owned TypeScript module SuperadminReportsExportApi owned by the superadmin_reports feature boundary.
 * INTENT: Keep this file’s presentation, logic, and state responsibility isolated from unrelated business modules.
 * STATE DEPENDENCIES: No React/client state primitive detected.
 * MODULE DEPENDENCIES: @/app/frontend_superadmin/superadmin_layout/superadmin_layout_api/SuperadminLayoutApiFetch, @/app/frontend_superadmin/superadmin_layout/superadmin_layout_schemas/SuperadminLayoutApiResponseSchema, @/app/frontend_superadmin/superadmin_reports/superadmin_reports_schemas/SuperadminReportsExportResponseSchema, @/app/frontend_superadmin/superadmin_reports/superadmin_reports_url_config, @/lib/api
 * EDGE CASES: Preserve implemented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 * REPAIR CONSTRAINT: Cross-feature business dependencies require explicit documentation; do not move business logic into global UI infrastructure.
 */
// RESPONSIBILITY: Owns the reports export request contract.
import { SUPERADMIN_REPORTS_EXPORT } from '@/app/frontend_superadmin/superadmin_reports/superadmin_reports_url_config';

import type { ApiResponse } from '@/lib/api';



export const superadminReportsExportApi = {
  requestExport: (idempotencyKey: string) => apiFetch<ApiResponse<null>>(SUPERADMIN_REPORTS_EXPORT.BACKEND_API.EXPORT, {
    method: 'POST',
    headers: { 'Idempotency-Key': idempotencyKey },
    responseSchema: SuperadminLayoutApiResponseSchema(SuperadminReportsExportResponseSchema),
  }),
};
