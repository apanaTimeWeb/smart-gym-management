// RESPONSIBILITY: Maps Messaging ORM entities into domain-safe response data.
// FLOW: TypeORM entity -> SuperadminMessagingMapper -> domain model -> response DTO.
import { SuperadminMessagingResponseDto } from '@/backend_superadmin/superadmin_modules/messaging/responses/superadmin-messaging-response.dto';
import type { SuperadminMessagingEntity } from '@/backend_superadmin/superadmin_modules/messaging/superadmin-messaging.entity';
import type { SuperadminMessagingDomainModel } from '@/backend_superadmin/superadmin_modules/messaging/types/superadmin-messaging.interfaces';

export class SuperadminMessagingMapper {
  /** Maps a persistence entity to the domain representation. */
  static toDomain(entity: SuperadminMessagingEntity): SuperadminMessagingDomainModel { return { ...entity } as SuperadminMessagingDomainModel; }

  /** Maps persistence entities to domain representations. */
  static toDomainList(entities: SuperadminMessagingEntity[]): SuperadminMessagingDomainModel[] { return entities.map(SuperadminMessagingMapper.toDomain); }

  static toResponse(domain: SuperadminMessagingDomainModel): SuperadminMessagingResponseDto {
    const dto = new SuperadminMessagingResponseDto();
    Object.assign(dto, domain);
    return dto;
  }
}