// RESPONSIBILITY: TypeScript types for the Trainer Sessions module.
// Rule 7: All types for this module must be defined here — not in constants or component files.
// Bug #9 fix: Types are now defined here directly (not re-exported from constants).
// DataFlow: Imported by useTrainerSessionsLogic, TrainerSessionsMain, and session sub-components.

/**
 * Discriminated union of session type values.
 * Use `isSpecificFilter()` from constants when narrowing SessionFilter to SessionType.
 */
export type SessionType = 'PT' | 'Group';

/** Status lifecycle of a booked session. */
export type SessionStatus = 'Upcoming' | 'Completed' | 'Cancelled';

/**
 * Filter value for session list views.
 * 'All' shows all session types; PT/Group narrow to specific types.
 * Use `isSpecificFilter(f)` type guard when SessionType is required (not 'All').
 */
export type SessionFilter = 'All' | SessionType;

/** Full session record as returned by the trainer sessions API. */
export interface TrainerSession {
  id: string;
  title: string;
  type: SessionType;
  time: string;
  sessionDate: string;
  duration: string;
  status: SessionStatus;
  attendees: number;
  maxAttendees?: number;
  member?: string;
  isOnline: boolean;
  enrolledMembers?: { id: string; name: string }[];
  sessionNotes?: string;
  location?: string;
  room?: string;
  trainerNotes?: string;
  memberRating?: number;
  cancellationReason?: string;
  recurrenceRule?: string;
}
