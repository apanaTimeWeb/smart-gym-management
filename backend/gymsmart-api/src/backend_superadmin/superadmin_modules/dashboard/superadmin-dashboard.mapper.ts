// RESPONSIBILITY: Maps Dashboard ORM entities into domain-safe response data.
// FLOW: TypeORM entity -> SuperadminDashboardMapper -> domain model -> response DTO.
import { SuperadminDashboardResponseDto } from '@/backend_superadmin/superadmin_modules/dashboard/responses/superadmin-dashboard-response.dto';
import type { SuperadminDashboardEntity } from '@/backend_superadmin/superadmin_modules/dashboard/superadmin-dashboard.entity';
import type { SuperadminDashboardDomainModel } from '@/backend_superadmin/superadmin_modules/dashboard/types/superadmin-dashboard.interfaces';

export class SuperadminDashboardMapper {
  /** Maps a persistence entity to the domain representation. */
  static toDomain(entity: SuperadminDashboardEntity): SuperadminDashboardDomainModel { return { ...entity } as SuperadminDashboardDomainModel; }

  /** Maps persistence entities to domain representations. */
  static toDomainList(entities: SuperadminDashboardEntity[]): SuperadminDashboardDomainModel[] { return entities.map(SuperadminDashboardMapper.toDomain); }

  static toResponse(domain: SuperadminDashboardDomainModel): SuperadminDashboardResponseDto {
    const dto = new SuperadminDashboardResponseDto();
    Object.assign(dto, domain);
    return dto;
  }
}