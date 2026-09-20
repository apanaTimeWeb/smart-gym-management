import type { ReactNode } from 'react';
import { describe, expect, it, vi, beforeEach } from 'vitest';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LoginForm from '@/app/auth/login/login_components/LoginForm/LoginForm';
import { AuthApi } from '@/app/auth/auth_api/auth_api';
import type { AuthUser } from '@/app/auth/auth_types/AuthContracts';
import { AuthUrlConfig } from '@/app/auth/auth_url_config';

const replaceMock = vi.fn();

vi.mock('next/image', () => ({
  default: ({ src, alt, className }: { src: string; alt?: string; className?: string }) => <img src={src} alt={alt ?? ''} className={className} />,
}));

vi.mock('next/link', () => ({
  default: ({ href, children, className, 'aria-label': ariaLabel }: { href: string; children: ReactNode; className?: string; 'aria-label'?: string }) => <a href={href} className={className} aria-label={ariaLabel}>{children}</a>,
}));

vi.mock('next/navigation', () => ({
  useRouter: () => ({ replace: replaceMock }),
}));

vi.mock('@/app/auth/auth_api/auth_api', () => ({
  AuthApi: { login: vi.fn() },
}));

function renderLogin() {
  const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false }, mutations: { retry: false } } });
  return render(<QueryClientProvider client={queryClient}><LoginForm /></QueryClientProvider>);
}

describe('LoginForm', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(AuthApi.login).mockResolvedValue({ id: 'u1', name: 'Admin', email: 'admin@example.com', role: 'ADMIN' });
  });

  it('shows validation errors and blocks submission for invalid input', async () => {
    const user = userEvent.setup();
    renderLogin();
    await user.click(screen.getByRole('button', { name: 'Sign In' }));
    expect(await screen.findByText('Please enter a valid email address')).toBeInTheDocument();
    expect(await screen.findByText('Password must be at least 6 characters')).toBeInTheDocument();
    expect(AuthApi.login).not.toHaveBeenCalled();
    expect(screen.getByLabelText('Email Address')).toHaveAttribute('aria-invalid', 'true');
  });

  it('validates fields on blur before submission', async () => {
    const user = userEvent.setup();
    renderLogin();
    const email = screen.getByLabelText('Email Address');
    await user.type(email, 'not-an-email');
    await user.tab();
    expect(await screen.findByText('Please enter a valid email address')).toBeInTheDocument();
    expect(email).toHaveAttribute('aria-describedby', 'login-email-error');
  });

  it('allows keyboard users to toggle password visibility', async () => {
    const user = userEvent.setup();
    renderLogin();
    const password = screen.getByLabelText('Password');
    const toggle = screen.getByRole('button', { name: 'Show password' });
    await user.type(password, 'demo123');
    await user.click(toggle);
    expect(password).toHaveAttribute('type', 'text');
    expect(screen.getByRole('button', { name: 'Hide password' })).toHaveAttribute('aria-pressed', 'true');
  });

  it('keeps a stable loading action while authentication is pending', async () => {
    const user = userEvent.setup();
    let resolveLogin: ((value: AuthUser) => void) | undefined;
    vi.mocked(AuthApi.login).mockImplementationOnce(() => new Promise((resolve) => { resolveLogin = resolve; }));
    renderLogin();
    await user.type(screen.getByLabelText('Email Address'), 'admin@example.com');
    await user.type(screen.getByLabelText('Password'), 'demo123');
    await user.click(screen.getByRole('button', { name: 'Sign In' }));
    expect(await screen.findByRole('button', { name: 'Signing in…' })).toBeDisabled();
    resolveLogin?.({ id: 'u1', name: 'Admin', email: 'admin@example.com', role: 'ADMIN' });
  });

  it('submits valid credentials and navigates back through server-side role redirect', async () => {
    const user = userEvent.setup();
    renderLogin();
    await user.type(screen.getByLabelText('Email Address'), 'admin@example.com');
    await user.type(screen.getByLabelText('Password'), 'demo123');
    await user.click(screen.getByRole('button', { name: 'Sign In' }));
    await waitFor(() => expect(AuthApi.login).toHaveBeenCalledWith({ email: 'admin@example.com', password: 'demo123' }));
    await waitFor(() => expect(replaceMock).toHaveBeenCalledWith(AuthUrlConfig.PAGES.LOGIN));
  });

  it('renders a user-safe API failure message in the form', async () => {
    const user = userEvent.setup();
    vi.mocked(AuthApi.login).mockRejectedValueOnce(new Error('Invalid email or password.'));
    renderLogin();
    await user.type(screen.getByLabelText('Email Address'), 'wrong@example.com');
    await user.type(screen.getByLabelText('Password'), 'wrong123');
    await user.click(screen.getByRole('button', { name: 'Sign In' }));
    expect(await screen.findByRole('alert')).toHaveTextContent('Invalid email or password.');
  });

  it('does not accidentally submit when the password visibility button is activated', () => {
    renderLogin();
    const toggle = screen.getByRole('button', { name: 'Show password' });
    fireEvent.click(toggle);
    expect(AuthApi.login).not.toHaveBeenCalled();
  });
});
