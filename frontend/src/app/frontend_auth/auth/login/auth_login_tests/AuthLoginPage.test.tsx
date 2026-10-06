import { describe, expect, it, vi } from 'vitest';

import { AuthRoleConstants } from '@/app/frontend_auth/auth/auth_constants/AuthRoleConstants';

import { AuthSessionConstants } from '@/app/frontend_auth/auth/auth_constants/AuthSessionConstants';

import { AuthUrlConfig } from '@/app/frontend_auth/auth/auth_url_config';

import LoginPage from '@/app/frontend_auth/auth/login/page';



const cookiesMock = vi.hoisted(() => vi.fn());
const redirectMock = vi.hoisted(() => vi.fn((target: string) => { throw new Error(`REDIRECT:${target}`); }));
const resolveUserMock = vi.hoisted(() => vi.fn());

vi.mock('next/headers', () => ({
  cookies: cookiesMock,
}));

vi.mock('next/navigation', () => ({
  redirect: redirectMock,
}));

vi.mock('@/app/frontend_auth/auth/auth_utils/AuthSessionServerUtilities', () => ({
  AuthSessionServerUtilities: { resolveUser: resolveUserMock },
}));

vi.mock('@/app/frontend_auth/auth/auth_utils/AuthRoleRedirectUtilities', () => ({
  AuthRoleRedirectUtilities: {
    getDashboardRoute: vi.fn((role: string) => role === AuthRoleConstants.ADMIN ? AuthUrlConfig.PAGES.ADMIN_DASHBOARD : null),
  },
}));

vi.mock('@/app/frontend_auth/auth/login/auth_login_components/auth_login_main/AuthLoginMain', () => ({
  default: () => 'LOGIN_VIEW',
}));

describe('LoginPage', () => {
  it('renders the Login sub-feature directly when no authenticated session exists', async () => {
    cookiesMock.mockResolvedValueOnce({ get: vi.fn(() => undefined) });

    const rendered = await LoginPage();

    expect(rendered).toBe('LOGIN_VIEW');
    expect(resolveUserMock).not.toHaveBeenCalled();
  });

  it('redirects a valid authenticated Admin session to the documented dashboard', async () => {
    cookiesMock.mockResolvedValueOnce({
      get: vi.fn((cookieName: string) => cookieName === AuthSessionConstants.COOKIES.ACCESS_TOKEN ? { value: 'access-token' } : undefined),
    });
    resolveUserMock.mockResolvedValueOnce({ id: 'u1', name: 'Admin', email: 'admin@example.com', role: AuthRoleConstants.ADMIN });

    await expect(LoginPage()).rejects.toThrow(`REDIRECT:${AuthUrlConfig.PAGES.ADMIN_DASHBOARD}`);
    expect(redirectMock).toHaveBeenCalledWith(AuthUrlConfig.PAGES.ADMIN_DASHBOARD);
  });

  it('keeps the Login view when an access token cannot be resolved to an authenticated user', async () => {
    cookiesMock.mockResolvedValueOnce({
      get: vi.fn(() => ({ value: 'expired-token' })),
    });
    resolveUserMock.mockResolvedValueOnce(null);

    const rendered = await LoginPage();

    expect(rendered).toBe('LOGIN_VIEW');
    expect(redirectMock).not.toHaveBeenCalled();
  });
});
