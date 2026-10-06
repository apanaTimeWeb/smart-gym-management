import { renderHook, act } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { useAdminProfilePasswordVisibility } from '@/app/frontend_admin/admin_profile/admin_profile_hooks/useAdminProfilePasswordVisibility';

describe('useAdminProfilePasswordVisibility', () => {
  it('toggles each field independently', () => {
    const { result } = renderHook(() => useAdminProfilePasswordVisibility());
    act(() => result.current.toggleNew());
    expect(result.current.showNew).toBe(true);
    expect(result.current.showCurrent).toBe(false);
    expect(result.current.showConfirm).toBe(false);
  });
});
