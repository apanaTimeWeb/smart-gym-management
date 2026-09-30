// RESPONSIBILITY: Translates Landing contact ORM entities into domain objects and persistence inputs.
// FLOW: ORM entity â†” LandingContactMapper â†” LandingContactDomainModel/service input.
import { Injectable } from '@nestjs/common';

import { LandingContactEntity } from '@/backend_landing/landing_modules/landing/landing_entities/landing-contact.entity';

import type { LandingCreateContactInput } from '@/backend_landing/landing_modules/landing/landing_services/landing-contact-input.types';
import type { LandingContactDomainModel } from '@/backend_landing/landing_modules/landing/landing_domain/landing-contact.domain';


/**
 * Intent: Defines the LandingContactMapper class boundary for this supplied Landing backend scope.
 * Edge Cases: Invalid inputs and infrastructure failures are handled by the owning boundary.
 * Side Effects: None beyond the behavior implemented by this class.
 * AI Notes: Preserve the class responsibility and dependency direction documented by the module.
 */
@Injectable()
/**
 * Intent: Defines the landing contact mapper boundary for this supplied Landing backend scope.
 * Edge Cases: Invalid inputs, unavailable infrastructure, and transaction failures must fail through the owning boundary instead of being silently ignored.
 * Side Effects: Performs only the persistence, orchestration, transport, or infrastructure effects explicitly owned by this class.
 * AI Notes: Preserve the class's current responsibility and dependency direction; do not move business logic across feature boundaries.
 */
export class LandingContactMapper {
  /** @description Converts a contact persistence entity into a domain object. @param entity - ORM entity from repository layer. @returns Persistence-independent contact domain model. */
  
  /**
   * Intent: Preserve the single responsibility of landing-contact.mapper.toDomain at its current architecture boundary.
   * Edge Cases: Invalid inputs and infrastructure failures must propagate to the owning boundary; no silent fallback is permitted.
   * Side Effects: Only the persistence, transport, infrastructure, or validation effects already defined by this method are allowed.
   * AI Notes: Preserve the method signature, dependency direction, and existing behavior when making future repairs.
   */
toDomain(entity: LandingContactEntity): LandingContactDomainModel {
    return {
      id: entity.id,
      name: entity.name,
      email: entity.email,
      message: entity.message,
      createdAt: new Date(entity.createdAt),
      updatedAt: new Date(entity.updatedAt),
      deletedAt: entity.deletedAt ? new Date(entity.deletedAt) : null,
    };
  }

  /** @description Converts sanitized application input into a new ORM entity. @param input - Validated contact application input. @returns New ORM entity. */
  
  /**
   * Intent: Preserve the single responsibility of landing-contact.mapper.toEntity at its current architecture boundary.
   * Edge Cases: Invalid inputs and infrastructure failures must propagate to the owning boundary; no silent fallback is permitted.
   * Side Effects: Only the persistence, transport, infrastructure, or validation effects already defined by this method are allowed.
   * AI Notes: Preserve the method signature, dependency direction, and existing behavior when making future repairs.
   */
toEntity(input: LandingCreateContactInput): LandingContactEntity {
    const entity = new LandingContactEntity();
    entity.name = input.name;
    entity.email = input.email;
    entity.message = input.message;
    return entity;
  }
}
