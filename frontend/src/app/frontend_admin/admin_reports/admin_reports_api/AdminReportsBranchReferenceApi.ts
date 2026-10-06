// RESPONSIBILITY: Fetches minimal branch reference data for the Admin reports module without importing the Branches business module.
import { apiFetch, type ApiResponse } from '@/lib/api';
import { z } from 'zod';
import { ADMIN_REPORTS_API } from '@/app/frontend_admin/admin_reports/admin_reports_url_config';
import type { AdminReportsBranchReference } from '@/app/frontend_admin/admin_reports/admin_reports_types/AdminReportsBranchReferenceTypes';
const schema = z.object({ items: z.array(z.object({ id: z.string(), name: z.string() })) });
export const AdminReportsBranchReferenceApi = { fetchReportBranchReferences: () => apiFetch<ApiResponse<{ items: AdminReportsBranchReference[] }>>(`${ADMIN_REPORTS_API.branchReference}?consumer=reports`, { method: 'GET', dataSchema: schema }) };
