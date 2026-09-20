// RESPONSIBILITY: Fetches minimal branch reference data for the Admin hr module without importing the Branches business module.
import { apiFetch, type ApiResponse } from '@/lib/api';
import { z } from 'zod';
import { AdminHrUrlConfig } from '@/app/admin/hr/admin_hr_url_config';
import type { AdminHrBranchReference } from '@/app/admin/hr/hr_types/AdminHrBranchReferenceTypes';
const schema = z.array(z.object({ id: z.string(), name: z.string() }));
export const AdminHrBranchReferenceApi = { fetchHrBranchReferences: () => apiFetch<ApiResponse<AdminHrBranchReference[]>>(`${AdminHrUrlConfig.BACKEND_API.BRANCH_REFERENCE}?consumer=hr`, { method: 'GET', dataSchema: schema }) };
