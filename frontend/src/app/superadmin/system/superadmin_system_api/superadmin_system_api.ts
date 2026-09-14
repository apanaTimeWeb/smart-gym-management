// RESPONSIBILITY: Modularized API client for the System module. All methods import apiFetch from src/lib/api.ts and define only superadmin-scoped endpoints. No UI logic.
import { SystemUrlConfig } from '@/app/superadmin/system/system_url_config';
import { apiFetch } from '@/lib/api';
import type { ApiResponse } from '@/lib/api';
import { z } from "zod";

export const systemApi = {
  fetchSystemInfo: () => apiFetch<ApiResponse<unknown>>(SystemUrlConfig.BACKEND_API.BASE, { dataSchema: z.any() }),
  fetchHealthProbe: () => apiFetch<ApiResponse<unknown>>(`${SystemUrlConfig.BACKEND_API.BASE}/health`, { dataSchema: z.any() }),
};
