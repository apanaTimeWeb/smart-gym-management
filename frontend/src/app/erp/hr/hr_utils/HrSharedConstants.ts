import { z } from 'zod';

export const StaffSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  role: z.string().min(2, "Role is required"),
  salary: z.coerce.number().min(0, "Salary must be positive"),
  branch: z.string(),
  gender: z.enum(['MALE', 'FEMALE', 'OTHER']),
  address: z.string().optional(),
  joinDate: z.string()
});

export type StaffFormValues = z.infer<typeof StaffSchema>;

export const HR_TABS = ['Staff', 'Payroll'];

export const EMPTY_STAFF = { 
 name: '', 
 email: '', 
 phone: '', 
 role: '', 
 salary: 0, 
 branch: 'Main Branch', 
 gender: 'MALE', 
 address: '', 
 joinDate: new Date().toISOString().split('T')[0] 
};

export const STAFF_TABLE_HEADERS = ['Name', 'Role', 'Phone', 'Branch', 'Salary', 'Joined', 'Actions'];

export const PAYROLL_TABLE_HEADERS = ['Staff', 'Month', 'Amount', 'Status', 'Paid On', 'Actions'];

export const GENDER_OPTIONS = [
 { label: 'Male', value: 'MALE' },
 { label: 'Female', value: 'FEMALE' },
 { label: 'Other', value: 'OTHER' }
];

export const BRANCH_OPTIONS = ['Main Branch', 'Branch 2', 'Branch 3'];

export const STAFF_MODAL_FIELDS = [
 { label: 'Full Name', key: 'name', type: 'text', placeholder: '' },
 { label: 'Email', key: 'email', type: 'email', placeholder: '' },
 { label: 'Phone', key: 'phone', type: 'tel', placeholder: '' },
 { label: 'Role', key: 'role', type: 'text', placeholder: 'Trainer, Receptionist, Manager...' },
 { label: 'Monthly Salary (₹)', key: 'salary', type: 'number', placeholder: '' },
];
