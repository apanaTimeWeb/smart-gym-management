// RESPONSIBILITY: Fetches minimal branch reference data for the Admin members module without importing the Branches business module.
import { apiFetch, type ApiResponse } from '@/lib/api';
import { z } from 'zod';
import { ADMIN_MEMBERS_API } from '@/app/frontend_admin/admin_members/admin_members_url_config';
import type { AdminMembersBranchReference } from '@/app/frontend_admin/admin_members/admin_members_types/AdminMembersBranchReferenceTypes';
const schema = z.object({ items: z.array(z.object({ id: z.string(), name: z.string() })) });
export const AdminMembersBranchReferenceApi = { fetchMemberBranchReferences: () => apiFetch<ApiResponse<{ items: AdminMembersBranchReference[] }>>(`${ADMIN_MEMBERS_API.branchReference}?consumer=members`, { method: 'GET', dataSchema: schema }) };
