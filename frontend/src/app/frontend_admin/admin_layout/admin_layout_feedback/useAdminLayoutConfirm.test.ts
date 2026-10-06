import { describe, expect, it, vi } from 'vitest';
import { createElement, type ReactNode } from 'react';
import { renderHook } from '@testing-library/react';
import { useAdminLayoutConfirm } from '@/app/frontend_admin/admin_layout/admin_layout_feedback/useAdminLayoutConfirm';
import { ConfirmContext } from '@/app/frontend_admin/admin_layout/admin_layout_feedback/AdminLayoutConfirmProvider';

describe('useAdminLayoutConfirm', () => {
  it('returns the module confirmation service from its provider', () => {
    const confirm = vi.fn();
    const wrapper = ({ children }: { children: ReactNode }) => createElement(
      ConfirmContext.Provider,
      { value: { confirm } as never },
      children,
    );
    const { result } = renderHook(() => useAdminLayoutConfirm(), { wrapper });
    expect(result.current.confirm).toBe(confirm);
  });

  it('fails loudly when used without the provider', () => {
    expect(() => renderHook(() => useAdminLayoutConfirm())).toThrow('Admin confirmation provider is required.');
  });
});
