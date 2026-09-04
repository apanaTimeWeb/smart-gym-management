import { apiFetch } from "@/lib/api";
import type { ApiResponse } from "@/lib/api";
import { AdminInquiriesUrlConfig } from "@/app/admin/inquiries/inquiries_url_config";
import type { AdminInquiry, AdminInquiryStats } from "@/app/admin/inquiries/inquiries_types/admin_inquiries_types";

export const adminInquiriesApi = {
  getAll: (params?: Record<string, string>) => {
    const q = params ? "?" + new URLSearchParams(params).toString() : "";
    return apiFetch<ApiResponse<{ inquiries: AdminInquiry[] }>>(`${AdminInquiriesUrlConfig.BACKEND_API.BASE}${q}`);
  },
  getStats: () => apiFetch<ApiResponse<AdminInquiryStats>>(AdminInquiriesUrlConfig.BACKEND_API.STATS),
  create: (body: Partial<AdminInquiry>) => apiFetch<ApiResponse<AdminInquiry>>(AdminInquiriesUrlConfig.BACKEND_API.BASE, { method: "POST", body: JSON.stringify(body) }),
  update: (id: string, body: Partial<AdminInquiry>) => apiFetch<ApiResponse<AdminInquiry>>(AdminInquiriesUrlConfig.BACKEND_API.UPDATE(id), { method: "PATCH", body: JSON.stringify(body) }),
  remove: (id: string) => apiFetch<ApiResponse<{ id: string }>>(AdminInquiriesUrlConfig.BACKEND_API.DELETE(id), { method: "DELETE" }),
};
