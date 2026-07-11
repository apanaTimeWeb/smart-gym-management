import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  Index,
} from 'typeorm';

/**
 * AuditLog entity — records per-tenant actions performed by gym admins/staff.
 * Used in the Tenant Audit Logs page of the superadmin panel.
 */
@Entity('superadmin_audit_logs')
export class AuditLog {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'tenant_id', type: 'varchar', length: 255 })
  @Index()
  tenantId: string;

  @Column({ name: 'tenant_name', type: 'varchar', length: 255 })
  @Index()
  tenantName: string;

  /** Email of the user who performed the action */
  @Column({ name: 'actor_email', type: 'varchar', length: 255 })
  @Index()
  actorEmail: string;

  /** Role of the actor (ADMIN, STAFF, SYSTEM) */
  @Column({ name: 'actor_role', type: 'varchar', length: 100 })
  actorRole: string;

  /** Machine-readable action name, e.g. "DELETE_MEMBER" */
  @Column({ type: 'varchar', length: 200 })
  @Index()
  action: string;

  /** Entity type affected, e.g. "Member", "Payment" */
  @Column({ name: 'target_entity', type: 'varchar', length: 200, nullable: true })
  targetEntity: string | null;

  /** ID of the affected entity record */
  @Column({ name: 'target_id', type: 'varchar', length: 255, nullable: true })
  targetId: string | null;

  /** Human-readable description of the action */
  @Column({ type: 'text', nullable: true })
  details: string | null;

  /** IP address of the actor at time of action */
  @Column({ name: 'ip_address', type: 'varchar', length: 45, nullable: true })
  ipAddress: string | null;

  /** Before-state snapshot (Rule 30 - Audit Trail) */
  @Column({ name: 'old_value', type: 'json', nullable: true })
  oldValue: Record<string, unknown> | null;

  /** After-state snapshot (Rule 30 - Audit Trail) */
  @Column({ name: 'new_value', type: 'json', nullable: true })
  newValue: Record<string, unknown> | null;

  @Column({ type: 'timestamp' })
  @Index()
  timestamp: Date;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
