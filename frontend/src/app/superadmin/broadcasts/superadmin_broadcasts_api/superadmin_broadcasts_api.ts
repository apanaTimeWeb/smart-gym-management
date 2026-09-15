import { BroadcastSchema, BroadcastResponseSchema } from '@/app/superadmin/broadcasts/superadmin_broadcasts_types/superadmin_broadcasts_types';
// RESPONSIBILITY: Modularized API client for the Broadcasts module. All methods import apiFetch from src/lib/api.ts and define only superadmin-scoped endpoints. No UI logic.
import { BroadcastsUrlConfig } from '@/app/superadmin/broadcasts/superadmin_broadcasts_url_config';
import { apiFetch } from '@/lib/api';
import type { ApiResponse } from '@/lib/api';
import type { Broadcast, BroadcastFormData } from '@/app/superadmin/broadcasts/superadmin_broadcasts_types/superadmin_broadcasts_types';
import { z } from "zod";

export const broadcastsApi = {
  fetchBroadcasts: (params?: Record<string, string>) => {
    const q = params ? '?' + new URLSearchParams(params).toString() : '';
    return apiFetch<ApiResponse<Broadcast[]>>(`${BroadcastsUrlConfig.BACKEND_API.BASE}${q}`, { dataSchema: z.array(BroadcastResponseSchema) });
  },
  createBroadcast: (body: BroadcastFormData) => apiFetch<ApiResponse<Broadcast>>(BroadcastsUrlConfig.BACKEND_API.BASE, { method: 'POST', body: JSON.stringify(body),
      dataSchema: BroadcastSchema
}),
  deleteBroadcast: (id: string) => apiFetch<ApiResponse<void>>(`${BroadcastsUrlConfig.BACKEND_API.BASE}/${id}`, { method: 'DELETE',
      dataSchema: z.object({}).passthrough()
}),
  updateBroadcast: (id: string, body: Partial<BroadcastFormData>) => apiFetch<ApiResponse<Broadcast>>(`${BroadcastsUrlConfig.BACKEND_API.BASE}/${id}`, { method: 'PATCH', body: JSON.stringify(body),
      dataSchema: BroadcastResponseSchema
}),
  fetchTenants: () => apiFetch<ApiResponse<any[]>>('/superadmin/gyms-list'),
  fetchRecipientCount: () => apiFetch<ApiResponse<{ count: number }>>(`${BroadcastsUrlConfig.BACKEND_API.BASE}/recipient-count`, { dataSchema: z.object({}).passthrough() }),
};
