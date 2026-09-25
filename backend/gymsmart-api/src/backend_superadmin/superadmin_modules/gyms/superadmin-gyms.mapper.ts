// RESPONSIBILITY: Maps Gym ORM entities into a frontend-safe domain representation without exposing encrypted sensitive persistence fields.
// FLOW: TypeORM SuperadminGymsEntity -> SuperadminGymsMapper -> public Gym domain/response DTO.
import { SuperadminGymsResponseDto } from '@/backend_superadmin/superadmin_modules/gyms/gyms_responses/superadmin-gyms-response.dto';
import type { SuperadminGymsEntity } from '@/backend_superadmin/superadmin_modules/gyms/superadmin-gyms.entity';
import type { SuperadminGymsDomainModel } from '@/backend_superadmin/superadmin_modules/gyms/gyms_types/superadmin-gyms.interfaces';

/**
 * Primary Intent: Defines SuperadminGymsMapper as the class-level contract for superadmin-gyms.mapper.ts.
 * Edge Cases: Preserve exact exported names, field shapes, enum values, nullability, and module isolation when changing this construct.
 * Side-Effects: None unless the construct is explicitly a persistence, adapter, queue, or event boundary.
 * AI-Note: Treat this declaration as an architectural contract; do not move business logic into generic/shared folders or introduce undocumented fields.
 */
export class SuperadminGymsMapper {
  /** Maps one persistence entity to the public Gym domain model and omits encrypted Aadhaar ciphertext. */
  static toDomain(entity: SuperadminGymsEntity): SuperadminGymsDomainModel {
    const { aadharNumberEncrypted: _redacted, ...safe } = entity;
    return safe as SuperadminGymsDomainModel;
  }

  /** Maps multiple Gym entities into safe domain models. */
  static toDomainList(entities: SuperadminGymsEntity[]): SuperadminGymsDomainModel[] { return entities.map((item) => SuperadminGymsMapper.toDomain(item)); }

  /**
 * Primary Intent: Maps this module domain/projection into the stable API response DTO.
 * Edge Cases: Preserve exact field names, nullability, and enum semantics.
 * Side-Effects: Pure mapping only; no persistence or external side effects.
 * AI-Note: Do not add business logic or database access to this mapper.
 */

  static toResponse(domain: SuperadminGymsDomainModel, currency: string): SuperadminGymsResponseDto {
    const dto = new SuperadminGymsResponseDto();
    Object.assign(dto, domain);
    dto.currency = currency;
    return dto;
  }
}
