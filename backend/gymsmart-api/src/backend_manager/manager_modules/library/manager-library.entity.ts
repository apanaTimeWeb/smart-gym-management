// RESPONSIBILITY: Owns the backend application database entity boundary.
// FLOW: Domain persistence contract → ORM metadata → tenant database table with soft-delete lifecycle.
import { Check, Column, Entity, Index } from 'typeorm';

import { CoreBaseEntity } from '@/backend_manager/manager_core/manager_core_database/manager-core-base.entity';

import { LibraryRecordStatus } from '@/backend_manager/manager_modules/library/manager-library.constants';

@Entity('manager_libraries')
@Check('CHK_manager_library_payload_object', "jsonb_typeof(payload) = 'object'")
@Index('IDX_manager_library_created_at', ['createdAt'])
@Index('IDX_manager_library_updated_at', ['updatedAt'])
@Index('IDX_manager_library_status', ['status'])
export class ManagerLibraryEntity extends CoreBaseEntity {
  @Column({ type: 'jsonb', name: 'payload', default: () => "'{}'::jsonb" })
  payload!: import('@/backend_manager/manager_core/manager_core_types/manager-core-json-value.types').ManagerCoreJsonObject;

  @Column({ type: 'enum', enum: LibraryRecordStatus, enumName: 'manager_library_status_enum', name: 'status', default: LibraryRecordStatus.ACTIVE })
  status!: LibraryRecordStatus;
}

export { ManagerLibraryEntity as LibraryEntity };
