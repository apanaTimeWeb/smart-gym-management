import { renderHook, act } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { usePublicLandingNavbar } from '@/app/frontend_public/landing/landing_components/PublicLandingNavbar/usePublicLandingNavbar';

describe('usePublicLandingNavbar', () => {
  it('opens and closes the mobile menu through the returned controller actions', () => {
    const { result } = renderHook(() => usePublicLandingNavbar());
    act(() => result.current.handleToggleMenu());
    expect(result.current.menuOpen).toBe(true);
    act(() => result.current.handleCloseMenu());
    expect(result.current.menuOpen).toBe(false);
  });

  it('reacts to the documented scroll threshold', () => {
    const { result } = renderHook(() => usePublicLandingNavbar());
    Object.defineProperty(window, 'scrollY', { configurable: true, value: 60 });
    act(() => window.dispatchEvent(new Event('scroll')));
    expect(result.current.scrolled).toBe(true);
  });
});
