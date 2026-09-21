// RESPONSIBILITY: Maps Reports ORM entities into domain-safe response data.
// FLOW: TypeORM entity -> ReportsMapper -> domain model -> response DTO.
import type { ReportSnapshotEntity } from '@/backend_superadmin/modules/superadmin/reports/reports.entity';
import type { ReportsDomainModel } from '@/backend_superadmin/modules/superadmin/reports/types/reports.interfaces';

export class ReportsMapper {
  /** Maps a persistence entity to the domain representation. */
  static toDomain(entity: ReportSnapshotEntity): ReportsDomainModel { return { ...entity } as ReportsDomainModel; }

  /** Maps persistence entities to domain representations. */
  static toDomainList(entities: ReportSnapshotEntity[]): ReportsDomainModel[] { return entities.map(ReportsMapper.toDomain); }
}
