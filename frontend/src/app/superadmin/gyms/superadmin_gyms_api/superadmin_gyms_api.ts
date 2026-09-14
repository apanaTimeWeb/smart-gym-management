// RESPONSIBILITY: Modularized API client for the Gyms module. All methods import apiFetch from src/lib/api.ts and define only superadmin-scoped endpoints. No UI logic.
import { SuperadminGymsUrlConfig } from '@/app/superadmin/gyms/superadmin_gyms_url_config';
import { apiFetch } from '@/lib/api';
import type { ApiResponse } from '@/lib/api';
import type { Tenant } from '@/app/superadmin/superadmin_types/superadmin_types';

export const gymsApi = {
  fetchGyms: (params?: Record<string, string>) => {
    const q = params ? '?' + new URLSearchParams(params).toString() : '';
    return apiFetch<ApiResponse<Tenant[]>>(`${SuperadminGymsUrlConfig.BACKEND_API.GYMS_BASE}${q}`);
  },
  fetchGymById: (id: string) => apiFetch<ApiResponse<Tenant>>(`${SuperadminGymsUrlConfig.BACKEND_API.GYMS_BASE}/${id}`),
  createGym: (body: Partial<Tenant>) => apiFetch<ApiResponse<Tenant>>(SuperadminGymsUrlConfig.BACKEND_API.GYMS_BASE, { method: 'POST', body: JSON.stringify(body) }),
  updateGym: (id: string, body: Partial<Tenant>) => apiFetch<ApiResponse<Tenant>>(`${SuperadminGymsUrlConfig.BACKEND_API.GYMS_BASE}/${id}`, { method: 'PATCH', body: JSON.stringify(body) }),
  changeGymStatus: (id: string, status: string) => apiFetch<ApiResponse<Tenant>>(`${SuperadminGymsUrlConfig.BACKEND_API.GYMS_BASE}/${id}/status`, { method: 'PATCH', body: JSON.stringify({ status }) }),
  impersonateTenant: (id: string) => apiFetch<ApiResponse<{ token: string }>>(`${SuperadminGymsUrlConfig.BACKEND_API.IMPERSONATE_BASE}/${id}/impersonate`, { method: 'POST' }),
  deleteGym: (id: string) => apiFetch<ApiResponse<void>>(`${SuperadminGymsUrlConfig.BACKEND_API.GYMS_BASE}/${id}`, { method: 'DELETE' }),
  fetchGymStats: () => apiFetch<ApiResponse<unknown>>(`${SuperadminGymsUrlConfig.BACKEND_API.GYMS_BASE}/stats`),
  emailGymOwner: (id: string, body: { subject: string; message: string;[key: string]: unknown }) => apiFetch<ApiResponse<void>>(`${SuperadminGymsUrlConfig.BACKEND_API.GYMS_BASE}/${id}/email`, { method: 'POST', body: JSON.stringify(body) }),
  exportGymsCSV: (params?: Record<string, string>) => {
    const q = params ? '?' + new URLSearchParams(params).toString() : '';
    return apiFetch<ApiResponse<{ downloadUrl: string }>>(`${SuperadminGymsUrlConfig.BACKEND_API.GYMS_BASE}/export${q}`);
  },
};
