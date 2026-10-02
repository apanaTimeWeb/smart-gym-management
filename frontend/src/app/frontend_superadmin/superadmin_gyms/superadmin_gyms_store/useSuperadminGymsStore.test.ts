import { renderHook, act } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { useSuperadminGymsStore } from '@/app/frontend_superadmin/superadmin_gyms/superadmin_gyms_store/useSuperadminGymsStore';

import type { Tenant } from '@/app/frontend_superadmin/superadmin_gyms/superadmin_gyms_types/SuperadminGymsTypes';



describe('useSuperadminGymsStore', () => {
  it('switches view mode and manages the edit/delete modal context', () => {
    const { result } = renderHook(() => useSuperadminGymsStore());
    const gym = { id: 'gym-1', name: 'Alpha Gym' } as Tenant;
    act(() => result.current.setViewMode('grid'));
    expect(result.current.viewMode).toBe('grid');
    act(() => result.current.openEditModal(gym));
    expect(result.current.isEditModalOpen).toBe(true);
    expect(result.current.selectedGym).toBe(gym);
    act(() => result.current.openDeleteModal(gym));
    expect(result.current.isDeleteModalOpen).toBe(true);
    expect(result.current.gymToDelete).toBe(gym);
  });
});
