import { describe, expect, it, vi } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useAdminBranchesDetailDrawerKeyboard } from '@/app/frontend_admin/admin_branches/admin_branches_components/admin_branches_detail_drawer/useAdminBranchesDetailDrawerKeyboard';

describe('useAdminBranchesDetailDrawerKeyboard', () => {
  it('closes the detail drawer when Escape is pressed while enabled', () => {
    const closeDetail = vi.fn();
    renderHook(() => useAdminBranchesDetailDrawerKeyboard(true, closeDetail));
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    expect(closeDetail).toHaveBeenCalledTimes(1);
  });

  it('does not attach an Escape handler while disabled', () => {
    const closeDetail = vi.fn();
    const { unmount } = renderHook(() => useAdminBranchesDetailDrawerKeyboard(false, closeDetail));
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    expect(closeDetail).not.toHaveBeenCalled();
    unmount();
  });
});
