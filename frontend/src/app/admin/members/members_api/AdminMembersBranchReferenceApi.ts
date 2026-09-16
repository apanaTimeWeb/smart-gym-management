// RESPONSIBILITY: Fetches minimal branch reference data for the Admin members module without importing the Branches business module.
import { apiFetch, type ApiResponse } from '@/lib/api';
import { z } from 'zod';
import { AdminMembersUrlConfig } from '@/app/admin/members/admin_members_url_config';
import type { AdminMembersBranchReference } from '@/app/admin/members/members_types/AdminMembersBranchReferenceTypes';
const schema = z.array(z.object({ id: z.string(), name: z.string() }));
export const AdminMembersBranchReferenceApi = { fetch: () => apiFetch<ApiResponse<AdminMembersBranchReference[]>>(`${AdminMembersUrlConfig.api.branchReference}?consumer=members`, { method: 'GET', dataSchema: schema }) };
