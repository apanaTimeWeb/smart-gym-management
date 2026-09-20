// DATA FLOW: URL/UI filters → ManagerUseManagerAttendanceQueries → ManagerAttendanceApi → TanStack Query → Attendance UI.
'use client';
/** Defines the Manager Attendance TanStack Query keys and server-state hooks. */
import { useQuery } from '@tanstack/react-query';
import { attendanceApi } from '@/app/manager/attendance/attendance_api/ManagerAttendanceApi';
import type { ManagerAttendancePersonType } from '@/app/manager/attendance/attendance_types/ManagerAttendanceTypes';


export const managerAttendanceQueryKeys = {
  all: ['manager', 'attendance'] as const,
  list: (params?: Record<string, string>) => [...managerAttendanceQueryKeys.all, 'list', params] as const,
  todayStats: () => [...managerAttendanceQueryKeys.all, 'todayStats'] as const,
  history: (userId: string, type: ManagerAttendancePersonType, month: string) => [...managerAttendanceQueryKeys.all, 'history', userId, type, month] as const,
  members: (params?: Record<string, string>) => [...managerAttendanceQueryKeys.all, 'members', params] as const,
  staff: (params?: Record<string, string>) => [...managerAttendanceQueryKeys.all, 'staff', params] as const };

/** Orchestrates the owning Manager feature behavior while preserving its documented state boundary. */
export function useAttendanceListQuery(params?: Record<string, string>) {
  return useQuery({
    queryKey: managerAttendanceQueryKeys.list(params),
    queryFn: async () => {
      const res = await attendanceApi.fetchAttendanceRecords(params);
      return res.data;
    } });
}

/** Orchestrates the owning Manager feature behavior while preserving its documented state boundary. */
export function useFetchStaff(params: Record<string, string>) {
  return useQuery({
    queryKey: managerAttendanceQueryKeys.staff(params),
    queryFn: async () => {
      const res = await attendanceApi.fetchAttendanceStaff(params);
      return res.data;
    } });
}

/** Orchestrates the owning Manager feature behavior while preserving its documented state boundary. */
export function useTodayStatsQuery() {
  return useQuery({
    queryKey: managerAttendanceQueryKeys.todayStats(),
    queryFn: () => attendanceApi.fetchAttendanceStats().then(res => res.data) });
}

/** Orchestrates the owning Manager feature behavior while preserving its documented state boundary. */
export function useAttendanceHistoryQuery(userId: string, type: ManagerAttendancePersonType, month: string) {
  return useQuery({
    queryKey: managerAttendanceQueryKeys.history(userId, type, month),
    queryFn: () => attendanceApi.fetchAttendanceHistory(userId, type, month).then(res => res.data),
    enabled: Boolean(userId) });
}

/** Orchestrates the owning Manager feature behavior while preserving its documented state boundary. */
export function useActiveMembersQuery() {
  const params = { limit: '1000', status: 'active' };
  return useQuery({
    queryKey: managerAttendanceQueryKeys.members(params),
    queryFn: () => attendanceApi.fetchAttendanceMembers(params).then(res => res.data) });
}

/** Orchestrates the owning Manager feature behavior while preserving its documented state boundary. */
export function useStaffQuery() {
  return useQuery({
    queryKey: managerAttendanceQueryKeys.staff(),
    queryFn: () => attendanceApi.fetchAttendanceStaff().then(res => res.data) });
}
