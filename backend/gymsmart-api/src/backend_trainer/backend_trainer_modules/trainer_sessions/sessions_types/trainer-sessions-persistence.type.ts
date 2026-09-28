// RESPONSIBILITY: Defines the persistence input required to create a Trainer session without exposing ORM entities to services.
// FLOW: Sessions command service → TrainerSessionsSessionPersistenceInput → sessions repository.

import type { SessionRecurrence, SessionStatus, SessionType } from '@/backend_trainer/backend_trainer_modules/trainer_sessions/trainer-sessions-enums';

export interface TrainerSessionsSessionPersistenceInput {
  trainerId: string;
  title: string;
  type: SessionType;
  time: string;
  sessionDate: string;
  duration: string;
  status: SessionStatus;
  attendees: number;
  maxAttendees: number | null;
  memberId: string | null;
  isOnline: boolean;
  enrolledMembers: Array<{ id: string; name: string }>;
  sessionNotes: string | null;
  location: string | null;
  room: string | null;
  trainerNotes: string | null;
  memberRating: number | null;
  cancellationReason: string | null;
  recurrenceRule: SessionRecurrence | null;
  recurrenceEndDate: string | null;
}
