import { useQuery } from '@tanstack/react-query';
import { attendanceApi } from '@/app/manager/attendance/attendance_api/ManagerAttendanceApi';

export const managerAttendanceQueryKeys = {
  all: ['manager', 'members', 'attendance'] as const,
  list: (params?: Record<string, string>) => [...managerAttendanceQueryKeys.all, 'list', params] as const,
  todayStats: () => [...managerAttendanceQueryKeys.all, 'todayStats'] as const,
  history: (userId: string, type: 'MEMBER' | 'STAFF', month: string) => [...managerAttendanceQueryKeys.all, 'history', userId, type, month] as const,
  members: () => ['manager', 'members', 'list', 'active'] as const,
  staff: () => ['manager', 'staff', 'list'] as const,
};

export function useAttendanceListQuery(params?: Record<string, string>) {
  return useQuery({
    queryKey: ['manager', 'attendance', 'list', params],
    queryFn: async () => {
      const res = await attendanceApi.getAll(params);
      return res.data;
    },
  });
}

export function useFetchStaff(params: Record<string, string>) {
  return useQuery({
    queryKey: ['manager', 'members', 'attendance', 'staff', params],
    queryFn: async () => {
      const res = await attendanceApi.getStaff(params);
      return res.data;
    },
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
    queryKey: ['manager', 'attendance', 'members', 'active'],
    queryFn: () => attendanceApi.getMembers({ limit: '1000', status: 'active' }).then(res => res.data),
  });
}

export function useStaffQuery() {
  return useQuery({
    queryKey: managerAttendanceQueryKeys.staff(),
    queryFn: () => attendanceApi.getStaff().then(res => res.data),
  });
}
