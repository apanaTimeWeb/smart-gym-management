import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
} from 'typeorm';

export enum TenantStatus {
  ACTIVE = 'ACTIVE',
  SUSPENDED = 'SUSPENDED',
  TRIAL = 'TRIAL',
  CANCELLED = 'CANCELLED',
}

export enum SaaSPlanTier {
  BASIC = 'BASIC',
  PRO = 'PRO',
  ENTERPRISE = 'ENTERPRISE',
}

@Entity('superadmin_gyms')
export class Gym {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  @Index()
  name: string;

  @Column({ name: 'owner_name', type: 'varchar', length: 255 })
  ownerName: string;

  @Column({ name: 'admin_email', type: 'varchar', length: 255, unique: true })
  @Index()
  adminEmail: string;

  @Column({ type: 'varchar', length: 50 })
  phone: string;

  @Column({ type: 'enum', enum: TenantStatus, default: TenantStatus.TRIAL })
  @Index()
  status: TenantStatus;

  @Column({ type: 'enum', enum: SaaSPlanTier, default: SaaSPlanTier.BASIC })
  plan: SaaSPlanTier;

  @Column({ name: 'member_count', type: 'int', default: 0 })
  memberCount: number;

  @Column({ name: 'monthly_revenue', type: 'decimal', precision: 12, scale: 2, default: 0 })
  monthlyRevenue: number;

  @Column({ name: 'database_version', type: 'varchar', length: 50, default: 'v1.0.0' })
  databaseVersion: string;

  // Soft delete support (Rule 29)
  @Column({ name: 'is_deleted', type: 'boolean', default: false })
  @Index()
  isDeleted: boolean;

  @Column({ name: 'deleted_at', type: 'timestamp', nullable: true })
  deletedAt: Date | null;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
