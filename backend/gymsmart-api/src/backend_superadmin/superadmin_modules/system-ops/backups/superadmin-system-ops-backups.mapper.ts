// RESPONSIBILITY: Maps Backups ORM entities into domain-safe response data.
// FLOW: TypeORM entity -> SuperadminSystemOpsBackupsMapper -> domain model -> response DTO.
import type { SuperadminSystemOpsBackupsEntity } from '@/backend_superadmin/superadmin_modules/system-ops/backups/superadmin-system-ops-backups.entity';
import type { SuperadminBackupsDomainModel } from '@/backend_superadmin/superadmin_modules/system-ops/backups/backups_types/superadmin-system-ops-backups.interfaces';

/**
 * Primary Intent: Defines SuperadminSystemOpsBackupsMapper as the class-level contract for superadmin-system-ops-backups.mapper.ts.
 * Edge Cases: Preserve exact exported names, field shapes, enum values, nullability, and module isolation when changing this construct.
 * Side-Effects: None unless the construct is explicitly a persistence, adapter, queue, or event boundary.
 * AI-Note: Treat this declaration as an architectural contract; do not move business logic into generic/shared folders or introduce undocumented fields.
 */
export class SuperadminSystemOpsBackupsMapper {
  /** Maps a persistence entity to the domain representation. */
  static toDomain(entity: SuperadminSystemOpsBackupsEntity): SuperadminBackupsDomainModel { return { ...entity } as SuperadminBackupsDomainModel; }

  /** Maps persistence entities to domain representations. */
  static toDomainList(entities: SuperadminSystemOpsBackupsEntity[]): SuperadminBackupsDomainModel[] { return entities.map(SuperadminSystemOpsBackupsMapper.toDomain); }
}
