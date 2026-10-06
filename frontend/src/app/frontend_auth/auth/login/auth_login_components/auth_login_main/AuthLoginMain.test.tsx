import { render, screen } from '@testing-library/react';

import { describe, expect, it, vi } from 'vitest';

import AuthLoginMain from '@/app/frontend_auth/auth/login/auth_login_components/auth_login_main/AuthLoginMain';

import type { ReactNode } from 'react';



vi.mock('@/components/ThemeToggle', () => ({ default: () => <button type="button">theme</button> }));
vi.mock('@/app/frontend_auth/auth/login/auth_login_components/auth_login_error_boundary/AuthLoginErrorBoundary', () => ({ default: ({ children }: { children: ReactNode }) => <>{children}</> }));
vi.mock('@/app/frontend_auth/auth/login/auth_login_components/auth_login_hero_section/AuthLoginHeroSection', () => ({ default: () => <section data-testid="auth_login-main-hero-section">hero</section> }));
vi.mock('@/app/frontend_auth/auth/login/auth_login_components/auth_login_mobile_header/AuthLoginMobileHeader', () => ({ default: () => <div data-testid="auth_login-main-mobile-header">mobile</div> }));
vi.mock('@/app/frontend_auth/auth/login/auth_login_components/auth_login_form/AuthLoginForm', () => ({ default: () => <form data-testid="auth_login-main-form">form</form> }));


describe('AuthLoginMain', () => {
  it('composes the Login hero, mobile header, and form within the feature boundary', () => {
    render(<AuthLoginMain />);
    expect(screen.getByTestId('auth_login-main-hero-section')).toBeInTheDocument();
    expect(screen.getByTestId('auth_login-main-mobile-header')).toBeInTheDocument();
    expect(screen.getByTestId('auth_login-main-form')).toBeInTheDocument();
  });
});
