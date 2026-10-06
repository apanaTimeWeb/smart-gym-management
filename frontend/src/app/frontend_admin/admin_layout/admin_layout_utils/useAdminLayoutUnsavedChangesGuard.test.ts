import { describe, expect, it, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useAdminLayoutUnsavedChangesGuard } from '@/app/frontend_admin/admin_layout/admin_layout_utils/useAdminLayoutUnsavedChangesGuard';

const push = vi.fn();
const confirm = vi.fn();

vi.mock('next/navigation', () => ({
  useRouter: () => ({ push }),
  usePathname: () => '/admin/settings',
}));
vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
}));
vi.mock('@/app/frontend_admin/admin_layout/admin_layout_feedback/useAdminLayoutConfirm', () => ({
  useAdminLayoutConfirm: () => ({ confirm }),
}));

describe('useAdminLayoutUnsavedChangesGuard', () => {
  beforeEach(() => {
    push.mockReset();
    confirm.mockReset();
  });

  it('allows clean forms to discard without prompting', async () => {
    const { result } = renderHook(() => useAdminLayoutUnsavedChangesGuard(false));
    await expect(result.current.confirmDiscardIfDirty()).resolves.toBe(true);
    expect(confirm).not.toHaveBeenCalled();
  });

  it('uses the module confirmation service for dirty-form discard', async () => {
    confirm.mockResolvedValue(true);
    const { result } = renderHook(() => useAdminLayoutUnsavedChangesGuard(true));
    await act(async () => {
      await expect(result.current.confirmDiscardIfDirty()).resolves.toBe(true);
    });
    expect(confirm).toHaveBeenCalledWith(expect.objectContaining({ type: 'warning' }));
  });
});
