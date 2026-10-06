import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { SuperadminWhiteLabelingApi } from '@/app/frontend_superadmin/superadmin_white_labeling/superadmin_white_labeling_api/SuperadminWhiteLabelingApi';
import { useSuperadminWhiteLabelingDomains } from '@/app/frontend_superadmin/superadmin_white_labeling/superadmin_white_labeling_hooks/useSuperadminWhiteLabelingDomains';

import type { ReactNode } from 'react';



vi.mock('@/app/frontend_superadmin/superadmin_white_labeling/superadmin_white_labeling_api/SuperadminWhiteLabelingApi', () => ({ SuperadminWhiteLabelingApi: { getDomains: vi.fn(), updateDomainStatus: vi.fn() } }));

describe('useSuperadminWhiteLabelingDomains', () => {
  it('delivers the domain response through the feature Query key boundary', async () => {
    vi.mocked(SuperadminWhiteLabelingApi.getDomains).mockResolvedValue({ success: true, message: 'Loaded', data: [{ id: 'domain-1', domain: 'example.com' }] } as never);
    const client = new QueryClient({ defaultOptions: { queries: { retry: false } } });
    const wrapper = ({ children }: { children: ReactNode }) => <QueryClientProvider client={client}>{children}</QueryClientProvider>;
    const { result } = renderHook(() => useSuperadminWhiteLabelingDomains({ search: '', status: 'all' }), { wrapper });
    await waitFor(() => expect(result.current.data?.data).toEqual([{ id: 'domain-1', domain: 'example.com' }]));
    expect(SuperadminWhiteLabelingApi.getDomains).toHaveBeenCalledWith({ search: '', status: 'all' });
  });
});
