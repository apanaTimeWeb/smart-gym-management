// RESPONSIBILITY: Maps Reports ORM entities into domain-safe response data.
// FLOW: TypeORM entity -> SuperadminReportsMapper -> domain model -> response DTO.
import type { SuperadminReportsEntity } from '@/backend_superadmin/superadmin_modules/reports/superadmin-reports.entity';
import type { SuperadminReportsDomainModel } from '@/backend_superadmin/superadmin_modules/reports/reports_types/superadmin-reports.interfaces';

/**
 * Primary Intent: Defines SuperadminReportsMapper as the class-level contract for superadmin-reports.mapper.ts.
 * Edge Cases: Preserve exact exported names, field shapes, enum values, nullability, and module isolation when changing this construct.
 * Side-Effects: None unless the construct is explicitly a persistence, adapter, queue, or event boundary.
 * AI-Note: Treat this declaration as an architectural contract; do not move business logic into generic/shared folders or introduce undocumented fields.
 */
export class SuperadminReportsMapper {
  /** Maps a persistence entity to the domain representation. */
  static toDomain(entity: SuperadminReportsEntity): SuperadminReportsDomainModel { return { ...entity } as SuperadminReportsDomainModel; }

  /** Maps persistence entities to domain representations. */
  static toDomainList(entities: SuperadminReportsEntity[]): SuperadminReportsDomainModel[] { return entities.map(SuperadminReportsMapper.toDomain); }
}
