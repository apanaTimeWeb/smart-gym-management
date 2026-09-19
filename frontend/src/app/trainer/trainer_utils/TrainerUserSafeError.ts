// RESPONSIBILITY: Sanitizes unknown request failures before they reach Trainer user-facing feedback surfaces.
const FALLBACK_MESSAGE = 'Request failed. Please retry.';
const MAX_MESSAGE_LENGTH = 180;

export function getTrainerUserSafeErrorMessage(error: unknown): string {
  if (!(error instanceof Error)) return FALLBACK_MESSAGE;
  const message = error.message.trim();
  if (!message || message.length > MAX_MESSAGE_LENGTH) return FALLBACK_MESSAGE;
  if (/https?:\/\//i.test(message)) return FALLBACK_MESSAGE;
  if (/\b(?:authorization|bearer|token|stack|trace|request id|digest)\b/i.test(message)) return FALLBACK_MESSAGE;
  if (/[{}<>]/.test(message)) return FALLBACK_MESSAGE;
  return message;
}
