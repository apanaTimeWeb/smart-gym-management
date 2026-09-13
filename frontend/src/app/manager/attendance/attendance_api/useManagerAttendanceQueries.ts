import { useQuery } from '@tanstack/react-query';
import { attendanceApi } from '@/app/manager/attendance/attendance_api/ManagerAttendanceApi';
import { membersApi } from '@/app/manager/members/members_api/ManagerMembersApi';
import { hrApi } from '@/app/manager/hr/hr_api/ManagerHrApi';

export const managerAttendanceQueryKeys = {
  all: ['manager', 'attendance'] as const,
  list: (params?: Record<string, string>) => [...managerAttendanceQueryKeys.all, 'list', params] as const,
  todayStats: () => [...managerAttendanceQueryKeys.all, 'todayStats'] as const,
  history: (userId: string, type: 'MEMBER' | 'STAFF', month: string) => [...managerAttendanceQueryKeys.all, 'history', userId, type, month] as const,
  members: () => ['manager', 'members', 'list', 'active'] as const,
  staff: () => ['manager', 'staff', 'list'] as const,
};

export function useAttendanceListQuery(params?: Record<string, string>) {
  return useQuery({
    queryKey: managerAttendanceQueryKeys.list(params),
    queryFn: () => attendanceApi.getAll(params).then(res => res.data),
  });
}

export function useTodayStatsQuery() {
  return useQuery({
    queryKey: managerAttendanceQueryKeys.todayStats(),
    queryFn: () => attendanceApi.getTodayStats().then(res => res.data),
  });
}

export function useAttendanceHistoryQuery(userId: string, type: 'MEMBER' | 'STAFF', month: string) {
  return useQuery({
    queryKey: managerAttendanceQueryKeys.history(userId, type, month),
    queryFn: () => attendanceApi.getHistory(userId, type, month).then(res => res.data),
    enabled: !!userId,
  });
}

export function useActiveMembersQuery() {
  return useQuery({
    queryKey: managerAttendanceQueryKeys.members(),
    queryFn: () => membersApi.getAll({ limit: '1000', status: 'active' }).then(res => res.data),
  });
}

export function useStaffQuery() {
  return useQuery({
    queryKey: managerAttendanceQueryKeys.staff(),
    queryFn: () => hrApi.getStaff().then(res => res.data),
  });
}
