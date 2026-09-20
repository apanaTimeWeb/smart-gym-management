// DATA FLOW: Superadmin UI → useSuperadminAffiliatesMutation → TanStack Query mutation → caller callback.
// RESPONSIBILITY: Provides the Affiliate feature's shared mutation lifecycle without owning server data.
'use client';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import type { SuperadminAffiliatesMutationExecutor, SuperadminAffiliatesMutationOptions } from '@/app/superadmin/affiliates/affiliates_types/SuperadminAffiliatesMutationTypes';

/** Runs one affiliate mutation while TanStack Query owns the asynchronous lifecycle and the hook owns user feedback. */
export function useSuperadminAffiliatesMutation() {
  const mutation = useMutation({
    mutationFn: async ({ execute, options }: { execute: SuperadminAffiliatesMutationExecutor<unknown>; options: SuperadminAffiliatesMutationOptions }) => {
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
  const mutate = <T,>(execute: SuperadminAffiliatesMutationExecutor<T>, options: SuperadminAffiliatesMutationOptions) =>
    mutation.mutateAsync({ execute: execute as SuperadminAffiliatesMutationExecutor<unknown>, options }) as Promise<T | null>;
  return { mutate, isMutating: mutation.isPending };
}
