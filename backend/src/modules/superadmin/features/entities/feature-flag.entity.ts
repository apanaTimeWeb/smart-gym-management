import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
} from 'typeorm';

/**
 * FeatureFlag entity — controls which features are globally enabled or
 * selectively enabled for specific tenants (beta overrides).
 */
@Entity('superadmin_feature_flags')
export class FeatureFlag {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  /** Machine-readable key, e.g. "AI_DIET_PLANNER" */
  @Column({ type: 'varchar', length: 100, unique: true })
  @Index()
  name: string;

  @Column({ type: 'text' })
  description: string;

  /** When true, ALL tenants have this feature enabled */
  @Column({ name: 'is_global_enabled', type: 'boolean', default: false })
  @Index()
  isGlobalEnabled: boolean;

  /**
   * Comma-separated tenant IDs for beta overrides.
   * Only relevant when isGlobalEnabled = false.
   */
  @Column({ name: 'enabled_tenant_ids', type: 'simple-array', nullable: true })
  enabledTenantIds: string[];

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
