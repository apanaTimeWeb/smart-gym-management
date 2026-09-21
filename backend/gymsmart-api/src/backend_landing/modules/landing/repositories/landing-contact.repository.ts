// RESPONSIBILITY: Owns all PostgreSQL persistence for Landing contact messages.
// FLOW: LandingContactService → LandingContactRepository → CoreBaseRepository → TypeORM → landing_contacts.
import { Injectable } from '@nestjs/common';

import { CoreBaseRepository } from '@/backend_landing/core/database/base.repository';

import { LandingContactEntity } from '@/backend_landing/modules/landing/entities/landing-contact.entity';

import { LandingContactMapper } from '@/backend_landing/modules/landing/mappers/landing-contact.mapper';

import type { Repository } from 'typeorm';

import type { LandingContactDomainModel } from '@/backend_landing/modules/landing/domain/landing-contact.domain';

import type { LandingCreateContactInput } from '@/backend_landing/modules/landing/services/landing-contact-input.types';

import type { TransactionContext } from '@/backend_landing/core/database/transaction-context';


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
