// RESPONSIBILITY: TypeORM persistence entity for broadcasts feature data stored in `broadcasts`.
// FLOW: broadcasts repository -> Broadcast entity -> PostgreSQL `broadcasts`.
import { Column, Entity, Index } from 'typeorm';
import { BaseEntity } from '@/backend_superadmin/core/database/base.entity';

export enum BroadcastStatus {
  SENT = 'SENT',
  SCHEDULED = 'SCHEDULED',
  DRAFT = 'DRAFT',
}

export enum BroadcastAudience {
  ALLTENANTS = 'ALL_TENANTS',
  PROONLY = 'PRO_ONLY',
  SUSPENDEDONLY = 'SUSPENDED_ONLY',
}

@Entity('broadcasts')
@Index('IDX_broadcasts_updated_at', ['updatedAt'])
export class BroadcastEntity extends BaseEntity {
  @Column({ name: 'title', type: 'varchar', length: 500 })
  title!: string;
  @Column({ name: 'content', type: 'varchar', length: 500 })
  content!: string;
  @Column({ name: 'status', type: 'enum', enum: BroadcastStatus })
  status!: BroadcastStatus;
  @Column({ name: 'target_gym_ids', type: 'jsonb', default: () => "'{}'::jsonb" })
  targetGymIds!: unknown;
  @Column({ name: 'scheduled_date', type: 'timestamptz', nullable: true })
  scheduledDate!: Date | null;
  @Column({ name: 'sent_date', type: 'timestamptz', nullable: true })
  sentDate!: Date | null;
  @Column({ name: 'total_recipients', type: 'integer', default: 0 })
  totalRecipients!: number;
  @Column({ name: 'delivered_count', type: 'integer', default: 0 })
  deliveredCount!: number;
  @Column({ name: 'failed_count', type: 'integer', default: 0 })
  failedCount!: number;
  @Column({ name: 'audience', type: 'enum', enum: BroadcastAudience })
  audience!: BroadcastAudience;
}
