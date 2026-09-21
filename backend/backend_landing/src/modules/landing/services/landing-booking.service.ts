// RESPONSIBILITY: Implements booking business behavior only; it does not own HTTP or ORM persistence details.
// FLOW: LandingBookingOrchestrator → LandingBookingService → LandingBookingRepository.
import { Injectable } from '@nestjs/common';
import type { LandingBookingDomainModel } from '@/modules/landing/domain/landing-booking.domain';
import type { LandingCreateBookingInput } from '@/modules/landing/services/landing-booking-input.types';
import { LandingBookingRepository } from '@/modules/landing/repositories/landing-booking.repository';
import { LandingAuditLogRepository } from '@/modules/landing/repositories/landing-audit-log.repository';
import type { TransactionContext } from '@/core/database/transaction-context';
import { LANDING_ERRORS } from '@/modules/landing/landing.constants';

@Injectable()
export class LandingBookingService {
  constructor(
    private readonly bookingRepository: LandingBookingRepository,
    private readonly auditRepository: LandingAuditLogRepository,
  ) {}

  /** @description Creates a booking and records the mutation audit event in the same transaction. @param input - Sanitized booking input. @param context - Active transaction context. @returns Created booking domain object. @remarks Audit is persisted in the same transaction as the booking so the mutation cannot commit without its trail. */
  async createBooking(input: LandingCreateBookingInput, context: TransactionContext): Promise<LandingBookingDomainModel> {
    const booking = await this.bookingRepository.createBooking(input, context);
    await this.auditRepository.recordCreate(context, LANDING_ERRORS.AUDIT_BOOKING_CREATED, 'LandingBooking', booking.id, {
      type: booking.type,
      date: booking.date.toISOString(),
    });
    return booking;
  }
}
