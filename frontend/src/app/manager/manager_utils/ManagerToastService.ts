// DATA FLOW: module mutation/query result → Manager toast service → react-hot-toast
import toast from 'react-hot-toast';

/** Shows a deduplicated success toast using the backend-provided message. */
export function showManagerSuccessToast(message: string, toastId: string): void {
  if (message.trim().length === 0) return;
  toast.success(message, { id: toastId });
}

/** Shows a deduplicated error toast using an already-normalized backend error message. */
export function showManagerErrorToast(error: unknown, toastId: string): void {
  if (error instanceof Error && error.message.trim().length > 0) {
    toast.error(error.message, { id: toastId });
  }
}
