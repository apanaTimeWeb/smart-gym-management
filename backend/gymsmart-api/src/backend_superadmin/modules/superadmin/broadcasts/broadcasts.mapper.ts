// RESPONSIBILITY: Maps Broadcasts ORM entities into domain-safe response data.
// FLOW: TypeORM entity -> BroadcastsMapper -> domain model -> response DTO.
import { BroadcastsResponseDto } from '@/backend_superadmin/modules/superadmin/broadcasts/responses/broadcasts-response.dto';
import type { BroadcastsEntity } from '@/backend_superadmin/modules/superadmin/broadcasts/broadcasts.entity';
import type { BroadcastsDomainModel } from '@/backend_superadmin/modules/superadmin/broadcasts/types/broadcasts.interfaces';

export class BroadcastsMapper {
  /** Maps a persistence entity to the domain representation. */
  static toDomain(entity: BroadcastsEntity): BroadcastsDomainModel { return { ...entity } as BroadcastsDomainModel; }

  /** Maps persistence entities to domain representations. */
  static toDomainList(entities: BroadcastsEntity[]): BroadcastsDomainModel[] { return entities.map(BroadcastsMapper.toDomain); }

  static toResponse(domain: BroadcastsDomainModel): BroadcastsResponseDto {
    const dto = new BroadcastsResponseDto();
    Object.assign(dto, domain);
    return dto;
  }
}