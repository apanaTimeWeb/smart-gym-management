import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  Index,
} from 'typeorm';

export enum GlobalActorRole {
  SUPERADMIN = 'SUPERADMIN',
  SUPPORT_AGENT = 'SUPPORT_AGENT',
  BILLING_ADMIN = 'BILLING_ADMIN',
}

/**
 * GlobalAuditLog entity — records actions taken by the superadmin team itself
 * (not by gym admins). Used in the Global Audit Logs page.
 */
@Entity('superadmin_global_audit_logs')
export class GlobalAuditLog {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  /** Name of the superadmin team member who performed the action */
  @Column({ name: 'actor_name', type: 'varchar', length: 255 })
  @Index()
  actorName: string;

  @Column({ name: 'actor_role', type: 'enum', enum: GlobalActorRole })
  @Index()
  actorRole: GlobalActorRole;

  /** Machine-readable action, e.g. "CREATE_TENANT", "ISSUE_REFUND" */
  @Column({ type: 'varchar', length: 200 })
  @Index()
  action: string;

  /** The resource that was acted upon, e.g. "Iron Forge Fitness", "PRO Plan" */
  @Column({ name: 'target_resource', type: 'varchar', length: 500, nullable: true })
  targetResource: string | null;

  /** IP address of the superadmin actor */
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
