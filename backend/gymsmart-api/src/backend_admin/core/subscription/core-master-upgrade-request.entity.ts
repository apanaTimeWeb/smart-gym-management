// RESPONSIBILITY: Maps master-database subscription and billing state required by the Admin domain.
// FLOW: Master DB → entity → Admin subscription/plan services → canonical API response.

import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Entity('upgrade_requests_master')
@Index('IDX_upgrade_requests_master_tenant_id', ['tenantId'])
export class CoreMasterUpgradeRequestEntity {
  @PrimaryGeneratedColumn('uuid', { primaryKeyConstraintName: 'PK_upgrade_requests_master' })
  id!: string;

  @Column({ name: 'tenant_id', type: 'uuid' })

  tenantId!: string;

  @Column({ name: 'requested_plan_id', type: 'uuid' })

  requestedPlanId!: string;

  @Column({ name: 'status', type: 'varchar', length: 32, default: 'PENDING' })

  status!: string;

  @Column({ name: 'payload', type: 'jsonb', default: () => "'{}'::jsonb" })

  payload!: Record<string, unknown>;
}
