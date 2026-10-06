// RESPONSIBILITY: Fetches minimal branch reference data for the Admin hr module without importing the Branches business module.
import { apiFetch, type ApiResponse } from '@/lib/api';
import { z } from 'zod';
import { ADMIN_HR_API } from '@/app/frontend_admin/admin_hr/admin_hr_url_config';
import type { AdminHrBranchReference } from '@/app/frontend_admin/admin_hr/admin_hr_types/AdminHrBranchReferenceTypes';
const schema = z.object({ items: z.array(z.object({ id: z.string(), name: z.string() })) });
export const AdminHrBranchReferenceApi = { fetchHrBranchReferences: () => apiFetch<ApiResponse<{ items: AdminHrBranchReference[] }>>(`${ADMIN_HR_API.branchReference}?consumer=hr`, { method: 'GET', dataSchema: schema }) };
