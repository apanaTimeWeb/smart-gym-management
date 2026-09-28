// RESPONSIBILITY: Maps Trainer session persistence state into the frontend session response contract.
// FLOW: TrainerSessionsSessionEntity → enum translation → nullable-field normalization → SessionsSessionDomain.

import type { TrainerSessionsSessionEntity } from '@/backend_trainer/backend_trainer_modules/trainer_sessions/trainer-sessions-session.entity';
import { TrainerSessionsEnumMapper } from '@/backend_trainer/backend_trainer_modules/trainer_sessions/trainer-sessions-enum.mapper';
import type { SessionsSessionDomain } from '@/backend_trainer/backend_trainer_modules/trainer_sessions/trainer-sessions-session.domain';

/**
 * Maps a persisted session row to the exact frontend contract.
 * @param entity Persisted Trainer session row.
 * @returns Session data with optional fields omitted when persistence stores null.
 * @remarks The frontend schema uses optional fields rather than nullable fields, so null persistence values must not cross the API boundary.
 */
/**
 * @description Executes SessionsSessionMapper as an isolated backend utility/adapter operation.
 * @param entity - Input for SessionsSessionMapper.
 * @returns {SessionsSessionDomain} The deterministic result required by its caller.
 * @throws Infrastructure or canonical application exceptions when the operation cannot complete.
 * @remarks Preserve pure mapping/adapter behavior and avoid introducing business persistence shortcuts.
 * AI Note: Keep the utility isolated and update its direct callers when its contract changes.
 */
export function SessionsSessionMapper(entity: TrainerSessionsSessionEntity & { memberName?: string }): SessionsSessionDomain {
  return {
    id: entity.id,
    title: entity.title,
    type: TrainerSessionsEnumMapper.toApiType(entity.type),
    time: entity.time,
    sessionDate: entity.sessionDate,
    duration: entity.duration,
    status: TrainerSessionsEnumMapper.toApiStatus(entity.status),
    attendees: entity.attendees,
    isOnline: entity.isOnline,
    enrolledMembers: entity.enrolledMembers ?? [],
    ...(entity.maxAttendees !== null ? { maxAttendees: entity.maxAttendees } : {}),
    ...(entity.memberId !== null ? { member: entity.memberName ?? entity.enrolledMembers?.[0]?.name ?? entity.memberId } : {}),
    ...(entity.sessionNotes !== null ? { sessionNotes: entity.sessionNotes } : {}),
    ...(entity.location !== null ? { location: entity.location } : {}),
    ...(entity.room !== null ? { room: entity.room } : {}),
    ...(entity.trainerNotes !== null ? { trainerNotes: entity.trainerNotes } : {}),
    ...(entity.memberRating !== null ? { memberRating: entity.memberRating } : {}),
    ...(entity.cancellationReason !== null ? { cancellationReason: entity.cancellationReason } : {}),
    ...(entity.recurrenceRule !== null ? { recurrenceRule: TrainerSessionsEnumMapper.toApiRecurrence(entity.recurrenceRule) } : {}),
    ...(entity.recurrenceEndDate !== null ? { recurrenceEndDate: entity.recurrenceEndDate } : {}),
  };
}
