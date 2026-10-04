import { z } from 'zod';
import { AuditLogSchema } from '@/app/frontend_superadmin/superadmin_global_audit/superadmin_global_audit_schemas/SuperadminGlobalAuditContractSchemas';
import { SuperadminLayoutApiFetch as apiFetch } from '@/app/frontend_superadmin/superadmin_layout/superadmin_layout_api/SuperadminLayoutApiFetch';

/**
 * RESPONSIBILITY: Module-owned TypeScript module SuperadminGlobalAuditApi owned by the superadmin_global_audit feature boundary.
 * INTENT: Keep this file’s presentation, logic, and state responsibility isolated from unrelated business modules.
 * STATE DEPENDENCIES: No React/client state primitive detected.
 * MODULE DEPENDENCIES: @/app/frontend_superadmin/superadmin_global_audit/superadmin_global_audit_url_config, @/lib/api, @/lib/api, @/app/frontend_superadmin/superadmin_global_audit/superadmin_global_audit_types/SuperadminGlobalAuditTypes, zod, @/app/frontend_superadmin/superadmin_global_audit/superadmin_global_audit_types/SuperadminGlobalAuditTypes
 * EDGE CASES: Preserve implemented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 * REPAIR CONSTRAINT: Cross-feature business dependencies require explicit documentation; do not move business logic into global UI infrastructure.
 */
// RESPONSIBILITY: Modularized API client for the Global Audit module. All methods import apiFetch from src/lib/api.ts and define only superadmin-scoped endpoints. No UI logic.
import { SUPERADMIN_GLOBAL_AUDIT_API } from '@/app/frontend_superadmin/superadmin_global_audit/superadmin_global_audit_url_config';

import type { AuditLog } from '@/app/frontend_superadmin/superadmin_global_audit/superadmin_global_audit_types/SuperadminGlobalAuditTypes';
import type { ApiResponse } from '@/lib/api';


export const auditLogsApi = {
    fetchGlobalLogs: (params?: Record<string, string>) => {
        const q = params ? '?' + new URLSearchParams(params).toString() : '';
        return apiFetch<ApiResponse<AuditLog[]>>(`${SUPERADMIN_GLOBAL_AUDIT_API.BASE}${q}`, { dataSchema: z.array(AuditLogSchema) });
    },
};
