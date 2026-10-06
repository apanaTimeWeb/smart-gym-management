import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { useSuperadminFeaturesFeatureRolloutMutation } from '@/app/frontend_superadmin/superadmin_features/superadmin_features_hooks/useSuperadminFeaturesFeatureRolloutMutation';

import type { ReactNode } from 'react';



describe('useSuperadminFeaturesFeatureRolloutMutation', () => {
  it('calls the supplied rollout handler with the selected tenants and idempotency key', async () => {
    const onSaveRollout = vi.fn().mockResolvedValue({ success: true, message: 'Saved', data: { ok: true } });
    const keyRef = { current: null as string | null };
    const onSuccess = vi.fn();
    const client = new QueryClient({ defaultOptions: { mutations: { retry: false } } });
    const wrapper = ({ children }: { children: ReactNode }) => <QueryClientProvider client={client}>{children}</QueryClientProvider>;
    const { result } = renderHook(() => useSuperadminFeaturesFeatureRolloutMutation(onSaveRollout as never, ['tenant-1'], keyRef, onSuccess), { wrapper });
    await result.current.mutateAsync();
    expect(onSaveRollout).toHaveBeenCalledWith(['tenant-1'], expect.any(String));
    expect(onSuccess).toHaveBeenCalledTimes(1);
    expect(keyRef.current).toEqual(expect.any(String));
  });
});
