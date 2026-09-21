// RESPONSIBILITY: Owns PostgreSQL persistence for the Admin audit_logs feature and its frontend-backed payload.
// FLOW: AuditLogs Repository → AdminAuditLogsEntity → PostgreSQL audit_log_views table.

import { Column, Entity, Index } from 'typeorm';
import { CoreBaseEntity } from '@/core/database/core-base.entity';

@Entity('audit_log_views')
@Index('IDX_audit_log_views_created_at', ['createdAt'])
export class AdminAuditLogsEntity extends CoreBaseEntity {
  @Column({ name: 'name', type: 'varchar', length: 200, nullable: true })
  name!: string | null;

  @Column({ name: 'status', type: 'varchar', length: 64, nullable: true })
  status!: string | null;

  @Column({ name: 'branch_id', type: 'uuid', nullable: true })
  branchId!: string | null;

  @Column({ name: 'amount_minor', type: 'bigint', nullable: true })
  amountMinor!: string | null;


  @Column({ name: 'payload', type: 'jsonb', default: () => "'{}'::jsonb" })
  payload!: Record<string, unknown>;
}
