// RESPONSIBILITY: Owns all PostgreSQL persistence for Landing contact messages.
// FLOW: LandingContactService → LandingContactRepository → TypeORM EntityManager/Repository → landing_contacts.
import { Injectable } from '@nestjs/common';
import { EntityManager, Repository } from 'typeorm';
import { LandingContactEntity } from '@/modules/landing/entities/landing-contact.entity';
import { LandingContactMapper } from '@/modules/landing/mappers/landing-contact.mapper';
import type { LandingContactDomainModel } from '@/modules/landing/domain/landing-contact.domain';
import type { LandingCreateContactInput } from '@/modules/landing/services/landing-contact-input.types';
import type { TransactionContext } from '@/core/database/transaction-context';

@Injectable()
export class LandingContactRepository {
  private readonly repositoryCache = new WeakMap<EntityManager, Repository<LandingContactEntity>>();

  constructor(private readonly mapper: LandingContactMapper) {}

  /** @description Creates a contact message row through a named mutation method. @param input - Sanitized application input. @param context - Active transaction context. @returns Created contact domain object. */
  async createContact(input: LandingCreateContactInput, context: TransactionContext): Promise<LandingContactDomainModel> {
    const repository = this.resolveRepository(context.manager);
    const entity = this.mapper.toEntity(input);
    const saved = await repository.save(entity);
    return this.mapper.toDomain(saved);
  }

  private resolveRepository(manager: EntityManager): Repository<LandingContactEntity> {
    const cached = this.repositoryCache.get(manager);
    if (cached) return cached;
    const repository = manager.getRepository(LandingContactEntity);
    this.repositoryCache.set(manager, repository);
    return repository;
  }
}
