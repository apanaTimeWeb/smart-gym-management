// RESPONSIBILITY: Persists tenant-scoped feature-flag state in the master database.
// FLOW: FeatureFlagService -> Master TypeORM repository -> admin_feature_flags -> Redis cache.
import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Entity('admin_feature_flags')
@Index('UQ_admin_feature_flags_tenant_flag', ['tenantId', 'flagName'], { unique: true })
/**
 * @description Stores the authoritative enabled/disabled state for one tenant and feature flag.
 * @remarks Redis is only a cache; this master-DB row is the persistent rollout source of truth.
 */
export class AdminCoreMasterFeatureFlagEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'id', primaryKeyConstraintName: 'PK_admin_feature_flags' })
  id!: string;

  /** Primary Intent: identifies the tenant receiving this rollout. Edge Cases: null is forbidden. Side Effects: none. AI Note: never trust a client tenant id without authorization. */
  @Column({ name: 'tenant_id', type: 'uuid' })
  tenantId!: string;

  /** Primary Intent: stores the normalized feature flag identifier. Edge Cases: empty/invalid names are rejected by the service. Side Effects: determines rollout key identity. AI Note: preserve stable casing/normalization. */
  @Column({ name: 'flag_name', type: 'varchar', length: 160 })
  flagName!: string;

  /** Primary Intent: records the authoritative rollout state. Edge Cases: unknown flags fail closed. Side Effects: controls tenant runtime capability. AI Note: cache invalidation happens after persistence. */
  @Column({ name: 'enabled', type: 'boolean', default: false })
  enabled!: boolean;

  @Column({ name: 'created_at', type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  createdAt!: Date;

  @Column({ name: 'updated_at', type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt!: Date;
}
