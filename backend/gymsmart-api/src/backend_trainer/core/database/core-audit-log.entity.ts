// RESPONSIBILITY: Maps immutable tenant audit activity records.
// FLOW: Mutation service → CoreAuditLogEntity → audit_logs table.


import { Column, Entity } from 'typeorm';
import { CoreBaseEntity } from '@/backend_trainer/core/database/core-base.entity';
@Entity('audit_logs')
export class CoreAuditLogEntity extends CoreBaseEntity {
  @Column({ name: 'actor_id', type: 'uuid' }) actorId!: string;
  @Column({ name: 'actor_role' }) actorRole!: string;
  @Column() action!: string;
  @Column({ name: 'entity_type' }) entityType!: string;
  @Column({ name: 'entity_id' }) entityId!: string;
  @Column({ name: 'old_value', type: 'jsonb', nullable: true }) oldValue!: Record<string, unknown> | null;
  @Column({ name: 'new_value', type: 'jsonb', nullable: true }) newValue!: Record<string, unknown> | null;
  @Column({ name: 'ip_address', nullable: true }) ipAddress!: string | null;
}
