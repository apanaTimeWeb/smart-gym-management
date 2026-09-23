// RESPONSIBILITY: TypeORM persistence entity for features feature data stored in `feature_flags`.
// FLOW: features repository -> FeatureFlag entity -> PostgreSQL `feature_flags`.
import { Column, Entity, Index } from 'typeorm';
import { BaseEntity } from '@/backend_superadmin/superadmin_core/database/superadmin-core-base.entity';

@Entity('superadmin_feature_flags')
@Index('IDX_feature_flags_updated_at', ['updatedAt'])
export class SuperadminFeaturesEntity extends BaseEntity {
  @Column({ name: 'name', type: 'varchar', length: 500 })
  name!: string;
  @Column({ name: 'description', type: 'varchar', length: 500 })
  description!: string;
  @Column({ name: 'is_global_enabled', type: 'boolean', default: false })
  isGlobalEnabled!: boolean;
  @Column({ name: 'enabled_tenant_ids', type: 'jsonb', default: () => "'{}'::jsonb" })
  enabledTenantIds!: unknown;
  @Column({ name: 'notes', type: 'jsonb', default: () => "'{}'::jsonb" })
  notes!: unknown;
  @Column({ name: 'history', type: 'jsonb', default: () => "'{}'::jsonb" })
  history!: unknown;
}