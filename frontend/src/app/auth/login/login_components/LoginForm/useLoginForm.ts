'use client';
/**
 * RESPONSIBILITY: Owns Login form interaction logic, TanStack Query mutation state, server-error mapping, and development-only demo selection.
 * DATA FLOW: RHF/Zod -> AuthApi -> POST /auth/session -> secure cookie session -> server-side /auth/login redirect.
 */
import { useCallback, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AuthApi } from '@/app/auth/auth_api/auth_api';
import { AuthMockFixturesApi } from '@/app/auth/auth_mocks/AuthMockFixtures';
import { AuthUrlConfig } from '@/app/auth/auth_url_config';
import { LoginSchema } from '@/app/auth/login/login_types/LoginFormSchema';
import { LoginSharedConstants } from '@/app/auth/login/login_constants/LoginSharedConstants';
import type { LoginDemoRole } from '@/app/auth/login/login_constants/LoginSharedConstants';
import type { LoginFormData, UseLoginFormReturn } from '@/app/auth/login/login_types/login_types';

export function useLoginForm(): UseLoginFormReturn {
  const router = useRouter();
  const form = useForm<LoginFormData>({
    resolver: zodResolver(LoginSchema),
    mode: 'onBlur',
    reValidateMode: 'onChange',
    defaultValues: { email: '', password: '' },
  });
  const [showPassword, setShowPassword] = useState(false);

  const loginMutation = useMutation({
    mutationFn: (credentials: LoginFormData) => AuthApi.login(credentials),
    onSuccess: () => {
      form.clearErrors('root');
      router.replace(AuthUrlConfig.PAGES.LOGIN);
    },
    onError: (error: unknown) => {
      const message = error instanceof Error && error.message.trim().length > 0
        ? error.message
        : LoginSharedConstants.TEXT.FORM_SERVER_ERROR;
      form.setError('root', { type: 'server', message });
    },
  });

  const onSubmit = useCallback(async (data: LoginFormData) => {
    form.clearErrors('root');
    await loginMutation.mutateAsync(data);
  }, [form, loginMutation]);

  const handleDemoLogin = useCallback(async (role: LoginDemoRole) => {
    const demoUser = AuthMockFixturesApi.findByRole(role);
    form.setValue('email', demoUser.email, { shouldDirty: true, shouldValidate: true });
    form.setValue('password', demoUser.password, { shouldDirty: true, shouldValidate: true });
    await onSubmit({ email: demoUser.email, password: demoUser.password });
  }, [form, onSubmit]);

  return {
    form,
    isSubmitting: loginMutation.isPending,
    showPassword,
    setShowPassword,
    onSubmit,
    handleDemoLogin,
  };
}
