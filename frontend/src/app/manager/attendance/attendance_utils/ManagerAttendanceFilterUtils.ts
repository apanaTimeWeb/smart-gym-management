import type { Attendance } from '@/app/manager/attendance/attendance_types/ManagerAttendanceTypes';
import type { AttendanceTab } from '@/app/manager/attendance/attendance_utils/ManagerAttendanceSharedConstants';

export function filterAndSortAttendance(
  records: Attendance[],
  tab: AttendanceTab,
  search: string,
  dateFilter: string,
  statusFilter: string
): Attendance[] {
  let filtered = [...records];

  if (tab !== 'Daily Attendance Report') {
    filtered = filtered.filter(r => r.type === (tab === 'Member Attendance' ? 'MEMBER' : 'STAFF'));
  }

  if (search) {
    const q = search.toLowerCase();
    filtered = filtered.filter(r =>
      (r.member?.name && r.member.name.toLowerCase().includes(q)) ||
      (r.staff?.name && r.staff.name.toLowerCase().includes(q))
    );
  }

  if (dateFilter) {
    filtered = filtered.filter(r => r.date === dateFilter);
  }

  if (statusFilter && statusFilter !== 'All') {
    filtered = filtered.filter(r => r.status === statusFilter);
  }

  // Sort by newest first
  filtered.sort((a, b) => {
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();
    return dateB - dateA;
  });

  return filtered;
}
