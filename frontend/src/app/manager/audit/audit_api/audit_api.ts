// RESPONSIBILITY: Provides strongly-typed network calls for the audit module.
import { apiFetch, ApiResponse } from '@/lib/api';
import { AUDIT_URLS } from '@/app/manager/audit/audit_url_config';
import type { AuditLogResponse } from '@/app/manager/audit/audit_types/audit_types';

export const auditApi = {
  getLogs: (params?: Record<string, string>) => {
    const q = params ? '?' + new URLSearchParams(params).toString() : '';
    return apiFetch<ApiResponse<AuditLogResponse>>(`${AUDIT_URLS.BACKEND_API.BASE}${q}`);
  },
};
