// RESPONSIBILITY: Owns PostgreSQL persistence for the Admin campaigns feature and its frontend-backed payload.
// FLOW: Campaigns Repository â†’ AdminCampaignsEntity â†’ PostgreSQL admin_campaigns table.
import { PrimaryGeneratedColumn, Column, Entity, Index } from 'typeorm';

import { AdminCoreBaseEntity } from '@/backend_admin/admin_core/admin_core_database/admin-core-base.entity'

import { AdminCampaignsStatus } from '@/backend_admin/admin_modules/admin_campaigns/admin-campaigns.constants'

@Entity('admin_campaigns')
@Index('IDX_admin_campaigns_created_at', ['createdAt'])
/**
 * @description Defines the AdminCampaignsEntity boundary for the admin_campaigns backend feature.
 * @remarks Keep this class focused on its declared responsibility; preserve tenant, contract, security, and AI-context invariants when modifying it.
 */
export class AdminCampaignsEntity extends AdminCoreBaseEntity {

  @PrimaryGeneratedColumn('uuid', { name: 'id', primaryKeyConstraintName: 'PK_admin_campaigns_ID' })
  declare id: string;
  @Column({ name: 'name', type: 'varchar', length: 200, nullable: true })
  name!: string | null;

  @Column({ name: 'status', type: 'enum', enum: AdminCampaignsStatus, enumName: 'admin_campaigns_status', nullable: true })
  status!: AdminCampaignsStatus | null;

  @Column({ name: 'branch_id', type: 'uuid', nullable: true })
  branchId!: string | null;

  @Column({ name: 'amount_minor', type: 'bigint', nullable: true })
  amountMinor!: string | null;

  @Column({ name: 'payload', type: 'jsonb', default: () => "'{}'::jsonb" })
  payload!: Record<string, unknown>;
}
