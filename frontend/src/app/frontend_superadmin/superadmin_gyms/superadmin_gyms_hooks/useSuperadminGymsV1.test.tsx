import { fetchGymsBusinessControls } from '@/app/frontend_superadmin/superadmin_gyms/superadmin_gyms_api/SuperadminGymsBusinessControlsApi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { useSuperadminGymsV1 } from '@/app/frontend_superadmin/superadmin_gyms/superadmin_gyms_hooks/useSuperadminGymsV1';

import type { ReactNode } from 'react';


vi.mock('@/app/frontend_superadmin/superadmin_gyms/superadmin_gyms_api/SuperadminGymsBusinessControlsApi', () => ({ fetchGymsBusinessControls: vi.fn() }));
describe('useSuperadminGymsV1', () => {
  it('executes the hook query contract and reaches a successful query state', async () => {
    vi.mocked(fetchGymsBusinessControls).mockResolvedValue({ success: true, message: 'ok', data: [] } as never);
    const client = new QueryClient({ defaultOptions: { queries: { retry: false }, mutations: { retry: false } } });
    const wrapper = ({ children }: { children: ReactNode }) => <QueryClientProvider client={client}>{children}</QueryClientProvider>;
    const { result } = renderHook(() => useSuperadminGymsV1(), { wrapper });
    await waitFor(() => expect(result.current.status).toBe('success'));
    expect(result.current.isError).toBe(false);
  });
});
