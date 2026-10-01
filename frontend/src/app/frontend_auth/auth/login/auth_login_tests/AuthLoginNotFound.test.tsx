import { render, screen } from '@testing-library/react';

import { describe, expect, it, vi } from 'vitest';

import { AuthUrlConfig } from '@/app/frontend_auth/auth/auth_url_config';

import LoginNotFound from '@/app/frontend_auth/auth/login/not-found';

import type { ReactNode } from 'react';



vi.mock('next-intl/server', () => ({
  getTranslations: vi.fn(async () => (key: string) => ({
    'NOT_FOUND.TITLE': 'Page not found',
    'NOT_FOUND.DESCRIPTION': 'The requested Login page is not available.',
    'NOT_FOUND.BACK_TO_HOME': 'Back to Home',
  }[key] ?? key)),
}));

vi.mock('next/link', () => ({
  default: ({ href, children }: { href: string; children: ReactNode }) => <a href={href}>{children}</a>,
}));

describe('LoginNotFound', () => {
  it('renders safe recovery without exposing technical details', async () => {
    render(await LoginNotFound());

    expect(screen.getByTestId('auth_login-not_found-root')).toBeInTheDocument();
    expect(screen.getByTestId('auth_login-not_found-back_home')).toHaveAttribute('href', AuthUrlConfig.PAGES.LANDING);
    expect(screen.getByText('Page not found')).toBeInTheDocument();
    expect(screen.queryByText(/stack|digest|error/i)).not.toBeInTheDocument();
  });
});
