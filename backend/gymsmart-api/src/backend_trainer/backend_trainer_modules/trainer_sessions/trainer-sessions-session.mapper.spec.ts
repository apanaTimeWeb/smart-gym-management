// RESPONSIBILITY: Proves nullable persistence fields are normalized to the frontend optional-field contract.
// FLOW: Jest → SessionsSessionMapper → persisted nulls → frontend-compatible response shape.

import type { TrainerSessionsSessionEntity } from '@/backend_trainer/backend_trainer_modules/trainer_sessions/trainer-sessions-session.entity';
import { SessionStatus, SessionType } from '@/backend_trainer/backend_trainer_modules/trainer_sessions/trainer-sessions-enums';
import { SessionsSessionMapper } from '@/backend_trainer/backend_trainer_modules/trainer_sessions/trainer-sessions-session.mapper';

describe('SessionsSessionMapper', () => {
  it('omits nullable persistence fields when the frontend contract marks them optional', () => {
    const entity = {
      id: 'session-1',
      title: 'Personal Training',
      type: SessionType.PT,
      time: '10:00',
      sessionDate: '2026-09-24',
      duration: '60 mins',
      status: SessionStatus.UPCOMING,
      attendees: 0,
      maxAttendees: null,
      memberId: null,
      isOnline: false,
      enrolledMembers: null,
      sessionNotes: null,
      location: null,
      room: null,
      trainerNotes: null,
      memberRating: null,
      cancellationReason: null,
      recurrenceRule: null,
    } as TrainerSessionsSessionEntity;

    expect(SessionsSessionMapper(entity)).toEqual({
      id: 'session-1',
      title: 'Personal Training',
      type: 'PT',
      time: '10:00',
      sessionDate: '2026-09-24',
      duration: '60 mins',
      status: 'Upcoming',
      attendees: 0,
      isOnline: false,
      enrolledMembers: [],
    });
  });

  it('preserves populated optional fields with frontend-compatible values', () => {
    const entity = {
      id: 'session-2',
      title: 'Group Session',
      type: SessionType.GROUP,
      time: '18:00',
      sessionDate: '2026-09-24',
      duration: '45 mins',
      status: SessionStatus.COMPLETED,
      attendees: 8,
      maxAttendees: 12,
      memberId: 'member-1',
      isOnline: true,
      enrolledMembers: [{ id: 'member-1', name: 'Rahul' }],
      sessionNotes: 'Warm-up completed',
      location: 'Studio A',
      room: 'A1',
      trainerNotes: 'Good energy',
      memberRating: 5,
      cancellationReason: null,
      recurrenceRule: null,
    } as TrainerSessionsSessionEntity;

    expect(SessionsSessionMapper(entity)).toEqual({
      id: 'session-2',
      title: 'Group Session',
      type: 'Group',
      time: '18:00',
      sessionDate: '2026-09-24',
      duration: '45 mins',
      status: 'Completed',
      attendees: 8,
      maxAttendees: 12,
      member: 'member-1',
      isOnline: true,
      enrolledMembers: [{ id: 'member-1', name: 'Rahul' }],
      sessionNotes: 'Warm-up completed',
      location: 'Studio A',
      room: 'A1',
      trainerNotes: 'Good energy',
      memberRating: 5,
    });
  });
});
