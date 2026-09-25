// RESPONSIBILITY: TypeORM persistence entity for usage-meters feature data stored in `superadmin_usage_meters`.
// FLOW: usage-meters repository -> UsageMeter entity -> PostgreSQL `usage_meters`.
import { Column, Entity, Index } from 'typeorm';
import { SuperadminCoreBaseEntity } from '@/backend_superadmin/superadmin_core/superadmin_core_database/superadmin-core-base.entity';
/**
 * Primary Intent: Defines SuperadminUsageMetersEntity as an explicit backend construct in its owning role/module boundary.
 * Edge Cases: Preserve validation, authorization, tenant, transaction, persistence, and API-contract invariants when modifying this class.
 * Side-Effects: Only documented database, cache, event, queue, or external-service effects are allowed.
 * AI-Note: Keep dependencies isolated and preserve the frozen API/data contract.
 */
@Entity('superadmin_usage_meters')
@Index('IDX_usage_meters_updated_at', ['updatedAt'])
export class SuperadminUsageMetersEntity extends SuperadminCoreBaseEntity {
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
 * Primary Intent: Documents entity property smsSent. Edge Cases: Preserve validation, nullability, persistence, authorization, and frozen API semantics. Side-Effects: None unless the owning file documents them. Side-Effects: None. AI-Note: Treat this construct as an explicit contract; do not rename, widen, or reinterpret it without updating its owner documentation.
 */
@Column({ name: 'sms_sent', type: 'integer', default: 0 })
  smsSent!: number;
  /**
 * Primary Intent: Documents entity property smsLimit. Edge Cases: Preserve validation, nullability, persistence, authorization, and frozen API semantics. Side-Effects: None unless the owning file documents them. Side-Effects: None. AI-Note: Treat this construct as an explicit contract; do not rename, widen, or reinterpret it without updating its owner documentation.
 */
@Column({ name: 'sms_limit', type: 'integer', default: 0 })
  smsLimit!: number;
  /**
 * Primary Intent: Documents entity property whatsappMessagesSent. Edge Cases: Preserve validation, nullability, persistence, authorization, and frozen API semantics. Side-Effects: None unless the owning file documents them. Side-Effects: None. AI-Note: Treat this construct as an explicit contract; do not rename, widen, or reinterpret it without updating its owner documentation.
 */
@Column({ name: 'whatsapp_messages_sent', type: 'integer', default: 0 })
  whatsappMessagesSent!: number;
  /**
 * Primary Intent: Documents entity property whatsappLimit. Edge Cases: Preserve validation, nullability, persistence, authorization, and frozen API semantics. Side-Effects: None unless the owning file documents them. Side-Effects: None. AI-Note: Treat this construct as an explicit contract; do not rename, widen, or reinterpret it without updating its owner documentation.
 */
@Column({ name: 'whatsapp_limit', type: 'integer', default: 0 })
  whatsappLimit!: number;
  /**
 * Primary Intent: Documents entity property emailsSent. Edge Cases: Preserve validation, nullability, persistence, authorization, and frozen API semantics. Side-Effects: None unless the owning file documents them. Side-Effects: None. AI-Note: Treat this construct as an explicit contract; do not rename, widen, or reinterpret it without updating its owner documentation.
 */
@Column({ name: 'emails_sent', type: 'integer', default: 0 })
  emailsSent!: number;
  /**
 * Primary Intent: Documents entity property emailLimit. Edge Cases: Preserve validation, nullability, persistence, authorization, and frozen API semantics. Side-Effects: None unless the owning file documents them. Side-Effects: None. AI-Note: Treat this construct as an explicit contract; do not rename, widen, or reinterpret it without updating its owner documentation.
 */
@Column({ name: 'email_limit', type: 'integer', default: 0 })
  emailLimit!: number;
  /**
 * Primary Intent: Documents entity property apiCallsCount. Edge Cases: Preserve validation, nullability, persistence, authorization, and frozen API semantics. Side-Effects: None unless the owning file documents them. Side-Effects: None. AI-Note: Treat this construct as an explicit contract; do not rename, widen, or reinterpret it without updating its owner documentation.
 */
@Column({ name: 'api_calls_count', type: 'integer', default: 0 })
  apiCallsCount!: number;
  /**
 * Primary Intent: Documents entity property apiCallsLimit. Edge Cases: Preserve validation, nullability, persistence, authorization, and frozen API semantics. Side-Effects: None unless the owning file documents them. Side-Effects: None. AI-Note: Treat this construct as an explicit contract; do not rename, widen, or reinterpret it without updating its owner documentation.
 */
@Column({ name: 'api_calls_limit', type: 'integer', default: 0 })
  apiCallsLimit!: number;
  /**
 * Primary Intent: Documents entity property databaseGb. Edge Cases: Preserve validation, nullability, persistence, authorization, and frozen API semantics. Side-Effects: None unless the owning file documents them. Side-Effects: None. AI-Note: Treat this construct as an explicit contract; do not rename, widen, or reinterpret it without updating its owner documentation.
 */
@Column({ name: 'database_gb', type: 'numeric', precision: 12, scale: 3, default: 0, transformer: { to: (value: number): number => value, from: (value: string): number => Number(value) } })
  databaseGb!: number;
  /**
 * Primary Intent: Documents entity property mediaGb. Edge Cases: Preserve validation, nullability, persistence, authorization, and frozen API semantics. Side-Effects: None unless the owning file documents them. Side-Effects: None. AI-Note: Treat this construct as an explicit contract; do not rename, widen, or reinterpret it without updating its owner documentation.
 */
@Column({ name: 'media_gb', type: 'numeric', precision: 12, scale: 3, default: 0, transformer: { to: (value: number): number => value, from: (value: string): number => Number(value) } })
  mediaGb!: number;
  /**
 * Primary Intent: Documents entity property storageLimitGb. Edge Cases: Preserve validation, nullability, persistence, authorization, and frozen API semantics. Side-Effects: None unless the owning file documents them. Side-Effects: None. AI-Note: Treat this construct as an explicit contract; do not rename, widen, or reinterpret it without updating its owner documentation.
 */
@Column({ name: 'storage_limit_gb', type: 'numeric', precision: 12, scale: 3, default: 0, transformer: { to: (value: number): number => value, from: (value: string): number => Number(value) } })
  storageLimitGb!: number;
  /**
 * Primary Intent: Documents entity property activeMembers. Edge Cases: Preserve validation, nullability, persistence, authorization, and frozen API semantics. Side-Effects: None unless the owning file documents them. Side-Effects: None. AI-Note: Treat this construct as an explicit contract; do not rename, widen, or reinterpret it without updating its owner documentation.
 */
@Column({ name: 'active_members', type: 'integer', default: 0 })
  activeMembers!: number;
  /**
 * Primary Intent: Documents entity property totalMembers. Edge Cases: Preserve validation, nullability, persistence, authorization, and frozen API semantics. Side-Effects: None unless the owning file documents them. Side-Effects: None. AI-Note: Treat this construct as an explicit contract; do not rename, widen, or reinterpret it without updating its owner documentation.
 */
@Column({ name: 'total_members', type: 'integer', default: 0 })
  totalMembers!: number;
  /**
 * Primary Intent: Documents entity property memberLimit. Edge Cases: Preserve validation, nullability, persistence, authorization, and frozen API semantics. Side-Effects: None unless the owning file documents them. Side-Effects: None. AI-Note: Treat this construct as an explicit contract; do not rename, widen, or reinterpret it without updating its owner documentation.
 */
@Column({ name: 'member_limit', type: 'integer', default: 0 })
  memberLimit!: number;
  /**
 * Primary Intent: Documents entity property staffCount. Edge Cases: Preserve validation, nullability, persistence, authorization, and frozen API semantics. Side-Effects: None unless the owning file documents them. Side-Effects: None. AI-Note: Treat this construct as an explicit contract; do not rename, widen, or reinterpret it without updating its owner documentation.
 */
@Column({ name: 'staff_count', type: 'integer', default: 0 })
  staffCount!: number;
  /**
 * Primary Intent: Documents entity property staffLimit. Edge Cases: Preserve validation, nullability, persistence, authorization, and frozen API semantics. Side-Effects: None unless the owning file documents them. Side-Effects: None. AI-Note: Treat this construct as an explicit contract; do not rename, widen, or reinterpret it without updating its owner documentation.
 */
@Column({ name: 'staff_limit', type: 'integer', default: 0 })
  staffLimit!: number;
  /**
 * Primary Intent: Documents entity property billingCycleEnd. Edge Cases: Preserve validation, nullability, persistence, authorization, and frozen API semantics. Side-Effects: None unless the owning file documents them. Side-Effects: None. AI-Note: Treat this construct as an explicit contract; do not rename, widen, or reinterpret it without updating its owner documentation.
 */
@Column({ name: 'billing_cycle_end', type: 'timestamptz' })
  billingCycleEnd!: Date;
}
