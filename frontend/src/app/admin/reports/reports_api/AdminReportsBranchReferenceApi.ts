// RESPONSIBILITY: Fetches minimal branch reference data for the Admin reports module without importing the Branches business module.
import { apiFetch, type ApiResponse } from '@/lib/api';
import { z } from 'zod';
import { AdminReportsUrlConfig } from '@/app/admin/reports/admin_reports_url_config';
import type { AdminReportsBranchReference } from '@/app/admin/reports/reports_types/AdminReportsBranchReferenceTypes';
const schema = z.array(z.object({ id: z.string(), name: z.string() }));
export const AdminReportsBranchReferenceApi = { fetchReportBranchReferences: () => apiFetch<ApiResponse<AdminReportsBranchReference[]>>(`${AdminReportsUrlConfig.api.branchReference}?consumer=reports`, { method: 'GET', dataSchema: schema }) };
