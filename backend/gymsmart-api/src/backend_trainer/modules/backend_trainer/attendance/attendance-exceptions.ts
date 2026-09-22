// RESPONSIBILITY: Defines attendance-specific business exceptions for required actor, type, ownership, and trainer-scope rules.
// FLOW: Attendance service detects invariant violation → typed exception → global error envelope.

import { CoreDomainException } from '@/backend_trainer/core/errors/core-domain.exception';

export class AttendanceActorRequiredException extends CoreDomainException {
  constructor() { super('DOMAIN.ATTENDANCE.ACTOR_REQUIRED', 'Authenticated Trainer context is required.'); }
}
export class AttendanceTypeRequiredException extends CoreDomainException {
  constructor() { super('DOMAIN.ATTENDANCE.TYPE_REQUIRED', 'Attendance type is required.'); }
}
export class AttendanceMemberRequiredException extends CoreDomainException {
  constructor() { super('DOMAIN.ATTENDANCE.MEMBER_REQUIRED', 'A member identifier is required for member attendance.'); }
}
export class AttendanceMemberForbiddenException extends CoreDomainException {
  constructor() { super('DOMAIN.ATTENDANCE.MEMBER_FORBIDDEN', 'The member is not assigned to this Trainer.'); }
}
export class AttendanceOwnershipRequiredException extends CoreDomainException {
  constructor() { super('DOMAIN.ATTENDANCE.RECORD.OWNERSHIP_REQUIRED', 'A Trainer may only mutate their own staff attendance record.'); }
}

export class AttendanceOpenStaffRecordExistsException extends CoreDomainException {
  constructor() { super('DOMAIN.ATTENDANCE.OPEN_STAFF_RECORD_EXISTS', 'An open Trainer attendance record already exists.'); }
}
