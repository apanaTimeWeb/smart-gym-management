import { SuperadminGlobalAuditExportResponseSchema } from '@/app/frontend_superadmin/superadmin_global_audit/superadmin_global_audit_schemas/SuperadminGlobalAuditExportResponseSchema';

/**
 * RESPONSIBILITY: Module-owned TypeScript module SuperadminGlobalAuditExportApi owned by the superadmin_global_audit feature boundary.
 * INTENT: Keep this file’s presentation, logic, and state responsibility isolated from unrelated business modules.
 * STATE DEPENDENCIES: No React/client state primitive detected.
 * MODULE DEPENDENCIES: @/app/frontend_superadmin/superadmin_layout/superadmin_layout_api/SuperadminLayoutApiFetch, @/app/frontend_superadmin/superadmin_layout/superadmin_layout_schemas/SuperadminLayoutApiResponseSchema, @/app/frontend_superadmin/superadmin_global_audit/superadmin_global_audit_schemas/SuperadminGlobalAuditExportResponseSchema, @/app/frontend_superadmin/superadmin_global_audit/superadmin_global_audit_url_config, @/lib/api
 * EDGE CASES: Preserve implemented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 * REPAIR CONSTRAINT: Cross-feature business dependencies require explicit documentation; do not move business logic into global UI infrastructure.
 */
// RESPONSIBILITY: Owns the Global Audit export request contract.
import { MODULE_URLS } from '@/app/frontend_superadmin/superadmin_global_audit/superadmin_global_audit_url_config';
import { SuperadminLayoutApiFetch as apiFetch } from '@/app/frontend_superadmin/superadmin_layout/superadmin_layout_api/SuperadminLayoutApiFetch';
import { SuperadminLayoutApiResponseSchema } from '@/app/frontend_superadmin/superadmin_layout/superadmin_layout_schemas/SuperadminLayoutApiResponseSchema';

import type { ApiResponse } from '@/lib/api';



export const superadminGlobalAuditExportApi = {
  requestExport: (idempotencyKey: string) => apiFetch<ApiResponse<null>>(MODULE_URLS.EXPORT.BACKEND_API.EXPORT, {
    method: 'POST',
    headers: { 'Idempotency-Key': idempotencyKey },
    responseSchema: SuperadminLayoutApiResponseSchema(SuperadminGlobalAuditExportResponseSchema),
  }),
};
