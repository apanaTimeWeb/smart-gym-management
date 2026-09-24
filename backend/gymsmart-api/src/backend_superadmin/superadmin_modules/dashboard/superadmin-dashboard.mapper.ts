// RESPONSIBILITY: Maps Dashboard ORM entities into domain-safe response data.
// FLOW: TypeORM entity -> SuperadminDashboardMapper -> domain model -> response DTO.
import { SuperadminDashboardResponseDto } from '@/backend_superadmin/superadmin_modules/dashboard/dashboard_responses/superadmin-dashboard-response.dto';
import type { SuperadminDashboardEntity } from '@/backend_superadmin/superadmin_modules/dashboard/superadmin-dashboard.entity';
import type { SuperadminDashboardDomainModel } from '@/backend_superadmin/superadmin_modules/dashboard/dashboard_types/superadmin-dashboard.interfaces';

/**
 * Primary Intent: Defines SuperadminDashboardMapper as the class-level contract for superadmin-dashboard.mapper.ts.
 * Edge Cases: Preserve exact exported names, field shapes, enum values, nullability, and module isolation when changing this construct.
 * Side-Effects: None unless the construct is explicitly a persistence, adapter, queue, or event boundary.
 * AI-Note: Treat this declaration as an architectural contract; do not move business logic into generic/shared folders or introduce undocumented fields.
 */
export class SuperadminDashboardMapper {
  /** Maps a persistence entity to the domain representation. */
  static toDomain(entity: SuperadminDashboardEntity): SuperadminDashboardDomainModel { return { ...entity } as SuperadminDashboardDomainModel; }

  /** Maps persistence entities to domain representations. */
  static toDomainList(entities: SuperadminDashboardEntity[]): SuperadminDashboardDomainModel[] { return entities.map(SuperadminDashboardMapper.toDomain); }

  /**
 * Primary Intent: Maps this module domain/projection into the stable API response DTO.
 * Edge Cases: Preserve exact field names, nullability, and enum semantics.
 * Side-Effects: Pure mapping only; no persistence or external side effects.
 * AI-Note: Do not add business logic or database access to this mapper.
 */

  static toResponse(domain: SuperadminDashboardDomainModel): SuperadminDashboardResponseDto {
    const dto = new SuperadminDashboardResponseDto();
    Object.assign(dto, domain);
    return dto;
  }
}
