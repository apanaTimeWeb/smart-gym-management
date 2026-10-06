import { renderHook } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { AdminLayoutDensityContext } from '@/app/frontend_admin/admin_layout/admin_layout_shell/AdminLayoutDensityContext';
import { useAdminLayoutDensity } from '@/app/frontend_admin/admin_layout/admin_layout_shell/useAdminLayoutDensity';

const value = {
  density: 'comfortable' as const,
  setDensity: () => undefined,
  toggleDensity: () => undefined,
};

describe('useAdminLayoutDensity', () => {
  it('returns the density context value for shell consumers', () => {
    const { result } = renderHook(() => useAdminLayoutDensity(), {
      wrapper: ({ children }) => (
        <AdminLayoutDensityContext.Provider value={value}>
          {children}
        </AdminLayoutDensityContext.Provider>
      ),
    });

    expect(result.current).toBe(value);
  });

  it('throws when rendered outside the provider', () => {
    const hook = renderHook(() => useAdminLayoutDensity());
    expect(hook.result.error).toBeInstanceOf(Error);
    expect(hook.result.error?.message).toContain('useAdminLayoutDensity must be used inside AdminLayoutDensityProvider');
  });
});
