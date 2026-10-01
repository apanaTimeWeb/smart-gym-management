import { render, screen } from '@testing-library/react';

import userEvent from '@testing-library/user-event';

import { describe, expect, it, vi } from 'vitest';

import AuthLoginRouteError from '@/app/frontend_auth/auth/login/error';



vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => ({
    'ROUTE_ERROR.TITLE': 'Login Route Failed',
    'ROUTE_ERROR.DESCRIPTION': 'The login route could not be loaded safely. Try again.',
    'ROUTE_ERROR.RETRY': 'Try Again',
  }[key] ?? key),
}));

vi.mock('@/lib/logger', () => ({ logger: { error: vi.fn() } }));

describe('AuthLoginRouteError', () => {
  it('invokes the framework reset action from the observable retry control', async () => {
    const user = userEvent.setup();
    const reset = vi.fn();
    const error = new Error('internal route detail');

    render(<AuthLoginRouteError error={error} reset={reset} />);

    expect(screen.getByTestId('auth_login-route_error-root')).toBeInTheDocument();
    expect(screen.getByTestId('auth_login-route_error-root')).not.toHaveTextContent('internal route detail');
    await user.click(screen.getByTestId('auth_login-route_error-retry'));
    expect(reset).toHaveBeenCalledTimes(1);
  });
});
