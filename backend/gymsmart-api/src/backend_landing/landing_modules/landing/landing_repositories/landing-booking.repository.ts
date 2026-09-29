// RESPONSIBILITY: Owns all PostgreSQL persistence for Landing bookings; no service-level ORM access is allowed.
// FLOW: LandingBookingService â†’ LandingBookingRepository â†’ LandingBaseRepository â†’ TypeORM â†’ landing_bookings.
import { Injectable } from '@nestjs/common';

import { LandingOrmTransactionContextService } from '@/backend_landing/landing_core/landing_database/landing-orm-transaction-context.service';
import { LandingBaseRepository } from '@/backend_landing/landing_core/landing_database/landing-base.repository';

import { LandingBookingEntity } from '@/backend_landing/landing_modules/landing/landing_entities/landing-booking.entity';
import { LandingBookingMapper } from '@/backend_landing/landing_modules/landing/landing_mappers/landing-booking.mapper';

import type { Repository } from 'typeorm';
import type { LandingBookingDomainModel } from '@/backend_landing/landing_modules/landing/landing_domain/landing-booking.domain';
import type { LandingCreateBookingInput } from '@/backend_landing/landing_modules/landing/landing_services/landing-booking-input.types';

/**
 * Intent: Defines the LandingBookingRepository class boundary for this supplied Landing backend scope.
 * Edge Cases: Invalid inputs and infrastructure failures are handled by the owning boundary.
 * Side Effects: None beyond the behavior implemented by this class.
 * AI Notes: Preserve the class responsibility and dependency direction documented by the module.
 */
@Injectable()
/**
 * Intent: Defines the landing booking repository boundary for this supplied Landing backend scope.
 * Edge Cases: Invalid inputs, unavailable infrastructure, and transaction failures must fail through the owning boundary instead of being silently ignored.
 * Side Effects: Performs only the persistence, orchestration, transport, or infrastructure effects explicitly owned by this class.
 * AI Notes: Preserve the class's current responsibility and dependency direction; do not move business logic across feature boundaries.
 */
export class LandingBookingRepository extends LandingBaseRepository<LandingBookingEntity> {
  
  /**
   * Intent: Preserve the single responsibility of landing-booking.repository.constructor at its current architecture boundary.
   * Edge Cases: Invalid inputs and infrastructure failures must propagate to the owning boundary; no silent fallback is permitted.
   * Side Effects: Only the persistence, transport, infrastructure, or validation effects already defined by this method are allowed.
   * AI Notes: Preserve the method signature, dependency direction, and existing behavior when making future repairs.
   */
constructor(
    private readonly mapper: LandingBookingMapper,
    transactionContext: LandingOrmTransactionContextService,
  ) {
    super(LandingBookingEntity, transactionContext);
  }

  /**
   * @description Creates a booking row through the shared repository boundary and returns its domain model.
   * @param input - Sanitized application input.
   * @returns Created booking domain object.
   */
  
  /**
   * Intent: Preserve the single responsibility of landing-booking.repository.createBooking at its current architecture boundary.
   * Edge Cases: Invalid inputs and infrastructure failures must propagate to the owning boundary; no silent fallback is permitted.
   * Side Effects: Only the persistence, transport, infrastructure, or validation effects already defined by this method are allowed.
   * AI Notes: Preserve the method signature, dependency direction, and existing behavior when making future repairs.
   */
async createBooking(input: LandingCreateBookingInput): Promise<LandingBookingDomainModel> {
    const repository: Repository<LandingBookingEntity> = this.repositoryFor();
    const entity = this.mapper.toEntity(input);
    const saved = await repository.save(entity);
    return this.mapper.toDomain(saved);
  }



}
