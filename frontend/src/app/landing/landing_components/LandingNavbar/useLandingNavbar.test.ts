import { renderHook, act } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { useLandingNavbar } from '@/app/landing/landing_components/LandingNavbar/useLandingNavbar';

describe('useLandingNavbar', () => {
  it('opens and closes the mobile menu without global shared state', () => {
    const { result } = renderHook(() => useLandingNavbar());

    act(() => result.current.toggleMenu());
    expect(result.current.menuOpen).toBe(true);

    act(() => result.current.closeMenu());
    expect(result.current.menuOpen).toBe(false);
  });

  it('reacts to scrolling with the documented threshold', () => {
    const { result } = renderHook(() => useLandingNavbar());
    Object.defineProperty(window, 'scrollY', { configurable: true, value: 60 });
    act(() => window.dispatchEvent(new Event('scroll')));
    expect(result.current.scrolled).toBe(true);
  });
});
