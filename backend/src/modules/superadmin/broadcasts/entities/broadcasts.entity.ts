import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
} from 'typeorm';

export enum BroadcastStatus {
  SENT = 'SENT',
  SCHEDULED = 'SCHEDULED',
  DRAFT = 'DRAFT',
}

export enum BroadcastAudience {
  ALL_TENANTS = 'ALL_TENANTS',
  PRO_ONLY = 'PRO_ONLY',
  SUSPENDED_ONLY = 'SUSPENDED_ONLY',
}

@Entity('superadmin_broadcasts')
export class Broadcast {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 500 })
  title: string;

  @Column({ type: 'text' })
  content: string;

  @Column({ type: 'enum', enum: BroadcastStatus, default: BroadcastStatus.DRAFT })
  @Index()
  status: BroadcastStatus;

  @Column({ type: 'enum', enum: BroadcastAudience, default: BroadcastAudience.ALL_TENANTS })
  audience: BroadcastAudience;

  @Column({ name: 'scheduled_date', type: 'timestamp', nullable: true })
  scheduledDate: Date | null;

  @Column({ name: 'sent_date', type: 'timestamp', nullable: true })
  sentDate: Date | null;

  @Column({ name: 'sent_by', type: 'varchar', length: 255, nullable: true })
  sentBy: string | null;

  // Soft delete support (Rule 29)
  @Column({ name: 'is_deleted', type: 'boolean', default: false })
  isDeleted: boolean;

  @Column({ name: 'deleted_at', type: 'timestamp', nullable: true })
  deletedAt: Date | null;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
