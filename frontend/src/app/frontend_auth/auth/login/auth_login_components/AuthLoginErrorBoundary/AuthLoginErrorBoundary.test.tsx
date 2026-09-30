import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import AuthLoginErrorBoundary from '@/app/frontend_auth/auth/login/auth_login_components/AuthLoginErrorBoundary/AuthLoginErrorBoundary';
vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => ({
    'CLIENT_ERROR.TITLE': 'Login Component Failed',
    'CLIENT_ERROR.DESCRIPTION': 'The login screen could not be rendered safely. Retry to load it again.',
    'CLIENT_ERROR.RETRY': 'Try Again',
  }[key] ?? key),
}));

vi.mock('@/lib/logger', () => ({ logger: { error: vi.fn() } }));

function ThrowingChild() {
  throw new Error('render failure');
}

function StableChild() {
  return <div data-testid="auth-login-stable-child">Recovered</div>;
}

describe('AuthLoginErrorBoundary', () => {
  it('renders a retryable safe fallback and recovers the child after retry', async () => {
    const user = userEvent.setup();
    let shouldThrow = true;
    function SwitchableChild() {
      if (shouldThrow) return <ThrowingChild />;
      return <StableChild />;
    }

    render(
      <AuthLoginErrorBoundary>
        <SwitchableChild />
      </AuthLoginErrorBoundary>,
    );

    expect(await screen.findByTestId('auth-login-error-boundary')).toBeInTheDocument();
    shouldThrow = false;
    await user.click(screen.getByTestId('auth-login-error-boundary-retry'));
    expect(screen.getByTestId('auth-login-stable-child')).toBeInTheDocument();
  });
});
