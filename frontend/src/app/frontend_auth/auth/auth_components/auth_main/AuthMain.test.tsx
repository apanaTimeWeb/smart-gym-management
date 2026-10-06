import { render, screen } from '@testing-library/react';

import { describe, expect, it, vi } from 'vitest';

import AuthMain from '@/app/frontend_auth/auth/auth_components/auth_main/AuthMain';



vi.mock('@/app/frontend_auth/auth/login/auth_login_components/auth_login_main/AuthLoginMain', () => ({
  default: () => <div data-testid="auth-main-login">Login surface</div>,
}));

describe('AuthMain', () => {
  it('delegates to the Login sub-feature boundary', () => {
    render(<AuthMain />);

    expect(screen.getByTestId('auth-main-login')).toBeInTheDocument();
  });
});
