import { act, renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { useAdminProfileUnsavedChangesGuard } from '@/app/frontend_admin/admin_profile/admin_profile_hooks/useAdminProfileUnsavedChangesGuard';

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

describe('useAdminProfileUnsavedChangesGuard', () => {
  it('allows discard immediately when the form is not dirty', async () => {
    const { result } = renderHook(() => useAdminProfileUnsavedChangesGuard(false));
    await expect(result.current.confirmDiscardIfDirty()).resolves.toBe(true);
    expect(confirm).not.toHaveBeenCalled();
  });

  it('delegates dirty-form discard to the shell confirmation contract', async () => {
    confirm.mockResolvedValueOnce(false);
    const { result } = renderHook(() => useAdminProfileUnsavedChangesGuard(true));
    await act(async () => {
      await expect(result.current.confirmDiscardIfDirty()).resolves.toBe(false);
    });
    expect(confirm).toHaveBeenCalledTimes(1);
    expect(push).not.toHaveBeenCalled();
  });
});
