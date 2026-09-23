// RESPONSIBILITY: Maps Reports ORM entities into domain-safe response data.
// FLOW: TypeORM entity -> SuperadminReportsMapper -> domain model -> response DTO.
import type { SuperadminReportsEntity } from '@/backend_superadmin/superadmin_modules/reports/superadmin-reports.entity';
import type { SuperadminReportsDomainModel } from '@/backend_superadmin/superadmin_modules/reports/types/superadmin-reports.interfaces';

export class SuperadminReportsMapper {
  /** Maps a persistence entity to the domain representation. */
  static toDomain(entity: SuperadminReportsEntity): SuperadminReportsDomainModel { return { ...entity } as SuperadminReportsDomainModel; }

  /** Maps persistence entities to domain representations. */
  static toDomainList(entities: SuperadminReportsEntity[]): SuperadminReportsDomainModel[] { return entities.map(SuperadminReportsMapper.toDomain); }
}
