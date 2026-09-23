// RESPONSIBILITY: TypeORM persistence entity for usage-meters feature data stored in `superadmin_usage_meters`.
// FLOW: usage-meters repository -> UsageMeter entity -> PostgreSQL `usage_meters`.
import { Column, Entity, Index } from 'typeorm';
import { BaseEntity } from '@/backend_superadmin/core/database/base.entity';

@Entity('superadmin_usage_meters')
@Index('IDX_usage_meters_updated_at', ['updatedAt'])
export class UsageMetersEntity extends BaseEntity {
  @Column({ name: 'tenant_id', type: 'varchar', length: 500 })
  tenantId!: string;
  @Column({ name: 'tenant_name', type: 'varchar', length: 500 })
  tenantName!: string;
  @Column({ name: 'sms_sent', type: 'integer', default: 0 })
  smsSent!: number;
  @Column({ name: 'sms_limit', type: 'integer', default: 0 })
  smsLimit!: number;
  @Column({ name: 'whatsapp_messages_sent', type: 'integer', default: 0 })
  whatsappMessagesSent!: number;
  @Column({ name: 'whatsapp_limit', type: 'integer', default: 0 })
  whatsappLimit!: number;
  @Column({ name: 'emails_sent', type: 'integer', default: 0 })
  emailsSent!: number;
  @Column({ name: 'email_limit', type: 'integer', default: 0 })
  emailLimit!: number;
  @Column({ name: 'api_calls_count', type: 'integer', default: 0 })
  apiCallsCount!: number;
  @Column({ name: 'api_calls_limit', type: 'integer', default: 0 })
  apiCallsLimit!: number;
  @Column({ name: 'database_gb', type: 'numeric', precision: 12, scale: 3, default: 0, transformer: { to: (value: number): number => value, from: (value: string): number => Number(value) } })
  databaseGb!: number;
  @Column({ name: 'media_gb', type: 'numeric', precision: 12, scale: 3, default: 0, transformer: { to: (value: number): number => value, from: (value: string): number => Number(value) } })
  mediaGb!: number;
  @Column({ name: 'storage_limit_gb', type: 'numeric', precision: 12, scale: 3, default: 0, transformer: { to: (value: number): number => value, from: (value: string): number => Number(value) } })
  storageLimitGb!: number;
  @Column({ name: 'active_members', type: 'integer', default: 0 })
  activeMembers!: number;
  @Column({ name: 'total_members', type: 'integer', default: 0 })
  totalMembers!: number;
  @Column({ name: 'member_limit', type: 'integer', default: 0 })
  memberLimit!: number;
  @Column({ name: 'staff_count', type: 'integer', default: 0 })
  staffCount!: number;
  @Column({ name: 'staff_limit', type: 'integer', default: 0 })
  staffLimit!: number;
  @Column({ name: 'billing_cycle_end', type: 'timestamptz' })
  billingCycleEnd!: Date;
}