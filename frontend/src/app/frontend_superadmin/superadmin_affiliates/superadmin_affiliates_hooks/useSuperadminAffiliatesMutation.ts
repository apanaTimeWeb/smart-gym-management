'use client';
// DATA FLOW: Superadmin UI → useSuperadminAffiliatesMutation → TanStack Query mutation → caller callback.
// RESPONSIBILITY: Provides the Affiliate feature's shared mutation lifecycle without owning server data.
import toast from 'react-hot-toast';
import { useTranslations } from 'next-intl';

import { SUPERADMIN_AFFILIATES_QUERY_KEYS } from '@/app/frontend_superadmin/superadmin_affiliates/superadmin_affiliates_query_keys/SuperadminAffiliatesQueryKeys';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import type { SuperadminAffiliatesMutationExecutor, SuperadminAffiliatesMutationOptions } from '@/app/frontend_superadmin/superadmin_affiliates/superadmin_affiliates_types/SuperadminAffiliatesMutationTypes';

/** Runs one affiliate mutation while TanStack Query owns the asynchronous lifecycle and the hook owns user feedback. 
 * @description Owns the hook behavior for this Superadmin feature.
 * @dependencies Consumes feature-local state/API/query contracts and approved global infrastructure only.
 * @edge-case Preserves documented loading, error, retry, repeated-action, and empty-state behavior where applicable.
 */
export function useSuperadminAffiliatesMutation() {
  const t = useTranslations('superadmin_affiliates');
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async ({ execute, options }: { execute: SuperadminAffiliatesMutationExecutor<unknown>; options: SuperadminAffiliatesMutationOptions }) => {
      const response = await execute();
      if (!response.success) throw new Error(response.message);
      if (response.message) toast.success(response.message, { id: options.toastId });
      options.onSuccess?.(response.data ?? null);
      void queryClient.invalidateQueries({ queryKey: SUPERADMIN_AFFILIATES_QUERY_KEYS.all });
      return response.data ?? null;
    },
    onError: (error: unknown, variables) => {
      const errorObject = error instanceof Error ? error : new Error(t('ui.action_failed_retry'));
      toast.error(t('ui.action_failed_retry'), { id: variables.options.toastId });
      variables.options.onError?.(errorObject);
    },
  });
  const mutate = <T,>(execute: SuperadminAffiliatesMutationExecutor<T>, options: SuperadminAffiliatesMutationOptions) =>
    mutation.mutateAsync({ execute: execute as SuperadminAffiliatesMutationExecutor<unknown>, options }) as Promise<T | null>;
  return { mutate, isMutating: mutation.isPending };
}
