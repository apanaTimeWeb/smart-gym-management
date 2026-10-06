import { featuresApi } from '@/app/frontend_superadmin/superadmin_features/superadmin_features_api/SuperadminFeaturesApi';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { useSuperadminFeaturesFeatureRolloutData } from '@/app/frontend_superadmin/superadmin_features/superadmin_features_hooks/useSuperadminFeaturesFeatureRolloutData';

import type { ReactNode } from 'react';


vi.mock('@/app/frontend_superadmin/superadmin_features/superadmin_features_api/SuperadminFeaturesApi', () => ({ featuresApi: vi.fn() }));
describe('useSuperadminFeaturesFeatureRolloutData', () => {
  it('executes the hook query contract and reaches a successful query state', async () => {
    vi.mocked(featuresApi).mockResolvedValue({ success: true, message: 'ok', data: [] } as never);
    const client = new QueryClient({ defaultOptions: { queries: { retry: false }, mutations: { retry: false } } });
    const wrapper = ({ children }: { children: ReactNode }) => <QueryClientProvider client={client}>{children}</QueryClientProvider>;
    const { result } = renderHook(() => useSuperadminFeaturesFeatureRolloutData(), { wrapper });
    await waitFor(() => expect(result.current.status).toBe('success'));
    expect(result.current.isError).toBe(false);
  });
});
