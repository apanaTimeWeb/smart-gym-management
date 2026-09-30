import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import ErrorPage from '@/app/frontend_auth/auth/login/error';
const resetMock = vi.fn();
vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => ({
    'ROUTE_ERROR.TITLE': 'Login Is Temporarily Unavailable',
    'ROUTE_ERROR.DESCRIPTION': 'The login route encountered an unexpected error. Retry to continue.',
    'ROUTE_ERROR.RETRY': 'Try Again',
  }[key] ?? key),
}));
vi.mock('@/lib/logger', () => ({ logger: { error: vi.fn() } }));

describe('Login route error boundary', () => {
  it('shows safe retry UI and invokes reset without exposing error details', async () => {
    const user = userEvent.setup();
    render(<ErrorPage error={new Error('secret internal error')} reset={resetMock} />);
    expect(screen.getByTestId('auth-login-route-error')).toHaveTextContent('Login Is Temporarily Unavailable');
    expect(screen.getByTestId('auth-login-route-error')).not.toHaveTextContent('secret internal error');
    await user.click(screen.getByTestId('auth-login-route-error-retry'));
    expect(resetMock).toHaveBeenCalledTimes(1);
  });
});
