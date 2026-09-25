// RESPONSIBILITY: Owns PostgreSQL persistence for the Admin audit_logs feature and its frontend-backed payload.
// FLOW: AuditLogs Repository â†’ AdminAuditLogsEntity â†’ PostgreSQL admin_audit_log_views table.
import { PrimaryGeneratedColumn, Column, Entity, Index } from 'typeorm';

import { AdminCoreBaseEntity } from '@/backend_admin/admin_core/admin_core_database/admin-core-base.entity'

import { AdminAuditLogsStatus } from '@/backend_admin/admin_modules/admin_audit_logs/admin-audit-logs.constants'

@Entity('admin_audit_log_views')
@Index('IDX_admin_audit_log_views_created_at', ['createdAt'])
/**
 * @description Defines the AdminAuditLogsEntity boundary for the admin_audit_logs backend feature.
 * @remarks Keep this class focused on its declared responsibility; preserve tenant, contract, security, and AI-context invariants when modifying it.
 */
export class AdminAuditLogsEntity extends AdminCoreBaseEntity {

  @PrimaryGeneratedColumn('uuid', { name: 'id', primaryKeyConstraintName: 'PK_admin_audit_log_views_ID' })
  declare id: string;
  @Column({ name: 'name', type: 'varchar', length: 200, nullable: true })
  name!: string | null;

  @Column({ name: 'status', type: 'enum', enum: AdminAuditLogsStatus, enumName: 'admin_audit_logs_status', nullable: true })
  status!: AdminAuditLogsStatus | null;

  @Column({ name: 'branch_id', type: 'uuid', nullable: true })
  branchId!: string | null;

  @Column({ name: 'amount_minor', type: 'bigint', nullable: true })
  amountMinor!: string | null;

  @Column({ name: 'payload', type: 'jsonb', default: () => "'{}'::jsonb" })
  payload!: Record<string, unknown>;
}
