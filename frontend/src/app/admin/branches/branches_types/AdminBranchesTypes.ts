export interface BranchExpenseItem { id: string; label: string; amount: number; category: string; date: string; }
export interface BranchRevenueItem { id: string; label: string; amount: number; method: string; date: string; }
export interface BranchStaffMember { id: string; name: string; role: string; shift: string; status: 'active' | 'on-leave'; }
export interface BranchStudent { id: string; name: string; plan: string; status: 'active' | 'expired'; joinDate: string; }

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
  status: 'active' | 'inactive';
  revenue: number;
  expenses: number;
  studentsCount: number;
  staffCount: number;
  expenseItems?: BranchExpenseItem[];
  revenueItems?: BranchRevenueItem[];
  staffList?: BranchStaffMember[];
  studentList?: BranchStudent[];
}
export type AdminBranchesTimeRange = "weekly" | "monthly" | "yearly" | "custom" | string;
