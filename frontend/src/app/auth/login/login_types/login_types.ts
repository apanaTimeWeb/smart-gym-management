/**
 * RESPONSIBILITY: Defines Login form and hook return types without embedding validation schema declarations.
 * DATA FLOW: LoginSchema + React Hook Form state -> Login form hook -> Login view.
 */
import type { UseFormReturn } from 'react-hook-form';
import type { AuthLoginCredentials } from '@/app/auth/auth_types/AuthContracts';
import type { LoginDemoRole } from '@/app/auth/login/login_constants/LoginSharedConstants';

export type LoginFormData = AuthLoginCredentials;
export type LoginFormApi = UseFormReturn<LoginFormData>;

export interface UseLoginFormReturn {
  form: LoginFormApi;
  isSubmitting: boolean;
  showPassword: boolean;
  setShowPassword: (value: boolean) => void;
  onSubmit: (data: LoginFormData) => Promise<void>;
  handleDemoLogin: (role: LoginDemoRole) => Promise<void>;
}
