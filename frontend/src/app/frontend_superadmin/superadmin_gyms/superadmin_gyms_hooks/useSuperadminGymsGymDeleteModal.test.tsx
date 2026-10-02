import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { act, renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { gymsApi } from '@/app/frontend_superadmin/superadmin_gyms/superadmin_gyms_api/SuperadminGymsApi';
import { useSuperadminGymsGymDeleteModal } from '@/app/frontend_superadmin/superadmin_gyms/superadmin_gyms_hooks/useSuperadminGymsGymDeleteModal';
import { useSuperadminGymsStore } from '@/app/frontend_superadmin/superadmin_gyms/superadmin_gyms_store/useSuperadminGymsStore';

import type { ReactNode } from 'react';



vi.mock('@/app/frontend_superadmin/superadmin_gyms/superadmin_gyms_api/SuperadminGymsApi', () => ({ gymsApi: { deleteGym: vi.fn() } }));
vi.mock('sonner', () => ({ toast: { success: vi.fn(), error: vi.fn() } }));

describe('useSuperadminGymsGymDeleteModal', () => {
  it('requires the exact DELETE confirmation before calling the delete API', async () => {
    vi.mocked(gymsApi.deleteGym).mockResolvedValue({ success: true, message: 'Deleted', data: null } as never);
    const client = new QueryClient({ defaultOptions: { mutations: { retry: false } } });
    const wrapper = ({ children }: { children: ReactNode }) => <QueryClientProvider client={client}>{children}</QueryClientProvider>;
    useSuperadminGymsStore.getState().openDeleteModal?.({ id: 'gym-1', name: 'Gym Alpha' } as never);
    const { result } = renderHook(() => useSuperadminGymsGymDeleteModal(), { wrapper });
    act(() => result.current.setConfirmText('NOPE'));
    act(() => result.current.handleConfirmDelete());
    expect(gymsApi.deleteGym).not.toHaveBeenCalled();
    act(() => result.current.setConfirmText('DELETE'));
    act(() => result.current.handleConfirmDelete());
    expect(gymsApi.deleteGym).toHaveBeenCalledWith('gym-1', expect.any(String));
  });
});
