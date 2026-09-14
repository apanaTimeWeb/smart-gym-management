// RESPONSIBILITY: API client for the Audit Logs module — mock data, fetch, export.
import type { AuditLog, AuditKPIData } from '@/app/admin/audit_logs/audit_types/audit_types';
import { MOCK_AUDIT_LOGS, MOCK_AUDIT_KPI } from '@/app/admin/audit_logs/audit_utils/AdminAuditLogsSharedConstants';
import { z } from "zod";
import { apiFetch, type ApiResponse } from "@/lib/api";

export const auditLogsApi = {
  fetchLogs: async () => {
            return apiFetch('/api/admin/auditLogs/fetchLogs', { method: 'GET', dataSchema: z.any() });
        },
  fetchKPIs: async () => {
            return apiFetch('/api/admin/auditLogs/fetchKPIs', { method: 'GET', dataSchema: z.any() });
        },
};
