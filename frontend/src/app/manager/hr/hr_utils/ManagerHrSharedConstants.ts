// RESPONSIBILITY: Provides static UI option and table-label constants for the HR module; no server data or form schemas.
export const MANAGER_HR_MAX_AMOUNT_MAJOR_UNITS = Number.MAX_SAFE_INTEGER / 100;

export const HR_TABS = ['Trainer List', 'Trainer Attendance', 'Salary & Payments', 'Staff Ledger', 'Give Advance', 'Pay Due'] as const;


export const STAFF_TABLE_HEADERS = ['Name', 'Role', 'Status', 'Phone', 'Salary', 'Advance', 'Joined'];

export const PAYROLL_TABLE_HEADERS = ['Staff', 'Month', 'Base Salary', 'Net Payable', 'Paid Amount', 'Pending', 'Status', 'Paid On'];


export const GENDER_OPTIONS = [
  { label: 'Male', value: 'MALE' },
  { label: 'Female', value: 'FEMALE' },
  { label: 'Other', value: 'OTHER' },
] as const;


export const STAFF_ROLE_OPTIONS = [
  { label: 'General Trainer', value: 'General Trainer' },
  { label: 'Personal Trainer (PT)', value: 'Personal Trainer' },
  { label: 'Gym Manager', value: 'Gym Manager' },
  { label: 'Receptionist', value: 'Receptionist' },
  { label: 'Sales Executive', value: 'Sales Executive' },
  { label: 'Dietitian / Nutritionist', value: 'Nutritionist' },
  { label: 'Group Class Instructor', value: 'Group Class Instructor' },
  { label: 'Housekeeping / Helper', value: 'Housekeeping' },
  { label: 'Maintenance Technician', value: 'Maintenance Technician' },
  { label: 'Cafeteria Staff', value: 'Cafeteria Staff' },
  { label: 'Other', value: 'Other' },
] as const;


export const STAFF_MODAL_FIELDS = [
  { label: 'Full Name', key: 'name', type: 'text', placeholder: '' },
  { label: 'Email', key: 'email', type: 'email', placeholder: '' },
  { label: 'Phone', key: 'phone', type: 'tel', placeholder: '' },
  { label: 'Aadhaar No.', key: 'aadhaar', type: 'tel', placeholder: '123456789012' },
  { label: 'UPI ID', key: 'upiId', type: 'text', placeholder: 'rahul@okhdfcbank' },
  { label: 'Monthly Salary (₹)', key: 'salary', type: 'number', placeholder: '' },
  { label: 'Advance Paid (₹)', key: 'advanceSalary', type: 'number', placeholder: '0' },
  { label: 'Address', key: 'address', type: 'text', placeholder: 'Full Address' },
] as const;
