import { act, renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { useAdminPlansUnsavedChangesGuard } from '@/app/frontend_admin/admin_plans/admin_plans_hooks/useAdminPlansUnsavedChangesGuard';

const confirm = vi.fn();
const push = vi.fn();
vi.mock('next/navigation', () => ({
  useRouter: () => ({ push }),
  usePathname: () => '/admin/current',
}));
vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
}));
vi.mock('@/app/frontend_admin/admin_layout/admin_layout_feedback/useAdminLayoutConfirm', () => ({
  useAdminLayoutConfirm: () => ({ confirm }),
}));

describe('useAdminPlansUnsavedChangesGuard', () => {
  it('allows discard immediately when the form is not dirty', async () => {
    const { result } = renderHook(() => useAdminPlansUnsavedChangesGuard(false));
    await expect(result.current.confirmDiscardIfDirty()).resolves.toBe(true);
    expect(confirm).not.toHaveBeenCalled();
  });

  it('delegates dirty-form discard to the shell confirmation contract', async () => {
    confirm.mockResolvedValueOnce(false);
    const { result } = renderHook(() => useAdminPlansUnsavedChangesGuard(true));
    await act(async () => {
      await expect(result.current.confirmDiscardIfDirty()).resolves.toBe(false);
    });
    expect(confirm).toHaveBeenCalledTimes(1);
    expect(push).not.toHaveBeenCalled();
  });
});
