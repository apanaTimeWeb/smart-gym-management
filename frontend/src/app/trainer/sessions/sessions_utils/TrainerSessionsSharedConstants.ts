// RESPONSIBILITY: Centralized runtime constants for the Trainer Sessions module.
// TypeScript types (SessionType, SessionStatus, SessionFilter, TrainerSession) live in
// sessions_types/TrainerSessionsTypes.ts (Rule 7 — type isolation).
// Bug #9 fix: Types are imported from the types file and re-exported for backward compat.
// Bug #19 fix: Adds isSpecificFilter() type guard for SessionFilter vs SessionType conflation.
import type { SessionType, SessionStatus, SessionFilter, TrainerSession } from '@/app/trainer/sessions/sessions_types/TrainerSessionsTypes';
export type { SessionType, SessionStatus, SessionFilter, TrainerSession };

/**
 * Type guard: returns true if filter is a specific session type (not 'All').
 * Bug #19: Prevents SessionFilter from being used where SessionType is required.
 * @example
 * if (isSpecificFilter(filter)) {
 *   // filter is narrowed to SessionType here
 * }
 */
export function isSpecificFilter(f: SessionFilter): f is SessionType {
  return f !== 'All';
}



export const SESSION_FILTER_OPTIONS: SessionFilter[] = ['All', 'PT', 'Group'];

export const SESSION_STATUS_STYLES: Record<SessionStatus, string> = {
  Completed: 'bg-success-bg text-success',
  Cancelled: 'bg-danger-bg text-danger',
  Upcoming: 'bg-warning-bg text-warning',
};

export const SESSION_TYPE_STYLES: Record<SessionType, string> = {
  PT: 'bg-info-bg text-info',
  Group: 'bg-purple-bg text-purple',
};

export const DURATION_OPTIONS = [
  { value: '30m', label: '30 Minutes' },
  { value: '45m', label: '45 Minutes' },
  { value: '60m', label: '60 Minutes' },
];

