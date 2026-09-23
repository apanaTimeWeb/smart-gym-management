// RESPONSIBILITY: Maps Broadcasts ORM entities into domain-safe response data.
// FLOW: TypeORM entity -> SuperadminBroadcastsMapper -> domain model -> response DTO.
import { SuperadminBroadcastsResponseDto } from '@/backend_superadmin/superadmin_modules/broadcasts/responses/superadmin-broadcasts-response.dto';
import type { SuperadminBroadcastsEntity } from '@/backend_superadmin/superadmin_modules/broadcasts/superadmin-broadcasts.entity';
import type { SuperadminBroadcastsDomainModel } from '@/backend_superadmin/superadmin_modules/broadcasts/types/superadmin-broadcasts.interfaces';

export class SuperadminBroadcastsMapper {
  /** Maps a persistence entity to the domain representation. */
  static toDomain(entity: SuperadminBroadcastsEntity): SuperadminBroadcastsDomainModel { return { ...entity } as SuperadminBroadcastsDomainModel; }

  /** Maps persistence entities to domain representations. */
  static toDomainList(entities: SuperadminBroadcastsEntity[]): SuperadminBroadcastsDomainModel[] { return entities.map(SuperadminBroadcastsMapper.toDomain); }

  static toResponse(domain: SuperadminBroadcastsDomainModel): SuperadminBroadcastsResponseDto {
    const dto = new SuperadminBroadcastsResponseDto();
    Object.assign(dto, domain);
    return dto;
  }
}