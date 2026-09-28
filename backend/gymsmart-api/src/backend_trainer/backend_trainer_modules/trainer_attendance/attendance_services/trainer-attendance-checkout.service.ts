// RESPONSIBILITY: Closes only the authenticated Trainer's open staff attendance row and audits the mutation atomically.
// FLOW: Attendance command controller → checkout service → UnitOfWork → repository + audit.
import { Injectable } from '@nestjs/common';
import { CoreRequestContext } from '@/backend_trainer/backend_core/core_context/core-request-context';
import { AttendanceOwnershipRequiredException, AttendanceNotFoundException, AttendanceAlreadyClosedException, AttendanceInvalidCheckoutTimeException } from '@/backend_trainer/backend_trainer_modules/trainer_attendance/trainer-attendance-exceptions';
import { CoreAuditService } from '@/backend_trainer/backend_core/core_audit/core-audit.service';
import { CoreImmutableDomainEventService } from '@/backend_trainer/backend_core/core_audit/core-immutable-domain-event.service';
import { CORE_EVENT_REGISTRY } from '@/backend_trainer/backend_core/event-registry.constants';
import { CoreUnitOfWorkService } from '@/backend_trainer/backend_core/core_database/core-unit-of-work.service';
import { TrainerAttendanceRepository } from '@/backend_trainer/backend_trainer_modules/trainer_attendance/attendance_repositories/trainer-attendance-repository';
/**
 * Intent: Defines the TrainerAttendanceCheckoutService boundary for the modules architecture.
 * Edge Cases: Preserve tenant scope, validation, authorization, nullability, transactions, and canonical errors when changing this construct.
 * Side Effects: Preserve the owning construct’s existing persistence, cache, event, and audit behavior without introducing cross-module state changes.
 * AI Note: Keep this construct isolated from unrelated modules and preserve frozen contracts; never bypass repository/domain boundaries.
 */
@Injectable()
export class TrainerAttendanceCheckoutService {
  constructor(private readonly repo: TrainerAttendanceRepository, private readonly audit: CoreAuditService, private readonly events: CoreImmutableDomainEventService, private readonly uow: CoreUnitOfWorkService) {}
  /** Closes the authenticated Trainer's current open attendance record. */
  /**
 * Intent: Executes the checkout operation inside the modules service boundary.
 * Edge Cases: Preserve validation, ownership checks, transactions, idempotency, canonical errors, and side-effects across every success and failure path.
 * AI Note: Keep the method focused on its use case; do not add raw ORM access, cross-module shortcuts, or silent API changes.
 */
/**
 * @description Executes checkout inside the owning backend service/repository boundary without exposing ORM details.
 * @param staffId - Input for checkout.
 * @param checkoutAt - Input for checkout.
 * @returns {Promise<null>} The typed result defined by the owning contract.
 * @throws AttendanceOwnershipRequiredException, AttendanceNotFoundException, AttendanceAlreadyClosedException, AttendanceInvalidCheckoutTimeException when the operation rejects its explicit business preconditions.
 * @remarks Preserve tenant isolation, frozen API semantics, transaction behavior, and mapper/repository boundaries.
 * AI Note: Do not move ORM access into services, introduce sibling business imports, or silently change response fields.
 */
async checkout(staffId: string, checkoutAt?: string): Promise<null> {
    const actorId = CoreRequestContext.getUserIdOrThrow();
    if (!actorId || staffId !== actorId) throw new AttendanceOwnershipRequiredException();
    const row = await this.repo.findOpenByStaffId(actorId);
    if (!row) throw new AttendanceNotFoundException();
    if (row.checkOut) throw new AttendanceAlreadyClosedException();
    const end = checkoutAt ? new Date(checkoutAt) : new Date();
    if (Number.isNaN(end.getTime())) throw new AttendanceInvalidCheckoutTimeException();
    const start = row.checkIn ? new Date(row.checkIn) : end;
    const duration = Math.max(0, Math.round((end.getTime() - start.getTime()) / 60000));
    await this.uow.execute(async (context) => {
      await this.repo.checkoutById(row.id, actorId, end, duration, context);
      await this.audit.record('ATTENDANCE_CHECKED_OUT', 'ATTENDANCE', row.id, { checkOut: null }, { checkOut: end.toISOString(), durationMinutes: duration }, context);
      await this.events.record(CORE_EVENT_REGISTRY.ATTENDANCE_SESSION_CLOSED, 'ATTENDANCE_RECORD', row.id, { staffId: actorId, checkIn: row.checkIn ?? null, checkOut: end.toISOString(), durationMinutes: duration }, context);
    });
    return null;
  }
}
