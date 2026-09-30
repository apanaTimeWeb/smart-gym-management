import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import AuthLoginMobileHeader from '@/app/frontend_auth/auth/login/auth_login_components/AuthLoginMobileHeader/AuthLoginMobileHeader';

vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
}));

vi.mock('next/image', () => ({
  default: ({ src, alt }: { src: string; alt?: string }) => <img src={src} alt={alt ?? ''} />,
}));

describe('AuthLoginMobileHeader', () => {
  it('renders the mobile brand identity without owning authentication behavior', () => {
    render(<AuthLoginMobileHeader />);
    expect(screen.getByText('BRAND')).toBeInTheDocument();
    expect(screen.getByAltText('BRAND')).toBeInTheDocument();
  });
});
