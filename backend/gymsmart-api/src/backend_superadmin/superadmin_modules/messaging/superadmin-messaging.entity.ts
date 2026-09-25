// RESPONSIBILITY: TypeORM persistence entity for messaging feature data stored in `superadmin_tenant_messages`.
// FLOW: messaging repository -> TenantMessage entity -> PostgreSQL `superadmin_tenant_messages`.
import { Column, Entity, Index } from 'typeorm';
import { SuperadminCoreBaseEntity } from '@/backend_superadmin/superadmin_core/superadmin_core_database/superadmin-core-base.entity';
import { TenantMessageChannel, TenantMessageStatus } from '@/backend_superadmin/superadmin_modules/messaging/superadmin-messaging.constants';

/**
 * Primary Intent: Defines SuperadminMessagingEntity as an explicit backend construct in its owning role/module boundary.
 * Edge Cases: Preserve validation, authorization, tenant, transaction, persistence, and API-contract invariants when modifying this class.
 * Side-Effects: Only documented database, cache, event, queue, or external-service effects are allowed.
 * AI-Note: Keep dependencies isolated and preserve the frozen API/data contract.
 */
@Entity('superadmin_tenant_messages')
@Index('IDX_tenant_messages_updated_at', ['updatedAt'])
export class SuperadminMessagingEntity extends SuperadminCoreBaseEntity {
  /**
 * Primary Intent: Documents entity property tenantId. Edge Cases: Preserve validation, nullability, persistence, authorization, and frozen API semantics. Side-Effects: None unless the owning file documents them. Side-Effects: None. AI-Note: Treat this construct as an explicit contract; do not rename, widen, or reinterpret it without updating its owner documentation.
 */
@Column({ name: 'tenant_id', type: 'varchar', length: 500 })
  tenantId!: string;
  /**
 * Primary Intent: Documents entity property tenantName. Edge Cases: Preserve validation, nullability, persistence, authorization, and frozen API semantics. Side-Effects: None unless the owning file documents them. Side-Effects: None. AI-Note: Treat this construct as an explicit contract; do not rename, widen, or reinterpret it without updating its owner documentation.
 */
@Column({ name: 'tenant_name', type: 'varchar', length: 500 })
  tenantName!: string;
  /**
 * Primary Intent: Documents entity property channel. Edge Cases: Preserve validation, nullability, persistence, authorization, and frozen API semantics. Side-Effects: None unless the owning file documents them. Side-Effects: None. AI-Note: Treat this construct as an explicit contract; do not rename, widen, or reinterpret it without updating its owner documentation.
 */
@Column({ name: 'channel', type: 'enum', enum: TenantMessageChannel })
  channel!: TenantMessageChannel;
  /**
 * Primary Intent: Documents entity property subject. Edge Cases: Preserve validation, nullability, persistence, authorization, and frozen API semantics. Side-Effects: None unless the owning file documents them. Side-Effects: None. AI-Note: Treat this construct as an explicit contract; do not rename, widen, or reinterpret it without updating its owner documentation.
 */
@Column({ name: 'subject', type: 'varchar', length: 500 })
  subject!: string;
  /**
 * Primary Intent: Documents entity property body. Edge Cases: Preserve validation, nullability, persistence, authorization, and frozen API semantics. Side-Effects: None unless the owning file documents them. Side-Effects: None. AI-Note: Treat this construct as an explicit contract; do not rename, widen, or reinterpret it without updating its owner documentation.
 */
@Column({ name: 'body', type: 'varchar', length: 500 })
  body!: string;
  /**
 * Primary Intent: Documents entity property status. Edge Cases: Preserve validation, nullability, persistence, authorization, and frozen API semantics. Side-Effects: None unless the owning file documents them. Side-Effects: None. AI-Note: Treat this construct as an explicit contract; do not rename, widen, or reinterpret it without updating its owner documentation.
 */
@Column({ name: 'status', type: 'enum', enum: TenantMessageStatus })
  status!: TenantMessageStatus;
  /**
 * Primary Intent: Documents entity property sentAt. Edge Cases: Preserve validation, nullability, persistence, authorization, and frozen API semantics. Side-Effects: None unless the owning file documents them. Side-Effects: None. AI-Note: Treat this construct as an explicit contract; do not rename, widen, or reinterpret it without updating its owner documentation.
 */
@Column({ name: 'sent_at', type: 'timestamptz', nullable: true })
  sentAt!: Date | null;
  /**
 * Primary Intent: Documents entity property scheduledAt. Edge Cases: Preserve validation, nullability, persistence, authorization, and frozen API semantics. Side-Effects: None unless the owning file documents them. Side-Effects: None. AI-Note: Treat this construct as an explicit contract; do not rename, widen, or reinterpret it without updating its owner documentation.
 */
@Column({ name: 'scheduled_at', type: 'timestamptz', nullable: true })
  scheduledAt!: Date | null;
  /**
 * Primary Intent: Documents entity property campaignMetadata. Edge Cases: Preserve validation, nullability, persistence, authorization, and frozen API semantics. Side-Effects: None unless the owning file documents them. Side-Effects: None. AI-Note: Treat this construct as an explicit contract; do not rename, widen, or reinterpret it without updating its owner documentation.
 */
@Column({ name: 'campaign_metadata', type: 'jsonb', nullable: true })
  campaignMetadata!: Record<string, unknown> | null;
}
