// RESPONSIBILITY: Isolated data-fetching methods for the Admin Members module.
// Every call goes through apiFetch � never call fetch() directly.
import { apiFetch } from "@/lib/api";
import type { ApiResponse } from "@/lib/api";
import { AdminMembersUrlConfig } from "@/app/admin/members/members_url_config";
import type { AdminMember, AdminMemberStats } from "@/app/admin/members/members_types/admin_members_types";

export const adminMembersApi = {
  getAll: (params?: Record<string, string>) => {
    const q = params ? "?" + new URLSearchParams(params).toString() : "";
    return apiFetch<ApiResponse<{ members: AdminMember[]; total: number; page: number; limit: number }>>(
      `${AdminMembersUrlConfig.BACKEND_API.BASE}${q}`
    );
  },
  getOne: (id: string) =>
    apiFetch<ApiResponse<AdminMember>>(AdminMembersUrlConfig.BACKEND_API.GET_ONE(id)),
  getStats: () =>
    apiFetch<ApiResponse<AdminMemberStats>>(AdminMembersUrlConfig.BACKEND_API.STATS),
  create: (body: Partial<AdminMember>) =>
    apiFetch<ApiResponse<AdminMember>>(AdminMembersUrlConfig.BACKEND_API.BASE, {
      method: "POST",
      body: JSON.stringify(body),
    }),
  update: (id: string, body: Partial<AdminMember>) =>
    apiFetch<ApiResponse<AdminMember>>(AdminMembersUrlConfig.BACKEND_API.UPDATE(id), {
      method: "PATCH",
      body: JSON.stringify(body),
    }),
  remove: (id: string) =>
    apiFetch<ApiResponse<{ id: string }>>(AdminMembersUrlConfig.BACKEND_API.DELETE(id), {
      method: "DELETE",
    }),
  renew: (id: string, body: unknown) =>
    apiFetch<ApiResponse<AdminMember>>(AdminMembersUrlConfig.BACKEND_API.RENEW(id), {
      method: "POST",
      body: JSON.stringify(body),
    }),
};
