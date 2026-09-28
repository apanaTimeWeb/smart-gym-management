// RESPONSIBILITY: Translates session enum values between canonical persistence values and frozen frontend labels.
// FLOW: HTTP payload/ORM enum → TrainerSessionsEnumMapper → frontend/API contract.
import { CoreDomainBadRequestException } from '@/backend_trainer/backend_core/core_errors/core-domain-bad-request.exception';
import { SessionRecurrence, SessionStatus, SessionType } from '@/backend_trainer/backend_trainer_modules/trainer_sessions/trainer-sessions-enums';

/**
 * Intent: Defines the TrainerSessionsEnumMapper boundary for the modules architecture.
 * Edge Cases: Preserve tenant scope, validation, authorization, nullability, transactions, and canonical errors when changing this construct.
 * Side Effects: Preserve the owning construct’s existing persistence, cache, event, and audit behavior without introducing cross-module state changes.
 * AI Note: Keep this construct isolated from unrelated modules and preserve frozen contracts; never bypass repository/domain boundaries.
 */
export class TrainerSessionsEnumMapper {
  /** Normalizes the session type. */ static toType(value:unknown):SessionType{const m:Record<string,SessionType>={PT:SessionType.PT,Group:SessionType.GROUP,GROUP:SessionType.GROUP};const r=typeof value==='string'?m[value]:undefined;if(!r)throw new CoreDomainBadRequestException('SESSIONS.ENUM.TYPE_INVALID');return r;}
  /** Normalizes the session status. */ static toStatus(value:unknown):SessionStatus{const m:Record<string,SessionStatus>={Upcoming:SessionStatus.UPCOMING,UPCOMING:SessionStatus.UPCOMING,Completed:SessionStatus.COMPLETED,COMPLETED:SessionStatus.COMPLETED,'No Show':SessionStatus.NO_SHOW,NO_SHOW:SessionStatus.NO_SHOW};const r=typeof value==='string'?m[value]:undefined;if(!r)throw new CoreDomainBadRequestException('SESSIONS.ENUM.STATUS_INVALID');return r;}
  /** Normalizes the session recurrence value. */ static toRecurrence(value:unknown):SessionRecurrence{const m:Record<string,SessionRecurrence>={none:SessionRecurrence.NONE,NONE:SessionRecurrence.NONE,weekly:SessionRecurrence.WEEKLY,WEEKLY:SessionRecurrence.WEEKLY,biweekly:SessionRecurrence.BIWEEKLY,BIWEEKLY:SessionRecurrence.BIWEEKLY};const r=typeof value==='string'?m[value]:undefined;if(!r)throw new CoreDomainBadRequestException('SESSIONS.ENUM.RECURRENCE_INVALID');return r;}
  /** Converts canonical type to frontend value. */ static toApiType(v:SessionType):string{return v===SessionType.PT?'PT':'Group';}
  /** Converts canonical status to frontend value. */ static toApiStatus(v:SessionStatus):string{return v===SessionStatus.UPCOMING?'Upcoming':v===SessionStatus.COMPLETED?'Completed':'No Show';}
  /** Converts canonical recurrence to frontend value. */ static toApiRecurrence(v:SessionRecurrence):string{return v===SessionRecurrence.NONE?'none':v===SessionRecurrence.WEEKLY?'weekly':'biweekly';}
}
