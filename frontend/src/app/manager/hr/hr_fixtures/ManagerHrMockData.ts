import type { Staff, Payroll, HrSummary, LedgerEntry } from '@/app/manager/hr/hr_types/ManagerHrTypes';

export const MOCK_HR_SUMMARY: HrSummary = {
  totalSalaryThisMonth: 12000000,
  totalSalaryPaid: 9000000,
  totalSalaryDue: 3000000,
  totalAdvanceGiven: 500000,
  pendingPaymentsCount: 3,
  totalStaff: 15,
  activeStaff: 12,
  totalPayrollThisMonth: 15,
  paidCount: 12 };

export const MOCK_STAFF: Staff[] = [
  {
    id: 's1',
    name: 'Rahul Verma',
    email: 'rahul.v@example.com',
    phone: '+919876543201',
    role: 'Senior Trainer',
    salary: 4500000,
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
    department: 'Training' },
  {
    id: 's2',
    name: 'Anjali Desai',
    email: 'anjali.d@example.com',
    phone: '+919876543202',
    role: 'Receptionist',
    salary: 2500000,
    branch: 'Main Branch',
    gender: 'Female',
    joinDate: '2023-01-15T10:00:00Z',
    isActive: true,
    salaryType: 'Monthly',
    paymentCycle: 'Monthly',
    currentDue: 500000,
    advanceSalary: 200000,
    department: 'Front Desk' }
];

export const MOCK_PAYROLLS: Payroll[] = [
  {
    id: 'pr1',
    staffId: 's1',
    month: '2024-05',
    amount: 4500000,
    netPayable: 4200000,
    paidAmount: 4200000,
    pendingAmount: 0,
    status: 'PAID',
    paidAt: '2024-05-31T10:00:00Z',
    deductions: { tds: 100000, pf: 180000, esi: 20000, other: 0 },
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
    debit: 4200000,
    balance: 0,
    notes: 'May Salary',
    paymentMode: 'Bank Transfer'
  }
];
