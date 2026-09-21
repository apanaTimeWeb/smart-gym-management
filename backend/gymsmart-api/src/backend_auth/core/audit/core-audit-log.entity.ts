// RESPONSIBILITY: Persists audit records for meaningful security and business state changes without storing secrets.
// FLOW: Feature service/orchestrator -> CoreAuditLogRepository -> audit_logs.

import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

import { CoreAuditActorRole } from '@/backend_auth/core/audit/core-audit.constants';
import { CoreBaseEntity } from '@/backend_auth/core/database/core-base-entity';
@Entity('audit_logs')
@Index('IDX_audit_logs_entity_type_entity_id', ['entityType', 'entityId'])
@Index('IDX_audit_logs_actor_id_created_at', ['actorId', 'createdAt'])
export class CoreAuditLogEntity extends CoreBaseEntity {
  @PrimaryGeneratedColumn('uuid', { primaryKeyConstraintName: 'PK_audit_logs' })
  id!: string;

  @Column({ name: 'actor_id', type: 'uuid', nullable: true }) actorId!: string | null;
  @Column({ name: 'actor_role', type: 'enum', enum: CoreAuditActorRole, enumName: 'core_audit_logs_actor_role_enum', nullable: true }) actorRole!: CoreAuditActorRole | null;
  @Column({ name: 'action', type: 'varchar', length: 150 }) action!: string;
  @Column({ name: 'entity_type', type: 'varchar', length: 150 }) entityType!: string;
  @Column({ name: 'entity_id', type: 'uuid', nullable: true }) entityId!: string | null;
  @Column({ name: 'old_value', type: 'jsonb', nullable: true }) oldValue!: Record<string, unknown> | null;
  @Column({ name: 'new_value', type: 'jsonb', nullable: true }) newValue!: Record<string, unknown> | null;
  @Column({ name: 'ip_address', type: 'inet', nullable: true }) ipAddress!: string | null;
  @Column({ name: 'request_id', type: 'uuid', nullable: true }) requestId!: string | null;
  @Column({ name: 'trace_id', type: 'varchar', length: 64, nullable: true }) traceId!: string | null;
}
