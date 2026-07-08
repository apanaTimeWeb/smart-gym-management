'use client';

import { createContext, useContext, useState, ReactNode, useMemo, useCallback } from 'react';
import { authApi } from '@/lib/api';
import { LoginSharedConstants } from '../login_constants/LoginSharedConstants';

interface LoginContextType {
  email: string;
  setEmail: (val: string) => void;
  password: string;
  setPassword: (val: string) => void;
  error: string;
  loading: boolean;
  showPassword: boolean;
  setShowPassword: (val: boolean) => void;
  handleLogin: (e: React.FormEvent) => Promise<void>;
}

const LoginContext = createContext<LoginContextType | undefined>(undefined);

export function LoginProvider({ children }: { children: ReactNode }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = useCallback(async (e: React.FormEvent) => {
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

  const value = useMemo(() => ({
    email, setEmail, password, setPassword, error, loading, showPassword, setShowPassword, handleLogin
  }), [email, password, error, loading, showPassword, handleLogin]);

  return <LoginContext.Provider value={value}>{children}</LoginContext.Provider>;
}

export function useLoginContext() {
  const context = useContext(LoginContext);
  if (!context) throw new Error('useLoginContext must be used within a LoginProvider');
  return context;
}
