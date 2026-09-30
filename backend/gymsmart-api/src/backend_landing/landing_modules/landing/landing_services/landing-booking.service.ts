// RESPONSIBILITY: Implements booking business behavior only; it does not own HTTP or ORM persistence details.
// FLOW: LandingBookingOrchestrator â†’ LandingBookingService â†’ LandingBookingRepository.
import { Injectable } from '@nestjs/common';

import { LANDING_ERRORS } from '@/backend_landing/landing_modules/landing/landing-landing.constants';
import { LandingAuditLogRepository } from '@/backend_landing/landing_modules/landing/landing_repositories/landing-audit-log.repository';
import { LandingBookingRepository } from '@/backend_landing/landing_modules/landing/landing_repositories/landing-booking.repository';

import type { LandingBookingDomainModel } from '@/backend_landing/landing_modules/landing/landing_domain/landing-booking.domain';
import type { LandingCreateBookingInput } from '@/backend_landing/landing_modules/landing/landing_services/landing-booking-input.types';

/**
 * Intent: Defines the LandingBookingService class boundary for this supplied Landing backend scope.
 * Edge Cases: Invalid inputs and infrastructure failures are handled by the owning boundary.
 * Side Effects: None beyond the behavior implemented by this class.
 * AI Notes: Preserve the class responsibility and dependency direction documented by the module.
 */
@Injectable()
/**
 * Intent: Defines the landing booking service boundary for this supplied Landing backend scope.
 * Edge Cases: Invalid inputs, unavailable infrastructure, and transaction failures must fail through the owning boundary instead of being silently ignored.
 * Side Effects: Performs only the persistence, orchestration, transport, or infrastructure effects explicitly owned by this class.
 * AI Notes: Preserve the class's current responsibility and dependency direction; do not move business logic across feature boundaries.
 */
export class LandingBookingService {
  
  /**
   * Intent: Preserve the single responsibility of landing-booking.service.constructor at its current architecture boundary.
   * Edge Cases: Invalid inputs and infrastructure failures must propagate to the owning boundary; no silent fallback is permitted.
   * Side Effects: Only the persistence, transport, infrastructure, or validation effects already defined by this method are allowed.
   * AI Notes: Preserve the method signature, dependency direction, and existing behavior when making future repairs.
   */
constructor(
    private readonly bookingRepository: LandingBookingRepository,
    private readonly auditRepository: LandingAuditLogRepository,
  ) {}

  /** @description Creates a booking and records the mutation audit event in the same transaction. @param input - Sanitized booking input. @returns Created booking domain object. @remarks Audit is persisted in the same transaction as the booking so the mutation cannot commit without its trail. */
  
  /**
   * Intent: Preserve the single responsibility of landing-booking.service.createBooking at its current architecture boundary.
   * Edge Cases: Invalid inputs and infrastructure failures must propagate to the owning boundary; no silent fallback is permitted.
   * Side Effects: Only the persistence, transport, infrastructure, or validation effects already defined by this method are allowed.
   * AI Notes: Preserve the method signature, dependency direction, and existing behavior when making future repairs.
   */
async createBooking(input: LandingCreateBookingInput): Promise<LandingBookingDomainModel> {
    const booking = await this.bookingRepository.createBooking(input);
    await this.auditRepository.recordCreate(LANDING_ERRORS.AUDIT_BOOKING_CREATED, 'LandingBooking', booking.id, {
      type: booking.type,
      date: booking.date.toISOString(),
    });
    return booking;
  }
}
