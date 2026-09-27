// RESPONSIBILITY: Owns backend core database entity boundary.
// FLOW: Domain persistence contract → ORM metadata → tenant database table with soft-delete lifecycle.
import { Column, Entity, Index } from 'typeorm';

import { ManagerCoreRole } from '@/backend_manager/manager_core/manager_core_auth/manager-core-role.constants';
import { CoreBaseEntity } from '@/backend_manager/manager_core/manager_core_database/manager-core-base.entity';

@Entity({ name: 'audit_logs' })
@Index('IDX_audit_logs_entity', ['entityType', 'entityId'])
@Index('IDX_audit_logs_actor', ['actorId'])
export class ManagerCoreAuditLogEntity extends CoreBaseEntity {
  @Column({ name: 'actor_id', type: 'uuid' }) actorId!: string;
  @Column({ name: 'actor_role', type: 'enum', enum: ManagerCoreRole }) actorRole!: ManagerCoreRole;
  @Column({ type: 'varchar', length: 80 }) action!: string;
  @Column({ name: 'entity_type', type: 'varchar', length: 80 }) entityType!: string;
  @Column({ name: 'entity_id', type: 'uuid' }) entityId!: string;
  @Column({ name: 'old_value', type: 'jsonb', nullable: true }) oldValue!: Record<string, unknown> | null;
  @Column({ name: 'new_value', type: 'jsonb', nullable: true }) newValue!: Record<string, unknown> | null;
  @Column({ name: 'ip_address', type: 'varchar', length: 64, nullable: true }) ipAddress!: string | null;
}
