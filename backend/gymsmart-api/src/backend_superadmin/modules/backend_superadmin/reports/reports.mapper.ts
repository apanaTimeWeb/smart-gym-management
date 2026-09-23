// RESPONSIBILITY: Maps Reports ORM entities into domain-safe response data.
// FLOW: TypeORM entity -> ReportsMapper -> domain model -> response DTO.
import type { ReportsEntity } from '@/backend_superadmin/modules/backend_superadmin/reports/reports.entity';
import type { ReportsDomainModel } from '@/backend_superadmin/modules/backend_superadmin/reports/types/reports.interfaces';

export class ReportsMapper {
  /** Maps a persistence entity to the domain representation. */
  static toDomain(entity: ReportsEntity): ReportsDomainModel { return { ...entity } as ReportsDomainModel; }

  /** Maps persistence entities to domain representations. */
  static toDomainList(entities: ReportsEntity[]): ReportsDomainModel[] { return entities.map(ReportsMapper.toDomain); }
}
