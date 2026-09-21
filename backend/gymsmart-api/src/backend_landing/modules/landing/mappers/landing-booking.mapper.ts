// RESPONSIBILITY: Translates Landing booking ORM entities into persistence-independent domain objects and inputs.
// FLOW: ORM entity ↔ LandingBookingMapper ↔ LandingBookingDomainModel/service input.
import { Injectable } from '@nestjs/common';

import { LandingBookingEntity } from '@/backend_landing/modules/landing/entities/landing-booking.entity';

import type { LandingBookingDomainModel } from '@/backend_landing/modules/landing/domain/landing-booking.domain';

import type { LandingCreateBookingInput } from '@/backend_landing/modules/landing/services/landing-booking-input.types';


@Injectable()
export class LandingBookingMapper {
  /** @description Converts a booking persistence entity into a domain object. @param entity - ORM entity from repository layer. @returns Persistence-independent booking domain model. */
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
