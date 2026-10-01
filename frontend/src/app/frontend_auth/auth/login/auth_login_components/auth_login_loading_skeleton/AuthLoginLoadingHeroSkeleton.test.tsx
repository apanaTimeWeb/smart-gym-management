import { render, screen } from '@testing-library/react';

import { describe, expect, it } from 'vitest';

import AuthLoginLoadingHeroSkeleton from '@/app/frontend_auth/auth/login/auth_login_components/auth_login_loading_skeleton/AuthLoginLoadingHeroSkeleton';



describe('AuthLoginLoadingHeroSkeleton', () => {
  it('renders the desktop hero placeholder boundary', () => {
    render(<AuthLoginLoadingHeroSkeleton />);
    expect(screen.getByTestId('auth_login-loading_hero-skeleton')).toBeInTheDocument();
  });
});
