// RESPONSIBILITY: TypeORM persistence entity for compliance feature data stored in `compliance_snapshots`.
// FLOW: compliance repository -> ComplianceSnapshot entity -> PostgreSQL `compliance_snapshots`.
import { Column, Entity, Index } from 'typeorm';
import { BaseEntity } from '@/backend_superadmin/superadmin_core/database/superadmin-core-base.entity';

@Entity('superadmin_compliance_snapshots')
@Index('IDX_compliance_snapshots_updated_at', ['updatedAt'])
export class SuperadminComplianceEntity extends BaseEntity {
  @Column({ name: 'kind', type: 'varchar', length: 500 })
  kind!: string;
  @Column({ name: 'payload', type: 'jsonb', default: () => "'{}'::jsonb" })
  payload!: unknown;
}