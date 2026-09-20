import type { QueryStatus } from '@tanstack/react-query';
// RESPONSIBILITY: TypeScript contracts for the Admin HR module.
import type { AdminToastType } from '@/app/admin/admin_layout/AdminFeedback/AdminToastTypes';

export type AdminHrSortDirection = 'asc' | 'desc';
export type AdminHrSalaryType = 'Monthly' | 'Daily';
export type AdminHrLedgerEntryType = 'Salary Generated' | 'Salary Paid' | 'Advance Given' | 'Due Paid';
export type AdminHrStaffSortKey = 'name' | 'branch' | 'role' | 'phone' | 'salary' | 'advanceSalary' | 'joinDate';
export type AdminHrPayrollSortKey = 'staffName' | 'month' | 'amount' | 'paidAmount' | 'pendingAmount' | 'status' | 'paidAt';

export interface HrInitialData {
  staff: Staff[];
  totalStaff: number;
  payrolls: Payroll[];
  totalPayrolls: number;
  summary: HrSummary | null;
}

export interface HrPaymentModalState {
  payrollId: string;
  staffName: string;
  pendingAmount: number;
}

export interface HrUiContextType {
  visibleColumns: string[];
  setVisibleColumns: (cols: string[]) => void;
  search: string;
  debouncedSearch: string;
  setSearch: (s: string) => void;
  branchFilter: string;
  setBranchFilter: (s: string) => void;
  roleFilter: string;
  setRoleFilter: (s: string) => void;
  currentPage: number;
  setCurrentPage: (p: number) => void;
  staffSortKey: string;
  staffSortDir: AdminHrSortDirection;
  setStaffSort: (key: AdminHrStaffSortKey, direction: AdminHrSortDirection) => void;
  payrollSortKey: string;
  payrollSortDir: AdminHrSortDirection;
  setPayrollSort: (key: AdminHrPayrollSortKey, direction: AdminHrSortDirection) => void;
  showToast: (msg: string, type: AdminToastType, id?: string) => void;
  showModal: boolean;
  setShowModal: (show: boolean) => void;
  showPayrollModal: boolean;
  setShowPayrollModal: (show: boolean) => void;
  paymentModal: HrPaymentModalState | null;
  setPaymentModal: (modal: HrPaymentModalState | null) => void;
  showProfileModal: boolean;
  setShowProfileModal: (show: boolean) => void;
  editId: string | null;
  setEditId: (id: string | null) => void;
  editData: Partial<Staff> | null;
  setEditData: (data: Partial<Staff> | null) => void;
  viewProfileData: Staff | null;
  setViewProfileData: (staff: Staff | null) => void;
  payrollMonth: string;
  setPayrollMonth: (month: string) => void;
  openAdd: () => void;
  openEdit: (staff: Staff) => void;
  openProfile: (staff: Staff) => void;
  openAddPayroll: () => void;
}

export interface HrServerState {
  staff: Staff[];
  totalStaff: number;
  payrolls: Payroll[];
  totalPayrolls: number;
  summary: HrSummary | null;
  status: QueryStatus;
  error: string;
  saving: boolean;
  loadAll: () => Promise<void>;
  saveStaff: (data: Partial<Staff> & { joinDate?: string | Date; salary?: string | number }) => Promise<void>;
  savePayroll: (data: Partial<Payroll> & { amount?: string | number }) => Promise<void>;
  deleteStaff: (id: string) => Promise<void>;
  toggleStaffStatus: (staff: Staff) => Promise<void>;
  markPayrollPaid: (id: string, amount: number) => Promise<void>;
  giveAdvance: (data: { staffId: string; amount: number; notes?: string; date?: string; paymentMode?: string }) => Promise<void>;
  payDue: (data: { staffId: string; amount: number; notes?: string; date?: string; paymentMode?: string }) => Promise<void>;
}

export type HrContextType = HrUiContextType & HrServerState;

export interface Staff {
  id: string;
  employeeId?: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  salary: number;
  branch: string;
  gender: string;
  address?: string;
  aadhaar?: string;
  upiId?: string;
  bankAccountNumber?: string;
  advanceSalary?: number;
  joinDate: string;
  joiningDate?: string;
  isActive: boolean;
  salaryType?: AdminHrSalaryType;
  paymentCycle?: string;
  currentDue?: number;
  assignedBranches?: string[];
  primaryBranchId?: string;
  emergencyContactName?: string;
  emergencyContactPhone?: string;
  department?: string;
  certifications?: string[];
  contractType?: string;
  terminationDate?: string;
}

export interface Payroll {
  id: string;
  staffId: string;
  month: string;
  amount: number;
  paidAmount: number;
  pendingAmount: number;
  status: string;
  paidAt?: string;
  notes?: string;
  staff?: { name: string; role: string };
}

export interface HrSummary {
  totalSalaryThisMonth: number;
  totalSalaryPaid: number;
  totalSalaryDue: number;
  totalAdvanceGiven: number;
  pendingPaymentsCount: number;
  totalStaff: number;
  activeStaff: number;
  totalPayrollThisMonth: number;
  paidCount: number;
  pendingCount: number;
}


export interface AdminHrBranchReference {
  id: string;
  name: string;
}

export type AdminHrLedgerSortKey = 'date' | 'type' | 'credit' | 'debit' | 'balance';
export type AdminHrLedgerSortDirection = 'asc' | 'desc';
export interface LedgerEntry {
  id: string;
  staffId: string;
  date: string;
  type: AdminHrLedgerEntryType;
  credit: number;
  debit: number;
  balance: number;
  notes?: string;
  referenceNo?: string;
  paymentMode?: string;
  openingBalance?: number;
}

export type PayrollFormValues = { staffId: string; month: string; amount: number; paidAmount: number; notes?: string };

export type StaffFormValues = {
  name: string;
  email: string;
  phone: string;
  role: string;
  salary: number;
  branch: string;
  gender: 'MALE' | 'FEMALE' | 'OTHER';
  address?: string;
  joinDate: string;
  temporaryPassword?: string;
  isActive: boolean;
  aadhaar?: string;
  upiId?: string;
  advanceSalary?: number;
  assignedBranches?: string[];
  primaryBranchId?: string;
};
