// RESPONSIBILITY: TypeORM persistence entity for messaging feature data stored in `tenant_messages`.
// FLOW: messaging repository -> TenantMessage entity -> PostgreSQL `tenant_messages`.
import { Column, Entity, Index } from 'typeorm';
import { BaseEntity } from '@/core/database/base.entity';

export enum TenantMessageChannel {
  EMAIL = 'EMAIL',
  WHATSAPP = 'WHATSAPP',
  SMS = 'SMS',
}

export enum TenantMessageStatus {
  QUEUED = 'QUEUED',
  SENT = 'SENT',
  FAILED = 'FAILED',
  SCHEDULED = 'SCHEDULED',
}

@Entity('tenant_messages')
@Index('IDX_tenant_messages_updated_at', ['updatedAt'])
export class TenantMessageEntity extends BaseEntity {
  @Column({ name: 'tenant_id', type: 'varchar', length: 500 })
  tenantId!: string;
  @Column({ name: 'tenant_name', type: 'varchar', length: 500 })
  tenantName!: string;
  @Column({ name: 'channel', type: 'enum', enum: TenantMessageChannel })
  channel!: TenantMessageChannel;
  @Column({ name: 'subject', type: 'varchar', length: 500 })
  subject!: string;
  @Column({ name: 'body', type: 'varchar', length: 500 })
  body!: string;
  @Column({ name: 'status', type: 'enum', enum: TenantMessageStatus })
  status!: TenantMessageStatus;
  @Column({ name: 'sent_at', type: 'timestamptz', nullable: true })
  sentAt!: Date | null;
  @Column({ name: 'scheduled_at', type: 'timestamptz', nullable: true })
  scheduledAt!: Date | null;
}
