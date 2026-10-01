// RESPONSIBILITY: Owns Login form state, translated validation, browser connectivity state, and navigation around the dedicated Auth Login mutation hook.
// DATA FLOW: Login UI -> useAuthLoginForm -> useAuthLoginMutation -> AuthApi -> same-origin Auth route -> sanitized AuthUser -> role dashboard.
'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';

import { useTranslations } from 'next-intl';

import { useRouter } from 'next/navigation';

import { useForm } from 'react-hook-form';

import { AuthApiError } from '@/app/frontend_auth/auth/auth_api/AuthApiError';

import { AuthClientRuntimeConfig } from '@/app/frontend_auth/auth/auth_constants/AuthClientRuntimeConfig';

import { AuthIdempotencyFingerprintUtilities } from '@/app/frontend_auth/auth/auth_utils/AuthIdempotencyFingerprintUtilities';

import { AuthRoleRedirectUtilities } from '@/app/frontend_auth/auth/auth_utils/AuthRoleRedirectUtilities';

import { AuthLoginConstants, AuthLoginMutationMode } from '@/app/frontend_auth/auth/login/auth_login_constants/AuthLoginConstants';

import { useAuthLoginMutation } from '@/app/frontend_auth/auth/login/auth_login_hooks/useAuthLoginMutation';

import { useAuthLoginUnsavedChangesGuard } from '@/app/frontend_auth/auth/login/auth_login_hooks/useAuthLoginUnsavedChangesGuard';

import { AuthLoginFormSchema } from '@/app/frontend_auth/auth/login/auth_login_schemas/AuthLoginFormSchema';

import { AuthLoginErrorMessageUtilities } from '@/app/frontend_auth/auth/login/auth_login_utils/AuthLoginErrorMessageUtilities';

import type { AuthLoginDemoRole, AuthLoginFormData, AuthLoginMutationResult, UseAuthLoginFormReturn } from '@/app/frontend_auth/auth/login/auth_login_types/AuthLoginTypes';



/**
 * Owns Login form state and connects the view to the isolated mutation boundary.
 * @description Keeps React Hook Form concerns, error mapping, browser connectivity, and role navigation out of component JSX.
 * @dependencies React Hook Form, Zod, next-intl, Next.js router, Login mutation hook, runtime configuration, and role redirect utility.
 * @edge-case Failed authentication preserves entered values; successful authentication clears the intent and resets the form only after the mutation succeeds.
 */
export function useAuthLoginForm(): UseAuthLoginFormReturn {
  const router = useRouter();
  const t = useTranslations('AUTH_LOGIN');
  const loginSchema = useMemo(() => AuthLoginFormSchema((key) => t(key)), [t]);
  const form = useForm<AuthLoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: 'onBlur',
    reValidateMode: 'onChange',
    defaultValues: { email: '', password: '' },
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isOffline, setIsOffline] = useState(false);
  const { isPending, variables, mutateCredentials, mutateDemoRole } = useAuthLoginMutation();
  const credentialIntentRef = useRef<{ fingerprint: string; idempotencyKey: string } | null>(null);
  const demoIntentRef = useRef<{ role: AuthLoginDemoRole; idempotencyKey: string } | null>(null);
  useAuthLoginUnsavedChangesGuard(form.formState.isDirty);

  // USEEFFECT AUDIT: Browser connectivity has symmetric add/remove listeners and never replaces TanStack Query mutation state.
  useEffect(() => {
    const updateConnectionState = () => setIsOffline(!navigator.onLine);
    updateConnectionState();
    window.addEventListener('online', updateConnectionState);
    window.addEventListener('offline', updateConnectionState);
    return () => {
      window.removeEventListener('online', updateConnectionState);
      window.removeEventListener('offline', updateConnectionState);
    };
  }, []);

  const handleMutationError = useCallback((error: unknown): void => {
    form.setError('root', { type: 'server', message: AuthLoginErrorMessageUtilities.getSafeMessage(error, t) });
    if (error instanceof AuthApiError) {
      for (const validationError of error.validationErrors ?? []) {
        if (validationError.field === 'email' || validationError.field === 'password') {
          form.setError(validationError.field, { type: 'server', message: validationError.message });
        }
      }
    }
  }, [form, t]);

  const handleMutationSuccess = useCallback((role: AuthLoginMutationResult['role']): void => {
    credentialIntentRef.current = null;
    demoIntentRef.current = null;
    form.clearErrors('root');
    form.reset();
    const redirectTarget = AuthRoleRedirectUtilities.getDashboardRoute(role);
    if (redirectTarget) router.replace(redirectTarget);
  }, [form, router]);

  const handleLoginSubmit = useCallback(async (data: AuthLoginFormData): Promise<void> => {
    form.clearErrors('root');
    const fingerprint = await AuthIdempotencyFingerprintUtilities.forLogin(data);
    if (!credentialIntentRef.current || credentialIntentRef.current.fingerprint !== fingerprint) {
      credentialIntentRef.current = { fingerprint, idempotencyKey: crypto.randomUUID() };
    }
    try {
      const result = await mutateCredentials(data, credentialIntentRef.current.idempotencyKey);
      handleMutationSuccess(result.role);
    } catch (error) {
      handleMutationError(error);
    }
  }, [form, handleMutationError, handleMutationSuccess, mutateCredentials]);

  const handleDemoLogin = useCallback(async (role: AuthLoginDemoRole): Promise<void> => {
    form.clearErrors('root');
    if (!demoIntentRef.current || demoIntentRef.current.role !== role) {
      demoIntentRef.current = { role, idempotencyKey: crypto.randomUUID() };
    }
    try {
      const result = await mutateDemoRole(role, demoIntentRef.current.idempotencyKey);
      handleMutationSuccess(result.role);
    } catch (error) {
      handleMutationError(error);
    }
  }, [form, handleMutationError, handleMutationSuccess, mutateDemoRole]);

  // USEEFFECT AUDIT: Captures only the documented Ctrl/Cmd+S submit shortcut, prevents the browser save dialog, and removes the listener on unmount.
  useEffect(() => {
    const handleSubmitShortcut = (event: KeyboardEvent) => {
      if (!(event.ctrlKey || event.metaKey) || event.key.toLowerCase() !== AuthLoginConstants.KEYBOARD_SHORTCUTS.SUBMIT) return;
      if (isPending || isOffline) return;
      event.preventDefault();
      void form.handleSubmit(handleLoginSubmit)();
    };

    window.addEventListener('keydown', handleSubmitShortcut);
    return () => window.removeEventListener('keydown', handleSubmitShortcut);
  }, [form, handleLoginSubmit, isOffline, isPending]);

  const handleTogglePassword = useCallback(() => {
    setShowPassword((currentVisible) => !currentVisible);
  }, []);

  const pendingDemoRole = isPending && variables?.mode === AuthLoginMutationMode.DEMO ? variables.role : null;

  return {
    form,
    isSubmitting: isPending,
    isDemoLoginAvailable: AuthClientRuntimeConfig.isLoginDemoEnabled(),
    isOffline,
    pendingDemoRole,
    showPassword,
    handleTogglePassword,
    handleLoginSubmit,
    handleDemoLogin,
  };
}
