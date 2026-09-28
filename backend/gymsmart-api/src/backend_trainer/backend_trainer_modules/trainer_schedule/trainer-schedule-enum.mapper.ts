// RESPONSIBILITY: Translates canonical schedule enum values to/from the frozen frontend labels.
// FLOW: HTTP payload/ORM enum → TrainerScheduleEnumMapper → frontend/API contract.
import { CoreDomainBadRequestException } from '@/backend_trainer/backend_core/core_errors/core-domain-bad-request.exception';
import { LeaveStatus, LeaveType, ScheduleDay } from '@/backend_trainer/backend_trainer_modules/trainer_schedule/trainer-schedule-enums';

/**
 * Intent: Defines the TrainerScheduleEnumMapper boundary for the modules architecture.
 * Edge Cases: Preserve tenant scope, validation, authorization, nullability, transactions, and canonical errors when changing this construct.
 * Side Effects: Preserve the owning construct’s existing persistence, cache, event, and audit behavior without introducing cross-module state changes.
 * AI Note: Keep this construct isolated from unrelated modules and preserve frozen contracts; never bypass repository/domain boundaries.
 */
export class TrainerScheduleEnumMapper {
  /** Normalizes weekday labels. */ static toDay(value:unknown):ScheduleDay{const m:Record<string,ScheduleDay>={Monday:ScheduleDay.MONDAY,MONDAY:ScheduleDay.MONDAY,Tuesday:ScheduleDay.TUESDAY,TUESDAY:ScheduleDay.TUESDAY,Wednesday:ScheduleDay.WEDNESDAY,WEDNESDAY:ScheduleDay.WEDNESDAY,Thursday:ScheduleDay.THURSDAY,THURSDAY:ScheduleDay.THURSDAY,Friday:ScheduleDay.FRIDAY,FRIDAY:ScheduleDay.FRIDAY,Saturday:ScheduleDay.SATURDAY,SATURDAY:ScheduleDay.SATURDAY,Sunday:ScheduleDay.SUNDAY,SUNDAY:ScheduleDay.SUNDAY};const r=typeof value==='string'?m[value]:undefined;if(!r)throw new CoreDomainBadRequestException('SCHEDULE.ENUM.DAY_INVALID');return r;}
  /** Normalizes leave types. */ static toLeaveType(value:unknown):LeaveType{const m:Record<string,LeaveType>={'Sick Leave':LeaveType.SICK_LEAVE,SICK_LEAVE:LeaveType.SICK_LEAVE,'Casual Leave':LeaveType.CASUAL_LEAVE,CASUAL_LEAVE:LeaveType.CASUAL_LEAVE,Emergency:LeaveType.EMERGENCY,EMERGENCY:LeaveType.EMERGENCY,Personal:LeaveType.PERSONAL,PERSONAL:LeaveType.PERSONAL,Other:LeaveType.OTHER,OTHER:LeaveType.OTHER};const r=typeof value==='string'?m[value]:undefined;if(!r)throw new CoreDomainBadRequestException('SCHEDULE.ENUM.LEAVE_TYPE_INVALID');return r;}
  /** Converts canonical day to frontend label. */ static toApiDay(v:ScheduleDay):string{return v[0]+v.slice(1).toLowerCase();}
  /** Converts canonical leave type to frontend label. */ static toApiLeaveType(v:LeaveType):string{return v.split('_').map(x=>x[0]+x.slice(1).toLowerCase()).join(' ');}
  /** Converts canonical leave status to frontend label. */ static toApiLeaveStatus(v:LeaveStatus):LeaveStatus{return v;}
}
