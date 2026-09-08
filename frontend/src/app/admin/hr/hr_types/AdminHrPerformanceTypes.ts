// RESPONSIBILITY: Types for Staff Performance Dashboard.
export type PerformancePeriod = 'THIS_MONTH' | 'LAST_MONTH' | 'THIS_QUARTER';

export type PerformanceSortKey = 'name' | 'role' | 'sessionsTaken' | 'membersAdded' | 'attendancePct' | 'rating';
export type PerformanceSortDirection = 'asc' | 'desc';

export interface StaffPerformanceRecord {
  id: string;
  name: string;
  role: string;
  branchName: string;
  sessionsTaken: number;
  membersAdded: number;
  attendancePct: number;
  rating: number; // Out of 5.0
  status: 'EXCELLENT' | 'AVERAGE' | 'POOR';
}

export interface PerformanceAggregates {
  totalSessions: number;
  totalMembersAdded: number;
  avgAttendance: number;
  avgRating: number;
  topPerformersCount: number;
  lowPerformersCount: number;
}
