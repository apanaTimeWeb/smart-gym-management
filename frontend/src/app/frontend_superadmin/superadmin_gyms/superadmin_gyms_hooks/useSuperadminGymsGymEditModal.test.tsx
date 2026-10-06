import { gymsApi } from '@/app/frontend_superadmin/superadmin_gyms/superadmin_gyms_api/SuperadminGymsApi';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { useSuperadminGymsGymEditModal } from '@/app/frontend_superadmin/superadmin_gyms/superadmin_gyms_hooks/useSuperadminGymsGymEditModal';

import type { ReactNode } from 'react';


vi.mock('@/app/frontend_superadmin/superadmin_gyms/superadmin_gyms_api/SuperadminGymsApi', () => ({ gymsApi: vi.fn() })); vi.mock('next-intl', () => ({ useTranslations: () => (key: string) => key }));
describe('useSuperadminGymsGymEditModal', () => {
  it('executes the hook query contract and reaches a successful query state', async () => {
    vi.mocked(gymsApi).mockResolvedValue({ success: true, message: 'ok', data: [] } as never);
    const client = new QueryClient({ defaultOptions: { queries: { retry: false }, mutations: { retry: false } } });
    const wrapper = ({ children }: { children: ReactNode }) => <QueryClientProvider client={client}>{children}</QueryClientProvider>;
    const { result } = renderHook(() => useSuperadminGymsGymEditModal(), { wrapper });
    await waitFor(() => expect(result.current.status).toBe('success'));
    expect(result.current.isError).toBe(false);
  });
});
