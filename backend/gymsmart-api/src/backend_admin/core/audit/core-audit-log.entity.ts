// RESPONSIBILITY: Maps immutable audit trail records stored in each tenant database.
// FLOW: Mutation boundary â†’ CoreAuditTrailService â†’ audit_logs table.

import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Entity('audit_logs')
@Index('IDX_audit_logs_timestamp', ['timestamp'])
@Index('IDX_audit_logs_entity', ['entityType', 'entityId'])
@Index('IDX_audit_logs_actor', ['actorId'])
export class CoreAuditLogEntity {
  @PrimaryGeneratedColumn('uuid', { primaryKeyConstraintName: 'PK_audit_logs' })
  id!: string;

  @Column({ name: 'actor_id', type: 'uuid', nullable: true })
  actorId!: string | null;
  @Column({ name: 'actor_role', type: 'varchar', length: 32, nullable: true })
  actorRole!: string | null;
  @Column({ name: 'action', type: 'varchar', length: 120 })
  action!: string;
  @Column({ name: 'entity_type', type: 'varchar', length: 120 })
  entityType!: string;
  @Column({ name: 'entity_id', type: 'uuid', nullable: true })
  entityId!: string | null;
  @Column({ name: 'old_value', type: 'jsonb', nullable: true })
  oldValue!: unknown;
  @Column({ name: 'new_value', type: 'jsonb', nullable: true })
  newValue!: unknown;
  @Column({ name: 'ip_address', type: 'inet', nullable: true })
  ipAddress!: string | null;
  @Column({ name: 'module', type: 'varchar', length: 120, nullable: true })
  module!: string | null;
  @Column({ name: 'severity', type: 'varchar', length: 16, default: 'low' })
  severity!: string;
  @Column({ name: 'timestamp', type: 'timestamptz', default: () => 'now()' })
  timestamp!: Date;
}
