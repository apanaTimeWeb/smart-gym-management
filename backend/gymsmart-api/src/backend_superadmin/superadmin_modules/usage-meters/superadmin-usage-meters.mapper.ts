// RESPONSIBILITY: Maps UsageMeters ORM entities into domain-safe response data.
// FLOW: TypeORM entity -> SuperadminUsageMetersMapper -> domain model -> response DTO.
import type { SuperadminUsageMetersEntity } from '@/backend_superadmin/superadmin_modules/usage-meters/superadmin-usage-meters.entity';
import type { SuperadminUsageMetersDomainModel } from '@/backend_superadmin/superadmin_modules/usage-meters/usage-meters_types/superadmin-usage-meters.interfaces';

/**
 * Primary Intent: Defines SuperadminUsageMetersMapper as the class-level contract for superadmin-usage-meters.mapper.ts.
 * Edge Cases: Preserve exact exported names, field shapes, enum values, nullability, and module isolation when changing this construct.
 * Side-Effects: None unless the construct is explicitly a persistence, adapter, queue, or event boundary.
 * AI-Note: Treat this declaration as an architectural contract; do not move business logic into generic/shared folders or introduce undocumented fields.
 */
export class SuperadminUsageMetersMapper {
  /** Maps a persistence entity to the domain representation. */
  static toDomain(entity: SuperadminUsageMetersEntity): SuperadminUsageMetersDomainModel { return { ...entity } as SuperadminUsageMetersDomainModel; }

  /** Maps persistence entities to domain representations. */
  static toDomainList(entities: SuperadminUsageMetersEntity[]): SuperadminUsageMetersDomainModel[] { return entities.map(SuperadminUsageMetersMapper.toDomain); }
}
