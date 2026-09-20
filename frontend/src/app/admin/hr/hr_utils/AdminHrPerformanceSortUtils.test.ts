import { describe, expect, it } from 'vitest';
import { sortAdminHrPerformanceRecords } from '@/app/admin/hr/hr_utils/AdminHrPerformanceSortUtils';
import type { StaffPerformanceRecord } from '@/app/admin/hr/hr_types/AdminHrPerformanceTypes';

const records: StaffPerformanceRecord[] = [
  { id: '1', name: 'Asha', role: 'Trainer', branchName: 'A', sessionsTaken: 12, membersAdded: 4, attendancePct: 92, rating: 4.2, status: 'EXCELLENT' },
  { id: '2', name: 'Bharat', role: 'Manager', branchName: 'B', sessionsTaken: 20, membersAdded: 2, attendancePct: 81, rating: 3.8, status: 'AVERAGE' },
];

describe('sortAdminHrPerformanceRecords', () => {
  it('sorts numeric columns ascending and preserves the input array', () => {
    const sorted = sortAdminHrPerformanceRecords(records, 'sessionsTaken', 'asc');
    expect(sorted.map((record) => record.id)).toEqual(['1', '2']);
    expect(records.map((record) => record.id)).toEqual(['1', '2']);
  });

  it('sorts numeric columns descending', () => {
    const sorted = sortAdminHrPerformanceRecords(records, 'rating', 'desc');
    expect(sorted.map((record) => record.id)).toEqual(['1', '2']);
  });

  it('sorts text columns deterministically', () => {
    const sorted = sortAdminHrPerformanceRecords(records, 'name', 'desc');
    expect(sorted.map((record) => record.name)).toEqual(['Bharat', 'Asha']);
  });
});
