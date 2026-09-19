// RESPONSIBILITY: Defines validation for creating and editing staff profiles.
import { z } from 'zod';
export const managerHrStaffFormSchema = z.object({
  name: z.string().min(2, 'Name is required').regex(/^[A-Za-z\s]+$/, 'Only alphabets allowed'),
  email: z.string().email('Invalid email address'),
  phone: z.string().regex(/^\d{10}$/, 'Phone number must be exactly 10 digits'),
  role: z.string().min(2, 'Role is required'), salary: z.number().min(0, 'Salary must be positive'),
  gender: z.enum(['MALE', 'FEMALE', 'OTHER']), address: z.string().optional(), joinDate: z.string(),
  temporaryPassword: z.string().optional().refine((val) => !val || val.length >= 8, { message: 'Password must be at least 8 characters' }),
  isActive: z.boolean().default(true), aadhaar: z.string().regex(/^\d{12}$/, 'Aadhaar must be exactly 12 digits').optional().or(z.literal('')),
  upiId: z.string().regex(/^[a-zA-Z0-9.\-_]{2,256}@[a-zA-Z]{2,64}$/, 'Invalid UPI ID format').optional().or(z.literal('')),
  advanceSalary: z.number().min(0, 'Advance cannot be negative').optional().default(0),
});
