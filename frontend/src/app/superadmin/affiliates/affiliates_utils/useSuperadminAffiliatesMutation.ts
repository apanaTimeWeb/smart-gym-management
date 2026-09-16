'use client';
// RESPONSIBILITY: Generic mutation hook for all Superadmin write operations (POST/PATCH/DELETE). Manages isMutating state, shows toasts from backend message, and calls onSuccess/onError callbacks.
// DATA FLOW: Component -> useSuperadminAffiliatesMutation.ts -> API/Store
import { useState } from 'react';
import toast from 'react-hot-toast';

interface MutationOptions {
  onSuccess?: (data: unknown) => void;
  onError?: (error: Error) => void;
}

/**
 * Hook to manage loading states and error handling for API mutations (POST/PATCH/DELETE)
 */
export function useSuperadminAffiliatesMutation() {
  const [isMutating, setIsMutating] = useState(false);

  const mutate = async <T,>(
    mutationFn: () => Promise<{ success: boolean; data?: T | null; message?: string }>,
    options?: MutationOptions
  ) => {
    setIsMutating(true);
    try {
      const response = await mutationFn();
      const responseData = response.data !== undefined ? response.data : response;
      
      if (response.message) {
        toast.success(response.message, { id: response.message });
      }
      
      if (options?.onSuccess) {
        options.onSuccess(responseData);
      }
      
      return responseData;
    } catch (error: unknown) {
      const errorObj = error instanceof Error ? error : new Error(String(error));
      toast.error(errorObj.message, { id: errorObj.message });
      
      if (options?.onError) {
        options.onError(errorObj);
      }
      throw error;
    } finally {
      setIsMutating(false);
    }
  };

  return { mutate, isMutating };
}

