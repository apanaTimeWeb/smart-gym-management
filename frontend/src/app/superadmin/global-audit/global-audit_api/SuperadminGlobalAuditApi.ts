// RESPONSIBILITY: Modularized API client for the Global Audit module. All methods import apiFetch from src/lib/api.ts and define only superadmin-scoped endpoints. No UI logic.
import { GlobalAuditUrlConfig } from '@/app/superadmin/global-audit/superadmin_global_audit_url_config';
import { apiFetch } from '@/lib/api';
import type { ApiResponse } from '@/lib/api';
import type { AuditLog } from '@/app/superadmin/global-audit/global-audit_types/SuperadminGlobalAuditTypes';
import { z } from "zod";
import { AuditLogSchema } from '@/app/superadmin/global-audit/global-audit_types/SuperadminGlobalAuditTypes';
export const auditLogsApi = {
    fetchGlobalLogs: (params?: Record<string, string>) => {
        const q = params ? '?' + new URLSearchParams(params).toString() : '';
        return apiFetch<ApiResponse<AuditLog[]>>(`${GlobalAuditUrlConfig.BACKEND_API.BASE}${q}`, { dataSchema: z.array(AuditLogSchema) });
    },
};
