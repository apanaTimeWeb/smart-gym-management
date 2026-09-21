// RESPONSIBILITY: TypeORM persistence entity for global-audit feature data stored in `audit_logs`.
// FLOW: global-audit repository -> AuditLog entity -> PostgreSQL `audit_logs`.
import { Column, Entity, Index } from 'typeorm';
import { BaseEntity } from '@/backend_superadmin/core/database/base.entity';

@Entity('audit_logs')
@Index('IDX_audit_logs_updated_at', ['updatedAt'])
export class AuditLogEntity extends BaseEntity {
  @Column({ name: 'actor_id', type: 'varchar', length: 500 })
  actorId!: string;
  @Column({ name: 'actor_role', type: 'varchar', length: 500 })
  actorRole!: string;
  @Column({ name: 'action', type: 'varchar', length: 500 })
  action!: string;
  @Column({ name: 'entity_type', type: 'varchar', length: 500 })
  entityType!: string;
  @Column({ name: 'entity_id', type: 'varchar', length: 500 })
  entityId!: string;
  @Column({ name: 'old_value', type: 'jsonb', default: () => "'{}'::jsonb" })
  oldValue!: unknown;
  @Column({ name: 'new_value', type: 'jsonb', default: () => "'{}'::jsonb" })
  newValue!: unknown;
  @Column({ name: 'ip_address', type: 'varchar', length: 500 })
  ipAddress!: string;
  @Column({ name: 'tenant_id', type: 'varchar', length: 500, nullable: true })
  tenantId!: string | null;
}
