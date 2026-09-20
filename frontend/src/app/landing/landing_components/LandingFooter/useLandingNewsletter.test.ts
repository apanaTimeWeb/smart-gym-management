import { renderHook, act } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { useLandingNewsletter } from '@/app/landing/landing_components/LandingFooter/useLandingNewsletter';

describe('useLandingNewsletter', () => {
  it('builds a mail-client destination from a valid email', () => {
    const { result } = renderHook(() => useLandingNewsletter());

    act(() => result.current.setEmail('member@example.com'));

    expect(result.current.mailtoHref).toContain('mailto:hello@gymsmart.com');
    expect(result.current.mailtoHref).toContain('member%40example.com');
    expect(result.current.errorMessage).toBe('');
  });
});
