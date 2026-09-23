// RESPONSIBILITY: Maps Dashboard ORM entities into domain-safe response data.
// FLOW: TypeORM entity -> DashboardMapper -> domain model -> response DTO.
import { DashboardResponseDto } from '@/backend_superadmin/modules/backend_superadmin/dashboard/responses/dashboard-response.dto';
import type { DashboardEntity } from '@/backend_superadmin/modules/backend_superadmin/dashboard/dashboard.entity';
import type { DashboardDomainModel } from '@/backend_superadmin/modules/backend_superadmin/dashboard/types/dashboard.interfaces';

export class DashboardMapper {
  /** Maps a persistence entity to the domain representation. */
  static toDomain(entity: DashboardEntity): DashboardDomainModel { return { ...entity } as DashboardDomainModel; }

  /** Maps persistence entities to domain representations. */
  static toDomainList(entities: DashboardEntity[]): DashboardDomainModel[] { return entities.map(DashboardMapper.toDomain); }

  static toResponse(domain: DashboardDomainModel): DashboardResponseDto {
    const dto = new DashboardResponseDto();
    Object.assign(dto, domain);
    return dto;
  }
}