// RESPONSIBILITY: Translates Landing contact ORM entities into domain objects and persistence inputs.
// FLOW: ORM entity ↔ LandingContactMapper ↔ LandingContactDomainModel/service input.
import { Injectable } from '@nestjs/common';

import { LandingContactEntity } from '@/backend_landing/modules/landing/entities/landing-contact.entity';

import type { LandingCreateContactInput } from '@/backend_landing/modules/landing/services/landing-contact-input.types';

import type { LandingContactDomainModel } from '@/backend_landing/modules/landing/domain/landing-contact.domain';


@Injectable()
export class LandingContactMapper {
  /** @description Converts a contact persistence entity into a domain object. @param entity - ORM entity from repository layer. @returns Persistence-independent contact domain model. */
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
  toEntity(input: LandingCreateContactInput): LandingContactEntity {
    const entity = new LandingContactEntity();
    entity.name = input.name;
    entity.email = input.email;
    entity.message = input.message;
    return entity;
  }
}
