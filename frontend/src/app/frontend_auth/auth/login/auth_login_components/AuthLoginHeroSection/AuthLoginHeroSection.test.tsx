import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import AuthLoginHeroSection from '@/app/frontend_auth/auth/login/auth_login_components/AuthLoginHeroSection/AuthLoginHeroSection';

vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
}));

vi.mock('next/image', () => ({
  default: ({ src, alt }: { src: string; alt?: string }) => <img src={src} alt={alt ?? ''} />,
}));

describe('AuthLoginHeroSection', () => {
  it('renders the documented desktop brand, feature list, statistics, and secure indicator', () => {
    render(<AuthLoginHeroSection />);
    expect(screen.getByText('BRAND')).toBeInTheDocument();
    expect(screen.getByText('500+')).toBeInTheDocument();
    expect(screen.getByText('2L+')).toBeInTheDocument();
    expect(screen.getByText('99.9%')).toBeInTheDocument();
    expect(screen.getByText('SECURE_BADGE')).toBeInTheDocument();
  });
});
