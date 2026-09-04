import { apiFetch, type ApiResponse } from "@/lib/api";
import { AdminAuditUrlConfig } from "@/app/admin/audit/audit_url_config";
import type { AdminAuditLog } from "@/app/admin/audit/audit_types/admin_audit_types";
export const adminAuditApi = {
  getAll: (params?: Record<string, string>) => {
    const q = params ? "?" + new URLSearchParams(params).toString() : "";
    return apiFetch<ApiResponse<{ logs: AdminAuditLog[]; total: number }>>(`${AdminAuditUrlConfig.BACKEND_API.BASE}${q}`);
  },
  exportCsv: () => apiFetch<Blob>(AdminAuditUrlConfig.BACKEND_API.EXPORT, { responseType: "blob" } as any),
};
