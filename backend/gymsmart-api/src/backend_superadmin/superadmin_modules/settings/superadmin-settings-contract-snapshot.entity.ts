// RESPONSIBILITY: Stores the module-owned frontend contract state used by specialized Superadmin read flows.
// FLOW: SuperadminSettingsContractSnapshotRepository -> SuperadminSettingsContractSnapshotEntity -> PostgreSQL `settings_contract_snapshots`.
import { Column, Entity, Index } from 'typeorm';
import { BaseEntity } from '@/backend_superadmin/superadmin_core/database/superadmin-core-base.entity';

@Entity('superadmin_settings_contract_snapshots')
@Index('IDX_settings_contract_snapshots_kind', ['kind'])
export class SuperadminSettingsContractSnapshotEntity extends BaseEntity {
  @Column({ name: 'kind', type: 'varchar', length: 500 })
  kind!: string;

  @Column({ name: 'payload', type: 'jsonb' })
  payload!: unknown;
}