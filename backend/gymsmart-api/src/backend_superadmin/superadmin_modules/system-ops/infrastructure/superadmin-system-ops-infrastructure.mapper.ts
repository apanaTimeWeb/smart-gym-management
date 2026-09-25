// RESPONSIBILITY: Maps Infrastructure ORM entities into domain-safe response data.
// FLOW: TypeORM entity -> SuperadminSystemOpsInfrastructureMapper -> domain model -> response DTO.
import type { SuperadminSystemOpsInfrastructureEntity } from '@/backend_superadmin/superadmin_modules/system-ops/infrastructure/superadmin-system-ops-infrastructure.entity';
import type { SuperadminInfrastructureDomainModel } from '@/backend_superadmin/superadmin_modules/system-ops/infrastructure/infrastructure_types/superadmin-system-ops-infrastructure.interfaces';

/**
 * Primary Intent: Defines SuperadminSystemOpsInfrastructureMapper as the class-level contract for superadmin-system-ops-infrastructure.mapper.ts.
 * Edge Cases: Preserve exact exported names, field shapes, enum values, nullability, and module isolation when changing this construct.
 * Side-Effects: None unless the construct is explicitly a persistence, adapter, queue, or event boundary.
 * AI-Note: Treat this declaration as an architectural contract; do not move business logic into generic/shared folders or introduce undocumented fields.
 */
export class SuperadminSystemOpsInfrastructureMapper {
  /** Maps a persistence entity to the domain representation. */
  static toDomain(entity: SuperadminSystemOpsInfrastructureEntity): SuperadminInfrastructureDomainModel { return { ...entity } as SuperadminInfrastructureDomainModel; }

  /** Maps persistence entities to domain representations. */
  static toDomainList(entities: SuperadminSystemOpsInfrastructureEntity[]): SuperadminInfrastructureDomainModel[] { return entities.map(SuperadminSystemOpsInfrastructureMapper.toDomain); }
}
