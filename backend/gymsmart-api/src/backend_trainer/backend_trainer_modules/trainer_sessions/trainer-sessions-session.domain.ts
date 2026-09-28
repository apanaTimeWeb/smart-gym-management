// RESPONSIBILITY: Defines the Sessions domain response object independently from TypeORM persistence.
// FLOW: Repository entity → session mapper → domain response → controller envelope.

export interface SessionsSessionDomain {
  id: string;
  title: string;
  type: string;
  time: string;
  sessionDate: string;
  duration: string;
  status: string;
  attendees: number;
  maxAttendees?: number;
  member?: string;
  isOnline: boolean;
  enrolledMembers: { id: string; name: string }[];
  sessionNotes?: string;
  location?: string;
  room?: string;
  trainerNotes?: string;
  memberRating?: number;
  cancellationReason?: string;
  recurrenceRule?: string;
  recurrenceEndDate?: string;
}
