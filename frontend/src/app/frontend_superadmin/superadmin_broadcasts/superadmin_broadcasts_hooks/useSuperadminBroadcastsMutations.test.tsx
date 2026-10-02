import { createElement } from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, act, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { broadcastsApi } from '@/app/frontend_superadmin/superadmin_broadcasts/superadmin_broadcasts_api/SuperadminBroadcastsApi';
import { useSuperadminBroadcastsMutations } from '@/app/frontend_superadmin/superadmin_broadcasts/superadmin_broadcasts_hooks/useSuperadminBroadcastsMutations';

import type { ReactNode } from 'react';
import type { UseFormReturn } from 'react-hook-form';

import type { BroadcastFormData } from '@/app/frontend_superadmin/superadmin_broadcasts/superadmin_broadcasts_types/SuperadminBroadcastsTypes';



vi.mock('sonner', () => ({ toast: { success: vi.fn(), error: vi.fn() } }));
vi.mock('@/app/frontend_superadmin/superadmin_broadcasts/superadmin_broadcasts_api/SuperadminBroadcastsApi', () => ({ broadcastsApi: { createBroadcast: vi.fn(), updateBroadcast: vi.fn(), deleteBroadcast: vi.fn() } }));

describe('useSuperadminBroadcastsMutations', () => {
  it('closes the create form and invalidates broadcasts after a successful create', async () => {
    vi.mocked(broadcastsApi.createBroadcast).mockResolvedValue({ success: true, message: 'Created', data: { id: 'b-1', title: 'April', targetGymIds: [] } } as never);
    const form = { reset: vi.fn() } as unknown as UseFormReturn<BroadcastFormData>;
    const setIsModalOpen = vi.fn();
    const setEditingId = vi.fn();
    const setQueueRecipients = vi.fn();
    const setQueueBroadcastId = vi.fn();
    const setQueueTitle = vi.fn();
    const setQueueModalOpen = vi.fn();
    const client = new QueryClient({ defaultOptions: { mutations: { retry: false } } });
    const wrapper = ({ children }: { children: ReactNode }) => createElement(QueryClientProvider, { client }, children);
    const { result } = renderHook(() => useSuperadminBroadcastsMutations({ setIsModalOpen, setEditingId, form, gyms: [], setQueueRecipients, setQueueBroadcastId, setQueueTitle, setQueueModalOpen }), { wrapper });
    await act(async () => { await result.current.createMutation.mutateAsync({ data: { status: 'DRAFT', title: 'April' } as never, idempotencyKey: 'intent-1' }); });
    await waitFor(() => expect(broadcastsApi.createBroadcast).toHaveBeenCalledWith({ status: 'DRAFT', title: 'April' }, 'intent-1'));
    expect(setIsModalOpen).toHaveBeenCalledWith(false);
    expect(form.reset).toHaveBeenCalledTimes(1);
  });
});
