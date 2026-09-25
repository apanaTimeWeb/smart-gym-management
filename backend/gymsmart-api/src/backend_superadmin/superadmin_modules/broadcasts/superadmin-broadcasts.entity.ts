// RESPONSIBILITY: TypeORM persistence entity for broadcasts feature data stored in `broadcasts`.
// FLOW: broadcasts repository -> Broadcast entity -> PostgreSQL `broadcasts`.
import { Column, Entity, Index } from 'typeorm';
import { SuperadminCoreBaseEntity } from '@/backend_superadmin/superadmin_core/superadmin_core_database/superadmin-core-base.entity';
import { BroadcastChannel, BroadcastStatus, BroadcastAudience } from '@/backend_superadmin/superadmin_modules/broadcasts/superadmin-broadcasts.constants';

/**
 * Primary Intent: Defines SuperadminBroadcastsEntity as an explicit backend construct in its owning role/module boundary.
 * Edge Cases: Preserve validation, authorization, tenant, transaction, persistence, and API-contract invariants when modifying this class.
 * Side-Effects: Only documented database, cache, event, queue, or external-service effects are allowed.
 * AI-Note: Keep dependencies isolated and preserve the frozen API/data contract.
 */
@Entity('superadmin_broadcasts')
@Index('IDX_broadcasts_updated_at', ['updatedAt'])
export class SuperadminBroadcastsEntity extends SuperadminCoreBaseEntity {
  /**
 * Primary Intent: Documents entity property title. Edge Cases: Preserve validation, nullability, persistence, authorization, and frozen API semantics. Side-Effects: None unless the owning file documents them. Side-Effects: None. AI-Note: Treat this construct as an explicit contract; do not rename, widen, or reinterpret it without updating its owner documentation.
 */
@Column({ name: 'title', type: 'varchar', length: 500 })
  title!: string;
  /**
 * Primary Intent: Documents entity property content. Edge Cases: Preserve validation, nullability, persistence, authorization, and frozen API semantics. Side-Effects: None unless the owning file documents them. Side-Effects: None. AI-Note: Treat this construct as an explicit contract; do not rename, widen, or reinterpret it without updating its owner documentation.
 */
@Column({ name: 'content', type: 'varchar', length: 500 })
  content!: string;
  /**
 * Primary Intent: Documents entity property status. Edge Cases: Preserve validation, nullability, persistence, authorization, and frozen API semantics. Side-Effects: None unless the owning file documents them. Side-Effects: None. AI-Note: Treat this construct as an explicit contract; do not rename, widen, or reinterpret it without updating its owner documentation.
 */
@Column({ name: 'status', type: 'enum', enum: BroadcastStatus })
  status!: BroadcastStatus;
  /**
 * Primary Intent: Documents entity property targetGymIds. Edge Cases: Preserve validation, nullability, persistence, authorization, and frozen API semantics. Side-Effects: None unless the owning file documents them. Side-Effects: None. AI-Note: Treat this construct as an explicit contract; do not rename, widen, or reinterpret it without updating its owner documentation.
 */
@Column({ name: 'target_gym_ids', type: 'jsonb', default: () => "'{}'::jsonb" })
  targetGymIds!: unknown;
  /**
 * Primary Intent: Documents entity property scheduledDate. Edge Cases: Preserve validation, nullability, persistence, authorization, and frozen API semantics. Side-Effects: None unless the owning file documents them. Side-Effects: None. AI-Note: Treat this construct as an explicit contract; do not rename, widen, or reinterpret it without updating its owner documentation.
 */
@Column({ name: 'scheduled_date', type: 'timestamptz', nullable: true })
  scheduledDate!: Date | null;
  /**
 * Primary Intent: Documents entity property sentDate. Edge Cases: Preserve validation, nullability, persistence, authorization, and frozen API semantics. Side-Effects: None unless the owning file documents them. Side-Effects: None. AI-Note: Treat this construct as an explicit contract; do not rename, widen, or reinterpret it without updating its owner documentation.
 */
@Column({ name: 'sent_date', type: 'timestamptz', nullable: true })
  sentDate!: Date | null;
  /**
 * Primary Intent: Documents entity property totalRecipients. Edge Cases: Preserve validation, nullability, persistence, authorization, and frozen API semantics. Side-Effects: None unless the owning file documents them. Side-Effects: None. AI-Note: Treat this construct as an explicit contract; do not rename, widen, or reinterpret it without updating its owner documentation.
 */
@Column({ name: 'total_recipients', type: 'integer', default: 0 })
  totalRecipients!: number;
  /**
 * Primary Intent: Documents entity property deliveredCount. Edge Cases: Preserve validation, nullability, persistence, authorization, and frozen API semantics. Side-Effects: None unless the owning file documents them. Side-Effects: None. AI-Note: Treat this construct as an explicit contract; do not rename, widen, or reinterpret it without updating its owner documentation.
 */
@Column({ name: 'delivered_count', type: 'integer', default: 0 })
  deliveredCount!: number;
  /**
 * Primary Intent: Documents entity property failedCount. Edge Cases: Preserve validation, nullability, persistence, authorization, and frozen API semantics. Side-Effects: None unless the owning file documents them. Side-Effects: None. AI-Note: Treat this construct as an explicit contract; do not rename, widen, or reinterpret it without updating its owner documentation.
 */
@Column({ name: 'failed_count', type: 'integer', default: 0 })
  failedCount!: number;
  /**
 * Primary Intent: Documents entity property audience. Edge Cases: Preserve validation, nullability, persistence, authorization, and frozen API semantics. Side-Effects: None unless the owning file documents them. Side-Effects: None. AI-Note: Treat this construct as an explicit contract; do not rename, widen, or reinterpret it without updating its owner documentation.
 */
@Column({ name: 'audience', type: 'enum', enum: BroadcastAudience })
  audience!: BroadcastAudience;
  /**
 * Primary Intent: Documents entity property channel. Edge Cases: Preserve validation, nullability, persistence, authorization, and frozen API semantics. Side-Effects: None unless the owning file documents them. Side-Effects: None. AI-Note: Treat this construct as an explicit contract; do not rename, widen, or reinterpret it without updating its owner documentation.
 */
@Column({ name: 'channel', type: 'enum', enum: BroadcastChannel, default: BroadcastChannel.EMAIL })
  channel!: BroadcastChannel;
  /**
 * Primary Intent: Documents entity property openedCount. Edge Cases: Preserve validation, nullability, persistence, authorization, and frozen API semantics. Side-Effects: None unless the owning file documents them. Side-Effects: None. AI-Note: Treat this construct as an explicit contract; do not rename, widen, or reinterpret it without updating its owner documentation.
 */
@Column({ name: 'opened_count', type: 'integer', default: 0 })
  openedCount!: number;
  /**
 * Primary Intent: Documents entity property clickedCount. Edge Cases: Preserve validation, nullability, persistence, authorization, and frozen API semantics. Side-Effects: None unless the owning file documents them. Side-Effects: None. AI-Note: Treat this construct as an explicit contract; do not rename, widen, or reinterpret it without updating its owner documentation.
 */
@Column({ name: 'clicked_count', type: 'integer', default: 0 })
  clickedCount!: number;
}
