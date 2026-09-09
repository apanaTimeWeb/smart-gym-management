import type { StaffPerformanceRecord, PerformancePeriod } from '@/app/admin/hr/hr_types/AdminHrPerformanceTypes';
import type { PlanRevenueRecord, RevenuePeriod } from '@/app/admin/plans/plans_types/AdminPlansRevenueTypes';

export const ADMIN_PERFORMANCE_MOCK_DATA: Record<PerformancePeriod, StaffPerformanceRecord[]> = {
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

export const ADMIN_REVENUE_MOCK_DATA: Record<RevenuePeriod, PlanRevenueRecord[]> = {
  THIS_MONTH: [
    { id: '1', planName: 'Gold Annual', tier: 'Premium', totalRevenue: 300000, activeSubscriptions: 150, newSignups: 20, renewalRate: 92.5 },
    { id: '2', planName: 'Silver Half-Year', tier: 'Standard', totalRevenue: 150000, activeSubscriptions: 210, newSignups: 45, renewalRate: 85.0 },
    { id: '3', planName: 'Bronze Quarterly', tier: 'Basic', totalRevenue: 75000, activeSubscriptions: 120, newSignups: 30, renewalRate: 70.2 },
    { id: '4', planName: 'Platinum Elite', tier: 'Premium', totalRevenue: 450000, activeSubscriptions: 80, newSignups: 5, renewalRate: 98.0 },
  ],
  LAST_MONTH: [
    { id: '1', planName: 'Gold Annual', tier: 'Premium', totalRevenue: 280000, activeSubscriptions: 145, newSignups: 15, renewalRate: 91.0 },
    { id: '2', planName: 'Silver Half-Year', tier: 'Standard', totalRevenue: 160000, activeSubscriptions: 215, newSignups: 50, renewalRate: 84.5 },
    { id: '3', planName: 'Bronze Quarterly', tier: 'Basic', totalRevenue: 70000, activeSubscriptions: 115, newSignups: 25, renewalRate: 69.5 },
    { id: '4', planName: 'Platinum Elite', tier: 'Premium', totalRevenue: 420000, activeSubscriptions: 78, newSignups: 4, renewalRate: 97.5 },
  ],
  THIS_QUARTER: [
    { id: '1', planName: 'Gold Annual', tier: 'Premium', totalRevenue: 900000, activeSubscriptions: 160, newSignups: 55, renewalRate: 93.0 },
    { id: '2', planName: 'Silver Half-Year', tier: 'Standard', totalRevenue: 480000, activeSubscriptions: 230, newSignups: 120, renewalRate: 86.0 },
    { id: '3', planName: 'Bronze Quarterly', tier: 'Basic', totalRevenue: 220000, activeSubscriptions: 140, newSignups: 80, renewalRate: 72.0 },
    { id: '4', planName: 'Platinum Elite', tier: 'Premium', totalRevenue: 1350000, activeSubscriptions: 85, newSignups: 12, renewalRate: 98.5 },
  ],
  THIS_YEAR: [
    { id: '1', planName: 'Gold Annual', tier: 'Premium', totalRevenue: 3600000, activeSubscriptions: 180, newSignups: 210, renewalRate: 94.0 },
    { id: '2', planName: 'Silver Half-Year', tier: 'Standard', totalRevenue: 1950000, activeSubscriptions: 250, newSignups: 450, renewalRate: 87.5 },
    { id: '3', planName: 'Bronze Quarterly', tier: 'Basic', totalRevenue: 900000, activeSubscriptions: 160, newSignups: 320, renewalRate: 74.0 },
    { id: '4', planName: 'Platinum Elite', tier: 'Premium', totalRevenue: 5400000, activeSubscriptions: 95, newSignups: 40, renewalRate: 99.0 },
  ],
};
