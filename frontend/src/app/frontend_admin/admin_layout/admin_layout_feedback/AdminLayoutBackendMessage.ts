// RESPONSIBILITY: Extracts an already-provided backend/application message without inventing user-facing copy.
export function getAdminBackendMessage(error: unknown): string | null {
  if (error instanceof Error && error.message.trim()) return error.message;
  if (typeof error !== 'object' || error === null || !('message' in error)) return null;
  const message = (error as { message?: unknown }).message;
  return typeof message === 'string' && message.trim() ? message : null;
}
