import { useState, useCallback, FormEvent } from 'react';
import { authApi } from '@/lib/api';
import { LoginSharedConstants } from '@/app/(auth)/login/login_constants/LoginSharedConstants';
import { UseLoginFormReturn } from '@/app/(auth)/login/login_types/login_types';

export function useLoginForm(): UseLoginFormReturn {
 const [email, setEmail] = useState('admin@gymsmart.com');
 const [password, setPassword] = useState('superadmin123');
 const [error, setError] = useState('');
 const [loading, setLoading] = useState(false);
 const [showPassword, setShowPassword] = useState(false);

 const handleLogin = useCallback(async (e: FormEvent) => {
 e.preventDefault();
 setLoading(true);
 setError('');

 try {
 const res = await authApi.login(email, password);
 if (res.success && res.data.accessToken) {
 const cookieRes = await fetch(LoginSharedConstants.PATHS.SET_COOKIE_API, {
 method: 'POST',
 headers: { 'Content-Type': 'application/json' },
 body: JSON.stringify({ token: res.data.accessToken, user: res.data.user }),
 });

 if (!cookieRes.ok) throw new Error('Session setup failed');

 window.location.replace(LoginSharedConstants.PATHS.DASHBOARD);
 }
 } catch (err: unknown) {
 setError(err instanceof Error ? err.message : 'Login failed. Please try again.');
 setLoading(false);
 }
 }, [email, password]);

 return {
 email,
 setEmail,
 password,
 setPassword,
 error,
 loading,
 showPassword,
 setShowPassword,
 handleLogin
 };
}
