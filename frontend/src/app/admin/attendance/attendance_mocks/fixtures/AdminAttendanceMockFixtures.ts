// RESPONSIBILITY: Owns module-specific MSW fixture data for the Admin attendance feature.
import type { AdminAttendanceSummary } from '@/app/admin/attendance/attendance_types/AdminAttendanceTypes';

// RESPONSIBILITY: Owns module-specific MSW fixture data for the Admin attendance feature.

export const MOCK_ADMIN_ATTENDANCE_SUMMARY: AdminAttendanceSummary = {
  todayTotal: 1250,
  todayPresent: 1100,
  todayLate: 150,
  weeklyAverage: 1150,
  peakHour: '18:00',
  trendVsLastWeek: 5.2,
  uniqueMembersThisMonth: 8500,
};

import type { AdminAttendanceRecord, AdminAttendanceTrendPoint } from '@/app/admin/attendance/attendance_types/AdminAttendanceTypes';

export const MOCK_ADMIN_ATTENDANCE_RECORDS = [
  {
    id: 'a1', memberId: 'm1', memberName: 'Rahul Sharma', memberPhone: '9876543210',
    branchId: 'b1', branchName: 'Downtown Main', checkInTime: '2026-10-15T06:30:00Z',
    checkOutTime: '2026-10-15T08:00:00Z', date: '2026-10-15', status: 'present', planName: 'Annual Pro',
    sessionType: 'General'
  },
  {
    id: 'a2', memberId: 'm2', memberName: 'Priya Singh', memberPhone: '9876543211',
    branchId: 'b2', branchName: 'Westside Gym', checkInTime: '2026-10-15T07:15:00Z',
    checkOutTime: null, date: '2026-10-15', status: 'present', planName: 'Quarterly Classic',
    sessionType: 'PT', trainerName: 'Amit Kumar'
  }
];

export const MOCK_ADMIN_ATTENDANCE_TREND: AdminAttendanceTrendPoint[] = [
  { date: '2026-10-09', count: 1100 },
  { date: '2026-10-10', count: 1150 },
  { date: '2026-10-11', count: 1180 },
  { date: '2026-10-12', count: 1200 },
  { date: '2026-10-13', count: 1250 },
  { date: '2026-10-14', count: 1050 },
  { date: '2026-10-15', count: 1250 },
];


// --- From AdminDashboardMockData.ts ---

export const MOCK_ADMIN_ATTENDANCE_RECORDS_EXPANDED: AdminAttendanceRecord[] = [
  ...MOCK_ADMIN_ATTENDANCE_RECORDS,
  ...Array.from({ length: 16 }, (_, index) => {
    const n = index + 3;
    return {
      id: `a${n}`,
      memberId: `m${n}`,
      memberName: ['Neha Kapoor', 'Vikram Patel', 'Sana Khan', 'Arjun Nair'][index % 4]!,
      memberPhone: `987654${(3210 + n).toString().slice(-4)}`,
      branchId: ['b1', 'b2', 'b3', 'b4'][index % 4]!,
      branchName: ['Downtown Main', 'Westside Gym', 'Northside Arena', 'Eastside Fitness'][index % 4]!,
      checkInTime: `2026-09-${String((index % 5) + 12).padStart(2, '0')}T${String(6 + (index % 8)).padStart(2, '0')}:15:00Z`,
      checkOutTime: index % 3 === 0 ? null : `2026-09-${String((index % 5) + 12).padStart(2, '0')}T${String(7 + (index % 8)).padStart(2, '0')}:30:00Z`,
      date: '2026-09-16',
      status: ['present', 'late', 'absent'][index % 3] as AdminAttendanceRecord['status'],
      planName: ['Annual Pro', 'Quarterly Classic', 'Monthly Basic'][index % 3]!,
      sessionType: index % 3 === 0 ? 'PT' : 'General',
      trainerName: index % 3 === 0 ? ['Amit Kumar', 'Priya Singh'][index % 2]! : undefined,
    };
  }),
] as AdminAttendanceRecord[];
