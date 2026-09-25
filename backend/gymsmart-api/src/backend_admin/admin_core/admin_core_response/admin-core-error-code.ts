// RESPONSIBILITY: Normalizes machine-readable API error codes into the canonical three-segment contract.
// FLOW: Exception payload -> normalizeCoreErrorCode() -> canonical ApiResponse.errorCode.

export function normalizeCoreErrorCode(raw: unknown): string {
  const value = String(raw ?? '').trim();
  if (/^[A-Z][A-Z0-9_]*\.[A-Z][A-Z0-9_]*\.[A-Z][A-Z0-9_]*$/.test(value)) return value;
  const parts = value.split('.').filter(Boolean).map((part) => part.replace(/[^A-Za-z0-9_]/g, '_').toUpperCase());
  if (parts.length >= 3) return parts.slice(0, 3).join('.');
  if (parts.length === 2) return `HTTP.${parts[0]}.${parts[1]}`;
  if (parts.length === 1) return `HTTP.REQUEST.${parts[0] || 'FAILED'}`;
  return 'HTTP.REQUEST.FAILED';
}
