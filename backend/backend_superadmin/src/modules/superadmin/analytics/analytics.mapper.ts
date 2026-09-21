// RESPONSIBILITY: Maps Analytics ORM entities into domain-safe response data.
// FLOW: TypeORM entity -> AnalyticsMapper -> domain model -> response DTO.
import type { AnalyticsSnapshotEntity } from '@/modules/superadmin/analytics/analytics.entity';
import type { AnalyticsDomainModel } from '@/modules/superadmin/analytics/types/analytics.interfaces';
import { AnalyticsResponseDto } from '@/modules/superadmin/analytics/responses/analytics-response.dto';

export class AnalyticsMapper {
  /** Maps a persistence entity to the domain representation. */
  static toDomain(entity: AnalyticsSnapshotEntity): AnalyticsDomainModel { return { ...entity } as AnalyticsDomainModel; }

  /** Maps persistence entities to domain representations. */
  static toDomainList(entities: AnalyticsSnapshotEntity[]): AnalyticsDomainModel[] { return entities.map(AnalyticsMapper.toDomain); }

  static toResponse(domain: AnalyticsDomainModel): AnalyticsResponseDto {
    const dto = new AnalyticsResponseDto();
    Object.assign(dto, domain.payload);
    return dto;
  }
}
