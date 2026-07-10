import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
} from 'typeorm';

export enum SaaSPlanTier {
  BASIC = 'BASIC',
  PRO = 'PRO',
  ENTERPRISE = 'ENTERPRISE',
}

@Entity('superadmin_plans')
export class Plan {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'enum', enum: SaaSPlanTier, unique: true })
  @Index()
  name: SaaSPlanTier;

  @Column({ name: 'price_monthly', type: 'decimal', precision: 10, scale: 2 })
  priceMonthly: number;

  @Column({ name: 'price_annual', type: 'decimal', precision: 10, scale: 2 })
  priceAnnual: number;

  @Column({ name: 'max_members', type: 'int' })
  maxMembers: number;

  @Column({ name: 'max_staff', type: 'int' })
  maxStaff: number;

  // Stored as JSON array of feature strings (e.g., ["Member Management", "Basic Billing"])
  @Column({ type: 'simple-array' })
  features: string[];

  @Column({ name: 'active_tenants', type: 'int', default: 0 })
  activeTenants: number;

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
