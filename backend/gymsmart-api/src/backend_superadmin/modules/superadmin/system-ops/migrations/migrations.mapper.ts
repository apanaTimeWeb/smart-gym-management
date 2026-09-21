// RESPONSIBILITY: Maps Migrations ORM entities into domain-safe response data.
// FLOW: TypeORM entity -> MigrationsMapper -> domain model -> response DTO.
import type { MigrationLogEntity } from '@/backend_superadmin/modules/superadmin/system-ops/migrations/migrations.entity';
import type { MigrationsDomainModel } from '@/backend_superadmin/modules/superadmin/system-ops/migrations/types/migrations.interfaces';

export class MigrationsMapper {
  /** Maps a persistence entity to the domain representation. */
  static toDomain(entity: MigrationLogEntity): MigrationsDomainModel { return { ...entity } as MigrationsDomainModel; }

  /** Maps persistence entities to domain representations. */
  static toDomainList(entities: MigrationLogEntity[]): MigrationsDomainModel[] { return entities.map(MigrationsMapper.toDomain); }
}
