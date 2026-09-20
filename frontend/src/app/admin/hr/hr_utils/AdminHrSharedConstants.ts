// RESPONSIBILITY: Centralized constants, schema, and shared utilities for the HR module.
import type { Staff, PayrollFormValues } from '@/app/admin/hr/hr_types/AdminHrTypes';

export const HR_TABS = ['Staff', 'Payroll', 'Advance', 'Dues', 'Ledger'];

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

export const STAFF_TABLE_HEADERS = ['Name', 'Branch', 'Role', 'Status', 'Phone', 'Salary', 'Advance', 'Joined'];

export const PAYROLL_TABLE_HEADERS = ['Staff', 'Month', 'Base Salary', 'Net Payable', 'Paid Amount', 'Pending', 'Status', 'Paid On'];

export const GENDER_OPTIONS = [
 { label: 'Male', value: 'MALE' },
 { label: 'Female', value: 'FEMALE' },
 { label: 'Other', value: 'OTHER' }
];

export const STAFF_ROLE_OPTIONS = [
  { label: 'Manager', value: 'Manager' },
  { label: 'General Trainer', value: 'General Trainer' },
  { label: 'Personal Trainer (PT)', value: 'Personal Trainer' },
  { label: 'Gym Admin', value: 'Gym Admin' },
  { label: 'Receptionist', value: 'Receptionist' },
  { label: 'Sales Executive', value: 'Sales Executive' },
  { label: 'Dietitian / Nutritionist', value: 'Nutritionist' },
  { label: 'Group Class Instructor', value: 'Group Class Instructor' },
  { label: 'Housekeeping / Helper', value: 'Housekeeping' },
  { label: 'Maintenance Technician', value: 'Maintenance Technician' },
  { label: 'Cafeteria Staff', value: 'Cafeteria Staff' },
  { label: 'Other', value: 'Other' },
];

export const STAFF_MODAL_FIELDS = [
 { label: 'Full Name', key: 'name', type: 'text', placeholder: '' },
 { label: 'Email', key: 'email', type: 'email', placeholder: '' },
 { label: 'Phone', key: 'phone', type: 'tel', placeholder: '' },
 { label: 'Aadhaar No.', key: 'aadhaar', type: 'tel', placeholder: '123456789012' },
 { label: 'UPI ID', key: 'upiId', type: 'text', placeholder: 'rahul@okhdfcbank' },
 { label: 'Monthly Salary (₹)', key: 'salary', type: 'number', placeholder: '' },
 { label: 'Advance Paid (₹)', key: 'advanceSalary', type: 'number', placeholder: '0' },
];

export const HR_ITEMS_PER_PAGE = 10;
