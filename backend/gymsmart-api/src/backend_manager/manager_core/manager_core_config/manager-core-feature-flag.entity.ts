// RESPONSIBILITY: Persists tenant-scoped feature-flag configuration in the master database.
// FLOW: Tenant flag lookup -> master DB entity -> FeatureFlagService evaluation.
import { Column, Entity, Index, Unique } from 'typeorm';

import { CoreBaseEntity } from '@/backend_manager/manager_core/manager_core_database/manager-core-base.entity';

@Entity('feature_flags')
@Unique('UQ_feature_flags_tenant_key', ['tenantId', 'key'])
@Index('IDX_feature_flags_tenant_id', ['tenantId'])
export class ManagerCoreFeatureFlagEntity extends CoreBaseEntity {
  @Column({ name: 'tenant_id', type: 'uuid' })
  tenantId!: string;

  @Column({ type: 'varchar', length: 120 })
  key!: string;

  @Column({ type: 'boolean', default: false })
  enabled!: boolean;

  @Column({ type: 'integer', default: 0 })
  rolloutPercent!: number;
}
