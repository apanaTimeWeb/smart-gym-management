import type { Staff, Payroll, HrSummary, LedgerEntry } from '@/app/admin/hr/hr_types/AdminHrTypes';
import type { StaffPerformanceRecord } from '@/app/admin/hr/hr_types/AdminHrPerformanceTypes';

export const MOCK_ADMIN_HR_SUMMARY: HrSummary = {
  totalSalaryThisMonth: 850000,
  totalSalaryPaid: 600000,
  totalSalaryDue: 250000,
  totalAdvanceGiven: 50000,
  pendingPaymentsCount: 5,
  totalStaff: 45,
  activeStaff: 40,
  totalPayrollThisMonth: 850000,
  paidCount: 35,
  pendingCount: 10,
};

export const MOCK_ADMIN_STAFF: Staff[] = [
  {
    id: 's1',
    employeeId: 'EMP-001',
    name: 'Rahul Sharma',
    email: 'rahul.s@gym.com',
    phone: '9876543210',
    role: 'Manager',
    salary: 50000,
    branch: 'Downtown Main',
    gender: 'Male',
    joinDate: '2023-01-15T10:00:00Z',
    isActive: true,
  },
  {
    id: 's2',
    employeeId: 'EMP-002',
    name: 'Priya Singh',
    email: 'priya.s@gym.com',
    phone: '9876543211',
    role: 'Trainer',
    salary: 30000,
    branch: 'Westside Gym',
    gender: 'Female',
    joinDate: '2023-05-20T10:00:00Z',
    isActive: true,
  }
];

export const MOCK_ADMIN_PAYROLLS: Payroll[] = [
  {
    id: 'pr1', staffId: 's1', month: '2023-10', amount: 50000,
    paidAmount: 50000, pendingAmount: 0, status: 'PAID', paidAt: '2023-10-01T10:00:00Z',
    staff: { name: 'Rahul Sharma', role: 'Manager' }
  },
  {
    id: 'pr2', staffId: 's2', month: '2023-10', amount: 30000,
    paidAmount: 0, pendingAmount: 30000, status: 'PENDING',
    staff: { name: 'Priya Singh', role: 'Trainer' }
  }
];

export const MOCK_ADMIN_STAFF_PERFORMANCE: StaffPerformanceRecord[] = [
  {
    id: 's1', name: 'Rahul Sharma', role: 'Manager', branchName: 'Downtown Main',
    sessionsTaken: 0, membersAdded: 15, attendancePct: 98.5, rating: 4.8, status: 'EXCELLENT'
  },
  {
    id: 's2', name: 'Priya Singh', role: 'Trainer', branchName: 'Westside Gym',
    sessionsTaken: 45, membersAdded: 5, attendancePct: 95.0, rating: 4.5, status: 'EXCELLENT'
  }
];

export const MOCK_ADMIN_LEDGER: LedgerEntry[] = [
  { id: 'l1', staffId: 's1', date: '2023-10-01T10:00:00Z', type: 'Salary Paid', credit: 0, debit: 50000, balance: 0 },
  { id: 'l2', staffId: 's2', date: '2023-10-01T10:00:00Z', type: 'Salary Generated', credit: 30000, debit: 0, balance: 30000 },
];
