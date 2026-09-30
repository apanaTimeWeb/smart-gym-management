import { createElement } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { AuthApi } from '@/app/frontend_auth/auth/auth_api/AuthApi';
import { AuthApiError } from '@/app/frontend_auth/auth/auth_api/AuthApiError';
import { useAuthLoginForm } from '@/app/frontend_auth/auth/login/auth_login_components/AuthLoginForm/useAuthLoginForm';
import type { PropsWithChildren } from 'react';

const replaceMock = vi.fn();
const translations: Record<string, string> = {
  'VALIDATION.EMAIL_INVALID': 'Please enter a valid email address',
  'VALIDATION.PASSWORD_MIN_LENGTH': 'Password must be at least 6 characters',
  'ERRORS.UNAVAILABLE': 'We could not sign you in. Please try again.',
};

vi.mock('next-intl', () => ({ useTranslations: () => (key: string) => translations[key] ?? key }));
vi.mock('next/navigation', () => ({ useRouter: () => ({ replace: replaceMock }) }));
vi.mock('@/app/frontend_auth/auth/auth_api/AuthApi', () => ({ AuthApi: { login: vi.fn(), loginDemo: vi.fn() } }));

function createWrapper() {
  const client = new QueryClient({ defaultOptions: { mutations: { retry: false }, queries: { retry: false } } });
  return function Wrapper({ children }: PropsWithChildren) {
    return createElement(QueryClientProvider, { client }, children);
  };
}

describe('useAuthLoginForm', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(AuthApi.login).mockResolvedValue({ id: 'u1', name: 'Admin', email: 'admin@example.com', role: 'ADMIN' });
    vi.mocked(AuthApi.loginDemo).mockResolvedValue({ id: 'u1', name: 'Manager', email: 'manager@example.com', role: 'MANAGER' });
  });

  it('keeps one idempotency key for a retry and clears it after success', async () => {
    vi.mocked(AuthApi.login)
      .mockRejectedValueOnce(new AuthApiError('Invalid email or password.'))
      .mockResolvedValueOnce({ id: 'u1', name: 'Admin', email: 'admin@example.com', role: 'ADMIN' });

    const { result } = renderHook(() => useAuthLoginForm(), { wrapper: createWrapper() });
    const credentials = { email: 'admin@example.com', password: 'demo123' };

    await result.current.handleLoginSubmit(credentials);
    expect(result.current.form.formState.errors.root?.message).toBe('Invalid email or password.');
    const firstKey = vi.mocked(AuthApi.login).mock.calls[0]?.[1];

    await result.current.handleLoginSubmit(credentials);
    await waitFor(() => expect(replaceMock).toHaveBeenCalled());
    const secondKey = vi.mocked(AuthApi.login).mock.calls[1]?.[1];
    expect(firstKey).toBe(secondKey);
    expect(firstKey).toEqual(expect.any(String));
  });

  it('fills the documented role fixture and uses the same submit flow for demo login', async () => {
    const { result } = renderHook(() => useAuthLoginForm(), { wrapper: createWrapper() });
    await result.current.handleDemoLogin('MANAGER');

    expect(AuthApi.loginDemo).toHaveBeenCalledWith('MANAGER', expect.any(String));
  });
});
