import { createElement } from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { ticketsApi } from '@/app/frontend_superadmin/superadmin_tickets/superadmin_tickets_api/SuperadminTicketsApiCrudApi';
import { useSuperadminTickets } from '@/app/frontend_superadmin/superadmin_tickets/superadmin_tickets_hooks/useSuperadminTickets';

import type { ReactNode } from 'react';



let params: Record<string, string> = {};
vi.mock('@/hooks/useUrlState', () => ({ useUrlState: () => ({ getParam: (key: string, fallback: string) => params[key] ?? fallback, setParam: vi.fn() }) }));
vi.mock('@/hooks/useDebouncedValue', () => ({ useDebouncedValue: (value: string) => value }));
vi.mock('@/app/frontend_superadmin/superadmin_tickets/superadmin_tickets_store/useSuperadminTicketsStore', () => ({ useSuperadminTicketsStore: (selector: (state: { search: string; statusFilter: string; priorityFilter: string; currentPage: number }) => unknown) => selector({ search: '', statusFilter: 'ALL', priorityFilter: 'ALL', currentPage: 1 }) }));
vi.mock('@/app/frontend_superadmin/superadmin_tickets/superadmin_tickets_api/SuperadminTicketsApiCrudApi', () => ({ ticketsApi: { fetchTickets: vi.fn() } }));

describe('useSuperadminTickets', () => {
  beforeEach(() => { params = {}; });
  it('propagates list query state to the ticket API and exposes paginated results', async () => {
    vi.mocked(ticketsApi.fetchTickets).mockResolvedValue({ success: true, message: 'Loaded', data: [{ id: 't-1' }], meta: { total: 1 } } as never);
    const client = new QueryClient({ defaultOptions: { queries: { retry: false } } });
    const wrapper = ({ children }: { children: ReactNode }) => createElement(QueryClientProvider, { client }, children);
    const { result } = renderHook(() => useSuperadminTickets(), { wrapper });
    await waitFor(() => expect(result.current.isPending).toBe(false));
    expect(ticketsApi.fetchTickets).toHaveBeenCalledWith({ page: '1', limit: '10' });
    expect(result.current.paginatedTickets).toHaveLength(1);
    expect(result.current.totalPages).toBe(1);
  });
});
