// RESPONSIBILITY: Contains logic, types, or component definition for this module.
import { UseFormReturn } from 'react-hook-form';
import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export type LoginFormData = z.infer<typeof loginSchema>;

export type FetchState = 'idle' | 'loading' | 'success' | 'error';

export interface UseLoginFormReturn {
  form: UseFormReturn<LoginFormData>;
  status: FetchState;
  showPassword: boolean;
  setShowPassword: (val: boolean) => void;
  onSubmit: (data: LoginFormData) => Promise<void>;
}

