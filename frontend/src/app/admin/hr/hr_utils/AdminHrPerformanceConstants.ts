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

export const PERFORMANCE_MOCK_DATA: Record<PerformancePeriod, StaffPerformanceRecord[]> = {
  THIS_MONTH: [
    { id: '1', name: 'Rahul Sharma', role: 'Trainer', branchName: 'Bandra West', sessionsTaken: 45, membersAdded: 2, attendancePct: 95, rating: 4.8, status: 'EXCELLENT' },
    { id: '2', name: 'Priya Patel', role: 'Manager', branchName: 'Andheri East', sessionsTaken: 0, membersAdded: 15, attendancePct: 98, rating: 4.9, status: 'EXCELLENT' },
    { id: '3', name: 'Amit Kumar', role: 'Trainer', branchName: 'Powai', sessionsTaken: 20, membersAdded: 0, attendancePct: 75, rating: 3.5, status: 'AVERAGE' },
    { id: '4', name: 'Neha Singh', role: 'Trainer', branchName: 'Bandra West', sessionsTaken: 12, membersAdded: 1, attendancePct: 60, rating: 2.8, status: 'POOR' },
    { id: '5', name: 'Vikas Dubey', role: 'Manager', branchName: 'Powai', sessionsTaken: 0, membersAdded: 4, attendancePct: 82, rating: 3.8, status: 'AVERAGE' },
    { id: '6', name: 'Rohan Mehta', role: 'Trainer', branchName: 'Andheri East', sessionsTaken: 38, membersAdded: 0, attendancePct: 90, rating: 4.2, status: 'EXCELLENT' },
  ],
  LAST_MONTH: [
    { id: '1', name: 'Rahul Sharma', role: 'Trainer', branchName: 'Bandra West', sessionsTaken: 40, membersAdded: 1, attendancePct: 92, rating: 4.5, status: 'EXCELLENT' },
    { id: '2', name: 'Priya Patel', role: 'Manager', branchName: 'Andheri East', sessionsTaken: 0, membersAdded: 12, attendancePct: 96, rating: 4.7, status: 'EXCELLENT' },
    { id: '3', name: 'Amit Kumar', role: 'Trainer', branchName: 'Powai', sessionsTaken: 15, membersAdded: 0, attendancePct: 70, rating: 3.1, status: 'POOR' },
    { id: '4', name: 'Neha Singh', role: 'Trainer', branchName: 'Bandra West', sessionsTaken: 10, membersAdded: 0, attendancePct: 58, rating: 2.5, status: 'POOR' },
    { id: '5', name: 'Vikas Dubey', role: 'Manager', branchName: 'Powai', sessionsTaken: 0, membersAdded: 3, attendancePct: 80, rating: 3.5, status: 'AVERAGE' },
    { id: '6', name: 'Rohan Mehta', role: 'Trainer', branchName: 'Andheri East', sessionsTaken: 42, membersAdded: 1, attendancePct: 94, rating: 4.6, status: 'EXCELLENT' },
  ],
  THIS_QUARTER: [
    { id: '1', name: 'Rahul Sharma', role: 'Trainer', branchName: 'Bandra West', sessionsTaken: 130, membersAdded: 4, attendancePct: 94, rating: 4.7, status: 'EXCELLENT' },
    { id: '2', name: 'Priya Patel', role: 'Manager', branchName: 'Andheri East', sessionsTaken: 0, membersAdded: 40, attendancePct: 97, rating: 4.8, status: 'EXCELLENT' },
    { id: '3', name: 'Amit Kumar', role: 'Trainer', branchName: 'Powai', sessionsTaken: 55, membersAdded: 0, attendancePct: 72, rating: 3.3, status: 'AVERAGE' },
    { id: '4', name: 'Neha Singh', role: 'Trainer', branchName: 'Bandra West', sessionsTaken: 35, membersAdded: 2, attendancePct: 59, rating: 2.7, status: 'POOR' },
    { id: '5', name: 'Vikas Dubey', role: 'Manager', branchName: 'Powai', sessionsTaken: 0, membersAdded: 10, attendancePct: 81, rating: 3.7, status: 'AVERAGE' },
    { id: '6', name: 'Rohan Mehta', role: 'Trainer', branchName: 'Andheri East', sessionsTaken: 115, membersAdded: 3, attendancePct: 92, rating: 4.4, status: 'EXCELLENT' },
  ],
};
