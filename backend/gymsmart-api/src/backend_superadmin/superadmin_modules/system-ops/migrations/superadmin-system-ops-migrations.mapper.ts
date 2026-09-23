// RESPONSIBILITY: Maps Migrations ORM entities into domain-safe response data.
// FLOW: TypeORM entity -> SuperadminMigrationsMapper -> domain model -> response DTO.
import type { SuperadminMigrationsEntity } from '@/backend_superadmin/superadmin_modules/system-ops/migrations/superadmin-system-ops-migrations.entity';
import type { SuperadminMigrationsDomainModel } from '@/backend_superadmin/superadmin_modules/system-ops/migrations/types/superadmin-system-ops-migrations.interfaces';

export class SuperadminMigrationsMapper {
  /** Maps a persistence entity to the domain representation. */
  static toDomain(entity: SuperadminMigrationsEntity): SuperadminMigrationsDomainModel { return { ...entity } as SuperadminMigrationsDomainModel; }

  /** Maps persistence entities to domain representations. */
  static toDomainList(entities: SuperadminMigrationsEntity[]): SuperadminMigrationsDomainModel[] { return entities.map(SuperadminMigrationsMapper.toDomain); }
}
