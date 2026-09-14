// RESPONSIBILITY: Modularized API client for the Global Audit module. All methods import apiFetch from src/lib/api.ts and define only superadmin-scoped endpoints. No UI logic.
import { SuperadminGlobalAuditUrlConfig } from '@/app/superadmin/global-audit/superadmin_global-audit_url_config';
import { apiFetch } from '@/lib/api';
import type { ApiResponse } from '@/lib/api';
import type { AuditLog } from '@/app/superadmin/global-audit/superadmin_global-audit_types/superadmin_global-audit_types';

export const auditLogsApi = {
  fetchGlobalLogs: (params?: Record<string, string>) => {
    const q = params ? '?' + new URLSearchParams(params).toString() : '';
    return apiFetch<ApiResponse<AuditLog[]>>(`${SuperadminGlobalAuditUrlConfig.BACKEND_API.AUDIT_LOGS_BASE}${q}`);
  },
};
