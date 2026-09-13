// RESPONSIBILITY: Mock fixture data for the Attendance module.
// DATA FLOW: useAttendanceQuery → this fixture (NOW) → future: real API
// Replace the import in attendance_api.ts with a real apiFetch when the backend is ready.

import type { AttendanceRecord, AttendanceStats, AttendanceMemberBasic } from '@/app/trainer/attendance/attendance_types/attendance_types';

export const MOCK_ATTENDANCE_STATS: AttendanceStats = {
  totalCheckIns: 24,
  memberCheckIns: 18,
  staffCheckIns: 6,
};

export const MOCK_ATTENDANCE_MEMBERS: AttendanceMemberBasic[] = [
  { id: 'm1', name: 'Rahul Sharma', phone: '9876543210' },
  { id: 'm2', name: 'Neha Gupta', phone: '9123456789' },
  { id: 'm3', name: 'Amit Kumar', phone: '9001234567' },
  { id: 'm4', name: 'Priya Singh', phone: '9812345670' },
];

export const MOCK_ATTENDANCE_RECORDS: AttendanceRecord[] = [
  {
    id: 'att-001',
    type: 'MEMBER',
    date: '2026-09-14',
    checkIn: '2026-09-14T06:30:00Z',
    checkOut: '2026-09-14T08:00:00Z',
    durationMinutes: 90,
    checkInMethod: 'Manual',
    memberId: 'm1',
    member: { id: 'm1', name: 'Rahul Sharma', phone: '9876543210' },
  },
  {
    id: 'att-002',
    type: 'MEMBER',
    date: '2026-09-14',
    checkIn: '2026-09-14T07:00:00Z',
    checkOut: '2026-09-14T08:30:00Z',
    durationMinutes: 90,
    checkInMethod: 'QR Code',
    memberId: 'm2',
    member: { id: 'm2', name: 'Neha Gupta', phone: '9123456789' },
  },
  {
    id: 'att-003',
    type: 'STAFF',
    date: '2026-09-14',
    checkIn: '2026-09-14T08:00:00Z',
    checkOut: '2026-09-14T17:00:00Z',
    durationMinutes: 540,
    checkInMethod: 'Biometric',
    staffId: 's1',
    staff: { id: 's1', name: 'Trainer Demo' },
  },
  {
    id: 'att-004',
    type: 'MEMBER',
    date: '2026-09-13',
    checkIn: '2026-09-13T06:45:00Z',
    checkOut: '2026-09-13T08:15:00Z',
    durationMinutes: 90,
    checkInMethod: 'Manual',
    memberId: 'm3',
    member: { id: 'm3', name: 'Amit Kumar', phone: '9001234567' },
  },
  {
    id: 'att-005',
    type: 'MEMBER',
    date: '2026-09-13',
    checkIn: '2026-09-13T09:00:00Z',
    checkOut: undefined,
    durationMinutes: undefined,
    checkInMethod: 'Manual',
    memberId: 'm4',
    member: { id: 'm4', name: 'Priya Singh', phone: '9812345670' },
  },
];
