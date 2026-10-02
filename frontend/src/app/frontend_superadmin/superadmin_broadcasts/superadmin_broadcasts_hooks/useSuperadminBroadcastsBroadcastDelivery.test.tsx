import { createElement } from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, act, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { deliverBroadcastToRecipient } from '@/app/frontend_superadmin/superadmin_broadcasts/superadmin_broadcasts_api/SuperadminBroadcastsApi';
import { useSuperadminBroadcastsBroadcastDelivery } from '@/app/frontend_superadmin/superadmin_broadcasts/superadmin_broadcasts_hooks/useSuperadminBroadcastsBroadcastDelivery';

import type { ReactNode } from 'react';



vi.mock('@/app/frontend_superadmin/superadmin_broadcasts/superadmin_broadcasts_api/SuperadminBroadcastsApi', () => ({ deliverBroadcastToRecipient: vi.fn() }));

describe('useSuperadminBroadcastsBroadcastDelivery', () => {
  it('delivers one recipient using the supplied idempotency key and returns the authoritative response', async () => {
    const response = { success: true, message: 'Delivered', data: { recipientId: 'r-1' } };
    vi.mocked(deliverBroadcastToRecipient).mockResolvedValue(response as never);
    const client = new QueryClient({ defaultOptions: { mutations: { retry: false } } });
    const wrapper = ({ children }: { children: ReactNode }) => createElement(QueryClientProvider, { client }, children);
    const { result } = renderHook(() => useSuperadminBroadcastsBroadcastDelivery(), { wrapper });
    let output: unknown;
    await act(async () => { output = await result.current.deliverRecipient({ broadcastId: 'b-1', recipientId: 'r-1', idempotencyKey: 'intent-1' }); });
    await waitFor(() => expect(deliverBroadcastToRecipient).toHaveBeenCalledWith('b-1', 'r-1', 'intent-1'));
    expect(output).toEqual(response);
  });
});
