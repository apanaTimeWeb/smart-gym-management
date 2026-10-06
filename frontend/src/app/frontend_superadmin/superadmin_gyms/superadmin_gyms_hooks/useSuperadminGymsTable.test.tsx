import { createElement } from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, waitFor, act } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { gymsApi } from '@/app/frontend_superadmin/superadmin_gyms/superadmin_gyms_api/SuperadminGymsApi';
import { useSuperadminGymsTable } from '@/app/frontend_superadmin/superadmin_gyms/superadmin_gyms_hooks/useSuperadminGymsTable';

import type { ReactNode } from 'react';



const setParam = vi.fn();
vi.mock('@/hooks/useUrlState', () => ({ useUrlState: () => ({ getParam: (_k: string, fallback: string) => fallback, setParam }) }));
vi.mock('next/navigation', () => ({ useRouter: () => ({ push: vi.fn() }) }));
vi.mock('@/app/frontend_superadmin/superadmin_gyms/superadmin_gyms_store/useSuperadminGymsStore', () => ({
  useSuperadminGymsStore: (selector: (state: { openDeleteModal: () => void; openWhatsappModal: () => void }) => unknown) => selector({ openDeleteModal: vi.fn(), openWhatsappModal: vi.fn() }),
}));
vi.mock('@/app/frontend_superadmin/superadmin_gyms/superadmin_gyms_hooks/useSuperadminGymsGymMutations', () => ({
  useSuperadminGymsGymMutations: () => ({ actionLoadingId: null, onGhostLoginClick: vi.fn(), onSuspendClick: vi.fn() }),
}));
vi.mock('@/app/frontend_superadmin/superadmin_gyms/superadmin_gyms_api/SuperadminGymsApi', () => ({ gymsApi: { fetchGyms: vi.fn() } }));

describe('useSuperadminGymsTable', () => {
  it('passes URL-backed pagination and sort parameters to the API and returns the response rows', async () => {
    vi.mocked(gymsApi.fetchGyms).mockResolvedValue({ success: true, message: 'Loaded', data: [{ id: 'gym-1', name: 'Gym Alpha' }], meta: { total: 1 } } as never);
    const client = new QueryClient({ defaultOptions: { queries: { retry: false } } });
    const wrapper = ({ children }: { children: ReactNode }) => createElement(QueryClientProvider, { client }, children);
    const { result } = renderHook(() => useSuperadminGymsTable(), { wrapper });
    await waitFor(() => expect(result.current.isPending).toBe(false));
    expect(gymsApi.fetchGyms).toHaveBeenCalledWith({ sortBy: 'createdAt', order: 'desc', page: '1', limit: '20' });
    expect(result.current.filteredGyms).toHaveLength(1);
    act(() => result.current.setCurrentPage(2));
    expect(setParam).toHaveBeenCalledWith('page', '2');
  });
});
