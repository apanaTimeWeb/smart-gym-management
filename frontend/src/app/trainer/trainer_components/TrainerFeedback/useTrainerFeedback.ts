'use client';
// RESPONSIBILITY: Provides the single Trainer-wide success/error feedback API with stable toast deduplication IDs.
// DATA FLOW: Feature mutation result/error → useTrainerFeedback → react-hot-toast → Trainer-wide Toaster host.
import { useCallback } from 'react';
import toast from 'react-hot-toast';
import { getTrainerUserSafeErrorMessage } from '@/app/trainer/trainer_utils/TrainerUserSafeError';

/**
 * Sends user-safe Trainer feedback using backend-provided messages and stable IDs for deduplication.
 */
export function useTrainerFeedback() {
  const showSuccess = useCallback((message: string, id: string) => {
    toast.success(message, { id });
  }, []);

  const showError = useCallback((error: unknown, id: string) => {
    const message = getTrainerUserSafeErrorMessage(error);
    toast.error(message, { id });
  }, []);

  return { showSuccess, showError };
}
