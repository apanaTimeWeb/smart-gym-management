// RESPONSIBILITY: Maps Analytics ORM entities into domain-safe response data.
// FLOW: TypeORM entity -> SuperadminAnalyticsMapper -> domain model -> response DTO.
import { SuperadminAnalyticsResponseDto } from '@/backend_superadmin/superadmin_modules/analytics/responses/superadmin-analytics-response.dto';
import type { SuperadminAnalyticsEntity } from '@/backend_superadmin/superadmin_modules/analytics/superadmin-analytics.entity';
import type { SuperadminAnalyticsDomainModel } from '@/backend_superadmin/superadmin_modules/analytics/types/superadmin-analytics.interfaces';

export class SuperadminAnalyticsMapper {
  /** Maps a persistence entity to the domain representation. */
  static toDomain(entity: SuperadminAnalyticsEntity): SuperadminAnalyticsDomainModel { return { ...entity } as SuperadminAnalyticsDomainModel; }

  /** Maps persistence entities to domain representations. */
  static toDomainList(entities: SuperadminAnalyticsEntity[]): SuperadminAnalyticsDomainModel[] { return entities.map(SuperadminAnalyticsMapper.toDomain); }

  static toResponse(domain: SuperadminAnalyticsDomainModel): SuperadminAnalyticsResponseDto {
    const dto = new SuperadminAnalyticsResponseDto();
    Object.assign(dto, domain.payload);
    return dto;
  }
}