// RESPONSIBILITY: Modularized API client for the System module. All methods import apiFetch from src/lib/api.ts and define only superadmin-scoped endpoints. No UI logic.
import { SuperadminSystemUrlConfig } from '@/app/superadmin/system/superadmin_system_url_config';
import { apiFetch } from '@/lib/api';
import type { ApiResponse } from '@/lib/api';

export const systemApi = {
  fetchSystemInfo: () => apiFetch<ApiResponse<unknown>>(SuperadminSystemUrlConfig.BACKEND_API.SYSTEM_BASE),
  fetchHealthProbe: () => apiFetch<ApiResponse<unknown>>(`${SuperadminSystemUrlConfig.BACKEND_API.SYSTEM_BASE}/health`),
};
