// RESPONSIBILITY: Encapsulates functionality for superadmin_usage-meters_api.ts
import { UsageMeterSchema } from '@/app/superadmin/usage-meters/usage-meters_types/SuperadminUsageMetersTypes';
import { apiFetch } from '@/lib/api';
import type { ApiResponse } from '@/lib/api';
import type { UsageMeter } from '@/app/superadmin/usage-meters/usage-meters_types/SuperadminUsageMetersTypes';
import { UsageMetersUrlConfig } from '@/app/superadmin/usage-meters/superadmin_usage_meters_url_config';
import { z } from "zod";
export const usageMetersApi = {
    fetchUsageMeters: (params?: Record<string, string>) => {
        const q = params ? '?' + new URLSearchParams(params).toString() : '';
        return apiFetch<ApiResponse<UsageMeter[]>>(`${UsageMetersUrlConfig.BACKEND_API.BASE}${q}`, { dataSchema: z.array(UsageMeterSchema) });
    },
};
