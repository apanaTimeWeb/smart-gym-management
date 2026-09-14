// RESPONSIBILITY: Encapsulates logic, UI, or types for this module.
// DATA FLOW: Standard component data flow.
// RESPONSIBILITY: Custom hook managing the form state, validation, and API submission for the login page.
// DATA FLOW: LoginForm (View) -> useLoginForm.ts (Hook) -> auth_api.ts (API)

import { useState, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import toast from 'react-hot-toast';
import { authApi } from '@/app/auth/auth_api/auth_api';
import { DashboardUrlConfig } from '@/app/superadmin/dashboard/dashboard_url_config';
import { AuthUrlConfig } from '@/app/auth/auth_url_config';

import { loginSchema } from '@/app/auth/login/login_types/login_types';
import type { UseLoginFormReturn, LoginFormData, FetchState } from '@/app/auth/login/login_types/login_types';

// Demo user profiles for mock-free offline login
const DEMO_USERS: Record<string, { password: string; role: string; name: string; id: string; tenantId: string }> = {
  'demo_admin@gym.com':   { password: 'demo123', role: 'SUPERADMIN', name: 'Demo Superadmin', id: 'u_superadmin', tenantId: 'tenant_global' },
  'admin@gymsmart.com':   { password: 'demo123', role: 'ADMIN',      name: 'Demo Admin',     id: 'u_admin',      tenantId: 'tenant_001' },
  'manager@gymsmart.com': { password: 'demo123', role: 'MANAGER',    name: 'Demo Manager',   id: 'u_manager',    tenantId: 'tenant_001' },
  'trainer@gymsmart.com': { password: 'demo123', role: 'TRAINER',    name: 'Demo Trainer',   id: 'u_trainer',    tenantId: 'tenant_001' },
};

/**
 * Hook to manage login form state, validation, and handle the authentication flow.
 * Uses Zod for schema validation and explicitly tracks API network state.
 * Implements strict pessimistic UI state updates.
 * Demo credentials bypass the real backend to work even when the backend is offline.
 */
export function useLoginForm(): UseLoginFormReturn {
  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: 'admin@gymsmart.com', password: 'demo123' },
  });

  const [status, setStatus] = useState<FetchState>('idle');
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = useCallback(async (data: LoginFormData) => {
    setStatus('loading');

    // --- Demo credential path: skip real backend entirely ---
    const demoUser = DEMO_USERS[data.email.toLowerCase().trim()];
    if (demoUser && demoUser.password === data.password) {
      try {
        // Build a synthetic response matching the real AuthResponse shape
        const mockAccessToken  = `demo_access_${demoUser.role.toLowerCase()}_${Date.now()}`;
        const mockRefreshToken = `demo_refresh_${demoUser.role.toLowerCase()}_${Date.now()}`;
        const mockUser = { id: demoUser.id, name: demoUser.name, email: data.email, role: demoUser.role, tenantId: demoUser.tenantId };

        const cookieRes = await fetch(AuthUrlConfig.PROXY_API.SET_COOKIE, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ token: mockAccessToken, refreshToken: mockRefreshToken, user: mockUser }),
        });

        if (!cookieRes.ok) throw new Error('Session setup failed');

        setStatus('success');
        toast.success('Login successful');

        if (demoUser.role === 'SUPERADMIN') {
          window.location.href = DashboardUrlConfig.PAGES.MAIN;
        } else if (demoUser.role === 'MANAGER') {
          window.location.replace(AuthUrlConfig.PAGES.MANAGER_DASHBOARD);
        } else if (demoUser.role === 'TRAINER') {
          window.location.replace(AuthUrlConfig.PAGES.TRAINER_DASHBOARD);
        } else {
          window.location.replace(AuthUrlConfig.PAGES.ADMIN_DASHBOARD);
        }
      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : 'Login failed. Please try again.';
        toast.error(msg);
        setStatus('error');
      }
      return;
    }

    // --- Real backend path for non-demo credentials ---
    try {
      const res = await authApi.login(data.email, data.password);
      if (res.success && res.data!.accessToken) {
        const cookieRes = await fetch(AuthUrlConfig.PROXY_API.SET_COOKIE, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            token: res.data!.accessToken,
            refreshToken: res.data!.refreshToken,
            user: res.data!.user
          }),
        });

        if (!cookieRes.ok) throw new Error('Session setup failed');

        setStatus('success');
        toast.success(res.message || 'Login successful');

        if (res.data!.user?.role === 'SUPERADMIN') {
          window.location.href = DashboardUrlConfig.PAGES.MAIN;
        } else if (res.data!.user?.role === 'MANAGER') {
          window.location.replace(AuthUrlConfig.PAGES.MANAGER_DASHBOARD);
        } else if (res.data!.user?.role === 'TRAINER') {
          window.location.replace(AuthUrlConfig.PAGES.TRAINER_DASHBOARD);
        } else {
          window.location.replace(AuthUrlConfig.PAGES.ADMIN_DASHBOARD);
        }
      } else {
        toast.error(res.message || 'Login failed. Please try again.');
        setStatus('error');
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Login failed. Please try again.';
      toast.error(msg);
      setStatus('error');
    }
  }, []);

  const handleDemoSuperadminLogin = useCallback(() => {
    form.setValue('email', 'demo_admin@gym.com');
    form.setValue('password', 'demo123');
    onSubmit({ email: 'demo_admin@gym.com', password: 'demo123' });
  }, [form, onSubmit]);

  const handleDemoAdminLogin = useCallback(() => {
    form.setValue('email', 'admin@gymsmart.com');
    form.setValue('password', 'demo123');
    onSubmit({ email: 'admin@gymsmart.com', password: 'demo123' });
  }, [form, onSubmit]);

  const handleDemoManagerLogin = useCallback(() => {
    form.setValue('email', 'manager@gymsmart.com');
    form.setValue('password', 'demo123');
    onSubmit({ email: 'manager@gymsmart.com', password: 'demo123' });
  }, [form, onSubmit]);

  const handleDemoTrainerLogin = useCallback(() => {
    form.setValue('email', 'trainer@gymsmart.com');
    form.setValue('password', 'demo123');
    onSubmit({ email: 'trainer@gymsmart.com', password: 'demo123' });
  }, [form, onSubmit]);

  return {
    form, status, showPassword, setShowPassword, onSubmit,
    handleDemoSuperadminLogin, handleDemoAdminLogin, handleDemoManagerLogin, handleDemoTrainerLogin
  };
}

