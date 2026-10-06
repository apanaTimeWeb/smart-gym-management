import { AuthLoginMutationMode } from '@/app/frontend_auth/auth/login/auth_login_constants/AuthLoginConstants';

import type { AuthLoginCredentials, AuthUser } from '@/app/frontend_auth/auth/auth_types/AuthContracts';

import type { UseFormReturn } from 'react-hook-form';

// RESPONSIBILITY: Owns Login form, mutation, presentation-prop, and state return type contracts.

export type AuthLoginDemoRole = (typeof import('@/app/frontend_auth/auth/login/auth_login_constants/AuthLoginConstants').AuthLoginConstants.DEMO_BUTTONS)[number]['role'];
export type AuthLoginFormTranslationKey = (typeof import('@/app/frontend_auth/auth/login/auth_login_constants/AuthLoginConstants').AuthLoginFormTranslationKeys)[keyof typeof import('@/app/frontend_auth/auth/login/auth_login_constants/AuthLoginConstants').AuthLoginFormTranslationKeys];
export type AuthLoginFormData = AuthLoginCredentials;
export type AuthLoginFormApi = UseFormReturn<AuthLoginFormData>;

export interface AuthLoginCredentialsMutationInput {
  mode: typeof AuthLoginMutationMode.CREDENTIALS;
  credentials: AuthLoginFormData;
  idempotencyKey: string;
}

export interface AuthLoginDemoMutationInput {
  mode: typeof AuthLoginMutationMode.DEMO;
  role: AuthLoginDemoRole;
  idempotencyKey: string;
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



export type AuthLoginFormTranslator = (key: AuthLoginFormTranslationKey) => string;

export interface AuthLoginFormHeaderSectionProps {
  backToHomeLabel: string;
  backToHomeAriaLabel: string;
  landingRoute: string;
  brand: string;
  logoSource: string;
  title: string;
  subtitle: string;
}

export interface AuthLoginCredentialFieldsProps {
  form: AuthLoginFormApi;
  isSubmitting: boolean;
  isReadOnly?: boolean;
  showPassword: boolean;
  onTogglePassword: () => void;
}

export interface AuthLoginFormErrorProps {
  message?: string;
}

export interface AuthLoginSubmitButtonProps {
  isSubmitting: boolean;
  isDisabled: boolean;
  label: string;
  submittingLabel: string;
}

export interface AuthLoginDemoActionsProps {
  isSubmitting: boolean;
  isOffline: boolean;
  isDemoLoginAvailable: boolean;
  pendingDemoRole: AuthLoginDemoRole | null;
  onDemoLogin: (role: AuthLoginDemoRole) => Promise<void>;
  quickDemosLabel: string;
  loadingLabel: string;
}

export interface AuthLoginFormFooterProps {
  label: string;
}


export interface UseAuthLoginMutationReturn {
  isPending: boolean;
  variables: AuthLoginMutationInput | undefined;
  mutateCredentials: (credentials: AuthLoginFormData, idempotencyKey: string) => Promise<AuthLoginMutationResult>;
  mutateDemoRole: (role: AuthLoginDemoRole, idempotencyKey: string) => Promise<AuthLoginMutationResult>;
}
