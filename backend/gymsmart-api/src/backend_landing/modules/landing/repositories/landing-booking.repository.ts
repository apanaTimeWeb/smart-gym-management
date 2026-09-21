// RESPONSIBILITY: Owns all PostgreSQL persistence for Landing bookings; no service-level ORM access is allowed.
// FLOW: LandingBookingService → LandingBookingRepository → CoreBaseRepository → TypeORM → landing_bookings.
import { Injectable } from '@nestjs/common';

import { CoreBaseRepository } from '@/backend_landing/core/database/base.repository';

import { LandingBookingEntity } from '@/backend_landing/modules/landing/entities/landing-booking.entity';

import { LandingBookingMapper } from '@/backend_landing/modules/landing/mappers/landing-booking.mapper';

import type { Repository } from 'typeorm';

import type { LandingBookingDomainModel } from '@/backend_landing/modules/landing/domain/landing-booking.domain';

import type { LandingCreateBookingInput } from '@/backend_landing/modules/landing/services/landing-booking-input.types';

import type { TransactionContext } from '@/backend_landing/core/database/transaction-context';


@Injectable()
export class LandingBookingRepository extends CoreBaseRepository<LandingBookingEntity> {
  constructor(private readonly mapper: LandingBookingMapper) {
    super(LandingBookingEntity);
  }

  /**
   * @description Creates a booking row through the shared repository boundary and returns its domain model.
   * @param input - Sanitized application input.
   * @param context - Active transaction context.
   * @returns Created booking domain object.
   */
  async createBooking(input: LandingCreateBookingInput, context: TransactionContext): Promise<LandingBookingDomainModel> {
    const repository: Repository<LandingBookingEntity> = this.repositoryFor(context);
    const entity = this.mapper.toEntity(input);
    const saved = await repository.save(entity);
    return this.mapper.toDomain(saved);
  }



}
