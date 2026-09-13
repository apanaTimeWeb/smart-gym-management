import type { Staff, Payroll, HrSummary, LedgerEntry } from '@/app/manager/hr/hr_types/ManagerHrTypes';

export const MOCK_HR_SUMMARY: HrSummary = {
  totalSalaryThisMonth: 120000,
  totalSalaryPaid: 90000,
  totalSalaryDue: 30000,
  totalAdvanceGiven: 5000,
  pendingPaymentsCount: 3,
  totalStaff: 15,
  activeStaff: 12,
  totalPayrollThisMonth: 15,
  paidCount: 12,
};

export const MOCK_STAFF: Staff[] = [
  {
    id: 's1',
    name: 'Rahul Verma',
    email: 'rahul.v@example.com',
    phone: '+919876543201',
    role: 'Senior Trainer',
    salary: 45000,
    branch: 'Main Branch',
    gender: 'Male',
    joinDate: '2022-03-01T10:00:00Z',
    isActive: true,
    salaryType: 'Monthly',
    paymentCycle: 'Monthly',
    currentDue: 0,
    advanceSalary: 0,
    bankAccountNumber: '1234567890',
    ifscCode: 'SBIN0001234',
    panNumber: 'ABCDE1234F',
    department: 'Training',
  },
  {
    id: 's2',
    name: 'Anjali Desai',
    email: 'anjali.d@example.com',
    phone: '+919876543202',
    role: 'Receptionist',
    salary: 25000,
    branch: 'Main Branch',
    gender: 'Female',
    joinDate: '2023-01-15T10:00:00Z',
    isActive: true,
    salaryType: 'Monthly',
    paymentCycle: 'Monthly',
    currentDue: 5000,
    advanceSalary: 2000,
    department: 'Front Desk',
  }
];

export const MOCK_PAYROLLS: Payroll[] = [
  {
    id: 'pr1',
    staffId: 's1',
    month: '2024-05',
    amount: 45000,
    netPayable: 42000,
    paidAmount: 42000,
    pendingAmount: 0,
    status: 'PAID',
    paidAt: '2024-05-31T10:00:00Z',
    deductions: { tds: 1000, pf: 1800, esi: 200, other: 0 },
    staff: { name: 'Rahul Verma', role: 'Senior Trainer' }
  }
];

export const MOCK_LEDGER: LedgerEntry[] = [
  {
    id: 'l1',
    staffId: 's1',
    date: '2024-05-31T10:00:00Z',
    type: 'Salary Paid',
    credit: 0,
    debit: 42000,
    balance: 0,
    notes: 'May Salary',
    paymentMode: 'Bank Transfer'
  }
];
