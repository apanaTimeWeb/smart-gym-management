import type { AdminAttendanceRecord, AdminAttendanceSummary, AdminAttendanceTrendPoint } from '@/app/admin/attendance/attendance_types/attendance_types';

export const MOCK_ADMIN_ATTENDANCE_SUMMARY: AdminAttendanceSummary = {
  todayTotal: 1250,
  todayPresent: 1100,
  todayLate: 150,
  weeklyAverage: 1150,
  peakHour: '18:00',
  trendVsLastWeek: 5.2,
  uniqueMembersThisMonth: 8500,
};

export const MOCK_ADMIN_ATTENDANCE_RECORDS: AdminAttendanceRecord[] = [
  {
    id: 'a1', memberId: 'm1', memberName: 'Rahul Sharma', memberPhone: '9876543210',
    branchId: 'b1', branchName: 'Downtown Main', checkInTime: '2023-10-15T06:30:00Z',
    checkOutTime: '2023-10-15T08:00:00Z', date: '2023-10-15', status: 'present', planName: 'Annual Pro',
    sessionType: 'General'
  },
  {
    id: 'a2', memberId: 'm2', memberName: 'Priya Singh', memberPhone: '9876543211',
    branchId: 'b2', branchName: 'Westside Gym', checkInTime: '2023-10-15T07:15:00Z',
    checkOutTime: null, date: '2023-10-15', status: 'present', planName: 'Quarterly Classic',
    sessionType: 'PT', trainerName: 'Amit Kumar'
  }
];

export const MOCK_ADMIN_ATTENDANCE_TREND: AdminAttendanceTrendPoint[] = [
  { date: '2023-10-09', count: 1100 },
  { date: '2023-10-10', count: 1150 },
  { date: '2023-10-11', count: 1180 },
  { date: '2023-10-12', count: 1200 },
  { date: '2023-10-13', count: 1250 },
  { date: '2023-10-14', count: 1050 },
  { date: '2023-10-15', count: 1250 },
];
