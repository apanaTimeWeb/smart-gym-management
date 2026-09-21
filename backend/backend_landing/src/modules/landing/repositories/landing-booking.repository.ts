// RESPONSIBILITY: Owns all PostgreSQL persistence for Landing bookings; no service-level ORM access is allowed.
// FLOW: LandingBookingService → LandingBookingRepository → TypeORM EntityManager/Repository → landing_bookings.
import { Injectable } from '@nestjs/common';
import { EntityManager, Repository } from 'typeorm';
import { LandingBookingEntity } from '@/modules/landing/entities/landing-booking.entity';
import { LandingBookingMapper } from '@/modules/landing/mappers/landing-booking.mapper';
import type { LandingBookingDomainModel } from '@/modules/landing/domain/landing-booking.domain';
import type { LandingCreateBookingInput } from '@/modules/landing/services/landing-booking-input.types';
import type { TransactionContext } from '@/core/database/transaction-context';

@Injectable()
export class LandingBookingRepository {
  private readonly repositoryCache = new WeakMap<EntityManager, Repository<LandingBookingEntity>>();

  constructor(
    private readonly mapper: LandingBookingMapper,
  ) {}

  /** @description Creates a booking row through a named mutation method and returns its domain model. @param input - Sanitized application input. @param context - Active transaction context. @returns Created booking domain object. @remarks The mutation stays here so future audit/constraint hooks have one persistence boundary. */
  async createBooking(input: LandingCreateBookingInput, context: TransactionContext): Promise<LandingBookingDomainModel> {
    const repository = this.resolveRepository(context.manager);
    const entity = this.mapper.toEntity(input);
    const saved = await repository.save(entity);
    return this.mapper.toDomain(saved);
  }

  private resolveRepository(manager: EntityManager): Repository<LandingBookingEntity> {
    const cached = this.repositoryCache.get(manager);
    if (cached) return cached;
    const repository = manager.getRepository(LandingBookingEntity);
    this.repositoryCache.set(manager, repository);
    return repository;
  }
}
