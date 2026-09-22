// RESPONSIBILITY: Maps session ORM state to the exact Trainer frontend session contract.
// FLOW: SessionsSessionEntity → SessionsSessionMapper → response data.

import type { SessionsSessionEntity } from '@/backend_trainer/modules/backend_trainer/sessions/sessions-session.entity';
import type { SessionsSessionDomain } from '@/backend_trainer/modules/backend_trainer/sessions/sessions-session.domain';
export function SessionsSessionMapper(entity:SessionsSessionEntity):SessionsSessionDomain{return {id:entity.id,title:entity.title,type:entity.type,time:entity.time,sessionDate:entity.sessionDate,duration:entity.duration,status:entity.status,attendees:entity.attendees,maxAttendees:entity.maxAttendees,member:entity.memberId,isOnline:entity.isOnline,enrolledMembers:entity.enrolledMembers??[],sessionNotes:entity.sessionNotes,location:entity.location,room:entity.room,trainerNotes:entity.trainerNotes,memberRating:entity.memberRating,cancellationReason:entity.cancellationReason,recurrenceRule:entity.recurrenceRule};}
