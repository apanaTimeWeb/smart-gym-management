// RESPONSIBILITY: Modularized API client for the Gyms module. All methods import apiFetch from src/lib/api.ts and define only superadmin-scoped endpoints. No UI logic.
// RESPONSIBILITY: Modularized API client for the Gyms module. All methods import apiFetch from src/lib/api.ts and define only superadmin-scoped endpoints. No UI logic.
import { GymsUrlConfig } from '@/app/superadmin/gyms/gyms_url_config';
import { apiFetch } from '@/lib/api';
import type { ApiResponse } from '@/lib/api';
import type { Tenant } from '@/app/superadmin/gyms/gyms_types/superadmin_gyms_types';
import { z } from "zod";
import { TenantSchema } from '@/app/superadmin/gyms/gyms_types/superadmin_gyms_types';

/** Schema for gym platform statistics */
const GymStatsSchema = z.object({
  totalActive: z.number(),
  totalSuspended: z.number(),
  mrrContribution: z.number().optional(),
}).passthrough();

/** Inferred type for gym stats */
export type GymStats = z.infer<typeof GymStatsSchema>;

export const gymsApi = {
  fetchGyms: (params?: Record<string, string>) => {
    const q = params ? '?' + new URLSearchParams(params).toString() : '';
    return apiFetch<ApiResponse<Tenant[]>>(`${GymsUrlConfig.BACKEND_API.BASE}${q}`, { dataSchema: z.array(TenantSchema) });
  },
  fetchGymById: (id: string) => apiFetch<ApiResponse<Tenant>>(`${GymsUrlConfig.BACKEND_API.BASE}/${id}`, { dataSchema: TenantSchema }),
  createGym: (body: Partial<Tenant>) => apiFetch<ApiResponse<Tenant>>(GymsUrlConfig.BACKEND_API.BASE, { method: 'POST', body: JSON.stringify(body),
      dataSchema: TenantSchema
}),
  updateGym: (id: string, body: Partial<Tenant>) => apiFetch<ApiResponse<Tenant>>(`${GymsUrlConfig.BACKEND_API.BASE}/${id}`, { method: 'PATCH', body: JSON.stringify(body),
      dataSchema: TenantSchema
}),
  changeGymStatus: (id: string, status: string) => apiFetch<ApiResponse<Tenant>>(`${GymsUrlConfig.BACKEND_API.BASE}/${id}/status`, { method: 'PATCH', body: JSON.stringify({ status }),
      dataSchema: TenantSchema
}),
  impersonateTenant: (id: string) => apiFetch<ApiResponse<{ token: string }>>(`${GymsUrlConfig.BACKEND_API.IMPERSONATE}/${id}/impersonate`, { method: 'POST',
      dataSchema: z.object({ token: z.string() })
}),
  deleteGym: (id: string) => apiFetch<ApiResponse<void>>(`${GymsUrlConfig.BACKEND_API.BASE}/${id}`, { method: 'DELETE',
      dataSchema: z.object({}).passthrough()
}),
  fetchGymStats: () => apiFetch<ApiResponse<GymStats>>(`${GymsUrlConfig.BACKEND_API.BASE}/stats`, { dataSchema: GymStatsSchema }),
  emailGymOwner: (id: string, body: { subject: string; message: string;[key: string]: unknown }) => apiFetch<ApiResponse<void>>(`${GymsUrlConfig.BACKEND_API.BASE}/${id}/email`, { method: 'POST', body: JSON.stringify(body),
      dataSchema: z.object({}).passthrough()
}),
  exportGymsCSV: (params?: Record<string, string>) => {
    const q = params ? '?' + new URLSearchParams(params).toString() : '';
    return apiFetch<ApiResponse<{ downloadUrl: string }>>(`${GymsUrlConfig.BACKEND_API.BASE}/export${q}`, { dataSchema: z.object({ downloadUrl: z.string() }) });
  },
  /** Provisions a brand-new isolated tenant database and creates the gym in the SaaS system. */
  provisionGym: (body: Record<string, unknown>) =>
    apiFetch<ApiResponse<Tenant>>(`${GymsUrlConfig.BACKEND_API.BASE}/provision`, {
      method: 'POST',
      body: JSON.stringify(body),
        dataSchema: TenantSchema
    }),
  /** Sends the impersonation token to the proxy endpoint to set it as an HTTP-only cookie. */
  setGhostLoginCookie: (token: string, id: string) => 
    apiFetch<ApiResponse<void>>(GymsUrlConfig.GHOST_LOGIN.SET_COOKIE_PROXY, {
      method: 'POST',
      body: JSON.stringify({
        token,
        refreshToken: token,
        user: { role: 'ADMIN', email: `admin-${id}@gym.com`, name: 'Impersonated Admin', tenantId: id, id: `user-${id}` },
      }),
      dataSchema: z.object({}).passthrough(),
    }),
};
