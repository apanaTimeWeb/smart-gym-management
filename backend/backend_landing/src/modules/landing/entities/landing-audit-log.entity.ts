// RESPONSIBILITY: Maps immutable business activity records into the tenant audit_logs table.
// FLOW: Repository mutation → AuditLogRepository → audit_logs.
import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';
import { CoreBaseEntity } from '@/core/database/base.entity';
import { LandingAuditActorRole } from '@/modules/landing/enums/landing-audit-actor-role.enum';

@Entity('audit_logs')
@Index('IDX_audit_logs_entity', ['entityType', 'entityId'])
export class LandingAuditLogEntity extends CoreBaseEntity {
  @PrimaryGeneratedColumn('uuid', { primaryKeyConstraintName: 'PK_audit_logs' })
  declare id: string;

  @Column({ name: 'actor_id', type: 'uuid', nullable: true })
  actorId!: string | null;

  @Column({ name: 'actor_role', type: 'enum', enum: LandingAuditActorRole, enumName: 'landing_audit_actor_role' })
  actorRole!: LandingAuditActorRole;

  @Column({ length: 120 })
  action!: string;

  @Column({ name: 'entity_type', length: 120 })
  entityType!: string;

  @Column({ name: 'entity_id', type: 'uuid' })
  entityId!: string;

  @Column({ name: 'old_value', type: 'jsonb', nullable: true })
  oldValue!: Record<string, unknown> | null;

  @Column({ name: 'new_value', type: 'jsonb', nullable: true })
  newValue!: Record<string, unknown> | null;

  @Column({ name: 'ip_address', type: 'inet', nullable: true })
  ipAddress!: string | null;
}
