// RESPONSIBILITY: TypeORM tenant-database mapping for Manager library.
// FLOW: Repository -> LibraryEntity -> PostgreSQL manager_library.
import { Check, Column, Entity, Index } from 'typeorm';

import { CoreBaseEntity } from '@/core/database/core-base.entity';
import { LibraryRecordStatus } from '@/modules/manager/library/library.constants';

@Entity('manager_library')
@Check('CHK_manager_library_payload_object', "jsonb_typeof(payload) = 'object'")
@Index('IDX_manager_library_created_at', ['createdAt'])
@Index('IDX_manager_library_updated_at', ['updatedAt'])
@Index('IDX_manager_library_status', ['status'])
export class LibraryEntity extends CoreBaseEntity {
  @Column({ type: 'jsonb', name: 'payload', default: () => "'{}'::jsonb" })
  payload!: import('@/core/types/json-value.types').CoreJsonObject;

  @Column({ type: 'enum', enum: LibraryRecordStatus, enumName: 'manager_library_status_enum', name: 'status', default: LibraryRecordStatus.ACTIVE })
  status!: LibraryRecordStatus;
}
