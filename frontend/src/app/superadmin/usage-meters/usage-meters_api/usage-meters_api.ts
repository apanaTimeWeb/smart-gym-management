import { apiFetch } from '@/lib/api';
import type { ApiResponse } from '@/lib/api';
import type { UsageMeter } from '../usage-meters_types/usage-meters_types';

export const usageMetersApi = {
  getAll: () => apiFetch<ApiResponse<UsageMeter[]>>('/api/superadmin/usage-meters'),
};
