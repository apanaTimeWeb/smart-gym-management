// RESPONSIBILITY: Encapsulates functionality for superadmin_reports_api.ts
import { RevenueRowSchema, CancellationsRecordSchema, TenantHealthScoreSchema } from '@/app/superadmin/reports/reports_types/SuperadminReportsTypes';
import { apiFetch } from '@/lib/api';
import type { ApiResponse } from '@/lib/api';
import type { RevenueRow, CancellationsRecord, TenantHealthScore } from '@/app/superadmin/reports/reports_types/SuperadminReportsTypes';
import { ReportsUrlConfig } from '@/app/superadmin/reports/superadmin_reports_url_config';
import { z } from "zod";
export const superadminReportsApi = {
    fetchRevenueData: (params?: Record<string, string>) => {
        const q = params ? '?' + new URLSearchParams(params).toString() : '';
        return apiFetch<ApiResponse<RevenueRow[]>>(`${ReportsUrlConfig.BACKEND_API.BASE}/revenue${q}`, { dataSchema: z.array(RevenueRowSchema) });
    },
    fetchCancellationsData: (params?: Record<string, string>) => {
        const q = params ? '?' + new URLSearchParams(params).toString() : '';
        return apiFetch<ApiResponse<CancellationsRecord[]>>(`${ReportsUrlConfig.BACKEND_API.BASE}/cancellations${q}`, { dataSchema: z.array(CancellationsRecordSchema) });
    },
    fetchHealthData: (params?: Record<string, string>) => {
        const q = params ? '?' + new URLSearchParams(params).toString() : '';
        return apiFetch<ApiResponse<TenantHealthScore[]>>(`${ReportsUrlConfig.BACKEND_API.BASE}/health${q}`, { dataSchema: z.array(TenantHealthScoreSchema) });
    },
};
