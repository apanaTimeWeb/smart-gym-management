// RESPONSIBILITY: Persists authenticated Superadmin notification records before realtime delivery.
// FLOW: Event handler -> notification repository -> PostgreSQL `superadmin_notifications` -> realtime publisher.
import { Column, Entity, Index } from 'typeorm';
import { SuperadminCoreBaseEntity } from '@/backend_superadmin/superadmin_core/superadmin_core_database/superadmin-core-base.entity';
import { SuperadminNotificationType } from '@/backend_superadmin/superadmin_modules/messaging/superadmin-messaging.constants';

/**
 * Primary Intent: Defines SuperadminMessagingNotificationEntity as an explicit backend construct in its owning role/module boundary.
 * Edge Cases: Preserve validation, authorization, tenant, transaction, persistence, and API-contract invariants when modifying this class.
 * Side-Effects: Only documented database, cache, event, queue, or external-service effects are allowed.
 * AI-Note: Keep dependencies isolated and preserve the frozen API/data contract.
 */
@Entity('superadmin_notifications')
@Index('IDX_superadmin_notifications_created_at', ['createdAt'])
@Index('IDX_superadmin_notifications_recipient', ['recipientUserId', 'read'])
export class SuperadminMessagingNotificationEntity extends SuperadminCoreBaseEntity {
  /**
 * Primary Intent: Documents entity property recipientUserId. Edge Cases: Preserve validation, nullability, persistence, authorization, and frozen API semantics. Side-Effects: None unless the owning file documents them. Side-Effects: None. AI-Note: Treat this construct as an explicit contract; do not rename, widen, or reinterpret it without updating its owner documentation.
 */
@Column({ name: 'recipient_user_id', type: 'varchar', length: 500, nullable: true }) recipientUserId!: string | null;
  /**
 * Primary Intent: Documents entity property tenantId. Edge Cases: Preserve validation, nullability, persistence, authorization, and frozen API semantics. Side-Effects: None unless the owning file documents them. Side-Effects: None. AI-Note: Treat this construct as an explicit contract; do not rename, widen, or reinterpret it without updating its owner documentation.
 */
@Column({ name: 'tenant_id', type: 'varchar', length: 500, nullable: true }) tenantId!: string | null;
  /**
 * Primary Intent: Documents entity property eventName. Edge Cases: Preserve validation, nullability, persistence, authorization, and frozen API semantics. Side-Effects: None unless the owning file documents them. Side-Effects: None. AI-Note: Treat this construct as an explicit contract; do not rename, widen, or reinterpret it without updating its owner documentation.
 */
@Column({ name: 'event_name', type: 'varchar', length: 500, nullable: true }) eventName!: string | null;
  /**
 * Primary Intent: Documents entity property title. Edge Cases: Preserve validation, nullability, persistence, authorization, and frozen API semantics. Side-Effects: None unless the owning file documents them. Side-Effects: None. AI-Note: Treat this construct as an explicit contract; do not rename, widen, or reinterpret it without updating its owner documentation.
 */
@Column({ name: 'title', type: 'varchar', length: 255 }) title!: string;
  /**
 * Primary Intent: Documents entity property body. Edge Cases: Preserve validation, nullability, persistence, authorization, and frozen API semantics. Side-Effects: None unless the owning file documents them. Side-Effects: None. AI-Note: Treat this construct as an explicit contract; do not rename, widen, or reinterpret it without updating its owner documentation.
 */
@Column({ name: 'body', type: 'text' }) body!: string;
  /**
 * Primary Intent: Documents entity property type. Edge Cases: Preserve validation, nullability, persistence, authorization, and frozen API semantics. Side-Effects: None unless the owning file documents them. Side-Effects: None. AI-Note: Treat this construct as an explicit contract; do not rename, widen, or reinterpret it without updating its owner documentation.
 */
@Column({ name: 'type', type: 'enum', enum: SuperadminNotificationType }) type!: SuperadminNotificationType;
  /**
 * Primary Intent: Documents entity property read. Edge Cases: Preserve validation, nullability, persistence, authorization, and frozen API semantics. Side-Effects: None unless the owning file documents them. Side-Effects: None. AI-Note: Treat this construct as an explicit contract; do not rename, widen, or reinterpret it without updating its owner documentation.
 */
@Column({ name: 'read', type: 'boolean', default: false }) read!: boolean;
}
