// RESPONSIBILITY: TypeORM persistence entity for gyms feature data stored in `tenants`.
// FLOW: gyms repository -> Tenant entity -> PostgreSQL `tenants`.
import { Column, Entity, Index } from 'typeorm';
import { BaseEntity } from '@/backend_superadmin/core/database/base.entity';

export enum TenantStatus {
  ACTIVE = 'ACTIVE',
  SUSPENDED = 'SUSPENDED',
  TRIAL = 'TRIAL',
  CANCELLED = 'CANCELLED',
}

@Entity('tenants')
@Index('IDX_tenants_updated_at', ['updatedAt'])
export class TenantEntity extends BaseEntity {
  @Column({ name: 'name', type: 'varchar', length: 500 })
  name!: string;
  @Column({ name: 'owner_name', type: 'varchar', length: 500 })
  ownerName!: string;
  @Column({ name: 'admin_email', type: 'varchar', length: 500 })
  adminEmail!: string;
  @Column({ name: 'phone', type: 'varchar', length: 500 })
  phone!: string;
  @Column({ name: 'status', type: 'enum', enum: TenantStatus })
  status!: TenantStatus;
  @Column({ name: 'plan', type: 'varchar', length: 500 })
  plan!: string;
  @Column({ name: 'member_count', type: 'integer', default: 0 })
  memberCount!: number;
  @Column({ name: 'monthly_revenue', type: 'integer', default: 0 })
  monthlyRevenue!: number;
  @Column({ name: 'database_version', type: 'varchar', length: 500 })
  databaseVersion!: string;
  @Column({ name: 'city', type: 'varchar', length: 500 })
  city!: string;
  @Column({ name: 'state', type: 'varchar', length: 500 })
  state!: string;
  @Column({ name: 'country', type: 'varchar', length: 500 })
  country!: string;
  @Column({ name: 'gstin', type: 'varchar', length: 500 })
  gstin!: string;
  @Column({ name: 'trial_ends_at', type: 'timestamptz', nullable: true })
  trialEndsAt!: Date | null;
  @Column({ name: 'last_login_at', type: 'timestamptz', nullable: true })
  lastLoginAt!: Date | null;
  @Column({ name: 'last_active_at', type: 'timestamptz', nullable: true })
  lastActiveAt!: Date | null;
  @Column({ name: 'staff_count', type: 'integer', default: 0 })
  staffCount!: number;
  @Column({ name: 'database_name', type: 'varchar', length: 500 })
  databaseName!: string;
  @Column({ name: 'aadhar_number_encrypted', type: 'varchar', length: 500, nullable: true })
  aadharNumberEncrypted!: string | null;
  @Column({ name: 'subscription_history', type: 'jsonb', default: () => "'{}'::jsonb" })
  subscriptionHistory!: unknown;
  @Column({ name: 'usage_stats', type: 'jsonb', default: () => "'{}'::jsonb" })
  usageStats!: unknown;
}
