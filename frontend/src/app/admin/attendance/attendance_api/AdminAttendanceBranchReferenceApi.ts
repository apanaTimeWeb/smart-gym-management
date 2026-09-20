// RESPONSIBILITY: Fetches minimal branch reference data for the Admin attendance module without importing the Branches business module.
import { apiFetch, type ApiResponse } from '@/lib/api';
import { z } from 'zod';
import { AdminAttendanceUrlConfig } from '@/app/admin/attendance/admin_attendance_url_config';
import type { AdminAttendanceBranchReference } from '@/app/admin/attendance/attendance_types/AdminAttendanceBranchReferenceTypes';
const schema = z.array(z.object({ id: z.string(), name: z.string() }));
export const AdminAttendanceBranchReferenceApi = { fetchAttendanceBranchReferences: () => apiFetch<ApiResponse<AdminAttendanceBranchReference[]>>(`${AdminAttendanceUrlConfig.api.branchReference}?consumer=attendance`, { method: 'GET', dataSchema: schema }) };
