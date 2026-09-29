// RESPONSIBILITY: Maps immutable business activity records into the tenant audit_logs table.
// FLOW: Repository mutation â†’ AuditLogRepository â†’ audit_logs.
import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

import { LandingBaseEntity } from '@/backend_landing/landing_core/landing_database/landing-base.entity';

import { LandingAuditActorRole } from '@/backend_landing/landing_modules/landing/landing_enums/landing-audit-actor-role.enum';


/**
 * Intent: Defines the LandingAuditLogEntity class boundary for this supplied Landing backend scope.
 * Edge Cases: Invalid inputs and infrastructure failures are handled by the owning boundary.
 * Side Effects: None beyond the behavior implemented by this class.
 * AI Notes: Preserve the class responsibility and dependency direction documented by the module.
 */
@Entity('audit_logs')
@Index('IDX_audit_logs_entity', ['entityType', 'entityId'])
/**
 * Intent: Defines the landing audit log entity boundary for this supplied Landing backend scope.
 * Edge Cases: Invalid inputs, unavailable infrastructure, and transaction failures must fail through the owning boundary instead of being silently ignored.
 * Side Effects: Performs only the persistence, orchestration, transport, or infrastructure effects explicitly owned by this class.
 * AI Notes: Preserve the class's current responsibility and dependency direction; do not move business logic across feature boundaries.
 */
export class LandingAuditLogEntity extends LandingBaseEntity {
  @PrimaryGeneratedColumn('uuid', { primaryKeyConstraintName: 'PK_audit_logs', comment: 'Immutable UUID identity for one Landing audit record.' })
  declare id: string;

  @Column({ name: 'actor_id', type: 'uuid', nullable: true, comment: 'Authenticated actor UUID when available; public Landing submissions use null.' })
  actorId!: string | null;

  @Column({ name: 'actor_role', type: 'enum', enum: LandingAuditActorRole, enumName: 'landing_audit_actor_role', comment: 'Actor category used for authorization/audit classification.' })
  actorRole!: LandingAuditActorRole;

  @Column({ length: 120, comment: 'Stable business action identifier for the audited state change.' })
  action!: string;

  @Column({ name: 'entity_type', length: 120, comment: 'Logical entity name affected by the state change.' })
  entityType!: string;

  @Column({ name: 'entity_id', type: 'uuid', comment: 'UUID of the affected business record.' })
  entityId!: string;

  @Column({ name: 'old_value', type: 'jsonb', nullable: true, comment: 'Sanitized pre-mutation value snapshot when applicable.' })
  oldValue!: Record<string, unknown> | null;

  @Column({ name: 'new_value', type: 'jsonb', nullable: true, comment: 'Sanitized post-mutation value snapshot; secrets and raw PII are excluded.' })
  newValue!: Record<string, unknown> | null;

  @Column({ name: 'ip_address', type: 'inet', nullable: true, comment: 'Request source IP captured for mutation audit traceability.' })
  ipAddress!: string | null;
}
