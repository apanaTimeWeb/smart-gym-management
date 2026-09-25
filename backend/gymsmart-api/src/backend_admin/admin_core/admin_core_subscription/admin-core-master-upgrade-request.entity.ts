// RESPONSIBILITY: Maps master-database subscription and billing state required by the Admin domain.
// FLOW: Master DB â†’ entity â†’ Admin subscription/plan services â†’ canonical API response.
import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

import { AdminCoreMasterUpgradeRequestStatus } from '@/backend_admin/admin_core/admin_core_subscription/admin-core-master-upgrade-request-status.enum.js';

@Entity('upgrade_requests_master')
@Index('IDX_upgrade_requests_master_tenant_id', ['tenantId'])
/**
 * @description Defines the AdminCoreMasterUpgradeRequestEntity boundary for the admin_core_subscription backend feature.
 * @remarks Keep this class focused on its declared responsibility; preserve tenant, contract, security, and AI-context invariants when modifying it.
 */
export class AdminCoreMasterUpgradeRequestEntity {
  @PrimaryGeneratedColumn('uuid', { primaryKeyConstraintName: 'PK_upgrade_requests_master' })
  id!: string;

  @Column({ name: 'tenant_id', type: 'uuid' })

  tenantId!: string;

  @Column({ name: 'requested_plan_id', type: 'uuid' })

  requestedPlanId!: string;

  @Column({ name: 'status', type: 'enum', enum: AdminCoreMasterUpgradeRequestStatus, enumName: 'core_master_upgrade_request_status_enum', default: AdminCoreMasterUpgradeRequestStatus.PENDING })

  status!: AdminCoreMasterUpgradeRequestStatus;

  @Column({ name: 'payload', type: 'jsonb', default: () => "'{}'::jsonb" })

  payload!: Record<string, unknown>;
}
