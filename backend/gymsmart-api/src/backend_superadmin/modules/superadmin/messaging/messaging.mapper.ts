// RESPONSIBILITY: Maps Messaging ORM entities into domain-safe response data.
// FLOW: TypeORM entity -> MessagingMapper -> domain model -> response DTO.
import { MessagingResponseDto } from '@/backend_superadmin/modules/superadmin/messaging/responses/messaging-response.dto';
import type { MessagingEntity } from '@/backend_superadmin/modules/superadmin/messaging/messaging.entity';
import type { MessagingDomainModel } from '@/backend_superadmin/modules/superadmin/messaging/types/messaging.interfaces';

export class MessagingMapper {
  /** Maps a persistence entity to the domain representation. */
  static toDomain(entity: MessagingEntity): MessagingDomainModel { return { ...entity } as MessagingDomainModel; }

  /** Maps persistence entities to domain representations. */
  static toDomainList(entities: MessagingEntity[]): MessagingDomainModel[] { return entities.map(MessagingMapper.toDomain); }

  static toResponse(domain: MessagingDomainModel): MessagingResponseDto {
    const dto = new MessagingResponseDto();
    Object.assign(dto, domain);
    return dto;
  }
}