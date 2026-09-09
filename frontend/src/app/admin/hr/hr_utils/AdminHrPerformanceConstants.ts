// RESPONSIBILITY: Hardcoded mock data and constants for Staff Performance Dashboard.
import { StaffPerformanceRecord, PerformancePeriod } from '@/app/admin/hr/hr_types/AdminHrPerformanceTypes';

export const PERFORMANCE_PERIOD_OPTIONS: { label: string; value: PerformancePeriod }[] = [
  { label: 'This Month', value: 'THIS_MONTH' },
  { label: 'Last Month', value: 'LAST_MONTH' },
  { label: 'This Quarter', value: 'THIS_QUARTER' },
];

export const PERFORMANCE_TABLE_HEADERS = [
  { key: 'name', label: 'Staff Member', sortable: true },
  { key: 'role', label: 'Role', sortable: true },
  { key: 'sessionsTaken', label: 'Sessions', sortable: true },
  { key: 'membersAdded', label: 'Members Added', sortable: true },
  { key: 'attendancePct', label: 'Attendance', sortable: true },
  { key: 'rating', label: 'Rating', sortable: true },
  { key: 'status', label: 'Status', sortable: false },
];

export const PERFORMANCE_STATUS_CONFIG: Record<string, { label: string; bgClass: string; textClass: string }> = {
  EXCELLENT: { label: 'Excellent', bgClass: 'bg-success/20', textClass: 'text-success' },
  AVERAGE:   { label: 'Average',   bgClass: 'bg-warning/20', textClass: 'text-warning' },
  POOR:      { label: 'Poor',      bgClass: 'bg-danger/20',  textClass: 'text-danger' },
};
