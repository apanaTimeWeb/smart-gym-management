// RESPONSIBILITY: Maps Backups ORM entities into domain-safe response data.
// FLOW: TypeORM entity -> BackupsMapper -> domain model -> response DTO.
import type { BackupRecordEntity } from '@/backend_superadmin/modules/superadmin/system-ops/backups/backups.entity';
import type { BackupsDomainModel } from '@/backend_superadmin/modules/superadmin/system-ops/backups/types/backups.interfaces';

export class BackupsMapper {
  /** Maps a persistence entity to the domain representation. */
  static toDomain(entity: BackupRecordEntity): BackupsDomainModel { return { ...entity } as BackupsDomainModel; }

  /** Maps persistence entities to domain representations. */
  static toDomainList(entities: BackupRecordEntity[]): BackupsDomainModel[] { return entities.map(BackupsMapper.toDomain); }
}
