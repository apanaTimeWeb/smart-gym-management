// RESPONSIBILITY: Modularized API client for the Broadcasts module. All methods import apiFetch from src/lib/api.ts and define only superadmin-scoped endpoints. No UI logic.
import { SuperadminBroadcastsUrlConfig } from '@/app/superadmin/broadcasts/superadmin_broadcasts_url_config';
import { apiFetch } from '@/lib/api';
import type { ApiResponse } from '@/lib/api';

export const broadcastsApi = {
  sendBroadcast: (message: string) => apiFetch<ApiResponse<void>>(SuperadminBroadcastsUrlConfig.BACKEND_API.BROADCASTS_BASE, { method: 'POST', body: JSON.stringify({ message }) }),
  fetchRecipientCount: () => apiFetch<ApiResponse<{ count: number }>>(`${SuperadminBroadcastsUrlConfig.BACKEND_API.BROADCASTS_BASE}/recipient-count`),
};
