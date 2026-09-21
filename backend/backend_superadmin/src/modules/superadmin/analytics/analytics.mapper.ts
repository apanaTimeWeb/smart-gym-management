// RESPONSIBILITY: Maps Analytics ORM entities into domain-safe response data.
// FLOW: TypeORM entity -> AnalyticsMapper -> domain model -> response DTO.
import type { AnalyticsSnapshotEntity } from '@/modules/superadmin/analytics/analytics.entity';
import type { AnalyticsDomainModel } from '@/modules/superadmin/analytics/types/analytics.interfaces';

export class AnalyticsMapper {
  /** Maps a persistence entity to the domain representation. */
  static toDomain(entity: AnalyticsSnapshotEntity): AnalyticsDomainModel { return { ...entity } as AnalyticsDomainModel; }

  /** Maps persistence entities to domain representations. */
  static toDomainList(entities: AnalyticsSnapshotEntity[]): AnalyticsDomainModel[] { return entities.map(AnalyticsMapper.toDomain); }
}
