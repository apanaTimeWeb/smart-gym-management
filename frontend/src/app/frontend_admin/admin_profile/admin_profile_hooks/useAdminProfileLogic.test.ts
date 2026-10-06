import { describe, expect, it, vi } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useQuery } from '@tanstack/react-query';
import { useAdminProfileLogic } from '@/app/frontend_admin/admin_profile/admin_profile_hooks/useAdminProfileLogic';

vi.mock('@tanstack/react-query', () => ({ useQuery: vi.fn() }));
vi.mock('next-intl', () => ({ useTranslations: () => (key: string) => key }));
vi.mock('@/app/frontend_admin/admin_profile/admin_profile_hooks/useAdminProfileUnsavedChangesGuard', () => ({ useAdminProfileUnsavedChangesGuard: vi.fn() }));
vi.mock('@/app/frontend_admin/admin_profile/admin_profile_hooks/useAdminProfileMutations', () => ({ useAdminProfileMutations: () => ({ profileMutation: { isPending: false }, passwordMutation: { isPending: false }, updateProfile: vi.fn(), updatePassword: vi.fn() }) }));

describe('useAdminProfileLogic', () => {
  it('hydrates the profile form and derives the displayed initial from server data', () => {
    vi.mocked(useQuery).mockReturnValue({ data: { data: { name: 'Riya Singh', phone: '9876543210' } }, status: 'success', isPending: false } as never);
    const { result } = renderHook(() => useAdminProfileLogic());
    expect(result.current.profile).toEqual({ name: 'Riya Singh', phone: '9876543210' });
    expect(result.current.displayInitial).toBe('R');
    expect(result.current.activeTab).toBe('personal');
  });
});
