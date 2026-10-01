import { render, screen } from '@testing-library/react';

import { describe, expect, it } from 'vitest';

import AuthLoginLoadingFormSkeleton from '@/app/frontend_auth/auth/login/auth_login_components/auth_login_loading_skeleton/AuthLoginLoadingFormSkeleton';



describe('AuthLoginLoadingFormSkeleton', () => {
  it('renders the form placeholder boundary', () => {
    render(<AuthLoginLoadingFormSkeleton />);
    expect(screen.getByTestId('auth_login-loading_form-skeleton')).toBeInTheDocument();
  });
});
