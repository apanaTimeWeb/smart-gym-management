// RESPONSIBILITY: Maps Broadcasts ORM entities into domain-safe response data.
// FLOW: TypeORM entity -> SuperadminBroadcastsMapper -> domain model -> response DTO.
import { SuperadminBroadcastsResponseDto } from '@/backend_superadmin/superadmin_modules/broadcasts/broadcasts_responses/superadmin-broadcasts-response.dto';
import type { SuperadminBroadcastsEntity } from '@/backend_superadmin/superadmin_modules/broadcasts/superadmin-broadcasts.entity';
import type { SuperadminBroadcastsDomainModel } from '@/backend_superadmin/superadmin_modules/broadcasts/broadcasts_types/superadmin-broadcasts.interfaces';

/**
 * Primary Intent: Defines SuperadminBroadcastsMapper as the class-level contract for superadmin-broadcasts.mapper.ts.
 * Edge Cases: Preserve exact exported names, field shapes, enum values, nullability, and module isolation when changing this construct.
 * Side-Effects: None unless the construct is explicitly a persistence, adapter, queue, or event boundary.
 * AI-Note: Treat this declaration as an architectural contract; do not move business logic into generic/shared folders or introduce undocumented fields.
 */
export class SuperadminBroadcastsMapper {
  /** Maps a persistence entity to the domain representation. */
  static toDomain(entity: SuperadminBroadcastsEntity): SuperadminBroadcastsDomainModel { return { ...entity } as SuperadminBroadcastsDomainModel; }

  /** Maps persistence entities to domain representations. */
  static toDomainList(entities: SuperadminBroadcastsEntity[]): SuperadminBroadcastsDomainModel[] { return entities.map(SuperadminBroadcastsMapper.toDomain); }

  /**
 * Primary Intent: Maps this module domain/projection into the stable API response DTO.
 * Edge Cases: Preserve exact field names, nullability, and enum semantics.
 * Side-Effects: Pure mapping only; no persistence or external side effects.
 * AI-Note: Do not add business logic or database access to this mapper.
 */

  static toResponse(domain: SuperadminBroadcastsDomainModel): SuperadminBroadcastsResponseDto {
    const dto = new SuperadminBroadcastsResponseDto();
    Object.assign(dto, domain);
    return dto;
  }
}
