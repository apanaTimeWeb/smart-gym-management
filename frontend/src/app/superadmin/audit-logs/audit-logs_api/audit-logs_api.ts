import { apiFetch } from '@/lib/apiFetch';
import type { ApiResponse } from '@/types/api';
import { SuperadminUrlConfig } from '@/app/superadmin/superadmin_url_config';
import type { GlobalAuditLog } from '@/app/superadmin/audit-logs/audit-logs_types/audit-logs_types';

export const auditLogsApi = {
  getAll: (params?: Record<string, string>) => {
    const q = params ? '?' + new URLSearchParams(params).toString() : '';
    return apiFetch<ApiResponse<GlobalAuditLog[]>>(`${SuperadminUrlConfig.BACKEND_API.AUDIT_LOGS_BASE}${q}`);
  },
  getTenantLogs: (tenantId?: string) => {
    const q = tenantId ? `?tenantId=${tenantId}` : '';
    return apiFetch<ApiResponse<GlobalAuditLog[]>>(`${SuperadminUrlConfig.BACKEND_API.AUDIT_LOGS_BASE}/tenant${q}`);
  },
  getGlobalLogs: () => apiFetch<ApiResponse<GlobalAuditLog[]>>(`${SuperadminUrlConfig.BACKEND_API.AUDIT_LOGS_BASE}/global`),
};
