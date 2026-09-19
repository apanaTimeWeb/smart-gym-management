// DATA FLOW: Superadmin UI → useSuperadminAffiliatesMutation → Superadmin module API/state → consuming component
'use client';
// RESPONSIBILITY: Executes affiliate writes with loading state, stable event/entity toast IDs, and caller-owned success/error handling.
import { useState } from 'react';
import toast from 'react-hot-toast';

interface SuperadminAffiliatesMutationOptions {
  toastId: string;
  onSuccess?: (data: unknown) => void;
  onError?: (error: Error) => void;
}

/**
 * Purpose: Manage one affiliate mutation lifecycle without owning server data.
 * Inputs: mutation function and a stable event/entity toast ID.
 * Outputs: resolved mutation data and isMutating state.
 */
export function useSuperadminAffiliatesMutation() {
  const [isMutating, setIsMutating] = useState(false);
  const mutate = async <T,>(mutationFn: () => Promise<{ success: boolean; data?: T | null; message?: string }>, options: SuperadminAffiliatesMutationOptions) => {
    setIsMutating(true);
    try {
      const response = await mutationFn();
      const responseData = response.data !== undefined ? response.data : response;
      if (response.message) toast.success(response.message, { id: options.toastId });
      options.onSuccess?.(responseData);
      return responseData as T | null;
    } catch (error: unknown) {
      const errorObj = error instanceof Error ? error : new Error(String(error));
      toast.error(errorObj.message, { id: options.toastId });
      options.onError?.(errorObj);
      throw errorObj;
    } finally {
      setIsMutating(false);
    }
  };
  return { mutate, isMutating };
}
