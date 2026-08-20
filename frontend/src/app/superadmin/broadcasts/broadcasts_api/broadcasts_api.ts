import { apiFetch } from '@/lib/api';
import type { ApiResponse } from '@/app/superadmin/superadmin_types/superadmin_types';
import { SuperadminUrlConfig } from '@/app/superadmin/superadmin_url_config';
import type { Broadcast } from '@/app/superadmin/broadcasts/broadcasts_types/broadcasts_types';

export const broadcastsApi = {
  getAll: (params?: Record<string, string>) => {
    const q = params ? '?' + new URLSearchParams(params).toString() : '';
    return apiFetch<ApiResponse<Broadcast[]>>(`${SuperadminUrlConfig.BACKEND_API.BROADCASTS_BASE}${q}`);
  },
  create: (body: Partial<Broadcast>) => apiFetch<ApiResponse<Broadcast>>(SuperadminUrlConfig.BACKEND_API.BROADCASTS_BASE, { method: 'POST', body: JSON.stringify(body) }),
  update: (id: string, body: Partial<Broadcast>) => apiFetch<ApiResponse<Broadcast>>(`${SuperadminUrlConfig.BACKEND_API.BROADCASTS_BASE}/${id}`, { method: 'PATCH', body: JSON.stringify(body) }),
  remove: (id: string) => apiFetch<ApiResponse<void>>(`${SuperadminUrlConfig.BACKEND_API.BROADCASTS_BASE}/${id}`, { method: 'DELETE' }),
  send: (id: string) => apiFetch<ApiResponse<void>>(`${SuperadminUrlConfig.BACKEND_API.BROADCASTS_BASE}/${id}/send`, { method: 'POST' }),
};
