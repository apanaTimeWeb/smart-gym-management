import { create } from 'zustand';

export interface BranchExpenseItem { id: string; label: string; amount: number; category: string; date: string; }
export interface BranchRevenueItem { id: string; label: string; amount: number; method: string; date: string; }
export interface BranchStaffMember { id: string; name: string; role: string; shift: string; status: 'active' | 'on-leave'; }
export interface BranchStudent { id: string; name: string; plan: string; status: 'active' | 'expired'; joinDate: string; }

export interface Branch {
  id: string;
  name: string;
  location: string;
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

// Temporary mock data for branches
export const MOCK_BRANCHES: Branch[] = [
  {
    id: 'b1', name: 'Downtown Core', location: '123 Main St', status: 'active',
    revenue: 125000, expenses: 45000, studentsCount: 450, staffCount: 12,
    revenueItems: [
      { id: 'r1', label: 'Membership Fee — Rahul Sharma', amount: 4500, method: 'UPI', date: '2026-09-01' },
      { id: 'r2', label: 'Membership Fee — Priya Singh', amount: 3000, method: 'Cash', date: '2026-09-02' },
      { id: 'r3', label: 'Store Sale — Protein Powder', amount: 850, method: 'Card', date: '2026-09-02' },
      { id: 'r4', label: 'Personal Training — Amit Verma', amount: 5000, method: 'UPI', date: '2026-09-03' },
    ],
    expenseItems: [
      { id: 'e1', label: 'Electricity Bill', amount: 12000, category: 'Utilities', date: '2026-09-01' },
      { id: 'e2', label: 'Staff Salaries', amount: 24000, category: 'Payroll', date: '2026-09-01' },
      { id: 'e3', label: 'Equipment Maintenance', amount: 5000, category: 'Maintenance', date: '2026-09-03' },
      { id: 'e4', label: 'Cleaning Supplies', amount: 2000, category: 'Operations', date: '2026-09-03' },
    ],
    staffList: [
      { id: 's1', name: 'Vikram Patel', role: 'Manager', shift: 'Morning', status: 'active' },
      { id: 's2', name: 'Sunita Rao', role: 'Trainer', shift: 'Evening', status: 'active' },
      { id: 's3', name: 'Arjun Mehta', role: 'Trainer', shift: 'Morning', status: 'on-leave' },
      { id: 's4', name: 'Kavya Nair', role: 'Receptionist', shift: 'Full-day', status: 'active' },
    ],
    studentList: [
      { id: 'st1', name: 'Rahul Sharma', plan: 'Premium', status: 'active', joinDate: '2026-01-15' },
      { id: 'st2', name: 'Priya Singh', plan: 'Basic', status: 'active', joinDate: '2026-03-10' },
      { id: 'st3', name: 'Amit Verma', plan: 'Personal Training', status: 'active', joinDate: '2026-07-01' },
    ],
  },
  {
    id: 'b2', name: 'Uptown Plaza', location: '456 North Ave', status: 'active',
    revenue: 85000, expenses: 32000, studentsCount: 320, staffCount: 8,
    revenueItems: [
      { id: 'r5', label: 'Membership Fee — Neha Gupta', amount: 3000, method: 'UPI', date: '2026-09-01' },
      { id: 'r6', label: 'Store Sale — Gym Gloves', amount: 450, method: 'Cash', date: '2026-09-02' },
    ],
    expenseItems: [
      { id: 'e5', label: 'Electricity Bill', amount: 9000, category: 'Utilities', date: '2026-09-01' },
      { id: 'e6', label: 'Staff Salaries', amount: 18000, category: 'Payroll', date: '2026-09-01' },
    ],
    staffList: [
      { id: 's5', name: 'Deepak Kumar', role: 'Manager', shift: 'Morning', status: 'active' },
      { id: 's6', name: 'Pooja Iyer', role: 'Trainer', shift: 'Evening', status: 'active' },
    ],
    studentList: [
      { id: 'st4', name: 'Neha Gupta', plan: 'Basic', status: 'active', joinDate: '2026-02-20' },
    ],
  },
  {
    id: 'b3', name: 'Westside Mall', location: '789 West Blvd', status: 'active',
    revenue: 150000, expenses: 55000, studentsCount: 600, staffCount: 15,
    revenueItems: [
      { id: 'r7', label: 'Membership Fee — Ravi Teja', amount: 4500, method: 'Card', date: '2026-09-01' },
      { id: 'r8', label: 'Personal Training — Sneha Roy', amount: 6000, method: 'UPI', date: '2026-09-03' },
    ],
    expenseItems: [
      { id: 'e7', label: 'Electricity Bill', amount: 15000, category: 'Utilities', date: '2026-09-01' },
      { id: 'e8', label: 'Staff Salaries', amount: 30000, category: 'Payroll', date: '2026-09-01' },
      { id: 'e9', label: 'Marketing', amount: 8000, category: 'Marketing', date: '2026-09-02' },
    ],
    staffList: [
      { id: 's7', name: 'Anita Sharma', role: 'Manager', shift: 'Morning', status: 'active' },
      { id: 's8', name: 'Ravi Teja', role: 'Trainer', shift: 'Morning', status: 'active' },
      { id: 's9', name: 'Sneha Roy', role: 'Trainer', shift: 'Evening', status: 'on-leave' },
    ],
    studentList: [
      { id: 'st5', name: 'Ravi Teja', plan: 'Premium', status: 'active', joinDate: '2026-01-10' },
      { id: 'st6', name: 'Sneha Roy', plan: 'Personal Training', status: 'expired', joinDate: '2025-12-01' },
    ],
  },
];

interface AdminGlobalState {
  selectedBranchId: string; // 'all' means aggregate view
  setSelectedBranchId: (id: string) => void;
  
  branches: Branch[];
  setBranches: (branches: Branch[]) => void;
}

export const useAdminGlobalStore = create<AdminGlobalState>((set) => ({
  selectedBranchId: 'all',
  setSelectedBranchId: (id) => set({ selectedBranchId: id }),
  
  branches: MOCK_BRANCHES,
  setBranches: (branches) => set({ branches }),
}));
