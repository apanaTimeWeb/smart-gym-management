// RESPONSIBILITY: Maps immutable tenant audit activity records.
// FLOW: Mutation service → CoreAuditLogEntity → audit_logs table.


import { Column, Entity } from 'typeorm';
import { CoreBaseEntity } from '@/backend_trainer/backend_core/core_database/core-base.entity';

/**
 * Intent: Defines the CoreAuditLogEntity boundary for the backend core architecture.
 * Edge Cases: Preserve tenant scope, validation, authorization, nullability, transactions, and canonical errors when changing this construct.
 * Side Effects: Preserve the owning construct’s existing persistence, cache, event, and audit behavior without introducing cross-module state changes.
 * AI Note: Keep this construct isolated from unrelated modules and preserve frozen contracts; never bypass repository/domain boundaries.
 */
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
