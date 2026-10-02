import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { ticketsApi } from '@/app/frontend_superadmin/superadmin_tickets/superadmin_tickets_api/SuperadminTicketsApiCrudApi';
import { useSuperadminTicketsTicketMutations } from '@/app/frontend_superadmin/superadmin_tickets/superadmin_tickets_hooks/useSuperadminTicketsTicketMutations';

import type { ReactNode } from 'react';



vi.mock('@/app/frontend_superadmin/superadmin_tickets/superadmin_tickets_api/SuperadminTicketsApiCrudApi', () => ({ ticketsApi: { closeTicket: vi.fn(), assignTicket: vi.fn() } }));

describe('useSuperadminTicketsTicketMutations', () => {
  it('closes a ticket through the API with a stable idempotency key', async () => {
    vi.mocked(ticketsApi.closeTicket).mockResolvedValue({ success: true, message: 'Closed', data: { id: 'ticket-1' } } as never);
    const client = new QueryClient({ defaultOptions: { mutations: { retry: false } } });
    const wrapper = ({ children }: { children: ReactNode }) => <QueryClientProvider client={client}>{children}</QueryClientProvider>;
    const { result } = renderHook(() => useSuperadminTicketsTicketMutations(), { wrapper });
    await result.current.closeTicket('ticket-1');
    expect(ticketsApi.closeTicket).toHaveBeenCalledWith('ticket-1', expect.any(String));
    expect(result.current.isClosing).toBe(false);
  });
});
