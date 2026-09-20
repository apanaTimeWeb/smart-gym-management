'use client';
// RESPONSIBILITY: Owns TanStack Query access for Attendance server state and explicitly propagates every URL filter to the API.
// DATA FLOW: Attendance URL state → useAttendanceRecordsQuery params → attendance_api → TanStack Query → UI
import { useQuery } from '@tanstack/react-query';
import { getUser } from '@/lib/api';
import { fetchAttendanceRecords, fetchAttendanceStats, fetchAttendanceMembersBasic } from '@/app/trainer/attendance/attendance_api/TrainerAttendance_api';
import { useDebounce } from '@/app/trainer/trainer_utils/TrainerUseDebounce';
import type { TrainerAttendanceFetchParams, TrainerAttendanceRecordsQueryParams } from '@/app/trainer/attendance/attendance_types/TrainerAttendanceInteractionTypes';

/** Fetches paginated attendance records with server-side search/filter/sort/page semantics. */
export function useAttendanceRecordsQuery({ tab, search, filterDate, currentPage, sortBy, sortDirection }: TrainerAttendanceRecordsQueryParams) {
  const user = getUser();
  const debouncedSearch = useDebounce(search, 300);
  const params: TrainerAttendanceFetchParams = {
    page: currentPage,
    limit: 10,
    type: tab === 'Members' ? 'MEMBER' : 'STAFF',
    search: debouncedSearch || undefined,
    date: filterDate !== 'All Time' ? filterDate : undefined,
    staffId: tab === 'My Attendance' && user?.id ? String(user.id) : undefined,
    sortBy,
    sortDirection,
  };

  return useQuery({
    queryKey: ['trainer', 'attendance', 'records', params],
    queryFn: () => fetchAttendanceRecords(params),
    staleTime: 2 * 60 * 1000,
    placeholderData: (previous) => previous,
  });
}

/** Fetches Attendance dashboard KPI statistics. */
export function useAttendanceStatsQuery() {
  return useQuery({ queryKey: ['trainer', 'attendance', 'stats'], queryFn: fetchAttendanceStats, staleTime: 5 * 60 * 1000 });
}

/** Fetches the member options needed by the Attendance form. */
export function useAttendanceMembersQuery() {
  return useQuery({ queryKey: ['trainer', 'attendance', 'members'], queryFn: fetchAttendanceMembersBasic, staleTime: 60 * 60 * 1000 });
}
