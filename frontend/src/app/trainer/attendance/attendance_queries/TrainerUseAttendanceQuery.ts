// RESPONSIBILITY: TanStack Query hooks for Attendance module server state.
// DATA FLOW: attendance_api → useQuery → components (read-only)
import { useQuery } from '@tanstack/react-query';
import { getUser } from '@/lib/api';
import {
  fetchAttendanceRecords,
  fetchAttendanceStats,
  fetchAttendanceMembersBasic,
} from '@/app/trainer/attendance/attendance_api/TrainerAttendance_api';
import type { TrainerAttendanceFetchParams, TrainerAttendanceRecordsQueryParams } from '@/app/trainer/attendance/attendance_types/TrainerAttendanceInteractionTypes';

/** Fetches paginated attendance records, scoped by tab and filters. */
export function useAttendanceRecordsQuery({ tab, search, filterDate, currentPage }: TrainerAttendanceRecordsQueryParams) {
  const user = getUser();
  const params: TrainerAttendanceFetchParams = {
    page: currentPage,
    limit: 10,
    type: tab === 'Members' ? 'MEMBER' : 'STAFF',
    search: search || undefined,
    date: filterDate !== 'All Time' ? filterDate : undefined,
    staffId: tab === 'My Attendance' && user?.id ? String(user.id) : undefined,
  };

  return useQuery({
    queryKey: ['trainer', 'attendance', 'records', params],
    queryFn: () => fetchAttendanceRecords(params),
    staleTime: 2 * 60 * 1000,
    placeholderData: (prev) => prev,
  });
}

/** Fetches today's attendance stats KPIs. */
export function useAttendanceStatsQuery() {
  return useQuery({
    queryKey: ['trainer', 'attendance', 'stats'],
    queryFn: fetchAttendanceStats,
    staleTime: 5 * 60 * 1000,
  });
}

/** Fetches the basic members list for the attendance modal dropdown. */
export function useAttendanceMembersQuery() {
  return useQuery({
    queryKey: ['trainer', 'attendance', 'members'],
    queryFn: fetchAttendanceMembersBasic,
    staleTime: 60 * 60 * 1000,
  });
}
