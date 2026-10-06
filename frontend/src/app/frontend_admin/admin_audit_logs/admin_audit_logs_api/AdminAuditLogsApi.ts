// RESPONSIBILITY: Owns the typed read-only Audit Logs API contract, including detail and actor lookup; no writes are allowed.
import { apiFetch, type ApiResponse } from '@/lib/api';
import { ADMIN_AUDIT_LOGS_API } from '@/app/frontend_admin/admin_audit_logs/admin_audit_logs_url_config';
import type { AdminAuditLogsQueryParams, AuditActorsResponse, AuditKPIData, AuditLog, AuditLogDetail, AuditLogExportFilters } from '@/app/frontend_admin/admin_audit_logs/admin_audit_logs_types/AdminAuditLogsTypes';
import { auditActorsSchema, auditKpiDataSchema, auditLogDetailSchema, auditLogSchema } from '@/app/frontend_admin/admin_audit_logs/admin_audit_logs_schemas/AdminAuditLogsSchemas';
import { z } from 'zod';

function buildQuery(params?: AdminAuditLogsQueryParams | AuditLogExportFilters): string {
  const search = new URLSearchParams();
  Object.entries(params ?? {}).forEach(([key, value]) => { if (value !== undefined && value !== '') search.set(key, String(value)); });
  const query = search.toString();
  return query ? `?${query}` : '';
}

export const AdminAuditLogsApi = {
  fetchAuditLogs: async (params: AdminAuditLogsQueryParams) => apiFetch<ApiResponse<AuditLog[]>>(`${ADMIN_AUDIT_LOGS_API.base}${buildQuery(params)}`, { method: 'GET', dataSchema: z.array(auditLogSchema) }),
  fetchAuditLogById: async (id: string) => apiFetch<ApiResponse<AuditLogDetail>>(ADMIN_AUDIT_LOGS_API.detail(id), { method: 'GET', dataSchema: auditLogDetailSchema }),
  fetchAuditKPIs: async () => apiFetch<ApiResponse<AuditKPIData>>(ADMIN_AUDIT_LOGS_API.kpis, { method: 'GET', dataSchema: auditKpiDataSchema }),
  fetchActors: async () => apiFetch<ApiResponse<AuditActorsResponse>>(ADMIN_AUDIT_LOGS_API.actors, { method: 'GET', dataSchema: auditActorsSchema }),

  /** Binary export remains a browser transport because the supplied role-only archive does not include an apiFetch Blob contract; replacing it would require inventing host infrastructure. */
  exportAuditLogs: async (params: AuditLogExportFilters, locale = 'en'): Promise<Blob> => {
    const response = await fetch(`${ADMIN_AUDIT_LOGS_API.export}${buildQuery(params)}`, {
      method: 'GET',
      credentials: 'include',
      headers: { Accept: 'text/csv', 'Accept-Language': locale },
    });
    if (!response.ok) throw new Error(`Audit export failed (${response.status}).`);
    return response.blob();
  },
};
