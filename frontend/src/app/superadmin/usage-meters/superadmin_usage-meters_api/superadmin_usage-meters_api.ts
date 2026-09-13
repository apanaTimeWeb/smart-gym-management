import { apiFetch } from '@/lib/api';
import type { ApiResponse } from '@/lib/api';
import type { UsageMeter } from '@/app/superadmin/usage-meters/superadmin_usage-meters_types/superadmin_usage-meters_types';

import { MOCK_SUPERADMIN_USAGE_METERS } from '@/app/superadmin/usage-meters/superadmin_usage-meters_api/SuperadminUsageMetersMockData';

export const usageMetersApi = {
  fetchUsageMeters: async (params?: Record<string, string>) => {
    await new Promise(r => setTimeout(r, 400));
    return { success: true, message: 'Success', data: MOCK_SUPERADMIN_USAGE_METERS };
  },
};
