"use client";
// RESPONSIBILITY: Provides minimal branch options to the Admin attendance UI without cross-module imports.
import { ADMIN_ATTENDANCE_QUERY_KEYS } from '@/app/frontend_admin/admin_attendance/admin_attendance_constants/AdminAttendanceQueryKeys';
// DATA FLOW: AdminAttendanceBranchReferenceApi → TanStack Query → Admin attendance component.
import { useQuery } from '@tanstack/react-query';
import { AdminAttendanceBranchReferenceApi } from '@/app/frontend_admin/admin_attendance/admin_attendance_api/AdminAttendanceBranchReferenceApi';
/**
 * @description useAdminAttendanceBranchReference: Provides minimal branch options to the Admin attendance UI without cross-module imports.
 * @dependencies Consumes AdminAttendanceQueryKeys, AdminAttendanceBranchReferenceApi.
 * @edge-case Preserves documented loading, empty, error, permission, and recovery behavior without owning presentation.
 */
export function useAdminAttendanceBranchReference() {
  return useQuery({ queryKey: ADMIN_ATTENDANCE_QUERY_KEYS.key('branch-reference'), queryFn: async () => (await AdminAttendanceBranchReferenceApi.fetchAttendanceBranchReferences()).data?.items ?? [], staleTime: 300000 });
}
