import { format } from 'date-fns';

/**
 * @description Formats a Superadmin System Ops ISO timestamp using the module's approved date-fns dependency.
 * @dependencies Uses date-fns only; timezone conversion remains delegated to the browser locale.
 * @edge-case Returns an en-dash for absent or invalid timestamps instead of rendering an empty value.
 */
export function SuperadminSystemOpsSystemOpsFormatDateTime(value: string | null | undefined, _locale: string): string {
  if (!value) return '—';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '—';
  return format(date, 'PP p');
}
