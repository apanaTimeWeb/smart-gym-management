// RESPONSIBILITY: Modularized API client for the Gyms module. All methods import apiFetch from src/lib/api.ts.
import { SuperadminUrlConfig } from '@/app/superadmin/superadmin_url_config';
import { apiFetch } from '@/lib/api';
import type { ApiResponse } from '@/lib/api';
import type { Tenant } from '@/app/superadmin/gyms/gyms_types/gyms_types';

export const gymsApi = {
  getAll: (params?: Record<string, string>) => {
    const q = params ? '?' + new URLSearchParams(params).toString() : '';
    return apiFetch<ApiResponse<Tenant[]>>(`${SuperadminUrlConfig.BACKEND_API.GYMS_BASE}${q}`);
  },
  getOne: (id: string) => apiFetch<ApiResponse<Tenant>>(`${SuperadminUrlConfig.BACKEND_API.GYMS_BASE}/${id}`),
  create: (body: Partial<Tenant>) => apiFetch<ApiResponse<Tenant>>(SuperadminUrlConfig.BACKEND_API.GYMS_BASE, { method: 'POST', body: JSON.stringify(body) }),
  update: (id: string, body: Partial<Tenant>) => apiFetch<ApiResponse<Tenant>>(`${SuperadminUrlConfig.BACKEND_API.GYMS_BASE}/${id}`, { method: 'PATCH', body: JSON.stringify(body) }),
  changeStatus: (id: string, status: string) => apiFetch<ApiResponse<Tenant>>(`${SuperadminUrlConfig.BACKEND_API.GYMS_BASE}/${id}/status`, { method: 'PATCH', body: JSON.stringify({ status }) }),
  remove: (id: string) => apiFetch<ApiResponse<void>>(`${SuperadminUrlConfig.BACKEND_API.GYMS_BASE}/${id}`, { method: 'DELETE' }),
  getStats: () => apiFetch<ApiResponse<unknown>>(`${SuperadminUrlConfig.BACKEND_API.GYMS_BASE}/stats`),
  emailOwner: (id: string, body: { subject: string; message: string; [key: string]: unknown }) => apiFetch<ApiResponse<void>>(`${SuperadminUrlConfig.BACKEND_API.GYMS_BASE}/${id}/email`, { method: 'POST', body: JSON.stringify(body) }),
};
