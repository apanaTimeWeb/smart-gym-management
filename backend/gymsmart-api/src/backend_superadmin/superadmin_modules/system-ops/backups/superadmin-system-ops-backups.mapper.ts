// RESPONSIBILITY: Maps Backups ORM entities into domain-safe response data.
// FLOW: TypeORM entity -> SuperadminBackupsMapper -> domain model -> response DTO.
import type { SuperadminBackupsEntity } from '@/backend_superadmin/superadmin_modules/system-ops/backups/superadmin-system-ops-backups.entity';
import type { SuperadminBackupsDomainModel } from '@/backend_superadmin/superadmin_modules/system-ops/backups/types/superadmin-system-ops-backups.interfaces';

export class SuperadminBackupsMapper {
  /** Maps a persistence entity to the domain representation. */
  static toDomain(entity: SuperadminBackupsEntity): SuperadminBackupsDomainModel { return { ...entity } as SuperadminBackupsDomainModel; }

  /** Maps persistence entities to domain representations. */
  static toDomainList(entities: SuperadminBackupsEntity[]): SuperadminBackupsDomainModel[] { return entities.map(SuperadminBackupsMapper.toDomain); }
}
