export interface BranchExpenseItem { id: string; label: string; amount: number; category: string; date: string; }
export interface BranchRevenueItem { id: string; label: string; amount: number; method: string; date: string; }
export type AdminBranchStaffStatus = 'active' | 'on-leave';
export type AdminBranchStudentStatus = 'active' | 'expired';
export type AdminBranchStatus = 'active' | 'inactive';

export interface BranchStaffMember { id: string; name: string; role: string; shift: string; status: AdminBranchStaffStatus; }
export interface BranchStudent { id: string; name: string; plan: string; status: AdminBranchStudentStatus; joinDate: string; }

export interface Branch {
  id: string;
  name: string;
  branchCode?: string;
  gstNumber?: string;
  address?: string;
  location: string;
  contactPhone?: string;
  contactEmail?: string;
  openingTime?: string;
  closingTime?: string;
  maxCapacity?: number;
  currentOccupancy?: number;
  equipmentCount?: number;
  status: AdminBranchStatus;
  revenue: number;
  expenses: number;
  studentsCount: number;
  staffCount: number;
  expenseItems?: BranchExpenseItem[];
  revenueItems?: BranchRevenueItem[];
  staffList?: BranchStaffMember[];
  studentList?: BranchStudent[];
}

export type { AdminBranchesTimeRange } from '@/app/admin/branches/branches_types/AdminBranchesTimeRangeTypes';
