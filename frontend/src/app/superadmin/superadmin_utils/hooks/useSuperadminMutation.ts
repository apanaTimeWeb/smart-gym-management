import { useState } from 'react';
import toast from 'react-hot-toast';

interface MutationOptions {
  onSuccess?: (data: any) => void;
  onError?: (error: Error) => void;
  successMessage?: string;
  errorMessage?: string;
}

/**
 * Hook to manage loading states and error handling for API mutations (POST/PATCH/DELETE)
 */
export function useSuperadminMutation() {
  const [isMutating, setIsMutating] = useState(false);

  const mutate = async <T,>(
    mutationFn: () => Promise<{ success: boolean; data?: T; message?: string }>,
    options?: MutationOptions
  ) => {
    setIsMutating(true);
    try {
      const response = await mutationFn();
      
      if (options?.successMessage || response.message) {
        toast.success(options?.successMessage || response.message || 'Action successful');
      }
      
      if (options?.onSuccess) {
        options.onSuccess(response.data);
      }
      
      return response.data;
    } catch (error: any) {
      const message = options?.errorMessage || error.message || 'Something went wrong';
      toast.error(message);
      
      if (options?.onError) {
        options.onError(error);
      }
      throw error;
    } finally {
      setIsMutating(false);
    }
  };

  return { mutate, isMutating };
}
