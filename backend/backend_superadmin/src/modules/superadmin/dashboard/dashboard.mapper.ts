// RESPONSIBILITY: Maps Dashboard ORM entities into domain-safe response data.
// FLOW: TypeORM entity -> DashboardMapper -> domain model -> response DTO.
import type { DashboardSnapshotEntity } from '@/modules/superadmin/dashboard/dashboard.entity';
import type { DashboardDomainModel } from '@/modules/superadmin/dashboard/types/dashboard.interfaces';
import { DashboardResponseDto } from '@/modules/superadmin/dashboard/responses/dashboard-response.dto';

export class DashboardMapper {
  /** Maps a persistence entity to the domain representation. */
  static toDomain(entity: DashboardSnapshotEntity): DashboardDomainModel { return { ...entity } as DashboardDomainModel; }

  /** Maps persistence entities to domain representations. */
  static toDomainList(entities: DashboardSnapshotEntity[]): DashboardDomainModel[] { return entities.map(DashboardMapper.toDomain); }

  static toResponse(domain: DashboardDomainModel): DashboardResponseDto {
    const dto = new DashboardResponseDto();
    Object.assign(dto, domain);
    return dto;
  }
}
