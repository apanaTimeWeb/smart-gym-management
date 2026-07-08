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
