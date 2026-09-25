// RESPONSIBILITY: Maps Messaging ORM entities into domain-safe response data.
// FLOW: TypeORM entity -> SuperadminMessagingMapper -> domain model -> response DTO.
import { SuperadminMessagingResponseDto } from '@/backend_superadmin/superadmin_modules/messaging/messaging_responses/superadmin-messaging-response.dto';
import type { SuperadminMessagingEntity } from '@/backend_superadmin/superadmin_modules/messaging/superadmin-messaging.entity';
import type { SuperadminMessagingDomainModel } from '@/backend_superadmin/superadmin_modules/messaging/messaging_types/superadmin-messaging.interfaces';

/**
 * Primary Intent: Defines SuperadminMessagingMapper as the class-level contract for superadmin-messaging.mapper.ts.
 * Edge Cases: Preserve exact exported names, field shapes, enum values, nullability, and module isolation when changing this construct.
 * Side-Effects: None unless the construct is explicitly a persistence, adapter, queue, or event boundary.
 * AI-Note: Treat this declaration as an architectural contract; do not move business logic into generic/shared folders or introduce undocumented fields.
 */
export class SuperadminMessagingMapper {
  /** Maps a persistence entity to the domain representation. */
  static toDomain(entity: SuperadminMessagingEntity): SuperadminMessagingDomainModel { return { ...entity } as SuperadminMessagingDomainModel; }

  /** Maps persistence entities to domain representations. */
  static toDomainList(entities: SuperadminMessagingEntity[]): SuperadminMessagingDomainModel[] { return entities.map(SuperadminMessagingMapper.toDomain); }

  /**
 * Primary Intent: Maps this module domain/projection into the stable API response DTO.
 * Edge Cases: Preserve exact field names, nullability, and enum semantics.
 * Side-Effects: Pure mapping only; no persistence or external side effects.
 * AI-Note: Do not add business logic or database access to this mapper.
 */

  static toResponse(domain: SuperadminMessagingDomainModel): SuperadminMessagingResponseDto {
    const dto = new SuperadminMessagingResponseDto();
    dto.id = domain.id;
    dto.tenantId = domain.tenantId;
    dto.tenantName = domain.tenantName;
    dto.channel = domain.channel;
    dto.subject = domain.subject;
    dto.body = domain.body;
    dto.status = domain.status;
    dto.sentAt = domain.sentAt ? (domain.sentAt instanceof Date ? domain.sentAt.toISOString() : String(domain.sentAt)) : null;
    dto.scheduledAt = domain.scheduledAt ? (domain.scheduledAt instanceof Date ? domain.scheduledAt.toISOString() : String(domain.scheduledAt)) : null;
    dto.createdAt = domain.createdAt instanceof Date ? domain.createdAt.toISOString() : String(domain.createdAt);
    return dto;
  }
}
