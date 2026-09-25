// RESPONSIBILITY: Maps Migrations ORM entities into domain-safe response data.
// FLOW: TypeORM entity -> SuperadminSystemOpsMigrationsMapper -> domain model -> response DTO.
import type { SuperadminSystemOpsMigrationsEntity } from '@/backend_superadmin/superadmin_modules/system-ops/migrations/superadmin-system-ops-migrations.entity';
import type { SuperadminMigrationsDomainModel } from '@/backend_superadmin/superadmin_modules/system-ops/migrations/migrations_types/superadmin-system-ops-migrations.interfaces';

/**
 * Primary Intent: Defines SuperadminSystemOpsMigrationsMapper as the class-level contract for superadmin-system-ops-migrations.mapper.ts.
 * Edge Cases: Preserve exact exported names, field shapes, enum values, nullability, and module isolation when changing this construct.
 * Side-Effects: None unless the construct is explicitly a persistence, adapter, queue, or event boundary.
 * AI-Note: Treat this declaration as an architectural contract; do not move business logic into generic/shared folders or introduce undocumented fields.
 */
export class SuperadminSystemOpsMigrationsMapper {
  /** Maps a persistence entity to the domain representation. */
  static toDomain(entity: SuperadminSystemOpsMigrationsEntity): SuperadminMigrationsDomainModel { return { ...entity } as SuperadminMigrationsDomainModel; }

  /** Maps persistence entities to domain representations. */
  static toDomainList(entities: SuperadminSystemOpsMigrationsEntity[]): SuperadminMigrationsDomainModel[] { return entities.map(SuperadminSystemOpsMigrationsMapper.toDomain); }
}
