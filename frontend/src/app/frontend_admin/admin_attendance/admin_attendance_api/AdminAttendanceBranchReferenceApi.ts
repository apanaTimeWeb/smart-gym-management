// RESPONSIBILITY: Fetches minimal branch reference data for the Admin attendance module without importing the Branches business module.
import { apiFetch, type ApiResponse } from '@/lib/api';
import { z } from 'zod';
import { ADMIN_ATTENDANCE_API } from '@/app/frontend_admin/admin_attendance/admin_attendance_url_config';
import type { AdminAttendanceBranchReference } from '@/app/frontend_admin/admin_attendance/admin_attendance_types/AdminAttendanceBranchReferenceTypes';
const schema = z.object({ items: z.array(z.object({ id: z.string(), name: z.string() })) });
export const AdminAttendanceBranchReferenceApi = { fetchAttendanceBranchReferences: () => apiFetch<ApiResponse<{ items: AdminAttendanceBranchReference[] }>>(`${ADMIN_ATTENDANCE_API.branchReference}?consumer=attendance`, { method: 'GET', dataSchema: schema }) };
