// RESPONSIBILITY: Stores master-database audit records for authentication and platform billing mutations.
// FLOW: Master transaction -> AdminCoreAuditTrailService -> master audit_logs.
import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

import { AdminCoreAuditSeverity } from '@/backend_admin/admin_core/admin_core_audit/admin-core-audit.constants'

@Entity('audit_logs')
@Index('IDX_audit_logs_timestamp', ['timestamp'])
@Index('IDX_audit_logs_entity', ['entityType', 'entityId'])
@Index('IDX_audit_logs_actor', ['actorId'])
/**
 * @description Defines the AdminCoreMasterAuditLogEntity boundary for the admin_core_audit backend feature.
 * @remarks Keep this class focused on its declared responsibility; preserve tenant, contract, security, and AI-context invariants when modifying it.
 */
export class AdminCoreMasterAuditLogEntity {
  @PrimaryGeneratedColumn('uuid', { primaryKeyConstraintName: 'PK_audit_logs' }) id!: string;
  @Column({ name: 'actor_id', type: 'uuid', nullable: true }) actorId!: string | null;
  @Column({ name: 'actor_role', type: 'varchar', length: 32, nullable: true }) actorRole!: string | null;
  @Column({ name: 'action', type: 'varchar', length: 120 }) action!: string;
  @Column({ name: 'entity_type', type: 'varchar', length: 120 }) entityType!: string;
  @Column({ name: 'entity_id', type: 'uuid', nullable: true }) entityId!: string | null;
  @Column({ name: 'old_value', type: 'jsonb', nullable: true }) oldValue!: unknown;
  @Column({ name: 'new_value', type: 'jsonb', nullable: true }) newValue!: unknown;
  @Column({ name: 'ip_address', type: 'inet', nullable: true }) ipAddress!: string | null;
   @Column({ name: 'user_agent', type: 'varchar', length: 512, nullable: true })
  userAgent!: string | null;
 @Column({ name: 'module', type: 'varchar', length: 120, nullable: true }) module!: string | null;
  @Column({ name: 'severity', type: 'varchar', length: 20, default: 'LOW' }) severity!: AdminCoreAuditSeverity;
  @Column({ name: 'timestamp', type: 'timestamptz', default: () => 'now()' }) timestamp!: Date;
}
