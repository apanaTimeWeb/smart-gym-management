// RESPONSIBILITY: Defines the sessions business object independent from TypeORM persistence.
// FLOW: sessions repository → mapper → domain object → service.

export interface SessionsSessionDomain {
  id: string;
  title: string;
  type: string;
  time: string;
  sessionDate: string;
  duration: string;
  status: string;
  attendees: number;
  maxAttendees: number | null;
  member: string | null;
  isOnline: boolean;
  enrolledMembers: { id: string; name: string }[];
  sessionNotes: string | null;
  location: string | null;
  room: string | null;
  trainerNotes: string | null;
  memberRating: number | null;
  cancellationReason: string | null;
  recurrenceRule: string | null;
}
