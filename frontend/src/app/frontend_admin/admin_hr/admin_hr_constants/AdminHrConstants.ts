// RESPONSIBILITY: Canonical feature-owned static constants and business UI configuration for this Admin feature.
import type { Staff, PayrollFormValues } from '@/app/frontend_admin/admin_hr/admin_hr_types/AdminHrTypes';
import type { StaffPerformanceRecord, PerformancePeriod } from '@/app/frontend_admin/admin_hr/admin_hr_types/AdminHrPerformanceTypes';


export const HR_PAYMENT_MODE_OPTIONS = [
  { labelKey: 'hr.static.cash', value: 'Cash' },
  { labelKey: 'hr.static.bank_transfer', value: 'Bank Transfer' },
  { labelKey: 'hr.static.upi', value: 'UPI' },
  { labelKey: 'hr.static.cheque', value: 'Cheque' },
] as const;

export const HR_DEFAULT_PAYMENT_MODE = 'Bank Transfer' as const;

export const PAYROLL_STATUS = { PAID: 'PAID', PARTIAL: 'PARTIAL', PENDING: 'PENDING' } as const;

export const PAYROLL_STATUS_LABEL_KEYS: Record<string, string> = { PAID: 'hr.AdminAuditRepair.payrollPaid', PARTIAL: 'hr.AdminAuditRepair.payrollPartial', PENDING: 'hr.AdminAuditRepair.payrollPending' };

export const HR_TABS = ['Staff', 'Payroll', 'Advance', 'Dues', 'Ledger'] as const;

export const EMPTY_STAFF = { 
 name: '', 
 email: '', 
 phone: '', 
 role: '', 
 salary: 0, 
 branch: '',
 gender: 'MALE', 
 address: '', 
 joinDate: new Date().toISOString().split('T')[0],
 temporaryPassword: '',
 isActive: true,
 aadhaar: '',
 upiId: '',
 advanceSalary: 0
};

export const EMPTY_PAYROLL_FORM = {
  staffId: '',
  month: new Date().toISOString().slice(0, 7),
  amount: 0,
  paidAmount: 0,
  notes: ''
} as unknown as PayrollFormValues;

export const STAFF_TABLE_HEADER_LABEL_KEYS: Record<string, string> = { Name: 'hr.static.full_name', Branch: 'hr.static.branch', Role: 'hr.static.role', Status: 'hr.static.status', Phone: 'hr.static.phone', Salary: 'hr.static.monthly_salary', Advance: 'hr.static.advance_paid', Joined: 'hr.static.join_date' };
export const PAYROLL_TABLE_HEADER_LABEL_KEYS: Record<string, string> = { Staff: 'hr.static.staff_member', Month: 'hr.static.month', 'Base Salary': 'hr.static.base_salary', 'Net Payable': 'hr.static.net_payable', 'Paid Amount': 'hr.static.paid_amount', Pending: 'hr.static.pending_amount', Status: 'hr.static.status', 'Paid On': 'hr.static.paid_on' };

export const STAFF_TABLE_HEADERS = ['Name', 'Branch', 'Role', 'Status', 'Phone', 'Salary', 'Advance', 'Joined'];

export const PAYROLL_TABLE_HEADERS = ['Staff', 'Month', 'Base Salary', 'Net Payable', 'Paid Amount', 'Pending', 'Status', 'Paid On'];

export const GENDER_OPTIONS = [
 { labelKey: 'hr.static.male', value: 'MALE' },
 { labelKey: 'hr.static.female', value: 'FEMALE' },
 { labelKey: 'hr.static.other', value: 'OTHER' }
];

export const STAFF_ROLE_OPTIONS = [
  { labelKey: 'hr.static.manager', value: 'Manager' },
  { labelKey: 'hr.static.general_trainer', value: 'General Trainer' },
  { labelKey: 'hr.static.personal_trainer_pt', value: 'Personal Trainer' },
  { labelKey: 'hr.static.gym_admin', value: 'Gym Admin' },
  { labelKey: 'hr.static.receptionist', value: 'Receptionist' },
  { labelKey: 'hr.static.sales_executive', value: 'Sales Executive' },
  { labelKey: 'hr.static.dietitian_nutritionist', value: 'Nutritionist' },
  { labelKey: 'hr.static.group_class_instructor', value: 'Group Class Instructor' },
  { labelKey: 'hr.static.housekeeping_helper', value: 'Housekeeping' },
  { labelKey: 'hr.static.maintenance_technician', value: 'Maintenance Technician' },
  { labelKey: 'hr.static.cafeteria_staff', value: 'Cafeteria Staff' },
  { labelKey: 'hr.static.other', value: 'Other' },
];

export const STAFF_MODAL_FIELDS = [
 { labelKey: 'hr.static.full_name', key: 'name', type: 'text', placeholder: '' },
 { labelKey: 'hr.static.email', key: 'email', type: 'email', placeholder: '' },
 { labelKey: 'hr.static.phone', key: 'phone', type: 'tel', placeholder: '' },
 { labelKey: 'hr.static.aadhaar_no', key: 'aadhaar', type: 'tel', placeholder: '123456789012' },
 { labelKey: 'hr.static.upi_id', key: 'upiId', type: 'text', placeholder: 'rahul@okhdfcbank' },
 { labelKey: 'hr.static.monthly_salary', key: 'salary', type: 'number', placeholder: '' },
 { labelKey: 'hr.static.advance_paid', key: 'advanceSalary', type: 'number', placeholder: '0' },
];

export const HR_ITEMS_PER_PAGE = 10;

export const PERFORMANCE_PERIOD_OPTIONS: { labelKey: string; value: PerformancePeriod }[] = [
  { labelKey: 'hr.static.this_month', value: 'THIS_MONTH' },
  { labelKey: 'hr.static.last_month', value: 'LAST_MONTH' },
  { labelKey: 'hr.static.this_quarter', value: 'THIS_QUARTER' },
];

export const PERFORMANCE_TABLE_HEADERS = [
  { key: 'name', labelKey: 'hr.static.staff_member', sortable: true },
  { key: 'role', labelKey: 'hr.static.role', sortable: true },
  { key: 'sessionsTaken', labelKey: 'hr.static.sessions', sortable: true },
  { key: 'membersAdded', labelKey: 'hr.static.members_added', sortable: true },
  { key: 'attendancePct', labelKey: 'hr.static.attendance', sortable: true },
  { key: 'rating', labelKey: 'hr.static.rating', sortable: true },
  { key: 'status', labelKey: 'hr.static.status', sortable: false },
];

export const PERFORMANCE_STATUS_VALUES = { EXCELLENT: 'EXCELLENT', AVERAGE: 'AVERAGE', POOR: 'POOR' } as const;

export const PERFORMANCE_STATUS_CONFIG: Record<string, { labelKey: string; bgClass: string; textClass: string }> = {
  EXCELLENT: { labelKey: 'hr.static.excellent', bgClass: 'bg-success-bg', textClass: 'text-success' },
  AVERAGE:   { labelKey: 'hr.static.average',   bgClass: 'bg-warning-bg', textClass: 'text-warning' },
  POOR:      { labelKey: 'hr.static.poor',      bgClass: 'bg-danger-bg',  textClass: 'text-danger' },
};
