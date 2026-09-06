// RESPONSIBILITY: Centralized constants, schema, and shared utilities for the HR module.
import { z } from 'zod';

export const StaffSchema = z.object({
  name: z.string().min(2, "Name is required").regex(/^[A-Za-z\s]+$/, "Only alphabets allowed"),
  email: z.string().email("Invalid email address"),
  phone: z.string().regex(/^\d{10}$/, "Phone number must be exactly 10 digits"),
  role: z.string().min(2, "Role is required"),
  salary: z.number().min(0, "Salary must be positive"),
  gender: z.enum(['MALE', 'FEMALE', 'OTHER']),
  address: z.string().optional(),
  joinDate: z.string(),
  temporaryPassword: z.string().optional().refine(val => !val || val.length >= 8, {
    message: "Password must be at least 8 characters",
  }),
  isActive: z.boolean().default(true)
});

export type StaffFormValues = z.infer<typeof StaffSchema>;

export const HR_TABS = ['Staff', 'Payroll'];

export const EMPTY_STAFF = { 
 name: '', 
 email: '', 
 phone: '', 
 role: '', 
 salary: 0, 
 gender: 'MALE', 
 address: '', 
 joinDate: new Date().toISOString().split('T')[0],
 temporaryPassword: '',
 isActive: true
};

export const PayrollSchema = z.object({
  staffId: z.string().min(1, "Please select staff"),
  month: z.string().min(1, "Month is required"),
  amount: z.number().min(0, "Amount must be positive"),
  notes: z.string().optional()
});

export type PayrollFormValues = z.infer<typeof PayrollSchema>;

export const EMPTY_PAYROLL_FORM = {
  staffId: '',
  month: new Date().toISOString().slice(0, 7),
  amount: 0,
  notes: ''
} as unknown as PayrollFormValues;

export const STAFF_TABLE_HEADERS = ['Name', 'Role', 'Status', 'Phone', 'Salary', 'Joined'];

export const PAYROLL_TABLE_HEADERS = ['Staff', 'Month', 'Total Amount', 'Paid Amount', 'Pending', 'Status', 'Paid On'];

export const GENDER_OPTIONS = [
 { label: 'Male', value: 'MALE' },
 { label: 'Female', value: 'FEMALE' },
 { label: 'Other', value: 'OTHER' }
];

export const BRANCH_OPTIONS = ['Main Branch', 'Branch 2', 'Branch 3'];

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
];

export const STAFF_MODAL_FIELDS = [
 { label: 'Full Name', key: 'name', type: 'text', placeholder: '' },
 { label: 'Email', key: 'email', type: 'email', placeholder: '' },
 { label: 'Phone', key: 'phone', type: 'tel', placeholder: '' },
 { label: 'Monthly Salary (₹)', key: 'salary', type: 'number', placeholder: '' },
];
