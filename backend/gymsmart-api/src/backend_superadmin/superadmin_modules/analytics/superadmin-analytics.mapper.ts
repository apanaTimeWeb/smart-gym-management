// RESPONSIBILITY: Maps Analytics ORM entities into domain-safe response data.
// FLOW: TypeORM entity -> SuperadminAnalyticsMapper -> domain model -> response DTO.
import { SuperadminAnalyticsResponseDto } from '@/backend_superadmin/superadmin_modules/analytics/analytics_responses/superadmin-analytics-response.dto';
import type { SuperadminAnalyticsEntity } from '@/backend_superadmin/superadmin_modules/analytics/superadmin-analytics.entity';
import type { SuperadminAnalyticsDomainModel } from '@/backend_superadmin/superadmin_modules/analytics/analytics_types/superadmin-analytics.interfaces';

/**
 * Primary Intent: Defines SuperadminAnalyticsMapper as the class-level contract for superadmin-analytics.mapper.ts.
 * Edge Cases: Preserve exact exported names, field shapes, enum values, nullability, and module isolation when changing this construct.
 * Side-Effects: None unless the construct is explicitly a persistence, adapter, queue, or event boundary.
 * AI-Note: Treat this declaration as an architectural contract; do not move business logic into generic/shared folders or introduce undocumented fields.
 */
export class SuperadminAnalyticsMapper {
  /** Maps a persistence entity to the domain representation. */
  static toDomain(entity: SuperadminAnalyticsEntity): SuperadminAnalyticsDomainModel { return { ...entity } as SuperadminAnalyticsDomainModel; }

  /** Maps persistence entities to domain representations. */
  static toDomainList(entities: SuperadminAnalyticsEntity[]): SuperadminAnalyticsDomainModel[] { return entities.map(SuperadminAnalyticsMapper.toDomain); }

  /**
 * Primary Intent: Maps this module domain/projection into the stable API response DTO.
 * Edge Cases: Preserve exact field names, nullability, and enum semantics.
 * Side-Effects: Pure mapping only; no persistence or external side effects.
 * AI-Note: Do not add business logic or database access to this mapper.
 */

  static toResponse(domain: SuperadminAnalyticsDomainModel): SuperadminAnalyticsResponseDto {
    const dto = new SuperadminAnalyticsResponseDto();
    Object.assign(dto, domain.payload);
    return dto;
  }
}
