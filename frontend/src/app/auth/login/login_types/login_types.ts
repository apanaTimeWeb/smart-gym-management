// RESPONSIBILITY: Encapsulates logic, UI, or types for this module.
// DATA FLOW: Standard component data flow.
// RESPONSIBILITY: Defines strict Zod schemas, TypeScript interfaces, and API response shapes specifically for the Login module to enforce type safety.
import type { UseFormReturn } from 'react-hook-form';
import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export type LoginFormData = z.infer<typeof loginSchema>;

export type FetchState = 'idle' | 'loading' | 'success' | 'error';

export const AuthUserSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().email(),
  role: z.string(),
  tenantId: z.string().optional(),
});

export const AuthResponseSchema = z.object({
  accessToken: z.string(),
  refreshToken: z.string(),
  user: AuthUserSchema,
});

export type AuthUser = z.infer<typeof AuthUserSchema>;
export type AuthResponse = z.infer<typeof AuthResponseSchema>;

export interface UseLoginFormReturn {
  form: UseFormReturn<LoginFormData>;
  status: FetchState;
  showPassword: boolean;
  setShowPassword: (val: boolean) => void;
  onSubmit: (data: LoginFormData) => Promise<void>;
  handleDemoSuperadminLogin: () => void;
  handleDemoAdminLogin: () => void;
  handleDemoManagerLogin: () => void;
  handleDemoTrainerLogin: () => void;
}

