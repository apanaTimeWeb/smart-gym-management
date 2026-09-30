// RESPONSIBILITY: Translates Landing booking ORM entities into persistence-independent domain objects and inputs.
// FLOW: ORM entity â†” LandingBookingMapper â†” LandingBookingDomainModel/service input.
import { Injectable } from '@nestjs/common';

import { LandingBookingEntity } from '@/backend_landing/landing_modules/landing/landing_entities/landing-booking.entity';

import type { LandingBookingDomainModel } from '@/backend_landing/landing_modules/landing/landing_domain/landing-booking.domain';
import type { LandingCreateBookingInput } from '@/backend_landing/landing_modules/landing/landing_services/landing-booking-input.types';


/**
 * Intent: Defines the LandingBookingMapper class boundary for this supplied Landing backend scope.
 * Edge Cases: Invalid inputs and infrastructure failures are handled by the owning boundary.
 * Side Effects: None beyond the behavior implemented by this class.
 * AI Notes: Preserve the class responsibility and dependency direction documented by the module.
 */
@Injectable()
/**
 * Intent: Defines the landing booking mapper boundary for this supplied Landing backend scope.
 * Edge Cases: Invalid inputs, unavailable infrastructure, and transaction failures must fail through the owning boundary instead of being silently ignored.
 * Side Effects: Performs only the persistence, orchestration, transport, or infrastructure effects explicitly owned by this class.
 * AI Notes: Preserve the class's current responsibility and dependency direction; do not move business logic across feature boundaries.
 */
export class LandingBookingMapper {
  /** @description Converts a booking persistence entity into a domain object. @param entity - ORM entity from repository layer. @returns Persistence-independent booking domain model. */
  
  /**
   * Intent: Preserve the single responsibility of landing-booking.mapper.toDomain at its current architecture boundary.
   * Edge Cases: Invalid inputs and infrastructure failures must propagate to the owning boundary; no silent fallback is permitted.
   * Side Effects: Only the persistence, transport, infrastructure, or validation effects already defined by this method are allowed.
   * AI Notes: Preserve the method signature, dependency direction, and existing behavior when making future repairs.
   */
toDomain(entity: LandingBookingEntity): LandingBookingDomainModel {
    return {
      id: entity.id,
      name: entity.name,
      email: entity.email,
      phone: entity.phone,
      date: new Date(entity.date),
      type: entity.type,
      createdAt: new Date(entity.createdAt),
      updatedAt: new Date(entity.updatedAt),
      deletedAt: entity.deletedAt ? new Date(entity.deletedAt) : null,
    };
  }

  /** @description Converts sanitized application input into a new ORM entity. @param input - Validated booking application input. @returns New ORM entity. */
  
  /**
   * Intent: Preserve the single responsibility of landing-booking.mapper.toEntity at its current architecture boundary.
   * Edge Cases: Invalid inputs and infrastructure failures must propagate to the owning boundary; no silent fallback is permitted.
   * Side Effects: Only the persistence, transport, infrastructure, or validation effects already defined by this method are allowed.
   * AI Notes: Preserve the method signature, dependency direction, and existing behavior when making future repairs.
   */
toEntity(input: LandingCreateBookingInput): LandingBookingEntity {
    const entity = new LandingBookingEntity();
    entity.name = input.name;
    entity.email = input.email;
    entity.phone = input.phone;
    entity.date = input.date;
    entity.type = input.type;
    return entity;
  }
}
