import { createElement } from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, act, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { replyToTicket } from '@/app/frontend_superadmin/superadmin_tickets/superadmin_tickets_api/SuperadminTicketsApiCrudApi';
import { useSuperadminTicketsTicketReply } from '@/app/frontend_superadmin/superadmin_tickets/superadmin_tickets_hooks/useSuperadminTicketsTicketReply';

import type { ReactNode } from 'react';



vi.mock('@/app/frontend_superadmin/superadmin_tickets/superadmin_tickets_api/SuperadminTicketsApiCrudApi', () => ({ replyToTicket: vi.fn() }));

describe('useSuperadminTicketsTicketReply', () => {
  it('validates reply data, sends the mutation, and reconciles ticket queries', async () => {
    vi.mocked(replyToTicket).mockResolvedValue({ success: true, message: 'Replied', data: { id: 'reply-1' } } as never);
    const client = new QueryClient({ defaultOptions: { mutations: { retry: false } } });
    const wrapper = ({ children }: { children: ReactNode }) => createElement(QueryClientProvider, { client }, children);
    const { result } = renderHook(() => useSuperadminTicketsTicketReply(), { wrapper });
    await act(async () => { await result.current.sendReply({ id: 'ticket-1', values: { replyText: 'Thanks for contacting support.' } } as never); });
    await waitFor(() => expect(replyToTicket).toHaveBeenCalledWith('ticket-1', 'Thanks for contacting support.', expect.any(String)));
  });
});
