import { createElement } from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { act, renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { SUPERADMIN_AFFILIATES_QUERY_KEYS } from '@/app/frontend_superadmin/superadmin_affiliates/superadmin_affiliates_constants/SuperadminAffiliatesQueryKeys';

import { useSuperadminAffiliatesMutation } from '@/app/frontend_superadmin/superadmin_affiliates/superadmin_affiliates_hooks/useSuperadminAffiliatesMutation';

import type { ReactNode } from 'react';



describe('useSuperadminAffiliatesMutation', () => {
  it('executes a successful mutation, calls the consumer callback, and invalidates the module cache', async () => {
    const client = new QueryClient({ defaultOptions: { mutations: { retry: false } } });
    const invalidateQueries = vi.spyOn(client, 'invalidateQueries').mockResolvedValue();
    const wrapper = ({ children }: { children: ReactNode }) => createElement(QueryClientProvider, { client }, children);
    const onSuccess = vi.fn();
    const { result } = renderHook(() => useSuperadminAffiliatesMutation(), { wrapper });
    await act(async () => {
      await result.current.mutate(async () => ({ success: true, message: 'Created', data: { id: 'a-1' } } as never), { toastId: 'affiliate-test', onSuccess });
    });
    expect(onSuccess).toHaveBeenCalledWith({ id: 'a-1' });
    expect(invalidateQueries).toHaveBeenCalledWith({ queryKey: SUPERADMIN_AFFILIATES_QUERY_KEYS.all });
  });
});
