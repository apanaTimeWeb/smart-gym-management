// RESPONSIBILITY: Defines typed Trainer attendance exceptions for service-layer business failures.
// FLOW: Attendance service → Attendance exception → canonical error envelope.
import { CoreDomainBadRequestException } from '@/backend_trainer/backend_core/core_errors/core-domain-bad-request.exception';

/**
 * Intent: Defines the AttendanceOwnershipRequiredException boundary for the modules architecture.
 * Edge Cases: Preserve tenant scope, validation, authorization, nullability, transactions, and canonical errors when changing this construct.
 * Side Effects: Preserve the owning construct’s existing persistence, cache, event, and audit behavior without introducing cross-module state changes.
 * AI Note: Keep this construct isolated from unrelated modules and preserve frozen contracts; never bypass repository/domain boundaries.
 */
export class AttendanceOwnershipRequiredException extends CoreDomainBadRequestException { constructor(){super('ATTENDANCE.RECORD.OWNERSHIP_REQUIRED');} }

/**
 * Intent: Defines the AttendanceNotFoundException boundary for the modules architecture.
 * Edge Cases: Preserve tenant scope, validation, authorization, nullability, transactions, and canonical errors when changing this construct.
 * Side Effects: Preserve the owning construct’s existing persistence, cache, event, and audit behavior without introducing cross-module state changes.
 * AI Note: Keep this construct isolated from unrelated modules and preserve frozen contracts; never bypass repository/domain boundaries.
 */
export class AttendanceNotFoundException extends CoreDomainBadRequestException { constructor(){super('ATTENDANCE.RECORD.NOT_FOUND');} }

/**
 * Intent: Defines the AttendanceAlreadyClosedException boundary for the modules architecture.
 * Edge Cases: Preserve tenant scope, validation, authorization, nullability, transactions, and canonical errors when changing this construct.
 * Side Effects: Preserve the owning construct’s existing persistence, cache, event, and audit behavior without introducing cross-module state changes.
 * AI Note: Keep this construct isolated from unrelated modules and preserve frozen contracts; never bypass repository/domain boundaries.
 */
export class AttendanceAlreadyClosedException extends CoreDomainBadRequestException { constructor(){super('ATTENDANCE.RECORD.ALREADY_CLOSED');} }

/**
 * Intent: Defines the AttendanceInvalidCheckoutTimeException boundary for the modules architecture.
 * Edge Cases: Preserve tenant scope, validation, authorization, nullability, transactions, and canonical errors when changing this construct.
 * Side Effects: Preserve the owning construct’s existing persistence, cache, event, and audit behavior without introducing cross-module state changes.
 * AI Note: Keep this construct isolated from unrelated modules and preserve frozen contracts; never bypass repository/domain boundaries.
 */
export class AttendanceInvalidCheckoutTimeException extends CoreDomainBadRequestException { constructor(){super('ATTENDANCE.RECORD.INVALID_CHECKOUT_TIME');} }
