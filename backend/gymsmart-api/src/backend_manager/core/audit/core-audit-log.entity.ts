// RESPONSIBILITY: Cross-cutting audit persistence mapping for critical state changes.
// FLOW: Feature transaction → audit row → commit → immutable operational history.
import { Column, Entity, Index } from 'typeorm';

import { CoreBaseEntity } from '@/backend_manager/core/database/core-base.entity';
import { CoreRole } from '@/backend_manager/core/auth/core-role.constants';

@Entity({ name: 'audit_logs' })
@Index('IDX_audit_logs_entity', ['entityType', 'entityId'])
@Index('IDX_audit_logs_actor', ['actorId'])
export class CoreAuditLogEntity extends CoreBaseEntity {
  @Column({ name: 'actor_id', type: 'uuid' }) actorId!: string;
  @Column({ name: 'actor_role', type: 'enum', enum: CoreRole }) actorRole!: CoreRole;
  @Column({ type: 'varchar', length: 80 }) action!: string;
  @Column({ name: 'entity_type', type: 'varchar', length: 80 }) entityType!: string;
  @Column({ name: 'entity_id', type: 'uuid' }) entityId!: string;
  @Column({ name: 'old_value', type: 'jsonb', nullable: true }) oldValue!: Record<string, unknown> | null;
  @Column({ name: 'new_value', type: 'jsonb', nullable: true }) newValue!: Record<string, unknown> | null;
  @Column({ name: 'ip_address', type: 'varchar', length: 64, nullable: true }) ipAddress!: string | null;
}
