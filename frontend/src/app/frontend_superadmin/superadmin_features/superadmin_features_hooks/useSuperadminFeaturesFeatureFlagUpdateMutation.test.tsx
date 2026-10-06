import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { featuresApi } from '@/app/frontend_superadmin/superadmin_features/superadmin_features_api/SuperadminFeaturesApi';
import { useSuperadminFeaturesFeatureFlagUpdateMutation } from '@/app/frontend_superadmin/superadmin_features/superadmin_features_hooks/useSuperadminFeaturesFeatureFlagUpdateMutation';

import type { ReactNode } from 'react';



vi.mock('@/app/frontend_superadmin/superadmin_features/superadmin_features_api/SuperadminFeaturesApi', () => ({ featuresApi: { updateFeatureFlag: vi.fn() } }));

describe('useSuperadminFeaturesFeatureFlagUpdateMutation', () => {
  it('updates the requested flag and passes the idempotency key to the API', async () => {
    vi.mocked(featuresApi.updateFeatureFlag).mockResolvedValue({ success: true, message: 'Updated', data: { id: 'flag-1' } } as never);
    const client = new QueryClient({ defaultOptions: { mutations: { retry: false } } });
    const wrapper = ({ children }: { children: ReactNode }) => <QueryClientProvider client={client}>{children}</QueryClientProvider>;
    const { result } = renderHook(() => useSuperadminFeaturesFeatureFlagUpdateMutation(), { wrapper });
    await result.current.mutateAsync({ id: 'flag-1', body: { isGlobalEnabled: true }, idempotencyKey: 'key-1' } as never);
    expect(featuresApi.updateFeatureFlag).toHaveBeenCalledWith('flag-1', { isGlobalEnabled: true }, 'key-1');
  });
});
