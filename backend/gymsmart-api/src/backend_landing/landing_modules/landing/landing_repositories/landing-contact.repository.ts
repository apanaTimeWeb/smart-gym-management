// RESPONSIBILITY: Owns all PostgreSQL persistence for Landing contact messages.
// FLOW: LandingContactService â†’ LandingContactRepository â†’ LandingBaseRepository â†’ TypeORM â†’ landing_contacts.
import { Injectable } from '@nestjs/common';

import { LandingOrmTransactionContextService } from '@/backend_landing/landing_core/landing_database/landing-orm-transaction-context.service';
import { LandingBaseRepository } from '@/backend_landing/landing_core/landing_database/landing-base.repository';

import { LandingContactEntity } from '@/backend_landing/landing_modules/landing/landing_entities/landing-contact.entity';
import { LandingContactMapper } from '@/backend_landing/landing_modules/landing/landing_mappers/landing-contact.mapper';

import type { Repository } from 'typeorm';
import type { LandingContactDomainModel } from '@/backend_landing/landing_modules/landing/landing_domain/landing-contact.domain';
import type { LandingCreateContactInput } from '@/backend_landing/landing_modules/landing/landing_services/landing-contact-input.types';

/**
 * Intent: Defines the LandingContactRepository class boundary for this supplied Landing backend scope.
 * Edge Cases: Invalid inputs and infrastructure failures are handled by the owning boundary.
 * Side Effects: None beyond the behavior implemented by this class.
 * AI Notes: Preserve the class responsibility and dependency direction documented by the module.
 */
@Injectable()
/**
 * Intent: Defines the landing contact repository boundary for this supplied Landing backend scope.
 * Edge Cases: Invalid inputs, unavailable infrastructure, and transaction failures must fail through the owning boundary instead of being silently ignored.
 * Side Effects: Performs only the persistence, orchestration, transport, or infrastructure effects explicitly owned by this class.
 * AI Notes: Preserve the class's current responsibility and dependency direction; do not move business logic across feature boundaries.
 */
export class LandingContactRepository extends LandingBaseRepository<LandingContactEntity> {
  
  /**
   * Intent: Preserve the single responsibility of landing-contact.repository.constructor at its current architecture boundary.
   * Edge Cases: Invalid inputs and infrastructure failures must propagate to the owning boundary; no silent fallback is permitted.
   * Side Effects: Only the persistence, transport, infrastructure, or validation effects already defined by this method are allowed.
   * AI Notes: Preserve the method signature, dependency direction, and existing behavior when making future repairs.
   */
constructor(
    private readonly mapper: LandingContactMapper,
    transactionContext: LandingOrmTransactionContextService,
  ) {
    super(LandingContactEntity, transactionContext);
  }

  /**
   * @description Creates a contact record through the shared repository boundary and returns its domain model.
   * @param input - Sanitized application input.
   * @returns Created contact domain object.
   */
  
  /**
   * Intent: Preserve the single responsibility of landing-contact.repository.createContact at its current architecture boundary.
   * Edge Cases: Invalid inputs and infrastructure failures must propagate to the owning boundary; no silent fallback is permitted.
   * Side Effects: Only the persistence, transport, infrastructure, or validation effects already defined by this method are allowed.
   * AI Notes: Preserve the method signature, dependency direction, and existing behavior when making future repairs.
   */
async createContact(input: LandingCreateContactInput): Promise<LandingContactDomainModel> {
    const repository: Repository<LandingContactEntity> = this.repositoryFor();
    const entity = this.mapper.toEntity(input);
    const saved = await repository.save(entity);
    return this.mapper.toDomain(saved);
  }
}
