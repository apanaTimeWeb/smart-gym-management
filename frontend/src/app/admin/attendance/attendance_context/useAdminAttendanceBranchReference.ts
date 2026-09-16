"use client";
// RESPONSIBILITY: Provides minimal branch options to the Admin attendance UI without cross-module imports.
// DATA FLOW: AdminAttendanceBranchReferenceApi → TanStack Query → Admin attendance component.
import { useQuery } from '@tanstack/react-query';
import { AdminAttendanceBranchReferenceApi } from '@/app/admin/attendance/attendance_api/AdminAttendanceBranchReferenceApi';
export function useAdminAttendanceBranchReference() {
  return useQuery({ queryKey: ['admin','attendance','branch-reference'], queryFn: async () => (await AdminAttendanceBranchReferenceApi.fetch()).data ?? [], staleTime: 300000 });
}
