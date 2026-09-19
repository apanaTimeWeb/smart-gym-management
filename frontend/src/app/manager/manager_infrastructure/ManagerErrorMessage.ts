// RESPONSIBILITY: Normalizes unknown API/query errors into a user-safe message for Manager UI surfaces.

export const MANAGER_GENERIC_ERROR_MESSAGE = 'Unable to complete the request. Please try again.';

/** Returns the backend-provided message when available, otherwise a safe generic message. */
export function getManagerErrorMessage(error: unknown): string {
  if (error instanceof Error && error.message.trim()) return error.message;
  if (typeof error === 'string' && error.trim()) return error;
  if (typeof error === 'object' && error !== null && 'message' in error) {
    const message = (error as { message?: unknown }).message;
    if (typeof message === 'string' && message.trim()) return message;
  }
  return MANAGER_GENERIC_ERROR_MESSAGE;
}
