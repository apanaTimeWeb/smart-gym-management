// DATA FLOW: Superadmin UI → useSuperadminCouponsMutation → TanStack Query mutation → caller callback.
// RESPONSIBILITY: Provides the Coupons feature's shared mutation lifecycle without owning server data.
'use client';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import type { SuperadminCouponsMutationExecutor, SuperadminCouponsMutationOptions } from '@/app/superadmin/saas-billing/coupons/coupons_types/SuperadminCouponsMutationTypes';

/** Runs one coupon mutation while TanStack Query owns the asynchronous lifecycle and the hook owns user feedback. */
export function useSuperadminCouponsMutation() {
  const mutation = useMutation({
    mutationFn: async ({ execute, options }: { execute: SuperadminCouponsMutationExecutor<unknown>; options: SuperadminCouponsMutationOptions }) => {
      const response = await execute();
      if (!response.success) throw new Error(response.message);
      if (response.message) toast.success(response.message, { id: options.toastId });
      options.onSuccess?.(response.data ?? null);
      return response.data ?? null;
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
