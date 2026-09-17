// RESPONSIBILITY: Owns typed HTTP access for Admin audit log records and KPI summaries.
import { z } from 'zod';
import { apiFetch, type ApiResponse } from '@/lib/api';
import { AdminAuditLogsUrlConfig } from '@/app/admin/audit_logs/admin_audit_logs_url_config';
import type { AuditKPIData, AuditLog, AdminAuditLogsQueryParams } from '@/app/admin/audit_logs/audit_types/AdminAuditTypes';
import { auditKpiDataSchema, auditLogSchema } from '@/app/admin/audit_logs/audit_types/AdminAuditSchemas';

function buildQuery(params?: AdminAuditLogsQueryParams): string {
  const query = new URLSearchParams();
  Object.entries(params ?? {}).forEach(([key, value]) => { if (value !== undefined) query.set(key, String(value)); });
  return query.toString() ? `?${query.toString()}` : '';
}

export const auditLogsApi = {
  fetchLogs: async (params?: AdminAuditLogsQueryParams) => apiFetch<ApiResponse<AuditLog[]>>(`${AdminAuditLogsUrlConfig.api.base}/fetchLogs${buildQuery(params)}`, { method: 'GET', dataSchema: z.array(auditLogSchema) }),
  fetchKPIs: async () => apiFetch<ApiResponse<AuditKPIData>>(`${AdminAuditLogsUrlConfig.api.base}/fetchKPIs`, { method: 'GET', dataSchema: auditKpiDataSchema }),
};
