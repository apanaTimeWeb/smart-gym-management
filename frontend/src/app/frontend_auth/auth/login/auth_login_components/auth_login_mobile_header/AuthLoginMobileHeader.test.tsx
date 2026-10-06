import { render, screen } from '@testing-library/react';

import { describe, expect, it, vi } from 'vitest';

import AuthLoginMobileHeader from '@/app/frontend_auth/auth/login/auth_login_components/auth_login_mobile_header/AuthLoginMobileHeader';



vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
}));

vi.mock('next/image', () => ({
  default: ({ alt }: { src: string; alt?: string }) => <span role="img" aria-label={alt ?? ''} />,
}));

describe('AuthLoginMobileHeader', () => {
  it('renders the mobile brand identity without owning authentication behavior', () => {
    render(<AuthLoginMobileHeader />);
    expect(screen.getByText('BRAND')).toBeInTheDocument();
    expect(screen.getByAltText('BRAND')).toBeInTheDocument();
  });
});
