// RESPONSIBILITY: Maps Backups ORM entities into domain-safe response data.
// FLOW: TypeORM entity -> BackupsMapper -> domain model -> response DTO.
import type { BackupsEntity } from '@/backend_superadmin/modules/superadmin/system-ops/backups/backups.entity';
import type { BackupsDomainModel } from '@/backend_superadmin/modules/superadmin/system-ops/backups/types/backups.interfaces';

export class BackupsMapper {
  /** Maps a persistence entity to the domain representation. */
  static toDomain(entity: BackupsEntity): BackupsDomainModel { return { ...entity } as BackupsDomainModel; }

  /** Maps persistence entities to domain representations. */
  static toDomainList(entities: BackupsEntity[]): BackupsDomainModel[] { return entities.map(BackupsMapper.toDomain); }
}
