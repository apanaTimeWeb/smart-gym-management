/**
 * RESPONSIBILITY: Defines Login form data and mutation contracts without embedding schema, API, or UI rendering logic.
 * DATA FLOW: AuthLoginFormSchema + React Hook Form -> useAuthLoginForm -> AuthLoginForm view.
 */
import type { AuthLoginCredentials, AuthUser } from '@/app/frontend_auth/auth/auth_types/AuthContracts';
import type { AuthLoginDemoRole } from '@/app/frontend_auth/auth/login/auth_login_constants/AuthLoginSharedConstants';
import type { UseFormReturn } from 'react-hook-form';

export type AuthLoginFormData = AuthLoginCredentials;
export type AuthLoginFormApi = UseFormReturn<AuthLoginFormData>;

export const AuthLoginMutationMode = {
  CREDENTIALS: 'credentials',
  DEMO: 'demo',
} as const;

export type AuthLoginMutationMode = (typeof AuthLoginMutationMode)[keyof typeof AuthLoginMutationMode];

export interface AuthLoginCredentialsMutationInput {
  mode: typeof AuthLoginMutationMode.CREDENTIALS;
  credentials: AuthLoginFormData;
  fingerprint: string;
}

export interface AuthLoginDemoMutationInput {
  mode: typeof AuthLoginMutationMode.DEMO;
  role: AuthLoginDemoRole;
  fingerprint: string;
}

export type AuthLoginMutationInput = AuthLoginCredentialsMutationInput | AuthLoginDemoMutationInput;

export interface UseAuthLoginFormReturn {
  form: AuthLoginFormApi;
  isSubmitting: boolean;
  isDemoLoginAvailable: boolean;
  isOffline: boolean;
  pendingDemoRole: AuthLoginDemoRole | null;
  showPassword: boolean;
  handleTogglePassword: () => void;
  handleLoginSubmit: (data: AuthLoginFormData) => Promise<void>;
  handleDemoLogin: (role: AuthLoginDemoRole) => Promise<void>;
}

export type AuthLoginMutationResult = AuthUser;

