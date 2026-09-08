// RESPONSIBILITY: Centralized mock data, filter options, table headers, and chart config for Admin Attendance module.
import type { AdminAttendanceRecord, AdminAttendanceSummary, AdminAttendanceTrendPoint, DateRangeFilter } from '@/app/admin/attendance/attendance_types/attendance_types';

export const ATTENDANCE_ITEMS_PER_PAGE = 10;

export const DATE_RANGE_OPTIONS: { value: DateRangeFilter; label: string }[] = [
  { value: 'today',      label: 'Today' },
  { value: 'yesterday',  label: 'Yesterday' },
  { value: 'this_week',  label: 'This Week' },
  { value: 'this_month', label: 'This Month' },
  { value: 'last_month', label: 'Last Month' },
];

export const ATTENDANCE_STATUS_OPTIONS = [
  { value: 'all',     label: 'All Status' },
  { value: 'present', label: 'Present' },
  { value: 'late',    label: 'Late' },
  { value: 'absent',  label: 'Absent' },
] as const;

export const ATTENDANCE_TABLE_HEADERS = [
  'Member',
  'Branch',
  'Plan',
  'Check-In',
  'Check-Out',
  'Duration',
  'Status',
] as const;

export const ADMIN_MOCK_ATTENDANCE_SUMMARY: AdminAttendanceSummary = {
  todayTotal: 148,
  todayPresent: 131,
  todayLate: 17,
  weeklyAverage: 134,
  peakHour: '7:00 AM – 9:00 AM',
  trendVsLastWeek: 8,
  uniqueMembersThisMonth: 412,
};

export const ADMIN_MOCK_ATTENDANCE_TREND: AdminAttendanceTrendPoint[] = [
  { date: 'Mon', count: 122 },
  { date: 'Tue', count: 138 },
  { date: 'Wed', count: 145 },
  { date: 'Thu', count: 131 },
  { date: 'Fri', count: 148 },
  { date: 'Sat', count: 162 },
  { date: 'Sun', count: 89 },
];

export const ADMIN_MOCK_ATTENDANCE_RECORDS: AdminAttendanceRecord[] = [
  { id: 'a1',  memberId: 'm1',  memberName: 'Rahul Sharma',   memberPhone: '9876543210', branchId: 'b1', branchName: 'Downtown Core',  checkInTime: '06:45 AM', checkOutTime: '08:10 AM', date: '2025-01-17', status: 'present', planName: 'Gold Plan'    },
  { id: 'a2',  memberId: 'm2',  memberName: 'Priya Patel',    memberPhone: '9123456789', branchId: 'b2', branchName: 'Uptown Plaza',   checkInTime: '07:02 AM', checkOutTime: '08:30 AM', date: '2025-01-17', status: 'present', planName: 'Silver Plan'  },
  { id: 'a3',  memberId: 'm4',  memberName: 'Sneha Joshi',    memberPhone: '9871234560', branchId: 'b3', branchName: 'Westside Mall',  checkInTime: '09:18 AM', checkOutTime: '10:45 AM', date: '2025-01-17', status: 'late',    planName: 'Gold Plan'    },
  { id: 'a4',  memberId: 'm6',  memberName: 'Divya Singh',    memberPhone: '9654321098', branchId: 'b3', branchName: 'Westside Mall',  checkInTime: '06:55 AM', checkOutTime: '08:20 AM', date: '2025-01-17', status: 'present', planName: 'Silver Plan'  },
  { id: 'a5',  memberId: 'm9',  memberName: 'Vikram Nair',    memberPhone: '9321098765', branchId: 'b3', branchName: 'Westside Mall',  checkInTime: '07:30 AM', checkOutTime: null,       date: '2025-01-17', status: 'present', planName: 'Annual Pro'   },
  { id: 'a6',  memberId: 'm10', memberName: 'Pooja Iyer',     memberPhone: '9210987654', branchId: 'b1', branchName: 'Downtown Core',  checkInTime: '08:45 AM', checkOutTime: '10:00 AM', date: '2025-01-17', status: 'late',    planName: 'Silver Plan'  },
  { id: 'a7',  memberId: 'm11', memberName: 'Suresh Kumar',   memberPhone: '9109876543', branchId: 'b2', branchName: 'Uptown Plaza',   checkInTime: '06:50 AM', checkOutTime: '08:15 AM', date: '2025-01-17', status: 'present', planName: 'Gold Plan'    },
  { id: 'a8',  memberId: 'm3',  memberName: 'Amit Verma',     memberPhone: '9988776655', branchId: 'b1', branchName: 'Downtown Core',  checkInTime: '',         checkOutTime: null,       date: '2025-01-17', status: 'absent',  planName: 'Basic Plan'   },
  { id: 'a9',  memberId: 'm5',  memberName: 'Karan Mehta',    memberPhone: '9765432109', branchId: 'b2', branchName: 'Uptown Plaza',   checkInTime: '07:10 AM', checkOutTime: '08:40 AM', date: '2025-01-17', status: 'present', planName: 'Annual Pro'   },
  { id: 'a10', memberId: 'm7',  memberName: 'Rohan Gupta',    memberPhone: '9543210987', branchId: 'b1', branchName: 'Downtown Core',  checkInTime: '09:30 AM', checkOutTime: '11:00 AM', date: '2025-01-17', status: 'late',    planName: 'Gold Plan'    },
  { id: 'a11', memberId: 'm8',  memberName: 'Ananya Reddy',   memberPhone: '9432109876', branchId: 'b2', branchName: 'Uptown Plaza',   checkInTime: '07:00 AM', checkOutTime: '08:30 AM', date: '2025-01-17', status: 'present', planName: 'Basic Plan'   },
  { id: 'a12', memberId: 'm12', memberName: 'Meera Pillai',   memberPhone: '9098765432', branchId: 'b3', branchName: 'Westside Mall',  checkInTime: '',         checkOutTime: null,       date: '2025-01-17', status: 'absent',  planName: 'Basic Plan'   },
];

/** Computes duration string from checkIn/checkOut times. Returns '—' if either is missing. */
export function computeDuration(checkIn: string, checkOut: string | null): string {
  if (!checkIn || !checkOut) return '—';
  const [inH, inM] = checkIn.replace(/ AM| PM/, '').split(':').map(Number);
  const [outH, outM] = checkOut.replace(/ AM| PM/, '').split(':').map(Number);
  const inMinutes  = (checkIn.includes('PM')  && inH  !== 12 ? inH  + 12 : inH)  * 60 + (inM  ?? 0);
  const outMinutes = (checkOut.includes('PM') && outH !== 12 ? outH + 12 : outH) * 60 + (outM ?? 0);
  const diff = outMinutes - inMinutes;
  if (diff <= 0) return '—';
  const h = Math.floor(diff / 60);
  const m = diff % 60;
  return h > 0 ? `${h}h ${m}m` : `${m}m`;
}
