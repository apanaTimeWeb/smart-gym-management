import { apiFetch } from '@/lib/api';
import type { ApiResponse } from '@/lib/api';
import type { UsageMeter } from '@/app/superadmin/usage-meters/usage-meters_types/usage-meters_types';

export const usageMetersApi = {
  getAll: () => apiFetch<ApiResponse<UsageMeter[]>>('/api/superadmin/usage-meters'),
};
