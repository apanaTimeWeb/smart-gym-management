// RESPONSIBILITY: Modularized API client for the Gyms module. All methods import apiFetch from src/lib/api.ts and define only superadmin-scoped endpoints. No UI logic.
import { GymsUrlConfig } from '@/app/superadmin/gyms/gyms_url_config';
import { apiFetch } from '@/lib/api';
import type { ApiResponse } from '@/lib/api';
import type { Tenant } from '@/app/superadmin/superadmin_types/superadmin_types';
import { z } from "zod";

export const gymsApi = {
  fetchGyms: (params?: Record<string, string>) => {
    const q = params ? '?' + new URLSearchParams(params).toString() : '';
    return apiFetch<ApiResponse<Tenant[]>>(`${GymsUrlConfig.BACKEND_API.BASE}${q}`, { dataSchema: z.any() });
  },
  fetchGymById: (id: string) => apiFetch<ApiResponse<Tenant>>(`${GymsUrlConfig.BACKEND_API.BASE}/${id}`, { dataSchema: z.any() }),
  createGym: (body: Partial<Tenant>) => apiFetch<ApiResponse<Tenant>>(GymsUrlConfig.BACKEND_API.BASE, { method: 'POST', body: JSON.stringify(body),
      dataSchema: z.any()
}),
  updateGym: (id: string, body: Partial<Tenant>) => apiFetch<ApiResponse<Tenant>>(`${GymsUrlConfig.BACKEND_API.BASE}/${id}`, { method: 'PATCH', body: JSON.stringify(body),
      dataSchema: z.any()
}),
  changeGymStatus: (id: string, status: string) => apiFetch<ApiResponse<Tenant>>(`${GymsUrlConfig.BACKEND_API.BASE}/${id}/status`, { method: 'PATCH', body: JSON.stringify({ status }),
      dataSchema: z.any()
}),
  impersonateTenant: (id: string) => apiFetch<ApiResponse<{ token: string }>>(`${GymsUrlConfig.BACKEND_API.IMPERSONATE}/${id}/impersonate`, { method: 'POST',
      dataSchema: z.any()
}),
  deleteGym: (id: string) => apiFetch<ApiResponse<void>>(`${GymsUrlConfig.BACKEND_API.BASE}/${id}`, { method: 'DELETE',
      dataSchema: z.any()
}),
  fetchGymStats: () => apiFetch<ApiResponse<unknown>>(`${GymsUrlConfig.BACKEND_API.BASE}/stats`, { dataSchema: z.any() }),
  emailGymOwner: (id: string, body: { subject: string; message: string;[key: string]: unknown }) => apiFetch<ApiResponse<void>>(`${GymsUrlConfig.BACKEND_API.BASE}/${id}/email`, { method: 'POST', body: JSON.stringify(body),
      dataSchema: z.any()
}),
  exportGymsCSV: (params?: Record<string, string>) => {
    const q = params ? '?' + new URLSearchParams(params).toString() : '';
    return apiFetch<ApiResponse<{ downloadUrl: string }>>(`${GymsUrlConfig.BACKEND_API.BASE}/export${q}`, { dataSchema: z.any() });
  },
  /** Provisions a brand-new isolated tenant database and creates the gym in the SaaS system. */
  provisionGym: (body: Record<string, unknown>) =>
    apiFetch<ApiResponse<Tenant>>(`${GymsUrlConfig.BACKEND_API.BASE}/provision`, {
      method: 'POST',
      body: JSON.stringify(body),
        dataSchema: z.any()
    }),
};
