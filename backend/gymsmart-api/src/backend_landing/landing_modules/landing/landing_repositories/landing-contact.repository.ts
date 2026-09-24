// RESPONSIBILITY: Owns all PostgreSQL persistence for Landing contact messages.
// FLOW: LandingContactService â†’ LandingContactRepository â†’ CoreBaseRepository â†’ TypeORM â†’ landing_contacts.
import { Injectable } from '@nestjs/common';

import { CoreBaseRepository } from '@/backend_landing/landing_core/database/base.repository';

import { LandingContactEntity } from '@/backend_landing/landing_modules/landing/landing_entities/landing-contact.entity';

import { LandingContactMapper } from '@/backend_landing/landing_modules/landing/landing_mappers/landing-contact.mapper';

import { Repository } from 'typeorm';

import type { LandingContactDomainModel } from '@/backend_landing/landing_modules/landing/domain/landing-contact.domain';

import type { LandingCreateContactInput } from '@/backend_landing/landing_modules/landing/landing_services/landing-contact-input.types';

import { TransactionContext } from '@/backend_landing/landing_core/database/transaction-context';


@Injectable()
export class LandingContactRepository extends CoreBaseRepository<LandingContactEntity> {
  constructor(private readonly mapper: LandingContactMapper) {
    super(LandingContactEntity);
  }

  /**
   * @description Creates a contact record through the shared repository boundary and returns its domain model.
   * @param input - Sanitized application input.
   * @param context - Active transaction context.
   * @returns Created contact domain object.
   */
  async createContact(input: LandingCreateContactInput, context: TransactionContext): Promise<LandingContactDomainModel> {
    const repository: Repository<LandingContactEntity> = this.repositoryFor(context);
    const entity = this.mapper.toEntity(input);
    const saved = await repository.save(entity);
    return this.mapper.toDomain(saved);
  }
}
