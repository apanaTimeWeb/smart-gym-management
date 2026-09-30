import { renderHook, act } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';
import type { ReactNode } from 'react';
import { describe, expect, it, vi } from 'vitest';
import enMessages from '@/app/frontend_public/landing/_locales/en.json';
import { PublicLandingUrlConfig } from '@/app/frontend_public/landing/landing_url_config';
import { usePublicLandingNewsletter } from '@/app/frontend_public/landing/landing_components/PublicLandingFooter/usePublicLandingNewsletter';

const wrapper = ({ children }: { children: ReactNode }) => <NextIntlClientProvider locale="en" messages={enMessages}>{children}</NextIntlClientProvider>;

describe('usePublicLandingNewsletter', () => {
  it('builds the centralized mail destination for valid input', () => {
    const location = vi.spyOn(window.location, 'assign').mockImplementation(() => undefined);
    const { result } = renderHook(() => usePublicLandingNewsletter(), { wrapper });
    act(() => result.current.setEmail('member@example.org'));
    const event = { preventDefault: () => undefined } as never;
    act(() => result.current.handleSubmit(event));
    expect(result.current.mailtoHref).toContain(PublicLandingUrlConfig.EXTERNAL.EMAIL);
    location.mockRestore();
  });

  it('returns a localized validation key for invalid input', () => {
    const { result } = renderHook(() => usePublicLandingNewsletter(), { wrapper });
    act(() => result.current.setEmail('bad'));
    act(() => result.current.handleSubmit({ preventDefault: () => undefined } as never));
    expect(result.current.errorMessage).toBe('validation.email');
  });
});
