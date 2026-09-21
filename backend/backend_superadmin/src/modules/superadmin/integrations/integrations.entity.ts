// RESPONSIBILITY: TypeORM persistence entity for integrations feature data stored in `integration_keys`.
// FLOW: integrations repository -> IntegrationKey entity -> PostgreSQL `integration_keys`.
import { Column, Entity, Index } from 'typeorm';
import { BaseEntity } from '@/core/database/base.entity';

export enum IntegrationKeyStatus {
  ACTIVE = 'ACTIVE',
  REVOKED = 'REVOKED',
}

@Entity('integration_keys')
@Index('IDX_integration_keys_updated_at', ['updatedAt'])
export class IntegrationKeyEntity extends BaseEntity {
  @Column({ name: 'tenant_id', type: 'varchar', length: 500 })
  tenantId!: string;
  @Column({ name: 'label', type: 'varchar', length: 500 })
  label!: string;
  @Column({ name: 'status', type: 'enum', enum: IntegrationKeyStatus })
  status!: IntegrationKeyStatus;
  @Column({ name: 'last_used', type: 'timestamptz', nullable: true })
  lastUsed!: Date | null;
  @Column({ name: 'rate_limit', type: 'integer', default: 0 })
  rateLimit!: number;
  @Column({ name: 'secret_hash', type: 'varchar', length: 500 })
  secretHash!: string;
}
