import { createElement } from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, act } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { useSuperadminCouponsMutation } from '@/app/frontend_superadmin/superadmin_coupons/superadmin_coupons_hooks/useSuperadminCouponsMutation';
import { SUPERADMIN_COUPONS_QUERY_KEYS } from '@/app/frontend_superadmin/superadmin_coupons/superadmin_coupons_constants/SuperadminCouponsQueryKeys';

import type { ReactNode } from 'react';



describe('useSuperadminCouponsMutation', () => {
  it('executes a mutation, returns response data, and runs the consumer success callback', async () => {
    const client = new QueryClient({ defaultOptions: { mutations: { retry: false } } });
    const invalidateQueries = vi.spyOn(client, 'invalidateQueries').mockResolvedValue();
    const wrapper = ({ children }: { children: ReactNode }) => createElement(QueryClientProvider, { client }, children);
    const onSuccess = vi.fn();
    const { result } = renderHook(() => useSuperadminCouponsMutation(), { wrapper });
    let output: unknown;
    await act(async () => { output = await result.current.mutate(async () => ({ success: true, message: 'Saved', data: { id: 'c-1' } } as never), { toastId: 'coupon-test', onSuccess }); });
    expect(output).toEqual({ id: 'c-1' });
    expect(onSuccess).toHaveBeenCalledWith({ id: 'c-1' });
    expect(invalidateQueries).toHaveBeenCalledWith({ queryKey: SUPERADMIN_COUPONS_QUERY_KEYS.all });
  });
});
