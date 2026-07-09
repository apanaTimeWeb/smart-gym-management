import { useState, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import toast from 'react-hot-toast';
import { authApi } from '@/lib/api';
import { AuthUrlConfig } from '@/app/(auth)/auth_url_config';
import { UseLoginFormReturn, loginSchema, LoginFormData } from '@/app/(auth)/login/login_types/login_types';

export function useLoginForm(): UseLoginFormReturn {
  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  });

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = useCallback(async (data: LoginFormData) => {
    setLoading(true);

    try {
      const res = await authApi.login(data.email, data.password);
      if (res.success && res.data.accessToken) {
        const cookieRes = await fetch(AuthUrlConfig.PROXY_API.SET_COOKIE, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            token: res.data.accessToken, 
            refreshToken: (res.data as any).refreshToken, 
            user: res.data.user 
          }),
        });

        if (!cookieRes.ok) throw new Error('Session setup failed');
        
        toast.success('Login successful!');
        window.location.replace(AuthUrlConfig.PAGES.DASHBOARD);
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Login failed. Please try again.';
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  }, []);

  return { form, loading, showPassword, setShowPassword, onSubmit };
}
