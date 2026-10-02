'use client';
// DATA FLOW: Superadmin UI → useSuperadminCouponsMutation → TanStack Query mutation → caller callback.
// RESPONSIBILITY: Provides the Coupons feature's shared mutation lifecycle without owning server data.
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { SUPERADMIN_COUPONS_QUERY_KEYS } from '@/app/frontend_superadmin/superadmin_coupons/superadmin_coupons_constants/SuperadminCouponsQueryKeys';

import type { SuperadminCouponsMutationExecutor, SuperadminCouponsMutationOptions } from '@/app/frontend_superadmin/superadmin_coupons/superadmin_coupons_types/SuperadminCouponsMutationTypes';



/** Runs one coupon mutation while TanStack Query owns the asynchronous lifecycle and the hook owns user feedback. */
/**
 * @description Manages coupons state, queries, and UI interactions for useSuperadminCouponsMutation.
 * @dependencies Consumes only owning-module state/API contracts and approved global infrastructure.
 * @edge-case Preserves loading, error, cancellation, retry, and repeated-action behavior.
 */
// DATA FLOW: Module API/query/store state → useSuperadminCouponsMutation → consuming feature component.
export function useSuperadminCouponsMutation() {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async ({ execute, options }: { execute: SuperadminCouponsMutationExecutor<unknown>; options: SuperadminCouponsMutationOptions }) => {
      const response = await execute();
      if (!response.success) throw new Error(response.message);
      if (response.message) toast.success(response.message, { id: options.toastId });
      return response.data ?? null;
    },
    onSuccess: async (data, variables) => {
      await queryClient.invalidateQueries({ queryKey: SUPERADMIN_COUPONS_QUERY_KEYS.all });
      variables.options.onSuccess?.(data);
    },
    onError: (error: unknown, variables) => {
      const errorObject = error instanceof Error ? error : new Error(String(error));
      toast.error(errorObject.message, { id: variables.options.toastId });
      variables.options.onError?.(errorObject);
    },
  });
  const mutate = <T,>(execute: SuperadminCouponsMutationExecutor<T>, options: SuperadminCouponsMutationOptions) =>
    mutation.mutateAsync({ execute: execute as SuperadminCouponsMutationExecutor<unknown>, options }) as Promise<T | null>;
  return { mutate, isMutating: mutation.isPending };
}
