import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import AuthLoginLoadingSkeleton from '@/app/frontend_auth/auth/login/auth_login_components/AuthLoginLoadingSkeleton/AuthLoginLoadingSkeleton';

describe('AuthLoginLoadingSkeleton', () => {
  it('renders a structural skeleton with motion-safe highlight layers', () => {
    render(<AuthLoginLoadingSkeleton />);

    expect(screen.getByTestId('auth-login-loading-skeleton')).toBeInTheDocument();
    const highlights = document.querySelectorAll('[data-testid="auth-login-loading-skeleton"] .bg-skeleton-highlight');

    expect(highlights.length).toBeGreaterThan(0);
    for (const highlight of highlights) {
      expect(highlight.className).toContain('motion-safe:animate-pulse');
    }
  });
});
