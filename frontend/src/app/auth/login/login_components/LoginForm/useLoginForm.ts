// RESPONSIBILITY: Custom hook managing the form state, validation, and API submission for the login page.
// DATA FLOW: LoginForm (View) -> useLoginForm.ts (Hook) -> auth_api.ts (API)

import { useState, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import toast from 'react-hot-toast';
import { authApi } from '@/app/auth/auth_api/auth_api';
import { AuthUrlConfig } from '@/app/auth/auth_url_config';
import { SuperadminUrlConfig } from '@/app/superadmin/superadmin_url_config';
import type { UseLoginFormReturn, LoginFormData, FetchState } from '@/app/auth/login/login_types/login_types';
import { loginSchema } from '@/app/auth/login/login_types/login_types';

/**
 * Hook to manage login form state, validation, and handle the authentication flow.
 * Uses Zod for schema validation and explicitly tracks API network state.
 * Implements strict pessimistic UI state updates.
 */
export function useLoginForm(): UseLoginFormReturn {
  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: 'admin@gymsmart.com', password: 'superadmin123' },
  });

  const [status, setStatus] = useState<FetchState>('idle');
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = useCallback(async (data: LoginFormData) => {
    setStatus('loading');

    try {
      const res = await authApi.login(data.email, data.password);
      if (res.success && res.data.accessToken) {
        const cookieRes = await fetch(AuthUrlConfig.PROXY_API.SET_COOKIE, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            token: res.data.accessToken, 
            refreshToken: res.data.refreshToken, 
            user: res.data.user 
          }),
        });

        if (!cookieRes.ok) throw new Error('Session setup failed');
        
        setStatus('success');
        toast.success(res.message || 'Login successful');
        
        if (res.data.user?.role === 'SUPERADMIN') {
          window.location.replace(SuperadminUrlConfig.PAGES.DASHBOARD);
        } else {
          window.location.replace(AuthUrlConfig.PAGES.DASHBOARD);
        }
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Login failed. Please try again.';
      toast.error(msg);
      setStatus('error');
    }
  }, []);

  const handleDemoLogin = useCallback(() => {
    form.setValue('email', 'demo_admin@gym.com');
    form.setValue('password', 'demo123');
    // We delay the submission slightly so the user sees the fields populate
    setTimeout(() => {
      form.handleSubmit(onSubmit)();
    }, 300);
  }, [form, onSubmit]);

  return { form, status, showPassword, setShowPassword, onSubmit, handleDemoLogin };
}
