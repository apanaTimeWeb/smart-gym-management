'use client';
/**
 * RESPONSIBILITY: Owns Login form state, translated validation, TanStack Query mutation lifecycle, idempotency, and authentication submission orchestration.
 * DATA FLOW: RHF/Zod -> AuthApi -> same-origin Auth route -> secure cookie session -> Login server redirect.
 * @dependencies React Hook Form, TanStack Query, next-intl, Next.js router, AuthApi, Login schema, and Auth runtime configuration.
 * @edge-case Offline browser state is exposed without inventing a parallel request-status enum; failed login responses preserve form values for retry.
 */
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { AuthApi } from '@/app/frontend_auth/auth/auth_api/AuthApi';
import { AuthApiError } from '@/app/frontend_auth/auth/auth_api/AuthApiError';
import { AuthClientRuntimeConfig } from '@/app/frontend_auth/auth/auth_constants/AuthClientRuntimeConfig';
import { AuthIdempotencyFingerprintUtils } from '@/app/frontend_auth/auth/auth_utils/AuthIdempotencyFingerprintUtils';
import { AuthRoleRedirectUtils } from '@/app/frontend_auth/auth/auth_utils/AuthRoleRedirectUtils';
import { AuthLoginFormSchema } from '@/app/frontend_auth/auth/login/auth_login_schemas/AuthLoginFormSchema';
import { useAuthLoginUnsavedChangesGuard } from '@/app/frontend_auth/auth/login/auth_login_components/AuthLoginForm/useAuthLoginUnsavedChangesGuard';
import { AuthLoginMutationMode } from '@/app/frontend_auth/auth/login/auth_login_types/AuthLoginTypes';
import type { AuthLoginDemoRole } from '@/app/frontend_auth/auth/login/auth_login_constants/AuthLoginSharedConstants';
import type { AuthLoginFormData, AuthLoginMutationInput, UseAuthLoginFormReturn } from '@/app/frontend_auth/auth/login/auth_login_types/AuthLoginTypes';

/** Returns only the backend-provided safe message or the module-local translated fallback. */
function getSafeLoginErrorMessage(error: unknown, translate: (key: string) => string): string {
  if (error instanceof AuthApiError && error.message.trim().length > 0) return error.message;
  return translate('ERRORS.UNAVAILABLE');
}

export function useAuthLoginForm(): UseAuthLoginFormReturn {
  const router = useRouter();
  const t = useTranslations('AUTH_LOGIN');
  const loginIntentRef = useRef<{ key: string; fingerprint: string } | null>(null);
  const loginSchema = useMemo(() => AuthLoginFormSchema((key) => t(key)), [t]);
  const form = useForm<AuthLoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: 'onBlur',
    reValidateMode: 'onChange',
    defaultValues: { email: '', password: '' },
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isOffline, setIsOffline] = useState(false);
  useAuthLoginUnsavedChangesGuard(form.formState.isDirty);

  // USEEFFECT AUDIT: Tracks browser connectivity because Login cannot complete network authentication while offline; the listener set is symmetrical and cleaned up on unmount.
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

  const getIdempotencyKey = useCallback((fingerprint: string): string => {
    const currentIntent = loginIntentRef.current;
    if (!currentIntent || currentIntent.fingerprint !== fingerprint) {
      loginIntentRef.current = { key: crypto.randomUUID(), fingerprint };
    }
    return loginIntentRef.current?.key ?? '';
  }, []);

  const loginMutation = useMutation<Awaited<ReturnType<typeof AuthApi.login>>, AuthApiError, AuthLoginMutationInput>({
    mutationFn: async (input) => {
      const idempotencyKey = getIdempotencyKey(input.fingerprint);
      if (input.mode === AuthLoginMutationMode.CREDENTIALS) {
        return AuthApi.login(input.credentials, idempotencyKey);
      }
      return AuthApi.loginDemo(input.role, idempotencyKey);
    },
    retry: false,
    onSuccess: (data) => {
      loginIntentRef.current = null;
      form.clearErrors('root');
      form.reset();
      const redirectTarget = AuthRoleRedirectUtils.getDashboardRoute(data.role);
      if (redirectTarget) router.replace(redirectTarget);
    },
    onError: (error: AuthApiError) => {
      form.setError('root', { type: 'server', message: getSafeLoginErrorMessage(error, t) });
      for (const validationError of error.validationErrors ?? []) {
        if (validationError.field === 'email' || validationError.field === 'password') {
          form.setError(validationError.field, { type: 'server', message: validationError.message });
        }
      }
    },
  });

  const runLoginMutation = useCallback(async (input: AuthLoginMutationInput): Promise<void> => {
    form.clearErrors('root');
    try {
      await loginMutation.mutateAsync(input);
    } catch {
      // The mutation onError callback already writes the user-safe form error.
    }
  }, [form, loginMutation]);

  const handleLoginSubmit = useCallback(async (data: AuthLoginFormData): Promise<void> => {
    const fingerprint = await AuthIdempotencyFingerprintUtils.forLogin(data);
    await runLoginMutation({
      mode: AuthLoginMutationMode.CREDENTIALS,
      credentials: data,
      fingerprint,
    });
  }, [runLoginMutation]);

  const handleDemoLogin = useCallback(async (role: AuthLoginDemoRole): Promise<void> => {
    await runLoginMutation({
      mode: AuthLoginMutationMode.DEMO,
      role,
      fingerprint: AuthIdempotencyFingerprintUtils.forDemoRole(role),
    });
  }, [runLoginMutation]);

  const handleTogglePassword = useCallback(() => {
    setShowPassword((currentVisible) => !currentVisible);
  }, []);

  const pendingDemoRole = loginMutation.isPending && loginMutation.variables?.mode === AuthLoginMutationMode.DEMO
    ? loginMutation.variables.role
    : null;

  return {
    form,
    isSubmitting: loginMutation.isPending,
    isDemoLoginAvailable: AuthClientRuntimeConfig.isLoginDemoEnabled(),
    isOffline,
    pendingDemoRole,
    showPassword,
    handleTogglePassword,
    handleLoginSubmit,
    handleDemoLogin,
  };
}
