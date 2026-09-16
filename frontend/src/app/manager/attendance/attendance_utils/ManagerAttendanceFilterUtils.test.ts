import { describe, expect, it } from 'vitest';
import { filterAndSortAttendance } from '@/app/manager/attendance/attendance_utils/ManagerAttendanceFilterUtils';
import type { Attendance } from '@/app/manager/attendance/attendance_types/ManagerAttendanceTypes';

const records: Attendance[] = [
  { id: '1', type: 'MEMBER', status: 'PRESENT', date: '2026-09-15', member: { name: 'Asha' } } as Attendance,
  { id: '2', type: 'MEMBER', status: 'ABSENT', date: '2026-09-14', member: { name: 'Bharat' } } as Attendance,
  { id: '3', type: 'STAFF', status: 'PRESENT', date: '2026-09-13', staff: { name: 'Aarav' } } as Attendance,
];

describe('filterAndSortAttendance', () => {
  it('filters member records by search and sorts newest first', () => {
    const result = filterAndSortAttendance(records, 'Member Attendance', 'asha', '', 'All');
    expect(result.map((item) => item.id)).toEqual(['1']);
  });

  it('filters by status for the selected audience', () => {
    const result = filterAndSortAttendance(records, 'Daily Attendance Report', '', '', 'PRESENT');
    expect(result.map((item) => item.id)).toEqual(['1', '3']);
  });

  it('filters by exact date', () => {
    const result = filterAndSortAttendance(records, 'Daily Attendance Report', '', '2026-09-14', 'All');
    expect(result.map((item) => item.id)).toEqual(['2']);
  });
});
